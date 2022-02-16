import type { ReactElement } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'

function Misc() {
	return (
		<>
			<HomeHead title="3zachm.dev | Misc" description="misc" path="misc" />
		</>
	)
}

Misc.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Misc
