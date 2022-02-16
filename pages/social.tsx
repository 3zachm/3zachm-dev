import type { ReactElement } from 'react'
import SocialCard from '../components/Cards/SocialCard'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'

function Social() {
	return (
		<>
			<HomeHead title="3zachm.dev | Socials" description="my socials" path="social" />
			<SocialCard />
		</>
	)
}

Social.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Social
