// This is the services script file to get the location by name

const httpClient = require("https");
const chalk = require("chalk");

var citySearchBaseURL = 'https://dataservice.accuweather.com/locations/v1/cities/search';
var weatherForcastBaseURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/';

var cityDetails = null;

const callbackFromGetLocationIdByNameAndCountry = (apiKey, cityId) => {
    getLocationWeatherByID(apiKey, cityId);
}

// Finding location Id by name and country
const getLocationIdByNameAndCountry = (apiKey, locationText, countyText) => {
    citySearchBaseURL = citySearchBaseURL +'?apikey='+apiKey+'&q='+locationText;
    console.log('Weather Search URL: '+citySearchBaseURL);

    httpClient.get(citySearchBaseURL, (resp) => {
        let data = '';
        var cityID = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            cityDetails =  JSON.parse(data);
            for (var id in cityDetails) {
                if(cityDetails[id].Country.ID.toUpperCase() === countyText.toUpperCase()){
                    if(cityDetails[id].LocalizedName.toUpperCase() === locationText.toUpperCase())
                        console.log("Calling Forcase API for Location: "+cityDetails[id].Key);
                        callbackFromGetLocationIdByNameAndCountry(apiKey, cityDetails[id].Key)
                        return;
                }
            }
            
        });

        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    return '';
}

const getLocationWeatherByID = (apiKey, localtionId) => {
    weatherForcastBaseURL = weatherForcastBaseURL +"/"+localtionId+'?apikey='+apiKey;
    console.log('Weather Forcast URL: '+weatherForcastBaseURL);
    httpClient.get(weatherForcastBaseURL, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            weatherDetails =  JSON.parse(data);
            console.log(chalk.green("Date: "+weatherDetails.Headline.EffectiveDate));
            console.log(chalk.green("Summary: "+weatherDetails.Headline.Text));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}


module.exports = {
    getLocationIdByNameAndCountry: getLocationIdByNameAndCountry,
    getLocationWeatherByID : getLocationWeatherByID
}