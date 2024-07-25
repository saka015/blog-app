import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Logo from "./logo.jsx";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext.jsx";

export default function App() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://blog-backend-0ii5.onrender.com/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.username);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const logout = () => {
    fetch("https://blog-backend-0ii5.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo("");
    setRedirect(true);
  };

  if (redirect) {
    console.log("redirecting");
  }
  const username = userInfo?.username;
  console.log(username);

  return (
    <Navbar shouldHideOnScroll className="mb-10">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {username && (
          <>
            <Link to={"/create"}>Create new blog</Link>
            <Link to="/">
              <NavbarItem onClick={logout}>
                <Button color="danger" variant="ghost">
                  Logout
                </Button>
              </NavbarItem>
            </Link>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">
              <NavbarItem>
                <Button color="secondary" variant="flat">
                  Login
                </Button>
              </NavbarItem>
            </Link>
            <Link to="/register">
              <NavbarItem>
                <Button color="primary" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </Link>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
