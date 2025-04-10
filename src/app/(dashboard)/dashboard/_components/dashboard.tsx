"use client";
import { DashboardInfoCards } from "./dashboardInfoCards";
import TimelineButton from "./timelineButtons";
import { RevenueBarGraph } from "./RevenueBarGraph";
import SelectCurrency from "./selectCurrency";
import PaidInvoiceTable from "./paidInvoicesTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { userStore } from "@/store/store";
import { DashboardPieChart } from "./InvoicePieChart";

const CHART_DATA = [
    { text: "Revenue Analytics", component: <RevenueBarGraph /> },
    { text: "Invoice Distribution", component: <DashboardPieChart /> },
]

export default function Dashboard() {

    const activeGraphIdx = userStore((store) => store.activeGraphIdx);
    const setActiveGraphIdx = userStore((store) => store.setActiveGraphIdx);
    const Chart = CHART_DATA[activeGraphIdx].component;

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
            <div className="pt-4">
                <Card className="py-3 w-fit">
                    <CardContent className="flex gap-4">
                        {CHART_DATA.map((text, idx) => <Button onClick={() => setActiveGraphIdx(idx)}
                            className={`${activeGraphIdx == idx ? "" : "hover:bg-gray-300 "}` + "h-9 px-3"}
                            variant={`${activeGraphIdx == idx ? "default" : "outline"}`}
                            key={idx}>{text.text}
                        </Button>)}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-[1fr] lg:grid-cols-[2.2fr_0.8fr] gap-4 pt-4">
                <div>
                    {Chart}
                </div>
                <PaidInvoiceTable />
            </div>

        </div>
    </>
}