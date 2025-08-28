import NavbarComponent from "./components/NavbarComponent";
import LoadingComponent from "./components/LoadingComponent";
import SortDropdown from "./components/SortDropdown";
import BlogCard from "./components/BlogCard";
import axios from "axios";
import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "./context/UserContext";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "date_desc";
  const lang = searchParams.get("lang") || "th";

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/blogs`, {
        params: { sort, lang, search },
      });
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("ไม่สามารถโหลดบทความได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  }, [sort, lang, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (keyword) => {
    setSearchParams({ search: keyword, sort, lang });
  };

  const handleSortChange = (value) => {
    let newLang = "th";
    let newSort = value;

    if (value === "en_title_asc") {
      newLang = "en";
      newSort = "title_asc";
    } else if (value === "en_title_desc") {
      newLang = "en";
      newSort = "title_desc";
    }

    setSearchParams({ search, sort: newSort, lang: newLang });
  };

  if (isLoading) return <LoadingComponent message="กำลังโหลดบทความ..." />;
  if (error)
    return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container p-5">
      <NavbarComponent />

      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <SearchBar onSearch={handleSearch} keyword={search} />
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-end">
          <SortDropdown sort={sort} lang={lang} onChange={handleSortChange} />
        </div>
      </div>

      <div className="row g-4 mt-1">
        {blogs.length === 0 ? (
          <p className="text-center">ยังไม่มีบทความ</p>
        ) : (
          blogs.map((b) => (
            <div key={b._id} className="col-12 col-sm-6 col-md-4">
              <BlogCard blog={b} user={user} fetchBlogs={fetchBlogs} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
