const cartList = document.querySelector('#cart-list')
var cartCounterText = document.querySelector("#cart-count");
var counter = 0;
var OrderIDHidden = document.querySelector("#OrderIDHidden");
var OrderName = document.getElementById("name-input");

function getCart() {
  OrderIDHidden.innerHTML = ('; '+document.cookie).split(`; OrderIDCookie=`).pop().split(';')[0];
    cartList.innerHTML = ''

    let counter1 = 0.0;
    let tablevar = '';
    let cartTableHeader = '<thead><tr> <th>Item Name</th> <th>Price</th> <th>Quantity</th> <th>Total Price</th></tr></thead>';
    let grandTotal = 0.0;
    let cartTableGrandTotal1 = '<thead><tr> <th>Order Total</th> <th></th> <th></th> <th>$ ';
    let cartTableGrandTotal2 = '</th></tr></thead>';
    axios.get('http://localhost:8080/getCart')
        .then(res => {
            res.data.forEach(elem => {
            if(elem.OrderID==OrderIDHidden.innerHTML)
            {
                let cartCard = `<tr>                    
                    <td>${elem.ItemName}</td>                     
                    <td>$ ${elem.ItemPrice}</td>  
                    <td><button onclick="decrementItemQuantity(${elem.ItemID}, ${elem.OrderID}, ${elem.ItemQuantity})">-</button>
                        ${elem.ItemQuantity}
                        <button onclick="incrementItemQuantity(${elem.ItemID}, ${elem.OrderID}, ${elem.ItemQuantity})">+</button>
                         </td>           
                         <td>$ ${elem.TotalItemPrice}</td>                       
                    </tr>
                `;
                grandTotal += elem.TotalItemPrice;
                tablevar += cartCard;
                counter1 = counter1 + parseInt(elem.ItemQuantity);
            }
            })
            cartList.innerHTML = '<table class="cartTable table">' +cartTableHeader + tablevar + cartTableGrandTotal1 + grandTotal + cartTableGrandTotal2 +'</table>';
            cartCounterText.textContent = counter1;
        })
}

function decrementItemQuantity(itemidParam, orderidParam, quantityParam)
{
  counter = cartCounterText.textContent;
  counter = parseInt(counter)-1;
    
  if (counter === 1) {
    cartCounterText.textContent = counter;
  } else {
    cartCounterText.textContent = counter;
  }

  let body = {
    itemid: itemidParam,
    orderid: orderidParam
    }

     if (quantityParam === 1 )
            {
                axios.post('http://localhost:8080/deleteItemFromCart', body)
                .then(res => {
                    getCart()
                })
            }
            else
            {
                axios.put('http://localhost:8080/decrementItemQuantity', body)
                .then(res => {
                    getCart()
                })                
            }
  
}

function incrementItemQuantity(itemidParam, orderidParam)
{
  counter = cartCounterText.textContent;
  counter = parseInt(counter)+1;

  if (counter === 1) {
    cartCounterText.textContent = counter;
  } else {
    cartCounterText.textContent = counter;
  }

  let body = {
    itemid: itemidParam,
    orderid: orderidParam
    }

    axios.put('http://localhost:8080/incrementItemQuantity', body)
    .then(res => {
        getCart()
    })                
           
  
}

getCart()


function onClickSubmit()
{
  let name = document.querySelector('#name-input').value;
  let phone = document.querySelector('#phoneNum-input').value;
  let email = document.querySelector('#email-input').value;
  let address = document.querySelector('#address-input').value;
  let zipcode = document.querySelector('#zipcode-input').value;
  let cardnumber = document.querySelector('#cardnumber-input').value;
  let expirydate = document.querySelector('#expirydate-input').value;
  let cvv = document.querySelector('#cvv-input').value;


  if (name == "" || phone == "" || email == "" || address == "" || 
  zipcode == "" || cardnumber == "" || expirydate == "" || cvv == "" )
   {
    alert("Please enter all the delivery details.");
      
  }else
  {
    let body = {
      orderName: OrderName.value,
      orderid: OrderIDHidden.innerHTML
    }

    axios.post('http://localhost:8080/submitOrder', body)
      .then(res => { 
        document.location = 'summary.html';
      })
  }
}
 