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
        <div>
            <body className="bg-black min-h-full">
                <Navbar options={navOptions} />
                <div className="container">
                    {props.children}
                </div>
            </body>
        </div>
    );
}

export default HomeLayout;