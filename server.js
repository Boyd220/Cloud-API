var express = require("express");
var bodyparser = require("body-parser");
var Firebase = require("firebase");
var app = express();
var url = new Firebase("https://crackling-torch-6492.firebaseio.com/");

var feest = [];

app.use(bodyparser.json());


app.use(function(req, res, next) {

	//Making sure cross domain scripting is safe
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req,res){

url.on("value", function(snapshot){
	console.log(snapshot.val());
	res.json(snapshot.val());
}, function(err){
	console.log("Faal" + err.code);
});
});


app.listen(3000);
