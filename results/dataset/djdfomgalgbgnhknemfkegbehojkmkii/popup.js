'use strict';

//var base_url = 'http://drivably.inoxoft.tech';
var base_url = 'https://platform.drivably.com';

var popup = {
  form: '<form action="#" id="form" novalidate><fieldset>'+
      '<img src="images/logo.png" id="logo" />'+
      '<label for="email">E-mail</label>'+
      '<input type="email" name="email" id="email" placeholder="Your e-mail" />'+
      '<label for="password">Password</label>'+
      '<input type="password" name="password" id="password" placeholder="Your password" />'+
      '<input type="submit" value="Sign In" id="btn" />'+
      '<a href="'+base_url+'/extension" id="btn-sync" target="_blank">Sync Drivably account</a>'+
      '<a href="'+base_url+'/register?from=chrome_extension" target="_blank">Create an account</a>'+
      '<p id="msg"><p></fieldset>'+
    '</form>',
  logged: '<div id="logged">'+
      '<img src="images/logo.png" id="logo" />'+
      '<h3>Welcome to Drivably</h3>'+
      '<button class="btn" id="refresh">Refresh page</button>'+
      '<button class="btn" id="logout">Logout</button>'+
    '</div>',

  init: function(){
    //Show page logged user or login
    chrome.storage.sync.get(['access_token'], function(result) {
      if(result.access_token){
        $('#block').append(popup.logged);
      } else {
        $('#block').append(popup.form);
      }
    });
  },
  login: function(email, password){
    if(email && password){
      chrome.runtime.sendMessage({contentScriptQuery: 'queryLogin', email: email, password: password}, response => popup.loginResponse(response));
    } else {
      popup.showMessage('E-mail and password is required');
    }
  },
  loginResponse: function(response){
    if(response.access_token){
      chrome.storage.sync.set({'access_token': response.access_token}, function() {
        $('#form').remove();
        $('#block').append(popup.logged);
        popup.clear();
      })
    } else {
      popup.showMessage(response.message);
    }
  },
  logout: function(){
    chrome.storage.sync.get(['access_token'], function(result) {
      chrome.runtime.sendMessage({contentScriptQuery: 'queryLogout', token: result.access_token}, response => popup.logoutResponse(response));
    });
  },
  logoutResponse: function(response){
    if(response.logout){
      chrome.storage.sync.remove(['access_token'], function(result) {
        $('#logged').remove();
        $('#block').append(popup.form);
        popup.showMessage(response.message);
      })
    } else {
      popup.showMessage(response.message);
    }
  },
  showMessage: function(msg){
    $('#msg').text(msg).show();
  },
  refresh: function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
  },
  clear: function(){
    $('#email, #password').val('');
  }
}

//Events
$(document).on('submit', '#form', function(evt){
  var email = $('#email').val();
  var password = $('#password').val();

  popup.login(email, password);

  evt.preventDefault();
});

$(document).on('click', '#logout', function(evt){
  popup.logout();

  evt.preventDefault();
});

$(document).on('click', '#refresh', function(evt){
  popup.refresh();

  evt.preventDefault();
});


//Init
(function() {

  popup.init();

})();
