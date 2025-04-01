import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Banknote, CircleCheckBig, CircleX, FileText } from "lucide-react";

const cardInfo = [
    {
        idx: 0,
        title: "Total Revenue",
        amount: "$4000",
        footer: "Average daily revenue : $423",
        icon: <Banknote color="white" />,
        color: "bg-gradient-to-r from-green-500 to-green-600",
        hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
    },
    {
        idx: 1,
        title: "Invoice Issued",
        amount: "$4000",
        footer: "Average 335 invoices per day",
        icon: <FileText color="white" />,
        color: "bg-gradient-to-r from-blue-500 to-blue-600",
        hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
    },
    {
        idx: 2,
        title: "Paid Invoices",
        amount: "$4000",
        footer: "52.5% payment success rate",
        icon: <CircleCheckBig color="white" />,
        color: "bg-gradient-to-r from-purple-500 to-purple-600",
        hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-green-100"
    },
    {
        idx: 3,
        title: "Unpaid Invoices",
        amount: "$4000",
        footer: "Total pending amount: $12,233",
        icon: <CircleX color="white" />,
        color: "bg-gradient-to-r from-red-500 to-red-600",
        hoverColor: "hover:bg-gradient-to-r hover:from-white hover:to-red-100"
    },
]


export function DashboardInfoCards({ id }: { id: number }) {
    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cardInfo.map(data => (
            <InfoCard
                id={id}
                key={data.idx}
                {...data}
            />))}
    </div>
}

function InfoCard({ title, amount, footer, icon, color, hoverColor }: typeof cardInfo[0] & { id: number }) {

    return <Card className={cn(`drop-shadow-lg hover:drop-shadow-xl 
    outline-0 hover:outline-3 outline- hover:outline-white `, hoverColor)}>
        < CardContent className="flex gap-3 items-center" >
            <div className={cn("flex items-center justify-center h-11 w-11 rounded-lg", color)}>
                {icon}
            </div>
            <div className="flex flex-col">
                <div className="text-muted-foreground font-medium">{title}</div>
                <div className="text-2xl font-bold">{amount}</div>
            </div>
        </CardContent >
        <CardFooter>
            <div className="text-sm text-muted-foreground">  {footer}</div>
        </CardFooter>
    </Card >
}
