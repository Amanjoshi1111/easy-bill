import { prisma } from "@/db";
import { userSession } from "./sessionHook";

export default async function isUserOnboarded() {

    const session = await userSession();
    const data = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            isOnboarded: true
        }
    });

    if (data?.isOnboarded == true) {
        return true;
    }
    return false;
}