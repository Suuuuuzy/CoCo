void(function(){
    var
        gtkJs = document.createElement('script');
        gtkJs.type='text/javascript';
        gtkJs.src  = chrome.extension.getURL("js/app.min.js");
        document.body.appendChild(gtkJs);

    var
        gtkCss = document.createElement('link');
        gtkCss.rel = 'stylesheet';
        gtkCss.type = 'text/css';
        gtkCss.href = chrome.extension.getURL('css/app.min.css');
        (document.head||document.documentElement).appendChild(gtkCss);
})();