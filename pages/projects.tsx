import { Grid, Row, Col, Button, Text, Link as CardLink } from '@nextui-org/react'
import Link from 'next/link'
import type { ReactElement } from 'react'
import ProjectCard from '../components/Cards/ProjectCard'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'

function Projects() {
	return (
		<>
			<HomeHead title="3zachm.dev | Projects" description="my projects" path="projects" />
			<div className="max-w-5/12 min-w-[300px] pt-[25vh] z-0">
				<div className="flex flex-col">
					<Text h1 className="text-5xl text-white mb-20 self-center"> Projects </Text>
				</div>
				<div>
					<Grid className="w-[100%] mb-20">
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
