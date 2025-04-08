import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { DashboardGraphDataEntry, dashboardGraphQueryParamValidator } from "@/lib/types";
import { getLowerDate } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const session = await userSession();
    const searchParams = request.nextUrl.searchParams;
    const { success, data } = dashboardGraphQueryParamValidator.safeParse({
        id: Number(searchParams.get("id")),
        currency: searchParams.get("currency")?.toUpperCase(),
        range: searchParams.get("range")?.toUpperCase()
    })
    if (!success) {
        return NextResponse.json({ success: false, msg: "Invalid parameter" }, { status: 404 });
    }

    const { id, currency } = data;
    const { lowerDate, } = getLowerDate(id);
    // const currenyList = await getCurrencyList();



    const dbData2: DashboardGraphDataEntry[] = await prisma.$queryRaw<[]>`
        SELECT 
        CAST("createdAt" as DATE) as date,
        ROUND(SUM(CASE WHEN "status"='PAID' THEN ("total"/cc."rate")*dc."rate"
        ELSE 0 END),2) AS "paidRevenue",
        ROUND(SUM(CASE WHEN "status"='PENDING' THEN ("total"/cc."rate")*dc."rate"
        ELSE 0 END),2) AS "pendingRevenue",
        ROUND(SUM(("total"/cc."rate")*dc."rate"),2) AS "totalRevenue" 
        FROM "Invoice" AS i
        JOIN "Currency" AS cc ON i."currencyId"=cc.id
        JOIN "Currency" AS dc ON dc."name"=${currency}
        AND CAST("createdAt" as DATE) > ${lowerDate}
        AND i."userId"=${session.user?.id}
        GROUP BY CAST("createdAt" AS DATE)
        ORDER BY CAST("createdAt" AS DATE) ASC;
    `;

    const parsedData = dbData2.map(data => ({
        ...data,
        totalRevenue: Number(data.totalRevenue),
        paidRevenue: Number(data.paidRevenue),
        pendingRevenue: Number(data.pendingRevenue)
    }))
    return NextResponse.json({ success: true, data: parsedData });
}