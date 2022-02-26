import { Button, Col, Modal, Row, Text } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import discord from "next-auth/providers/discord";
import LogDash from "./LogDash";
import Denied from "./Denied";
import { Session } from "next-auth";
import { DiscordLogin } from "../../types/DiscordAuth";

function Main() {
    const router = useRouter();
    const { data: session, status: loading } = useSession();
    let discordLogin: DiscordLogin = {};
    if (session && session.user) {

        if (session.user.image) { discordLogin.avatar_url = session.user.image; }
        if (typeof session.discordId == 'string') { discordLogin.id = session.discordId; }
        if (session.isMod) {
            discordLogin.isMod = true;
            return (
                <LogDash profile={discordLogin}/>
            );
        }
        else {
            discordLogin.isMod = false
            return (
                <Denied />
            );
        }
    }
    return (
        <Text>
            You shouldn&apos;t be here...
        </Text>
    );
}

export default Main;