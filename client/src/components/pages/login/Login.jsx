import React, { useState, useEffect, useContext } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    console.log(username, password);

    try {
      const response = await fetch(
        "https://blog-backend-0ii5.onrender.com/login",
        {
          method: "POST",
          credentials: "include", //include cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert("bad credentials");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form
      action=" "
      onSubmit={login}
      className="min-h-96 flex flex-col justify-center px-6 md:px-72"
    >
      <Input
        type="text"
        variant="underlined"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        variant="underlined"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        color="success"
        variant="flat"
        className="w-full my-6"
      >
        Login
      </Button>
      <p className=" text-center ">
        Don't have an account?{" "}
        <Link to="/register">
          <span className="hover:underline text-blue-500 cursor-pointer">
            Register
          </span>
        </Link>{" "}
      </p>
    </form>
  );
};

export default Login;
