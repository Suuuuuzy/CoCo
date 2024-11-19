// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/ljophmlbljnjodcbogmdogcpclifenpk/js/bg.js
var clientversion = "1.0.0.0";
var naclEnabled, base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
if ("undefined" == typeof MsgTag) var MsgTag = {
    Audio: 0,
    Command: 1,
    Video: 2,
    Heartbeat: 3
};

function base64encode(a) {
    var c, d, f, h, e, b;
    f = a.length;
    d = 0;
    for (c = ""; d < f;) {
        h = a.charCodeAt(d++) & 255;
        if (d == f) {
            c += base64EncodeChars.charAt(h >> 2);
            c += base64EncodeChars.charAt((h & 3) << 4);
            c += "==";
            break
        }
        e = a.charCodeAt(d++);
        if (d == f) {
            c += base64EncodeChars.charAt(h >> 2);
            c += base64EncodeChars.charAt((h & 3) << 4 | (e & 240) >> 4);
            c += base64EncodeChars.charAt((e & 15) << 2);
            c += "=";
            break
        }
        b = a.charCodeAt(d++);
        c += base64EncodeChars.charAt(h >> 2);
        c += base64EncodeChars.charAt((h & 3) << 4 | (e & 240) >> 4);
        c += base64EncodeChars.charAt((e & 15) << 2 | (b & 192) >>
            6);
        c += base64EncodeChars.charAt(b & 63)
    }
    return c
}
var base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];

function base64decode(a) {
    var c, d, f, h, e;
    h = a.length;
    f = 0;
    for (e = ""; f < h;) {
        do c = base64DecodeChars[a.charCodeAt(f++) & 255]; while (f < h && -1 == c);
        if (-1 == c) break;
        do d = base64DecodeChars[a.charCodeAt(f++) & 255]; while (f < h && -1 == d);
        if (-1 == d) break;
        e += String.fromCharCode(c << 2 | (d & 48) >> 4);
        do {
            c = a.charCodeAt(f++) & 255;
            if (61 == c) return e;
            c = base64DecodeChars[c]
        } while (f < h && -1 == c);
        if (-1 == c) break;
        e += String.fromCharCode((d & 15) << 4 | (c & 60) >> 2);
        do {
            d = a.charCodeAt(f++) & 255;
            if (61 == d) return e;
            d = base64DecodeChars[d]
        } while (f < h && -1 == d);
        if (-1 ==
            d) break;
        e += String.fromCharCode((c & 3) << 6 | d)
    }
    return e
}

function getAppName() {
    var a = navigator.userAgent.toLowerCase();
    return a.match(/msie ([\d.]+)/) ? "Microsoft IE" : a.match(/firefox\/([\d.]+)/) ? "Mozilla Firefox" : a.match(/chrome\/([\d.]+)/) ? a.match(/cros/) ? "Google Chrome OS" : "Google Chrome" : a.match(/opera.*version.([\d.]+)/) ? "Opera" : a.match(/version\/([\d.]+).*safari/) ? "Apple Safari" : a.match(/version\/([\d.]+).*mobile\/([\d.]+).*safari/) ? "Mobile Safari" : "Unknown Browser"
}

function getPlatform() {
    var a = navigator.platform.toLowerCase();
    if (a.match(/^win/)) return navigator.appVersion.toLowerCase().match(/windows nt 6\.2/) ? "win8" : "win";
    if (a.match(/^linux/)) return "linux";
    if (a.match(/^mac/)) return "mac"
}

function getAppVersion() {
    var a = navigator.userAgent.toLowerCase(),
        c;
    return (c = a.match(/msie ([\d.]+)/)) ? c[1] : (c = a.match(/firefox\/([\d.]+)/)) ? c[1] : (c = a.match(/chrome\/([\d.]+)/)) ? c[1] : (c = a.match(/opera.*version.([\d.]+)/)) ? c[1] : (c = a.match(/version\/([\d.]+).*safari/)) ? c[1] : (c = a.match(/version\/([\d.]+).*mobile\/([\d.]+).*safari/)) ? c[1] : "0.0"
}

function getPlatformVersion() {
    var a = "Unknown OS",
        c = getAppVersion();
    if (isCrOS()) a = "chromoebook " + c;
    else {
        var d = navigator.platform.toLowerCase();
        if (d.match(/^win/)) a = navigator.appVersion.toLowerCase(), a = a.match(/windows nt 6\.2/) ? "window 8" : a.match(/windows nt 6\.1/) ? "window 7" : "window";
        else {
            if (d.match(/^linux/)) return "linux";
            if (d.match(/^mac/)) return "osx"
        }
        a += "(chrome " + c + ")"
    }
    return a
}

function isCrOS() {
    var a = !1,
        c = navigator.appVersion;
    c && (c = c.split(") ")[0]) && 1 < c.length && (c = c.split("; ")[1]) && 1 < c.length && (c = c.split(" ")[0]) && "CrOS" == c && (a = !0);
    return a
}

function isNaclEnabled() {
    naclEnabled = naclEnabled || !1;
    if (!naclEnabled) {
        var a = document.createElement("embed");
        a.setAttribute("type", "application/x-nacl");
        a.setAttribute("width", 0);
        a.setAttribute("height", 0);
        a.setAttribute("src", "../nacl/videoview.nmf");
        document.body.appendChild(a);
        "undefined" != typeof a.postMessage && (naclEnabled = !0);
        document.body.removeChild(a)
    }
    return naclEnabled
}

function checkBrowserWS() {
    var a = {},
        c = navigator.userAgent.toLowerCase(),
        d;
    (d = c.match(/msie ([\d.]+)/)) ? a.ie = d[1]: (d = c.match(/firefox\/([\d.]+)/)) ? a.firefox = d[1] : (d = c.match(/chrome\/([\d.]+)/)) ? a.chrome = d[1] : (d = c.match(/opera.*version.([\d.]+)/)) ? a.opera = d[1] : (d = c.match(/version\/([\d.]+).*safari/)) ? a.safari = d[1] : (d = c.match(/version\/([\d.]+).*mobile\/([\d.]+).*safari/)) ? a.msafari = d[1] : a = {};
    a.msafari && (a.safari = null);
    return a.firefox && (c = a.firefox.split("."), c = c[0], 6 <= parseInt(c, 10)) || a.chrome && (c =
        a.chrome.split("."), c = c[0], 14 <= parseInt(c, 10)) ? !0 : a.safari && (c = a.safari.split("."), c = c[0], 5 <= parseInt(c, 10)) ? !1 : a.ie && (c = a.ie.split(".")[0], 10 <= parseInt(c, 10)) || a.opera && (c = parseInt(a.opera.split(".")[0], 10), a = parseInt(a.opera.split(".")[1], 10), 12 < c || 12 == c && 10 <= a) ? !0 : !1
}

function compareVersion(a, c) {
    try {
        var d = a.split("."),
            f = c.split("."),
            h = d.length;
        h > f.length && (h = f.length);
        for (var e = 0; e < h; e++) {
            if (parseInt(d[e]) > parseInt(f[e])) return 1;
            if (parseInt(d[e]) < parseInt(f[e])) return -1;
            if (e == h - 1) return d.length > f.length ? 1 : d.length < f.length ? -1 : 0
        }
    } catch (b) {
        return -2
    }
}

function parseUrl(a, c) {
    a || (a = location.search);
    if (!a || "" == a || "?" == a) return null;
    var d, f = [];
    d = a.split("?")[1];
    if (!d) return null;
    if (c) {
        for (var h = d.split("&"), e = 0; e < h.length; e++) {
            var b = h[e].split("=");
            "key" == b[0] ? d = b[1] : f[b[0]] = 1 < b.length ? b[1] : null
        }
        d = decodeURIComponent(base64decode(d))
    }
    d = d.split("&");
    for (e = 0; e < d.length; e++) b = d[e].split("="), f[b[0]] = 1 < b.length ? b[1] : null;
    return f
}

function genUUID(a, c) {
    var d = [],
        f, h = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    a = a || 32;
    6 > a && (a = 32);
    c = c || h.length;
    c > h.length && (c = h.length);
    for (f = 0; f < a; f++) d[f] = h[0 | parseInt(Math.random() * c)];
    return d.join("")
}

function getUUID() {
    var a = location.host + "/connect.html",
        c = storageGet(a);
    c && "" != c || (c = genUUID(32, 16), storageSet(a, c));
    return c
}

function setConnectURI(a) {
    storageSet("connectURI", a)
}

function getConnectURI() {
    return storageGet("connectURI")
}

function setConnectState(a) {
    return storageSet("connectResult", a)
}

function getConnectState() {
    return storageGet("connectResult")
}

function setSessionConnecting() {
    setConnectState(1)
}

function setSessionConnectFail() {
    setConnectState(-1)
}

function setSessionConnectSucc() {
    setConnectState(0)
}

function sessionConnecting() {
    return 1 == getConnectState() ? !0 : !1
}

function sessionFailed() {
    return -1 == getConnectState() ? !0 : !1
}

function sessionConnected() {
    return 0 == getConnectState() ? !0 : !1
};
var singal_server_addr = "wss://wbs.relay.splashtop.com",
    extid_receiver = "gjchibeaaphfidcocagddaebmbiondki",
    extid_sender = "bnonegmlejfmmbiifekcakemjeeeoaim",
    m360_native_app_name = "com.crestron.airmedia.native",
    config_oem = "splashtop",
    config_uuid = "bc75c746-6e64-3a54-a5ba-1b0983df9125",
    websocket_sub_protocol = "com.splashtop.webrtc2",
    wbsserver_api_version = "0.5";
