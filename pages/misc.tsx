import { Card, Col, Grid, Row, Text } from '@nextui-org/react'
import type { ReactElement } from 'react'
import MiscCard from '../components/Cards/MiscCard';
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { homeMain } from '../layouts/NavTemplates';

function Misc() {
	const list = [
		{
			title: 'YEP Counter',
			img: '/img/misc/yepthumb.webp',
			url: '/yep',
		},
		{
			title: 'Emote Lister',
			img: '/img/misc/xqc.webp',
			url: '/emotes',
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
			<div className="w-screen z-0 justify-center flex pointer-events-none">
				<div className="max-w-[100%] min-w-[50vw] justify-start flex flex-row pt-[60px]">
					{/* <div className="min-w-[50vw] items-center flex justify-center pt-0">
						<Text h1 size={60} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white self-center select-none p-5 mb-[110px]">
							Pages
						</Text>
					</div> */}
					<Grid.Container gap={2} justify="flex-start">
							{list.map((item, index) => (
								<Grid xs={6} sm={4} key={index}>
									<MiscCard item={item} />
								</Grid>
							))}
					</Grid.Container>
				</div>
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
