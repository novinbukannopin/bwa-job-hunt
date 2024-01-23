import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import {comparePassword} from "@/lib/utils";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const user = await prisma.company.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user) {
                    return null
                }

                const isMatch = await comparePassword(credentials?.password!!, user.password)

                if (isMatch) {
                    return user
                }

                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/sign-in",
        newUser: "/auth/sign-up"
    },
    callbacks: {
        jwt({token, account, user}) {
            if (account) {
                token.id = user.id
            }
            return token
        },
        async session({session, token, user}) {
            session.user.id = token.id
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}