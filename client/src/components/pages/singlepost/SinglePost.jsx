import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Image, Divider } from "@nextui-org/react";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../../context/UserContext";

export const SinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://blog-backend-0ii5.onrender.com/post/${id}`).then((res) =>
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      })
    );
  }, []);

  if (!postInfo) return <div>Post Not Found!</div>;
  return (
    <div className=" ">
      <img
        className="max-h-96 w-full object-cover  object-center overflow-hidden"
        src={`https://blog-backend-0ii5.onrender.com/${postInfo.cover}`}
        fallbackSrc="https://via.placeholder.com/300x200"
        alt="Post Cover"
      />

      <h1 className="text-5xl font-semibold my-2">{postInfo.title}</h1>
      <div className="flex">
        <p className="font-semibold mr-4">
          <span className="font-normal">by </span>@{postInfo.author.username}
        </p>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        {userInfo?.id === postInfo.author?._id && (
          <Link to={`/edit/${postInfo._id}`}>
            <div className="underline text-gray-500 ml-4 hover:text-red-500 flex">
              <FiEdit className="m-1" />
              Edit
            </div>
          </Link>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
    </div>
  );
};
