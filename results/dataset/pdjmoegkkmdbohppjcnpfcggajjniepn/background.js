var bookmarksTaggerBackground = function() {

	var mThis = this;

	this.initialize = function() {
		this.addListeners();
	};

	this.addListeners = function() {

		chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {

            if (request.checkStatus) {
                sendResponse({success: true});
            }
            else if (request.addBookmarkUrl) {
                chrome.bookmarks.create({
                    title: request.title,
                    url: request.addBookmarkUrl
                });
                localStorage.setItem(request.addBookmarkUrl, request.bookCoverUrl);
                localStorage.setItem(request.addBookmarkUrl + "::expired", request.expired);
                sendResponse({success: true});
            }
            else if(request.deleteBookmarkUrl) {
                mThis.deleteBookmarks(request.deleteBookmarkUrl);
                localStorage.removeItem(request.deleteBookmarkUrl);
                sendResponse({success: true});
            }
            else if(request.existsBookmarkUrl) {
                mThis.findResourcesBookmark(request.existsBookmarkUrl, function(bookmarks) {
                    sendResponse({success: bookmarks.length !== 0});
                });
                // return true to indicate you wish to send a response asynchronously 
                return true;
            }
            else {
                sendResponse({success: false});    
            }
        });
    };
    
    this.deleteBookmarks = function(url) {
        chrome.bookmarks.search({}, function(aNodes) {
            for (var i = 0; i < aNodes.length; i++) {
                if (aNodes[i].url && aNodes[i].url.indexOf(url.toLowerCase()) > -1) {
                    chrome.bookmarks.remove(aNodes[i].id);
                }
            }
        });
	};
    
    this.findResourcesBookmark = function(bookmarkUrl, callback) {
        chrome.bookmarks.search({}, function(aNodes) {
            var bookmarks = [];
            for (var i = 0; i < aNodes.length; i++) {
                if (aNodes[i].url && aNodes[i].url.indexOf(bookmarkUrl.toLowerCase()) > -1) {
                    bookmarks.push(aNodes[i].url);
                }
            }
            callback(bookmarks);
        });
	};
};

var lBookmarksTaggerBackground = new bookmarksTaggerBackground();
lBookmarksTaggerBackground.initialize();
