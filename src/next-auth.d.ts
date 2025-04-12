import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string
        isOnboarded: boolean
    }
    interface Session {
        user: {
            id: string
            isOnboarded: boolean

        } & DefaultSession["user"];
    }
}