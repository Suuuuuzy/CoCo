// original file:/Users/jianjia/Documents/COCO_results/all/10k/foikfmnjgoljejophccdlhenbkogiemo/contentscript.js

var brs = chrome;
var s = document.createElement('script');
s.src = brs.runtime.getURL('injected.js');
s.onload = function() {this.remove();};
(document.head || document.documentElement).appendChild(s);
document.addEventListener("hwgame_data_event", function(event) {
    brs.runtime.sendMessage({from: 'contentscr',subject: 'hero_data',data: event.detail});
});
document.addEventListener("hwgame_url_event", function(event) {
    brs.runtime.sendMessage({from: 'contentscr',subject: 'hero_url',data: event.detail});
});
