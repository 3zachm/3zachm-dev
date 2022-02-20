import type { ReactElement } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { Text } from '@nextui-org/react'

function Home() {
	return (
		<>
			<HomeHead title="3zachm.dev | Hello" description="Hello" path="" />
			<Text h1 className="text-5xl text-white w-screen text-center">
				Hello
			</Text>
		</>
	)
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Home
