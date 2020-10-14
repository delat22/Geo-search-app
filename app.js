//DOM Manipulation

const inputElement = document.getElementById('text');
const searchButton = document.getElementById('buton');
const errorMsg = document.getElementById('error');
const cityName = document.getElementById('citi');
const weatherIcon = document.getElementById('weather-icon');
const weatherContent = document.getElementById('weather');
const tempDisplay = document.getElementById('temp');
const windDisplay = document.getElementById('wind');
const humidityDisplay = document.getElementById('humidity');
const pressureDisplay = document.getElementById('pressure');


const searchContainer = document.getElementById('search');
const resultContainer = document.getElementById('result');


//Fetch API

function makeRequest(data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e`);
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200 || request.status === 201) {
           resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      }
    });
  }


  //Receive API response

  async function submitFormData(cit) {
      try{
        const requestPromise = makeRequest(cit);
        const response = await requestPromise;
        cityName.textContent = response.name;  
        weatherContent.textContent = response.weather[0].description;
        weatherIcon.src =  "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        tempDisplay.textContent = response.main.temp;
        humidityDisplay.textContent = response.main.humidity;
        pressureDisplay.textContent = response.main.pressure;
        windDisplay.textContent = response.wind.speed;
        const longitude = response.coord.lon;
        const latitude = response.coord.lat;
        mapDisplay(latitude, longitude);
      }

      catch (errorResponse) { 

        alert('Not Copied')
      }
    }

/*** 
//Create Node and Append Parent
function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}
***/   

searchButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    //errorMessage();
    searchContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    let cit = inputElement.value;
    submitFormData(cit);

})

function errorMessage(){
    if(inputElement.value == ''){
        errorMsg.style.display = 'block';
        inputElement.style.borderColor = 'red';
    }
}

function mapDisplay(long, lat){
  var mymap = L.map('mapid').setView([long, lat], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGVsYXRiYWJhIiwiYSI6ImNrZWs5YWoxejEyZ3cycW5waWMwc2VkcHkifQ.hDx7OrGBMvKyLlHxGIF7eQ'
    }).addTo(mymap);
  var marker = L.marker([long, lat]).addTo(mymap);
}
