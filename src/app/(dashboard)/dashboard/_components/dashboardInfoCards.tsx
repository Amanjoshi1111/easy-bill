import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TIMELINE_BUTTON_TEXTS } from "@/lib/constant";
import { Camera } from "lucide-react";

const cardInfo = [
    {
        id: 0,
        title: "Total Revenue",
        amount: "$4000",
        footer: "Average daily revenue : $423"
    },
    {
        id: 1,
        title: "Invoice Issued",
        amount: "$4000",
        footer: "Based on last "
    },
    {
        id: 2,
        title: "Paid Invoices",
        amount: "$4000",
        footer: "Based on last "
    },
    {
        id: 3,
        title: "Unpaid Invoices",
        amount: "$4000",
        footer: "Based on last "
    },
]

export function DashboardInfoCards({ id }: { id: string }) {
    return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cardInfo.map(data => (
            <InfoCard
                id={id}
                key={data.id}
                title={data.title}
                amount={data.amount}
                footer={data.footer}
            />))}
    </div>
}

function InfoCard({ title, amount, id, footer }: { title: string, amount: string, id: string, footer: string }) {

    return <Card className="drop-shadow-lg hover:drop-shadow-2xl border-0">
        <CardContent className="flex gap-3 items-center ">
            <div className="flex items-center justify-center bg-green-600 h-11 w-11 rounded-lg"><Camera color="white" /></div>
            <div className="flex flex-col">
                <div className="text-muted-foreground font-medium">{title}</div>
                <div className="text-2xl font-bold">{amount}</div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="text-sm text-muted-foreground">  {footer}</div>
        </CardFooter>
    </Card>
}
