import { getCurrencyList } from "@/lib/dbHelpers";
import { NextResponse } from "next/server";

export async function GET() {
    const currencyData = await getCurrencyList();
    return NextResponse.json({ data: currencyData });
}