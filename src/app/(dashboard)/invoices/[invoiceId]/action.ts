"use server";
import { userSession } from "@/hooks/sessionHook";
import { FormServerAction } from "../type";
import { createInvoiceFormSchema } from "../type";
import { formatCurrency, formatDate, invoiceNumberString, parseValidationError } from "@/lib/utils";
import { prisma } from "@/db";
import sendEmail from "@/lib/sendEmail";
import { sendInvoiceHtml } from "@/lib/emailTemplates/sendInvoice";
import { redirect } from "next/navigation";

const editInvoice: FormServerAction = async (formData, invoiceId) => {

    await userSession();
    const validationObj = createInvoiceFormSchema.safeParse(formData);
    if (!validationObj.success) {
        return { success: false, errors: parseValidationError(validationObj.error) }
    }
    const validatedData = validationObj.data;
    const presentIds = validatedData.items.reduce((acc, item) => {
        if (item.id) {
            acc.push(item.id);
        }
        return acc;
    }, [] as string[])

    const data = await prisma.invoice.update({
        where: {
            id: invoiceId
        },
        data: {
            invoiceName: validatedData.invoiceName,
            dueDate: validatedData.dueDate,
            currency: validatedData.currency,
            fromName: validatedData.fromName,
            fromEmail: validatedData.fromEmail,
            fromAddress: validatedData.fromAddress,
            toName: validatedData.toName,
            toEmail: validatedData.toEmail,
            toAddress: validatedData.toAddress,
            items: {
                deleteMany: {
                    id: { notIn: presentIds }
                },
                upsert: validatedData.items.map(item => ({
                    where: { id: item.id || "" },
                    update: {
                        description: item.description,
                        quantity: item.quantity,
                        rate: item.rate,
                        amount: item.amount
                    },
                    create: {
                        description: item.description,
                        quantity: item.quantity,
                        rate: item.rate,
                        amount: item.amount
                    }
                }))
            },
            subTotal: validatedData.subTotal,
            discount: validatedData.discount,
            total: validatedData.total,
            note: validatedData?.note,
        },
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

    const invoiceHref = `http://localhost:3000/api/invoice/${data.id}`;
    await sendEmail({
        to: to,
        from: from,
        subject: "invoice from aman",
        category: "Invoice Testing",
        html: sendInvoiceHtml({
            isEditAction: true,
            toName: data.toName,
            invoiceNumber: invoiceNumberString(data.invoiceNumber),
            dueDate: formatDate(data.dueDate),
            invoiceDate: formatDate(data.createdAt),
            totalAmount: formatCurrency(Number(data.total), data.currency),
            invoiceHref: invoiceHref
        })
    })
    redirect("/invoices");
}
export default editInvoice;