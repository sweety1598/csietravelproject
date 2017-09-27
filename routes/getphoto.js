var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://lh3.googleusercontent.com/p/AF1QipPx6UaSUUtp_ubwwnnr6wWC1ZyYJLE71Nkp9XFa=s1600-h720', 'C1_397000000A_000009.jpg', function(){
  console.log('done');
});