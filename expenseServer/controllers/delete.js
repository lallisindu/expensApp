const Expense = require('../models/expense');

module.exports = (req, res, next) => {
    const expenseId = req.params.id;
    console.log(expenseId,req.body);

    Expense.destroy({where: {id: expenseId}})
    .then( (expense) => {
        console.log(expense,'error when trying to delete');
        res.json(expense);
    })
    .catch(err => console.log(err));
}