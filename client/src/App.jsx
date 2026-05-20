import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  return (

    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-950 text-white"
          : "min-h-screen bg-slate-100 text-black"
      }
    >

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>

        <Route
          path="/"
          element={
            <Dashboard
              darkMode={darkMode}
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;