import { Card, Text } from "@nextui-org/react";

function Denied() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <Card>
                <Text className="w-1/3">Denied</Text>
            </Card>
        </div>
    );
}

export default Denied;