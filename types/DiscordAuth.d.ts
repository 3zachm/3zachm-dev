type Session = import('next-auth/core/types').Session;
interface DiscordSession {
    session: Session | null;
    discordId: string | unknown;
}

export {
    DiscordSession
};