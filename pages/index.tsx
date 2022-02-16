import type { ReactElement } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'

function Home() {
	return (
		<>
			<HomeHead title="3zachm.dev | Hello" description="Hello" path="" />
			<h1 className="text-5xl">hello</h1>
		</>
	)
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Home
