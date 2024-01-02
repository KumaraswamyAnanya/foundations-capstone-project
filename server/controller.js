require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');


const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {

    getMenu: (req,res) => {
        sequelize.query(`select * from "Menu" order by "Menu"."ItemName";`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getMaxOrderID: (req,res) => {
        sequelize.query(`select * from "Orders"  order by 1 desc limit 1;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getOrderItems: (req,res) => {
        sequelize.query(`select * from "OrderItems";`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    createOrder: (req,res) => {
       const ItemID = req.body.itemid;

         sequelize.query(`      
        insert into "Orders" values (COALESCE((select max("OrderID")+1 from "Orders"),1),'SC'|| (1000 +COALESCE((select max("OrderID")+1 from "Orders"),1)),null,null);
        insert into "OrderItems" values (COALESCE((select max("OrderItemsID")+1 from "OrderItems"),1), (select max("OrderID") from "Orders"),${ItemID},1);
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    incrementItemQuantity: (req,res) => {
        const ItemID = req.body.itemid;
        const OrderID = req.body.orderid;
 
          sequelize.query(`      
          update "OrderItems" set "ItemQuantity" = "ItemQuantity" +1 where "OrderID"=${OrderID} and "ItemID" =${ItemID};
         `)
         .then(dbRes => res.status(200).send(dbRes[0]))
         .catch(err => console.log(err))
     },

     decrementItemQuantity: (req,res) => {
        const ItemID = req.body.itemid;
        const OrderID = req.body.orderid;
        
          sequelize.query(`      
          update "OrderItems" set "ItemQuantity" = "ItemQuantity" -1 where "OrderID"=${OrderID} and "ItemID" =${ItemID};
         `)
         .then(dbRes => res.status(200).send(dbRes[0]))
         .catch(err => console.log(err))
     },
     deleteItemFromCart: (req,res) => {
        const ItemID = req.body.itemid;
        const OrderID = req.body.orderid;
        
          sequelize.query(`      
          delete from "OrderItems" where "OrderID" =${OrderID} and "ItemID" =${ItemID};
         `)
         .then(dbRes => res.status(200).send(dbRes[0]))
         .catch(err => console.log(err))
     },

     insertItemToCart: (req,res) => {
        const ItemID = req.body.itemid;
        const OrderID = req.body.orderid;
 
          sequelize.query(`
         insert into "OrderItems" values (COALESCE((select max("OrderItemsID")+1 from "OrderItems"),1), ${OrderID},${ItemID},1);
         `)
         .then(dbRes => res.status(200).send(dbRes[0]))
         .catch(err => console.log(err))
     },

     getCart: (req,res) => {
        sequelize.query(`select "OrderID" ,"OrderItems"."ItemID","ItemQuantity","ItemName","ItemPrice", "ItemQuantity"*"ItemPrice" as "TotalItemPrice" from "OrderItems" left join "Menu" on "OrderItems"."ItemID" = "Menu"."ItemID" order by "Menu"."ItemName";`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    submitOrder: (req,res) => {
        const orderid = req.body.orderid;
        const orderName = req.body.orderName;
         
          sequelize.query(`      
          update "Orders" set "OrderName"='${orderName}', "OrderTime" = NOW() where "OrderID"=${orderid};
         `)
         .then(dbRes => res.status(200).send(dbRes[0]))
         .catch(err => console.log(err))
     }
     ,
     getSummary: (req,res) => {
                  
           sequelize.query(`      
           select "OrderID", "OrderName", "OrderNumber",  date("OrderTime") as "OrderTime" from "Orders"
          `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
      }
}