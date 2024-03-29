import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface PostProps {
    author: string;
    date: string;
    title: string;
    id: string;
    onStartEdit: () => void;
    onDelete: () => void;
}

const Post = ({
    author,
    date,
    title,
    id,
    onStartEdit,
    onDelete,
}: PostProps) => (
    <Card
        sx={{
            m: 2,
            width: "70%",
            mx: "auto",
        }}
    >
        <CardContent>
            <Typography variant="body1" color="text.secondary">
                Posted by {author} on {date}
            </Typography>
            <Typography variant="h5" color="text.primary">
                {title}
            </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
            <Link to={id}>
                <Button variant="text">View</Button>
            </Link>
            <Button variant="text" onClick={onStartEdit}>
                Edit
            </Button>
            <Button variant="text" color="error" onClick={onDelete}>
                Delete
            </Button>
        </CardActions>
    </Card>
);

export default Post;
