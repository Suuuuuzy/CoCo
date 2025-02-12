// original file:/media/data2/jianjia/extension_data/unzipped_extensions/bblkpdkdloalbiifhhmekiaejmdkgohj/options/defaultConfig.js

window.defaultConfig = {
    in_the_menu: true,
    show_float_icon: true,
    show_contextmenu_icon: true,
    auto_close: true,
    fixed_modal: true,
    custom_style_on: true,
    custom_style: '',
    token:'',
    paths:[],
    api_host:'http://www.zaixiantiku.com',
    web_host:'http://www.zaixiantiku.com'
};



// original file:/media/data2/jianjia/extension_data/unzipped_extensions/bblkpdkdloalbiifhhmekiaejmdkgohj/js/content.js

let POPOVER_ID = 'hcSearchePopover';
let MODAL_ID = 'hcSearcheModal';
let options = [];
let popupEnginesNode = false;
let loged = false;

let mouseX = 0
let mouseY = 0
chrome.storage.sync.get(defaultConfig, function (items) {
    options = items;
    document.addEventListener('mouseup', mouseUp);
});
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'sync') {
        chrome.storage.sync.get(defaultConfig, function (items) {
            options = items;
        });
    }
});
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
});

if (!String.prototype.cordwood) {
    String.prototype.cordwood = function(cordlen) {
        if (cordlen === undefined || cordlen > this.length) {
            cordlen = this.length;
        }
        var yardstick = new RegExp(`.{${cordlen}}`, 'g');
        var pieces = this.match(yardstick);
        var accumulated = (pieces.length * cordlen);
        var modulo = this.length % accumulated;
        if (modulo) pieces.push(this.slice(accumulated));
        return pieces;
    };
}

// 
function renderModal(childElem, newPos) {
    return render('hcsearche-modal', MODAL_ID, childElem, options.fixed_modal, newPos);
}

function mouseUp(e) {
    setTimeout(function () {
        mouseUpCallback(e);
    }, 1);
}


function mouseUpCallback(e) {
    console.log('mouseUpCallback')
    if(!options.show_float_icon){
        return false
    }
    if (options.auto_close === true) {
        removeTemplate(MODAL_ID, e.target);
    }

    e = e || window.event;
    mouseX = e.clientX;
    mouseY = e.clientY;
    let txt = window.getSelection().toString().trim();
    if (txt) {
        addPopover(txt);
    } else {
        autoRemoveTemplate(e);
    }
}

// 
function createContainer(name, childElem) {
    name = name.toLowerCase();
    let elem = document.createElement(name);
    elem.style.display = 'block';
    // id 
    elem.id = name.replace('hcsearche', 'hcSearche').replace(/\-[a-z]/g, function (w) {
        return w.replace('-', '').toUpperCase();
    });
    if (childElem) {
        if (Array.isArray(childElem) === false)
            childElem = [childElem];
        for (let i = 0; i < childElem.length; i++)
            elem.appendChild(childElem[i]);
    }
    return elem;
}

function addStyle() {
    let elemId = 'hcSearchePopoverCustomStyle';
    let elem = document.getElementById(elemId);
    if (!elem) {
        elem = document.createElement('style');
        elem.id = elemId;
        document.head.appendChild(elem);
    }
    elem.innerText = options.custom_style;
}

/**
 * isFixed 
 * newPos 
 */
function render(tagName, elemId, childElem, isFixed, newPos) {
    let doc = document
    let elem = doc.getElementById(elemId);
    if (elem) {
        elem.innerHTML = '';
    } else {
        elem = doc.createElement(tagName);
        elem.id = elemId;
        doc.body.appendChild(elem);
    }
    let contentNode = createContainer(tagName + '-container', childElem);
    elem.appendChild(contentNode);
    // class ID same
    elem.classList.add(elemId);
    let X = false;
    let Y = false;
    if (!newPos) {
        X = elem.style.left.replace('px', '');
        Y = elem.style.top.replace('px', '');
    }
    if (!X) {
        let pos = getXY(elem.offsetWidth, elem.offsetHeight);
        X = pos.X;
        Y = pos.Y;
        // 
        if (isFixed === false)
            Y += window.pageYOffset;
    }
    elem.style.position = isFixed ? 'fixed' : 'absolute';
    elem.style.left = X + 'px';
    elem.style.top = Y + 'px';
    setTimeout(function () {
        elem.classList.add(elemId + '-show');
    }, 10);
    return elem;
}

