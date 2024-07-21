import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import  Logo  from "./logo.jsx";
import {Link}  from "react-router-dom";

export default function App() {
  return (
    <Navbar shouldHideOnScroll className="mb-10">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Link to="/login">
        <NavbarItem>
            <Button  color="secondary"  variant="flat">
              Login
            </Button>
        </NavbarItem>
          </Link>
          <Link to="/register">
        <NavbarItem>
            <Button  color="primary"  variant="flat">
              Sign Up
            </Button>
        </NavbarItem>
          </Link>
      </NavbarContent>
    </Navbar>
  );
}
