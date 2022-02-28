import Redis from "ioredis";

let redis = new Redis(process.env.REDIS_URL);

async function authTwitch() {
    let auth = await redis.get("TWITCH.OAUTH");
    if (auth) {
        return auth;
    }
    else {
        const response = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, {
            method: "POST",
        })
        const json = await response.json();
        await redis.set("TWITCH.OAUTH", json.access_token, "EX", json.expires_in);

        return json.access_token;
    }
}

async function fetchEndpoint(url: string) {
    if (await redis.get("TWITCH.RATE_LIMIT")) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    else {
        await redis.set("TWITCH.RATE_LIMIT", "1", "EX", 2);
    }
    const auth = await authTwitch();
    const requestHeaders = new Headers();
    if (process.env.TWITCH_CLIENT_ID) {
        requestHeaders.append("Client-ID", process.env.TWITCH_CLIENT_ID);
        requestHeaders.append("Authorization", `Bearer ${auth}`);
    }
    const response = await fetch(
        url, {
        headers: requestHeaders,
    })
    const json = await response.json();
    return json;
}

async function getUserByName(username: string | undefined) {
    if (!username) {
        return;
    }
    const response = await fetchEndpoint(`https://api.twitch.tv/helix/users?login=${username}`);
    return response.data;
}

async function getUserByID(userID: number) {
    const response = await fetchEndpoint(`https://api.twitch.tv/helix/users?id=${userID}`);
    return response.data;
}

async function getChannelBadges(channelID: number) {
    const response = await fetchEndpoint(`https://api.twitch.tv/helix/chat/badges?broadcaster_id=${channelID}`);
    return response.data;
}

async function getGlobalBadges() {
    const response = await fetchEndpoint(`https://api.twitch.tv/helix/chat/badges/global`);
    return response.data;
}

export {
    getUserByID,
    getUserByName,
    getChannelBadges,
    getGlobalBadges,
}