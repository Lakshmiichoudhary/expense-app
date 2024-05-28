const express = require("express");
const expenseController = require("../controllers/expense");
const authenticate = require("../middleware/auth")

const route = express.Router();

route.get("/",authenticate,expenseController.getExpense);
route.post("/",authenticate,expenseController.postExpense);
route.delete("/:id",authenticate,expenseController.deleteExpense);

module.exports = route