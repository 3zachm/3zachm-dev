import { Collapse, Avatar, Loading, Button, Tooltip } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'

interface NavOption {
    label: string;
    href: string;
}

interface NavProps {
    options: NavOption[]
}

function Navbar({ options }: NavProps) {
    const { data: session } = useSession();
    const avatar = session && session.user && session.user.image ? session.user.image : '/img/icons/guest.png';
    const name = session && session.user && session.user.name ? session.user.name : 'Guest';
    const Navlist = <Button shadow auto color="primary" className="ml-5 mr-5" onClick={() => signOut()}>Sign out</Button>
    return (
        <>
            <div className="p-5 font-Manrope text-2xl hidden sm:flex justify-between items-center absolute z-[100] shadow-lg backdrop-blur bg-opacity-70 bg-zinc-900 w-screen pointer-events-none">
                <div className="flex items-center">
                    <Link key="anny logs" href="/"><a className="text-white pr-5 select-none pointer-events-auto">anny logs</a></Link>
                    <div className="border-l border-white h-12 left-1/2 ml-1 top-0 select-none"></div>
                </div>
                <div className="flex items-center">
                    {Navlist}
                    <Tooltip trigger="hover" content={name} placement="bottom">
                        <Avatar src={avatar} className="rounded-full h-12 w-12 pointer-events-auto" />
                    </Tooltip>
                </div>
            </div>
            <div className="sm:hidden w-screen bg-zinc-900 backdrop-blur bg-opacity-70 pointer-events-auto absolute z-10">
                <Collapse title="anny logs" className='pl-5 pr-5 flex flex-col pointer-events-auto'>
                    <div className="max-w-screen-sm p-0 flex items-center justify-center">
                        {Navlist}
                    </div>
                </Collapse>
            </div>
        </>
    )
}

export default Navbar;