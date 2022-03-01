import Redis from "ioredis";

let redis = new Redis(process.env.REDIS_URL);

async function applyCache(key: string, url: string, cacheTime: number) {
    if (await redis.get(key)) {
        return JSON.parse(await redis.get(key) as string);
    }
    else {
        const response = await fetchEndpoint(url);
        if (response.data) {
            await redis.set(key, JSON.stringify(response.data), "EX", cacheTime);
        }
        return response.data;
    }
}

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
        await redis.set("TWITCH.RATE_LIMIT", "1", "EX", 1);
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

async function getUserByName(username: string) {
    return await applyCache("TWITCH.USER_" + username, `https://api.twitch.tv/helix/users?login=${username}`, 600);
}

async function getUserByID(userID: string) {
    return await applyCache("TWITCH.USER_" + userID, `https://api.twitch.tv/helix/users?id=${userID}`, 600);
}

async function getChannelBadges(channelID: string) {
    return await applyCache("TWITCH.CHANNEL_BADGES_" + channelID, `https://api.twitch.tv/helix/chat/badges?broadcaster_id=${channelID}`, 600);

}

async function getGlobalBadges() {
    return await applyCache("TWITCH.GLOBAL_BADGES", `https://api.twitch.tv/helix/chat/badges/global`, 3600);
}

async function getVideos(userID: string) {
    return await applyCache("TWITCH.VIDEOS_" + userID, `https://api.twitch.tv/helix/videos?user_id=${userID}?limit=100`, 360);
}

export {
    getUserByID,
    getUserByName,
    getChannelBadges,
    getGlobalBadges,
    getVideos,
}