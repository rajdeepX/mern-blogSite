import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TextEditor from "../components/TextEditor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const fetchEditPost = async () => {
    const response = await fetch(`http://localhost:3000/post/${id}`);
    const postInfo = await response.json();
    setTitle(postInfo.title);
    setContent(postInfo.content);
    setSummary(postInfo.summary);
  };

  useEffect(() => {
    fetchEditPost();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("files", files?.[0]);
    }

    const response = await fetch("http://localhost:3000/post/", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <>
      <Navbar />
      <form className="create" onSubmit={updatePost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <TextEditor value={content} onChange={setContent} />
        <button>Update Post</button>
      </form>
    </>
  );
};

export default EditPost;
