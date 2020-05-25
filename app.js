var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//This is for testing DB connection, It should be established if you 
//have MySQL running on your pc
db.authenticate().then(() => {
	console.log("Connection established");
}).catch(() => {
	console.log("Connection failed");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

module.exports = app;
