
import { prisma } from "@/db";
import createInvoice from "./action";
import CreateInvoiceForm from "../_components/createInvoiceForm";
import { Currency } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function createInvoicePage() {

    const currencyData: Currency[] = await prisma.currency.findMany();
    if (currencyData.length == 0) {
        console.log("NO CURRENCY FOUND INSIDE DATABASE");
        notFound();
    }

    return <div>
        <CreateInvoiceForm
            currencyData={currencyData}
            submitButtonText="Generate Invoice"
            title="Generate Invoice"
            serverAction={createInvoice} />
    </div>
}