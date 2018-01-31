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
           res.redirect('admin');
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
  //notesview
  go.get('/notesview', function(req, res){
  	res.render('notesview');
  });
  go.get('/bot', function(req, res){
  	res.render('bot');
  });
  go.get('/login', function(req, res){
  		res.render('login');
  });

  go.get('/about', function(req, res){
  		res.render('about');
  });

module.exports = go;
