import { Card, Row, Text, Link as UiLink } from "@nextui-org/react";
import Link from "next/link";

interface MiscProps {
    item: {
        title: string;
        img: string;
        url: string;
    }
}

function MiscCard(props: MiscProps) {
    return (
          <Card hoverable clickable className="">
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
                  <Link href={props.item.url} passHref><UiLink className=" pointer-events-auto text-white">{props.item.title}</UiLink></Link>
                </Text>
              </Row>
            </Card.Footer>
          </Card>
    );
}

export default MiscCard;