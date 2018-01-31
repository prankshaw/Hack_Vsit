var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var path = require('path');
var exphbs = require('express-handlebars');
var cloudinary = require('cloudinary');
var multer  =   require('multer');
var cloudinaryStorage = require('multer-storage-cloudinary');
var passport = require('passport');

var go = express();

//include files from directory....
var logincontroller = require('./routes/logincontroller');
var adminlogincontroller = require('./routes/adminlogincontroller');
var uploadingadmin = require('./routes/uploadingadmin');
var user = require('./models/user');



//set up emplate engine
go.set('views', path.join(__dirname, 'views'));
go.engine('handlebars', exphbs({defaultLayout:'layout'}));
go.set('view engine', 'handlebars');

//static files
go.use(express.static((__dirname, 'public')));


//include files from routes folder
 var users = require('./routes/logincontroller');




// BodyParser Middleware
go.use(bodyParser.json());
go.use(bodyParser.urlencoded({ extended: false }));
go.use(cookieParser());

//s

//Express Session
go.use(session({
  secret: 'secretsmmsmsmmm',
  saveUninitialized : true,
  resave : true
}));






//flash
go.use(flash());

go.use(checkAuth);

function checkAuth (req, res, next) {
  // don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (((req.url === '/request') || (req.url === '/userloggedin') || (req.url === '/userloggedin/upload/Semester%203') || (req.url === '/userloggedin/upload/Semester%204') ||(req.url ==='/userloggedinbuzzer4%') ) && (!req.session || !req.session.authenticated)) {
    req.flash('error',"You need to login First");
    res.redirect('/login');
		return;
	}

	next();
}

//express-validator
go.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      var root    = namespace.shift()
      var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Global vars
go.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
});



//use included files
go.use(logincontroller );
go.use(adminlogincontroller );
go.use(uploadingadmin );


go.use( '/user',user);

var PORT = process.env.PORT || 3000;
go.listen(PORT);

console.log('All well listening to port ', PORT);

console.log("listen to the port 3000");
