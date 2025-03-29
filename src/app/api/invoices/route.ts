import { prisma } from "@/db";
import { userSession } from "@/hooks/sessionHook";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await userSession();

    if (!session.user?.id) {
        return NextResponse.redirect(new URL("/login"))
        // return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }
    const data = await prisma.invoice.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            invoiceNumber: true,
            fromName: true,
            total: true,
            status: true,
            dueDate: true,
            currency: true
        }
    });
    return data;
}