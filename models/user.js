let mongoose = require('mongoose');

// create a model class for survey document
let userModel = mongoose.Schema({
    name: String,
    password: String,   
    email: String,
},
{
    collection: "users"
});

module.exports = mongoose.model('User', userModel);