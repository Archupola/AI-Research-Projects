import { useState } from "react";
import API from "../services/api";

function ExpenseList({
  expenses,
  fetchExpenses,
  darkMode,
}) {
  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      title: "",
      amount: "",
      category: "",
    });

  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/expenses/${id}`
      );

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  };

  const startEditing = (expense) => {
    setEditingId(expense._id);

    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(
        `/expenses/${id}`,
        editData
      );

      setEditingId(null);

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white p-6 rounded-xl shadow-md hover:scale-[1.01] transition-all duration-300"
          : "bg-white p-6 rounded-xl shadow-md hover:scale-[1.01] transition-all duration-300"
      }
    >
      <h2 className="text-2xl font-bold mb-4">
        Recent Expenses
      </h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            className="border-b py-4"
          >
            {editingId === expense._id ? (
              <div className="grid md:grid-cols-4 gap-3">

                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      title:
                        e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg text-black"
                />

                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount:
                        e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg text-black"
                />

                <input
                  type="text"
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      category:
                        e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg text-black"
                />

                <button
                  onClick={() =>
                    handleUpdate(
                      expense._id
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>

              </div>
            ) : (
              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-semibold">
                    {expense.title}
                  </h3>

                  <p className="text-gray-400">
                    {expense.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <p className="font-bold text-red-500">
                    ₹{expense.amount}
                  </p>

                  <button
                    onClick={() =>
                      startEditing(expense)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        expense._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;