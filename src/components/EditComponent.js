import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../service/authorize";

const EditComponent = () => {
  const { slug } = useParams();

  const [state, setState] = useState({
    title: "",
    author: "",
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((response) => {
        const { title, content, author } = response.data;
        setState({ title, author });
        setContent(content);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, [slug]);

  const inputValue = (name) => (event) => {
    // console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    //console.table({title,content,author})
    await axios
      .put(
        `${process.env.REACT_APP_API}/blog/${slug}`,
        {
          title,
          content,
          author,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => {
        Swal.fire("แจ้งเตือน", "อัพดตบทความเรียบร้อย", "success");
        const { title, content, author } = response.data;
        setState({ ...state, title, author });
        setContent(content);
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  const showUpdateForm = () => (
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
        <div className="bg-white text-dark">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={submitContent}
            className="pb-3 border rounded"
          />
        </div>
      </div>
      <div className="form-group">
        <label>ชื่อผู้แต่ง</label>
        <input
          type="text"
          z
          className="form-control"
          value={author}
          onChange={inputValue("author")}
        />
      </div>
      <br />
      <input type="submit" value="อัพเดต" className="btn btn-primary" />
    </form>
  );

  return (
    <div className="container p-5">
      <NavbarComponent />
      <div className="mt-3">
        <div className="card shadow-sm custom-card-single">
          <div className="card-body">
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
