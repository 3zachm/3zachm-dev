import { Button, Col, Modal, Row, Text } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import discord from "next-auth/providers/discord";
import router from "next/router";

interface SignInProps {
    callbackUrl: string;
}

function signin( props: SignInProps ) {
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
                <Text id="modal-title" b size={18}>
                    Welcome!
                </Text>
            </Modal.Header>
            <Modal.Body>
                <div className="flex items-center justify-center">
                    <Text className="mb-5">
                        You must be logged in with discord to view this page
                    </Text>
                </div>
                <Button auto onClick={() => (signIn("discord", { discord, callbackUrl: props.callbackUrl }))}>
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

export async function getServerSideProps({ query }: any) {
    const callbackUrl = query.callbackUrl;
    return {
        props: {
            callbackUrl
        }
    }
}

export default signin;