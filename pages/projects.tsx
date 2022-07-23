import { Grid, Row, Col, Button, Text, Link as CardLink, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import type { ReactElement } from 'react'
import ProjectCard from '../components/Cards/ProjectCard'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import Script from 'next/script'
import { homeMain } from '../layouts/NavTemplates';
import { AnimationTemplate } from '../types/Animation'
import { m } from 'framer-motion'

const containerAnimation: AnimationTemplate = {
	name: "float up",
	variants: {
		initial: {
			opacity: 0,
			y: 1000,
		},
		animate: {
			opacity: [0, 1, 1, 1],
			y: 0,
			transition: {
				delayChildren: 1.5,
				staggerChildren: 0.5,
				duration: 1.5,
				type: "spring",
				stiffness: 40,
			}
		},
		exit: {
			opacity: 0,
			y: -100,
			transition: {
				duration: 0.3
			}
		}
	},
}

function Projects() {
	return (
		<>
			<HomeHead title="3zachm.dev | Projects" description="my projects" path="projects" />
			<div className="w-screen pt-[200px] z-0 justify-center flex pointer-events-none">
				<m.div className="pl-5 pr-5"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={containerAnimation.variants}
				>
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
											<Link href='https://github.com/3zachm/colors-js' passHref>
												<CardLink>
													<Button flat auto rounded color="secondary" className="mr-2">
														<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
															Source
														</Text>
													</Button>
												</CardLink>
											</Link>
											<Link href='/asayake' passHref>
												<CardLink>
													<Button flat auto rounded color="secondary">
														<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
															Invite
														</Text>
													</Button>
												</CardLink>
											</Link>
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
											<Link href='/discord' passHref>
												<CardLink>
													<Button flat auto rounded color="secondary">
														<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
															Site
														</Text>
													</Button>
												</CardLink>
											</Link>
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
										<Link href='https://github.com/3zachm/recursive-reminders' passHref>
												<CardLink>
													<Button flat auto rounded color="secondary">
														<Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
																Invite
														</Text>
													</Button>
												</CardLink>
											</Link>
										</Row>
									</Col>
								</Row>
							</>} />
					</Grid>
				</m.div>
			</div>
		</>
	)
}

Projects.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout navOptions={homeMain}>{page}</HomeLayout>
	)
}

export default Projects
