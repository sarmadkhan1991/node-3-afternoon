require('dotenv').config();
const express = require("express");
const massive = require('massive');
const pc = require('./product_controller');
const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING).then(db => {
    console.log('database connected');
    app.set('db', db)
}).catch(err => console.log(err));

app.use(express.json());

app.get('/api/products', pc.getAll);

app.get('/api/products/:id', pc.getOne);

app.post('/api/products', pc.create);

app.put('/api/products/:id', pc.update);

app.delete('/api/products/:id', pc.delete);


app.listen(SERVER_PORT, () => console.log(`server listening on port: ${SERVER_PORT}`));