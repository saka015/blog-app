import React, { useState, useEffect } from "react";
import { Image, Divider } from "@nextui-org/react";
import Skelton from './skelton'

export default function SinglePost() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <>
          <div className="sm:px-16 my-12">
            
          {loading ? (
            <Skelton />
          ) : (<div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-[4] flex justify-center">
              <Image
                className="w-screen md:w-[500px]"
                src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
                fallbackSrc="https://via.placeholder.com/300x200"
                alt="NextUI Image with fallback"
              />
            </div>
            <div className="md:flex-[6]">
              <h1 className="text-2xl font-semibold">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum ut perspici
              </h1>
              <div className="my-4">
                <span id="author" className="font-bold mr-6">
                  saka015
                </span>
                <span className="text-gray-500">
                  {new Date().toLocaleString()}
                </span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veniam dolorem excepturi aliquid. Odit dolores iste numquam,
                non aliquid maiores possimus illo nihil odio velit eligendi at
                sed, consequatur exercitationem libero a ratione corrupti nisi
                incidunt unde eaque? Commodi asperiores voluptatibus a
                reprehenderit! Ab consequuntur exercitationem qui adipisci,
                quia fugit consequatur?
              </p>
            </div>
          </div>)
          }
          </div>
          <div className="px-4">
            <Divider className="my-4" />
          </div>
        </>
    </>
  );
}
