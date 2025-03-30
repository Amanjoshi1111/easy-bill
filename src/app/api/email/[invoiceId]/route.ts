import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { sendReminderHtml } from "@/lib/emailTemplates/ReminderInvoice";
import sendEmail from "@/lib/sendEmail";
import { formatCurrency, formatDate, invoiceNumberString, invoicePdfHref } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    const session = await userSession();
    const { invoiceId } = await params;

    let data;
    try {
        data = await prisma.invoice.findUniqueOrThrow({
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

        const invoiceHref = invoicePdfHref(data.id);
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

    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code == "P2025") {
            return NextResponse.json({ error: "Invoice Not Found" }, { status: 404 });
        } else {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }
    return NextResponse.json("OK");
}