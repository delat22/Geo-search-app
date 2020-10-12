//DOM Manipulation

const inputElement = document.getElementById('text');
const searchButton = document.getElementById('buton');
const errorMsg = document.getElementById('error');
const cityName = document.getElementById('citi');

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
        return cityName.textContent = response.name;  
      }

      catch (errorResponse) { 

        alert('Not Copied')
      }
    }
    

searchButton.addEventListener('click', ($event) => {
    //errorMessage();
    let cit = inputElement.value;
    submitFormData(cit);

})

function errorMessage(){
    if(inputElement.value == ''){
        errorMsg.style.display = 'block';
        inputElement.style.borderColor = 'red';
    }
}


