
displayNavigatorDetails();
displayIpDetails();

function displayNavigatorDetails(){
  var navigatorDetails = {};
  for (var i in navigator) navigatorDetails[i] = navigator[i];
  delete navigatorDetails.plugins;
  delete navigatorDetails.mimeTypes;
  addDetailsToTable(navigatorDetails);
  return navigatorDetails;
}

function displayIpDetails() {
  var outvariable;
  $.getJSON('https://api.ipify.org?format=json', function(data) {
    if (data && data.ip) {
      $.getJSON('https://json.geoiplookup.io/' + data.ip + '?callback=?', function(data) {
        addDetailsToTable(data);
      });
    }
  });
}

function addDetailsToTable(details){
  var rowString = "";
  for (var key in details){
    details[key] = JSON.stringify(details[key]);
    if(key && hasValue(details[key])){
      rowString += '<tr><td>'+key+'</td><td>'+details[key]+'</td></tr>';
    }
  }
  $('#clientDetailTable tr:last').after(rowString);
}

function hasValue(value){
  if((value || value === false || value === 0) && value != "{}" && value !== "\"\"" && value != "null"){
    return true;
  }
}
