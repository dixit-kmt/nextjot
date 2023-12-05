"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from 'react';
import Header from './components/Header'
import Post from './components/Post'
import { Button } from "@nextui-org/react";
import Create from './components/Create';
import Edit from './components/Edit';
import { useDisclosure, CardFooter, Card } from "@nextui-org/react";
import Skeletons from "./components/Skeleton";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen:isOpen2, onOpen:onOpen2, onOpenChange:onOpenChange2 } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [reload]);

  const getData = async () => {
    setLoading(true);
    const res = await fetch('/api/posts');
    const data = await res.json();
    if (!res.ok){
      console.log("fetching data failed")
    }
    setPosts(data.data);
    setLoading(false);
    
  }

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen p-4 selection:bg-[#B0A695] selection:text-[#F3EEEA]">
          <Header></Header>
          <div className="flex items-center justify-center mt-20">
            <Button
              onPress={onOpen}
              className="bg-[#776B5D] text-white text-lg font-semibold rounded-full focus:outline-none"
            >
              Create Jot
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-lg font-semibold mb-4 text-center text-[#776B5D]">
              Jots
            </h1>

            {loading ? (
              <Skeletons></Skeletons>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Post
                    reload={reload}
                    setReload={setReload}
                    key={post._id}
                    onOpen={onOpen2}
                    post={post}
                    setSelectedPost={setSelectedPost}
                  />
                ))}
              </div>
            )}

            {!loading && posts.length == 0 && (
              <h1 className="text-medium text-red-600 font-semibold ml-2 text-center">
                No jots found!
              </h1>
            )}
            
          </div>
          <Create
            reload={reload}
            setReload={setReload}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          ></Create>
          <Edit
            reload={reload}
            setReload={setReload}
            selectedPost={selectedPost}
            isOpen={isOpen2}
            onOpen={onOpen2}
            onOpenChange={onOpenChange2}
          ></Edit>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
