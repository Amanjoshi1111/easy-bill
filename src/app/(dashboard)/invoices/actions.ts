"use server";

import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";

export async function getInvoices() {

    const session = await userSession();
    const data = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id
        },
        orderBy: {
            createdAt: "asc"
        },
        select: {
            invoiceNumber: true,
            fromName: true,
            total: true,
            status: true,
            dueDate: true
        },
    })
    return data;
}