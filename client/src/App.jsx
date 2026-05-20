import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(20000);
  const [darkMode, setDarkMode] = useState(false);

  const API_URL =
    "https://ai-research-projects.onrender.com/api/expenses";

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
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
      await axios.post(API_URL, {
        title,
        amount,
        category,
      });

      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const totalExpenses = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const remainingBalance = budget - totalExpenses;

  const categoryData = {};

  expenses.forEach((expense) => {
    if (categoryData[expense.category]) {
      categoryData[expense.category] += Number(expense.amount);
    } else {
      categoryData[expense.category] = Number(expense.amount);
    }
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA00FF",
    "#FF4560",
  ];

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

        <h2>Dashboard</h2>

        <div className="card">
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
              ⚠ Warning: You exceeded your budget!
            </p>
          )}
        </div>

        {/* PIE CHART */}

        <div className="chart-box">
          <h2>Expense Analytics</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
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

        {/* AI INSIGHTS */}

        <div className="insights">
          <h2>AI Insights</h2>

          <p>
            💰 Total Spending: <strong>₹{totalExpenses}</strong>
          </p>

          <p>
            📊 Categories Tracked:{" "}
            <strong>{Object.keys(categoryData).length}</strong>
          </p>

          <p>
            🤖 Smart Insight: Track your spending regularly to avoid
            overspending.
          </p>
        </div>

        {/* ADD EXPENSE */}

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

          <button onClick={addExpense}>Add Expense</button>
        </div>

        {/* EXPENSE HISTORY */}

        <div className="card">
          <h2>Expense History</h2>

          {expenses.map((expense) => (
            <div className="expense-item" key={expense._id}>
              <div>
                <h4>{expense.title}</h4>
                <p>{expense.category}</p>
              </div>

              <div>
                <h4>₹{expense.amount}</h4>

                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(expense._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;