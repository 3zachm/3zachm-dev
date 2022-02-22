import { Button, Col, Modal, Row, Text } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import discord from "next-auth/providers/discord";

function Main() {
    const router = useRouter();
    const { data: session, status: loading } = useSession();
    if (session && session.user) {
        return (
            <div className="flex flex-col max-w-[600px] min-w-[27vw] bg-black rounded-md p-10 z-[10] shadow-lg backdrop-blur bg-opacity-40 justify-center select-none">
                <Text size={30} className="text-white">
                    Test card :D
                </Text>
                <div className="w-100 flex flex-row items-baseline justify-start">
                    <Text h1 size={90} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white pr-4">
                        {session.user.name}
                    </Text>
                </div>
                <div className="w-100 flex flex-row items-baseline justify-start">
                    <Text h1 size={70} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white pr-4">
                        <Image src={session.user.image} alt="pic" width="128px" height="128px"></Image>
                    </Text>
                </div>
                <Button onClick={() => signOut()} className="mt-10" size="lg" color="error">
                    Log out
                </Button>
            </div>
        );
    }
    return (
        <Modal
            className=""
            closeButton
            blur
            aria-labelledby="modal-title"
            open
            onClose={() => (router.push("/"))}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Welcome!
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Text className="mb-5">
                    You must be logged in with discord to view the logs.
                </Text>
                <Button auto onClick={() => (signIn("discord", { discord }))}>
                    <Image src="/img/icons/discord_icon.svg" alt='discord logo' height="28x" width="28px" className="" />
                    <Text size={20} className="pl-2">
                        Log in
                    </Text>
                </Button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default Main;