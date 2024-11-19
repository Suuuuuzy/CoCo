'use strict';

const GMAIL_DOMAIN = 'https://mail.google.com/mail/';
const GMAIL_MOBILE_URL = GMAIL_DOMAIN + 'mu/mp/?mui=dy1CheckerForGmail#tl/收件箱';
const ignorekey = 'gmail_ignore_accounts';

Gmail.ignoreAccounts = (account) => {
    if (localStorage.getItem(ignorekey) === null) {
        localStorage.setItem(ignorekey, '[]');
    }

    if (account !== undefined) {
        let accounts = JSON.parse(localStorage.getItem(ignorekey));
        accounts.push(account);
        localStorage.setItem(ignorekey, JSON.stringify(accounts));
    }
    return JSON.parse(localStorage.getItem(ignorekey));
};

Gmail.setIgnoreAccounts = (accounts) => {
    localStorage.setItem(ignorekey, JSON.stringify(accounts));
};

Gmail.unreadCount = (count) => {
    let key = 'gmail_unread_count';
    if (count !== undefined) {
        localStorage.setItem(key, count);
        count = parseInt(count);
        if (count > 0) {
            let countText = count.toString();
            if (count > 99) {
                countText = '99+';
            }

            if (!chrome.browserAction) {
                chrome.runtime.sendMessage({
                    cmd: BROWSER_ACTION_NUMBERS,
                    'countText': countText,
                    'bgColor': '#ff0000',
                    'textColor': 'white'
                });
            } else {
                chrome.browserAction.setBadgeText({text: countText});
                chrome.browserAction.setBadgeBackgroundColor({color: '#ff0000'});
                if (chrome.browserAction.setBadgeTextColor) {
                    chrome.browserAction.setBadgeTextColor({color:"white"});
                }
            }
        } else {
            if (!chrome.browserAction) {
                chrome.runtime.sendMessage({
                    cmd: BROWSER_ACTION_NUMBERS,
                    'countText': ''
                });
            } else {
                chrome.browserAction.setBadgeText({text: ''});
            }
        }

        chrome.runtime.sendMessage({
            cmd: Gmail.Action.FLUSH_UNREAD
        });
    } else {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, 0);
        }
    }
    return localStorage.getItem(key);
};


Gmail.isConnect = (gmails) => {
    return gmails.length > 0;
};

Gmail.Status = {
    CONNECT_FAIL: 'gmail_connect_fail',
    CONNECT_SUCCESS: 'gmail_connect_success'
};

Gmail.Action = {
    SET_MAILS: 'gmail_set_mails',
    FLUSH_MAILS: 'gmail_flush_mails',
    IS_CONNECT: 'gmail_is_connect',
    FLUSH_RESULT: 'gmail_flush_result',
    OPEN_GMAIL_POPUP: 'gmail_open_popup',
    NEW_MSG: 'gmail_new_message',
    SEND: 'gmail_send',
    REPLY: 'gmail_reply',
    MARK_AS_READ: 'gmail_mark_as_read',
    MARK_AS_UNREAD: 'gmail_mark_as_unread',
    MARK_AS_SPAM: 'gmail_mark_as_spam',
    DELETE: 'gmail_delete_mail',
    ARCHIVE: 'gmail_archive',
    APPLY_LABEL: 'gmail_apply_label',
    REMOVE_LABEL: 'gmail_remove_label',
    UNTRASH: 'gmail_untrash',
    STAR: 'gmail_star',
    REMOVE_STAR: 'gmail_remove_star',
    FLUSH_UNREAD: 'gmail_flush_unread',
    HTML_LINK: 'gmail_html_link'
};

Gmail.setUnreadText = (count) => {
    $('.gmail_unread_count').text(count);
};

Gmail.openCompose = (composeUrl, authorEmail) => {
    let url = composeUrl.replace('author_email', authorEmail);
    if (chrome.windows) {
        chrome.windows.create(getPopupWindowSpecs({
            url: url,
            openPopupWithChromeAPI: true
        }));
    } else {
        window.open(url, '', getPopupWindowSpecs({
            url: url,
            openPopupWithChromeAPI: false
        }));
    }
};

Gmail.flushMails = (callback) => {
    chrome.runtime.sendMessage({
        cmd: Gmail.Action.FLUSH_MAILS
    }, (response) => {
        if (callback) {
            Gmail.setUnreadText(response.unreadCount);
            callback(response);
        }
    });
};

