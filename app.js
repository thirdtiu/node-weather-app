var weather = require("./weather");
var cities = process.argv.slice(2);
// console.dir(process);
cities.forEach(function(city){
  weather.get(city);  
});
