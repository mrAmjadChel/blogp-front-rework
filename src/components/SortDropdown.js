import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

function SortDropdown({ sort, lang, onChange }) {
  const getLabel = () => {
    if (sort === "date_desc")
      return (
        <>
          {" "}
          <FaSortAmountDown className="me-2" /> ล่าสุด
        </>
      );
    if (sort === "date_asc")
      return (
        <>
          {" "}
          <FaSortAmountUp className="me-2" /> เก่าสุด
        </>
      );
    if (sort === "title_asc" && lang === "th")
      return (
        <>
          {" "}
          <FaSortAlphaDown className="me-2" /> ก → ฮ
        </>
      );
    if (sort === "title_desc" && lang === "th")
      return (
        <>
          {" "}
          <FaSortAlphaUp className="me-2" /> ฮ → ก
        </>
      );
    if (sort === "title_asc" && lang === "en")
      return (
        <>
          {" "}
          <FaSortAlphaDown className="me-2" /> A → Z
        </>
      );
    if (sort === "title_desc" && lang === "en")
      return (
        <>
          {" "}
          <FaSortAlphaUp className="me-2" /> Z → A
        </>
      );
    return (
      <>
        {" "}
        <FaSortAmountDown className="me-2" /> เรียงลำดับ
      </>
    );
  };

  return (
    <div className="d-flex justify-content-end my-3">
      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {getLabel()}
        </button>
        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
          <li>
            <button
              className="dropdown-item"
              onClick={() => onChange("date_desc")}
            >
              <FaSortAmountDown className="me-2" /> ล่าสุด
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => onChange("date_asc")}
            >
              <FaSortAmountUp className="me-2" /> เก่าสุด
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => onChange("title_asc")}
            >
              <FaSortAlphaDown className="me-2" /> ก → ฮ
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => onChange("title_desc")}
            >
              <FaSortAlphaUp className="me-2" /> ฮ → ก
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => onChange("en_title_asc")}
            >
              <FaSortAlphaDown className="me-2" /> A → Z
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => onChange("en_title_desc")}
            >
              <FaSortAlphaUp className="me-2" /> Z → A
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortDropdown;
