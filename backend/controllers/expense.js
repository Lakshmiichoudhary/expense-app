const Expense = require("../models/expense");
const User = require("../models/user");

exports.postExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const userId = req.user.id; // Extracted from the JWT
    try {
        const expense = await Expense.create({ amount, description, category, userId });
        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getExpense = async (req, res) => {
    const userId = req.user.id; // Extracted from the JWT
    try {
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; 
    try {
        const result = await Expense.destroy({ where: { id, userId } });
        if (result === 0) {
            return res.status(404).json("expense item not found");
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};