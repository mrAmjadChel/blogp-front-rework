import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getToken } from "../service/authorize";

const FormComponent = () => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState({
    title: "",
    author: user || "",
  });
  const { title, author } = state; //destructure

  const [content, setContent] = useState("");

  //กำหนดค่า state
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    //console.table({title,content,author})
    await axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        { title, content, author },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => {
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <div className="pt-2 pb-2">
        <h1 className="mb-2">เขียนบทความ</h1>
        {/* {JSON.stringify(state)} */}
        <form className="d-flex flex-column gap-2" onSubmit={submitForm}>
          <div className="form-group">
            <label>ชื่อบทความ</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={inputValue("title")}
            />
          </div>
          <div className="form-group">
            <label>รายละเอียด</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={submitContent}
              placeholder="เขียนรายละเอียดบทความ"
              className="pb-3 border rounded"
            />
          </div>
          <div className="form-group">
            <label>ชื่อผู้แต่ง</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={inputValue("author")}
            />
          </div>
          <br />
          <input type="submit" value="บันทึก" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
