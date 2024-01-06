const Expense = require('../models/expense');

exports.addExpense = (req, res, next) => {

    const desc = req.body.desc;
    const amount = req.body.amount;
    const category = req.body.category;
    if(!category){
        throw new Error('Please select a category!');
    }

    Expense.create({
        description: desc,
        amount: amount,
        category: category
    })
    .then((rep) => res.json(rep))
    .catch(err => res.status(500).json({error: err}));
}

exports.getExpenses = async (req, res, next) => {
    try{
        result = await Expense.findAll();
        res.json(result);
    }
    catch(err){
        res.json({Error:err});
    }
}

exports.getExpense = async (req,res,next) => {
    try{

        const expenseId = req.params.id;
        
        let expense = await Expense.findOne({where: {id: expenseId}});
        res.json(expense.dataValues);
    }
    catch(err){
        res.json({Error: err});
    }
}

exports.postEdit = async (req, res, next) => {
    try {

        let expenseId = req.body.id;
        const updatedDesc = req.body.desc;
        const updatedAmount = req.body.amount;
        const updatedCategory = req.body.category;
        console.log(req.body,'pre edit');
        
        requiredExpense = await Expense.findOne({where: {id: expenseId}})
        const dataValues = {
            description: updatedDesc,
            amount: updatedAmount,
            category: updatedCategory
        };
        updatedExpense = await requiredExpense.update(dataValues);
        res.json(updatedExpense);
    }
    catch(err){
        res.json({Error: err});
    }
}