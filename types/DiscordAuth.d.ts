type Session = import('next-auth/core/types').Session;
interface DiscordLogin {
    session?: Session;
    name?: string;
    id?: string;
    avatar_url?: string;
    discordId?: string;
    isMod?: boolean;
}

export {
    DiscordLogin
};