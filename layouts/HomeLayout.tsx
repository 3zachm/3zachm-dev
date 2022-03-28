import Navbar from '../components/Navbar';
import useScript from 'react-script-hook';
import { useRouter } from 'next/router';
import { AnimatePresence, domAnimation, LazyMotion, m, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavTemplate } from '../layouts/NavTemplates';
import { AnimationTemplate } from '../types/Animation';
import Knowledge from '../components/Knowledge';

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
            <LazyMotion features={domAnimation}>
                <AnimatePresence exitBeforeEnter>
                    <Navbar options={navOptions} />
                </AnimatePresence>
            </LazyMotion>
            <div
                className="w-screen h-screen fixed top-0 left-0"
                style={{
                    backgroundImage: 'url("/img/14687.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <Knowledge>
                <canvas width="1700" height="500" id="patchy-main" className="fixed" />
            </Knowledge>

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
