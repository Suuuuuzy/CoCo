function promptBox() {
    windowLeft = prompt('Please choose your left window:', document.URL);
    windowRight = prompt('Please choose your right window:', document.URL);
    if(windowLeft && windowRight) {
        result='<frameset cols=\'*,*\'>\n<frame src=\''+windowLeft+'\'/>';
        result+='<frame src=\''+windowRight+'\'/>\n';
        result+='</frameset>';
        with(document) {
            write(result);
            void(close())
        }
    }
    else{
       void(null)
    };
};

chrome.extension.onClicked.addListener(promptBox());