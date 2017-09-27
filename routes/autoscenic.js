var express = require('express');
var router = express.Router();
var fs = require("fs");
var http = require("https");
var mysql = require('mysql');
var start_time = 30600;
var end_time = 0;
var end_add = 'err';
hotelpy = 0;
hotelpx = 0;


router.get('/',function(req,res,err){
  fs.readFile('./views/Automatic.html',null,function(err, data){
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

  var Place = JSON.stringify(req.body.Name);
  Place = Place.substring(1,(Place.length-1));

  connection.query('SELECT * FROM scenic WHERE Area like Place AND (Class1 like "遊憩類" OR Class1 like "觀光工廠類")',["%"+Place+"%"], function(err, rows, fields) {
    if (err) throw err;
    scenic = rows;

    connection.query('SELECT * FROM hotel WHERE Zipcode like ? ', ["%"+'831'+"%"], function(err, rows2, fields) {
      if (err) throw err;

      var hotellength = rows2.length;
      var hotelrandom = Math.floor(Math.random()*hotellength);
      console.log('住宿:')
      hoteldata = JSON.stringify(rows2[hotelrandom].Name)
      console.log(rows2[hotelrandom]);
      hoteldata = hoteldata.substring(1,(hoteldata.length-1))
      console.log(hoteldata);

      hotelpx = JSON.stringify(rows2[hotelrandom].Px)
      hotelpx = hotelpx.substring(1,(hotelpx.length-1))
      console.log(hotelpx);

      hotelpy = JSON.stringify(rows2[hotelrandom].Py)
      hotelpy = hotelpy.substring(1,(hotelpy.length-1))
      console.log(hotelpx, hotelpy);
      hotel(hotelpy);
    });

    var length = scenic.length;
    check = [scenic.length+1];
    scenicPx = [];
    scenicPy = [];

    for(var i=0; i<5; i++){
      var random = Math.floor(Math.random()*length);
        for(var j=0; j<=i; j++){
          if(j == i && check[j] != random){
            check[i] = random;
            scenicPx[i] = scenic[random].Px;
            scenicPy[i] = scenic[random].Py;
            console.log(scenic[random].Class1);
          }
          else if(check[j] == random){
            i--;
            break;
          }
        }
    }

    end_add = rows[4].Zipcode;

    url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+ scenicPy[0] + ',' + scenicPx[0] +'&destination='+ scenicPy[scenicPx.length-1] + ',' + scenicPx[scenicPx.length-1] +'&waypoints=optimize:true';

    for(i = 0; i<scenicPx.length; i++){
      console.log(scenicPx[i],scenicPy[i]);
      console.log(scenic[i].Zipcode);

      if(i>0 && i<scenicPx.length-1){
        url = url + '|' + scenicPy[i] + ',' + scenicPx[i];

        if( i == scenicPx.length-2 ){
          console.log("成功");
          console.log(hotelpx);
          console.log(hotelpy);
          url = url + '&key=AIzaSyBxb4g61jr6BMsA5sg_fZfjl3pN4xPLuQ0';
        }
      }
    }


    http.get(url, function(response){

      function TimeCalculation(){
        start_hr = Math.floor((start_time/60/60));
        start_min = Math.ceil((start_time/60) - start_hr*60);
        end_hr = Math.floor((end_time/60/60));
        end_min = Math.ceil((end_time/60) - end_hr*60);

        if(start_min.toString().length == 1)
          start_min = "0" + start_min;
        if(end_min.toString().length == 1)
          end_min = "0" + end_min;
      };
    
      var data = '';

      response.on('data', function(chunk){
        data += chunk;
      });

      response.on('end', function(){
        
        data = JSON.parse(data);
        for( i = 0;i < data.geocoded_waypoints.length-1;i++){
          //console.log(data); // 可開啟這行在 Command Line 觀看 data 內容
          console.log("---------------");
          if( i == data.geocoded_waypoints.length-2 ){
            console.log("住宿");
          }
          console.log("出發地");
          console.log(data.routes[0].legs[i].start_address);
          console.log("目的地");
          console.log(data.routes[0].legs[i].end_address);
          console.log("距離");
          console.log(data.routes[0].legs[i].distance.text);
          console.log("行車時間");
          console.log(data.routes[0].legs[i].duration.text);
          console.log("交通時間");
          

          end_time = start_time + data.routes[0].legs[i].duration.value;

          TimeCalculation();
            
          console.log(start_hr + ":" + start_min + "~" + end_hr + ":" + end_min);
          start_time = end_time;

          console.log("停留時間");
          end_time = start_time + 5400;

          TimeCalculation();
            
          console.log(start_hr + ":" + start_min + "~" + end_hr + ":" + end_min);
          start_time = end_time;


          if( end_hr == "11" || end_hr == "12"){
            console.log("---------------");
            console.log("午餐");
            restaurant();
          }
        }
      });
    }).on('error', function(e){
      console.log("error: ", e);
    });


    function hotel(px, py){
      hotelpy = py;
      hotelpx = px;
    };

    function restaurant(){
      connection.query('SELECT * FROM food WHERE Zipcode like ? ', ["%"+'977'+"%"], function(err, rows3, fields) {
        if (err) throw err;

        console.log('午餐:')
        eatdata = JSON.stringify(rows3[0].Name)
        console.log(eatdata);

        connection.end();
      });
    };

  });
});

module.exports = router;