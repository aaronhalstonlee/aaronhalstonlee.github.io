$(document).ready(function(){
    //globals
    var appid = "c3494159ec59eb5abb08b856c55a5830";
    var lat = '', lon = '';
    var weatherURL='';
    var temp;
    
    //get location
    function getWeather(){
        //get coordinates
        function locate(spot){
            lat = spot.coords.latitude.toFixed(4);
            lon = spot.coords.longitude.toFixed(4);
            weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${appid}`;
        };
        
        //when not able to locate
        function err(){
            alert("sorry, I can't find you");
        }
        
        //location call
        navigator.geolocation.getCurrentPosition(locate, err);
        
        //api call for weather data
        function weatherData(){
            $.getJSON(weatherURL, function(data){
                temp = data.list[0].main.temp;
                var weatherDescript = data.list[0].weather[0].description;
                var weatherIcon = data.list[0].weather[0].icon;
                $('#location').html(data.city.name)
                $('#weather').html(`<span id="temperature">${(9/5*(temp-273)+32).toFixed(1)}</span><span id="unit">°F</span><br><img style="height: 75px;" src="https://openweathermap.org/img/w/${weatherIcon}.png"> ${weatherDescript}`);
            });
        };
        setTimeout(weatherData, 500);
    };
    getWeather();
    
    //change temp units
    $('#today').click(function(){
        if ($('#unit').html() == "°F"){
            $('#unit').html("°C");
            $('#temperature').html((temp - 273).toFixed(1));
        } else if ($('#unit').html() == "°C"){
            $('#unit').html("°F");
            $('#temperature').html((9/5*(temp - 273)+32).toFixed(1));
        }
    });
});