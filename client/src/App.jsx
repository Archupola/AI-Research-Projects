import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(5000);
  const [darkMode, setDarkMode] = useState(false);

  const API_URL =
    "https://ai-research-projects.onrender.com/api/expenses";

  // FETCH EXPENSES
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ADD EXPENSE
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
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE EXPENSE
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL EXPENSES
  const totalExpenses = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const remainingBalance = budget - totalExpenses;

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="container">
        <h1>Smart Finance Dashboard</h1>

        {/* DARK MODE */}
        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <h2>Dashboard</h2>

        {/* BUDGET */}
        <div className="budget-section">
          <h3>Monthly Budget</h3>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            placeholder="Enter Budget"
          />
        </div>

        {/* TOTAL */}
        <div className="summary">
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

        {/* ANALYTICS */}
        <div className="analytics">
          <h2>Expense Analytics</h2>

          <div className="chart-placeholder">
            📊 Pie Chart Analytics Coming Here
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="insights">
          <h2>AI Insights</h2>

          <p>
            💰 Total Spending: <strong>₹{totalExpenses}</strong>
          </p>

          <p>
            📊 Highest Spending Category: <strong>Shopping</strong>
          </p>

          <p>
            🤖 Insight: You are spending the most on{" "}
            <strong>Shopping</strong>. Consider reducing expenses in this
            category.
          </p>
        </div>

        {/* ADD EXPENSE */}
        <div className="add-expense">
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

        {/* EXPENSE LIST */}
        <div className="expense-list">
          <h2>Expense History</h2>

          {expenses.map((expense) => (
            <div className="expense-card" key={expense._id}>
              <div>
                <h3>{expense.title}</h3>
                <p>{expense.category}</p>
              </div>

              <div>
                <h3>₹{expense.amount}</h3>

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