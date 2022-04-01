let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveyController = require('../controllers/survey');

// Router for lists function
router.get('/list', surveyController.displaySurveyList);

// Routers for Add functions
router.get('/add', surveyController.displayAddPage);
router.post('/add', surveyController.processAddPage);

// Routers for edit functions
router.get('/edit/:id', surveyController.displayEditPage);
router.put('/edit/:id', surveyController.processEditPage);

// Router for Delete function
router.get('/delete/:id', surveyController.performDelete);

// Router for display survey question details 
router.get('/survey-questions/:id', surveyController.displayQuestionsPage);

//Router for handling/submitting survey anwsers
router.post('/survey-questions/:id', surveyController.processQuestionsPage);

// Router for display survey report 
router.get('/report/:id', surveyController.displayReportViewPage);
module.exports = router;