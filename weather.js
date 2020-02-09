'use strict';

const weatherApiKey = 'RvHuT6g694pVw1opF5OSlMwhl8Xs1HMIh4mXTRDo'; 
const weatherID = '9UXdoDduOdlrDusGtCz4p'
const weatherURL = 'https://api.aerisapi.com/batch/';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
    console.log(responseJson);
    let newData = responseJson.response.responses[0].response[0].periods;
    $('#resultList').empty();
    newData.forEach(function(val){
        let forecastDate = new Date(val.validTime)
        let formatDate = forecastDate.toString().slice(0,10)
        if (val.isDay === true){
            $('#resultList').append(
                `<h3 class="future">${formatDate}</h3>
                <li><img src="weatherIcons/${val.icon}"><p>${val.maxTempF}&#8457</p>
                </li>`)
            } else {
                $('#resultList').append(
                    `<li><img src="weatherIcons/${val.icon}"><p>${val.minTempF}&#8457</p>
                    </li>`)
            }
    });    
        $('#results').removeClass('hidden');
    }
    
function getWeather(searchTerm) {
    const params = { 
      format: 'json',
      filter: 'daynight',
      limit: 10,
      client_id: weatherID,
      client_secret: weatherApiKey

      };

    const queryString = formatQueryParams(params);
    const newurl = weatherURL + searchTerm + '?&' + queryString + '&requests=/forecasts,/stormreports%3Flimit=5,/fires/closest,/advisories';
  
      fetch(newurl)
         .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText);
        })
        .then(responseJson => 
            displayResults(responseJson))
        .catch(err => {
            alert(`Something went wrong: ${err.message}`)
        })

}
    function today(){
        let todayDate = new Date();
        let thisYear = todayDate.getFullYear();
        let thisMonth = todayDate.getMonth();
        let todayDay = todayDate.getDate();
        $('header').append(`<h4>${thisMonth+1}/${todayDay}/${thisYear}</h4>`)
    }

    function watchForm() {
        focus();
        today();
        $('form').submit(event => {
            event.preventDefault();
            const searchTerm = $('.text').val();
           getWeather(searchTerm);

        })
    }
    function focus(){
        $(".text").focus();
      };

    $(watchForm);