
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TIME_SCALE } from "@/lib/constant";
import { DashboardGraphApiResponse } from "@/lib/types";
import { dashboardGraphHref } from "@/lib/utils";
import { userStore } from "@/store/store";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export function UserGraph() {

    const btnIndex = userStore(state => state.btnIndex);
    const currency = userStore(state => state.currency);
    const graphData = userStore(state => state.graphData);
    const setGraphData = userStore(state => state.setGraphData);
    useEffect(() => {
        async function getGraphData() {
            const response = await fetch(dashboardGraphHref(btnIndex, currency, TIME_SCALE.DAILY));
            const data: DashboardGraphApiResponse = await response.json();
            if (!data.success) {
                notFound();
            }
            console.log("API data", data.data);
            setGraphData(data.data);
        }
        getGraphData();
    }, [btnIndex, currency, setGraphData]);

    // const chartData = [
    //     { month: "March", desktop: 237 },
    //     { month: "April", desktop: 200 },
    //     { month: "May", desktop: 209 },
    //     { month: "June", desktop: 214 },
    //     { month: "January", desktop: 186 },

    //     { month: "April", desktop: 200 },
    //     { month: "May", desktop: 90 },
    //     { month: "June", desktop: 100 },
    // ]
    console.log(graphData);

    const chartConfig = {
        desktop: {
            label: "amount",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig

    return <Card>
        <CardHeader>
            <CardTitle className="text-2xl" >
                Analytics Dashboard
            </CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
                <LineChart data={graphData}>
                    <XAxis dataKey="time" />
                    <YAxis dataKey="amount" domain={[80]} />
                    <CartesianGrid stroke="#eee" strokeDasharray={"5 5"} />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Line
                        dataKey="amount"
                        type="linear"
                        stroke="green"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ChartContainer>
        </CardContent>
    </Card>
}
