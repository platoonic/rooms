var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('./passport');
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var authRouter  = require('./routes/auth');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//This is for testing DB connection, It should be established if you 
//have MySQL running on your pc
db.authenticate().then(() => {
	console.log("Connection established");
}).catch((error) => {
	console.log("Connection failed");
	console.log(error);
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
//Make sure to authenticate before you can create a room
app.use('/rooms', passport.authenticate('jwt', {session: false}), roomsRouter);
app.use('/auth' , authRouter);
module.exports = app;
