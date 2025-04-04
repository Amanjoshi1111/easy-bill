import { Currency } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"
import { currencyConversionMap, TIMELINE_BUTTON_TEXTS } from "./constant";

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

export function formatPDFDate(date: Date) {
    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "short"
    }).format(date).toString().replaceAll("/", "-");
}

export function invoicePdfHref(id: string) {
    return `http://localhost:3000/api/invoice/${id}`;
}

export function reminderEmailHref(id: string) {
    return `http://localhost:3000/api/email/${id}`;
}

export function dashboardCardHref(id: number, selectIndex: string) {
    return `http://localhost:3000/api/dashboard/?id=${id}&currency=${selectIndex}`;
}

export function getAnalyticsDayFromTimeline(timeline: number) {
    return Object.values(TIMELINE_BUTTON_TEXTS).find((value, idx) => {
        if (idx == timeline) {
            return value;
        }
    }) || Number.MAX_SAFE_INTEGER;
}

export function convertCurrency(amount: number, currentCurrency: Currency, toCurrency: Currency) {

    if (currentCurrency == toCurrency)
        return amount;

    if (!currencyConversionMap[currentCurrency] || !currencyConversionMap[toCurrency]) {
        throw new Error("We don't offer conversion to this currency as of now, please contact sales team");
    }
    return (amount / currencyConversionMap[currentCurrency]) * currencyConversionMap[toCurrency];
}