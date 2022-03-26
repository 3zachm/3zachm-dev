import { Button, Modal } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactComponentElement, ReactElement } from "react";
import PatchyModal from "../components/Nav/PatchyModal";

const DefaultNavOption = ({ label, href }: { label: string, href: string }) : ReactElement => {
    return (
        <Link href={href} key={label}>
            <a className="text-white md:pl-5 md:pr-5 relative select-none pointer-events-auto pl-3 pr-3">{label}</a>
        </Link>
    )
}

interface NavTemplate {
    content: ReactComponentElement<any> | ReactElement;
}

const homeMain: NavTemplate[] = [
    { content: <DefaultNavOption label="Home" href="/"/> },
    { content: <DefaultNavOption label="Projects" href="/projects"/> },
    { content: <DefaultNavOption label="Social" href="/social"/> },
    { content: <DefaultNavOption label="Misc" href="/misc"/> },
    { content: <PatchyModal /> },
]

const yepMain: NavTemplate[] = [
    { content: <DefaultNavOption label="Home" href="/"/> },
    { content: <DefaultNavOption label="Patchouli?" href="#"/> },
]

const logMain: NavTemplate[] = [
    { content: <Button shadow auto color="primary" className="ml-5 mr-5" onClick={() => signOut()}>Sign out</Button> },
]

export {
    type NavTemplate,
    homeMain,
    yepMain,
    logMain,
}