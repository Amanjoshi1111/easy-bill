
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { TIME_SCALE } from "@/lib/constant";
import { DashboardGraphApiResponse, DashboardGraphDataEntry } from "@/lib/types";
import { dashboardGraphHref, formatCurrency } from "@/lib/utils";
import { userStore } from "@/store/store";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bar, CartesianGrid, XAxis, YAxis, BarChart, ResponsiveContainer } from "recharts";

export function UserGraph() {

    const btnIndex = userStore(state => state.btnIndex);
    const currency = userStore(state => state.currency);
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("totalRevenue");
    const [chartData, setChartData] = useState<DashboardGraphDataEntry[]>([]);
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
            color: "hsl(var(--chart-1))"
        },
        paidRevenue: {
            label: "Paid Revenue",
            color: "hsl(var(--chart-2))"
        },
        pendingRevenue: {
            label: "Pending Revenue",
            color: "hsl(var(--chart-3))"
        }
    } satisfies ChartConfig
    ), []);

    const total = useMemo(() => ({
        totalRevenue: chartData.reduce((acc, d) => acc + d.totalRevenue, 0),
        paidRevenue: chartData.reduce((acc, d) => acc + d.paidRevenue, 0),
        pendingRevenue: chartData.reduce((acc, d) => acc + d.pendingRevenue, 0)
    }), [chartData]);

    return <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>Bar Chart - Interactive</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 3 months
                </CardDescription>
            </div>
            <div className="flex">
                {["totalRevenue", "paidRevenue", "pendingRevenue"].map((key) => {
                    const chart = key as keyof typeof chartConfig
                    return (
                        <button
                            key={chart}
                            data-active={activeChart === chart}
                            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            onClick={() => setActiveChart(chart)}
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
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                });
                            }}
                        />
                        <YAxis domain={[0, 10000]} dataKey={"totalRevenue"} />
                        <ChartTooltip>

                        </ChartTooltip>
                        <Bar dataKey={activeChart} fill={`var(--color-${"totalAmount"})`} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
    </Card>
}
