import { Card, Col, Divider, Grid, Loading, Pagination, Text } from "@nextui-org/react";

import { DiscordLogin } from "../../types/DiscordAuth";
import Central from "./Central/Central";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface LogProps {
    profile: DiscordLogin;
}

function LogDash(props: LogProps) {
    return (
        <div className="flex justify-center flex-col pointer-events-auto">
            <Grid.Container gap={2} justify="center">
                <Grid xs>
                    <Card>
                        <Card.Header>
                            <Text h1 className="text-5xl text-white text-center select-none">
                                1
                            </Text>
                        </Card.Header>
                        <Divider />
                    </Card>
                </Grid>
                <Grid xs={6}>
                    <Central />
                </Grid>
                <Grid xs>
                <Card>
                        <Card.Header>
                            <Text h1 className="text-5xl text-white text-center select-none">
                                2
                            </Text>
                        </Card.Header>
                        <Divider />
                    </Card>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default LogDash;