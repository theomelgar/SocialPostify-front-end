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
import AlertDialog from "./Dialog";
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
      <CardActions className="p-4 flex justify-between gap-4">
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
        <AlertDialog setUpdates={setUpdates} updates={updates}  title={post.title} id={post.id} />
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

        <Collapse
          className="bg-gray-100"
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <Typography
            className="overflow-scroll"
            variant="body1"
            color="text.secondary"
          >
            {post.text}
          </Typography>
        </Collapse>
        <h2 className="mt-3">Date to publish:</h2>
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
