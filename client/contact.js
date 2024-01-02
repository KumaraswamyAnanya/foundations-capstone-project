const cartList = document.querySelector('#cart-list')
var cartCounterText = document.querySelector("#cart-count");
var counter = 0;
var OrderIDHidden = document.querySelector("#OrderIDHidden");
var OrderName = document.getElementById("name-input");

document.cookie = 'OrderIDCookie=' + ""; 