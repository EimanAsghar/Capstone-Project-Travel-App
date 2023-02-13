//Geonames API 
const geonames_URL = 'http://api.geonames.org/searchJSON?q=';
const parameters = '&maxRows=10&fuzzy=0.8&';
const geonames_username = `username=eiman_ka`;

// Pixabay API

pixabay_URL = 'https://pixabay.com/api/?&image_type=photo&q=';

function performAction(e){

  e.preventDefault()

  const location  =  document.getElementById('location').value;
  const date =  document.getElementById('date').value;

  retrieveData_Geonames(location)
  // New Syntax!
  .then(function(data){
    // Add data
    console.log(data);
    postData('http://localhost:3000/geonamesAPI', data);
  })
  .then(function(photo){
    retrieveData_Pixabay(location)

  })
  .then(function (newData) {
      updateUI()
    })
}
// Async GET
const retrieveData_Geonames = async (location) =>{ 
  const request = await fetch(`${geonames_URL}${location}${parameters}${geonames_username}`);
  try {
  // Transform into JSON
  const allData = await request.json()
  const info= {
    lng: allData.geonames[0].lng,
    lat: allData.geonames[0].lat,
    countryName: allData.geonames[0].countryName
  }
  return info;
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
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

// Async GET
const retrieveData_Pixabay = async (location) =>{ 
  const request = await fetch(`${pixabay_URL}${location}${'&key'}`);
  try {
  // Transform into JSON
  const allData = await request.json()
  const info= {
    lng: allData.geonames[0].lng,
    lat: allData.geonames[0].lat,
    countryName: allData.geonames[0].countryName
  }
  return info;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};


const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try{
    const allData = await request.json();
    document.getElementById('date2').innerHTML = allData.lng;
    document.getElementById('summary').innerHTML = allData.lat;
    document.getElementById('high').innerHTML = allData.countryName;

  }catch(error){
    console.log("error", error);
  }
}

export { performAction }