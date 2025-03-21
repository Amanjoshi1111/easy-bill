export type ResponseObject = {
    success: boolean,
    message: string
    errors?: Record<string, string>,
}