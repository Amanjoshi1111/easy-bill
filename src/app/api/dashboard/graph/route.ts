import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { getCurrencyList } from "@/lib/dbHelpers";
import { DashboardGraphDataEntry, dashboardGraphQueryParamValidator } from "@/lib/types";
import { convertCurrency, getLowerDate } from "@/lib/utils";
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
    const dbData = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id,
            createdAt: (days == Number.MAX_SAFE_INTEGER) ? {} : { gte: lowerDate }
        },
        select: {
            currency: true,
            total: true,
            status: true,
            dueDate: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    // type GraphData:

    // const dbData2 = await prisma.$queryRaw<[]>`
    //     SELECT CAST("createdAt" as DATE) as "date",
    //     json_agg(
    //     json_build_object (
    //         'currency', "currency",
    //         'amount', ROUND("total",2),
    //         'status', "status",
    //         'dueDate', "dueDate"
    //     ))
    //     AS "invoices"
    //     FROM "Invoice"
    //     GROUP BY CAST("createdAt" AS DATE)
    //     ORDER BY CAST("createdAt" AS DATE) ASC;
    // `;

    // console.log({ dbData2 });
    // return NextResponse.json({ success: true, data: dbData2 });

    const responseData: DashboardGraphDataEntry[] = [];
    for (let i = 0; i < dbData.length; i++) {
        const data = dbData[i];
        let amount: number = 0;
        try {
            amount = convertCurrency(currenyList, Number(data.total), data.currency?.name as string, requiredCurrency);

        } catch (err) {
            if (err instanceof Error) {
                return NextResponse.json({ success: false, msg: err }, { status: 404 });
            }
        }
        responseData.push({ time: data.createdAt.toISOString(), amount: amount });
    }
    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
}