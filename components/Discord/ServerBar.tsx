import { List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Button } from "@mui/material";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { BsGearFill } from 'react-icons/bs';
import { useRouter } from "next/router";
import { Point, Area } from "react-easy-crop/types";
import Output from "./Output";

interface ServerProps {
    AvatarResult: {
        croppedArea: Area;
        aspectRatio: number;
        imageSrc: any;
    },
}

function ServerBar(props: ServerProps) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const boldText = {
        fontWeight: "bold",
        fontSize: "15px"
    };

    return (
        <div className="h-screen w-60 flex flex-col justify-between bg-white dark:bg-[#2f3136] ">
            <svg viewBox="0 0 1 1" aria-hidden="true" className="absolute pointer-events-none -top-[1px] -left-[1px] w-[1px] h-[1px]">
                <mask id="svg-mask-status-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.125" y="0.375" width="0.75" height="0.25" rx="0.125" ry="0.125"></rect></mask>
                <mask id="svg-mask-avatar-status-round-32" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><circle fill="black" cx="0.84375" cy="0.84375" r="0.25"></circle></mask>
                <mask id="svg-mask-avatar-status-round-80" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><circle fill="black" cx="0.85" cy="0.85" r="0.175"></circle></mask>
                <mask id="svg-mask-avatar-status-round-80" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><circle fill="black" cx="0.85" cy="0.85" r="0.175"></circle></mask>
            </svg>
            <div>
                <header>
                    <List
                        component="nav"
                        aria-label="Device settings"
                        className="border-b border-[#25272b] dark:bg-[#2f3136]"
                        sx={{ height: '48px', }}
                    >
                        <ListItem
                            button
                            id="lock-button"
                            aria-haspopup="listbox"
                            aria-controls="lock-menu"
                            aria-label="3zachm's Server'"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickListItem}
                            sx={{ height: '32px' }}
                        >
                            <ListItemText
                                primaryTypographyProps={{ style: boldText }}
                                primary="3zachm's Server"
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        <MenuItem sx={{ width: 200, maxWidth: '100%' }} onClick={(e) => { router.push('/'); handleClose(); }}>
                            <ListItemText>Home</ListItemText>
                            <ListItemIcon>
                                <BsFillArrowLeftCircleFill />
                            </ListItemIcon>
                        </MenuItem>
                    </Menu>
                </header>
            </div>
            <ul className=" h-full">
                <li className="pt-4">
                    <div className="relative flex items-center justify-between flex-row h-6 pr-2 pl-4 box-border text-[#8e9297] uppercase font-semibold text-sm" role="listitem">
                        <div tabIndex={-1} aria-label="Text Channels (category)" aria-expanded="true" role="button">
                            <svg width="24" height="24" viewBox="0 0 24 24" className="absolute left-[2px] top-[6px] w-3 h-3">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>
                            </svg>
                            <h2>
                                <div>Text Channels</div>
                            </h2>
                        </div>
                    </div>
                </li>
                <li data-dnd-name="general" draggable="true">
                    <div role="listitem" className="p-[1px] overflow-visible relative">
                        <div className="relative box-border pr-2 pl-2 rounded ml-2 flex items-center flex-row text-sm text-[#8e9297] font-semibold">
                            <a href="# " role="link" tabIndex={-1} aria-label="general (text channel)" className="flex flex-row items-center min-w-0">
                                <div aria-label="Text" role="img" className="mr-2">
                                    <svg width="18" height="18" viewBox="0 0 20 20">
                                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>
                                    </svg>
                                </div>
                                <div aria-hidden="true">
                                    <div>general</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="pt-4">
                    <div className="relative flex items-center justify-between flex-row h-6 pr-2 pl-4 box-border text-[#8e9297] uppercase font-semibold text-sm" role="listitem">
                        <div tabIndex={-1} aria-label="Text Channels (category)" aria-expanded="true" role="button">
                            <svg width="24" height="24" viewBox="0 0 24 24" className="absolute left-[2px] top-[6px] w-3 h-3">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>
                            </svg>
                            <h2>
                                <div>Voice Channels</div>
                            </h2>
                        </div>
                    </div>
                </li>
                <li className="relative" data-dnd-name="General" draggable="true">
                    <div>
                        <div className="pt-[1px] pb-2 relative overflow-visible" role="listitem">
                            <div className="relative box-border pr-2 pl-2 rounded ml-2 flex items-center flex-row text-sm text-[#8e9297] font-semibold">
                                <a role="link" className="flex flex-row items-center min-w-0">
                                    <div aria-label="Voice" role="img" className="mr-[6px]">
                                        <svg className="block w-5 h-5" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z" aria-hidden="true"></path>
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium whitespace-normal" aria-hidden="true">
                                        <div className="overflow-hidden text-ellipsis">General</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pl-11 pb-2 flex flex-col flex-nowrap items-stretch justify-start" role="group">
                        <div className="relative h-8" data-dnd-name="General" draggable="true">
                            <div className="h-8 relative cursor-pointer" tabIndex={0} role="button">
                                <div className="flex rounded-md justify-start items-center mt-[1px] mb-[1px]">
                                    <div role="img" aria-label="3zachm, Do Not Disturb" aria-hidden="false" className="w-8 h-8 rounded-full pt-1">
                                        <svg width="40" height="32" viewBox="0 0 40 32" aria-hidden="true">j
                                            <foreignObject x="0" y="0" width="24" height="24" className="overflow-hidden block rounded-full">
                                                <div>
                                                    <Output
                                                        croppedArea={props.AvatarResult.croppedArea}
                                                        aspectRatio={props.AvatarResult.aspectRatio}
                                                        imgSrc={props.AvatarResult.imageSrc}
                                                        zIndex={-1}
                                                    />
                                                </div>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                    <div className="text-[#8e9297] text-[14px] font-medium" style={{ lineHeight: "18px" }}>3zachm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="flex flex-col h-44 bg-gray-400 dark:bg-[#292b2f]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col  pl-2 pt-2">
                        <div className="flex flex-row items-center text-sm font-bold text-green-500">
                            <AiFillSignal size="15" className="mr-1 text-green-400" />
                            <h1 className="leading-none">Voice Connected</h1>
                        </div>
                        <div className="text-xs text-gray-400">
                            <h1>General / yo</h1>
                        </div>
                    </div>
                    <div className="pr-4">
                        <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill="rgb(212 215 220)" fillRule="evenodd" clipRule="evenodd" d="M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z"></path></svg>
                    </div>
                </div>
                <div className="flex flex-row justify-between p-2">
                    <Button
                        variant="contained"
                        size="small"
                        className="w-[48%]"
                        disableElevation
                        sx={{ backgroundColor: '#36393f', color: '#fff', shadow: 'none' }}
                    >
                        -
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        className="w-[48%]"
                        disableElevation
                        sx={{ backgroundColor: '#36393f', color: '#fff' }}
                    >
                        -
                    </Button>
                </div>
                <div className="flex border-t border-[#36393f] pl-2 pr-2 justify-space items-center h-full text-gray-400">
                    <div aria-controls="popout_26" aria-expanded="false" aria-label="Set Status" role="button" tabIndex={0}>
                        <div role="img" aria-label="3zachm, Do Not Disturb" aria-hidden="false" className="w-8 h-8 rounded-full">
                            <svg width="40" height="32" viewBox="0 0 40 32" aria-hidden="true">j
                                <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)" className="overflow-hidden block">
                                    <div>
                                        <Output
                                            croppedArea={props.AvatarResult.croppedArea}
                                            aspectRatio={props.AvatarResult.aspectRatio}
                                            imgSrc={props.AvatarResult.imageSrc}
                                            zIndex={-1}
                                        />
                                    </div>
                                </foreignObject>
                                <rect width="10" height="10" x="22" y="22" fill="hsl(359, calc(var(--saturation-factor, 1) * 82.6%), 59.4%)" mask="url(#svg-mask-status-dnd)"></rect>
                            </svg>
                        </div>
                    </div>
                    <div className="ml-2 w-2/5">
                        <h1 className="leading-none text-sm text-white font-bold">3zachm</h1>
                        <h1 className="leading-none text-xs text-gray-400">#9999</h1>
                    </div>
                    <div className="ml-1 mr-2"><svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z" fill="currentColor"></path><path d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z" fill="currentColor"></path><path d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z" fill="currentColor"></path><path d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z" fill="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)"></path></svg></div>
                    <div className="ml-1 mr-3"><svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path d="M6.16204 15.0065C6.10859 15.0022 6.05455 15 6 15H4V12C4 7.588 7.589 4 12 4C13.4809 4 14.8691 4.40439 16.0599 5.10859L17.5102 3.65835C15.9292 2.61064 14.0346 2 12 2C6.486 2 2 6.485 2 12V19.1685L6.16204 15.0065Z" fill="currentColor"></path><path d="M19.725 9.91686C19.9043 10.5813 20 11.2796 20 12V15H18C16.896 15 16 15.896 16 17V20C16 21.104 16.896 22 18 22H20C21.105 22 22 21.104 22 20V12C22 10.7075 21.7536 9.47149 21.3053 8.33658L19.725 9.91686Z" fill="currentColor"></path><path d="M3.20101 23.6243L1.7868 22.2101L21.5858 2.41113L23 3.82535L3.20101 23.6243Z" fill="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)"></path></svg></div>
                    <div><BsGearFill size="16" /></div>
                </div>
            </div>
        </div>
    );
}

export default ServerBar;