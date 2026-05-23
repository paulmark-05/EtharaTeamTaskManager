import {
  useContext,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  ThemeContext,
} from "../context/ThemeContext";

import {
  MdMenu,
  MdClose,
} from "react-icons/md";

const Navbar = () => {
  const { user, logout } =
    useContext(AuthContext);

  const {
    darkMode,
    toggleTheme,
  } = useContext(
    ThemeContext
  );

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="logo">
          Ethara Task
        </div>

        {/* Desktop Nav */}
        <div className="nav-center">
          <NavLink
            to="/dashboard"
            className="nav-link"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className="nav-link"
          >
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            className="nav-link"
          >
            Tasks
          </NavLink>
        </div>

        {/* Right */}
        <div className="nav-right">
          <div className="theme-switch-wrapper">
            <span>
              {darkMode
                ? "🌙"
                : "☀️"}
            </span>

            <label className="switch">
              <input
                type="checkbox"
                checked={
                  darkMode
                }
                onChange={
                  toggleTheme
                }
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="profile-pill">
            {user?.role}
          </div>

          <button
            className="logout-btn"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>

          {/* Mobile Menu */}
          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >
            {menuOpen ? (
              <MdClose />
            ) : (
              <MdMenu />
            )}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink
            to="/dashboard"
            onClick={() =>
              setMenuOpen(
                false
              )
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            onClick={() =>
              setMenuOpen(
                false
              )
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            onClick={() =>
              setMenuOpen(
                false
              )
            }
          >
            Tasks
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;