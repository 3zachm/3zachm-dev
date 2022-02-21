import type { ReactElement } from 'react'
import HomeHead from '../../components/HomeHead'
import HomeLayout from '../../layouts/HomeLayout'
import { Text } from '@nextui-org/react'
import { yepMain } from '../../layouts/NavTemplates';
import { PrismaClient } from '@prisma/client'
import UserCard from '../../components/Cards/Yep/UserCard';

function YepHome() {
	return (
		<>
			<HomeHead title="3zachm.dev | YEP" description="Counting YEPs since June 11th 2021" path="yep" />
			<Text h1 className="text-5xl text-white">
				<UserCard />
			</Text>
		</>
	)
}

YepHome.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout navOptions={yepMain}>{page}</HomeLayout>
	)
}

export default YepHome
