var express = require('express');
var router = express.Router();
var fs = require("fs");
var nodemailer = require('nodemailer');


//router.get('/',function(req,res,err){
//});

//router.post('/',function(req,res,err){
  let transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
      user: 'travelsbz@gmail.com', 
      pass: 'admin10508' 
    } 
  });

  var mailOptions = {
    from: 'travelsbz@gmail.com',
    to: 'shinhui522@gmail.com',
    subject: 'traveler會員註冊驗證信',
    text: '親愛的會員 您好：\n\n請您於15分鐘之內透過下面連結進行驗證，以啟用您的會員帳號。\n\n網址\n\n若上面的連結點擊無效，請您將下面網址複製貼上瀏覽器網址列，亦可進行驗證。\n\n網址\n\n\n\n\n若有疑問請聯繫客服，謝謝！'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
//});