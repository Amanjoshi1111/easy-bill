import { prisma } from "@/db";
import CreateInvoiceForm from "../_components/createInvoiceForm";
import { CreateInvoiceFormSchema } from "../type";
import { Ban } from "lucide-react";
import editInvoice from "./action";

async function getInvoiceData(invoiceId: string) {

    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId
        },
        include: {
            items: true
        }
    });

    return data;

}

export default async function EditInvoicePage({
    params
}: {
    params: Promise<{ invoiceId: string }>
}) {
    const { invoiceId } = await params;
    const data = await getInvoiceData(invoiceId);

    if (!data) {
        return <div className="flex items-center justify-center gap-1.5 font-medium text-red-500">
            <Ban className="size-5" />  <span className="text-lg ">Invalid Invoice Id</span>
        </div>
    }

    const formData: CreateInvoiceFormSchema = {
        currency: data.currency,
        discount: Number(data.discount),
        dueDate: data.dueDate,
        fromAddress: data.fromAddress,
        fromEmail: data.fromEmail,
        fromName: data.fromName,
        invoiceName: data.invoiceName,
        status: data.status,
        subTotal: Number(data.subTotal),
        toAddress: data.toAddress,
        toEmail: data.toEmail,
        toName: data.toName,
        total: Number(data.total),
        note: (data.note) ? data.note : undefined,
        items: data.items.map(item => {
            return {
                id: item.id,
                amount: Number(item.amount),
                description: item.description,
                quantity: Number(item.quantity),
                rate: Number(item.rate)
            }
        })
    }

    return <>
        <CreateInvoiceForm
            submitButtonText="Edit Invoice"
            invoiceId={invoiceId}
            title="Edit Invoice" data={formData}
            serverAction={editInvoice}
        />
    </>
}