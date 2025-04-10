"use client"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { userStore } from "@/store/store"
import { useMemo } from "react"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    paid: {
        label: "Paid",
    },
    pending: {
        label: "Pending",
    },
    overdue: {
        label: "Overdue",
    },
    due: {
        label: "Due"
    }
} satisfies ChartConfig

export function StackedPieChart() {

    const dashboardData = userStore(state => state.dashboardCardData);

    const innerChartData = useMemo(() => ([
        { type: "paid", count: dashboardData.paidInvoices, fill: "#6A9FB5" },
        { type: "pending", count: dashboardData.dueInvoices + dashboardData.overDueInvoices, fill: "#E29C45" }
    ]), [dashboardData]);

    const outerChartData = useMemo(() => [
        { type: "paid", count: dashboardData.paidInvoices, fill: "#AFC9D6" },
        { type: "due", count: dashboardData.dueInvoices, fill: "#F3C77C" },
        { type: "overdue", count: dashboardData.overDueInvoices, fill: "#D95F3A" },
    ], [dashboardData])



    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Stacked</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="type"
                                    indicator="line"
                                    labelFormatter={(_, payload) => {
                                        return chartConfig[
                                            payload?.[0].dataKey as keyof typeof chartConfig
                                        ]?.label
                                    }}
                                />
                            }
                        />
                        <Pie data={innerChartData} dataKey="count" outerRadius={60}  />
                        <Pie
                            data={outerChartData}
                            dataKey="count"
                            innerRadius={70}
                            outerRadius={90}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
