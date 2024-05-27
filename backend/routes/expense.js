const express = require("express");
const expenseController = require("../controllers/expense");

const route = express.Router();

route.get("/",expenseController.getExpense);
route.post("/",expenseController.postExpense);
route.delete("/:id",expenseController.deleteExpense);

module.exports = route