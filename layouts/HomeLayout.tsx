import Navbar from '../components/Navbar';
import useScript from 'react-script-hook';
import { useRouter } from 'next/router';
import { AnimatePresence, domAnimation, LazyMotion, m, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavTemplate } from '../layouts/NavTemplates';
import { AnimationTemplate } from '../types/Animation';

interface HomeProps {
    navOptions: NavTemplate[];
    children: React.ReactNode;
}

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

function HomeLayout(props: HomeProps) {
    // states
    const [isLoaded, setLoaded] = useState(false);
    const router = useRouter();
    // state functions
    useScript({src: '/js/home/patchy.js', checkForExisting: true,});
    useScript({src: '/js/home/main.js', checkForExisting: true,});
    useEffect(() => {
        setLoaded(true);
    }, []);
    // misc
    const navOptions = props.navOptions;

    if (!isLoaded) {
        return <></>;
    }
    return (
        <>
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
                        <header id="main-header" className="h-full">
                            <div id="main-header-center" className="min-h-screen w-full">
                                <div className="flex justify-center items-center min-h-screen h-full">
                                    {props.children}
                                </div>
                            </div>
                        </header>
                    </m.div>
                </AnimatePresence>
            </LazyMotion>
        </>
    );
}

export default HomeLayout;
