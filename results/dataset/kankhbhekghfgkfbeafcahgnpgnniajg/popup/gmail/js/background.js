'use strict';

const FLUSH_MAILS_TIME = 30000;
var account = new Account();
var webPort;


init();


function sendMessageToWebPage(message) {
    try {
        message.from = 'ext';
        // webPort.postMessage(message);
    } catch (e) {
        //connect();
    }
}

function init() {
    //gmail init
    flushMails().catch(() => {});

    let isConnect = Gmail.isConnect(account.gmail) ? Gmail.Status.CONNECT_SUCCESS : Gmail.Status.CONNECT_FAIL;
    sendMessageToWebPage({
        cmd: isConnect
    });

    setInterval(async () => {
        flushMails().catch(() => {});
    }, FLUSH_MAILS_TIME);
}

function flushMails() {
    return new Promise(async (resolve, reject) => {
        let MAX_ACCOUNT = 10;
        let firstAccount;
        let unreadCount = 0;

        for (let i = 0; i < MAX_ACCOUNT; i++) {
            let gmail;
            if (!account.gmail[i]) {
                gmail = new Gmail();
                await gmail.initSetting(i);
                if (!gmail.token) {
                    break;
                }
                await gmail.loadMails().catch(() => {
                });
            } else {
                gmail = account.gmail[i];
            }

            if (!firstAccount) {
                firstAccount = gmail.account;
            } else if (gmail.account == firstAccount) {
                break;
            }

            await gmail.loadMails().catch(() => {

            });

            if (!gmail.connect && account.gmail[i]) { // && account.gmail[i].account == gmail.account
                account.gmail.splice(i, 1);
                continue;
            }

            //Ignore gmail account
            // if (Gmail.ignoreAccounts().indexOf(gmail.account) >= 0) {
            //     continue;
            // }

            if (gmail.connect) {
                unreadCount += gmail.unreadCount;
                if (!hasDuplicatedAccount(gmail.account)) {
                    account.gmail[i] = gmail;
                }
            }
        }

        let msg;
        for (let i in account.gmail) {
            if (account.gmail[i].unreadCount > account.gmail[i].getUnreadCount()) {
                if (!msg) {
                    msg = account.gmail[i].mails[0].author + ' - ' + account.gmail[i].mails[0].title
                }
            }
            account.gmail[i].setUnreadCount(account.gmail[i].unreadCount);
        }

        if (unreadCount > parseInt(Gmail.unreadCount())) {
            if (msg) {
                chrome.notifications.create({
                    type: 'basic',
                    title: chrome.i18n.getMessage('notify_new_mail_title'),
                    message: msg,
                    contextMessage: chrome.i18n.getMessage('notify_new_mail_message'),
                    iconUrl: '/images/gmail.png'
                });
            }
        }
        Gmail.unreadCount(unreadCount);

        chrome.runtime.sendMessage({
            cmd: Gmail.Action.SET_MAILS
        }, (response) => {
            if (chrome.runtime.lastError) {

            }
        });

        sendMessageToWebPage({
            cmd: Gmail.Action.FLUSH_RESULT,
            accountCount: account.gmail.length,
            unread: Gmail.unreadCount()
        });

        resolve(true);
    });
}

function hasDuplicatedAccount(gmailAccount) {
    for (let i = 0; i < account.gmail.length; i++) {
        if (account.gmail[i] && gmailAccount  == account.gmail[i].account) {
            return true;
        }
    }
    return false;
}


chrome.runtime.onInstalled.addListener((details) => {
    localStorage.setItem('selected_gmail_account', 0);
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.cmd) {
        return true;
    }

    if (message.cmd == Gmail.Action.FLUSH_MAILS) {
        flushMails().then(() => {
                sendResponse({
                    unread: Gmail.unreadCount()
                });
            })
            .catch(() => {
                sendResponse({
                    unread: Gmail.unreadCount()
                });
            });
    } else if (message.cmd == CMD_GET_BG) {
        sendResponse({
            account: account
        });
    } else if (message.cmd == Gmail.Action.FLUSH_RESULT) {
        sendMessageToWebPage({
            cmd: Gmail.Action.FLUSH_RESULT,
            accountCount: account.gmail.length,
            unread: message.unread
        });
    } else if (message.cmd == BROWSER_ACTION_NUMBERS) {
        let countText = message.countText;
        let bgColor = message.bgColor;
        let textColor = message.textColor;
        if (countText) {
            chrome.browserAction.setBadgeText({text: countText});
        }
        if (bgColor) {
            chrome.browserAction.setBadgeBackgroundColor({color: bgColor});
        }
        if (chrome.browserAction.setBadgeTextColor && textColor) {
            chrome.browserAction.setBadgeTextColor({color: textColor});
        }
    } else if (message.cmd == Gmail.Action.FLUSH_UNREAD) {
        sendMessageToWebPage({
            cmd: Gmail.Action.FLUSH_UNREAD,
            unread: Gmail.unreadCount()
        });
    } else if (message.cmd == CMD_CREATE_NOTIFICATIONS) {
        chrome.notifications.create({
            type: 'basic',
            title: message.data.title,
            'message': message.data.msg,
            iconUrl: '/images/icons/icon48.png'
        });
    } else if (message.cmd == Gmail.Action.IS_CONNECT) {
        let isConnect = Gmail.isConnect(account.gmail) ? Gmail.Status.CONNECT_SUCCESS : Gmail.Status.CONNECT_FAIL;
        // if (isConnect) {
            // await flushMails().catch(() => {});
        // }
        sendMessageToWebPage({
            cmd: isConnect,
            unread: Gmail.unreadCount()
        });
    } else if (message.cmd == Gmail.Action.HTML_LINK) {
        sendResponse({
            src: chrome.runtime.getURL("popup/gmail/gmail.html?source=dy1")
        });
    }
    return true;
});