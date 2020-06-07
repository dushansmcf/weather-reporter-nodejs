# weather-reporter-nodejs
This app will help you to get the weather details of your preferred area from AccuWeather

## Get Weather Data via AccuWeather.com

First you have to create your own AccuWhether account via https://developer.accuweather.com/ and register an application under that account.
Then you will have a specific key for API calls.

```node
node app.js get --key='your api key' --area='location name' --country='country code'
```

For an example;
```node
node app.js get --key='OJ7vMNucAKL51wCOIcABQETvr2EFLMwW' --area='Polonnaruwa' --country='LK'
```

Hope you enjoy this small NodeJS Weather Reporter App.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[APACHE] http://www.apache.org/licenses/LICENSE-2.0
