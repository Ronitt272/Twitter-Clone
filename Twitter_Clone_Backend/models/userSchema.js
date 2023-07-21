
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    username: {type : String, unique : true},
    email : String,
    password : String,
    followers: [
        {
            type: String
        }
    ],
    following : [
        {
            type : String
        }
    ]
});
userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model('user',userSchema);