import { ROUTES } from "@/router";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    navigate(ROUTES.AUTHORISATION);
  };
  return (
    <header>
      <nav className="navbar w-full bg-(--primary-blue)">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          {/* <!-- Sidebar toggle icon --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        <div className="px-4">Pharma Warehouse</div>

        {/* Правая часть */}
        <div className="ml-auto flex items-center gap-2">
          {!user ? (
            <>
              <NavLink to={ROUTES.AUTHORISATION}>
                <button className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-blue-600">
                  Login
                </button>
              </NavLink>

              <NavLink to={ROUTES.REGISTER}>
                <button className="btn btn-sm bg-white text-blue-600 hover:bg-gray-100">
                  Register
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-white">
                {user.username} ({user.role})
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
