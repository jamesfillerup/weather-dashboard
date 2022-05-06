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
        $("#searchedCity").prepend(`<button class="btn btn-light" value='${city}'>${city}</button>`);
    }
    function archiveCity(array) {
        $.each(array, function (i) {
            cityBtn(array[i]);
        })
    }
});













// //  make api keys for my api calls
//     var keyUrl = "9394674f81c3b96a31bd60057156dfe5"
//     var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&appid=9394674f81c3b96a31bd60057156dfe5"
// // target dom elemens for function actions
//     var searchBtnEl = document.querySelector("#searchBtn")
//     var cityBtnEl = document.querySelector("#cityBtn")

// //  
// var formSubmitHandler = function(event){
//     event.preventDefault();

//     console.log(event.target.value)
//     return;
// }

// searchBtnEl.addEventListener("click", formSubmitHandler);

// $(document).ready(function()){

//     $('#searchBtn').click(function(){
//         var city = $('#city').val();

//         if(city !=''{
//             $.ajax({
//                 url: "api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&appid=9394674f81c3b96a31bd60057156dfe5",
//                 data: {
//                   zipcode: 97201
//                 },
//                 success: function( result ) {
//                   $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
//                 }
//               });
//         })
//     })
// }

//https://jquery.com/
// $.ajax({
//     url: "/api/getWeather",
//     data: {
//       zipcode: 97201
//     },
//     success: function( result ) {
//       $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
//     }
//   });

//WROTE THIS SECTION
// //  make api keys for my api calls
// var keyUrl = "9394674f81c3b96a31bd60057156dfe5"
// var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&appid=9394674f81c3b96a31bd60057156dfe5"
// // target dom elemens for function actions
// var searchBtn = document.querySelector("#searchBtn");
// // var cityBtn = $("#cityBtn")

// //  

// for (var i = 0; i < localStorage.length; i++) {

// var city = localStorage.getItem(i);

// var cityName = $(".city-nav").addClass("city-name-btn");

// cityName.append("<button class='cityBtn col m-2'>" + city + "</button>");
// }

// var keyCount =0;
// searchBtn.click(function(){
//     var cityInput = $('.input').val();
//WROTE THIS SECTION

// });

// function saveCity(){
//     var city = $(this).siblings(".task").val();
//     console.log($(this)); 

//     localStorage.setItem(city)
// }

// searchBtn.addEventListener('click', saveCity);



