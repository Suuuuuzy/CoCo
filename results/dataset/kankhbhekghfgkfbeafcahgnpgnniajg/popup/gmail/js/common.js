'use strict';

let bg;
let account;
var gmail = [];

chrome.runtime.onMessage.addListener((message) => {
    if (message.cmd == Gmail.Action.SET_MAILS) {
        Gmail.setUnreadText(gmail.unreadCount);
    } else if (message.cmd == Gmail.Status.CONNECT_SUCCESS) {
        // $('#gmail_logo').attr('src', 'images/gmail.png');
        $("#gmail_btn").removeClass('gray');
        $("#gmail_btn").off('click').click(function () {
            openGmailPopup();
        });
    } else if (message.cmd == Gmail.Status.CONNECT_FAIL) {
        // $('#gmail_logo').attr('src', 'images/gmail_off.png');
        $("#gmail_btn").addClass('gray');
        $("#gmail_btn").off('click').click(function () {
            chrome.tabs.create({url: message.url});
        });
    } else if (message.cmd == Gmail.Action.OPEN_GMAIL_POPUP) {
        layer.closeAll();
        openGmailPopup();
    }
    return true;
});

$('body', document).on('keyup', function (e) {
    if (e.which === 27) {
        layer.closeAll();
    }
});

$(document).on('click', '.checkbox:visible', function() {
    let checked = '';
    let className = 'iconxuanzhong iconfont_5a6576';
    let parentClass = 'already_selection';
    if (!$(this).data('checked')) {
        checked = '1';
        $('.iconkuang', this).addClass(className);
        $(this).parents('.gmail_item').addClass(parentClass);
    } else {
        $('.iconkuang', this).removeClass(className);
        $(this).parents('.gmail_item').removeClass(parentClass);
    }
    $(this).data('checked', checked);


    if ($(this).attr('data-checkbox-all')) {
        $('.gmail_l_list .checkbox:not([data-checkbox-all])').data('checked', (checked ? '' : '1')).trigger('click');
    }
});

$(document).on('click', '.checkbox-star', function() {
    changeStarStatus(this);
});

function changeStarStatus(sender) {
    let star = '';
    let className = 'iconwujiaoxing iconfont_f4ea2a';
    if (!$(sender).data('star')) {
        star = '1';
        $('.iconuninterested', sender).addClass(className);
    } else {
        $('.iconuninterested', sender).removeClass(className);
    }
    $(sender).data('star', star);
}

async function init() {
    bg = await getBG();
    return bg;
}

function getBG() {
    if (chrome.runtime.getBackgroundPage) {
        return new Promise((resolve, reject) => {
            chrome.runtime.getBackgroundPage(bg => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve(bg);
                }
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                cmd: CMD_GET_BG
            }, (response) => {
                let bg = {};
                bg.account = new Account();
                for (let i in response.account.gmail) {
                    let g = response.account.gmail[i];
                    bg.account.gmail[i] = new Gmail();
                    bg.account.gmail[i].id = g.id;
                    bg.account.gmail[i].account = g.account;
                    bg.account.gmail[i].unreadCount = g.unreadCount;
                    bg.account.gmail[i].baseLink = g.baseLink;
                    bg.account.gmail[i].detailUrl = g.detailUrl;
                    bg.account.gmail[i].composeUrl = g.composeUrl;
                    bg.account.gmail[i].setMails(g.mails);
                    bg.account.gmail[i].connect = g.connect;
                    bg.account.gmail[i].token = g.token;
                }
                resolve(bg);
            });
        });
    }
}

function getPopupWindowSpecs(params = {}) {
    let left, top, width, height;
    params.window = window;
    if (!params.width) {
        params.width = 800;
    }
    if (!params.height) {
        params.height = 600;
    }

    left = params.window.screen.availLeft+(params.window.screen.width/2)-(params.width/2);
    top = params.window.screen.availTop+(params.window.screen.height/2)-(params.height/2);
    width = params.width;
    height = params.height;

    if (params.openPopupWithChromeAPI) {
        return {url:params.url, width:Math.round(width), height:Math.round(height), left:Math.round(left), top:Math.round(top), type:"popup", state:"normal"};
    } else {
        let specs = "";
        specs += "left=" + (params.window.screen.availLeft+parseInt(left)) + ",";
        specs += "top=" + (params.window.screen.availTop+parseInt(top)) + ",";
        specs += "width=" + width + ",";
        specs += "height=" + height + ",";
        return specs;
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);//unescape(r[2]);
    return null;
}