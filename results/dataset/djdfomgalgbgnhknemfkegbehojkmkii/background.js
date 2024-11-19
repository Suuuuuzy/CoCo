'use strict';

//var base_url = 'http://drivably.inoxoft.tech';
var base_url = 'https://platform.drivably.com';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //Request vehicle details in API with VIN
  if(request.contentScriptQuery == 'queryVin'){
    var url = base_url+'/api/vehicles/vin/'+encodeURIComponent(request.vin)+'?mileage='+encodeURIComponent(request.mileage);
    var token = 'Bearer '+request.token;

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(response => response.json())
    .then(text => sendResponse(text))
    .catch(error => console.log(error));

    return true;
  }

  //Request to save car into list in API
  if(request.contentScriptQuery == 'querySaveVehicle'){
    var url = base_url+'/api/vehicles';
    var token = 'Bearer '+request.token;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            vin: request.vehicle.vin,
            selected_index_detail: request.vehicle.selected_index_detail,
            selected_index_valuation: request.vehicle.selected_index_valuation,
            currentDetail: request.vehicle.details[request.vehicle.selected_index_detail].style+' '+request.vehicle.details[request.vehicle.selected_index_detail].series,
            currentValuation: request.vehicle.valuations[request.vehicle.selected_index_valuation].trim,
            list: request.list,
            buy_price: request.buy_price,
            mileage: request.mileage,
            site_url: tabs[0].url,
            details: request.vehicle.details
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then(response => response.json())
        .then(text => sendResponse(text))
        .catch(error => console.log(error));
    });

    return true;
  }

  //Request login in API
  if(request.contentScriptQuery == 'queryLogin'){
    var url = base_url+'/api/login';

    fetch(url, {
      method: 'POST',
      body: '{"email": "'+request.email+'", "password": "'+request.password+'", "remember_me": true}',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => response.json())
    .then(text => sendResponse(text))
    .catch(error => console.log(error));

    return true;
  }

  //Request logout in API
  if(request.contentScriptQuery == 'queryLogout'){
    var url = base_url+'/api/logout';
    var token = 'Bearer '+request.token;

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(response => response.json())
    .then(text => sendResponse(text))
    .catch(error => console.log(error));

    return true;
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({
    url: base_url+'/extension',
    active: true
  });

  return false;
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  if (request.data) {
    chrome.storage.sync.set({'access_token': request.data.access_token}, function() {
      sendResponse(true);
    });
  }
});
