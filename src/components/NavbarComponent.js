import { Link, useNavigate } from "react-router-dom";
import { logout } from "../service/authorize";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavbarComponent = ( ) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/" className="nav-link">
            หน้าแรก
          </Link>
        </li>
        {!user && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/login" className="nav-link">
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
        {user && (
          <>
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/create" className="nav-link">
                เขียนบทความ
              </Link>
            </li>
            <li className="nav-item pr-3 pt-3 pb-3">
              <button className="nav-link" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavbarComponent;
