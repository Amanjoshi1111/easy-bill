"use server";
import { userSession } from "@/hooks/sessionHook";
import { CreateInvoiceFormSchema, createInvoiceFormSchema } from "../type";
import { parseValidationError } from "@/lib/utils";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import sendEmail from "@/lib/sendEmail";


export async function createInvoice(formData: CreateInvoiceFormSchema) {

    const session = await userSession();

    const validationObj = createInvoiceFormSchema.safeParse(formData);
    if (!validationObj.success) {
        return { success: false, errors: parseValidationError(validationObj.error) }
    }
    const validatedData = validationObj.data;
    const data = await prisma.invoice.create({
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
                create: validatedData.items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    rate: item.rate,
                    amount: item.amount
                })),
            },
            subTotal: validatedData.subTotal,
            discount: validatedData.discount,
            total: validatedData.total,
            note: validatedData?.note,
            user: {
                connect: {
                    id: session.user?.id
                }
            }
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

    const sendEmailResponse = await sendEmail({
        to: to,
        from: from,
        subject: "invoice from aman",
        category: "Invoice Testing",
        html: "<h1>Sending something in mail</h1>"
    })
    console.log(sendEmailResponse);
    redirect("/invoices");
}

export const getDefaultFormData = async () => {

    const session = await userSession();

    const data = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            address: true
        }
    })
    return data;
}