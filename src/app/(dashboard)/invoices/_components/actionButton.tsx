"use client";   
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalizeString, invoicePdfHref } from "@/lib/utils";
import { Download, Ellipsis, Mail, Pencil, SquareCheckBig, Trash } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { markAsPaid, sendRemainderMail } from "../actions";
import { InvoiceStatus } from "@prisma/client";

export default function InvoiceActionButton({ id, status }: { id: string, status: InvoiceStatus }) {

    const handleSendRemainderMail = () => {
        toast.promise(
            () => sendRemainderMail(id)
                .then(data => {
                    if (!data.success) {
                        throw new Error(data.msg);
                    }
                    return data.msg;
                }),
            {
                loading: "Sending Email ...",
                success: (msg) => msg,
                error: (err) => err.message
            }
        )
    }
    const handleMarkAsRead = () => {
        toast.promise(
            () => markAsPaid(id, status)
                .then(data => {
                    if (!data.success) {
                        throw new Error(data.msg);
                    }
                    return data.msg;
                }),
            {
                loading: "Updating Status",
                success: (msg) => msg,
                error: (err) => err.message
            },
        )
    }

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
            <DropdownMenuItem onClick={handleSendRemainderMail}>
                <div className="flex items-center justify-between hover:cursor-pointer">
                    <Mail className="text-black size-4 mr-2" /> Reminder Email
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
                    <Trash className="text-black size-4 mr-2" /> Delete
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleMarkAsRead} >
                <div className="flex items-center justify-between hover:cursor-pointer">
                    <SquareCheckBig className="text-black size-4 mr-2" /> Mark As {(status == InvoiceStatus.PAID) ? capitalizeString(InvoiceStatus.PENDING.toLowerCase()) : capitalizeString(InvoiceStatus.PAID.toLowerCase())}
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}