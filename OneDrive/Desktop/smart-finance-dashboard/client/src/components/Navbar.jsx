function Navbar({
  darkMode,
  setDarkMode,
}) {
  return (
    <nav
      className={
        darkMode
          ? "bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center"
          : "bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center"
      }
    >
      <h1 className="text-2xl font-bold">
        Smart Finance Dashboard
      </h1>

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className="bg-white text-black px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
      >
        {darkMode
          ? "Light Mode"
          : "Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;