import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import ThemeSwitcher from "./ThemeSwitcher";

export default function App() {
  return (
    <Navbar className=" sm:w-8/12 mx-auto rounded-full" position="static">
      <NavbarBrand>
        <p className="font-thin text-3xl cursor-default">NextJot</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link
            className="align-middle text-3xl text-foreground cursor-pointer"
            href="https://github.com/dixit-kmt/nextjot"
          >
            <FaGithub />
          </Link>
        </NavbarItem>
        <NavbarItem >
          <ThemeSwitcher ></ThemeSwitcher>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
