const Expense = require("../models/expense");
const User = require("../models/user");

exports.postExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const userId = req.user.id; 
    try {
        const expense = await Expense.create({ amount, description, category, userId });
        
        // Update the user's total_expense
        const user = await User.findByPk(userId);
        user.total_expense += parseFloat(amount);
        await user.save();

        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getExpense = async (req, res) => {
    const userId = req.user.id; 
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
        const expense = await Expense.findOne({ where: { id, userId } });
        if (!expense) {
            return res.status(404).json("expense item not found");
        }

        // Subtract the expense amount from the user's total_expense
        const user = await User.findByPk(userId);
        user.total_expense -= parseFloat(expense.amount);
        await user.save();

        await expense.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
