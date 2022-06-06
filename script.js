var todayTempDiv = document.querySelector("#today")


function message1(element){
    alert("Loading weather report...")
};

function message4(element){
    alert("There's nothing more to read.  Just accept already!")
}

var cookieMain = document.querySelector(".cookie");

function remove(){
    cookieMain.remove();
}

var currentCity = "";
var currentLat = "";
var currentLon = "";

function getValue(element){
    currentCity = element.name;
    console.log(currentCity)
    if (currentCity == "Burbank"){
        currentLat = "34";
        currentLon = "118";
    }
    else if (currentCity == "Chicago"){
        currentLat = "41";
        currentLon = "87"
    }
    else if (currentCity == "Dallas"){
    currentLat = "32";
    currentLon = "96"
}
    search()
}

function makeTempDiv(data){
    newMaxF = Math.round(1.8*(data.main.temp_max - 273)+32)
    newMinF = Math.round(1.8*(data.main.temp_min - 273)+32)
    newMaxC= Math.round(data.main.temp_max - 273.15)
    newMinC= Math.round(data.main.temp_min - 273.15)
    if (document.querySelector("#unit").value=="F"){
        var res =  `<div id="today">
                        <h1 class="cityName" name="cityName">${currentCity}</h1>
                        <h2 class="col-top-1">Today</h2>
                        <img class="img-1" src="/assets/some_rain.png" alt="rain">
                        <p class="weather">${data.weather[0].description}</p>
                        <div class="unit">
                            <h2 class="red-1">${newMaxF}</h2>
                            <h2 class="blue-1">${newMinF}</h2>
                        </div>
                    </div>`
    }
    else{
        var res = `<div id="today">
        <h1 class="cityName" name="cityName">${currentCity}</h1>
        <h2 class="col-top-1">Today</h2>
        <img class="img-1" src="/assets/some_rain.png" alt="rain">
        <p class="weather">${data.weather[0].description}</p>
        <div class="unit">
            <h2 class="red-1">${newMaxC}</h2>
            <h2 class="blue-1">${newMinC}</h2>
        </div>
    </div>`
    }
        console.log(res);
    return res;
}
    
async function search(){
    var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" +currentLat+"&lon="+currentLon+"&appid=10fef30764888ff052d51799089b3518");
    var weatherData = await response.json();
    console.log(weatherData)
    todayTempDiv.innerHTML = makeTempDiv(weatherData);
}
