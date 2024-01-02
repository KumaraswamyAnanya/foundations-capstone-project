const menuList1 = document.querySelector('#menu-list1')
const menuList2 = document.querySelector('#menu-list2')
const menuList3 = document.querySelector('#menu-list3')
const menuList4 = document.querySelector('#menu-list4')
const menuCategory1 = document.querySelector('#menuCategory1')
const menuCategory2 = document.querySelector('#menuCategory2')
const menuCategory3 = document.querySelector('#menuCategory3')
const menuCategory4 = document.querySelector('#menuCategory4')
var cartCounterText = document.querySelector("#cart-count");
var counter = 0;
var OrderIDHidden = document.querySelector("#OrderIDHidden");


function getMenu() {
    OrderIDHidden.innerHTML = ('; '+document.cookie).split(`; OrderIDCookie=`).pop().split(';')[0];
    let counter1 = 0.0;

    for(let i=1; i<=4; i++)
    {
        let menuNum = '#menu-list' + i; 
        let menuvar = document.querySelector(menuNum);
        menuvar.innerHTML = '';

    axios.get('http://localhost:8080/menu2')
        .then(res => {
            res.data.forEach(elem => {
                if(elem.Category===i)
                {
                let menuCard = `<div class="menu-card">
                    <img alt='menu cover' src=${elem.ImageURL} class="menu-cover"/> 
                    <h2>${elem.ItemName}</h2>
                    <h3>${elem.ItemDescription}</h3>
                    <h3>$ ${elem.ItemPrice}</h3>     
                    <button class="add-btn" onclick="addToCart(${elem.ItemID})">Add to Cart</button>               
                    </div>
                `
                menuvar.innerHTML += menuCard
                }
            })        
        })
    }  

    cartCounterText.textContent = '';
    counter1 = 0.0;

    axios.get('http://localhost:8080/getCart')
    .then(res => {
    //let myArray = res.data.find(x => x.OrderID==1);
    res.data.forEach(elem => {
    if(elem.OrderID==OrderIDHidden.innerHTML)
    {
        counter1 = counter1 + parseInt(elem.ItemQuantity);
    }
    })
    cartCounterText.textContent = counter1;
    })
}

function addToCart(param)
{
    counter = cartCounterText.textContent;
  counter = parseInt(counter)+1;
  
  if (counter === 1) {
    cartCounterText.textContent = counter;
  } else {
    cartCounterText.textContent = counter;
  }

  let body = {
    itemid: param,
    orderid: OrderIDHidden.innerHTML
}

  ////
  if(OrderIDHidden.innerHTML === "")
  {
    axios.post('http://localhost:8080/createOrder', body)
    .then(res => {
        axios.get('http://localhost:8080/MaxOrderID')
        .then(res => {
            OrderIDHidden.innerHTML = res.data[0].OrderID;      
            
            document.cookie = 'OrderIDCookie=' + res.data[0].OrderID;              
                
        })
    })
  }
   else
    {
        axios.get('http://localhost:8080/getOrderItems')
        .then(res => {

            let myArray = res.data.find(x => x.OrderID==OrderIDHidden.innerHTML && x.ItemID== param);

            if (myArray === undefined || myArray === null)//insert row
            {
                axios.post('http://localhost:8080/insertItemToCart', body);
            }
            else
            {
                axios.put('http://localhost:8080/incrementItemQuantity', body);                
            }
        })
    }
  }

  getMenu()

function onChangeFoodCategory(param)
{
    let category = param.value;

    if(category == '1')
    {
        menuCategory1.style.display = "flex";
        menuCategory2.style.display = "none";
        menuCategory3.style.display = "none";
        menuCategory4.style.display = "none";
    }
    else if(category == '2')
    {
        menuCategory1.style.display = "none";
        menuCategory2.style.display = "flex";
        menuCategory3.style.display = "none";
        menuCategory4.style.display = "none";
    }
    else if(category == '3')
    {
        menuCategory1.style.display = "none";
        menuCategory2.style.display = "none";
        menuCategory3.style.display = "flex";
        menuCategory4.style.display = "none";
    }
    else if(category == '4')
    {
        menuCategory1.style.display = "none";
        menuCategory2.style.display = "none";
        menuCategory3.style.display = "none";
        menuCategory4.style.display = "flex";
    }
    else{
        menuCategory1.style.display = "flex";
        menuCategory2.style.display = "flex";
        menuCategory3.style.display = "flex";
        menuCategory4.style.display = "flex";
    }
}