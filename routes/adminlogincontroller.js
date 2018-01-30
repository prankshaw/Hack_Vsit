var mongoose = require('mongoose');
var express = require('express');
var flash = require('connect-flash');
var expressValidator = require('express-validator');

mongoose.Promise = global.Promise;

var go = express();


//include files from models folder
var User = require('../models/user');


//Connect to the database
mongoose.connect('mongodb://help_ops:help@ds133249.mlab.com:33249/help_ops');
var db = mongoose.connection;


  // authentication admin login
  // authentication
  go.post('/adminlogin',function(req,res){
   User.findOne( {Username:req.body.Username},function(err,user){
    if(user.Username=="ithelp@admin.login"){

      User.comparePassword(req.body.Password, user.Password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          var name=user.FirstName;
           res.render('admin',{ name: name});
          }
        });
      }

else{

          req.flash('error_msg', 'Unauthorised Login');
        res.redirect('adminlogin');
    }
      });
    });



    //logout function
    go.get('/logout', function(req, res){
      req.logout();
  });


module.exports = go;
