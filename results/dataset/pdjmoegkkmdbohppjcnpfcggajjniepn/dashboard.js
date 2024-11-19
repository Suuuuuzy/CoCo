function BookmarksTaggerOptions() {

    var mThis = this;
	
	this.initialize = function() {
		this.addListeners();
	};

	this.addListeners = function() {

		document.addEventListener('DOMContentLoaded', function() {
            mThis.loadTheme();
            mThis.switch();
            mThis.importBookmarks();
            mThis.onlineOffline();
		});
    };

    this.loadTheme = function() {
        var theme = localStorage.getItem("nubereader-extension-theme") || 'light';

        if (theme === 'dark') {
            $('body').addClass('dark');
            $('.switch').addClass('active');
        }

        $('.text-badge').html(chrome.i18n.getMessage("textBadge"));
        $('.alert-cache-message').html(chrome.i18n.getMessage("alertCacheMessage"));
        $('.alert-online-message').html(chrome.i18n.getMessage("alertOnlineMessage"));

        var background = chrome.extension.getBackgroundPage();
        var titleMessage = "title_" + background.branding;
        $('.title').html(chrome.i18n.getMessage(titleMessage));
        $('.panel').addClass('b-' + background.branding);
        
        $("#dialog p").html(chrome.i18n.getMessage("alertOnlineMessage"));
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            title: chrome.i18n.getMessage("alertOnlineMessageDialogTitle")
        });
    };

    this.onlineOffline = function () {
        
        mThis.checkNetwork();

        window.addEventListener('offline', function(event){
            console.log("addEventListener - offline");
            $('.panel').removeClass('online');
        });
        window.addEventListener('online', function(event){
            console.log("addEventListener - online");
            $('.panel').addClass('online');
        });
    };

    var IS_ONLINE = true;
    this.checkNetwork = function() {
        $.ajax({
            url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
            cache: false,
            timeout: 2000,
            crossDomain: true,
            success: function() {
                IS_ONLINE = true;
                $(window).trigger('online');
                $('.panel').addClass('online');
            },
            error: function(jqXHR) {
                if (jqXHR.status == 0 && IS_ONLINE) {
                    // We were online and there is no more network connection
                    IS_ONLINE = false;
                    $(window).trigger('offline');
                    $('.panel').removeClass('online');
                } else if (jqXHR.status != 0 && !IS_ONLINE) {
                    // All other errors (404, 500, etc) means that the server responded,
                    // which means that there are network connectivity
                    IS_ONLINE = true;
                    $(window).trigger('online');
                    $('.panel').addClass('online');
                }
            }
        });
    }

    this.switch = function() {
        $('.switch').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');

            var theme = $(this).hasClass('active') ? 'dark' : 'light';
            localStorage.setItem("nubereader-extension-theme", theme);

            $('body').toggleClass('dark');
        });
    };
    
    this.checkBooks = function() {
        var books = $('.book').length;
        var fillBooks = 0;

        if (books > 0) {
            $('.empty-section').addClass('hide');
        }

        if (books < 9) {
            fillBooks = 8 - books;
        }
        else {
            fillBooks = 4 - (books %4);
        }
        
        for (var i = 0; i < fillBooks; i++) {
            mThis.addEmptyBook();
        }
    };

    this.addEmptyBook = function() {
        $('#bookmarks').append('<div class="content-book empty-book"></div>');
    };
	
	this.importBookmarks = function() {
		var lBookmarkTree = chrome.bookmarks.getTree(function(aBookmarkTreeNodes) {
            for (var i = 0; i < aBookmarkTreeNodes.length; i++) {
                mThis.processBookmarkNode(aBookmarkTreeNodes[i]);
            }
            mThis.checkBooks();
        });
	};
	
	this.processBookmarkNodes = function(aNodes) {
		for (var i = 0; i < aNodes.length; i++) {
			mThis.processBookmarkNode(aNodes[i]);
		}
	};
    
	this.processBookmarkNode = function(aNode) {
		if (aNode.title && !aNode.children) {
			mThis.showBookmark(aNode.title, aNode.url);
		} else if (aNode.children && aNode.children.length > 0) {
			this.processBookmarkNodes(aNode.children);
		}
	};
    
    this.showBookmark = function(title, url) {
       
        if (mThis.isLocalhostUrl(url) || (mThis.isOdiloResourceUrl(url) && mThis.isOdiloDomainUrl(url))) {
            
            var bookCoverUrl = localStorage.getItem(url) || 'media/cover-empty.jpg';
            var expired = localStorage.getItem(url + "::expired");
            expired = expired ? parseInt(expired) : null;
            var expire = '', expireLoan = '';

            if (expired) {
                expire = '<div class="text">' + chrome.i18n.getMessage("expires") + ': ' + dateFormat(new Date(expired), chrome.i18n.getMessage("shortDateFormat")) + '</div>';
            }

            if (expired && new Date() > new Date(expired)) {
                expireLoan = '<div class="expire-loan">' + chrome.i18n.getMessage("expireLoan") + '</div>';
            }

            var book = $(
                '<div class="content-book book">' + 
                    '<div class="remove-loan">' +
                        '<img class="img_light" src="media/ic_clear_light_24px.svg">' + 
                        '<img class="img_dark" src="media/ic_clear_dark_24px.svg">' + 
                    '</div>' +
                    '<img class="cover" src="' + bookCoverUrl + '">' +
                    expireLoan +
                    '<div class="book-info">' +
                        '<div class="title">' + title + '</div>' +
                        expire +
                    '</div>' +
                '</div>');

            $('.remove-loan', book).on('click', function(event){
                event.preventDefault();
                mThis.deleteBookmarks(url);
                book.remove();
                mThis.addEmptyBook();
            });

            $('.cover, .book-info', book).on('click', function(event){
                event.preventDefault();
                if ($('.panel').hasClass("online")) {
                    $("#dialog").dialog("open");
                    return;
                }
                var urlWithParam = url + '?f=plugin';
                chrome.tabs.create({ url: urlWithParam });
            });

            $('#bookmarks').append(book);
        }
    };

    this.deleteBookmarks = function(url) {
        chrome.bookmarks.search({url:url}, function(aNodes) {
            for (var i = 0; i < aNodes.length; i++) {
                chrome.bookmarks.remove(aNodes[i].id);
            }
        });
    };
    
    this.isLocalhostUrl = function(url) {
        return url.indexOf("192.168.10.61:9000") >= 0;
    };
    
    this.isOdiloResourceUrl = function(url) {
        return (url.indexOf("epub") >= 0 && url.indexOf("epub") < 10) || 
            (url.indexOf("pdf") >= 0 && url.indexOf("pdf") < 10);
    };
    
    this.isOdiloDomainUrl = function(url) {
        return url.indexOf("nubereader.es") >= 0 || url.indexOf("odilotk.es") >= 0 || 
            url.indexOf("odilo.us") >= 0 || url.indexOf("bibliotecadigital.ceibal.edu.uy") >= 0 || 
            url.indexOf("bibliotecapais.ceibal.edu.uy") >= 0;
    };
}

var lBookmarksTaggerOptions = new BookmarksTaggerOptions();
lBookmarksTaggerOptions.initialize();
