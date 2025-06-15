const express = require("express"); 

const app = express(); 

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

const secretMenu = [
{
    id: 1,
    dish: "Orc Finger Nachos",
    price: 9
},
{
    id: 2,
    dish: "Phoenix Tears Risotto",
    price: 15
},
{
    id: 3,
    dish: "Dragon's Onion Soup",
    price: 12
},
{
    id: 4,
    dish: "The Forbidden Cheese Platter",
    price: 20
}
]

app.use(express.json()); 

app.use((request, response, next) => {


    const timeDate = new Date();

    const capturedDateFromInput = timeDate.toISOString();

    const methodFromInput = request.method;

    const pathFromInput = request.path;

    const logger = `[${capturedDateFromInput}] ${methodFromInput} ${pathFromInput}`;

    console.log(logger);

    next();
   

});

const isChef = (request, response, next) => {


    if (request.headers.role !== "chef") {
        return response.status(401).json({
            error: 
            "Your credentials as a chef are lacking. Please come back when you are a chef."
        });
    } else {
        next();
    }
    

};

app.get("/", function (request, response) {


    response.send("Welcome to Chef Marco's Italian Bistro!").end();
    
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


    const menuItemIDRequested = request.params.menuItem;
    

    response.send(menu[menuItemIDRequested - 1]).end();
    
});

app.post("/reservations", function (request, response) {


    let reservationName = request.body.name;
    let reservationDate = request.body.date;
    let reservationTime = request.body.time;
    

    if (!reservationName || !reservationDate || !reservationTime) {
        return response.status(400).send("Missing name, date or time").end();
    } else {
        return response.status(201).send(`${reservationName}, thank you
            for reserving at Chef Marco's Restaurant on ${reservationDate}
            at ${reservationTime}! Your reservation is confirmed`).end();
    }
    

});

app.get("/chef/secret-recipe", isChef, function (request, response) {

    response.send({
        recipe: "The secret recipe for foobar stew includes: A orc finger's nail, tears of a phoenix, 2 whole onions, the cheese.",
        secretTip: "You can use the /chef/secret-recipe/secret-menu route to see our..unique.. items that contain our secret recipe items."
    }).end();
    

});

app.get("/chef/secret-recipe/secret-menu", isChef, function (request, response){

    response.send(secretMenu).end();
})



app.listen(8080, function () {

    console.log
    (
        "Server is listening on 8080"
    );
});


