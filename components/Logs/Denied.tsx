import { Button, Card, Modal, Text } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import router from "next/router";

function Denied() {
    return (
        <Modal
            className=""
            closeButton
            blur
            aria-labelledby="modal-title"
            open
            onClose={() => (router.push("/"))}
        >
            <Modal.Body>
                <div className="flex items-center justify-center">
                    <Text className="mb-5">
                        You aren&apos;t allowed to view this page
                    </Text>
                </div>
                <Button shadow auto color="primary" className="ml-5 mr-5" onClick={() => signOut()}>Sign out</Button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default Denied;