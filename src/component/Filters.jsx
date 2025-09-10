import { useDarkMode } from "../hooks/useDarkMode";
import { useEffect, useState } from "react";

const Filters = ({ filters, setFilters }) => {
  const { darkMode } = useDarkMode();
  const [categories, setCategories] = useState([]);

  // Derive categories from transactions stored in localStorage
  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
    setCategories(uniqueCategories);
  }, []);

  const cardStyle = {
    background: darkMode ? "#374151" : "white",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    color: darkMode ? "white" : "black",
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#374151" : "white",
    color: darkMode ? "white" : "black",
  };

  return (
    <div style={cardStyle}>
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        style={inputStyle}
      >
        <option value="">All Types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      {/* Category dropdown derived from transactions */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        style={inputStyle}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min"
        value={filters.min}
        onChange={(e) => setFilters({ ...filters, min: e.target.value })}
        style={{ ...inputStyle, width: "70px" }}
      />
      <input
        type="number"
        placeholder="Max"
        value={filters.max}
        onChange={(e) => setFilters({ ...filters, max: e.target.value })}
        style={{ ...inputStyle, width: "70px" }}
      />
    </div>
  );
};

export default Filters;
