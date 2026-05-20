import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(5000);
  const [darkMode, setDarkMode] = useState(false);

  const API = "https://ai-research-projects.onrender.com/api/expenses";

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(API);
    setExpenses(res.data);
  };

  const addExpense = async () => {
    if (!title || !amount || !category) return;

    await axios.post(API, {
      title,
      amount,
      category,
    });

    setTitle("");
    setAmount("");
    setCategory("");

    fetchExpenses();
  };

  const totalExpenses = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const remainingBalance = budget - totalExpenses;

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-100 text-black"
      }
    >
      <nav className="bg-blue-600 text-white p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Smart Finance Dashboard</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white text-black px-4 py-2 rounded-lg"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div
            className={
              darkMode
                ? "bg-gray-800 p-6 rounded-xl shadow-lg"
                : "bg-white p-6 rounded-xl shadow-lg"
            }
          >
            <h3 className="text-2xl font-bold mb-4">Monthly Budget</h3>

            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full p-3 rounded-lg border text-black"
            />
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 p-6 rounded-xl shadow-lg"
                : "bg-white p-6 rounded-xl shadow-lg"
            }
          >
            <h3 className="text-2xl font-bold mb-4">Total Expenses</h3>

            <p className="text-4xl text-red-500 font-bold">
              ₹{totalExpenses}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 p-6 rounded-xl shadow-lg"
                : "bg-white p-6 rounded-xl shadow-lg"
            }
          >
            <h3 className="text-2xl font-bold mb-4">Remaining Balance</h3>

            <p className="text-4xl text-red-500 font-bold">
              ₹{remainingBalance}
            </p>
          </div>
        </div>

        {remainingBalance < 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ Warning: You have exceeded your monthly budget!
          </div>
        )}

        <div
          className={
            darkMode
              ? "bg-gray-800 p-6 rounded-xl shadow-lg mb-6"
              : "bg-white p-6 rounded-xl shadow-lg mb-6"
          }
        >
          <h2 className="text-3xl font-bold mb-4">Upload CSV</h2>

          <div className="flex items-center gap-4">
            <input
              type="file"
              className="text-sm file:bg-blue-600 file:text-white file:px-4 file:py-2 file:border-0 file:rounded-lg"
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Upload
            </button>
          </div>
        </div>

        <div
          className={
            darkMode
              ? "bg-gray-800 p-6 rounded-xl shadow-lg"
              : "bg-white p-6 rounded-xl shadow-lg"
          }
        >
          <h2 className="text-3xl font-bold mb-6">Add Expense</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-lg border text-black"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 rounded-lg border text-black"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded-lg border text-black"
            />
          </div>

          <button
            onClick={addExpense}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;