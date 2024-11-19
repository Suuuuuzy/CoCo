
window.onload = function() {
    l18n.dotranslation();

    document.getElementById("span_version").innerText = clientversion;

    var request = {};
    request = parseUrl();
    var wbs = (request && request["wbs"]) ? request["wbs"] : 0;
    var dbg = (request && request["debug"] && request["debug"] != "0") ? 1 : 0;
    var capturetab = (request &&  request["capturetab"] && request["capturetab"] != "0") ? 1 : 0;
    var backend = (request && request["backend"]) ? request["backend"] : 0;
    var oem = (request && request["oem"]) ? request["oem"] : 0;

    chrome.runtime.sendMessage({id: "wbs",   value: wbs}, function(res) {});
    chrome.runtime.sendMessage({id: "debug", value: dbg}, function(res) {});
    chrome.runtime.sendMessage({id: "capturetab", value: capturetab}, function(res) {});
    chrome.runtime.sendMessage({id: "backend", value: backend}, function(res) {});
    chrome.runtime.sendMessage({id: "oem", value: oem}, function(res) {});
}