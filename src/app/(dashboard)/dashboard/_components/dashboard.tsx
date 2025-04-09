"use client";
import { DashboardInfoCards } from "./dashboardInfoCards";
import TimelineButton from "./timelineButtons";
import { UserGraph } from "./userGraph";
import SelectCurrency from "./selectCurrency";
import PaidInvoiceTable from "./paidInvoicesTable";

export default function Dashboard() {
    return <>
        <div className="top-0 z-40 w-full flex justify-between items-center pt-1 pb-4">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">Dashboard</div>
                <div className="text-muted-foreground">Stay on top of your metrics</div>
            </div>
            <div className="flex items-center gap-5">
                <div>
                    <SelectCurrency />
                </div>
                <div className="flex gap-2 px-2 py-2 border bg-white rounded-md shadow-lg &>*]:hover:cursor-pointer">
                    <TimelineButton />
                </div>
            </div>
        </div>
        <div className="px-2">
            <DashboardInfoCards />
            <div className="grid grid-cols-[1fr] gap-4 pt-4">
                <UserGraph />
                <PaidInvoiceTable />
            </div>
        </div>

    </>
}