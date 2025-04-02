import { prisma } from "./db";
import NextAuth from "next-auth";
import { NODEMAILER_CONFIG } from "./lib/constant";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Nodemailer from "next-auth/providers/nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Nodemailer(NODEMAILER_CONFIG)
    ],
    pages: {
        verifyRequest: "/verify",
        error: "/loginError"
    }
})