import React from 'react'
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <form
      action=" "
      className="min-h-96 flex flex-col justify-center px-6 md:px-72"
    >
      <Input type="text" variant="underlined" label="Username" />
      <Input type="password" variant="underlined" label="Password" />
      <Button
        type="submit"
        color="primary"
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
}

export default Login