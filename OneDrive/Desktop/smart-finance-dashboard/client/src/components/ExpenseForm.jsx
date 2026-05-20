import { useState } from "react";
import API from "../services/api";

function ExpenseForm({
  fetchExpenses,
  darkMode,
}) {
  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/expenses", {
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

  return (
    <form
      onSubmit={handleSubmit}
      className={
        darkMode
          ? "bg-gray-800 text-white p-6 rounded-xl shadow-md mb-6 hover:scale-[1.01] transition-all duration-300"
          : "bg-white p-6 rounded-xl shadow-md mb-6 hover:scale-[1.01] transition-all duration-300"
      }
    >
      <h2 className="text-2xl font-bold mb-4">
        Add Expense
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border border-gray-600 bg-slate-900 text-white p-3 rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border border-gray-600 bg-slate-900 text-white p-3 rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border border-gray-600 bg-slate-900 text-white p-3 rounded-lg"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;