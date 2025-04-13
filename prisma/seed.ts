// import { createInvoiceFormSchema, CreateInvoiceFormSchema } from "@/app/(dashboard)/invoices/type";
import { prisma } from "../src/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

async function seedInvoices() {

    //1. take user id
    const userId = "cm9g24bww0000o62ju1b2kpxh";
    for (let i = 0; i < 100; i++) {
        const createdAt = randomDateInRange(new Date(2025, 0, 1), new Date(2025, 3, 11));
        const dueDate = randomDateInRange(new Date(2025, 1, 1), new Date(2025, 5, 15));
        const randomReciever = recieverInfoArray[Math.floor((Math.random() * recieverInfoArray.length))];
        const items = getRandomItems();
        const subTotal = items.reduce((acc, item) => {
            return acc + item.amount;
        }, 0);

        const validatedData = {
            invoiceName: "invoce " + i,
            dueDate: dueDate,
            currency: 2,
            fromName: senderInfo.name,
            fromEmail: senderInfo.email,
            fromAddress: senderInfo.address,
            toName: randomReciever.name,
            toEmail: randomReciever.email,
            toAddress: randomReciever.address,
            items: items,
            subTotal: subTotal,
            discount: 0,
            total: subTotal,
            status: "PENDING"
        }

        // const { success, data: validatedData } = createInvoiceFormSchema.safeParse(invoiceData);

        const data = await prisma.invoice.create({
            data: {
                invoiceName: validatedData.invoiceName,
                dueDate: validatedData.dueDate,
                fromName: validatedData.fromName,
                fromEmail: validatedData.fromEmail,
                fromAddress: validatedData.fromAddress,
                toName: validatedData.toName,
                toEmail: validatedData.toEmail,
                toAddress: validatedData.toAddress,
                items: {
                    create: validatedData.items.map((item) => ({
                        description: item.description,
                        quantity: item.quantity,
                        rate: item.rate,
                        amount: item.amount
                    })),
                },
                subTotal: validatedData.subTotal,
                discount: validatedData.discount,
                total: validatedData.total,
                createdAt: createdAt,
                user: {
                    connect: {
                        id: userId
                    }
                },
                currency: {
                    connect: {
                        id: validatedData.currency
                    }
                }
            },
        });
    }
}

function getRandomItems() {
    const totalItems = Math.floor(Math.random() * 5) + 1;
    const items = [];
    for (let i = 0; i < totalItems; i++) {
        const description = `item ${i}`;
        const quantity = Math.floor(Math.random() * 5) + 1;
        const rate = Math.floor(Math.random() * 200) + 100;
        const amount = quantity * rate;

        items.push({ description, quantity, rate, amount });
    }
    return items;
}

const randomDateInRange = (lowDate: Date, upperDate: Date) => {
    const randomDate = Math.floor(Math.random() * (upperDate.getTime() - lowDate.getTime())) + lowDate.getTime();
    return new Date(randomDate);
}

const senderInfo = {
    name: "aman joshi",
    email: "aman.joshi1111@gmail.com",
    address: "aman joshi address"
}

const recieverInfoArray = [
    {
        name: "surya",
        email: "aman.joshi1111@gmail.com",
        address: "aman joshi address"
    },
    {
        name: "rahul gandhi",
        email: "rahul.gandhi@gmail.com",
        address: "rahul gandhi address"
    },
    {
        name: "amit pandey",
        email: "aman.joshi1111@gmail.com",
        address: "aman joshi address"
    },
    {
        name: "nishant",
        email: "aman.joshi1111@gmail.com",
        address: "aman joshi address"
    },
    {
        name: "nitin",
        email: "aman.joshi1111@gmail.com",
        address: "aman joshi address"
    }
]

seedInvoices()
    .then(() => {
        console.log("DATA SEEDED SUCCESSFULLY");
    })
    .catch(err => {
        if (err instanceof Error || err instanceof PrismaClientKnownRequestError)
            console.log("Error : ", err.message);
    })