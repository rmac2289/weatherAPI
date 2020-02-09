/*'use strict';

const recApiKey = '365b4b48-9e5b-4f0c-bc4d-a48669167809'; 
const recSearchURL = 'https://ridb.recreation.gov/api/v1/recareas';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
    console.log(responseJson);
    
    let newData = responseJson.RECDATA;
    $('#resultList').empty();
        newData.forEach(function(val){
            $('#resultList').append(
                `<li><h3><a class="links" href="${val.RecAreaReservationURL}">${val.RecAreaName}</a></h3>
                <p>${val.RecAreaDescription}</p>`)
            });      
        $('#results').removeClass('hidden');
    }
    
function getRecArea(searchTerm) {
    const params = { 
      query: searchTerm,
      };

    const queryString = formatQueryParams(params);
    const newurl = recSearchURL + '?' + queryString;
  
    
    fetch(newurl, {
        header: {
            apikey: recApiKey
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText);
        })
        .then(responseJson => 
            displayResults(responseJson))
        .catch(err => {
            $('#error').text(`Something went wrong: ${err.message}`)
        })

}

    function watchForm() {
        $('form').submit(event => {
            event.preventDefault();
            const searchTerm = $('.text').val();
           getRecArea(searchTerm);

        })
    }

    $(watchForm); */