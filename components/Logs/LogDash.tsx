import { Divider, Loading, Pagination, Text, Collapse } from "@nextui-org/react";
import { DiscordLogin } from "../../types/DiscordAuth";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Link from "next/link";
import { add, format, parseISO, sub } from 'date-fns'
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Image from 'next/image';
import CountUp from "react-countup";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface LogProps {
    profile: DiscordLogin;
}

interface FormValues {
    username: string;
    search: string;
    startDate: Date | null;
    endDate: Date | null;
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
}

function LogDash(props: LogProps) {
    // states
    const [pageIndex, setPageIndex] = useState(1);
    const [formValues, setFormValues] = useState(defaultValues)
    // state functions
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // API fetches
    let tempSd = formValues.startDate ? formValues.startDate.toISOString() : "";
    let tempEd = formValues.endDate ? formValues.endDate.toISOString() : "";
    let apiURL = `/api/anny/logs?p=${pageIndex}&u=${formValues.username}&q=${formValues.search}&sd=${tempSd}&ed=${tempEd}`;
    let apiCountURL = `/api/anny/logs_count?u=${formValues.username}&q=${formValues.search}&sd=${tempSd}&ed=${tempEd}`;
    let apiBadges = `/api/twitch/badges?c=56418014`;
    let apiVideos = `/api/twitch/videos?c=56418014`;

    const logs = useSWR(apiURL, fetcher).data;
    const count = useSWR(apiCountURL, fetcher).data;
    const allBadges = useSWR(apiBadges, fetcher).data;
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
    if (!logs || !allBadges) {
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
        logContent = logs.data.map((item: any) =>
            <div key={item.msg_id}>
                <div className="pt-[5px] flex flex-row items-start">
                    <div className="flex sm:inline-flex items-center w-fit">
                        <span className="mr-[8px] text-[#adadb8] whitespace-nowrap sm:block hidden" data-chattime={format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')} onClick={handleVodRedir}>{format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')}</span>
                        <span className="mr-[8px] text-[#adadb8] whitespace-nowrap block sm:hidden" data-chattime={format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')} onClick={handleVodRedir}>{format(new Date(item.time), 'hh:mm')}</span>
                        <span className="h-[20px] w-fit">{parseBadges(item.badges).map((x: any) => x)}</span>
                        <span style={{ color: `${(item.color != "#000000") ? item.color : "#BBBBBB"}`, fontWeight: "bold" }}>{item.user}</span>
                        <span aria-hidden="true">: </span>
                    </div>
                    <div className="sm:inline-flex hidden max-w-[60%] ml-1">{item.message}</div>
                </div>
                <div className="inline-flex sm:hidden max-w-[80%]">{item.message}</div>
                <Divider className="sm:hidden block mt-2" />
            </div>
        )
    }
    // pagination--------------------
    if (!count) paginationDiv = <Loading type="points-opacity" />;
    else paginationDiv = <Pagination size={"lg"} total={Math.ceil(count.total / count.count)} initialPage={pageIndex} onChange={(page) => setPageIndex(page)} />;
    // misc--------------------
    if (!count || !logs) msgCount = <> Messages <Loading className="pt-3" type="points-opacity" /></>;
    else msgCount = <>Messages <span style={{color: "pink"}}><CountUp end={count.total} separator="," duration={2.0} /></span></>
    const fullForm = (
        <>
            <CssTextField name="username" label="Username" value={formValues.username} onChange={handleInputChange} type="search" />
            <CssTextField name="search" label="Search" value={formValues.search} onChange={handleInputChange} type="search" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Before"
                    value={formValues.endDate}
                    onChange={(newDate) => setFormValues({ ...formValues, endDate: newDate })}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="After"
                    value={formValues.startDate}
                    onChange={(newDate) => setFormValues({ ...formValues, startDate: newDate })}
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
            <div className="flex justify-center flex-col pointer-events-auto pt-7 max-w-[100vw]">
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
                            className="shadow-lg backdrop-blur bg-opacity-70 bg-zinc-900 lg:ml-12 lg:mt-20 lg:mb-4 lg:mr-12 lg:max-h-[75vh] max-h-[70vh] lg:min-h-[75vh] min-h-[70vh] min-w-[60vw]">
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