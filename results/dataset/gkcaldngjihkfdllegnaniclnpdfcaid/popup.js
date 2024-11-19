// Update the relevant fields with the new data

window.onload = function() {

	//console.log('Window Load');

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

			// document.getElementById('loading_page').style.display = 'block';
			// document.getElementById('leep_autofill').style.display = 'none';
	});

};
