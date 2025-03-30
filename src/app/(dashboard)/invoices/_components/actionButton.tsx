"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalizeString, invoicePdfHref } from "@/lib/utils";
import { Download, Ellipsis, Mail, Pencil, SquareCheckBig, Trash } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteInvoice, sendRemainderMail, updateInvoiceStatus } from "../actions";
import { InvoiceStatus } from "@prisma/client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

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
    const handleInvoiceStatus = () => {
        toast.promise(
            () => updateInvoiceStatus(id, status)
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
    const handleDeleteInvoice = () => {
        toast.promise(
            () => deleteInvoice(id)
                .then(data => {
                    if (!data.success) {
                        throw new Error(data.msg);
                    }
                    return data.msg;
                }),
            {
                loading: "Deleting Invoice",
                success: (msg) => msg,
                error: (err) => err.message
            }
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
            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
                        <div className="flex items-center justify-between hover:cursor-pointer">
                            <Mail className="text-black size-4 mr-2" /> Reminder Email
                        </div>
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Reminder Email</DialogTitle>
                        <DialogDescription>
                            {`Do you really want to send reminder email?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={handleSendRemainderMail} className="hover:cursor-pointer">Yes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} >
                        <div className=" flex items-center justify-between hover:cursor-pointer">
                            <Trash className="text-black size-4 mr-2" />Delete
                        </div>
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Invoice</DialogTitle>
                        <DialogDescription>
                            {`Do you really want to delete this invoice?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={handleDeleteInvoice} className="hover:cursor-pointer">Yes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} >
                        <div className="flex items-center justify-between hover:cursor-pointer">
                            <SquareCheckBig className="text-black size-4 mr-2" /> Mark As {getStatus(status)}
                        </div>
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Mark As Pending</DialogTitle>
                        <DialogDescription>
                            {`Do you really want to mark this invoice as ${getStatus(status)}?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={handleInvoiceStatus} className="hover:cursor-pointer">Yes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DropdownMenuContent>
    </DropdownMenu>
}

function getStatus(status: string) {
    return (status == InvoiceStatus.PAID) ? capitalizeString(InvoiceStatus.PENDING.toLowerCase()) : capitalizeString(InvoiceStatus.PAID.toLowerCase())
}