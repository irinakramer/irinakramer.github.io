/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data .
  for Washington DC (hint: http://api.openweathermap.org/data/2.5/weather?q=...).
- Print the temperature in console.
- Bonus 1: add a form prompting user for the city and state.
- Bonus 2: convert answer from kelvin to fahrenheit.

*/

'use strict';
(function () {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "bdba06f98763faea51641b4fe33ef3e1";
    let totalUrl = weatherUrl + '&appid=' + apiKey;

    let $button = $('#getWeatherBtn');
    let $showWeather = $('#showWeather');

    function convertToFarenheit(k) {
        return ((k - 273.15) * 9 / 5 + 32).toFixed();
    }

    // show Washington DC temperature on document ready
    // using .get method
    $.get(`${weatherUrl}Washington DC&appid=${apiKey}`, function (resp) {
        console.log(resp);
        console.log('Temperature in Washington DC is ' + resp.main.temp);
    });


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
            $showWeather.append(`The temperature in ${$city}, ${$state} is ${$temp} &deg;F.`);
        });

        // empty field
        $('#city').val('');
        $('#state').val('');

    });

})();

