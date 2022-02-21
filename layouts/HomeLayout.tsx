import Navbar from '../components/Navbar';
import useScript from '../hooks/useScript';
import { useRouter } from 'next/router';
import { AnimatePresence, domAnimation, LazyMotion, m, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavTemplate } from '../layouts/NavTemplates';
import { AnimationTemplate } from '../types/Animation';

interface HomeProps {
    navOptions: NavTemplate[];
    children: React.ReactNode;
}

function HomeLayout(props: HomeProps) {
    const [isLoaded, setLoaded] = useState(false);
    const router = useRouter();
    const animation: AnimationTemplate = {
        name: "fade in",
        variants: {
            initial: {
                opacity: 0,
                position: 'relative',
            },
            animate: {
                opacity: 1,
                x: 0,
                position: 'relative',

            },
            exit: {
                opacity: 0,
                position: 'relative',
            }
        },
        transition: {
            duration: 0.3
        }
    };
    const navOptions = props.navOptions;
    useScript('/js/home/patchy.js');
    useScript('/js/home/main.js');
    useEffect(() => {
        setLoaded(true);
    }, []);
    if (!isLoaded) {
        return <></>;
    }
    return (
        <body className="bg-zinc-800 min-h-screen text-white overflow-x-hidden overflow-y-scroll scroll-smooth w-screen invisible-scrollbar">
            <Navbar options={navOptions} />
            <canvas width="900" height="500" id="main-bg" className="fixed"></canvas>

            <LazyMotion features={domAnimation}>
                <AnimatePresence exitBeforeEnter>
                    <m.div key={router.route.concat(animation.name)}
                        className="page-wrap pointer-events-none"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animation.variants}
                        transition={animation.transition}>
                        <header id="main-header" className="h-screen">
                            <div id="main-header-center" className="min-h-screen w-full">
                                <div className="flex justify-center items-center min-h-screen h-full">
                                    {props.children}
                                </div>
                            </div>
                        </header>
                    </m.div>
                </AnimatePresence>
            </LazyMotion>
        </body >
    );
}

export default HomeLayout;
