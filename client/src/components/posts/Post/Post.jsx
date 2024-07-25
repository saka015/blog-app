import React, { useState, useEffect } from "react";
import { Image, Divider } from "@nextui-org/react";
import Skelton from "./skelton";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <>
        <div className="sm:px-16 my-12">
          {loading ? (
            <Skelton />
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:flex-[4] flex justify-center">
                <Link to={`/post/${_id}`}>
                  <Image
                    className="w-screen md:w-[500px]"
                    src={"https://blog-backend-0ii5.onrender.com/" + cover}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    alt="NextUI Image with fallback"
                  />
                </Link>
              </div>
              <div className="md:flex-[6]">
                <Link to={`/post/${_id}`}>
                  <h1 className="text-2xl font-semibold">{title}</h1>
                </Link>

                <div className="my-4">
                  <span id="author" className="font-bold mr-6">
                    {author.username}
                  </span>
                  <span className="text-gray-500">
                    {format(new Date(createdAt), "MMM d, yyyy HH:MM")}
                  </span>
                </div>
                <p className="italic">{summary}</p>
              </div>
            </div>
          )}
        </div>
        <div className="px-4">
          <Divider className="my-4" />
        </div>
      </>
    </>
  );
}
