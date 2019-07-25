var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var Promise = require("bluebird");

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
// For local dev
// var dev_db_url = 'mongodb://localhost/test';
var dev_db_url = 'mongodb://mongo:27017/db'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('public'))
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


require('./routes')(app)

app.listen(process.env.PORT || 8000);

module.exports = app
