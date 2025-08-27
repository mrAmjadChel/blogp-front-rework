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
      <div className="pt-2 pb-2">
        {blog && (
          <div>
            <h1>{blog.title}</h1>
            <div>{parse(blog.content)}</div>
            <p className="text-muted">
              ผู้เขียน: {blog.author} , เผยแพร่:{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComponent;
