
import createInvoice from "./action";
import CreateInvoiceForm from "../_components/createInvoiceForm";

export default function createInvoicePage() {
    return <div>
        <CreateInvoiceForm
            submitButtonText="Generate Invoice"
            title="Generate Invoice"
            serverAction={createInvoice} />
    </div>
}