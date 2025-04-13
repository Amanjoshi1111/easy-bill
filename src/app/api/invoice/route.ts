import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { NextResponse } from "next/server";

//TODO: Used this instead of server action to make page static
export async function GET() {
    const session = await userSession();
    const data = await prisma.invoice.findMany({
        where: {
            userId: session.user?.id
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            invoiceNumber: true,
            toName: true,
            total: true,
            status: true,
            dueDate: true,
            currency: true
        },
    })
    return NextResponse.json(data, { status: 200 });
}