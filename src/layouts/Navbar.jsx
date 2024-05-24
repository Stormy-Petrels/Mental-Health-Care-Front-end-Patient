import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const handleSignOut = () => {
    // Xử lý đăng xuất ở đây, ví dụ: clear token, set isLoggedIn về false
    setIsLoggedIn(false);
    // Chuyển hướng về trang đăng nhập hoặc trang chính
    history.push("/signin"); // Thay đổi đường dẫn tới trang đăng nhập của bạn nếu cần
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="flex items-center justify-center text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <Logo />
                <p className="text-cyan-500 ml-2 text-2xl">Mental Health Care</p>
              </a>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <Link to="/">
                    <a className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                      Home
                    </a>
                  </Link>

                  <Link to="/doctors">
                    <a className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                      Doctors
                    </a>
                  </Link>
                  <Link to="/about">
                    <a className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                      About
                    </a>
                  </Link>
                  <Link to="/contact">
                    <a className="text-size-small text-stone-500 transition hover:text-gray-500/75" href="#">
                      Contact
                    </a>
                  </Link>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Button variant="contained" onClick={handleSignOut}>
                  Sign out
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
