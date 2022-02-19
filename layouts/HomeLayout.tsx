import Navbar from '../components/Navbar';
import useScript from '../hooks/useScript';

interface HomeProps {
    children: React.ReactNode;
}

function HomeLayout(props: HomeProps) {
    const navOptions = [
        { label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Social', href: '/social' },
		{ label: 'Misc', href: '/misc' },
        { label: 'Patchouli?', href: 'javascript:spawn_patchy();' },
	]
    useScript('/js/home/patchy.js');
	useScript('/js/home/main.js');
    return (
            <body className="bg-zinc-800 min-h-screen text-white overflow-x-hidden overflow-y-scroll scroll-smooth w-screen">
                <Navbar options={navOptions} />
                <canvas width="900" height="500" id="main-bg" className="absolute"></canvas>
                <header id="main-header" className="h-screen">
                    <div id="main-header-center" className="min-h-screen w-full">
                        <div className="flex justify-center items-center min-h-screen h-full">
                            {props.children}
                        </div>
                    </div>
                </header>
            </body>
    );
}

export default HomeLayout;