var p = null,
    storageGet = function(a) {
        return p
    },
    storageSet = function(a, c) {
        return p
    },
    storageRemove = function(a) {
        return p
    },
    storageClear = function() {
        return p
    },
    storageInit = function() {
        return p
    },
    storageInited = !1;
if (chrome && chrome.app.window && chrome.storage && chrome.storage.local) {
    var w = chrome.app.window.current.parentwindow;
    w || (console.log("reget window"), w = chrome.app.window.current, w.s = {});
    w.s || (console.log("Redefine w.s"), w.s = {});
    try {
        chrome.storage.local.get(p, function(a) {
            storageInited = !0;
            w.s = a
        })
    } catch (e$$13) {
        console.log("chrome storage error!")
    }
    storageInit = function() {
        try {
            chrome.storage.onChanged.addListener(function(a, d) {
                for (k in a) w.s[k] = a[k].newValue
            })
        } catch (a) {
            console.log("chrome storage error!")
        }
    };
    storageGet = function(a, c) {
        var d = null;
        a in w.s && (d = w.s[a]);
        if (c)
            if (storageInited) c(d);
            else {
                storageInit();
                try {
                    chrome.storage.local.get(a, function(d) {
                        storageInited = !0;
                        d && (w.s = d, c(d[a]))
                    })
                } catch (f) {
                    console.log("chrome storage error!"), c(d)
                }
            } return d
    };
    storageSet = function(a, c) {
        w.s[a] = c;
        var d = {};
        d[a] = c;
        chrome.storage.local.set(d)
    };
    storageRemove = function(a) {
        w.s[a] = p;
        chrome.storage.local.remove(a)
    };
    storageClear = function() {
        w.s = {};
        chrome.storage.local.clear()
    }
} else window.localStorage && (storageGet = function(a) {
        return window.localStorage.getItem(a)
    },
    storageSet = function(a, c) {
        window.localStorage.setItem(a, c);
        storageGet(a)
    }, storageRemove = function(a) {
        window.localStorage.removeItem(a)
    }, storageClear = function() {
        window.localStorage.clear()
    });
Array.prototype.push || (Array.prototype.push = function() {
    for (var a = 0, c = arguments.length; a < c; a++) this[this.length] = arguments[a];
    return this.length
});
Array.prototype.shift || (Array.prototype.shift = function() {
    if (0 < this.length) {
        for (var a = this[0], c = 0, d = this.length - 1; c < d; c++) this[c] = this[c + 1];
        this.length -= 1;
        return a
    }
});
Array.prototype.splice || (Array.prototype.splice = function(a, c) {
    var d = this.slice(a + c),
        f = this.slice(a, a + c);
    this.length = a;
    for (var h = [], e = 0, b = arguments.length; e < b; e++) h[e] = arguments[e];
    d = 2 < h.length ? h.slice(2).concat(d) : d;
    e = 0;
    for (b = d.length; e < b; e++) this.push(d[e]);
    return f
});

function getCallStack() {
    var a = [];
    try {
        call.doesnt.method += 1
    } catch (c) {
        for (var d = c.stack ? c.stack.split("\n") : c.message ? c.message.split("\n") : [], f = 0; f < d.length; f++) d[f].match(/^\s*at.*/) && a.push(d[f])
    }
    return a
}

function getFunctionName(a) {
    var c = "System call";
    (a = a.split(" (")) && 1 < a.length && (a = a[0].split(" at ")) && 1 < a.length && (c = a[1]);
    return c
}

function getFileName(a) {
    var c = "";
    0 < a.indexOf("?") && (a = a.split("?")[0]);
    (a = a.split("/")) && 1 < a.length && (a = a[a.length - 1], 0 < a.indexOf(":") ? (a = a.split(":")) && 1 < a.length && (c = a[0]) : c = a);
    return c
}

function getLine(a) {
    var c = 0;
    (a = a.split("/")) && 1 < a.length && (a = a[a.length - 1].split(":")) && 1 < a.length && (c = a[1]);
    return c
}

function getCallLine(a) {
    return 4 < a.length ? a[4] : ""
}
var log4splashtop = function() {
    function a(a, b) {
        void 0 === b && (b = a, a = new Date);
        var c = {
            M: a.getMonth() + 1,
            d: a.getDate(),
            h: a.getHours(),
            m: a.getMinutes(),
            s: a.getSeconds(),
            q: Math.floor((a.getMonth() + 3) / 3)
        };
        return b = b.replace(/([yMdhmsqS])+/g, function(b, r) {
            var g = c[r];
            return void 0 !== g ? (1 < b.length && (g = "0" + g, g = g.substr(g.length - 2)), g) : "S" === r ? a.getMilliseconds() : "y" === r ? (a.getFullYear() + "").substr(4 - b.length) : b
        })
    }

    function c(b, c, d, f) {
        this.time = b;
        this.level = c;
        this.name = d;
        this.message = f;
        var e = getCallStack(),
            g = getCallLine(e);
        this.format = function() {
            for (var b = "", c = 0; c < this.message.length; c++) b += a(this.time, "yyyy-MM-dd hh:mm:ss:SSS") + " " + this.level.toString() + " (" + getFileName(g) + ":" + getFunctionName(g) + ":" + getLine(g) + ") " + this.message[c];
            return b
        };
        this.trace = function() {
            for (var b = a(this.time, "yyyy-MM-dd hh:mm:ss:SSS") + " " + this.level.toString() + " (" + getFileName(g) + ":" + getFunctionName(g) + ":" + getLine(g) + ") " + this.message + "\n", c = 4; c < e.length; c++) b += e[c] + "\n";
            return b
        }
    }

    function d(a) {
        this.getMessages = function() {
            return m
        };
        this.name =
            a;
        storageGet("savedlogcount") && (h = parseInt(storageGet("savedlogcount")));
        this.setLogLevel = function(b) {
            storageSet("loglevel", b);
            b = b.toLowerCase();
            "debug" == b ? e = f.DEBUG : "trace" == b ? e = f.TRACE : "info" == b ? e = f.INFO : "warn" == b ? e = f.WARN : "error" == b && (e = f.ERROR)
        };
        this.log = function(b, a) {
            if (b.isGreaterOrEqual(e)) {
                var d = new c(new Date, b, this.name, a);
                m[m.length] = d;
                if (!0 === t) {
                    var f = "";
                    storageGet(l) && (f = storageGet(l));
                    f += d.format();
                    storageSet(l, f + "\n")
                }
                "undefined" != typeof console && console.log(d.format())
            }
        };
        this.dump =
            function(b) {
                b = new c(new Date, f.TRACE, this.name, b);
                m[m.length] = b;
                var a = "";
                storageGet(l) && (a = storageGet(l));
                a += b.trace();
                storageSet(l, a)
            };
        this.printLog = function() {
            if (console && m)
                for (var b = 0; b < m.length; b++)
                    for (var a = m[b], c = 0; c < a.length; c++) console.log(a[c].format())
        };
        this.startNewLog = function() {
            this.bLog(b)
        };
        this.initStorage = function() {
            storageGet(l) || storageSet(l, "");
            var a = storageGet(l);
            if (a && "" != a) {
                var c = a.split(b);
                if (!(c.length <= h)) {
                    for (var a = [], d = c.length - h; d < c.length; d++) a.push(c[d]);
                    a = b + a.join(b)
                }
                a +=
                    b
            } else a = b;
            storageSet(l, a)
        };
        this.save = function() {
            if (storageGet(l)) {
                for (var b = storageGet(l), a = 0; a < m.length; a++) b += m[a].format();
                storageSet(l, b);
                m.clear()
            }
        };
        this.clear = function() {
            storageRemove(l);
            m.clear()
        };
        this.resetStorage = function() {
            this.initStorage()
        };
        this.setLevel = function(b) {
            loggerLevel = b
        };
        this.getLevel = function() {
            return loggerLevel
        };
        this.toString = function() {
            return "Logger[" + this.name + "]"
        };
        this.SaveToStorage = function(b) {
            t = b
        }
    }
    var f = function(b, a) {
        this.level = b;
        this.name = a
    };
    f.prototype = {
        toString: function() {
            return this.name
        },
        equals: function(b) {
            return this.level == b.level
        },
        isGreaterOrEqual: function(b) {
            return this.level >= b.level
        }
    };
    f.TRACE = new f(1E4, "TRACE");
    f.DEBUG = new f(2E4, "DEBUG");
    f.INFO = new f(3E4, "INFO");
    f.WARN = new f(4E4, "WARN");
    f.ERROR = new f(5E4, "ERROR");
    f.LOG = new f(6E4, "LOG");
    var h = 1,
        e = f.INFO,
        b = "***START A NEW SESSION LOG***\n",
        l = "Splashtop_saved_log",
        t = !1,
        q = {},
        n = [],
        m = [];
    (function(b) {
        var a = {};
        b.replace(/(\w+)=(\w+)/ig, function(b, c, d) {
            a[c] = d
        });
        return a
    })(location.href);
    d.prototype = {
        trace: function() {
            this.log(f.TRACE,
                arguments)
        },
        debug: function() {
            this.log(f.DEBUG, arguments)
        },
        info: function() {
            this.log(f.INFO, arguments)
        },
        warn: function() {
            this.log(f.WARN, arguments)
        },
        error: function() {
            this.log(f.ERROR, arguments)
        },
        bLog: function() {
            this.log(f.LOG, arguments)
        }
    };
    log4splashtop = function() {};
    log4splashtop.getLogger = function(b) {
        b || (b = "Splashtop_default_logger_name");
        if (!q[b]) {
            var a = new d(b);
            q[b] = a;
            n.push(b)
        }
        return q[b]
    };
    log4splashtop.printLog = function() {
        var b = storageGet(l);
        console && b && console.log(b)
    };
    return window.log4splashtop =
        log4splashtop
}();
window.log = window.log || log4splashtop.getLogger();

