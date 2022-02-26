import Navbar from '../components/Logs/Navbar';
import useScript from '../hooks/useScript';
import { useRouter } from 'next/router';
import { AnimatePresence, domAnimation, LazyMotion, m, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimationTemplate } from '../types/Animation';

interface LogsProps {
    children: React.ReactNode;
}

function LogsLayout(props: LogsProps) {
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
    return (
        <>
            <Navbar options={[]}/>
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
        </>
    );
}

export default LogsLayout;
