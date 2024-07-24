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
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials:'include',
      method:'POST'
    });
    setUserInfo(null);
    setRedirect(false);
  }

  const username=userInfo?.username;
  // if (!username) {
  //   return <Navigate to='/' />
  // }

    return (
      <Navbar shouldHideOnScroll className="mb-10">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {username && (
            <>
              <Link to={"/create"}>Create new blog</Link>
              <Link to="/logout">
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
