import { useDarkMode } from "../hooks/useDarkMode";

export const formatDate = (iso) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${d.getFullYear()}`;
};

const TransactionList = ({ transactions }) => {
  const { darkMode } = useDarkMode();
  const cardStyle = {
    background: darkMode ? "#374151" : "white",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    color: darkMode ? "white" : "black",
  };

  if (!transactions.length)
    return <div style={cardStyle}>No transactions found.</div>;

  const thStyle = {
    padding: "8px",
    textAlign: "left",
    borderBottom: darkMode ? "1px solid #555" : "1px solid #ddd",
  };
  const tdStyle = {
    padding: "8px",
    borderBottom: darkMode ? "1px solid #555" : "1px solid #eee",
  };

  return (
    <div style={cardStyle}>
      <h2>Transactions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Type</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td style={tdStyle}>{formatDate(t.date)}</td>
              <td style={tdStyle}>{t.category}</td>
              <td
                style={{
                  ...tdStyle,
                  color: t.type === "Income" ? "#10b981" : "#f87171",
                }}
              >
                {t.type}
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                ₹{t.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
