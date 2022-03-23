import Content from "./Chat/Content";
import Top from "./Chat/Top";
import { Point, Area } from "react-easy-crop/types";
import Output from "./Output";

interface ChatProps {
    AvatarResult: {
        croppedArea: Area;
        aspectRatio: number;
        imageSrc: any;
        ModalCallback: (e: boolean) => void;
    },
    BannerResult: {
        croppedArea: Area;
        aspectRatio: number;
        imageSrc: any;
        ModalCallback: (e: boolean) => void;
    }
}

function Chat(props: ChatProps) {
    return (
        <div className="w-fit h-[95vh] flex flex-col">
            <Top />
            <div className="flex flex-row min-h-full">
                <Content
                    AvatarResult={props.AvatarResult}
                />
            </div>
            <div className="absolute right-[50px] top-[130px] sm:right-[248px] sm:top-[88px] z-50">
                <div className="">
                    <div className="w-[300px] shadow-xl bg-[#18191c] rounded-lg overflow-hidden max-h-screen flex flex-col" role="dialog" tabIndex={-1} aria-modal="true">
                        <div className="flex overflow-hidden">
                            <div className="bg-[#a277ad] w-[300px] h-[120px] bg-no-repeat bg-cover bg-center relative">
                                <div className="z-10 top-[10px] right-3 cursor-pointer absolute flex items-center justify-center p-[5px] rounded-full bg-[rgba(0,0,0,.3)]" aria-controls="popout_737" aria-expanded="false" aria-label="Edit Profile" role="button" tabIndex={0} onClick={props.BannerResult.ModalCallback as any}>
                                    <svg aria-label="Edit Profile" className="text-white" aria-hidden="false" width="18" height="18" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div className="w-full h-full">
                                    <Output
                                        croppedArea={props.BannerResult.croppedArea}
                                        aspectRatio={props.BannerResult.aspectRatio}
                                        imgSrc={props.BannerResult.imageSrc}
                                        zIndex={0}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="top-[76px] cursor-pointer rounded-full absolute z-[1] left-4" role="button" tabIndex={0}>
                            <div className="rounded-full">
                                <div className="w-[92px] h-[92px] border-[6px] border-[#18191c] bg-[#18191c] relative rounded-full" role="img" aria-label="3zachm, Do Not Disturb" aria-hidden="false">
                                    <svg width="92" height="80" viewBox="0 0 92 80" className="absolute pointer-events-none block h-full w-auto" aria-hidden="true">
                                        <foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-status-round-80)">
                                            <div className="grid w-full h-full">
                                                <div className="block object-cover pointer-events-none w-full h-full col-start-1 row-start-1 row-end-auto col-end-auto" role="img">
                                                    <Output
                                                        croppedArea={props.AvatarResult.croppedArea}
                                                        aspectRatio={props.AvatarResult.aspectRatio}
                                                        imgSrc={props.AvatarResult.imageSrc}
                                                        zIndex={-1}
                                                    />
                                                </div>
                                                {/* <img src="/img/discord/asample80.webp" alt=" " className="block object-cover pointer-events-none w-full h-full col-start-1 row-start-1 row-end-auto col-end-auto" aria-hidden="true" /> */}
                                            </div>
                                        </foreignObject>
                                        <rect width="16" height="16" x="60" y="60" fill="hsl(359, calc(var(--saturation-factor, 1) * 82.6%), 59.4%)" mask="url(#svg-mask-status-dnd)"></rect>
                                    </svg>
                                </div>
                            </div>
                            <svg width="80" height="80" className="absolute top-[6px] left-[6px] opacity-0 transition-opacity hover:opacity-50" viewBox="0 0 80 80">
                                <foreignObject x="0" y="0" width="80" height="80" overflow="visible" mask="url(#svg-mask-avatar-status-round-80)">
                                    <div className="box-border text-[10px] font-bold w-full h-full pt-1 flex items-center justify-center whitespace-nowrap overflow-ellipsis uppercase overflow-hidden text-white shadow-md bg-black"
                                         style={{lineHeight: "12px"}}
                                         onClick={props.AvatarResult.ModalCallback as any}
                                    >
                                        Change Pic
                                    </div>
                                </foreignObject>
                            </svg>
                        </div>
                        <div className="block flex-shrink-0 pt-16 pb-4 pl-4 pr-4 overflow-hidden relative">
                            <div className="absolute top-4 right-4 max-w-[180px] justify-end flex flex-wrap -mr-[2px] -mb-[2px]" aria-label="User Badges" role="group">
                            </div>
                            <div className="select-text">
                                <div className="text-[20px] break-words whitespace-normal items-end block font-medium" style={{lineHeight: "24px"}}>
                                    <span className="text-white font-semibold overflow-auto break-all whitespace-normal align-top inline">3zachm</span>
                                    <span className="font-semibold text-[#b9bbbe] align-top">#9999</span></div>
                            </div>
                        </div>
                        <div className="overflow-x-hidden overflow-y-hidden pr-2 flex min-h-0 pt-0 pb-[14px] pl-4 relative box-border flex-col" dir="ltr">
                            <div className="h-[1px] bg-[hsla(0,0%,100%,0.06)] mb-3"></div>
                            <div className="mb-4">
                                <h3 className="text-[#b9bbbe] flex font-bold mb-2 uppercase text-[12px]" style={{lineHeight: "16px"}}>About Me</h3>
                                <div className="text-[14px] overflow-hidden break-words text-[#dcddde] font-normal select-text" style={{lineHeight: "18px"}}>
                                    fumo
                                </div>
                            </div>
                            <div className="bg-[#18191c] text-white ">
                                <div className="relative pb-4">
                                    <div className="w-full min-w-0 justify-between flex mb-2">
                                        <h3 className="text-[#b9bbbe] font-bold uppercase whitespace-nowrap text-ellipsis overflow-hidden text-[12px]" style={{lineHeight: "16px"}}>
                                            <div className="whitespace-nowrap text-ellipsis overflow-hidden relative">Playing a game</div>
                                        </h3>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="relative self-start">
                                            { //eslint-disable-next-line @next/next/no-img-element
                                            }<img alt="" src="/img/discord/foobar.png" className="w-[60px] h-[60px] rounded-lg block object-cover" style={{mask: `url(/img/discord/appmask.svg)`}} /><img alt="" src="/img/discord/play.png" className="w-[20px] h-[20px] rounded-full absolute -bottom-1 -right-1" /></div>
                                            <div className="text-[#dcddde] ml-[10px] overflow-hidden" style={{flex: "1 1 auto"}}>
                                                <h3 className="text-[#dcddde] block text-[14px] whitespace-nowrap text-ellipsis overflow-hidden font-semibold" style={{lineHeight: "18px"}} title="foobar2000"><span className="text-[#dcddde]">foobar2000</span></h3>
                                                <div title="Halozy: Cosmic Armonica" className="text-[#dcddde] block text-[14px] whitespace-nowrap text-ellipsis overflow-hidden font-semibold" style={{lineHeight: "18px"}}>Rick Astley</div>
                                                <div className="text-[#dcddde] block text-[14px] whitespace-nowrap text-ellipsis overflow-hidden font-semibold" style={{lineHeight: "18px"}}><span title="源流懐古">Never Gonna Give You Up</span></div>
                                                <div className="text-[#dcddde] block text-[14px] whitespace-nowrap text-ellipsis overflow-hidden font-semibold" style={{lineHeight: "18px"}}>07:27 elapsed</div>
                                            </div>
                                        </div>
                                        <div className="m-0 flex-col flex-wrap justify-start items-stretch flex" style={{flex: "0 1 auto"}}></div>
                                    </div>
                                    <h3 className="text-[#b9bbbe] mb-2 font-bold uppercase text-xs">Roles</h3>
                                    <div className="mb-4 relative mt-[2px] flex-wrap flex" aria-label="Roles" role="list" tabIndex={0} data-list-id="roles-bf1f8ade-c6ea-4401-8369-9b0e12bdea10">
                                        <div className="flex flex-row items-center text-xs font-medium bg-[#292b2f] rounded box-border h-[22px] mr-1 mb-1 p-1" aria-label="Remove role 3zachm" tabIndex={-1} role="option" aria-selected="false" style={{borderColor: "rgba(184, 117, 216, 0.6)"}}>
                                            <div className="rounded-full w-3 h-3 p-0 ml-1 mr-1 items-center justify-center flex" tabIndex={-1} aria-hidden="true" role="button" style={{backgroundColor: "rgb(184, 117, 216)"}}>
                                                {/* <svg class="roleRemoveIcon-387wKV" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                                                </svg> */}
                                            </div>
                                            <div aria-hidden="true" className="max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden mr-1">3zachm</div>
                                        </div>
                                        <button aria-controls="popout_738" className="pt-1 pb-1 pl-[5px] pr-[5px] text-[11px] font-medium bg-[#292b2f] rounded box-border h-[22px] mr-1 mb-1 items-center flex justify-center" style={{lineHeight: "11px"}} aria-label="Add role" type="button" role="listitem" tabIndex={-1}>
                                            <svg className="w-[14px] h-[14px] cursor-pointer text-[11px] font-medium color-white" style={{lineHeight: "11px"}} aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <h3 className="text-[#b9bbbe] mb-2 font-bold uppercase text-xs">Note</h3>
                                    <div className="-ml-1 -mr-1"><textarea placeholder="Click to add a note" maxLength={256} autoCorrect="off" className="h-9 bg-transparent border-0 box-border text-[#dcddde] text-[12px] max-h-[88px] p-1 resize-none w-full rounded" style={{lineHeight: "14px"}}></textarea></div>
                                </div>
                                <div aria-hidden="true" className="absolute pointer-events-none min-h-0 min-w-[1px] flex h-[14px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
}

            export default Chat;