"use client"

import * as React from "react"
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
const innerCircleData = [
    { type: "paid", count: 100, fill: "var(--color-chart-2)" },
    { type: "pending", count: 48, fill: "var(--color-chart-1)" },
]

const outerCircleData = [
    { type: "paid", count: 100, fill: "var(--color-chart-2)" },
    { type: "pending", count: 20, fill: "var(--color-chart-1)" },
    { type: "overdue", count: 28, fill: "red" }
]

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
    }
} satisfies ChartConfig

export function StackedPieChart() {
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
                                    labelKey="visitors"
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
                        <Pie data={innerCircleData} dataKey="count" outerRadius={60} />
                        <Pie
                            data={outerCircleData}
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
