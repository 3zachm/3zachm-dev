import { ReactElement, useState } from 'react'
import HomeHead from '../components/HomeHead'
import HomeLayout from '../layouts/HomeLayout'
import { Text } from '@nextui-org/react'
import { homeMain } from '../layouts/NavTemplates';
import { RiMoonFill } from 'react-icons/ri'
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { m } from 'framer-motion';

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
			<div
				className="p-5 flex flex-col items-center justify-center select-none relative md:min-w-[540px] min-h-[250px] md:max-w-[40vw] backdrop-blur bg-opacity-70 bg-zinc-900 rounded-3xl overflow-hidden"
			>
				<div className="absolute top-0 -right-[100px] -z-[1] min-w-full min-h-[800px]">
					<div
						style={{
							backgroundImage: `url(/img/danbooru_1369604.png)`,
							backgroundSize: '240px',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'right 40px top 30px',
							height: '400px',
						}}
					/>
				</div>
				<Text className="text-5xl font-Manrope text-white m-4">hello!!!</Text>
				<div className="flex-row flex items-center">
					<p className="text-xl"> i&apos;m zach, ur average 東方 cs dev </p>
					<m.div
						whileHover={{ scale: 1.1, filter: "drop-shadow(0px 0px 8px rgb(253 224 71))" }}
						whileTap={{ scale: 0.8 }}

						className="cursor-pointer pointer-events-auto"
					>
						<a id="patchouli-thing"><RiMoonFill className="text-xl ml-1 text-yellow-300" /></a>
					</m.div>
				</div>
			</div>
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
