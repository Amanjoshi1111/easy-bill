import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { InvoiceStatus } from "@prisma/client";
import InvoiceActionButton from "./actionButton";
import { userSession } from "@/hooks/sessionHook";
import { getInvoices } from "./actions";
import { capitalizeString, formatCurrency } from "@/lib/utils";
import { GetInvoicesType, InvoiceItemType } from "./types";

export default async function InvoicePage() {

    await userSession();
    const invoiceList: GetInvoicesType = await getInvoices();

    return <Card >
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                    <CardDescription>Manage your invoices here</CardDescription>
                </div>
                <Link href={"/invoices/create"} className={buttonVariants()}> <Plus /> Create Invoice</Link>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="[&>*]:text-muted-foreground">
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* <TableRow>
                        <TableCell>01</TableCell>
                        <TableCell>rahul</TableCell>
                        <TableCell>&#8377;400</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>22/04/2025</TableCell>
                        <TableCell className="text-right">
                            <InvoiceActionButton />
                        </TableCell>
                    </TableRow> */}
                    {invoiceList.map(invoice => <InvoiceRow key={invoice.id} data={invoice} />)}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}

function InvoiceRow({ data }: { data: InvoiceItemType }) {

    return <TableRow>
        <TableCell>{invoiceNumberString(data.invoiceNumber)}</TableCell>
        <TableCell>{capitalizeString(data.fromName)}</TableCell>
        <TableCell>{formatCurrency(Number(data.total), data.currency)}</TableCell>
        <TableCell><StatusTag status={data.status} /></TableCell>
        <TableCell>{
            new Intl.DateTimeFormat("en-IN", {
                dateStyle: "full"
            }).format(data.dueDate)}
        </TableCell>
        <TableCell className="text-right">
            <InvoiceActionButton />
        </TableCell>
    </TableRow>
}

function StatusTag({ status }: { status: InvoiceStatus }) {
    if (status == InvoiceStatus.PENDING) {
        return <div className="flex justify-center text-xs w-fit bg-red-500 border rounded-xl text-white px-2">{status}</div>
    } else if (status == InvoiceStatus.PAID) {
        return <div className="flex justify-center text-xs w-fit bg-green-500 border rounded-xl text-white px-2">{status}</div>
    }
}

function invoiceNumberString(invoiceNumber: number) {
    return `#${String(invoiceNumber).padStart(5, "0")}`;
}