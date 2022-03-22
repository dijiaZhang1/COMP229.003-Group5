
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');

// create a reference to the survey submit model
let SurveyAnswer = require('../models/surveyAnswer');

// Gets all surveyss from the Database and renders the page to list all surveyss.
module.exports.displaySurveyList = function(req, res, next) {  
    Survey.find((err, surveyList) => {
        // console.log(displaySurveyList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // Get current day
            let currentDate = new Date()
            res.render('survey/list', 
            {title: 'Surveys', 
            surveys: surveyList,
            //userId:req.user ? req.user.username : '',
            today: currentDate
   
        }
        );      
    }
});
}
   

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE 
    let newItem = Survey();

    res.render(
        'survey/add_edit', 
        {
            title: 'Create a new survey',
            //userId:req.user ? req.user.username : '',
            survey: newItem
        }
    )                 

}

// Processes the data submitted from the Add form to create a new survey
module.exports.processAddPage = (req, res, next) => {

    let currentDate = new Date()

    let question = [];
    question.push(req.body.q1);
    question.push(req.body.q2);
    question.push(req.body.q3);
    question.push(req.body.q4);
    question.push(req.body.q5);

    let newItem = Survey({
        _id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        username: req.body.username,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        question: question
    });

    Survey.create(newItem, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            //console.log(survey);
            res.redirect('/survey/list');
        }
    });


}

// Gets a survey by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    
    let id = req.params.id;

    Survey.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render(
                'survey/add_edit', 
                {
                    title: 'Edit Survey', 
                    survey: itemToEdit,
                    //userId:req.user ? req.user.username : ''
                }
            )
        }
    });

}

// Processes the data submitted from the Edit form to update a survey
module.exports.processEditPage = (req, res, next) => {
    
    
    let id = req.params.id

    let question = [];
    question.push(req.body.q1);
    question.push(req.body.q2);
    question.push(req.body.q3);
    question.push(req.body.q4);
    question.push(req.body.q5);

    let updatedItem = Survey({
        _id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        username: req.body.username,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        question: question
    });

    // console.log(updatedItem);

    Survey.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/survey/list');
        }
    });
    
}

// Deletes a survey based on its id.
module.exports.performDelete = (req, res, next) => {
    
    
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/survey/list');
                
            
        }
    });

}


// Gets a survey by id and renders the fill survey page.
module.exports.displayQuestionsPage = (req, res, next) => {
    
    let id = req.params.id;

    Survey.findById(id, (err, surveyToSubmit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the survey view page
            res.render('survey/survey-questions', {
                title: 'Fill Survey', 
                survey: surveyToSubmit,
                //userId:req.user ? req.user.username : ''
            })
        }
    });
}


//Process the fill survey operation
module.exports.processQuestionsPage = (req, res, next) => {
    let id = req.params.id;
    let answer = [];
    answer.push(req.body.a1);
    answer.push(req.body.a2);
    answer.push(req.body.a3);
    answer.push(req.body.a4);
    answer.push(req.body.a5);


    Survey.findById(id, (err, surveyToSubmit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            if(surveyToSubmit){

                let fillNewSurvey = SurveyAnswer({
                    surveyId: id,
                    //userName: String,
                    answer: answer
                });

                SurveyAnswer.create(fillNewSurvey, (err, SurveyAnswer) => {
                    if(err)
                    {
                        console.log(err);
                        res.end(err);
                    }
                    else
                    {
                        //refresh the survey list
                        res.redirect('/survey/list');
                    }
                });

            }
        } 
    }); 
}

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
                        //userId:req.user ? req.user.username : ''
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
                        //userId:req.user ? req.user.username : ''
                    });
                }

                if ( survey.type == "ShortAnswer" ) {
                    
                    res.render('survey/report', 
                    {
                        title: survey.title,
                        survey: survey,
                        votes: docs.length,
                        textAnswer: textAnswer
                        //userId:req.user ? req.user.username : ''
                    });
                }
            });   
        }
    });
}



