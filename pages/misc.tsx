import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import HomeHead from '../components/HomeHead'

const Misc: NextPage = () => {
	const navOptions = [
		{label: 'Projects', href: '/projects'},
		{label: 'Social', href: '/social'},
		{label: 'Misc', href: '/misc'},
	]
	return (
		<div className={styles.container}>
			<HomeHead title="3zachm.dev" description="misc" path="misc"/>
			<body className="bg-black min-h-full">
				<Navbar options = { navOptions } />
				<h1 className="text-3xl font-bold underline font-Manrope text-white">
					Misc
				</h1>
			</body>
		</div>
	)
}

export default Misc
