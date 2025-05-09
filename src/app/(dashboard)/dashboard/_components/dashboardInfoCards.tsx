import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DashboardCardApiResponse } from "@/lib/types";
import { cn, dashboardCardHref, formatCurrency, getAnalyticsDayFromTimeline } from "@/lib/utils";
import { userStore } from "@/store/store";
import { Banknote, ChevronDown, ChevronUp, CircleCheckBig, CircleX, Clock10, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

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
export function DashboardInfoCards() {

    const [showMore, setShowMore] = useState<boolean>(false);
    const btnIndex = userStore(state => state.btnIndex);
    const currency = userStore(state => state.currency);
    const setDashboardCardData = userStore(state => state.setDashboardCardData);

    useEffect(() => {
        async function getCardsData() {
            const response = await fetch(dashboardCardHref(btnIndex, currency));
            const data: DashboardCardApiResponse = await response.json();
            if (!data.success) {
                notFound();
            }
            console.log(data.data);
            setDashboardCardData(data.data);
        }
        getCardsData();
    }, [btnIndex, currency, setDashboardCardData]);


    const dashboardCardData = userStore(state => state.dashboardCardData);

    //If this grows extract it to a new function.
    const days = getAnalyticsDayFromTimeline(btnIndex)?.days;
    const totalRevenue = formatCurrency(dashboardCardData.totalRevenue, currency);
    const avgRevenue = formatCurrency(dashboardCardData.avgDailyRevenue, currency);
    const pendingRevenue = formatCurrency(dashboardCardData.dueRevenue + dashboardCardData.overDueRevenue, currency);
    // const paidRevenue = formatCurrency(dashboardCardData.paidRevenue, currency);
    const overDueRevenue = formatCurrency(dashboardCardData.overDueRevenue, currency);
    const totalInvoices = dashboardCardData.totalInvoices;
    const paidInvoices = dashboardCardData.paidInvoices;
    const pendingInvoices = dashboardCardData.dueInvoices + dashboardCardData.overDueInvoices;
    const overDueInvoices = dashboardCardData.overDueInvoices;
    const successPercentage = ((totalInvoices > 0) ? (paidInvoices / totalInvoices) * 100 : 0).toFixed(2);
    const averageInvoicePerDay = Number(((days! > 0) ? (totalInvoices / days!) : 0).toPrecision(1));

    const averageInvoicePerDayString = (averageInvoicePerDay < 1)
        ? `<1 per day`
        : (averageInvoicePerDay == 1) ? `Average 1 invoice per day` : `Average ${averageInvoicePerDay} invoices per day`;

    const cardInfo: DashboarCardProps[] = [
        {
            idx: 0,
            title: "Total Revenue",
            number: totalRevenue,
            footer: `Average daily revenue : ${avgRevenue}`,
            icon: <Banknote className="text-white dark:text-green-100" />,
            color: "bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
            hoverColor: "hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-700 dark:hover:to-green-800"
        },
        {
            idx: 1,
            title: "Invoice Issued",
            number: totalInvoices.toString(),
            footer: averageInvoicePerDayString,
            icon: <FileText className="text-white dark:text-blue-100" />,
            color: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
            hoverColor: "hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-700 dark:hover:to-blue-800"
        },
        {
            idx: 2,
            title: "Paid Invoices",
            number: paidInvoices.toString(),
            footer: `${successPercentage}% payment success rate`,
            icon: <CircleCheckBig className="text-white dark:text-purple-100" />,
            color: "bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
            hoverColor: "hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-700 dark:hover:to-purple-800"
        },
        {
            idx: 3,
            title: "Unpaid Invoices",
            number: pendingInvoices.toString(),
            footer: `Total pending amount: ${pendingRevenue}`,
            icon: <CircleX className="text-white dark:text-orange-100" />,
            color: "bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
            hoverColor: "hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-700 dark:hover:to-orange-800"
        },
        {
            idx: 4,
            title: "Overdue Invoices",
            number: overDueInvoices.toString(),
            footer: `Total pending amount: ${overDueRevenue}`,
            icon: <Clock10 className="text-white dark:text-red-100" />,
            color: "bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700",
            hoverColor: "hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-700 dark:hover:to-red-800"
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
