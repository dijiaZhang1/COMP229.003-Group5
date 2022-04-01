let mongoose = require('mongoose');
let crypto = require('crypto');

// create a model class for survey document
let userModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type:String,
            match: [/.+\@.+\..+/, "Please fill a valid email address"]
        },
        password: {
            type:String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },   
        salt: String,
        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

UserSchema.virtual('fullName')
    .get(function() {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName) {
        let splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
});

// Middleware pre
UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// Middleware post
UserSchema.post('save', function(next){
    console.log('The user "' + this.username +  '" details were saved.');
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema);