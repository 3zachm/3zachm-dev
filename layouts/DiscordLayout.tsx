import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { AnimatePresence, domAnimation, LazyMotion, m, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavTemplate } from '../layouts/NavTemplates';
import { AnimationTemplate } from '../types/Animation';

interface DiscordProps {
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

function DiscordLayout(props: DiscordProps) {
    // states
    const [isLoaded, setLoaded] = useState(false);
    const router = useRouter();
    // state functions
    useEffect(() => {
        setLoaded(true);
    }, []);
    // misc

    if (!isLoaded) {
        return <></>;
    }
    return (
        <>
            <LazyMotion features={domAnimation}>
                <AnimatePresence exitBeforeEnter>
                    <m.div key={router.route.concat(animation.name)}
                        className="page-wrap"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animation.variants}
                        transition={animation.transition}>
                        <div className="flex flex-row select-none">
                            {props.children}
                        </div>
                    </m.div>
                </AnimatePresence>
            </LazyMotion>
        </>
    );
}

export default DiscordLayout;
