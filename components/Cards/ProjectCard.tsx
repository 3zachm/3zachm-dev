import { Card, Grid, Text, Divider, Button, Row, Col } from "@nextui-org/react";


interface ProjectCardProps {
    image: string;
    bgBlur: string;
    borderTop: string;
    content: React.ReactNode;
}

function ProjectCard(props: ProjectCardProps) {
    return (
        <Card className="md:w-[800px] h-[200px] md:h-[400px]" cover hoverable shadow>
          <Card.Body>
            <Card.Image
              src= {props.image}
              height={400}
              width="100%"
              alt="Card example background"
            />
          </Card.Body>
          <Card.Footer
            blur
            css={{
              position: 'absolute',
              bgBlur: props.bgBlur,
              borderTop: props.borderTop,
              bottom: 0,
              zIndex: 1
            }}
            >
            {props.content}
          </Card.Footer>
        <Divider />
      </Card>

    )
}

export default ProjectCard;