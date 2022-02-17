import type { ReactElement } from 'react'
import HomeHead from '../../components/HomeHead'
import HomeLayout from '../../layouts/HomeLayout'
import { Text } from '@nextui-org/react'

function Home() {
	return (
		<>
			<HomeHead title="3zachm.dev | YEP" description="Counting YEPs since June 11th 2021" path="yep" />
			<Text h1 className="text-5xl text-white">
				YEP div
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
