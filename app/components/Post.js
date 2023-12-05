import React from 'react'
import { Card, CardBody } from "@nextui-org/react";
import { MdModeEdit } from "@react-icons/all-files/md/MdModeEdit";
import { MdDelete} from "@react-icons/all-files/md/MdDelete";

function Post({post, onOpen, setSelectedPost, reload, setReload}) {
  const editPost = () => {
    setSelectedPost(post);
    onOpen();

  }
  const remove = async () =>{
    const formData = await {
      id: post._id,
    }
    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setReload(!reload);
  }
  return (
    <div className="">
      <Card className="flex flex-row justify-between">
        <CardBody className="flex flex-col w-10/12">
          <h1 className="text-lg font-semibold text-[#776B5D]">{post.title}</h1>
          <p className="text-[#776B5D]">{post.description}</p>
        </CardBody>
        <CardBody className="flex flex-row items-center space-x-2 w-2/10 justify-end text-[#776B5D]">
          <p>
            <MdModeEdit
              onClick={editPost}
              className="text-2xl hover:text-foreground cursor-pointer"
            ></MdModeEdit>
          </p>
          <p>
            <MdDelete
              onClick={remove}
              className="text-2xl hover:text-red-500 cursor-pointer"
            ></MdDelete>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default Post