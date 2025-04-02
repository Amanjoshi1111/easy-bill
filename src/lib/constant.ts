export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const INVOICE_NOT_FOUND = "Invoice Not Found";
export const REMAINDER_EMAIL_SENT = "Remainder Email Sent";
export const INVOICE_DELETED = "Invoice Deleted";
export const P2025 = "P2025";
export const TIMELINE_BUTTON_TEXTS = {
    "7d": 4,
    "30d": 5,
    "90d": 10,
    "Lifetime": Number.MAX_SAFE_INTEGER
}
export const NODEMAILER_CONFIG= {
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