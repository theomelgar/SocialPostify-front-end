"use client";
import ResponsiveAppBar from "@/components/Appbar";
import SignInSide from "@/components/SignIn";
import { useAppSelector } from "@/redux/store";
import Posts from "@/components/Posts";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import Posted from "@/components/AlreadyPosted";

export default function Home() {
  const login = useAppSelector((state) => state.authReducer.value.isAuth);

  const [isLoading, setIsLoading] = useState(true); // Initial loading state is true
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(login);
    setIsLoading(false);

    return () => {
      setIsLoading(true); 
    };
  }, [login]);

  return (
    <main className="flex min-h-screen flex-col bg-lime-100">
      {isLoading ? (
        <div>
          <ResponsiveAppBar></ResponsiveAppBar>

          <div className="flex p-4 gap-6 m-4">
            <Skeleton variant="rectangular" width={345} height={600} />
            <Skeleton variant="rectangular" width={345} height={600} />
            <Skeleton variant="rectangular" width={345} height={600} />
            <Skeleton variant="rectangular" width={345} height={600} />
            <Skeleton variant="rectangular" width={345} height={600} />
          </div>
        </div>
      ) : isClient ? (
        <>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Posted></Posted>
        </>
      ) : (
        <SignInSide></SignInSide>
      )}
    </main>
  );
}
