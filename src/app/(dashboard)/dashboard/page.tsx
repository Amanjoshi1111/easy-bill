import { userSession } from "@/hooks/sessionHook";
import { DashboardInfoCards } from "./_components/dashboardInfoCards";
import { UserGraph } from "./_components/userGraph";
import PaidInvoiceTable from "./_components/paidInvoicesTable";
import TimelineButton from "./_components/timelineButtons";
import { redirect } from "next/navigation";
import { idParamValidator } from "@/lib/types";
import { dashboardDataHref } from "@/lib/utils";


export default async function Dashboard({
    searchParams
}: {
    searchParams: Promise<{ id: number }>
}) {

    const { id } = await searchParams;
    const { success } = idParamValidator.safeParse(Number(id));
    if (!success) redirect(`/dashboard?id=0`);

    await userSession();

    try {
        const response = await fetch(dashboardDataHref(id));
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }

    return <>
        <div className="flex justify-between items-center pt-4 pb-8">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">Analytic Hub</div>
                <div className="text-muted-foreground">Stay on top of your metrics</div>
            </div>
            <TimelineButton idx={Number(id)} />
        </div>
        <DashboardInfoCards id={Number(id)} />
        <div className="grid grid-cols-[1fr] lg:grid-cols-[2.9fr_1.1fr] gap-4 pt-4">
            <UserGraph />
            <PaidInvoiceTable />
        </div>
    </>
}