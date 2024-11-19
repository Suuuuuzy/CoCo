

let checkmark  = document.getElementById('set-execution');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('hide', function(data) {
  checkmark.checked = data.hide;
});

checkmark.onchange = function(element) {
  let value = this.checked;

  console.log("set the value", value)

  // //update the extension storage value
  // chrome.storage.sync.set({'hide': value}, function() {
  //   console.log('The new value is'+ value);
  // });

  // //Pass init or remove message to content script 
  // if(value){
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: value}, function(response) {
  //                   console.log(response.result);
  //               });
  //   });
  // }else{
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {command: "remove", hide: value}, function(response) {
  //                   console.log(response.result);
  //     });
  //   });
  // }

};

