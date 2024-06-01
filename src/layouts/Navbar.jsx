import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        setIsLoggedIn(true);
        setUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      <header
        className={`bg-white shadow-md ${
          scrolled ? "shadow-gray-500" : "shadow-none"
        } fixed w-full z-10 transition-all duration-300`}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="flex items-center justify-center text-cyan-500">
                <span className="sr-only">Home</span>
                <Logo />
                <p className="text-[#4D8DFF] ml-2 text-2xl">
                  Mental Health Care
                </p>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-[#368CF4] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#368CF4] after:transition-all after:duration-300 hover:after:w-full"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-[#368CF4] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#368CF4] after:transition-all after:duration-300 hover:after:w-full"
                      to="/doctors"
                    >
                      Doctors
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-[#368CF4] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#368CF4] after:transition-all after:duration-300 hover:after:w-full"
                      to="/about"
                    >
                      About us
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-[#368CF4] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#368CF4] after:transition-all after:duration-300 hover:after:w-full"
                      to="/contact"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <span>Welcome, {user ? user.fullName : "User"}</span>
                  <Button variant="contained" onClick={logOutUser}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#2C74DF",
                      textTransform: "none",
                      color: "white",
                      fontSize: "1em",
                      textDecoration: "none",
                    }}
                  >
                    <Link to="/signin" style={{ color: "inherit", textDecoration: "none" }} >Sign in</Link>
                  </Button>
                  <Button variant="outlined" 
                  style={{
                   
                    textTransform: "none",
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                  >
                    <Link
                      to="/signup"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
