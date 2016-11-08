// we need a simple way to look at the weather for current day given the city
// solution: connect to openweathermap.org to get weather info (http://openweathermap.org/current#name)
var http = require("http");
var openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

var apiKey = "e350aecd2423eb555eff786e8dd7bb89";

//Print out message
function showWeather(city, weatherDescription){
  var message = "Expect " + weatherDescription + " in " + city;
  console.log(message);
}
//Print out error messages
function printError(error){
  console.error(error.message);
}

function get(city){
  // Connect to the API
  // https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_http_get_options_callback
  var request = http.get(openWeatherUrl + city + "&APPID=" + apiKey, function(response){
    var body = "";
    response.on("data", function(chunk){
      body += chunk;
    });
    response.on("end", function(){
      if(response.statusCode === 200){
        try{
          //parse data
          var profile = JSON.parse(body);
          //print data
          showWeather(city, profile.weather[0].description);
        } catch(error){
          //parse error
          printError(error);
        }
      } else {
        //Status Code error
        printError({message: "There was an error getting the weather for " + city + ". (" + http.STATUS_CODES[response.statusCode] +")" })
      }
    });

  });

  //Connection Error
  request.on("error", printError);
}

module.exports.get = get;