const multer = require("multer");

const path = require("path");

const fs = require("fs");

const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });


const {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

router.get("/", getExpenses);

router.post("/", addExpense);

router.delete("/:id", deleteExpense);

router.put("/:id", updateExpense);

router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    const results = [];

    const csv = require("csv-parser");

    const Expense = require("../models/Expense");

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on("data", (data) => {
        results.push(data);
      })

      .on("end", async () => {

        try {

          for (const item of results) {

            await Expense.create({
              title: item.title,
              amount: Number(item.amount),
              category: item.category,
            });

          }

          res.json({
            message:
              "CSV data imported successfully",
          });

        } catch (error) {

          res.status(500).json({
            message: error.message,
          });

        }
      });
  }
);
module.exports = router;