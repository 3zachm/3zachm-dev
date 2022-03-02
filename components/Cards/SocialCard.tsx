import { Card, Text, Col, Row, Button, Link, Tooltip } from "@nextui-org/react";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { m, Variants } from "framer-motion";

const bannerAnimation: Variants = {
    initial: {
        opacity: 0,
        x: -10,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    },
}

const pfpAnimation: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.5,
        }
    },
}

const containerAnimation: Variants = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 2,
            delayChildren: 0.5,
            staggerChildren: 0.1,
        }
    },
}

const itemAnimation: Variants = {
    initial: {
        opacity: 0,
        x: 100,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
}

function SocialCard() {
    const copyButtonHandler: MouseEventHandler = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(
            e.currentTarget.innerHTML
        );
    }
    return (
        <Card cover shadow className='select-none relative md:min-w-[540px] min-h-[400px] md:max-w-[35vw]'>
            <Card.Body className="overflow-hidden">
                <m.div initial="initial" animate="animate" variants={bannerAnimation}>
                    <Card.Image
                        src='/img/banner.jpg'
                        height="400px"
                        width="100%"
                        alt="banner"
                        className="absolute"
                    />
                </m.div>
                <m.div initial="initial" animate="animate" variants={pfpAnimation}>
                    <div className="w-full h-full flex items-center justify-center absolute flex-col">
                        <div className="bg-pfp h-[128px] w-[128px] bg-cover bg-top rounded-[75px] z-1" />
                        <Text
                            size={28}
                            weight="normal"
                            color="#FFF"
                        >
                            3zachm
                        </Text>
                    </div>
                </m.div>


            </Card.Body>
            <Card.Footer
                blur
                css={{
                    position: 'absolute',
                    bgBlur: '#0f1114',
                    borderTop: '$borderWeights$light solid $gray600',
                    bottom: 0,
                    zIndex: 1
                }}
            >
                <Row>
                    <Col>
                        <m.div initial="initial" animate="animate" variants={containerAnimation}>
                            <Row justify="space-between">
                                <m.div variants={itemAnimation}>
                                    <Button flat auto rounded css={{ color: '#fff', bg: '#00b5d900' }} className="p-0 pr-1 pl-1 md:pl-5 md:pr-5">
                                        <Link className="text-white" href="https://twitter.com/3zachm">
                                            <Image src='/img/icons/twitter.png' alt='twitter' width="48px" height="48px"></Image>
                                        </Link>
                                    </Button>
                                </m.div>
                                <m.div variants={itemAnimation}>
                                    <Button flat auto rounded css={{ color: '#fff', bg: '#d90e0000' }} className="p-0 pr-1 pl-1 md:pl-5 md:pr-5">
                                        <Link className="text-white" href="https://youtube.com/3zachm">
                                            <Image src='/img/icons/youtube.png' alt='youtube' width="48px" height="48px"></Image>
                                        </Link>
                                    </Button>
                                </m.div>
                                <m.div variants={itemAnimation}>
                                    <Button flat auto rounded css={{ color: '#fff', bg: '#7e00d900' }} className="p-0 pr-1 pl-1 md:pl-5 md:pr-5">
                                        <Link className="text-white" href="https://twitch.tv/3zachm">
                                            <Image src='/img/icons/twitch.png' alt='twitch' width="40px" height="40px"></Image>
                                        </Link>
                                    </Button>
                                </m.div>
                                <m.div variants={itemAnimation}>
                                    <Tooltip content={'Copied!'} trigger="click" color="default">
                                        <Button flat auto rounded css={{ color: '#fff', bg: '#5865F200' }} onClick={copyButtonHandler} className="p-0 pr-1 pl-1 md:pl-5 md:pr-5">
                                            <Image src='/img/icons/discord2.png' alt='discord' width="48px" height="48px"></Image>
                                        </Button>
                                    </Tooltip>
                                </m.div>
                                <m.div variants={itemAnimation}>
                                    <Button flat auto rounded css={{ color: '#fff', bg: '#ff66aa00' }} className="p-0 pr-1 pl-1 md:pl-5 md:pr-5">
                                        <Link className="text-white" href="https://osu.ppy.sh/users/8630110">
                                            <Image src='/img/icons/osu.png' alt='osu' width="46px" height="46px"></Image>
                                        </Link>
                                    </Button>
                                </m.div>
                                <m.div variants={itemAnimation}>
                                    <Button flat auto rounded css={{ color: '#fff', bg: '#00000000' }} className="p-0 pr-1 pl-1 md:pl-5 md:pr-5">
                                        <Link className="text-white" href="https://steamcommunity.com/id/3zachm/">
                                            <Image src='/img/icons/steam.png' alt='steam' width="40px" height="40px"></Image>
                                        </Link>
                                    </Button>
                                </m.div>
                            </Row>
                        </m.div>
                    </Col>
                </Row >
            </Card.Footer >
        </Card >
    );
}

export default SocialCard;