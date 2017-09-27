(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['display_weather'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    "
    + container.escapeExpression(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"country","hash":{},"data":data}) : helper)))
    + "\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    "
    + container.escapeExpression((helpers.displayWeatherIcon || (depth0 && depth0.displayWeatherIcon) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.icon : depth0),(depth0 != null ? depth0.description : depth0),{"name":"displayWeatherIcon","hash":{},"data":data}))
    + "\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <li>"
    + alias4(((helper = (helper = helpers.temp || (depth0 != null ? depth0.temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temp","hash":{},"data":data}) : helper)))
    + " °C</li>    \r\n  <li>Humidity: "
    + alias4(((helper = (helper = helpers.humidity || (depth0 != null ? depth0.humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"humidity","hash":{},"data":data}) : helper)))
    + " %</li>\r\n  <li>Pressure: "
    + alias4(((helper = (helper = helpers.pressure || (depth0 != null ? depth0.pressure : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pressure","hash":{},"data":data}) : helper)))
    + " hpa</li> \r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <li>Wind speed: "
    + container.escapeExpression(((helper = (helper = helpers.speed || (depth0 != null ? depth0.speed : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"speed","hash":{},"data":data}) : helper)))
    + " km/h</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<li>\r\n  "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.sys : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.weather : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li>\r\n<li>"
    + alias3((helpers.date || (depth0 && depth0.date) || alias2).call(alias1,(depth0 != null ? depth0.dt : depth0),{"name":"date","hash":{},"data":data}))
    + "</li>\r\n"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.main : depth0),{"name":"with","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.wind : depth0),{"name":"with","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();