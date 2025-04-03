"use client";
import { useEffect, useState } from "react";
import { DashboardInfoCards } from "./dashboardInfoCards";
import PaidInvoiceTable from "./paidInvoicesTable";
import TimelineButton from "./timelineButtons";
import { UserGraph } from "./userGraph";
import { dashboardDataHref } from "@/lib/utils";
import { DashboardApiResponse, DashboardCardData } from "@/lib/types";
import { notFound } from "next/navigation";
import SelectCurrency from "./selectCurrency";
import { Currency } from "@prisma/client";
import { defaultDashboardCardData } from "@/lib/constant";

export default function Dashboard() {

    const [btnIndex, setBtnIndex] = useState<number>(0);
    const [currency, setCurrency] = useState<Currency>("INR");
    const [dashboardCardData, setDashboardCardData] = useState<DashboardCardData>(defaultDashboardCardData);

    useEffect(() => {
        async function getDashboardData() {
            const response = await fetch(dashboardDataHref(btnIndex, currency));
            const data: DashboardApiResponse = await response.json();
            if (!data.success) {
                notFound();
            }
            console.log(data.data);
            setDashboardCardData(data.data);
        }
        getDashboardData();
    }, [btnIndex, currency]);

    return <>
        <div className="flex justify-between items-center pt-4 pb-8">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">Analytic Hub</div>
                <div className="text-muted-foreground">Stay on top of your metrics</div>
            </div>
            <div className="flex items-center gap-5">
                <div>
                    <SelectCurrency currency={currency} setCurrency={setCurrency} />
                </div>
                <div className="flex gap-2 px-2 py-2 border rounded-md shadow-lg &>*]:hover:cursor-pointer">
                    <TimelineButton btnIndex={btnIndex} setBtnIndex={setBtnIndex} />
                </div>
            </div>

        </div>
        <DashboardInfoCards currency={currency} btnIndex={btnIndex} dashboardCardData={dashboardCardData} />
        <div className="grid grid-cols-[1fr] lg:grid-cols-[2.9fr_1.1fr] gap-4 pt-4">
            <UserGraph />
            <PaidInvoiceTable />
        </div>
    </>
}