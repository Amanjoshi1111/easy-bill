import { prisma } from "../src/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

async function seed() {
    let total: number = 0;
    const invoiceData = await prisma.invoice.findMany();
    console.log("Total invoice present : ", invoiceData.length);
    for (let i = 0; i < invoiceData.length; i++) {
        const invoice = invoiceData[i];
        const minAmount = Math.min(Number(invoice.total), Number(invoice.subTotal));
        total += minAmount;
        // if (minAmount > 10000) {
        //     await prisma.invoice.update({
        //         where: {
        //             id: invoice.id
        //         },
        //         data: {     
        //             currencyId: 3,
        //             total: minAmount / 100,
        //             subTotal: minAmount / 100,
        //             discount: 0
        //         }
        //     })
        //     console.log("Updated for invoiceNumber : ", invoice.invoiceNumber);
        // }
    }
    console.log({ total });
}

seed()
    .then(() => {
        console.log("DATA SEEDED SUCCESSFULLY");
    })
    .catch(err => {
        if (err instanceof Error || err instanceof PrismaClientKnownRequestError)
            console.log("Error : ", err.message);
    })