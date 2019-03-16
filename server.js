// express server
var express = require('express');
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');
require('dotenv').config();

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + 'assets/css'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/assets/js'));
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
// GMAIL_USER = process.env.GMAIL_USER;
// GMAIL_PASS = process.env.GMAIL_PASS;

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('/resume', (req, res) => {
	res.sendFile(path.join(__dirname + '/Resume.pdf'));
})

// // do i still need this?
// app.get('/.well-known/acme-challenge/:content', function(req, res) {
//   res.send('LmCS_e-DNSJJGxd1_CqPIX5CenY_9iuiicANZiMVljQ.SKMMb6gi2eLogAXs8qmH0AN-TKk2fEwHs4DKTb18dtM');
// });





app.listen(process.env.PORT || 8080);
