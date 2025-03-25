import { getInvoices } from "./actions";

export type GetInvoicesType = Awaited<ReturnType<typeof getInvoices>>;
export type InvoiceItemType = GetInvoicesType[0];