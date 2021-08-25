var express = require("express");
var dotenv = require("dotenv");
var cors =require('cors');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose'),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");



dotenv.config();
app.use(cors());

//Schema-Models:
var User = require("./models/user");

app.get("/",function(req,res){
    res.send("It works!!")
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started at port 3000!");
});