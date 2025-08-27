import NavbarComponent from "./components/NavbarComponent";
import LoadingComponent from "./components/LoadingComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { getToken } from "./service/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(UserContext);

  const fetchBlogs = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return <LoadingComponent message="กำลังโหลดบทความ..." />;
  }

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไม่",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchBlogs();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((b) => (
        <div
          className="row"
          key={b._id}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-3">
            <Link to={`/blog/${b.slug}`} style={{ textDecoration: "none" }}>
              <h3>{b.title}</h3>
            </Link>
            <div>
              {b.content
                ? parse(b.content.substring(0, 200))
                : "ไม่มีบทความที่พร้อมใช้งาน"}
            </div>
            <p className="text-muted">
              ผู้เขียน: {b.author} , เผยแพร่:{" "}
              {new Date(b.createdAt).toLocaleString()}
            </p>
            {user && (
              <div>
                <Link
                  className="btn btn-outline-success"
                  to={`/blog/edit/${b.slug}`}
                >
                  แก้ไขบทความ
                </Link>
                &nbsp;
                <button
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(b.slug)}
                >
                  ลบบทความ
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
