import { ReactElement, useState } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { Text } from '@nextui-org/react'
import { homeMain } from '../layouts/NavTemplates';
import { RiMoonFill } from 'react-icons/ri'
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { m } from 'framer-motion';
import { AnimationTemplate } from '../types/Animation';

const containerAnimation: AnimationTemplate = {
	name: "pop up",
	variants: {
		initial: {
			opacity: 0,
			y: -100,
			position: 'relative',
		},
		animate: {
			width: ['325px', '525px'],
			borderRadius: ['1000px', '24px', '24px', '24px'],
			scale: [0.8, 1.03, 1],
			opacity: 1,
			y: 0,
			position: 'relative',
			transition: {
				delay: 0.8,
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
			position: 'relative',
			transition : {
				duration : 0.3
			}
		}
	},
	transition: {
		duration: 1.5,
		type: "spring",
		stiffness: 100,
	}
}

const textChildAnimation: AnimationTemplate = {
	name: "text child",
	variants: {
		initial: {
			opacity: 0,
			y: 20,
			position: 'relative',
		},
		animate: {
			scale: [0.8, 1],
			opacity: 1,
			y: 0,
			position: 'relative',
			transition: {
				delay: 1.2
			}
		},
		exit: {
			opacity: 0,
			y: -100,
			position: 'relative',
			transition : {
				duration : 0.3
			}
		}
	},
	transition: {
		duration: 2,
		ease: "easeInOut"
	}
}

const patchyChildAnimation: AnimationTemplate = {
	name: "patchy",
	variants: {
		initial: {
			opacity: 1,
			y: 50,
			position: 'relative',
		},
		animate: {
			scale: [1.06, 1],
			opacity: 1,
			y: 0,
			position: 'relative',
		},
		exit: {
			opacity: 0,
			y: 50,
			position: 'relative',
			transition : {
				duration : 0.3
			}
		}
	},
	transition: {
		delay: 1,
		duration: 1.3,
	}
}

function Home() {
	const [show, setShow] = useState(true)
	const [moonHover, setMoonHover] = useState(false)
	if (!show) {
		return (
			<>
				<HomeHead title="3zachm.dev | Hello" description="Hello" path="" />
			</>
		)
	}
	return (
		<>
			<HomeHead title="3zachm.dev | Hello" description="Hello" path="" />
			<m.div
				className="p-5 flex flex-col items-center justify-center select-none relative min-h-[250px] lg:max-w-[40vw] backdrop-blur bg-opacity-70 bg-zinc-900 rounded-3xl overflow-hidden"
				initial = "initial"
				animate = "animate"
				exit = "exit"
				transition = { containerAnimation.transition }
				variants = { containerAnimation.variants }
			>
				<div className="absolute top-0 -right-[100px] -z-[1] min-w-full min-h-[800px] md:opacity-100 opacity-60">
					<m.div
						initial = "initial"
						animate = "animate"
						exit = "exit"
						transition = { patchyChildAnimation.transition }
						variants = { patchyChildAnimation.variants }
						style={{
							backgroundImage: `url(/img/danbooru_1369604.png)`,
							backgroundSize: '240px',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'right 40px top 30px',
							height: '400px',
						}}
					/>
				</div>
				<m.h1
					className="text-5xl font-Manrope text-white m-4"
					initial = "initial"
					animate = "animate"
					exit = "exit"
					transition = { textChildAnimation.transition }
					variants = { textChildAnimation.variants }
				>
					hello!!!
				</m.h1>
				<div className="flex-row flex items-center">
					<m.p
						className="text-xl"
						initial = "initial"
						animate = "animate"
						exit = "exit"
						transition = { textChildAnimation.transition }
						variants = { textChildAnimation.variants }
					>
						i&apos;m zach, ur average 東方 cs dev
					</m.p>
					<m.div
						whileHover={{ scale: 1.1, filter: "drop-shadow(0px 0px 8px rgb(253 224 71))" }}
						whileTap={{ scale: 0.8 }}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={ textChildAnimation.transition }
						variants={ textChildAnimation.variants }

						className="cursor-pointer pointer-events-auto"
					>
						<a id="patchouli-thing"><RiMoonFill className="text-xl ml-1 text-yellow-300 pointer-events-none" /></a>
					</m.div>
				</div>
			</m.div>
			<div onClick={() => setShow(false)} className="text-zinc-400 absolute bottom-2 left-5 flex flex-row pointer-events-auto cursor-pointer items-center">
				<AiOutlineClose size="14px" className="mr-1" /><p className="text-sm"> click here to close text-box if you&apos;re only here for the patchys </p>
			</div>
		</>
	)
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<HomeLayout navOptions={homeMain}>{page}</HomeLayout>
	)
}

export default Home
