
// let express = require('express');
// let router = express.Router();
// let mongoose = require('mongoose');
// const { session } = require('passport');

// create a reference to the model
let Survey = require('../models/survey');

// create a reference to the survey submit model
let SurveyAnswer = require('../models/surveyAnswer');

function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

// Gets all surveys from the Database and renders the page to list all surveys.
exports.list = function(req, res, next) {  
    Survey.find((err, surveyList) => {
        // console.log(displaySurveyList);
        if(err)
        {
            console.error(err);
            return res.status(400).json(
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
              );
        }
        else
        {
            // // Get current day
            // let currentDate = new Date()
            // res.render('survey/list', 
            // {title: 'Surveys', 
            // surveys: surveyList,
            // today: currentDate,
            // userName: req.user ? req.user.username : '' 
            
            res.status(200).json(surveyList);
   
        }
    });
}

   

// Renders the Add form using the add_edit.ejs template
// module.exports.displayAddPage = (req, res, next) => {
    
//     let newItem = Survey();

//     res.render(
//         'survey/add_edit', 
//         {
//             title: 'Create a new survey',
//             survey: newItem,
//             userName: req.user ? req.user.username : '' 
//             
//         }
//     )                 

// }

// Processes the data submitted from the Add form to create a new survey
module.exports.processAdd = (req, res, next) => {
    
    console.log(req.body);

    try {
        
        /*
        let currentDate = new Date()

        let question = [];
        question.push(req.body.q1);
        question.push(req.body.q2);
        question.push(req.body.q3);
        question.push(req.body.q4);
        question.push(req.body.q5);
        */

        let newItem = Survey({
            //_id: req.body.id,
            title: req.body.title,
            type: req.body.type,
            username: req.body.username,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            question: [req.body.q1,req.body.q2, req.body.q3, req.body.q4, req.body.q5]
        });

        Survey.create(newItem, (err, Survey) =>{
            if(err)
            {
                console.log(err);
                //res.end(err);
                return res.status(400).json(
                    { 
                    success: false, 
                    message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                // refresh the survey list
                console.log(Survey);
                //res.redirect('/survey/list');
                res.status(200).json(Survey);
            }
        });
    } catch (error) {
        console.log(error);
                // res.end(err);
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}
// Gets a survey by id and renders the Edit form using the add_edit.ejs template
// module.exports.displayEditPage = (req, res, next) => {
    
    
//     let id = req.params.id;

//     if(!session.email){
//         res.redirect('/log');
//     }

//     Survey.findById(id, (err, itemToEdit) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             console.log(session.email);
//             //show the edit view
//             res.render(
//                 'survey/add_edit', 
//                 {
//                     title: 'Edit Survey', 
//                     survey: itemToEdit,
//                     isLog:session.email
                    
//                 }
//             )
//         }
//     });

// }

// Processes the data submitted from the Edit form to update a survey
module.exports.processEdit = (req, res, next) => {
    console.log("req.user ==>", req.user);
    
    try {
        let id = req.params.id

        /*
        let question = [];
        question.push(req.body.q1);
        question.push(req.body.q2);
        question.push(req.body.q3);
        question.push(req.body.q4);
        question.push(req.body.q5);
        */
        let updatedItem = Survey({
            _id: id,
            title: req.body.title,
            type: req.body.type,
            username: req.body.username,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            question: req.body.question
        });

        // console.log(updatedItem);

        Survey.updateOne({_id: id}, updatedItem, (err) => {
            if(err)
            {
                console.log(err);
                //res.end(err);
                return res.status(400).json(
                    { 
                    success: false, 
                    message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                // refresh the book list
                //res.redirect('/survey/list');
                return res.status(200).json(
                    { 
                    success: true, 
                    message: 'Item updated successfully.'
                    }
                );
            }
        });
        
    } catch (error) {
        console.log(error);

        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }

    
}

// Deletes a survey based on its id.
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).send({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else
        {
            // refresh the book list
            // res.redirect('/survey/list');
            return res.status(200).json({
                success: true,
                message: "Item removed successfully."
            });
        }
    });
}



// Gets a survey by id and renders the fill survey page.
// module.exports.displayQuestionsPage = (req, res, next) => {
    
//     let id = req.params.id;

//     Survey.findById(id, (err, surveyToSubmit) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the survey view page
//             res.render('survey/survey-questions', {
//                 title: 'Fill Survey', 
//                 survey: surveyToSubmit,
//                 isLog:session.email
                
//             })
//         }
//     });
// }


//Process the fill survey operation
module.exports.processFillSurveyPage = (req, res, next) => {
    console.log(req.body);

    try{
        let id = req.params.id;
        // let answer = [];
        // answer.push(req.body.a1);
        // answer.push(req.body.a2);
        // answer.push(req.body.a3);
        // answer.push(req.body.a4);
        // answer.push(req.body.a5);


        Survey.findById(id, (err, surveyToSubmit) =>{
            if(err)
            {
                console.log(err);
                //res.end(err);
            }
            else{
                if(surveyToSubmit){

                    let fillNewSurvey = SurveyAnswer({
                        surveyId: id,
                        //userName: String,
                        answer: req.body.answer
                    });

                    SurveyAnswer.create(fillNewSurvey, (err, SurveyAnswer) => {
                        if(err)
                        {
                            console.log(err);
                            //res.end(err);
                            return res.status(400).json(
                                { 
                                success: false, 
                                message: getErrorMessage(err)
                                }
                            );
                        }
                        else
                        {   console.log(SurveyAnswer);
                            //refresh the survey list
                            //res.redirect('/survey/list', {isLog:session.email});
                            res.status(200).json(SurveyAnswer);
                        }
                    });

                }
            } 
        }); 
    } catch (error) {
        console.log(error);
                // res.end(err);
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }

    
}


/*
module.exports.displayReportViewPage = (req, res, next) => {
    
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            SurveyAnswer.find({"surveyId" : id}, (err, docs) => {  
                //True or False
                let trueAnswer = [0,0,0,0,0];
                let falseAnswer = [0,0,0,0,0];
                
                //Scale
                let veryBad = [0,0,0,0,0];
                let bad = [0,0,0,0,0];
                let good = [0,0,0,0,0];
                let veryGood = [0,0,0,0,0];
                let excellent = [0,0,0,0,0];
                
                //Short Answer 
                let textAnswer=[0,0,0,0,0]

                for (j=0; j < docs.length; j++) {
                    
                    for ( i=0; i < docs[j].answer.length; i++) {
                        if ( survey.type == "True/False" ) {
                            if (docs[j].answer[i] == "true") {
                                trueAnswer[i]++;
                            }
                            else {
                                falseAnswer[i]++;
                            }
                        }
                        if ( survey.type == "Scale" ) {
                            switch (docs[j].answer[i]) {                                
                                case '0':
                                    veryBad[i]++;
                                    break;
                                case '1':
                                    bad[i]++;
                                    break;
                                case "2":
                                    good[i]++;
                                    break;
                                case "3":
                                    veryGood[i]++;
                                    break;
                                case "4":
                                    excellent[i]++;
                                    break;
                                default:
                                    break;
                            }

                        }

                        if ( survey.type == "ShortAnswer" ) {
                            textAnswer[i]=docs[j].answer[i]
                        }
                    }
                }
                if ( survey.type == "True/False" ) {
                    res.render('survey/report', 
                    {
                        title: survey.title,
                        survey: survey,
                        votes: docs.length,
                        trueAnswer: trueAnswer,
                        falseAnswer: falseAnswer, 
                        isLog:session.email

                    });
                }
                if ( survey.type == "Scale" ) {
                    console.log(veryBad);
                    console.log(excellent);
                    res.render('survey/report', 
                    {
                        title: survey.title,
                        survey: survey,
                        votes: docs.length,
                        veryBad: veryBad,
                        bad: bad,
                        good: good,
                        veryGood: veryGood,
                        excellent: excellent,
                        isLog:session.email

                    });
                }

                if ( survey.type == "ShortAnswer" ) {
                    
                    res.render('survey/report', 
                    {
                        title: survey.title,
                        survey: survey,
                        votes: docs.length,
                        textAnswer: textAnswer,
                        isLog:session.email
                    });
                }
            });   
        }
    });
}

*/