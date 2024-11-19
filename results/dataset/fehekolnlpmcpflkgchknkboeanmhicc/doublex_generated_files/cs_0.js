// original file:/Users/jianjia/Desktop/help/16_COCO_RATE/fehekolnlpmcpflkgchknkboeanmhicc/js/launcher.js

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
// original file:/Users/jianjia/Desktop/help/16_COCO_RATE/fehekolnlpmcpflkgchknkboeanmhicc/js/map_connector.js

document.addEventListener('gtkAskAddonShowInGame', function(event) {
    chrome.runtime.sendMessage({data: event.detail}, function(response) {
        if (!response.success) {
            alert(response.message);
        } else if (!response.doesUpdateTab) {
            alert('La carte a bien été centrée en jeu');
        }
    });
});
