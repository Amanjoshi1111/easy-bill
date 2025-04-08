import { prisma } from "@/db";
import { Currency } from "@prisma/client";

export async function getCurrencyList(): Promise<Currency[]> {
    const currencyData = await prisma.currency.findMany();

    return currencyData;
}