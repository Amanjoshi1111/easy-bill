
import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { defaultDashboardCardData } from "@/lib/constant";
import { dashboardQueryParamValidator } from "@/lib/types";
import { convertCurrency, getAnalyticsDayFromTimeline } from "@/lib/utils";
import { InvoiceStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest) {

    const session = await userSession();
    const searchParams = request.nextUrl.searchParams;
    const { success, data } = dashboardQueryParamValidator.safeParse({
        id: Number(searchParams.get("id")),
        currency: searchParams.get("currency")?.toUpperCase()
    });
    if (!success) {
        return NextResponse.json({ success: false, msg: "Invalid parameter" }, { status: 404 });
    }


    const { id, currency: requiredCurrency } = data;

    //Optimize it further by date not by time 
    const lowerDate = new Date();
    const days = getAnalyticsDayFromTimeline(id);
    lowerDate.setDate(lowerDate.getDate() - days);

    const dataList = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id,
            createdAt: (days == Number.MAX_SAFE_INTEGER) ? {} : { gte: lowerDate }
        },
        select: {
            currency: true,
            total: true,
            status: true,
            dueDate: true
        }
    });

    const responseData = { ...defaultDashboardCardData };
    responseData.totalInvoices = dataList.length;

    for (let i = 0; i < dataList.length; i++) {
        const data = dataList[i];

        let total: number = 0;
        try {
            total = convertCurrency(Number(data.total), data.currency, requiredCurrency);
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, msg: err.message };
            }
        }
        responseData.totalRevenue += total;
        if (data.status == InvoiceStatus.PAID) {
            responseData.paidInvoices++;
            responseData.paidRevenue += total;
        } else {
            responseData.unpaidInvoices++;
            responseData.unpaidRevenue += total;
            if (new Date() > new Date(data.dueDate)) {
                responseData.overDueInvoices++;
                responseData.overDueRevenue += total;
            }
        }
    }
    responseData.avgDailyRevenue = (days > 0) ? responseData.totalRevenue / days : 0;

    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
}