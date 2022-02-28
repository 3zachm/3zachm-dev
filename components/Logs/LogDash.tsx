import { Divider, Loading, Pagination, Text, Collapse } from "@nextui-org/react";
import { DiscordLogin } from "../../types/DiscordAuth";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Link from "next/link";
import { format } from 'date-fns'

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

    const logs = useSWR(apiURL, fetcher).data;
    let count;
    if (logs) {
        count = logs.pagination;
    }

    // --------------------loading handling--------------------
    let logContent;
    let paginationDiv;
    // logs
    if (!logs) logContent = <Loading type="points-opacity" />;
    else {
        logContent = logs.data.map((item: any) =>
            <div key={item.msg_id} className="">
                <div className="pt-[5px] pl-[20px] pr-[20px]">
                    <div className="break-words">
                        <span className="mr-[5px] text-[#adadb8]">{format(new Date(item.time), 'yyyy-MM-dd hh:mm')}</span>
                        <span>{item.badges}</span>
                        <span><Text b color={(item.color != "#000000") ? item.color : "#BBBBBB"}>{item.user}</Text></span>
                        <span aria-hidden="true">: </span>
                        <span className="">{item.message}</span>
                    </div>
                </div>
            </div>
        )
    }
    // pagination--------------------
    if (!count) paginationDiv = <Loading type="points-opacity" />;
    else paginationDiv = <Pagination size={"lg"} total={Math.ceil(count.count / count.itemCount)} initialPage={pageIndex} onChange={(page) => setPageIndex(page)} />;
    // misc--------------------
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
            <div className="flex justify-center flex-col pointer-events-auto pt-7">
                <Grid
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        alignItems: 'center',
                    }}
                >
                    <Grid xs={6} sm={4} item={true}>
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
                    <Grid xs={4.5} sm={8} lg={8} item={true}>
                        <Box
                            sx={{
                                overflow: 'auto',
                                padding: '3rem',
                            }}
                            className="shadow-lg backdrop-blur bg-opacity-70 bg-zinc-900 lg:ml-12 lg:mt-20 lg:mb-4 lg:mr-12 md:max-h-[75vh] max-h-[70vh] md:min-h-[75vh] min-h-[70vh] min-w-[60vw]">
                            <div>
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