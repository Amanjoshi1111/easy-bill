import { z } from "zod";

export type ResponseObject = {
    success: boolean,
    message: string
    errors?: Record<string, string>,
}

export const idParamValidator = z.number().min(0).max(3);
export type IdParamValidator = typeof idParamValidator;