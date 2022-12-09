import { Divider, Loading, Pagination, Text, Collapse } from "@nextui-org/react";
import { DiscordLogin } from "../../types/DiscordAuth";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { add, format, parseISO, sub } from 'date-fns'
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Image from 'next/image';
import CountUp from "react-countup";
import router from "next/router";
import ViewportList from "react-viewport-list";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface LogProps {
    profile: DiscordLogin;
}

interface FormValues {
    username: string;
    search: string;
    startDate: Date | null;
    endDate: Date | null;
    page?: number;
}

interface QueryValues {
    username?: string;
    search?: string;
    startDate?: string
    endDate?: string
    page?: number;
}

const styleLabel = styled(TextField)({
    '& label.Mui-focused': {
        color: 'pink',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'pink',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'pink',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'pink',
        },
    },
});

const CssTextField = styleLabel;

const defaultValues: FormValues = {
    username: "",
    search: "",
    startDate: null,
    endDate: null,
    page: 1
}

function LogDash(props: LogProps) {
    // states
    const [pageIndex, setPageIndex] = useState(1);
    const [formValues, setFormValues] = useState(defaultValues);
    const [tempValues, setTempValues] = useState(defaultValues);
    const firstUpdate = useRef(true);
    // state
    useEffect(() => {
        // check if this is the first update
        if (firstUpdate.current) {
            firstUpdate.current = false;
            // set form and temp to query values
            const initialQuery: FormValues = {
                username: router.query.username as string || "",
                search: router.query.search as string || "",
                startDate: router.query.startDate ? parseISO(router.query.startDate as string) : null,
                endDate: router.query.endDate ? parseISO(router.query.endDate as string) : null,
                page: router.query.page ? parseInt(router.query.page as string) : 1
            }
            setFormValues(initialQuery);
            setTempValues(initialQuery);
            setPageIndex(initialQuery.page ? initialQuery.page : 1);
            return;
        }
        // update query values
        const queryList: QueryValues = {};

        if (tempValues.username != "")    { queryList["username"] = tempValues.username; }
        if (tempValues.search != "")      { queryList["search"] = tempValues.search; }
        if (tempValues.startDate != null) { queryList["startDate"] = tempValues.startDate?.toISOString(); }
        if (tempValues.endDate != null)   { queryList["endDate"] = tempValues.endDate?.toISOString(); }
        if (pageIndex > 1)                { queryList["page"] = pageIndex; }

        router.push({
            pathname: "/logs",
            // update all the query params from tempValues
            query: {
                ...queryList,
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues, pageIndex])

    // state functions
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        // if temp is different from form, then set form to temp
        if (formValues[name as keyof typeof formValues] !== value) {
            setFormValues({ ...formValues, [name]: value })
            setPageIndex(1);
        }
        setTempValues({ ...tempValues, [name]: value })
    };

    const handleDateChange = (name: string, date: Date | null) => {
        // if temp is different from form, then set form to temp
        if (formValues[name as keyof typeof formValues] !== date) {
            setFormValues({ ...formValues, [name]: date })
            setPageIndex(1);
        }
        setTempValues({ ...tempValues, [name]: date })
    };

    const handleInputEvent = (e: any) => {
        // if key is enter, deselect the input box
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    // API fetches
    let tempSd = formValues.startDate ? formValues.startDate.toISOString() : "";
    let tempEd = formValues.endDate ? formValues.endDate.toISOString() : "";
    let apiURL = `/api/anny/logs?p=${pageIndex}&u=${formValues.username}&q=${formValues.search}&sd=${tempSd}&ed=${tempEd}`;
    let apiCountURL = `/api/anny/logs_count?u=${formValues.username}&q=${formValues.search}&sd=${tempSd}&ed=${tempEd}`;
    let apiBadges = `/api/twitch/badges?c=56418014`;
    let apiVideos = `/api/twitch/videos?c=56418014`;
    let apiEmotes = `/api/twitch/emotes?c=56418014`;
    let api7tvEmotes = `/api/7tv/emotes?c=61ad997effa9aba101bcfddf`;

    const logs = useSWR(apiURL, fetcher).data;
    const count = useSWR(apiCountURL, fetcher).data;
    const allBadges = useSWR(apiBadges, fetcher).data;
    const allEmotes = useSWR(apiEmotes, fetcher).data;
    const videos = useSWR(apiVideos, fetcher).data;

    // badge handling
    const parseBadges = (badges: string) => {
        if (!badges) return [];
        const badgeArray = badges.split(",");
        let badgeImages: ReactJSXElement[] = [];
        badgeArray.forEach((badge) => {
            // span to hold the badge
            let span = document.createElement("span");
            span.className = "mr-[3px]";
            let useSet = allBadges.global;
            const badgeSplit = badge.split("/");
            // if the badge is a channel badge
            if (allBadges.channel.find((x: { set_id: string; }) => x.set_id == badgeSplit[0])) {
                useSet = allBadges.channel;
            }
            badgeImages.push(
                <span className={"mr-[3px] pt-[2px] inline-flex"} key={badgeSplit[0]}>
                    <div>
                        <Image alt={badgeSplit[0]} width={18} height={18} src=
                            {useSet.find((x: { set_id: string; }) => x.set_id == badgeSplit[0]).versions.find((x: { id: string; }) => x.id == badgeSplit[1]).image_url_1x}
                        />
                    </div>
                </span>
            );
        });
        return badgeImages;
    }

    // this is laggy as fuck, please think :)
    const parseEmotes = (message: string) => {
        // all emotes has all the emotes available to the channel, replace the emote name with the image
        let words = message.split(" ");
        let newMessage: ReactJSXElement[] = [];
        words.forEach((word) => {
            // if the word is a global or channel emote
            if (allEmotes.global.find((x: { name: string; }) => x.name == word)) {
                let emote = allEmotes.global.find((x: { name: string; }) => x.name == word);
                newMessage.push(
                    <span className={"mr-[3px] inline-flex"} key={word}>
                        <Image className={"align-middle max-h-8 max-w-[64px]"} alt={word} width={28} height={28} src={emote.images.url_1x} />
                    </span>
                );
            }
            else if (allEmotes.channel.find((x: { name: string; }) => x.name == word)) {
                let emote = allEmotes.channel.find((x: { name: string; }) => x.name == word);
                newMessage.push(
                    <span className={"mr-[3px] inline-flex"} key={word}>
                        <Image className={"align-middle max-h-8 max-w-[64px]"} alt={word} width={28} height={28} src={emote.images.url_1x} />
                    </span>
                );
            }
            else {
                newMessage.push(<span className={"mr-[3px] inline-flex"} key={word}>{word}</span>);
            }
        });
        return newMessage;
    }

    async function handleVodRedir(e: any) {
        e.preventDefault();
        const chatTime = parseISO(e.target.dataset.chattime);
        videos.data.forEach((video: any) => {
            const startTime = parseISO(video.created_at);
            const length = video.duration; // formatted like 03h20m00s
            const end = add(startTime, { hours: length.split("h")[0], minutes: length.split("h")[1].split("m")[0], seconds: length.split("h")[1].split("m")[1].split("s")[0] });

            if (chatTime >= startTime && chatTime <= end) {
                const vodTime = chatTime.getTime() - startTime.getTime();
                // convert vodTime to 00h00m00s
                const hours = Math.floor(vodTime / 3600000);
                const minutes = Math.floor((vodTime / 60000) % 60);
                const seconds = Math.floor((vodTime / 1000) % 60);
                const vodTimeFormatted = `${hours}h${minutes}m${seconds}s`;
                window.open(`https://www.twitch.tv/videos/${video.id}?t=${vodTimeFormatted}`);
            }
        });
    }
    // --------------------loading handling--------------------
    let logContent;
    let paginationDiv;
    let msgCount;
    // logs
    if (!logs || !allBadges || !allEmotes) {
        const item = {
            msg_id: "0",
            message : "Loading",
            time: Date.now(),
        }
        logContent = (
            <div className="pt-[5px] pl-[20px] pr-[20px] flex flex-row items-start min-w-[80vw] overflow-hidden" key={item.msg_id}>
                <div className="inline-flex max-w-[60%] ml-1"><Loading type="points-opacity" /></div>
            </div>
        );
    }
    else {
        logContent = <>
            <ViewportList items={logs.data} itemMinSize={0} >
                {(item: any) => (
                <div key={item.msg_id}>
                    <div className="pt-[5px] flex flex-row items-start">
                        <div className="flex sm:inline-flex items-center w-fit">
                            <span className="mr-[8px] text-[#adadb8] whitespace-nowrap sm:block hidden" data-chattime={format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')} onClick={handleVodRedir}>{format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')}</span>
                            <span className="mr-[8px] text-[#adadb8] whitespace-nowrap block sm:hidden" data-chattime={format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')} onClick={handleVodRedir}>{format(new Date(item.time), 'hh:mm')}</span>
                            <span className="h-[20px] w-fit">{parseBadges(item.badges).map((x: any) => x)}</span>
                            <span style={{ color: `${(item.color != "#000000") ? item.color : "#BBBBBB"}`, fontWeight: "bold" }}>{item.user}</span>
                            <span aria-hidden="true">: </span>
                        </div>
                        <div className="sm:inline-flex hidden max-w-[60%] ml-1">{parseEmotes(item.message)}</div>
                    </div>
                    <div className="inline-flex sm:hidden max-w-[80%]">{item.message}</div>
                    <Divider className="sm:hidden block mt-2" />
                </div>
                )}
            </ViewportList>
        </>
    }
    // pagination--------------------
    if (!count) paginationDiv = <Loading type="points-opacity" />;
    else paginationDiv = <Pagination size={"lg"} total={Math.ceil(count.total / count.count)} initialPage={pageIndex} onChange={(page) => setPageIndex(page)} />;
    // misc--------------------
    if (!count || !logs) msgCount = <> Messages <Loading className="pt-3" type="points-opacity" /></>;
    else msgCount = <>Messages <span style={{color: "pink"}}><CountUp end={count.total} separator="," duration={2.0} /></span></>
    const fullForm = (
        <>
            <CssTextField name="username" label="Username" value={tempValues.username} onBlur={handleInputChange} type="search" onKeyPress={handleInputEvent} onChange={(e) => setTempValues({ ...tempValues, username: e.target.value })} />
            <CssTextField name="search" label="Search" value={tempValues.search} onBlur={handleInputChange} type="search" onKeyPress={handleInputEvent} onChange={(e) => setTempValues({ ...tempValues, search: e.target.value })} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} name="endDate" onBlur={() =>  handleDateChange("endDate", tempValues.endDate)} />}
                    label="Before"
                    value={tempValues.endDate}
                    onChange={(date) => setTempValues({ ...tempValues, endDate: date })}
                    onAccept={() => handleDateChange("endDate", tempValues.endDate)}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} name="startDate" onBlur={() => handleDateChange("startDate", tempValues.startDate)} />}
                    label="After"
                    value={tempValues.startDate}
                    onChange={(date) => setTempValues({ ...tempValues, startDate: date })}
                    onAccept={() =>  handleDateChange("startDate", tempValues.startDate)}
                />
            </LocalizationProvider>
            <div className="sm:pt-0 pt-3 flex justify-center items-center flex-col">{ msgCount }</div>
        </>
    )


    return (
        <>
            <div className="sm:hidden w-screen bg-zinc-900 backdrop-blur bg-opacity-70 pointer-events-auto absolute top-0 z-10">
                <Collapse title="anny logs" className='pl-5 pr-5 flex flex-col pointer-events-auto'>

                    <div className="max-w-screen-sm p-0 flex items-center justify-center">
                        <form name="form-data2">
                            {fullForm}
                        </form>
                    </div>
                </Collapse>
            </div>
            <div className="flex justify-center flex-col pointer-events-auto pt-7 w-[100vw]">
                <Grid
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        alignItems: 'center',
                    }}
                >
                    <Grid xs={6} sm={9} item={true}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                flexDirection: { xs: 'row', md: 'column' },
                                alignItems: 'center',
                                overflow: 'hidden',
                                fontWeight: 'bold',
                            }}
                            noValidate
                            autoComplete="off"
                            id="form-data"
                            className="hidden sm:flex"
                        >
                            {fullForm}
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                flexDirection: { xs: 'row', md: 'column' },
                                alignItems: 'center',
                                overflow: 'hidden',
                                fontWeight: 'bold',
                            }}
                            noValidate
                            autoComplete="off"
                            id="form-data"
                            className="flex sm:hidden"
                        >

                        </Box>
                    </Grid>
                    <Grid xs={10} sm={8} lg={8} item={true}>
                        <Box
                            sx={{
                                overflow: 'auto',
                                padding: '3rem',
                            }}
                            className="shadow-lg backdrop-blur bg-opacity-70 bg-zinc-900 lg:ml-12 lg:mt-20 lg:mb-4 lg:mr-12 lg:max-h-[75vh] lg:min-h-[75vh] min-h-[70vh] max-h-[70vh] w-[80vw] md:w-[70vw] lg:w-[60vw]"
                        >
                            <div className="overflow-hidden">
                                {logContent}
                            </div>
                        </Box>
                        <div className="w-full flex items-center justify-center pt-4">
                            {paginationDiv}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default LogDash;