"use client";
import { useEffect, useState } from "react";
import { DashboardInfoCards } from "./dashboardInfoCards";
import PaidInvoiceTable from "./paidInvoicesTable";
import TimelineButton from "./timelineButtons";
import { UserGraph } from "./userGraph";
import { dashboardDataHref } from "@/lib/utils";
import { DashboardApiResponse, DashboardCardData } from "@/lib/types";
import { notFound } from "next/navigation";

export default function Dashboard() {

    const [btnIndex, setBtnIndex] = useState<number>(1);
    const [dashboardCardData, setDashboardCardData] = useState<DashboardCardData>();

    useEffect(() => {
        console.log("TIMELINE : ", btnIndex);
        async function getDashboardData() {
            const response = await fetch(dashboardDataHref(btnIndex));
            const data: DashboardApiResponse = await response.json();
            if (!data.success) {
                notFound();
            }
            console.log(data.data);
            setDashboardCardData(data.data);
        }
        getDashboardData();
    }, [btnIndex]);

    return <>
        <div className="flex justify-between items-center pt-4 pb-8">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">Analytic Hub</div>
                <div className="text-muted-foreground">Stay on top of your metrics</div>
            </div>
            <TimelineButton setBtnIndex={setBtnIndex} btnIndex={btnIndex} />
        </div>
        <DashboardInfoCards btnIndex={btnIndex} dashboardCardData={dashboardCardData} />
        <div className="grid grid-cols-[1fr] lg:grid-cols-[2.9fr_1.1fr] gap-4 pt-4">
            <UserGraph />
            <PaidInvoiceTable />
        </div>
    </>
}