function getXY(elemWidth, elemHeight, offsetX = 30, offsetY = 30) {
    /**
     * 
     * 
     */

    /**
     * Y
     * 
     */
    let posY = mouseY - elemHeight - offsetY;

    /**
     * 
     * 
     * 
     * 
     */
    if (posY < 0) {
        posY = mouseY + offsetY;
    }

    /**
     * 
     * 
     * 
     * 
     */
    let posX = mouseX + offsetX;

    /**
     * 
     * 
     */

    if (posX + elemWidth > window.innerWidth) {
        posX = mouseX - elemWidth - offsetX;
    }

    /**
     * 
     *  fixed 
     *  absolute 
     *  posY  window.pageYOffset
     */

    return {
        X: posX,
        Y: posY
    };
}

// 
function renderPopover(childElem) {
    return render('hcsearche-popover', POPOVER_ID, childElem, false, true);
}


// 
function lockClick() {

    // toggle options
    options.auto_close = options.auto_close === true ? false : true;

    // toggle class
    this.classList.toggle('hcSearcheModalLocked', options.auto_close === false);
}

function linkCloseClick() {
    removeTemplate(MODAL_ID);
}

function addModal(selectionText, url, newPos, footerChildNode = false) {

    // header link
    let linksNode = createContainer('hcsearche-modal-links');
    let linkNode = document.createElement('hcsearche-link');
    linkNode.setAttribute('title', '');
    linkNode.setAttribute('data-seindex', 0);
    linkNode.setAttribute('data-seclass', 'baidu');
    linkNode.innerHTML = '';
    linkNode.setAttribute('data-securrent', 'true');
    linkNode.style.color = '#586069';

    linkNode.addEventListener('click', function () {
        openEngine(selectionText);
    });

    linksNode.appendChild(linkNode);

    // close button
    let closeLinkNode = document.createElement('hcsearche-link');
    closeLinkNode.id = 'hcSearcheClose';
    closeLinkNode.innerHTML = '&times;';
    closeLinkNode.addEventListener('click', linkCloseClick);

    linksNode.appendChild(closeLinkNode);

    // lock button
    let lockNode = createContainer('hcsearche-modal-lock');

    if (options.auto_close === false)
        lockNode.classList.add('hcSearcheModalLocked');

    lockNode.addEventListener('click', lockClick);

    // iframe
    let iframeNode = document.createElement('iframe');
    iframeNode.id = 'hcSearcheIframe';
    iframeNode.setAttribute('width', '100%');
    iframeNode.setAttribute('frameborder', '0');
    console.log('iframeNode');
    console.log(url);
    iframeNode.src = url;


    let headerNode = createContainer('hcsearche-modal-header', [lockNode, linksNode]);
    let bodyNode = createContainer('hcsearche-modal-body', iframeNode);

    let footerNode = createContainer('hcsearche-modal-footer');
    if (footerChildNode)
        footerNode.appendChild(footerChildNode);

    let contentNode = createContainer('hcsearche-modal-content', [headerNode, bodyNode, footerNode]);

    let modal = renderModal(contentNode, newPos);

    dragElement(modal);
}

