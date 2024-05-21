import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";
function Navbar() {
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                className="flex items-center justify-center text-teal-600"
                to="/"
              >
                <span className="sr-only">Home</span>
                <Logo />
                <p className="text-[#1CBBD0] ml-2 text-2xl">
                  Mental Health Care
                </p>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <Link to="/">
                    <Link
                      className="text-size-small text-stone-500 transition hover:text-gray-500/75"
                      to="/"
                    >
                      Home
                    </Link>
                  </Link>

                  <Link to="/doctors">
                    <Link
                      className="text-size-small text-stone-500 transition hover:text-gray-500/75"
                      to="/doctors"
                    >
                      Doctors
                    </Link>
                  </Link>
                  <Link to="/about">
                    <Link
                      className="text-size-small text-stone-500 transition hover:text-gray-500/75"
                      to="/about"
                    >
                      About
                    </Link>
                  </Link>
                  <Link to="/contact">
                    <Link
                      className="text-size-small text-stone-500 transition hover:text-gray-500/75"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </Link>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="contained"> <Link to="/signin">  Sign in </Link></Button>
              <Button variant="outlined"><Link to="/signup">  Sign up </Link></Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
