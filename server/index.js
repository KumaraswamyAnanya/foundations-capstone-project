require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
//const dataCtrl = require('./controller');
const {SERVER_PORT} = process.env
const {getMenu, createOrder,getMaxOrderID, getOrderItems, incrementItemQuantity, insertItemToCart, getCart,
        decrementItemQuantity, deleteItemFromCart, submitOrder, getSummary} = require('./controller.js')

app.use(express.json());
app.use(cors());


app.get('/menu2', getMenu);
app.post('/createOrder', createOrder)
app.get('/MaxOrderID', getMaxOrderID);
app.get('/getOrderItems', getOrderItems);
app.put('/incrementItemQuantity', incrementItemQuantity);
app.put('/decrementItemQuantity', decrementItemQuantity);
app.post('/deleteItemFromCart', deleteItemFromCart);
app.post('/insertItemToCart', insertItemToCart);
app.get('/getCart', getCart);
app.post('/submitOrder', submitOrder);
app.get('/getSummary', getSummary);


app.listen(SERVER_PORT, () => console.log(`hi. up on ${SERVER_PORT}`));