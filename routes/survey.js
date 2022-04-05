let express = require('express');
const { Passport } = require('passport/lib');
let router = express.Router();
let mongoose = require('mongoose');

let surveyController = require('../controllers/survey');

let passport = require('passport');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    // if(!req.isAuthenticated())
    // {
    //     req.session.url = req.originalUrl;
    //     return res.redirect('/users/signin');
    // }
    // next();
    passport.authenticate('tokencheck', { session: false }, function(err, user, info) {
        if (err) return res.status(401).json(
          { 
            success: false, 
            message: getErrorMessage(err)
          }
        );
        if (info) return res.status(401).json(
          { 
            success: false, 
            message: info.message
          }
        );
        // if (!user) throw new AuthError('401', 'User is not authenticated.');
        // console.log(user);
        req.user = user;
        next();
      })(req, res, next);
}


// Router for lists function
router.get('/list', surveyController.list);

// Routers for Add functions
//router.get('/add', surveyController.displayAddPage);
router.post('/add', surveyController.processAdd);

// Routers for edit functions
//router.get('/edit/:id', surveyController.displayEditPage);
//router.put('/edit/:id', passport.authenticate('tokencheck', { session: false }), surveyController.processEditPage);
router.put('/edit/:id', surveyController.processEdit);

// Router for Delete function
router.delete('/delete/:id', requireAuth, surveyController.performDelete);

// Router for display survey question details 
//router.get('/survey-questions/:id', surveyController.displayQuestionsPage);

//Router for handling/submitting survey anwsers
router.post('/survey-questions/:id', surveyController.processFillSurveyPage);

// Router for display survey report 
//router.get('/report/:id', surveyController.displayReportViewPage);
module.exports = router;