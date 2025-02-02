import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { Input, Button } from "@nextui-org/react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();
    console.log(username, password);

    try {
      const response = await fetch(
        "https://blog-backend-0ii5.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("Registration successful!");
        setRedirect(true);
      } else {
        console.error(data);
        alert("Registration failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Registration failed! Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <form
      action=" "
      onSubmit={register}
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
        Register
      </Button>
      <p className=" text-center ">
        Already have an account?{" "}
        <Link to="/login">
          <span className="hover:underline text-blue-500 cursor-pointer">
            Login
          </span>
        </Link>{" "}
      </p>
    </form>
  );
};

export default Register;
