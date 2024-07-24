import { useEffect, useState } from "react";
import Post from "../../posts/Post/Post";

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const response = fetch("http://localhost:4000/post")
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
