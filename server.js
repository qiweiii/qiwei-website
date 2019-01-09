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
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
GMAIL_USER = process.env.GMAIL_USER;
GMAIL_PASS = process.env.GMAIL_PASS;

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// add other routes below
app.get('/colorgame', function (req, res) {
  res.sendFile(path.join(__dirname + '/colorGame.html'));
});

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('LmCS_e-DNSJJGxd1_CqPIX5CenY_9iuiicANZiMVljQ.SKMMb6gi2eLogAXs8qmH0AN-TKk2fEwHs4DKTb18dtM');
});

//send email
app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans; //The route contains my SMTP configuration details, a set of email formatting options I define
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  mailOpts = {
    //from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    from: 'chiwaydyang@gmail.com',
    to: 'yangqiwei97@gmail.com',
    subject: 'New message from contact form at qiweiyang.me',
    text: 'asdf'
    //text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact-failure');
    }
    else {
      res.render('contact-success');
    }
  });
});
// app.post('/contact', function (req, res) {
// 	var transporter = nodemailer.createTransport({
// 	 service: 'gmail',
// 	 auth: {
// 	        user: GMAIL_USER,
// 	        pass: GMAIL_PASS
// 	    }
// 	});
// 	const mailOptions = {
// 	  from: 'chiwaydyang@gmail.com', // sender address
// 	  to: 'yangqiwei97@gmail.com', // list of receivers
// 	  subject: 'Subject of your email', // Subject line
// 	  html: '<p>Your html here</p>'// plain text body
// 	};
// 		transporter.sendMail(mailOptions, function (err, info) {
// 	   if(err)
// 	     console.log(err)
// 	   else
// 	     console.log(info);
// 	});
// });



app.listen(process.env.PORT || 8080);