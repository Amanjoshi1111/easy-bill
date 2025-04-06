import { z } from "zod";
import { defaultDashboardCardData, TIME_SCALE } from "./constant";

//Currency Type

//Dashboard card api related
export const dashboardCardQueryParamValidator = z.object({
    id: z.number().min(0).max(3),
    currency: z.string()
});
export type DashboardCardData = typeof defaultDashboardCardData;
export type DashboardCardApiResponse = {
    success: boolean,
    data: DashboardCardData
}

export type Currency = {
    id: number,
    name: string,
    rate: number,
    title: string | null
}

//Dashboard graph api related
export const dashboardGraphQueryParamValidator = z.object({
    ...dashboardCardQueryParamValidator.shape,
    range: z.nativeEnum(TIME_SCALE)
})
export type DashboardGraphDataEntry = {
    date: string,
    totalRevenue: number,
    paidRevenue: number,
    pendingRevenue: number
}
export type DashboardGraphApiResponse = {
    success: boolean,
    data: [DashboardGraphDataEntry]
}
