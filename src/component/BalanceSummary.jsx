import { useDarkMode } from "../hooks/useDarkMode";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceSummary = ({ transactions }) => {
  const { darkMode } = useDarkMode();

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const categoryMap = {};
  transactions.forEach((t) => {
    if (categoryMap[t.category]) categoryMap[t.category] += t.amount;
    else categoryMap[t.category] = t.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Amount by Category",
        data: Object.values(categoryMap),
        backgroundColor: [
          "#f87171",
          "#34d399",
          "#60a5fa",
          "#fbbf24",
          "#a78bfa",
          "#f472b6",
          "#facc15",
          "#f43f5e",
          "#22d3ee",
          "#4ade80",
          "#f97316",
        ],
        borderColor: darkMode ? "#1f2937" : "#fff",
        borderWidth: 1,
      },
    ],
  };

  const cardStyle = {
    background: darkMode ? "#374151" : "white",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    color: darkMode ? "white" : "black",
  };

  return (
    <div style={cardStyle}>
      <h2>Summary</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>
            <strong>Balance:</strong> ₹{balance.toFixed(2)}
          </p>
          <p>
            <strong>Total Income:</strong> ₹{income.toFixed(2)}
          </p>
          <p>
            <strong>Total Expenses:</strong> ₹{expense.toFixed(2)}
          </p>
        </div>

        {transactions.length > 0 && (
          <div style={{ maxWidth: "400px", margin: "20px auto" }}>
            <Pie
              data={data}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: darkMode ? "white" : "black",
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ₹${value.toFixed(2)}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceSummary;
