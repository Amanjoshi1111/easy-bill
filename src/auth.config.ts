import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
// import Nodemailer from "next-auth/providers/nodemailer"

export default {
    providers: [GitHub],
    callbacks: {
        jwt: ({ user, token }) => {
            if (user) {
                token.id = user.id
                token.isOnboarded = user.isOnboarded
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id as string
                session.user.isOnboarded = token.isOnboarded as boolean
            }
            return session;
        }
    },
} satisfies NextAuthConfig