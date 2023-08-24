import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import CustomContext from "../CustomContext";
import "./PostPage.css";
import { BASE_URL } from "../App";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);

  const { userInfo } = useContext(CustomContext);

  const { id } = useParams();
  const fetchPost = async () => {
    // console.log(id);
    const response = await fetch(`${BASE_URL}/post/${id}`);
    const postInfo = await response.json();
    setPostInfo(postInfo);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!postInfo) return "";

  //   console.log(userInfo);

  return (
    <>
      <Navbar />
      <div className="post-page">
        <h1>{postInfo.title}</h1>
        <p className="author">{postInfo.author.username}</p>
        <p className="time">{formatISO9075(new Date(postInfo.createdAt))}</p>
        {userInfo.id === postInfo.author._id && (
          <div className="edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <Link to={`/edit/${postInfo._id}`} className="edit-btn">
              Edit post
            </Link>
          </div>
        )}
        <div className="image">
          <img src={`http://localhost:3000/${postInfo.image}`} alt="image" />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </>
  );
};

export default PostPage;
