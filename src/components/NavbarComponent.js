import { Link, useNavigate } from "react-router-dom";
import { logout } from "../service/authorize";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavbarComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded navbar-dark bg-dark">
      <div className="container-fluid px-4">
        {/* logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/BP-logo.png"
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* link */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* left */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                หน้าแรก
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  เขียนบทความ
                </Link>
              </li>
            )}
          </ul>

          {/* right */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  เข้าสู่ระบบ
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
