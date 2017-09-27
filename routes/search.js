var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');


router.get('/',function(req,res,err){
	fs.readFile('./views/search.html',null,function(err, data){
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

	var KeyWord = JSON.stringify(req.body.Name);
	KeyWord = KeyWord.substring(1,(KeyWord.length-1));
	

	connection.query('SELECT Name,class1,id,Toldescribe FROM scenic WHERE Name like ? ', ["%"+KeyWord+"%"], function(err, rows, fields) {
		if (err) throw err;

		SearchData = rows;
    });
});


router.get('/index',function(req,res,err){
	fs.readFile('./views/index.html',null,function(err, data){
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

router.post('/index',function(req,res,err){
	return res.json(SearchData);

});


router.get('/detail',function(req,res,err){
	fs.readFile('./views/detail.html',null,function(err, data){
	 	if(err){
	 		res.writeHead(404);
	 		res.write('File not found');
	 	}
	 	else{
	 		res.write(data);
	 	}
	 	res.end();
	});
})

router.post('/detail',function(req,res,err){
	var connection = mysql.createConnection({     
	  host     : '140.137.41.137',       
	  user     : 'p106travel',              
	  password : 'travelcs106',       
	  port     : '3308',                   
	  database : 'p106travel',
	  charset  : 'utf8_general_ci'
	});
	connection.connect();

	var ScenicId = JSON.stringify(req.body.Id);
	ScenicId = ScenicId.substring(1,(ScenicId.length-1));
	console.log(ScenicId);

	connection.query('SELECT * FROM scenic WHERE Id like ? ', ["%"+ScenicId+"%"],  function(err, rows, fields) {
		if (err) throw err;

		ScenicInfoData = rows;
		console.log(ScenicInfoData);
		return res.send(ScenicInfoData);
    });
})

router.post('/a',function(req,res,err){
	return res.send(ScenicInfoData);
})
module.exports = router;