import type { ReactElement } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { Text } from '@nextui-org/react'
import { homeMain } from '../layouts/NavTemplates';

function Home() {
	return (
		<>
			<HomeHead title="3zachm.dev | Hello" description="Hello" path="" />
			<Text h1 className="text-5xl text-white w-screen text-center select-none">
				hello
			</Text>
		</>
	)
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout navOptions={homeMain}>{page}</HomeLayout>
	)
}

export default Home
