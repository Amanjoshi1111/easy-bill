"use client";
import { DashboardInfoCards } from "./dashboardInfoCards";
import PaidInvoiceTable from "./paidInvoicesTable";
import TimelineButton from "./timelineButtons";
import { UserGraph } from "./userGraph";
import SelectCurrency from "./selectCurrency";

export default function Dashboard() {
    return <>
        <div className="flex justify-between items-center pt-4 pb-8">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">Dashboard</div>
                <div className="text-muted-foreground">Stay on top of your metrics</div>
            </div>
            <div className="flex items-center gap-5">
                <div>
                    <SelectCurrency />
                </div>
                <div className="flex gap-2 px-2 py-2 border rounded-md shadow-lg &>*]:hover:cursor-pointer">
                    <TimelineButton />
                </div>
            </div>
        </div>
        <DashboardInfoCards />
        <div className="grid grid-cols-[1fr] lg:grid-cols-[2.9fr_1.1fr] gap-4 pt-4">
            <UserGraph />
            <PaidInvoiceTable />
        </div>
    </>
}