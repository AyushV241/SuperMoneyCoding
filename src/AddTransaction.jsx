import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode";

const AddTransaction = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Load existing categories from saved transactions
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    const cats = [...new Set(saved.map((t) => t.category))]; // unique categories
    setCategories(cats);
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "__add_new__") {
      const newCat = prompt("Enter new category:");
      if (newCat) {
        if (!categories.includes(newCat)) {
          setCategories((prev) => [...prev, newCat]);
        }
        setCategory(newCat);
      } else {
        setCategory("");
      }
    } else {
      setCategory(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex: positive numbers with optional 2 decimals
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(amount)) {
      alert("Please enter a valid numeric amount (e.g., 100 or 99.99)");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    const newTx = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    saved.push(newTx);
    localStorage.setItem("transactions", JSON.stringify(saved));

    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        background: darkMode ? "#1f2937" : "#f8f9fa",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Add Transaction</h2>
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
      </header>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => {
            // Allow only numbers and optional decimal
            const value = e.target.value;
            if (/^\d*\.?\d{0,2}$/.test(value)) {
              setAmount(value);
            }
          }}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: darkMode ? "1px solid #555" : "1px solid #ccc",
            background: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
          }}
        />

        {/* Category dropdown with Add New option */}
        <select
          value={category}
          onChange={handleCategoryChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: darkMode ? "1px solid #555" : "1px solid #ccc",
            background: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="__add_new__">Add New Category</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: darkMode ? "1px solid #555" : "1px solid #ccc",
            background: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
          }}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "8px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
