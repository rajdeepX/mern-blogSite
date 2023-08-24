import Navbar from "../components/Navbar";
import Article from "../components/Article";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`${BASE_URL}/post`);
    const postData = await response.json();
    setPosts(postData);
    console.log(postData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      {posts.length > 0 &&
        posts.map((post) => {
          const { createdAt } = post;
          return <Article key={createdAt} {...post} />;
        })}
    </>
  );
};

export default Homepage;
