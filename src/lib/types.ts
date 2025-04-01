import { z } from "zod";

export const idParamValidator = z.number().min(0).max(3);
export type IdParamValidator = typeof idParamValidator;

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