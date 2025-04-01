
import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { idParamValidator } from "@/lib/types";
import { InvoiceStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const session = await userSession();
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    const { success } = idParamValidator.safeParse(id);
    if (!success) {
        return notFound();
    }

    let day = 0;
    switch (id) {
        case 0: day = 4;
            break;
        case 1: day = 5;
            break;
        default: day = 7;
    }
    console.log({ id, day });
    const lowerDate = new Date();
    lowerDate.setDate(lowerDate.getDate() - day);

    const data = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id,
            createdAt: { gte: lowerDate }
        },
        select: {
            total: true,
            status: true
        }
    })

    const invoiceIssued = data.length;
    let totalRevenue = 0;
    let paidInvoicesAmount = 0;
    let unpaidInvoices = 0;
    let totalPendingAmount = 0;

    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        totalRevenue += Number(entry.total);
        if (entry.status == InvoiceStatus.PAID) {
            paidInvoicesAmount += Number(entry.total);
        } else {
            unpaidInvoices++;
            totalPendingAmount += Number(entry.total);
        }
    }
    const response = {
        invoiceIssued,
        totalRevenue,
        paidInvoicesAmount,
        unpaidInvoices,
        totalPendingAmount
    }
    return NextResponse.json(response, {status:200});
}