"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { logIn, logOut } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import api from "@/services/api";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { Skeleton } from "@mui/material";
import { useAppSelector } from "@/redux/store";

export default function Posted() {
  const [posts, setPosts] = useState([]);
  const [updates, setUpdates] = useState(false);
  const token = useAppSelector((state) => state.authReducer.value.token);

  useEffect(() => {
    fetchPosts();
  }, [updates]);

  async function fetchPosts() {
    try {
      const response = await api.get("/publication", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data);
    } catch (error) {
      console.error("An error occurred while fetching posts:", error);
    }
  }
  return (
    <div className="flex flex-col gap-6 md:p-4 md:m-4">
      <h1 className="text-3xl ">Published</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <CreatePost setUpdates={setUpdates} updates={updates} />

        <div className="flex gap-4">
          {posts ? (
            posts.length ? (
              posts.map(
                (post: any) =>
                  post.published === true && (
                    <Post
                      key={post.id}
                      post={post}
                      setUpdates={setUpdates}
                      updates={updates}
                    />
                  )
              )
            ) : (
              <h1>No publications created</h1>
            )
          ) : (
            <Skeleton variant="rectangular" width={345} height={400} />
          )}
        </div>
      </div>{" "}
    </div>
  );
}
