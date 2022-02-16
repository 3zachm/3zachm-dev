import type { ReactElement } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'

function Social() {
	return (
		<>
			<HomeHead title="3zachm.dev | Socials" description="my socials" path="social" />
		</>
	)
}

Social.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Social
