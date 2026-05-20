function Insights({
  expenses,
  darkMode,
}) {
  const total = expenses.reduce(
    (acc, item) =>
      acc + item.amount,
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (
      categoryTotals[
        expense.category
      ]
    ) {
      categoryTotals[
        expense.category
      ] += expense.amount;
    } else {
      categoryTotals[
        expense.category
      ] = expense.amount;
    }
  });

  const highestCategory =
    Object.keys(
      categoryTotals
    ).reduce(
      (a, b) =>
        categoryTotals[a] >
        categoryTotals[b]
          ? a
          : b,
      Object.keys(
        categoryTotals
      )[0]
    );

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white p-6 rounded-xl shadow-md mt-6"
          : "bg-white p-6 rounded-xl shadow-md mt-6"
      }
    >
      <h2 className="text-2xl font-bold mb-4">
        AI Insights
      </h2>

      {expenses.length > 0 ? (
        <div className="space-y-3">

          <p>
            💰 Total Spending:
            <span className="font-bold">
              {" "}₹{total}
            </span>
          </p>

          <p>
            📊 Highest Spending Category:
            <span className="font-bold">
              {" "}
              {highestCategory}
            </span>
          </p>

          <p>
            🤖 Insight:
            You are spending the most on{" "}
            <span className="font-bold">
              {highestCategory}
            </span>.
            Consider reducing expenses
            in this category.
          </p>

        </div>
      ) : (
        <p>
          No insights available yet.
        </p>
      )}
    </div>
  );
}

export default Insights;