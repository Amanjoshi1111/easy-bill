import { capitalizeString } from "../utils"


export function sendInvoiceHtml({
    toName, invoiceNumber, invoiceDate, dueDate, totalAmount
}: {
    toName: string,
    invoiceNumber: string,
    invoiceDate: string,
    dueDate: string,
    totalAmount: string
}) {
    return `
<!DOCTYPE html>
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

    button {
        margin: 30px 0px 30px 0px;
        background-color: #304cda;
        color: white;
        font-size: larger;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
    }

    button:hover {
        background-color: #203CC0
        cursor: pointer;
    }
</style>

<body>
    <h1>Invoice For ${capitalizeString(toName)}</h1>
    <div>
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
    <button>Download invoice</button>
    <div>
        Thank you for your business and continued trust.
    </div>
</body>

</html>`
}