import { Currency } from "@prisma/client";
import { z } from "zod";

export const dashboardQueryParamValidator = z.object({
    id: z.number().min(0).max(3),
    currency: z.nativeEnum(Currency)
})
export type IdParamValidator = typeof dashboardQueryParamValidator;

export type DashboardCardData = {
    invoiceIssued: number,
    totalRevenue: number,
    paidInvoicesAmount: number,
    unpaidInvoices: number,
    totalPendingAmount: number
}

export type DashboardApiResponse = {
    success: boolean,
    data: DashboardCardData
}