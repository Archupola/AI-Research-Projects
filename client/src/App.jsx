import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF1493",
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(20000);
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);

  const API = "https://ai-research-projects.onrender.com/api/expenses";

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API);
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addExpense = async () => {
    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(API, {
        title,
        amount,
        category,
      });

      setExpenses([...expenses, res.data]);

      setTitle("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    alert("CSV Uploaded Successfully ✅");
  };

  const totalExpenses = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const remainingBalance = budget - totalExpenses;

  const chartData = [];

  expenses.forEach((expense) => {
    const existing = chartData.find(
      (item) => item.name === expense.category
    );

    if (existing) {
      existing.value += Number(expense.amount);
    } else {
      chartData.push({
        name: expense.category,
        value: Number(expense.amount),
      });
    }
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <h1 className="main-heading">Smart Finance Dashboard</h1>

        <button
          className="mode-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="card">
          <h2>Dashboard</h2>

          <h3>Monthly Budget</h3>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />

          <h3>Total Expenses</h3>
          <p>₹{totalExpenses}</p>

          <h3>Remaining Balance</h3>
          <p>₹{remainingBalance}</p>

          {remainingBalance < 0 && (
            <p className="warning">
              ⚠ Warning: You have exceeded your monthly budget!
            </p>
          )}
        </div>

        <div className="chart-box">
          <h2>Expense Analytics</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="insights">
          <h2>AI Insights</h2>

          <p>
            💰 Total Spending: <b>₹{totalExpenses}</b>
          </p>

          {chartData.length > 0 && (
            <p>
              📊 Highest Spending Category:{" "}
              <b>
                {
                  chartData.reduce((max, item) =>
                    item.value > max.value ? item : max
                  ).name
                }
              </b>
            </p>
          )}
        </div>

        <div className="card">
          <h2>Upload CSV</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                background: "white",
                color: "black",
                maxWidth: "250px",
              }}
            />

            <button onClick={handleUpload}>
              Upload CSV
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Add Expense</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button onClick={addExpense}>
            Add Expense
          </button>
        </div>

        <div className="card">
          <h2>Expense List</h2>

          {expenses.map((expense) => (
            <div className="expense-item" key={expense._id}>
              <div>
                <h3>{expense.title}</h3>
                <p>
                  ₹{expense.amount} - {expense.category}
                </p>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteExpense(expense._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;