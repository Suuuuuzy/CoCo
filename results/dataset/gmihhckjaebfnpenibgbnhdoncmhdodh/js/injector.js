function ajax(options) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (options.callback[xmlhttp.status]) {
                options.callback[xmlhttp.status](xmlhttp.responseText);
            }
        }
    };

    xmlhttp.open(options.method || "GET", options.url, true);
    xmlhttp.send();
}

var injectJs = function (file) {
    var sc = document.createElement('script');
    sc.src = chrome.extension.getURL(file);
    (document.head).appendChild(sc);
}
var injectCss = function (file) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.href = chrome.extension.getURL(file);
    (document.head).appendChild(css);
}

//wait for jq to inject
// setTimeout(function () {
injectCss("css/content.css");
// injectJs("js/jquery-2.1.4.min.js");
injectJs("js/content.js");
// }, 1000);

fetchRates = function (base, callback) {
    ajax({
        url: "https://api.fixer.io/latest?base=" + base,
        method: "GET",
        callback: {
            200: function (responseText) {
                var response = JSON.parse(responseText);
                console.log("fetched new exchanges rates");
                chrome.storage.sync.set({ 'rates': response }, function () {
                    callback(response);
                });
            }
        }
    });
}

//communication
window.addEventListener("message", function (event) {
    if (event.data.ksCurrency && event.data.type) {
        if (event.data.type === "get") {
            chrome.storage.sync.get(null, function (items) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                if (!items.rates || (new Date(items.rates.date)) >= expireDate) {
                    fetchRates(items.rates ? items.rates.base : "USD", function (response) {
                        window.postMessage({
                            type: "update",
                            settings: response,
                            ksCurrency: true
                        }, "*");
                    })
                } else {
                    window.postMessage({
                        type: "update",
                        settings: items.rates,
                        ksCurrency: true
                    }, "*");
                }


            });
        } else if (event.data.type === "set") {
            chrome.storage.sync.set(event.data.setting, function (items) {
            });
        }
    }
}, false);

chrome.storage.onChanged.addListener(function (changes) {
    window.postMessage({
        type: "get",
        ksCurrency: true
    }, "*");
});
