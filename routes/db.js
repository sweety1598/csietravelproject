var express = require('express');
var router = express.Router();
var mysql  = require('mysql');

/* GET users listing. */

router.get('/db', function(req, res, next) {


 var connection = mysql.createConnection({     
  host     : '140.137.41.137',       
  user     : 'p106travel',              
  password : 'travelcs106',       
  port     : '3308',                   
  database : 'p106travel',
  charset  : 'utf8_general_ci'
});
 
connection.connect();
 

/*var parseJson= require('./hotel_C_f.json');


for(var i = 0; i < parseJson.length; i++){
    var post  = parseJson[i];
    var query = connection.query('SET names UTF8');
    var query = connection.query('INSERT INTO hotel SET ?', post, function(err, result) {
         if(err) return res.json(err);
     // Finish
    });
}
*/

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});
connection.end();

});

module.exports = router;
