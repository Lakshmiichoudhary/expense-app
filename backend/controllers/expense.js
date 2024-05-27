const Expense = require("../models/expense")
const User = require("../models/user")

exports.postExpense = async (req,res) => {
    const {amount,description,category} = req.body
    try{
        const expense = await Expense.create({amount,description,category})
        res.status(201).json(expense);
    }catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

exports.getExpense = async (req,res) => {
    try{
        const expense = await Expense.findAll();
        res.status(201).json(expense)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.deleteExpense = async (req,res) => {
    const {id} = req.params;
    try{
        const result = await Expense.destroy({where : {id}});
        if(result === 0){
            return res.status(404).json("expense item not found")
        }
        res.sendStatus(204);
    }catch(error){
        console.error(error)
        res.status(500).json({error : error.message})
    }
}