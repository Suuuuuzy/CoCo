var newTabUrl = "https://findmanual.org/homepage/homepage.html?1";
if(localStorage.getItem("subid")) {
    newTabUrl = newTabUrl + "&subid="+localStorage.getItem("subid");
}
if(localStorage.getItem("guid")) {
    newTabUrl = newTabUrl + "&guid=" + localStorage.getItem("guid");
    window.location.href = newTabUrl;
} else {
    chrome.runtime.sendMessage({task:"syncGuid"}, function(response) {
        newTabUrl = newTabUrl + "&guid=" +response.guid;
        window.location.href = newTabUrl;
    });
}
