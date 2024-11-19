if (isCrOS() && chrome && chrome.power && chrome.power.requestKeepAwake) {
    chrome.power.requestKeepAwake("display");
}