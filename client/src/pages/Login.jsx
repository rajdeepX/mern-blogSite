import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import CustomContext from "../CustomContext";
import "./Form.css";
import { BASE_URL } from "../App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(CustomContext);

  const options = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  const fetchApi = async () => {
    const response = await fetch(`${BASE_URL}/login`, options);

    if (response.ok) {
      const userInfo = await response.json();
      setUserInfo(userInfo);
      setRedirect(true);
    } else {
      alert("Wrong credentials!");
    }
  };

  const login = (e) => {
    e.preventDefault();
    fetchApi();
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Navbar />
      <form className="login" action="" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
