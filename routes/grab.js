var http = require("https");
var fs = require("fs");
var request = require('request');
var mysql =require('mysql');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
//抓圖函式
var connection = mysql.createConnection({     
    host     : '140.137.41.137',       
    user     : 'p106travel',              
    password : 'travelcs106',       
    port     : '3308',                   
    database : 'p106travel',
    charset  : 'utf8_general_ci'
  });
  connection.connect();
//連接資料庫
  address = JSON.stringify("高雄");
  address = address.substring(1,(address.length-1));

  connection.query('select name,px,py,id from scenic where address like ? ', ["%"+address+"%"], function(err, rows, fields) {
    if (err) throw err;
    //從資料庫拿取有關"高雄"地方的景點的經緯度、景點Id和景點名稱
    for(var i = 0; i < 3; i++){
      console.log(i);
      //測試for迴圈是否正確
      console.log("----------------")//分隔線
      ascii = encodeURI(rows[i].name);
      //將中文編碼
      url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location='+rows[i].py+','+rows[i].px+'&rankby=distance&name='+ascii+'&key=AIzaSyBCekLSmk5136ev3Z8WF08aS_Bu0qgsPys';
      //使用for迴圈把陣列裡的資料一一套入url裡的變數改變url
      http.get(url, function(response){
          var data = '';
          response.on('data', function(chunk){
              data += chunk;
              console.log(url);
              //辨識url是否正確
          });
          response.on('end', function(){
              data = JSON.parse(data);
              console.log(data.results); // 可開啟這行在 Command Line 觀看 data 內容
              photoref = (data.results[0].photos[0].photo_reference);
              photourl ='https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBCekLSmk5136ev3Z8WF08aS_Bu0qgsPys&maxheight=720&photoreference=' + photoref;
              
              console.log("-------------");
              //download(photourl, rows[0].id + '.jpg', function(){}); //抓圖函式
          });
      }).on('error', function(e){ // http get 錯誤時
            console.log("error: ", e);
      });
    }
});
connection.end();


    //console.log(rows[0].name,rows[0].px,rows[0].py,rows[0].id); 取出的值
    //console.log(rows.length);
    //asc = quote("高雄");
    //console.log(asc);
    //ascii = A2U("板橋");
    //console.log(ascii);

//資料庫取值x,y,name,Id
//UTF8轉換ASCII函式(42~43為下載圖片程式完成後取消註解)
//var asciiname; 

//location=py,px ...  name=name(要記得轉換編碼)




/*function U2A(source) {  //Unicode -> ASCII转换  
    var code = source.match(/&#(\d+);/g);  
    if (code == null) {  
        return source;  
    }  
    var result = "";  
    for (var i=0; i<code.length; i++) {  
        result += String.fromCharCode(code[i].replace(/[&#;]/g, ''));  
    }  
    return result;  
} 

function A2U(source) {  //ASCII 转换 Unicode  
    result = '';    
    for (var i=0; i<source.length; i++) {  
     result += '&#' + source.charCodeAt(i) + ';';   
    }  
    return result;          
}*/