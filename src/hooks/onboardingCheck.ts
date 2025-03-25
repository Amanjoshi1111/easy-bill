import { prisma } from "@/db";

export default async function isUserOnboarded(userId: string) {

    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            isOnboarded: true
        }
    });

    if(data?.isOnboarded == true){
        return true;
    }
    return false;
}