const request = require('request');

const openWeatherMap = {
    BASE_URL: "http://api.weatherapi.com/v1/current.json?key=",
    SECRET_KEY:"2f0711095c15423abd5214049240112"
}

const weatherData = ( address , callback ) => {
    const url = 
        weatherAPI.BASE_URL + 
        weatherAPI.SECRET_KEY + 
        "&q" + 
        encodeURIComponent(address);
    console.log(url);
    request({url, json: true},(error, data) => {
        if(error){
            callback(true,"Unable to fetch data, plaese try again" + error);
        }
        callback (false, data?.body);
    });
};

module.exports = weatherData;
