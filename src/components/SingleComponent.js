import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import LoadingComponent from "./LoadingComponent";
import parse from "html-react-parser";

const SingleComponent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((response) => setBlog(response.data))
      .catch((err) => alert(err));
  }, [slug]);

  if (!blog) {
    return <LoadingComponent message="กำลังโหลดข้อมูลบทความ..." />;
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      <div className="mt-3">
        {blog && (
          <div className="row g-4">
            {/* content */}
            <div className="col-12 col-md-8">
              <div className="card shadow-sm custom-card-single h-100">
                <div className="card-body">
                  <h1 className="blog-title">{blog.title}</h1>
                  <hr />
                  <div className="blog-content">{parse(blog.content)}</div>
                </div>
              </div>
            </div>

            {/* author info */}
            <div className="col-12 col-md-4">
              <div className="card shadow-sm custom-card-single h-100 text-center">
                <div className="card-body">
                  <img
                    src={
                      ["admin", "Admin", "aim1808"].includes(blog.author)
                        ? "/default-avatar.jpg"
                        : "/101.jpg"
                    }
                    alt={blog.author}
                    className="author-avatar mb-3"
                  />
                  <h6 className="author-title">ข้อมูลผู้เขียน</h6>
                  <hr />
                  <p className="author-text">ผู้เขียน: {blog.author}</p>
                  <p className="author-text">
                    เผยแพร่: {new Date(blog.createdAt).toLocaleString()}
                  </p>
                  {blog.updatedAt !== blog.createdAt && (
                    <p className="author-text">
                      แก้ไขล่าสุด: {new Date(blog.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComponent;
