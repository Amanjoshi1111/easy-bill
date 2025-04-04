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
import { userStore } from "@/store/store";

export default function Dashboard() {

    const [currency, setCurrency] = useState<Currency>("INR");
    const [dashboardCardData, setDashboardCardData] = useState<DashboardCardData>(defaultDashboardCardData);

    const id = userStore(state => state.btnIndex);
    useEffect(() => {
        async function getDashboardData() {
            const response = await fetch(dashboardDataHref(id, currency));
            const data: DashboardApiResponse = await response.json();
            if (!data.success) {
                notFound();
            }
            console.log(data.data);
            setDashboardCardData(data.data);
        }
        getDashboardData();
    }, [id, currency]);

    return <>
        <div className="flex justify-between items-center pt-4 pb-8">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">Dashboard</div>
                <div className="text-muted-foreground">Stay on top of your metrics</div>
            </div>
            <div className="flex items-center gap-5">
                <div>
                    <SelectCurrency currency={currency} setCurrency={setCurrency} />
                </div>
                <div className="flex gap-2 px-2 py-2 border rounded-md shadow-lg &>*]:hover:cursor-pointer">
                    <TimelineButton />
                </div>
            </div>

        </div>
        <DashboardInfoCards currency={currency} dashboardCardData={dashboardCardData} />
        <div className="grid grid-cols-[1fr] lg:grid-cols-[2.9fr_1.1fr] gap-4 pt-4">
            <UserGraph />
            <PaidInvoiceTable />
        </div>
    </>
}