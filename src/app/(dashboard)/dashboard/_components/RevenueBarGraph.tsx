
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { TIME_SCALE } from "@/lib/constant";
import { DashboardGraphApiResponse, DashboardGraphDataEntry } from "@/lib/types";
import { dashboardGraphHref, formatCurrency, formatDate, getAnalyticsDayFromTimeline } from "@/lib/utils";
import { userStore } from "@/store/store";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bar, CartesianGrid, XAxis, YAxis, BarChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export function RevenueBarGraph() {

    const btnIndex = userStore(state => state.btnIndex);
    const currency = userStore(state => state.currency);
    const [chartData, setChartData] = useState<DashboardGraphDataEntry[]>([]);
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>(() => {
        if (typeof window == "undefined")
            return "totalRevenue";
        return (localStorage.getItem("activeChart") as keyof typeof chartConfig) || "totalRevenue";

    });
    console.log({ activeChart }, "yoooo");
    useEffect(() => {
        console.log("Rerender");
        async function getGraphData() {
            const response = await fetch(dashboardGraphHref(btnIndex, currency, TIME_SCALE.DAILY));
            const data: DashboardGraphApiResponse = await response.json();
            if (!data.success) {
                notFound();
            }
            setChartData(data.data);
            console.log("API data", data.data);
            console.log("TOTAL", {
                totalRevenue: data.data.reduce((acc, d) => acc + d.totalRevenue, 0),
                paidRevenue: data.data.reduce((acc, d) => acc + d.paidRevenue, 0),
                pendingRevenue: data.data.reduce((acc, d) => acc + d.pendingRevenue, 0)
            });
        }
        getGraphData();
    }, [btnIndex, currency]);

    const chartConfig = useMemo(() => ({
        totalRevenue: {
            label: "Total Revenue",
            color: "var(--chart-3)"
        },
        paidRevenue: {
            label: "Paid Revenue",
            color: "var(--chart-2)"
        },
        pendingRevenue: {
            label: "Pending Revenue",
            color: "var(--chart-1)"
        },
        amount: {
            label: "Amount",
            color: "black"
        }
    } satisfies ChartConfig
    ), []);

    const total = useMemo(() => ({
        totalRevenue: chartData.reduce((acc, d) => acc + d.totalRevenue, 0),
        paidRevenue: chartData.reduce((acc, d) => acc + d.paidRevenue, 0),
        pendingRevenue: chartData.reduce((acc, d) => acc + d.pendingRevenue, 0)
    }), [chartData]);

    return <Card className="pt-0">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b-1 p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle className="text-xl">Bar Chart - Interactive</CardTitle>
                <CardDescription className="text-xs">
                    {`Showing daily revenue for last ${getAnalyticsDayFromTimeline(btnIndex)?.description}`}
                </CardDescription>
            </div>
            <div className="flex">
                {["totalRevenue", "paidRevenue", "pendingRevenue",].map((key) => {
                    const chart = key as keyof typeof chartConfig
                    return (
                        <button
                            key={chart}
                            data-active={activeChart === chart}
                            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-4 sm:py-0"
                            onClick={() => {
                                if (typeof window != "undefined") {
                                    localStorage.setItem("activeChart", chart);
                                }
                                setActiveChart(chart)
                            }}
                        >
                            <span className="text-xs text-muted-foreground">
                                {chartConfig[chart].label}
                            </span>
                            <span className="text-sm font-bold leading-none sm:text-md">
                                {formatCurrency(total[key as keyof typeof total], currency)}
                            </span>
                        </button>
                    )
                })}
            </div>
        </CardHeader>
        <CardContent >
            <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey={"date"}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-In", {
                                    month: "short",
                                    day: "numeric"
                                });
                            }}
                        />
                        <YAxis dataKey={"totalRevenue"}
                            scale={"log"}
                            domain={[1, 'auto']}
                            allowDataOverflow={true}
                        // domain={[0, (dataMax: number) => Math.min(dataMax, 20000 * 3)]} 
                        />
                        <Tooltip content={<CustomToolTip />} />
                        {/* <ChartTooltip content={
                            <ChartTooltipContent
                                className="w-[200px] text-md"
                                nameKey="amount"
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("en-In", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                }}
                            />
                        } /> */}
                        <Bar dataKey={activeChart} fill={`${chartConfig[activeChart]?.color}`} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
    </Card>
}

function CustomToolTip({ active, payload, label, }: TooltipProps<ValueType, NameType>) {

    const currency = userStore((state) => state.currency);

    console.log("BHAI BHAI BHAI", payload?.[0], payload?.[0]?.color);

    if (active && payload && payload.length) {
        return <div className="flex flex-col bg-white dark:bg-black p-2 rounded-md shadow-2xl shadow-gray-800 gap-2">
            <div className="font-bold">{(label != undefined) ? formatDate(new Date(label)) : ""}</div>
            <div className="flex justify-between gap-4">
                <div className="flex justify-between items-center gap-1">
                    <div className={` h-2.5 w-2.5 flex items-center justify-center rounded-xs`}
                        style={{ backgroundColor: payload[0].color }}
                    ></div>
                    <div className="font-medium text-muted-foreground">Amount</div>
                </div>
                <div>{formatCurrency(Number(payload[0].value), currency)}</div>
            </div>
        </div>
    }
    return null;
}