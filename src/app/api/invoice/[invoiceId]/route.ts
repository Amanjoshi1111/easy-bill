import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { capitalizeString, formatCurrency, formatPDFDate, invoiceNumberString } from "@/lib/utils";
import robotoNormalFont from "@/fonts/robotoNormalFont";
import robotoBoldFont from "@/fonts/robotoBoldFont";
import { Prisma } from "@prisma/client";

type FindUniqueInvoiceType = Prisma.InvoiceGetPayload<{
    select: {
        invoiceName: true,
        invoiceNumber: true,
        currency: true,
        items: true,
        fromName: true,
        fromEmail: true,
        fromAddress: true,
        toName: true,
        toAddress: true,
        createdAt: true,
        dueDate: true,
        subTotal: true,
        discount: true,
        total: true,
        note: true
    }
}>

export async function GET(request: NextRequest,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    const invoiceId = (await params).invoiceId;
    const data: FindUniqueInvoiceType | null = await prisma.invoice.findUnique({
        where: {
            id: invoiceId
        },
        select: {
            invoiceName: true,
            invoiceNumber: true,
            currency: true,
            items: true,
            fromName: true,
            fromEmail: true,
            fromAddress: true,
            toName: true,
            toAddress: true,
            createdAt: true,
            dueDate: true,
            subTotal: true,
            discount: true,
            total: true,
            note: true
        }
    });

    if (!data) {
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    //Function that will create pdf for us
    const doc = createInvoicePdf(data);

    const pdfBuffer = doc.output("arraybuffer");
    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposable": "inline"
        }
    });
}

function createInvoicePdf(data: FindUniqueInvoiceType) {
    const doc = new jsPDF();

    //Adding roboto font as it support ₹ character (utf-8)
    doc.addFileToVFS("Roboto-normal.ttf", robotoNormalFont);
    doc.addFileToVFS("Roboto-bold.ttf", robotoBoldFont);
    doc.addFont("Roboto-normal.ttf", "Roboto", "normal");
    doc.addFont("Roboto-bold.ttf", "Roboto", "bold");

    //The flow to write this pdf is horizontal first apprroach, 
    // first we are writing a horizontal line then switch to next one
    const x = 10;
    let y = 15;

    //Invoice heading & To Name
    doc.setFontSize(22)
        .setFont("Roboto", "bold")
        .text("INVOICE", x, y, { align: 'left' })
        .setFont("Roboto", "normal");
    doc.setFontSize(18)
    doc.text(`${capitalizeString(data.fromName)}`, x + 190, y, { align: "right", maxWidth: 100 });

    //Invoice Number & To address
    y = y + 10;
    doc.setFontSize(12)
        .text(`Invoice No. : ${invoiceNumberString(data.invoiceNumber)}`, 10, y);
    doc.text(data.fromAddress, x + 190, y, { align: "right", maxWidth: 100 });

    //Issue Date
    y = y + 6;
    doc.text(`Issue Date : ${formatPDFDate(data.createdAt)}`, x, y);
    doc.text(data.fromEmail, x + 190, y, { align: "right", maxWidth: 60 });

    //Due Date
    y = y + 6;
    doc.text(`Due Date : ${formatPDFDate(data.dueDate)}`, x, y);

    //Bill To
    y = y + 15;
    doc.setFontSize(15).setFont("Roboto", "bold").text("Bill To: ", x, y, {});
    y = y + 8;
    doc.setFontSize(14).setFont("Roboto", "bold").text(capitalizeString(data.toName), x, y);
    y = y + 6;
    doc.setFontSize(12).setFont("Roboto", "normal").text(data.toAddress, x, y, { maxWidth: 50 });

    //Items table
    y = y + 20;
    autoTable(doc, {
        startY: y,
        head: [["#", "Description", "QTY", "Price", "Total"]],
        body: getItemsList(data),
        theme: "plain",
        styles: {
            overflow: "linebreak",
            font: "Roboto",
            fontStyle: "normal"
        },
        headStyles: {
            fontStyle: "bold"
        },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 80, minCellWidth: 80, halign: "left" },
            2: { cellWidth: 20 },
            3: { cellWidth: 30, },
            4: { cellWidth: 20, halign: "right" }
        },
        willDrawCell: (data) => {
            if (data.cell.raw == "Total") {
                data.cell.styles.halign = "right";
            }
            if (data.cell.section == "head" && data.column.index == 0) {
                doc.setDrawColor("red");
                doc.setLineWidth(0.4);
                doc.line(x, y + 7, 210 - x, y + 7);
                doc.line(x, y, 210 - x, y);
                doc.setDrawColor("black");
            }
            if (data.cell.section == "body" && data.column.index == 0) {
                doc.setLineWidth(0.1);
                doc.line(x, y + 7, 210 - x, y + 7);
            }
            y = (Number(data.cursor?.y) + data.row.height)
        },
    })

    //Subtotal
    y = y + 15;
    doc.text("Subtotal: ", 210 - (x + 85), y);
    doc.text(formatCurrency(Number(data.subTotal), data.currency), 210 - (x + 30), y, { align: "left", maxWidth: x + 30 });
    doc.setLineWidth(0.05);

    y = y + 10;
    doc.text("Discount: ", 210 - (x + 85), y);
    doc.text(data.discount.toString() + "%", 210 - (x + 30), y, { align: "left", maxWidth: x + 30 });

    y = y + 10;
    doc.setFont("Roboto", "bold").setFontSize(13);
    doc.text("Total: ", 210 - (x + 85), y);
    doc.text(formatCurrency(Number(data.total), data.currency), 210 - (x + 30), y, { align: "left", maxWidth: x + 30 });

    //Draw line
    y = y + 15;
    doc.line(x, y, 210 - x, y);

    //Notes
    y = y + 10;
    if (data.note) {
        doc.text("Additional Note: ", x, y);
        doc.setFont("Roboto", "normal").setFontSize(12);
        doc.text(data.note, x, y + 5, { maxWidth: 150 - x });
    }

    return doc;
}

function getItemsList(data: FindUniqueInvoiceType) {
    const itemsArray = data.items.map((item, idx) => {
        const tableRow: string[] = [];
        tableRow.push(`${idx + 1}`);
        Object.entries(item).forEach(([key, value]) => {
            if (["description", "quantity", "rate", "amount"].includes(key)) {
                if (key == "rate" || key == "amount") {
                    tableRow.push(formatCurrency(Number(value), data.currency) as string)
                } else {
                    tableRow.push(value.toString());
                }
            }
        });
        console.log({ tableRow });
        return tableRow;
    })
    return itemsArray;
}
