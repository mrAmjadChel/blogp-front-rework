import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch, keyword }) {
  const [value, setValue] = useState(keyword);

  useEffect(() => {
    setValue(keyword); // sync กับ URL
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาบทความ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-dark" type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
