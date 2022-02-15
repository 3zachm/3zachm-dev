import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import HomeHead from '../components/HomeHead'

const Projects: NextPage = () => {
    const navOptions = [
        { label: 'Projects', href: '/projects' },
        { label: 'Social', href: '/social' },
        { label: 'Misc', href: '/misc' },
    ]
    return (
        <div className={styles.container}>
            <HomeHead title="3zachm.dev" description="my projects" path="projects" />
            <body className="bg-black min-h-full">
                <Navbar options={navOptions} />
                <h1 className="text-3xl font-bold underline font-Manrope text-white">
                    Projects
                </h1>
            </body>
        </div>
    )
}

export default Projects
