export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const INVOICE_NOT_FOUND = "Invoice Not Found";
export const REMAINDER_EMAIL_SENT = "Remainder Email Sent";
export const INVOICE_DELETED = "Invoice Deleted";
export const P2025 = "P2025";
export const TIMELINE_BUTTON_TEXTS = [
    {
        text: "7d",
        days: 5,
        description: "7 Days"
    },
    {
        text: "15d",
        days: 15,
        description: "15 Days"
    },
    {
        text: "30d",
        days: 30,
        description: "30 Days"
    }
]
export const NODEMAILER_CONFIG = {
    server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    },
    from: process.env.EMAIL_SERVER_USER,

}
export const defaultDashboardCardData = {
    totalInvoices: 0,
    totalRevenue: 0,
    avgDailyRevenue: 0,
    paidInvoices: 0,
    paidRevenue: 0,
    pendingInvoices: 0,
    pendingRevenue: 0,
    overDueInvoices: 0,
    overDueRevenue: 0
}

export enum TIME_SCALE {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY"
} 