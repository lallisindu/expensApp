const express = require('express');

const route = express.Router();

const controller = require('../controllers/add.js');

route.post('/add-expense', controller.addExpense);

route.get('/all-expenses', controller.getExpenses);

route.get('/get-expense/:id', controller.getExpense);

route.post('/edit-expense', controller.postEdit);



module.exports = route;