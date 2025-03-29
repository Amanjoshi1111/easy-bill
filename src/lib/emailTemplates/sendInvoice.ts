import { capitalizeString } from "../utils"

export function sendInvoiceHtml({

    toName, invoiceNumber, invoiceDate, dueDate, totalAmount, invoiceHref, isEditAction = false
}: {
    isEditAction?: boolean
    toName: string,
    invoiceNumber: string,
    invoiceDate: string,
    dueDate: string,
    totalAmount: string,
    invoiceHref: string
}) {

    console.log(isEditAction);
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Template</title>
</head>
<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
        padding: 5px 5px;
        line-height: 25px;
    }

    a {
        display: block;
        width: 160px;
        text-align: center;
        text-decoration: none;
        margin: 30px 0px 30px 0px;
        background-color: #304cda;
        color: white;
        font-size: larger;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
    }

    a:hover {
        background-color: #203CC0;
        cursor: pointer;
    }
</style>

<body>` +
        `${isEditAction
            ? `<h1> Updated Invoice For ${capitalizeString(toName)}</h1>`
            : `<h1> Invoice For ${capitalizeString(toName)}</h1>`
        } `
        +
        `<div>
        Dear ${capitalizeString(toName)},<br>
        I hope you're doing well. Please find attached your invoice.
    </div>
    <h2>Invoice Details:</h2>
    <ul>
        <li>Invoice Number : ${invoiceNumber}</li>
        <li>Invoice Date : ${invoiceDate.toString()}</li>
        <li>Due Date : ${dueDate.toString()}</li>
        <li>Total Amount : ${totalAmount}</li>
    </ul>
    <div>You can download the invoice using the button below: </div>
    <a href='${invoiceHref}'"
    >Download invoice</a>
    <div>
        Thank you for your business and continued trust.
    </div>
</body>

</html>`
}