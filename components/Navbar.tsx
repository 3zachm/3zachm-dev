import Link from 'next/link'

interface NavOption {
    label: string;
    href: string;
}

interface NavProps {
    options: NavOption[]
}

function Navbar({ options }: NavProps) {
    const main = <Link key="3zachm.dev" href="/"><a className="text-white pr-5">3zachm.dev</a></Link>
    const separator = <div className="border-l border-white h-12 left-1/2 ml-1 top-0"></div>

    const Navlist = options.map((option: NavOption) => (
        <Link href={option.href} key={option.label}>
            <a className="text-white pl-5 pr-5 relative">{option.label}</a>
        </Link>
    ))

    return <div className="p-5 font-Manrope text-2xl flex items-center absolute">{main} {separator} {Navlist}</div>
}

export default Navbar;