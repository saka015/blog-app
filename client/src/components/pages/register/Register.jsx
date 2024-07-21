import React from "react";
import { Link } from "react-router-dom";

import { Input, Button } from "@nextui-org/react";
const Register = () => {
  return (
    <form
      action=" "
      className="min-h-96 flex flex-col justify-center px-6 md:px-72"
    >
      <Input type="text" variant="underlined" label="Username" />
      <Input type="password" variant="underlined" label="Password" />
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