function STWSOperation(a) {
    this.onClose = this.onError = this.onMessage = this.onOpen = null;
    this.owner = a
}
var websocketTimeout = 3E4,
    websockets = [],
    wstimeout = 0;

function clearWSTimeout(a) {
    var c = websockets.length;
    if (a)
        for (var d = 0; d < c; d++)
            if (websockets[d] == a) {
                websockets.splice(d, 1);
                break
            }
}

function checkWSTimeout(a) {
    var c = websockets.length,
        d = !1;
    if (a) {
        for (var f = 0; f < c; f++)
            if (websockets[f] == a) {
                d = !0;
                break
            } d || websockets.splice(-1, -1, a)
    }
    a = (new Date).getTime();
    c = websockets.length;
    for (f = c - 1; 0 <= f; f--) a - websockets[f].last_time > websocketTimeout && websockets[f].errorHandler && (websockets[f].errorHandler("Connect timeout!"), websockets.splice(f, 1), f--);
    0 < wstimeout && (clearTimeout(wstimeout), wstimeout = 0);
    0 < websockets.length && (wstimeout = setTimeout(checkWSTimeout, 1E3))
}

function STWebsocket(a, c, d) {
    this.host = "";
    this.port = "443";
    this.protocol = "http:";
    this.last_time = 0;
    this.sub_protocol = d;
    this.operation = c;
    this.sessioncode = this.nickname = "";
    this.serverinfo = {};
    this.owner = this.closeHandler = this.errorHandler = this.messageHandler = this.openHandler = this.socket = null;
    this.autoConnect = !1;
    this.connectState = -1;
    this.setAutoConnect = function(a) {
        this.autoConnect = a
    };
    this.updateTimer = function() {
        this.last_time = (new Date).getTime()
    };
    this.setIP = function(a) {
        this.host = a
    };
    this.setIP = function(a) {
        this.port =
            a
    };
    this.setProt = function(a) {
        this.protocol = a
    };
    this.setname = function(a) {
        this.nickname = a
    };
    this.setAddr = function(a) {
        if (a && (a = a.split("?")[0])) {
            var c = a.split("//");
            c && 1 < c.length ? (this.protocol = c[0], a = c[1]) : this.protocol = "http:";
            c = a.split(":");
            this.host = c[0];
            1 < c.length && (this.port = c[1])
        }
    };
    this.clearSocket = function() {
        clearWSTimeout(this)
    };
    this.getWebsocket = function() {
        return this.socket
    };
    this.send = function(a) {
        this.socket && 1 == this.socket.readyState && 0 == this.connectState ? this.socket.send(a) : log && log.debug("Cannot send msg with the state: " +
            this.socket.readyState)
    };
    this.close = function() {
        (this.socket && 0 == this.socket.readyState || 1 == this.socket.readyState) && this.socket.close()
    };
    this.setOpenHandler = function(a) {
        this.openHandler = a
    };
    this.setMessageHandler = function(a) {
        this.messageHandler = a
    };
    this.setErrorHandler = function(a) {
        this.errorHandler = a
    };
    this.setCloseHandler = function(a) {
        this.closeHandler = a
    };
    this.getState = function() {
        return this.socket ? this.socket.readyState : -1
    };
    this.setOperation = function(a) {
        a && a instanceof STWSOperation && (a.onOpen && this.setOpenHandler(a.onOpen),
            a.onMessage && this.setMessageHandler(a.onMessage), a.onClose && this.setCloseHandler(a.onClose), a.onError && this.setErrorHandler(a.onError), a.owner && (this.owner = a.owner))
    };
    this.setBinaryType = function(a) {
        this.socket && (this.socket.binaryType = "arraybuffer")
    };
    this.connect = function(a, c) {
        this.connectState = 1;
        this.setAddr(a);
        this.setOperation(c);
        if ("" == this.host) {
            if (errH) {
                var d;
                errH("Please specify the address!")
            }
        } else try {
            if (!this.socket || 2 == this.socket.readyState || 3 == this.socket.readyState) try {
                var b = ("https:" ==
                        this.protocol || "wss:" == this.protocol ? "wss:" : "ws:") + "//" + this.host + ":" + this.port,
                    l = "MozWebSocket" in window ? MozWebSocket : WebSocket;
                log && log.debug("Connect WebSocket: " + b);
                this.sub_protocol ? (log && log.debug("sub_protocol: " + this.sub_protocol), this.socket = new l(b, this.sub_protocol)) : this.socket = new l(b);
                this.socket.owner = this;
                this.socket.binaryType = "arraybuffer";
                this.updateTimer()
            } catch (t) {
                log && log.info("socket parameter error!");
                this.errorHandler(d);
                return
            }
            this.socket.onopen = function(a) {
                this.owner && this.owner.openHandler &&
                    (this.owner.connectState = 0);
                this.owner.updateTimer();
                checkWSTimeout(this.owner);
                this.owner.openHandler(a, this.owner.owner)
            };
            this.socket.onmessage = function(a) {
                clearWSTimeout(this.owner);
                this.owner && this.owner.messageHandler && this.owner.updateTimer();
                this.owner.messageHandler(a, this.owner.owner)
            };
            this.socket.onerror = function(a) {
                try {
                    clearWSTimeout(this.owner), this.owner && (this.owner.connectState = -2), this.owner && this.owner.errorHandler && this.owner.errorHandler(a, this.owner.owner)
                } catch (b) {
                    log && log.error("Connect socket error:" +
                        b), this.owner && this.owner.errorHandler && this.owner.errorHandler(a, this.owner.owner)
                }
            };
            this.socket.onclose = function(a) {
                try {
                    clearWSTimeout(this.owner), this.owner && (this.owner.connectState = -1), this.owner && this.owner.closeHandler && this.owner.closeHandler(a, this.owner.owner)
                } catch (b) {
                    log && log.error("Connect socket close:" + b), this.owner && this.owner.closeHandler && this.owner.closeHandler(a, this.owner.owner)
                }
            }
        } catch (q) {
            log && log.error("<p> Error" + q), this.errorHandler(evt)
        }
    };
    this.setOperation(c);
    this.setAddr(a)
};

function PeerConnection(a, c, d, f, h) {
    this.connection = a;
    this.index = c;
    this.guest = d;
    this.localStream = f;
    this.remoteIndex = h;
    this.started = !1;
    this.singleChannel = this.remoteVideo = this.pc = null;
    this.sessionid = 1;
    this.channelReady = !1;
    this.remoteRes = null;
    var e = this;
    this.iceConfig = null;
    var b = {
            mandatory: {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            }
        },
        l = {
            iceServers: [{
                url: "turn:turn.relay.splashtop.com:443",
                credential: "1234",
                username: "eric"
            }]
        },
        t = {
            optional: [{
                DtlsSrtpKeyAgreement: !0
            }, {
                googDscp: !0
            }, {
                googCpuOveruseDetection: !1
            }]
        },
        q = {
            optional: [],
            mandatory: {}
        };
    this.doCandidateMsg = function(a) {
        log && log.info("doCandidateMsg");
        a = new RTCIceCandidate({
            sdpMLineIndex: a.label,
            candidate: a.candidate
        });
        e.pc.addIceCandidate(a, v, x)
    };
    this.setIceConfig = function(a) {
        a && (e.iceConfig = {
            iceServers: a
        })
    };
    this.doSessionMsg = function(a) {
        log && log.info("doSessionMsg, guest: " + this.guest);
        this.guest && n()
    };
    this.setResolution = function(a) {
        a && (e.remoteRes = a)
    };
    this.doOfferMsg = function(a) {
        log && log.info("doOfferMsg");
        e.guest || n();
        e.pc.setRemoteDescription(new RTCSessionDescription(a));
        log && log.info("Sending answer to peer.");
        50 <= parseFloat(getAppVersion()) ? e.pc.createAnswer(s, m, b) : e.pc.createAnswer(s, null, b)
    };
    this.doAnswerMsg = function(a) {
        e.pc.setRemoteDescription(new RTCSessionDescription(a))
    };
    this.doByeMsg = function(a) {
        window.doByeMsg && window.doByeMsg(a.index)
    };
    this.setLocalStream = function(a) {
        e.localStream = a
    };
    var n = function() {
            log && log.info("maybeStart enter");
            if (!e.started && (log && log.info("Creating PeerConnection."), r(), e.localStream && (log && log.info("Adding local stream."), e.pc.addStream(e.localStream)),
                    e.started = !0, e.guest)) {
                for (var a in b.mandatory) q.mandatory[a] = b.mandatory[a];
                q.optional.concat(b.optional);
                log && log.info("Sending offer to peer");
                log && log.debug("offer constraints: \n  '" + JSON.stringify(q) + "'.");
                50 <= parseFloat(getAppVersion()) ? e.pc.createOffer(s, m, q) : e.pc.createOffer(s, null, q)
            }
        },
        m = function(a) {
            log && log.info("Create error callback!")
        },
        s = function(a) {
            log && log.info("setLocalAndSendMessage!");
            a.sdp = preferOpus(a.sdp);
            var b = a.sdp,
                b = b.replace(/a=rtpmap:(\d*) rtx\/(\d*)(\r\n)?/g, ""),
                b = b.replace(/a=fmtp:(\d*) apt=(\d*)(\r\n)?/g,
                    "");
            a.sdp = b;
            b = {
                sdp: a.sdp,
                type: a.type
            };
            e.remoteRes && (b.res = e.remoteRes);
            e.pc.setLocalDescription(a);
            u(b)
        },
        r = function() {
            try {
                var a = l;
                e.iceConfig && (a = e.iceConfig);
                50 <= parseFloat(getAppVersion()) ? e.pc = new RTCPeerConnection(a) : e.pc = new RTCPeerConnection(a, t);
                e.pc.onicecandidate = function(a) {
                    a.candidate ? u({
                        type: "candidate",
                        label: a.candidate.sdpMLineIndex,
                        id: a.candidate.sdpMid,
                        candidate: a.candidate.candidate
                    }) : log && log.info("End of candidates.")
                };
                log && log.info("Created RTCPeerConnnection");
                log && log.debug("New RTCPeerConnnection with:\n  config: '" +
                    JSON.stringify(a) + "';\n  constraints: '" + JSON.stringify(t) + "'.")
            } catch (b) {
                log && log.error("Failed to create PeerConnection, exception: " + b.message);
                return
            }
            e.pc.onaddstream = function(a) {
                log && log.info("Remote stream added.");
                if (window.onAddStream) window.onAddStream(e.remoteIndex, e.remoteRes, a)
            };
            e.pc.oniceconnectionstatechange = function(a) {
                if (a && a.target) switch (a.target.iceConnectionState) {
                    case "failed":
                        if (window.onStreamFailed) window.onStreamFailed();
                        break;
                    case "disconnected":
                        e.pc && e.pc.close && e.pc.close();
                    case "closed":
                        if (window.onSessionDisconnected) window.onSessionDisconnected(e.remoteIndex);
                        break;
                    case "connected":
                    case "completed":
                        if (window.onStreamConnect) window.onStreamConnect(!0)
                }
            };
            e.pc.oniceconnectionchange = function(a) {};
            e.pc.onremovestream = onRemoteStreamRemoved
        },
        u = function(a) {
            a = {
                id: "forward",
                type: "webrtc/" + wbsserver_api_version,
                data: a
            };
            a.index = e.index;
            0 != e.remoteIndex && (a.toIndex = e.remoteIndex);
            a = JSON.stringify(a);
            log && log.debug("onSignalingMessage " + a);
            e.connection ? e.connection.send(a) : window.opener &&
                window.opener.sendWSMsg ? window.opener.sendWSMsg(a) : log && log.info("Has no the send ws message handler!")
        };
    this.onHangup = function() {
        log && log.info("Hanging up.");
        if (e.localStream) try {
            e.localStream.getVideoTracks()[0].stop(), "function" == typeof e.localStream.stop && e.localStream.stop(), e.localStream = null
        } catch (a) {
            log && log.info("Has no stop function!")
        }
        if (e.pc) try {
            e.pc.close()
        } catch (b) {
            log && log.info("This pc has closed!")
        }
    };
    var v = function() {
            log && log.info("Romote candidate added successfully!")
        },
        x = function(a) {
            log &&
                log.info("Remote candidate error: " + a.toString())
        };
    onSessionConnecting = function(a) {
        log && log.info("Session connecting.")
    };
    onSessionOpened = function(a) {
        log && log.info("Session opened.");
        d && n()
    };
    onRemoteStreamRemoved = function(a) {
        log && log.info("Remote stream removed.")
    };
    preferOpus = function(a) {
        for (var b = a.split("\r\n"), c = null, d = 0; d < b.length; d++) b[d] = b[d].replace(/UDP\/TLS\//g, "");
        for (d = 0; d < b.length; d++)
            if (-1 !== b[d].search("m=audio")) {
                c = d;
                break
            } if (null === c) return a;
        for (d = 0; d < b.length; d++)
            if (-1 !== b[d].search("opus/48000")) {
                (a =
                    extractSdp(b[d], /:(\d+) opus\/48000/i)) && (b[c] = setDefaultCodec(b[c], a));
                break
            } b = removeCN(b, c);
        return a = b.join("\r\n")
    };
    extractSdp = function(a, b) {
        var c = a.match(b);
        return c && 2 == c.length ? c[1] : null
    };
    setDefaultCodec = function(a, b) {
        for (var c = a.split(" "), d = [], e = 0, r = 0; r < c.length; r++) 3 === e && (d[e++] = b), c[r] !== b && (d[e++] = c[r]);
        return d.join(" ")
    };
    removeCN = function(a, b) {
        for (var c = a[b].split(" "), d = a.length - 1; 0 <= d; d--) {
            var e = extractSdp(a[d], /a=rtpmap:(\d+) CN\/\d+/i);
            e && (e = c.indexOf(e), -1 !== e && c.splice(e, 1), a.splice(d,
                1))
        }
        a[b] = c.join(" ");
        return a
    }
};

function SingalChannel(a, c, d, f, h, e) {
    this.clientIndex = 0;
    this.urlPars = parseUrl(null, !0) || {};
    this.sessioncode = d || this.urlPars.session;
    this.ws = c || this.urlPars.ws || singal_server_addr || "wss://wbs.relay.splashtop.com:443";
    this.username = encodeURIComponent(f);
    this.webrtcSocket = null;
    this.callback = e;
    this.needSecurity = h;
    this.secCode = null;
    this.guest = !1;
    this.hosts = null;
    this.authed = {};
    this.pc = null;
    window.log = window.log || log4splashtop.getLogger();
    this.bNum = 0;
    this.supportN2N = this.needUpdate = !1;
    this.lastRecv = this.lastSend =
        this.updateTimeout = this.timeout = 0;
    this.defaultTimeout = 3E4;
    this.iceConfig = null;
    this.remoteIndex = 0;
    this.sessionWindow = null;
    this.candidateMsgs = [];
    this.M360MeetingCode = (this.licensekey = this.accountInfo = null, null);
    this.autoDiscovery = 0;
    this.destroyed = this.forceRefresh = !1;
    this.oem = this.urlPars.oem || (window.config_oem ? window.config_oem : "splashtop");
    this.remoteRes = null;
    this.redirectToWbs = !1;
    this.redirectWBS = null;
    this.isRetry = !0;
    var b = this;
    b.getRedirectWBS = function() {
        return b.redirectWBS
    };
    this.setAccountInfo =
        function(a) {
            b.accountInfo = a;
            b.autoDiscovery = a.autoDiscovery ? 1 : 0;
            b.webrtcSocket && n()
        };
    this.setLocalStream = function(a) {
        b.pc && b.pc.setLocalStream && b.pc.setLocalStream(a)
    };
    this.setForceRefresh = function(a) {
        log && log.debug("setForceRefresh: " + a);
        b.forceRefresh = a
    };
    this.getLicenseKey = function() {
        return slef.licensekey
    };
    this.close = function() {
        if (b.pc && b.pc.onHangup) b.pc.onHangup();
        this.destroyed = !0;
        b.sessionWindow && (b.sessionWindow.close(), b.sessionWindow = null);
        if (b.webrtcSocket) try {
            b.webrtcSocket.setOpenHandler(null),
                b.webrtcSocket.setMessageHandler(null), b.webrtcSocket.setErrorHandler(null), b.webrtcSocket.setCloseHandler(null), b.webrtcSocket.close()
        } catch (a) {}
        0 < b.updateTimeout && clearTimeout(b.updateTimeout);
        0 < b.timeout && clearTimeout(b.timeout)
    };
    this._clearTimeout = function() {
        0 < b.timeout && (clearTimeout(b.timeout), log && log.debug("ClearTimeout"), b.timeout = 0)
    };
    this.getsessionid = function() {
        return storageGet("M360MeetingCode")
    };
    this._setTimeout = function() {
        b._clearTimeout();
        b.timeout = setTimeout(l, b.defaultTimeout);
        log &&
            log.debug("SetTimeout")
    };
    var l = function() {
        b._clearTimeout();
        if (0 == b.lastSend || b.lastRecv > b.lastSend && b.lastRecv - b.lastSend < b.defaultTimeout) {
            var a;
            a = {
                id: "heartbeat",
                type: "webrtc/" + wbsserver_api_version
            };
            b.guest && (a.id = "forward", a.index = b.clientIndex, a.data = {
                type: "heartbeat"
            });
            b._sendMessage(a);
            b.lastSend = (new Date).getTime()
        } else if (log && log.error("Heartbeat Timeout"), b.close(), window.onConnectError) {
            window.onConnectError();
            return
        }
        b._setTimeout()
    };
    this.sendMessage = function(a) {
        b._sendMessage(a)
    };
    this._sendMessage =
        function(a) {
            if ("string" != typeof a) try {
                a = JSON.stringify(a)
            } catch (c) {}
            log && log.debug("send msg: " + a);
            b.webrtcSocket.send(a)
        };
    this.reset = function() {
        b.bNum = 0;
        b.remoteIndex = 0;
        b.authed = {};
        b.sessionWindow && (b.sessionWindow.close(), b.sessionWindow = null)
    };
    this.setNeedSecurity = function(a) {
        log && log.debug("setNeedSecurity: " + a);
        b.needSecurity = a
    };
    this.setAutoDiscovery = function(a) {
        b.autoDiscovery = a ? 1 : 0;
        b.webrtcSocket && n()
    };
    this.setSecurity = function(a) {
        log && log.debug("setSecurity+");
        b.secCode = a;
        b.webrtcSocket &&
            0 != b.clientIndex && (a = {
                id: "forward",
                type: "webrtc/" + wbsserver_api_version,
                index: b.clientIndex,
                data: {
                    type: "authenticate",
                    value: b.secCode
                }
            }, navigator && navigator.userAgent && (a.data.userAgent = navigator.userAgent), log && log.info("request to authenticate"), b._sendMessage(a));
        log && log.debug("setSecurity-")
    };
    this.getPeerConnection = function(a) {
        return b.pc && b.pc.remoteIndex == a ? b.pc : null
    };
    this.sendByeMsg = function(a) {
        b.webrtcSocket && 0 != b.clientIndex && b._sendMessage({
            id: "forward",
            type: "webrtc/" + wbsserver_api_version,
            index: b.clientIndex,
            data: {
                type: "bye"
            }
        })
    };
    this.checkAuth = function(a) {
        if (b.authed[a]) return b.authed[a];
        b._sendMessage({
            id: "forward",
            type: "webrtc/" + wbsserver_api_version,
            index: b.clientIndex,
            toIndex: a,
            data: {
                type: "bye"
            }
        });
        return !1
    };
    this.handleSWClose = function() {
        b.sendByeMsg(b.clientIndex);
        b.sessionWindow = null
    };
    this._startSession = function(c, d) {
        b.remoteIndex = c;
        b.pc = new PeerConnection(b.webrtcSocket, b.clientIndex, !0, a, c);
        b.iceConfig && b.pc.setIceConfig(b.iceConfig);
        var e = {
            w: window.screen.width,
            h: window.screen.height
        };
        d && (e = d);
        log && log.info("receiverRes: " + e.w + " x " + e.h);
        window.startCapture && window.startCapture(e, function(a) {
            a ? (b.pc.setResolution(e), b.pc.setLocalStream(a), a && a.getVideoTracks()[0] && (a.getVideoTracks()[0].onended = function() {
                b.close()
            }), b.pc.doSessionMsg()) : log && log.error("startCapture failed!")
        })
    };
    this.doConnect = function(a) {
        if (b.hosts && b.hosts instanceof Array && 0 < b.hosts.length) {
            var c = {
                id: "forward",
                type: "webrtc/" + wbsserver_api_version,
                index: b.clientIndex,
                data: {
                    type: "authenticate"
                }
            };
            navigator && navigator.userAgent &&
                (c.data.userAgent = navigator.userAgent);
            if (a.security && "1" == a.security)
                if (b.secCode && "" != b.secCode) c.data.value = b.secCode;
                else if (log && log.info("request security code"), window.showAuth) {
                window.showAuth(!0);
                return
            }
            log && log.info("request to authenticate");
            b._sendMessage(c)
        } else if (log && log.error("no hosts,stop to connect"), b.close(), window.onNoHost) window.onNoHost()
    };
    var t = function(a) {
            var c = a.data,
                d = a.index;
            switch (c.type) {
                case "heartbeat":
                    if (b.guest) {
                        if ("undefined" == typeof a.toIndex || a.toIndex != b.clientIndex) break;
                        b.lastRecv = (new Date).getTime()
                    } else a = {
                        id: "forward",
                        type: "webrtc/" + wbsserver_api_version,
                        index: b.clientIndex,
                        toIndex: d,
                        data: {
                            type: "heartbeat"
                        }
                    }, b._sendMessage(a);
                    break;
                case "candidate":
                    if (!b.checkAuth(d)) break;
                    b.pc && b.pc.doCandidateMsg ? (b.pc.doCandidateMsg(c), log && log.info("received candidate for pc")) : b.sessionWindow && b.sessionWindow.contentWindow && b.sessionWindow.contentWindow.doCandidateMsg ? (b.sessionWindow.contentWindow.doCandidateMsg(c), log && log.info("received candidate for sw")) : (b.candidateMsgs.push(c),
                        log && log.info("Session window not ready!"));
                    break;
                case "authenticate":
                    if (b.guest) break;
                    log && log.info("received authenticate");
                    a = "nativeres";
                    b.accountInfo && b.accountInfo.resolution && (a = b.accountInfo.resolution);
                    a = {
                        id: "forward",
                        type: "webrtc/" + wbsserver_api_version,
                        index: b.clientIndex,
                        toIndex: d,
                        data: {
                            type: "authorize",
                            code: 200,
                            res: a,
                            msg: "OK"
                        }
                    };
                    window.localAcceptResult && (a.data.res = window.localAcceptResult);
                    navigator && navigator.userAgent && (a.data.userAgent = navigator.userAgent);
                    var e = !1;
                    b.needSecurity &&
                        "" != b.needSecurity ? b.needSecurity != c.value ? (a.data.code = 401, a.data.msg = "Auth Failed", b.authed[d] = !1, log && log.info("failed to authenticate")) : e = !0 : e = !0;
                    if (e) {
                        if (!b.supportN2N && 0 < b.bNum) {
                            for (var g in b.authed) !0 == b.authed[g] && (c = {
                                id: "forward",
                                type: "webrtc/" + wbsserver_api_version,
                                index: b.clientIndex,
                                data: {
                                    type: "bye"
                                }
                            }, 0 != b.remoteIndex && (c.toIndex = b.remoteIndex), log && log.info("Drop old sessions"), b._sendMessage(c));
                            b.sessionWindow && b.sessionWindow.onClosed.removeListener(b.handleSWClose);
                            b.reset()
                        }
                        log &&
                            log.info("authenticate success, authorize to sender");
                        b.bNum++;
                        b.authed[d] = !0
                    }
                    log && log.info("send authorize to sender");
                    b._sendMessage(a);
                    break;
                case "authorize":
                    g = c.code;
                    if (200 == g) b.guest && b.hosts && (b.authed[d] = !0, a = b.remoteRes, a || (a = c.res), log && log.info("authorize success, start session, res: " + a), b._startSession(d, a));
                    else if (401 == g) {
                        if (log && log.info("authorize fail: 401"), window.onAuthFailed) window.onAuthFailed()
                    } else if (403 == g || 408 == g) {
                        if (window.onRequestDeclined) window.onRequestDeclined()
                    } else if (404 ==
                        g) {
                        if (log && log.info("receriver is busy"), window.onServerBusy) window.onServerBusy()
                    } else log && log.error("Maybe API error! code: " + g + ", msg: " + c.msg);
                    break;
                case "offer":
                    if (!b.checkAuth(d)) break;
                    if (b.pc) {
                        log && log.error("Maybe offer error!");
                        break
                    }
                    b.sessionWindow && (b.sessionWindow.close(), b.sessionWindow = null);
                    b.remoteIndex = d;
                    g = 768;
                    a = 1024;
                    c.res && (a = c.res.w, g = c.res.h);
                    e = "blank.html";
                    d = "login=auto&index=" + d + "&clientIndex=" + b.clientIndex + "&data=" + encodeURIComponent(JSON.stringify(c));
                    b.iceConfig && (d += "&iceConfig=" +
                        encodeURIComponent(JSON.stringify(b.iceConfig)));
                    request && 1 == request.debugMode && (d += "&debugMode=1");
                    e = e + "?key=" + base64encode(encodeURIComponent(d));
                    d = null;
                    d = parseInt(getAppVersion());
                    log && log.info("Create M360 Main Window, chrome version:" + d);
                    36 > d ? (d = {
                        id: "idM360SessionWindow",
                        bounds: {
                            width: a,
                            height: g
                        },
                        hidden: !0
                    }, log && log.info("window opt: bounds")) : (d = {
                        id: "idM360SessionWindow",
                        innerBounds: {
                            width: a,
                            height: g
                        },
                        hidden: !0
                    }, log && log.info("window opt: innerBounds"));
                    chrome.app.window.create(e, d, function(a) {
                        b.sessionWindow =
                            a;
                        a.onClosed.addListener(b.handleSWClose);
                        log && log.info("Create session success!");
                        a && b.candidateMsgs && a.contentWindow && (a.contentWindow.onCreateSuccess = function(a) {
                            log && log.info("Session window handle the saved candidates!");
                            for (var c = 0; c < b.candidateMsgs.length; c++) a(b.candidateMsgs[c]);
                            b.candidateMsgs.length = 0;
                            b.candidateMsgs = []
                        })
                    });
                    break;
                case "answer":
                    if (!b.checkAuth(d)) break;
                    if (!b.pc) {
                        log && log.error("Maybe answer error!");
                        break
                    }
                    log && log.info("received answer");
                    b.pc.doAnswerMsg(c);
                    break;
                case "bye":
                    log &&
                        log.info("received bye"), b.remoteIndex == d && b.reset(), delete b.authed[d], b.pc && b.pc.remoteIndex == d && b.pc.doByeMsg(a)
            }
        },
        q = function(a, c) {
            b.isRetry = !1;
            var d = {
                id: "getlist",
                type: "webrtc/" + wbsserver_api_version,
                req: {
                    product: "smx",
                    version: clientversion,
                    platform: getPlatformVersion(),
                    oem: window.oem ? window.oem : window.config_oem,
                    uuid: getUUID(),
                    name: (window.oem && "" != window.oem ? window.oem : "Sender") + "_" + parseInt(Math.random()),
                    useragent: "smx/" + clientversion + " splashtop2 chrome " + getPlatform()
                }
            };
            log && log.info("retrieveServerList!");
            request.backend && "" != request.backend && (d.req.backend = request.backend);
            b._sendMessage(d)
        },
        n = function(a, c) {
            var d = request.product ? request.product : "sms";
            log && log.info("Channel opened, start to send getsession");
            d = {
                id: "getsession",
                type: "webrtc/" + wbsserver_api_version,
                req: {
                    product: d,
                    version: clientversion,
                    platform: getPlatformVersion(),
                    oem: b.oem,
                    uuid: getUUID(),
                    useragent: "smx/" + clientversion + " splashtop2 chrome " + getPlatform()
                }
            };
            b.accountInfo ? (b.guest = !1, d.type = "webrtc/" + wbsserver_api_version, d.req.discoverable =
                b.autoDiscovery, b.accountInfo.computerName && (d.req.name = encodeURIComponent(b.accountInfo.computerName)), b.sessioncode && (d.req.value = b.sessioncode), b.needSecurity && "" != b.needSecurity && (d.req.security = 1)) : b.sessioncode && (b.guest = !0, d.req.value = b.sessioncode);
            b.licensekey && (d.req.licensekey = b.licensekey);
            d && b._sendMessage(d)
        },
        m = function(a, c) {
            log && log.debug("recv msg: " + a.data);
            a = JSON.parse(a.data);
            b.callback && b.callback(a);
            var d = a.id;
            "" != d && (d = d.toLowerCase());
            switch (d) {
                case "getlist":
                    if (a && a.ack) {
                        var d =
                            a.ack,
                            e = !1,
                            g;
                        for (g in d)
                            if (d[g].scode == b.sessioncode) {
                                d[g].wbs && b.redirectWBS != d[g].wbs ? (b.redirectToWbs = !0, b.redirectWBS = d[g].wbs, b.reopenChannel(d[g].wbs)) : n();
                                e = !0;
                                break
                            } e || n()
                    } else if (window.onConnectError) window.onConnectError({
                        code: 1,
                        message: "Server Error!"
                    });
                    break;
                case "heartbeat":
                    b.lastRecv = (new Date).getTime();
                    break;
                case "getsession":
                    g = a;
                    d = g.ack.hosts;
                    window.tempHosts = d;
                    b.clientIndex = g.ack.index;
                    g.ack.remoteIp && log && log.info("PublicIp: " + g.ack.remoteIp);
                    g.ack.wbsIp && log && log.info("wbsIp: " +
                        g.ack.wbsIp);
                    g.ack.iceServers && (b.iceConfig = g.ack.iceServers);
                    if (b.guest) g.ack.res && (b.remoteRes = g.ack.res), b.hosts = d, log && log.info("Got session, connect to receiver"), !request.name && g.ack.name && (request.name = encodeURIComponent(g.ack.name)), b.doConnect(g.ack);
                    else {
                        if (g = g.ack.value) b.sessioncode = g;
                        log && log.info("Got session, wait sender arrive");
                        b.accountInfo && (g = b.accountInfo, g = {
                            id: "getmeetingcode",
                            type: "webrtc/" + wbsserver_api_version,
                            req: {
                                product: request.product ? request.product : "smx",
                                platform: getPlatformVersion(),
                                version: clientversion,
                                oem: b.oem,
                                wbssession: b.sessioncode,
                                meetingcode: b.M360MeetingCode,
                                name: g && g.computerName ? g.computerName : "",
                                uuid: storageGet(location.host + "/uuid"),
                                desc: g.mcDesc,
                                forceRefresh: b.forceRefresh,
                                licensekey: b.licensekey
                            }
                        }, window.getCurrentToken && window.getCurrentToken() && (g.req.token = window.getCurrentToken()), b._sendMessage(g))
                    }
                    b._sendMessage(b.guest ? {
                        id: "forward",
                        type: "webrtc/" + wbsserver_api_version,
                        index: b.clientIndex,
                        data: {
                            type: "heartbeat"
                        }
                    } : {
                        id: "heartbeat",
                        type: "webrtc/" + wbsserver_api_version
                    });
                    b.lastSend = (new Date).getTime();
                    b._setTimeout();
                    break;
                case "getmeetingcode":
                    g = a;
                    log && log.info("getMC message: " + g);
                    b.forceRefresh = !1;
                    g && g.ack && 200 == g.ack.code && (b.M360MeetingCode = g.ack.value, storageSet("M360MeetingCode", g.ack.value));
                    break;
                case "license":
                    g = a;
                    if (g.ack) {
                        b.licensekey = g.ack.licensekey;
                        if (window.onGetLicenseKey) window.onGetLicenseKey(g.ack);
                        200 == g.ack.code && n()
                    }
                    break;
                case "getconnection":
                    g = a;
                    if (g.ack)
                        if (200 == g.ack.code && g.ack.connection)
                            if (g.ack.connection.scode && "" != g.ack.connection.scode)
                                if (g =
                                    g.ack.connection, b.sessioncode = g.scode, request.getSpecSessionCode = g.scode, request.name = encodeURIComponent(g.name), b.needSecurity = g.security, g && g.wbs) {
                                    if (d = g.wbs, 0 > d.search(/^ws{0,2}:\/\//) && (d = "ws://" + d), b.redirectToWbs = !0, b.redirectWBS = d, b.reopenChannel(d), "function" == typeof window.onGetConnection) window.onGetConnection(g.scode)
                                } else n();
                    else {
                        if (window.onConnectError) window.onConnectError({
                            code: 200,
                            message: chrome.i18n.getMessage("msgFailed")
                        })
                    } else if (409 == g.ack.code && window.onConnectError) window.onConnectError({
                        code: 409,
                        message: chrome.i18n.getMessage("msgFailSpecID")
                    });
                    else {
                        if (window.onConnectError) window.onConnectError({
                            code: 1,
                            message: chrome.i18n.getMessage("msgFailSpecID")
                        })
                    } else if (window.onConnectError) window.onConnectError({
                        code: 1,
                        message: "Server Error!"
                    });
                    break;
                case "forward":
                    t(a)
            }
        },
        s = function() {
            console.log("dummyFunction is called!")
        };
    this.reopenChannel = function(a) {
        if (b.webrtcSocket) try {
            b.webrtcSocket.setOpenHandler(s), b.webrtcSocket.setMessageHandler(s), b.webrtcSocket.setErrorHandler(s), b.webrtcSocket.setCloseHandler(s),
                b.webrtcSocket.close()
        } catch (c) {}
        this.ws = a;
        this.openChannel()
    };
    this.openChannel = function() {
        log && log.info("Start openChannel");
        var a = function() {
                var a = request.product ? request.product : "smx",
                    c = storageGet(location.host + "/uuid");
                c || (c = genUUID(), storageSet(location.host + "/uuid", c));
                var d = "undefined" != typeof conf_ext_useragent ? " " + conf_ext_useragent : "",
                    a = {
                        id: "getconnection",
                        type: "webrtc/" + wbsserver_api_version,
                        req: {
                            sessioncode: request.specifiedid,
                            product: "smx",
                            version: clientversion,
                            platform: getPlatformVersion(),
                            oem: b.oem,
                            useragent: a.toUpperCase() + "/" + clientversion + " splashtop2 chrome" + d,
                            macaddr: "001122334455",
                            srcuuid: c
                        }
                    };
                request.backend && "" != request.backend && (a.req.backend = request.backend);
                b._sendMessage(a)
            },
            c = function() {
                var a = request.product ? request.product : "sms",
                    c = storageGet(location.host + "/uuid");
                c || (c = genUUID(), storageSet(location.host + "/uuid", c));
                var d = b.accountInfo,
                    a = {
                        id: "license",
                        type: "webrtc/" + wbsserver_api_version,
                        req: {
                            platform: getPlatformVersion(),
                            useragent: a.toUpperCase() + "/" + clientversion + " splashtop2 chrome " +
                                getPlatform(),
                            version: clientversion,
                            uuid: c,
                            product: a,
                            oem: b.oem,
                            name: d && d.computerName ? d.computerName : "",
                            license: {
                                appid: d && d.appid ? d.appid : "",
                                googleid: d && d.plusid ? d.plusid : "",
                                authtoken: d && d.token ? d.token : "",
                                licensekey: d && d.licensekey ? d.licensekey : ""
                            }
                        }
                    };
                request.backend && "" != request.backend && (a.req.backend = request.backend);
                b._sendMessage(a)
            };
        request.notbeapi && (b.isRetry = !1);
        var d = new STWSOperation(this);
        b.accountInfo ? d.onOpen = c : request && request.specifiedid && !b.redirectToWbs ? (request.notbeapi ? (b.sessioncode =
            request.specifiedid, d.onOpen = n, b.redirectToWbs = !1) : d.onOpen = a, b.isRetry = !1) : b.isRetry ? d.onOpen = q : (d.onOpen = n, b.redirectToWbs = !1);
        d.onMessage = m;
        d.onClose = function(a) {
            log && log.error("webrtcSocket onClose: " + a);
            if (window.onSessionDisconnected) window.onSessionDisconnected(b.clientIndex)
        };
        d.onError = function(a) {
            log && log.error("webrtcSocket error: " + a);
            if (window.onConnectError) window.onConnectError({
                code: -1,
                message: chrome.i18n.getMessage("msgFailConnectContent")
            })
        };
        b.webrtcSocket = new STWebsocket(this.ws,
            d, "com.splashtop.webrtc2");
        0 == location.href.indexOf("https:") && b.webrtcSocket.setProt("https:");
        b.webrtcSocket.connect();
        log && log.debug("connect to " + this.ws);
        return b.webrtcSocket
    }
};
var RTCPeerConnection = null,
    getUserMedia = null,
    attachMediaStream = null,
    reattachMediaStream = null,
    webrtcDetectedBrowser = null,
    webrtcDetectedVersion = null;

function trace(a) {
    "\n" == a[a.length - 1] && (a = a.substring(0, a.length - 1));
    log && log.debug((performance.now() / 1E3).toFixed(3) + ": " + a)
}
navigator.mozGetUserMedia ? (log && log.debug("This appears to be Firefox"), webrtcDetectedBrowser = "firefox", RTCPeerConnection = mozRTCPeerConnection, RTCSessionDescription = mozRTCSessionDescription, RTCIceCandidate = mozRTCIceCandidate, getUserMedia = navigator.mozGetUserMedia.bind(navigator), createIceServer = function(a, c, d) {
    return {
        url: a,
        credential: d,
        username: c
    }
}, attachMediaStream = function(a, c) {
    log && log.debug("Attaching media stream");
    a.mozSrcObject = c;
    a.play()
}, reattachMediaStream = function(a, c) {
    log && log.debug("Reattaching media stream");
    a.mozSrcObject = c.mozSrcObject;
    a.play()
}, MediaStream.prototype.getVideoTracks = function() {
    return []
}, MediaStream.prototype.getAudioTracks = function() {
    return []
}) : navigator.webkitGetUserMedia ? (log && log.debug("This appears to be Chrome"), webrtcDetectedBrowser = "chrome", webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]), createIceServer = 28 > webrtcDetectedVersion ? function(a, c, d) {
        return {
            url: "turn:" + c + "@" + a,
            credential: d
        }
    } : function(a, c, d) {
        return {
            url: a,
            credential: d,
            username: c
        }
    },
    RTCPeerConnection = webkitRTCPeerConnection, getUserMedia = navigator.webkitGetUserMedia.bind(navigator), attachMediaStream = function(a, c) {
        "undefined" !== typeof a.srcObject ? a.srcObject = c : "undefined" !== typeof a.mozSrcObject ? a.mozSrcObject = c : "undefined" !== typeof a.src ? a.src = URL.createObjectURL(c) : log && log.debug("Error attaching stream to element.")
    }, reattachMediaStream = function(a, c) {
        a.src = c.src
    }, webkitMediaStream.prototype.getVideoTracks || (webkitMediaStream.prototype.getVideoTracks = function() {
            return this.videoTracks
        },
        webkitMediaStream.prototype.getAudioTracks = function() {
            return this.audioTracks
        }), webkitRTCPeerConnection.prototype.getLocalStreams || (webkitRTCPeerConnection.prototype.getLocalStreams = function() {
        return this.localStreams
    }, webkitRTCPeerConnection.prototype.getRemoteStreams = function() {
        return this.remoteStreams
    })) : log && log.info("Browser does not appear to be WebRTC-capable");
var wbsPort = 7300,
    inited = !1,
    popupPage = "popup.html",
    popupPageClicked = !1,
    sourcePage = null,
    code = null,
    currentSel = 1,
    currentCapID = chrome.tabs.TAB_ID_NONE,
    currentTab = null,
    localStream = null,
    remoteRes = null,
    s_idx_ip = "ams_stg_ip",
    s_idx_sel = "ams_stg_sel",
    desktopMediaRequestId = null,
    defaultFps = 18,
    defaultTimouout = 6E4,
    fpsIdeal = defaultFps,
    ConnectState = {
        CSInit: 0,
        CSConnected: 1,
        CSConnecting: 2,
        CSStoped: 3,
        CSError: -1,
        CSClosed: -2,
        CSUnknow: -3
    };
window.user_security = null;
window.connectState = ConnectState.CSInit;
window.customizedWBS = window.customizedWBS || storageGet("customizedWBS") || 0;
window.debugMode = window.debugMode || storageGet("debugMode") || 0;
window.capturetab = window.capturetab || storageGet("capturetab") || 0;
var deInitSignalChannel = function() {
    if (window.singalChannel && window.singalChannel.close) {
        try {
            window.singalChannel.close()
        } catch (a) {
            log.i(a)
        }
        window.singalChannel = null
    }
};
window.startSignalChannel = function(a) {
    wbsIsReturned = !0;
    window.singalChannel && user_security ? (log && log.debug("Call setSecurity"), window.singalChannel.setSecurity(user_security)) : (sessionIsSuccess = !1, window.singalChannel = new SingalChannel(localStream, customizedWBS, specifiedid), window.singalChannel.defaultTimeout = 12E3, user_security && window.singalChannel.setSecurity(user_security), a && a.isRetry && (window.singalChannel.isRetry = !0), window.singalChannel.openChannel())
};

function autoClose(a) {
    localStream && ("undefined" === typeof localStream.getTracks ? localStream.stop() : localStream.getTracks().forEach(function(a) {
        a.stop()
    }));
    window.singalChannel && (window.singalChannel.handleSWClose && window.singalChannel.handleSWClose(), deInitSignalChannel());
    isManualClose = a;
    user_security = localStream = null
}
window.onNoHost = function() {
    onResult(404, "Not host")
};
window.onResult = function(a, c) {
    clearConnectTimeout();
    if (window.onConnectResult) window.onConnectResult({
        id: "connectresult",
        code: a,
        msg: c
    })
};
window.doByeMsg = function(a) {
    log && log.info("connect doByeMsg!");
    onSessionDisconnected()
};
window.onSessionDisconnected = function(a) {
    window.user_security = null;
    deInitSignalChannel();
    onResult(400, "Connection close");
    autoClose()
};
window.onServerBusy = function() {
    onResult(403, "Server busy")
};
window.onStreamConnect = function() {
    onResult(200, "ok")
};
window.onConnectError = function() {
    onResult(-2, "authfail")
};
var connectTimeout = 0,
    clearConnectTimeout = function() {
        connectTimeout && clearTimeout(connectTimeout);
        connectTimeout = 0
    },
    setConnectTimeout = function() {
        clearConnectTimeout();
        connectTimeout = setTimeout(onSessionDisconnected, defaultTimouout)
    };
window.onload = function() {
    function a(a) {
        if (a && "" != a) {
            log && log.debug("sourceid: " + a);
            var b = window.screen.width,
                c = window.screen.height;
            remoteRes && remoteRes.w && remoteRes.h && (b = remoteRes.w, c = remoteRes.h);
            getUserMedia({
                audio: !1,
                video: {
                    mandatory: {
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: a,
                        minFrameRate: fpsIdeal,
                        maxFrameRate: fpsIdeal,
                        minWidth: b,
                        maxWidth: b,
                        minHeight: c,
                        maxHeight: c
                    }
                }
            }, f, d)
        } else log && log.info("Access rejected."), window.user_security = null, deInitSignalChannel(), onResult(0, "cancel")
    }

    function c(a) {
        function b(b) {
            b ?
                f(b) : (log && log.info(JSON.stringify(chrome.runtime.lastError)), chrome.tabs.getCurrent(function(b) {
                    a && b && b.id != chrome.tabs.TAB_ID_NONE && b.id != a.id && chrome.tabs.update(b.id, {
                        active: !1,
                        highlighted: !1
                    })
                }), chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function(a) {
                    a && a[0] ? (sourcePage = a[0], chrome.tabs.update(sourcePage.id, {
                        active: !0,
                        highlighted: !0
                    }), chrome.windows.update(sourcePage.windowId, {
                        focused: !0
                    }), c(sourcePage), h = !0) : (console.error("Not find the specified tab!"), onResult(500, "Cannot capture extension tab!"))
                }))
        }
        h || (sourcePage && (chrome.tabs.update(sourcePage.id, {
            active: !0,
            highlighted: !0
        }), chrome.windows.update(sourcePage.windowId, {
            focused: !0
        }), chrome.tabs.onRemoved.addListener(function(a, b) {
            a == sourcePage.id && (log && log.debug("Please close the sender!"), autoClose())
        })), chrome.tabCapture.capture({
            audio: !0,
            video: !0,
            audioConstraints: {
                mandatory: {
                    chromeMediaSource: "tab"
                }
            },
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: "tab",
                    minWidth: 0,
                    minHeight: 0,
                    minFrameRate: fpsIdeal,
                    maxFrameRate: fpsIdeal,
                    maxWidth: remoteRes.w,
                    maxHeight: remoteRes.h
                }
            }
        }, b))
    }
    window.request || (window.request = {
        notbeapi: !0
    });
    window.onAuthFailed = function() {
        onResult(401, "authfail")
    };
    var d = function(a) {
            log && log.error("Failed to get access to local media. Error code was " + a);
            onResult(0, "cancel")
        },
        f = function(a) {
            log && log.info("onUserMediaSuccess");
            startIsCalled = !0;
            localStream = a;
            singalChannelCallback && singalChannelCallback(localStream);
            localStream.onended = function() {
                log && log.info("Stream end!");
                autoClose(!0)
            }
        };
    remoteRes = {
        w: window.screen.width,
        h: window.screen.height
    };
    window.cancelCaptureDesktop = function() {
        desktopMediaRequestId && (chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId), desktopMediaRequestId = 0)
    };
    var h = !1;
    window.startCapture = function(d, b) {
        d && d.w && d.h && (remoteRes = d, log && log.info("Receiver resolution: " + d.w + " X " + d.h));
        singalChannelCallback = b;
        if (2 == currentSel) c(sourcePage);
        else {
            var f = ["screen"];
            captureDesktopFromWeb && (f = ["screen", "tab"]);
            desktopMediaRequestId = chrome.desktopCapture.chooseDesktopMedia(f, a)
        }
    }
};
window.sendBGMessage = function(a, c) {
    chrome.runtime.sendMessage({
        type: "splashtop.m360.bg.request.message",
        msg: a
    })
};

