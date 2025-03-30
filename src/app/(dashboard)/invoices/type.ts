import { Currency, InvoiceStatus } from "@prisma/client";
import { z } from "zod";
import { getInvoices } from "./actions";

const item = z.object({
    id: z.string().uuid().optional(),
    description: z.string()
        .min(5, "Minimum length should be 5 characters")
        .max(50, "Maximum length can only be 50 characters"),
    quantity: z.number({
        required_error: "Required",
        invalid_type_error: "Required"
    }).int().min(0).max(1000),
    rate: z.number({
        required_error: "Required",
        invalid_type_error: "Required"
    }).min(0),
    amount: z.number({
        required_error: "Required",
        invalid_type_error: "Required"
    }).min(0)
});

export const createInvoiceFormSchema = z.object({
    invoiceName: z.string()
        .min(5, "Minimum length should be 5 characters")
        .max(25, "Maximum length can only be 25 characters"),
    dueDate: z.coerce.date(),
    currency: z.nativeEnum(Currency, {
        required_error: "Currency is required",
        invalid_type_error: "Invalid currency type"
    }),
    status: z.nativeEnum(InvoiceStatus, {
        invalid_type_error: "Invalid currency type"
    }).default(InvoiceStatus.PENDING),
    fromName: z.string()
        .min(2, "Minimum length should be 2 characters")
        .max(20, "Maximum length can only be 20 characters"),
    fromEmail: z.string()
        .min(2, "Minimum length should be 2 characters")
        .max(50, "Maximum length can only be 50 characters"),
    fromAddress: z.string()
        .min(2, "Minimum length should be 2 characters")
        .max(100, "Maximum length can only be 20 characters"),
    toName: z.string()
        .min(2, "Minimum length should be 2 characters")
        .max(20, "Maximum length can only be 20 characters"),
    toEmail: z.string()
        .min(2, "Minimum length should be 2 characters")
        .max(50, "Maximum length can only be 50 characters"),
    toAddress: z.string()
        .min(2, "Minimum length should be 2 characters")
        .max(100, "Maximum length can only be 20 characters"),
    items: z.array(item).min(1, "Atleast add 1 item to generate invoice"),
    subTotal: z.number().min(0),
    discount: z.number().min(0).max(100),
    total: z.number().min(0),
    note: z.string().max(10000).optional()
})

export type CreateInvoiceFormSchema = z.infer<typeof createInvoiceFormSchema>;
export type Item = z.infer<typeof item>;

export type GetInvoicesType = Awaited<ReturnType<typeof getInvoices>>;
export type InvoiceItemType = GetInvoicesType[0];

export type FormServerAction = (data: CreateInvoiceFormSchema, id?: string) => FormServerActionResponse;
export type FormServerActionResponse = Promise<{
    success: boolean,
    errors: Record<string, string>
}>

