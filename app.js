const body = document.querySelector("body");
const container = document.querySelector(".container");
const weatherBtnEl = document.getElementById("weatherBtn");
const weatherInputEl = document.getElementById("weatherInput");
const firstCardEl = document.querySelector(".firstCard");
const burger = document.querySelector(".burger");
let defaultCity = "barranquilla";


burger.addEventListener("click", () => {
    burger.classList.toggle("active");  
})




//array with main cities in the world
let mainCities = ["new york", "mexico city", "beijing", "london", "jerusalem", "los angeles", "paris", "moscow",
"rio de janeiro", "cairo", "buenos aires", "roma", "seoul", "shanghai", "tokio", "delhi", "sao paulo", "istanbul", "berlin", "budapest", "munich", "bangkok"];




// 2 ARRAYS -- They'll be used in a function in which depending the weather description, it'll choose any of the image sources on the array bellow 
let imageCode = ["./img/clouds.png", "./img/sun.png", "./img/heavy-rain.png", "./img/misty.png", "./img/haze.png"];
let weathersDesc = ["Clouds", "Clear", "Rain", "Mist", "Haze"];



getDataSingle(defaultCity);
//code to get and display the data of the first card in the html code 
async function getDataSingle(userCity){
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=26c25a94171b06cf681d940caed738cf&units=metric`);
        let data = await res.json();
        displaySingleData(data, weathersDesc, imageCode);
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}


function displaySingleData(info, array, images){
    for(let i = 0; i < array.length; i++){ //iterate the array that has the weather descriptions anthe will pick the image source 
        if(array[i] == info.weather[0].main){
            let html = "";
        let htmlSection = `<div class="first-box-one">
            <div class="first-image-box">
                <img src="${images[i]}">
            </div>

            <div class="first-info-box">
                <h2 class="first-city-country">${info.name} - ${info.sys.country}</h2>
                <h2 class="first-temp">${parseInt(info.main.temp)}°C</h2>
            </div>
        </div>

        <div class="first-box-two">
            <h2 class="first-feels-like">${parseInt(info.main.feels_like)}° <br> <span>FEELS LIKE</span></h2>
            <h2 class="first-weather">${info.weather[0].main} <br> <span>DESCRIPTION:</span></h2>
            <h2 class="first-humidity">${info.main.humidity}% <br> <span>HUMIDITY</span></h2>
        </div>`;

        html += htmlSection;
        firstCardEl.innerHTML = html;
        
        }
    }
}

//code to get and display the data of the first card in the html code 


//search bar functionality code

weatherBtnEl.addEventListener("click", () => {
    defaultCity = weatherInputEl.value.toLowerCase();
    getDataSingle(defaultCity);
    weatherInputEl.value = "";
})

//search bar functionality code




let fourCities = [];
//FUNCTION TO GIVE ME RANDOMLY 5 DIFFERENT CITIES ---
function sixCities(array){
    for(let i = 0; i < array.length; i++){
        let randomCity = Math.floor(Math.random() * array.length);
        if(!fourCities.includes(array[randomCity]) && fourCities.length <= 3){ 
            fourCities.push(array[randomCity]);
        }
    }

    return fourCities;
}

let arrayWithFourCities = sixCities(mainCities); //

async function getData(array){
    try{
        for(let i = 0; i < array.length; i++){
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${array[i]}&appid=26c25a94171b06cf681d940caed738cf&units=metric`);
            let data = await res.json();
            // displayWeather(data, weathersDesc, imageCode);

            displayWeather(data, weathersDesc, imageCode);

            console.log(data);
        }
    }
    catch(error){
        console.log(error);
    }
}


function displayWeather(element, array, image){
    for(let i = 0; i< array.length; i++){
        if(array[i] == element.weather[0].main){
            let html = "";
            let htmlSection = `
                <div class="boxOne">
                    <div class="image-box">
                        <img src="${image[i]}">
                    </div>

                    <div class="info-box">
                        <h2 class="city-country">${element.name} - ${element.sys.country}</h2>
                        <h2 class="temp">${parseInt(element.main.temp)}°C</h2>
                    </div>
                </div>

                <div class="boxTwo">
                    <h2 class="feels-like">${parseInt(element.main.feels_like)}° <br> <span>FEELS LIKE</span></h2>
                    <h2 class="weather">${element.weather[0].main} <br> <span>DESCRIPTION:</span></h2>
                    <h2 class="humidity">${element.main.humidity}% <br> <span>HUMIDITY</span></h2>

                </div>

            `;

            html += htmlSection;

            let divCard = document.createElement("div")
            divCard.classList.add("card");
            divCard.innerHTML = html;

            container.append(divCard);
        }
    }
}

getData(arrayWithFourCities);

