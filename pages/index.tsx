import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import HomeHead from '../components/HomeHead'

const Home: NextPage = () => {
	const navOptions = [
		{ label: 'Projects', href: '/projects' },
		{ label: 'Social', href: '/social' },
		{ label: 'Misc', href: '/misc' },
	]
	return (
		<div>
			<HomeHead title="3zachm.dev" description="Hello" path="" />
			<body className="bg-black min-h-full">
				<Navbar options={navOptions} />
				<h1 className="text-3xl font-bold underline font-Manrope text-white">
					Home
				</h1>
			</body>
		</div>
	)
}

export default Home