function connectServer() {
    log && log.info("Connecting to WBS...");
    setConnectTimeout();
    drawAirMediaIcon("connecting");
    chrome.windows.getAll({
        populate: !0
    }, function(a) {
        localStream && window.autoClose && window.autoClose(!0);
        0 == code ? log && log.error("Invalid code[0], please check the code.") : (2 == currentSel && currentCapID != chrome.tabs.TAB_ID_NONE && chrome.tabs.get(currentCapID, function(a) {
            a ? (currentTab = a, chrome.tabs.onRemoved.addListener(function(a, c) {
                currentTab && a == currentTab.id && (log && log.debug("Please close the sender!"),
                    currentTab = null)
            })) : log && log.info(JSON.stringify(chrome.runtime.lastError))
        }), onUserMediaSuccess())
    })
}

function onUserMediaSuccess(a) {
    localStream = a;
    window.startSignalChannel()
}
window.onConnectResult = function(a) {
    if (a) {
        switch (a.id) {
            case "connectresult":
                var c = "normal",
                    d = "";
                switch (a.code) {
                    case -2:
                        d = "?connectresult=fail";
                        c = "error";
                        window.connectState = ConnectState.CSError;
                        break;
                    case 200:
                        d = "?connectresult=succ";
                        c = "connected";
                        window.connectState = ConnectState.CSConnected;
                        break;
                    case 401:
                        d = "?connectresult=auth";
                        break;
                    case 403:
                        d = "?connectresult=busy";
                        c = "connecting";
                        window.connectState = ConnectState.CSError;
                        break;
                    case 404:
                        c = "error";
                        d = "?connectresult=error";
                        window.connectState = ConnectState.CSError;
                        break;
                    case 400:
                        if (window.connectState == ConnectState.CSConnected) {
                            window.connectState = ConnectState.CSInit;
                            d = "?connectresult=disc";
                            c = "normal";
                            break
                        }
                        return;
                    case 500:
                        c = "error";
                        d = "?connectresult=error";
                        window.connectState = ConnectState.CSError;
                        break;
                    case 0:
                        window.connectState = ConnectState.CSInit;
                        break;
                    default:
                        window.connectState = ConnectState.CSUnknow
                }
                drawAirMediaIcon(c);
                setPopup(popupPage + d)
        }
        popupPageClicked && sendBGMessage(a)
    }
};
var airmedia_icons = {
        16: "image/icon_normal_16x16.png",
        32: "image/icon_normal_32x32.png",
        64: "image/icon_normal_64x64.png",
        96: "image/icon_normal_96x96.png",
        128: "image/icon_normal_128x128.png",
        256: "image/icon_normal_256x256.png",
        512: "image/icon_normal_512x512.png"
    },
    icon_update_interval_id = null,
    icon_show_auth_badge = !1;

