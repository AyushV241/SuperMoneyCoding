import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BalanceSummary from "./component/BalanceSummary";
import Filters from "./component/Filters";
import TransactionList from "./component/TransactionList";
import { useDarkMode } from "./hooks/useDarkMode"; // import your custom hook

const Home = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    min: "",
    max: "",
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = transactions.filter((t) => {
    if (filters.type && t.type !== filters.type) return false;
    if (filters.category && t.category !== filters.category) return false;
    if (filters.min && t.amount < Number(filters.min)) return false;
    if (filters.max && t.amount > Number(filters.max)) return false;
    return true;
  });

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        background: darkMode ? "#1f2937" : "#f8f9fa",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Expense Tracker</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/add"
            style={{
              padding: "8px 12px",
              background: "#007bff",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            + Add Transaction
          </Link>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              background: darkMode ? "#fbbf24" : "#007bff",
              color: darkMode ? "#000" : "#fff",
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <BalanceSummary transactions={transactions} />
      <Filters filters={filters} setFilters={setFilters} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Home;
