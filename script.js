/*

*/

'use strict';
(function () {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "bdba06f98763faea51641b4fe33ef3e1";
    let totalUrl = weatherUrl + '&appid=' + apiKey;

    let $button = $('#getWeatherBtn');
    let $showWeather = $('#showWeather');

    function convertToFarenheit(k) {
        return ((k - 273.15) * 9 / 5 + 32).toFixed();
    }

    // using .ajx method
    $.ajax({
        url: `${weatherUrl}Washington DC&appid=${apiKey}`,

        // Tell YQL what we want and that we want JSON
        data: {
            // q: "select title,abstract,url from search.news where query=\"cat\"",
            format: "json"
        },

        // Work with the response
        success: function (response) {
            console.log('Ajax: Success!');
            console.log(response); // server response
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Ajax: Error!', textStatus, errorThrown);

        }
    });

    // enter data and click button to see tempereture 
    $button.on('click', function (e) {
        e.preventDefault();
        // capture user input
        let $city = $('#city').val();
        let $state = $('#state').val();
        let $temp = 0;
        // call .get method, pass it user input
        $.get(`${weatherUrl}${$city},${$state}&appid=${apiKey}`, function (resp) {
            console.log(resp);
            // convert K to F
            $temp = (convertToFarenheit(resp.main.temp));
            // append to paragraph
            $showWeather.append(`The temperature in ${$city}, ${$state} is ${$temp} &deg;F.<br>`);
        });

        // empty field
        $('#city').val('');
        $('#state').val('');

    });

})();

