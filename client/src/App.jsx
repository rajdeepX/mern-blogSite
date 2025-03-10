import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import { UserContextProvider } from "./CustomContext";
import EditPost from "./pages/EditPost";

// export const BASE_URL = `https://mern-blog-backend-pqm8.onrender.com`;

export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://mern-blog-backend-pqm8.onrender.com";



function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
