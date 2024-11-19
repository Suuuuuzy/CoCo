// original file:/media/data2/jianjia/extension_data/unzipped_extensions/gkcaldngjihkfdllegnaniclnpdfcaid/background.js

/*
	A common need for extensions is to have a single long-running script to manage some task or state. Background pages to the rescue.The background page is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active.

	Persistent = FALSE = Event Page
	Persistent = TRUE = Background Page
 */

chrome.runtime.onInstalled.addListener(function () {
	console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener(function (request, sender, response) {
	console.log('Received Message - ' + request.from + ' - ' + request.subject);

	// First, validate the message's structure
	if ((request.from === 'content') && (request.subject === 'show_page')) {
		// Enable the page-action for the requesting tabs
		chrome.pageAction.show(sender.tab.id);
		response({message: "Plugin Shown on " + sender.url});
		console.log('Plugin Shown on ' + sender.url);
	}

	if ((request.from === 'content') && (request.subject === 'request_data')) {
		readData(request.request, function (data) {
			console.log('Request for ' + request.request + ' Answered');
			let body = {body: data};
			response(body);
		});
	}

	if ((request.from === 'content') && (request.subject === 'receive_data')) {
		//debugger;
		let response = request['payload'] || null;
		if (typeof response == "undefined" || response === null) return;
		console.log('Data Received');
		storeData('enics', response.enics);
		storeData('leep_username', response.leep_username);
		storeData('leep_password', response.leep_password);
		setTimeout(function () {
			autoFillData(request.tab_id, response.leep_username);
		}, 500);
		if ((response.leep_username == null || response.leep_username == '') && (response.leep_password == null || response.leep_password == '')) {
			setTimeout(function () {
				requestAutosavePermission(request.tab_id);
			}, 500);
		}
	}

	if ((request.from === 'content') && (request.subject === 'save_question')) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			if (typeof tabs[0] === 'undefined' || tabs[0] === null) return;
			chrome.tabs.sendMessage(tabs[0].id, {
				from: 'background',
				subject: 'save_question',
				data: request.data
			}, function (response) {
			});
		});
	}

	if ((request.from === 'content') && (request.subject === 'save_login')) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			if (typeof tabs[0] === 'undefined' || tabs[0] === null) return;
			chrome.tabs.sendMessage(tabs[0].id, {
				from: 'background',
				subject: 'save_login',
				data: request.data
			}, function (response) {
			});
		});
	}

	if ((request.from === 'content') && (request.subject === 'process_submit')) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			if (typeof tabs[0] === 'undefined' || tabs[0] === null) return;
			chrome.tabs.sendMessage(tabs[0].id, {from: 'background', subject: 'process_submit'}, function (response) {
			});
		});
	}

});

chrome.runtime.onMessageExternal.addListener(function (request, sender) { //response
	if (!sender.url.startsWith('https://app.fflboss.com') &&
		!sender.url.startsWith('https://beta.fflboss.com') &&
		!sender.url.startsWith('https://dev.fflboss.com')) {
		return;  // don't allow this web page access
	}

	if ((request.from === 'application') && (request.subject === 'save_data')) {
		storeData('should_store_data', request.data);
	}
});

function processLocation(details) {
	console.log('Page uses History API and we heard a pushSate/replaceState.');

	const url = (details && details.url) ? (new URL(details.url)) : window.location;
	let site = url.hostname;
	let location = url.pathname.replace(new RegExp("[\-0-9]", "g"), "")

	console.log(url, site, location);

	if (site === 'app.fflboss.com' || site === 'beta.fflboss.com' || site === 'dev.fflboss.com') {
		storeData('login_attempts', 0);
		if (location === '/dispositions/pendings//leep') {
			storeData('page', 'enics');
			console.log('LPB - Time to get data');
			requestData(details.tabId);
		} else if (location === '/dispositions/pendings//status') {
			storeData('page', 'enics_status');
			console.log('LPB - Time to get data');
			requestData(details.tabId);
		} else {
			clearAllData();
		}
	} else {
		clearAllData();
	}
}

function processClicked(info, tab) {
	if (info.menuItemId == "request-data") {
		requestData(tab.id, function (response) {
			storeData('enics', response.enics);
			storeData('leep_username', response.leep_username);
			storeData('leep_password', response.leep_password);
		});
	}
	if (info.menuItemId == "fill-login") {
		readData('leep_username', function (data) {
			autoFillData(tab.id, data);
		});
	}
	if (info.menuItemId == "fill-password") {
		readData('leep_password', function (data) {
			autoFillData(tab.id, data);
		});
	}
	if (info.menuItemId == "fill-background-check") {
		readData('enics', function (data) {
			autoFillData(tab.id, data);
		});
	}
}

//Request Data from Content that will come from FFLBoss
function requestData(tabId, reply) {
	chrome.tabs.sendMessage(
		tabId,
		{
			from: 'background',
			subject: 'request_data',
			tab_id: tabId
		},
		function (response) {
			if (typeof response === 'undefined' || response === null) return;
			console.log(response);
			reply(response);
		}
	);
}

//Send DATA to LEEP
function autoFillData(tabId, data) {
	chrome.tabs.sendMessage(tabId, {from: 'background', subject: 'autofill', data: data}, function (response) {
	});
}

//Send AUTO Save request to FFL Boss
function requestAutosavePermission(tabId) {
	chrome.tabs.sendMessage(tabId, {from: 'background', subject: 'autosave'}, function (response) {
	});
}


function storeData(name, data) {
	if (typeof data !== 'undefined' && data !== null) {
		// Save it using the Chrome extension storage API.
		let store = {};
		store[name] = data;
		chrome.storage.sync.set(store, function () {
			if (data != '')
				console.log('Data Saved for ' + name + ' with ' + data);
		});
	}
}

function readData(name, reply) {
	// Read it using the storage API
	chrome.storage.sync.get([name], function (items) {
		if (items.hasOwnProperty(name)) {
			console.log('Found Data');
			reply(items[name]);
		}
	});
}

function clearData(name) {
	// Read it using the storage API
	chrome.storage.sync.remove([name], function () {
		console.log('Clear Data');
	});
}

function clearAllData() {
	storeData('login_attempts', 0);
	clearData('enics');
	clearData('leep_username');
	clearData('leep_password');
	clearData('stored_username');
	clearData('stored_password');
	clearData('page');
}


chrome.webNavigation.onHistoryStateUpdated.addListener(processLocation);

// chrome.contextMenus.create({id: "request-data", title: "Copy Data from FFL Boss", contexts: ["all"]});
// chrome.contextMenus.create({id: "fill-login", title: "Fill Login", contexts: ["all"]});
// chrome.contextMenus.create({id: "fill-password", title: "Fill Password", contexts: ["all"]});
// chrome.contextMenus.create({id: "fill-background-check", title: "Fill Background Check", contexts: ["all"]});

chrome.contextMenus.onClicked.addListener(processClicked);