Gmail.httpAction = async function(params) {
    let gmail = params.gmail;
    if (!gmail.token) {
        await gmail.getToken();
    }
    let mail = params.mail;
    let options = {
        method: 'GET'
    };
    let urlParams = "?t=" + mail.msg_id + "&at=" + gmail.token + "&act=";
    if (params.action == Gmail.Action.MARK_AS_READ) {
        urlParams += 'rd';
    } else if (params.action == Gmail.Action.MARK_AS_UNREAD) {
        urlParams += 'ur';
    } else if (params.action == Gmail.Action.DELETE) {
        urlParams += 'tr';
    } else if (params.action == Gmail.Action.ARCHIVE) {
        urlParams += "rc_" + encodeURIComponent("^i");
    } else if (params.action == Gmail.Action.MARK_AS_SPAM) {
        urlParams += "sp";
    } else if (params.action == Gmail.Action.APPLY_LABEL) {
        urlParams += "ac_" + encodeURIComponent(params.label);
    } else if (params.action == Gmail.Action.REMOVE_LABEL) {
        urlParams += "rc_" + encodeURIComponent(params.label);
    } else if (params.action == Gmail.Action.UNTRASH) {
        // urlParams += "ib&pcd=1&mb=0&rt=j&search=trash&ui=2";
        // options.method = "POST";
        // options.body = JSON.stringify({t:mail.msg_id});
    } else if (params.action == Gmail.Action.STAR) {
        urlParams += "st";
    } else if (params.action == Gmail.Action.REMOVE_STAR) {
        urlParams += "xst";
    } else if (params.action == Gmail.Action.REPLY) {
        options.method = "POST";
        urlParams = '/h/' + urlParams.replace(/act\=/, '') + "v=b&qrt=n&pv=cv&s=l&fv=cv&cs=qfnq&rm=" + mail.msg_id + "&th=" + mail.msg_id + "&qrr=" + "o" + "&body=" + encodeURIComponent(params.message) + "&nvp_bu_send=Send&haot=qt&redir=" + encodeURIComponent("?v=c&s=l");
    }

    let url = gmail.baseLink + urlParams;
    let requestParams = {
        type: options.method,
        url: url
    };
    if (params.success && typeof(params.success) == "function") {
        requestParams.success = params.success;
    }
    if (params.error && typeof(params.error) == "function") {
        requestParams.error = params.error;
    }
    $.ajax(requestParams);
    return true;
};

Gmail.getDetail = async function(gmail, mail) {
    if (mail.messages.length > 0) {
        return true;
    }
    await $.get(gmail.detailUrl + mail.msg_id, (html) => {
        let dom = new DOMParser().parseFromString(html, "text/html");
        let tables = Array.from(dom.querySelectorAll(".maincontent .message"));
        tables.forEach(messageNode => {
            let message = {};
            message.to = [];
            message.cc = [];
            message.bcc = [];

            const fromNode = messageNode.querySelector("tr").querySelector("td");
            if (fromNode) {
                message.from = addressparser(fromNode.textContent)[0];
            } else {
                message.from = '';
            }

            const divs = messageNode.querySelectorAll("tr")[1].querySelectorAll("td div");
            divs.forEach((emailNode, i) => {
                if (i == 0 && divs.length >= 2 && divs[1].textContent.toLowerCase().indexOf("cc:") == -1) {
                    return;
                }
                let emails = emailNode.textContent;
                emails = emails.replace(/.*:/, "");
                if (emailNode.textContent.toLowerCase().indexOf("bcc:") != -1) {
                    message.bcc = addressparser(emails);
                }
                else if (emailNode.textContent.toLowerCase().indexOf("to:") != -1) {
                    message.to = addressparser(emails);
                }
                else if (emailNode.textContent.toLowerCase().indexOf("cc:") != -1) {
                    message.cc = addressparser(emails);
                }
                else {
                    message.to = addressparser(emails);
                }
            });

            const tds = messageNode.querySelector("tr").querySelectorAll("td");
            if (tds.length) {
                message.date = tds[tds.length - 1].textContent.trim();
            }

            const content = messageNode.querySelector("tbody > tr:last-child table td");
            if (content) {
                content.querySelector("div").removeAttribute("style");
                content.querySelector("font").removeAttribute("size");
                Gmail.fixRelativeLinks(content, gmail.baseLink);

                message.content = content.innerHTML;
                message.textContent = content.innerText;
                let quotedTextHiddenArray = ["Quoted text hidden", "Texte des messages précédents masqué"];
                for (let a = 0; a < quotedTextHiddenArray.length; a++) {
                    let idx = message.textContent.indexOf("[" + quotedTextHiddenArray[a] + "]");
                    if (idx != -1) {
                        message.textContent = message.textContent.substring(0, idx);
                        break;
                    }
                }
            }
            mail.messages.push(message);
        });
    });
    return true;
};

Gmail.fixRelativeLinks = function(node, gmailBaseUrl) {
    node.querySelectorAll("a, img, imghidden").forEach(elem => {
        var href = elem.getAttribute("href");
        var src = elem.getAttribute("src");

        if (/^\/\//.test(href)) {
            elem.setAttribute("href", "https:" + href);
        } else if (/^\/\//.test(src)) {
            elem.setAttribute("src", "https:" + src);
        } else if (/^\/|^\?/.test(href)) {
            elem.setAttribute("href", gmailBaseUrl + href);
        } else if (/^\/|^\?/.test(src)) {
            elem.setAttribute("src", gmailBaseUrl + src);
        }
    });
};

