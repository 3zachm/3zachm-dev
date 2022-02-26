import { Loading, Pagination } from "@nextui-org/react";
import React, { useState } from "react";
import useSWR from "swr";
import { Card, Divider, Text } from "@nextui-org/react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Central() {
    const [pageIndex, setPageIndex] = useState(1);
    const { data } = useSWR(`/api/anny/logs?p=${pageIndex}`, fetcher);
    let content;
    if (!data) content = <Loading type="points-opacity" />;
    else content = data.map((item: any) =>
        <div key={item.msg_id} className="flex items-start flex-row max-w-[80vw] overflow-x-hidden">
            <Text b color={(item.color != "#000000") ? item.color : "#BBBBBB"}>{item.user}</Text>: {item.message}
        </div>
    )
    const count = useSWR(`/api/anny/logs_count`, fetcher);
    const count_data = count.data;
    let paginationDiv;
    if (!count) paginationDiv = <Loading type="points-opacity" />;
    else {
        paginationDiv = <Pagination size={"lg"} total={Math.trunc(count_data._count / 1000) + 1} initialPage={pageIndex} onChange={(page) => setPageIndex(page)} />;
    }

    return (
        <>
            <Card className="h-[70vh] pointer-events-auto min-w-full">
                <Card.Body>
                    <div className="min-w-full">
                        {content}
                    </div>
                </Card.Body>
                <Divider />
                <Card.Footer >
                </Card.Footer>
                <div className="w-full flex items-center justify-center">
                    {paginationDiv}
                </div>
                
            </Card>
        </>
    )
}

export default Central;