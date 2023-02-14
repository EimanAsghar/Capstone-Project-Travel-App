const dotenv = require('dotenv');
dotenv.config();

// weatherbit API

const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = process.env['WEATHERBIT_API_KEY'];
console.log(`API Key: ${process.env.WEATHERBIT_API_KEY}`);

// Pixabay API
const pixabay_URL = 'https://pixabay.com/api/?key=';
const pixabay_Key = `${process.env.Pixabay_API_KEY}&q=`;
const pixabay_parameters = '&image_type=photo';


// Setup empty JS object to act as endpoint for all routes
geonamesData = {};
weatherbitData = {};
PixabayData = {};

var path = require('path')
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Configure express static directory.
app.use(express.static('dist'))

console.log(__dirname)

const port = 3000;

// Setup Server

 app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

  app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
  })

// POST route
app.post('/geonamesAPI', callBack_geonames);

function callBack_geonames(request, response){
  geonamesData['lng'] = request.body.lng;
  geonamesData['lat'] = request.body.lat;
  geonamesData['countryName'] = request.body.countryName;
  response.send(geonamesData);
};


//WEATHERE !!!!!!!!!!
app.post('/weatherbitAPI', async function(req, res) {

  const apiData = weatherbitURL + `?&lat=${geonamesData.lat}&lon=${geonamesData.lng}&key=` + weatherbitKey
  const response = await fetch(apiData)
  const data = await response.json()
  weatherbitData = {
    'description': data.data[0].weather.description,
    'high_temp':  data.data[0].high_temp,
    'low_temp':  data.data[0].low_temp

  }
  console.log(weatherbitData)
  res.send(weatherbitData)
})


app.post('/pixabayAPI', async function(req, res) {

  location = req.body.location
  const apiData = `${pixabay_URL}${pixabay_Key}${location}${pixabay_parameters}`

  const response = await fetch(apiData)
  const data = await response.json()

  PixabayData= {
    'photo': data.hits[0].largeImageURL
  }

  res.send(PixabayData)

})

  
  // GET route
  app.get('/all', sendData);

  function sendData (request, response) {
    let result = [geonamesData, weatherbitData, PixabayData]
    console.log(result)
    response.send(result);
  };
  
  