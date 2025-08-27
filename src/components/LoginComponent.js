import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenicate } from "../service/authorize";
import { useNavigate } from "react-router-dom";
import { getUser } from "../service/authorize";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const LoginComponent = () => {
  const { setUser } = useContext(UserContext);
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const navigate = useNavigate();

  useEffect(() => {
    getUser() && navigate("/");
  }, [navigate]);

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((response) => {
        authenicate(response);
        setUser(response.data.username);
        navigate("/create");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  return (
    <div className="container mt-5 p-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 m-4">
          <div className="card shadow-sm custom-card-login">
            <div className="card-body d-flex flex-column p-0">
              <div className="mb-4 d-flex justify-content-start">
                <Link
                  to="/"
                  className="text-decoration-none d-flex align-items-center gap-1 text-white"
                >
                  <FontAwesomeIcon icon={faHouse} />
                  <span>หน้าหลัก</span>
                </Link>
              </div>
              <div className="text-center mb-4">
                <img src="/101.jpg" alt="Admin" className="author-avatar" />
              </div>
              <h3 className="text-center mb-4">เข้าสู่ระบบ | Admin</h3>
              <form className="d-flex flex-column gap-3" onSubmit={submitForm}>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={username}
                  onChange={inputValue("username")}
                  placeholder="Username"
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  value={password}
                  onChange={inputValue("password")}
                  placeholder="Password"
                />
                <button type="submit" className="btn-login">
                  เข้าสู่ระบบ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
