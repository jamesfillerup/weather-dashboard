$(document).ready(function () {

    var cityArray;
    // var cityCoordinates = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&APPID=" + apiKey;
    var todaysWeather = $("#currentWeather");
    var fiveForecast = $("#fiveForecast");

    // GETS SEARCHED CITY NAMES SAVES TO LOCAL STORAGE
    if (localStorage.getItem("cityKey")) {
        cityArray = JSON.parse(localStorage.getItem("cityKey"));
        archiveCity(cityArray);
    } else {
        cityArray = [];
    };

    //LOOKS FOR DATA BASED ON THE CITY INPUT
    $("#searchBtn").click(function () {
        event.preventDefault();
        var city = $("#citySearch").val();
        currentWeather(city);
        weatherForecast(city);
    });
    //PULLS WEATHER DATA WHEN THE BTN IS HIT
    $("#searchedCity").click(function () {
        var city = event.target.value;
        currentWeather(city);
        weatherForecast(city);
    })
    
    function currentWeather(city) {
        var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9394674f81c3b96a31bd60057156dfe5";

        $.ajax(cityQuery)
            .then(function (input) {
            
                var weatherIcon = "https://openweathermap.org/img/w/" + (input.weather[0].icon) + ".png";
                
                var currentDate = new Date(input.dt * 1000);
                //TODAYS HTML DATA
                todaysWeather.html(`
                    <div>
                        <h2>${input.name}, ${input.sys.country} (${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
                        <p>Temperature: ${parseInt(input.main.temp).toFixed() + " &#176F"}</p>
                        <p>Humidity: ${(input.main.humidity)}%</p>
                        <p>Wind Speed: ${(input.wind.speed).toFixed(1) + " MPH"}</p>
                    </div>`
                )
                cityBtn(input.name);
            })
    };
    
    function weatherForecast(city) {
        var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=9394674f81c3b96a31bd60057156dfe5";
        $.ajax(forecastQuery)
            .then(function (input) {
                var forecast = input.list;
                
                fiveForecast.empty();
                $.each(forecast, function (i) {
                    //THIS MAKES IT SO IT ONLY PULLS 5 DAY FORECAST INSTEAD ALL
                    if (!forecast[i].dt_txt.includes("12:00:00")) {
                        return;
                    }
                    var forecastDate = new Date(forecast[i].dt * 1000);
                    var weatherIcon = `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`;

                    //THIS IS WHAT IS ADDED TO THE PAGE WITH ITS CORRESPONDING DATA
                    fiveForecast.append(`
                        <section class="col-md">
                            <div class="card ">
                                <div class="card-body">
                                    <h4>${forecastDate.getMonth() + 1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                                    <img src=${weatherIcon} alt="Icon">
                                    <p>Temp: ${(forecast[i].main.temp).toFixed() + " &#176F"}</p>
                                    <p>Humidity: ${forecast[i].main.humidity}%</p>
                                </div>
                            </div>
                        </section>`)
                })
            })
    };

    function cityBtn(city) {
        //THIS MAKES SURE THAT WHEN A BTN IS CLICKED THAT IT DOESN'T CREATE A DUPLICATE BTN
        var citySearch = city.trim();
        var buttonCheck = $(`#searchedCity > BUTTON[value='${citySearch}']`);
        if (buttonCheck.length == 1) {
            return;
        }

        // REMOVES ANY DUPLICATES IF PUT TWICE IN INPUT
        if (!cityArray.includes(city)) {
            cityArray.push(city);
            localStorage.setItem("cityKey", JSON.stringify(cityArray));
        }
        //ADDS BTN OF SEARCHED CITY
        $("#searchedCity").prepend(`
            <div>
                <button class="btn btn-light" value='${city}'>${city}</button>
            </div>`);
    }
    
    function archiveCity(array) {
        $.each(array, function (i) {
            cityBtn(array[i]);
        })
    }
});

