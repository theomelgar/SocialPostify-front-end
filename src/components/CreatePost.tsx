"use client";
import { useAppSelector } from "@/redux/store";
import api from "@/services/api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePost = ({ setUpdates, updates }: any) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postDateToPublish, setPostDateToPublish] = useState("");
  const [postSocialMedia, setPostSocialMedia] = useState("");
  const [postImage, setPostImage] = useState("");

  const router = useRouter();

  const token = useAppSelector((state) => state.authReducer.value.token);

  const handleSubmit = async (post: any) => {
    try {
      const response = await api.post("/publication", post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("New Post Created:", response.data);

      router.push("/");
    } catch (error: any) {
      console.error("An error occurred while creating the post:", error);
      alert(
        "An error occurred while creating the post. Please try again later."
      );
    }
    setUpdates(!updates);
  };

  const handleCreatePost = () => {
    const newPost = {
      title: postTitle,
      text: postText,
      dateToPublish: postDateToPublish,
      socialMedia: postSocialMedia,
      image: postImage,
      published: false,
    };

    handleSubmit(newPost);
  };

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 600 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Create a New Post
        </Typography>
        <TextField
          label="Post Title"
          variant="outlined"
          fullWidth
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Post Text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Date to Publish"
          variant="outlined"
          fullWidth
          value={postDateToPublish}
          onChange={(e) => setPostDateToPublish(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Social Media"
          variant="outlined"
          fullWidth
          value={postSocialMedia}
          onChange={(e) => setPostSocialMedia(e.target.value)}
          margin="normal"
        />
        <CardMedia image={postImage? postImage : ''} title="Post Image" component="img"></CardMedia>
        <TextField
          label="Post Image URL"
          variant="outlined"
          fullWidth
          value={postImage}
          onChange={(e) => setPostImage(e.target.value)}
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleCreatePost} variant="outlined" color="primary">
          Create Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;
