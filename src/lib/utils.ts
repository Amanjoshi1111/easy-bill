import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"
import { TIMELINE_BUTTON_TEXTS } from "./constant";
import { Currency } from "@prisma/client";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import { FormCurrencyData } from "@/app/(dashboard)/invoices/type";
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

export async function getCurrencyData(): Promise<FormCurrencyData> {
    const data = await prisma.currency.findMany();

    if (data.length == 0) {
        console.log("NO CURRENCY FOUND INSIDE DATABASE");
        notFound();
    }

    const currencyData = data.map(entry => ({
        ...entry,
        rate: Number(entry.rate)
    }))
    return currencyData;
}

export function getCurrencyNameFromId(currencyData: FormCurrencyData, currencyId: number) {
    console.log("data", currencyData);
    return currencyData.find((data) => data.id == currencyId)?.name;
}

export function formatCurrency(amount: number, currency: string) {
    if (currency == "" || currency == undefined)
        currency = "USD";
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
    // console.log("formatDate : ", date);
    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "full"
    }).format(date).toString()
}

export function formatPDFDate(date: Date) {
    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "short"
    }).format(date).toString().replaceAll("/", "-");
}

export function getAnalyticsDayFromTimeline(idx: number) {
    return TIMELINE_BUTTON_TEXTS.find((value, index) => {
        if (index == idx) {
            return value;
        }
    });
}

export function getLowerDate(id: number) {
    //Optimize it further by date not by time 
    const lowerDate = new Date();
    const days = getAnalyticsDayFromTimeline(id)?.days;
    lowerDate.setDate(lowerDate.getDate() - days!);
    return { lowerDate, days };
}

export function convertCurrency(currencyData: Currency[], amount: number, currentCurrency: string, toCurrency: string) {

    const currencyConversionMap: Record<string, number> = {};
    currencyData.forEach(data => {
        currencyConversionMap[data.name] = Number(data.rate)
    });

    if (currentCurrency == toCurrency)
        return amount;

    if (!currencyConversionMap[currentCurrency] || !currencyConversionMap[toCurrency]) {
        throw new Error("We don't offer conversion to this currency as of now, please contact sales team");
    }
    return (amount / currencyConversionMap[currentCurrency]) * currencyConversionMap[toCurrency];
}

export function invoicePdfHref(id: string) {
    return `http://localhost:3000/api/invoice/${id}`;
}

export function reminderEmailHref(id: string) {
    return `http://localhost:3000/api/email/${id}`;
}

export function dashboardCardHref(id: number, selectIndex: string) {
    return `http://localhost:3000/api/dashboard/cards/?id=${id}&currency=${selectIndex}`;
}

export function dashboardGraphHref(id: number, selectIndex: string, range: string) {
    return `http://localhost:3000/api/dashboard/graph/?id=${id}&currency=${selectIndex}&range=${range}`;
}

export function currencyListHref() {
    return `http://localhost:3000/api/listCurrencies`;
}