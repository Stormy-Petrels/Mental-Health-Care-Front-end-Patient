import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";
import ImageDefaultDoctor from "../assets/ImageDefaultDoctor.jpg";
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser({});
    history.push("/signin");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        try {
          const parsedUser = JSON.parse(userString);
          const id = parsedUser.roleId;

          const response = await axios.get(
            `http://127.0.0.1:8000/api/profile/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
         
          const userData = response.data.data; 
          setIsLoggedIn(true);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="">
      <header 
        className={`bg-white shadow-md ${
          scrolled ? "shadow-gray-100" : "shadow-none"
        } fixed w-full z-10 transition-all duration-300`}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                className="flex items-center justify-center text-cyan-500"
                to="/"
              >
                <span className="sr-only">Home</span>
                <Logo />
                <p className="text-cyan-500 ml-2 text-2xl">
                  Mental Health Care
                </p>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-cyan-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-cyan-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
                      to="/doctors"
                    >
                      Doctors
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-cyan-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg text-[#78716c] relative transition hover:text-cyan-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-2 mx-5">
              {isLoggedIn ? (
                <>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={isMenuOpen ? "account-menu" : undefined}
                      aria-haspopup="true"
                    >
                      <Avatar
                        src={
                          user.image
                            ? `http://127.0.0.1:8000/images/${user.image}`
                            : ImageDefaultDoctor
                        }
                        alt="User Avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={isMenuOpen}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to={`/profile/${user.id}`}
                      onClick={handleClose}
                    >
                      My profile
                    </MenuItem>

                    <MenuItem onClick={logOutUser} >
                      <Typography  variant="body1" style={{ color: "#f50057" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#06B6D4",
                      textTransform: "none",
                      color: "white",
                      fontSize: "1em",
                      textDecoration: "none",
                    }}
                  >
                    <Link
                      to="/signin"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      textTransform: "none",
                      fontSize: "1rem",
                      textDecoration: "none",
                    }}
                  >
                    <Link
                      to="/signup"
                      style={{ color: "#06B6D4", textDecoration: "none" }}
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
