"use client";
import api from "@/services/api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type PostProps = {
  post: any;
  setUpdates: any;
  updates: any;
};
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post: React.FC<PostProps> = ({ post, setUpdates, updates }) => {
  const [done, setDone] = useState(post.published);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  async function handlePublish() {
    setDone((prevDone: any) => !prevDone);

    const data = {
      published: !done,
    };

    try {
      const response = await api.patch(`/publication/${post.id}`, data);
      setUpdates(!updates);
    } catch (error) {
      console.error("An error occurred during publication update:", error);
      setDone((prevDone: any) => !prevDone);
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }} key={post.id}>
      <CardActions className="p-4  flex justify-between gap-4">
        <Typography className="font-bold text-xl" component="div">
          Posted?
        </Typography>
        {post.published ? (
          <Button
            className="bg-emerald-300"
            onClick={handlePublish}
            variant="contained"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </Button>
        ) : (
          <Button
            className="bg-rose-400"
            onClick={handlePublish}
            variant="contained"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
        <Button color="warning" variant="outlined">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Button>
      </CardActions>
      <CardMedia image={post.image} title="Post Image" component="img" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? (
              <Typography></Typography>
            ) : (
              <Typography>Description</Typography>
            )}
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            className="overflow-scroll"
            variant="body1"
            color="text.secondary"
          >
            {post.text}
          </Typography>
        </Collapse>
        <h2>Date to publish:</h2>
        <Typography gutterBottom variant="h5" component="div">
          {post.dateToPublish}
        </Typography>
        <h2>Social Media:</h2>
        <Typography gutterBottom variant="h5" component="div">
          {post.socialMedia}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
