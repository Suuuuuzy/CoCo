(function(e) {
    "use strict";

    function t(e) {
        return localStorage[e]
    }

    function o(e, t) {
        localStorage[e] = t
    }

    function n(e) {
        localStorage.clear()
    }
    var a = {
        get locale() {
            return navigator.languages[0] || navigator.language
        },
        get: function(e) {
            return t(e)
        },
        set: function(e, t) {
            o(e, t)
        },
        remove: function(e) {
            delete localStorage[e]
        },
        resetMouseEnterHandler: function(e, t) {
            e.off("mouseenter");
            e.on("mouseenter", t)
        },
        resetClickHandler: function(e, t) {
            e.off("click");
            e.on("click", t)
        },
        getExtensionURL: function(e) {
            return chrome.extension.getURL(e)
        },
        getStorageKeys: function() {
            return ["disable_weather", "enable_most_visited", "enable_apps", "enable_share", "enable_todo", "hideTodoPanel", "todoList", "enable_note", "notes", "bg_animation", "enable_autohide", "enable_snow", "snow_type", "enable_countdown", "countdownPosition", "countdownText", "countdownToTime", "countdown_text_color", "countdown_background", "countdown_notified", "setTimeAutomatically", "latency", "time_format", "date_format", "units_weather", "hideLink", "hideApp", "had_wl", "random_all_newtab", "update_notice"]
        },
        getGlobalOptions: function() {
            var t = {
                disable_weather: localStorage.getItem("disable_weather"),
                enable_most_visited: localStorage.getItem("enable_most_visited"),
                enable_apps: localStorage.getItem("enable_apps"),
                enable_share: localStorage.getItem("enable_share"),
                enable_todo: localStorage.getItem("enable_todo"),
                hideTodoPanel: localStorage.getItem("hideTodoPanel"),
                todoList: localStorage.getItem("todoList"),
                enable_note: localStorage.getItem("enable_note"),
                notes: localStorage.getItem("notes"),
                bg_animation: localStorage.getItem("bg_animation"),
                enable_autohide: localStorage.getItem("enable_autohide"),
                enable_snow: localStorage.getItem("enable_snow"),
                snow_type: localStorage.getItem("snow_type"),
                enable_countdown: localStorage.getItem("enable_countdown"),
                countdownPosition: localStorage.getItem("countdownPosition"),
                countdownText: localStorage.getItem("countdownText"),
                countdownToTime: localStorage.getItem("countdownToTime"),
                countdown_text_color: localStorage.getItem("countdown_text_color"),
                countdown_background: localStorage.getItem("countdown_background"),
                countdown_notified: localStorage.getItem("countdown_notified"),
                setTimeAutomatically: localStorage.getItem("setTimeAutomatically"),
                latency: localStorage.getItem("latency"),
                time_format: localStorage.getItem("time_format"),
                date_format: localStorage.getItem("date_format"),
                units_weather: localStorage.getItem("units_weather"),
                hideLink: localStorage.getItem("hideLink"),
                hideApp: localStorage.getItem("hideApp"),
                random_all_newtab: localStorage.getItem("random_all_newtab"),
                update_notice: localStorage.getItem("update_notice")
            };
            for (var o = 0; o < e.storageDefaultKeys.length; o++) {
                var n = e.storageDefaultKeys[o];
                if (typeof t[n] !== "undefined") delete t[n]
            }
            return t
        },
        getInstalledAppsInWhitelist: function(e, t) {
            chrome.management.getAll(function(o) {
                var n = [];
                for (var a = 0; a < e.length; a++) {
                    var l = e[a];
                    for (var r = 0; r < o.length; r++) {
                        var i = o[r];
                        if (l.id === i.id) {
                            n.push(i)
                        }
                    }
                }
                t(n)
            })
        },
        getEnabledAppsInWhitelist: function(e, t) {
            chrome.management.getAll(function(o) {
                var n = [];
                for (var a = 0; a < e.length; a++) {
                    var l = e[a];
                    for (var r = 0; r < o.length; r++) {
                        var i = o[r];
                        if (i.enabled && l.id === i.id) {
                            n.push(i)
                        }
                    }
                }
                t(n)
            })
        },
        getAppsInList2ThatNotInList1: function(e, t) {
            var o = [];
            for (var n = 0; n < t.length; n++) {
                var a = true;
                for (var l = 0; l < e.length; l++) {
                    if (t[n].id === e[l].id) {
                        a = false;
                        break
                    }
                }
                if (a) o.push(t[n])
            }
            return o
        },
        getHash: function(e) {
            if (e) {
                e = e.replace(/\-|\{|\}/g, "");
                var t = 0,
                    o = e.length;
                for (var n = 0; n < o; n++) {
                    t = (t << 5) - t + e.charCodeAt(n);
                    t |= 0
                }
                return t
            } else return 0
        },
        getRandomInt: function(e, t) {
            e = Math.ceil(e);
            t = Math.floor(t);
            return Math.floor(Math.random() * (t - e)) + e
        },
        ajax: function(e, t, o, n, a) {
            var l = new XMLHttpRequest;
            l.open(e, t);
            l.timeout = 5e3;
            l.onreadystatechange = function() {
                if (l.readyState === 4 && l.status === 200) {
                    if (typeof n === "function") {
                        n(l)
                    }
                } else if (l.readyState === 4) {
                    if (typeof a === "function") {
                        a(l.status)
                    }
                }
            };
            if (typeof o === "object") {
                var r = [];
                for (var i in o) {
                    if (o.hasOwnProperty(i)) r.push(i + "=" + encodeURIComponent(o[i]))
                }
                l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                l.send(r.join("&"))
            } else l.send(o)
        },
        ajax_get: function(t, o, n, a, l) {
            this.ajax("GET", t, o, function(t) {
                if (typeof a == "function") {
                    if (n === "xml") {
                        a(t.responseXML)
                    } else if (n === "text") {
                        a(t.responseText)
                    } else {
                        a(JSON.parse(t.responseText));
                        if (e.debug) console.log("ajax_get result: ", JSON.parse(t.responseText))
                    }
                }
            }, l)
        },
        ajax_post: function(t, o, n, a, l) {
            this.ajax("POST", t, o, function(t) {
                if (typeof a == "function") {
                    if (n === "xml") {
                        a(t.responseXML)
                    } else if (n === "text") {
                        a(t.responseText)
                    } else {
                        a(JSON.parse(t.responseText));
                        if (e.debug) console.log("ajax_post result: ", JSON.parse(t.responseText))
                    }
                }
            }, l)
        },
        storageSync: function() {}
    };
    e.utils = a
})(this);