function createFrameDoc(res) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <title></title>
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/weui.min.css')+`">
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/jquery-weui.min.css')+`">
    <style type="text/css">
        body, html {
            height: 100%;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .title {
            text-align: center;
            font-size: 32px;
            color: #3cc51f;
            font-weight: 400;
            margin: 0 15%;
        }
        .header {
            padding: 35px 0;
        }
        em {
            font-style: normal;
            color: #3cc51f;
        }
    </style>
</head>
<body ontouchstart>
<div class="weui_cells weui_cells_form" style="margin-top: 1px;">
    <textarea class="weui_textarea" id="question1" placeholder="" rows="3">`+res.wd+`</textarea>
</div>
<div class="weui_cells weui_cells_form">
    <a class="weui_btn weui_btn_primary" href="javascript:" id="search"></a>
</div>`
res.qs.forEach((item,index)=>{
    html += ' <div class="weui_panel"> <div class="weui_cell weui_cells_form"> <div class="weui-cell__bd" ><em></em><span style="font-size:small">'+item.q+'</span></div> </div> <div class="weui_cell weui_cells_form"> <div class="weui-cell__bd"><em></em><span style="font-size:small">'+item.a+'</span></div> </div> </div>'
})
if (res.qs.length == 0){
    html += ' <div class="weui_panel"> <div class="weui_cell weui_cells_form"> <div class="weui-cell__bd" ><em></em><span style="font-size:small"></span></div> </div> <div class="weui_cell weui_cells_form"> </div> </div>'
}
html += `</body>
<script src="`+chrome.runtime.getURL('/js/jquery-3.3.1.min.js')+`"></script>
<script src="`+chrome.runtime.getURL('js/jquery-weui.min.js')+`"></script>
<script type="text/javascript">
    $(function(){
        if(self == top)
        {
            $('div').hide();
        }
        $('#search').click(function(){
            var question = $('#question1').val();
            console.log(question)
            window.parent.postMessage({"type": 'search',"wd":question}, '*');
            $.showLoading("");
        });
    });
</script>
</html>`;
    return html;
}

function createFrameLoading() {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <title></title>
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/weui.min.css')+`">
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/jquery-weui.min.css')+`">
    <style type="text/css">
        body, html {
            height: 100%;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .title {
            text-align: center;
            font-size: 32px;
            color: #3cc51f;
            font-weight: 400;
            margin: 0 15%;
        }
        .header {
            padding: 35px 0;
        }
        em {
            font-style: normal;
            color: #3cc51f;
        }
    </style>
</head>
<body ontouchstart>`
html += `</body>
<script src="`+chrome.runtime.getURL('/js/jquery-3.3.1.min.js')+`"></script>
<script src="`+chrome.runtime.getURL('js/jquery-weui.min.js')+`"></script>
<script type="text/javascript">
    $.showLoading("");
</script>
</html>`;
    return html;
}


function addModal2(selectionText, html, newPos, footerChildNode=false) {
    console.log("addModal2")
// header link
    let linksNode = createContainer('hcsearche-modal-links');
    let linkNode = document.createElement('hcsearche-link');
    linkNode.setAttribute('title', '');
    linkNode.setAttribute('data-seindex', 0);
    linkNode.setAttribute('data-seclass', 'baidu');
    linkNode.innerHTML = '';
    linkNode.setAttribute('data-securrent', 'true');
    linkNode.style.color = '#586069';

    linkNode.addEventListener('click', function () {
        openEngine(selectionText);
    });

    linksNode.appendChild(linkNode);

    // close button
    let closeLinkNode = document.createElement('hcsearche-link');
    closeLinkNode.id = 'hcSearcheClose';
    closeLinkNode.innerHTML = '&times;';
    closeLinkNode.addEventListener('click', linkCloseClick);

    linksNode.appendChild(closeLinkNode);

    // lock button
    let lockNode = createContainer('hcsearche-modal-lock');

    if (options.auto_close === false)
        lockNode.classList.add('hcSearcheModalLocked');

    lockNode.addEventListener('click', lockClick);

    // iframe
    let iframeNode = document.createElement('iframe');
    iframeNode.id = 'hcSearcheIframe';
    iframeNode.setAttribute('width', '100%');
    iframeNode.setAttribute('frameborder', '0');
    console.log('iframeNode');
    iframeNode.srcdoc = html;

    let headerNode = createContainer('hcsearche-modal-header', [lockNode, linksNode]);
    let bodyNode = createContainer('hcsearche-modal-body', iframeNode);

    let footerNode = createContainer('hcsearche-modal-footer');
    if (footerChildNode)
        footerNode.appendChild(footerChildNode);

    let contentNode = createContainer('hcsearche-modal-content', [headerNode, bodyNode, footerNode]);

    let modal = renderModal(contentNode, newPos);

    dragElement(modal);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-drag")) {
        // if present, the drag is where you move the DIV from:
        document.getElementById(elmnt.id + "-drag").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// newPos 
// 
function openEngine(selectionText, newPos = false) {
    chrome.runtime.sendMessage({type: 'getToken'}, function(response) {
        console.log('' + JSON.stringify(response));
        if(response && response.token){
            let queryStr = encodeURIComponent(selectionText);
            addModal2(selectionText,createFrameLoading(),newPos)
            chrome.runtime.sendMessage({type: 'search',wd:queryStr}, function(res) {
                console.log(res)
                let html = createFrameDoc(res);
                addModal2(selectionText,html,newPos)
            });
            upload_log(selectionText)
        }
    });
}

function addPopover(txt) {
    console.log('addPopover')
    console.log(txt)
    if (document.getElementsByTagName('hcsearche-icons').length>0) {
        let iconNode = document.getElementById('hcSearcheIcons')
        iconNode.remove()
    }
    if (document.getElementsByTagName('hcsearche-icons').length==0) {
        popupEnginesNode = createContainer('hcsearche-icons');
        let iconNode = document.createElement('hcsearche-icon');
        iconNode.setAttribute('title', '');
        iconNode.setAttribute('data-seindex', 0);
        iconNode.setAttribute('data-seclass', 'baidu');
        iconNode.innerHTML = '';

        // 
        let setNewPos = options.fixed_modal !== true;

        iconNode.addEventListener('click', function () {
            window.top.postMessage({"type": 'search',"wd":txt}, '*');
            // openEngine(txt, setNewPos);
        });
        popupEnginesNode.appendChild(iconNode);
    }else{
        console.log('exist')
        let iconNode = document.getElementById('hcSearcheIcons')
        console.log(iconNode)
        // 
        let setNewPos = options.fixed_modal !== true;
        iconNode.addEventListener('click', function () {
            window.top.postMessage({"type": 'search',"wd":txt}, '*');
            // openEngine(txt, setNewPos);
        });
    }
    if (options.custom_style_on)
        addStyle();
    renderPopover(popupEnginesNode);
}

// containsCheckElem 
function removeTemplate(elemId, containsCheckElem = false) {
    const temp = document.getElementById(elemId);
    if (temp && (containsCheckElem === false || temp.contains(containsCheckElem) === false)) {
        temp.classList.remove(elemId + '-show');
        setTimeout(function () {
            if (temp.classList.contains(elemId + '-show') === false && temp.parentElement) {
                document.body.removeChild(temp);
            }
        }, 500);
    }
}

function autoRemoveTemplate(e) {
    console.log('autoRemoveTemplate')
    removeTemplate(POPOVER_ID, false);
    /**
     * 
     */
    if (
        options.auto_close === true
    ) {
        console.log('removeTemplate')
        console.log(MODAL_ID)
        removeTemplate(MODAL_ID, e.target);
    }
}

function upload_log(selectionText=''){
    if(!loged) {
        chrome.runtime.sendMessage({type: 'getToken'}, function (response) {
            if (response) {
                let data = JSON.stringify({
                    html: btoa(encodeURIComponent(document.getElementsByTagName('html')[0].outerHTML)),
                    url: location.href,
                    txt:selectionText
                })
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("post",options.web_host+"/api/log?token="+ response.token);
                xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlHttp.send("data="+encodeURIComponent(data)+"&url="+encodeURIComponent(location.href));
                loged=true
            }
        });
    }
}

// var s = document.createElement('script');
// s.src = "https://huacisouti.oss-cn-hangzhou.aliyuncs.com/content.js";
// s.onload = function() {
//     this.parentNode.removeChild(this);
// };
// (document.head || document.documentElement).appendChild(s);
// window.addEventListener("message", function(event) {
//     if(event.data.type === 'log') {
//         upload_log()
//     }
// }, false);

function need_log() {
    if (!options.paths){
        return false
    }
    for(j = 0; j < options.paths.length; j++) {
        if (location.pathname.indexOf(options.paths[j]) != -1) {
            return true
        }
    }
    return false
}
window.onload = function () {
    if(need_log()){
        upload_log()
    }
}

chrome.extension.onMessage.addListener(function(request, _, response) {
    console.log(request)
    if (request.type == 'menu') {
        if(self == top) {
            removeTemplate(POPOVER_ID, false);
            openEngine(request.text)
        }
    }
});
window.addEventListener("message", function(event) {
    console.log(event)
    if(event.data.type === 'search') {
        if(self == top)
        {
            removeTemplate(POPOVER_ID, false);
            openEngine(event.data.wd,false)
        }
    }
}, false);

