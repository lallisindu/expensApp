const ul = document.querySelector('#expenses');
const form = document.querySelector('#user-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const desc = document.getElementById('desc').value;
    const category = document.getElementById('option').value;
    const obj = {
        amount,
        desc,
        category
    };

    if (document.getElementById('hidden')) {
        try {
            console.log('it is hidden');
            obj.id = document.getElementById('hidden').value;

            let result = await axios.post(`http://localhost:5000/expense/edit-expense`, obj);
            displayExpenses(result.data);
            form.reset();
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            console.log('no hidden input');

            let result = await axios.post('http://localhost:5000/expense/add-expense', obj);
            displayExpenses(result.data);
            form.reset();
        }
        catch (err) {
            console.log(err);
        }
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let result = await axios.get('http://localhost:5000/expense/all-expenses');
        console.log(result.data);
        result.data.forEach(expense => displayExpenses(expense));
    }
    catch (err) {
        console.log(err);
    }
})

function displayExpenses(obj) {
    let li = document.createElement('li');
    li.id = obj.id;
    li.innerHTML = `${obj.amount} - ${obj.description} - ${obj.category} <button class='btn btn-sm btn-danger' onclick='deleteExpense(${obj.id})'>Delete</button> <button class='btn btn-sm btn-success' onclick='editExpense(${obj.id})'>Edit</button>`;
    ul.appendChild(li);
}

async function deleteExpense(id) {
    try {

        await axios.get(`http://localhost:5000/expense/delete-expense/${id}`);
        console.log(document.getElementById(`${id}`), 'to be deleted');
        document.getElementById(`${id}`).remove();
    }
    catch (err) {
        console.log({ error: `${err}` });
    }
}

async function editExpense(id) {
    try {

        let result = await axios.get(`http://localhost:5000/expense/get-expense/${id}`);
        console.log(result.data);

        document.getElementById('user-form').setAttribute('action', 'http://localhost:5000/expense/edit-expense');
        document.getElementById('user-form').setAttribute('method', 'post');
        document.getElementById('user-form').innerHTML += `<input type='hidden' name='id' value='${id}' id='hidden'>`;

        document.getElementById('amount').value = result.data.amount;
        document.getElementById('desc').value = result.data.description;
        document.getElementById('option').value = result.data.category;
        document.querySelector('.btn-outline-dark').value = 'Update Expense';
        document.getElementById(`${id}`).remove();
    }
    catch (err) {
        console.log(err);
    }
}