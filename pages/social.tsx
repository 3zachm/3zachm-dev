import type { ReactElement } from 'react'
import SocialCard from '../components/Cards/SocialCard'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { homeMain } from '../layouts/NavTemplates';

function Social() {
	return (
		<div className="w-screen flex items-center justify-center">
			<HomeHead title="3zachm.dev | Socials" description="my socials" path="social" />
			<SocialCard />
		</div>
	)
}

Social.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout navOptions={homeMain}>{page}</HomeLayout>
	)
}

export default Social
