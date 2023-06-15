import Navbar from "../components/Navbar";
import Article from "../components/Article";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3000/post");
    const postData = await response.json();
    // console.log(postData[0].title);
    setPosts(postData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* <h2>Hello {userInfo}</h2> */}
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
