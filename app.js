var express = require('express');

var app = express();
var todocontroller = require('./controllers/todocontrollers');

//set up temlate engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todocontroller(app);


//listen to port
var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('All well listening to port ', PORT);
