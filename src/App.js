import NavbarComponent from "./components/NavbarComponent";
import LoadingComponent from "./components/LoadingComponent";
import BlogCard from "./components/BlogCard";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(UserContext);

  const fetchBlogs = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.log("Error fetching blogs:", error));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (blogs.length === 0)
    return <LoadingComponent message="กำลังโหลดบทความ..." />;

  return (
    <div className="container p-5">
      <NavbarComponent />
      <div className="row g-4 mt-3">
        {blogs.map((b) => (
          <div key={b._id} className="col-12 col-sm-6 col-md-4">
            <BlogCard blog={b} user={user} fetchBlogs={fetchBlogs} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
