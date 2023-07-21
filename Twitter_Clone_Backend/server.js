const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/twitterclone"); // twitterclone is the name of the database
const User = require('./models/userSchema');
const Tweet = require('./models/tweetSchema');
const passport = require('passport');
const localStratergy = require('passport-local');
const cors = require('cors');
const session = require('express-session')
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const mongoStore = require('connect-mongo');

// app.use(cors(
//     {
//     origin: ['http://localhost:4200'],
//     methods: ['GET', 'POST'],
//     credentials:true,
//     }
//   ));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
// app.use(session({
// 	secret: "twitter clone",
// 	resave:false,
// 	saveUninitialized : true
// }));
app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : "you can type anything here but it is required",
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    },
    store : mongoStore.create({
        mongoUrl : "mongodb://127.0.0.1:27017/user",
        collectionName : "sessions"
    })
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const port = 3000;

let server = app.listen(port,(req,res)=>{
    console.log(`server started running at port:${port}`);
});


app.post('/login',passport.authenticate('local'), function(req,res){
    res.status(200).json(req.user);
});

app.get("/", (req, res)=>{
    res.status(201).json("Success");
});

app.get('/logout',function(req,res){
    // req.logout() is given by passport.js
    // req.logout() will remove the user object from the session
	req.logout(()=>{

    });
	res.status(200).json('successfully logged out');
});


function isLoggedin(req,res,next){
    // console.log(req)
    console.log(req.body);
    if(req.body.username){  
        // console.log(req.user)
		return next();
	}
    console.log("not logged in");
	res.send('Unauthorized');
    // res.redirect('/login');
}

app.post('/signup', async (req,res)=>{
    console.log(req.body);
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
		}
		else
		{
			console.log("Suceess");
		}
	});
    res.status(201).json(req.body.username);
});

// REST API to create tweet in database
app.post('/tweet', isLoggedin, async (req,res)=>{
    // creating instances of the Tweet model
     console.log(req.session);
    // console.log(req)
    let tweet = new Tweet({
        username : req.body.username,
        tweetdata: req.body.tweetdata,
        likes : req.body.likes
    });

    let savedTweet = await tweet.save();
    res.status(201).json(savedTweet);
})

// REST API to fetch tweet from database
// get request should not have a body, and therefore we are sending username as a parameter
app.get('/tweet/:username', async (req,res)=>{
    
    let username = req.params.username;
    let tweets = await Tweet.find({username : username});
    res.status(200).json(tweets);
})

app.get('/user/:username', async (req, res)=>{
    let user = await User.findOne({username : req.params.username});
    res.status(200).json(user);
});

app.get("/tweets", async (req, res)=>{
    let tweets = await Tweet.find({});
    res.status(200).json(tweets);
})