function drawAirMediaIcon(a) {
    function c(a, c) {
        chrome.browserAction.setBadgeText({
            text: a
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: c
        })
    }

    function d() {
        clearInterval(icon_update_interval_id);
        icon_update_interval_id = null;
        icon_show_auth_badge = !1
    }

    function f(a) {
        switch (a) {
            case "connected":
                d();
                c(" ", "#40f040");
                break;
            case "error":
                d();
                c("!", "#f08040");
                break;
            case "connecting":
                (icon_show_auth_badge = !icon_show_auth_badge) ? c(" ", "#40f040"): c("", "#000000");
                break;
            default:
                d(), c("", "#000000")
        }
    }
    chrome.browserAction.setIcon({
        path: airmedia_icons
    });
    f(a);
    "connecting" === a && null == icon_update_interval_id && (icon_update_interval_id = setInterval(function() {
        f("connecting")
    }, 1E3))
}
var initPars = function() {
        fpsIdeal = defaultFps;
        initializeSender()
    },
    setPars = function(a) {
        try {
            if (a && "" != a.trim()) {
                var c = parseUrl(a);
                c ? (1 == c.debug || "yes" == c.debug ? log && log.setLogLevel("debug") : log && log.setLogLevel("info"), fpsIdeal = c.fps && 0 < parseInt(c.fps) ? c.fps : defaultFps) : initPars()
            } else initPars()
        } catch (d) {
            log.info("Set parameter error! P:" + a)
        }
    },
    messageHandler = {
        currentstatus: function(a, c) {
            popupPageClicked = !0;
            c && c(connectState)
        },
        actionclose: function(a, c) {
            popupPageClicked = !1
        },
        stop: function(a, c) {
            resetExtStatus();
            window.autoClose && (window.autoClose(!0), window.user_security = null, currentCapID = chrome.tabs.TAB_ID_NONE, currentTab = null);
            window.connectState = ConnectState.CSInit;
            c && c(0)
        },
        lastshare: function(a, c) {
            c && c({
                ip: storageGet(s_idx_ip)
            })
        },
        retry: function(a, c) {
            resetExtStatus();
            connectServer()
        },
        cancel: function(a, c) {
            "retry" == a.type ? (autoClose(), window.onResult(0, "cancel")) : "connect" == a.type ? (window.onSessionDisconnected(), window.connectState = ConnectState.CSInit) : "auth" == a.type && (autoClose(), window.onResult(0, "cancel"));
            cancelCaptureDesktop();
            resetExtStatus()
        },
        shareTo: function(a, c) {
            window.connectState = ConnectState.CSConnecting;
            var d = a.code.split("?????");
            setPars(d[1]);
            storageSet(s_idx_ip, a.code);
            singal_server_addr = d[0].replace(/\?(.*)/, "");
            d = /w(s|ss):(.+)/;
            d.test(singal_server_addr) || (singal_server_addr = singal_server_addr.replace(/^(ws:\/\/|wss:\/\/|:\/\/|\/\/|\/)/, "ws://"));
            d.test(singal_server_addr) || (singal_server_addr = "ws://" + singal_server_addr);
            d = /w(s|ss):\/\/[^:]+:[0-9]+/;
            d.test(singal_server_addr) || (singal_server_addr =
                singal_server_addr.replace(/(:\d+)$/, ":" + wbsPort));
            d.test(singal_server_addr) || (singal_server_addr += ":" + wbsPort);
            sessionCode = code = config_uuid;
            window.customizedWBS = singal_server_addr;
            specifiedid = config_uuid;
            a.sel && (currentSel = a.sel);
            a.mir_tab_id && (currentCapID = a.mir_tab_id);
            c && c(0);
            connectServer()
        },
        auth: function(a, c) {
            window.user_security = a.code;
            window.startSignalChannel();
            c && c(0)
        }
    };
