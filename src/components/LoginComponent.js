import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { authenicate } from "../service/authorize";
import { useNavigate } from "react-router-dom";
import { getUser } from "../service/authorize";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

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
        // authenicate(response, () => {
        //   navigate("/create");
        // });
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
    <div className="container p-5">
      <NavbarComponent />
      <div className="pt-2 pb-2">
        <h1 className="mb-2">เข้าสู่ระบบ | Admin</h1>
        <form className="d-flex flex-column gap-2" onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={inputValue("username")}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={inputValue("password")}
            />
          </div>
          <input
            type="submit"
            value="เข้าสู่ระบบ"
            className="btn btn-primary"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
