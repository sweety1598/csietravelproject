var distance = require('google-distance');

distance.get(
{
  index: 1,
  origin: '23.259510,120.160460',
  destination: '23.154820,120.443790'
},
function(err, data) {
  if (err) return console.log(err);
  console.log(data.distanceValue);
});