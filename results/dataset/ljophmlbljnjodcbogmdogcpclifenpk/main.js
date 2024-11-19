/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
var tH = 600;
var tW = 1024;
// var sH = screen.availHeight;
// var sW = screen.availWidth;

// if (sH < tH) { tH = sH; }
// if (sW < tW) { tW = sW; }
// var l = (sW - tW) / 2;
// var t = (sH - tH) / 2;
chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
  		id: "idSplashtopCollaborativeBrowser",
 	 	bounds: {
    		height: tH,
    		width:  tW
    	},
        resizable:false,
  	});
});