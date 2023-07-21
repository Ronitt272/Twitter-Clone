let mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    username : String,
    tweetdata : {type : String, required : true},
    likes : [
        {
            type : String
        }
    ]
});

module.exports = new mongoose.model('Tweet',tweetSchema);
