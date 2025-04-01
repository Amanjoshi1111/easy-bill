import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DashboardCardData } from "@/lib/types";
import { cn, formatCurrency, getAnalyticsDayFromTimeline } from "@/lib/utils";
import { Banknote, CircleCheckBig, CircleX, FileText } from "lucide-react";

type DashboarCardProps = {
    idx: number,
    title: string,
    amount: string,
    footer: string,
    icon: React.ReactNode,
    color: string,
    hoverColor: string
}

export function DashboardInfoCards({ dashboardCardData, btnIndex }: {
    dashboardCardData: DashboardCardData | undefined
    btnIndex: number
}) {

    const days = getAnalyticsDayFromTimeline(btnIndex);

    const totalRevenue = Number(dashboardCardData?.totalRevenue || 0);
    const averageDailyRevenue = Number(totalRevenue / days);

    const invoiceIssued = Number(dashboardCardData?.invoiceIssued || 0);
    const averageInvoicePerDay = Math.floor(Number(invoiceIssued / days));

    const unpaidInvoices = Number(dashboardCardData?.unpaidInvoices || 0);
    const paidInvoices = invoiceIssued - unpaidInvoices;

    // const paidInvoicesAmount = Number(dashboardCardData?.paidInvoicesAmount);
    const unpaidInvoicesAmount = Number(dashboardCardData?.totalPendingAmount);

    const percentagePaid = (invoiceIssued == 0) ? (0.00).toFixed(2)  : ((paidInvoices) / invoiceIssued * 100).toFixed(2);

    const cardInfo: DashboarCardProps[] = [
        {
            idx: 0,
            title: "Total Revenue",
            amount: formatCurrency(totalRevenue),
            footer: `Average daily revenue : ${formatCurrency(averageDailyRevenue)}`,
            icon: <Banknote color="white" />,
            color: "bg-gradient-to-r from-green-500 to-green-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
        },
        {
            idx: 1,
            title: "Invoice Issued",
            amount: invoiceIssued.toString(),
            footer: (averageInvoicePerDay < 1)
                ? "<1 per day"
                : (averageInvoicePerDay == 1)
                    ? `Average 1 invoice per day`
                    : `Average ${Math.floor(invoiceIssued / days)} invoices per day`,
            icon: <FileText color="white" />,
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
        },
        {
            idx: 2,
            title: "Paid Invoices",
            amount: paidInvoices.toString(),
            footer: `${percentagePaid} payment success rate`,
            icon: <CircleCheckBig color="white" />,
            color: "bg-gradient-to-r from-purple-500 to-purple-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
        },
        {
            idx: 3,
            title: "Unpaid Invoices",
            amount: unpaidInvoices.toString(),
            footer: `Total pending amount: ${formatCurrency(unpaidInvoicesAmount)}`,
            icon: <CircleX color="white" />,
            color: "bg-gradient-to-r from-red-500 to-red-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-red-100"
        },
    ]

    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cardInfo.map(data => (
            <InfoCard
                key={data.idx}
                {...data}
            />))}
    </div>
}

function InfoCard({ title, amount, footer, icon, color, hoverColor }: DashboarCardProps) {

    return <Card className={cn(`drop-shadow-lg hover:drop-shadow-xl 
    outline-0 hover:outline-3 outline- hover:outline-white `, hoverColor)}>
        < CardContent className="flex gap-3 items-center" >
            <div className={cn("flex items-center justify-center h-11 w-11 rounded-lg shrink-0", color)}>
                {icon}
            </div>
            <div className="flex flex-col overflow-hidden">
                <div className="text-muted-foreground font-medium">{title}</div>
                <div className="text-2xl font-bold break-words">{amount}</div>
            </div>
        </CardContent >
        <CardFooter>
            <div className="text-[13px] text-muted-foreground">  {footer}</div>
        </CardFooter>
    </Card >
}
