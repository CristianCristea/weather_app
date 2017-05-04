jQuery(document).ready(function($) {
  var $search = $('#search');

  $search.on('typeahead:selected', function(event, selection) {
    var cityName = selection;
    var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?appid=68d06ff44fb97dc7a6ea98b54f8374ba&callback=';
    var openWeatherOptions = {
      mode  : 'JSON',
      units : 'metric',
      q     : cityName,
    };

    var timeConverter = function(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
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

    Handlebars.registerHelper('time', function(timestamp) {
      timestamp = Handlebars.Utils.escapeExpression(timestamp);
      var result = timeConverter(timestamp);

      return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('date', function(timestamp) {
      timestamp = Handlebars.Utils.escapeExpression(timestamp);
      var result = dateConverter(timestamp);

      return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('displayWeatherIcon', function(src, alt) {
      src = Handlebars.Utils.escapeExpression(src);
      alt = Handlebars.Utils.escapeExpression(alt);
      var result = '<img src="http://openweathermap.org/img/w/' + src + '.png" alt="' + alt + '" class="weather-icon">';

      return new Handlebars.SafeString(result);
      // <img src="{{weather[0].icon}}.png" alt="{{weather[0].description}}" class="weather-icon">
    });

    $.ajax(openWeatherAPI, {
      dataType: 'json',
      data: openWeatherOptions,
      success: function(data) {
        var template = Handlebars.templates['display_weather'],
            htmlContent = template(data);
            
        $('ul.list').html(htmlContent);
      },
      error: function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      },
      always: function() {
        $search.val('');
      }
    });
  }); // end typehead:selected event

  // reset input on click
  $search.on('click', function() {
    $search.val('');
    $('ul.list').empty();
  });

  // refresh page on click
  $('#home').on('click', function(e) {
    e.preventDefault();
    location.reload();
  });
}); // end ready




// add current location btn

// get location coords
// make ajax call to api.openweathermap.org/data/2.5/weather?lat=35&lon=139
// display results