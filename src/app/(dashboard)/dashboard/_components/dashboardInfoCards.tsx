import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DashboardCardData } from "@/lib/types";
import { cn, formatCurrency, getAnalyticsDayFromTimeline } from "@/lib/utils";
import { Currency } from "@prisma/client";
import { Banknote, ChevronDown, ChevronUp, CircleCheckBig, CircleX, Clock10, FileText, Timer, TimerIcon } from "lucide-react";
import { useState } from "react";

type DashboarCardProps = {
    idx: number,
    title: string,
    number: string,
    footer: string,
    icon: React.ReactNode,
    color: string,
    hoverColor: string,
    className?: string
}
export function DashboardInfoCards({ currency, dashboardCardData, btnIndex }: {
    currency: Currency,
    dashboardCardData: DashboardCardData
    btnIndex: number
}) {

    const [showMore, setShowMore] = useState<boolean>(false);

    const days = getAnalyticsDayFromTimeline(btnIndex);
    const totalRevenue = formatCurrency(dashboardCardData.totalRevenue, currency);
    const avgRevenue = formatCurrency(dashboardCardData.avgDailyRevenue, currency);
    const unpaidRevenue = formatCurrency(dashboardCardData.unpaidRevenue, currency);
    const paidRevenue = formatCurrency(dashboardCardData.paidRevenue, currency);
    const overDueRevenue = formatCurrency(dashboardCardData.overDueRevenue, currency);
    const totalInvoices = dashboardCardData.totalInvoices;
    const paidInvoices = dashboardCardData.paidInvoices;
    const unpaidInvoices = dashboardCardData.unpaidInvoices;
    const overDueInvoices = dashboardCardData.overDueInvoices;
    const successPercentage = ((totalInvoices > 0) ? (paidInvoices / totalInvoices) * 100 : 0).toFixed(2);
    const averageInvoicePerDay = Number(((days > 0) ? (totalInvoices / days) : 0).toPrecision(1));

    const averageInvoicePerDayString = (averageInvoicePerDay < 1)
        ? `<1 per day`
        : (averageInvoicePerDay == 1) ? `Average 1 invoice per day` : `Average ${averageInvoicePerDay} invoices per day`;

    const cardInfo: DashboarCardProps[] = [
        {
            idx: 0,
            title: "Total Revenue",
            number: totalRevenue,
            footer: `Average daily revenue : ${avgRevenue}`,
            icon: <Banknote color="white" />,
            color: "bg-gradient-to-r from-green-500 to-green-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
        },
        {
            idx: 1,
            title: "Invoice Issued",
            number: totalInvoices.toString(),
            footer: averageInvoicePerDayString,
            icon: <FileText color="white" />,
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
        },
        {
            idx: 2,
            title: "Paid Invoices",
            number: paidInvoices.toString(),
            footer: `${successPercentage}% payment success rate`,
            icon: <CircleCheckBig color="white" />,
            color: "bg-gradient-to-r from-purple-500 to-purple-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
        },
        {
            idx: 3,
            title: "Unpaid Invoices",
            number: unpaidInvoices.toString(),
            footer: `Total pending amount: ${unpaidRevenue}`,
            icon: <CircleX color="white" />,
            color: "bg-gradient-to-r from-orange-500 to-orange-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-red-100"
        },
        {
            idx: 4,
            title: "Overdue Invoices",
            number: overDueInvoices.toString(),
            footer: `Total pending amount: ${overDueRevenue}`,
            icon: <Clock10 color="white" />,
            color: "bg-gradient-to-r from-red-500 to-red-600",
            hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-red-100"
        }
    ]

    return <div className="flex flex-col gap-2 ml-auto">
        <div className="ml-auto">
            <Button className="w-max hover:cursor-pointer " onClick={() => setShowMore((showMore) => !showMore)}>{(showMore) ? `Show Less` : `Show More`} {(showMore) ? <ChevronUp /> : <ChevronDown />}</Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {cardInfo.map((data, idx) => {
                if (idx >= 3) {
                    return <InfoCard key={data.idx} {...data} className={`${showMore ? "" : "hidden"}`} />
                }
                return <InfoCard key={data.idx} {...data} />
            })
            }
        </div>
    </div>
}

function InfoCard({ title, number, footer, icon, color, hoverColor, className }: DashboarCardProps) {

    return <Card className={cn(`drop-shadow-lg hover:drop-shadow-xl 
    outline-0 hover:outline-3 outline- hover:outline-white `, hoverColor, className)}>
        < CardContent className="flex gap-3 items-center" >
            <div className={cn("flex items-center justify-center h-11 w-11 rounded-lg shrink-0", color)}>
                {icon}
            </div>
            <div className="flex flex-col overflow-hidden">
                <div className="text-muted-foreground font-medium">{title}</div>
                <div className="text-2xl font-bold break-words">{number}</div>
            </div>
        </CardContent >
        <CardFooter>
            <div className="text-[13px] text-muted-foreground">  {footer}</div>
        </CardFooter>
    </Card >
}
