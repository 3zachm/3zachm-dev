import { Collapse } from '@nextui-org/react';
import Link from 'next/link'
import React from 'react';
import { NavTemplate } from '../layouts/NavTemplates';

interface NavProps {
    options: NavTemplate[]
}

function Navbar({ options }: NavProps) {
    const [navList, setNavList] = React.useState(options);
    return (
        <>
            <div className="p-5 font-Manrope text-2xl hidden sm:flex items-center z-[100] shadow-lg backdrop-blur bg-opacity-70 bg-zinc-900 w-screen pointer-events-none fixed">
                <Link key="3zachm.dev" href="/"><a className="text-white pr-5 select-none pointer-events-auto">3zachm.dev</a></Link>
                <div className="border-l border-white h-12 left-1/2 ml-1 top-0 select-none"></div>
                {navList.map((nav, index) => (
                    <React.Fragment key={index}>
                        { nav.content }
                    </React.Fragment>
                ))}
            </div>
            <div className="sm:hidden w-screen backdrop-blur bg-opacity-50 bg-zinc-900 pointer-events-auto absolute z-10 flex items-center justify-center h-[7vh]">
                <div className='pl-5 pr-5 flex flex-col pointer-events-auto'>
                    <div className="max-w-screen-sm p-0 flex items-center justify-center">
                        {navList.map((nav, index) => (
                            <React.Fragment key={index}>
                                { nav.content }
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;