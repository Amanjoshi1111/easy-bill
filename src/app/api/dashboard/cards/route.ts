
import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { defaultDashboardCardData } from "@/lib/constant";
import { getCurrencyList } from "@/lib/dbHelpers";
import { dashboardCardQueryParamValidator } from "@/lib/types";
import { convertCurrency, getLowerDate } from "@/lib/utils";
import { InvoiceStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const session = await userSession();
    const searchParams = request.nextUrl.searchParams;
    const { success, data } = dashboardCardQueryParamValidator.safeParse({
        id: Number(searchParams.get("id")),
        currency: searchParams.get("currency")?.toUpperCase()
    });
    if (!success) {
        return NextResponse.json({ success: false, msg: "Invalid parameter" }, { status: 404 });
    }

    console.log("HELLO WORLD");
    const { id, currency: requiredCurrency } = data;
    const { lowerDate, days } = getLowerDate(id);

    const currencyData = await getCurrencyList();
    const dbData = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id,
            createdAt: (days == Number.MAX_SAFE_INTEGER) ? {} : { gte: lowerDate },
        },
        select: {
            total: true,
            status: true,
            currencyId: true,
            dueDate: true,
            currency: {
                select: {
                    name: true
                },

            }
        },
    });

    console.log(dbData);

    const responseData = { ...defaultDashboardCardData };
    responseData.totalInvoices = dbData.length;

    for (let i = 0; i < dbData.length; i++) {
        const data = dbData[i];

        let amount: number = 0;
        try {
            amount = convertCurrency(currencyData, Number(data.total), data.currency?.name as string, requiredCurrency);
            console.log({ amount, initialCurrency: data.currency?.name, requiredCurrency });
        } catch (err) {
            if (err instanceof Error) {
                return NextResponse.json({ success: false, msg: err }, { status: 404 });
            }
        }
        responseData.totalRevenue += amount;
        if (data.status == InvoiceStatus.PAID) {
            responseData.paidInvoices++;
            responseData.paidRevenue += amount;
        } else {
            responseData.pendingInvoices++;
            responseData.pendingRevenue += amount;
            if (new Date() > new Date(data.dueDate)) {
                responseData.overDueInvoices++;
                responseData.overDueRevenue += amount;
            }
        }
    }
    responseData.avgDailyRevenue = (days > 0) ? responseData.totalRevenue / days : 0;

    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
}