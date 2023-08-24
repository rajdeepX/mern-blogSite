import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomContext from "../CustomContext";
import "./Navbar.css";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(CustomContext);

  const fetchProfile = async () => {
    const response = await fetch("http://localhost:3000/profile", {
      credentials: "include",
    });
    const userInfo = await response.json();
    setUserInfo(userInfo);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <>
      <header>
        <Link to={"/"} className="logo">
          blogSite
        </Link>
        <nav>
          {username ? (
            <>
              <span style={{ fontWeight: "bold" }}>Hello, {username}</span>
              <Link to={"/create"}>Create New Post</Link>
              <Link onClick={logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
        </nav>
      </header>
      {username ? (
        ""
      ) : (
        <p
          style={{
            width: "100%",
            margin: "20px auto 40px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Hello Visitor! Kindly register first to create a new post :)
        </p>
      )}
    </>
  );
};

export default Navbar;
