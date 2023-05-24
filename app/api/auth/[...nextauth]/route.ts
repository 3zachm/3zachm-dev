import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma/db"
import DiscordProvider from "next-auth/providers/discord"
import { moderators } from "@/site.config.js"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.discordId = profile.id;
        token.isMod = moderators.includes(String(token.discordId));
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.discordId) {
        session.discordId = token.discordId as string;
        session.isMod = token.isMod as boolean;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 30 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };