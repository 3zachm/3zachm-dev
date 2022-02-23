import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from '../../../prisma/db';
import { moderators } from "../../../config";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
          })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, profile }) {
            if (profile) {
                token.discordId = profile.id;
            }
            return token;
        },
        async session({ session, token, user}) {
            if (token.discordId) {
                session.discordId = token.discordId;
                session.isMod = moderators.includes(token.discordId);
            }
            return session;
        }
    },
    pages: {
        signIn: '/signin',
    },
})