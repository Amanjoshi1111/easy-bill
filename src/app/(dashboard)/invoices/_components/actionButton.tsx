import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { invoicePdfHref } from "@/lib/utils";
import { Download, Ellipsis, Mail, Pencil, SquareCheckBig, Trash } from "lucide-react";
import Link from "next/link";

export default function InvoiceActionButton({ id }: { id: string }) {

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="hover:cursor-pointer"><Ellipsis /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem>
                <Link href={`invoices/${id}`} className="flex items-center justify-between">
                    <Pencil className="text-black size-4 mr-2" /> Edit Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link target="_blank" href={invoicePdfHref(id)} className="flex items-center justify-between">
                    <Download className="text-black size-4 mr-2" /> Download Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
                    <Mail className="text-black size-4 mr-2" /> Reminder Email
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
                    <Trash className="text-black size-4 mr-2" /> Delete
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
                    <SquareCheckBig className="text-black size-4 mr-2" /> Mark as paid
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}