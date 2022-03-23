import { Card, Row, Text, Link as UiLink } from "@nextui-org/react";
import { useRouter } from "next/router";

interface MiscProps {
    item: {
        title: string;
        img: string;
        url: string;
    }
}

function MiscCard(props: MiscProps) {
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
        e.preventDefault();
        router.push(url);
    }
    return (
        <Card hoverable clickable className="pointer-events-auto" onClick={(e) => handleClick(e, props.item.url)}>
            <Card.Body css={{ p: 0 }}>
                <Card.Image
                    objectFit="cover"
                    src={props.item.img}
                    width='100%'
                    height={180}
                    alt={props.item.title}
                />
            </Card.Body>
            <Card.Footer>
                <Row wrap='wrap' justify="space-between">
                    <Text b>
                        {props.item.title}
                    </Text>
                </Row>
            </Card.Footer>
        </Card>
    );
}

export default MiscCard;