import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function SocialCard() {
    return (
        <Card sx={{minWidth: 400}}>
            <CardContent>
                <h2>Social Card</h2>
                <p>Test Content</p>
            </CardContent>
            <CardActions>
                <Button size="small">Test</Button>
            </CardActions>
        </Card>
    );
}

export default SocialCard;