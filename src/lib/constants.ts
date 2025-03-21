import { Home, ReceiptText } from "lucide-react";

export const links = [
    {
        id: 1,
        name: "Dashboard",
        href: "/dashboard",
        icon: Home
    },
    {
        id: 2,
        name: "Invoices",
        href: "/invoices",
        icon: ReceiptText
    }
]

export class Constants {
    static INTERNAL_SERVER_ERROR = "INTERNAL SERVER ERROR";
    static VALIDATION_ERROR = "INVALID DATA";
}