import { Currency } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function parseValidationError(error: ZodError) {

    const flattenError = Object.entries(error.flatten().fieldErrors).reduce((acc, [k, messages]) => {
        if (messages && messages.length > 0) {
            acc[k] = messages[0];
        }
        return acc;
    }, {} as Record<string, string>);

    return flattenError;
}

export function formatCurrency(amount: number, currency: Currency) {
    return new Intl.NumberFormat('en-IN', {
        style: "currency",
        currency: currency
    }).format(amount);
}

export function capitalizeString(str: string) {
    return str && str[0].toUpperCase() + str.substring(1, str.length);
}

export function invoiceNumberString(invoiceNumber: number) {
    return `#${String(invoiceNumber).padStart(5, "0")}`;
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "full"
    }).format(date).toString()
}

export function formatPDFDate(date: Date){
    return date.toISOString().split("T")[0];
}