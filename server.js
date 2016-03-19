var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
/*app.get('/hello', function(req, res){
	res.send('hello world');
});*/
app.listen(port, ipaddress);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

require("./public/assignment/server/app.js")(app);

