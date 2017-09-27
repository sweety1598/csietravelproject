var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');


router.get('/',function(req,res,err){
	fs.readFile('./views/MyItinerary.html',null,function(err, data){
	 	if(err){
	 		res.writeHead(404);
	 		res.write('File not found');
	 	}
	 	else{
	 		res.write(data);
	 	}
	 	res.end();
	});
});

router.post('/',function(req,res,err){
	var connection = mysql.createConnection({
	  host     : '140.137.41.137',
	  user     : 'p106travel',
	  password : 'travelcs106',       
	  port     : '3308',                   
	  database : 'p106travel',
	  charset  : 'utf8_general_ci'
	});
	connection.connect();

	connection.query("SELECT TravelName, DATE_FORMAT(Start_Date ,'%Y/%m/%d') AS Start_Date,DATE_FORMAT(End_Date ,'%Y/%m/%d') AS End_Date FROM usertravel WHERE UserName like 'shinhui' " ,function(err, rows, fields) {
		if (err) throw err;
		Traveldata = rows;
		console.log(Traveldata);
		return res.json(rows);
    });
});

 
module.exports = router;