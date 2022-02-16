import Navbar from '../components/Navbar';

interface HomeProps {
    children: React.ReactNode;
}

function HomeLayout(props: HomeProps) {
    const navOptions = [
        { label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Social', href: '/social' },
		{ label: 'Misc', href: '/misc' },
	]
    return (
        <>
            <body className="bg-black min-h-screen text-white overflow-hidden">
                <Navbar options={navOptions} />
                <header id="main-header" className="h-screen">
                    <div id="main-header-center" className="h-full w-full">
                        <div className="flex justify-center items-center h-full">
                            {props.children}
                        </div>
                    </div>
                </header>
            </body>
        </>
    );
}

export default HomeLayout;