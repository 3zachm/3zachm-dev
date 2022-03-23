import { Point, Area } from "react-easy-crop/types";
import Output from "../Output";

interface ContentProps {
    AvatarResult: {
        croppedArea: Area;
        aspectRatio: number;
        imageSrc: string;
    },
}

function Content(props: ContentProps) {
    const currentDate = new Date().toLocaleDateString("en-US")
    return (
        <div className="flex flex-row min-h-full min-w-full">
            <div className="flex flex-col justify-end items-stretch min-h-full min-w-[85%] bg-[#36393f] pb-5">
                <div className="w-full ">
                    <div className="relative break-words select-text flex pr-12 pt-[0.125rem] pb-[0.125rem] pl-[72px] max-h-11 mt-[1.0625rem]" role="article">
                        <div className="break-words static ml-0 pl-0 indent-0">
                            {/* <img src="/img/discord/asample80.webp" aria-hidden="true" className="absolute left-4 mt-1 w-10 h-10 rounded-full overflow-hidden cursor-pointer z-[1]" alt=" " /> */}
                            <div className="absolute left-4 mt-1 w-10 h-10 rounded-full overflow-hidden cursor-pointer z-[1]">
                                <Output
                                    croppedArea={props.AvatarResult.croppedArea}
                                    aspectRatio={props.AvatarResult.aspectRatio}
                                    imgSrc={props.AvatarResult.imageSrc}
                                    zIndex={-1}
                                />
                            </div>
                            <h2 className="break-words overflow-hidden block relative min-h-[1.375rem] text-[#72767d] whitespace-pre-wrap" style={{ lineHeight: "1.375rem" }} aria-labelledby="message-username-844329219386376222 message-timestamp-844329219386376222">
                                <span className="mr-1">
                                    <span className="text-[1rem] font-medium text-white inline align-baseline relative overflow-hidden flex-shrink-0" style={{ lineHeight: "1.375rem" }} aria-controls="popout_41" aria-expanded="false" role="button">3zachm</span>
                                </span>
                                <span className="text-[0.75rem] text-[#72767d] align-baseline ml-1 inline-block h-5 cursor-default font-medium" style={{ lineHeight: "1.375rem" }}>
                                    <time aria-label="May 18, 2021 2:42 PM" id="message-timestamp-844329219386376222" dateTime="2021-05-18T21:42:52.780Z">
                                        <i aria-hidden="true" className="absolute opacity-0 w-0 inline-block font-normal"> — </i>{currentDate}
                                    </time>
                                </span>
                            </h2>
                            <div id="message-content-844329219386376222" className="select-text -ml-[72px] pl-[72px] relative indent-0 overflow-hidden">
                                Click on the user card&apos;s pfp or banner to begin cropping
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-20">
                    <form className="relative flex-shrink-0 pl-4 pr-4 mt-8">
                        <div aria-controls="popout_27" aria-expanded="false">
                            <div aria-controls="popout_28" aria-expanded="false">
                                <div className="mb-6 bg-[#36393f] relative w-full indent-0 rounded-lg">
                                    <div className=" overflow-x-hidden overflow-y-hidden bg-[#40444b] max-h-[50vh] rounded-lg">
                                        <div className="pl-4 flex relative">
                                            <div className="relative w-0 h-0 pointer-events-none"><input className="file-input" type="file" accept=""
                                                aria-hidden="true"
                                                style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", opacity: 0, cursor: "pointer", fontSize: "0px" }} />
                                            </div>
                                            <div className="sticky flex self-stretch">
                                                <button aria-controls="popout_30" aria-expanded="false" aria-label="Upload a file or send invites" type="button"
                                                    className="cursor-pointer -ml-4 h-11 pt-[10px] pb-[10px] pr-4 pl-4 sticky top-0 w-auto bg-transparent">
                                                    <div className="h-6">
                                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                                            <path className="attachButtonPlus-3IYelE" fill="currentColor"
                                                                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full h-full dark:bg-[#2f3136]">
                <ul className=" h-full">
                    <li className="pt-4">
                        <div className="relative flex items-center justify-between flex-row h-6 pr-2 pl-4 box-border text-[#8e9297] uppercase font-semibold text-sm" role="listitem">
                            <div tabIndex={-1} aria-label="Text Channels (category)" aria-expanded="true" role="button">
                                <h2>
                                    <div>Online</div>
                                </h2>
                            </div>
                        </div>
                    </li>
                    <li className="flex pl-5 justify-space items-center text-gray-400">
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
                            <h1 className="leading-none text-smfont-bold">3zachm</h1>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Content;