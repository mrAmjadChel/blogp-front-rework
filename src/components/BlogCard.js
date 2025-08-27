// src/components/BlogCard.js
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import parse from "html-react-parser";
import Swal from "sweetalert2";
import { getToken } from "../service/authorize";

const BlogCard = ({ blog, user, fetchBlogs }) => {
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
    fetch(`${process.env.REACT_APP_API}/blog/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Deleted!", data.message, "success");
        fetchBlogs();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card h-100 shadow-sm custom-card">
      <div className="card-body d-flex flex-column">
        <Link to={`/blog/${blog.slug}`} className="text-decoration-none">
          <h1 className="blog-title">{blog.title}</h1>
        </Link>

        <div
          className="blog-content flex-grow-1 overflow-hidden"
          style={{ maxHeight: "6rem" }}
        >
          {blog.content
            ? parse(blog.content.substring(0, 200))
            : "ไม่มีบทความที่พร้อมใช้งาน"}
        </div>

        <p className="blog-author text-muted mb-2 small">
          ผู้เขียน: {blog.author} <br />
          เผยแพร่: {new Date(blog.createdAt).toLocaleString()}
        </p>

        {user && (
          <div className="d-flex gap-2 mt-auto">
            <Link
              className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
              to={`/blog/edit/${blog.slug}`}
            >
              <FaEdit /> แก้ไข
            </Link>
            <button
              className="btn btn-danger btn-sm d-flex align-items-center justify-content-center gap-1"
              onClick={() => confirmDelete(blog.slug)}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
