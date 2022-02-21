import { Collapse } from '@nextui-org/react';
import Link from 'next/link'

interface NavOption {
    label: string;
    href: string;
}

interface NavProps {
    options: NavOption[]
}

function Navbar({ options }: NavProps) {
    const Navlist = options.map((option: NavOption) => (
        <Link href={option.href} key={option.label}>
            <a className="text-white pl-5 pr-5 relative select-none pointer-events-auto">{option.label}</a>
        </Link>
    ))
    return (
        <>
            <div className="p-5 font-Manrope text-2xl hidden md:flex items-center absolute z-[100] shadow-lg backdrop-blur bg-opacity-70 bg-zinc-900 w-screen pointer-events-none">
                <Link key="3zachm.dev" href="/"><a className="text-white pr-5 select-none pointer-events-auto">3zachm.dev</a></Link>
                <div className="border-l border-white h-12 left-1/2 ml-1 top-0 select-none"></div>
                {Navlist}
            </div>
            <div className="md:hidden w-screen bg-zinc-900 backdrop-blur bg-opacity-70 pl-5 pr-5 pointer-events-auto absolute z-10">
                <Collapse title="3zachm.dev" className='flex flex-col pointer-events-auto'>
                    <div className="max-w-screen-sm">
                        {Navlist}
                    </div>
                </Collapse>
            </div>
        </>
    )
}

export default Navbar;