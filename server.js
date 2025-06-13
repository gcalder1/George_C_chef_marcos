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

app.use(express.json()); //app lvl middleware

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
/*
we're creating a GET route for the client to pull up the information
about the menu items
*/
    const searchPrice = request.query.maxPrice;
    const priceNumber = Number(searchPrice);
    /*
    however, instead of showing the menu, we will show certain menu items
    based on the query made by the client, which we are grabbing the value
    of and then turning it into a number since the value is a string
    */

    if (!priceNumber) {
        return response.send(menu).end();
    } else {
        let menuItemsBelowMyPrice = menu.filter(menuItem => menuItem.price <= priceNumber)
        return response.send(menuItemsBelowMyPrice).end();
    }
    /*
    to show the menu, we are using an error-first format to decide when not
    to show the unfiltered menu vs when to show the menu items that comply
    with the filter itself. Both are sent using the .send() method as json
    objects, where the body of the response will be that filtered or unfiltered
    menu
    */

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
/*
we're creating a post route to recieve reservation json data and then
format the response to the client in a readable way
*/

    let reservationName = request.body.name;
    let reservationDate = request.body.date;
    let reservationTime = request.body.time;
    /*
    we are pointing to the different keys with the json data from the 
    incoming json data (thanks to the app level middleware) so that we can
    use that information to interpolate the values into a message via a
    template literal
    */

    if (!reservationName || !reservationDate || !reservationTime) {
        return response.status(400).send("Missing name, date or time").end();
    } else {
        return response.status(201).send(`${reservationName}, thank you
            for reserving at Chef Marco's Restaurant on ${reservationDate}
            at ${reservationTime}! Your reservation is confirmed`).end();
    }
    /*
    if we miss any sort of info within the reservation, the response will
    send 400 status code and a message that tells the user that they made a
    bad request and why it was "bad". If not, then we "confirm" the 
    reservation with the client via template literal of the data
    */

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


