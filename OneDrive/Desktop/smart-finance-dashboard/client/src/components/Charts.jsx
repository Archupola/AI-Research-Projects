import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Charts({
  expenses,
  darkMode,
}) {

  const categoryData = {};

  expenses.forEach((expense) => {

    if (
      categoryData[
        expense.category
      ]
    ) {

      categoryData[
        expense.category
      ] += expense.amount;

    } else {

      categoryData[
        expense.category
      ] = expense.amount;

    }
  });

  const data = {
    labels:
      Object.keys(categoryData),

    datasets: [
      {
        label: "Expenses",

        data:
          Object.values(
            categoryData
          ),

        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EC4899",
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-md"
          : "bg-white border border-gray-200 p-6 rounded-2xl shadow-md"
      }
    >

      <h2
        className={
          darkMode
            ? "text-3xl font-bold text-white mb-6"
            : "text-3xl font-bold text-black mb-6"
        }
      >
        Expense Analytics
      </h2>

      {expenses.length > 0 ? (

        <div className="w-[280px] md:w-[350px] mx-auto">
          <Pie data={data} />
        </div>

      ) : (

        <p>No expense data available.</p>

      )}

    </div>
  );
}

export default Charts;