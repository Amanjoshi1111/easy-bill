import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { getCurrencyList } from "@/lib/dbHelpers";
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

    const { id, currency: requiredCurrency } = data;
    const { lowerDate, days } = getLowerDate(id);

    const currenyList = await getCurrencyList();
    // const dbData = await prisma.invoice.findMany({
    //     where: {
    //         userId: session.user?.id,
    //         createdAt: (days == Number.MAX_SAFE_INTEGER) ? {} : { gte: lowerDate }
    //     },
    //     select: {
    //         currency: true,
    //         total: true,
    //         status: true,
    //         dueDate: true,
    //         createdAt: true
    //     },
    //     orderBy: {
    //         createdAt: "asc"
    //     }
    // });

    // type GraphData:

    const dbData2: DashboardGraphDataEntry[] = await prisma.$queryRaw<[]>`
        SELECT 
        CAST("createdAt" as DATE) as date,
        SUM(CASE WHEN "status"='PAID' THEN ROUND("total",
        2) ELSE 0 END) AS "paidRevenue",
        SUM(CASE WHEN "status"='PENDING' THEN ROUND("total",
        2) ELSE 0 END) AS "pendingRevenue",
        SUM(ROUND("total",2)) AS "totalRevenue" 
        FROM "Invoice" AS i
        JOIN "Currency" AS c
        ON i."currencyId"=c.id
        WHERE c."name"=${requiredCurrency} 
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
