import { useState } from "react";
import API from "../services/api";

function CSVUpload({
  fetchExpenses,
  darkMode,
}) {

  const [file, setFile] =
    useState(null);

  const handleUpload = async () => {

    if (!file) {
      return alert(
        "Please select a CSV file"
      );
    }

    const formData =
      new FormData();

    formData.append("file", file);

    try {

      await API.post(
        "/expenses/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "CSV uploaded successfully"
      );

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-md mb-6"
          : "bg-white border border-gray-200 p-6 rounded-2xl shadow-md mb-6"
      }
    >

      <h2
        className={
          darkMode
            ? "text-3xl font-bold text-white mb-6"
            : "text-3xl font-bold text-black mb-6"
        }
      >
        Upload CSV
      </h2>

      <div className="flex items-center gap-4 flex-wrap">

        <label className="bg-blue-600 text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-blue-700 transition">

          Choose CSV

          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="hidden"
          />

        </label>

        <span
          className={
            darkMode
              ? "text-gray-300"
              : "text-gray-700"
          }
        >
          {file
            ? file.name
            : "No file chosen"}
        </span>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Upload
        </button>

      </div>

    </div>
  );
}

export default CSVUpload;