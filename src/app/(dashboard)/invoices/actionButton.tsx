import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Ellipsis, Mail, Pencil, SquareCheckBig, Trash } from "lucide-react";
import Link from "next/link";

export default function InvoiceActionButton() {

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="hover:cursor-pointer"><Ellipsis /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
                    <Pencil className="text-black size-4 mr-2" /> Pencil
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
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