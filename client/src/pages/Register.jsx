import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Form.css";
import { BASE_URL } from "../App";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const options = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  };

  const fetchApi = async () => {
    const response = await fetch(`${BASE_URL}/register`, options);

    if (response.status === 200) {
      alert("Registration Successfull!");
    } else {
      alert("Registration failed!");
    }
    // console.log(response);
  };

  const register = (e) => {
    e.preventDefault();
    fetchApi();
  };

  return (
    <>
      <Navbar />
      <form className="register" action="" onSubmit={register}>
        <h1>Register</h1>
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
        <button>Register</button>
      </form>
    </>
  );
};

export default Register;
