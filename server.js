const express = require("express"); //we're importing express to this file

const app = express(); //we're creating a new app using express for this instance

const menu = [
 {
   id: 1,
   dish: "Baked Shrimp Scampi",
   price: 20
 },
 {
   id: 2,
   dish: "Chicken Parmigiana",
   price: 14
 },
 {
   id: 3,
   dish: "Margherita Pizza",
   price: 17
 },
 {
   id: 4,
   dish: "Penne with Vodka Sauce",
   price: 18
 }
];

app.use(express.json());

app.get("/", function (request, response) {
/*
creates a new GET route at the root to (not send info) receive a response
from the DB (in this case our restuarant server)
*/

    response.send("Welcome to Chef Marco's Italian Bistro!").end();
    /*
    we're create a response with the restaurant msg in the body and then
    ending the response to tell the client we're not sending anything else
    */
});

app.get("/menu", function (request, response) {
    const searchPrice = request.query.maxPrice;
    const priceNumber = Number(searchPrice);

    if (!priceNumber) {
        return response.send(menu).end();
    } else {
        let menuItemsBelowMyPrice = menu.filter(menuItem => menuItem.price <= priceNumber)
        return response.send(menuItemsBelowMyPrice).end();
    }

});

app.get("/menu/:menuItem", function (request, response) {
/*
:menuItem is a route parameter that will take whatever value we put and
capture it to use, which in this case we want to use it to access the 
specific food item from the array of objects
*/

    const menuItemIDRequested = request.params.menuItem;
    /*
    we're grabbing what the client puts in the url as what they want to
    access from the menu ( in this case the int val of the id of the menu
    item )
    */

    response.send(menu[menuItemIDRequested - 1]).end();
    /*
    we're using that value to access that specific obj from the menu arr
    by targetting the index using the value input from the client - 1 (because
    the obj are located on indexes within the array)
    */

});

app.post("/reservations", function (request, response) {

    let reservation = request.body;


    
});



//setting up the port upon which our express app will listen to and show
//us whatever we need to see
app.listen(8080, function () {

    //when we node server.js , this gets executed and prints to console
    console.log
    (
        "Server is listening on 8080"
    );
});


