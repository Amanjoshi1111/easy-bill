
import createInvoice from "./action";
import CreateInvoiceForm from "../_components/createInvoiceForm";
import { getCurrencyData } from "@/lib/utils";

export default async function createInvoicePage() {

    const currencyData = await getCurrencyData();

    return <div>
        <CreateInvoiceForm
            currencyData={currencyData}
            submitButtonText="Generate Invoice"
            title="Generate Invoice"
            serverAction={createInvoice} />
    </div>
}