function Gmail() {
    this.id = 0;
    this.baseLink = '';
    this.detailUrl = '';
    this.composeUrl = '';
    this.account = null;
    this.mails = [];
    this.connect = false;
    this.unreadCount = 0;
    this.token = null;

    this.getToken = async function() {
        try {
            await $.get(this.baseLink, (content) => {
                let at = /GM_ACTION_TOKEN="([^"]*)"/.exec(content || '');
                if (!at || at.length === 0) {
                    at = /at=([^"&]*)&/.exec(content || '');
                }

                if (at && at[1]) {
                    this.token = at[1];
                }
            });
        } catch (e) {
            this.token = null;
        }
        return this.token;
    };

    this.getFeedUrl = function() {
        let t = parseInt(Date.now() * Math.random(), 10);
        let url = this.baseLink + '/feed/atom?t=' + t;
        return url;
    };

    this.initSetting = async function(id) {
        this.id = id;
        this.baseLink = GMAIL_DOMAIN + 'u/' + this.id;
        this.detailUrl = this.baseLink + '/?ibxr=0&ui=2&view=pt&search=all&th=';
        this.composeUrl = this.baseLink + '/?view=cm&fs=1&tf=1&authuser=author_email&su=&body=';
        await this.getToken();
    };

    this.loadMails = async function() {
        await $.ajax({
            type: 'GET',
            dataType: 'xml',
            url: this.getFeedUrl(),
            //timeout: 1000,
            error: (xhr, textStatus, errorThrown) => {
                this.connect = false;
            },
            success: (data, textStatus, xhr) => {
                this.connect = true;
                let regex = /Inbox for (.+?)$/.exec($('feed', data).children('title').text());
                if (regex) {
                    this.account = regex[1];
                }

                let unreadCount = $('fullcount', data).text();
                // this.setUnreadCount(unreadCount);
                this.unreadCount = parseInt(unreadCount);
                this.mails = [];
                $('entry', data).each((i, entry) => {
                    this.setMail($(entry));
                });
            }
        });
        return true;
    };

    this.setMails = function(mails) {
        if (!mails) {
            return false;
        }
        this.mails = [];
        for (let i = 0; i < mails.length; i++) {
            let item = mails[i];
            let mail = new Mail();
            mail.title = item.title;
            mail.summary = item.summary;
            mail.url = item.url;
            mail.modified = item.modified;
            mail.issued = item.issued;
            mail.id = item.id;
            mail.msg_id = item.msg_id;
            mail.author = item.author;
            mail.author_email = item.author_email;
            mail.messages = item.messages;
            this.mails.push(mail);
        }
    };

    this.setMail = function($mail) {
        let mail = new Mail();
        mail.title = $mail.find('title').text() ;
        mail.summary = $mail.find('summary').text() ;
        mail.url = $mail.find('link').attr('href') ;
        mail.modified = $mail.find('modified').text() ;
        mail.issued = $mail.find('issued').text() ;
        mail.id = $mail.find('id').text() ;
        mail.author = $mail.find('author name').text() ;
        mail.author_email = $mail.find('author email').text() ;
        mail.messages = [];
        mail.msg_id = null;
        let mailId = /message_id=([^&]*)/.exec(mail.url);
        if (mailId) {
            mail.msg_id = mailId[1];
        }
        this.mails.push(mail);
    };

    this.setUnreadCount = function(count) {
        this.unreadCount = parseInt(count);
        localStorage.setItem(this.account, this.unreadCount);
    };

    this.getUnreadCount = function() {
        if (!localStorage.getItem(this.account)) {
            return 0;
        }
        return parseInt(localStorage.getItem(this.account));
    };

    let that = this;

    function Mail() {
        this.id = null;
        this.msg_id = null;
        this.title = null;
        this.summary = null;
        this.url = null;
        this.modified = null;
        this.issued = null;
        this.author = null;
        this.author_email = null;
        this.read = false;
        this.star = false;
        this.messages = [];

        this.getDetail = async function() {
            await Gmail.getDetail(that, this);
            return true;
        };

        this.markAsRead = async function(success, error) {
            if (this.read) {
                return true;
            }
            await Gmail.httpAction({
                action: Gmail.Action.MARK_AS_READ,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.read = true;
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.markAsUnread = async function(success, error) {
            if (!this.read) {
                return true;
            }
            await Gmail.httpAction({
                action: Gmail.Action.MARK_AS_UNREAD,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.read = false;
            that.unreadCount++;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount + 1);
            return true;
        };

        this.delete = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.DELETE,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.archive = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.ARCHIVE,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.markAsSpam = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.MARK_AS_SPAM,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.untrash = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.UNTRASH,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount++;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount + 1);
            return true;
        };

        this.applyLabel = async function(label, success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.APPLY_LABEL,
                gmail: that,
                mail: this,
                label: label,
                success: success,
                error: error
            });
            return true;
        };

        this.removeLabel = async function(label, success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.REMOVE_LABEL,
                gmail: that,
                mail: this,
                label: label,
                success: success,
                error: error
            });
            return true;
        };

        this.markAsStar = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.STAR,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.star = true;
            return true;
        };

        this.removeStar = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.REMOVE_STAR,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.star = false;
            return true;
        };

        this.reply = async function(message, success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.REPLY,
                gmail: that,
                mail: this,
                message: message,
                success: success,
                error: error
            });
            return true;
        }
    }
}