chrome.runtime.onMessage.addListener(function(a, c, d) {
    log && log.debug("Get the command: " + JSON.stringify(a));
    if (a && a.type && a.msg)
        if ("splashtop.m360.ext.request.message" != a.type) console.log("Not ext message!"), d && d(0);
        else if (a.msg.id in messageHandler) {
        if ("shareTo" == a.msg.id) {
            if (window.connectState == ConnectState.CSConnecting) return;
            captureDesktopFromWeb = !1
        }
        messageHandler[a.msg.id](a.msg, d)
    } else d && d(-1)
});
window.setPopup = function(a) {
    chrome.browserAction.setPopup({
        popup: a
    })
};
var resetExtStatus = function() {
        drawAirMediaIcon("normal");
        setPopup(popupPage)
    },
    initializeSender = function() {
        resetExtStatus();
        window.customizedWBS = window.customizedWBS || storageGet("customizedWBS") || 0;
        window.debugMode = window.debugMode || storageGet("debugMode") || 0;
        window.capturetab = window.capturetab || storageGet("capturetab") || 0;
        window.oem = window.oem || storageGet("oem");
        1 == window.debugMode ? log && log.setLogLevel("debug") : log && log.setLogLevel("info")
    };
chrome.runtime.onConnect.addListener(function(a) {
    a.onMessage.addListener(function(c) {
        "crestron.airmedia.query.request" == c.type ? a.postMessage({
            type: "crestron.airmedia.query.response",
            version: clientversion
        }) : "crestron.airmedia.connect.request" == c.type && c.endpoint && ((captureDesktopFromWeb = c.connect ? !0 : !1) ? (cancelCaptureDesktop(), window.connectState != ConnectState.CSConnected && window.connectState != ConnectState.CSConnecting || messageHandler.stop(), messageHandler.shareTo({
            code: c.endpoint
        }, null)) : storageSet(s_idx_ip,
            c.endpoint))
    })
});
chrome.runtime.onInstalled.addListener(function(a) {
    initializeSender()
});
chrome.runtime.onStartup.addListener(function() {
    initializeSender()
});
chrome.runtime.onSuspend.addListener(function(a) {
    messageHandler.stop()
});