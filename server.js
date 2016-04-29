var express = require('express');
var app = express();
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

var w = 'webdev';
//For localhost
var connString = 'mongodb://127.0.0.1:27017/' + w;
//For openshift
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
		connString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
		process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
		process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connString);

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: "My secret",
	resave: true,
	saveUninitialized: true
}));


require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, mongoose, db);


app.options('*', function(req, res) {

	res.send(200);

});

app.listen(port, ipaddress);