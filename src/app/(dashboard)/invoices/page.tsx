import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import InvoiceActionButton from "./actionButton";
import { userSession } from "@/hooks/sessionHook";

export default async function InvoicePage() {

    await userSession();

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
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>01</TableCell>
                        <TableCell>rahul</TableCell>
                        <TableCell>&#8377;400</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>22/04/2025</TableCell>
                        <TableCell className="text-right">
                            <InvoiceActionButton />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}