const cartList = document.querySelector('#cart-list')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')
const p4 = document.querySelector('#p4')
var cartCounterText = document.querySelector("#cart-count");
var counter = 0;
var OrderIDHidden = document.querySelector("#OrderIDHidden");
var OrderName = document.getElementById("name-input");

function getCart() {
  OrderIDHidden.innerHTML = ('; '+document.cookie).split(`; OrderIDCookie=`).pop().split(';')[0];
    cartList.innerHTML = ''

    let tablevar = '';
    let cartTableHeader = '<thead><tr> <th>Item Name</th> <th>Price</th> <th>Quantity</th> <th>Total Price</th></tr></thead>';
    let grandTotal = 0.0;
    let cartTableGrandTotal1 = '<thead><tr> <th>Order Total</th> <th></th> <th></th> <th>$ ';
    let cartTableGrandTotal2 = '</th></tr></thead>';


    axios.get('http://localhost:8080/getCart')
        .then(res => {
            //let myArray = res.data.find(x => x.OrderID==1);
            res.data.forEach(elem => {
            if(elem.OrderID==OrderIDHidden.innerHTML)
            {
                let cartCard = `<tr>                    
                    <td>${elem.ItemName}</td>                     
                    <td>$ ${elem.ItemPrice}</td>  
                    <td>${elem.ItemQuantity}</td>           
                         <td>$ ${elem.TotalItemPrice}</td>    <br/>                        
                    </tr>
                `;
                grandTotal += elem.TotalItemPrice;
                tablevar += cartCard;
            }
            })
            cartList.innerHTML = '<table class="cartTable table">' +cartTableHeader + tablevar + cartTableGrandTotal1 + grandTotal + cartTableGrandTotal2 +'</table>';

            axios.get('http://localhost:8080/getSummary')
        .then(res => {
            res.data.forEach(elem => {
                if(elem.OrderID==OrderIDHidden.innerHTML)
                {
                    let summaryline1 = elem.OrderName+ ", your order is in.";
                    let summaryline2 = 'We truly appreciate you shopping with us.';
                    let summaryline3 = 'Order Number : '+ elem.OrderNumber;
                    let summaryline4 = 'Order Date : '+ elem.OrderTime;
            
                    p1.innerHTML = summaryline1;
                    p2.innerHTML = summaryline2;
                    p3.innerHTML = summaryline3;
                    p4.innerHTML = summaryline4;

                    document.cookie = 'OrderIDCookie=' + "";   
                }
            })
        })
        
            
    })
}

getCart()


 