
import { useEffect, useState } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";
import CSVUpload from "../components/CSVUpload";
import Insights from "../components/Insights";

import API from "../services/api";

function Dashboard({ darkMode }) {

  const [expenses, setExpenses] =
    useState([]);

  const [budget, setBudget] =
    useState(5000);

  const fetchExpenses = async () => {
    try {

      const { data } =
        await API.get("/expenses");

      setExpenses(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const remainingBalance =
    budget - totalExpenses;

  const isOverBudget =
    totalExpenses > budget;

  return (
    <div className="p-6">

      <h2
        className={
          darkMode
            ? "text-4xl font-bold mb-8 text-white"
            : "text-4xl font-bold mb-8 text-black"
        }
      >
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div
          className={
            darkMode
              ? "bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
              : "bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
          }
        >

          <h3
            className={
              darkMode
                ? "text-xl font-semibold text-white mb-4"
                : "text-xl font-semibold text-black mb-4"
            }
          >
            Monthly Budget
          </h3>

          <input
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(
                Number(e.target.value)
              )
            }
            className={
              darkMode
                ? "w-full border border-gray-600 bg-slate-900 text-white p-3 rounded-lg"
                : "w-full border border-gray-300 bg-white text-black p-3 rounded-lg"
            }
          />

        </div>

        <div
          className={
            darkMode
              ? "bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
              : "bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
          }
        >

          <h3
            className={
              darkMode
                ? "text-xl font-semibold text-white mb-4"
                : "text-xl font-semibold text-black mb-4"
            }
          >
            Total Expenses
          </h3>

          <p className="text-4xl text-red-500 font-bold">
            ₹{totalExpenses}
          </p>

        </div>

        <div
          className={
            darkMode
              ? "bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
              : "bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
          }
        >

          <h3
            className={
              darkMode
                ? "text-xl font-semibold text-white mb-4"
                : "text-xl font-semibold text-black mb-4"
            }
          >
            Remaining Balance
          </h3>

          <p
            className={`text-4xl font-bold ${
              remainingBalance < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            ₹{remainingBalance}
          </p>

        </div>

      </div>

      {isOverBudget && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded-xl mb-6">
          ⚠️ Warning:
          You have exceeded your monthly budget!
        </div>
      )}

      <CSVUpload
        fetchExpenses={fetchExpenses}
        darkMode={darkMode}
      />

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        darkMode={darkMode}
      />

      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        darkMode={darkMode}
      />

      <div className="mt-6">
        <Charts
          expenses={expenses}
          darkMode={darkMode}
        />
      </div>

      <Insights
        expenses={expenses}
        darkMode={darkMode}
      />

    </div>
  );
}

export default Dashboard;