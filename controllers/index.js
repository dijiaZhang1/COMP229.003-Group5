exports.home = function(req, res, next) {
    
    res.redirect('/survey/list');
}


//module.exports.home = function(req, res, next) {
//    console.log(session.email);
//    res.render('index', { title: 'Home', isLog:session.email});
//};


/*
// create a reference to the model
let mongoose = require('mongoose');
let User = require('../models/user');
let passport = require('passport');

let jwt = require('jsonwebtoken');

let config = require('../config/config');




module.exports.login = function(req, res, next) {
    res.render('user/login', { title: 'Login', isLog:""});
};

module.exports.reg = function(req, res, next) {
    res.render('user/reg', { title: 'Reg', isLog:""});
};

module.exports.register = function(req, res, next) {
    let newItem = User({
        FirstName:req.body.name,
        LastName:req.body.name,
        password:req.body.password,
        email:req.body.email
    });
    
    User.create(newItem, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            session.email = req.body.email;
            res.render('index', { title: 'Register', isLog:session.email});
        }
    });
    // res.render('index', { title: 'Register', isLog:session.email});
};

module.exports.log = function(req,res,next){
    User.findOne({email:req.body.email}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs.password == req.body.password){
                session.email = req.body.email;
                res.render('index', { title: 'Home', isLog:session.email});
            }
        }
    });
};

module.exports.logout = function(req,res,next){
    req.session.destroy(function (err) {
        res.render('index', { title: 'Home', isLog:""});
       });
}

*/
