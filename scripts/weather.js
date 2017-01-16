jQuery(document).ready(function($) {
  $('input[type="search"]').on('typeahead:selected', function(event, selection) {
    console.log(selection);

    // TODO capture the value of search input
    var cityName = selection;

    var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?appid=68d06ff44fb97dc7a6ea98b54f8374ba&callback=';
    var openWeatherOptions = {
      mode  : 'JSON',
      units : 'metric',
      q     : cityName,
    };

    var timeConverter = function(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      // var year = a.getFullYear();
      // var month = months[a.getMonth()];
      // var date = a.getDate();
      var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
      var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
      var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
      var time =  hour + ':' + min + ':' + sec ;
      return time;
    };

    var dateConverter = function(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      var displayDate = date + ' ' + month + ' ' + year;
      return displayDate;
    };

    var displayIcon = function(iconId, description) {
      var icon = '<img src="http://openweathermap.org/img/w/' + iconId + '.png" alt="' + description + '" class="weather-icon">';
      return icon;
    };

    var displayError = function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    };

    var displayWeather = function(response) {
    
      $('#results').empty(); // clear the previous search
      var weatherHTML = '<ul class="list">';
      weatherHTML += '<li>' + response.name + ', ' + response.sys.country + displayIcon(response.weather[0].icon, response.weather[0].description) + '</li>';
      weatherHTML += '<li>' + response.main.temp +' °C</li>';
      weatherHTML += '<li class="capitalize">' + response.weather[0].description +'</li>';
      weatherHTML += '<li> Date: ' + dateConverter(response.dt) +'</li>';
      weatherHTML += '<li> Sunrise at: ' + timeConverter(response.sys.sunrise) +'</li>';
      weatherHTML += '<li> Sunset at: ' + timeConverter(response.sys.sunset) +'</li>';
      weatherHTML += '<li> Pressure: ' + response.main.pressure +' hpa</li>';
      weatherHTML += '<li> Wind speed: ' + response.wind.speed +' km/h</li>';
      weatherHTML += '<li> Humidity: ' + response.main.humidity +' %</li>';
      weatherHTML += '</ul>';

      $('#results').html(weatherHTML);
    };

    $.getJSON(openWeatherAPI, openWeatherOptions, displayWeather).fail(displayError);
  }); // end typehead:selected event 
}); // end ready
