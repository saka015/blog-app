import { useEffect, useState } from "react";
import Post from "../../posts/Post/Post";

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const response = fetch("https://blog-backend-0ii5.onrender.com/post")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);
  return (
    <div>{posts?.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
};
