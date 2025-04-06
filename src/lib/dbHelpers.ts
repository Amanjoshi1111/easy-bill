import { prisma } from "@/db";
import { Currency } from "./types";

export async function getCurrencyList() {
    const currencyData: Currency[] = await prisma.currency.findMany();
    return currencyData;
}