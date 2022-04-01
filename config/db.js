
//For production enviorment never expose your connection string. 
let URI = "mongodb+srv://dbadmin:ui4o3LzFPMVK8EuU@clusters003.wvfaf.mongodb.net/mydb?retryWrites=true&w=majority"

//Database setup
let mongoose = require('mongoose');

module.exports = function(){

    //Connect to Database
    mongoose.connect(URI);

    let mongoDB = mongoose.connection;
    
    mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
    mongoDB.once('open', ()=>{
        console.log('Connected to MongoDB...');
    });

    return mongoDB;

}