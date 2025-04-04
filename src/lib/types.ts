import { Currency } from "@prisma/client";
import { z } from "zod";
import { defaultDashboardCardData } from "./constant";

export const dashboardCardQueryParamValidator = z.object({
    id: z.number().min(0).max(3),
    currency: z.nativeEnum(Currency)
})
export type IdParamValidator = typeof dashboardCardQueryParamValidator;
export type DashboardCardData = typeof defaultDashboardCardData;

export type DashboardCardApiResponse = {
    success: boolean,
    data: DashboardCardData
}