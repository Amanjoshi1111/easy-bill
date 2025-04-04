import { Currency } from "@prisma/client";
import { z } from "zod";
import { defaultDashboardCardData, defaultGraphDataEntry, TIME_SCALE } from "./constant";

//Dashboard card api related
export const dashboardCardQueryParamValidator = z.object({
    id: z.number().min(0).max(3),
    currency: z.nativeEnum(Currency)
});
export type DashboardCardData = typeof defaultDashboardCardData;
export type DashboardCardApiResponse = {
    success: boolean,
    data: DashboardCardData
}

//Dashboard graph api related
export const dashboardGraphQueryParamValidator = z.object({
    ...dashboardCardQueryParamValidator.shape,
    range: z.nativeEnum(TIME_SCALE)
})
export type DashboardGraphDataEntry = typeof defaultGraphDataEntry;
export type DashboardGraphApiResponse = {
    success: boolean,
    data: [DashboardGraphDataEntry]
}
