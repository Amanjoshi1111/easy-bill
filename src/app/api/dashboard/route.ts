
import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { DashboardCardData, idParamValidator } from "@/lib/types";
import { getAnalyticsDayFromTimeline } from "@/lib/utils";
import { InvoiceStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const session = await userSession();
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    const { success } = idParamValidator.safeParse(id);
    if (!success) {
        return NextResponse.json({ success: false, msg: "Invalid parameter" }, { status: 404 });
    }

    const days = getAnalyticsDayFromTimeline(id);


    console.log({ id, days });
    const lowerDate = new Date();
    lowerDate.setDate(lowerDate.getDate() - days);

    const data = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id,
            createdAt: { gte: lowerDate }
        },
        select: {
            total: true,
            status: true,
        }
    })

    const dashboardCardData: DashboardCardData = {
        invoiceIssued: data.length,
        totalRevenue: 0,
        paidInvoicesAmount: 0,
        unpaidInvoices: 0,
        totalPendingAmount: 0
    }
    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        dashboardCardData.totalRevenue += Number(entry.total);
        if (entry.status == InvoiceStatus.PAID) {
            dashboardCardData.paidInvoicesAmount += Number(entry.total);
        } else {
            dashboardCardData.unpaidInvoices++;
            dashboardCardData.totalPendingAmount += Number(entry.total);
        }
    }
    return NextResponse.json({ success: true, data: dashboardCardData }, { status: 200 });
}