"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { invoicePdfHref, reminderEmailHref } from "@/lib/utils";
import { Download, Ellipsis, Mail, Pencil, SquareCheckBig, Trash } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function InvoiceActionButton({ id }: { id: string }) {

    const sendRemianderMail = async () => {

        toast.promise(
            // new Promise(resolve => setTimeout(resolve, 2000))
            fetch(reminderEmailHref(id), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(async (response) => {
                if (response.status != 200) {
                    const data: { error?: string } = await response.json();
                    throw new Error(data.error);
                }
            })
            , {
                loading: <span> Loading...</span>,
                success: <span>Reminder Email Sent</span>,
                error: (err) => err.message
            })
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
            <DropdownMenuItem onClick={sendRemianderMail}>
                <div className="flex items-center justify-between hover:cursor-pointer">
                    <Mail className="text-black size-4 mr-2" /> Reminder Email
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={""} className="flex items-center justify-between">
                    <Trash className="text-black size-4 mr-2" /> Delete
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <div className="flex items-center justify-between hover:cursor-pointer">
                    <SquareCheckBig className="text-black size-4 mr-2" /> Mark as paid
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}