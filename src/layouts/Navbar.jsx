import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div>
      <header className={`bg-white shadow-md ${scrolled ? 'shadow-gray-500' : 'shadow-none'} fixed w-full z-10 transition-all duration-300`}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="flex items-center justify-center text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <Logo />
                <p className="text-cyan-500 ml-2 text-2xl">
                  Mental Health Care
                </p>
              </a>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <Link to="/" className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                    Home
                  </Link>

                  <Link to="/doctors" className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                    Doctors
                  </Link>
                  <Link to="/about" className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                    About
                  </Link>
                  <Link to="/contact" className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                    Contact
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
