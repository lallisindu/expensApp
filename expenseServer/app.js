const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./util/database');
const addRoute = require('./routes/add');
const deleteRoute = require('./routes/deleteExpense');

app.use(cors());

app.use(bodyParser.json( {extended: false} ));

app.use('/expense',addRoute);
app.use('/expense',deleteRoute);

sequelize.sync()
.then( (r) => {
    app.listen(5000);
})
.catch(err => console.log(err));
