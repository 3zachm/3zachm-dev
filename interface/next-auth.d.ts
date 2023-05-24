import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    discordId: string;
    isMod: boolean;
  }
  interface Profile {
    id: string;
  }
}