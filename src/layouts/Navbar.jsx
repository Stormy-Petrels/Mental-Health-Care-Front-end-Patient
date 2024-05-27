import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";

function Navbar() {
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
            <header className="bg-white">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link className="flex items-center justify-center text-teal-600" to="/">
                                <span className="sr-only">Home</span>
                                <Logo />
                                <p className="text-cyan-500 ml-2 text-2xl">Mental Health Care</p>
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <Link className="text-size-small text-stone-500 transition hover:text-gray-500/75" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-size-small text-stone-500 transition hover:text-gray-500/75" to="/doctors">
                                            Doctors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-size-small text-stone-500 transition hover:text-gray-500/75" to="/about">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="text-size-small text-stone-500 transition hover:text-gray-500/75" to="/contact">
                                            Contact
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
                                    {/* Hiển thị nút "Sign in" và "Sign up" khi chưa đăng nhập thành công */}
                                    <Button variant="contained">
                                        <Link to="/signin" style={{ color: 'inherit', textDecoration: 'none' }}>Sign in</Link>
                                    </Button>
                                    <Button variant="outlined">
                                        <Link to="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>Sign up</Link>
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
