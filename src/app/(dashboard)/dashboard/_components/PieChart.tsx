"use client"

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts"

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

const chartConfig = {
    count: {
        label: "Total Invoices",
    },
    paid: {
        label: "Paid Invoices",
        // color: "red"
    },
    due: {
        label: "Due Invoices",
        // color: "orange",
    },
    overdue: {
        label: "Overdue Invoices",
        // color: "orange",
    },
} satisfies ChartConfig

export function DashboardPieChart() {

    const dashboardData = userStore(store => store.dashboardCardData);

    const chartData = useMemo(() => ([
        { type: "paid", count: dashboardData.paidInvoices, fill: "var(--color-chart-2)" },
        { type: "due", count: dashboardData.dueInvoices, fill: "var(--color-chart-4)" },
        { type: "overdue", count: dashboardData.overDueInvoices, fill: "var(--color-chart-1)" },
        // { type: "pending", count: dashboardData.dueInvoices + dashboardData.overDueInvoices, fill: "var(--color-chart-1)" }
    ]), [dashboardData])

    const totalInvoices = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0)
    }, [chartData])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 flex justify-between">
                <div>
                    <CardTitle>Pie Chart - Invoices status distribution</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </div>
                <div className="flex gap-4 [&>*]:text-sm">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-[var(--color-chart-2)] rounded-xs"></div>
                        <div>Paid</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-[var(--color-chart-4)] rounded-xs"></div>
                        <div>Due</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-[var(--color-chart-1)] rounded-xs"></div>
                        <div>Overdue</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="type"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className=" text-3xl font-bold"
                                                >
                                                    {totalInvoices.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Invoices
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
}