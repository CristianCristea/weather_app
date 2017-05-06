jQuery(document).ready(function($) {
  var $search = $('#search');
  var photos = {
    'default': ['default1', 'default2', 'default3', 'default4', 'default5', 'default6', 'default7'],
    'rain': ['rain1', 'rain2', 'rain3', 'rain4', 'rain5'],
    'snow': ['snow1', 'snow2', 'snow3', 'snow4']
  };
  var weather_code;

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

  var randomNumber = function(min , max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var chooseBackgroundPhoto = function(code, photo_set) {
    if (code >= 200 && code < 600) {
      return photos.rain[randomNumber(0, photo_set.rain.length)];
    } else if (code >= 600 && code < 700) {
      return photos.snow[randomNumber(0, photo_set.snow.length)];
    } else {
      return photos.default[randomNumber(0, photo_set.default.length)];
    }
  };

  var displayBackgroundPhoto = function() {
    return $('body').css('background', 'url(../img/' + chooseBackgroundPhoto(weather_code, photos) + '.jpg)');
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

    var displayError = function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    };

    var displayData = function(data) {
      var template = Handlebars.templates['display_weather'],
          htmlContent = template(data);
      $('ul.list').html(htmlContent);
      displayBackgroundPhoto(weather_code, photos);
    };

  // select location event
  $search.on('typeahead:selected', function(event, selection) {
    var cityName = selection;
    var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?appid=68d06ff44fb97dc7a6ea98b54f8374ba&callback=';
    var openWeatherOptions = {
      mode  : 'JSON',
      units : 'metric',
      q     : cityName,
    };

    $.ajax(openWeatherAPI, {
      dataType: 'json',
      data: openWeatherOptions,
      success:function(data) {
        displayData(data);
        // reset input val after every search
        $search.val('');
        weather_code = data.weather[0].id;
        console.log(weather_code);
      },
      error: displayError
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

  // current location click event
  $('#currentLocation').on('click', function(e) {
    // check if geolocation is available
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var coordonates = pos.coords;
        var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?appid=68d06ff44fb97dc7a6ea98b54f8374ba';
        var openWeatherOptions = {
          lat: coordonates.latitude,
          lon: coordonates.longitude,
          units : 'metric'
        };

        $.ajax(openWeatherAPI, {
        dataType: 'json',
        data: openWeatherOptions,
        success: function(data) {
        displayData(data);
        // reset input val after every search
        $search.val('');
        weather_code = data.weather[0].id;
        console.log(weather_code);
      },
        error: displayError
        });
      });
    } else {
      alert('Location not available, please upgrade your browser');
    }
  });
}); // end ready
