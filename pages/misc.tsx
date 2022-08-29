import { Card, Col, Grid, Row, Text } from '@nextui-org/react'
import type { ReactElement } from 'react'
import MiscCard from '../components/Cards/MiscCard';
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { homeMain } from '../layouts/NavTemplates';
import { m, Variants } from "framer-motion";

const containerAnimation: Variants = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 2,
            delayChildren: 0.5,
            staggerChildren: 0.1,
        }
    },
}

const itemAnimation: Variants = {
    initial: {
        opacity: 0,
        x: 100,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
}

function Misc() {
	const list = [
		{
			title: 'Discord Previewer',
			img: '/img/misc/preview.webp',
			url: '/discord',
		},
		{
			title: 'asayake',
			img: '/img/misc/asa.webp',
			url: '/asayake',
		},
		{
			title: '404',
			img: '/img/misc/yepthumb.webp',
			url: '/_error',
		},
		{
			title: 'secret stuff >:)',
			img: '/img/misc/xqc.webp',
			url: '/logs',
		},
		{
			title: 'ぬくぬくにぎりめし',
			img: '/img/misc/nkng.webp',
			url: 'https://twitter.com/NKNK_NGRMS',
		},
	];
	return (
		<>
			<HomeHead title="3zachm.dev | Misc" description="misc" path="misc" />
			<div className="w-screen md:w-[75vw]  z-0 justify-center flex pointer-events-none">
				<m.div initial="initial" animate="animate" variants={containerAnimation} className="max-w-[100%] min-w-[50vw] justify-start flex flex-row pt-[60px]">
					<Grid.Container gap={2} justify="flex-start">
							{list.map((item, index) => (
								<Grid xs={6} sm={4} key={index} className="flex justify-center">
									<m.div variants={itemAnimation}>
										<MiscCard item={item} />
									</m.div>
								</Grid>
							))}
					</Grid.Container>
				</m.div>
			</div>
		</>
	)
}

Misc.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout navOptions={homeMain}>{page}</HomeLayout>
	)
}

export default Misc
