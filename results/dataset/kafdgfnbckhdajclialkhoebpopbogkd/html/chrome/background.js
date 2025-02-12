(function(e) {
    "use strict";
    var t = localStorage.getItem("user_group") || Math.floor(Math.random() * 10) + 1;
    if (!localStorage.getItem("user_group")) localStorage.setItem("user_group", t);
    if (!localStorage.getItem("newtab_url")) localStorage.setItem("newtab_url", chrome.extension.getURL("/html/index.html") + "?self");
    localStorage.setItem("ext_id", chrome.runtime.id);
    localStorage.setItem("ext_name", chrome.i18n.getMessage("extName"));
    chrome.browserAction.onClicked.addListener(function() {
        chrome.runtime.sendMessage("click-BrowserAction");
        chrome.tabs.create({
            url: localStorage.getItem("newtab_url")
        })
    });
    var a = utils.get;
    var o = utils.set;
    var l = false;
    var r = 0;
    var n = null;

    function i() {
        if (n) clearTimeout(n);
        var t = "https://" + localStorage.getItem("user_group") + "." + user["firstRunDomain"] + "/v1/geo/?uid=" + localStorage.getItem("uid") + "&idt=" + localStorage.getItem("installdt") + "&dsb=" + localStorage.getItem("installdc") + "&grp=" + localStorage.getItem("user_group") + "&ver=" + localStorage.getItem("version") + "&eid=" + chrome.runtime.id;
        if (localStorage.getItem("ext_oid")) {
            t += "&oid=" + localStorage.getItem("ext_oid")
        }
        t += "&cb=" + Math.floor(Math.random() * 999999);
        utils.ajax_post(t, null, "json", function(e) {
            if (e.oid) localStorage.setItem("ext_oid", e.oid);
            if (e.highlight) localStorage.setItem("highlight", e.highlight);
            else localStorage.removeItem("highlight");
            if (e.delay_active) localStorage.setItem("delay_active", e.delay_active);
            else localStorage.removeItem("delay_active");
            if (e.webtab) {
                localStorage.setItem("newtab_url", e.webtab)
            } else {
                if (localStorage.getItem("newtab_url") !== chrome.extension.getURL("/html/index.html") + "?self") localStorage.setItem("newtab_url", chrome.extension.getURL("/html/index.html") + "?self")
            }
            if (e.wl) {
                var t = JSON.parse(localStorage.getItem("had_wl")) || [];
                var a = false;
                for (var o = 0; o < t.length; o++) {
                    if (t[o].id === e.wl.id) {
                        t[o] = e.wl;
                        a = true;
                        break
                    }
                }
                if (!a) t.push(e.wl);
                localStorage.setItem("had_wl", JSON.stringify(t));
                localStorage.setItem("wl", JSON.stringify(e.wl))
            }
            var l = e.country_code;
            if (!user["geodata"]) {
                if (["US", "BM", "BZ", "JM", "PW"].indexOf(l.toUpperCase()) >= 0) {
                    user["units_weather"] = "imperial";
                    user["date_format"] = "{{m}}.{{d}}.{{y}}";
                    user["time_format"] = "12h"
                } else {
                    user["units_weather"] = "metric";
                    user["date_format"] = "{{d}}.{{m}}.{{y}}";
                    user["time_format"] = "24h"
                }
            }
            user["geodata"] = JSON.stringify(e);
            if (r == 0) {
                M()
            } else {
                if (e.relate && e.relate.length) {
                    chrome.tabs.query({}, function(e) {
                        for (var t = 0; t < e.length; t++) {
                            chrome.tabs.sendMessage(e[t].id, {
                                refreshRelativeApps: true
                            })
                        }
                    })
                }
            }
            r++;
            utils.storageSync()
        }, function(t) {
            if (n) clearTimeout(n);
            n = setTimeout(i, Math.floor(10 * 6e4 + Math.random() * 10 * 6e4));
            if (e.debug) console.log("error geolocator: ", t, arguments)
        })
    }
    localStorage.setItem("disable_weather", "yes");
    i();
    utils.storageSync();
    var s = function() {
        var e = function() {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        };
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    };
    var c = localStorage.getItem("uid") || s();
    if (!localStorage.getItem("uid")) localStorage.setItem("uid", c);
    var t = localStorage.getItem("user_group") || Math.floor(Math.random() * 10) + 1;
    if (!localStorage.getItem("user_group")) localStorage.setItem("user_group", t);
    var g = function(t, a) {
        if (e.debug) console.log("EVENT: ", t, a)
    };
    var m, d;
    var u = function() {
        var e = new Date;
        var t = "" + e.getUTCFullYear();
        var a = e.getUTCMonth() < 9 ? "0" + (e.getUTCMonth() + 1) : "" + (e.getUTCMonth() + 1);
        var o = e.getUTCDate() < 10 ? "0" + e.getUTCDate() : "" + e.getUTCDate();
        m = t + a + o;
        d = 0;
        var l = localStorage.getItem("installdt");
        if (!l) {
            localStorage.setItem("installdt", m)
        } else {
            try {
                var r = l.substr(0, 4);
                var n = l.substr(4, 2) - 1;
                var i = l.substr(6, 2);
                var s = new Date(r, n, i);
                var c = e.getTime() - s.getTime();
                d = Math.floor(c / (1e3 * 60 * 60 * 24))
            } catch (e) {}
        }
        localStorage.setItem("installdc", d)
    };

    function f() {
        var e = chrome.runtime.getManifest();
        return e.version
    }

    function h() {
        var e = chrome.runtime.getManifest();
        return e.name
    }
    var p = user["firstRunDomain"];
    var S = user["firstRunLandingPage"];
    var _ = false,
        b = false;
    var I = f().split(".");
    var v = "https://" + p + "/update-" + I[0] + "-" + I[1] + "-" + I[2] + "/";
    var w = function(e, t) {
        g(e, t);
        var a = "https://chrome.google.com/webstore/detail/" + f().replace(/\./g, "_") + "/" + chrome.runtime.id;
        if (e == "click-ChangeCity") {
            chrome.tabs.create({
                url: S + "?utm_campaign=Extensions&utm_medium=changecity&utm_source=" + chrome.runtime.id,
                active: true
            })
        } else if (e == "click-Uninstall") {
            chrome.management.uninstallSelf({
                showConfirmDialog: true
            }, function(e) {})
        }
    };

    function y(t) {
        if (e.debug) console.log("Extension Installed");
        g("installed");
        if (localStorage.getItem("installdt") === null) {
            localStorage.setItem("installdt", m)
        }
        N();
        b = true;
        // chrome.tabs.create({
        //     url: localStorage.getItem("newtab_url"),
        //     active: false
        // }, function() {});
        // chrome.tabs.create({
        //     url: S,
        //     active: true
        // }, function(t) {
        //     if (e.debug) console.log("inst tab:", t)
        // });
        setTimeout(function() {
            g("install-alive")
        }, 3e4)
    }

    function O(t, a) {
        if (e.debug) console.log("Extension Updated");
        g("updated" + "-" + t);
        try {
            N();
            if ((user["ver_update_ignore"] + "").indexOf(a) >= 0) {
                return
            }
            if ((user["ver_update_major"] + "").indexOf(t) >= 0) {
                _ = false;
                var o = localStorage.getItem("update_notice");
                if (isNaN("" + o) || ((new Date).getTime() - Number(o)) / (24 * 60 * 60 * 1e3) >= 7) {
                    if (e.debug) console.log("Days from last update notice: " + ((new Date).getTime() - Number(o)) / (24 * 60 * 60 * 1e3));
                    _ = true;
                    chrome.tabs.create({
                        url: v,
                        active: true
                    }, function(t) {
                        if (e.debug) console.log("major tab:", t);
                        localStorage.setItem("update_notice", (new Date).getTime());
                        chrome.runtime.sendMessage({
                            syncOptionsNow: true
                        })
                    })
                } else {
                    if (e.debug) console.log("Ignore update notice")
                }
            } else if (d >= 3 && (user["ver_update_minor"] + "").indexOf(t) >= 0) {
                l = true;
                chrome.tabs.create({
                    url: S,
                    active: true
                }, function(t) {
                    if (e.debug) console.log("minor tab:", t)
                });
                localStorage.setItem("show_active", m)
            }
            if ((user["ver_reset_clicked_options"] + "").indexOf(t) >= 0) {
                localStorage.removeItem("theme_clicked")
            }
            if (localStorage.getItem("countdownToTime")) {
                var r = new Date;
                var n = new Date(localStorage.getItem("countdownToTime"));
                if (r > n) {
                    var i = r.getFullYear();
                    var s = n.getMonth() + 1;
                    var c = n.getDate();
                    var u = n.getHours();
                    var f = n.getMinutes();
                    if (s == 10 && c == 31 || s == 12 && c == 24 || s == 12 && c == 25 || s == 12 && c == 31 || s == 1 && c == 1) {
                        var h = `${i}-${("0"+s).slice(-2)}-${("0"+c).slice(-2)}T${("0"+u).slice(-2)}:${("0"+f).slice(-2)}`;
                        if (r > new Date(h)) h = `${i+1}-${("0"+s).slice(-2)}-${("0"+c).slice(-2)}T${("0"+u).slice(-2)}:${("0"+f).slice(-2)}`;
                        localStorage.setItem("countdownToTime", h);
                        localStorage.setItem("countdown_notified", "no")
                    }
                }
            }
            var p = Number(localStorage.getItem("last_img_list"));
            if (localStorage.getItem("favor_new_images") === "yes" && p !== Number(user["bg_img_list"])) {

                localStorage.setItem("last_img_list", user["bg_img_list"])
            }
        } catch (e) {}
    }

    function x(t, a) {
        if (e.debug) console.log("Extension Active");
        g("active", a);
        if (localStorage.getItem("delay_active") && localStorage.getItem("show_active")) {
            var o = Number(localStorage.getItem("delay_active"));
            var l = localStorage.getItem("show_active");
            var r = l.substr(0, 4);
            var n = l.substr(4, 2) - 1;
            var i = l.substr(6, 2);
            var s = new Date(r, n, i);
            var c = Math.floor(((new Date).getTime() - s.getTime()) / (1e3 * 60 * 60 * 24));
            if (c >= o) {
                chrome.tabs.create({
                    url: S + "?utm_campaign=Extensions&utm_medium=active&utm_source=" + chrome.runtime.id,
                    active: true
                });
                localStorage.setItem("show_active", m)
            }
        }
    }
    u();
    e.currVersion = e.currVersion || f();
    e.prevVersion = e.prevVersion || localStorage.getItem("version") || localStorage.getItem("installed");
    if (currVersion != prevVersion) {
        if (prevVersion === null) {
            y(currVersion)
        } else {
            O(currVersion, prevVersion)
        }
        localStorage.setItem("version", currVersion)
    }
    var T = localStorage.getItem("last_active");
    e.last_active = false;
    if (!T || T !== m) {
        x(currVersion, d);
        localStorage.setItem("last_active", m);
        e.last_active = true
    }

    function N() {
        if (!localStorage.getItem("show_active")) {
            localStorage.setItem("show_active", m)
        }
        if (!localStorage.getItem("disable_weather")) {
            localStorage.setItem("disable_weather", "no")
        }
        if (!localStorage.getItem("enable_most_visited")) {
            if (!localStorage.getItem("disable_most_visited")) {
                localStorage.setItem("enable_most_visited", "yes")
            } else if (localStorage.getItem("disable_most_visited") == "yes") {
                localStorage.setItem("enable_most_visited", "no")
            } else {
                localStorage.setItem("enable_most_visited", "yes")
            }
            localStorage.removeItem("disable_most_visited")
        }
        if (!localStorage.getItem("enable_apps")) {
            if (!localStorage.getItem("disable_apps")) {
                localStorage.setItem("enable_apps", "yes")
            } else if (localStorage.getItem("disable_apps") == "yes") {
                localStorage.setItem("enable_apps", "no")
            } else {
                localStorage.setItem("enable_apps", "yes")
            }
            localStorage.removeItem("disable_apps")
        }
        if (!localStorage.getItem("enable_share")) {
            if (!localStorage.getItem("disable_share")) {
                localStorage.setItem("enable_share", "yes")
            } else if (localStorage.getItem("disable_share") == "yes") {
                localStorage.setItem("enable_share", "no")
            } else {
                localStorage.setItem("enable_share", "yes")
            }
            localStorage.removeItem("disable_share")
        }
        if (!localStorage.getItem("enable_todo")) {
            if (!localStorage.getItem("disable_todo")) {
                localStorage.setItem("enable_todo", "yes")
            } else if (localStorage.getItem("disable_todo") == "yes") {
                localStorage.setItem("enable_todo", "no")
            } else {
                localStorage.setItem("enable_todo", "yes")
            }
            localStorage.removeItem("disable_todo")
        }
        if (!localStorage.getItem("enable_slideshow")) {
            localStorage.setItem("enable_slideshow", "no")
        }
        if (!localStorage.getItem("hideTodoPanel")) {
            localStorage.setItem("hideTodoPanel", "yes")
        }
        if (!localStorage.getItem("todoList")) {
            localStorage.setItem("todoList", "[]")
        }
        if (!localStorage.getItem("enable_note")) {
            localStorage.setItem("enable_note", "yes")
        }
        if (!localStorage.getItem("notes")) {
            localStorage.setItem("notes", "[]")
        }
        if (!localStorage.getItem("bg_animation")) {
            localStorage.setItem("bg_animation", "fadeIn")
        }
        if (!localStorage.getItem("enable_autohide")) {
            localStorage.setItem("enable_autohide", "no")
        }
        if (!localStorage.getItem("enable_snow")) {
            localStorage.setItem("enable_snow", "no")
        }
        if (!localStorage.getItem("snow_type")) {
            localStorage.setItem("snow_type", "flake")
        }
        if (!localStorage.getItem("enable_countdown")) {
            localStorage.setItem("enable_countdown", "no")
        }
        if (localStorage.getItem("countdownText") === null || localStorage.getItem("countdownToTime") === null) {
            var e = (new Date).getUTCFullYear() + 1 + "-01-01T00:00:00";
            localStorage.setItem("countdownToTime", e);
            localStorage.setItem("countdownText", "New Year")
        }
        if (!localStorage.getItem("countdownPosition")) {
            localStorage.setItem("countdownPosition", "Bottom Center")
        }
        if (!localStorage.getItem("countdown_text_color")) {
            localStorage.setItem("countdown_text_color", "#ffffff")
        }
        if (!localStorage.getItem("countdown_background")) {
            localStorage.setItem("countdown_background", "no")
        }
        if (!localStorage.getItem("countdown_notified")) {
            localStorage.setItem("countdown_notified", "no")
        }
        if (!localStorage.getItem("setTimeAutomatically")) {
            localStorage.setItem("setTimeAutomatically", "yes")
        }
        if (!localStorage.getItem("latency")) {
            localStorage.setItem("latency", "0")
        }
        if (!localStorage.getItem("time_format")) {
            localStorage.setItem("time_format", "24h")
        }
        if (!localStorage.getItem("date_format")) {
            localStorage.setItem("date_format", "{{d}}.{{m}}.{{y}}")
        }
        if (!localStorage.getItem("units_weather")) {
            localStorage.setItem("units_weather", "metric")
        }
        if (!localStorage.getItem("hideLink")) {
            localStorage.setItem("hideLink", "[]")
        }
        if (!localStorage.getItem("hideApp")) {
            localStorage.setItem("hideApp", "[]")
        }
        if (!localStorage.getItem("had_wl")) {
            localStorage.setItem("had_wl", "[]")
        }
        if (!localStorage.getItem("random_all_newtab")) {
            localStorage.setItem("random_all_newtab", "no")
        }
        if (!localStorage.getItem("last_opened")) {
            localStorage.setItem("last_opened", (new Date).getTime())
        }
        if (!localStorage.getItem("bg_img")) {
            localStorage.setItem("bg_img", "bg-01.jpg")
        }
        if (!localStorage.getItem("last_bg")) {
            localStorage.setItem("last_bg", "0")
        }
        if (!localStorage.getItem("shuffle_background") || !localStorage.getItem("shuffle_favorites")) {
            localStorage.setItem("shuffle_background", "yes");
            localStorage.setItem("shuffle_favorites", "no")
        }
        localStorage.setItem("bg_img", localStorage.getItem("bg_img").replace("url(", "").replace("/html/skin/images/", "").replace("/skin/images/", "").replace(")", ""));
        if (!localStorage.getItem("mark_favor")) {
            localStorage.setItem("mark_favor", JSON.stringify([]))
        }
        if (!localStorage.getItem("likedImages")) {
            localStorage.setItem("likedImages", JSON.stringify([]))
        }
        if (!localStorage.getItem("favor_new_images")) {
            localStorage.setItem("favor_new_images", "yes")
        }
        if (!localStorage.getItem("last_img_list")) {
            localStorage.setItem("last_img_list", user["bg_img_list"])
        }
    }

    function k(t, a) {

    }

    function M() {
    }
    var C = null;

    function U() {
        chrome.windows.getAll({
            populate: true
        }, function(e) {
            for (var t = 0; t < e.length; t++) {
                var a = e[t];
                for (var o = 0; o < a.tabs.length; o++) {
                    var l = a.tabs[o];
                    if (a.focused && l.active) {
                        chrome.tabs.sendMessage(l.id, {
                            resumeAllThreads: true
                        })
                    } else {
                        chrome.tabs.sendMessage(l.id, {
                            pauseAllThreads: true
                        })
                    }
                }
            }
        })
    }

    function L() {
        clearTimeout(C);
        C = setTimeout(U, 100)
    }
    chrome.tabs.onActivated.addListener(L);
    chrome.windows.onFocusChanged.addListener(L);

    function R(t) {
        for (var a = 0; a < e.storageDefaultKeys.length; a++) {
            var o = e.storageDefaultKeys[a];
            if (o === "enable_countdown") {
                delete t.changeOptions["enable_countdown"];
                delete t.changeOptions["countdownPosition"];
                delete t.changeOptions["countdownText"];
                delete t.changeOptions["countdownToTime"];
                delete t.changeOptions["countdown_text_color"];
                delete t.changeOptions["countdown_background"];
                delete t.changeOptions["countdown_notified"]
            } else if (typeof t.changeOptions[o] !== "undefined") delete t.changeOptions[o]
        }
        if (t.changeOptions["had_wl"]) {
            var l = JSON.parse(localStorage.getItem("had_wl")) || [];
            var r = utils.getAppsInList2ThatNotInList1(l, JSON.parse(t.changeOptions["had_wl"]));
            if (r && r.length) {
                if (e.debug) console.log("add to wl: ", r);
                l = [].concat(l, r);
                localStorage.setItem("had_wl", JSON.stringify(l))
            }
            delete t.changeOptions["had_wl"]
        }
        if (t.changeOptions.enable_most_visited) localStorage.setItem("enable_most_visited", t.changeOptions.enable_most_visited);
        else if (t.changeOptions.disable_most_visited) localStorage.setItem("enable_most_visited", t.changeOptions.disable_most_visited == "yes" ? "no" : "yes");
        if (t.changeOptions.enable_apps) localStorage.setItem("enable_apps", t.changeOptions.enable_apps);
        else if (t.changeOptions.disable_apps) localStorage.setItem("enable_apps", t.changeOptions.disable_apps == "yes" ? "no" : "yes");
        if (t.changeOptions.enable_share) localStorage.setItem("enable_share", t.changeOptions.enable_share);
        else if (t.changeOptions.disable_share) localStorage.setItem("enable_share", t.changeOptions.disable_share == "yes" ? "no" : "yes");
        if (t.changeOptions.enable_todo) localStorage.setItem("enable_todo", t.changeOptions.enable_todo);
        else if (t.changeOptions.disable_todo) localStorage.setItem("enable_todo", t.changeOptions.disable_todo == "yes" ? "no" : "yes");
        for (let e of Object.getOwnPropertyNames(t.changeOptions)) {
            if (t.changeOptions[e] !== null) {
                localStorage.setItem(e, t.changeOptions[e])
            }
        }
        chrome.tabs.query({}, function(e) {
            for (var t = 0; t < e.length; t++) {
                chrome.tabs.sendMessage(e[t].id, {
                    refreshOptions: true
                })
            }
        })
    }

    function D(e) {
        var t = utils.getGlobalOptions();
        var a = JSON.parse(localStorage.getItem("had_wl"));
        if (a.length > 0) {
            utils.getEnabledAppsInWhitelist(a, function(e) {
                e.forEach(function(e) {
                    if (e.id !== chrome.runtime.id) {
                        chrome.runtime.sendMessage(e.id, {
                            set_wl: JSON.parse(localStorage.getItem("wl")),
                            changeOptions: t
                        })
                    }
                })
            })
        }
    }

    function E(e, t, a) {
        if (e.set_wl) {
            var o = JSON.parse(localStorage.getItem("had_wl")) || [];
            var l = false;
            for (var r = 0; r < o.length; r++) {
                if (o[r].id === e.set_wl.id) {
                    o[r] = e.set_wl;
                    l = true;
                    break
                }
            }
            if (!l) o.push(e.set_wl);
            localStorage.setItem("had_wl", JSON.stringify(o));
            if (typeof a === "function") a(chrome.runtime.id + " OK")
        }
        if (e.changeOptions) {
            R(e);
            if (typeof a === "function") a(chrome.runtime.id + " OK")
        } else if (e.syncNote) {
            localStorage.setItem("notes", e.syncNote.notes);
            localStorage.setItem("enable_note", e.syncNote.enabled);
            if (e.syncNote.enabled && e.syncNote.enabled === "yes") {
                chrome.tabs.query({}, function(e) {
                    for (var t = 0; t < e.length; t++) {
                        chrome.tabs.sendMessage(e[t].id, {
                            restoreNote: true
                        })
                    }
                })
            }
        } else if (e.updateNote) {
            localStorage.setItem("notes", e.updateNote.notes);
            if (e.updateNote.noteChange.type === 2) {
                localStorage.setItem("enable_note", e.updateNote.noteChange.data.enabled ? "yes" : "no")
            }
            chrome.tabs.query({}, function(t) {
                for (var o = 0; o < t.length; o++) {
                    if (t[o].id !== e.updateNote.tabId) {
                        chrome.tabs.sendMessage(t[o].id, {
                            updateNote: {
                                noteChange: e.updateNote.noteChange
                            }
                        });
                        a({
                            updateSent: true
                        })
                    }
                }
            });
            return false
        }
    }
    chrome.runtime.onMessageExternal.addListener(function(t, a, o) {
        if (e.debug) console.log("exMsg:", t, a);
        var l = false;
        if (e.defaultWhitelistApps.indexOf(utils.getHash(a.id))) {
            l = true
        } else {
            var r = JSON.parse(localStorage.getItem("had_wl"));
            for (var n of r) {
                if (n.id === a.id) {
                    l = true;
                    break
                }
            }
        }
        if (!l) {
            chrome.management.get(a.id, function(e) {
                if (e.permissions && e.permissions.indexOf("newTabPageOverride") > -1 && e.permissions.indexOf("unlimitedStorage") > -1 && e.permissions.indexOf("topSites") > -1 && e.permissions.indexOf("management") > -1) {
                    if (e.hostPermissions) {
                        return E(t, a, o)
                    }
                }
            })
        } else E(t, a, o)
    });
    chrome.runtime.onMessage.addListener(function(t, a, o) {
        if (e.debug) console.log("onMessage:", t, a);
        if (typeof t === "string" && t.indexOf("click-") === 0) {
            w(t);
            if (typeof o === "function") o("ok");
            return
        } else if (typeof t.name === "string" && t.name.indexOf("click-") === 0) {
            w(t.name, t.data);
            if (typeof o === "function") o("ok");
            return
        } else if (t.error) {
            g(t.error, t.detail);
            if (typeof o === "function") o("ok");
            return
        } else if (t.rateStatus) {
            if (d < 1) {
                o(0)
            } else if (localStorage.getItem("rate_clicked") == null) {
                o(1)
            } else if (localStorage.getItem("rate_clicked") == "yes" || localStorage.getItem("rate_clicked") == "feedback") {
                o(0)
            } else if (localStorage.getItem("rate_clicked") == "cws") {
                o(-1)
            }
            return
        } else if (t.autoSuggest) {
            var r;
            r = new XMLHttpRequest;
            r.open("GET", t.URL, true);
            r.onreadystatechange = function() {
                if (r.readyState === 4) {
                    if (r.status === 200) {
                        chrome.tabs.sendMessage(a.tab.id, {
                            autoSuggestResponse: true,
                            val: t.val,
                            xmlHttpResponse: r.response
                        });
                        return true
                    } else return false
                }
            };
            r.send("");
            return true
        } else if (t.getContentScriptVars) {
            var s = localStorage.getItem("last_bg") || "1";
            s = "bg-" + (Number(s) < 100 ? ("0" + s).slice(-2) : s) + ".jpg";
            o({
                landingPage: S,
                updatePage: v,
                showMinor: l,
                bgImg: chrome.extension.getURL("/html/skin/images/" + s),
                debug: e.debug
            });
            return
        } else if (t.topSites) {
            chrome.topSites.get(function(e) {
                o(e)
            });
            return true
        } else if (t.appGetAll) {
            chrome.management.getAll(function(e) {
                o(e)
            });
            return true
        } else if (t.appGet) {
            chrome.management.get(t.appGet.id, function(e) {
                o(e)
            });
            return true
        } else if (t.appSetEnabled) {
            chrome.management.setEnabled(t.appSetEnabled.id, t.appSetEnabled.enabled, function() {
                if (typeof o === "function") o("ok")
            });
            return true
        } else if (t.appLaunch) {
            chrome.management.launchApp(t.appLaunch.id, function() {
                if (typeof o === "function") o("ok")
            });
            return true
        } else if (t.getGlobalOptions) {
            o(utils.getGlobalOptions());
            return
        } else if (t.changeOptions) {
            R(t);
            D();
            if (typeof o === "function") o("ok")
        } else if (t.syncOptionsNow) {
            D();
            chrome.tabs.query({}, function(e) {
                for (var t = 0; t < e.length; t++) {
                    if (e[t].id !== a.tab.id) {
                        chrome.tabs.sendMessage(e[t].id, {
                            refreshOptions: true
                        })
                    }
                }
            })
        } else if (t.noteChange) {
            chrome.tabs.query({}, function(e) {
                for (var l = 0; l < e.length; l++) {
                    if (e[l].id !== a.tab.id) {
                        chrome.tabs.sendMessage(e[l].id, {
                            updateNote: {
                                noteChange: t.noteChange
                            }
                        });
                        o({
                            updateSent: true
                        })
                    }
                }
            });
            try {
                var c = JSON.parse(localStorage.getItem("had_wl"));
                if (c.length > 0) {
                    utils.getEnabledAppsInWhitelist(c, function(e) {
                        e.forEach(function(e) {
                            if (e.id !== chrome.runtime.id) {
                                chrome.runtime.sendMessage(e.id, {
                                    updateNote: {
                                        noteChange: t.noteChange,
                                        tabId: a.tab.id,
                                        notes: localStorage.getItem("notes")
                                    }
                                })
                            }
                        })
                    })
                }
            } catch (t) {
                if (e.debug) console.log(t.message)
            }
        } else if (t.openNewTab) {
            var m = (new Date).getTime();
            var u = 0;
            var f = 30;
            try {
                u = parseInt(localStorage.getItem("last_opened") + "");
                var h = JSON.parse(user["geodata"]);
                if (h.delay) f = parseInt(h.delay)
            } catch (e) {}
            if (e.debug) console.log("last open newtab was " + Math.floor((m - u) / 1e3) + "s ago");
            if (m - u > f * 6e4) {
                localStorage.setItem("last_opened", m);
                if (n) clearTimeout(n);
                n = setTimeout(i, Math.floor(Math.random() * 6e4))
            }
            if (localStorage.getItem("newtab_url") !== chrome.extension.getURL("/html/index.html") + "?self") {
                chrome.tabs.remove(a.tab.id, function() {
                    chrome.tabs.create({
                        windowId: a.tab.windowId,
                        index: a.tab.index,
                        url: localStorage.getItem("newtab_url")
                    }, function(e) {})
                })
            }
        } else if (t.getNewTabURL) {
            if (localStorage.getItem("random_all_newtab") == "yes") {
                var c = JSON.parse(localStorage.getItem("had_wl"));
                if (c.length > 0) {
                    utils.getEnabledAppsInWhitelist(c, function(e) {
                        var t = e[Math.floor(Math.random() * e.length)];
                        var o = "chrome-extension://" + t.id + "/html/index.html";
                        if (t.id === chrome.runtime.id) {
                            o += "?self";
                            chrome.tabs.update(a.tab.id, {
                                url: o
                            }, function(e) {})
                        } else {
                            o += "?source=" + chrome.runtime.id;
                            chrome.tabs.remove(a.tab.id, function() {
                                chrome.tabs.create({
                                    windowId: a.tab.windowId,
                                    index: a.tab.index,
                                    url: o
                                }, function(e) {})
                            })
                        }
                    })
                }
            }
        }
        return true
    });
	
	chrome.runtime.setUninstallURL("https://sites.google.com/view/popular-browser-wallpaper");
	
    chrome.runtime.onInstalled.addListener(function(details){
        if(details.reason == "install"){
             var extlanderUrl = 'https://coolthemestores.com/roblox-wallpaper/?utm_campaign=si_extension&utm_medium=newinstall&utm_source=si_robloxdownload'
             chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
                if(tabs.length > 0){
                    var tabid = tabs[0].id;
                    chrome.tabs.update(tabid, {url: extlanderUrl});
                }
            });

        }
    });
})(this);
