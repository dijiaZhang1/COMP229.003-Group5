

let mongoose = require('mongoose');

// create a model class for survey document
let surveyModel = mongoose.Schema({
    title: String,
    type: String,   
    startdate: Date,
    enddate: Date,
    username: String,
    question: [String]
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);

