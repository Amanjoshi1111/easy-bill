import { Currency } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { number, ZodError } from "zod"

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