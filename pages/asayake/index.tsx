import { ReactElement, useState } from 'react'
import HomeHead from '../../components/HomeHead'
import HomeLayout from '../../layouts/HomeLayout'
import { Button, Text, Link as CardLink } from '@nextui-org/react'
import { homeMain } from '../../layouts/NavTemplates';
import { RiMoonFill } from 'react-icons/ri'
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { m } from 'framer-motion';
import { AnimationTemplate } from '../../types/Animation';
import Link from 'next/link';

const bgAnimation: AnimationTemplate = {
    name: "bg",
    variants: {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.5,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    }
}

const containerAnimation: AnimationTemplate = {
    name: "pop up",
    variants: {
        initial: {
            opacity: 0,
            position: 'relative',
        },
        animate: {
            width: ['325px', '525px'],
            borderRadius: ['60px', '24px'],
            scale: [0.8, 1.03, 1],
            opacity: 1,
            position: 'relative',
            transition: {
                delay: 0.8,
                delayChildren: 1.5,
                staggerChildren: 0.5,
                duration: 1.5,
                type: "spring",
                stiffness: 100,
            }
        },
        exit: {
            opacity: 0,
            position: 'relative',
            transition: {
                duration: 0.3
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
            transition: {
                duration: 0.3
            }
        }
    },
    transition: {
        duration: 2,
        ease: "easeInOut"
    }
}

const pfpAnimation: AnimationTemplate = {
    name: "pfp",
    variants: {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.5,
                delay: 1.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    }
}

const buttonAnimation: AnimationTemplate = {
    name: "button",
    variants: {
        initial: {
            opacity: 0,
            y: 4,
            position: 'relative',
        },
        animate: {
            scale: [0.8, 1],
            opacity: 1,
            y: 0,
            position: 'relative',
            transition: {
                delay: 1.9
            }
        },
        exit: {
            opacity: 0,
            y: -100,
            position: 'relative',
            transition: {
                duration: 0.3
            }
        }
    }
}

function Asayake() {
    return (
        <>
            <HomeHead title="3zachm.dev | Asayake" description="A color bot for discord" path="/asayake" />
            <m.div
                className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={bgAnimation.variants}
                style={{
                    backgroundImage: `url(/img/wp5179470.webp)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top',
                    backgroundSize: 'cover',
                }}
            />
            <m.div
                className="p-5 flex flex-col items-center justify-center select-none relative min-h-[450px] lg:max-w-[40vw] backdrop-blur bg-opacity-70 bg-zinc-900 rounded-3xl overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={containerAnimation.transition}
                variants={containerAnimation.variants}
            >
                <m.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pfpAnimation.variants}
                    style={{
                        width: '112px',
                        height: '112px',
                        borderRadius: '50%',
                        backgroundImage: `url(/img/asayake.webp)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                />
                <m.h1
                    className="text-5xl font-Manrope text-white m-4"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={textChildAnimation.transition}
                    variants={textChildAnimation.variants}
                >
                    asayake
                </m.h1>
                <div className="flex-row flex items-center">
                    <m.p
                        className="text-xl"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={textChildAnimation.transition}
                        variants={textChildAnimation.variants}
                    >
                        a simple per-user color bot for discord
                    </m.p>
                </div>
                <m.div
                    className="flex flex-row items-center justify-between w-[70%] mt-5"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={buttonAnimation.variants}
                >
                    <Link href="https://discord.com/api/oauth2/authorize?client_id=907538185976946720&permissions=268438528&scope=applications.commands%20bot" passHref>
                        <Button auto color="secondary">
                            <a className="text-white">
                                <m.p
                                    className="text-xl"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={textChildAnimation.variants}
                                >
                                    invite
                                </m.p>
                            </a>
                        </Button>
                    </Link>
                    <Link href="/asayake/legal" passHref>
                        <Button auto color="secondary">
                            <a className="text-white">
                                <m.p
                                    className="text-xl"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={textChildAnimation.variants}
                                >
                                    tos
                                </m.p>
                            </a>
                        </Button>
                    </Link>
                    <Link href="https://github.com/3zachm/colors-js" passHref>
                        <Button auto color="secondary">
                            <CardLink className="text-white">
                                <m.p
                                    className="text-xl"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={textChildAnimation.variants}
                                >
                                    github
                                </m.p>
                            </CardLink>
                        </Button>
                    </Link>
                </m.div>
            </m.div>
        </>
    )
}

Asayake.getLayout = function getLayout(page: ReactElement) {
    return (
        <HomeLayout navOptions={homeMain}>{page}</HomeLayout>
    )
}

export default Asayake;
