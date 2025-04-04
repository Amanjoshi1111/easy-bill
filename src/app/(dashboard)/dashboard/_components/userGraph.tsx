
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export function UserGraph() {

    const chartData = [
        { month: "March", desktop: 237 },
        { month: "April", desktop: 200 },
        { month: "May", desktop: 209 },
        { month: "June", desktop: 214 },
        { month: "January", desktop: 186 },
        
        { month: "April", desktop: 200 },
        { month: "May", desktop: 90 },
        { month: "June", desktop: 100},
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
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
                <LineChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis dataKey="desktop" domain={[80]} />
                    <CartesianGrid stroke="#eee" strokeDasharray={"5 5"}/>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Line
                        dataKey="desktop"
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
