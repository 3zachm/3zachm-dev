import type { ReactElement } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'

function Projects() {
	return (
		<>
			<HomeHead title="3zachm.dev | Projects" description="my projects" path="projects" />
		</>
	)
}

Projects.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Projects
