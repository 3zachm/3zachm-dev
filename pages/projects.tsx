import { Grid, Row, Col, Button, Text, Link as CardLink } from '@nextui-org/react'
import Link from 'next/link'
import type { ReactElement } from 'react'
import ProjectCard from '../components/Cards/ProjectCard'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import Script from 'next/script'

function Projects() {
	return (
		<>
			<HomeHead title="3zachm.dev | Projects" description="my projects" path="projects" />
			<div className="w-screen pt-[200px] z-0 justify-center flex pointer-events-none">
				<div>
					<div className="flex justify-center">
						<Text h1 size={60} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white mb-[110px] self-center select-none">
							Projects
						</Text>
					</div>
					<Grid className="w-[100%] mb-20 select-none">
						<ProjectCard image='/img/proj/asayake.webp' bgBlur='#000000' borderTop='$borderWeights$light solid rgba(255, 255, 255, 0.2)' content={
							<>
								<Row>
									<Col>
										<Text color="#fff" className="font-Manrope" size={24}>asayake</Text>
									</Col>
									<Col>
										<Row justify="flex-end">
											<Button flat auto rounded color="secondary" className="mr-2">
												<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
													<Link href='https://github.com/3zachm/colors-js' passHref>
														<CardLink block color="secondary">Source</CardLink>
													</Link>
												</Text>
											</Button>
											<Button flat auto rounded color="secondary">
												<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
													<Link href='/asayake' passHref>
														<CardLink block color="secondary">Invite</CardLink>
													</Link>
												</Text>
											</Button>
										</Row>
									</Col>
								</Row>
							</>} />
					</Grid>
					<Grid className="w-[100%] mb-20">
						<ProjectCard image='/img/proj/discord.webp' bgBlur='#000000' borderTop='$borderWeights$light solid rgba(255, 255, 255, 0.2)' content={
							<>
								<Row>
									<Col>
										<Text color="#fff" className="font-Manrope" size={24}>discord previewer</Text>
									</Col>
									<Col>
										<Row justify="flex-end">
											<Button flat auto rounded color="secondary">
												<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
													<Link href='/discord' passHref>
														<CardLink block color="secondary">Link</CardLink>
													</Link>
												</Text>
											</Button>
										</Row>
									</Col>
								</Row>
							</>} />
					</Grid>
					<Grid className="w-[100%] mb-20">
						<ProjectCard image='/img/proj/ranks.webp' bgBlur='#000000' borderTop='$borderWeights$light solid rgba(255, 255, 255, 0.2)' content={
							<>
								<Row>
									<Col>
										<Text color="#fff" className="font-Manrope" size={24}>osu!ranks</Text>
									</Col>
									<Col>
										<Row justify="flex-end">
											<Button flat auto rounded color="secondary">
												<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
													<Link href='/osuranks' passHref>
														<CardLink block color="secondary">Link</CardLink>
													</Link>
												</Text>
											</Button>
										</Row>
									</Col>
								</Row>
							</>} />
					</Grid>
					<Grid className="w-[100%] mb-20">
						<ProjectCard image='/img/proj/youmu.webp' bgBlur='#000000' borderTop='$borderWeights$light solid rgba(255, 255, 255, 0.2)' content={
							<>
								<Row>
									<Col>
										<Text color="#fff" className="font-Manrope" size={24}>youmu</Text>
									</Col>
									<Col>
										<Row justify="flex-end">
											<Button flat auto rounded color="secondary">
												<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
													<Link href='/youmu' passHref>
														<CardLink block color="secondary">Invite</CardLink>
													</Link>
												</Text>
											</Button>
										</Row>
									</Col>
								</Row>
							</>} />
					</Grid>
				</div>
			</div>
		</>
	)
}

Projects.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout>{page}</HomeLayout>
	)
}

export default Projects
