"use server";
import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { INTERNAL_SERVER_ERROR, INVOICE_NOT_FOUND, REMAINDER_EMAIL_SENT } from "@/lib/constant";
import { sendReminderHtml } from "@/lib/emailTemplates/ReminderInvoice";
import sendEmail from "@/lib/sendEmail";
import { capitalizeString, formatCurrency, formatDate, invoiceNumberString, invoicePdfHref } from "@/lib/utils";
import { InvoiceStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const getInvoices = async () => {

    const session = await userSession();
    const data = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            invoiceNumber: true,
            toName: true,
            total: true,
            status: true,
            dueDate: true,
            currency: true
        },
    })
    return data;
}

export const markAsPaid = async (invoiceId: string, status: InvoiceStatus) => {
    const session = await userSession();
    const newStatus = (status == InvoiceStatus.PAID)
        ? InvoiceStatus.PENDING
        : InvoiceStatus.PAID;
    try {
        await prisma.invoice.update({
            where: {
                id: invoiceId,
                userId: session.user?.id
            },
            data: {
                status: newStatus
            }
        });
        revalidatePath("/");
        return { msg: `Marked As ${capitalizeString(newStatus.toLowerCase())}`, success: true };
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code == "P2025") {
            return { msg: INVOICE_NOT_FOUND, success: false };
        }
        return { msg: INTERNAL_SERVER_ERROR, success: false }
    }
}

export const sendRemainderMail = async (invoiceId: string) => {
    const session = await userSession();
    try {
        const data = await prisma.invoice.findUniqueOrThrow({
            where: {
                userId: session.user?.id,
                id: invoiceId
            }
        });

        const from = {
            "email": "hello@example.com",
            "name": "Mailtrap Test"
        }
        const to = [
            {
                "email": "aman.joshi1111@gmail.com"
            }
        ]

        const invoiceHref = invoicePdfHref(invoiceId);
        await sendEmail({
            to: to,
            from: from,
            subject: "invoice from aman",
            category: "Invoice Testing",
            html: sendReminderHtml({
                toName: data.toName,
                invoiceNumber: invoiceNumberString(data.invoiceNumber),
                dueDate: formatDate(data.dueDate),
                invoiceDate: formatDate(data.createdAt),
                totalAmount: formatCurrency(Number(data.total), data.currency),
                invoiceHref: invoiceHref
            })
        })
        return { msg: REMAINDER_EMAIL_SENT, success: true };
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code == "P2025") {
            return { msg: INVOICE_NOT_FOUND, success: false };
        }
        return { msg: INTERNAL_SERVER_ERROR, success: false };
    }
}