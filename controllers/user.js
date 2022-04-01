let User = require('../models/user');
let passport = require('passport');

let jwt = require('jsonwebtoken');

let config = require('../config/config');

// exports.user = function(req, res, next) {
//     res.render('user', { 
//         title: 'Users',
//         name: 'Student'
//     });
// }

// exports.julio = function(req, res, next) {
//     res.render('user', { 
//         title: 'User',
//         name: 'Julio'
//     });
// }

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

  // module.exports.renderSignup = function(req, res, next) {
  //   if (!req.user) {
  
  //     // creates a empty new user object.
  //     let newUser = User();
  
  //     res.render('auth/signup', {
  //       title: 'Sign-up Form',
  //       messages: req.flash('error'),
  //       user: newUser
  //     });
  
  //   } else {
  //     return res.redirect('/');
  //   }
  // };

  
module.exports.signup = function(req, res, next) {
    // if (!req.user) {
      console.log(req.body);
  
      let user = new User(req.body);

      console.log(user);
  
      user.save((err) => {
        if (err) {
          let message = getErrorMessage(err);
  
          // req.flash('error', message);
          // return res.redirect('/users/signup');
          // return res.render('auth/signup', {
          //   title: 'Sign-up Form',
          //   messages: req.flash('error'),
          //   user: user
          // });
          return res.status(400).json(
            {
              success: false, 
              message: message
            }
          );

        }
        // req.login(user, (err) => {
        //   if (err) return next(err);
        //   return res.redirect('/');
        // });
        return res.json(
          {
            success: true, 
            message: 'User created successfully!'
          }
        );
      });
    // } else {
    //   return res.redirect('/');
    // }
  };


  // module.exports.renderSignin = function(req, res, next) {
  //   if (!req.user) {
  //     res.render('auth/signin', {
  //       title: 'Sign-in Form',
  //       messages: req.flash('error') || req.flash('info')
  //     });
  //   } else {
  //     console.log(req.user);
  //     return res.redirect('/');
  //   }
  // };

 
module.exports.signin = function(req, res, next){
    passport.authenticate(
      // 'local',
      'login',
      // {   
      //   successRedirect: req.session.url || '/',
      //   failureRedirect: '/users/signin',
      //   failureFlash: true
      // })(req, res, next);
      // delete req.session.url;
      async (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(400).json(
                { 
                  success: false, 
                  message: err || info.message
                }
              );
          }
      
          req.login(
              user,
              { session: false },
              async (error) => {
                if (error) {
                  return next(error);
                }
                const payload = { id: user._id, email: user.email };
                const token = jwt.sign(
                  { 
                    payload: payload
                  }, 
                  config.SECRETKEY, 
                  { 
                    algorithm: 'HS512', 
                    expiresIn: "20min"
                  }
                );
        
                return res.json(
                  { 
                    success: true, 
                    token: token 
                  }
                );
              }
            );
          } catch (error) {
            // return next(error);
            console.log(error);
            return res.status(400).json({ success: false, message: error});
          }
        }
      )(req, res, next);
  } 


  // module.exports.signout = function(req, res, next) {
  //   req.logout();
  //   res.redirect('/');
  // };