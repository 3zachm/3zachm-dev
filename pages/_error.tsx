import { m } from "framer-motion";
import { NextPageContext } from "next";
import { ReactElement } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { homeMain } from '../layouts/NavTemplates';
import { AnimationTemplate } from "../types/Animation";

let errorCode = 'Unknown Error';

interface ErrorProps {
    statusCode: number;
}

const containerAnimation: AnimationTemplate = {
    name: "pop in",
    variants: {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1,
                delayChildren: 0.5,
                staggerChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1,
                delayChildren: 0.5,
                staggerChildren: 0.1,
            }
        },
    },
}

const itemAnimation: AnimationTemplate = {
    name: "item",
    variants: {
        initial: {
            opacity: 0,
            y: -100,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.10,
                type: 'spring',
                stiffness: 100,
            }
        },
        exit: {
            opacity: 1,
            y: -100,
        }
    },
}

function Error(props: ErrorProps) {
    // if status exists, set error code to status string else set to unknown error
    props.statusCode ? errorCode = props.statusCode.toString() : errorCode = 'Unknown Error'
    return (
        <m.div className="h-screen w-screen fixed top-0 left-0 bg-black flex justify-center items-center" variants={containerAnimation.variants}>
            {
                Array.from(errorCode).map((char, index) => {
                    return (
                        <m.div key={index} className='text-9xl font-bold text-center' variants={itemAnimation.variants}>
                            {char}
                        </m.div>
                    );
                })
            }
        </m.div>
    );
}

Error.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout navOptions={homeMain}>{page}</HomeLayout>
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error;