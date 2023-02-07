/* Global Variables */

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=24d2cd9ca7d20742088c9e53c8b8f428&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET
const retrieveData = async (baseURL, apiKey, ZipCode) =>{ 
    const request = await fetch(baseURL + ZipCode + apiKey);
    try {
    // Transform into JSON
    const allData = await request.json()
    return allData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };


  // Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
    }), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipcode  =  document.getElementById('zip').value;
    const content =  document.getElementById('feelings').value;
  
    retrieveData(baseURL, apiKey, zipcode)
    // New Syntax!
    .then(function(data){
      // Add data
      console.log(data);
      postData('/add', {date: newDate, temp: data.main.temp, content} );
    })
    .then(function (newData) {
        updateUI()
      })
  }
  
  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
  
    }catch(error){
      console.log("error", error);
    }
  }