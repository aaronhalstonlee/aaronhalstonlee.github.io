var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    //globals
    var appid = "c3494159ec59eb5abb08b856c55a5830";
    var lat = '', lon = '';
    var weatherURL='';
    var temp;
    
    //get location
    let getWeather = () => {
        //get coords
        let locate = (spot) => {
            lat = spot.coords.latitude.toFixed(4);
            lon = spot.coords.longitude.toFixed(4);
            weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${appid}`;
        };

        //when not able to locate
        let err = () => {
            alert("Oops... I'm having trouble finding you...")
        };

        //location call
        navigator.geolocation.getCurrentPosition(locate, err);

        //api call for weather data
        let weatherData = () => {
            let xhttp = new XMLHttpRequest();
            xhttp.open('GET', weatherURL);
            xhttp.send();

            xhttp.onload = () => {
                if(xhttp.status != 200){
                    alert("http failure, i guess... ? : " + xhttp.status);
                    return;
                }
                let data = JSON.parse(xhttp.responseText);
                temp = data.list[0].main.temp;
                let weatherDescript = data.list[0].weather[0].description;
                let weatherIcon = data.list[0].weather[0].icon;
                let location = document.getElementById("location");
                let weather = document.getElementById("weather");

                location.innerHTML = data.city.name;
                weather.innerHTML = `<span id="temperature">${(9/5*(temp-273)+32).toFixed(1)}</span><span id="unit">°F</span><br><img style="height: 75px;" src="https://openweathermap.org/img/w/${weatherIcon}.png"> ${weatherDescript}`;
            }
        };
        setTimeout(weatherData, 500);
    };
    getWeather();

    //change temp units
    let today = document.getElementById("today");
    today.addEventListener("click", () => {
        let unit = document.getElementById("unit");
        let temp = document.getElementById("temperature");
        let intTemp = parseInt(document.getElementById("temperature").innerText);
        //console.log("temp", parseInt(temp.innerText),"unit", unit.innerText);
        if (unit.innerText == "°F"){
            unit.innerText = "°C";
            temp.innerText = ((intTemp - 32)*(5/9)).toFixed(1);
        } else if (unit.innerText == "°C"){
            unit.innerText = "°F";
            temp.innerText = (((9/5) *intTemp) + 32).toFixed(1);
        };
    });
});