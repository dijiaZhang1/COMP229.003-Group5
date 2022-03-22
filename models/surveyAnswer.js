

let mongoose = require('mongoose');

// create a model class for submitted survey document
let surveyAnswerModel = mongoose.Schema({
    surveyId:String,
    //userName: String,
    answer: Array 
},
{
    collection: "surveyAnswer"
});

module.exports = mongoose.model('surveyAnswer', surveyAnswerModel);
