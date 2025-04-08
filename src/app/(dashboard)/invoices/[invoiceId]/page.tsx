import { prisma } from "@/db";
import CreateInvoiceForm from "../_components/createInvoiceForm";
import { CreateInvoiceFormSchema } from "../type";
import { Ban } from "lucide-react";
import editInvoice from "./action";
import { getCurrencyData } from "@/lib/utils";

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
    const invoiceData = await getInvoiceData(invoiceId);

    if (!invoiceData) {
        return <div className="flex items-center justify-center gap-1.5 font-medium text-red-500">
            <Ban className="size-5" />  <span className="text-lg ">Invalid Invoice Id</span>
        </div>
    }

    const currencyData = await getCurrencyData();

    const formData: CreateInvoiceFormSchema = {
        currency: invoiceData.currencyId,
        discount: Number(invoiceData.discount),
        dueDate: invoiceData.dueDate,
        fromAddress: invoiceData.fromAddress,
        fromEmail: invoiceData.fromEmail,
        fromName: invoiceData.fromName,
        invoiceName: invoiceData.invoiceName,
        status: invoiceData.status,
        subTotal: Number(invoiceData.subTotal),
        toAddress: invoiceData.toAddress,
        toEmail: invoiceData.toEmail,
        toName: invoiceData.toName,
        total: Number(invoiceData.total),
        note: (invoiceData.note) ? invoiceData.note : undefined,
        items: invoiceData.items.map(item => {
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
            currencyData={currencyData}
            title="Edit Invoice" data={formData}
            serverAction={editInvoice}
        />
    </>
}