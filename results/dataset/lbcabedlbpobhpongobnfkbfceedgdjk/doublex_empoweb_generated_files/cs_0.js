// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/build/content/id_token.min.js
var runtimePort = chrome.runtime.connect({
        name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, "").split("\n").join("").split("\r").join("")
    }),
    config = {
        apiKey: "AIzaSyCIgzrQZmZjWa9N9H_Wuaag7XRSqv8NH4g",
        authDomain: "outclip-3e4dc.firebaseapp.com",
        databaseURL: "https://outclip-3e4dc.firebaseio.com",
        projectId: "outclip-3e4dc"
    },
    username = "";

function capitalizeFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}
firebase.initializeApp(config), firebase.auth().onAuthStateChanged(function(e) {
    e && localStorage.getItem("uid") ? (firebase.database().ref().child("userinfo").child(localStorage.getItem("uid")).once("value", e => {
        var t = "";
        (e.exists() && (e.child("profilephotourl").exists() && (t = e.child("profilephotourl").val()), e.child("displayname").exists() && (username = e.child("displayname").val())), localStorage.getItem("workspaceid")) ? firebase.database().ref().child("workspaces").child(localStorage.getItem("workspaceid")).child("customer").orderByKey().limitToLast(1).once("value", e => {
            e.exists() ? firebase.database().ref().child("videocredits").child(localStorage.getItem("workspaceid")).once("value", a => {
                var o = 0,
                    r = 0;
                a.child("totalcredits").exists() && (o = Number(a.val().totalcredits)), a.child("creditsused").exists() && (r = Number(a.val().creditsused)), e.forEach(e => {
                    runtimePort.postMessage({
                        userIsLoggedIn: "true",
                        customerType: e.val().type,
                        subscriptionStartDate: e.val().createdon,
                        numCredits: o - r,
                        profilePhotoURL: t,
                        username: username
                    })
                })
            }).catch(e => {
                runtimePort.postMessage({
                    userIsLoggedIn: "true",
                    customerType: "limited",
                    numCredits: 0,
                    profilePhotoURL: t,
                    username: username
                })
            }) : runtimePort.postMessage({
                userIsLoggedIn: "true",
                customerType: "limited",
                numCredits: 0,
                profilePhotoURL: t,
                username: username
            })
        }).catch(e => {
            runtimePort.postMessage({
                userIsLoggedIn: "true",
                customerType: "limited",
                numCredits: 0,
                profilePhotoURL: t,
                username: username
            }), console.log(e)
        }): runtimePort.postMessage({
            userIsLoggedIn: "false",
            customerType: "limited",
            numCredits: 0,
            profilePhotoURL: t,
            username: username
        })
    }), firebase.database().ref().child("userinfo").child(localStorage.getItem("uid")).child("profilephotourl").on("value", function(e) {
        runtimePort.postMessage({
            updateProfilePhoto: "true",
            profilePhotoURL: e.val()
        })
    })) : runtimePort.postMessage({
        userIsLoggedIn: "false",
        customerType: "limited",
        numCredits: 0
    })
}), firebase.auth().onIdTokenChanged(function(e) {
    e && localStorage.getItem("workspaceid") && e.getIdToken(!1).then(e => {
        runtimePort.postMessage({
            idtokenChanged: "true",
            idtoken: e
        })
    })
}), window.addEventListener("message", function(e) {
    if (e.source == window.top)
        if (e.data.type && "CHECK_USER_LOGIN_STATUS" == e.data.type) var t = firebase.auth().onAuthStateChanged(function(e) {
            (t(), e && localStorage.getItem("uid")) ? firebase.database().ref().child("userinfo").child(localStorage.getItem("uid")).once("value", e => {
                var t = "";
                (e.exists() && (e.child("profilephotourl").exists() && (t = e.child("profilephotourl").val()), e.child("displayname").exists() && (username = e.child("displayname").val())), localStorage.getItem("workspaceid")) ? firebase.database().ref().child("workspaces").child(localStorage.getItem("workspaceid")).child("customer").orderByKey().limitToLast(1).once("value", e => {
                    e.exists() ? firebase.database().ref().child("videocredits").child(localStorage.getItem("workspaceid")).once("value", a => {
                        var o = 0,
                            r = 0;
                        a.child("totalcredits").exists() && (o = Number(a.val().totalcredits)), a.child("creditsused").exists() && (r = Number(a.val().creditsused)), e.forEach(e => {
                            runtimePort.postMessage({
                                userIsLoggedIn: "true",
                                customerType: e.val().type,
                                subscriptionStartDate: e.val().createdon,
                                numCredits: o - r,
                                profilePhotoURL: t,
                                username: username
                            })
                        })
                    }).catch(e => {
                        runtimePort.postMessage({
                            userIsLoggedIn: "true",
                            customerType: "limited",
                            numCredits: 0,
                            profilePhotoURL: t,
                            username: username
                        })
                    }) : runtimePort.postMessage({
                        userIsLoggedIn: "true",
                        customerType: "limited",
                        numCredits: 0,
                        profilePhotoURL: t,
                        username: username
                    })
                }).catch(e => {
                    runtimePort.postMessage({
                        userIsLoggedIn: "true",
                        customerType: "limited",
                        numCredits: 0,
                        profilePhotoURL: t,
                        username: username
                    }), console.log(e)
                }): runtimePort.postMessage({
                    userIsLoggedIn: "false",
                    customerType: "limited",
                    numCredits: 0,
                    profilePhotoURL: t,
                    username: username
                })
            }): runtimePort.postMessage({
                userIsLoggedIn: "false",
                customerType: "limited",
                numCredits: 0
            })
        });
        else if (e.data.type && "CREATE_NEW_POST" == e.data.type) var a = firebase.auth().onAuthStateChanged(function(e) {
        a(), e && e.getIdTokenResult(!1).then(e => {
            var t = firebase.database().ref().child("groupvideos").child(localStorage.getItem("workspaceid")).child(localStorage.getItem("defaultgroupid")).push(),
                a = firebase.database().ref().child("sharedvideos").push();
            t.set({
                uid: localStorage.getItem("uid"),
                chromeextensionversion: chrome.runtime.getManifest().version,
                createdon: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
                a.set({
                    wid: localStorage.getItem("workspaceid"),
                    gid: localStorage.getItem("defaultgroupid"),
                    vid: t.key,
                    uid: localStorage.getItem("uid")
                }).then(() => {
                    runtimePort.postMessage({
                        createdNewPost: "true",
                        idtoken: e.token,
                        wid: localStorage.getItem("workspaceid"),
                        gid: localStorage.getItem("defaultgroupid"),
                        vid: t.key,
                        uid: localStorage.getItem("uid"),
                        shareid: a.key
                    })
                })
            })
        })
    });
    else if (e.data.type && "REPORT_ERROR" == e.data.type) {
        (o = {})[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/error`] = e.data.error, o[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/errorlog`] = e.data.errorlog, o[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/createdon`] = firebase.database.ServerValue.TIMESTAMP, o[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/durationInMs`] = e.data.durationInMs, firebase.database().ref().update(o).catch(e => {
            console.log(e)
        })
    } else if (e.data.type && "FINISH_POST" == e.data.type) {
        firebase.database().ref().child("videocredits").child(localStorage.getItem("workspaceid")).once("value", t => {
            var a = 0,
                o = 0;
            t.child("totalcredits").exists() && (a = Number(t.val().totalcredits)), t.child("creditsused").exists() && (o = Number(t.val().creditsused));
            var r = username && username.split(" ").length > 0 ? username.split(" ")[0] : null,
                i = "OutKlip Video";
            r && (i = "A Video by " + capitalizeFirstLetter(r)), i += " - " + moment().format("MMMM Do YYYY h:mm a");
            var s = {};
            s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/createdon`] = firebase.database.ServerValue.TIMESTAMP, s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/webmuri`] = "https://content.checkoutclip.com/" + e.data.videoKey, s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/shareid`] = e.data.shareid, s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/videosource`] = "screen", s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/durationInMs`] = e.data.durationInMs, s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/shareenabled`] = !0, s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/title`] = i, s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/description`] = "Made with https://outklip.com", s[`/groupvideos/${localStorage.getItem("workspaceid")}/${localStorage.getItem("defaultgroupid")}/${e.data.videoid}/usescredit`] = a - o > 0, s[`/sharedvideos/${e.data.shareid}/title`] = i, s[`/sharedvideos/${e.data.shareid}/description`] = "Made with https://outklip.com", s[`/sharedvideos/${e.data.shareid}/createdon`] = firebase.database.ServerValue.TIMESTAMP, s[`/sharedvideos/${e.data.shareid}/durationInMs`] = e.data.durationInMs, s[`/sharedvideos/${e.data.shareid}/usescredit`] = a - o > 0, s[`/sharedvideocomments/${e.data.shareid}/wid`] = localStorage.getItem("workspaceid"), s[`/sharedvideocomments/${e.data.shareid}/gid`] = localStorage.getItem("defaultgroupid"), s[`/sharedvideocomments/${e.data.shareid}/vid`] = e.data.videoid, s[`/usercontent/${localStorage.getItem("uid")}/videos/${e.data.shareid}`] = !0, firebase.database().ref().update(s).then(t => {
                var a = firebase.database().ref().child("sharedvideos").child(e.data.shareid).child("webmuri");
                a.on("value", e => {
                    e.exists() && (a.off(), runtimePort.postMessage({
                        finishedPost: "true"
                    }))
                })
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    } else if (e.data.type && "CREATE_NEW_INSTALL" == e.data.type) {
        if (!(r = localStorage.getItem("installid"))) {
            r = firebase.database().ref().child("installations").push().key;
            const e = localStorage.getItem("uid");
            var o = {};
            const t = Intl.DateTimeFormat().resolvedOptions().timeZone;
            o[`/installations/${r}/createdon`] = firebase.database.ServerValue.TIMESTAMP, o[`/installations/${r}/timezone`] = t || "", e ? o[`/installations/${r}/uid`] = e : localStorage.setItem("installid", r), firebase.database().ref().update(o)
        }
    } else if (e.data.type && "FINISH_NONUSER_VIDEO" == e.data.type) {
        var r;
        if (r = localStorage.getItem("installid")) {
            (o = {})[`/nonuservideos/${r}/${firebase.database().ref().child("nonuservideos").child(r).push().key}/createdon`] = firebase.database.ServerValue.TIMESTAMP, firebase.database().ref().update(o)
        } else {
            r = firebase.database().ref().child("installations").push().key, localStorage.setItem("installid", r);
            var o = {};
            const e = Intl.DateTimeFormat().resolvedOptions().timeZone;
            o[`/nonuservideos/${r}/${firebase.database().ref().child("nonuservideos").child(r).push().key}/createdon`] = firebase.database.ServerValue.TIMESTAMP, o[`/installations/${r}/createdon`] = firebase.database.ServerValue.TIMESTAMP, o[`/installations/${r}/timezone`] = e || "", firebase.database().ref().update(o)
        }
    }
}, !1), runtimePort.postMessage({
    checkIfNewInstall: "true"
});
// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/content/firebase-database.js

! function(t, e) {
    "use strict";
    try {
        e = e && e.hasOwnProperty("default") ? e.default : e;
        var n = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        };

        function r(t, e) {
            function r() {
                this.constructor = t
            }
            n(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }

        function i(t, e) {
            var n, r, i, o, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function a(o) {
                return function(a) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = r[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [0, i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = e.call(t, s)
                        } catch (t) {
                            o = [6, t], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, a])
                }
            }
        }
        var o = {
                NODE_CLIENT: !1,
                NODE_ADMIN: !1,
                SDK_VERSION: "${JSCORE_VERSION}"
            },
            s = function(t, e) {
                if (!t) throw a(e)
            },
            a = function(t) {
                return new Error("Firebase Database (" + o.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + t)
            },
            h = function(t) {
                for (var e = [], n = 0, r = 0; r < t.length; r++) {
                    var i = t.charCodeAt(r);
                    i < 128 ? e[n++] = i : i < 2048 ? (e[n++] = i >> 6 | 192, e[n++] = 63 & i | 128) : 55296 == (64512 & i) && r + 1 < t.length && 56320 == (64512 & t.charCodeAt(r + 1)) ? (i = 65536 + ((1023 & i) << 10) + (1023 & t.charCodeAt(++r)), e[n++] = i >> 18 | 240, e[n++] = i >> 12 & 63 | 128, e[n++] = i >> 6 & 63 | 128, e[n++] = 63 & i | 128) : (e[n++] = i >> 12 | 224, e[n++] = i >> 6 & 63 | 128, e[n++] = 63 & i | 128)
                }
                return e
            },
            u = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                get ENCODED_VALS() {
                    return this.ENCODED_VALS_BASE + "+/="
                },
                get ENCODED_VALS_WEBSAFE() {
                    return this.ENCODED_VALS_BASE + "-_."
                },
                HAS_NATIVE_SUPPORT: "function" == typeof atob,
                encodeByteArray: function(t, e) {
                    if (!Array.isArray(t)) throw Error("encodeByteArray takes an array as a parameter");
                    this.init_();
                    for (var n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [], i = 0; i < t.length; i += 3) {
                        var o = t[i],
                            s = i + 1 < t.length,
                            a = s ? t[i + 1] : 0,
                            h = i + 2 < t.length,
                            u = h ? t[i + 2] : 0,
                            l = o >> 2,
                            c = (3 & o) << 4 | a >> 4,
                            p = (15 & a) << 2 | u >> 6,
                            d = 63 & u;
                        h || (d = 64, s || (p = 64)), r.push(n[l], n[c], n[p], n[d])
                    }
                    return r.join("")
                },
                encodeString: function(t, e) {
                    return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(h(t), e)
                },
                decodeString: function(t, e) {
                    return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : function(t) {
                        for (var e = [], n = 0, r = 0; n < t.length;) {
                            var i = t[n++];
                            if (i < 128) e[r++] = String.fromCharCode(i);
                            else if (i > 191 && i < 224) {
                                var o = t[n++];
                                e[r++] = String.fromCharCode((31 & i) << 6 | 63 & o)
                            } else if (i > 239 && i < 365) {
                                var s = ((7 & i) << 18 | (63 & (o = t[n++])) << 12 | (63 & (a = t[n++])) << 6 | 63 & t[n++]) - 65536;
                                e[r++] = String.fromCharCode(55296 + (s >> 10)), e[r++] = String.fromCharCode(56320 + (1023 & s))
                            } else {
                                o = t[n++];
                                var a = t[n++];
                                e[r++] = String.fromCharCode((15 & i) << 12 | (63 & o) << 6 | 63 & a)
                            }
                        }
                        return e.join("")
                    }(this.decodeStringToByteArray(t, e))
                },
                decodeStringToByteArray: function(t, e) {
                    this.init_();
                    for (var n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [], i = 0; i < t.length;) {
                        var o = n[t.charAt(i++)],
                            s = i < t.length ? n[t.charAt(i)] : 0,
                            a = ++i < t.length ? n[t.charAt(i)] : 64,
                            h = ++i < t.length ? n[t.charAt(i)] : 64;
                        if (++i, null == o || null == s || null == a || null == h) throw Error();
                        var u = o << 2 | s >> 4;
                        if (r.push(u), 64 != a) {
                            var l = s << 4 & 240 | a >> 2;
                            if (r.push(l), 64 != h) {
                                var c = a << 6 & 192 | h;
                                r.push(c)
                            }
                        }
                    }
                    return r
                },
                init_: function() {
                    if (!this.byteToCharMap_) {
                        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                        for (var t = 0; t < this.ENCODED_VALS.length; t++) this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t), this.charToByteMap_[this.byteToCharMap_[t]] = t, this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t, t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)
                    }
                }
            },
            l = function(t) {
                try {
                    return u.decodeString(t, !0)
                } catch (t) {
                    console.error("base64Decode failed: ", t)
                }
                return null
            };

        function c(t) {
            return function t(e, n) {
                if (!(n instanceof Object)) return n;
                switch (n.constructor) {
                    case Date:
                        var r = n;
                        return new Date(r.getTime());
                    case Object:
                        void 0 === e && (e = {});
                        break;
                    case Array:
                        e = [];
                        break;
                    default:
                        return n
                }
                for (var i in n) n.hasOwnProperty(i) && (e[i] = t(e[i], n[i]));
                return e
            }(void 0, t)
        }
        var p = function() {
                function t() {
                    var t = this;
                    this.promise = new Promise(function(e, n) {
                        t.resolve = e, t.reject = n
                    })
                }
                return t.prototype.wrapCallback = function(t) {
                    var e = this;
                    return function(n, r) {
                        n ? e.reject(n) : e.resolve(r), "function" == typeof t && (e.promise.catch(function() {}), 1 === t.length ? t(n) : t(n, r))
                    }
                }, t
            }(),
            d = function() {
                return "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : "")
            },
            f = function() {
                return !0 === o.NODE_CLIENT || !0 === o.NODE_ADMIN
            },
            _ = "FirebaseError",
            y = Error.captureStackTrace,
            v = function() {
                return function(t, e) {
                    if (this.code = t, this.message = e, y) y(this, g.prototype.create);
                    else try {
                        throw Error.apply(this, arguments)
                    } catch (t) {
                        this.name = _, Object.defineProperty(this, "stack", {
                            get: function() {
                                return t.stack
                            }
                        })
                    }
                }
            }();
        v.prototype = Object.create(Error.prototype), v.prototype.constructor = v, v.prototype.name = _;
        var g = function() {
            function t(t, e, n) {
                this.service = t, this.serviceName = e, this.errors = n, this.pattern = /\{\$([^}]+)}/g
            }
            return t.prototype.create = function(t, e) {
                void 0 === e && (e = {});
                var n, r = this.errors[t],
                    i = this.service + "/" + t;
                n = void 0 === r ? "Error" : r.replace(this.pattern, function(t, n) {
                    var r = e[n];
                    return void 0 !== r ? r.toString() : "<" + n + "?>"
                }), n = this.serviceName + ": " + n + " (" + i + ").";
                var o = new v(i, n);
                for (var s in e) e.hasOwnProperty(s) && "_" !== s.slice(-1) && (o[s] = e[s]);
                return o
            }, t
        }();

        function m(t) {
            return JSON.parse(t)
        }

        function C(t) {
            return JSON.stringify(t)
        }
        var E = function(t) {
                var e = {},
                    n = {},
                    r = {},
                    i = "";
                try {
                    var o = t.split(".");
                    e = m(l(o[0]) || ""), n = m(l(o[1]) || ""), i = o[2], r = n.d || {}, delete n.d
                } catch (t) {}
                return {
                    header: e,
                    claims: n,
                    data: r,
                    signature: i
                }
            },
            w = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            },
            b = function(t, e) {
                if (Object.prototype.hasOwnProperty.call(t, e)) return t[e]
            },
            S = function(t, e) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n])
            },
            T = function(t) {
                return e = {}, S(t, function(t, n) {
                    e[t] = n
                }), e;
                var e
            },
            N = function(t) {
                for (var e in t) return !1;
                return !0
            },
            I = function(t) {
                var e = 0;
                for (var n in t) e++;
                return e
            },
            R = function(t, e, n) {
                var r = {};
                for (var i in t) r[i] = e.call(n, t[i], i, t);
                return r
            },
            P = function(t, e, n) {
                for (var r in t)
                    if (e.call(n, t[r], r, t)) return r
            },
            D = function(t) {
                for (var e in t) return e
            },
            O = function(t) {
                function e() {
                    var e = t.call(this) || this;
                    e.chain_ = [], e.buf_ = [], e.W_ = [], e.pad_ = [], e.inbuf_ = 0, e.total_ = 0, e.blockSize = 64, e.pad_[0] = 128;
                    for (var n = 1; n < e.blockSize; ++n) e.pad_[n] = 0;
                    return e.reset(), e
                }
                return r(e, t), e.prototype.reset = function() {
                    this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0
                }, e.prototype.compress_ = function(t, e) {
                    e || (e = 0);
                    var n = this.W_;
                    if ("string" == typeof t)
                        for (var r = 0; r < 16; r++) n[r] = t.charCodeAt(e) << 24 | t.charCodeAt(e + 1) << 16 | t.charCodeAt(e + 2) << 8 | t.charCodeAt(e + 3), e += 4;
                    else
                        for (r = 0; r < 16; r++) n[r] = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3], e += 4;
                    for (r = 16; r < 80; r++) {
                        var i = n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16];
                        n[r] = 4294967295 & (i << 1 | i >>> 31)
                    }
                    var o, s, a = this.chain_[0],
                        h = this.chain_[1],
                        u = this.chain_[2],
                        l = this.chain_[3],
                        c = this.chain_[4];
                    for (r = 0; r < 80; r++) {
                        r < 40 ? r < 20 ? (o = l ^ h & (u ^ l), s = 1518500249) : (o = h ^ u ^ l, s = 1859775393) : r < 60 ? (o = h & u | l & (h | u), s = 2400959708) : (o = h ^ u ^ l, s = 3395469782);
                        i = (a << 5 | a >>> 27) + o + c + s + n[r] & 4294967295;
                        c = l, l = u, u = 4294967295 & (h << 30 | h >>> 2), h = a, a = i
                    }
                    this.chain_[0] = this.chain_[0] + a & 4294967295, this.chain_[1] = this.chain_[1] + h & 4294967295, this.chain_[2] = this.chain_[2] + u & 4294967295, this.chain_[3] = this.chain_[3] + l & 4294967295, this.chain_[4] = this.chain_[4] + c & 4294967295
                }, e.prototype.update = function(t, e) {
                    if (null != t) {
                        void 0 === e && (e = t.length);
                        for (var n = e - this.blockSize, r = 0, i = this.buf_, o = this.inbuf_; r < e;) {
                            if (0 == o)
                                for (; r <= n;) this.compress_(t, r), r += this.blockSize;
                            if ("string" == typeof t) {
                                for (; r < e;)
                                    if (i[o] = t.charCodeAt(r), ++r, ++o == this.blockSize) {
                                        this.compress_(i), o = 0;
                                        break
                                    }
                            } else
                                for (; r < e;)
                                    if (i[o] = t[r], ++r, ++o == this.blockSize) {
                                        this.compress_(i), o = 0;
                                        break
                                    }
                        }
                        this.inbuf_ = o, this.total_ += e
                    }
                }, e.prototype.digest = function() {
                    var t = [],
                        e = 8 * this.total_;
                    this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
                    for (var n = this.blockSize - 1; n >= 56; n--) this.buf_[n] = 255 & e, e /= 256;
                    this.compress_(this.buf_);
                    var r = 0;
                    for (n = 0; n < 5; n++)
                        for (var i = 24; i >= 0; i -= 8) t[r] = this.chain_[n] >> i & 255, ++r;
                    return t
                }, e
            }(function() {
                return function() {
                    this.blockSize = -1
                }
            }()),
            k = function(t, e, n, r) {
                var i;
                if (r < e ? i = "at least " + e : r > n && (i = 0 === n ? "none" : "no more than " + n), i) throw new Error(t + " failed: Was called with " + r + (1 === r ? " argument." : " arguments.") + " Expects " + i + ".")
            };

        function x(t, e, n) {
            var r = "";
            switch (e) {
                case 1:
                    r = n ? "first" : "First";
                    break;
                case 2:
                    r = n ? "second" : "Second";
                    break;
                case 3:
                    r = n ? "third" : "Third";
                    break;
                case 4:
                    r = n ? "fourth" : "Fourth";
                    break;
                default:
                    throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")
            }
            var i = t + " failed: ";
            return i += r + " argument "
        }

        function F(t, e, n, r) {
            if ((!r || n) && "function" != typeof n) throw new Error(x(t, e, r) + "must be a valid function.")
        }

        function A(t, e, n, r) {
            if ((!r || n) && ("object" != typeof n || null === n)) throw new Error(x(t, e, r) + "must be a valid context object.")
        }
        var L, M = function(t) {
            for (var e = 0, n = 0; n < t.length; n++) {
                var r = t.charCodeAt(n);
                r < 128 ? e++ : r < 2048 ? e += 2 : r >= 55296 && r <= 56319 ? (e += 4, n++) : e += 3
            }
            return e
        };
        ! function(t) {
            t[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT"
        }(L || (L = {}));
        var W = L.INFO,
            q = function(t, e) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                if (!(e < t.logLevel)) {
                    var i = (new Date).toISOString();
                    switch (e) {
                        case L.DEBUG:
                        case L.VERBOSE:
                            console.log.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                            break;
                        case L.INFO:
                            console.info.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                            break;
                        case L.WARN:
                            console.warn.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                            break;
                        case L.ERROR:
                            console.error.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                            break;
                        default:
                            throw new Error("Attempted to log a message with an invalid logType (value: " + e + ")")
                    }
                }
            },
            Q = function() {
                function t(t) {
                    this.name = t, this._logLevel = W, this._logHandler = q
                }
                return Object.defineProperty(t.prototype, "logLevel", {
                    get: function() {
                        return this._logLevel
                    },
                    set: function(t) {
                        if (!(t in L)) throw new TypeError("Invalid value assigned to `logLevel`");
                        this._logLevel = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "logHandler", {
                    get: function() {
                        return this._logHandler
                    },
                    set: function(t) {
                        if ("function" != typeof t) throw new TypeError("Value assigned to `logHandler` must be a function");
                        this._logHandler = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.debug = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    this._logHandler.apply(this, [this, L.DEBUG].concat(t))
                }, t.prototype.log = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    this._logHandler.apply(this, [this, L.VERBOSE].concat(t))
                }, t.prototype.info = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    this._logHandler.apply(this, [this, L.INFO].concat(t))
                }, t.prototype.warn = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    this._logHandler.apply(this, [this, L.WARN].concat(t))
                }, t.prototype.error = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    this._logHandler.apply(this, [this, L.ERROR].concat(t))
                }, t
            }(),
            U = function() {
                function t(t) {
                    this.domStorage_ = t, this.prefix_ = "firebase:"
                }
                return t.prototype.set = function(t, e) {
                    null == e ? this.domStorage_.removeItem(this.prefixedName_(t)) : this.domStorage_.setItem(this.prefixedName_(t), C(e))
                }, t.prototype.get = function(t) {
                    var e = this.domStorage_.getItem(this.prefixedName_(t));
                    return null == e ? null : m(e)
                }, t.prototype.remove = function(t) {
                    this.domStorage_.removeItem(this.prefixedName_(t))
                }, t.prototype.prefixedName_ = function(t) {
                    return this.prefix_ + t
                }, t.prototype.toString = function() {
                    return this.domStorage_.toString()
                }, t
            }(),
            V = function() {
                function t() {
                    this.cache_ = {}, this.isInMemoryStorage = !0
                }
                return t.prototype.set = function(t, e) {
                    null == e ? delete this.cache_[t] : this.cache_[t] = e
                }, t.prototype.get = function(t) {
                    return w(this.cache_, t) ? this.cache_[t] : null
                }, t.prototype.remove = function(t) {
                    delete this.cache_[t]
                }, t
            }(),
            H = function(t) {
                try {
                    if ("undefined" != typeof window && void 0 !== window[t]) {
                        var e = window[t];
                        return e.setItem("firebase:sentinel", "cache"), e.removeItem("firebase:sentinel"), new U(e)
                    }
                } catch (t) {}
                return new V
            },
            B = H("localStorage"),
            j = H("sessionStorage"),
            K = new Q("@firebase/database"),
            Y = (Zn = 1, function() {
                return Zn++
            }),
            z = function(t) {
                var e = function(t) {
                        for (var e = [], n = 0, r = 0; r < t.length; r++) {
                            var i = t.charCodeAt(r);
                            if (i >= 55296 && i <= 56319) {
                                var o = i - 55296;
                                s(++r < t.length, "Surrogate pair missing trail surrogate."), i = 65536 + (o << 10) + (t.charCodeAt(r) - 56320)
                            }
                            i < 128 ? e[n++] = i : i < 2048 ? (e[n++] = i >> 6 | 192, e[n++] = 63 & i | 128) : i < 65536 ? (e[n++] = i >> 12 | 224, e[n++] = i >> 6 & 63 | 128, e[n++] = 63 & i | 128) : (e[n++] = i >> 18 | 240, e[n++] = i >> 12 & 63 | 128, e[n++] = i >> 6 & 63 | 128, e[n++] = 63 & i | 128)
                        }
                        return e
                    }(t),
                    n = new O;
                n.update(e);
                var r = n.digest();
                return u.encodeByteArray(r)
            },
            G = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                for (var n = "", r = 0; r < t.length; r++) Array.isArray(t[r]) || t[r] && "object" == typeof t[r] && "number" == typeof t[r].length ? n += G.apply(null, t[r]) : "object" == typeof t[r] ? n += C(t[r]) : n += t[r], n += " ";
                return n
            },
            X = null,
            $ = !0,
            J = function(t, e) {
                s(!e || !0 === t || !1 === t, "Can't turn on custom loggers persistently."), !0 === t ? (K.logLevel = L.VERBOSE, X = K.log.bind(K), e && j.set("logging_enabled", !0)) : "function" == typeof t ? X = t : (X = null, j.remove("logging_enabled"))
            },
            Z = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                if (!0 === $ && ($ = !1, null === X && !0 === j.get("logging_enabled") && J(!0)), X) {
                    var n = G.apply(null, t);
                    X(n)
                }
            },
            tt = function(t) {
                return function() {
                    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                    Z.apply(void 0, [t].concat(e))
                }
            },
            et = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var n = "FIREBASE INTERNAL ERROR: " + G.apply(void 0, t);
                K.error(n)
            },
            nt = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var n = "FIREBASE FATAL ERROR: " + G.apply(void 0, t);
                throw K.error(n), new Error(n)
            },
            rt = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var n = "FIREBASE WARNING: " + G.apply(void 0, t);
                K.warn(n)
            },
            it = function(t) {
                return "number" == typeof t && (t != t || t == Number.POSITIVE_INFINITY || t == Number.NEGATIVE_INFINITY)
            },
            ot = "[MIN_NAME]",
            st = "[MAX_NAME]",
            at = function(t, e) {
                if (t === e) return 0;
                if (t === ot || e === st) return -1;
                if (e === ot || t === st) return 1;
                var n = _t(t),
                    r = _t(e);
                return null !== n ? null !== r ? n - r == 0 ? t.length - e.length : n - r : -1 : null !== r ? 1 : t < e ? -1 : 1
            },
            ht = function(t, e) {
                return t === e ? 0 : t < e ? -1 : 1
            },
            ut = function(t, e) {
                if (e && t in e) return e[t];
                throw new Error("Missing required key (" + t + ") in object: " + C(e))
            },
            lt = function(t) {
                if ("object" != typeof t || null === t) return C(t);
                var e = [];
                for (var n in t) e.push(n);
                e.sort();
                for (var r = "{", i = 0; i < e.length; i++) 0 !== i && (r += ","), r += C(e[i]), r += ":", r += lt(t[e[i]]);
                return r += "}"
            },
            ct = function(t, e) {
                var n = t.length;
                if (n <= e) return [t];
                for (var r = [], i = 0; i < n; i += e) i + e > n ? r.push(t.substring(i, n)) : r.push(t.substring(i, i + e));
                return r
            },
            pt = function(t, e) {
                if (Array.isArray(t))
                    for (var n = 0; n < t.length; ++n) e(n, t[n]);
                else S(t, function(t, n) {
                    return e(n, t)
                })
            },
            dt = function(t) {
                s(!it(t), "Invalid JSON number");
                var e, n, r, i, o, a, h;
                for (0 === t ? (n = 0, r = 0, e = 1 / t == -1 / 0 ? 1 : 0) : (e = t < 0, (t = Math.abs(t)) >= Math.pow(2, -1022) ? (n = (i = Math.min(Math.floor(Math.log(t) / Math.LN2), 1023)) + 1023, r = Math.round(t * Math.pow(2, 52 - i) - Math.pow(2, 52))) : (n = 0, r = Math.round(t / Math.pow(2, -1074)))), a = [], o = 52; o; o -= 1) a.push(r % 2 ? 1 : 0), r = Math.floor(r / 2);
                for (o = 11; o; o -= 1) a.push(n % 2 ? 1 : 0), n = Math.floor(n / 2);
                a.push(e ? 1 : 0), a.reverse(), h = a.join("");
                var u = "";
                for (o = 0; o < 64; o += 8) {
                    var l = parseInt(h.substr(o, 8), 2).toString(16);
                    1 === l.length && (l = "0" + l), u += l
                }
                return u.toLowerCase()
            },
            ft = new RegExp("^-?\\d{1,10}$"),
            _t = function(t) {
                if (ft.test(t)) {
                    var e = Number(t);
                    if (e >= -2147483648 && e <= 2147483647) return e
                }
                return null
            },
            yt = function(t) {
                try {
                    t()
                } catch (t) {
                    setTimeout(function() {
                        var e = t.stack || "";
                        throw rt("Exception was thrown by user callback.", e), t
                    }, Math.floor(0))
                }
            },
            vt = function() {
                return ("object" == typeof window && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0
            },
            gt = function(t, e) {
                var n = setTimeout(t, e);
                return "object" == typeof n && n.unref && n.unref(), n
            },
            mt = function() {
                function t(t, e) {
                    if (void 0 === e) {
                        this.pieces_ = t.split("/");
                        for (var n = 0, r = 0; r < this.pieces_.length; r++) this.pieces_[r].length > 0 && (this.pieces_[n] = this.pieces_[r], n++);
                        this.pieces_.length = n, this.pieceNum_ = 0
                    } else this.pieces_ = t, this.pieceNum_ = e
                }
                return Object.defineProperty(t, "Empty", {
                    get: function() {
                        return new t("")
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getFront = function() {
                    return this.pieceNum_ >= this.pieces_.length ? null : this.pieces_[this.pieceNum_]
                }, t.prototype.getLength = function() {
                    return this.pieces_.length - this.pieceNum_
                }, t.prototype.popFront = function() {
                    var e = this.pieceNum_;
                    return e < this.pieces_.length && e++, new t(this.pieces_, e)
                }, t.prototype.getBack = function() {
                    return this.pieceNum_ < this.pieces_.length ? this.pieces_[this.pieces_.length - 1] : null
                }, t.prototype.toString = function() {
                    for (var t = "", e = this.pieceNum_; e < this.pieces_.length; e++) "" !== this.pieces_[e] && (t += "/" + this.pieces_[e]);
                    return t || "/"
                }, t.prototype.toUrlEncodedString = function() {
                    for (var t = "", e = this.pieceNum_; e < this.pieces_.length; e++) "" !== this.pieces_[e] && (t += "/" + encodeURIComponent(String(this.pieces_[e])));
                    return t || "/"
                }, t.prototype.slice = function(t) {
                    return void 0 === t && (t = 0), this.pieces_.slice(this.pieceNum_ + t)
                }, t.prototype.parent = function() {
                    if (this.pieceNum_ >= this.pieces_.length) return null;
                    for (var e = [], n = this.pieceNum_; n < this.pieces_.length - 1; n++) e.push(this.pieces_[n]);
                    return new t(e, 0)
                }, t.prototype.child = function(e) {
                    for (var n = [], r = this.pieceNum_; r < this.pieces_.length; r++) n.push(this.pieces_[r]);
                    if (e instanceof t)
                        for (r = e.pieceNum_; r < e.pieces_.length; r++) n.push(e.pieces_[r]);
                    else {
                        var i = e.split("/");
                        for (r = 0; r < i.length; r++) i[r].length > 0 && n.push(i[r])
                    }
                    return new t(n, 0)
                }, t.prototype.isEmpty = function() {
                    return this.pieceNum_ >= this.pieces_.length
                }, t.relativePath = function(e, n) {
                    var r = e.getFront(),
                        i = n.getFront();
                    if (null === r) return n;
                    if (r === i) return t.relativePath(e.popFront(), n.popFront());
                    throw new Error("INTERNAL ERROR: innerPath (" + n + ") is not within outerPath (" + e + ")")
                }, t.comparePaths = function(t, e) {
                    for (var n = t.slice(), r = e.slice(), i = 0; i < n.length && i < r.length; i++) {
                        var o = at(n[i], r[i]);
                        if (0 !== o) return o
                    }
                    return n.length === r.length ? 0 : n.length < r.length ? -1 : 1
                }, t.prototype.equals = function(t) {
                    if (this.getLength() !== t.getLength()) return !1;
                    for (var e = this.pieceNum_, n = t.pieceNum_; e <= this.pieces_.length; e++, n++)
                        if (this.pieces_[e] !== t.pieces_[n]) return !1;
                    return !0
                }, t.prototype.contains = function(t) {
                    var e = this.pieceNum_,
                        n = t.pieceNum_;
                    if (this.getLength() > t.getLength()) return !1;
                    for (; e < this.pieces_.length;) {
                        if (this.pieces_[e] !== t.pieces_[n]) return !1;
                        ++e, ++n
                    }
                    return !0
                }, t
            }(),
            Ct = function() {
                function t(t, e) {
                    this.errorPrefix_ = e, this.parts_ = t.slice(), this.byteLength_ = Math.max(1, this.parts_.length);
                    for (var n = 0; n < this.parts_.length; n++) this.byteLength_ += M(this.parts_[n]);
                    this.checkValid_()
                }
                return Object.defineProperty(t, "MAX_PATH_DEPTH", {
                    get: function() {
                        return 32
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t, "MAX_PATH_LENGTH_BYTES", {
                    get: function() {
                        return 768
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.push = function(t) {
                    this.parts_.length > 0 && (this.byteLength_ += 1), this.parts_.push(t), this.byteLength_ += M(t), this.checkValid_()
                }, t.prototype.pop = function() {
                    var t = this.parts_.pop();
                    this.byteLength_ -= M(t), this.parts_.length > 0 && (this.byteLength_ -= 1)
                }, t.prototype.checkValid_ = function() {
                    if (this.byteLength_ > t.MAX_PATH_LENGTH_BYTES) throw new Error(this.errorPrefix_ + "has a key path longer than " + t.MAX_PATH_LENGTH_BYTES + " bytes (" + this.byteLength_ + ").");
                    if (this.parts_.length > t.MAX_PATH_DEPTH) throw new Error(this.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + t.MAX_PATH_DEPTH + ") or object contains a cycle " + this.toErrorString())
                }, t.prototype.toErrorString = function() {
                    return 0 == this.parts_.length ? "" : "in property '" + this.parts_.join(".") + "'"
                }, t
            }(),
            Et = "long_polling",
            wt = function() {
                function t(t, e, n, r, i) {
                    void 0 === i && (i = ""), this.secure = e, this.namespace = n, this.webSocketOnly = r, this.persistenceKey = i, this.host = t.toLowerCase(), this.domain = this.host.substr(this.host.indexOf(".") + 1), this.internalHost = B.get("host:" + t) || this.host
                }
                return t.prototype.needsQueryParam = function() {
                    return this.host !== this.internalHost || this.isCustomHost()
                }, t.prototype.isCacheableHost = function() {
                    return "s-" === this.internalHost.substr(0, 2)
                }, t.prototype.isDemoHost = function() {
                    return "firebaseio-demo.com" === this.domain
                }, t.prototype.isCustomHost = function() {
                    return "firebaseio.com" !== this.domain && "firebaseio-demo.com" !== this.domain
                }, t.prototype.updateHost = function(t) {
                    t !== this.internalHost && (this.internalHost = t, this.isCacheableHost() && B.set("host:" + this.host, this.internalHost))
                }, t.prototype.connectionURL = function(t, e) {
                    var n;
                    if (s("string" == typeof t, "typeof type must == string"), s("object" == typeof e, "typeof params must == object"), "websocket" === t) n = (this.secure ? "wss://" : "ws://") + this.internalHost + "/.ws?";
                    else {
                        if (t !== Et) throw new Error("Unknown connection type: " + t);
                        n = (this.secure ? "https://" : "http://") + this.internalHost + "/.lp?"
                    }
                    this.needsQueryParam() && (e.ns = this.namespace);
                    var r = [];
                    return S(e, function(t, e) {
                        r.push(t + "=" + e)
                    }), n + r.join("&")
                }, t.prototype.toString = function() {
                    var t = this.toURLString();
                    return this.persistenceKey && (t += "<" + this.persistenceKey + ">"), t
                }, t.prototype.toURLString = function() {
                    return (this.secure ? "https://" : "http://") + this.host
                }, t
            }();
        var bt, St, Tt = function(t) {
                var e = Nt(t),
                    n = e.subdomain;
                "firebase" === e.domain && nt(e.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"), n && "undefined" != n || "localhost" === e.domain || nt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"), e.secure || "undefined" != typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && rt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
                var r = "ws" === e.scheme || "wss" === e.scheme;
                return {
                    repoInfo: new wt(e.host, e.secure, n, r),
                    path: new mt(e.pathString)
                }
            },
            Nt = function(t) {
                var e = "",
                    n = "",
                    r = "",
                    i = "",
                    o = !0,
                    s = "https",
                    a = 443;
                if ("string" == typeof t) {
                    var h = t.indexOf("//");
                    h >= 0 && (s = t.substring(0, h - 1), t = t.substring(h + 2));
                    var u = t.indexOf("/"); - 1 === u && (u = t.length);
                    var l = t.indexOf("?"); - 1 === l && (l = t.length), e = t.substring(0, Math.min(u, l)), u < l && (i = function(t) {
                        for (var e = "", n = t.split("/"), r = 0; r < n.length; r++)
                            if (n[r].length > 0) {
                                var i = n[r];
                                try {
                                    i = decodeURIComponent(i.replace(/\+/g, " "))
                                } catch (t) {}
                                e += "/" + i
                            } return e
                    }(t.substring(u, l)));
                    var c = function(t) {
                        var e = {};
                        t.startsWith("?") && (t = t.substring(1));
                        for (var n = 0, r = t.split("&"); n < r.length; n++) {
                            var i = r[n];
                            if (0 !== i.length) {
                                var o = i.split("=");
                                2 === o.length ? e[decodeURIComponent(o[0])] = decodeURIComponent(o[1]) : rt("Invalid query segment '" + i + "' in query '" + t + "'")
                            }
                        }
                        return e
                    }(t.substring(Math.min(t.length, l)));
                    (h = e.indexOf(":")) >= 0 ? (o = "https" === s || "wss" === s, a = parseInt(e.substring(h + 1), 10)) : h = t.length;
                    var p = e.split(".");
                    3 === p.length ? (n = p[1], r = p[0].toLowerCase()) : 2 === p.length ? n = p[0] : "localhost" === p[0].slice(0, h).toLowerCase() && (n = "localhost"), "" === r && "ns" in c && (r = c.ns)
                }
                return {
                    host: e,
                    port: a,
                    domain: n,
                    subdomain: r,
                    secure: o,
                    scheme: s,
                    pathString: i
                }
            },
            It = /[\[\].#$\/\u0000-\u001F\u007F]/,
            Rt = /[\[\].#$\u0000-\u001F\u007F]/,
            Pt = function(t) {
                return "string" == typeof t && 0 !== t.length && !It.test(t)
            },
            Dt = function(t) {
                return "string" == typeof t && 0 !== t.length && !Rt.test(t)
            },
            Ot = function(t) {
                return null === t || "string" == typeof t || "number" == typeof t && !it(t) || t && "object" == typeof t && w(t, ".sv")
            },
            kt = function(t, e, n, r, i) {
                i && void 0 === n || xt(x(t, e, i), n, r)
            },
            xt = function(t, e, n) {
                var r = n instanceof mt ? new Ct(n, t) : n;
                if (void 0 === e) throw new Error(t + "contains undefined " + r.toErrorString());
                if ("function" == typeof e) throw new Error(t + "contains a function " + r.toErrorString() + " with contents = " + e.toString());
                if (it(e)) throw new Error(t + "contains " + e.toString() + " " + r.toErrorString());
                if ("string" == typeof e && e.length > 10485760 / 3 && M(e) > 10485760) throw new Error(t + "contains a string greater than 10485760 utf8 bytes " + r.toErrorString() + " ('" + e.substring(0, 50) + "...')");
                if (e && "object" == typeof e) {
                    var i = !1,
                        o = !1;
                    if (S(e, function(e, n) {
                            if (".value" === e) i = !0;
                            else if (".priority" !== e && ".sv" !== e && (o = !0, !Pt(e))) throw new Error(t + " contains an invalid key (" + e + ") " + r.toErrorString() + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                            r.push(e), xt(t, n, r), r.pop()
                        }), i && o) throw new Error(t + ' contains ".value" child ' + r.toErrorString() + " in addition to actual children.")
                }
            },
            Ft = function(t, e, n, r, i) {
                if (!i || void 0 !== n) {
                    var o = x(t, e, i);
                    if (!n || "object" != typeof n || Array.isArray(n)) throw new Error(o + " must be an object containing the children to replace.");
                    var s = [];
                    S(n, function(t, e) {
                            var n = new mt(t);
                            if (xt(o, e, r.child(n)), ".priority" === n.getBack() && !Ot(e)) throw new Error(o + "contains an invalid value for '" + n.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
                            s.push(n)
                        }),
                        function(t, e) {
                            var n, r;
                            for (n = 0; n < e.length; n++)
                                for (var i = (r = e[n]).slice(), o = 0; o < i.length; o++)
                                    if (".priority" === i[o] && o === i.length - 1);
                                    else if (!Pt(i[o])) throw new Error(t + "contains an invalid key (" + i[o] + ") in path " + r.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                            e.sort(mt.comparePaths);
                            var s = null;
                            for (n = 0; n < e.length; n++) {
                                if (r = e[n], null !== s && s.contains(r)) throw new Error(t + "contains a path " + s.toString() + " that is ancestor of another path " + r.toString());
                                s = r
                            }
                        }(o, s)
                }
            },
            At = function(t, e, n, r) {
                if (!r || void 0 !== n) {
                    if (it(n)) throw new Error(x(t, e, r) + "is " + n.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
                    if (!Ot(n)) throw new Error(x(t, e, r) + "must be a valid Firebase priority (a string, finite number, server value, or null).")
                }
            },
            Lt = function(t, e, n, r) {
                if (!r || void 0 !== n) switch (n) {
                    case "value":
                    case "child_added":
                    case "child_removed":
                    case "child_changed":
                    case "child_moved":
                        break;
                    default:
                        throw new Error(x(t, e, r) + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')
                }
            },
            Mt = function(t, e, n, r) {
                if (!(r && void 0 === n || Pt(n))) throw new Error(x(t, e, r) + 'was an invalid key = "' + n + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')
            },
            Wt = function(t, e, n, r) {
                if (!(r && void 0 === n || Dt(n))) throw new Error(x(t, e, r) + 'was an invalid path = "' + n + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')
            },
            qt = function(t, e) {
                if (".info" === e.getFront()) throw new Error(t + " failed = Can't modify data under /.info/")
            },
            Qt = function(t, e, n) {
                var r = n.path.toString();
                if ("string" != typeof n.repoInfo.host || 0 === n.repoInfo.host.length || !Pt(n.repoInfo.namespace) && "localhost" !== n.repoInfo.host.split(":")[0] || 0 !== r.length && ! function(t) {
                        return t && (t = t.replace(/^\/*\.info(\/|$)/, "/")), Dt(t)
                    }(r)) throw new Error(x(t, e, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')
            },
            Ut = function() {
                function t(t, e) {
                    this.repo_ = t, this.path_ = e
                }
                return t.prototype.cancel = function(t) {
                    k("OnDisconnect.cancel", 0, 1, arguments.length), F("OnDisconnect.cancel", 1, t, !0);
                    var e = new p;
                    return this.repo_.onDisconnectCancel(this.path_, e.wrapCallback(t)), e.promise
                }, t.prototype.remove = function(t) {
                    k("OnDisconnect.remove", 0, 1, arguments.length), qt("OnDisconnect.remove", this.path_), F("OnDisconnect.remove", 1, t, !0);
                    var e = new p;
                    return this.repo_.onDisconnectSet(this.path_, null, e.wrapCallback(t)), e.promise
                }, t.prototype.set = function(t, e) {
                    k("OnDisconnect.set", 1, 2, arguments.length), qt("OnDisconnect.set", this.path_), kt("OnDisconnect.set", 1, t, this.path_, !1), F("OnDisconnect.set", 2, e, !0);
                    var n = new p;
                    return this.repo_.onDisconnectSet(this.path_, t, n.wrapCallback(e)), n.promise
                }, t.prototype.setWithPriority = function(t, e, n) {
                    k("OnDisconnect.setWithPriority", 2, 3, arguments.length), qt("OnDisconnect.setWithPriority", this.path_), kt("OnDisconnect.setWithPriority", 1, t, this.path_, !1), At("OnDisconnect.setWithPriority", 2, e, !1), F("OnDisconnect.setWithPriority", 3, n, !0);
                    var r = new p;
                    return this.repo_.onDisconnectSetWithPriority(this.path_, t, e, r.wrapCallback(n)), r.promise
                }, t.prototype.update = function(t, e) {
                    if (k("OnDisconnect.update", 1, 2, arguments.length), qt("OnDisconnect.update", this.path_), Array.isArray(t)) {
                        for (var n = {}, r = 0; r < t.length; ++r) n["" + r] = t[r];
                        t = n, rt("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
                    }
                    Ft("OnDisconnect.update", 1, t, this.path_, !1), F("OnDisconnect.update", 2, e, !0);
                    var i = new p;
                    return this.repo_.onDisconnectUpdate(this.path_, t, i.wrapCallback(e)), i.promise
                }, t
            }(),
            Vt = function() {
                function t(t, e) {
                    this.committed = t, this.snapshot = e
                }
                return t.prototype.toJSON = function() {
                    return k("TransactionResult.toJSON", 0, 1, arguments.length), {
                        committed: this.committed,
                        snapshot: this.snapshot.toJSON()
                    }
                }, t
            }(),
            Ht = (Xn = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz", $n = 0, Jn = [], function(t) {
                var e, n = t === $n;
                $n = t;
                var r = new Array(8);
                for (e = 7; e >= 0; e--) r[e] = Xn.charAt(t % 64), t = Math.floor(t / 64);
                s(0 === t, "Cannot push at time == 0");
                var i = r.join("");
                if (n) {
                    for (e = 11; e >= 0 && 63 === Jn[e]; e--) Jn[e] = 0;
                    Jn[e]++
                } else
                    for (e = 0; e < 12; e++) Jn[e] = Math.floor(64 * Math.random());
                for (e = 0; e < 12; e++) i += Xn.charAt(Jn[e]);
                return s(20 === i.length, "nextPushId: Length should be 20."), i
            }),
            Bt = function() {
                function t(t, e) {
                    this.name = t, this.node = e
                }
                return t.Wrap = function(e, n) {
                    return new t(e, n)
                }, t
            }(),
            jt = function() {
                function t() {}
                return t.prototype.getCompare = function() {
                    return this.compare.bind(this)
                }, t.prototype.indexedValueChanged = function(t, e) {
                    var n = new Bt(ot, t),
                        r = new Bt(ot, e);
                    return 0 !== this.compare(n, r)
                }, t.prototype.minPost = function() {
                    return Bt.MIN
                }, t
            }(),
            Kt = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return r(e, t), Object.defineProperty(e, "__EMPTY_NODE", {
                    get: function() {
                        return bt
                    },
                    set: function(t) {
                        bt = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.compare = function(t, e) {
                    return at(t.name, e.name)
                }, e.prototype.isDefinedOn = function(t) {
                    throw a("KeyIndex.isDefinedOn not expected to be called.")
                }, e.prototype.indexedValueChanged = function(t, e) {
                    return !1
                }, e.prototype.minPost = function() {
                    return Bt.MIN
                }, e.prototype.maxPost = function() {
                    return new Bt(st, bt)
                }, e.prototype.makePost = function(t, e) {
                    return s("string" == typeof t, "KeyIndex indexValue must always be a string."), new Bt(t, bt)
                }, e.prototype.toString = function() {
                    return ".key"
                }, e
            }(jt),
            Yt = new Kt;
        var zt, Gt, Xt, $t = function(t) {
                return "number" == typeof t ? "number:" + dt(t) : "string:" + t
            },
            Jt = function(t) {
                if (t.isLeafNode()) {
                    var e = t.val();
                    s("string" == typeof e || "number" == typeof e || "object" == typeof e && w(e, ".sv"), "Priority must be a string or number.")
                } else s(t === St || t.isEmpty(), "priority of unexpected type.");
                s(t === St || t.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.")
            },
            Zt = function() {
                function t(e, n) {
                    void 0 === n && (n = t.__childrenNodeConstructor.EMPTY_NODE), this.value_ = e, this.priorityNode_ = n, this.lazyHash_ = null, s(void 0 !== this.value_ && null !== this.value_, "LeafNode shouldn't be created with null/undefined value."), Jt(this.priorityNode_)
                }
                return Object.defineProperty(t, "__childrenNodeConstructor", {
                    get: function() {
                        return zt
                    },
                    set: function(t) {
                        zt = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.isLeafNode = function() {
                    return !0
                }, t.prototype.getPriority = function() {
                    return this.priorityNode_
                }, t.prototype.updatePriority = function(e) {
                    return new t(this.value_, e)
                }, t.prototype.getImmediateChild = function(e) {
                    return ".priority" === e ? this.priorityNode_ : t.__childrenNodeConstructor.EMPTY_NODE
                }, t.prototype.getChild = function(e) {
                    return e.isEmpty() ? this : ".priority" === e.getFront() ? this.priorityNode_ : t.__childrenNodeConstructor.EMPTY_NODE
                }, t.prototype.hasChild = function() {
                    return !1
                }, t.prototype.getPredecessorChildName = function(t, e) {
                    return null
                }, t.prototype.updateImmediateChild = function(e, n) {
                    return ".priority" === e ? this.updatePriority(n) : n.isEmpty() && ".priority" !== e ? this : t.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, n).updatePriority(this.priorityNode_)
                }, t.prototype.updateChild = function(e, n) {
                    var r = e.getFront();
                    return null === r ? n : n.isEmpty() && ".priority" !== r ? this : (s(".priority" !== r || 1 === e.getLength(), ".priority must be the last token in a path"), this.updateImmediateChild(r, t.__childrenNodeConstructor.EMPTY_NODE.updateChild(e.popFront(), n)))
                }, t.prototype.isEmpty = function() {
                    return !1
                }, t.prototype.numChildren = function() {
                    return 0
                }, t.prototype.forEachChild = function(t, e) {
                    return !1
                }, t.prototype.val = function(t) {
                    return t && !this.getPriority().isEmpty() ? {
                        ".value": this.getValue(),
                        ".priority": this.getPriority().val()
                    } : this.getValue()
                }, t.prototype.hash = function() {
                    if (null === this.lazyHash_) {
                        var t = "";
                        this.priorityNode_.isEmpty() || (t += "priority:" + $t(this.priorityNode_.val()) + ":");
                        var e = typeof this.value_;
                        t += e + ":", t += "number" === e ? dt(this.value_) : this.value_, this.lazyHash_ = z(t)
                    }
                    return this.lazyHash_
                }, t.prototype.getValue = function() {
                    return this.value_
                }, t.prototype.compareTo = function(e) {
                    return e === t.__childrenNodeConstructor.EMPTY_NODE ? 1 : e instanceof t.__childrenNodeConstructor ? -1 : (s(e.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(e))
                }, t.prototype.compareToLeafNode_ = function(e) {
                    var n = typeof e.value_,
                        r = typeof this.value_,
                        i = t.VALUE_TYPE_ORDER.indexOf(n),
                        o = t.VALUE_TYPE_ORDER.indexOf(r);
                    return s(i >= 0, "Unknown leaf type: " + n), s(o >= 0, "Unknown leaf type: " + r), i === o ? "object" === r ? 0 : this.value_ < e.value_ ? -1 : this.value_ === e.value_ ? 0 : 1 : o - i
                }, t.prototype.withIndex = function() {
                    return this
                }, t.prototype.isIndexed = function() {
                    return !0
                }, t.prototype.equals = function(t) {
                    if (t === this) return !0;
                    if (t.isLeafNode()) {
                        var e = t;
                        return this.value_ === e.value_ && this.priorityNode_.equals(e.priorityNode_)
                    }
                    return !1
                }, t.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"], t
            }();
        var te, ee, ne = new(function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return r(e, t), e.prototype.compare = function(t, e) {
                    var n = t.node.getPriority(),
                        r = e.node.getPriority(),
                        i = n.compareTo(r);
                    return 0 === i ? at(t.name, e.name) : i
                }, e.prototype.isDefinedOn = function(t) {
                    return !t.getPriority().isEmpty()
                }, e.prototype.indexedValueChanged = function(t, e) {
                    return !t.getPriority().equals(e.getPriority())
                }, e.prototype.minPost = function() {
                    return Bt.MIN
                }, e.prototype.maxPost = function() {
                    return new Bt(st, new Zt("[PRIORITY-POST]", Xt))
                }, e.prototype.makePost = function(t, e) {
                    var n = Gt(t);
                    return new Bt(e, new Zt("[PRIORITY-POST]", n))
                }, e.prototype.toString = function() {
                    return ".priority"
                }, e
            }(jt)),
            re = function() {
                function t(t, e, n, r, i) {
                    void 0 === i && (i = null), this.isReverse_ = r, this.resultGenerator_ = i, this.nodeStack_ = [];
                    for (var o = 1; !t.isEmpty();)
                        if (t = t, o = e ? n(t.key, e) : 1, r && (o *= -1), o < 0) t = this.isReverse_ ? t.left : t.right;
                        else {
                            if (0 === o) {
                                this.nodeStack_.push(t);
                                break
                            }
                            this.nodeStack_.push(t), t = this.isReverse_ ? t.right : t.left
                        }
                }
                return t.prototype.getNext = function() {
                    if (0 === this.nodeStack_.length) return null;
                    var t, e = this.nodeStack_.pop();
                    if (t = this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : {
                            key: e.key,
                            value: e.value
                        }, this.isReverse_)
                        for (e = e.left; !e.isEmpty();) this.nodeStack_.push(e), e = e.right;
                    else
                        for (e = e.right; !e.isEmpty();) this.nodeStack_.push(e), e = e.left;
                    return t
                }, t.prototype.hasNext = function() {
                    return this.nodeStack_.length > 0
                }, t.prototype.peek = function() {
                    if (0 === this.nodeStack_.length) return null;
                    var t = this.nodeStack_[this.nodeStack_.length - 1];
                    return this.resultGenerator_ ? this.resultGenerator_(t.key, t.value) : {
                        key: t.key,
                        value: t.value
                    }
                }, t
            }(),
            ie = function() {
                function t(e, n, r, i, o) {
                    this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : se.EMPTY_NODE, this.right = null != o ? o : se.EMPTY_NODE
                }
                return t.prototype.copy = function(e, n, r, i, o) {
                    return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right)
                }, t.prototype.count = function() {
                    return this.left.count() + 1 + this.right.count()
                }, t.prototype.isEmpty = function() {
                    return !1
                }, t.prototype.inorderTraversal = function(t) {
                    return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t)
                }, t.prototype.reverseTraversal = function(t) {
                    return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
                }, t.prototype.min_ = function() {
                    return this.left.isEmpty() ? this : this.left.min_()
                }, t.prototype.minKey = function() {
                    return this.min_().key
                }, t.prototype.maxKey = function() {
                    return this.right.isEmpty() ? this.key : this.right.maxKey()
                }, t.prototype.insert = function(t, e, n) {
                    var r, i;
                    return (i = (r = n(t, (i = this).key)) < 0 ? i.copy(null, null, null, i.left.insert(t, e, n), null) : 0 === r ? i.copy(null, e, null, null, null) : i.copy(null, null, null, null, i.right.insert(t, e, n))).fixUp_()
                }, t.prototype.removeMin_ = function() {
                    if (this.left.isEmpty()) return se.EMPTY_NODE;
                    var t = this;
                    return t.left.isRed_() || t.left.left.isRed_() || (t = t.moveRedLeft_()), (t = t.copy(null, null, null, t.left.removeMin_(), null)).fixUp_()
                }, t.prototype.remove = function(t, e) {
                    var n, r;
                    if (e(t, (n = this).key) < 0) n.left.isEmpty() || n.left.isRed_() || n.left.left.isRed_() || (n = n.moveRedLeft_()), n = n.copy(null, null, null, n.left.remove(t, e), null);
                    else {
                        if (n.left.isRed_() && (n = n.rotateRight_()), n.right.isEmpty() || n.right.isRed_() || n.right.left.isRed_() || (n = n.moveRedRight_()), 0 === e(t, n.key)) {
                            if (n.right.isEmpty()) return se.EMPTY_NODE;
                            r = n.right.min_(), n = n.copy(r.key, r.value, null, null, n.right.removeMin_())
                        }
                        n = n.copy(null, null, null, null, n.right.remove(t, e))
                    }
                    return n.fixUp_()
                }, t.prototype.isRed_ = function() {
                    return this.color
                }, t.prototype.fixUp_ = function() {
                    var t = this;
                    return t.right.isRed_() && !t.left.isRed_() && (t = t.rotateLeft_()), t.left.isRed_() && t.left.left.isRed_() && (t = t.rotateRight_()), t.left.isRed_() && t.right.isRed_() && (t = t.colorFlip_()), t
                }, t.prototype.moveRedLeft_ = function() {
                    var t = this.colorFlip_();
                    return t.right.left.isRed_() && (t = (t = (t = t.copy(null, null, null, null, t.right.rotateRight_())).rotateLeft_()).colorFlip_()), t
                }, t.prototype.moveRedRight_ = function() {
                    var t = this.colorFlip_();
                    return t.left.left.isRed_() && (t = (t = t.rotateRight_()).colorFlip_()), t
                }, t.prototype.rotateLeft_ = function() {
                    var e = this.copy(null, null, t.RED, null, this.right.left);
                    return this.right.copy(null, null, this.color, e, null)
                }, t.prototype.rotateRight_ = function() {
                    var e = this.copy(null, null, t.RED, this.left.right, null);
                    return this.left.copy(null, null, this.color, null, e)
                }, t.prototype.colorFlip_ = function() {
                    var t = this.left.copy(null, null, !this.left.color, null, null),
                        e = this.right.copy(null, null, !this.right.color, null, null);
                    return this.copy(null, null, !this.color, t, e)
                }, t.prototype.checkMaxDepth_ = function() {
                    var t = this.check_();
                    return Math.pow(2, t) <= this.count() + 1
                }, t.prototype.check_ = function() {
                    var t;
                    if (this.isRed_() && this.left.isRed_()) throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
                    if (this.right.isRed_()) throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
                    if ((t = this.left.check_()) !== this.right.check_()) throw new Error("Black depths differ");
                    return t + (this.isRed_() ? 0 : 1)
                }, t.RED = !0, t.BLACK = !1, t
            }(),
            oe = function() {
                function t() {}
                return t.prototype.copy = function(t, e, n, r, i) {
                    return this
                }, t.prototype.insert = function(t, e, n) {
                    return new ie(t, e, null)
                }, t.prototype.remove = function(t, e) {
                    return this
                }, t.prototype.count = function() {
                    return 0
                }, t.prototype.isEmpty = function() {
                    return !0
                }, t.prototype.inorderTraversal = function(t) {
                    return !1
                }, t.prototype.reverseTraversal = function(t) {
                    return !1
                }, t.prototype.minKey = function() {
                    return null
                }, t.prototype.maxKey = function() {
                    return null
                }, t.prototype.check_ = function() {
                    return 0
                }, t.prototype.isRed_ = function() {
                    return !1
                }, t
            }(),
            se = function() {
                function t(e, n) {
                    void 0 === n && (n = t.EMPTY_NODE), this.comparator_ = e, this.root_ = n
                }
                return t.prototype.insert = function(e, n) {
                    return new t(this.comparator_, this.root_.insert(e, n, this.comparator_).copy(null, null, ie.BLACK, null, null))
                }, t.prototype.remove = function(e) {
                    return new t(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, ie.BLACK, null, null))
                }, t.prototype.get = function(t) {
                    for (var e, n = this.root_; !n.isEmpty();) {
                        if (0 === (e = this.comparator_(t, n.key))) return n.value;
                        e < 0 ? n = n.left : e > 0 && (n = n.right)
                    }
                    return null
                }, t.prototype.getPredecessorKey = function(t) {
                    for (var e, n = this.root_, r = null; !n.isEmpty();) {
                        if (0 === (e = this.comparator_(t, n.key))) {
                            if (n.left.isEmpty()) return r ? r.key : null;
                            for (n = n.left; !n.right.isEmpty();) n = n.right;
                            return n.key
                        }
                        e < 0 ? n = n.left : e > 0 && (r = n, n = n.right)
                    }
                    throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")
                }, t.prototype.isEmpty = function() {
                    return this.root_.isEmpty()
                }, t.prototype.count = function() {
                    return this.root_.count()
                }, t.prototype.minKey = function() {
                    return this.root_.minKey()
                }, t.prototype.maxKey = function() {
                    return this.root_.maxKey()
                }, t.prototype.inorderTraversal = function(t) {
                    return this.root_.inorderTraversal(t)
                }, t.prototype.reverseTraversal = function(t) {
                    return this.root_.reverseTraversal(t)
                }, t.prototype.getIterator = function(t) {
                    return new re(this.root_, null, this.comparator_, !1, t)
                }, t.prototype.getIteratorFrom = function(t, e) {
                    return new re(this.root_, t, this.comparator_, !1, e)
                }, t.prototype.getReverseIteratorFrom = function(t, e) {
                    return new re(this.root_, t, this.comparator_, !0, e)
                }, t.prototype.getReverseIterator = function(t) {
                    return new re(this.root_, null, this.comparator_, !0, t)
                }, t.EMPTY_NODE = new oe, t
            }(),
            ae = Math.log(2),
            he = function() {
                function t(t) {
                    var e;
                    this.count = (e = t + 1, parseInt(Math.log(e) / ae, 10)), this.current_ = this.count - 1;
                    var n, r = (n = this.count, parseInt(Array(n + 1).join("1"), 2));
                    this.bits_ = t + 1 & r
                }
                return t.prototype.nextBitIsOne = function() {
                    var t = !(this.bits_ & 1 << this.current_);
                    return this.current_--, t
                }, t
            }(),
            ue = function(t, e, n, r) {
                t.sort(e);
                var i = function(e, r) {
                        var o, s, a = r - e;
                        if (0 == a) return null;
                        if (1 == a) return o = t[e], s = n ? n(o) : o, new ie(s, o.node, ie.BLACK, null, null);
                        var h = parseInt(a / 2, 10) + e,
                            u = i(e, h),
                            l = i(h + 1, r);
                        return o = t[h], s = n ? n(o) : o, new ie(s, o.node, ie.BLACK, u, l)
                    },
                    o = function(e) {
                        for (var r = null, o = null, s = t.length, a = function(e, r) {
                                var o = s - e,
                                    a = s;
                                s -= e;
                                var u = i(o + 1, a),
                                    l = t[o],
                                    c = n ? n(l) : l;
                                h(new ie(c, l.node, r, null, u))
                            }, h = function(t) {
                                r ? (r.left = t, r = t) : (o = t, r = t)
                            }, u = 0; u < e.count; ++u) {
                            var l = e.nextBitIsOne(),
                                c = Math.pow(2, e.count - (u + 1));
                            l ? a(c, ie.BLACK) : (a(c, ie.BLACK), a(c, ie.RED))
                        }
                        return o
                    }(new he(t.length));
                return new se(r || e, o)
            },
            le = {},
            ce = function() {
                function t(t, e) {
                    this.indexes_ = t, this.indexSet_ = e
                }
                return Object.defineProperty(t, "Default", {
                    get: function() {
                        return s(le && ne, "ChildrenNode.ts has not been loaded"), te = te || new t({
                            ".priority": le
                        }, {
                            ".priority": ne
                        })
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.get = function(t) {
                    var e = b(this.indexes_, t);
                    if (!e) throw new Error("No index defined for " + t);
                    return e === le ? null : e
                }, t.prototype.hasIndex = function(t) {
                    return w(this.indexSet_, t.toString())
                }, t.prototype.addIndex = function(e, n) {
                    s(e !== Yt, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
                    for (var r, i = [], o = !1, a = n.getIterator(Bt.Wrap), h = a.getNext(); h;) o = o || e.isDefinedOn(h.node), i.push(h), h = a.getNext();
                    r = o ? ue(i, e.getCompare()) : le;
                    var u = e.toString(),
                        l = T(this.indexSet_);
                    l[u] = e;
                    var c = T(this.indexes_);
                    return c[u] = r, new t(c, l)
                }, t.prototype.addToIndexes = function(e, n) {
                    var r = this;
                    return new t(R(this.indexes_, function(t, i) {
                        var o = b(r.indexSet_, i);
                        if (s(o, "Missing index implementation for " + i), t === le) {
                            if (o.isDefinedOn(e.node)) {
                                for (var a = [], h = n.getIterator(Bt.Wrap), u = h.getNext(); u;) u.name != e.name && a.push(u), u = h.getNext();
                                return a.push(e), ue(a, o.getCompare())
                            }
                            return le
                        }
                        var l = n.get(e.name),
                            c = t;
                        return l && (c = c.remove(new Bt(e.name, l))), c.insert(e, e.node)
                    }), this.indexSet_)
                }, t.prototype.removeFromIndexes = function(e, n) {
                    return new t(R(this.indexes_, function(t) {
                        if (t === le) return t;
                        var r = n.get(e.name);
                        return r ? t.remove(new Bt(e.name, r)) : t
                    }), this.indexSet_)
                }, t
            }();

        function pe(t, e) {
            return at(t.name, e.name)
        }

        function de(t, e) {
            return at(t, e)
        }
        var fe = function() {
                function t(t, e, n) {
                    this.children_ = t, this.priorityNode_ = e, this.indexMap_ = n, this.lazyHash_ = null, this.priorityNode_ && Jt(this.priorityNode_), this.children_.isEmpty() && s(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority")
                }
                return Object.defineProperty(t, "EMPTY_NODE", {
                    get: function() {
                        return ee || (ee = new t(new se(de), null, ce.Default))
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.isLeafNode = function() {
                    return !1
                }, t.prototype.getPriority = function() {
                    return this.priorityNode_ || ee
                }, t.prototype.updatePriority = function(e) {
                    return this.children_.isEmpty() ? this : new t(this.children_, e, this.indexMap_)
                }, t.prototype.getImmediateChild = function(t) {
                    if (".priority" === t) return this.getPriority();
                    var e = this.children_.get(t);
                    return null === e ? ee : e
                }, t.prototype.getChild = function(t) {
                    var e = t.getFront();
                    return null === e ? this : this.getImmediateChild(e).getChild(t.popFront())
                }, t.prototype.hasChild = function(t) {
                    return null !== this.children_.get(t)
                }, t.prototype.updateImmediateChild = function(e, n) {
                    if (s(n, "We should always be passing snapshot nodes"), ".priority" === e) return this.updatePriority(n);
                    var r = new Bt(e, n),
                        i = void 0,
                        o = void 0;
                    return n.isEmpty() ? (i = this.children_.remove(e), o = this.indexMap_.removeFromIndexes(r, this.children_)) : (i = this.children_.insert(e, n), o = this.indexMap_.addToIndexes(r, this.children_)), new t(i, i.isEmpty() ? ee : this.priorityNode_, o)
                }, t.prototype.updateChild = function(t, e) {
                    var n = t.getFront();
                    if (null === n) return e;
                    s(".priority" !== t.getFront() || 1 === t.getLength(), ".priority must be the last token in a path");
                    var r = this.getImmediateChild(n).updateChild(t.popFront(), e);
                    return this.updateImmediateChild(n, r)
                }, t.prototype.isEmpty = function() {
                    return this.children_.isEmpty()
                }, t.prototype.numChildren = function() {
                    return this.children_.count()
                }, t.prototype.val = function(e) {
                    if (this.isEmpty()) return null;
                    var n = {},
                        r = 0,
                        i = 0,
                        o = !0;
                    if (this.forEachChild(ne, function(s, a) {
                            n[s] = a.val(e), r++, o && t.INTEGER_REGEXP_.test(s) ? i = Math.max(i, Number(s)) : o = !1
                        }), !e && o && i < 2 * r) {
                        var s = [];
                        for (var a in n) s[a] = n[a];
                        return s
                    }
                    return e && !this.getPriority().isEmpty() && (n[".priority"] = this.getPriority().val()), n
                }, t.prototype.hash = function() {
                    if (null === this.lazyHash_) {
                        var t = "";
                        this.getPriority().isEmpty() || (t += "priority:" + $t(this.getPriority().val()) + ":"), this.forEachChild(ne, function(e, n) {
                            var r = n.hash();
                            "" !== r && (t += ":" + e + ":" + r)
                        }), this.lazyHash_ = "" === t ? "" : z(t)
                    }
                    return this.lazyHash_
                }, t.prototype.getPredecessorChildName = function(t, e, n) {
                    var r = this.resolveIndex_(n);
                    if (r) {
                        var i = r.getPredecessorKey(new Bt(t, e));
                        return i ? i.name : null
                    }
                    return this.children_.getPredecessorKey(t)
                }, t.prototype.getFirstChildName = function(t) {
                    var e = this.resolveIndex_(t);
                    if (e) {
                        var n = e.minKey();
                        return n && n.name
                    }
                    return this.children_.minKey()
                }, t.prototype.getFirstChild = function(t) {
                    var e = this.getFirstChildName(t);
                    return e ? new Bt(e, this.children_.get(e)) : null
                }, t.prototype.getLastChildName = function(t) {
                    var e = this.resolveIndex_(t);
                    if (e) {
                        var n = e.maxKey();
                        return n && n.name
                    }
                    return this.children_.maxKey()
                }, t.prototype.getLastChild = function(t) {
                    var e = this.getLastChildName(t);
                    return e ? new Bt(e, this.children_.get(e)) : null
                }, t.prototype.forEachChild = function(t, e) {
                    var n = this.resolveIndex_(t);
                    return n ? n.inorderTraversal(function(t) {
                        return e(t.name, t.node)
                    }) : this.children_.inorderTraversal(e)
                }, t.prototype.getIterator = function(t) {
                    return this.getIteratorFrom(t.minPost(), t)
                }, t.prototype.getIteratorFrom = function(t, e) {
                    var n = this.resolveIndex_(e);
                    if (n) return n.getIteratorFrom(t, function(t) {
                        return t
                    });
                    for (var r = this.children_.getIteratorFrom(t.name, Bt.Wrap), i = r.peek(); null != i && e.compare(i, t) < 0;) r.getNext(), i = r.peek();
                    return r
                }, t.prototype.getReverseIterator = function(t) {
                    return this.getReverseIteratorFrom(t.maxPost(), t)
                }, t.prototype.getReverseIteratorFrom = function(t, e) {
                    var n = this.resolveIndex_(e);
                    if (n) return n.getReverseIteratorFrom(t, function(t) {
                        return t
                    });
                    for (var r = this.children_.getReverseIteratorFrom(t.name, Bt.Wrap), i = r.peek(); null != i && e.compare(i, t) > 0;) r.getNext(), i = r.peek();
                    return r
                }, t.prototype.compareTo = function(t) {
                    return this.isEmpty() ? t.isEmpty() ? 0 : -1 : t.isLeafNode() || t.isEmpty() ? 1 : t === _e ? -1 : 0
                }, t.prototype.withIndex = function(e) {
                    if (e === Yt || this.indexMap_.hasIndex(e)) return this;
                    var n = this.indexMap_.addIndex(e, this.children_);
                    return new t(this.children_, this.priorityNode_, n)
                }, t.prototype.isIndexed = function(t) {
                    return t === Yt || this.indexMap_.hasIndex(t)
                }, t.prototype.equals = function(t) {
                    if (t === this) return !0;
                    if (t.isLeafNode()) return !1;
                    var e = t;
                    if (this.getPriority().equals(e.getPriority())) {
                        if (this.children_.count() === e.children_.count()) {
                            for (var n = this.getIterator(ne), r = e.getIterator(ne), i = n.getNext(), o = r.getNext(); i && o;) {
                                if (i.name !== o.name || !i.node.equals(o.node)) return !1;
                                i = n.getNext(), o = r.getNext()
                            }
                            return null === i && null === o
                        }
                        return !1
                    }
                    return !1
                }, t.prototype.resolveIndex_ = function(t) {
                    return t === Yt ? null : this.indexMap_.get(t.toString())
                }, t.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/, t
            }(),
            _e = new(function(t) {
                function e() {
                    return t.call(this, new se(de), fe.EMPTY_NODE, ce.Default) || this
                }
                return r(e, t), e.prototype.compareTo = function(t) {
                    return t === this ? 0 : 1
                }, e.prototype.equals = function(t) {
                    return t === this
                }, e.prototype.getPriority = function() {
                    return this
                }, e.prototype.getImmediateChild = function(t) {
                    return fe.EMPTY_NODE
                }, e.prototype.isEmpty = function() {
                    return !1
                }, e
            }(fe));
        Object.defineProperties(Bt, {
                MIN: {
                    value: new Bt(ot, fe.EMPTY_NODE)
                },
                MAX: {
                    value: new Bt(st, _e)
                }
            }), Kt.__EMPTY_NODE = fe.EMPTY_NODE, Zt.__childrenNodeConstructor = fe, St = _e,
            function(t) {
                Xt = t
            }(_e);
        var ye = !0;

        function ve(t, e) {
            if (void 0 === e && (e = null), null === t) return fe.EMPTY_NODE;
            if ("object" == typeof t && ".priority" in t && (e = t[".priority"]), s(null === e || "string" == typeof e || "number" == typeof e || "object" == typeof e && ".sv" in e, "Invalid priority type found: " + typeof e), "object" == typeof t && ".value" in t && null !== t[".value"] && (t = t[".value"]), "object" != typeof t || ".sv" in t) return new Zt(t, ve(e));
            if (t instanceof Array || !ye) {
                var n = fe.EMPTY_NODE,
                    r = t;
                return S(r, function(t, e) {
                    if (w(r, t) && "." !== t.substring(0, 1)) {
                        var i = ve(e);
                        !i.isLeafNode() && i.isEmpty() || (n = n.updateImmediateChild(t, i))
                    }
                }), n.updatePriority(ve(e))
            }
            var i = [],
                o = !1,
                a = t;
            if (S(a, function(t, e) {
                    if ("string" != typeof t || "." !== t.substring(0, 1)) {
                        var n = ve(a[t]);
                        n.isEmpty() || (o = o || !n.getPriority().isEmpty(), i.push(new Bt(t, n)))
                    }
                }), 0 == i.length) return fe.EMPTY_NODE;
            var h = ue(i, pe, function(t) {
                return t.name
            }, de);
            if (o) {
                var u = ue(i, ne.getCompare());
                return new fe(h, ve(e), new ce({
                    ".priority": u
                }, {
                    ".priority": ne
                }))
            }
            return new fe(h, ve(e), ce.Default)
        }! function(t) {
            Gt = t
        }(ve);
        var ge, me, Ce = new(function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return r(e, t), e.prototype.compare = function(t, e) {
                    var n = t.node.compareTo(e.node);
                    return 0 === n ? at(t.name, e.name) : n
                }, e.prototype.isDefinedOn = function(t) {
                    return !0
                }, e.prototype.indexedValueChanged = function(t, e) {
                    return !t.equals(e)
                }, e.prototype.minPost = function() {
                    return Bt.MIN
                }, e.prototype.maxPost = function() {
                    return Bt.MAX
                }, e.prototype.makePost = function(t, e) {
                    var n = ve(t);
                    return new Bt(e, n)
                }, e.prototype.toString = function() {
                    return ".value"
                }, e
            }(jt)),
            Ee = function(t) {
                function e(e) {
                    var n = t.call(this) || this;
                    return n.indexPath_ = e, s(!e.isEmpty() && ".priority" !== e.getFront(), "Can't create PathIndex with empty path or .priority key"), n
                }
                return r(e, t), e.prototype.extractChild = function(t) {
                    return t.getChild(this.indexPath_)
                }, e.prototype.isDefinedOn = function(t) {
                    return !t.getChild(this.indexPath_).isEmpty()
                }, e.prototype.compare = function(t, e) {
                    var n = this.extractChild(t.node),
                        r = this.extractChild(e.node),
                        i = n.compareTo(r);
                    return 0 === i ? at(t.name, e.name) : i
                }, e.prototype.makePost = function(t, e) {
                    var n = ve(t),
                        r = fe.EMPTY_NODE.updateChild(this.indexPath_, n);
                    return new Bt(e, r)
                }, e.prototype.maxPost = function() {
                    var t = fe.EMPTY_NODE.updateChild(this.indexPath_, _e);
                    return new Bt(st, t)
                }, e.prototype.toString = function() {
                    return this.indexPath_.slice().join("/")
                }, e
            }(jt),
            we = function() {
                function t(t, e, n) {
                    this.node_ = t, this.ref_ = e, this.index_ = n
                }
                return t.prototype.val = function() {
                    return k("DataSnapshot.val", 0, 0, arguments.length), this.node_.val()
                }, t.prototype.exportVal = function() {
                    return k("DataSnapshot.exportVal", 0, 0, arguments.length), this.node_.val(!0)
                }, t.prototype.toJSON = function() {
                    return k("DataSnapshot.toJSON", 0, 1, arguments.length), this.exportVal()
                }, t.prototype.exists = function() {
                    return k("DataSnapshot.exists", 0, 0, arguments.length), !this.node_.isEmpty()
                }, t.prototype.child = function(e) {
                    k("DataSnapshot.child", 0, 1, arguments.length), e = String(e), Wt("DataSnapshot.child", 1, e, !1);
                    var n = new mt(e),
                        r = this.ref_.child(n);
                    return new t(this.node_.getChild(n), r, ne)
                }, t.prototype.hasChild = function(t) {
                    k("DataSnapshot.hasChild", 1, 1, arguments.length), Wt("DataSnapshot.hasChild", 1, t, !1);
                    var e = new mt(t);
                    return !this.node_.getChild(e).isEmpty()
                }, t.prototype.getPriority = function() {
                    return k("DataSnapshot.getPriority", 0, 0, arguments.length), this.node_.getPriority().val()
                }, t.prototype.forEach = function(e) {
                    var n = this;
                    return k("DataSnapshot.forEach", 1, 1, arguments.length), F("DataSnapshot.forEach", 1, e, !1), !this.node_.isLeafNode() && !!this.node_.forEachChild(this.index_, function(r, i) {
                        return e(new t(i, n.ref_.child(r), ne))
                    })
                }, t.prototype.hasChildren = function() {
                    return k("DataSnapshot.hasChildren", 0, 0, arguments.length), !this.node_.isLeafNode() && !this.node_.isEmpty()
                }, Object.defineProperty(t.prototype, "key", {
                    get: function() {
                        return this.ref_.getKey()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.numChildren = function() {
                    return k("DataSnapshot.numChildren", 0, 0, arguments.length), this.node_.numChildren()
                }, t.prototype.getRef = function() {
                    return k("DataSnapshot.ref", 0, 0, arguments.length), this.ref_
                }, Object.defineProperty(t.prototype, "ref", {
                    get: function() {
                        return this.getRef()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t
            }(),
            be = function() {
                function t(t, e, n, r) {
                    this.eventType = t, this.eventRegistration = e, this.snapshot = n, this.prevName = r
                }
                return t.prototype.getPath = function() {
                    var t = this.snapshot.getRef();
                    return "value" === this.eventType ? t.path : t.getParent().path
                }, t.prototype.getEventType = function() {
                    return this.eventType
                }, t.prototype.getEventRunner = function() {
                    return this.eventRegistration.getEventRunner(this)
                }, t.prototype.toString = function() {
                    return this.getPath().toString() + ":" + this.eventType + ":" + C(this.snapshot.exportVal())
                }, t
            }(),
            Se = function() {
                function t(t, e, n) {
                    this.eventRegistration = t, this.error = e, this.path = n
                }
                return t.prototype.getPath = function() {
                    return this.path
                }, t.prototype.getEventType = function() {
                    return "cancel"
                }, t.prototype.getEventRunner = function() {
                    return this.eventRegistration.getEventRunner(this)
                }, t.prototype.toString = function() {
                    return this.path.toString() + ":cancel"
                }, t
            }(),
            Te = function() {
                function t(t, e, n) {
                    this.callback_ = t, this.cancelCallback_ = e, this.context_ = n
                }
                return t.prototype.respondsTo = function(t) {
                    return "value" === t
                }, t.prototype.createEvent = function(t, e) {
                    var n = e.getQueryParams().getIndex();
                    return new be("value", this, new we(t.snapshotNode, e.getRef(), n))
                }, t.prototype.getEventRunner = function(t) {
                    var e = this.context_;
                    if ("cancel" === t.getEventType()) {
                        s(this.cancelCallback_, "Raising a cancel event on a listener with no cancel callback");
                        var n = this.cancelCallback_;
                        return function() {
                            n.call(e, t.error)
                        }
                    }
                    var r = this.callback_;
                    return function() {
                        r.call(e, t.snapshot)
                    }
                }, t.prototype.createCancelEvent = function(t, e) {
                    return this.cancelCallback_ ? new Se(this, t, e) : null
                }, t.prototype.matches = function(e) {
                    return e instanceof t && (!e.callback_ || !this.callback_ || e.callback_ === this.callback_ && e.context_ === this.context_)
                }, t.prototype.hasAnyCallback = function() {
                    return null !== this.callback_
                }, t
            }(),
            Ne = function() {
                function t(t, e, n) {
                    this.callbacks_ = t, this.cancelCallback_ = e, this.context_ = n
                }
                return t.prototype.respondsTo = function(t) {
                    var e = "children_added" === t ? "child_added" : t;
                    return e = "children_removed" === e ? "child_removed" : e, w(this.callbacks_, e)
                }, t.prototype.createCancelEvent = function(t, e) {
                    return this.cancelCallback_ ? new Se(this, t, e) : null
                }, t.prototype.createEvent = function(t, e) {
                    s(null != t.childName, "Child events should have a childName.");
                    var n = e.getRef().child(t.childName),
                        r = e.getQueryParams().getIndex();
                    return new be(t.type, this, new we(t.snapshotNode, n, r), t.prevName)
                }, t.prototype.getEventRunner = function(t) {
                    var e = this.context_;
                    if ("cancel" === t.getEventType()) {
                        s(this.cancelCallback_, "Raising a cancel event on a listener with no cancel callback");
                        var n = this.cancelCallback_;
                        return function() {
                            n.call(e, t.error)
                        }
                    }
                    var r = this.callbacks_[t.eventType];
                    return function() {
                        r.call(e, t.snapshot, t.prevName)
                    }
                }, t.prototype.matches = function(e) {
                    if (e instanceof t) {
                        if (!this.callbacks_ || !e.callbacks_) return !0;
                        if (this.context_ === e.context_) {
                            var n = I(e.callbacks_);
                            if (n === I(this.callbacks_)) {
                                if (1 === n) {
                                    var r = D(e.callbacks_),
                                        i = D(this.callbacks_);
                                    return !(i !== r || e.callbacks_[r] && this.callbacks_[i] && e.callbacks_[r] !== this.callbacks_[i])
                                }
                                return function(t, e) {
                                    for (var n in t)
                                        if (Object.prototype.hasOwnProperty.call(t, n) && !e(n, t[n])) return !1;
                                    return !0
                                }(this.callbacks_, function(t, n) {
                                    return e.callbacks_[t] === n
                                })
                            }
                        }
                    }
                    return !1
                }, t.prototype.hasAnyCallback = function() {
                    return null !== this.callbacks_
                }, t
            }(),
            Ie = function() {
                function t(t, e, n, r) {
                    this.repo = t, this.path = e, this.queryParams_ = n, this.orderByCalled_ = r
                }
                return Object.defineProperty(t, "__referenceConstructor", {
                    get: function() {
                        return s(ge, "Reference.ts has not been loaded"), ge
                    },
                    set: function(t) {
                        ge = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.validateQueryEndpoints_ = function(t) {
                    var e = null,
                        n = null;
                    if (t.hasStart() && (e = t.getIndexStartValue()), t.hasEnd() && (n = t.getIndexEndValue()), t.getIndex() === Yt) {
                        var r = "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",
                            i = "Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.";
                        if (t.hasStart()) {
                            if (t.getIndexStartName() != ot) throw new Error(r);
                            if ("string" != typeof e) throw new Error(i)
                        }
                        if (t.hasEnd()) {
                            if (t.getIndexEndName() != st) throw new Error(r);
                            if ("string" != typeof n) throw new Error(i)
                        }
                    } else if (t.getIndex() === ne) {
                        if (null != e && !Ot(e) || null != n && !Ot(n)) throw new Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).")
                    } else if (s(t.getIndex() instanceof Ee || t.getIndex() === Ce, "unknown index type."), null != e && "object" == typeof e || null != n && "object" == typeof n) throw new Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.")
                }, t.validateLimit_ = function(t) {
                    if (t.hasStart() && t.hasEnd() && t.hasLimit() && !t.hasAnchoredLimit()) throw new Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.")
                }, t.prototype.validateNoPreviousOrderByCall_ = function(t) {
                    if (!0 === this.orderByCalled_) throw new Error(t + ": You can't combine multiple orderBy calls.")
                }, t.prototype.getQueryParams = function() {
                    return this.queryParams_
                }, t.prototype.getRef = function() {
                    return k("Query.ref", 0, 0, arguments.length), new t.__referenceConstructor(this.repo, this.path)
                }, t.prototype.on = function(e, n, r, i) {
                    k("Query.on", 2, 4, arguments.length), Lt("Query.on", 1, e, !1), F("Query.on", 2, n, !1);
                    var o = t.getCancelAndContextArgs_("Query.on", r, i);
                    if ("value" === e) this.onValueEvent(n, o.cancel, o.context);
                    else {
                        var s = {};
                        s[e] = n, this.onChildEvent(s, o.cancel, o.context)
                    }
                    return n
                }, t.prototype.onValueEvent = function(t, e, n) {
                    var r = new Te(t, e || null, n || null);
                    this.repo.addEventCallbackForQuery(this, r)
                }, t.prototype.onChildEvent = function(t, e, n) {
                    var r = new Ne(t, e, n);
                    this.repo.addEventCallbackForQuery(this, r)
                }, t.prototype.off = function(t, e, n) {
                    k("Query.off", 0, 3, arguments.length), Lt("Query.off", 1, t, !0), F("Query.off", 2, e, !0), A("Query.off", 3, n, !0);
                    var r = null,
                        i = null;
                    "value" === t ? r = new Te(e || null, null, n || null) : t && (e && ((i = {})[t] = e), r = new Ne(i, null, n || null));
                    this.repo.removeEventCallbackForQuery(this, r)
                }, t.prototype.once = function(e, n, r, i) {
                    var o = this;
                    k("Query.once", 1, 4, arguments.length), Lt("Query.once", 1, e, !1), F("Query.once", 2, n, !0);
                    var s = t.getCancelAndContextArgs_("Query.once", r, i),
                        a = !0,
                        h = new p;
                    h.promise.catch(function() {});
                    var u = function(t) {
                        a && (a = !1, o.off(e, u), n && n.bind(s.context)(t), h.resolve(t))
                    };
                    return this.on(e, u, function(t) {
                        o.off(e, u), s.cancel && s.cancel.bind(s.context)(t), h.reject(t)
                    }), h.promise
                }, t.prototype.limitToFirst = function(e) {
                    if (k("Query.limitToFirst", 1, 1, arguments.length), "number" != typeof e || Math.floor(e) !== e || e <= 0) throw new Error("Query.limitToFirst: First argument must be a positive integer.");
                    if (this.queryParams_.hasLimit()) throw new Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
                    return new t(this.repo, this.path, this.queryParams_.limitToFirst(e), this.orderByCalled_)
                }, t.prototype.limitToLast = function(e) {
                    if (k("Query.limitToLast", 1, 1, arguments.length), "number" != typeof e || Math.floor(e) !== e || e <= 0) throw new Error("Query.limitToLast: First argument must be a positive integer.");
                    if (this.queryParams_.hasLimit()) throw new Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
                    return new t(this.repo, this.path, this.queryParams_.limitToLast(e), this.orderByCalled_)
                }, t.prototype.orderByChild = function(e) {
                    if (k("Query.orderByChild", 1, 1, arguments.length), "$key" === e) throw new Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
                    if ("$priority" === e) throw new Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
                    if ("$value" === e) throw new Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
                    Wt("Query.orderByChild", 1, e, !1), this.validateNoPreviousOrderByCall_("Query.orderByChild");
                    var n = new mt(e);
                    if (n.isEmpty()) throw new Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
                    var r = new Ee(n),
                        i = this.queryParams_.orderBy(r);
                    return t.validateQueryEndpoints_(i), new t(this.repo, this.path, i, !0)
                }, t.prototype.orderByKey = function() {
                    k("Query.orderByKey", 0, 0, arguments.length), this.validateNoPreviousOrderByCall_("Query.orderByKey");
                    var e = this.queryParams_.orderBy(Yt);
                    return t.validateQueryEndpoints_(e), new t(this.repo, this.path, e, !0)
                }, t.prototype.orderByPriority = function() {
                    k("Query.orderByPriority", 0, 0, arguments.length), this.validateNoPreviousOrderByCall_("Query.orderByPriority");
                    var e = this.queryParams_.orderBy(ne);
                    return t.validateQueryEndpoints_(e), new t(this.repo, this.path, e, !0)
                }, t.prototype.orderByValue = function() {
                    k("Query.orderByValue", 0, 0, arguments.length), this.validateNoPreviousOrderByCall_("Query.orderByValue");
                    var e = this.queryParams_.orderBy(Ce);
                    return t.validateQueryEndpoints_(e), new t(this.repo, this.path, e, !0)
                }, t.prototype.startAt = function(e, n) {
                    void 0 === e && (e = null), k("Query.startAt", 0, 2, arguments.length), kt("Query.startAt", 1, e, this.path, !0), Mt("Query.startAt", 2, n, !0);
                    var r = this.queryParams_.startAt(e, n);
                    if (t.validateLimit_(r), t.validateQueryEndpoints_(r), this.queryParams_.hasStart()) throw new Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
                    return void 0 === e && (e = null, n = null), new t(this.repo, this.path, r, this.orderByCalled_)
                }, t.prototype.endAt = function(e, n) {
                    void 0 === e && (e = null), k("Query.endAt", 0, 2, arguments.length), kt("Query.endAt", 1, e, this.path, !0), Mt("Query.endAt", 2, n, !0);
                    var r = this.queryParams_.endAt(e, n);
                    if (t.validateLimit_(r), t.validateQueryEndpoints_(r), this.queryParams_.hasEnd()) throw new Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
                    return new t(this.repo, this.path, r, this.orderByCalled_)
                }, t.prototype.equalTo = function(t, e) {
                    if (k("Query.equalTo", 1, 2, arguments.length), kt("Query.equalTo", 1, t, this.path, !1), Mt("Query.equalTo", 2, e, !0), this.queryParams_.hasStart()) throw new Error("Query.equalTo: Starting point was already set (by another call to startAt or equalTo).");
                    if (this.queryParams_.hasEnd()) throw new Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
                    return this.startAt(t, e).endAt(t, e)
                }, t.prototype.toString = function() {
                    return k("Query.toString", 0, 0, arguments.length), this.repo.toString() + this.path.toUrlEncodedString()
                }, t.prototype.toJSON = function() {
                    return k("Query.toJSON", 0, 1, arguments.length), this.toString()
                }, t.prototype.queryObject = function() {
                    return this.queryParams_.getQueryObject()
                }, t.prototype.queryIdentifier = function() {
                    var t = this.queryObject(),
                        e = lt(t);
                    return "{}" === e ? "default" : e
                }, t.prototype.isEqual = function(e) {
                    if (k("Query.isEqual", 1, 1, arguments.length), !(e instanceof t)) {
                        throw new Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.")
                    }
                    var n = this.repo === e.repo,
                        r = this.path.equals(e.path),
                        i = this.queryIdentifier() === e.queryIdentifier();
                    return n && r && i
                }, t.getCancelAndContextArgs_ = function(t, e, n) {
                    var r = {
                        cancel: null,
                        context: null
                    };
                    if (e && n) r.cancel = e, F(t, 3, r.cancel, !0), r.context = n, A(t, 4, r.context, !0);
                    else if (e)
                        if ("object" == typeof e && null !== e) r.context = e;
                        else {
                            if ("function" != typeof e) throw new Error(x(t, 3, !0) + " must either be a cancel callback or a context object.");
                            r.cancel = e
                        } return r
                }, Object.defineProperty(t.prototype, "ref", {
                    get: function() {
                        return this.getRef()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t
            }(),
            Re = function() {
                function t() {
                    this.set = {}
                }
                return t.prototype.add = function(t, e) {
                    this.set[t] = null === e || e
                }, t.prototype.contains = function(t) {
                    return w(this.set, t)
                }, t.prototype.get = function(t) {
                    return this.contains(t) ? this.set[t] : void 0
                }, t.prototype.remove = function(t) {
                    delete this.set[t]
                }, t.prototype.clear = function() {
                    this.set = {}
                }, t.prototype.isEmpty = function() {
                    return N(this.set)
                }, t.prototype.count = function() {
                    return I(this.set)
                }, t.prototype.each = function(t) {
                    S(this.set, function(e, n) {
                        return t(e, n)
                    })
                }, t.prototype.keys = function() {
                    var t = [];
                    return S(this.set, function(e) {
                        t.push(e)
                    }), t
                }, t
            }(),
            Pe = function() {
                function t() {
                    this.value_ = null, this.children_ = null
                }
                return t.prototype.find = function(t) {
                    if (null != this.value_) return this.value_.getChild(t);
                    if (t.isEmpty() || null == this.children_) return null;
                    var e = t.getFront();
                    return t = t.popFront(), this.children_.contains(e) ? this.children_.get(e).find(t) : null
                }, t.prototype.remember = function(e, n) {
                    if (e.isEmpty()) this.value_ = n, this.children_ = null;
                    else if (null !== this.value_) this.value_ = this.value_.updateChild(e, n);
                    else {
                        null == this.children_ && (this.children_ = new Re);
                        var r = e.getFront();
                        this.children_.contains(r) || this.children_.add(r, new t);
                        var i = this.children_.get(r);
                        e = e.popFront(), i.remember(e, n)
                    }
                }, t.prototype.forget = function(t) {
                    if (t.isEmpty()) return this.value_ = null, this.children_ = null, !0;
                    if (null !== this.value_) {
                        if (this.value_.isLeafNode()) return !1;
                        var e = this.value_;
                        this.value_ = null;
                        var n = this;
                        return e.forEachChild(ne, function(t, e) {
                            n.remember(new mt(t), e)
                        }), this.forget(t)
                    }
                    if (null !== this.children_) {
                        var r = t.getFront();
                        if (t = t.popFront(), this.children_.contains(r)) this.children_.get(r).forget(t) && this.children_.remove(r);
                        return !!this.children_.isEmpty() && (this.children_ = null, !0)
                    }
                    return !0
                }, t.prototype.forEachTree = function(t, e) {
                    null !== this.value_ ? e(t, this.value_) : this.forEachChild(function(n, r) {
                        var i = new mt(t.toString() + "/" + n);
                        r.forEachTree(i, e)
                    })
                }, t.prototype.forEachChild = function(t) {
                    null !== this.children_ && this.children_.each(function(e, n) {
                        t(e, n)
                    })
                }, t
            }(),
            De = function(t, e) {
                return t && "object" == typeof t ? (s(".sv" in t, "Unexpected leaf node or priority contents"), e[t[".sv"]]) : t
            },
            Oe = function(t, e) {
                var n, r = t.getPriority().val(),
                    i = De(r, e);
                if (t.isLeafNode()) {
                    var o = t,
                        s = De(o.getValue(), e);
                    return s !== o.getValue() || i !== o.getPriority().val() ? new Zt(s, ve(i)) : t
                }
                var a = t;
                return n = a, i !== a.getPriority().val() && (n = n.updatePriority(new Zt(i))), a.forEachChild(ne, function(t, r) {
                    var i = Oe(r, e);
                    i !== r && (n = n.updateImmediateChild(t, i))
                }), n
            };
        ! function(t) {
            t[t.OVERWRITE = 0] = "OVERWRITE", t[t.MERGE = 1] = "MERGE", t[t.ACK_USER_WRITE = 2] = "ACK_USER_WRITE", t[t.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE"
        }(me || (me = {}));
        var ke, xe, Fe = function() {
                function t(t, e, n, r) {
                    this.fromUser = t, this.fromServer = e, this.queryId = n, this.tagged = r, s(!r || e, "Tagged queries must be from server.")
                }
                return t.User = new t(!0, !1, null, !1), t.Server = new t(!1, !0, null, !1), t.forServerTaggedQuery = function(e) {
                    return new t(!1, !0, e, !0)
                }, t
            }(),
            Ae = function() {
                function t(t, e, n) {
                    this.path = t, this.affectedTree = e, this.revert = n, this.type = me.ACK_USER_WRITE, this.source = Fe.User
                }
                return t.prototype.operationForChild = function(e) {
                    if (this.path.isEmpty()) {
                        if (null != this.affectedTree.value) return s(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
                        var n = this.affectedTree.subtree(new mt(e));
                        return new t(mt.Empty, n, this.revert)
                    }
                    return s(this.path.getFront() === e, "operationForChild called for unrelated child."), new t(this.path.popFront(), this.affectedTree, this.revert)
                }, t
            }(),
            Le = function() {
                return ke || (ke = new se(ht)), ke
            },
            Me = function() {
                function t(t, e) {
                    void 0 === e && (e = Le()), this.value = t, this.children = e
                }
                return t.fromObject = function(e) {
                    var n = t.Empty;
                    return S(e, function(t, e) {
                        n = n.set(new mt(t), e)
                    }), n
                }, t.prototype.isEmpty = function() {
                    return null === this.value && this.children.isEmpty()
                }, t.prototype.findRootMostMatchingPathAndValue = function(t, e) {
                    if (null != this.value && e(this.value)) return {
                        path: mt.Empty,
                        value: this.value
                    };
                    if (t.isEmpty()) return null;
                    var n = t.getFront(),
                        r = this.children.get(n);
                    if (null !== r) {
                        var i = r.findRootMostMatchingPathAndValue(t.popFront(), e);
                        return null != i ? {
                            path: new mt(n).child(i.path),
                            value: i.value
                        } : null
                    }
                    return null
                }, t.prototype.findRootMostValueAndPath = function(t) {
                    return this.findRootMostMatchingPathAndValue(t, function() {
                        return !0
                    })
                }, t.prototype.subtree = function(e) {
                    if (e.isEmpty()) return this;
                    var n = e.getFront(),
                        r = this.children.get(n);
                    return null !== r ? r.subtree(e.popFront()) : t.Empty
                }, t.prototype.set = function(e, n) {
                    if (e.isEmpty()) return new t(n, this.children);
                    var r = e.getFront(),
                        i = (this.children.get(r) || t.Empty).set(e.popFront(), n),
                        o = this.children.insert(r, i);
                    return new t(this.value, o)
                }, t.prototype.remove = function(e) {
                    if (e.isEmpty()) return this.children.isEmpty() ? t.Empty : new t(null, this.children);
                    var n = e.getFront(),
                        r = this.children.get(n);
                    if (r) {
                        var i = r.remove(e.popFront()),
                            o = void 0;
                        return o = i.isEmpty() ? this.children.remove(n) : this.children.insert(n, i), null === this.value && o.isEmpty() ? t.Empty : new t(this.value, o)
                    }
                    return this
                }, t.prototype.get = function(t) {
                    if (t.isEmpty()) return this.value;
                    var e = t.getFront(),
                        n = this.children.get(e);
                    return n ? n.get(t.popFront()) : null
                }, t.prototype.setTree = function(e, n) {
                    if (e.isEmpty()) return n;
                    var r = e.getFront(),
                        i = (this.children.get(r) || t.Empty).setTree(e.popFront(), n),
                        o = void 0;
                    return o = i.isEmpty() ? this.children.remove(r) : this.children.insert(r, i), new t(this.value, o)
                }, t.prototype.fold = function(t) {
                    return this.fold_(mt.Empty, t)
                }, t.prototype.fold_ = function(t, e) {
                    var n = {};
                    return this.children.inorderTraversal(function(r, i) {
                        n[r] = i.fold_(t.child(r), e)
                    }), e(t, this.value, n)
                }, t.prototype.findOnPath = function(t, e) {
                    return this.findOnPath_(t, mt.Empty, e)
                }, t.prototype.findOnPath_ = function(t, e, n) {
                    var r = !!this.value && n(e, this.value);
                    if (r) return r;
                    if (t.isEmpty()) return null;
                    var i = t.getFront(),
                        o = this.children.get(i);
                    return o ? o.findOnPath_(t.popFront(), e.child(i), n) : null
                }, t.prototype.foreachOnPath = function(t, e) {
                    return this.foreachOnPath_(t, mt.Empty, e)
                }, t.prototype.foreachOnPath_ = function(e, n, r) {
                    if (e.isEmpty()) return this;
                    this.value && r(n, this.value);
                    var i = e.getFront(),
                        o = this.children.get(i);
                    return o ? o.foreachOnPath_(e.popFront(), n.child(i), r) : t.Empty
                }, t.prototype.foreach = function(t) {
                    this.foreach_(mt.Empty, t)
                }, t.prototype.foreach_ = function(t, e) {
                    this.children.inorderTraversal(function(n, r) {
                        r.foreach_(t.child(n), e)
                    }), this.value && e(t, this.value)
                }, t.prototype.foreachChild = function(t) {
                    this.children.inorderTraversal(function(e, n) {
                        n.value && t(e, n.value)
                    })
                }, t.Empty = new t(null), t
            }(),
            We = function() {
                function t(t, e) {
                    this.source = t, this.path = e, this.type = me.LISTEN_COMPLETE
                }
                return t.prototype.operationForChild = function(e) {
                    return this.path.isEmpty() ? new t(this.source, mt.Empty) : new t(this.source, this.path.popFront())
                }, t
            }(),
            qe = function() {
                function t(t, e, n) {
                    this.source = t, this.path = e, this.snap = n, this.type = me.OVERWRITE
                }
                return t.prototype.operationForChild = function(e) {
                    return this.path.isEmpty() ? new t(this.source, mt.Empty, this.snap.getImmediateChild(e)) : new t(this.source, this.path.popFront(), this.snap)
                }, t
            }(),
            Qe = function() {
                function t(t, e, n) {
                    this.source = t, this.path = e, this.children = n, this.type = me.MERGE
                }
                return t.prototype.operationForChild = function(e) {
                    if (this.path.isEmpty()) {
                        var n = this.children.subtree(new mt(e));
                        return n.isEmpty() ? null : n.value ? new qe(this.source, mt.Empty, n.value) : new t(this.source, mt.Empty, n)
                    }
                    return s(this.path.getFront() === e, "Can't get a merge for a child not on the path of the operation"), new t(this.source, this.path.popFront(), this.children)
                }, t.prototype.toString = function() {
                    return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
                }, t
            }(),
            Ue = function() {
                function t(t, e, n) {
                    this.node_ = t, this.fullyInitialized_ = e, this.filtered_ = n
                }
                return t.prototype.isFullyInitialized = function() {
                    return this.fullyInitialized_
                }, t.prototype.isFiltered = function() {
                    return this.filtered_
                }, t.prototype.isCompleteForPath = function(t) {
                    if (t.isEmpty()) return this.isFullyInitialized() && !this.filtered_;
                    var e = t.getFront();
                    return this.isCompleteForChild(e)
                }, t.prototype.isCompleteForChild = function(t) {
                    return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(t)
                }, t.prototype.getNode = function() {
                    return this.node_
                }, t
            }(),
            Ve = function() {
                function t(t, e) {
                    this.eventCache_ = t, this.serverCache_ = e
                }
                return t.prototype.updateEventSnap = function(e, n, r) {
                    return new t(new Ue(e, n, r), this.serverCache_)
                }, t.prototype.updateServerSnap = function(e, n, r) {
                    return new t(this.eventCache_, new Ue(e, n, r))
                }, t.prototype.getEventCache = function() {
                    return this.eventCache_
                }, t.prototype.getCompleteEventSnap = function() {
                    return this.eventCache_.isFullyInitialized() ? this.eventCache_.getNode() : null
                }, t.prototype.getServerCache = function() {
                    return this.serverCache_
                }, t.prototype.getCompleteServerSnap = function() {
                    return this.serverCache_.isFullyInitialized() ? this.serverCache_.getNode() : null
                }, t.Empty = new t(new Ue(fe.EMPTY_NODE, !1, !1), new Ue(fe.EMPTY_NODE, !1, !1)), t
            }(),
            He = function() {
                function t(t, e, n, r, i) {
                    this.type = t, this.snapshotNode = e, this.childName = n, this.oldSnap = r, this.prevName = i
                }
                return t.valueChange = function(e) {
                    return new t(t.VALUE, e)
                }, t.childAddedChange = function(e, n) {
                    return new t(t.CHILD_ADDED, n, e)
                }, t.childRemovedChange = function(e, n) {
                    return new t(t.CHILD_REMOVED, n, e)
                }, t.childChangedChange = function(e, n, r) {
                    return new t(t.CHILD_CHANGED, n, e, r)
                }, t.childMovedChange = function(e, n) {
                    return new t(t.CHILD_MOVED, n, e)
                }, t.CHILD_ADDED = "child_added", t.CHILD_REMOVED = "child_removed", t.CHILD_CHANGED = "child_changed", t.CHILD_MOVED = "child_moved", t.VALUE = "value", t
            }(),
            Be = function() {
                function t(t) {
                    this.index_ = t
                }
                return t.prototype.updateChild = function(t, e, n, r, i, o) {
                    s(t.isIndexed(this.index_), "A node must be indexed if only a child is updated");
                    var a = t.getImmediateChild(e);
                    return a.getChild(r).equals(n.getChild(r)) && a.isEmpty() == n.isEmpty() ? t : (null != o && (n.isEmpty() ? t.hasChild(e) ? o.trackChildChange(He.childRemovedChange(e, a)) : s(t.isLeafNode(), "A child remove without an old child only makes sense on a leaf node") : a.isEmpty() ? o.trackChildChange(He.childAddedChange(e, n)) : o.trackChildChange(He.childChangedChange(e, n, a))), t.isLeafNode() && n.isEmpty() ? t : t.updateImmediateChild(e, n).withIndex(this.index_))
                }, t.prototype.updateFullNode = function(t, e, n) {
                    return null != n && (t.isLeafNode() || t.forEachChild(ne, function(t, r) {
                        e.hasChild(t) || n.trackChildChange(He.childRemovedChange(t, r))
                    }), e.isLeafNode() || e.forEachChild(ne, function(e, r) {
                        if (t.hasChild(e)) {
                            var i = t.getImmediateChild(e);
                            i.equals(r) || n.trackChildChange(He.childChangedChange(e, r, i))
                        } else n.trackChildChange(He.childAddedChange(e, r))
                    })), e.withIndex(this.index_)
                }, t.prototype.updatePriority = function(t, e) {
                    return t.isEmpty() ? fe.EMPTY_NODE : t.updatePriority(e)
                }, t.prototype.filtersNodes = function() {
                    return !1
                }, t.prototype.getIndexedFilter = function() {
                    return this
                }, t.prototype.getIndex = function() {
                    return this.index_
                }, t
            }(),
            je = function() {
                function t() {
                    this.changeMap_ = {}
                }
                return t.prototype.trackChildChange = function(t) {
                    var e = t.type,
                        n = t.childName;
                    s(e == He.CHILD_ADDED || e == He.CHILD_CHANGED || e == He.CHILD_REMOVED, "Only child changes supported for tracking"), s(".priority" !== n, "Only non-priority child changes can be tracked.");
                    var r = b(this.changeMap_, n);
                    if (r) {
                        var i = r.type;
                        if (e == He.CHILD_ADDED && i == He.CHILD_REMOVED) this.changeMap_[n] = He.childChangedChange(n, t.snapshotNode, r.snapshotNode);
                        else if (e == He.CHILD_REMOVED && i == He.CHILD_ADDED) delete this.changeMap_[n];
                        else if (e == He.CHILD_REMOVED && i == He.CHILD_CHANGED) this.changeMap_[n] = He.childRemovedChange(n, r.oldSnap);
                        else if (e == He.CHILD_CHANGED && i == He.CHILD_ADDED) this.changeMap_[n] = He.childAddedChange(n, t.snapshotNode);
                        else {
                            if (e != He.CHILD_CHANGED || i != He.CHILD_CHANGED) throw a("Illegal combination of changes: " + t + " occurred after " + r);
                            this.changeMap_[n] = He.childChangedChange(n, t.snapshotNode, r.oldSnap)
                        }
                    } else this.changeMap_[n] = t
                }, t.prototype.getChanges = function() {
                    return function(t) {
                        var e = [],
                            n = 0;
                        for (var r in t) e[n++] = t[r];
                        return e
                    }(this.changeMap_)
                }, t
            }(),
            Ke = new(function() {
                function t() {}
                return t.prototype.getCompleteChild = function(t) {
                    return null
                }, t.prototype.getChildAfterChild = function(t, e, n) {
                    return null
                }, t
            }()),
            Ye = function() {
                function t(t, e, n) {
                    void 0 === n && (n = null), this.writes_ = t, this.viewCache_ = e, this.optCompleteServerCache_ = n
                }
                return t.prototype.getCompleteChild = function(t) {
                    var e = this.viewCache_.getEventCache();
                    if (e.isCompleteForChild(t)) return e.getNode().getImmediateChild(t);
                    var n = null != this.optCompleteServerCache_ ? new Ue(this.optCompleteServerCache_, !0, !1) : this.viewCache_.getServerCache();
                    return this.writes_.calcCompleteChild(t, n)
                }, t.prototype.getChildAfterChild = function(t, e, n) {
                    var r = null != this.optCompleteServerCache_ ? this.optCompleteServerCache_ : this.viewCache_.getCompleteServerSnap(),
                        i = this.writes_.calcIndexedSlice(r, e, 1, n, t);
                    return 0 === i.length ? null : i[0]
                }, t
            }(),
            ze = function() {
                return function(t, e) {
                    this.viewCache = t, this.changes = e
                }
            }(),
            Ge = function() {
                function t(t) {
                    this.filter_ = t
                }
                return t.prototype.assertIndexed = function(t) {
                    s(t.getEventCache().getNode().isIndexed(this.filter_.getIndex()), "Event snap not indexed"), s(t.getServerCache().getNode().isIndexed(this.filter_.getIndex()), "Server snap not indexed")
                }, t.prototype.applyOperation = function(e, n, r, i) {
                    var o, h, u = new je;
                    if (n.type === me.OVERWRITE) {
                        var l = n;
                        l.source.fromUser ? o = this.applyUserOverwrite_(e, l.path, l.snap, r, i, u) : (s(l.source.fromServer, "Unknown source."), h = l.source.tagged || e.getServerCache().isFiltered() && !l.path.isEmpty(), o = this.applyServerOverwrite_(e, l.path, l.snap, r, i, h, u))
                    } else if (n.type === me.MERGE) {
                        var c = n;
                        c.source.fromUser ? o = this.applyUserMerge_(e, c.path, c.children, r, i, u) : (s(c.source.fromServer, "Unknown source."), h = c.source.tagged || e.getServerCache().isFiltered(), o = this.applyServerMerge_(e, c.path, c.children, r, i, h, u))
                    } else if (n.type === me.ACK_USER_WRITE) {
                        var p = n;
                        o = p.revert ? this.revertUserWrite_(e, p.path, r, i, u) : this.ackUserWrite_(e, p.path, p.affectedTree, r, i, u)
                    } else {
                        if (n.type !== me.LISTEN_COMPLETE) throw a("Unknown operation type: " + n.type);
                        o = this.listenComplete_(e, n.path, r, u)
                    }
                    var d = u.getChanges();
                    return t.maybeAddValueEvent_(e, o, d), new ze(o, d)
                }, t.maybeAddValueEvent_ = function(t, e, n) {
                    var r = e.getEventCache();
                    if (r.isFullyInitialized()) {
                        var i = r.getNode().isLeafNode() || r.getNode().isEmpty(),
                            o = t.getCompleteEventSnap();
                        (n.length > 0 || !t.getEventCache().isFullyInitialized() || i && !r.getNode().equals(o) || !r.getNode().getPriority().equals(o.getPriority())) && n.push(He.valueChange(e.getCompleteEventSnap()))
                    }
                }, t.prototype.generateEventCacheAfterServerEvent_ = function(t, e, n, r, i) {
                    var o = t.getEventCache();
                    if (null != n.shadowingWrite(e)) return t;
                    var a = void 0,
                        h = void 0;
                    if (e.isEmpty())
                        if (s(t.getServerCache().isFullyInitialized(), "If change path is empty, we must have complete server data"), t.getServerCache().isFiltered()) {
                            var u = t.getCompleteServerSnap(),
                                l = u instanceof fe ? u : fe.EMPTY_NODE,
                                c = n.calcCompleteEventChildren(l);
                            a = this.filter_.updateFullNode(t.getEventCache().getNode(), c, i)
                        } else {
                            var p = n.calcCompleteEventCache(t.getCompleteServerSnap());
                            a = this.filter_.updateFullNode(t.getEventCache().getNode(), p, i)
                        }
                    else {
                        var d = e.getFront();
                        if (".priority" == d) {
                            s(1 == e.getLength(), "Can't have a priority with additional path components");
                            var f = o.getNode();
                            h = t.getServerCache().getNode();
                            var _ = n.calcEventCacheAfterServerOverwrite(e, f, h);
                            a = null != _ ? this.filter_.updatePriority(f, _) : o.getNode()
                        } else {
                            var y = e.popFront(),
                                v = void 0;
                            if (o.isCompleteForChild(d)) {
                                h = t.getServerCache().getNode();
                                var g = n.calcEventCacheAfterServerOverwrite(e, o.getNode(), h);
                                v = null != g ? o.getNode().getImmediateChild(d).updateChild(y, g) : o.getNode().getImmediateChild(d)
                            } else v = n.calcCompleteChild(d, t.getServerCache());
                            a = null != v ? this.filter_.updateChild(o.getNode(), d, v, y, r, i) : o.getNode()
                        }
                    }
                    return t.updateEventSnap(a, o.isFullyInitialized() || e.isEmpty(), this.filter_.filtersNodes())
                }, t.prototype.applyServerOverwrite_ = function(t, e, n, r, i, o, s) {
                    var a, h = t.getServerCache(),
                        u = o ? this.filter_ : this.filter_.getIndexedFilter();
                    if (e.isEmpty()) a = u.updateFullNode(h.getNode(), n, null);
                    else if (u.filtersNodes() && !h.isFiltered()) {
                        var l = h.getNode().updateChild(e, n);
                        a = u.updateFullNode(h.getNode(), l, null)
                    } else {
                        var c = e.getFront();
                        if (!h.isCompleteForPath(e) && e.getLength() > 1) return t;
                        var p = e.popFront(),
                            d = h.getNode().getImmediateChild(c).updateChild(p, n);
                        a = ".priority" == c ? u.updatePriority(h.getNode(), d) : u.updateChild(h.getNode(), c, d, p, Ke, null)
                    }
                    var f = t.updateServerSnap(a, h.isFullyInitialized() || e.isEmpty(), u.filtersNodes()),
                        _ = new Ye(r, f, i);
                    return this.generateEventCacheAfterServerEvent_(f, e, r, _, s)
                }, t.prototype.applyUserOverwrite_ = function(t, e, n, r, i, o) {
                    var s, a, h = t.getEventCache(),
                        u = new Ye(r, t, i);
                    if (e.isEmpty()) a = this.filter_.updateFullNode(t.getEventCache().getNode(), n, o), s = t.updateEventSnap(a, !0, this.filter_.filtersNodes());
                    else {
                        var l = e.getFront();
                        if (".priority" === l) a = this.filter_.updatePriority(t.getEventCache().getNode(), n), s = t.updateEventSnap(a, h.isFullyInitialized(), h.isFiltered());
                        else {
                            var c = e.popFront(),
                                p = h.getNode().getImmediateChild(l),
                                d = void 0;
                            if (c.isEmpty()) d = n;
                            else {
                                var f = u.getCompleteChild(l);
                                d = null != f ? ".priority" === c.getBack() && f.getChild(c.parent()).isEmpty() ? f : f.updateChild(c, n) : fe.EMPTY_NODE
                            }
                            if (p.equals(d)) s = t;
                            else {
                                var _ = this.filter_.updateChild(h.getNode(), l, d, c, u, o);
                                s = t.updateEventSnap(_, h.isFullyInitialized(), this.filter_.filtersNodes())
                            }
                        }
                    }
                    return s
                }, t.cacheHasChild_ = function(t, e) {
                    return t.getEventCache().isCompleteForChild(e)
                }, t.prototype.applyUserMerge_ = function(e, n, r, i, o, s) {
                    var a = this,
                        h = e;
                    return r.foreach(function(r, u) {
                        var l = n.child(r);
                        t.cacheHasChild_(e, l.getFront()) && (h = a.applyUserOverwrite_(h, l, u, i, o, s))
                    }), r.foreach(function(r, u) {
                        var l = n.child(r);
                        t.cacheHasChild_(e, l.getFront()) || (h = a.applyUserOverwrite_(h, l, u, i, o, s))
                    }), h
                }, t.prototype.applyMerge_ = function(t, e) {
                    return e.foreach(function(e, n) {
                        t = t.updateChild(e, n)
                    }), t
                }, t.prototype.applyServerMerge_ = function(t, e, n, r, i, o, s) {
                    var a = this;
                    if (t.getServerCache().getNode().isEmpty() && !t.getServerCache().isFullyInitialized()) return t;
                    var h, u = t;
                    h = e.isEmpty() ? n : Me.Empty.setTree(e, n);
                    var l = t.getServerCache().getNode();
                    return h.children.inorderTraversal(function(e, n) {
                        if (l.hasChild(e)) {
                            var h = t.getServerCache().getNode().getImmediateChild(e),
                                c = a.applyMerge_(h, n);
                            u = a.applyServerOverwrite_(u, new mt(e), c, r, i, o, s)
                        }
                    }), h.children.inorderTraversal(function(e, n) {
                        var h = !t.getServerCache().isCompleteForChild(e) && null == n.value;
                        if (!l.hasChild(e) && !h) {
                            var c = t.getServerCache().getNode().getImmediateChild(e),
                                p = a.applyMerge_(c, n);
                            u = a.applyServerOverwrite_(u, new mt(e), p, r, i, o, s)
                        }
                    }), u
                }, t.prototype.ackUserWrite_ = function(t, e, n, r, i, o) {
                    if (null != r.shadowingWrite(e)) return t;
                    var s = t.getServerCache().isFiltered(),
                        a = t.getServerCache();
                    if (null != n.value) {
                        if (e.isEmpty() && a.isFullyInitialized() || a.isCompleteForPath(e)) return this.applyServerOverwrite_(t, e, a.getNode().getChild(e), r, i, s, o);
                        if (e.isEmpty()) {
                            var h = Me.Empty;
                            return a.getNode().forEachChild(Yt, function(t, e) {
                                h = h.set(new mt(t), e)
                            }), this.applyServerMerge_(t, e, h, r, i, s, o)
                        }
                        return t
                    }
                    var u = Me.Empty;
                    return n.foreach(function(t, n) {
                        var r = e.child(t);
                        a.isCompleteForPath(r) && (u = u.set(t, a.getNode().getChild(r)))
                    }), this.applyServerMerge_(t, e, u, r, i, s, o)
                }, t.prototype.listenComplete_ = function(t, e, n, r) {
                    var i = t.getServerCache(),
                        o = t.updateServerSnap(i.getNode(), i.isFullyInitialized() || e.isEmpty(), i.isFiltered());
                    return this.generateEventCacheAfterServerEvent_(o, e, n, Ke, r)
                }, t.prototype.revertUserWrite_ = function(t, e, n, r, i) {
                    var o;
                    if (null != n.shadowingWrite(e)) return t;
                    var a = new Ye(n, t, r),
                        h = t.getEventCache().getNode(),
                        u = void 0;
                    if (e.isEmpty() || ".priority" === e.getFront()) {
                        var l = void 0;
                        if (t.getServerCache().isFullyInitialized()) l = n.calcCompleteEventCache(t.getCompleteServerSnap());
                        else {
                            var c = t.getServerCache().getNode();
                            s(c instanceof fe, "serverChildren would be complete if leaf node"), l = n.calcCompleteEventChildren(c)
                        }
                        l = l, u = this.filter_.updateFullNode(h, l, i)
                    } else {
                        var p = e.getFront(),
                            d = n.calcCompleteChild(p, t.getServerCache());
                        null == d && t.getServerCache().isCompleteForChild(p) && (d = h.getImmediateChild(p)), (u = null != d ? this.filter_.updateChild(h, p, d, e.popFront(), a, i) : t.getEventCache().getNode().hasChild(p) ? this.filter_.updateChild(h, p, fe.EMPTY_NODE, e.popFront(), a, i) : h).isEmpty() && t.getServerCache().isFullyInitialized() && (o = n.calcCompleteEventCache(t.getCompleteServerSnap())).isLeafNode() && (u = this.filter_.updateFullNode(u, o, i))
                    }
                    return o = t.getServerCache().isFullyInitialized() || null != n.shadowingWrite(mt.Empty), t.updateEventSnap(u, o, this.filter_.filtersNodes())
                }, t
            }(),
            Xe = function() {
                function t(t) {
                    this.query_ = t, this.index_ = this.query_.getQueryParams().getIndex()
                }
                return t.prototype.generateEventsForChanges = function(t, e, n) {
                    var r = this,
                        i = [],
                        o = [];
                    return t.forEach(function(t) {
                        t.type === He.CHILD_CHANGED && r.index_.indexedValueChanged(t.oldSnap, t.snapshotNode) && o.push(He.childMovedChange(t.childName, t.snapshotNode))
                    }), this.generateEventsForType_(i, He.CHILD_REMOVED, t, n, e), this.generateEventsForType_(i, He.CHILD_ADDED, t, n, e), this.generateEventsForType_(i, He.CHILD_MOVED, o, n, e), this.generateEventsForType_(i, He.CHILD_CHANGED, t, n, e), this.generateEventsForType_(i, He.VALUE, t, n, e), i
                }, t.prototype.generateEventsForType_ = function(t, e, n, r, i) {
                    var o = this,
                        s = n.filter(function(t) {
                            return t.type === e
                        });
                    s.sort(this.compareChanges_.bind(this)), s.forEach(function(e) {
                        var n = o.materializeSingleChange_(e, i);
                        r.forEach(function(r) {
                            r.respondsTo(e.type) && t.push(r.createEvent(n, o.query_))
                        })
                    })
                }, t.prototype.materializeSingleChange_ = function(t, e) {
                    return "value" === t.type || "child_removed" === t.type ? t : (t.prevName = e.getPredecessorChildName(t.childName, t.snapshotNode, this.index_), t)
                }, t.prototype.compareChanges_ = function(t, e) {
                    if (null == t.childName || null == e.childName) throw a("Should only compare child_ events.");
                    var n = new Bt(t.childName, t.snapshotNode),
                        r = new Bt(e.childName, e.snapshotNode);
                    return this.index_.compare(n, r)
                }, t
            }(),
            $e = function() {
                function t(t, e) {
                    this.query_ = t, this.eventRegistrations_ = [];
                    var n = this.query_.getQueryParams(),
                        r = new Be(n.getIndex()),
                        i = n.getNodeFilter();
                    this.processor_ = new Ge(i);
                    var o = e.getServerCache(),
                        s = e.getEventCache(),
                        a = r.updateFullNode(fe.EMPTY_NODE, o.getNode(), null),
                        h = i.updateFullNode(fe.EMPTY_NODE, s.getNode(), null),
                        u = new Ue(a, o.isFullyInitialized(), r.filtersNodes()),
                        l = new Ue(h, s.isFullyInitialized(), i.filtersNodes());
                    this.viewCache_ = new Ve(l, u), this.eventGenerator_ = new Xe(this.query_)
                }
                return t.prototype.getQuery = function() {
                    return this.query_
                }, t.prototype.getServerCache = function() {
                    return this.viewCache_.getServerCache().getNode()
                }, t.prototype.getCompleteServerCache = function(t) {
                    var e = this.viewCache_.getCompleteServerSnap();
                    return e && (this.query_.getQueryParams().loadsAllData() || !t.isEmpty() && !e.getImmediateChild(t.getFront()).isEmpty()) ? e.getChild(t) : null
                }, t.prototype.isEmpty = function() {
                    return 0 === this.eventRegistrations_.length
                }, t.prototype.addEventRegistration = function(t) {
                    this.eventRegistrations_.push(t)
                }, t.prototype.removeEventRegistration = function(t, e) {
                    var n = [];
                    if (e) {
                        s(null == t, "A cancel should cancel all event registrations.");
                        var r = this.query_.path;
                        this.eventRegistrations_.forEach(function(t) {
                            e = e;
                            var i = t.createCancelEvent(e, r);
                            i && n.push(i)
                        })
                    }
                    if (t) {
                        for (var i = [], o = 0; o < this.eventRegistrations_.length; ++o) {
                            var a = this.eventRegistrations_[o];
                            if (a.matches(t)) {
                                if (t.hasAnyCallback()) {
                                    i = i.concat(this.eventRegistrations_.slice(o + 1));
                                    break
                                }
                            } else i.push(a)
                        }
                        this.eventRegistrations_ = i
                    } else this.eventRegistrations_ = [];
                    return n
                }, t.prototype.applyOperation = function(t, e, n) {
                    t.type === me.MERGE && null !== t.source.queryId && (s(this.viewCache_.getCompleteServerSnap(), "We should always have a full cache before handling merges"), s(this.viewCache_.getCompleteEventSnap(), "Missing event cache, even though we have a server cache"));
                    var r = this.viewCache_,
                        i = this.processor_.applyOperation(r, t, e, n);
                    return this.processor_.assertIndexed(i.viewCache), s(i.viewCache.getServerCache().isFullyInitialized() || !r.getServerCache().isFullyInitialized(), "Once a server snap is complete, it should never go back"), this.viewCache_ = i.viewCache, this.generateEventsForChanges_(i.changes, i.viewCache.getEventCache().getNode(), null)
                }, t.prototype.getInitialEvents = function(t) {
                    var e = this.viewCache_.getEventCache(),
                        n = [];
                    e.getNode().isLeafNode() || e.getNode().forEachChild(ne, function(t, e) {
                        n.push(He.childAddedChange(t, e))
                    });
                    return e.isFullyInitialized() && n.push(He.valueChange(e.getNode())), this.generateEventsForChanges_(n, e.getNode(), t)
                }, t.prototype.generateEventsForChanges_ = function(t, e, n) {
                    var r = n ? [n] : this.eventRegistrations_;
                    return this.eventGenerator_.generateEventsForChanges(t, e, r)
                }, t
            }(),
            Je = function() {
                function t() {
                    this.views_ = {}
                }
                return Object.defineProperty(t, "__referenceConstructor", {
                    get: function() {
                        return s(xe, "Reference.ts has not been loaded"), xe
                    },
                    set: function(t) {
                        s(!xe, "__referenceConstructor has already been defined"), xe = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.isEmpty = function() {
                    return N(this.views_)
                }, t.prototype.applyOperation = function(t, e, n) {
                    var r = t.source.queryId;
                    if (null !== r) {
                        var i = b(this.views_, r);
                        return s(null != i, "SyncTree gave us an op for an invalid query."), i.applyOperation(t, e, n)
                    }
                    var o = [];
                    return S(this.views_, function(r, i) {
                        o = o.concat(i.applyOperation(t, e, n))
                    }), o
                }, t.prototype.addEventRegistration = function(t, e, n, r, i) {
                    var o = t.queryIdentifier(),
                        s = b(this.views_, o);
                    if (!s) {
                        var a = n.calcCompleteEventCache(i ? r : null),
                            h = !1;
                        a ? h = !0 : r instanceof fe ? (a = n.calcCompleteEventChildren(r), h = !1) : (a = fe.EMPTY_NODE, h = !1);
                        var u = new Ve(new Ue(a, h, !1), new Ue(r, i, !1));
                        s = new $e(t, u), this.views_[o] = s
                    }
                    return s.addEventRegistration(e), s.getInitialEvents(e)
                }, t.prototype.removeEventRegistration = function(e, n, r) {
                    var i = e.queryIdentifier(),
                        o = [],
                        s = [],
                        a = this.hasCompleteView();
                    if ("default" === i) {
                        var h = this;
                        S(this.views_, function(t, e) {
                            s = s.concat(e.removeEventRegistration(n, r)), e.isEmpty() && (delete h.views_[t], e.getQuery().getQueryParams().loadsAllData() || o.push(e.getQuery()))
                        })
                    } else {
                        var u = b(this.views_, i);
                        u && (s = s.concat(u.removeEventRegistration(n, r)), u.isEmpty() && (delete this.views_[i], u.getQuery().getQueryParams().loadsAllData() || o.push(u.getQuery())))
                    }
                    return a && !this.hasCompleteView() && o.push(new t.__referenceConstructor(e.repo, e.path)), {
                        removed: o,
                        events: s
                    }
                }, t.prototype.getQueryViews = function() {
                    var t = this;
                    return Object.keys(this.views_).map(function(e) {
                        return t.views_[e]
                    }).filter(function(t) {
                        return !t.getQuery().getQueryParams().loadsAllData()
                    })
                }, t.prototype.getCompleteServerCache = function(t) {
                    var e = null;
                    return S(this.views_, function(n, r) {
                        e = e || r.getCompleteServerCache(t)
                    }), e
                }, t.prototype.viewForQuery = function(t) {
                    if (t.getQueryParams().loadsAllData()) return this.getCompleteView();
                    var e = t.queryIdentifier();
                    return b(this.views_, e)
                }, t.prototype.viewExistsForQuery = function(t) {
                    return null != this.viewForQuery(t)
                }, t.prototype.hasCompleteView = function() {
                    return null != this.getCompleteView()
                }, t.prototype.getCompleteView = function() {
                    var t, e, n;
                    return (t = this.views_, (n = P(t, function(t) {
                        return t.getQuery().getQueryParams().loadsAllData()
                    }, e)) && t[n]) || null
                }, t
            }(),
            Ze = function() {
                function t(t) {
                    this.writeTree_ = t
                }
                return t.prototype.addWrite = function(e, n) {
                    if (e.isEmpty()) return new t(new Me(n));
                    var r = this.writeTree_.findRootMostValueAndPath(e);
                    if (null != r) {
                        var i = r.path,
                            o = r.value,
                            s = mt.relativePath(i, e);
                        return o = o.updateChild(s, n), new t(this.writeTree_.set(i, o))
                    }
                    var a = new Me(n);
                    return new t(this.writeTree_.setTree(e, a))
                }, t.prototype.addWrites = function(t, e) {
                    var n = this;
                    return S(e, function(e, r) {
                        n = n.addWrite(t.child(e), r)
                    }), n
                }, t.prototype.removeWrite = function(e) {
                    return e.isEmpty() ? t.Empty : new t(this.writeTree_.setTree(e, Me.Empty))
                }, t.prototype.hasCompleteWrite = function(t) {
                    return null != this.getCompleteNode(t)
                }, t.prototype.getCompleteNode = function(t) {
                    var e = this.writeTree_.findRootMostValueAndPath(t);
                    return null != e ? this.writeTree_.get(e.path).getChild(mt.relativePath(e.path, t)) : null
                }, t.prototype.getCompleteChildren = function() {
                    var t = [],
                        e = this.writeTree_.value;
                    return null != e ? e.isLeafNode() || e.forEachChild(ne, function(e, n) {
                        t.push(new Bt(e, n))
                    }) : this.writeTree_.children.inorderTraversal(function(e, n) {
                        null != n.value && t.push(new Bt(e, n.value))
                    }), t
                }, t.prototype.childCompoundWrite = function(e) {
                    if (e.isEmpty()) return this;
                    var n = this.getCompleteNode(e);
                    return new t(null != n ? new Me(n) : this.writeTree_.subtree(e))
                }, t.prototype.isEmpty = function() {
                    return this.writeTree_.isEmpty()
                }, t.prototype.apply = function(e) {
                    return t.applySubtreeWrite_(mt.Empty, this.writeTree_, e)
                }, t.Empty = new t(new Me(null)), t.applySubtreeWrite_ = function(e, n, r) {
                    if (null != n.value) return r.updateChild(e, n.value);
                    var i = null;
                    return n.children.inorderTraversal(function(n, o) {
                        ".priority" === n ? (s(null !== o.value, "Priority writes must always be leaf nodes"), i = o.value) : r = t.applySubtreeWrite_(e.child(n), o, r)
                    }), r.getChild(e).isEmpty() || null === i || (r = r.updateChild(e.child(".priority"), i)), r
                }, t
            }(),
            tn = function() {
                function t() {
                    this.visibleWrites_ = Ze.Empty, this.allWrites_ = [], this.lastWriteId_ = -1
                }
                return t.prototype.childWrites = function(t) {
                    return new en(t, this)
                }, t.prototype.addOverwrite = function(t, e, n, r) {
                    s(n > this.lastWriteId_, "Stacking an older write on top of newer ones"), void 0 === r && (r = !0), this.allWrites_.push({
                        path: t,
                        snap: e,
                        writeId: n,
                        visible: r
                    }), r && (this.visibleWrites_ = this.visibleWrites_.addWrite(t, e)), this.lastWriteId_ = n
                }, t.prototype.addMerge = function(t, e, n) {
                    s(n > this.lastWriteId_, "Stacking an older merge on top of newer ones"), this.allWrites_.push({
                        path: t,
                        children: e,
                        writeId: n,
                        visible: !0
                    }), this.visibleWrites_ = this.visibleWrites_.addWrites(t, e), this.lastWriteId_ = n
                }, t.prototype.getWrite = function(t) {
                    for (var e = 0; e < this.allWrites_.length; e++) {
                        var n = this.allWrites_[e];
                        if (n.writeId === t) return n
                    }
                    return null
                }, t.prototype.removeWrite = function(t) {
                    var e = this,
                        n = this.allWrites_.findIndex(function(e) {
                            return e.writeId === t
                        });
                    s(n >= 0, "removeWrite called with nonexistent writeId.");
                    var r = this.allWrites_[n];
                    this.allWrites_.splice(n, 1);
                    for (var i = r.visible, o = !1, a = this.allWrites_.length - 1; i && a >= 0;) {
                        var h = this.allWrites_[a];
                        h.visible && (a >= n && this.recordContainsPath_(h, r.path) ? i = !1 : r.path.contains(h.path) && (o = !0)), a--
                    }
                    if (i) {
                        if (o) return this.resetTree_(), !0;
                        if (r.snap) this.visibleWrites_ = this.visibleWrites_.removeWrite(r.path);
                        else {
                            var u = r.children;
                            S(u, function(t) {
                                e.visibleWrites_ = e.visibleWrites_.removeWrite(r.path.child(t))
                            })
                        }
                        return !0
                    }
                    return !1
                }, t.prototype.getCompleteWriteData = function(t) {
                    return this.visibleWrites_.getCompleteNode(t)
                }, t.prototype.calcCompleteEventCache = function(e, n, r, i) {
                    if (r || i) {
                        var o = this.visibleWrites_.childCompoundWrite(e);
                        if (!i && o.isEmpty()) return n;
                        if (i || null != n || o.hasCompleteWrite(mt.Empty)) {
                            var s = t.layerTree_(this.allWrites_, function(t) {
                                return (t.visible || i) && (!r || !~r.indexOf(t.writeId)) && (t.path.contains(e) || e.contains(t.path))
                            }, e);
                            u = n || fe.EMPTY_NODE;
                            return s.apply(u)
                        }
                        return null
                    }
                    var a = this.visibleWrites_.getCompleteNode(e);
                    if (null != a) return a;
                    var h = this.visibleWrites_.childCompoundWrite(e);
                    if (h.isEmpty()) return n;
                    if (null != n || h.hasCompleteWrite(mt.Empty)) {
                        var u = n || fe.EMPTY_NODE;
                        return h.apply(u)
                    }
                    return null
                }, t.prototype.calcCompleteEventChildren = function(t, e) {
                    var n = fe.EMPTY_NODE,
                        r = this.visibleWrites_.getCompleteNode(t);
                    if (r) return r.isLeafNode() || r.forEachChild(ne, function(t, e) {
                        n = n.updateImmediateChild(t, e)
                    }), n;
                    if (e) {
                        var i = this.visibleWrites_.childCompoundWrite(t);
                        return e.forEachChild(ne, function(t, e) {
                            var r = i.childCompoundWrite(new mt(t)).apply(e);
                            n = n.updateImmediateChild(t, r)
                        }), i.getCompleteChildren().forEach(function(t) {
                            n = n.updateImmediateChild(t.name, t.node)
                        }), n
                    }
                    return this.visibleWrites_.childCompoundWrite(t).getCompleteChildren().forEach(function(t) {
                        n = n.updateImmediateChild(t.name, t.node)
                    }), n
                }, t.prototype.calcEventCacheAfterServerOverwrite = function(t, e, n, r) {
                    s(n || r, "Either existingEventSnap or existingServerSnap must exist");
                    var i = t.child(e);
                    if (this.visibleWrites_.hasCompleteWrite(i)) return null;
                    var o = this.visibleWrites_.childCompoundWrite(i);
                    return o.isEmpty() ? r.getChild(e) : o.apply(r.getChild(e))
                }, t.prototype.calcCompleteChild = function(t, e, n) {
                    var r = t.child(e),
                        i = this.visibleWrites_.getCompleteNode(r);
                    return null != i ? i : n.isCompleteForChild(e) ? this.visibleWrites_.childCompoundWrite(r).apply(n.getNode().getImmediateChild(e)) : null
                }, t.prototype.shadowingWrite = function(t) {
                    return this.visibleWrites_.getCompleteNode(t)
                }, t.prototype.calcIndexedSlice = function(t, e, n, r, i, o) {
                    var s, a = this.visibleWrites_.childCompoundWrite(t),
                        h = a.getCompleteNode(mt.Empty);
                    if (null != h) s = h;
                    else {
                        if (null == e) return [];
                        s = a.apply(e)
                    }
                    if ((s = s.withIndex(o)).isEmpty() || s.isLeafNode()) return [];
                    for (var u = [], l = o.getCompare(), c = i ? s.getReverseIteratorFrom(n, o) : s.getIteratorFrom(n, o), p = c.getNext(); p && u.length < r;) 0 !== l(p, n) && u.push(p), p = c.getNext();
                    return u
                }, t.prototype.recordContainsPath_ = function(t, e) {
                    return t.snap ? t.path.contains(e) : !!P(t.children, function(n, r) {
                        return t.path.child(r).contains(e)
                    })
                }, t.prototype.resetTree_ = function() {
                    this.visibleWrites_ = t.layerTree_(this.allWrites_, t.DefaultFilter_, mt.Empty), this.allWrites_.length > 0 ? this.lastWriteId_ = this.allWrites_[this.allWrites_.length - 1].writeId : this.lastWriteId_ = -1
                }, t.DefaultFilter_ = function(t) {
                    return t.visible
                }, t.layerTree_ = function(t, e, n) {
                    for (var r = Ze.Empty, i = 0; i < t.length; ++i) {
                        var o = t[i];
                        if (e(o)) {
                            var s = o.path,
                                h = void 0;
                            if (o.snap) n.contains(s) ? (h = mt.relativePath(n, s), r = r.addWrite(h, o.snap)) : s.contains(n) && (h = mt.relativePath(s, n), r = r.addWrite(mt.Empty, o.snap.getChild(h)));
                            else {
                                if (!o.children) throw a("WriteRecord should have .snap or .children");
                                if (n.contains(s)) h = mt.relativePath(n, s), r = r.addWrites(h, o.children);
                                else if (s.contains(n))
                                    if ((h = mt.relativePath(s, n)).isEmpty()) r = r.addWrites(mt.Empty, o.children);
                                    else {
                                        var u = b(o.children, h.getFront());
                                        if (u) {
                                            var l = u.getChild(h.popFront());
                                            r = r.addWrite(mt.Empty, l)
                                        }
                                    }
                            }
                        }
                    }
                    return r
                }, t
            }(),
            en = function() {
                function t(t, e) {
                    this.treePath_ = t, this.writeTree_ = e
                }
                return t.prototype.calcCompleteEventCache = function(t, e, n) {
                    return this.writeTree_.calcCompleteEventCache(this.treePath_, t, e, n)
                }, t.prototype.calcCompleteEventChildren = function(t) {
                    return this.writeTree_.calcCompleteEventChildren(this.treePath_, t)
                }, t.prototype.calcEventCacheAfterServerOverwrite = function(t, e, n) {
                    return this.writeTree_.calcEventCacheAfterServerOverwrite(this.treePath_, t, e, n)
                }, t.prototype.shadowingWrite = function(t) {
                    return this.writeTree_.shadowingWrite(this.treePath_.child(t))
                }, t.prototype.calcIndexedSlice = function(t, e, n, r, i) {
                    return this.writeTree_.calcIndexedSlice(this.treePath_, t, e, n, r, i)
                }, t.prototype.calcCompleteChild = function(t, e) {
                    return this.writeTree_.calcCompleteChild(this.treePath_, t, e)
                }, t.prototype.child = function(e) {
                    return new t(this.treePath_.child(e), this.writeTree_)
                }, t
            }(),
            nn = function() {
                function t(t) {
                    this.listenProvider_ = t, this.syncPointTree_ = Me.Empty, this.pendingWriteTree_ = new tn, this.tagToQueryMap_ = {}, this.queryToTagMap_ = {}
                }
                return t.prototype.applyUserOverwrite = function(t, e, n, r) {
                    return this.pendingWriteTree_.addOverwrite(t, e, n, r), r ? this.applyOperationToSyncPoints_(new qe(Fe.User, t, e)) : []
                }, t.prototype.applyUserMerge = function(t, e, n) {
                    this.pendingWriteTree_.addMerge(t, e, n);
                    var r = Me.fromObject(e);
                    return this.applyOperationToSyncPoints_(new Qe(Fe.User, t, r))
                }, t.prototype.ackUserWrite = function(t, e) {
                    void 0 === e && (e = !1);
                    var n = this.pendingWriteTree_.getWrite(t);
                    if (this.pendingWriteTree_.removeWrite(t)) {
                        var r = Me.Empty;
                        return null != n.snap ? r = r.set(mt.Empty, !0) : S(n.children, function(t, e) {
                            r = r.set(new mt(t), e)
                        }), this.applyOperationToSyncPoints_(new Ae(n.path, r, e))
                    }
                    return []
                }, t.prototype.applyServerOverwrite = function(t, e) {
                    return this.applyOperationToSyncPoints_(new qe(Fe.Server, t, e))
                }, t.prototype.applyServerMerge = function(t, e) {
                    var n = Me.fromObject(e);
                    return this.applyOperationToSyncPoints_(new Qe(Fe.Server, t, n))
                }, t.prototype.applyListenComplete = function(t) {
                    return this.applyOperationToSyncPoints_(new We(Fe.Server, t))
                }, t.prototype.applyTaggedQueryOverwrite = function(e, n, r) {
                    var i = this.queryKeyForTag_(r);
                    if (null != i) {
                        var o = t.parseQueryKey_(i),
                            s = o.path,
                            a = o.queryId,
                            h = mt.relativePath(s, e),
                            u = new qe(Fe.forServerTaggedQuery(a), h, n);
                        return this.applyTaggedOperation_(s, u)
                    }
                    return []
                }, t.prototype.applyTaggedQueryMerge = function(e, n, r) {
                    var i = this.queryKeyForTag_(r);
                    if (i) {
                        var o = t.parseQueryKey_(i),
                            s = o.path,
                            a = o.queryId,
                            h = mt.relativePath(s, e),
                            u = Me.fromObject(n),
                            l = new Qe(Fe.forServerTaggedQuery(a), h, u);
                        return this.applyTaggedOperation_(s, l)
                    }
                    return []
                }, t.prototype.applyTaggedListenComplete = function(e, n) {
                    var r = this.queryKeyForTag_(n);
                    if (r) {
                        var i = t.parseQueryKey_(r),
                            o = i.path,
                            s = i.queryId,
                            a = mt.relativePath(o, e),
                            h = new We(Fe.forServerTaggedQuery(s), a);
                        return this.applyTaggedOperation_(o, h)
                    }
                    return []
                }, t.prototype.addEventRegistration = function(e, n) {
                    var r = e.path,
                        i = null,
                        o = !1;
                    this.syncPointTree_.foreachOnPath(r, function(t, e) {
                        var n = mt.relativePath(t, r);
                        i = i || e.getCompleteServerCache(n), o = o || e.hasCompleteView()
                    });
                    var a, h = this.syncPointTree_.get(r);
                    (h ? (o = o || h.hasCompleteView(), i = i || h.getCompleteServerCache(mt.Empty)) : (h = new Je, this.syncPointTree_ = this.syncPointTree_.set(r, h)), null != i) ? a = !0: (a = !1, i = fe.EMPTY_NODE, this.syncPointTree_.subtree(r).foreachChild(function(t, e) {
                        var n = e.getCompleteServerCache(mt.Empty);
                        n && (i = i.updateImmediateChild(t, n))
                    }));
                    var u = h.viewExistsForQuery(e);
                    if (!u && !e.getQueryParams().loadsAllData()) {
                        var l = t.makeQueryKey_(e);
                        s(!(l in this.queryToTagMap_), "View does not exist, but we have a tag");
                        var c = t.getNextQueryTag_();
                        this.queryToTagMap_[l] = c, this.tagToQueryMap_["_" + c] = l
                    }
                    var p = this.pendingWriteTree_.childWrites(r),
                        d = h.addEventRegistration(e, n, p, i, a);
                    if (!u && !o) {
                        var f = h.viewForQuery(e);
                        d = d.concat(this.setupListener_(e, f))
                    }
                    return d
                }, t.prototype.removeEventRegistration = function(e, n, r) {
                    var i = this,
                        o = e.path,
                        s = this.syncPointTree_.get(o),
                        a = [];
                    if (s && ("default" === e.queryIdentifier() || s.viewExistsForQuery(e))) {
                        var h = s.removeEventRegistration(e, n, r);
                        s.isEmpty() && (this.syncPointTree_ = this.syncPointTree_.remove(o));
                        var u = h.removed;
                        a = h.events;
                        var l = -1 !== u.findIndex(function(t) {
                                return t.getQueryParams().loadsAllData()
                            }),
                            c = this.syncPointTree_.findOnPath(o, function(t, e) {
                                return e.hasCompleteView()
                            });
                        if (l && !c) {
                            var p = this.syncPointTree_.subtree(o);
                            if (!p.isEmpty())
                                for (var d = this.collectDistinctViewsForSubTree_(p), f = 0; f < d.length; ++f) {
                                    var _ = d[f],
                                        y = _.getQuery(),
                                        v = this.createListenerForView_(_);
                                    this.listenProvider_.startListening(t.queryForListening_(y), this.tagForQuery_(y), v.hashFn, v.onComplete)
                                }
                        }
                        if (!c && u.length > 0 && !r)
                            if (l) {
                                this.listenProvider_.stopListening(t.queryForListening_(e), null)
                            } else u.forEach(function(e) {
                                var n = i.queryToTagMap_[t.makeQueryKey_(e)];
                                i.listenProvider_.stopListening(t.queryForListening_(e), n)
                            });
                        this.removeTags_(u)
                    }
                    return a
                }, t.prototype.calcCompleteEventCache = function(t, e) {
                    var n = this.pendingWriteTree_,
                        r = this.syncPointTree_.findOnPath(t, function(e, n) {
                            var r = mt.relativePath(e, t),
                                i = n.getCompleteServerCache(r);
                            if (i) return i
                        });
                    return n.calcCompleteEventCache(t, r, e, !0)
                }, t.prototype.collectDistinctViewsForSubTree_ = function(t) {
                    return t.fold(function(t, e, n) {
                        if (e && e.hasCompleteView()) return [e.getCompleteView()];
                        var r = [];
                        return e && (r = e.getQueryViews()), S(n, function(t, e) {
                            r = r.concat(e)
                        }), r
                    })
                }, t.prototype.removeTags_ = function(e) {
                    for (var n = 0; n < e.length; ++n) {
                        var r = e[n];
                        if (!r.getQueryParams().loadsAllData()) {
                            var i = t.makeQueryKey_(r),
                                o = this.queryToTagMap_[i];
                            delete this.queryToTagMap_[i], delete this.tagToQueryMap_["_" + o]
                        }
                    }
                }, t.queryForListening_ = function(t) {
                    return t.getQueryParams().loadsAllData() && !t.getQueryParams().isDefault() ? t.getRef() : t
                }, t.prototype.setupListener_ = function(e, n) {
                    var r = e.path,
                        i = this.tagForQuery_(e),
                        o = this.createListenerForView_(n),
                        a = this.listenProvider_.startListening(t.queryForListening_(e), i, o.hashFn, o.onComplete),
                        h = this.syncPointTree_.subtree(r);
                    if (i) s(!h.value.hasCompleteView(), "If we're adding a query, it shouldn't be shadowed");
                    else
                        for (var u = h.fold(function(t, e, n) {
                                if (!t.isEmpty() && e && e.hasCompleteView()) return [e.getCompleteView().getQuery()];
                                var r = [];
                                return e && (r = r.concat(e.getQueryViews().map(function(t) {
                                    return t.getQuery()
                                }))), S(n, function(t, e) {
                                    r = r.concat(e)
                                }), r
                            }), l = 0; l < u.length; ++l) {
                            var c = u[l];
                            this.listenProvider_.stopListening(t.queryForListening_(c), this.tagForQuery_(c))
                        }
                    return a
                }, t.prototype.createListenerForView_ = function(t) {
                    var e = this,
                        n = t.getQuery(),
                        r = this.tagForQuery_(n);
                    return {
                        hashFn: function() {
                            return (t.getServerCache() || fe.EMPTY_NODE).hash()
                        },
                        onComplete: function(t) {
                            if ("ok" === t) return r ? e.applyTaggedListenComplete(n.path, r) : e.applyListenComplete(n.path);
                            var i = function(t, e) {
                                var n = "Unknown Error";
                                "too_big" === t ? n = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == t ? n = "Client doesn't have permission to access the desired data." : "unavailable" == t && (n = "The service is unavailable");
                                var r = new Error(t + " at " + e.path.toString() + ": " + n);
                                return r.code = t.toUpperCase(), r
                            }(t, n);
                            return e.removeEventRegistration(n, null, i)
                        }
                    }
                }, t.makeQueryKey_ = function(t) {
                    return t.path.toString() + "$" + t.queryIdentifier()
                }, t.parseQueryKey_ = function(t) {
                    var e = t.indexOf("$");
                    return s(-1 !== e && e < t.length - 1, "Bad queryKey."), {
                        queryId: t.substr(e + 1),
                        path: new mt(t.substr(0, e))
                    }
                }, t.prototype.queryKeyForTag_ = function(t) {
                    return this.tagToQueryMap_["_" + t]
                }, t.prototype.tagForQuery_ = function(e) {
                    var n = t.makeQueryKey_(e);
                    return b(this.queryToTagMap_, n)
                }, t.getNextQueryTag_ = function() {
                    return t.nextQueryTag_++
                }, t.prototype.applyTaggedOperation_ = function(t, e) {
                    var n = this.syncPointTree_.get(t);
                    s(n, "Missing sync point for query tag that we're tracking");
                    var r = this.pendingWriteTree_.childWrites(t);
                    return n.applyOperation(e, r, null)
                }, t.prototype.applyOperationToSyncPoints_ = function(t) {
                    return this.applyOperationHelper_(t, this.syncPointTree_, null, this.pendingWriteTree_.childWrites(mt.Empty))
                }, t.prototype.applyOperationHelper_ = function(t, e, n, r) {
                    if (t.path.isEmpty()) return this.applyOperationDescendantsHelper_(t, e, n, r);
                    var i = e.get(mt.Empty);
                    null == n && null != i && (n = i.getCompleteServerCache(mt.Empty));
                    var o = [],
                        s = t.path.getFront(),
                        a = t.operationForChild(s),
                        h = e.children.get(s);
                    if (h && a) {
                        var u = n ? n.getImmediateChild(s) : null,
                            l = r.child(s);
                        o = o.concat(this.applyOperationHelper_(a, h, u, l))
                    }
                    return i && (o = o.concat(i.applyOperation(t, r, n))), o
                }, t.prototype.applyOperationDescendantsHelper_ = function(t, e, n, r) {
                    var i = this,
                        o = e.get(mt.Empty);
                    null == n && null != o && (n = o.getCompleteServerCache(mt.Empty));
                    var s = [];
                    return e.children.inorderTraversal(function(e, o) {
                        var a = n ? n.getImmediateChild(e) : null,
                            h = r.child(e),
                            u = t.operationForChild(e);
                        u && (s = s.concat(i.applyOperationDescendantsHelper_(u, o, a, h)))
                    }), o && (s = s.concat(o.applyOperation(t, r, n))), s
                }, t.nextQueryTag_ = 1, t
            }(),
            rn = function() {
                function t() {
                    this.rootNode_ = fe.EMPTY_NODE
                }
                return t.prototype.getNode = function(t) {
                    return this.rootNode_.getChild(t)
                }, t.prototype.updateSnapshot = function(t, e) {
                    this.rootNode_ = this.rootNode_.updateChild(t, e)
                }, t
            }(),
            on = function() {
                function t(t) {
                    this.app_ = t
                }
                return t.prototype.getToken = function(t) {
                    return this.app_.INTERNAL.getToken(t).then(null, function(t) {
                        return t && "auth/token-not-initialized" === t.code ? (Z("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(t)
                    })
                }, t.prototype.addTokenChangeListener = function(t) {
                    this.app_.INTERNAL.addAuthTokenListener(t)
                }, t.prototype.removeTokenChangeListener = function(t) {
                    this.app_.INTERNAL.removeAuthTokenListener(t)
                }, t.prototype.notifyForInvalidToken = function() {
                    var t = 'Provided authentication credentials for the app named "' + this.app_.name + '" are invalid. This usually indicates your app was not initialized correctly. ';
                    "credential" in this.app_.options ? t += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.app_.options ? t += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : t += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.', rt(t)
                }, t
            }(),
            sn = function() {
                function t() {
                    this.counters_ = {}
                }
                return t.prototype.incrementCounter = function(t, e) {
                    void 0 === e && (e = 1), w(this.counters_, t) || (this.counters_[t] = 0), this.counters_[t] += e
                }, t.prototype.get = function() {
                    return c(this.counters_)
                }, t
            }(),
            an = function() {
                function t() {}
                return t.getCollection = function(t) {
                    var e = t.toString();
                    return this.collections_[e] || (this.collections_[e] = new sn), this.collections_[e]
                }, t.getOrCreateReporter = function(t, e) {
                    var n = t.toString();
                    return this.reporters_[n] || (this.reporters_[n] = e()), this.reporters_[n]
                }, t.collections_ = {}, t.reporters_ = {}, t
            }(),
            hn = function() {
                function t(t) {
                    this.collection_ = t, this.last_ = null
                }
                return t.prototype.get = function() {
                    var t = this.collection_.get(),
                        e = T(t);
                    return this.last_ && S(this.last_, function(t, n) {
                        e[t] = e[t] - n
                    }), this.last_ = t, e
                }, t
            }(),
            un = 1e4,
            ln = 3e4,
            cn = function() {
                function t(t, e) {
                    this.server_ = e, this.statsToReport_ = {}, this.statsListener_ = new hn(t);
                    var n = un + (ln - un) * Math.random();
                    gt(this.reportStats_.bind(this), Math.floor(n))
                }
                return t.prototype.includeStat = function(t) {
                    this.statsToReport_[t] = !0
                }, t.prototype.reportStats_ = function() {
                    var t = this,
                        e = this.statsListener_.get(),
                        n = {},
                        r = !1;
                    S(e, function(e, i) {
                        i > 0 && w(t.statsToReport_, e) && (n[e] = i, r = !0)
                    }), r && this.server_.reportStats(n), gt(this.reportStats_.bind(this), Math.floor(2 * Math.random() * 3e5))
                }, t
            }(),
            pn = function() {
                function t() {
                    this.eventLists_ = [], this.recursionDepth_ = 0
                }
                return t.prototype.queueEvents = function(t) {
                    for (var e = null, n = 0; n < t.length; n++) {
                        var r = t[n],
                            i = r.getPath();
                        null === e || i.equals(e.getPath()) || (this.eventLists_.push(e), e = null), null === e && (e = new dn(i)), e.add(r)
                    }
                    e && this.eventLists_.push(e)
                }, t.prototype.raiseEventsAtPath = function(t, e) {
                    this.queueEvents(e), this.raiseQueuedEventsMatchingPredicate_(function(e) {
                        return e.equals(t)
                    })
                }, t.prototype.raiseEventsForChangedPath = function(t, e) {
                    this.queueEvents(e), this.raiseQueuedEventsMatchingPredicate_(function(e) {
                        return e.contains(t) || t.contains(e)
                    })
                }, t.prototype.raiseQueuedEventsMatchingPredicate_ = function(t) {
                    this.recursionDepth_++;
                    for (var e = !0, n = 0; n < this.eventLists_.length; n++) {
                        var r = this.eventLists_[n];
                        if (r) t(r.getPath()) ? (this.eventLists_[n].raise(), this.eventLists_[n] = null) : e = !1
                    }
                    e && (this.eventLists_ = []), this.recursionDepth_--
                }, t
            }(),
            dn = function() {
                function t(t) {
                    this.path_ = t, this.events_ = []
                }
                return t.prototype.add = function(t) {
                    this.events_.push(t)
                }, t.prototype.raise = function() {
                    for (var t = 0; t < this.events_.length; t++) {
                        var e = this.events_[t];
                        if (null !== e) {
                            this.events_[t] = null;
                            var n = e.getEventRunner();
                            X && Z("event: " + e.toString()), yt(n)
                        }
                    }
                }, t.prototype.getPath = function() {
                    return this.path_
                }, t
            }(),
            fn = function() {
                function t(t) {
                    this.allowedEvents_ = t, this.listeners_ = {}, s(Array.isArray(t) && t.length > 0, "Requires a non-empty array")
                }
                return t.prototype.trigger = function(t) {
                    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    if (Array.isArray(this.listeners_[t]))
                        for (var r = this.listeners_[t].slice(), i = 0; i < r.length; i++) r[i].callback.apply(r[i].context, e)
                }, t.prototype.on = function(t, e, n) {
                    this.validateEventType_(t), this.listeners_[t] = this.listeners_[t] || [], this.listeners_[t].push({
                        callback: e,
                        context: n
                    });
                    var r = this.getInitialEvent(t);
                    r && e.apply(n, r)
                }, t.prototype.off = function(t, e, n) {
                    this.validateEventType_(t);
                    for (var r = this.listeners_[t] || [], i = 0; i < r.length; i++)
                        if (r[i].callback === e && (!n || n === r[i].context)) return void r.splice(i, 1)
                }, t.prototype.validateEventType_ = function(t) {
                    s(this.allowedEvents_.find(function(e) {
                        return e === t
                    }), "Unknown event: " + t)
                }, t
            }(),
            _n = function(t) {
                function e() {
                    var e, n, r = t.call(this, ["visible"]) || this;
                    return "undefined" != typeof document && void 0 !== document.addEventListener && (void 0 !== document.hidden ? (n = "visibilitychange", e = "hidden") : void 0 !== document.mozHidden ? (n = "mozvisibilitychange", e = "mozHidden") : void 0 !== document.msHidden ? (n = "msvisibilitychange", e = "msHidden") : void 0 !== document.webkitHidden && (n = "webkitvisibilitychange", e = "webkitHidden")), r.visible_ = !0, n && document.addEventListener(n, function() {
                        var t = !document[e];
                        t !== r.visible_ && (r.visible_ = t, r.trigger("visible", t))
                    }, !1), r
                }
                return r(e, t), e.getInstance = function() {
                    return new e
                }, e.prototype.getInitialEvent = function(t) {
                    return s("visible" === t, "Unknown event type: " + t), [this.visible_]
                }, e
            }(fn),
            yn = function(t) {
                function e() {
                    var e = t.call(this, ["online"]) || this;
                    return e.online_ = !0, "undefined" == typeof window || void 0 === window.addEventListener || d() || (window.addEventListener("online", function() {
                        e.online_ || (e.online_ = !0, e.trigger("online", !0))
                    }, !1), window.addEventListener("offline", function() {
                        e.online_ && (e.online_ = !1, e.trigger("online", !1))
                    }, !1)), e
                }
                return r(e, t), e.getInstance = function() {
                    return new e
                }, e.prototype.getInitialEvent = function(t) {
                    return s("online" === t, "Unknown event type: " + t), [this.online_]
                }, e.prototype.currentlyOnline = function() {
                    return this.online_
                }, e
            }(fn),
            vn = function() {
                function t(t) {
                    this.onMessage_ = t, this.pendingResponses = [], this.currentResponseNum = 0, this.closeAfterResponse = -1, this.onClose = null
                }
                return t.prototype.closeAfter = function(t, e) {
                    this.closeAfterResponse = t, this.onClose = e, this.closeAfterResponse < this.currentResponseNum && (this.onClose(), this.onClose = null)
                }, t.prototype.handleResponse = function(t, e) {
                    var n = this;
                    this.pendingResponses[t] = e;
                    for (var r = function() {
                            var t = i.pendingResponses[i.currentResponseNum];
                            delete i.pendingResponses[i.currentResponseNum];
                            for (var e = function(e) {
                                    t[e] && yt(function() {
                                        n.onMessage_(t[e])
                                    })
                                }, r = 0; r < t.length; ++r) e(r);
                            if (i.currentResponseNum === i.closeAfterResponse) return i.onClose && (i.onClose(), i.onClose = null), "break";
                            i.currentResponseNum++
                        }, i = this; this.pendingResponses[this.currentResponseNum];) {
                        if ("break" === r()) break
                    }
                }, t
            }(),
            gn = "pLPCommand",
            mn = "pRTLPCB",
            Cn = function() {
                function t(t, e, n, r) {
                    this.connId = t, this.repoInfo = e, this.transportSessionId = n, this.lastSessionId = r, this.bytesSent = 0, this.bytesReceived = 0, this.everConnected_ = !1, this.log_ = tt(t), this.stats_ = an.getCollection(e), this.urlFn = function(t) {
                        return e.connectionURL(Et, t)
                    }
                }
                return t.prototype.open = function(t, e) {
                    var n = this;
                    this.curSegmentNum = 0, this.onDisconnect_ = e, this.myPacketOrderer = new vn(t), this.isClosed_ = !1, this.connectTimeoutTimer_ = setTimeout(function() {
                            n.log_("Timed out trying to connect."), n.onClosed_(), n.connectTimeoutTimer_ = null
                        }, Math.floor(3e4)),
                        function(t) {
                            if (f() || "complete" === document.readyState) t();
                            else {
                                var e = !1,
                                    n = function() {
                                        document.body ? e || (e = !0, t()) : setTimeout(n, Math.floor(10))
                                    };
                                document.addEventListener ? (document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
                                    "complete" === document.readyState && n()
                                }), window.attachEvent("onload", n))
                            }
                        }(function() {
                            if (!n.isClosed_) {
                                n.scriptTagHolder = new En(function() {
                                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                    var r = t[0],
                                        i = t[1],
                                        o = t[2];
                                    if (n.incrementIncomingBytes_(t), n.scriptTagHolder)
                                        if (n.connectTimeoutTimer_ && (clearTimeout(n.connectTimeoutTimer_), n.connectTimeoutTimer_ = null), n.everConnected_ = !0, "start" == r) n.id = i, n.password = o;
                                        else {
                                            if ("close" !== r) throw new Error("Unrecognized command received: " + r);
                                            i ? (n.scriptTagHolder.sendNewPolls = !1, n.myPacketOrderer.closeAfter(i, function() {
                                                n.onClosed_()
                                            })) : n.onClosed_()
                                        }
                                }, function() {
                                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                    var r = t[0],
                                        i = t[1];
                                    n.incrementIncomingBytes_(t), n.myPacketOrderer.handleResponse(r, i)
                                }, function() {
                                    n.onClosed_()
                                }, n.urlFn);
                                var t = {
                                    start: "t"
                                };
                                t.ser = Math.floor(1e8 * Math.random()), n.scriptTagHolder.uniqueCallbackIdentifier && (t.cb = n.scriptTagHolder.uniqueCallbackIdentifier), t.v = "5", n.transportSessionId && (t.s = n.transportSessionId), n.lastSessionId && (t.ls = n.lastSessionId), !f() && "undefined" != typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (t.r = "f");
                                var e = n.urlFn(t);
                                n.log_("Connecting via long-poll to " + e), n.scriptTagHolder.addTag(e, function() {})
                            }
                        })
                }, t.prototype.start = function() {
                    this.scriptTagHolder.startLongPoll(this.id, this.password), this.addDisconnectPingFrame(this.id, this.password)
                }, t.forceAllow = function() {
                    t.forceAllow_ = !0
                }, t.forceDisallow = function() {
                    t.forceDisallow_ = !0
                }, t.isAvailable = function() {
                    return t.forceAllow_ || !t.forceDisallow_ && "undefined" != typeof document && null != document.createElement && !("object" == typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" == typeof Windows && "object" == typeof Windows.UI) && !f()
                }, t.prototype.markConnectionHealthy = function() {}, t.prototype.shutdown_ = function() {
                    this.isClosed_ = !0, this.scriptTagHolder && (this.scriptTagHolder.close(), this.scriptTagHolder = null), this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame), this.myDisconnFrame = null), this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null)
                }, t.prototype.onClosed_ = function() {
                    this.isClosed_ || (this.log_("Longpoll is closing itself"), this.shutdown_(), this.onDisconnect_ && (this.onDisconnect_(this.everConnected_), this.onDisconnect_ = null))
                }, t.prototype.close = function() {
                    this.isClosed_ || (this.log_("Longpoll is being closed."), this.shutdown_())
                }, t.prototype.send = function(t) {
                    var e = C(t);
                    this.bytesSent += e.length, this.stats_.incrementCounter("bytes_sent", e.length);
                    for (var n, r = (n = h(e), u.encodeByteArray(n, !0)), i = ct(r, 1840), o = 0; o < i.length; o++) this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[o]), this.curSegmentNum++
                }, t.prototype.addDisconnectPingFrame = function(t, e) {
                    if (!f()) {
                        this.myDisconnFrame = document.createElement("iframe");
                        var n = {
                            dframe: "t"
                        };
                        n.id = t, n.pw = e, this.myDisconnFrame.src = this.urlFn(n), this.myDisconnFrame.style.display = "none", document.body.appendChild(this.myDisconnFrame)
                    }
                }, t.prototype.incrementIncomingBytes_ = function(t) {
                    var e = C(t).length;
                    this.bytesReceived += e, this.stats_.incrementCounter("bytes_received", e)
                }, t
            }(),
            En = function() {
                function t(e, n, r, i) {
                    if (this.onDisconnect = r, this.urlFn = i, this.outstandingRequests = new Re, this.pendingSegs = [], this.currentSerial = Math.floor(1e8 * Math.random()), this.sendNewPolls = !0, f()) this.commandCB = e, this.onMessageCB = n;
                    else {
                        this.uniqueCallbackIdentifier = Y(), window[gn + this.uniqueCallbackIdentifier] = e, window[mn + this.uniqueCallbackIdentifier] = n, this.myIFrame = t.createIFrame_();
                        var o = "";
                        if (this.myIFrame.src && "javascript:" === this.myIFrame.src.substr(0, "javascript:".length)) o = '<script>document.domain="' + document.domain + '";<\/script>';
                        var s = "<html><body>" + o + "</body></html>";
                        try {
                            this.myIFrame.doc.open(), this.myIFrame.doc.write(s), this.myIFrame.doc.close()
                        } catch (t) {
                            Z("frame writing exception"), t.stack && Z(t.stack), Z(t)
                        }
                    }
                }
                return t.createIFrame_ = function() {
                    var t = document.createElement("iframe");
                    if (t.style.display = "none", !document.body) throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
                    document.body.appendChild(t);
                    try {
                        t.contentWindow.document || Z("No IE domain setting required")
                    } catch (n) {
                        var e = document.domain;
                        t.src = "javascript:void((function(){document.open();document.domain='" + e + "';document.close();})())"
                    }
                    return t.contentDocument ? t.doc = t.contentDocument : t.contentWindow ? t.doc = t.contentWindow.document : t.document && (t.doc = t.document), t
                }, t.prototype.close = function() {
                    var e = this;
                    if (this.alive = !1, this.myIFrame && (this.myIFrame.doc.body.innerHTML = "", setTimeout(function() {
                            null !== e.myIFrame && (document.body.removeChild(e.myIFrame), e.myIFrame = null)
                        }, Math.floor(0))), f() && this.myID) {
                        var n = {
                            disconn: "t"
                        };
                        n.id = this.myID, n.pw = this.myPW;
                        var r = this.urlFn(n);
                        t.nodeRestRequest(r)
                    }
                    var i = this.onDisconnect;
                    i && (this.onDisconnect = null, i())
                }, t.prototype.startLongPoll = function(t, e) {
                    for (this.myID = t, this.myPW = e, this.alive = !0; this.newRequest_(););
                }, t.prototype.newRequest_ = function() {
                    if (this.alive && this.sendNewPolls && this.outstandingRequests.count() < (this.pendingSegs.length > 0 ? 2 : 1)) {
                        this.currentSerial++;
                        var t = {};
                        t.id = this.myID, t.pw = this.myPW, t.ser = this.currentSerial;
                        for (var e = this.urlFn(t), n = "", r = 0; this.pendingSegs.length > 0;) {
                            if (!(this.pendingSegs[0].d.length + 30 + n.length <= 1870)) break;
                            var i = this.pendingSegs.shift();
                            n = n + "&seg" + r + "=" + i.seg + "&ts" + r + "=" + i.ts + "&d" + r + "=" + i.d, r++
                        }
                        return e += n, this.addLongPollTag_(e, this.currentSerial), !0
                    }
                    return !1
                }, t.prototype.enqueueSegment = function(t, e, n) {
                    this.pendingSegs.push({
                        seg: t,
                        ts: e,
                        d: n
                    }), this.alive && this.newRequest_()
                }, t.prototype.addLongPollTag_ = function(t, e) {
                    var n = this;
                    this.outstandingRequests.add(e, 1);
                    var r = function() {
                            n.outstandingRequests.remove(e), n.newRequest_()
                        },
                        i = setTimeout(r, Math.floor(25e3));
                    this.addTag(t, function() {
                        clearTimeout(i), r()
                    })
                }, t.prototype.addTag = function(t, e) {
                    var n = this;
                    f() ? this.doNodeLongPoll(t, e) : setTimeout(function() {
                        try {
                            if (!n.sendNewPolls) return;
                            var r = n.myIFrame.doc.createElement("script");
                            r.type = "text/javascript", r.async = !0, r.src = t, r.onload = r.onreadystatechange = function() {
                                var t = r.readyState;
                                t && "loaded" !== t && "complete" !== t || (r.onload = r.onreadystatechange = null, r.parentNode && r.parentNode.removeChild(r), e())
                            }, r.onerror = function() {
                                Z("Long-poll script failed to load: " + t), n.sendNewPolls = !1, n.close()
                            }, n.myIFrame.doc.body.appendChild(r)
                        } catch (t) {}
                    }, Math.floor(1))
                }, t
            }(),
            wn = null;
        "undefined" != typeof MozWebSocket ? wn = MozWebSocket : "undefined" != typeof WebSocket && (wn = WebSocket);
        var bn = function() {
                function t(e, n, r, i) {
                    this.connId = e, this.keepaliveTimer = null, this.frames = null, this.totalFrames = 0, this.bytesSent = 0, this.bytesReceived = 0, this.log_ = tt(this.connId), this.stats_ = an.getCollection(n), this.connURL = t.connectionURL_(n, r, i)
                }
                return t.connectionURL_ = function(t, e, n) {
                    var r = {
                        v: "5"
                    };
                    return !f() && "undefined" != typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (r.r = "f"), e && (r.s = e), n && (r.ls = n), t.connectionURL("websocket", r)
                }, t.prototype.open = function(t, n) {
                    var r = this;
                    this.onDisconnect = n, this.onMessage = t, this.log_("Websocket connecting to " + this.connURL), this.everConnected_ = !1, B.set("previous_websocket_failure", !0);
                    try {
                        if (f()) {
                            var i = o.NODE_ADMIN ? "AdminNode" : "Node",
                                s = {
                                    headers: {
                                        "User-Agent": "Firebase/5/" + e.SDK_VERSION + "/" + process.platform + "/" + i
                                    }
                                },
                                a = process.env,
                                h = 0 == this.connURL.indexOf("wss://") ? a.HTTPS_PROXY || a.https_proxy : a.HTTP_PROXY || a.http_proxy;
                            h && (s.proxy = {
                                origin: h
                            }), this.mySock = new wn(this.connURL, [], s)
                        } else this.mySock = new wn(this.connURL)
                    } catch (t) {
                        this.log_("Error instantiating WebSocket.");
                        var u = t.message || t.data;
                        return u && this.log_(u), void this.onClosed_()
                    }
                    this.mySock.onopen = function() {
                        r.log_("Websocket connected."), r.everConnected_ = !0
                    }, this.mySock.onclose = function() {
                        r.log_("Websocket connection was disconnected."), r.mySock = null, r.onClosed_()
                    }, this.mySock.onmessage = function(t) {
                        r.handleIncomingFrame(t)
                    }, this.mySock.onerror = function(t) {
                        r.log_("WebSocket error.  Closing connection.");
                        var e = t.message || t.data;
                        e && r.log_(e), r.onClosed_()
                    }
                }, t.prototype.start = function() {}, t.forceDisallow = function() {
                    t.forceDisallow_ = !0
                }, t.isAvailable = function() {
                    var e = !1;
                    if ("undefined" != typeof navigator && navigator.userAgent) {
                        var n = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
                        n && n.length > 1 && parseFloat(n[1]) < 4.4 && (e = !0)
                    }
                    return !e && null !== wn && !t.forceDisallow_
                }, t.previouslyFailed = function() {
                    return B.isInMemoryStorage || !0 === B.get("previous_websocket_failure")
                }, t.prototype.markConnectionHealthy = function() {
                    B.remove("previous_websocket_failure")
                }, t.prototype.appendFrame_ = function(t) {
                    if (this.frames.push(t), this.frames.length == this.totalFrames) {
                        var e = this.frames.join("");
                        this.frames = null;
                        var n = m(e);
                        this.onMessage(n)
                    }
                }, t.prototype.handleNewFrameCount_ = function(t) {
                    this.totalFrames = t, this.frames = []
                }, t.prototype.extractFrameCount_ = function(t) {
                    if (s(null === this.frames, "We already have a frame buffer"), t.length <= 6) {
                        var e = Number(t);
                        if (!isNaN(e)) return this.handleNewFrameCount_(e), null
                    }
                    return this.handleNewFrameCount_(1), t
                }, t.prototype.handleIncomingFrame = function(t) {
                    if (null !== this.mySock) {
                        var e = t.data;
                        if (this.bytesReceived += e.length, this.stats_.incrementCounter("bytes_received", e.length), this.resetKeepAlive(), null !== this.frames) this.appendFrame_(e);
                        else {
                            var n = this.extractFrameCount_(e);
                            null !== n && this.appendFrame_(n)
                        }
                    }
                }, t.prototype.send = function(t) {
                    this.resetKeepAlive();
                    var e = C(t);
                    this.bytesSent += e.length, this.stats_.incrementCounter("bytes_sent", e.length);
                    var n = ct(e, 16384);
                    n.length > 1 && this.sendString_(String(n.length));
                    for (var r = 0; r < n.length; r++) this.sendString_(n[r])
                }, t.prototype.shutdown_ = function() {
                    this.isClosed_ = !0, this.keepaliveTimer && (clearInterval(this.keepaliveTimer), this.keepaliveTimer = null), this.mySock && (this.mySock.close(), this.mySock = null)
                }, t.prototype.onClosed_ = function() {
                    this.isClosed_ || (this.log_("WebSocket is closing itself"), this.shutdown_(), this.onDisconnect && (this.onDisconnect(this.everConnected_), this.onDisconnect = null))
                }, t.prototype.close = function() {
                    this.isClosed_ || (this.log_("WebSocket is being closed"), this.shutdown_())
                }, t.prototype.resetKeepAlive = function() {
                    var t = this;
                    clearInterval(this.keepaliveTimer), this.keepaliveTimer = setInterval(function() {
                        t.mySock && t.sendString_("0"), t.resetKeepAlive()
                    }, Math.floor(45e3))
                }, t.prototype.sendString_ = function(t) {
                    try {
                        this.mySock.send(t)
                    } catch (t) {
                        this.log_("Exception thrown from WebSocket.send():", t.message || t.data, "Closing connection."), setTimeout(this.onClosed_.bind(this), 0)
                    }
                }, t.responsesRequiredToBeHealthy = 2, t.healthyTimeout = 3e4, t
            }(),
            Sn = function() {
                function t(t) {
                    this.initTransports_(t)
                }
                return Object.defineProperty(t, "ALL_TRANSPORTS", {
                    get: function() {
                        return [Cn, bn]
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.initTransports_ = function(e) {
                    var n = bn && bn.isAvailable(),
                        r = n && !bn.previouslyFailed();
                    if (e.webSocketOnly && (n || rt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), r = !0), r) this.transports_ = [bn];
                    else {
                        var i = this.transports_ = [];
                        pt(t.ALL_TRANSPORTS, function(t, e) {
                            e && e.isAvailable() && i.push(e)
                        })
                    }
                }, t.prototype.initialTransport = function() {
                    if (this.transports_.length > 0) return this.transports_[0];
                    throw new Error("No transports available")
                }, t.prototype.upgradeTransport = function() {
                    return this.transports_.length > 1 ? this.transports_[1] : null
                }, t
            }(),
            Tn = function() {
                function t(t, e, n, r, i, o, s) {
                    this.id = t, this.repoInfo_ = e, this.onMessage_ = n, this.onReady_ = r, this.onDisconnect_ = i, this.onKill_ = o, this.lastSessionId = s, this.connectionCount = 0, this.pendingDataMessages = [], this.state_ = 0, this.log_ = tt("c:" + this.id + ":"), this.transportManager_ = new Sn(e), this.log_("Connection created"), this.start_()
                }
                return t.prototype.start_ = function() {
                    var t = this,
                        e = this.transportManager_.initialTransport();
                    this.conn_ = new e(this.nextTransportId_(), this.repoInfo_, void 0, this.lastSessionId), this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
                    var n = this.connReceiver_(this.conn_),
                        r = this.disconnReceiver_(this.conn_);
                    this.tx_ = this.conn_, this.rx_ = this.conn_, this.secondaryConn_ = null, this.isHealthy_ = !1, setTimeout(function() {
                        t.conn_ && t.conn_.open(n, r)
                    }, Math.floor(0));
                    var i = e.healthyTimeout || 0;
                    i > 0 && (this.healthyTimeout_ = gt(function() {
                        t.healthyTimeout_ = null, t.isHealthy_ || (t.conn_ && t.conn_.bytesReceived > 102400 ? (t.log_("Connection exceeded healthy timeout but has received " + t.conn_.bytesReceived + " bytes.  Marking connection healthy."), t.isHealthy_ = !0, t.conn_.markConnectionHealthy()) : t.conn_ && t.conn_.bytesSent > 10240 ? t.log_("Connection exceeded healthy timeout but has sent " + t.conn_.bytesSent + " bytes.  Leaving connection alive.") : (t.log_("Closing unhealthy connection after timeout."), t.close()))
                    }, Math.floor(i)))
                }, t.prototype.nextTransportId_ = function() {
                    return "c:" + this.id + ":" + this.connectionCount++
                }, t.prototype.disconnReceiver_ = function(t) {
                    var e = this;
                    return function(n) {
                        t === e.conn_ ? e.onConnectionLost_(n) : t === e.secondaryConn_ ? (e.log_("Secondary connection lost."), e.onSecondaryConnectionLost_()) : e.log_("closing an old connection")
                    }
                }, t.prototype.connReceiver_ = function(t) {
                    var e = this;
                    return function(n) {
                        2 != e.state_ && (t === e.rx_ ? e.onPrimaryMessageReceived_(n) : t === e.secondaryConn_ ? e.onSecondaryMessageReceived_(n) : e.log_("message on old connection"))
                    }
                }, t.prototype.sendRequest = function(t) {
                    var e = {
                        t: "d",
                        d: t
                    };
                    this.sendData_(e)
                }, t.prototype.tryCleanupConnection = function() {
                    this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId), this.conn_ = this.secondaryConn_, this.secondaryConn_ = null)
                }, t.prototype.onSecondaryControl_ = function(t) {
                    if ("t" in t) {
                        var e = t.t;
                        "a" === e ? this.upgradeIfSecondaryHealthy_() : "r" === e ? (this.log_("Got a reset on secondary, closing it"), this.secondaryConn_.close(), this.tx_ !== this.secondaryConn_ && this.rx_ !== this.secondaryConn_ || this.close()) : "o" === e && (this.log_("got pong on secondary."), this.secondaryResponsesRequired_--, this.upgradeIfSecondaryHealthy_())
                    }
                }, t.prototype.onSecondaryMessageReceived_ = function(t) {
                    var e = ut("t", t),
                        n = ut("d", t);
                    if ("c" == e) this.onSecondaryControl_(n);
                    else {
                        if ("d" != e) throw new Error("Unknown protocol layer: " + e);
                        this.pendingDataMessages.push(n)
                    }
                }, t.prototype.upgradeIfSecondaryHealthy_ = function() {
                    this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."), this.isHealthy_ = !0, this.secondaryConn_.markConnectionHealthy(), this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."), this.secondaryConn_.send({
                        t: "c",
                        d: {
                            t: "p",
                            d: {}
                        }
                    }))
                }, t.prototype.proceedWithUpgrade_ = function() {
                    this.secondaryConn_.start(), this.log_("sending client ack on secondary"), this.secondaryConn_.send({
                        t: "c",
                        d: {
                            t: "a",
                            d: {}
                        }
                    }), this.log_("Ending transmission on primary"), this.conn_.send({
                        t: "c",
                        d: {
                            t: "n",
                            d: {}
                        }
                    }), this.tx_ = this.secondaryConn_, this.tryCleanupConnection()
                }, t.prototype.onPrimaryMessageReceived_ = function(t) {
                    var e = ut("t", t),
                        n = ut("d", t);
                    "c" == e ? this.onControl_(n) : "d" == e && this.onDataMessage_(n)
                }, t.prototype.onDataMessage_ = function(t) {
                    this.onPrimaryResponse_(), this.onMessage_(t)
                }, t.prototype.onPrimaryResponse_ = function() {
                    this.isHealthy_ || (this.primaryResponsesRequired_--, this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()))
                }, t.prototype.onControl_ = function(t) {
                    var e = ut("t", t);
                    if ("d" in t) {
                        var n = t.d;
                        if ("h" === e) this.onHandshake_(n);
                        else if ("n" === e) {
                            this.log_("recvd end transmission on primary"), this.rx_ = this.secondaryConn_;
                            for (var r = 0; r < this.pendingDataMessages.length; ++r) this.onDataMessage_(this.pendingDataMessages[r]);
                            this.pendingDataMessages = [], this.tryCleanupConnection()
                        } else "s" === e ? this.onConnectionShutdown_(n) : "r" === e ? this.onReset_(n) : "e" === e ? et("Server Error: " + n) : "o" === e ? (this.log_("got pong on primary."), this.onPrimaryResponse_(), this.sendPingOnPrimaryIfNecessary_()) : et("Unknown control packet command: " + e)
                    }
                }, t.prototype.onHandshake_ = function(t) {
                    var e = t.ts,
                        n = t.v,
                        r = t.h;
                    this.sessionId = t.s, this.repoInfo_.updateHost(r), 0 == this.state_ && (this.conn_.start(), this.onConnectionEstablished_(this.conn_, e), "5" !== n && rt("Protocol version mismatch detected"), this.tryStartUpgrade_())
                }, t.prototype.tryStartUpgrade_ = function() {
                    var t = this.transportManager_.upgradeTransport();
                    t && this.startUpgrade_(t)
                }, t.prototype.startUpgrade_ = function(t) {
                    var e = this;
                    this.secondaryConn_ = new t(this.nextTransportId_(), this.repoInfo_, this.sessionId), this.secondaryResponsesRequired_ = t.responsesRequiredToBeHealthy || 0;
                    var n = this.connReceiver_(this.secondaryConn_),
                        r = this.disconnReceiver_(this.secondaryConn_);
                    this.secondaryConn_.open(n, r), gt(function() {
                        e.secondaryConn_ && (e.log_("Timed out trying to upgrade."), e.secondaryConn_.close())
                    }, Math.floor(6e4))
                }, t.prototype.onReset_ = function(t) {
                    this.log_("Reset packet received.  New host: " + t), this.repoInfo_.updateHost(t), 1 === this.state_ ? this.close() : (this.closeConnections_(), this.start_())
                }, t.prototype.onConnectionEstablished_ = function(t, e) {
                    var n = this;
                    this.log_("Realtime connection established."), this.conn_ = t, this.state_ = 1, this.onReady_ && (this.onReady_(e, this.sessionId), this.onReady_ = null), 0 === this.primaryResponsesRequired_ ? (this.log_("Primary connection is healthy."), this.isHealthy_ = !0) : gt(function() {
                        n.sendPingOnPrimaryIfNecessary_()
                    }, Math.floor(5e3))
                }, t.prototype.sendPingOnPrimaryIfNecessary_ = function() {
                    this.isHealthy_ || 1 !== this.state_ || (this.log_("sending ping on primary."), this.sendData_({
                        t: "c",
                        d: {
                            t: "p",
                            d: {}
                        }
                    }))
                }, t.prototype.onSecondaryConnectionLost_ = function() {
                    var t = this.secondaryConn_;
                    this.secondaryConn_ = null, this.tx_ !== t && this.rx_ !== t || this.close()
                }, t.prototype.onConnectionLost_ = function(t) {
                    this.conn_ = null, t || 0 !== this.state_ ? 1 === this.state_ && this.log_("Realtime connection lost.") : (this.log_("Realtime connection failed."), this.repoInfo_.isCacheableHost() && (B.remove("host:" + this.repoInfo_.host), this.repoInfo_.internalHost = this.repoInfo_.host)), this.close()
                }, t.prototype.onConnectionShutdown_ = function(t) {
                    this.log_("Connection shutdown command received. Shutting down..."), this.onKill_ && (this.onKill_(t), this.onKill_ = null), this.onDisconnect_ = null, this.close()
                }, t.prototype.sendData_ = function(t) {
                    if (1 !== this.state_) throw "Connection is not connected";
                    this.tx_.send(t)
                }, t.prototype.close = function() {
                    2 !== this.state_ && (this.log_("Closing realtime connection."), this.state_ = 2, this.closeConnections_(), this.onDisconnect_ && (this.onDisconnect_(), this.onDisconnect_ = null))
                }, t.prototype.closeConnections_ = function() {
                    this.log_("Shutting down all connections"), this.conn_ && (this.conn_.close(), this.conn_ = null), this.secondaryConn_ && (this.secondaryConn_.close(), this.secondaryConn_ = null), this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_), this.healthyTimeout_ = null)
                }, t
            }(),
            Nn = function() {
                function t() {}
                return t.prototype.put = function(t, e, n, r) {}, t.prototype.merge = function(t, e, n, r) {}, t.prototype.refreshAuthToken = function(t) {}, t.prototype.onDisconnectPut = function(t, e, n) {}, t.prototype.onDisconnectMerge = function(t, e, n) {}, t.prototype.onDisconnectCancel = function(t, e) {}, t.prototype.reportStats = function(t) {}, t
            }(),
            In = 1e3,
            Rn = 3e5,
            Pn = function(t) {
                function n(e, r, i, o, s, a) {
                    var h = t.call(this) || this;
                    if (h.repoInfo_ = e, h.onDataUpdate_ = r, h.onConnectStatus_ = i, h.onServerInfoUpdate_ = o, h.authTokenProvider_ = s, h.authOverride_ = a, h.id = n.nextPersistentConnectionId_++, h.log_ = tt("p:" + h.id + ":"), h.interruptReasons_ = {}, h.listens_ = {}, h.outstandingPuts_ = [], h.outstandingPutCount_ = 0, h.onDisconnectRequestQueue_ = [], h.connected_ = !1, h.reconnectDelay_ = In, h.maxReconnectDelay_ = Rn, h.securityDebugCallback_ = null, h.lastSessionId = null, h.establishConnectionTimer_ = null, h.visible_ = !1, h.requestCBHash_ = {}, h.requestNumber_ = 0, h.realtime_ = null, h.authToken_ = null, h.forceTokenRefresh_ = !1, h.invalidAuthTokenCount_ = 0, h.firstConnection_ = !0, h.lastConnectionAttemptTime_ = null, h.lastConnectionEstablishedTime_ = null, a && !f()) throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
                    return h.scheduleConnect_(0), _n.getInstance().on("visible", h.onVisible_, h), -1 === e.host.indexOf("fblocal") && yn.getInstance().on("online", h.onOnline_, h), h
                }
                return r(n, t), n.prototype.sendRequest = function(t, e, n) {
                    var r = ++this.requestNumber_,
                        i = {
                            r: r,
                            a: t,
                            b: e
                        };
                    this.log_(C(i)), s(this.connected_, "sendRequest call when we're not connected not allowed."), this.realtime_.sendRequest(i), n && (this.requestCBHash_[r] = n)
                }, n.prototype.listen = function(t, e, n, r) {
                    var i = t.queryIdentifier(),
                        o = t.path.toString();
                    this.log_("Listen called for " + o + " " + i), this.listens_[o] = this.listens_[o] || {}, s(t.getQueryParams().isDefault() || !t.getQueryParams().loadsAllData(), "listen() called for non-default but complete query"), s(!this.listens_[o][i], "listen() called twice for same path/queryId.");
                    var a = {
                        onComplete: r,
                        hashFn: e,
                        query: t,
                        tag: n
                    };
                    this.listens_[o][i] = a, this.connected_ && this.sendListen_(a)
                }, n.prototype.sendListen_ = function(t) {
                    var e = this,
                        r = t.query,
                        i = r.path.toString(),
                        o = r.queryIdentifier();
                    this.log_("Listen on " + i + " for " + o);
                    var s = {
                        p: i
                    };
                    t.tag && (s.q = r.queryObject(), s.t = t.tag), s.h = t.hashFn(), this.sendRequest("q", s, function(s) {
                        var a = s.d,
                            h = s.s;
                        n.warnOnListenWarnings_(a, r), (e.listens_[i] && e.listens_[i][o]) === t && (e.log_("listen response", s), "ok" !== h && e.removeListen_(i, o), t.onComplete && t.onComplete(h, a))
                    })
                }, n.warnOnListenWarnings_ = function(t, e) {
                    if (t && "object" == typeof t && w(t, "w")) {
                        var n = b(t, "w");
                        if (Array.isArray(n) && ~n.indexOf("no_index")) {
                            var r = '".indexOn": "' + e.getQueryParams().getIndex().toString() + '"',
                                i = e.path.toString();
                            rt("Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding " + r + " at " + i + " to your security rules for better performance.")
                        }
                    }
                }, n.prototype.refreshAuthToken = function(t) {
                    this.authToken_ = t, this.log_("Auth token refreshed"), this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, function() {}), this.reduceReconnectDelayIfAdminCredential_(t)
                }, n.prototype.reduceReconnectDelayIfAdminCredential_ = function(t) {
                    var e;
                    (t && 40 === t.length || "object" == typeof(e = E(t).claims) && !0 === e.admin) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."), this.maxReconnectDelay_ = 3e4)
                }, n.prototype.tryAuth = function() {
                    var t, e, n = this;
                    if (this.connected_ && this.authToken_) {
                        var r = this.authToken_,
                            i = (t = E(r), e = t.claims, t.signature && e && "object" == typeof e && e.hasOwnProperty("iat") ? "auth" : "gauth"),
                            o = {
                                cred: r
                            };
                        null === this.authOverride_ ? o.noauth = !0 : "object" == typeof this.authOverride_ && (o.authvar = this.authOverride_), this.sendRequest(i, o, function(t) {
                            var e = t.s,
                                i = t.d || "error";
                            n.authToken_ === r && ("ok" === e ? n.invalidAuthTokenCount_ = 0 : n.onAuthRevoked_(e, i))
                        })
                    }
                }, n.prototype.unlisten = function(t, e) {
                    var n = t.path.toString(),
                        r = t.queryIdentifier();
                    this.log_("Unlisten called for " + n + " " + r), s(t.getQueryParams().isDefault() || !t.getQueryParams().loadsAllData(), "unlisten() called for non-default but complete query"), this.removeListen_(n, r) && this.connected_ && this.sendUnlisten_(n, r, t.queryObject(), e)
                }, n.prototype.sendUnlisten_ = function(t, e, n, r) {
                    this.log_("Unlisten on " + t + " for " + e);
                    var i = {
                        p: t
                    };
                    r && (i.q = n, i.t = r), this.sendRequest("n", i)
                }, n.prototype.onDisconnectPut = function(t, e, n) {
                    this.connected_ ? this.sendOnDisconnect_("o", t, e, n) : this.onDisconnectRequestQueue_.push({
                        pathString: t,
                        action: "o",
                        data: e,
                        onComplete: n
                    })
                }, n.prototype.onDisconnectMerge = function(t, e, n) {
                    this.connected_ ? this.sendOnDisconnect_("om", t, e, n) : this.onDisconnectRequestQueue_.push({
                        pathString: t,
                        action: "om",
                        data: e,
                        onComplete: n
                    })
                }, n.prototype.onDisconnectCancel = function(t, e) {
                    this.connected_ ? this.sendOnDisconnect_("oc", t, null, e) : this.onDisconnectRequestQueue_.push({
                        pathString: t,
                        action: "oc",
                        data: null,
                        onComplete: e
                    })
                }, n.prototype.sendOnDisconnect_ = function(t, e, n, r) {
                    var i = {
                        p: e,
                        d: n
                    };
                    this.log_("onDisconnect " + t, i), this.sendRequest(t, i, function(t) {
                        r && setTimeout(function() {
                            r(t.s, t.d)
                        }, Math.floor(0))
                    })
                }, n.prototype.put = function(t, e, n, r) {
                    this.putInternal("p", t, e, n, r)
                }, n.prototype.merge = function(t, e, n, r) {
                    this.putInternal("m", t, e, n, r)
                }, n.prototype.putInternal = function(t, e, n, r, i) {
                    var o = {
                        p: e,
                        d: n
                    };
                    void 0 !== i && (o.h = i), this.outstandingPuts_.push({
                        action: t,
                        request: o,
                        onComplete: r
                    }), this.outstandingPutCount_++;
                    var s = this.outstandingPuts_.length - 1;
                    this.connected_ ? this.sendPut_(s) : this.log_("Buffering put: " + e)
                }, n.prototype.sendPut_ = function(t) {
                    var e = this,
                        n = this.outstandingPuts_[t].action,
                        r = this.outstandingPuts_[t].request,
                        i = this.outstandingPuts_[t].onComplete;
                    this.outstandingPuts_[t].queued = this.connected_, this.sendRequest(n, r, function(r) {
                        e.log_(n + " response", r), delete e.outstandingPuts_[t], e.outstandingPutCount_--, 0 === e.outstandingPutCount_ && (e.outstandingPuts_ = []), i && i(r.s, r.d)
                    })
                }, n.prototype.reportStats = function(t) {
                    var e = this;
                    if (this.connected_) {
                        var n = {
                            c: t
                        };
                        this.log_("reportStats", n), this.sendRequest("s", n, function(t) {
                            if ("ok" !== t.s) {
                                var n = t.d;
                                e.log_("reportStats", "Error sending stats: " + n)
                            }
                        })
                    }
                }, n.prototype.onDataMessage_ = function(t) {
                    if ("r" in t) {
                        this.log_("from server: " + C(t));
                        var e = t.r,
                            n = this.requestCBHash_[e];
                        n && (delete this.requestCBHash_[e], n(t.b))
                    } else {
                        if ("error" in t) throw "A server-side error has occurred: " + t.error;
                        "a" in t && this.onDataPush_(t.a, t.b)
                    }
                }, n.prototype.onDataPush_ = function(t, e) {
                    this.log_("handleServerMessage", t, e), "d" === t ? this.onDataUpdate_(e.p, e.d, !1, e.t) : "m" === t ? this.onDataUpdate_(e.p, e.d, !0, e.t) : "c" === t ? this.onListenRevoked_(e.p, e.q) : "ac" === t ? this.onAuthRevoked_(e.s, e.d) : "sd" === t ? this.onSecurityDebugPacket_(e) : et("Unrecognized action received from server: " + C(t) + "\nAre you using the latest client?")
                }, n.prototype.onReady_ = function(t, e) {
                    this.log_("connection ready"), this.connected_ = !0, this.lastConnectionEstablishedTime_ = (new Date).getTime(), this.handleTimestamp_(t), this.lastSessionId = e, this.firstConnection_ && this.sendConnectStats_(), this.restoreState_(), this.firstConnection_ = !1, this.onConnectStatus_(!0)
                }, n.prototype.scheduleConnect_ = function(t) {
                    var e = this;
                    s(!this.realtime_, "Scheduling a connect when we're already connected/ing?"), this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = setTimeout(function() {
                        e.establishConnectionTimer_ = null, e.establishConnection_()
                    }, Math.floor(t))
                }, n.prototype.onVisible_ = function(t) {
                    t && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."), this.reconnectDelay_ = In, this.realtime_ || this.scheduleConnect_(0)), this.visible_ = t
                }, n.prototype.onOnline_ = function(t) {
                    t ? (this.log_("Browser went online."), this.reconnectDelay_ = In, this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."), this.realtime_ && this.realtime_.close())
                }, n.prototype.onRealtimeDisconnect_ = function() {
                    if (this.log_("data client disconnected"), this.connected_ = !1, this.realtime_ = null, this.cancelSentTransactions_(), this.requestCBHash_ = {}, this.shouldReconnect_()) {
                        if (this.visible_) {
                            if (this.lastConnectionEstablishedTime_) {
                                (new Date).getTime() - this.lastConnectionEstablishedTime_ > 3e4 && (this.reconnectDelay_ = In), this.lastConnectionEstablishedTime_ = null
                            }
                        } else this.log_("Window isn't visible.  Delaying reconnect."), this.reconnectDelay_ = this.maxReconnectDelay_, this.lastConnectionAttemptTime_ = (new Date).getTime();
                        var t = (new Date).getTime() - this.lastConnectionAttemptTime_,
                            e = Math.max(0, this.reconnectDelay_ - t);
                        e = Math.random() * e, this.log_("Trying to reconnect in " + e + "ms"), this.scheduleConnect_(e), this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, 1.3 * this.reconnectDelay_)
                    }
                    this.onConnectStatus_(!1)
                }, n.prototype.establishConnection_ = function() {
                    if (this.shouldReconnect_()) {
                        this.log_("Making a connection attempt"), this.lastConnectionAttemptTime_ = (new Date).getTime(), this.lastConnectionEstablishedTime_ = null;
                        var t = this.onDataMessage_.bind(this),
                            e = this.onReady_.bind(this),
                            r = this.onRealtimeDisconnect_.bind(this),
                            i = this.id + ":" + n.nextConnectionId_++,
                            a = this,
                            h = this.lastSessionId,
                            u = !1,
                            l = null,
                            c = function() {
                                l ? l.close() : (u = !0, r())
                            };
                        this.realtime_ = {
                            close: c,
                            sendRequest: function(t) {
                                s(l, "sendRequest call when we're not connected not allowed."), l.sendRequest(t)
                            }
                        };
                        var p = this.forceTokenRefresh_;
                        this.forceTokenRefresh_ = !1, this.authTokenProvider_.getToken(p).then(function(n) {
                            u ? Z("getToken() completed but was canceled") : (Z("getToken() completed. Creating connection."), a.authToken_ = n && n.accessToken, l = new Tn(i, a.repoInfo_, t, e, r, function(t) {
                                rt(t + " (" + a.repoInfo_.toString() + ")"), a.interrupt("server_kill")
                            }, h))
                        }).then(null, function(t) {
                            a.log_("Failed to get token: " + t), u || (o.NODE_ADMIN && rt(t), c())
                        })
                    }
                }, n.prototype.interrupt = function(t) {
                    Z("Interrupting connection for reason: " + t), this.interruptReasons_[t] = !0, this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = null), this.connected_ && this.onRealtimeDisconnect_())
                }, n.prototype.resume = function(t) {
                    Z("Resuming connection for reason: " + t), delete this.interruptReasons_[t], N(this.interruptReasons_) && (this.reconnectDelay_ = In, this.realtime_ || this.scheduleConnect_(0))
                }, n.prototype.handleTimestamp_ = function(t) {
                    var e = t - (new Date).getTime();
                    this.onServerInfoUpdate_({
                        serverTimeOffset: e
                    })
                }, n.prototype.cancelSentTransactions_ = function() {
                    for (var t = 0; t < this.outstandingPuts_.length; t++) {
                        var e = this.outstandingPuts_[t];
                        e && "h" in e.request && e.queued && (e.onComplete && e.onComplete("disconnect"), delete this.outstandingPuts_[t], this.outstandingPutCount_--)
                    }
                    0 === this.outstandingPutCount_ && (this.outstandingPuts_ = [])
                }, n.prototype.onListenRevoked_ = function(t, e) {
                    var n;
                    n = e ? e.map(function(t) {
                        return lt(t)
                    }).join("$") : "default";
                    var r = this.removeListen_(t, n);
                    r && r.onComplete && r.onComplete("permission_denied")
                }, n.prototype.removeListen_ = function(t, e) {
                    var n, r = new mt(t).toString();
                    return void 0 !== this.listens_[r] ? (n = this.listens_[r][e], delete this.listens_[r][e], 0 === I(this.listens_[r]) && delete this.listens_[r]) : n = void 0, n
                }, n.prototype.onAuthRevoked_ = function(t, e) {
                    Z("Auth token revoked: " + t + "/" + e), this.authToken_ = null, this.forceTokenRefresh_ = !0, this.realtime_.close(), "invalid_token" !== t && "permission_denied" !== t || (this.invalidAuthTokenCount_++, this.invalidAuthTokenCount_ >= 3 && (this.reconnectDelay_ = 3e4, this.authTokenProvider_.notifyForInvalidToken()))
                }, n.prototype.onSecurityDebugPacket_ = function(t) {
                    this.securityDebugCallback_ ? this.securityDebugCallback_(t) : "msg" in t && console.log("FIREBASE: " + t.msg.replace("\n", "\nFIREBASE: "))
                }, n.prototype.restoreState_ = function() {
                    var t = this;
                    this.tryAuth(), S(this.listens_, function(e, n) {
                        S(n, function(e, n) {
                            t.sendListen_(n)
                        })
                    });
                    for (var e = 0; e < this.outstandingPuts_.length; e++) this.outstandingPuts_[e] && this.sendPut_(e);
                    for (; this.onDisconnectRequestQueue_.length;) {
                        var n = this.onDisconnectRequestQueue_.shift();
                        this.sendOnDisconnect_(n.action, n.pathString, n.data, n.onComplete)
                    }
                }, n.prototype.sendConnectStats_ = function() {
                    var t = {},
                        n = "js";
                    o.NODE_ADMIN ? n = "admin_node" : o.NODE_CLIENT && (n = "node"), t["sdk." + n + "." + e.SDK_VERSION.replace(/\./g, "-")] = 1, d() ? t["framework.cordova"] = 1 : "object" == typeof navigator && "ReactNative" === navigator.product && (t["framework.reactnative"] = 1), this.reportStats(t)
                }, n.prototype.shouldReconnect_ = function() {
                    var t = yn.getInstance().currentlyOnline();
                    return N(this.interruptReasons_) && t
                }, n.nextPersistentConnectionId_ = 0, n.nextConnectionId_ = 0, n
            }(Nn),
            Dn = function(t) {
                function e(e, n, r) {
                    var i = t.call(this) || this;
                    return i.repoInfo_ = e, i.onDataUpdate_ = n, i.authTokenProvider_ = r, i.log_ = tt("p:rest:"), i.listens_ = {}, i
                }
                return r(e, t), e.prototype.reportStats = function(t) {
                    throw new Error("Method not implemented.")
                }, e.getListenId_ = function(t, e) {
                    return void 0 !== e ? "tag$" + e : (s(t.getQueryParams().isDefault(), "should have a tag if it's not a default query."), t.path.toString())
                }, e.prototype.listen = function(t, n, r, i) {
                    var o = this,
                        s = t.path.toString();
                    this.log_("Listen called for " + s + " " + t.queryIdentifier());
                    var a = e.getListenId_(t, r),
                        h = {};
                    this.listens_[a] = h;
                    var u = t.getQueryParams().toRestQueryStringParameters();
                    this.restRequest_(s + ".json", u, function(t, e) {
                        var n = e;
                        (404 === t && (n = null, t = null), null === t && o.onDataUpdate_(s, n, !1, r), b(o.listens_, a) === h) && i(t ? 401 == t ? "permission_denied" : "rest_error:" + t : "ok", null)
                    })
                }, e.prototype.unlisten = function(t, n) {
                    var r = e.getListenId_(t, n);
                    delete this.listens_[r]
                }, e.prototype.refreshAuthToken = function(t) {}, e.prototype.restRequest_ = function(t, e, n) {
                    var r = this;
                    void 0 === e && (e = {}), e.format = "export", this.authTokenProvider_.getToken(!1).then(function(i) {
                        var o = i && i.accessToken;
                        o && (e.auth = o);
                        var s, a = (r.repoInfo_.secure ? "https://" : "http://") + r.repoInfo_.host + t + "?" + (s = [], S(e, function(t, e) {
                            Array.isArray(e) ? e.forEach(function(e) {
                                s.push(encodeURIComponent(t) + "=" + encodeURIComponent(e))
                            }) : s.push(encodeURIComponent(t) + "=" + encodeURIComponent(e))
                        }), s.length ? "&" + s.join("&") : "");
                        r.log_("Sending REST request for " + a);
                        var h = new XMLHttpRequest;
                        h.onreadystatechange = function() {
                            if (n && 4 === h.readyState) {
                                r.log_("REST Response for " + a + " received. status:", h.status, "response:", h.responseText);
                                var t = null;
                                if (h.status >= 200 && h.status < 300) {
                                    try {
                                        t = m(h.responseText)
                                    } catch (t) {
                                        rt("Failed to parse JSON response for " + a + ": " + h.responseText)
                                    }
                                    n(null, t)
                                } else 401 !== h.status && 404 !== h.status && rt("Got unsuccessful REST response for " + a + " Status: " + h.status), n(h.status);
                                n = null
                            }
                        }, h.open("GET", a, !0), h.send()
                    })
                }, e
            }(Nn),
            On = function() {
                function t(t, e, n) {
                    var r = this;
                    this.repoInfo_ = t, this.app = n, this.dataUpdateCount = 0, this.statsListener_ = null, this.eventQueue_ = new pn, this.nextWriteId_ = 1, this.interceptServerDataCallback_ = null, this.onDisconnect_ = new Pe, this.persistentConnection_ = null;
                    var i = new on(n);
                    if (this.stats_ = an.getCollection(t), e || vt()) this.server_ = new Dn(this.repoInfo_, this.onDataUpdate_.bind(this), i), setTimeout(this.onConnectStatus_.bind(this, !0), 0);
                    else {
                        var o = n.options.databaseAuthVariableOverride;
                        if (void 0 !== o && null !== o) {
                            if ("object" != typeof o) throw new Error("Only objects are supported for option databaseAuthVariableOverride");
                            try {
                                C(o)
                            } catch (t) {
                                throw new Error("Invalid authOverride provided: " + t)
                            }
                        }
                        this.persistentConnection_ = new Pn(this.repoInfo_, this.onDataUpdate_.bind(this), this.onConnectStatus_.bind(this), this.onServerInfoUpdate_.bind(this), i, o), this.server_ = this.persistentConnection_
                    }
                    i.addTokenChangeListener(function(t) {
                        r.server_.refreshAuthToken(t)
                    }), this.statsReporter_ = an.getOrCreateReporter(t, function() {
                        return new cn(r.stats_, r.server_)
                    }), this.transactions_init_(), this.infoData_ = new rn, this.infoSyncTree_ = new nn({
                        startListening: function(t, e, n, i) {
                            var o = [],
                                s = r.infoData_.getNode(t.path);
                            return s.isEmpty() || (o = r.infoSyncTree_.applyServerOverwrite(t.path, s), setTimeout(function() {
                                i("ok")
                            }, 0)), o
                        },
                        stopListening: function() {}
                    }), this.updateInfo_("connected", !1), this.serverSyncTree_ = new nn({
                        startListening: function(t, e, n, i) {
                            return r.server_.listen(t, n, e, function(e, n) {
                                var o = i(e, n);
                                r.eventQueue_.raiseEventsForChangedPath(t.path, o)
                            }), []
                        },
                        stopListening: function(t, e) {
                            r.server_.unlisten(t, e)
                        }
                    })
                }
                return t.prototype.toString = function() {
                    return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host
                }, t.prototype.name = function() {
                    return this.repoInfo_.namespace
                }, t.prototype.serverTime = function() {
                    var t = this.infoData_.getNode(new mt(".info/serverTimeOffset")).val() || 0;
                    return (new Date).getTime() + t
                }, t.prototype.generateServerValues = function() {
                    return (t = (t = {
                        timestamp: this.serverTime()
                    }) || {}).timestamp = t.timestamp || (new Date).getTime(), t;
                    var t
                }, t.prototype.onDataUpdate_ = function(t, e, n, r) {
                    this.dataUpdateCount++;
                    var i = new mt(t);
                    e = this.interceptServerDataCallback_ ? this.interceptServerDataCallback_(t, e) : e;
                    var o = [];
                    if (r)
                        if (n) {
                            var s = R(e, function(t) {
                                return ve(t)
                            });
                            o = this.serverSyncTree_.applyTaggedQueryMerge(i, s, r)
                        } else {
                            var a = ve(e);
                            o = this.serverSyncTree_.applyTaggedQueryOverwrite(i, a, r)
                        }
                    else if (n) {
                        var h = R(e, function(t) {
                            return ve(t)
                        });
                        o = this.serverSyncTree_.applyServerMerge(i, h)
                    } else {
                        var u = ve(e);
                        o = this.serverSyncTree_.applyServerOverwrite(i, u)
                    }
                    var l = i;
                    o.length > 0 && (l = this.rerunTransactions_(i)), this.eventQueue_.raiseEventsForChangedPath(l, o)
                }, t.prototype.interceptServerData_ = function(t) {
                    this.interceptServerDataCallback_ = t
                }, t.prototype.onConnectStatus_ = function(t) {
                    this.updateInfo_("connected", t), !1 === t && this.runOnDisconnectEvents_()
                }, t.prototype.onServerInfoUpdate_ = function(t) {
                    var e = this;
                    pt(t, function(t, n) {
                        e.updateInfo_(n, t)
                    })
                }, t.prototype.updateInfo_ = function(t, e) {
                    var n = new mt("/.info/" + t),
                        r = ve(e);
                    this.infoData_.updateSnapshot(n, r);
                    var i = this.infoSyncTree_.applyServerOverwrite(n, r);
                    this.eventQueue_.raiseEventsForChangedPath(n, i)
                }, t.prototype.getNextWriteId_ = function() {
                    return this.nextWriteId_++
                }, t.prototype.setWithPriority = function(t, e, n, r) {
                    var i = this;
                    this.log_("set", {
                        path: t.toString(),
                        value: e,
                        priority: n
                    });
                    var o = this.generateServerValues(),
                        s = ve(e, n),
                        a = Oe(s, o),
                        h = this.getNextWriteId_(),
                        u = this.serverSyncTree_.applyUserOverwrite(t, a, h, !0);
                    this.eventQueue_.queueEvents(u), this.server_.put(t.toString(), s.val(!0), function(e, n) {
                        var o = "ok" === e;
                        o || rt("set at " + t + " failed: " + e);
                        var s = i.serverSyncTree_.ackUserWrite(h, !o);
                        i.eventQueue_.raiseEventsForChangedPath(t, s), i.callOnCompleteCallback(r, e, n)
                    });
                    var l = this.abortTransactions_(t);
                    this.rerunTransactions_(l), this.eventQueue_.raiseEventsForChangedPath(l, [])
                }, t.prototype.update = function(t, e, n) {
                    var r = this;
                    this.log_("update", {
                        path: t.toString(),
                        value: e
                    });
                    var i = !0,
                        o = this.generateServerValues(),
                        s = {};
                    if (S(e, function(t, e) {
                            i = !1;
                            var n = ve(e);
                            s[t] = Oe(n, o)
                        }), i) Z("update() called with empty data.  Don't do anything."), this.callOnCompleteCallback(n, "ok");
                    else {
                        var a = this.getNextWriteId_(),
                            h = this.serverSyncTree_.applyUserMerge(t, s, a);
                        this.eventQueue_.queueEvents(h), this.server_.merge(t.toString(), e, function(e, i) {
                            var o = "ok" === e;
                            o || rt("update at " + t + " failed: " + e);
                            var s = r.serverSyncTree_.ackUserWrite(a, !o),
                                h = s.length > 0 ? r.rerunTransactions_(t) : t;
                            r.eventQueue_.raiseEventsForChangedPath(h, s), r.callOnCompleteCallback(n, e, i)
                        }), S(e, function(e) {
                            var n = r.abortTransactions_(t.child(e));
                            r.rerunTransactions_(n)
                        }), this.eventQueue_.raiseEventsForChangedPath(t, [])
                    }
                }, t.prototype.runOnDisconnectEvents_ = function() {
                    var t = this;
                    this.log_("onDisconnectEvents");
                    var e = this.generateServerValues(),
                        n = [];
                    (function(t, e) {
                        var n = new Pe;
                        return t.forEachTree(new mt(""), function(t, r) {
                            n.remember(t, Oe(r, e))
                        }), n
                    })(this.onDisconnect_, e).forEachTree(mt.Empty, function(e, r) {
                        n = n.concat(t.serverSyncTree_.applyServerOverwrite(e, r));
                        var i = t.abortTransactions_(e);
                        t.rerunTransactions_(i)
                    }), this.onDisconnect_ = new Pe, this.eventQueue_.raiseEventsForChangedPath(mt.Empty, n)
                }, t.prototype.onDisconnectCancel = function(t, e) {
                    var n = this;
                    this.server_.onDisconnectCancel(t.toString(), function(r, i) {
                        "ok" === r && n.onDisconnect_.forget(t), n.callOnCompleteCallback(e, r, i)
                    })
                }, t.prototype.onDisconnectSet = function(t, e, n) {
                    var r = this,
                        i = ve(e);
                    this.server_.onDisconnectPut(t.toString(), i.val(!0), function(e, o) {
                        "ok" === e && r.onDisconnect_.remember(t, i), r.callOnCompleteCallback(n, e, o)
                    })
                }, t.prototype.onDisconnectSetWithPriority = function(t, e, n, r) {
                    var i = this,
                        o = ve(e, n);
                    this.server_.onDisconnectPut(t.toString(), o.val(!0), function(e, n) {
                        "ok" === e && i.onDisconnect_.remember(t, o), i.callOnCompleteCallback(r, e, n)
                    })
                }, t.prototype.onDisconnectUpdate = function(t, e, n) {
                    var r = this;
                    if (N(e)) return Z("onDisconnect().update() called with empty data.  Don't do anything."), void this.callOnCompleteCallback(n, "ok");
                    this.server_.onDisconnectMerge(t.toString(), e, function(i, o) {
                        "ok" === i && S(e, function(e, n) {
                            var i = ve(n);
                            r.onDisconnect_.remember(t.child(e), i)
                        }), r.callOnCompleteCallback(n, i, o)
                    })
                }, t.prototype.addEventCallbackForQuery = function(t, e) {
                    var n;
                    n = ".info" === t.path.getFront() ? this.infoSyncTree_.addEventRegistration(t, e) : this.serverSyncTree_.addEventRegistration(t, e), this.eventQueue_.raiseEventsAtPath(t.path, n)
                }, t.prototype.removeEventCallbackForQuery = function(t, e) {
                    var n;
                    n = ".info" === t.path.getFront() ? this.infoSyncTree_.removeEventRegistration(t, e) : this.serverSyncTree_.removeEventRegistration(t, e), this.eventQueue_.raiseEventsAtPath(t.path, n)
                }, t.prototype.interrupt = function() {
                    this.persistentConnection_ && this.persistentConnection_.interrupt("repo_interrupt")
                }, t.prototype.resume = function() {
                    this.persistentConnection_ && this.persistentConnection_.resume("repo_interrupt")
                }, t.prototype.stats = function(t) {
                    if (void 0 === t && (t = !1), "undefined" != typeof console) {
                        var e;
                        t ? (this.statsListener_ || (this.statsListener_ = new hn(this.stats_)), e = this.statsListener_.get()) : e = this.stats_.get();
                        var n = Object.keys(e).reduce(function(t, e) {
                            return Math.max(e.length, t)
                        }, 0);
                        S(e, function(t, e) {
                            for (var r = t.length; r < n + 2; r++) t += " ";
                            console.log(t + e)
                        })
                    }
                }, t.prototype.statsIncrementCounter = function(t) {
                    this.stats_.incrementCounter(t), this.statsReporter_.includeStat(t)
                }, t.prototype.log_ = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var n = "";
                    this.persistentConnection_ && (n = this.persistentConnection_.id + ":"), Z.apply(void 0, [n].concat(t))
                }, t.prototype.callOnCompleteCallback = function(t, e, n) {
                    t && yt(function() {
                        if ("ok" == e) t(null);
                        else {
                            var r = (e || "error").toUpperCase(),
                                i = r;
                            n && (i += ": " + n);
                            var o = new Error(i);
                            o.code = r, t(o)
                        }
                    })
                }, Object.defineProperty(t.prototype, "database", {
                    get: function() {
                        return this.__database || (this.__database = new Un(this))
                    },
                    enumerable: !0,
                    configurable: !0
                }), t
            }(),
            kn = function() {
                function t(e) {
                    this.indexedFilter_ = new Be(e.getIndex()), this.index_ = e.getIndex(), this.startPost_ = t.getStartPost_(e), this.endPost_ = t.getEndPost_(e)
                }
                return t.prototype.getStartPost = function() {
                    return this.startPost_
                }, t.prototype.getEndPost = function() {
                    return this.endPost_
                }, t.prototype.matches = function(t) {
                    return this.index_.compare(this.getStartPost(), t) <= 0 && this.index_.compare(t, this.getEndPost()) <= 0
                }, t.prototype.updateChild = function(t, e, n, r, i, o) {
                    return this.matches(new Bt(e, n)) || (n = fe.EMPTY_NODE), this.indexedFilter_.updateChild(t, e, n, r, i, o)
                }, t.prototype.updateFullNode = function(t, e, n) {
                    e.isLeafNode() && (e = fe.EMPTY_NODE);
                    var r = e.withIndex(this.index_);
                    r = r.updatePriority(fe.EMPTY_NODE);
                    var i = this;
                    return e.forEachChild(ne, function(t, e) {
                        i.matches(new Bt(t, e)) || (r = r.updateImmediateChild(t, fe.EMPTY_NODE))
                    }), this.indexedFilter_.updateFullNode(t, r, n)
                }, t.prototype.updatePriority = function(t, e) {
                    return t
                }, t.prototype.filtersNodes = function() {
                    return !0
                }, t.prototype.getIndexedFilter = function() {
                    return this.indexedFilter_
                }, t.prototype.getIndex = function() {
                    return this.index_
                }, t.getStartPost_ = function(t) {
                    if (t.hasStart()) {
                        var e = t.getIndexStartName();
                        return t.getIndex().makePost(t.getIndexStartValue(), e)
                    }
                    return t.getIndex().minPost()
                }, t.getEndPost_ = function(t) {
                    if (t.hasEnd()) {
                        var e = t.getIndexEndName();
                        return t.getIndex().makePost(t.getIndexEndValue(), e)
                    }
                    return t.getIndex().maxPost()
                }, t
            }(),
            xn = function() {
                function t(t) {
                    this.rangedFilter_ = new kn(t), this.index_ = t.getIndex(), this.limit_ = t.getLimit(), this.reverse_ = !t.isViewFromLeft()
                }
                return t.prototype.updateChild = function(t, e, n, r, i, o) {
                    return this.rangedFilter_.matches(new Bt(e, n)) || (n = fe.EMPTY_NODE), t.getImmediateChild(e).equals(n) ? t : t.numChildren() < this.limit_ ? this.rangedFilter_.getIndexedFilter().updateChild(t, e, n, r, i, o) : this.fullLimitUpdateChild_(t, e, n, i, o)
                }, t.prototype.updateFullNode = function(t, e, n) {
                    var r;
                    if (e.isLeafNode() || e.isEmpty()) r = fe.EMPTY_NODE.withIndex(this.index_);
                    else if (2 * this.limit_ < e.numChildren() && e.isIndexed(this.index_)) {
                        r = fe.EMPTY_NODE.withIndex(this.index_);
                        var i = void 0;
                        i = this.reverse_ ? e.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_) : e.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
                        for (var o = 0; i.hasNext() && o < this.limit_;) {
                            var s = i.getNext();
                            if (!(this.reverse_ ? this.index_.compare(this.rangedFilter_.getStartPost(), s) <= 0 : this.index_.compare(s, this.rangedFilter_.getEndPost()) <= 0)) break;
                            r = r.updateImmediateChild(s.name, s.node), o++
                        }
                    } else {
                        r = (r = e.withIndex(this.index_)).updatePriority(fe.EMPTY_NODE);
                        var a = void 0,
                            h = void 0,
                            u = void 0;
                        i = void 0;
                        if (this.reverse_) {
                            i = r.getReverseIterator(this.index_), a = this.rangedFilter_.getEndPost(), h = this.rangedFilter_.getStartPost();
                            var l = this.index_.getCompare();
                            u = function(t, e) {
                                return l(e, t)
                            }
                        } else i = r.getIterator(this.index_), a = this.rangedFilter_.getStartPost(), h = this.rangedFilter_.getEndPost(), u = this.index_.getCompare();
                        o = 0;
                        for (var c = !1; i.hasNext();) {
                            s = i.getNext();
                            !c && u(a, s) <= 0 && (c = !0), c && o < this.limit_ && u(s, h) <= 0 ? o++ : r = r.updateImmediateChild(s.name, fe.EMPTY_NODE)
                        }
                    }
                    return this.rangedFilter_.getIndexedFilter().updateFullNode(t, r, n)
                }, t.prototype.updatePriority = function(t, e) {
                    return t
                }, t.prototype.filtersNodes = function() {
                    return !0
                }, t.prototype.getIndexedFilter = function() {
                    return this.rangedFilter_.getIndexedFilter()
                }, t.prototype.getIndex = function() {
                    return this.index_
                }, t.prototype.fullLimitUpdateChild_ = function(t, e, n, r, i) {
                    var o;
                    if (this.reverse_) {
                        var a = this.index_.getCompare();
                        o = function(t, e) {
                            return a(e, t)
                        }
                    } else o = this.index_.getCompare();
                    var h = t;
                    s(h.numChildren() == this.limit_, "");
                    var u = new Bt(e, n),
                        l = this.reverse_ ? h.getFirstChild(this.index_) : h.getLastChild(this.index_),
                        c = this.rangedFilter_.matches(u);
                    if (h.hasChild(e)) {
                        for (var p = h.getImmediateChild(e), d = r.getChildAfterChild(this.index_, l, this.reverse_); null != d && (d.name == e || h.hasChild(d.name));) d = r.getChildAfterChild(this.index_, d, this.reverse_);
                        var f = null == d ? 1 : o(d, u);
                        if (c && !n.isEmpty() && f >= 0) return null != i && i.trackChildChange(He.childChangedChange(e, n, p)), h.updateImmediateChild(e, n);
                        null != i && i.trackChildChange(He.childRemovedChange(e, p));
                        var _ = h.updateImmediateChild(e, fe.EMPTY_NODE);
                        return null != d && this.rangedFilter_.matches(d) ? (null != i && i.trackChildChange(He.childAddedChange(d.name, d.node)), _.updateImmediateChild(d.name, d.node)) : _
                    }
                    return n.isEmpty() ? t : c && o(l, u) >= 0 ? (null != i && (i.trackChildChange(He.childRemovedChange(l.name, l.node)), i.trackChildChange(He.childAddedChange(e, n))), h.updateImmediateChild(e, n).updateImmediateChild(l.name, fe.EMPTY_NODE)) : t
                }, t
            }(),
            Fn = function() {
                function t() {
                    this.limitSet_ = !1, this.startSet_ = !1, this.startNameSet_ = !1, this.endSet_ = !1, this.endNameSet_ = !1, this.limit_ = 0, this.viewFrom_ = "", this.indexStartValue_ = null, this.indexStartName_ = "", this.indexEndValue_ = null, this.indexEndName_ = "", this.index_ = ne
                }
                return t.prototype.hasStart = function() {
                    return this.startSet_
                }, t.prototype.isViewFromLeft = function() {
                    return "" === this.viewFrom_ ? this.startSet_ : this.viewFrom_ === t.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT
                }, t.prototype.getIndexStartValue = function() {
                    return s(this.startSet_, "Only valid if start has been set"), this.indexStartValue_
                }, t.prototype.getIndexStartName = function() {
                    return s(this.startSet_, "Only valid if start has been set"), this.startNameSet_ ? this.indexStartName_ : ot
                }, t.prototype.hasEnd = function() {
                    return this.endSet_
                }, t.prototype.getIndexEndValue = function() {
                    return s(this.endSet_, "Only valid if end has been set"), this.indexEndValue_
                }, t.prototype.getIndexEndName = function() {
                    return s(this.endSet_, "Only valid if end has been set"), this.endNameSet_ ? this.indexEndName_ : st
                }, t.prototype.hasLimit = function() {
                    return this.limitSet_
                }, t.prototype.hasAnchoredLimit = function() {
                    return this.limitSet_ && "" !== this.viewFrom_
                }, t.prototype.getLimit = function() {
                    return s(this.limitSet_, "Only valid if limit has been set"), this.limit_
                }, t.prototype.getIndex = function() {
                    return this.index_
                }, t.prototype.copy_ = function() {
                    var e = new t;
                    return e.limitSet_ = this.limitSet_, e.limit_ = this.limit_, e.startSet_ = this.startSet_, e.indexStartValue_ = this.indexStartValue_, e.startNameSet_ = this.startNameSet_, e.indexStartName_ = this.indexStartName_, e.endSet_ = this.endSet_, e.indexEndValue_ = this.indexEndValue_, e.endNameSet_ = this.endNameSet_, e.indexEndName_ = this.indexEndName_, e.index_ = this.index_, e.viewFrom_ = this.viewFrom_, e
                }, t.prototype.limit = function(t) {
                    var e = this.copy_();
                    return e.limitSet_ = !0, e.limit_ = t, e.viewFrom_ = "", e
                }, t.prototype.limitToFirst = function(e) {
                    var n = this.copy_();
                    return n.limitSet_ = !0, n.limit_ = e, n.viewFrom_ = t.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT, n
                }, t.prototype.limitToLast = function(e) {
                    var n = this.copy_();
                    return n.limitSet_ = !0, n.limit_ = e, n.viewFrom_ = t.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_RIGHT, n
                }, t.prototype.startAt = function(t, e) {
                    var n = this.copy_();
                    return n.startSet_ = !0, void 0 === t && (t = null), n.indexStartValue_ = t, null != e ? (n.startNameSet_ = !0, n.indexStartName_ = e) : (n.startNameSet_ = !1, n.indexStartName_ = ""), n
                }, t.prototype.endAt = function(t, e) {
                    var n = this.copy_();
                    return n.endSet_ = !0, void 0 === t && (t = null), n.indexEndValue_ = t, void 0 !== e ? (n.endNameSet_ = !0, n.indexEndName_ = e) : (n.endNameSet_ = !1, n.indexEndName_ = ""), n
                }, t.prototype.orderBy = function(t) {
                    var e = this.copy_();
                    return e.index_ = t, e
                }, t.prototype.getQueryObject = function() {
                    var e = t.WIRE_PROTOCOL_CONSTANTS_,
                        n = {};
                    if (this.startSet_ && (n[e.INDEX_START_VALUE] = this.indexStartValue_, this.startNameSet_ && (n[e.INDEX_START_NAME] = this.indexStartName_)), this.endSet_ && (n[e.INDEX_END_VALUE] = this.indexEndValue_, this.endNameSet_ && (n[e.INDEX_END_NAME] = this.indexEndName_)), this.limitSet_) {
                        n[e.LIMIT] = this.limit_;
                        var r = this.viewFrom_;
                        "" === r && (r = this.isViewFromLeft() ? e.VIEW_FROM_LEFT : e.VIEW_FROM_RIGHT), n[e.VIEW_FROM] = r
                    }
                    return this.index_ !== ne && (n[e.INDEX] = this.index_.toString()), n
                }, t.prototype.loadsAllData = function() {
                    return !(this.startSet_ || this.endSet_ || this.limitSet_)
                }, t.prototype.isDefault = function() {
                    return this.loadsAllData() && this.index_ == ne
                }, t.prototype.getNodeFilter = function() {
                    return this.loadsAllData() ? new Be(this.getIndex()) : this.hasLimit() ? new xn(this) : new kn(this)
                }, t.prototype.toRestQueryStringParameters = function() {
                    var e, n = t.REST_QUERY_CONSTANTS_,
                        r = {};
                    return this.isDefault() ? r : (this.index_ === ne ? e = n.PRIORITY_INDEX : this.index_ === Ce ? e = n.VALUE_INDEX : this.index_ === Yt ? e = n.KEY_INDEX : (s(this.index_ instanceof Ee, "Unrecognized index type!"), e = this.index_.toString()), r[n.ORDER_BY] = C(e), this.startSet_ && (r[n.START_AT] = C(this.indexStartValue_), this.startNameSet_ && (r[n.START_AT] += "," + C(this.indexStartName_))), this.endSet_ && (r[n.END_AT] = C(this.indexEndValue_), this.endNameSet_ && (r[n.END_AT] += "," + C(this.indexEndName_))), this.limitSet_ && (this.isViewFromLeft() ? r[n.LIMIT_TO_FIRST] = this.limit_ : r[n.LIMIT_TO_LAST] = this.limit_), r)
                }, t.WIRE_PROTOCOL_CONSTANTS_ = {
                    INDEX_START_VALUE: "sp",
                    INDEX_START_NAME: "sn",
                    INDEX_END_VALUE: "ep",
                    INDEX_END_NAME: "en",
                    LIMIT: "l",
                    VIEW_FROM: "vf",
                    VIEW_FROM_LEFT: "l",
                    VIEW_FROM_RIGHT: "r",
                    INDEX: "i"
                }, t.REST_QUERY_CONSTANTS_ = {
                    ORDER_BY: "orderBy",
                    PRIORITY_INDEX: "$priority",
                    VALUE_INDEX: "$value",
                    KEY_INDEX: "$key",
                    START_AT: "startAt",
                    END_AT: "endAt",
                    LIMIT_TO_FIRST: "limitToFirst",
                    LIMIT_TO_LAST: "limitToLast"
                }, t.DEFAULT = new t, t
            }(),
            An = function(t) {
                function e(e, n) {
                    if (!(e instanceof On)) throw new Error("new Reference() no longer supported - use app.database().");
                    return t.call(this, e, n, Fn.DEFAULT, !1) || this
                }
                return r(e, t), e.prototype.getKey = function() {
                    return k("Reference.key", 0, 0, arguments.length), this.path.isEmpty() ? null : this.path.getBack()
                }, e.prototype.child = function(t) {
                    return k("Reference.child", 1, 1, arguments.length), "number" == typeof t ? t = String(t) : t instanceof mt || (null === this.path.getFront() ? function(t, e, n, r) {
                        n && (n = n.replace(/^\/*\.info(\/|$)/, "/")), Wt(t, e, n, r)
                    }("Reference.child", 1, t, !1) : Wt("Reference.child", 1, t, !1)), new e(this.repo, this.path.child(t))
                }, e.prototype.getParent = function() {
                    k("Reference.parent", 0, 0, arguments.length);
                    var t = this.path.parent();
                    return null === t ? null : new e(this.repo, t)
                }, e.prototype.getRoot = function() {
                    k("Reference.root", 0, 0, arguments.length);
                    for (var t = this; null !== t.getParent();) t = t.getParent();
                    return t
                }, e.prototype.databaseProp = function() {
                    return this.repo.database
                }, e.prototype.set = function(t, e) {
                    k("Reference.set", 1, 2, arguments.length), qt("Reference.set", this.path), kt("Reference.set", 1, t, this.path, !1), F("Reference.set", 2, e, !0);
                    var n = new p;
                    return this.repo.setWithPriority(this.path, t, null, n.wrapCallback(e)), n.promise
                }, e.prototype.update = function(t, e) {
                    if (k("Reference.update", 1, 2, arguments.length), qt("Reference.update", this.path), Array.isArray(t)) {
                        for (var n = {}, r = 0; r < t.length; ++r) n["" + r] = t[r];
                        t = n, rt("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
                    }
                    Ft("Reference.update", 1, t, this.path, !1), F("Reference.update", 2, e, !0);
                    var i = new p;
                    return this.repo.update(this.path, t, i.wrapCallback(e)), i.promise
                }, e.prototype.setWithPriority = function(t, e, n) {
                    if (k("Reference.setWithPriority", 2, 3, arguments.length), qt("Reference.setWithPriority", this.path), kt("Reference.setWithPriority", 1, t, this.path, !1), At("Reference.setWithPriority", 2, e, !1), F("Reference.setWithPriority", 3, n, !0), ".length" === this.getKey() || ".keys" === this.getKey()) throw "Reference.setWithPriority failed: " + this.getKey() + " is a read-only object.";
                    var r = new p;
                    return this.repo.setWithPriority(this.path, t, e, r.wrapCallback(n)), r.promise
                }, e.prototype.remove = function(t) {
                    return k("Reference.remove", 0, 1, arguments.length), qt("Reference.remove", this.path), F("Reference.remove", 1, t, !0), this.set(null, t)
                }, e.prototype.transaction = function(t, e, n) {
                    if (k("Reference.transaction", 1, 3, arguments.length), qt("Reference.transaction", this.path), F("Reference.transaction", 1, t, !1), F("Reference.transaction", 2, e, !0), function(t, e, n, r) {
                            if ((!r || void 0 !== n) && "boolean" != typeof n) throw new Error(x(t, e, r) + "must be a boolean.")
                        }("Reference.transaction", 3, n, !0), ".length" === this.getKey() || ".keys" === this.getKey()) throw "Reference.transaction failed: " + this.getKey() + " is a read-only object.";
                    void 0 === n && (n = !0);
                    var r = new p;
                    "function" == typeof e && r.promise.catch(function() {});
                    return this.repo.startTransaction(this.path, t, function(t, n, i) {
                        t ? r.reject(t) : r.resolve(new Vt(n, i)), "function" == typeof e && e(t, n, i)
                    }, n), r.promise
                }, e.prototype.setPriority = function(t, e) {
                    k("Reference.setPriority", 1, 2, arguments.length), qt("Reference.setPriority", this.path), At("Reference.setPriority", 1, t, !1), F("Reference.setPriority", 2, e, !0);
                    var n = new p;
                    return this.repo.setWithPriority(this.path.child(".priority"), t, null, n.wrapCallback(e)), n.promise
                }, e.prototype.push = function(t, e) {
                    k("Reference.push", 0, 2, arguments.length), qt("Reference.push", this.path), kt("Reference.push", 1, t, this.path, !0), F("Reference.push", 2, e, !0);
                    var n, r = this.repo.serverTime(),
                        i = Ht(r),
                        o = this.child(i),
                        s = this.child(i);
                    return n = null != t ? o.set(t, e).then(function() {
                        return s
                    }) : Promise.resolve(s), o.then = n.then.bind(n), o.catch = n.then.bind(n, void 0), "function" == typeof e && n.catch(function() {}), o
                }, e.prototype.onDisconnect = function() {
                    return qt("Reference.onDisconnect", this.path), new Ut(this.repo, this.path)
                }, Object.defineProperty(e.prototype, "database", {
                    get: function() {
                        return this.databaseProp()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "key", {
                    get: function() {
                        return this.getKey()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "parent", {
                    get: function() {
                        return this.getParent()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "root", {
                    get: function() {
                        return this.getRoot()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e
            }(Ie);
        Ie.__referenceConstructor = An, Je.__referenceConstructor = An;
        var Ln, Mn = function() {
                return function() {
                    this.children = {}, this.childCount = 0, this.value = null
                }
            }(),
            Wn = function() {
                function t(t, e, n) {
                    void 0 === t && (t = ""), void 0 === e && (e = null), void 0 === n && (n = new Mn), this.name_ = t, this.parent_ = e, this.node_ = n
                }
                return t.prototype.subTree = function(e) {
                    for (var n, r = e instanceof mt ? e : new mt(e), i = this; null !== (n = r.getFront());) {
                        i = new t(n, i, b(i.node_.children, n) || new Mn), r = r.popFront()
                    }
                    return i
                }, t.prototype.getValue = function() {
                    return this.node_.value
                }, t.prototype.setValue = function(t) {
                    s(void 0 !== t, "Cannot set value to undefined"), this.node_.value = t, this.updateParents_()
                }, t.prototype.clear = function() {
                    this.node_.value = null, this.node_.children = {}, this.node_.childCount = 0, this.updateParents_()
                }, t.prototype.hasChildren = function() {
                    return this.node_.childCount > 0
                }, t.prototype.isEmpty = function() {
                    return null === this.getValue() && !this.hasChildren()
                }, t.prototype.forEachChild = function(e) {
                    var n = this;
                    S(this.node_.children, function(r, i) {
                        e(new t(r, n, i))
                    })
                }, t.prototype.forEachDescendant = function(t, e, n) {
                    e && !n && t(this), this.forEachChild(function(e) {
                        e.forEachDescendant(t, !0, n)
                    }), e && n && t(this)
                }, t.prototype.forEachAncestor = function(t, e) {
                    for (var n = e ? this : this.parent(); null !== n;) {
                        if (t(n)) return !0;
                        n = n.parent()
                    }
                    return !1
                }, t.prototype.forEachImmediateDescendantWithValue = function(t) {
                    this.forEachChild(function(e) {
                        null !== e.getValue() ? t(e) : e.forEachImmediateDescendantWithValue(t)
                    })
                }, t.prototype.path = function() {
                    return new mt(null === this.parent_ ? this.name_ : this.parent_.path() + "/" + this.name_)
                }, t.prototype.name = function() {
                    return this.name_
                }, t.prototype.parent = function() {
                    return this.parent_
                }, t.prototype.updateParents_ = function() {
                    null !== this.parent_ && this.parent_.updateChild_(this.name_, this)
                }, t.prototype.updateChild_ = function(t, e) {
                    var n = e.isEmpty(),
                        r = w(this.node_.children, t);
                    n && r ? (delete this.node_.children[t], this.node_.childCount--, this.updateParents_()) : n || r || (this.node_.children[t] = e.node_, this.node_.childCount++, this.updateParents_())
                }, t
            }();
        ! function(t) {
            t[t.RUN = 0] = "RUN", t[t.SENT = 1] = "SENT", t[t.COMPLETED = 2] = "COMPLETED", t[t.SENT_NEEDS_ABORT = 3] = "SENT_NEEDS_ABORT", t[t.NEEDS_ABORT = 4] = "NEEDS_ABORT"
        }(Ln || (Ln = {})), On.MAX_TRANSACTION_RETRIES_ = 25, On.prototype.transactions_init_ = function() {
            this.transactionQueueTree_ = new Wn
        }, On.prototype.startTransaction = function(t, e, n, r) {
            this.log_("transaction on " + t);
            var i = function() {},
                o = new An(this, t);
            o.on("value", i);
            var a = {
                    path: t,
                    update: e,
                    onComplete: n,
                    status: null,
                    order: Y(),
                    applyLocally: r,
                    retryCount: 0,
                    unwatcher: function() {
                        o.off("value", i)
                    },
                    abortReason: null,
                    currentWriteId: null,
                    currentInputSnapshot: null,
                    currentOutputSnapshotRaw: null,
                    currentOutputSnapshotResolved: null
                },
                h = this.getLatestState_(t);
            a.currentInputSnapshot = h;
            var u = a.update(h.val());
            if (void 0 === u) {
                if (a.unwatcher(), a.currentOutputSnapshotRaw = null, a.currentOutputSnapshotResolved = null, a.onComplete) {
                    var l = new we(a.currentInputSnapshot, new An(this, a.path), ne);
                    a.onComplete(null, !1, l)
                }
            } else {
                xt("transaction failed: Data returned ", u, a.path), a.status = Ln.RUN;
                var c = this.transactionQueueTree_.subTree(t),
                    p = c.getValue() || [];
                p.push(a), c.setValue(p);
                var d = void 0;
                if ("object" == typeof u && null !== u && w(u, ".priority")) d = b(u, ".priority"), s(Ot(d), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");
                else d = (this.serverSyncTree_.calcCompleteEventCache(t) || fe.EMPTY_NODE).getPriority().val();
                d = d;
                var f = this.generateServerValues(),
                    _ = ve(u, d),
                    y = Oe(_, f);
                a.currentOutputSnapshotRaw = _, a.currentOutputSnapshotResolved = y, a.currentWriteId = this.getNextWriteId_();
                var v = this.serverSyncTree_.applyUserOverwrite(t, y, a.currentWriteId, a.applyLocally);
                this.eventQueue_.raiseEventsForChangedPath(t, v), this.sendReadyTransactions_()
            }
        }, On.prototype.getLatestState_ = function(t, e) {
            return this.serverSyncTree_.calcCompleteEventCache(t, e) || fe.EMPTY_NODE
        }, On.prototype.sendReadyTransactions_ = function(t) {
            var e = this;
            if (void 0 === t && (t = this.transactionQueueTree_), t || this.pruneCompletedTransactionsBelowNode_(t), null !== t.getValue()) {
                var n = this.buildTransactionQueue_(t);
                s(n.length > 0, "Sending zero length transaction queue"), n.every(function(t) {
                    return t.status === Ln.RUN
                }) && this.sendTransactionQueue_(t.path(), n)
            } else t.hasChildren() && t.forEachChild(function(t) {
                e.sendReadyTransactions_(t)
            })
        }, On.prototype.sendTransactionQueue_ = function(t, e) {
            for (var n = this, r = e.map(function(t) {
                    return t.currentWriteId
                }), i = this.getLatestState_(t, r), o = i, a = i.hash(), h = 0; h < e.length; h++) {
                var u = e[h];
                s(u.status === Ln.RUN, "tryToSendTransactionQueue_: items in queue should all be run."), u.status = Ln.SENT, u.retryCount++;
                var l = mt.relativePath(t, u.path);
                o = o.updateChild(l, u.currentOutputSnapshotRaw)
            }
            var c = o.val(!0),
                p = t;
            this.server_.put(p.toString(), c, function(r) {
                n.log_("transaction put response", {
                    path: p.toString(),
                    status: r
                });
                var i = [];
                if ("ok" === r) {
                    for (var o = [], s = 0; s < e.length; s++) {
                        if (e[s].status = Ln.COMPLETED, i = i.concat(n.serverSyncTree_.ackUserWrite(e[s].currentWriteId)), e[s].onComplete) {
                            var a = e[s].currentOutputSnapshotResolved,
                                h = new An(n, e[s].path),
                                u = new we(a, h, ne);
                            o.push(e[s].onComplete.bind(null, null, !0, u))
                        }
                        e[s].unwatcher()
                    }
                    n.pruneCompletedTransactionsBelowNode_(n.transactionQueueTree_.subTree(t)), n.sendReadyTransactions_(), n.eventQueue_.raiseEventsForChangedPath(t, i);
                    for (s = 0; s < o.length; s++) yt(o[s])
                } else {
                    if ("datastale" === r)
                        for (s = 0; s < e.length; s++) e[s].status === Ln.SENT_NEEDS_ABORT ? e[s].status = Ln.NEEDS_ABORT : e[s].status = Ln.RUN;
                    else {
                        rt("transaction at " + p.toString() + " failed: " + r);
                        for (s = 0; s < e.length; s++) e[s].status = Ln.NEEDS_ABORT, e[s].abortReason = r
                    }
                    n.rerunTransactions_(t)
                }
            }, a)
        }, On.prototype.rerunTransactions_ = function(t) {
            var e = this.getAncestorTransactionNode_(t),
                n = e.path(),
                r = this.buildTransactionQueue_(e);
            return this.rerunTransactionQueue_(r, n), n
        }, On.prototype.rerunTransactionQueue_ = function(t, e) {
            if (0 !== t.length) {
                for (var n, r = [], i = [], o = t.filter(function(t) {
                        return t.status === Ln.RUN
                    }).map(function(t) {
                        return t.currentWriteId
                    }), a = 0; a < t.length; a++) {
                    var h = t[a],
                        u = mt.relativePath(e, h.path),
                        l = !1,
                        c = void 0;
                    if (s(null !== u, "rerunTransactionsUnderNode_: relativePath should not be null."), h.status === Ln.NEEDS_ABORT) l = !0, c = h.abortReason, i = i.concat(this.serverSyncTree_.ackUserWrite(h.currentWriteId, !0));
                    else if (h.status === Ln.RUN)
                        if (h.retryCount >= On.MAX_TRANSACTION_RETRIES_) l = !0, c = "maxretry", i = i.concat(this.serverSyncTree_.ackUserWrite(h.currentWriteId, !0));
                        else {
                            var p = this.getLatestState_(h.path, o);
                            h.currentInputSnapshot = p;
                            var d = t[a].update(p.val());
                            if (void 0 !== d) {
                                xt("transaction failed: Data returned ", d, h.path);
                                var f = ve(d);
                                "object" == typeof d && null != d && w(d, ".priority") || (f = f.updatePriority(p.getPriority()));
                                var _ = h.currentWriteId,
                                    y = this.generateServerValues(),
                                    v = Oe(f, y);
                                h.currentOutputSnapshotRaw = f, h.currentOutputSnapshotResolved = v, h.currentWriteId = this.getNextWriteId_(), o.splice(o.indexOf(_), 1), i = (i = i.concat(this.serverSyncTree_.applyUserOverwrite(h.path, v, h.currentWriteId, h.applyLocally))).concat(this.serverSyncTree_.ackUserWrite(_, !0))
                            } else l = !0, c = "nodata", i = i.concat(this.serverSyncTree_.ackUserWrite(h.currentWriteId, !0))
                        } if (this.eventQueue_.raiseEventsForChangedPath(e, i), i = [], l && (t[a].status = Ln.COMPLETED, n = t[a].unwatcher, setTimeout(n, Math.floor(0)), t[a].onComplete))
                        if ("nodata" === c) {
                            var g = new An(this, t[a].path),
                                m = t[a].currentInputSnapshot,
                                C = new we(m, g, ne);
                            r.push(t[a].onComplete.bind(null, null, !1, C))
                        } else r.push(t[a].onComplete.bind(null, new Error(c), !1, null))
                }
                this.pruneCompletedTransactionsBelowNode_(this.transactionQueueTree_);
                for (a = 0; a < r.length; a++) yt(r[a]);
                this.sendReadyTransactions_()
            }
        }, On.prototype.getAncestorTransactionNode_ = function(t) {
            for (var e, n = this.transactionQueueTree_; null !== (e = t.getFront()) && null === n.getValue();) n = n.subTree(e), t = t.popFront();
            return n
        }, On.prototype.buildTransactionQueue_ = function(t) {
            var e = [];
            return this.aggregateTransactionQueuesForNode_(t, e), e.sort(function(t, e) {
                return t.order - e.order
            }), e
        }, On.prototype.aggregateTransactionQueuesForNode_ = function(t, e) {
            var n = this,
                r = t.getValue();
            if (null !== r)
                for (var i = 0; i < r.length; i++) e.push(r[i]);
            t.forEachChild(function(t) {
                n.aggregateTransactionQueuesForNode_(t, e)
            })
        }, On.prototype.pruneCompletedTransactionsBelowNode_ = function(t) {
            var e = this,
                n = t.getValue();
            if (n) {
                for (var r = 0, i = 0; i < n.length; i++) n[i].status !== Ln.COMPLETED && (n[r] = n[i], r++);
                n.length = r, t.setValue(n.length > 0 ? n : null)
            }
            t.forEachChild(function(t) {
                e.pruneCompletedTransactionsBelowNode_(t)
            })
        }, On.prototype.abortTransactions_ = function(t) {
            var e = this,
                n = this.getAncestorTransactionNode_(t).path(),
                r = this.transactionQueueTree_.subTree(t);
            return r.forEachAncestor(function(t) {
                e.abortTransactionsOnNode_(t)
            }), this.abortTransactionsOnNode_(r), r.forEachDescendant(function(t) {
                e.abortTransactionsOnNode_(t)
            }), n
        }, On.prototype.abortTransactionsOnNode_ = function(t) {
            var e = t.getValue();
            if (null !== e) {
                for (var n = [], r = [], i = -1, o = 0; o < e.length; o++)
                    if (e[o].status === Ln.SENT_NEEDS_ABORT);
                    else if (e[o].status === Ln.SENT) s(i === o - 1, "All SENT items should be at beginning of queue."), i = o, e[o].status = Ln.SENT_NEEDS_ABORT, e[o].abortReason = "set";
                else if (s(e[o].status === Ln.RUN, "Unexpected transaction status in abort"), e[o].unwatcher(), r = r.concat(this.serverSyncTree_.ackUserWrite(e[o].currentWriteId, !0)), e[o].onComplete) {
                    n.push(e[o].onComplete.bind(null, new Error("set"), !1, null))
                } - 1 === i ? t.setValue(null) : e.length = i + 1, this.eventQueue_.raiseEventsForChangedPath(t.path(), r);
                for (o = 0; o < n.length; o++) yt(n[o])
            }
        };
        var qn, Qn = function() {
                function t() {
                    this.repos_ = {}, this.useRestClient_ = !1
                }
                return t.getInstance = function() {
                    return qn || (qn = new t), qn
                }, t.prototype.interrupt = function() {
                    for (var t in this.repos_)
                        for (var e in this.repos_[t]) this.repos_[t][e].interrupt()
                }, t.prototype.resume = function() {
                    for (var t in this.repos_)
                        for (var e in this.repos_[t]) this.repos_[t][e].resume()
                }, t.prototype.databaseFromApp = function(t, e) {
                    var n = e || t.options.databaseURL;
                    void 0 === n && nt("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.initializeApp().");
                    var r = Tt(n),
                        i = r.repoInfo;
                    return Qt("Invalid Firebase Database URL", 1, r), r.path.isEmpty() || nt("Database URL must point to the root of a Firebase Database (not including a child path)."), this.createRepo(i, t).database
                }, t.prototype.deleteRepo = function(t) {
                    var e = b(this.repos_, t.app.name);
                    e && b(e, t.repoInfo_.toURLString()) === t || nt("Database " + t.app.name + "(" + t.repoInfo_ + ") has already been deleted."), t.interrupt(), delete e[t.repoInfo_.toURLString()]
                }, t.prototype.createRepo = function(t, e) {
                    var n = b(this.repos_, e.name);
                    n || (n = {}, this.repos_[e.name] = n);
                    var r = b(n, t.toURLString());
                    return r && nt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."), r = new On(t, this.useRestClient_, e), n[t.toURLString()] = r, r
                }, t.prototype.forceRestClient = function(t) {
                    this.useRestClient_ = t
                }, t
            }(),
            Un = function() {
                function t(t) {
                    this.repo_ = t, t instanceof On || nt("Don't call new Database() directly - please use firebase.database()."), this.root_ = new An(t, mt.Empty), this.INTERNAL = new Vn(this)
                }
                return Object.defineProperty(t.prototype, "app", {
                    get: function() {
                        return this.repo_.app
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.ref = function(t) {
                    return this.checkDeleted_("ref"), k("database.ref", 0, 1, arguments.length), t instanceof An ? this.refFromURL(t.toString()) : void 0 !== t ? this.root_.child(t) : this.root_
                }, t.prototype.refFromURL = function(t) {
                    var e = "database.refFromURL";
                    this.checkDeleted_(e), k(e, 1, 1, arguments.length);
                    var n = Tt(t);
                    Qt(e, 1, n);
                    var r = n.repoInfo;
                    return r.host !== this.repo_.repoInfo_.host && nt(e + ": Host name does not match the current database: (found " + r.host + " but expected " + this.repo_.repoInfo_.host + ")"), this.ref(n.path.toString())
                }, t.prototype.checkDeleted_ = function(t) {
                    null === this.repo_ && nt("Cannot call " + t + " on a deleted database.")
                }, t.prototype.goOffline = function() {
                    k("database.goOffline", 0, 0, arguments.length), this.checkDeleted_("goOffline"), this.repo_.interrupt()
                }, t.prototype.goOnline = function() {
                    k("database.goOnline", 0, 0, arguments.length), this.checkDeleted_("goOnline"), this.repo_.resume()
                }, t.ServerValue = {
                    TIMESTAMP: {
                        ".sv": "timestamp"
                    }
                }, t
            }(),
            Vn = function() {
                function t(t) {
                    this.database = t
                }
                return t.prototype.delete = function() {
                    return t = this, e = void 0, r = function() {
                        return i(this, function(t) {
                            return this.database.checkDeleted_("delete"), Qn.getInstance().deleteRepo(this.database.repo_), this.database.repo_ = null, this.database.root_ = null, this.database.INTERNAL = null, this.database = null, [2]
                        })
                    }, new((n = void 0) || (n = Promise))(function(i, o) {
                        function s(t) {
                            try {
                                h(r.next(t))
                            } catch (t) {
                                o(t)
                            }
                        }

                        function a(t) {
                            try {
                                h(r.throw(t))
                            } catch (t) {
                                o(t)
                            }
                        }

                        function h(t) {
                            t.done ? i(t.value) : new n(function(e) {
                                e(t.value)
                            }).then(s, a)
                        }
                        h((r = r.apply(t, e || [])).next())
                    });
                    var t, e, n, r
                }, t
            }(),
            Hn = Object.freeze({
                forceLongPolling: function() {
                    bn.forceDisallow(), Cn.forceAllow()
                },
                forceWebSockets: function() {
                    Cn.forceDisallow()
                },
                isWebSocketsAvailable: function() {
                    return bn.isAvailable()
                },
                setSecurityDebugCallback: function(t, e) {
                    t.repo.persistentConnection_.securityDebugCallback_ = e
                },
                stats: function(t, e) {
                    t.repo.stats(e)
                },
                statsIncrementCounter: function(t, e) {
                    t.repo.statsIncrementCounter(e)
                },
                dataUpdateCount: function(t) {
                    return t.repo.dataUpdateCount
                },
                interceptServerData: function(t, e) {
                    return t.repo.interceptServerData_(e)
                }
            }),
            Bn = Pn;
        Pn.prototype.simpleListen = function(t, e) {
            this.sendRequest("q", {
                p: t
            }, e)
        }, Pn.prototype.echo = function(t, e) {
            this.sendRequest("echo", {
                d: t
            }, e)
        };
        var jn = Tn,
            Kn = wt,
            Yn = Object.freeze({
                DataConnection: Bn,
                RealTimeConnection: jn,
                hijackHash: function(t) {
                    var e = Pn.prototype.put;
                    return Pn.prototype.put = function(n, r, i, o) {
                            void 0 !== o && (o = t()), e.call(this, n, r, i, o)
                        },
                        function() {
                            Pn.prototype.put = e
                        }
                },
                ConnectionTarget: Kn,
                queryIdentifier: function(t) {
                    return t.queryIdentifier()
                },
                listens: function(t) {
                    return t.repo.persistentConnection_.listens_
                },
                forceRestClient: function(t) {
                    Qn.getInstance().forceRestClient(t)
                }
            }),
            zn = Un.ServerValue;
        Gn = e.INTERNAL.registerService("database", function(t, e, n) {
            return Qn.getInstance().databaseFromApp(t, n)
        }, {
            Reference: An,
            Query: Ie,
            Database: Un,
            enableLogging: J,
            INTERNAL: Hn,
            ServerValue: zn,
            TEST_ACCESS: Yn
        }, null, !0), f() && (module.exports = Gn)
    } catch (t) {
        throw console.error(t), new Error("Cannot instantiate firebase-database - be sure to load firebase-app.js first.")
    }
    var Gn, Xn, $n, Jn, Zn
}(this.firebase = this.firebase || {}, firebase);
//# sourceMappingURL=firebase-database.js.map

// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/content/firebase-app.js

! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.firebase = e()
}(this, function() {
    "use strict";
    ! function(t) {
        if (!t.fetch) {
            var e = {
                searchParams: "URLSearchParams" in t,
                iterable: "Symbol" in t && "iterator" in Symbol,
                blob: "FileReader" in t && "Blob" in t && function() {
                    try {
                        return new Blob, !0
                    } catch (t) {
                        return !1
                    }
                }(),
                formData: "FormData" in t,
                arrayBuffer: "ArrayBuffer" in t
            };
            if (e.arrayBuffer) var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                n = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                },
                o = ArrayBuffer.isView || function(t) {
                    return t && r.indexOf(Object.prototype.toString.call(t)) > -1
                };
            f.prototype.append = function(t, e) {
                t = a(t), e = u(e);
                var r = this.map[t];
                this.map[t] = r ? r + "," + e : e
            }, f.prototype.delete = function(t) {
                delete this.map[a(t)]
            }, f.prototype.get = function(t) {
                return t = a(t), this.has(t) ? this.map[t] : null
            }, f.prototype.has = function(t) {
                return this.map.hasOwnProperty(a(t))
            }, f.prototype.set = function(t, e) {
                this.map[a(t)] = u(e)
            }, f.prototype.forEach = function(t, e) {
                for (var r in this.map) this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this)
            }, f.prototype.keys = function() {
                var t = [];
                return this.forEach(function(e, r) {
                    t.push(r)
                }), c(t)
            }, f.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), c(t)
            }, f.prototype.entries = function() {
                var t = [];
                return this.forEach(function(e, r) {
                    t.push([r, e])
                }), c(t)
            }, e.iterable && (f.prototype[Symbol.iterator] = f.prototype.entries);
            var i = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            v.prototype.clone = function() {
                return new v(this, {
                    body: this._bodyInit
                })
            }, y.call(v.prototype), y.call(m.prototype), m.prototype.clone = function() {
                return new m(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new f(this.headers),
                    url: this.url
                })
            }, m.error = function() {
                var t = new m(null, {
                    status: 0,
                    statusText: ""
                });
                return t.type = "error", t
            };
            var s = [301, 302, 303, 307, 308];
            m.redirect = function(t, e) {
                if (-1 === s.indexOf(e)) throw new RangeError("Invalid status code");
                return new m(null, {
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }, t.Headers = f, t.Request = v, t.Response = m, t.fetch = function(t, r) {
                return new Promise(function(n, o) {
                    var i = new v(t, r),
                        s = new XMLHttpRequest;
                    s.onload = function() {
                        var t, e, r = {
                            status: s.status,
                            statusText: s.statusText,
                            headers: (t = s.getAllResponseHeaders() || "", e = new f, t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                                var r = t.split(":"),
                                    n = r.shift().trim();
                                if (n) {
                                    var o = r.join(":").trim();
                                    e.append(n, o)
                                }
                            }), e)
                        };
                        r.url = "responseURL" in s ? s.responseURL : r.headers.get("X-Request-URL");
                        var o = "response" in s ? s.response : s.responseText;
                        n(new m(o, r))
                    }, s.onerror = function() {
                        o(new TypeError("Network request failed"))
                    }, s.ontimeout = function() {
                        o(new TypeError("Network request failed"))
                    }, s.open(i.method, i.url, !0), "include" === i.credentials ? s.withCredentials = !0 : "omit" === i.credentials && (s.withCredentials = !1), "responseType" in s && e.blob && (s.responseType = "blob"), i.headers.forEach(function(t, e) {
                        s.setRequestHeader(e, t)
                    }), s.send(void 0 === i._bodyInit ? null : i._bodyInit)
                })
            }, t.fetch.polyfill = !0
        }

        function a(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }

        function u(t) {
            return "string" != typeof t && (t = String(t)), t
        }

        function c(t) {
            var r = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return e.iterable && (r[Symbol.iterator] = function() {
                return r
            }), r
        }

        function f(t) {
            this.map = {}, t instanceof f ? t.forEach(function(t, e) {
                this.append(e, t)
            }, this) : Array.isArray(t) ? t.forEach(function(t) {
                this.append(t[0], t[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }

        function h(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }

        function l(t) {
            return new Promise(function(e, r) {
                t.onload = function() {
                    e(t.result)
                }, t.onerror = function() {
                    r(t.error)
                }
            })
        }

        function p(t) {
            var e = new FileReader,
                r = l(e);
            return e.readAsArrayBuffer(t), r
        }

        function d(t) {
            if (t.slice) return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)), e.buffer
        }

        function y() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                if (this._bodyInit = t, t)
                    if ("string" == typeof t) this._bodyText = t;
                    else if (e.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                else if (e.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                else if (e.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                else if (e.arrayBuffer && e.blob && n(t)) this._bodyArrayBuffer = d(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                else {
                    if (!e.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !o(t)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = d(t)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : e.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, e.blob && (this.blob = function() {
                var t = h(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(p)
            }), this.text = function() {
                var t, e, r, n = h(this);
                if (n) return n;
                if (this._bodyBlob) return t = this._bodyBlob, e = new FileReader, r = l(e), e.readAsText(t), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for (var e = new Uint8Array(t), r = new Array(e.length), n = 0; n < e.length; n++) r[n] = String.fromCharCode(e[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, e.formData && (this.formData = function() {
                return this.text().then(b)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function v(t, e) {
            var r, n, o = (e = e || {}).body;
            if (t instanceof v) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new f(t.headers)), this.method = t.method, this.mode = t.mode, o || null == t._bodyInit || (o = t._bodyInit, t.bodyUsed = !0)
            } else this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new f(e.headers)), this.method = (r = e.method || this.method || "GET", n = r.toUpperCase(), i.indexOf(n) > -1 ? n : r), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
        }

        function b(t) {
            var e = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var r = t.split("="),
                        n = r.shift().replace(/\+/g, " "),
                        o = r.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(n), decodeURIComponent(o))
                }
            }), e
        }

        function m(t, e) {
            e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new f(e.headers), this.url = e.url || "", this._initBody(t)
        }
    }("undefined" != typeof self ? self : void 0);
    var t = setTimeout;

    function e() {}

    function r(t) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], a(t, this)
    }

    function n(t, e) {
        for (; 3 === t._state;) t = t._value;
        0 !== t._state ? (t._handled = !0, r._immediateFn(function() {
            var r = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null !== r) {
                var n;
                try {
                    n = r(t._value)
                } catch (t) {
                    return void i(e.promise, t)
                }
                o(e.promise, n)
            } else(1 === t._state ? o : i)(e.promise, t._value)
        })) : t._deferreds.push(e)
    }

    function o(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var n = e.then;
                if (e instanceof r) return t._state = 3, t._value = e, void s(t);
                if ("function" == typeof n) return void a((o = n, u = e, function() {
                    o.apply(u, arguments)
                }), t)
            }
            t._state = 1, t._value = e, s(t)
        } catch (e) {
            i(t, e)
        }
        var o, u
    }

    function i(t, e) {
        t._state = 2, t._value = e, s(t)
    }

    function s(t) {
        2 === t._state && 0 === t._deferreds.length && r._immediateFn(function() {
            t._handled || r._unhandledRejectionFn(t._value)
        });
        for (var e = 0, o = t._deferreds.length; e < o; e++) n(t, t._deferreds[e]);
        t._deferreds = null
    }

    function a(t, e) {
        var r = !1;
        try {
            t(function(t) {
                r || (r = !0, o(e, t))
            }, function(t) {
                r || (r = !0, i(e, t))
            })
        } catch (t) {
            if (r) return;
            r = !0, i(e, t)
        }
    }
    r.prototype.catch = function(t) {
        return this.then(null, t)
    }, r.prototype.then = function(t, r) {
        var o = new this.constructor(e);
        return n(this, new function(t, e, r) {
            this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = r
        }(t, r, o)), o
    }, r.prototype.finally = function(t) {
        var e = this.constructor;
        return this.then(function(r) {
            return e.resolve(t()).then(function() {
                return r
            })
        }, function(r) {
            return e.resolve(t()).then(function() {
                return e.reject(r)
            })
        })
    }, r.all = function(t) {
        return new r(function(e, r) {
            if (!t || void 0 === t.length) throw new TypeError("Promise.all accepts an array");
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var o = n.length;

            function i(t, s) {
                try {
                    if (s && ("object" == typeof s || "function" == typeof s)) {
                        var a = s.then;
                        if ("function" == typeof a) return void a.call(s, function(e) {
                            i(t, e)
                        }, r)
                    }
                    n[t] = s, 0 == --o && e(n)
                } catch (t) {
                    r(t)
                }
            }
            for (var s = 0; s < n.length; s++) i(s, n[s])
        })
    }, r.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === r ? t : new r(function(e) {
            e(t)
        })
    }, r.reject = function(t) {
        return new r(function(e, r) {
            r(t)
        })
    }, r.race = function(t) {
        return new r(function(e, r) {
            for (var n = 0, o = t.length; n < o; n++) t[n].then(e, r)
        })
    }, r._immediateFn = "function" == typeof setImmediate && function(t) {
        setImmediate(t)
    } || function(e) {
        t(e, 0)
    }, r._unhandledRejectionFn = function(t) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var u = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("unable to locate global object")
    }();

    function c(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    u.Promise || (u.Promise = r);
    var f = c(function(t) {
            var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = e)
        }),
        h = c(function(t) {
            var e = t.exports = {
                version: "2.5.5"
            };
            "number" == typeof __e && (__e = e)
        }),
        l = (h.version, function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }),
        p = function(t) {
            if (!l(t)) throw TypeError(t + " is not an object!");
            return t
        },
        d = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        },
        y = !d(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        v = f.document,
        b = l(v) && l(v.createElement),
        m = function(t) {
            return b ? v.createElement(t) : {}
        },
        _ = !y && !d(function() {
            return 7 != Object.defineProperty(m("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        g = function(t, e) {
            if (!l(t)) return t;
            var r, n;
            if (e && "function" == typeof(r = t.toString) && !l(n = r.call(t))) return n;
            if ("function" == typeof(r = t.valueOf) && !l(n = r.call(t))) return n;
            if (!e && "function" == typeof(r = t.toString) && !l(n = r.call(t))) return n;
            throw TypeError("Can't convert object to primitive value")
        },
        w = Object.defineProperty,
        O = {
            f: y ? Object.defineProperty : function(t, e, r) {
                if (p(t), e = g(e, !0), p(r), _) try {
                    return w(t, e, r)
                } catch (t) {}
                if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
                return "value" in r && (t[e] = r.value), t
            }
        },
        S = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        },
        E = y ? function(t, e, r) {
            return O.f(t, e, S(1, r))
        } : function(t, e, r) {
            return t[e] = r, t
        },
        A = {}.hasOwnProperty,
        j = function(t, e) {
            return A.call(t, e)
        },
        P = 0,
        T = Math.random(),
        k = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++P + T).toString(36))
        },
        x = c(function(t) {
            var e = k("src"),
                r = Function.toString,
                n = ("" + r).split("toString");
            h.inspectSource = function(t) {
                return r.call(t)
            }, (t.exports = function(t, r, o, i) {
                var s = "function" == typeof o;
                s && (j(o, "name") || E(o, "name", r)), t[r] !== o && (s && (j(o, e) || E(o, e, t[r] ? "" + t[r] : n.join(String(r)))), t === f ? t[r] = o : i ? t[r] ? t[r] = o : E(t, r, o) : (delete t[r], E(t, r, o)))
            })(Function.prototype, "toString", function() {
                return "function" == typeof this && this[e] || r.call(this)
            })
        }),
        F = function(t, e, r) {
            if (function(t) {
                    if ("function" != typeof t) throw TypeError(t + " is not a function!")
                }(t), void 0 === e) return t;
            switch (r) {
                case 1:
                    return function(r) {
                        return t.call(e, r)
                    };
                case 2:
                    return function(r, n) {
                        return t.call(e, r, n)
                    };
                case 3:
                    return function(r, n, o) {
                        return t.call(e, r, n, o)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        },
        L = function(t, e, r) {
            var n, o, i, s, a = t & L.F,
                u = t & L.G,
                c = t & L.S,
                l = t & L.P,
                p = t & L.B,
                d = u ? f : c ? f[e] || (f[e] = {}) : (f[e] || {}).prototype,
                y = u ? h : h[e] || (h[e] = {}),
                v = y.prototype || (y.prototype = {});
            for (n in u && (r = e), r) i = ((o = !a && d && void 0 !== d[n]) ? d : r)[n], s = p && o ? F(i, f) : l && "function" == typeof i ? F(Function.call, i) : i, d && x(d, n, i, t & L.U), y[n] != i && E(y, n, s), l && v[n] != i && (v[n] = i)
        };
    f.core = h, L.F = 1, L.G = 2, L.S = 4, L.P = 8, L.B = 16, L.W = 32, L.U = 64, L.R = 128;
    var N = L,
        D = {}.toString,
        I = function(t) {
            return D.call(t).slice(8, -1)
        },
        R = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == I(t) ? t.split("") : Object(t)
        },
        B = function(t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t
        },
        C = function(t) {
            return Object(B(t))
        },
        U = Math.ceil,
        M = Math.floor,
        z = function(t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? M : U)(t)
        },
        G = Math.min,
        W = function(t) {
            return t > 0 ? G(z(t), 9007199254740991) : 0
        },
        H = Array.isArray || function(t) {
            return "Array" == I(t)
        },
        V = f["__core-js_shared__"] || (f["__core-js_shared__"] = {}),
        q = function(t) {
            return V[t] || (V[t] = {})
        },
        K = c(function(t) {
            var e = q("wks"),
                r = f.Symbol,
                n = "function" == typeof r;
            (t.exports = function(t) {
                return e[t] || (e[t] = n && r[t] || (n ? r : k)("Symbol." + t))
            }).store = e
        }),
        $ = K("species"),
        J = function(t, e) {
            return new(function(t) {
                var e;
                return H(t) && ("function" != typeof(e = t.constructor) || e !== Array && !H(e.prototype) || (e = void 0), l(e) && null === (e = e[$]) && (e = void 0)), void 0 === e ? Array : e
            }(t))(e)
        },
        Y = function(t, e) {
            var r = 1 == t,
                n = 2 == t,
                o = 3 == t,
                i = 4 == t,
                s = 6 == t,
                a = 5 == t || s,
                u = e || J;
            return function(e, c, f) {
                for (var h, l, p = C(e), d = R(p), y = F(c, f, 3), v = W(d.length), b = 0, m = r ? u(e, v) : n ? u(e, 0) : void 0; v > b; b++)
                    if ((a || b in d) && (l = y(h = d[b], b, p), t))
                        if (r) m[b] = l;
                        else if (l) switch (t) {
                    case 3:
                        return !0;
                    case 5:
                        return h;
                    case 6:
                        return b;
                    case 2:
                        m.push(h)
                } else if (i) return !1;
                return s ? -1 : o || i ? i : m
            }
        },
        X = K("unscopables"),
        Q = Array.prototype;
    void 0 == Q[X] && E(Q, X, {});
    var Z = function(t) {
            Q[X][t] = !0
        },
        tt = Y(5),
        et = !0;
    "find" in [] && Array(1).find(function() {
        et = !1
    }), N(N.P + N.F * et, "Array", {
        find: function(t) {
            return tt(this, t, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), Z("find");
    h.Array.find;
    var rt = Y(6),
        nt = !0;
    "findIndex" in [] && Array(1).findIndex(function() {
        nt = !1
    }), N(N.P + N.F * nt, "Array", {
        findIndex: function(t) {
            return rt(this, t, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), Z("findIndex");
    h.Array.findIndex;
    var ot, it = function(t) {
            return R(B(t))
        },
        st = Math.max,
        at = Math.min,
        ut = q("keys"),
        ct = function(t) {
            return ut[t] || (ut[t] = k(t))
        },
        ft = (ot = !1, function(t, e, r) {
            var n, o = it(t),
                i = W(o.length),
                s = function(t, e) {
                    return (t = z(t)) < 0 ? st(t + e, 0) : at(t, e)
                }(r, i);
            if (ot && e != e) {
                for (; i > s;)
                    if ((n = o[s++]) != n) return !0
            } else
                for (; i > s; s++)
                    if ((ot || s in o) && o[s] === e) return ot || s || 0;
            return !ot && -1
        }),
        ht = ct("IE_PROTO"),
        lt = function(t, e) {
            var r, n = it(t),
                o = 0,
                i = [];
            for (r in n) r != ht && j(n, r) && i.push(r);
            for (; e.length > o;) j(n, r = e[o++]) && (~ft(i, r) || i.push(r));
            return i
        },
        pt = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
        dt = Object.keys || function(t) {
            return lt(t, pt)
        },
        yt = {
            f: Object.getOwnPropertySymbols
        },
        vt = {
            f: {}.propertyIsEnumerable
        },
        bt = Object.assign,
        mt = !bt || d(function() {
            var t = {},
                e = {},
                r = Symbol(),
                n = "abcdefghijklmnopqrst";
            return t[r] = 7, n.split("").forEach(function(t) {
                e[t] = t
            }), 7 != bt({}, t)[r] || Object.keys(bt({}, e)).join("") != n
        }) ? function(t, e) {
            for (var r = C(t), n = arguments.length, o = 1, i = yt.f, s = vt.f; n > o;)
                for (var a, u = R(arguments[o++]), c = i ? dt(u).concat(i(u)) : dt(u), f = c.length, h = 0; f > h;) s.call(u, a = c[h++]) && (r[a] = u[a]);
            return r
        } : bt;
    N(N.S + N.F, "Object", {
        assign: mt
    });
    h.Object.assign;
    var _t = K("match"),
        gt = function(t, e, r) {
            if (l(n = e) && (void 0 !== (o = n[_t]) ? o : "RegExp" == I(n))) throw TypeError("String#" + r + " doesn't accept regex!");
            var n, o;
            return String(B(t))
        },
        wt = K("match"),
        Ot = "".startsWith;
    N(N.P + N.F * function(t) {
        var e = /./;
        try {
            "/./" [t](e)
        } catch (r) {
            try {
                return e[wt] = !1, !"/./" [t](e)
            } catch (t) {}
        }
        return !0
    }("startsWith"), "String", {
        startsWith: function(t) {
            var e = gt(this, t, "startsWith"),
                r = W(Math.min(arguments.length > 1 ? arguments[1] : void 0, e.length)),
                n = String(t);
            return Ot ? Ot.call(e, n, r) : e.slice(r, r + n.length) === n
        }
    });
    h.String.startsWith;
    N(N.P, "String", {
        repeat: function(t) {
            var e = String(B(this)),
                r = "",
                n = z(t);
            if (n < 0 || n == 1 / 0) throw RangeError("Count can't be negative");
            for (; n > 0;
                (n >>>= 1) && (e += e)) 1 & n && (r += e);
            return r
        }
    });
    h.String.repeat;
    var St = c(function(t) {
            var e = k("meta"),
                r = O.f,
                n = 0,
                o = Object.isExtensible || function() {
                    return !0
                },
                i = !d(function() {
                    return o(Object.preventExtensions({}))
                }),
                s = function(t) {
                    r(t, e, {
                        value: {
                            i: "O" + ++n,
                            w: {}
                        }
                    })
                },
                a = t.exports = {
                    KEY: e,
                    NEED: !1,
                    fastKey: function(t, r) {
                        if (!l(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                        if (!j(t, e)) {
                            if (!o(t)) return "F";
                            if (!r) return "E";
                            s(t)
                        }
                        return t[e].i
                    },
                    getWeak: function(t, r) {
                        if (!j(t, e)) {
                            if (!o(t)) return !0;
                            if (!r) return !1;
                            s(t)
                        }
                        return t[e].w
                    },
                    onFreeze: function(t) {
                        return i && a.NEED && o(t) && !j(t, e) && s(t), t
                    }
                }
        }),
        Et = (St.KEY, St.NEED, St.fastKey, St.getWeak, St.onFreeze, O.f),
        At = K("toStringTag"),
        jt = function(t, e, r) {
            t && !j(t = r ? t : t.prototype, At) && Et(t, At, {
                configurable: !0,
                value: e
            })
        },
        Pt = {
            f: K
        },
        Tt = O.f,
        kt = function(t) {
            var e = h.Symbol || (h.Symbol = f.Symbol || {});
            "_" == t.charAt(0) || t in e || Tt(e, t, {
                value: Pt.f(t)
            })
        },
        xt = y ? Object.defineProperties : function(t, e) {
            p(t);
            for (var r, n = dt(e), o = n.length, i = 0; o > i;) O.f(t, r = n[i++], e[r]);
            return t
        },
        Ft = f.document,
        Lt = Ft && Ft.documentElement,
        Nt = ct("IE_PROTO"),
        Dt = function() {},
        It = function() {
            var t, e = m("iframe"),
                r = pt.length;
            for (e.style.display = "none", Lt.appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), It = t.F; r--;) delete It.prototype[pt[r]];
            return It()
        },
        Rt = Object.create || function(t, e) {
            var r;
            return null !== t ? (Dt.prototype = p(t), r = new Dt, Dt.prototype = null, r[Nt] = t) : r = It(), void 0 === e ? r : xt(r, e)
        },
        Bt = pt.concat("length", "prototype"),
        Ct = {
            f: Object.getOwnPropertyNames || function(t) {
                return lt(t, Bt)
            }
        },
        Ut = Ct.f,
        Mt = {}.toString,
        zt = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        Gt = {
            f: function(t) {
                return zt && "[object Window]" == Mt.call(t) ? function(t) {
                    try {
                        return Ut(t)
                    } catch (t) {
                        return zt.slice()
                    }
                }(t) : Ut(it(t))
            }
        },
        Wt = Object.getOwnPropertyDescriptor,
        Ht = {
            f: y ? Wt : function(t, e) {
                if (t = it(t), e = g(e, !0), _) try {
                    return Wt(t, e)
                } catch (t) {}
                if (j(t, e)) return S(!vt.f.call(t, e), t[e])
            }
        },
        Vt = St.KEY,
        qt = Ht.f,
        Kt = O.f,
        $t = Gt.f,
        Jt = f.Symbol,
        Yt = f.JSON,
        Xt = Yt && Yt.stringify,
        Qt = K("_hidden"),
        Zt = K("toPrimitive"),
        te = {}.propertyIsEnumerable,
        ee = q("symbol-registry"),
        re = q("symbols"),
        ne = q("op-symbols"),
        oe = Object.prototype,
        ie = "function" == typeof Jt,
        se = f.QObject,
        ae = !se || !se.prototype || !se.prototype.findChild,
        ue = y && d(function() {
            return 7 != Rt(Kt({}, "a", {
                get: function() {
                    return Kt(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function(t, e, r) {
            var n = qt(oe, e);
            n && delete oe[e], Kt(t, e, r), n && t !== oe && Kt(oe, e, n)
        } : Kt,
        ce = function(t) {
            var e = re[t] = Rt(Jt.prototype);
            return e._k = t, e
        },
        fe = ie && "symbol" == typeof Jt.iterator ? function(t) {
            return "symbol" == typeof t
        } : function(t) {
            return t instanceof Jt
        },
        he = function(t, e, r) {
            return t === oe && he(ne, e, r), p(t), e = g(e, !0), p(r), j(re, e) ? (r.enumerable ? (j(t, Qt) && t[Qt][e] && (t[Qt][e] = !1), r = Rt(r, {
                enumerable: S(0, !1)
            })) : (j(t, Qt) || Kt(t, Qt, S(1, {})), t[Qt][e] = !0), ue(t, e, r)) : Kt(t, e, r)
        },
        le = function(t, e) {
            p(t);
            for (var r, n = function(t) {
                    var e = dt(t),
                        r = yt.f;
                    if (r)
                        for (var n, o = r(t), i = vt.f, s = 0; o.length > s;) i.call(t, n = o[s++]) && e.push(n);
                    return e
                }(e = it(e)), o = 0, i = n.length; i > o;) he(t, r = n[o++], e[r]);
            return t
        },
        pe = function(t) {
            var e = te.call(this, t = g(t, !0));
            return !(this === oe && j(re, t) && !j(ne, t)) && (!(e || !j(this, t) || !j(re, t) || j(this, Qt) && this[Qt][t]) || e)
        },
        de = function(t, e) {
            if (t = it(t), e = g(e, !0), t !== oe || !j(re, e) || j(ne, e)) {
                var r = qt(t, e);
                return !r || !j(re, e) || j(t, Qt) && t[Qt][e] || (r.enumerable = !0), r
            }
        },
        ye = function(t) {
            for (var e, r = $t(it(t)), n = [], o = 0; r.length > o;) j(re, e = r[o++]) || e == Qt || e == Vt || n.push(e);
            return n
        },
        ve = function(t) {
            for (var e, r = t === oe, n = $t(r ? ne : it(t)), o = [], i = 0; n.length > i;) !j(re, e = n[i++]) || r && !j(oe, e) || o.push(re[e]);
            return o
        };
    ie || (x((Jt = function() {
        if (this instanceof Jt) throw TypeError("Symbol is not a constructor!");
        var t = k(arguments.length > 0 ? arguments[0] : void 0),
            e = function(r) {
                this === oe && e.call(ne, r), j(this, Qt) && j(this[Qt], t) && (this[Qt][t] = !1), ue(this, t, S(1, r))
            };
        return y && ae && ue(oe, t, {
            configurable: !0,
            set: e
        }), ce(t)
    }).prototype, "toString", function() {
        return this._k
    }), Ht.f = de, O.f = he, Ct.f = Gt.f = ye, vt.f = pe, yt.f = ve, y && x(oe, "propertyIsEnumerable", pe, !0), Pt.f = function(t) {
        return ce(K(t))
    }), N(N.G + N.W + N.F * !ie, {
        Symbol: Jt
    });
    for (var be = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), me = 0; be.length > me;) K(be[me++]);
    for (var _e = dt(K.store), ge = 0; _e.length > ge;) kt(_e[ge++]);
    N(N.S + N.F * !ie, "Symbol", {
        for: function(t) {
            return j(ee, t += "") ? ee[t] : ee[t] = Jt(t)
        },
        keyFor: function(t) {
            if (!fe(t)) throw TypeError(t + " is not a symbol!");
            for (var e in ee)
                if (ee[e] === t) return e
        },
        useSetter: function() {
            ae = !0
        },
        useSimple: function() {
            ae = !1
        }
    }), N(N.S + N.F * !ie, "Object", {
        create: function(t, e) {
            return void 0 === e ? Rt(t) : le(Rt(t), e)
        },
        defineProperty: he,
        defineProperties: le,
        getOwnPropertyDescriptor: de,
        getOwnPropertyNames: ye,
        getOwnPropertySymbols: ve
    }), Yt && N(N.S + N.F * (!ie || d(function() {
        var t = Jt();
        return "[null]" != Xt([t]) || "{}" != Xt({
            a: t
        }) || "{}" != Xt(Object(t))
    })), "JSON", {
        stringify: function(t) {
            for (var e, r, n = [t], o = 1; arguments.length > o;) n.push(arguments[o++]);
            if (r = e = n[1], (l(e) || void 0 !== t) && !fe(t)) return H(e) || (e = function(t, e) {
                if ("function" == typeof r && (e = r.call(this, t, e)), !fe(e)) return e
            }), n[1] = e, Xt.apply(Yt, n)
        }
    }), Jt.prototype[Zt] || E(Jt.prototype, Zt, Jt.prototype.valueOf), jt(Jt, "Symbol"), jt(Math, "Math", !0), jt(f.JSON, "JSON", !0);
    var we = K("toStringTag"),
        Oe = "Arguments" == I(function() {
            return arguments
        }()),
        Se = {};
    Se[K("toStringTag")] = "z", Se + "" != "[object z]" && x(Object.prototype, "toString", function() {
        return "[object " + (void 0 === (t = this) ? "Undefined" : null === t ? "Null" : "string" == typeof(r = function(t, e) {
            try {
                return t[e]
            } catch (t) {}
        }(e = Object(t), we)) ? r : Oe ? I(e) : "Object" == (n = I(e)) && "function" == typeof e.callee ? "Arguments" : n) + "]";
        var t, e, r, n
    }, !0), kt("asyncIterator"), kt("observable");
    h.Symbol;
    var Ee = {},
        Ae = {};
    E(Ae, K("iterator"), function() {
        return this
    });
    var je, Pe = function(t, e, r) {
            t.prototype = Rt(Ae, {
                next: S(1, r)
            }), jt(t, e + " Iterator")
        },
        Te = ct("IE_PROTO"),
        ke = Object.prototype,
        xe = Object.getPrototypeOf || function(t) {
            return t = C(t), j(t, Te) ? t[Te] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? ke : null
        },
        Fe = K("iterator"),
        Le = !([].keys && "next" in [].keys()),
        Ne = function() {
            return this
        },
        De = function(t, e, r, n, o, i, s) {
            Pe(r, e, n);
            var a, u, c, f = function(t) {
                    if (!Le && t in d) return d[t];
                    switch (t) {
                        case "keys":
                        case "values":
                            return function() {
                                return new r(this, t)
                            }
                    }
                    return function() {
                        return new r(this, t)
                    }
                },
                h = e + " Iterator",
                l = "values" == o,
                p = !1,
                d = t.prototype,
                y = d[Fe] || d["@@iterator"] || o && d[o],
                v = y || f(o),
                b = o ? l ? f("entries") : v : void 0,
                m = "Array" == e && d.entries || y;
            if (m && (c = xe(m.call(new t))) !== Object.prototype && c.next && (jt(c, h, !0), "function" != typeof c[Fe] && E(c, Fe, Ne)), l && y && "values" !== y.name && (p = !0, v = function() {
                    return y.call(this)
                }), (Le || p || !d[Fe]) && E(d, Fe, v), Ee[e] = v, Ee[h] = Ne, o)
                if (a = {
                        values: l ? v : f("values"),
                        keys: i ? v : f("keys"),
                        entries: b
                    }, s)
                    for (u in a) u in d || x(d, u, a[u]);
                else N(N.P + N.F * (Le || p), e, a);
            return a
        },
        Ie = (je = !0, function(t, e) {
            var r, n, o = String(B(t)),
                i = z(e),
                s = o.length;
            return i < 0 || i >= s ? je ? "" : void 0 : (r = o.charCodeAt(i)) < 55296 || r > 56319 || i + 1 === s || (n = o.charCodeAt(i + 1)) < 56320 || n > 57343 ? je ? o.charAt(i) : r : je ? o.slice(i, i + 2) : n - 56320 + (r - 55296 << 10) + 65536
        });
    De(String, "String", function(t) {
        this._t = String(t), this._i = 0
    }, function() {
        var t, e = this._t,
            r = this._i;
        return r >= e.length ? {
            value: void 0,
            done: !0
        } : (t = Ie(e, r), this._i += t.length, {
            value: t,
            done: !1
        })
    });
    var Re = function(t, e) {
            return {
                value: e,
                done: !!t
            }
        },
        Be = De(Array, "Array", function(t, e) {
            this._t = it(t), this._i = 0, this._k = e
        }, function() {
            var t = this._t,
                e = this._k,
                r = this._i++;
            return !t || r >= t.length ? (this._t = void 0, Re(1)) : Re(0, "keys" == e ? r : "values" == e ? t[r] : [r, t[r]])
        }, "values");
    Ee.Arguments = Ee.Array, Z("keys"), Z("values"), Z("entries");
    for (var Ce = K("iterator"), Ue = K("toStringTag"), Me = Ee.Array, ze = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
        }, Ge = dt(ze), We = 0; We < Ge.length; We++) {
        var He, Ve = Ge[We],
            qe = ze[Ve],
            Ke = f[Ve],
            $e = Ke && Ke.prototype;
        if ($e && ($e[Ce] || E($e, Ce, Me), $e[Ue] || E($e, Ue, Ve), Ee[Ve] = Me, qe))
            for (He in Be) $e[He] || x($e, He, Be[He], !0)
    }
    Pt.f("iterator");
    var Je = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(t, e) {
        t.__proto__ = e
    } || function(t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
    };

    function Ye(t, e) {
        if (!(e instanceof Object)) return e;
        switch (e.constructor) {
            case Date:
                return new Date(e.getTime());
            case Object:
                void 0 === t && (t = {});
                break;
            case Array:
                t = [];
                break;
            default:
                return e
        }
        for (var r in e) e.hasOwnProperty(r) && (t[r] = Ye(t[r], e[r]));
        return t
    }

    function Xe(t, e, r) {
        t[e] = r
    }
    var Qe = "FirebaseError",
        Ze = Error.captureStackTrace,
        tr = function() {
            return function(t, e) {
                if (this.code = t, this.message = e, Ze) Ze(this, er.prototype.create);
                else try {
                    throw Error.apply(this, arguments)
                } catch (t) {
                    this.name = Qe, Object.defineProperty(this, "stack", {
                        get: function() {
                            return t.stack
                        }
                    })
                }
            }
        }();
    tr.prototype = Object.create(Error.prototype), tr.prototype.constructor = tr, tr.prototype.name = Qe;
    var er = function() {
        function t(t, e, r) {
            this.service = t, this.serviceName = e, this.errors = r, this.pattern = /\{\$([^}]+)}/g
        }
        return t.prototype.create = function(t, e) {
            void 0 === e && (e = {});
            var r, n = this.errors[t],
                o = this.service + "/" + t;
            r = void 0 === n ? "Error" : n.replace(this.pattern, function(t, r) {
                var n = e[r];
                return void 0 !== n ? n.toString() : "<" + r + "?>"
            }), r = this.serviceName + ": " + r + " (" + o + ").";
            var i = new tr(o, r);
            for (var s in e) e.hasOwnProperty(s) && "_" !== s.slice(-1) && (i[s] = e[s]);
            return i
        }, t
    }();
    ! function(t) {
        function e() {
            var e = t.call(this) || this;
            e.chain_ = [], e.buf_ = [], e.W_ = [], e.pad_ = [], e.inbuf_ = 0, e.total_ = 0, e.blockSize = 64, e.pad_[0] = 128;
            for (var r = 1; r < e.blockSize; ++r) e.pad_[r] = 0;
            return e.reset(), e
        }(function(t, e) {
            function r() {
                this.constructor = t
            }
            Je(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        })(e, t), e.prototype.reset = function() {
            this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0
        }, e.prototype.compress_ = function(t, e) {
            e || (e = 0);
            var r = this.W_;
            if ("string" == typeof t)
                for (var n = 0; n < 16; n++) r[n] = t.charCodeAt(e) << 24 | t.charCodeAt(e + 1) << 16 | t.charCodeAt(e + 2) << 8 | t.charCodeAt(e + 3), e += 4;
            else
                for (n = 0; n < 16; n++) r[n] = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3], e += 4;
            for (n = 16; n < 80; n++) {
                var o = r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16];
                r[n] = 4294967295 & (o << 1 | o >>> 31)
            }
            var i, s, a = this.chain_[0],
                u = this.chain_[1],
                c = this.chain_[2],
                f = this.chain_[3],
                h = this.chain_[4];
            for (n = 0; n < 80; n++) {
                n < 40 ? n < 20 ? (i = f ^ u & (c ^ f), s = 1518500249) : (i = u ^ c ^ f, s = 1859775393) : n < 60 ? (i = u & c | f & (u | c), s = 2400959708) : (i = u ^ c ^ f, s = 3395469782);
                o = (a << 5 | a >>> 27) + i + h + s + r[n] & 4294967295;
                h = f, f = c, c = 4294967295 & (u << 30 | u >>> 2), u = a, a = o
            }
            this.chain_[0] = this.chain_[0] + a & 4294967295, this.chain_[1] = this.chain_[1] + u & 4294967295, this.chain_[2] = this.chain_[2] + c & 4294967295, this.chain_[3] = this.chain_[3] + f & 4294967295, this.chain_[4] = this.chain_[4] + h & 4294967295
        }, e.prototype.update = function(t, e) {
            if (null != t) {
                void 0 === e && (e = t.length);
                for (var r = e - this.blockSize, n = 0, o = this.buf_, i = this.inbuf_; n < e;) {
                    if (0 == i)
                        for (; n <= r;) this.compress_(t, n), n += this.blockSize;
                    if ("string" == typeof t) {
                        for (; n < e;)
                            if (o[i] = t.charCodeAt(n), ++n, ++i == this.blockSize) {
                                this.compress_(o), i = 0;
                                break
                            }
                    } else
                        for (; n < e;)
                            if (o[i] = t[n], ++n, ++i == this.blockSize) {
                                this.compress_(o), i = 0;
                                break
                            }
                }
                this.inbuf_ = i, this.total_ += e
            }
        }, e.prototype.digest = function() {
            var t = [],
                e = 8 * this.total_;
            this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
            for (var r = this.blockSize - 1; r >= 56; r--) this.buf_[r] = 255 & e, e /= 256;
            this.compress_(this.buf_);
            var n = 0;
            for (r = 0; r < 5; r++)
                for (var o = 24; o >= 0; o -= 8) t[n] = this.chain_[r] >> o & 255, ++n;
            return t
        }
    }(function() {
        return function() {
            this.blockSize = -1
        }
    }());

    function rr(t, e) {
        var r = new nr(t, e);
        return r.subscribe.bind(r)
    }
    var nr = function() {
        function t(t, e) {
            var r = this;
            this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = e, this.task.then(function() {
                t(r)
            }).catch(function(t) {
                r.error(t)
            })
        }
        return t.prototype.next = function(t) {
            this.forEachObserver(function(e) {
                e.next(t)
            })
        }, t.prototype.error = function(t) {
            this.forEachObserver(function(e) {
                e.error(t)
            }), this.close(t)
        }, t.prototype.complete = function() {
            this.forEachObserver(function(t) {
                t.complete()
            }), this.close()
        }, t.prototype.subscribe = function(t, e, r) {
            var n, o = this;
            if (void 0 === t && void 0 === e && void 0 === r) throw new Error("Missing Observer.");
            void 0 === (n = function(t, e) {
                if ("object" != typeof t || null === t) return !1;
                for (var r = 0, n = e; r < n.length; r++) {
                    var o = n[r];
                    if (o in t && "function" == typeof t[o]) return !0
                }
                return !1
            }(t, ["next", "error", "complete"]) ? t : {
                next: t,
                error: e,
                complete: r
            }).next && (n.next = or), void 0 === n.error && (n.error = or), void 0 === n.complete && (n.complete = or);
            var i = this.unsubscribeOne.bind(this, this.observers.length);
            return this.finalized && this.task.then(function() {
                try {
                    o.finalError ? n.error(o.finalError) : n.complete()
                } catch (t) {}
            }), this.observers.push(n), i
        }, t.prototype.unsubscribeOne = function(t) {
            void 0 !== this.observers && void 0 !== this.observers[t] && (delete this.observers[t], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
        }, t.prototype.forEachObserver = function(t) {
            if (!this.finalized)
                for (var e = 0; e < this.observers.length; e++) this.sendOne(e, t)
        }, t.prototype.sendOne = function(t, e) {
            var r = this;
            this.task.then(function() {
                if (void 0 !== r.observers && void 0 !== r.observers[t]) try {
                    e(r.observers[t])
                } catch (t) {
                    "undefined" != typeof console && console.error && console.error(t)
                }
            })
        }, t.prototype.close = function(t) {
            var e = this;
            this.finalized || (this.finalized = !0, void 0 !== t && (this.finalError = t), this.task.then(function() {
                e.observers = void 0, e.onNoObservers = void 0
            }))
        }, t
    }();

    function or() {}
    var ir = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        },
        sr = "[DEFAULT]",
        ar = [],
        ur = function() {
            function t(t, e, r) {
                this.firebase_ = r, this.isDeleted_ = !1, this.services_ = {}, this.name_ = e.name, this._automaticDataCollectionEnabled = e.automaticDataCollectionEnabled || !1, this.options_ = Ye(void 0, t), this.INTERNAL = {
                    getUid: function() {
                        return null
                    },
                    getToken: function() {
                        return Promise.resolve(null)
                    },
                    addAuthTokenListener: function(t) {
                        ar.push(t), setTimeout(function() {
                            return t(null)
                        }, 0)
                    },
                    removeAuthTokenListener: function(t) {
                        ar = ar.filter(function(e) {
                            return e !== t
                        })
                    }
                }
            }
            return Object.defineProperty(t.prototype, "automaticDataCollectionEnabled", {
                get: function() {
                    return this.checkDestroyed_(), this._automaticDataCollectionEnabled
                },
                set: function(t) {
                    this.checkDestroyed_(), this._automaticDataCollectionEnabled = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "name", {
                get: function() {
                    return this.checkDestroyed_(), this.name_
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "options", {
                get: function() {
                    return this.checkDestroyed_(), this.options_
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.delete = function() {
                var t = this;
                return new Promise(function(e) {
                    t.checkDestroyed_(), e()
                }).then(function() {
                    t.firebase_.INTERNAL.removeApp(t.name_);
                    var e = [];
                    return Object.keys(t.services_).forEach(function(r) {
                        Object.keys(t.services_[r]).forEach(function(n) {
                            e.push(t.services_[r][n])
                        })
                    }), Promise.all(e.map(function(t) {
                        return t.INTERNAL.delete()
                    }))
                }).then(function() {
                    t.isDeleted_ = !0, t.services_ = {}
                })
            }, t.prototype._getService = function(t, e) {
                if (void 0 === e && (e = sr), this.checkDestroyed_(), this.services_[t] || (this.services_[t] = {}), !this.services_[t][e]) {
                    var r = e !== sr ? e : void 0,
                        n = this.firebase_.INTERNAL.factories[t](this, this.extendApp.bind(this), r);
                    this.services_[t][e] = n
                }
                return this.services_[t][e]
            }, t.prototype.extendApp = function(t) {
                var e = this;
                Ye(this, t), t.INTERNAL && t.INTERNAL.addAuthTokenListener && (ar.forEach(function(t) {
                    e.INTERNAL.addAuthTokenListener(t)
                }), ar = [])
            }, t.prototype.checkDestroyed_ = function() {
                this.isDeleted_ && cr("app-deleted", {
                    name: this.name_
                })
            }, t
        }();

    function cr(t, e) {
        throw fr.create(t, e)
    }
    ur.prototype.name && ur.prototype.options || ur.prototype.delete || console.log("dc");
    var fr = new er("app", "Firebase", {
        "no-app": "No Firebase App '{$name}' has been created - call Firebase App.initializeApp()",
        "bad-app-name": "Illegal App name: '{$name}",
        "duplicate-app": "Firebase App named '{$name}' already exists",
        "app-deleted": "Firebase App named '{$name}' already deleted",
        "duplicate-service": "Firebase service named '{$name}' already registered",
        "sa-not-supported": "Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain",
        "invalid-app-argument": "firebase.{$name}() takes either no argument or a Firebase App instance."
    });
    return function t() {
        var e = {},
            r = {},
            n = {},
            o = {
                __esModule: !0,
                initializeApp: function(t, r) {
                    if (void 0 === r && (r = {}), "object" != typeof r || null === r) {
                        var n = r;
                        r = {
                            name: n
                        }
                    }
                    var i = r;
                    void 0 === i.name && (i.name = sr);
                    var s = i.name;
                    "string" == typeof s && s || cr("bad-app-name", {
                        name: s + ""
                    }), ir(e, s) && cr("duplicate-app", {
                        name: s
                    });
                    var u = new ur(t, i, o);
                    return e[s] = u, a(u, "create"), u
                },
                app: i,
                apps: null,
                Promise: Promise,
                SDK_VERSION: "5.1.0",
                INTERNAL: {
                    registerService: function(t, e, a, u, c) {
                        r[t] && cr("duplicate-service", {
                            name: t
                        }), r[t] = e, u && (n[t] = u, s().forEach(function(t) {
                            u("create", t)
                        }));
                        var f = function(e) {
                            return void 0 === e && (e = i()), "function" != typeof e[t] && cr("invalid-app-argument", {
                                name: t
                            }), e[t]()
                        };
                        return void 0 !== a && Ye(f, a), o[t] = f, ur.prototype[t] = function() {
                            for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                            return this._getService.bind(this, t).apply(this, c ? e : [])
                        }, f
                    },
                    createFirebaseNamespace: t,
                    extendNamespace: function(t) {
                        Ye(o, t)
                    },
                    createSubscribe: rr,
                    ErrorFactory: er,
                    removeApp: function(t) {
                        a(e[t], "delete"), delete e[t]
                    },
                    factories: r,
                    useAsService: u,
                    Promise: Promise,
                    deepExtend: Ye
                }
            };

        function i(t) {
            return ir(e, t = t || sr) || cr("no-app", {
                name: t
            }), e[t]
        }

        function s() {
            return Object.keys(e).map(function(t) {
                return e[t]
            })
        }

        function a(t, e) {
            Object.keys(r).forEach(function(r) {
                var o = u(t, r);
                null !== o && n[o] && n[o](e, t)
            })
        }

        function u(t, e) {
            if ("serverAuth" === e) return null;
            var r = e;
            return t.options, r
        }
        return Xe(o, "default", o), Object.defineProperty(o, "apps", {
            get: s
        }), Xe(i, "App", ur), o
    }()
});
//# sourceMappingURL=firebase-app.js.map

// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/content/firebase-auth.js

! function(Bk, n) {
    try {
        n = n && n.hasOwnProperty("default") ? n["default"] : n,
            function() {
                function x(a) {
                    return "string" == typeof a
                }

                function Mi(a) {
                    return "boolean" == typeof a
                }

                function ba() {}

                function Xa(a) {
                    var b = typeof a;
                    if ("object" == b) {
                        if (!a) return "null";
                        if (a instanceof Array) return "array";
                        if (a instanceof Object) return b;
                        var c = Object.prototype.toString.call(a);
                        if ("[object Window]" == c) return "object";
                        if ("[object Array]" == c || "number" == typeof a.length && void 0 !== a.splice && void 0 !== a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                        if ("[object Function]" == c || void 0 !== a.call && void 0 !== a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                    } else if ("function" == b && void 0 === a.call) return "object";
                    return b
                }

                function Ni(a) {
                    return null === a
                }

                function Da(a) {
                    return "array" == Xa(a)
                }

                function yb(a) {
                    var b = Xa(a);
                    return "array" == b || "object" == b && "number" == typeof a.length
                }

                function I(a) {
                    return "function" == Xa(a)
                }

                function R(a) {
                    var b = typeof a;
                    return "object" == b && null != a || "function" == b
                }

                function Oi(a, b, c) {
                    return a.call.apply(a.bind, arguments)
                }

                function Pi(a, b, c) {
                    if (!a) throw Error();
                    if (2 < arguments.length) {
                        var d = Array.prototype.slice.call(arguments, 2);
                        return function() {
                            var c = Array.prototype.slice.call(arguments);
                            return Array.prototype.unshift.apply(c, d), a.apply(b, c)
                        }
                    }
                    return function() {
                        return a.apply(b, arguments)
                    }
                }

                function r(a, b, c) {
                    return (r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Oi : Pi).apply(null, arguments)
                }

                function jc(a, b) {
                    var c = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        var b =
                            c.slice();
                        return b.push.apply(b, arguments), a.apply(this, b)
                    }
                }

                function t(a, b) {
                    function c() {}
                    c.prototype = b.prototype;
                    a.lb = b.prototype;
                    a.prototype = new c;
                    a.prototype.constructor = a;
                    a.cd = function(a, c, g) {
                        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
                        return b.prototype[c].apply(a, d)
                    }
                }

                function kf(a) {
                    a.prototype.then = a.prototype.then;
                    a.prototype.$goog_Thenable = !0
                }

                function lf(a) {
                    if (!a) return !1;
                    try {
                        return !!a.$goog_Thenable
                    } catch (b) {
                        return !1
                    }
                }

                function O(a) {
                    if (Error.captureStackTrace) Error.captureStackTrace(this,
                        O);
                    else {
                        var b = Error().stack;
                        b && (this.stack = b)
                    }
                    a && (this.message = String(a))
                }

                function $c(a, b) {
                    for (var c = "", d = (a = a.split("%s")).length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
                    O.call(this, c + a[d])
                }

                function zb(a, b) {
                    throw new $c("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
                }

                function ad(a, b) {
                    this.c = a;
                    this.f = b;
                    this.b = 0;
                    this.a = null
                }

                function mf(a, b) {
                    a.f(b);
                    100 > a.b && (a.b++, b.next = a.a, a.a = b)
                }

                function nf() {
                    this.b = this.a = null
                }

                function Qi() {
                    var a = of ,
                        b = null;
                    return a.a && (b = a.a, a.a = a.a.next,
                        a.a || (a.b = null), b.next = null), b
                }

                function bd() {
                    this.next = this.b = this.a = null
                }

                function Ea(a, b) {
                    return 0 <= pf(a, b)
                }

                function kc(a, b) {
                    var c;
                    return (c = 0 <= (b = pf(a, b))) && Array.prototype.splice.call(a, b, 1), c
                }

                function X(a, b) {
                    ! function(a, b) {
                        var c = a.length,
                            d = x(a) ? a.split("") : a;
                        for (--c; 0 <= c; --c) c in d && b.call(void 0, d[c], c, a)
                    }(a, function(c, d) {
                        b.call(void 0, c, d, a) && 1 == Array.prototype.splice.call(a, d, 1).length && 0
                    })
                }

                function cd(a) {
                    return Array.prototype.concat.apply([], arguments)
                }

                function Fa(a) {
                    var b = a.length;
                    if (0 < b) {
                        for (var c =
                                Array(b), d = 0; d < b; d++) c[d] = a[d];
                        return c
                    }
                    return []
                }

                function qf(a, b) {
                    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
                    return d + c.join("%s")
                }

                function dd(a) {
                    return Ri.test(a) ? (-1 != a.indexOf("&") && (a = a.replace(Si, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(Ti, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(Ui, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(Vi, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(Wi, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(Xi,
                        "&#0;")), a) : a
                }

                function y(a, b) {
                    return -1 != a.indexOf(b)
                }

                function ed(a, b) {
                    return a < b ? -1 : a > b ? 1 : 0
                }

                function D(a) {
                    return y(Ab, a)
                }

                function rf(a, b) {
                    for (var c in a) b.call(void 0, a[c], c, a)
                }

                function Bb(a) {
                    for (var b in a) return !1;
                    return !0
                }

                function Cb(a) {
                    var b, c = {};
                    for (b in a) c[b] = a[b];
                    return c
                }

                function ka(a, b) {
                    for (var c, d, e = 1; e < arguments.length; e++) {
                        for (c in d = arguments[e]) a[c] = d[c];
                        for (var g = 0; g < sf.length; g++) c = sf[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
                    }
                }

                function tf(a) {
                    l.setTimeout(function() {
                        throw a;
                    }, 0)
                }

                function lc(a, b) {
                    mc || function() {
                        if (l.Promise && l.Promise.resolve) {
                            var a = l.Promise.resolve(void 0);
                            mc = function() {
                                a.then(uf)
                            }
                        } else mc = function() {
                            var a = uf;
                            !I(l.setImmediate) || l.Window && l.Window.prototype && !D("Edge") && l.Window.prototype.setImmediate == l.setImmediate ? (fd || (fd = function() {
                                var a = l.MessageChannel;
                                if (void 0 === a && "undefined" != typeof window && window.postMessage && window.addEventListener && !D("Presto") && (a = function() {
                                        var a = document.createElement("IFRAME");
                                        a.style.display = "none";
                                        a.src = "";
                                        document.documentElement.appendChild(a);
                                        var b = a.contentWindow;
                                        (a = b.document).open();
                                        a.write("");
                                        a.close();
                                        var c = "callImmediate" + Math.random(),
                                            d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host;
                                        a = r(function(a) {
                                            "*" != d && a.origin != d || a.data != c || this.port1.onmessage()
                                        }, this);
                                        b.addEventListener("message", a, !1);
                                        this.port1 = {};
                                        this.port2 = {
                                            postMessage: function() {
                                                b.postMessage(c, d)
                                            }
                                        }
                                    }), void 0 !== a && !D("Trident") && !D("MSIE")) {
                                    var b = new a,
                                        c = {},
                                        d = c;
                                    return b.port1.onmessage = function() {
                                            if (void 0 !== c.next) {
                                                var a = (c = c.next).tb;
                                                c.tb =
                                                    null;
                                                a()
                                            }
                                        },
                                        function(a) {
                                            d.next = {
                                                tb: a
                                            };
                                            d = d.next;
                                            b.port2.postMessage(0)
                                        }
                                }
                                return "undefined" != typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
                                    var b = document.createElement("SCRIPT");
                                    b.onreadystatechange = function() {
                                        b.onreadystatechange = null;
                                        b.parentNode.removeChild(b);
                                        b = null;
                                        a();
                                        a = null
                                    };
                                    document.documentElement.appendChild(b)
                                } : function(a) {
                                    l.setTimeout(a, 0)
                                }
                            }()), fd(a)) : l.setImmediate(a)
                        }
                    }();
                    gd || (mc(), gd = !0); of .add(a, b)
                }

                function uf() {
                    for (var a; a = Qi();) {
                        try {
                            a.a.call(a.b)
                        } catch (b) {
                            tf(b)
                        }
                        mf(wf,
                            a)
                    }
                    gd = !1
                }

                function u(a, b) {
                    if (this.a = Ga, this.i = void 0, this.f = this.b = this.c = null, this.g = this.h = !1, a != ba) try {
                        var c = this;
                        a.call(b, function(a) {
                            Ha(c, Eb, a)
                        }, function(a) {
                            if (!(a instanceof Ya)) try {
                                if (a instanceof Error) throw a;
                                throw Error("Promise rejected.");
                            } catch (e) {}
                            Ha(c, ma, a)
                        })
                    } catch (d) {
                        Ha(this, ma, d)
                    }
                }

                function xf() {
                    this.next = this.f = this.b = this.g = this.a = null;
                    this.c = !1
                }

                function hd(a, b, c) {
                    var d = yf.get();
                    return d.g = a, d.b = b, d.f = c, d
                }

                function q(a) {
                    if (a instanceof u) return a;
                    var b = new u(ba);
                    return Ha(b, Eb, a),
                        b
                }

                function B(a) {
                    return new u(function(b, c) {
                        c(a)
                    })
                }

                function zf(a, b, c) {
                    Af(a, b, c, null) || lc(jc(b, a))
                }

                function id(a, b) {
                    a.b || a.a != Eb && a.a != ma || Bf(a);
                    a.f ? a.f.next = b : a.b = b;
                    a.f = b
                }

                function Cf(a, b, c, d) {
                    var e = hd(null, null, null);
                    return e.a = new u(function(a, h) {
                        e.g = b ? function(c) {
                            try {
                                var e = b.call(d, c);
                                a(e)
                            } catch (la) {
                                h(la)
                            }
                        } : a;
                        e.b = c ? function(b) {
                            try {
                                var e = c.call(d, b);
                                void 0 === e && b instanceof Ya ? h(b) : a(e)
                            } catch (la) {
                                h(la)
                            }
                        } : h
                    }), e.a.c = a, id(a, e), e.a
                }

                function Ha(a, b, c) {
                    a.a == Ga && (a === c && (b = ma, c = new TypeError("Promise cannot resolve to itself")),
                        a.a = 1, Af(c, a.Lc, a.Mc, a) || (a.i = c, a.a = b, a.c = null, Bf(a), b != ma || c instanceof Ya || function(a, b) {
                            a.g = !0;
                            lc(function() {
                                a.g && Df.call(null, b)
                            })
                        }(a, c)))
                }

                function Af(a, b, c, d) {
                    if (a instanceof u) return id(a, hd(b || ba, c || null, d)), !0;
                    if (lf(a)) return a.then(b, c, d), !0;
                    if (R(a)) try {
                        var e = a.then;
                        if (I(e)) return function(a, b, c, d, e) {
                            function g(a) {
                                h || (h = !0, d.call(e, a))
                            }
                            var h = !1;
                            try {
                                b.call(a, function(a) {
                                    h || (h = !0, c.call(e, a))
                                }, g)
                            } catch (vf) {
                                g(vf)
                            }
                        }(a, e, b, c, d), !0
                    } catch (g) {
                        return c.call(d, g), !0
                    }
                    return !1
                }

                function Bf(a) {
                    a.h || (a.h = !0, lc(a.Ub, a))
                }

                function Ef(a) {
                    var b = null;
                    return a.b && (b = a.b, a.b = b.next, b.next = null), a.b || (a.f = null), b
                }

                function Ff(a, b, c, d) {
                    if (c == ma && b.b && !b.c)
                        for (; a && a.g; a = a.c) a.g = !1;
                    if (b.a) b.a.c = null, Gf(b, c, d);
                    else try {
                        b.c ? b.g.call(b.f) : Gf(b, c, d)
                    } catch (e) {
                        Df.call(null, e)
                    }
                    mf(yf, b)
                }

                function Gf(a, b, c) {
                    b == Eb ? a.g.call(a.f, c) : a.b && a.b.call(a.f, c)
                }

                function Ya(a) {
                    O.call(this, a)
                }

                function nc() {
                    0 != jd && (Hf[this[oc] || (this[oc] = ++If)] = this);
                    this.pa = this.pa;
                    this.ja = this.ja
                }

                function Jf(a) {
                    if (!a.pa && (a.pa = !0, a.ua(), 0 != jd)) {
                        var b =
                            a[oc] || (a[oc] = ++If);
                        if (0 != jd && a.ja && 0 < a.ja.length) throw Error(a + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
                        delete Hf[b]
                    }
                }

                function kd(a) {
                    return kd[" "](a), a
                }

                function Kf() {
                    var a = l.document;
                    return a ? a.documentMode : void 0
                }

                function Lf(a) {
                    return function(a, c) {
                        var b = Yi;
                        return Object.prototype.hasOwnProperty.call(b, a) ? b[a] : b[a] = c(a)
                    }(a, function() {
                        for (var b = 0, c = Mf(String(ld)).split("."), d = Mf(String(a)).split("."),
                                e = Math.max(c.length, d.length), g = 0; 0 == b && g < e; g++) {
                            var h = c[g] || "",
                                v = d[g] || "";
                            do {
                                if (h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""], v = /(\d*)(\D*)(.*)/.exec(v) || ["", "", "", ""], 0 == h[0].length && 0 == v[0].length) break;
                                b = ed(0 == h[1].length ? 0 : parseInt(h[1], 10), 0 == v[1].length ? 0 : parseInt(v[1], 10)) || ed(0 == h[2].length, 0 == v[2].length) || ed(h[2], v[2]);
                                h = h[3];
                                v = v[3]
                            } while (0 == b)
                        }
                        return 0 <= b
                    })
                }

                function S(a, b) {
                    this.type = a;
                    this.b = this.target = b;
                    this.Gb = !0
                }

                function Ia(a, b) {
                    if (S.call(this, a ? a.type : ""), this.relatedTarget = this.b = this.target =
                        null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.pointerId = 0, this.pointerType = "", this.a = null, a) {
                        var c = this.type = a.type,
                            d = a.changedTouches ? a.changedTouches[0] : null;
                        if (this.target = a.target || a.srcElement, this.b = b, b = a.relatedTarget) {
                            if (Nf) {
                                a: {
                                    try {
                                        kd(b.nodeName);
                                        c = !0;
                                        break a
                                    } catch (e) {}
                                    c = !1
                                }
                                c || (b = null)
                            }
                        } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
                        this.relatedTarget = b;
                        null === d ? (this.clientX =
                            void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
                        this.button = a.button;
                        this.key = a.key || "";
                        this.ctrlKey = a.ctrlKey;
                        this.altKey = a.altKey;
                        this.shiftKey = a.shiftKey;
                        this.metaKey = a.metaKey;
                        this.pointerId = a.pointerId || 0;
                        this.pointerType = x(a.pointerType) ? a.pointerType :
                            Zi[a.pointerType] || "";
                        this.a = a;
                        a.defaultPrevented && this.preventDefault()
                    }
                }

                function pc(a) {
                    a.na = !0;
                    a.listener = null;
                    a.proxy = null;
                    a.src = null;
                    a.La = null
                }

                function qc(a) {
                    this.src = a;
                    this.a = {};
                    this.b = 0
                }

                function md(a, b) {
                    var c = b.type;
                    c in a.a && kc(a.a[c], b) && (pc(b), 0 == a.a[c].length && (delete a.a[c], a.b--))
                }

                function nd(a, b, c, d) {
                    for (var e = 0; e < a.length; ++e) {
                        var g = a[e];
                        if (!g.na && g.listener == b && g.capture == !!c && g.La == d) return e
                    }
                    return -1
                }

                function ca(a, b, c, d, e) {
                    if (d && d.once) od(a, b, c, d, e);
                    else if (Da(b))
                        for (var g = 0; g < b.length; g++) ca(a,
                            b[g], c, d, e);
                    else c = pd(c), a && a[Fb] ? Of(a, b, c, R(d) ? !!d.capture : !!d, e) : Pf(a, b, c, !1, d, e)
                }

                function Pf(a, b, c, d, e, g) {
                    if (!b) throw Error("Invalid event type");
                    var h = R(e) ? !!e.capture : !!e,
                        v = rc(a);
                    if (v || (a[qd] = v = new qc(a)), !(c = v.add(b, c, d, h, g)).proxy)
                        if (d = function() {
                                var a = $i,
                                    b = Qf ? function(c) {
                                        return a.call(b.src, b.listener, c)
                                    } : function(c) {
                                        if (!(c = a.call(b.src, b.listener, c))) return c
                                    };
                                return b
                            }(), c.proxy = d, d.src = a, d.listener = c, a.addEventListener) aj || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
                        else if (a.attachEvent) a.attachEvent(Rf(b.toString()),
                        d);
                    else {
                        if (!a.addListener || !a.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
                        a.addListener(d)
                    }
                }

                function od(a, b, c, d, e) {
                    if (Da(b))
                        for (var g = 0; g < b.length; g++) od(a, b[g], c, d, e);
                    else c = pd(c), a && a[Fb] ? rd(a, b, c, R(d) ? !!d.capture : !!d, e) : Pf(a, b, c, !0, d, e)
                }

                function T(a, b, c, d, e) {
                    if (Da(b))
                        for (var g = 0; g < b.length; g++) T(a, b[g], c, d, e);
                    else d = R(d) ? !!d.capture : !!d, c = pd(c), a && a[Fb] ? (a = a.m, (b = String(b).toString()) in a.a && -1 < (c = nd(g = a.a[b], c, d, e)) && (pc(g[c]), Array.prototype.splice.call(g,
                        c, 1), 0 == g.length && (delete a.a[b], a.b--))) : a && (a = rc(a)) && (b = a.a[b.toString()], a = -1, b && (a = nd(b, c, d, e)), (c = -1 < a ? b[a] : null) && Sf(c))
                }

                function Sf(a) {
                    if ("number" != typeof a && a && !a.na) {
                        var b = a.src;
                        if (b && b[Fb]) md(b.m, a);
                        else {
                            var c = a.type,
                                d = a.proxy;
                            b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Rf(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                            (c = rc(b)) ? (md(c, a), 0 == c.b && (c.src = null, b[qd] = null)) : pc(a)
                        }
                    }
                }

                function Rf(a) {
                    return a in sd ? sd[a] : sd[a] = "on" + a
                }

                function Tf(a,
                    b, c, d) {
                    var e = !0;
                    if ((a = rc(a)) && (b = a.a[b.toString()]))
                        for (b = b.concat(), a = 0; a < b.length; a++) {
                            var g = b[a];
                            g && g.capture == c && !g.na && (g = Uf(g, d), e = e && !1 !== g)
                        }
                    return e
                }

                function Uf(a, b) {
                    var c = a.listener,
                        d = a.La || a.src;
                    return a.Ia && Sf(a), c.call(d, b)
                }

                function $i(a, b) {
                    if (a.na) return !0;
                    if (!Qf) {
                        if (!b) a: {
                            b = ["window", "event"];
                            for (var c = l, d = 0; d < b.length; d++)
                                if (null == (c = c[b[d]])) {
                                    b = null;
                                    break a
                                } b = c
                        }
                        if (b = new Ia(d = b, this), c = !0, !(0 > d.keyCode || void 0 != d.returnValue)) {
                            a: {
                                var e = !1;
                                if (0 == d.keyCode) try {
                                    d.keyCode = -1;
                                    break a
                                } catch (h) {
                                    e = !0
                                }(e || void 0 == d.returnValue) && (d.returnValue = !0)
                            }
                            d = [];
                            for (e = b.b; e; e = e.parentNode) d.push(e);a = a.type;
                            for (e = d.length - 1; 0 <= e; e--) {
                                b.b = d[e];
                                var g = Tf(d[e], a, !0, b);
                                c = c && g
                            }
                            for (e = 0; e < d.length; e++) b.b = d[e],
                            g = Tf(d[e], a, !1, b),
                            c = c && g
                        }
                        return c
                    }
                    return Uf(a, new Ia(b, this))
                }

                function rc(a) {
                    return (a = a[qd]) instanceof qc ? a : null
                }

                function pd(a) {
                    return I(a) ? a : (a[td] || (a[td] = function(b) {
                        return a.handleEvent(b)
                    }), a[td])
                }

                function J() {
                    nc.call(this);
                    this.m = new qc(this);
                    this.Nb = this;
                    this.Ua = null
                }

                function Of(a, b, c, d, e) {
                    a.m.add(String(b),
                        c, !1, d, e)
                }

                function rd(a, b, c, d, e) {
                    a.m.add(String(b), c, !0, d, e)
                }

                function sc(a, b, c, d) {
                    if (!(b = a.m.a[String(b)])) return !0;
                    b = b.concat();
                    for (var e = !0, g = 0; g < b.length; ++g) {
                        var h = b[g];
                        if (h && !h.na && h.capture == c) {
                            var v = h.listener,
                                f = h.La || h.src;
                            h.Ia && md(a.m, h);
                            e = !1 !== v.call(f, d) && e
                        }
                    }
                    return e && 0 != d.Gb
                }

                function ud(a, b, c) {
                    if (I(a)) c && (a = r(a, c));
                    else {
                        if (!a || "function" != typeof a.handleEvent) throw Error("Invalid listener argument");
                        a = r(a.handleEvent, a)
                    }
                    return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0)
                }

                function Ja(a) {
                    var b =
                        null;
                    return (new u(function(c, d) {
                        -1 == (b = ud(function() {
                            c(void 0)
                        }, a)) && d(Error("Failed to schedule timer."))
                    })).s(function(a) {
                        throw l.clearTimeout(b), a;
                    })
                }

                function Vf(a) {
                    if (a.S && "function" == typeof a.S) return a.S();
                    if (x(a)) return a.split("");
                    if (yb(a)) {
                        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
                        return b
                    }
                    for (d in b = [], c = 0, a) b[c++] = a[d];
                    return b
                }

                function Wf(a) {
                    if (a.U && "function" == typeof a.U) return a.U();
                    if (!a.S || "function" != typeof a.S) {
                        if (yb(a) || x(a)) {
                            var b = [];
                            a = a.length;
                            for (var c = 0; c < a; c++) b.push(c);
                            return b
                        }
                        for (var d in b = [], c = 0, a) b[c++] = d;
                        return b
                    }
                }

                function Za(a, b) {
                    this.b = {};
                    this.a = [];
                    this.c = 0;
                    var c = arguments.length;
                    if (1 < c) {
                        if (c % 2) throw Error("Uneven number of arguments");
                        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
                    } else if (a)
                        if (a instanceof Za)
                            for (c = a.U(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
                        else
                            for (d in a) this.set(d, a[d])
                }

                function vd(a) {
                    if (a.c != a.a.length) {
                        for (var b = 0, c = 0; b < a.a.length;) {
                            var d = a.a[b];
                            Ka(a.b, d) && (a.a[c++] = d);
                            b++
                        }
                        a.a.length = c
                    }
                    if (a.c != a.a.length) {
                        var e = {};
                        for (c = b = 0; b < a.a.length;) Ka(e, d = a.a[b]) || (a.a[c++] = d, e[d] = 1), b++;
                        a.a.length = c
                    }
                }

                function Ka(a, b) {
                    return Object.prototype.hasOwnProperty.call(a, b)
                }

                function $a(a, b) {
                    if (this.b = this.m = this.c = "", this.i = null, this.h = this.g = "", this.f = !1, a instanceof $a) {
                        this.f = void 0 !== b ? b : a.f;
                        wd(this, a.c);
                        this.m = a.m;
                        this.b = a.b;
                        Xf(this, a.i);
                        this.g = a.g;
                        b = a.a;
                        var c = new ab;
                        c.c = b.c;
                        b.a && (c.a = new Za(b.a), c.b = b.b);
                        Yf(this, c);
                        this.h = a.h
                    } else a && (c = String(a).match(Zf)) ? (this.f = !!b, wd(this, c[1] || "", !0), this.m = Gb(c[2] || ""), this.b =
                        Gb(c[3] || "", !0), Xf(this, c[4]), this.g = Gb(c[5] || "", !0), Yf(this, c[6] || "", !0), this.h = Gb(c[7] || "")) : (this.f = !!b, this.a = new ab(null, this.f))
                }

                function wd(a, b, c) {
                    a.c = c ? Gb(b, !0) : b;
                    a.c && (a.c = a.c.replace(/:$/, ""))
                }

                function Xf(a, b) {
                    if (b) {
                        if (b = Number(b), isNaN(b) || 0 > b) throw Error("Bad port number " + b);
                        a.i = b
                    } else a.i = null
                }

                function Yf(a, b, c) {
                    b instanceof ab ? (a.a = b, function(a, b) {
                        b && !a.f && (ta(a), a.c = null, a.a.forEach(function(a, b) {
                            var c = b.toLowerCase();
                            b != c && (na(this, b), $f(this, c, a))
                        }, a));
                        a.f = b
                    }(a.a, a.f)) : (c || (b = Hb(b,
                        bj)), a.a = new ab(b, a.f))
                }

                function C(a, b, c) {
                    a.a.set(b, c)
                }

                function ua(a, b) {
                    return a.a.get(b)
                }

                function oa(a) {
                    return a instanceof $a ? new $a(a) : new $a(a, void 0)
                }

                function ag(a, b) {
                    var c = new $a(null, void 0);
                    return wd(c, "https"), a && (c.b = a), b && (c.g = b), c
                }

                function Gb(a, b) {
                    return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
                }

                function Hb(a, b, c) {
                    return x(a) ? (a = encodeURI(a).replace(b, cj), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
                }

                function cj(a) {
                    return "%" + ((a = a.charCodeAt(0)) >> 4 & 15).toString(16) +
                        (15 & a).toString(16)
                }

                function ab(a, b) {
                    this.b = this.a = null;
                    this.c = a || null;
                    this.f = !!b
                }

                function ta(a) {
                    a.a || (a.a = new Za, a.b = 0, a.c && function(a, c) {
                        if (a) {
                            a = a.split("&");
                            for (var b = 0; b < a.length; b++) {
                                var e = a[b].indexOf("="),
                                    g = null;
                                if (0 <= e) {
                                    var h = a[b].substring(0, e);
                                    g = a[b].substring(e + 1)
                                } else h = a[b];
                                c(h, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
                            }
                        }
                    }(a.c, function(b, c) {
                        a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
                    }))
                }

                function bg(a) {
                    var b = Wf(a);
                    if (void 0 === b) throw Error("Keys are undefined");
                    var c = new ab(null,
                        void 0);
                    a = Vf(a);
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d],
                            g = a[d];
                        Da(g) ? $f(c, e, g) : c.add(e, g)
                    }
                    return c
                }

                function na(a, b) {
                    ta(a);
                    b = bb(a, b);
                    Ka(a.a.b, b) && (a.c = null, a.b -= a.a.get(b).length, Ka((a = a.a).b, b) && (delete a.b[b], a.c--, a.a.length > 2 * a.c && vd(a)))
                }

                function cg(a, b) {
                    return ta(a), b = bb(a, b), Ka(a.a.b, b)
                }

                function $f(a, b, c) {
                    na(a, b);
                    0 < c.length && (a.c = null, a.a.set(bb(a, b), Fa(c)), a.b += c.length)
                }

                function bb(a, b) {
                    return b = String(b), a.f && (b = b.toLowerCase()), b
                }

                function La() {
                    this.a = "";
                    this.b = dg
                }

                function eg(a) {
                    return a instanceof
                    La && a.constructor === La && a.b === dg ? a.a : (zb("expected object of type Const, got '" + a + "'"), "type_error:Const")
                }

                function Ib(a) {
                    var b = new La;
                    return b.a = a, b
                }

                function cb() {
                    this.a = "";
                    this.b = fg
                }

                function gg(a) {
                    return a instanceof cb && a.constructor === cb && a.b === fg ? a.a : (zb("expected object of type TrustedResourceUrl, got '" + a + "' of type " + Xa(a)), "type_error:TrustedResourceUrl")
                }

                function xd(a, b) {
                    var c = eg(a);
                    if (!dj.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
                    return function(a) {
                        var b = new cb;
                        return b.a =
                            a, b
                    }(a = c.replace(ej, function(a, e) {
                        if (!Object.prototype.hasOwnProperty.call(b, e)) throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
                        return (a = b[e]) instanceof La ? eg(a) : encodeURIComponent(String(a))
                    }))
                }

                function da() {
                    this.a = "";
                    this.b = hg
                }

                function tc(a) {
                    return a instanceof da && a.constructor === da && a.b === hg ? a.a : (zb("expected object of type SafeUrl, got '" + a + "' of type " + Xa(a)), "type_error:SafeUrl")
                }

                function ig(a) {
                    return a instanceof
                    da ? a : (a = a.ma ? a.la() : String(a), jg.test(a) || (a = "about:invalid#zClosurez"), yd(a))
                }

                function yd(a) {
                    var b = new da;
                    return b.a = a, b
                }

                function db() {
                    this.a = "";
                    this.b = kg
                }

                function uc(a) {
                    var b = new db;
                    return b.a = a, b
                }

                function Jb(a) {
                    var b = document;
                    return x(a) ? b.getElementById(a) : a
                }

                function lg(a, b) {
                    rf(b, function(b, d) {
                        b && b.ma && (b = b.la());
                        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : mg.hasOwnProperty(d) ? a.setAttribute(mg[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d,
                            b) : a[d] = b
                    })
                }

                function fj(a, b, c) {
                    var d = arguments,
                        e = document,
                        g = String(d[0]),
                        h = d[1];
                    if (!gj && h && (h.name || h.type)) {
                        if (g = ["<", g], h.name && g.push(' name="', dd(h.name), '"'), h.type) {
                            g.push(' type="', dd(h.type), '"');
                            var v = {};
                            ka(v, h);
                            delete v.type;
                            h = v
                        }
                        g.push(">");
                        g = g.join("")
                    }
                    return g = e.createElement(g), h && (x(h) ? g.className = h : Da(h) ? g.className = h.join(" ") : lg(g, h)), 2 < d.length && function(a, b, c) {
                        function d(c) {
                            c && b.appendChild(x(c) ? a.createTextNode(c) : c)
                        }
                        for (var e = 2; e < c.length; e++) {
                            var g = c[e];
                            !yb(g) || R(g) && 0 < g.nodeType ?
                                d(g) : M(hj(g) ? Fa(g) : g, d)
                        }
                    }(e, g, d), g
                }

                function hj(a) {
                    if (a && "number" == typeof a.length) {
                        if (R(a)) return "function" == typeof a.item || "string" == typeof a.item;
                        if (I(a)) return "function" == typeof a.item
                    }
                    return !1
                }

                function ng(a) {
                    var b = [];
                    return function h(a, b, g) {
                        if (null == b) g.push("null");
                        else {
                            if ("object" == typeof b) {
                                if (Da(b)) {
                                    var d = b;
                                    b = d.length;
                                    g.push("[");
                                    for (var e = "", f = 0; f < b; f++) g.push(e), h(a, d[f], g), e = ",";
                                    return void g.push("]")
                                }
                                if (!(b instanceof String || b instanceof Number || b instanceof Boolean)) {
                                    for (d in g.push("{"),
                                        e = "", b) Object.prototype.hasOwnProperty.call(b, d) && "function" != typeof(f = b[d]) && (g.push(e), og(d, g), g.push(":"), h(a, f, g), e = ",");
                                    return void g.push("}")
                                }
                                b = b.valueOf()
                            }
                            switch (typeof b) {
                                case "string":
                                    og(b, g);
                                    break;
                                case "number":
                                    g.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                                    break;
                                case "boolean":
                                    g.push(String(b));
                                    break;
                                case "function":
                                    g.push("null");
                                    break;
                                default:
                                    throw Error("Unknown type: " + typeof b);
                            }
                        }
                    }(new function() {}, a, b), b.join("")
                }

                function og(a, b) {
                    b.push('"', a.replace(ij, function(a) {
                        var b = pg[a];
                        return b || (b = "\\u" + (65536 | a.charCodeAt(0)).toString(16).substr(1), pg[a] = b), b
                    }), '"')
                }

                function zd() {
                    var a = E();
                    return Z && !!va && 11 == va || /Edge\/\d+/.test(a)
                }

                function eb() {
                    return l.window && l.window.location.href || self && self.location && self.location.href || ""
                }

                function qg(a, b) {
                    b = b || l.window;
                    var c = "about:blank";
                    a && (c = tc(ig(a)));
                    b.location.href = c
                }

                function rg(a) {
                    return !!((a = (a || E()).toLowerCase()).match(/android/) || a.match(/webos/) || a.match(/iphone|ipad|ipod/) || a.match(/blackberry/) || a.match(/windows phone/) ||
                        a.match(/iemobile/))
                }

                function Ma(a) {
                    a = a || l.window;
                    try {
                        a.close()
                    } catch (b) {}
                }

                function sg(a, b, c) {
                    var d = Math.floor(1E9 * Math.random()).toString();
                    b = b || 500;
                    c = c || 600;
                    var e = (window.screen.availHeight - c) / 2,
                        g = (window.screen.availWidth - b) / 2;
                    for (h in b = {
                            width: b,
                            height: c,
                            top: 0 < e ? e : 0,
                            left: 0 < g ? g : 0,
                            location: !0,
                            resizable: !0,
                            statusbar: !0,
                            toolbar: !1
                        }, c = E().toLowerCase(), d && (b.target = d, y(c, "crios/") && (b.target = "_blank")), fb(E()) == Ad && (a = a || "http://localhost", b.scrollbars = !0), c = a || "", (a = b) || (a = {}), d = window, b = c instanceof da ? c : ig(void 0 !== c.href ? c.href : String(c)), c = a.target || c.target, e = [], a) switch (h) {
                        case "width":
                        case "height":
                        case "top":
                        case "left":
                            e.push(h + "=" + a[h]);
                            break;
                        case "target":
                        case "noopener":
                        case "noreferrer":
                            break;
                        default:
                            e.push(h + "=" + (a[h] ? 1 : 0))
                    }
                    var h = e.join(",");
                    if ((D("iPhone") && !D("iPod") && !D("iPad") || D("iPad") || D("iPod")) && d.navigator && d.navigator.standalone && c && "_self" != c ? (h = d.document.createElement("A"), b instanceof da || b instanceof da || (b = b.ma ? b.la() : String(b), jg.test(b) || (b = "about:invalid#zClosurez"),
                            b = yd(b)), h.href = tc(b), h.setAttribute("target", c), a.noreferrer && h.setAttribute("rel", "noreferrer"), (a = document.createEvent("MouseEvent")).initMouseEvent("click", !0, !0, d, 1), h.dispatchEvent(a), h = {}) : a.noreferrer ? (h = d.open("", c, h), a = tc(b), h && (jj && y(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'"), h.opener = null, Ib("b/12014412, meta tag with sanitized URL"), a = uc(a = '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + dd(a) + '">'), h.document.write(a instanceof db && a.constructor ===
                            db && a.b === kg ? a.a : (zb("expected object of type SafeHtml, got '" + a + "' of type " + Xa(a)), "type_error:SafeHtml")), h.document.close())) : (h = d.open(tc(b), c, h)) && a.noopener && (h.opener = null), h) try {
                        h.focus()
                    } catch (v) {}
                    return h
                }

                function Bd() {
                    var a = null;
                    return (new u(function(b) {
                        "complete" == l.document.readyState ? b() : (a = function() {
                            b()
                        }, od(window, "load", a))
                    })).s(function(b) {
                        throw T(window, "load", a), b;
                    })
                }

                function Cd(a) {
                    return a = a || E(), !("file:" !== Kb() || !a.toLowerCase().match(/iphone|ipad|ipod|android/))
                }

                function Dd() {
                    var a =
                        l.window;
                    try {
                        return !(!a || a == a.top)
                    } catch (b) {
                        return !1
                    }
                }

                function pa() {
                    return "object" != typeof l.window && "function" == typeof l.importScripts
                }

                function ea() {
                    return n.INTERNAL.hasOwnProperty("reactNative") ? "ReactNative" : n.INTERNAL.hasOwnProperty("node") ? "Node" : pa() ? "Worker" : "Browser"
                }

                function tg() {
                    var a = ea();
                    return "ReactNative" === a || "Node" === a
                }

                function fb(a) {
                    var b = a.toLowerCase();
                    return y(b, "opera/") || y(b, "opr/") || y(b, "opios/") ? "Opera" : y(b, "iemobile") ? "IEMobile" : y(b, "msie") || y(b, "trident/") ? "IE" : y(b, "edge/") ?
                        "Edge" : y(b, "firefox/") ? Ad : y(b, "silk/") ? "Silk" : y(b, "blackberry") ? "Blackberry" : y(b, "webos") ? "Webos" : !y(b, "safari/") || y(b, "chrome/") || y(b, "crios/") || y(b, "android") ? !y(b, "chrome/") && !y(b, "crios/") || y(b, "edge/") ? y(b, "android") ? "Android" : (a = a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/)) && 2 == a.length ? a[1] : "Other" : ug : "Safari"
                }

                function gb(a, b) {
                    b = b || [];
                    var c, d = [],
                        e = {};
                    for (c in vg) e[vg[c]] = !0;
                    for (c = 0; c < b.length; c++) void 0 !== e[b[c]] && (delete e[b[c]], d.push(b[c]));
                    return d.sort(), (b = d).length || (b = ["FirebaseCore-web"]),
                        "Browser" === (d = ea()) ? d = fb(E()) : "Worker" === d && (d = fb(E()) + "-" + d), d + "/JsCore/" + a + "/" + b.join(",")
                }

                function E() {
                    return l.navigator && l.navigator.userAgent || ""
                }

                function z(a, b) {
                    a = a.split(".");
                    b = b || l;
                    for (var c = 0; c < a.length && "object" == typeof b && null != b; c++) b = b[a[c]];
                    return c != a.length && (b = void 0), b
                }

                function Ed() {
                    try {
                        var a = l.localStorage,
                            b = Na();
                        if (a) return a.setItem(b, "1"), a.removeItem(b), !zd() || !!l.indexedDB
                    } catch (c) {
                        return pa() && !!l.indexedDB
                    }
                    return !1
                }

                function Oa() {
                    return (Lb() || "chrome-extension:" === Kb() ||
                        Cd()) && !tg() && Ed() && !pa()
                }

                function Lb() {
                    return "http:" === Kb() || "https:" === Kb()
                }

                function Kb() {
                    return l.location && l.location.protocol || null
                }

                function Mb(a) {
                    return !rg(a = a || E()) && fb(a) != Ad
                }

                function Nb(a) {
                    return void 0 === a ? null : ng(a)
                }

                function wg(a) {
                    var b, c = {};
                    for (b in a) a.hasOwnProperty(b) && null !== a[b] && void 0 !== a[b] && (c[b] = a[b]);
                    return c
                }

                function hb(a) {
                    if (null !== a) return JSON.parse(a)
                }

                function Na(a) {
                    return a || Math.floor(1E9 * Math.random()).toString()
                }

                function xg(a) {
                    return "Safari" != fb(a = a || E()) && !a.toLowerCase().match(/iphone|ipad|ipod/)
                }

                function yg() {
                    var a = l.___jsl;
                    if (a && a.H)
                        for (var b in a.H)
                            if (a.H[b].r = a.H[b].r || [], a.H[b].L = a.H[b].L || [], a.H[b].r = a.H[b].L.concat(), a.CP)
                                for (var c = 0; c < a.CP.length; c++) a.CP[c] = null
                }

                function wa(a, b) {
                    if (a > b) throw Error("Short delay should be less than long delay!");
                    this.a = a;
                    this.c = b;
                    a = E();
                    b = ea();
                    this.b = rg(a) || "ReactNative" === b
                }

                function Fd() {
                    var a = l.document;
                    return !a || void 0 === a.visibilityState || "visible" == a.visibilityState
                }

                function Ob(a) {
                    try {
                        var b = new Date(parseInt(a, 10));
                        if (!isNaN(b.getTime()) && !/[^0-9]/.test(a)) return b.toUTCString()
                    } catch (c) {}
                    return null
                }

                function zg() {
                    return !(!z("fireauth.oauthhelper", l) && !z("fireauth.iframe", l))
                }

                function xa(a) {
                    Ag[a] || (Ag[a] = !0, "undefined" != typeof console && "function" == typeof console.warn && console.warn(a))
                }

                function p(a, b, c) {
                    Bg ? Object.defineProperty(a, b, {
                        configurable: !0,
                        enumerable: !0,
                        value: c
                    }) : a[b] = c
                }

                function N(a, b) {
                    if (b)
                        for (var c in b) b.hasOwnProperty(c) && p(a, c, b[c])
                }

                function qa(a) {
                    var b = {};
                    return N(b, a), b
                }

                function Gd(a) {
                    var b = a;
                    if ("object" == typeof a && null != a)
                        for (var c in b = "length" in a ? [] : {}, a) p(b, c, Gd(a[c]));
                    return b
                }

                function k(a, b) {
                    this.code = Pb + a;
                    this.message = b || kj[a] || ""
                }

                function Cg(a) {
                    var b = a && a.code;
                    return b ? new k(b.substring(Pb.length), a.message) : null
                }

                function Hd(a) {
                    var b = a[lj];
                    if (void 0 === b) throw new k("missing-continue-uri");
                    if ("string" != typeof b || "string" == typeof b && !b.length) throw new k("invalid-continue-uri");
                    this.h = b;
                    this.b = this.a = null;
                    this.g = !1;
                    var c = a[Dg];
                    if (c && "object" == typeof c) {
                        b = c[Eg];
                        var d = c[Fg];
                        if (c = c[Gg], "string" == typeof b && b.length) {
                            if (this.a = b, void 0 !== d && "boolean" != typeof d) throw new k("argument-error",
                                Fg + " property must be a boolean when specified.");
                            if (this.g = !!d, void 0 !== c && ("string" != typeof c || "string" == typeof c && !c.length)) throw new k("argument-error", Gg + " property must be a non empty string when specified.");
                            this.b = c || null
                        } else {
                            if (void 0 !== b) throw new k("argument-error", Eg + " property must be a non empty string when specified.");
                            if (void 0 !== d || void 0 !== c) throw new k("missing-android-pkg-name");
                        }
                    } else if (void 0 !== c) throw new k("argument-error", Dg + " property must be a non null object when specified.");
                    if (this.f = null, (b = a[Hg]) && "object" == typeof b)
                        if ("string" == typeof(b = b[Ig]) && b.length) this.f = b;
                        else {
                            if (void 0 !== b) throw new k("argument-error", Ig + " property must be a non empty string when specified.");
                        }
                    else if (void 0 !== b) throw new k("argument-error", Hg + " property must be a non null object when specified.");
                    if (void 0 !== (a = a[Id]) && "boolean" != typeof a) throw new k("argument-error", Id + " property must be a boolean when specified.");
                    this.c = !!a
                }

                function Jd(a) {
                    var b = {},
                        c;
                    for (c in b.continueUrl = a.h, b.canHandleCodeInApp =
                        a.c, (b.androidPackageName = a.a) && (b.androidMinimumVersion = a.b, b.androidInstallApp = a.g), b.iOSBundleId = a.f, b) null === b[c] && delete b[c];
                    return b
                }

                function mj(a) {
                    var b = "";
                    return function(a, b) {
                        function c(b) {
                            for (; d < a.length;) {
                                var c = a.charAt(d++),
                                    e = vc[c];
                                if (null != e) return e;
                                if (!/^[\s\xa0]*$/.test(c)) throw Error("Unknown base64 encoding at char: " + c);
                            }
                            return b
                        }! function() {
                            if (!wc) {
                                wc = {};
                                vc = {};
                                for (var a = 0; 65 > a; a++) wc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), vc[wc[a]] = a,
                                    62 <= a && (vc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
                            }
                        }();
                        for (var d = 0;;) {
                            var h = c(-1),
                                v = c(0),
                                f = c(64),
                                k = c(64);
                            if (64 === k && -1 === h) break;
                            b(h << 2 | v >> 4);
                            64 != f && (b(v << 4 & 240 | f >> 2), 64 != k && b(f << 6 & 192 | k))
                        }
                    }(a, function(a) {
                        b += String.fromCharCode(a)
                    }), b
                }

                function Jg(a) {
                    this.c = a.sub;
                    this.a = a.provider_id || a.firebase && a.firebase.sign_in_provider || null;
                    this.b = !!a.is_anonymous || "anonymous" == this.a
                }

                function Kg(a) {
                    return (a = Lg(a)) && a.sub && a.iss && a.aud && a.exp ? new Jg(a) : null
                }

                function Lg(a) {
                    if (!a ||
                        3 != (a = a.split(".")).length) return null;
                    for (var b = (4 - (a = a[1]).length % 4) % 4, c = 0; c < b; c++) a += ".";
                    try {
                        return JSON.parse(mj(a))
                    } catch (d) {}
                    return null
                }

                function Kd(a) {
                    for (var b in Ld)
                        if (Ld[b].Na == a) return Ld[b];
                    return null
                }

                function Md(a) {
                    var b = {};
                    b["facebook.com"] = Mg;
                    b["google.com"] = Ng;
                    b["github.com"] = Og;
                    b["twitter.com"] = Pg;
                    var c = a && a[Qg];
                    try {
                        if (c) return b[c] ? new b[c](a) : new fa(a);
                        if (void 0 !== a[Nd]) return new Od(a)
                    } catch (d) {}
                    return null
                }

                function Od(a) {
                    var b = a[Qg];
                    if (!b && a[Nd]) {
                        var c = Kg(a[Nd]);
                        c && c.a && (b = c.a)
                    }
                    if (!b) throw Error("Invalid additional user info!");
                    "anonymous" != b && "custom" != b || (b = null);
                    c = !1;
                    void 0 !== a.isNewUser ? c = !!a.isNewUser : "identitytoolkit#SignupNewUserResponse" === a.kind && (c = !0);
                    p(this, "providerId", b);
                    p(this, "isNewUser", c)
                }

                function fa(a) {
                    Od.call(this, a);
                    p(this, "profile", Gd(hb(a.rawUserInfo || "{}") || {}))
                }

                function Mg(a) {
                    if (fa.call(this, a), "facebook.com" != this.providerId) throw Error("Invalid provider ID!");
                }

                function Og(a) {
                    if (fa.call(this, a), "github.com" != this.providerId) throw Error("Invalid provider ID!");
                    p(this, "username", this.profile && this.profile.login ||
                        null)
                }

                function Ng(a) {
                    if (fa.call(this, a), "google.com" != this.providerId) throw Error("Invalid provider ID!");
                }

                function Pg(a) {
                    if (fa.call(this, a), "twitter.com" != this.providerId) throw Error("Invalid provider ID!");
                    p(this, "username", a.screenName || null)
                }

                function Rg(a) {
                    var b = oa(a),
                        c = ua(b, "link"),
                        d = ua(oa(c), "link");
                    return ua(oa(b = ua(b, "deep_link_id")), "link") || b || d || c || a
                }

                function xc(a, b) {
                    return a.then(function(a) {
                        if (a[U]) {
                            var c = Kg(a[U]);
                            if (!c || b != c.c) throw new k("user-mismatch");
                            return a
                        }
                        throw new k("user-mismatch");
                    }).s(function(a) {
                        throw a && a.code && a.code == Pb + "user-not-found" ? new k("user-mismatch") : a;
                    })
                }

                function ib(a, b, c) {
                    if (b.idToken || b.accessToken) b.idToken && p(this, "idToken", b.idToken), b.accessToken && p(this, "accessToken", b.accessToken);
                    else {
                        if (!b.oauthToken || !b.oauthTokenSecret) throw new k("internal-error", "failed to construct a credential");
                        p(this, "accessToken", b.oauthToken);
                        p(this, "secret", b.oauthTokenSecret)
                    }
                    p(this, "providerId", a);
                    p(this, "signInMethod", c)
                }

                function Pd(a) {
                    var b = {};
                    return a.idToken && (b.id_token =
                        a.idToken), a.accessToken && (b.access_token = a.accessToken), a.secret && (b.oauth_token_secret = a.secret), b.providerId = a.providerId, {
                        postBody: bg(b).toString(),
                        requestUri: "http://localhost"
                    }
                }

                function Qb(a, b) {
                    this.Ac = b || [];
                    N(this, {
                        providerId: a,
                        isOAuthProvider: !0
                    });
                    this.vb = {};
                    this.$a = (Kd(a) || {}).Ma || null;
                    this.Ya = null
                }

                function P(a) {
                    Qb.call(this, a, yc);
                    this.a = []
                }

                function Pa() {
                    P.call(this, "facebook.com")
                }

                function Sg(a) {
                    if (!a) throw new k("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
                    var b = a;
                    return R(a) && (b = a.accessToken), (new Pa).credential(null, b)
                }

                function Qa() {
                    P.call(this, "github.com")
                }

                function Tg(a) {
                    if (!a) throw new k("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
                    var b = a;
                    return R(a) && (b = a.accessToken), (new Qa).credential(null, b)
                }

                function Ra() {
                    P.call(this, "google.com");
                    this.ta("profile")
                }

                function Ug(a, b) {
                    var c = a;
                    return R(a) && (c = a.idToken, b = a.accessToken), (new Ra).credential(c, b)
                }

                function jb() {
                    Qb.call(this, "twitter.com", Vg)
                }

                function Wg(a,
                    b) {
                    var c = a;
                    if (R(c) || (c = {
                            oauthToken: a,
                            oauthTokenSecret: b
                        }), !c.oauthToken || !c.oauthTokenSecret) throw new k("argument-error", "credential failed: expected 2 arguments (the OAuth access token and secret).");
                    return new ib("twitter.com", c, "twitter.com")
                }

                function kb(a, b, c) {
                    this.a = a;
                    this.b = b;
                    p(this, "providerId", "password");
                    p(this, "signInMethod", c === V.EMAIL_LINK_SIGN_IN_METHOD ? V.EMAIL_LINK_SIGN_IN_METHOD : V.EMAIL_PASSWORD_SIGN_IN_METHOD)
                }

                function V() {
                    N(this, {
                        providerId: "password",
                        isOAuthProvider: !1
                    })
                }

                function Xg(a,
                    b) {
                    if (!(b = Yg(b))) throw new k("argument-error", "Invalid email link!");
                    return new kb(a, b, V.EMAIL_LINK_SIGN_IN_METHOD)
                }

                function Yg(a) {
                    var b = ua((a = new function(a) {
                        this.a = oa(a)
                    }(a = Rg(a))).a, "oobCode") || null;
                    return "signIn" === (ua(a.a, "mode") || null) && b ? b : null
                }

                function lb(a) {
                    if (!(a.Sa && a.Ra || a.Fa && a.$)) throw new k("internal-error");
                    this.a = a;
                    p(this, "providerId", "phone");
                    p(this, "signInMethod", "phone")
                }

                function Qd(a) {
                    return a.a.Fa && a.a.$ ? {
                        temporaryProof: a.a.Fa,
                        phoneNumber: a.a.$
                    } : {
                        sessionInfo: a.a.Sa,
                        code: a.a.Ra
                    }
                }

                function ya(a) {
                    try {
                        this.a = a || n.auth()
                    } catch (b) {
                        throw new k("argument-error", "Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");
                    }
                    N(this, {
                        providerId: "phone",
                        isOAuthProvider: !1
                    })
                }

                function Zg(a, b) {
                    if (!a) throw new k("missing-verification-id");
                    if (!b) throw new k("missing-verification-code");
                    return new lb({
                        Sa: a,
                        Ra: b
                    })
                }

                function zc(a) {
                    if (a.temporaryProof &&
                        a.phoneNumber) return new lb({
                        Fa: a.temporaryProof,
                        $: a.phoneNumber
                    });
                    var b = a && a.providerId;
                    if (!b || "password" === b) return null;
                    var c = a && a.oauthAccessToken,
                        d = a && a.oauthTokenSecret;
                    a = a && a.oauthIdToken;
                    try {
                        switch (b) {
                            case "google.com":
                                return Ug(a, c);
                            case "facebook.com":
                                return Sg(c);
                            case "github.com":
                                return Tg(c);
                            case "twitter.com":
                                return Wg(c, d);
                            default:
                                return (new P(b)).credential(a, c)
                        }
                    } catch (e) {
                        return null
                    }
                }

                function Rd(a) {
                    if (!a.isOAuthProvider) throw new k("invalid-oauth-provider");
                }

                function ra(a, b, c, d, e) {
                    if (this.b =
                        a, this.c = b || null, this.f = c || null, this.g = d || null, this.a = e || null, !this.f && !this.a) throw new k("invalid-auth-event");
                    if (this.f && this.a) throw new k("invalid-auth-event");
                    if (this.f && !this.g) throw new k("invalid-auth-event");
                }

                function $g(a) {
                    return (a = a || {}).type ? new ra(a.type, a.eventId, a.urlResponse, a.sessionId, a.error && Cg(a.error)) : null
                }

                function Sd() {
                    this.b = null;
                    this.a = []
                }

                function Td(a) {
                    var b = "unauthorized-domain",
                        c = void 0,
                        d = oa(a);
                    a = d.b;
                    "chrome-extension" == (d = d.c) ? c = qf("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",
                        a): "http" == d || "https" == d ? c = qf("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", a) : b = "operation-not-supported-in-this-environment";
                    k.call(this, b, c)
                }

                function Rb(a, b, c) {
                    k.call(this, a, c);
                    (a = b || {}).wb && p(this, "email", a.wb);
                    a.$ && p(this, "phoneNumber", a.$);
                    a.credential && p(this, "credential", a.credential)
                }

                function Ac(a) {
                    if (a.code) {
                        var b = a.code || "";
                        0 == b.indexOf(Pb) && (b = b.substring(Pb.length));
                        var c = {
                            credential: zc(a)
                        };
                        if (a.email) c.wb = a.email;
                        else {
                            if (!a.phoneNumber) return new k(b, a.message || void 0);
                            c.$ = a.phoneNumber
                        }
                        return new Rb(b, c, a.message)
                    }
                    return null
                }

                function Sb() {}

                function ah(a) {
                    return a.c || (a.c = a.b())
                }

                function Bc() {}

                function bh(a) {
                    if (!a.f && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
                        for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                            var d = b[c];
                            try {
                                return new ActiveXObject(d), a.f = d
                            } catch (e) {}
                        }
                        throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
                    }
                    return a.f
                }

                function Cc() {}

                function ch() {
                    this.a = new XDomainRequest;
                    this.readyState = 0;
                    this.onreadystatechange = null;
                    this.responseText = "";
                    this.status = -1;
                    this.statusText = "";
                    this.a.onload = r(this.bc, this);
                    this.a.onerror = r(this.Bb, this);
                    this.a.onprogress = r(this.cc, this);
                    this.a.ontimeout = r(this.fc, this)
                }

                function Ud(a, b, c) {
                    this.reset(a, b, c, void 0, void 0)
                }

                function Vd(a) {
                    this.f = a;
                    this.b = this.c = this.a = null
                }

                function Tb(a, b) {
                    this.name = a;
                    this.value = b
                }

                function Wd(a) {
                    var b;
                    if (Dc || (Dc = new Vd(""), Xd[""] = Dc, Dc.c = nj),
                        !(b = Xd[a])) {
                        b = new Vd(a);
                        var c = a.lastIndexOf("."),
                            d = a.substr(c + 1);
                        (c = Wd(a.substr(0, c))).b || (c.b = {});
                        c.b[d] = b;
                        b.a = c;
                        Xd[a] = b
                    }
                    return b
                }

                function W(a, b) {
                    a && a.log(oj, b, void 0)
                }

                function Ec(a) {
                    this.f = a
                }

                function Yd(a) {
                    J.call(this);
                    this.i = a;
                    this.readyState = Zd;
                    this.status = 0;
                    this.responseText = this.statusText = "";
                    this.onreadystatechange = null;
                    this.g = new Headers;
                    this.b = null;
                    this.h = "GET";
                    this.c = "";
                    this.a = !1;
                    this.f = Wd("goog.net.FetchXmlHttp")
                }

                function mb(a) {
                    a.onreadystatechange && a.onreadystatechange.call(a)
                }

                function Ub(a) {
                    J.call(this);
                    this.headers = new Za;
                    this.C = a || null;
                    this.c = !1;
                    this.w = this.a = null;
                    this.h = this.N = this.l = "";
                    this.f = this.I = this.i = this.G = !1;
                    this.g = 0;
                    this.u = null;
                    this.o = dh;
                    this.v = this.O = !1
                }

                function pj(a, b, c, d, e) {
                    if (a.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + a.l + "; newUri=" + b);
                    c = c ? c.toUpperCase() : "GET";
                    a.l = b;
                    a.h = "";
                    a.N = c;
                    a.G = !1;
                    a.c = !0;
                    a.a = a.C ? a.C.a() : eh.a();
                    a.w = a.C ? ah(a.C) : ah(eh);
                    a.a.onreadystatechange = r(a.Fb, a);
                    try {
                        W(a.b, sa(a, "Opening Xhr")), a.I = !0, a.a.open(c, String(b), !0), a.I = !1
                    } catch (h) {
                        return W(a.b,
                            sa(a, "Error opening Xhr: " + h.message)), void fh(a, h)
                    }
                    b = d || "";
                    var g = new Za(a.headers);
                    e && function(a, b) {
                        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
                        else if (yb(a) || x(a)) M(a, b, void 0);
                        else
                            for (var c = Wf(a), d = Vf(a), e = d.length, g = 0; g < e; g++) b.call(void 0, d[g], c && c[g], a)
                    }(e, function(a, b) {
                        g.set(b, a)
                    });
                    e = function(a) {
                        a: {
                            for (var b = qj, c = a.length, d = x(a) ? a.split("") : a, e = 0; e < c; e++)
                                if (e in d && b.call(void 0, d[e], e, a)) {
                                    b = e;
                                    break a
                                } b = -1
                        }
                        return 0 > b ? null : x(a) ? a.charAt(b) : a[b]
                    }(g.U());
                    d = l.FormData && b instanceof
                    l.FormData;
                    !Ea(rj, c) || e || d || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                    g.forEach(function(a, b) {
                        this.a.setRequestHeader(b, a)
                    }, a);
                    a.o && (a.a.responseType = a.o);
                    "withCredentials" in a.a && a.a.withCredentials !== a.O && (a.a.withCredentials = a.O);
                    try {
                        gh(a), 0 < a.g && (a.v = function(a) {
                                return Z && Lf(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout
                            }(a.a), W(a.b, sa(a, "Will abort after " + a.g + "ms if incomplete, xhr2 " + a.v)), a.v ? (a.a.timeout = a.g, a.a.ontimeout = r(a.Ga, a)) : a.u = ud(a.Ga, a.g, a)),
                            W(a.b, sa(a, "Sending request")), a.i = !0, a.a.send(b), a.i = !1
                    } catch (h) {
                        W(a.b, sa(a, "Send error: " + h.message)), fh(a, h)
                    }
                }

                function qj(a) {
                    return "content-type" == a.toLowerCase()
                }

                function fh(a, b) {
                    a.c = !1;
                    a.a && (a.f = !0, a.a.abort(), a.f = !1);
                    a.h = b;
                    hh(a);
                    Fc(a)
                }

                function hh(a) {
                    a.G || (a.G = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
                }

                function ih(a) {
                    if (a.c && void 0 !== $d)
                        if (a.w[1] && 4 == Vb(a) && 2 == Gc(a)) W(a.b, sa(a, "Local request error detected and ignored"));
                        else if (a.i && 4 == Vb(a)) ud(a.Fb, 0, a);
                    else if (a.dispatchEvent("readystatechange"),
                        4 == Vb(a)) {
                        W(a.b, sa(a, "Request complete"));
                        a.c = !1;
                        try {
                            var b, c = Gc(a);
                            a: switch (c) {
                                case 200:
                                case 201:
                                case 202:
                                case 204:
                                case 206:
                                case 304:
                                case 1223:
                                    var d = !0;
                                    break a;
                                default:
                                    d = !1
                            }
                            if (!(b = d)) {
                                var e;
                                if (e = 0 === c) {
                                    var g = String(a.l).match(Zf)[1] || null;
                                    if (!g && l.self && l.self.location) {
                                        var h = l.self.location.protocol;
                                        g = h.substr(0, h.length - 1)
                                    }
                                    e = !sj.test(g ? g.toLowerCase() : "")
                                }
                                b = e
                            }
                            if (b) a.dispatchEvent("complete"), a.dispatchEvent("success");
                            else {
                                try {
                                    var f = 2 < Vb(a) ? a.a.statusText : ""
                                } catch (Y) {
                                    W(a.b, "Can not get status: " +
                                        Y.message), f = ""
                                }
                                a.h = f + " [" + Gc(a) + "]";
                                hh(a)
                            }
                        } finally {
                            Fc(a)
                        }
                    }
                }

                function Fc(a, b) {
                    if (a.a) {
                        gh(a);
                        var c = a.a,
                            d = a.w[0] ? ba : null;
                        a.a = null;
                        a.w = null;
                        b || a.dispatchEvent("ready");
                        try {
                            c.onreadystatechange = d
                        } catch (e) {
                            (a = a.b) && a.log(jh, "Problem encountered resetting onreadystatechange: " + e.message, void 0)
                        }
                    }
                }

                function gh(a) {
                    a.a && a.v && (a.a.ontimeout = null);
                    a.u && (l.clearTimeout(a.u), a.u = null)
                }

                function Vb(a) {
                    return a.a ? a.a.readyState : 0
                }

                function Gc(a) {
                    try {
                        return 2 < Vb(a) ? a.a.status : -1
                    } catch (b) {
                        return -1
                    }
                }

                function sa(a, b) {
                    return b +
                        " [" + a.N + " " + a.l + " " + Gc(a) + "]"
                }

                function za(a, b) {
                    this.g = [];
                    this.v = a;
                    this.u = b || null;
                    this.f = this.a = !1;
                    this.c = void 0;
                    this.l = this.w = this.i = !1;
                    this.h = 0;
                    this.b = null;
                    this.m = 0
                }

                function Wb(a, b, c) {
                    a.a = !0;
                    a.c = c;
                    a.f = !b;
                    kh(a)
                }

                function Hc(a) {
                    if (a.a) {
                        if (!a.l) throw new Ic(a);
                        a.l = !1
                    }
                }

                function ae(a, b, c, d) {
                    a.g.push([b, c, d]);
                    a.a && kh(a)
                }

                function lh(a) {
                    return tj(a.g, function(a) {
                        return I(a[1])
                    })
                }

                function kh(a) {
                    if (a.h && a.a && lh(a)) {
                        var b = a.h,
                            c = Jc[b];
                        c && (l.clearTimeout(c.a), delete Jc[b]);
                        a.h = 0
                    }
                    a.b && (a.b.m--, delete a.b);
                    b = a.c;
                    for (var d = c = !1; a.g.length && !a.i;) {
                        var e = a.g.shift(),
                            g = e[0],
                            h = e[1];
                        if (e = e[2], g = a.f ? h : g) try {
                            var f = g.call(e || a.u, b);
                            void 0 !== f && (a.f = a.f && (f == b || f instanceof Error), a.c = b = f);
                            (lf(b) || "function" == typeof l.Promise && b instanceof l.Promise) && (d = !0, a.i = !0)
                        } catch (Y) {
                            b = Y, a.f = !0, lh(a) || (c = !0)
                        }
                    }
                    a.c = b;
                    d && (f = r(a.o, a, !0), d = r(a.o, a, !1), b instanceof za ? (ae(b, f, d), b.w = !0) : b.then(f, d));
                    c && (b = new mh(b), Jc[b.a] = b, a.h = b.a)
                }

                function Ic() {
                    O.call(this)
                }

                function Xb() {
                    O.call(this)
                }

                function mh(a) {
                    this.a = l.setTimeout(r(this.c,
                        this), 0);
                    this.b = a
                }

                function be(a) {
                    var b = {},
                        c = b.document || document,
                        d = gg(a),
                        e = document.createElement("SCRIPT"),
                        g = {
                            Hb: e,
                            Ga: void 0
                        },
                        h = new za(uj, g),
                        f = null,
                        k = null != b.timeout ? b.timeout : 5E3;
                    return 0 < k && (f = window.setTimeout(function() {
                            Kc(e, !0);
                            var a = new ce(vj, "Timeout reached for loading script " + d);
                            Hc(h);
                            Wb(h, !1, a)
                        }, k), g.Ga = f), e.onload = e.onreadystatechange = function() {
                            e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (Kc(e, b.dd || !1, f), h.C())
                        }, e.onerror = function() {
                            Kc(e, !0, f);
                            var a = new ce(wj, "Error while loading script " +
                                d);
                            Hc(h);
                            Wb(h, !1, a)
                        }, ka(g = b.attributes || {}, {
                            type: "text/javascript",
                            charset: "UTF-8"
                        }), lg(e, g), e.src = gg(a),
                        function(a) {
                            var b;
                            return (b = (a || document).getElementsByTagName("HEAD")) && 0 != b.length ? b[0] : a.documentElement
                        }(c).appendChild(e), h
                }

                function uj() {
                    if (this && this.Hb) {
                        var a = this.Hb;
                        a && "SCRIPT" == a.tagName && Kc(a, !0, this.Ga)
                    }
                }

                function Kc(a, b, c) {
                    null != c && l.clearTimeout(c);
                    a.onload = ba;
                    a.onerror = ba;
                    a.onreadystatechange = ba;
                    b && window.setTimeout(function() {
                        a && a.parentNode && a.parentNode.removeChild(a)
                    }, 0)
                }

                function ce(a,
                    b) {
                    var c = "Jsloader error (code #" + a + ")";
                    b && (c += ": " + b);
                    O.call(this, c);
                    this.code = a
                }

                function Lc(a) {
                    this.f = a
                }

                function ha(a, b, c) {
                    if (this.b = a, a = b || {}, this.i = a.secureTokenEndpoint || "https://securetoken.googleapis.com/v1/token", this.m = a.secureTokenTimeout || xj, this.f = Cb(a.secureTokenHeaders || yj), this.g = a.firebaseEndpoint || "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", this.h = a.firebaseTimeout || zj, this.a = Cb(a.firebaseHeaders || Aj), c && (this.a["X-Client-Version"] = c, this.f["X-Client-Version"] = c),
                        c = "Node" == ea(), !(c = l.XMLHttpRequest || c && n.INTERNAL.node && n.INTERNAL.node.XMLHttpRequest) && !pa()) throw new k("internal-error", "The XMLHttpRequest compatibility library was not found.");
                    this.c = void 0;
                    pa() ? this.c = new Ec(self) : tg() ? this.c = new Lc(c) : this.c = new Cc
                }

                function nh(a, b) {
                    b ? a.a["X-Firebase-Locale"] = b : delete a.a["X-Firebase-Locale"]
                }

                function oh(a, b) {
                    b ? (a.a["X-Client-Version"] = b, a.f["X-Client-Version"] = b) : (delete a.a["X-Client-Version"], delete a.f["X-Client-Version"])
                }

                function ph(a, b, c, d, e, g, h) {
                    (function() {
                        var a =
                            E();
                        return !((a = fb(a) != ug ? null : (a = a.match(/\sChrome\/(\d+)/i)) && 2 == a.length ? parseInt(a[1], 10) : null) && 30 > a || Z && va && !(9 < va))
                    })() || pa() ? a = r(a.o, a) : (de || (de = new u(function(a, b) {
                        ! function(a, b) {
                            if (((window.gapi || {}).client || {}).request) a();
                            else {
                                l[qh] = function() {
                                    ((window.gapi || {}).client || {}).request ? a() : b(Error("CORS_UNSUPPORTED"))
                                };
                                var c = xd(Bj, {
                                    onload: qh
                                });
                                ! function(a, b) {
                                    ae(a, null, b, void 0)
                                }(be(c), function() {
                                    b(Error("CORS_UNSUPPORTED"))
                                })
                            }
                        }(a, b)
                    })), a = r(a.l, a));
                    a(b, c, d, e, g, h)
                }

                function Sa(a) {
                    if (!Cj.test(a.email)) throw new k("invalid-email");
                }

                function rh(a) {
                    "email" in a && Sa(a)
                }

                function ia(a) {
                    if (!a[U]) throw new k("internal-error");
                }

                function ee(a) {
                    if (a.phoneNumber || a.temporaryProof) {
                        if (!a.phoneNumber || !a.temporaryProof) throw new k("internal-error");
                    } else {
                        if (!a.sessionInfo) throw new k("missing-verification-id");
                        if (!a.code) throw new k("missing-verification-code");
                    }
                }

                function fe(a) {
                    if (!a.requestUri || !a.sessionId && !a.postBody) throw new k("internal-error");
                }

                function sh(a) {
                    var b = null;
                    if (a.needConfirmation ? (a.code = "account-exists-with-different-credential",
                            b = Ac(a)) : "FEDERATED_USER_ID_ALREADY_LINKED" == a.errorMessage ? (a.code = "credential-already-in-use", b = Ac(a)) : "EMAIL_EXISTS" == a.errorMessage ? (a.code = "email-already-in-use", b = Ac(a)) : a.errorMessage && (b = th(a.errorMessage)), b) throw b;
                    if (!a[U]) throw new k("internal-error");
                }

                function uh(a, b) {
                    return b.returnIdpCredential = !0, w(a, Dj, b)
                }

                function vh(a, b) {
                    return b.returnIdpCredential = !0, w(a, Ej, b)
                }

                function wh(a, b) {
                    return b.returnIdpCredential = !0, b.autoCreate = !1, w(a, Fj, b)
                }

                function ge(a) {
                    if (!a.oobCode) throw new k("invalid-action-code");
                }

                function w(a, b, c) {
                    if (! function(a, b) {
                            if (!b || !b.length) return !0;
                            if (!a) return !1;
                            for (var c = 0; c < b.length; c++) {
                                var d = a[b[c]];
                                if (void 0 === d || null === d || "" === d) return !1
                            }
                            return !0
                        }(c, b.T)) return B(new k("internal-error"));
                    var d, e = b.Eb || "POST";
                    return q(c).then(b.B).then(function() {
                        return b.R && (c.returnSecureToken = !0),
                            function(a, b, c, d, e, f) {
                                var g = oa(a.g + b);
                                C(g, "key", a.b);
                                f && C(g, "cb", nb().toString());
                                var h = "GET" == c;
                                if (h)
                                    for (var v in d) d.hasOwnProperty(v) && C(g, v, d[v]);
                                return new u(function(b, f) {
                                    ph(a, g.toString(),
                                        function(a) {
                                            a ? a.error ? f(he(a, e || {})) : b(a) : f(new k("network-request-failed"))
                                        }, c, h ? void 0 : ng(wg(d)), a.a, a.h.get())
                                })
                            }(a, b.endpoint, e, c, b.Tb, b.rb || !1)
                    }).then(function(a) {
                        return d = a
                    }).then(b.J).then(function() {
                        if (!b.da) return d;
                        if (!(b.da in d)) throw new k("internal-error");
                        return d[b.da]
                    })
                }

                function th(a) {
                    return he({
                        error: {
                            errors: [{
                                message: a
                            }],
                            code: 400,
                            message: a
                        }
                    })
                }

                function he(a, b) {
                    var c = (a.error && a.error.errors && a.error.errors[0] || {}).reason || "",
                        d = {
                            keyInvalid: "invalid-api-key",
                            ipRefererBlocked: "app-not-authorized"
                        };
                    if (c = d[c] ? new k(d[c]) : null) return c;
                    for (var e in c = a.error && a.error.message || "", ka(d = {
                            INVALID_CUSTOM_TOKEN: "invalid-custom-token",
                            CREDENTIAL_MISMATCH: "custom-token-mismatch",
                            MISSING_CUSTOM_TOKEN: "internal-error",
                            INVALID_IDENTIFIER: "invalid-email",
                            MISSING_CONTINUE_URI: "internal-error",
                            INVALID_EMAIL: "invalid-email",
                            INVALID_PASSWORD: "wrong-password",
                            USER_DISABLED: "user-disabled",
                            MISSING_PASSWORD: "internal-error",
                            EMAIL_EXISTS: "email-already-in-use",
                            PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
                            INVALID_IDP_RESPONSE: "invalid-credential",
                            FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
                            INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
                            INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
                            INVALID_SENDER: "invalid-sender",
                            EMAIL_NOT_FOUND: "user-not-found",
                            EXPIRED_OOB_CODE: "expired-action-code",
                            INVALID_OOB_CODE: "invalid-action-code",
                            MISSING_OOB_CODE: "internal-error",
                            CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
                            INVALID_ID_TOKEN: "invalid-user-token",
                            TOKEN_EXPIRED: "user-token-expired",
                            USER_NOT_FOUND: "user-token-expired",
                            CORS_UNSUPPORTED: "cors-unsupported",
                            DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
                            INVALID_APP_ID: "invalid-app-id",
                            TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
                            WEAK_PASSWORD: "weak-password",
                            OPERATION_NOT_ALLOWED: "operation-not-allowed",
                            USER_CANCELLED: "user-cancelled",
                            CAPTCHA_CHECK_FAILED: "captcha-check-failed",
                            INVALID_APP_CREDENTIAL: "invalid-app-credential",
                            INVALID_CODE: "invalid-verification-code",
                            INVALID_PHONE_NUMBER: "invalid-phone-number",
                            INVALID_SESSION_INFO: "invalid-verification-id",
                            INVALID_TEMPORARY_PROOF: "invalid-credential",
                            MISSING_APP_CREDENTIAL: "missing-app-credential",
                            MISSING_CODE: "missing-verification-code",
                            MISSING_PHONE_NUMBER: "missing-phone-number",
                            MISSING_SESSION_INFO: "missing-verification-id",
                            QUOTA_EXCEEDED: "quota-exceeded",
                            SESSION_EXPIRED: "code-expired",
                            INVALID_CONTINUE_URI: "invalid-continue-uri",
                            MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
                            MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
                            UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
                            INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
                            INVALID_CERT_HASH: "invalid-cert-hash"
                        }, b || {}), b = (b = c.match(/^[^\s]+\s*:\s*(.*)$/)) && 1 < b.length ? b[1] : void 0, d)
                        if (0 === c.indexOf(e)) return new k(d[e], b);
                    return !b && a && (b = Nb(a)), new k("internal-error", b)
                }

                function Yb(a) {
                    for (var b in ie)
                        if (ie[b].id === a) return {
                            firebaseEndpoint: (a = ie[b]).Za,
                            secureTokenEndpoint: a.fb
                        };
                    return null
                }

                function Gj(a) {
                    this.b = a;
                    this.a = null;
                    this.bb = function(a) {
                        return (je || (je = (new u(function(a, b) {
                            function c() {
                                yg();
                                z("gapi.load")("gapi.iframes", {
                                    callback: a,
                                    ontimeout: function() {
                                        yg();
                                        b(Error("Network Error"))
                                    },
                                    timeout: Hj.get()
                                })
                            }
                            if (z("gapi.iframes.Iframe")) a();
                            else if (z("gapi.load")) c();
                            else {
                                var d = "__iframefcb" + Math.floor(1E6 * Math.random()).toString();
                                l[d] = function() {
                                    z("gapi.load") ? c() : b(Error("Network Error"))
                                };
                                q(be(d = xd(Ij, {
                                    onload: d
                                }))).s(function() {
                                    b(Error("Network Error"))
                                })
                            }
                        })).s(function(a) {
                            throw je = null, a;
                        }))).then(function() {
                            return new u(function(b, d) {
                                z("gapi.iframes.getContext")().open({
                                    where: document.body,
                                    url: a.b,
                                    messageHandlersFilter: z("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"),
                                    attributes: {
                                        style: {
                                            position: "absolute",
                                            top: "-100px",
                                            width: "1px",
                                            height: "1px"
                                        }
                                    },
                                    dontclear: !0
                                }, function(c) {
                                    function e() {
                                        clearTimeout(h);
                                        b()
                                    }
                                    a.a = c;
                                    a.a.restyle({
                                        setHideOnLeave: !1
                                    });
                                    var h = setTimeout(function() {
                                        d(Error("Network Error"))
                                    }, Jj.get());
                                    c.ping(e).then(e, function() {
                                        d(Error("Network Error"))
                                    })
                                })
                            })
                        })
                    }(this)
                }

                function xh(a, b, c) {
                    this.i = a;
                    this.g = b;
                    this.h = c;
                    this.f = null;
                    this.a = ag(this.i, "/__/auth/iframe");
                    C(this.a, "apiKey", this.g);
                    C(this.a, "appName", this.h);
                    this.b = null;
                    this.c = []
                }

                function yh(a, b, c, d, e) {
                    this.o = a;
                    this.l = b;
                    this.c = c;
                    this.m = d;
                    this.h =
                        this.g = this.i = null;
                    this.a = e;
                    this.f = null
                }

                function ke(a) {
                    try {
                        return n.app(a).auth().xa()
                    } catch (b) {
                        return []
                    }
                }

                function zh(a, b, c, d, e) {
                    this.l = a;
                    this.f = b;
                    this.b = c;
                    this.c = d || null;
                    this.h = e || null;
                    this.o = this.u = this.v = null;
                    this.g = [];
                    this.m = this.a = null
                }

                function Ah(a) {
                    var b = eb();
                    return function(a) {
                        return w(a, Kj, {}).then(function(a) {
                            return a.authorizedDomains || []
                        })
                    }(a).then(function(a) {
                        a: {
                            var c = oa(b),
                                e = c.c;c = c.b;
                            for (var g = 0; g < a.length; g++) {
                                var h = a[g],
                                    f = c,
                                    k = e;
                                if (0 == h.indexOf("chrome-extension://") ? f = oa(h).b == f &&
                                    "chrome-extension" == k : "http" != k && "https" != k ? f = !1 : Lj.test(h) ? f = f == h : (h = h.split(".").join("\\."), f = (new RegExp("^(.+\\." + h + "|" + h + ")$", "i")).test(f)), f) {
                                    a = !0;
                                    break a
                                }
                            }
                            a = !1
                        }
                        if (!a) throw new Td(eb());
                    })
                }

                function Bh(a) {
                    return a.m ? a.m : (a.m = Bd().then(function() {
                        if (!a.u) {
                            var b = a.c,
                                c = a.h,
                                d = ke(a.b),
                                e = new xh(a.l, a.f, a.b);
                            e.f = b;
                            e.b = c;
                            e.c = Fa(d || []);
                            a.u = e.toString()
                        }
                        a.i = new Gj(a.u);
                        (function(a) {
                            if (!a.i) throw Error("IfcHandler must be initialized!");
                            ! function(a, b) {
                                a.bb.then(function() {
                                    a.a.register("authEvent", b, z("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))
                                })
                            }(a.i,
                                function(b) {
                                    var c = {};
                                    if (b && b.authEvent) {
                                        var d = !1;
                                        b = $g(b.authEvent);
                                        for (c = 0; c < a.g.length; c++) d = a.g[c](b) || d;
                                        return (c = {}).status = d ? "ACK" : "ERROR", q(c)
                                    }
                                    return c.status = "ERROR", q(c)
                                })
                        })(a)
                    }), a.m)
                }

                function Ch(a) {
                    return a.o || (a.v = a.c ? gb(a.c, ke(a.b)) : null, a.o = new ha(a.f, Yb(a.h), a.v)), a.o
                }

                function Zb(a, b, c, d, e, g, h, f, k, l) {
                    return (a = new yh(a, b, c, d, e)).i = g, a.g = h, a.h = f, a.b = Cb(k || null), a.f = l, a.toString()
                }

                function Dh(a) {
                    if (this.a = a || n.INTERNAL.reactNative && n.INTERNAL.reactNative.AsyncStorage, !this.a) throw new k("internal-error",
                        "The React Native compatibility library was not found.");
                    this.type = "asyncStorage"
                }

                function Eh() {
                    if (!Fh()) throw new k("web-storage-unsupported");
                    this.f = {};
                    this.a = [];
                    this.b = 0;
                    this.g = l.indexedDB;
                    this.type = "indexedDB"
                }

                function Gh(a) {
                    return new u(function(b, c) {
                        var d = a.g.open("firebaseLocalStorageDb", 1);
                        d.onerror = function(a) {
                            try {
                                a.preventDefault()
                            } catch (g) {}
                            c(Error(a.target.error))
                        };
                        d.onupgradeneeded = function(a) {
                            a = a.target.result;
                            try {
                                a.createObjectStore("firebaseLocalStorage", {
                                    keyPath: "fbase_key"
                                })
                            } catch (g) {
                                c(g)
                            }
                        };
                        d.onsuccess = function(d) {
                            (d = d.target.result).objectStoreNames.contains("firebaseLocalStorage") ? b(d) : function(a) {
                                return new u(function(b, c) {
                                    var d = a.g.deleteDatabase("firebaseLocalStorageDb");
                                    d.onsuccess = function() {
                                        b()
                                    };
                                    d.onerror = function(a) {
                                        c(Error(a.target.error))
                                    }
                                })
                            }(a).then(function() {
                                return Gh(a)
                            }).then(function(a) {
                                b(a)
                            }).s(function(a) {
                                c(a)
                            })
                        }
                    })
                }

                function Mc(a) {
                    return a.h || (a.h = Gh(a)), a.h
                }

                function Fh() {
                    try {
                        return !!l.indexedDB
                    } catch (a) {
                        return !1
                    }
                }

                function $b(a) {
                    return a.objectStore("firebaseLocalStorage")
                }

                function ac(a, b) {
                    return a.transaction(["firebaseLocalStorage"], b ? "readwrite" : "readonly")
                }

                function ob(a) {
                    return new u(function(b, c) {
                        a.onsuccess = function(a) {
                            a && a.target ? b(a.target.result) : b()
                        };
                        a.onerror = function(a) {
                            c(Error(a.target.errorCode))
                        }
                    })
                }

                function Hh(a) {
                    var b = this,
                        c = null;
                    this.a = [];
                    this.type = "indexedDB";
                    this.c = a;
                    this.b = q().then(function() {
                        if (Fh()) {
                            var a = Na(),
                                e = "__sak" + a;
                            return le || (le = new Eh), (c = le).set(e, a).then(function() {
                                return c.get(e)
                            }).then(function(b) {
                                if (b !== a) throw Error("indexedDB not supported!");
                                return c.P(e)
                            }).then(function() {
                                return c
                            }).s(function() {
                                return b.c
                            })
                        }
                        return b.c
                    }).then(function(a) {
                        return b.type = a.type, a.Y(function(a) {
                            M(b.a, function(b) {
                                b(a)
                            })
                        }), a
                    })
                }

                function bc() {
                    this.a = {};
                    this.type = "inMemory"
                }

                function Nc() {
                    if (! function() {
                            var a = "Node" == ea();
                            if (!(a = Ih() || a && n.INTERNAL.node && n.INTERNAL.node.localStorage)) return !1;
                            try {
                                return a.setItem("__sak", "1"), a.removeItem("__sak"), !0
                            } catch (b) {
                                return !1
                            }
                        }()) {
                        if ("Node" == ea()) throw new k("internal-error", "The LocalStorage compatibility library was not found.");
                        throw new k("web-storage-unsupported");
                    }
                    this.a = Ih() || n.INTERNAL.node.localStorage;
                    this.type = "localStorage"
                }

                function Ih() {
                    try {
                        var a = l.localStorage,
                            b = Na();
                        return a && (a.setItem(b, "1"), a.removeItem(b)), a
                    } catch (c) {
                        return null
                    }
                }

                function me() {
                    this.type = "nullStorage"
                }

                function ne() {
                    if (! function() {
                            var a = "Node" == ea();
                            if (!(a = Jh() || a && n.INTERNAL.node && n.INTERNAL.node.sessionStorage)) return !1;
                            try {
                                return a.setItem("__sak", "1"), a.removeItem("__sak"), !0
                            } catch (b) {
                                return !1
                            }
                        }()) {
                        if ("Node" == ea()) throw new k("internal-error",
                            "The SessionStorage compatibility library was not found.");
                        throw new k("web-storage-unsupported");
                    }
                    this.a = Jh() || n.INTERNAL.node.sessionStorage;
                    this.type = "sessionStorage"
                }

                function Jh() {
                    try {
                        var a = l.sessionStorage,
                            b = Na();
                        return a && (a.setItem(b, "1"), a.removeItem(b)), a
                    } catch (c) {
                        return null
                    }
                }

                function Kh() {
                    var a = !(xg(E()) || !Dd()),
                        b = Mb(),
                        c = Ed();
                    this.o = a;
                    this.h = b;
                    this.m = c;
                    this.a = {};
                    oe || (oe = new function() {
                        var a = {};
                        a.Browser = Mj;
                        a.Node = Nj;
                        a.ReactNative = Oj;
                        a.Worker = Pj;
                        this.a = a[ea()]
                    });
                    a = oe;
                    try {
                        this.g = !zd() && zg() ||
                            !l.indexedDB ? new a.a.A : new Hh(pa() ? new bc : new a.a.A)
                    } catch (d) {
                        this.g = new bc, this.h = !0
                    }
                    try {
                        this.i = new a.a.Qa
                    } catch (d) {
                        this.i = new bc
                    }
                    this.l = new bc;
                    this.f = r(this.Lb, this);
                    this.b = {}
                }

                function cc() {
                    return pe || (pe = new Kh), pe
                }

                function Ta(a, b) {
                    switch (b) {
                        case "session":
                            return a.i;
                        case "none":
                            return a.l;
                        default:
                            return a.g
                    }
                }

                function pb(a, b) {
                    return "firebase:" + a.name + (b ? ":" + b : "")
                }

                function qb(a, b, c) {
                    return c = pb(b, c), "local" == b.A && (a.b[c] = null), Ta(a, b.A).P(c)
                }

                function qe(a) {
                    a.c && (clearInterval(a.c), a.c = null)
                }

                function Oc(a,
                    b) {
                    this.b = -1;
                    this.b = Lh;
                    this.f = l.Uint8Array ? new Uint8Array(this.b) : Array(this.b);
                    this.g = this.c = 0;
                    this.a = [];
                    this.i = a;
                    this.h = b;
                    this.m = l.Int32Array ? new Int32Array(64) : Array(64);
                    void 0 !== re || (re = l.Int32Array ? new Int32Array(Mh) : Mh);
                    this.reset()
                }

                function se(a) {
                    for (var b = a.f, c = a.m, d = 0, e = 0; e < b.length;) c[d++] = b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3], e = 4 * d;
                    for (b = 16; 64 > b; b++) {
                        e = 0 | c[b - 15];
                        d = 0 | c[b - 2];
                        var g = (0 | c[b - 16]) + ((e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3) | 0,
                            h = (0 | c[b - 7]) + ((d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10) | 0;
                        c[b] =
                            g + h | 0
                    }
                    d = 0 | a.a[0];
                    e = 0 | a.a[1];
                    var f = 0 | a.a[2],
                        k = 0 | a.a[3],
                        l = 0 | a.a[4],
                        m = 0 | a.a[5],
                        n = 0 | a.a[6];
                    g = 0 | a.a[7];
                    for (b = 0; 64 > b; b++) {
                        var p = ((d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10)) + (d & e ^ d & f ^ e & f) | 0;
                        h = (g + ((l >>> 6 | l << 26) ^ (l >>> 11 | l << 21) ^ (l >>> 25 | l << 7)) | 0) + ((h = (h = l & m ^ ~l & n) + (0 | re[b]) | 0) + (0 | c[b]) | 0) | 0;
                        g = n;
                        n = m;
                        m = l;
                        l = k + h | 0;
                        k = f;
                        f = e;
                        e = d;
                        d = h + p | 0
                    }
                    a.a[0] = a.a[0] + d | 0;
                    a.a[1] = a.a[1] + e | 0;
                    a.a[2] = a.a[2] + f | 0;
                    a.a[3] = a.a[3] + k | 0;
                    a.a[4] = a.a[4] + l | 0;
                    a.a[5] = a.a[5] + m | 0;
                    a.a[6] = a.a[6] + n | 0;
                    a.a[7] = a.a[7] + g | 0
                }

                function te(a, b, c) {
                    void 0 === c && (c = b.length);
                    var d = 0,
                        e = a.c;
                    if (x(b))
                        for (; d < c;) a.f[e++] = b.charCodeAt(d++), e == a.b && (se(a), e = 0);
                    else {
                        if (!yb(b)) throw Error("message must be string or array");
                        for (; d < c;) {
                            var g = b[d++];
                            if (!("number" == typeof g && 0 <= g && 255 >= g && g == (0 | g))) throw Error("message must be a byte array");
                            a.f[e++] = g;
                            e == a.b && (se(a), e = 0)
                        }
                    }
                    a.c = e;
                    a.g += c
                }

                function Nh() {
                    Oc.call(this, 8, Qj)
                }

                function Oh(a, b, c, d, e) {
                    this.l = a;
                    this.i = b;
                    this.m = c;
                    this.o = d || null;
                    this.u = e || null;
                    this.h = b + ":" + c;
                    this.v = new function() {
                        this.a = cc()
                    };
                    this.g = new function(a) {
                        this.a = a;
                        this.b =
                            cc()
                    }(this.h);
                    this.f = null;
                    this.b = [];
                    this.a = this.c = null
                }

                function Pc(a) {
                    return new k("invalid-cordova-configuration", a)
                }

                function Rj(a) {
                    var b = new Nh;
                    te(b, a);
                    a = [];
                    var c = 8 * b.g;
                    56 > b.c ? te(b, Ph, 56 - b.c) : te(b, Ph, b.b - (b.c - 56));
                    for (var d = 63; 56 <= d; d--) b.f[d] = 255 & c, c /= 256;
                    se(b);
                    for (d = c = 0; d < b.i; d++)
                        for (var e = 24; 0 <= e; e -= 8) a[c++] = b.a[d] >> e & 255;
                    return function(a) {
                        return ue(a, function(a) {
                            return 1 < (a = a.toString(16)).length ? a : "0" + a
                        }).join("")
                    }(a)
                }

                function Qh(a, b) {
                    for (var c = 0; c < a.b.length; c++) try {
                        a.b[c](b)
                    } catch (d) {}
                }

                function Rh(a) {
                    return a.f || (a.f = a.ga().then(function() {
                        return new u(function(b) {
                            a.va(function e(d) {
                                return b(d), a.Ka(e), !1
                            });
                            (function(a) {
                                function b(b) {
                                    h = !0;
                                    f && f.cancel();
                                    ve(a).then(function(e) {
                                        var g = d;
                                        if (e && b && b.url) {
                                            var h = null; - 1 != (g = Rg(b.url)).indexOf("/__/auth/callback") && (h = (h = "object" == typeof(h = hb(ua(h = oa(g), "firebaseError") || null)) ? Cg(h) : null) ? new ra(e.b, e.c, null, null, h) : new ra(e.b, e.c, g, e.g));
                                            g = h || d
                                        }
                                        Qh(a, g)
                                    })
                                }
                                var d = new ra("unknown", null, null, null, new k("no-auth-event")),
                                    h = !1,
                                    f = Ja(500).then(function() {
                                        return ve(a).then(function() {
                                            h ||
                                                Qh(a, d)
                                        })
                                    }),
                                    Y = l.handleOpenURL;
                                l.handleOpenURL = function(a) {
                                    if (0 == a.toLowerCase().indexOf(z("BuildInfo.packageName", l).toLowerCase() + "://") && b({
                                            url: a
                                        }), "function" == typeof Y) try {
                                        Y(a)
                                    } catch (Db) {
                                        console.error(Db)
                                    }
                                };
                                we || (we = new Sd);
                                we.subscribe(b)
                            })(a)
                        })
                    })), a.f
                }

                function ve(a) {
                    var b = null;
                    return function(a) {
                        return a.b.get(xe, a.a).then(function(a) {
                            return $g(a)
                        })
                    }(a.g).then(function(c) {
                        return b = c, qb((c = a.g).b, xe, c.a)
                    }).then(function() {
                        return b
                    })
                }

                function ye(a) {
                    return qb(a.b, ze, a.a)
                }

                function Aa(a, b, c) {
                    this.v =
                        a;
                    this.m = b;
                    this.l = c;
                    this.h = [];
                    this.f = !1;
                    this.i = r(this.o, this);
                    this.c = new Qc;
                    this.u = new Sh;
                    this.g = new function(a) {
                        this.a = a;
                        this.b = cc()
                    }(this.m + ":" + this.l);
                    this.b = {};
                    this.b.unknown = this.c;
                    this.b.signInViaRedirect = this.c;
                    this.b.linkViaRedirect = this.c;
                    this.b.reauthViaRedirect = this.c;
                    this.b.signInViaPopup = this.u;
                    this.b.linkViaPopup = this.u;
                    this.b.reauthViaPopup = this.u;
                    this.a = Th(this.v, this.m, this.l, Rc)
                }

                function Th(a, b, c, d) {
                    var e = n.SDK_VERSION || null;
                    return Cd() ? new Oh(a, b, c, e, d) : new zh(a, b, c, e, d)
                }

                function Uh(a) {
                    a.f ||
                        (a.f = !0, a.a.va(a.i));
                    var b = a.a;
                    return a.a.ga().s(function(c) {
                        throw a.a == b && a.reset(), c;
                    })
                }

                function Vh(a) {
                    a.a.Ib() && Uh(a).s(function(b) {
                        var c = new ra("unknown", null, null, null, new k("operation-not-supported-in-this-environment"));
                        Ae(b) && a.o(c)
                    });
                    a.a.Db() || Wh(a.c)
                }

                function Xh(a, b, c, d, e, g) {
                    return a.a.zb(b, c, d, function() {
                        a.f || (a.f = !0, a.a.va(a.i))
                    }, function() {
                        a.reset()
                    }, e, g)
                }

                function Ae(a) {
                    return !(!a || "auth/cordova-not-ready" != a.code)
                }

                function Yh(a, b, c) {
                    var d = b + ":" + c;
                    return Be[d] || (Be[d] = new Aa(a, b, c)),
                        Be[d]
                }

                function Qc() {
                    this.b = null;
                    this.f = [];
                    this.c = [];
                    this.a = null;
                    this.g = !1
                }

                function Wh(a) {
                    a.g || (a.g = !0, rb(a, !1, null, null))
                }

                function Zh(a, b) {
                    if (a.b = function() {
                            return q(b)
                        }, a.f.length)
                        for (var c = 0; c < a.f.length; c++) a.f[c](b)
                }

                function rb(a, b, c, d) {
                    b ? d ? function(a, b) {
                        if (a.b = function() {
                                return B(b)
                            }, a.c.length)
                            for (var c = 0; c < a.c.length; c++) a.c[c](b)
                    }(a, d) : Zh(a, c) : Zh(a, {
                        user: null
                    });
                    a.f = [];
                    a.c = []
                }

                function Sh() {}

                function $h() {
                    this.pb = !1;
                    Object.defineProperty(this, "appVerificationDisabled", {
                        get: function() {
                            return this.pb
                        },
                        set: function(a) {
                            this.pb = a
                        },
                        enumerable: !1
                    })
                }

                function Ce(a, b) {
                    this.a = b;
                    p(this, "verificationId", a)
                }

                function De(a, b, c, d) {
                    return (new ya(a)).Ta(b, c).then(function(a) {
                        return new Ce(a, d)
                    })
                }

                function Ee(a, b, c) {
                    if (this.h = a, this.i = b, this.g = c, this.c = 3E4, this.f = 96E4, this.b = null, this.a = this.c, this.f < this.c) throw Error("Proactive refresh lower bound greater than upper bound!");
                }

                function Fe(a) {
                    this.f = a;
                    this.b = this.a = null;
                    this.c = 0
                }

                function ai(a, b) {
                    var c = b[U],
                        d = b.refreshToken;
                    b = bi(b.expiresIn);
                    a.b = c;
                    a.c = b;
                    a.a = d
                }

                function bi(a) {
                    return nb() +
                        1E3 * parseInt(a, 10)
                }

                function Sj(a, b) {
                    return function(a, b) {
                        return new u(function(c, d) {
                            "refresh_token" == b.grant_type && b.refresh_token || "authorization_code" == b.grant_type && b.code ? ph(a, a.i + "?key=" + encodeURIComponent(a.b), function(a) {
                                a ? a.error ? d(he(a)) : a.access_token && a.refresh_token ? c(a) : d(new k("internal-error")) : d(new k("network-request-failed"))
                            }, "POST", bg(b).toString(), a.f, a.m.get()) : d(new k("internal-error"))
                        })
                    }(a.f, b).then(function(b) {
                        return a.b = b.access_token, a.c = bi(b.expires_in), a.a = b.refresh_token, {
                            accessToken: a.b,
                            expirationTime: a.c,
                            refreshToken: a.a
                        }
                    }).s(function(b) {
                        throw "auth/user-token-expired" == b.code && (a.a = null), b;
                    })
                }

                function Sc(a, b) {
                    this.a = a || null;
                    this.b = b || null;
                    N(this, {
                        lastSignInTime: Ob(b || null),
                        creationTime: Ob(a || null)
                    })
                }

                function dc(a, b) {
                    for (var c in S.call(this, a), b) this[c] = b[c]
                }

                function Q(a, b, c) {
                    this.G = [];
                    this.l = a.apiKey;
                    this.o = a.appName;
                    this.u = a.authDomain || null;
                    a = n.SDK_VERSION ? gb(n.SDK_VERSION) : null;
                    this.b = new ha(this.l, Yb(Rc), a);
                    this.h = new Fe(this.b);
                    Ge(this, b[U]);
                    ai(this.h, b);
                    p(this, "refreshToken", this.h.a);
                    ci(this, c || {});
                    J.call(this);
                    this.I = !1;
                    this.u && Oa() && (this.a = Yh(this.u, this.l, this.o));
                    this.N = [];
                    this.i = null;
                    this.w = function(a) {
                        return new Ee(function() {
                            return a.F(!0)
                        }, function(a) {
                            return !(!a || "auth/network-request-failed" != a.code)
                        }, function() {
                            var b = a.h.c - nb() - 3E5;
                            return 0 < b ? b : 0
                        })
                    }(this);
                    this.V = r(this.Ha, this);
                    var d = this;
                    this.ka = null;
                    this.sa = function(a) {
                        d.oa(a.g)
                    };
                    this.X = null;
                    this.O = [];
                    this.ra = function(a) {
                        ec(d, a.c)
                    };
                    this.W = null
                }

                function He(a, b) {
                    a.X && T(a.X, "languageCodeChanged",
                        a.sa);
                    (a.X = b) && ca(b, "languageCodeChanged", a.sa)
                }

                function ec(a, b) {
                    a.O = b;
                    oh(a.b, n.SDK_VERSION ? gb(n.SDK_VERSION, a.O) : null)
                }

                function Ie(a, b) {
                    a.W && T(a.W, "frameworkChanged", a.ra);
                    (a.W = b) && ca(b, "frameworkChanged", a.ra)
                }

                function di(a) {
                    try {
                        return n.app(a.o).auth()
                    } catch (b) {
                        throw new k("internal-error", "No firebase.auth.Auth instance is available for the Firebase App '" + a.o + "'!");
                    }
                }

                function ei(a) {
                    a.C || a.w.b || (a.w.start(), T(a, "tokenChanged", a.V), ca(a, "tokenChanged", a.V))
                }

                function Je(a) {
                    T(a, "tokenChanged", a.V);
                    a.w.stop()
                }

                function Ge(a, b) {
                    a.qa = b;
                    p(a, "_lat", b)
                }

                function Ua(a) {
                    for (var b = [], c = 0; c < a.N.length; c++) b.push(a.N[c](a));
                    return function(a) {
                        return new u(function(b) {
                            var c = a.length,
                                d = [];
                            if (c)
                                for (var e = function(a, e, g) {
                                        c--;
                                        d[a] = e ? {
                                            Zb: !0,
                                            value: g
                                        } : {
                                            Zb: !1,
                                            reason: g
                                        };
                                        0 == c && b(d)
                                    }, f = 0; f < a.length; f++) zf(a[f], jc(e, f, !0), jc(e, f, !1));
                            else b(d)
                        })
                    }(b).then(function() {
                        return a
                    })
                }

                function fc(a) {
                    a.a && !a.I && (a.I = !0, a.a.subscribe(a))
                }

                function ci(a, b) {
                    N(a, {
                        uid: b.uid,
                        displayName: b.displayName || null,
                        photoURL: b.photoURL || null,
                        email: b.email || null,
                        emailVerified: b.emailVerified || !1,
                        phoneNumber: b.phoneNumber || null,
                        isAnonymous: b.isAnonymous || !1,
                        metadata: new Sc(b.createdAt, b.lastLoginAt),
                        providerData: []
                    })
                }

                function fi() {}

                function Ke(a) {
                    return q().then(function() {
                        if (a.C) throw new k("app-deleted");
                    })
                }

                function Le(a) {
                    return ue(a.providerData, function(a) {
                        return a.providerId
                    })
                }

                function Me(a, b) {
                    b && (gi(a, b.providerId), a.providerData.push(b))
                }

                function gi(a, b) {
                    X(a.providerData, function(a) {
                        return a.providerId == b
                    })
                }

                function Ba(a, b, c) {
                    ("uid" !=
                        b || c) && a.hasOwnProperty(b) && p(a, b, c)
                }

                function Tc(a, b) {
                    a != b && (N(a, {
                        uid: b.uid,
                        displayName: b.displayName,
                        photoURL: b.photoURL,
                        email: b.email,
                        emailVerified: b.emailVerified,
                        phoneNumber: b.phoneNumber,
                        isAnonymous: b.isAnonymous,
                        providerData: []
                    }), b.metadata ? p(a, "metadata", function(a) {
                        return new Sc(a.a, a.b)
                    }(b.metadata)) : p(a, "metadata", new Sc), M(b.providerData, function(b) {
                        Me(a, b)
                    }), function(a, b) {
                        a.b = b.b;
                        a.a = b.a;
                        a.c = b.c
                    }(a.h, b.h), p(a, "refreshToken", a.h.a))
                }

                function Ne(a) {
                    return a.F().then(function(b) {
                        var c = a.isAnonymous;
                        return function(a, b) {
                            return w(a.b, Tj, {
                                idToken: b
                            }).then(r(a.uc, a))
                        }(a, b).then(function() {
                            return c || Ba(a, "isAnonymous", !1), b
                        })
                    })
                }

                function Va(a, b) {
                    b[U] && a.qa != b[U] && (ai(a.h, b), a.dispatchEvent(new dc("tokenChanged")), Ge(a, b[U]), Ba(a, "refreshToken", a.h.a))
                }

                function Uc(a, b) {
                    return Ne(a).then(function() {
                        if (Ea(Le(a), b)) return Ua(a).then(function() {
                            throw new k("provider-already-linked");
                        })
                    })
                }

                function Vc(a, b, c) {
                    return qa({
                        user: a,
                        credential: zc(b),
                        additionalUserInfo: Md(b),
                        operationType: c
                    })
                }

                function hi(a, b) {
                    return Va(a,
                        b), a.reload().then(function() {
                        return a
                    })
                }

                function ii(a, b, c, d, e) {
                    if (!Oa()) return B(new k("operation-not-supported-in-this-environment"));
                    if (a.i && !e) return B(a.i);
                    var g = Kd(c.providerId),
                        h = Na(a.uid + ":::"),
                        f = null;
                    (!Mb() || Dd()) && a.u && c.isOAuthProvider && (f = Zb(a.u, a.l, a.o, b, c, null, h, n.SDK_VERSION || null));
                    var l = sg(f, g && g.Ba, g && g.Aa);
                    return d = d().then(function() {
                        if (ji(a), !e) return a.F().then(function() {})
                    }).then(function() {
                        return Xh(a.a, l, b, c, h, !!f)
                    }).then(function() {
                        return new u(function(c, d) {
                            a.ha(b, null,
                                new k("cancelled-popup-request"), a.g || null);
                            a.f = c;
                            a.v = d;
                            a.g = h;
                            a.c = a.a.Ea(a, b, l, h)
                        })
                    }).then(function(a) {
                        return l && Ma(l), a ? qa(a) : null
                    }).s(function(a) {
                        throw l && Ma(l), a;
                    }), F(a, d, e)
                }

                function ki(a, b, c, d, e) {
                    if (!Oa()) return B(new k("operation-not-supported-in-this-environment"));
                    if (a.i && !e) return B(a.i);
                    var g = null,
                        h = Na(a.uid + ":::");
                    return d = d().then(function() {
                        if (ji(a), !e) return a.F().then(function() {})
                    }).then(function() {
                        return a.aa = h, Ua(a)
                    }).then(function(b) {
                        return a.ba && (b = (b = a.ba).b.set(Oe, a.D(), b.a)),
                            b
                    }).then(function() {
                        return a.a.Ca(b, c, h)
                    }).s(function(b) {
                        if (g = b, a.ba) return li(a.ba);
                        throw g;
                    }).then(function() {
                        if (g) throw g;
                    }), F(a, d, e)
                }

                function ji(a) {
                    if (!a.a || !a.I) {
                        if (a.a && !a.I) throw new k("internal-error");
                        throw new k("auth-domain-config-required");
                    }
                }

                function F(a, b, c) {
                    var d = function(a, b, c) {
                        return a.i && !c ? (b.cancel(), B(a.i)) : b.s(function(b) {
                            throw !b || "auth/user-disabled" != b.code && "auth/user-token-expired" != b.code || (a.i || a.dispatchEvent(new dc("userInvalidated")), a.i = b), b;
                        })
                    }(a, b, c);
                    return a.G.push(d),
                        d.ia(function() {
                            kc(a.G, d)
                        }), d
                }

                function mi(a) {
                    if (!a.apiKey) return null;
                    var b = {
                            apiKey: a.apiKey,
                            authDomain: a.authDomain,
                            appName: a.appName
                        },
                        c = {};
                    if (!(a.stsTokenManager && a.stsTokenManager.accessToken && a.stsTokenManager.expirationTime)) return null;
                    c[U] = a.stsTokenManager.accessToken;
                    c.refreshToken = a.stsTokenManager.refreshToken || null;
                    c.expiresIn = (a.stsTokenManager.expirationTime - nb()) / 1E3;
                    var d = new Q(b, c, a);
                    return a.providerData && M(a.providerData, function(a) {
                            a && Me(d, qa(a))
                        }), a.redirectEventId && (d.aa = a.redirectEventId),
                        d
                }

                function li(a) {
                    return qb(a.b, Oe, a.a)
                }

                function Pe(a) {
                    this.a = a;
                    this.b = cc();
                    this.c = null;
                    this.f = function(a) {
                        var b = ja("local"),
                            d = ja("session"),
                            e = ja("none");
                        return function(a, b, c) {
                            var d = pb(b, c),
                                e = Ta(a, b.A);
                            return a.get(b, c).then(function(g) {
                                var h = null;
                                try {
                                    h = hb(l.localStorage.getItem(d))
                                } catch (vf) {}
                                if (h && !g) return l.localStorage.removeItem(d), a.set(b, h, c);
                                h && g && "localStorage" != e.type && l.localStorage.removeItem(d)
                            })
                        }(a.b, b, a.a).then(function() {
                            return a.b.get(d, a.a)
                        }).then(function(c) {
                            return c ? d : a.b.get(e,
                                a.a).then(function(c) {
                                return c ? e : a.b.get(b, a.a).then(function(c) {
                                    return c ? b : a.b.get(Qe, a.a).then(function(a) {
                                        return a ? ja(a) : b
                                    })
                                })
                            })
                        }).then(function(b) {
                            return a.c = b, Re(a, b.A)
                        }).s(function() {
                            a.c || (a.c = b)
                        })
                    }(this);
                    this.b.addListener(ja("local"), this.a, r(this.g, this))
                }

                function Re(a, b) {
                    var c, d = [];
                    for (c in sb) sb[c] !== b && d.push(qb(a.b, ja(sb[c]), a.a));
                    return d.push(qb(a.b, Qe, a.a)),
                        function(a) {
                            return new u(function(b, c) {
                                var d = a.length,
                                    e = [];
                                if (d)
                                    for (var g = function(a, c) {
                                                d--;
                                                e[a] = c;
                                                0 == d && b(e)
                                            }, h = function(a) {
                                                c(a)
                                            },
                                            f = 0; f < a.length; f++) zf(a[f], jc(g, f), h);
                                else b(e)
                            })
                        }(d)
                }

                function ja(a) {
                    return {
                        name: "authUser",
                        A: a
                    }
                }

                function ni(a, b) {
                    return tb(a, function() {
                        return a.b.set(a.c, b.D(), a.a)
                    })
                }

                function oi(a) {
                    return tb(a, function() {
                        return qb(a.b, a.c, a.a)
                    })
                }

                function pi(a, b) {
                    return tb(a, function() {
                        return a.b.get(a.c, a.a).then(function(a) {
                            return a && b && (a.authDomain = b), mi(a || {})
                        })
                    })
                }

                function tb(a, b) {
                    return a.f = a.f.then(b, b), a.f
                }

                function aa(a) {
                    if (this.l = !1, p(this, "settings", new $h), p(this, "app", a), !this.app.options || !this.app.options.apiKey) throw new k("invalid-api-key");
                    a = n.SDK_VERSION ? gb(n.SDK_VERSION) : null;
                    this.b = new ha(this.app.options && this.app.options.apiKey, Yb(Rc), a);
                    this.N = [];
                    this.o = [];
                    this.I = [];
                    this.Pb = n.INTERNAL.createSubscribe(r(this.ic, this));
                    this.O = void 0;
                    this.Qb = n.INTERNAL.createSubscribe(r(this.jc, this));
                    ub(this, null);
                    this.h = new Pe(this.app.options.apiKey + ":" + this.app.name);
                    this.w = new function(a) {
                        this.a = a;
                        this.b = cc()
                    }(this.app.options.apiKey + ":" + this.app.name);
                    this.V = A(this, function(a) {
                        var b = a.app.options.authDomain,
                            d = function(a) {
                                var b = function(a, b) {
                                    return a.b.get(Oe,
                                        a.a).then(function(a) {
                                        return a && b && (a.authDomain = b), mi(a || {})
                                    })
                                }(a.w, a.app.options.authDomain).then(function(b) {
                                    return (a.C = b) && (b.ba = a.w), li(a.w)
                                });
                                return A(a, b)
                            }(a).then(function() {
                                return pi(a.h, b)
                            }).then(function(b) {
                                return b ? (b.ba = a.w, a.C && (a.C.aa || null) == (b.aa || null) ? b : b.reload().then(function() {
                                    return ni(a.h, b).then(function() {
                                        return b
                                    })
                                }).s(function(c) {
                                    return "auth/network-request-failed" == c.code ? b : oi(a.h)
                                })) : null
                            }).then(function(b) {
                                ub(a, b || null)
                            });
                        return A(a, d)
                    }(this));
                    this.i = A(this, function(a) {
                        return a.V.then(function() {
                            return a.fa()
                        }).s(function() {}).then(function() {
                            if (!a.l) return a.ka()
                        }).s(function() {}).then(function() {
                            if (!a.l) {
                                a.X = !0;
                                var b = a.h;
                                b.b.addListener(ja("local"), b.a, a.ka)
                            }
                        })
                    }(this));
                    this.X = !1;
                    this.ka = r(this.Jc, this);
                    this.Ha = r(this.Z, this);
                    this.qa = r(this.Yb, this);
                    this.ra = r(this.gc, this);
                    this.sa = r(this.hc, this);
                    (function(a) {
                        var b = a.app.options.authDomain,
                            d = a.app.options.apiKey;
                        b && Oa() && (a.Ob = a.V.then(function() {
                            if (!a.l) {
                                if (a.a = Yh(b, d, a.app.name), a.a.subscribe(a), a.currentUser && fc(a.currentUser), a.C) {
                                    fc(a.C);
                                    var c = a.C;
                                    c.oa(a.ea());
                                    He(c, a);
                                    ec(c = a.C, a.G);
                                    Ie(c, a);
                                    a.C = null
                                }
                                return a.a
                            }
                        }))
                    })(this);
                    this.INTERNAL = {};
                    this.INTERNAL["delete"] =
                        r(this["delete"], this);
                    this.INTERNAL.logFramework = r(this.qc, this);
                    this.u = 0;
                    J.call(this);
                    (function(a) {
                        Object.defineProperty(a, "lc", {
                            get: function() {
                                return this.ea()
                            },
                            set: function(a) {
                                this.oa(a)
                            },
                            enumerable: !1
                        });
                        a.W = null
                    })(this);
                    this.G = []
                }

                function qi(a) {
                    S.call(this, "languageCodeChanged");
                    this.g = a
                }

                function ri(a) {
                    S.call(this, "frameworkChanged");
                    this.c = a
                }

                function Se(a) {
                    return a.Ob || B(new k("auth-domain-config-required"))
                }

                function si(a, b) {
                    var c = {};
                    return c.apiKey = a.app.options.apiKey, c.authDomain = a.app.options.authDomain,
                        c.appName = a.app.name, a.V.then(function() {
                            return function(a, b, c, h) {
                                var d = new Q(a, b);
                                return c && (d.ba = c), h && ec(d, h), d.reload().then(function() {
                                    return d
                                })
                            }(c, b, a.w, a.xa())
                        }).then(function(b) {
                            return a.currentUser && b.uid == a.currentUser.uid ? (Tc(a.currentUser, b), a.Z(b)) : (ub(a, b), fc(b), a.Z(b))
                        }).then(function() {
                            gc(a)
                        })
                }

                function ub(a, b) {
                    a.currentUser && (function(a, b) {
                        X(a.N, function(a) {
                            return a == b
                        })
                    }(a.currentUser, a.Ha), T(a.currentUser, "tokenChanged", a.qa), T(a.currentUser, "userDeleted", a.ra), T(a.currentUser,
                        "userInvalidated", a.sa), Je(a.currentUser));
                    b && (b.N.push(a.Ha), ca(b, "tokenChanged", a.qa), ca(b, "userDeleted", a.ra), ca(b, "userInvalidated", a.sa), 0 < a.u && ei(b));
                    p(a, "currentUser", b);
                    b && (b.oa(a.ea()), He(b, a), ec(b, a.G), Ie(b, a))
                }

                function hc(a, b) {
                    var c = null,
                        d = null;
                    return A(a, b.then(function(b) {
                        return c = zc(b), d = Md(b), si(a, b)
                    }).then(function() {
                        return qa({
                            user: a.currentUser,
                            credential: c,
                            additionalUserInfo: d,
                            operationType: "signIn"
                        })
                    }))
                }

                function Wc(a) {
                    return a.currentUser && a.currentUser._lat || null
                }

                function gc(a) {
                    if (a.X) {
                        for (var b =
                                0; b < a.o.length; b++) a.o[b] && a.o[b](Wc(a));
                        if (a.O !== a.getUid() && a.I.length)
                            for (a.O = a.getUid(), b = 0; b < a.I.length; b++) a.I[b] && a.I[b](Wc(a))
                    }
                }

                function A(a, b) {
                    return a.N.push(b), b.ia(function() {
                        kc(a.N, b)
                    }), b
                }

                function ic() {}

                function vb() {
                    this.a = {};
                    this.b = 1E12
                }

                function Te(a, b) {
                    return (b = ti(b)) && a.a[b] || null
                }

                function ti(a) {
                    return (a = void 0 === a ? 1E12 : a) ? a.toString() : null
                }

                function Xc(a, b) {
                    this.g = !1;
                    this.c = b;
                    this.a = this.b = null;
                    this.h = "invisible" !== this.c.size;
                    this.f = Jb(a);
                    var c = this;
                    this.i = function() {
                        c.execute()
                    };
                    this.h ? this.execute() : ca(this.f, "click", this.i)
                }

                function Ue(a) {
                    if (a.g) throw Error("reCAPTCHA mock was already deleted!");
                }

                function Ve() {}

                function We() {
                    this.b = l.grecaptcha ? 1 / 0 : 0;
                    this.f = null;
                    this.a = "__rcb" + Math.floor(1E6 * Math.random()).toString()
                }

                function Xe(a, b, c, d, e, g, h) {
                    if (p(this, "type", "recaptcha"), this.c = this.f = null, this.C = !1, this.l = b, this.g = null, h ? (Ye || (Ye = new Ve), h = Ye) : (Ze || (Ze = new We), h = Ze), this.o = h, this.a = c || {
                            theme: "light",
                            type: "image"
                        }, this.h = [], this.a[ui]) throw new k("argument-error", "sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");
                    if (this.i = "invisible" === this.a[Uj], !l.document) throw new k("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.");
                    if (!Jb(b) || !this.i && Jb(b).hasChildNodes()) throw new k("argument-error", "reCAPTCHA container is either not found or already contains inner elements!");
                    this.u = new ha(a, g || null, e || null);
                    this.v = d || function() {
                        return null
                    };
                    var f = this;
                    this.m = [];
                    var Y = this.a[vi];
                    this.a[vi] = function(a) {
                        if (wi(f, a), "function" == typeof Y) Y(a);
                        else if ("string" == typeof Y) {
                            var b = z(Y, l);
                            "function" == typeof b && b(a)
                        }
                    };
                    var la = this.a[xi];
                    this.a[xi] = function() {
                        if (wi(f, null), "function" == typeof la) la();
                        else if ("string" == typeof la) {
                            var a = z(la, l);
                            "function" == typeof a && a()
                        }
                    }
                }

                function wi(a, b) {
                    for (var c = 0; c < a.m.length; c++) try {
                        a.m[c](b)
                    } catch (d) {}
                }

                function $e(a, b) {
                    return a.h.push(b), b.ia(function() {
                        kc(a.h, b)
                    }), b
                }

                function Yc(a) {
                    if (a.C) throw new k("internal-error", "RecaptchaVerifier instance has been destroyed.");
                }

                function af(a, b, c) {
                    var d = !1;
                    try {
                        this.b = c ||
                            n.app()
                    } catch (h) {
                        throw new k("argument-error", "No firebase.app.App instance is currently initialized.");
                    }
                    if (!this.b.options || !this.b.options.apiKey) throw new k("invalid-api-key");
                    c = this.b.options.apiKey;
                    var e = this,
                        g = null;
                    try {
                        g = this.b.auth().xa()
                    } catch (h) {}
                    try {
                        d = this.b.auth().settings.appVerificationDisabledForTesting
                    } catch (h) {}
                    g = n.SDK_VERSION ? gb(n.SDK_VERSION, g) : null;
                    Xe.call(this, c, a, b, function() {
                        try {
                            var a = e.b.auth().ea()
                        } catch (v) {
                            a = null
                        }
                        return a
                    }, g, Yb(Rc), d)
                }

                function yi(a, b, c, d) {
                    a: {
                        c = Array.prototype.slice.call(c);
                        for (var e = 0, g = !1, h = 0; h < b.length; h++)
                            if (b[h].optional) g = !0;
                            else {
                                if (g) throw new k("internal-error", "Argument validator encountered a required argument after an optional argument.");
                                e++
                            } if (g = b.length, c.length < e || g < c.length) d = "Expected " + (e == g ? 1 == e ? "1 argument" : e + " arguments" : e + "-" + g + " arguments") + " but got " + c.length + ".";
                        else {
                            for (e = 0; e < c.length; e++)
                                if (g = b[e].optional && void 0 === c[e], !b[e].M(c[e]) && !g) {
                                    if (b = b[e], 0 > e || e >= zi.length) throw new k("internal-error", "Argument validator received an unsupported number of arguments.");
                                    c = zi[e];
                                    d = (d ? "" : c + " argument ") + (b.name ? '"' + b.name + '" ' : "") + "must be " + b.K + ".";
                                    break a
                                } d = null
                        }
                    }
                    if (d) throw new k("argument-error", a + " failed: " + d);
                }

                function m(a, b) {
                    return {
                        name: a || "",
                        K: "a valid string",
                        optional: !!b,
                        M: x
                    }
                }

                function bf(a, b) {
                    return {
                        name: a || "",
                        K: "a boolean",
                        optional: !!b,
                        M: Mi
                    }
                }

                function G(a, b) {
                    return {
                        name: a || "",
                        K: "a valid object",
                        optional: !!b,
                        M: R
                    }
                }

                function wb(a, b) {
                    return {
                        name: a || "",
                        K: "a function",
                        optional: !!b,
                        M: I
                    }
                }

                function Ca(a, b) {
                    return {
                        name: a || "",
                        K: "null",
                        optional: !!b,
                        M: Ni
                    }
                }

                function Wa(a) {
                    return {
                        name: a ?
                            a + "Credential" : "credential",
                        K: a ? "a valid " + a + " credential" : "a valid credential",
                        optional: !1,
                        M: function(b) {
                            if (!b) return !1;
                            var c = !a || b.providerId === a;
                            return !(!b.ya || !c)
                        }
                    }
                }

                function Zc() {
                    return {
                        name: "applicationVerifier",
                        K: "an implementation of firebase.auth.ApplicationVerifier",
                        optional: !1,
                        M: function(a) {
                            return !!(a && x(a.type) && I(a.verify))
                        }
                    }
                }

                function K(a, b, c, d) {
                    return {
                        name: c || "",
                        K: a.K + " or " + b.K,
                        optional: !!d,
                        M: function(c) {
                            return a.M(c) || b.M(c)
                        }
                    }
                }

                function H(a, b) {
                    for (var c in b) {
                        var d = b[c].name;
                        a[d] = Ai(d,
                            a[c], b[c].j)
                    }
                }

                function Bi(a, b) {
                    for (var c in b) {
                        var d = b[c].name;
                        if (d !== c) {
                            var e = b[c].qb;
                            Object.defineProperty(a, d, {
                                get: function() {
                                    return this[c]
                                },
                                set: function(a) {
                                    yi(d, [e], [a], !0);
                                    this[c] = a
                                },
                                enumerable: !0
                            })
                        }
                    }
                }

                function L(a, b, c, d) {
                    a[b] = Ai(b, c, d)
                }

                function Ai(a, b, c) {
                    function d() {
                        var a = Array.prototype.slice.call(arguments);
                        return yi(g, c, a), b.apply(this, a)
                    }
                    if (!c) return b;
                    var e, g = function(a) {
                        return (a = a.split("."))[a.length - 1]
                    }(a);
                    for (e in b) d[e] = b[e];
                    for (e in b.prototype) d.prototype[e] = b.prototype[e];
                    return d
                }
                var f, $d = $d || {},
                    l = this,
                    oc = "closure_uid_" + (1E9 * Math.random() >>> 0),
                    If = 0,
                    nb = Date.now || function() {
                        return +new Date
                    };
                t(O, Error);
                O.prototype.name = "CustomError";
                t($c, O);
                $c.prototype.name = "AssertionError";
                ad.prototype.get = function() {
                    if (0 < this.b) {
                        this.b--;
                        var a = this.a;
                        this.a = a.next;
                        a.next = null
                    } else a = this.c();
                    return a
                };
                var wf = new ad(function() {
                    return new bd
                }, function(a) {
                    a.reset()
                });
                nf.prototype.add = function(a, b) {
                    var c = wf.get();
                    c.set(a, b);
                    this.b ? this.b.next = c : this.a = c;
                    this.b = c
                };
                bd.prototype.set = function(a, b) {
                    this.a =
                        a;
                    this.b = b;
                    this.next = null
                };
                bd.prototype.reset = function() {
                    this.next = this.b = this.a = null
                };
                var pf = Array.prototype.indexOf ? function(a, b) {
                        return Array.prototype.indexOf.call(a, b, void 0)
                    } : function(a, b) {
                        if (x(a)) return x(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
                        for (var c = 0; c < a.length; c++)
                            if (c in a && a[c] === b) return c;
                        return -1
                    },
                    M = Array.prototype.forEach ? function(a, b, c) {
                        Array.prototype.forEach.call(a, b, c)
                    } : function(a, b, c) {
                        for (var d = a.length, e = x(a) ? a.split("") : a, g = 0; g < d; g++) g in e && b.call(c, e[g], g, a)
                    },
                    ue = Array.prototype.map ?
                    function(a, b) {
                        return Array.prototype.map.call(a, b, void 0)
                    } : function(a, b) {
                        for (var c = a.length, d = Array(c), e = x(a) ? a.split("") : a, g = 0; g < c; g++) g in e && (d[g] = b.call(void 0, e[g], g, a));
                        return d
                    },
                    tj = Array.prototype.some ? function(a, b) {
                        return Array.prototype.some.call(a, b, void 0)
                    } : function(a, b) {
                        for (var c = a.length, d = x(a) ? a.split("") : a, e = 0; e < c; e++)
                            if (e in d && b.call(void 0, d[e], e, a)) return !0;
                        return !1
                    },
                    Mf = String.prototype.trim ? function(a) {
                        return a.trim()
                    } : function(a) {
                        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
                    },
                    Si = /&/g,
                    Ti = /</g,
                    Ui = />/g,
                    Vi = /"/g,
                    Wi = /'/g,
                    Xi = /\x00/g,
                    Ri = /[\x00&<>"']/;
                a: {
                    var Ci = l.navigator;
                    if (Ci) {
                        var Di = Ci.userAgent;
                        if (Di) {
                            var Ab = Di;
                            break a
                        }
                    }
                    Ab = ""
                }
                var fd, mc, sf = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
                    gd = !1,
                    of = new nf,
                    Ga = 0,
                    Eb = 2,
                    ma = 3;
                xf.prototype.reset = function() {
                    this.f = this.b = this.g = this.a = null;
                    this.c = !1
                };
                var yf = new ad(function() {
                    return new xf
                }, function(a) {
                    a.reset()
                });
                u.prototype.then = function(a, b, c) {
                    return Cf(this, I(a) ? a : null, I(b) ?
                        b : null, c)
                };
                kf(u);
                (f = u.prototype).ia = function(a, b) {
                    return (a = hd(a, a, b)).c = !0, id(this, a), this
                };
                f.s = function(a, b) {
                    return Cf(this, null, a, b)
                };
                f.cancel = function(a) {
                    this.a == Ga && lc(function() {
                        ! function e(a, d) {
                            if (a.a == Ga)
                                if (a.c) {
                                    var c = a.c;
                                    if (c.b) {
                                        for (var h = 0, f = null, k = null, l = c.b; l && (l.c || (h++, l.a == a && (f = l), !(f && 1 < h))); l = l.next) f || (k = l);
                                        f && (c.a == Ga && 1 == h ? e(c, d) : (k ? ((h = k).next == c.f && (c.f = h), h.next = h.next.next) : Ef(c), Ff(c, f, ma, d)))
                                    }
                                    a.c = null
                                } else Ha(a, ma, d)
                        }(this, new Ya(a))
                    }, this)
                };
                f.Lc = function(a) {
                    this.a = Ga;
                    Ha(this,
                        Eb, a)
                };
                f.Mc = function(a) {
                    this.a = Ga;
                    Ha(this, ma, a)
                };
                f.Ub = function() {
                    for (var a; a = Ef(this);) Ff(this, a, this.a, this.i);
                    this.h = !1
                };
                var Df = tf;
                t(Ya, O);
                Ya.prototype.name = "cancel";
                var jd = 0,
                    Hf = {};
                nc.prototype.pa = !1;
                nc.prototype.ua = function() {
                    if (this.ja)
                        for (; this.ja.length;) this.ja.shift()()
                };
                kd[" "] = ba;
                var xb, Vj = D("Opera"),
                    Z = D("Trident") || D("MSIE"),
                    Ei = D("Edge"),
                    jj = Ei || Z,
                    Nf = D("Gecko") && !(y(Ab.toLowerCase(), "webkit") && !D("Edge")) && !(D("Trident") || D("MSIE")) && !D("Edge"),
                    Wj = y(Ab.toLowerCase(), "webkit") && !D("Edge");
                a: {
                    var cf = "",
                        df = (xb = Ab, Nf ? /rv:([^\);]+)(\)|;)/.exec(xb) : Ei ? /Edge\/([\d\.]+)/.exec(xb) : Z ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(xb) : Wj ? /WebKit\/(\S+)/.exec(xb) : Vj ? /(?:Version)[ \/]?(\S+)/.exec(xb) : void 0);
                    if (df && (cf = df ? df[1] : ""), Z) {
                        var ef = Kf();
                        if (null != ef && ef > parseFloat(cf)) {
                            var ld = String(ef);
                            break a
                        }
                    }
                    ld = cf
                }
                var Yi = {},
                    Fi = l.document;
                var va = Fi && Z ? Kf() || ("CSS1Compat" == Fi.compatMode ? parseInt(ld, 10) : 5) : void 0;
                var Xj = Object.freeze || function(a) {
                        return a
                    },
                    Qf = !Z || 9 <= Number(va),
                    Yj = Z && !Lf("9"),
                    aj = function() {
                        if (!l.addEventListener ||
                            !Object.defineProperty) return !1;
                        var a = !1,
                            b = Object.defineProperty({}, "passive", {
                                get: function() {
                                    a = !0
                                }
                            });
                        return l.addEventListener("test", ba, b), l.removeEventListener("test", ba, b), a
                    }();
                S.prototype.preventDefault = function() {
                    this.Gb = !1
                };
                t(Ia, S);
                var Zi = Xj({
                    2: "touch",
                    3: "pen",
                    4: "mouse"
                });
                Ia.prototype.preventDefault = function() {
                    Ia.lb.preventDefault.call(this);
                    var a = this.a;
                    if (a.preventDefault) a.preventDefault();
                    else if (a.returnValue = !1, Yj) try {
                        (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) && (a.keyCode = -1)
                    } catch (b) {}
                };
                Ia.prototype.f = function() {
                    return this.a
                };
                var Fb = "closure_listenable_" + (1E6 * Math.random() | 0),
                    Zj = 0;
                qc.prototype.add = function(a, b, c, d, e) {
                    var g = a.toString();
                    (a = this.a[g]) || (a = this.a[g] = [], this.b++);
                    var h = nd(a, b, d, e);
                    return -1 < h ? (b = a[h], c || (b.Ia = !1)) : ((b = new function(a, b, c, d, e) {
                        this.listener = a;
                        this.proxy = null;
                        this.src = b;
                        this.type = c;
                        this.capture = !!d;
                        this.La = e;
                        this.key = ++Zj;
                        this.na = this.Ia = !1
                    }(b, this.src, g, !!d, e)).Ia = c, a.push(b)), b
                };
                var qd = "closure_lm_" + (1E6 * Math.random() | 0),
                    sd = {},
                    td = "__closure_events_fn_" +
                    (1E9 * Math.random() >>> 0);
                t(J, nc);
                J.prototype[Fb] = !0;
                J.prototype.addEventListener = function(a, b, c, d) {
                    ca(this, a, b, c, d)
                };
                J.prototype.removeEventListener = function(a, b, c, d) {
                    T(this, a, b, c, d)
                };
                J.prototype.dispatchEvent = function(a) {
                    var b, c = this.Ua;
                    if (c)
                        for (b = []; c; c = c.Ua) b.push(c);
                    c = this.Nb;
                    var d = a.type || a;
                    if (x(a)) a = new S(a, c);
                    else if (a instanceof S) a.target = a.target || c;
                    else {
                        var e = a;
                        ka(a = new S(d, c), e)
                    }
                    if (e = !0, b)
                        for (var g = b.length - 1; 0 <= g; g--) {
                            var h = a.b = b[g];
                            e = sc(h, d, !0, a) && e
                        }
                    if (e = sc(h = a.b = c, d, !0, a) && e, e = sc(h,
                            d, !1, a) && e, b)
                        for (g = 0; g < b.length; g++) e = sc(a.b = b[g], d, !1, a) && e;
                    return e
                };
                J.prototype.ua = function() {
                    if (J.lb.ua.call(this), this.m) {
                        var a, b = this.m;
                        for (a in b.a) {
                            for (var c = b.a[a], d = 0; d < c.length; d++) pc(c[d]);
                            delete b.a[a];
                            b.b--
                        }
                    }
                    this.Ua = null
                };
                (f = Za.prototype).S = function() {
                    vd(this);
                    for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
                    return a
                };
                f.U = function() {
                    return vd(this), this.a.concat()
                };
                f.clear = function() {
                    this.b = {};
                    this.c = this.a.length = 0
                };
                f.get = function(a, b) {
                    return Ka(this.b, a) ? this.b[a] : b
                };
                f.set = function(a, b) {
                    Ka(this.b, a) || (this.c++, this.a.push(a));
                    this.b[a] = b
                };
                f.forEach = function(a, b) {
                    for (var c = this.U(), d = 0; d < c.length; d++) {
                        var e = c[d],
                            g = this.get(e);
                        a.call(b, g, e, this)
                    }
                };
                var Zf = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
                $a.prototype.toString = function() {
                    var a = [],
                        b = this.c;
                    b && a.push(Hb(b, Gi, !0), ":");
                    var c = this.b;
                    return (c || "file" == b) && (a.push("//"), (b = this.m) && a.push(Hb(b, Gi, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,
                        "%$1")), null != (c = this.i) && a.push(":", String(c))), (c = this.g) && (this.b && "/" != c.charAt(0) && a.push("/"), a.push(Hb(c, "/" == c.charAt(0) ? ak : bk, !0))), (c = this.a.toString()) && a.push("?", c), (c = this.h) && a.push("#", Hb(c, ck)), a.join("")
                };
                var Gi = /[#\/\?@]/g,
                    bk = /[#\?:]/g,
                    ak = /[#\?]/g,
                    bj = /[#\?@]/g,
                    ck = /#/g;
                (f = ab.prototype).add = function(a, b) {
                    ta(this);
                    this.c = null;
                    a = bb(this, a);
                    var c = this.a.get(a);
                    return c || this.a.set(a, c = []), c.push(b), this.b += 1, this
                };
                f.clear = function() {
                    this.a = this.c = null;
                    this.b = 0
                };
                f.forEach = function(a,
                    b) {
                    ta(this);
                    this.a.forEach(function(c, d) {
                        M(c, function(c) {
                            a.call(b, c, d, this)
                        }, this)
                    }, this)
                };
                f.U = function() {
                    ta(this);
                    for (var a = this.a.S(), b = this.a.U(), c = [], d = 0; d < b.length; d++)
                        for (var e = a[d], g = 0; g < e.length; g++) c.push(b[d]);
                    return c
                };
                f.S = function(a) {
                    ta(this);
                    var b = [];
                    if (x(a)) cg(this, a) && (b = cd(b, this.a.get(bb(this, a))));
                    else {
                        a = this.a.S();
                        for (var c = 0; c < a.length; c++) b = cd(b, a[c])
                    }
                    return b
                };
                f.set = function(a, b) {
                    return ta(this), this.c = null, cg(this, a = bb(this, a)) && (this.b -= this.a.get(a).length), this.a.set(a, [b]),
                        this.b += 1, this
                };
                f.get = function(a, b) {
                    return 0 < (a = a ? this.S(a) : []).length ? String(a[0]) : b
                };
                f.toString = function() {
                    if (this.c) return this.c;
                    if (!this.a) return "";
                    for (var a = [], b = this.a.U(), c = 0; c < b.length; c++) {
                        var d = b[c],
                            e = encodeURIComponent(String(d));
                        d = this.S(d);
                        for (var g = 0; g < d.length; g++) {
                            var h = e;
                            "" !== d[g] && (h += "=" + encodeURIComponent(String(d[g])));
                            a.push(h)
                        }
                    }
                    return this.c = a.join("&")
                };
                var gj = !Z || 9 <= Number(va);
                La.prototype.ma = !0;
                La.prototype.la = function() {
                    return this.a
                };
                La.prototype.toString = function() {
                    return "Const{" +
                        this.a + "}"
                };
                var dg = {};
                Ib("");
                cb.prototype.ma = !0;
                cb.prototype.la = function() {
                    return this.a
                };
                cb.prototype.toString = function() {
                    return "TrustedResourceUrl{" + this.a + "}"
                };
                var ej = /%{(\w+)}/g,
                    dj = /^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank#/i,
                    fg = {};
                da.prototype.ma = !0;
                da.prototype.la = function() {
                    return this.a
                };
                da.prototype.toString = function() {
                    return "SafeUrl{" + this.a + "}"
                };
                var jg = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
                    hg = {};
                yd("about:blank");
                db.prototype.ma = !0;
                db.prototype.la = function() {
                    return this.a
                };
                db.prototype.toString = function() {
                    return "SafeHtml{" + this.a + "}"
                };
                var kg = {};
                uc("<!DOCTYPE html>");
                uc("");
                uc("<br>");
                var mg = {
                        cellpadding: "cellPadding",
                        cellspacing: "cellSpacing",
                        colspan: "colSpan",
                        frameborder: "frameBorder",
                        height: "height",
                        maxlength: "maxLength",
                        nonce: "nonce",
                        role: "role",
                        rowspan: "rowSpan",
                        type: "type",
                        usemap: "useMap",
                        valign: "vAlign",
                        width: "width"
                    },
                    pg = {
                        '"': '\\"',
                        "\\": "\\\\",
                        "/": "\\/",
                        "\b": "\\b",
                        "\f": "\\f",
                        "\n": "\\n",
                        "\r": "\\r",
                        "\t": "\\t",
                        "\x0B": "\\u000b"
                    },
                    ij = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g :
                    /[\\"\x00-\x1f\x7f-\xff]/g,
                    Lj = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                    Ad = "Firefox",
                    ug = "Chrome",
                    vg = {
                        Sc: "FirebaseCore-web",
                        Uc: "FirebaseUI-web"
                    };
                wa.prototype.get = function() {
                    var a = l.navigator;
                    return !a || "boolean" != typeof a.onLine || !Lb() && "chrome-extension:" !== Kb() && void 0 === a.connection || a.onLine ? this.b ? this.c : this.a : Math.min(5E3, this.a)
                };
                var Ag = {};
                try {
                    var ff = {};
                    Object.defineProperty(ff, "abcd", {
                        configurable: !0,
                        enumerable: !0,
                        value: 1
                    });
                    Object.defineProperty(ff, "abcd", {
                        configurable: !0,
                        enumerable: !0,
                        value: 2
                    });
                    var Bg = 2 == ff.abcd
                } catch (a) {
                    Bg = !1
                }
                t(k, Error);
                k.prototype.D = function() {
                    return {
                        code: this.code,
                        message: this.message
                    }
                };
                k.prototype.toJSON = function() {
                    return this.D()
                };
                var Pb = "auth/",
                    kj = {
                        "argument-error": "",
                        "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
                        "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
                        "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
                        "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
                        "cordova-not-ready": "Cordova framework is not ready.",
                        "cors-unsupported": "This browser is not supported.",
                        "credential-already-in-use": "This credential is already associated with a different user account.",
                        "custom-token-mismatch": "The custom token corresponds to a different audience.",
                        "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
                        "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
                        "email-already-in-use": "The email address is already in use by another account.",
                        "expired-action-code": "The action code has expired. ",
                        "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
                        "internal-error": "An internal error has occurred.",
                        "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
                        "invalid-app-id": "The mobile app identifier is not registed for the current project.",
                        "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
                        "invalid-auth-event": "An internal error has occurred.",
                        "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
                        "invalid-continue-uri": "The continue URL provided in the request is invalid.",
                        "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
                        "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
                        "invalid-email": "The email address is badly formatted.",
                        "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
                        "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
                        "invalid-credential": "The supplied auth credential is malformed or has expired.",
                        "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
                        "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
                        "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
                        "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
                        "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
                        "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
                        "wrong-password": "The password is invalid or the user does not have a password.",
                        "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
                        "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
                        "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
                        "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
                        "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
                        "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
                        "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
                        "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
                        "missing-continue-uri": "A continue URL must be provided in the request.",
                        "missing-iframe-start": "An internal error has occurred.",
                        "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
                        "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
                        "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
                        "app-deleted": "This instance of FirebaseApp has been deleted.",
                        "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
                        "network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
                        "no-auth-event": "An internal error has occurred.",
                        "no-such-provider": "User was not linked to an account with the given provider.",
                        "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
                        "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
                        "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
                        "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
                        "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
                        "provider-already-linked": "User can only be linked to one identity for the given provider.",
                        "quota-exceeded": "The project's quota for this operation has been exceeded.",
                        "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
                        "redirect-operation-pending": "A redirect sign-in operation is already pending.",
                        timeout: "The operation has timed out.",
                        "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
                        "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
                        "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
                        "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
                        "user-cancelled": "User did not grant your application the permissions it requested.",
                        "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
                        "user-disabled": "The user account has been disabled by an administrator.",
                        "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
                        "user-signed-out": "",
                        "weak-password": "The password must be 6 characters long or more.",
                        "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
                    },
                    Dg = "android",
                    Id = "handleCodeInApp",
                    Hg = "iOS",
                    lj = "url",
                    Fg = "installApp",
                    Gg = "minimumVersion",
                    Eg = "packageName",
                    Ig = "bundleId",
                    wc = null,
                    vc = null;
                Jg.prototype.f = function() {
                    return this.b
                };
                var Vg = "oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),
                    yc = ["client_id", "response_type", "scope", "redirect_uri", "state"],
                    Ld = {
                        Tc: {
                            Ma: "locale",
                            Ba: 500,
                            Aa: 600,
                            Na: "facebook.com",
                            eb: yc
                        },
                        Vc: {
                            Ma: null,
                            Ba: 500,
                            Aa: 620,
                            Na: "github.com",
                            eb: yc
                        },
                        Wc: {
                            Ma: "hl",
                            Ba: 515,
                            Aa: 680,
                            Na: "google.com",
                            eb: yc
                        },
                        bd: {
                            Ma: "lang",
                            Ba: 485,
                            Aa: 705,
                            Na: "twitter.com",
                            eb: Vg
                        }
                    },
                    Nd = "idToken",
                    Qg = "providerId";
                t(fa, Od);
                t(Mg, fa);
                t(Og, fa);
                t(Ng, fa);
                t(Pg, fa);
                ib.prototype.ya = function(a) {
                    return uh(a, Pd(this))
                };
                ib.prototype.c = function(a, b) {
                    var c = Pd(this);
                    return c.idToken = b, vh(a, c)
                };
                ib.prototype.f = function(a, b) {
                    return xc(wh(a, Pd(this)), b)
                };
                ib.prototype.D = function() {
                    var a = {
                        providerId: this.providerId,
                        signInMethod: this.signInMethod
                    };
                    return this.idToken && (a.oauthIdToken = this.idToken), this.accessToken && (a.oauthAccessToken = this.accessToken), this.secret &&
                        (a.oauthTokenSecret = this.secret), a
                };
                Qb.prototype.Da = function(a) {
                    return this.vb = Cb(a), this
                };
                t(P, Qb);
                P.prototype.ta = function(a) {
                    return Ea(this.a, a) || this.a.push(a), this
                };
                P.prototype.Ab = function() {
                    return Fa(this.a)
                };
                P.prototype.credential = function(a, b) {
                    if (!a && !b) throw new k("argument-error", "credential failed: must provide the ID token and/or the access token.");
                    return new ib(this.providerId, {
                        idToken: a || null,
                        accessToken: b || null
                    }, this.providerId)
                };
                t(Pa, P);
                p(Pa, "PROVIDER_ID", "facebook.com");
                p(Pa, "FACEBOOK_SIGN_IN_METHOD",
                    "facebook.com");
                t(Qa, P);
                p(Qa, "PROVIDER_ID", "github.com");
                p(Qa, "GITHUB_SIGN_IN_METHOD", "github.com");
                t(Ra, P);
                p(Ra, "PROVIDER_ID", "google.com");
                p(Ra, "GOOGLE_SIGN_IN_METHOD", "google.com");
                t(jb, Qb);
                p(jb, "PROVIDER_ID", "twitter.com");
                p(jb, "TWITTER_SIGN_IN_METHOD", "twitter.com");
                kb.prototype.ya = function(a) {
                    return this.signInMethod == V.EMAIL_LINK_SIGN_IN_METHOD ? w(a, dk, {
                        email: this.a,
                        oobCode: this.b
                    }) : w(a, Hi, {
                        email: this.a,
                        password: this.b
                    })
                };
                kb.prototype.c = function(a, b) {
                    return this.signInMethod == V.EMAIL_LINK_SIGN_IN_METHOD ?
                        w(a, ek, {
                            idToken: b,
                            email: this.a,
                            oobCode: this.b
                        }) : w(a, Ii, {
                            idToken: b,
                            email: this.a,
                            password: this.b
                        })
                };
                kb.prototype.f = function(a, b) {
                    return xc(this.ya(a), b)
                };
                kb.prototype.D = function() {
                    return {
                        email: this.a,
                        password: this.b,
                        signInMethod: this.signInMethod
                    }
                };
                N(V, {
                    PROVIDER_ID: "password"
                });
                N(V, {
                    EMAIL_LINK_SIGN_IN_METHOD: "emailLink"
                });
                N(V, {
                    EMAIL_PASSWORD_SIGN_IN_METHOD: "password"
                });
                lb.prototype.ya = function(a) {
                    return a.Ta(Qd(this))
                };
                lb.prototype.c = function(a, b) {
                    var c = Qd(this);
                    return c.idToken = b, w(a, fk, c)
                };
                lb.prototype.f =
                    function(a, b) {
                        var c = Qd(this);
                        return c.operation = "REAUTH", xc(w(a, gk, c), b)
                    };
                lb.prototype.D = function() {
                    var a = {
                        providerId: "phone"
                    };
                    return this.a.Sa && (a.verificationId = this.a.Sa), this.a.Ra && (a.verificationCode = this.a.Ra), this.a.Fa && (a.temporaryProof = this.a.Fa), this.a.$ && (a.phoneNumber = this.a.$), a
                };
                ya.prototype.Ta = function(a, b) {
                    var c = this.a.b;
                    return q(b.verify()).then(function(d) {
                        if (!x(d)) throw new k("argument-error", "An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");
                        switch (b.type) {
                            case "recaptcha":
                                return function(a, b) {
                                    return w(a, hk, b)
                                }(c, {
                                    phoneNumber: a,
                                    recaptchaToken: d
                                }).then(function(a) {
                                    return "function" == typeof b.reset && b.reset(), a
                                }, function(a) {
                                    throw "function" == typeof b.reset && b.reset(), a;
                                });
                            default:
                                throw new k("argument-error", 'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');
                        }
                    })
                };
                N(ya, {
                    PROVIDER_ID: "phone"
                });
                N(ya, {
                    PHONE_SIGN_IN_METHOD: "phone"
                });
                ra.prototype.D = function() {
                    return {
                        type: this.b,
                        eventId: this.c,
                        urlResponse: this.f,
                        sessionId: this.g,
                        error: this.a && this.a.D()
                    }
                };
                var we = null;
                Sd.prototype.subscribe = function(a) {
                    var b = this;
                    this.a.push(a);
                    this.b || (this.b = function(a) {
                        for (var c = 0; c < b.a.length; c++) b.a[c](a)
                    }, "function" == typeof(a = z("universalLinks.subscribe", l)) && a(null, this.b))
                };
                Sd.prototype.unsubscribe = function(a) {
                    X(this.a, function(b) {
                        return b == a
                    })
                };
                t(Td, k);
                t(Rb, k);
                Rb.prototype.D = function() {
                    var a = {
                        code: this.code,
                        message: this.message
                    };
                    this.email && (a.email = this.email);
                    this.phoneNumber && (a.phoneNumber = this.phoneNumber);
                    var b =
                        this.credential && this.credential.D();
                    return b && ka(a, b), a
                };
                Rb.prototype.toJSON = function() {
                    return this.D()
                };
                var Cj = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;
                Sb.prototype.c = null;
                t(Bc, Sb);
                Bc.prototype.a = function() {
                    var a = bh(this);
                    return a ? new ActiveXObject(a) : new XMLHttpRequest
                };
                Bc.prototype.b = function() {
                    var a = {};
                    return bh(this) && (a[0] = !0, a[1] = !0), a
                };
                var eh = new Bc;
                t(Cc, Sb);
                Cc.prototype.a = function() {
                    var a = new XMLHttpRequest;
                    if ("withCredentials" in a) return a;
                    if ("undefined" !=
                        typeof XDomainRequest) return new ch;
                    throw Error("Unsupported browser");
                };
                Cc.prototype.b = function() {
                    return {}
                };
                (f = ch.prototype).open = function(a, b, c) {
                    if (null != c && !c) throw Error("Only async requests are supported.");
                    this.a.open(a, b)
                };
                f.send = function(a) {
                    if (a) {
                        if ("string" != typeof a) throw Error("Only string data is supported");
                        this.a.send(a)
                    } else this.a.send()
                };
                f.abort = function() {
                    this.a.abort()
                };
                f.setRequestHeader = function() {};
                f.getResponseHeader = function(a) {
                    return "content-type" == a.toLowerCase() ? this.a.contentType :
                        ""
                };
                f.bc = function() {
                    this.status = 200;
                    this.responseText = this.a.responseText;
                    this.readyState = 4;
                    this.onreadystatechange && this.onreadystatechange()
                };
                f.Bb = function() {
                    this.status = 500;
                    this.responseText = "";
                    this.readyState = 4;
                    this.onreadystatechange && this.onreadystatechange()
                };
                f.fc = function() {
                    this.Bb()
                };
                f.cc = function() {
                    this.status = 200;
                    this.readyState = 1;
                    this.onreadystatechange && this.onreadystatechange()
                };
                f.getAllResponseHeaders = function() {
                    return "content-type: " + this.a.contentType
                };
                Ud.prototype.a = null;
                Ud.prototype.reset =
                    function(a, b, c, d, e) {
                        delete this.a
                    };
                Tb.prototype.toString = function() {
                    return this.name
                };
                var jh = new Tb("SEVERE", 1E3),
                    gf = new Tb("WARNING", 900),
                    nj = new Tb("CONFIG", 700),
                    oj = new Tb("FINE", 500);
                Vd.prototype.log = function(a, b, c) {
                    if (a.value >= function g(a) {
                            return a.c ? a.c : a.a ? g(a.a) : (zb("Root logger has no level set."), null)
                        }(this).value)
                        for (I(b) && (b = b()), a = new Ud(a, String(b), this.f), c && (a.a = c), c = this; c;) c = c.a
                };
                var Xd = {},
                    Dc = null;
                t(Ec, Sb);
                Ec.prototype.a = function() {
                    return new Yd(this.f)
                };
                Ec.prototype.b = function(a) {
                    return function() {
                        return a
                    }
                }({});
                t(Yd, J);
                var Zd = 0;
                (f = Yd.prototype).open = function(a, b) {
                    if (this.readyState != Zd) throw this.abort(), Error("Error reopening a connection");
                    this.h = a;
                    this.c = b;
                    this.readyState = 1;
                    mb(this)
                };
                f.send = function(a) {
                    if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
                    this.a = !0;
                    var b = {
                        headers: this.g,
                        method: this.h,
                        credentials: void 0,
                        cache: void 0
                    };
                    a && (b.body = a);
                    this.i.fetch(new Request(this.c, b)).then(this.ec.bind(this), this.Cb.bind(this))
                };
                f.abort = function() {
                    this.responseText = "";
                    this.g = new Headers;
                    this.status = 0;
                    1 <= this.readyState && this.a && 4 != this.readyState && (this.readyState = 4, this.a = !1, mb(this));
                    this.readyState = Zd
                };
                f.ec = function(a) {
                    this.a && (this.b || (this.b = a.headers, this.readyState = 2, mb(this)), this.a && (this.readyState = 3, mb(this), this.a && a.text().then(this.dc.bind(this, a), this.Cb.bind(this))))
                };
                f.dc = function(a, b) {
                    this.a && (this.status = a.status, this.statusText = a.statusText, this.responseText = b, this.readyState = 4, mb(this))
                };
                f.Cb = function(a) {
                    var b = this.f;
                    b && b.log(gf, "Failed to fetch url " + this.c,
                        a instanceof Error ? a : Error(a));
                    this.a && (this.readyState = 4, mb(this))
                };
                f.setRequestHeader = function(a, b) {
                    this.g.append(a, b)
                };
                f.getResponseHeader = function(a) {
                    return this.b ? this.b.get(a.toLowerCase()) || "" : ((a = this.f) && a.log(gf, "Attempting to get response header but no headers have been received for url: " + this.c, void 0), "")
                };
                f.getAllResponseHeaders = function() {
                    if (!this.b) {
                        var a = this.f;
                        return a && a.log(gf, "Attempting to get all response headers but no headers have been received for url: " + this.c, void 0),
                            ""
                    }
                    a = [];
                    for (var b = this.b.entries(), c = b.next(); !c.done;) c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
                    return a.join("\r\n")
                };
                t(Ub, J);
                var dh = "";
                Ub.prototype.b = Wd("goog.net.XhrIo");
                var sj = /^https?$/i,
                    rj = ["POST", "PUT"];
                (f = Ub.prototype).Ga = function() {
                    void 0 !== $d && this.a && (this.h = "Timed out after " + this.g + "ms, aborting", W(this.b, sa(this, this.h)), this.dispatchEvent("timeout"), this.abort(8))
                };
                f.abort = function() {
                    this.a && this.c && (W(this.b, sa(this, "Aborting")), this.c = !1, this.f = !0, this.a.abort(), this.f = !1, this.dispatchEvent("complete"),
                        this.dispatchEvent("abort"), Fc(this))
                };
                f.ua = function() {
                    this.a && (this.c && (this.c = !1, this.f = !0, this.a.abort(), this.f = !1), Fc(this, !0));
                    Ub.lb.ua.call(this)
                };
                f.Fb = function() {
                    this.pa || (this.I || this.i || this.f ? ih(this) : this.tc())
                };
                f.tc = function() {
                    ih(this)
                };
                f.getResponse = function() {
                    try {
                        if (!this.a) return null;
                        if ("response" in this.a) return this.a.response;
                        switch (this.o) {
                            case dh:
                            case "text":
                                return this.a.responseText;
                            case "arraybuffer":
                                if ("mozResponseArrayBuffer" in this.a) return this.a.mozResponseArrayBuffer
                        }
                        var a =
                            this.b;
                        return a && a.log(jh, "Response type " + this.o + " is not supported on this browser", void 0), null
                    } catch (b) {
                        return W(this.b, "Can not get response: " + b.message), null
                    }
                };
                za.prototype.cancel = function(a) {
                    if (this.a) this.c instanceof za && this.c.cancel();
                    else {
                        if (this.b) {
                            var b = this.b;
                            delete this.b;
                            a ? b.cancel(a) : (b.m--, 0 >= b.m && b.cancel())
                        }
                        this.v ? this.v.call(this.u, this) : this.l = !0;
                        this.a || (a = new Xb(this), Hc(this), Wb(this, !1, a))
                    }
                };
                za.prototype.o = function(a, b) {
                    this.i = !1;
                    Wb(this, a, b)
                };
                za.prototype.C = function() {
                    Hc(this);
                    Wb(this, !0, null)
                };
                za.prototype.then = function(a, b, c) {
                    var d, e, g = new u(function(a, b) {
                        d = a;
                        e = b
                    });
                    return ae(this, d, function(a) {
                        a instanceof Xb ? g.cancel() : e(a)
                    }), g.then(a, b, c)
                };
                kf(za);
                t(Ic, O);
                Ic.prototype.message = "Deferred has already fired";
                Ic.prototype.name = "AlreadyCalledError";
                t(Xb, O);
                Xb.prototype.message = "Deferred was canceled";
                Xb.prototype.name = "CanceledError";
                mh.prototype.c = function() {
                    throw delete Jc[this.a], this.b;
                };
                var Jc = {},
                    wj = 0,
                    vj = 1;
                t(ce, O);
                t(Lc, Sb);
                Lc.prototype.a = function() {
                    return new this.f
                };
                Lc.prototype.b = function() {
                    return {}
                };
                var de, U = "idToken",
                    xj = new wa(3E4, 6E4),
                    yj = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    zj = new wa(3E4, 6E4),
                    Aj = {
                        "Content-Type": "application/json"
                    };
                ha.prototype.o = function(a, b, c, d, e, g) {
                    if (pa() && (void 0 === l.fetch || void 0 === l.Headers || void 0 === l.Request)) throw new k("operation-not-supported-in-this-environment", "fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.");
                    var h = new Ub(this.c);
                    if (g) {
                        h.g = Math.max(0, g);
                        var f = setTimeout(function() {
                            h.dispatchEvent("timeout")
                        }, g)
                    }
                    Of(h, "complete", function() {
                        f && clearTimeout(f);
                        var a = null;
                        try {
                            a = JSON.parse(function(a) {
                                try {
                                    return a.a ? a.a.responseText : ""
                                } catch (Db) {
                                    return W(a.b, "Can not get responseText: " + Db.message), ""
                                }
                            }(this)) || null
                        } catch (la) {
                            a = null
                        }
                        b && b(a)
                    });
                    rd(h, "ready", function() {
                        f && clearTimeout(f);
                        Jf(this)
                    });
                    rd(h, "timeout", function() {
                        f && clearTimeout(f);
                        Jf(this);
                        b && b(null)
                    });
                    pj(h, a, c, d, e)
                };
                var Bj = Ib("https://apis.google.com/js/client.js?onload=%{onload}"),
                    qh = "__fcb" + Math.floor(1E6 * Math.random()).toString();
                ha.prototype.l = function(a, b, c, d, e) {
                    var g = this;
                    de.then(function() {
                        window.gapi.client.setApiKey(g.b);
                        var f = window.gapi.auth.getToken();
                        window.gapi.auth.setToken(null);
                        window.gapi.client.request({
                            path: a,
                            method: c,
                            body: d,
                            headers: e,
                            authType: "none",
                            callback: function(a) {
                                window.gapi.auth.setToken(f);
                                b && b(a)
                            }
                        })
                    }).s(function(a) {
                        b && b({
                            error: {
                                message: a && a.message || "CORS_UNSUPPORTED"
                            }
                        })
                    })
                };
                ha.prototype.Pa = function() {
                    return w(this, ik, {})
                };
                ha.prototype.mb = function(a,
                    b) {
                    return w(this, Ji, {
                        idToken: a,
                        email: b
                    })
                };
                ha.prototype.nb = function(a, b) {
                    return w(this, Ii, {
                        idToken: a,
                        password: b
                    })
                };
                var jk = {
                    displayName: "DISPLAY_NAME",
                    photoUrl: "PHOTO_URL"
                };
                (f = ha.prototype).ob = function(a, b) {
                    var c = {
                            idToken: a
                        },
                        d = [];
                    return rf(jk, function(a, g) {
                        var e = b[g];
                        null === e ? d.push(a) : g in b && (c[g] = e)
                    }), d.length && (c.deleteAttribute = d), w(this, Ji, c)
                };
                f.hb = function(a, b) {
                    return ka(a = {
                        requestType: "PASSWORD_RESET",
                        email: a
                    }, b), w(this, kk, a)
                };
                f.ib = function(a, b) {
                    return ka(a = {
                            requestType: "EMAIL_SIGNIN",
                            email: a
                        },
                        b), w(this, lk, a)
                };
                f.gb = function(a, b) {
                    return ka(a = {
                        requestType: "VERIFY_EMAIL",
                        idToken: a
                    }, b), w(this, mk, a)
                };
                f.Ta = function(a) {
                    return w(this, nk, a)
                };
                f.Xa = function(a, b) {
                    return w(this, ok, {
                        oobCode: a,
                        newPassword: b
                    })
                };
                f.Ja = function(a) {
                    return w(this, pk, {
                        oobCode: a
                    })
                };
                f.Va = function(a) {
                    return w(this, qk, {
                        oobCode: a
                    })
                };
                var qk = {
                        endpoint: "setAccountInfo",
                        B: ge,
                        da: "email"
                    },
                    pk = {
                        endpoint: "resetPassword",
                        B: ge,
                        J: function(a) {
                            var b = a.requestType;
                            if (!b || !a.email && "EMAIL_SIGNIN" != b) throw new k("internal-error");
                        }
                    },
                    rk = {
                        endpoint: "signupNewUser",
                        B: function(a) {
                            if (Sa(a), !a.password) throw new k("weak-password");
                        },
                        J: ia,
                        R: !0
                    },
                    Ki = {
                        endpoint: "createAuthUri"
                    },
                    sk = {
                        endpoint: "deleteAccount",
                        T: ["idToken"]
                    },
                    tk = {
                        endpoint: "setAccountInfo",
                        T: ["idToken", "deleteProvider"],
                        B: function(a) {
                            if (!Da(a.deleteProvider)) throw new k("internal-error");
                        }
                    },
                    dk = {
                        endpoint: "emailLinkSignin",
                        T: ["email", "oobCode"],
                        B: Sa,
                        J: ia,
                        R: !0
                    },
                    ek = {
                        endpoint: "emailLinkSignin",
                        T: ["idToken", "email", "oobCode"],
                        B: Sa,
                        J: ia,
                        R: !0
                    },
                    Tj = {
                        endpoint: "getAccountInfo"
                    },
                    lk = {
                        endpoint: "getOobConfirmationCode",
                        T: ["requestType"],
                        B: function(a) {
                            if ("EMAIL_SIGNIN" != a.requestType) throw new k("internal-error");
                            Sa(a)
                        },
                        da: "email"
                    },
                    mk = {
                        endpoint: "getOobConfirmationCode",
                        T: ["idToken", "requestType"],
                        B: function(a) {
                            if ("VERIFY_EMAIL" != a.requestType) throw new k("internal-error");
                        },
                        da: "email"
                    },
                    kk = {
                        endpoint: "getOobConfirmationCode",
                        T: ["requestType"],
                        B: function(a) {
                            if ("PASSWORD_RESET" != a.requestType) throw new k("internal-error");
                            Sa(a)
                        },
                        da: "email"
                    },
                    Kj = {
                        rb: !0,
                        endpoint: "getProjectConfig",
                        Eb: "GET"
                    },
                    uk = {
                        rb: !0,
                        endpoint: "getRecaptchaParam",
                        Eb: "GET",
                        J: function(a) {
                            if (!a.recaptchaSiteKey) throw new k("internal-error");
                        }
                    },
                    ok = {
                        endpoint: "resetPassword",
                        B: ge,
                        da: "email"
                    },
                    hk = {
                        endpoint: "sendVerificationCode",
                        T: ["phoneNumber", "recaptchaToken"],
                        da: "sessionInfo"
                    },
                    Ji = {
                        endpoint: "setAccountInfo",
                        T: ["idToken"],
                        B: rh,
                        R: !0
                    },
                    Ii = {
                        endpoint: "setAccountInfo",
                        T: ["idToken"],
                        B: function(a) {
                            if (rh(a), !a.password) throw new k("weak-password");
                        },
                        J: ia,
                        R: !0
                    },
                    ik = {
                        endpoint: "signupNewUser",
                        J: ia,
                        R: !0
                    },
                    Dj = {
                        endpoint: "verifyAssertion",
                        B: fe,
                        J: sh,
                        R: !0
                    },
                    Fj = {
                        endpoint: "verifyAssertion",
                        B: fe,
                        J: function(a) {
                            if (a.errorMessage && "USER_NOT_FOUND" == a.errorMessage) throw new k("user-not-found");
                            if (a.errorMessage) throw th(a.errorMessage);
                            if (!a[U]) throw new k("internal-error");
                        },
                        R: !0
                    },
                    Ej = {
                        endpoint: "verifyAssertion",
                        B: function(a) {
                            if (fe(a), !a.idToken) throw new k("internal-error");
                        },
                        J: sh,
                        R: !0
                    },
                    vk = {
                        endpoint: "verifyCustomToken",
                        B: function(a) {
                            if (!a.token) throw new k("invalid-custom-token");
                        },
                        J: ia,
                        R: !0
                    },
                    Hi = {
                        endpoint: "verifyPassword",
                        B: function(a) {
                            if (Sa(a), !a.password) throw new k("wrong-password");
                        },
                        J: ia,
                        R: !0
                    },
                    nk = {
                        endpoint: "verifyPhoneNumber",
                        B: ee,
                        J: ia
                    },
                    fk = {
                        endpoint: "verifyPhoneNumber",
                        B: function(a) {
                            if (!a.idToken) throw new k("internal-error");
                            ee(a)
                        },
                        J: function(a) {
                            if (a.temporaryProof) throw a.code = "credential-already-in-use", Ac(a);
                            ia(a)
                        }
                    },
                    gk = {
                        Tb: {
                            USER_NOT_FOUND: "user-not-found"
                        },
                        endpoint: "verifyPhoneNumber",
                        B: ee,
                        J: ia
                    },
                    ie = {
                        Yc: {
                            Za: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/",
                            fb: "https://securetoken.googleapis.com/v1/token",
                            id: "p"
                        },
                        $c: {
                            Za: "https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
                            fb: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
                            id: "s"
                        },
                        ad: {
                            Za: "https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",
                            fb: "https://test-securetoken.sandbox.googleapis.com/v1/token",
                            id: "t"
                        }
                    };
                var Rc = Yb("__EID__") ? "__EID__" : void 0;
                var le, Ij = Ib("https://apis.google.com/js/api.js?onload=%{onload}"),
                    Hj = new wa(3E4, 6E4),
                    Jj = new wa(5E3, 15E3),
                    je = null;
                xh.prototype.toString = function() {
                    return this.f ? C(this.a, "v", this.f) : na(this.a.a, "v"), this.b ? C(this.a, "eid", this.b) : na(this.a.a,
                        "eid"), this.c.length ? C(this.a, "fw", this.c.join(",")) : na(this.a.a, "fw"), this.a.toString()
                };
                yh.prototype.toString = function() {
                    var a = ag(this.o, "/__/auth/handler");
                    if (C(a, "apiKey", this.l), C(a, "appName", this.c), C(a, "authType", this.m), this.a.isOAuthProvider) {
                        var b = this.a;
                        try {
                            var c = n.app(this.c).auth().ea()
                        } catch (v) {
                            c = null
                        }
                        for (var d in b.Ya = c, C(a, "providerId", this.a.providerId), c = wg((b = this.a).vb)) c[d] = c[d].toString();
                        d = b.Ac;
                        c = Cb(c);
                        for (var e = 0; e < d.length; e++) {
                            var g = d[e];
                            g in c && delete c[g]
                        }
                        b.$a && b.Ya && !c[b.$a] &&
                            (c[b.$a] = b.Ya);
                        Bb(c) || C(a, "customParameters", Nb(c))
                    }
                    if ("function" == typeof this.a.Ab && (b = this.a.Ab()).length && C(a, "scopes", b.join(",")), this.i ? C(a, "redirectUrl", this.i) : na(a.a, "redirectUrl"), this.g ? C(a, "eventId", this.g) : na(a.a, "eventId"), this.h ? C(a, "v", this.h) : na(a.a, "v"), this.b)
                        for (var f in this.b) this.b.hasOwnProperty(f) && !ua(a, f) && C(a, f, this.b[f]);
                    return this.f ? C(a, "eid", this.f) : na(a.a, "eid"), (f = ke(this.c)).length && C(a, "fw", f.join(",")), a.toString()
                };
                (f = zh.prototype).Ea = function(a, b, c) {
                    var d = new k("popup-closed-by-user"),
                        e = new k("web-storage-unsupported"),
                        g = this,
                        f = !1;
                    return this.ga().then(function() {
                        (function(a) {
                            var b = {
                                type: "webStorageSupport"
                            };
                            return Bh(a).then(function() {
                                return function(a, b) {
                                    return a.bb.then(function() {
                                        return new u(function(c) {
                                            a.a.send(b.type, b, c, z("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))
                                        })
                                    })
                                }(a.i, b)
                            }).then(function(a) {
                                if (a && a.length && void 0 !== a[0].webStorageSupport) return a[0].webStorageSupport;
                                throw Error();
                            })
                        })(g).then(function(c) {
                            c || (a && Ma(a), b(e), f = !0)
                        })
                    }).s(function() {}).then(function() {
                        if (!f) return function(a) {
                            return new u(function(b) {
                                return function Db() {
                                    Ja(2E3).then(function() {
                                        if (a &&
                                            !a.closed) return Db();
                                        b()
                                    })
                                }()
                            })
                        }(a)
                    }).then(function() {
                        if (!f) return Ja(c).then(function() {
                            b(d)
                        })
                    })
                };
                f.Ib = function() {
                    var a = E();
                    return !Mb(a) && !xg(a)
                };
                f.Db = function() {
                    return !1
                };
                f.zb = function(a, b, c, d, e, g, f) {
                    if (!a) return B(new k("popup-blocked"));
                    if (f && !Mb()) return this.ga().s(function(b) {
                        Ma(a);
                        e(b)
                    }), d(), q();
                    this.a || (this.a = Ah(Ch(this)));
                    var h = this;
                    return this.a.then(function() {
                        var b = h.ga().s(function(b) {
                            throw Ma(a), e(b), b;
                        });
                        return d(), b
                    }).then(function() {
                        (Rd(c), f) || qg(Zb(h.l, h.f, h.b, b, c, null, g, h.c,
                            void 0, h.h), a)
                    }).s(function(a) {
                        throw "auth/network-request-failed" == a.code && (h.a = null), a;
                    })
                };
                f.Ca = function(a, b, c) {
                    this.a || (this.a = Ah(Ch(this)));
                    var d = this;
                    return this.a.then(function() {
                        Rd(b);
                        qg(Zb(d.l, d.f, d.b, a, b, eb(), c, d.c, void 0, d.h))
                    }).s(function(a) {
                        throw "auth/network-request-failed" == a.code && (d.a = null), a;
                    })
                };
                f.ga = function() {
                    var a = this;
                    return Bh(this).then(function() {
                        return a.i.bb
                    }).s(function() {
                        throw a.a = null, new k("network-request-failed");
                    })
                };
                f.Mb = function() {
                    return !0
                };
                f.va = function(a) {
                    this.g.push(a)
                };
                f.Ka = function(a) {
                    X(this.g, function(b) {
                        return b == a
                    })
                };
                (f = Dh.prototype).get = function(a) {
                    return q(this.a.getItem(a)).then(function(a) {
                        return a && hb(a)
                    })
                };
                f.set = function(a, b) {
                    return q(this.a.setItem(a, Nb(b)))
                };
                f.P = function(a) {
                    return q(this.a.removeItem(a))
                };
                f.Y = function() {};
                f.ca = function() {};
                (f = Eh.prototype).set = function(a, b) {
                    var c, d = !1,
                        e = this;
                    return Mc(this).then(function(b) {
                        return ob($b(ac(c = b, !0)).get(a))
                    }).then(function(g) {
                        var f = $b(ac(c, !0));
                        return g ? (g.value = b, ob(f.put(g))) : (e.b++, d = !0, (g = {}).fbase_key =
                            a, g.value = b, ob(f.add(g)))
                    }).then(function() {
                        e.f[a] = b
                    }).ia(function() {
                        d && e.b--
                    })
                };
                f.get = function(a) {
                    return Mc(this).then(function(b) {
                        return ob($b(ac(b, !1)).get(a))
                    }).then(function(a) {
                        return a && a.value
                    })
                };
                f.P = function(a) {
                    var b = !1,
                        c = this;
                    return Mc(this).then(function(d) {
                        return b = !0, c.b++, ob($b(ac(d, !0))["delete"](a))
                    }).then(function() {
                        delete c.f[a]
                    }).ia(function() {
                        b && c.b--
                    })
                };
                f.Kc = function() {
                    var a = this;
                    return Mc(this).then(function(a) {
                        var b = $b(ac(a, !1));
                        return b.getAll ? ob(b.getAll()) : new u(function(a,
                            c) {
                            var d = [],
                                e = b.openCursor();
                            e.onsuccess = function(b) {
                                (b = b.target.result) ? (d.push(b.value), b["continue"]()) : a(d)
                            };
                            e.onerror = function(a) {
                                c(Error(a.target.errorCode))
                            }
                        })
                    }).then(function(b) {
                        var c = {},
                            d = [];
                        if (0 == a.b) {
                            for (d = 0; d < b.length; d++) c[b[d].fbase_key] = b[d].value;
                            d = function v(a, b) {
                                var c, d = [];
                                for (c in a) c in b ? typeof a[c] != typeof b[c] ? d.push(c) : "object" == typeof a[c] && null != a[c] && null != b[c] ? 0 < v(a[c], b[c]).length && d.push(c) : a[c] !== b[c] && d.push(c) : d.push(c);
                                for (c in b) c in a || d.push(c);
                                return d
                            }(a.f, c);
                            a.f = c
                        }
                        return d
                    })
                };
                f.Y = function(a) {
                    0 == this.a.length && function(a) {
                        a.c && a.c.cancel("STOP_EVENT");
                        (function d() {
                            a.c = Ja(800).then(r(a.Kc, a)).then(function(b) {
                                0 < b.length && M(a.a, function(a) {
                                    a(b)
                                })
                            }).then(d).s(function(a) {
                                "STOP_EVENT" != a.message && d()
                            });
                            return a.c
                        })()
                    }(this);
                    this.a.push(a)
                };
                f.ca = function(a) {
                    X(this.a, function(b) {
                        return b == a
                    });
                    0 == this.a.length && this.c && this.c.cancel("STOP_EVENT")
                };
                (f = Hh.prototype).get = function(a) {
                    return this.b.then(function(b) {
                        return b.get(a)
                    })
                };
                f.set = function(a, b) {
                    return this.b.then(function(c) {
                        return c.set(a,
                            b)
                    })
                };
                f.P = function(a) {
                    return this.b.then(function(b) {
                        return b.P(a)
                    })
                };
                f.Y = function(a) {
                    this.a.push(a)
                };
                f.ca = function(a) {
                    X(this.a, function(b) {
                        return b == a
                    })
                };
                (f = bc.prototype).get = function(a) {
                    return q(this.a[a])
                };
                f.set = function(a, b) {
                    return this.a[a] = b, q()
                };
                f.P = function(a) {
                    return delete this.a[a], q()
                };
                f.Y = function() {};
                f.ca = function() {};
                (f = Nc.prototype).get = function(a) {
                    var b = this;
                    return q().then(function() {
                        return hb(b.a.getItem(a))
                    })
                };
                f.set = function(a, b) {
                    var c = this;
                    return q().then(function() {
                        var d = Nb(b);
                        null === d ? c.P(a) : c.a.setItem(a, d)
                    })
                };
                f.P = function(a) {
                    var b = this;
                    return q().then(function() {
                        b.a.removeItem(a)
                    })
                };
                f.Y = function(a) {
                    l.window && ca(l.window, "storage", a)
                };
                f.ca = function(a) {
                    l.window && T(l.window, "storage", a)
                };
                (f = me.prototype).get = function() {
                    return q(null)
                };
                f.set = function() {
                    return q()
                };
                f.P = function() {
                    return q()
                };
                f.Y = function() {};
                f.ca = function() {};
                (f = ne.prototype).get = function(a) {
                    var b = this;
                    return q().then(function() {
                        return hb(b.a.getItem(a))
                    })
                };
                f.set = function(a, b) {
                    var c = this;
                    return q().then(function() {
                        var d =
                            Nb(b);
                        null === d ? c.P(a) : c.a.setItem(a, d)
                    })
                };
                f.P = function(a) {
                    var b = this;
                    return q().then(function() {
                        b.a.removeItem(a)
                    })
                };
                f.Y = function() {};
                f.ca = function() {};
                var oe, pe, Mj = {
                        A: Nc,
                        Qa: ne
                    },
                    Nj = {
                        A: Nc,
                        Qa: ne
                    },
                    Oj = {
                        A: Dh,
                        Qa: me
                    },
                    Pj = {
                        A: Nc,
                        Qa: me
                    },
                    sb = {
                        Xc: "local",
                        NONE: "none",
                        Zc: "session"
                    };
                (f = Kh.prototype).get = function(a, b) {
                    return Ta(this, a.A).get(pb(a, b))
                };
                f.set = function(a, b, c) {
                    var d = pb(a, c),
                        e = this,
                        g = Ta(this, a.A);
                    return g.set(d, b).then(function() {
                        return g.get(d)
                    }).then(function(b) {
                        "local" == a.A && (e.b[d] = b)
                    })
                };
                f.addListener =
                    function(a, b, c) {
                        a = pb(a, b);
                        this.m && (this.b[a] = l.localStorage.getItem(a));
                        Bb(this.a) && (Ta(this, "local").Y(this.f), this.h || (zd() || !zg()) && l.indexedDB || !this.m || function(a) {
                            qe(a);
                            a.c = setInterval(function() {
                                for (var b in a.a) {
                                    var c = l.localStorage.getItem(b),
                                        d = a.b[b];
                                    c != d && (a.b[b] = c, c = new Ia({
                                        type: "storage",
                                        key: b,
                                        target: window,
                                        oldValue: d,
                                        newValue: c,
                                        a: !0
                                    }), a.Lb(c))
                                }
                            }, 1E3)
                        }(this));
                        this.a[a] || (this.a[a] = []);
                        this.a[a].push(c)
                    };
                f.removeListener = function(a, b, c) {
                    a = pb(a, b);
                    this.a[a] && (X(this.a[a], function(a) {
                        return a ==
                            c
                    }), 0 == this.a[a].length && delete this.a[a]);
                    Bb(this.a) && (Ta(this, "local").ca(this.f), qe(this))
                };
                f.Lb = function(a) {
                    if (a && a.f) {
                        var b = a.a.key;
                        if (null == b)
                            for (var c in this.a) {
                                var d = this.b[c];
                                void 0 === d && (d = null);
                                var e = l.localStorage.getItem(c);
                                e !== d && (this.b[c] = e, this.Wa(c))
                            } else if (0 == b.indexOf("firebase:") && this.a[b]) {
                                if (void 0 !== a.a.a ? Ta(this, "local").ca(this.f) : qe(this), this.o)
                                    if (c = l.localStorage.getItem(b), (d = a.a.newValue) !== c) null !== d ? l.localStorage.setItem(b, d) : l.localStorage.removeItem(b);
                                    else if (this.b[b] ===
                                    d && void 0 === a.a.a) return;
                                var g = this;
                                c = function() {
                                    void 0 === a.a.a && g.b[b] === l.localStorage.getItem(b) || (g.b[b] = l.localStorage.getItem(b), g.Wa(b))
                                };
                                Z && va && 10 == va && l.localStorage.getItem(b) !== a.a.newValue && a.a.newValue !== a.a.oldValue ? setTimeout(c, 10) : c()
                            }
                    } else M(a, r(this.Wa, this))
                };
                f.Wa = function(a) {
                    this.a[a] && M(this.a[a], function(a) {
                        a()
                    })
                };
                var re, xe = {
                    name: "authEvent",
                    A: "local"
                };
                t(Oc, function() {
                    this.b = -1
                });
                for (var Lh = 64, wk = Lh - 1, Li = [], hf = 0; hf < wk; hf++) Li[hf] = 0;
                var Ph = cd(128, Li);
                Oc.prototype.reset = function() {
                    this.g =
                        this.c = 0;
                    this.a = l.Int32Array ? new Int32Array(this.h) : Fa(this.h)
                };
                var Mh = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
                    2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
                ];
                t(Nh, Oc);
                var Qj = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
                (f = Oh.prototype).ga = function() {
                    return this.za ? this.za : this.za = (Cd(void 0) ? Bd().then(function() {
                        return new u(function(a, b) {
                            var c = l.document,
                                d = setTimeout(function() {
                                    b(Error("Cordova framework is not ready."))
                                }, 1E3);
                            c.addEventListener("deviceready", function() {
                                clearTimeout(d);
                                a()
                            }, !1)
                        })
                    }) : B(Error("Cordova must run in an Android or iOS file scheme."))).then(function() {
                        if ("function" != typeof z("universalLinks.subscribe", l)) throw Pc("cordova-universal-links-plugin is not installed");
                        if (void 0 === z("BuildInfo.packageName", l)) throw Pc("cordova-plugin-buildinfo is not installed");
                        if ("function" != typeof z("cordova.plugins.browsertab.openUrl", l)) throw Pc("cordova-plugin-browsertab is not installed");
                        if ("function" != typeof z("cordova.InAppBrowser.open", l)) throw Pc("cordova-plugin-inappbrowser is not installed");
                    }, function() {
                        throw new k("cordova-not-ready");
                    })
                };
                f.Ea = function(a, b) {
                    return b(new k("operation-not-supported-in-this-environment")), q()
                };
                f.zb = function() {
                    return B(new k("operation-not-supported-in-this-environment"))
                };
                f.Mb = function() {
                    return !1
                };
                f.Ib = function() {
                    return !0
                };
                f.Db = function() {
                    return !0
                };
                f.Ca = function(a, b, c) {
                    if (this.c) return B(new k("redirect-operation-pending"));
                    var d = this,
                        e = l.document,
                        g = null,
                        f = null,
                        m = null,
                        n = null;
                    return this.c = q().then(function() {
                        return Rd(b), Rh(d)
                    }).then(function() {
                        return function(a, b, c, d) {
                            var e = function() {
                                    for (var a = 20, b = []; 0 < a;) b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), a--;
                                    return b.join("")
                                }(),
                                g = new ra(b, d, null, e, new k("no-auth-event")),
                                f = z("BuildInfo.packageName", l);
                            if ("string" != typeof f) throw new k("invalid-cordova-configuration");
                            var h = z("BuildInfo.displayName", l),
                                m = {};
                            if (E().toLowerCase().match(/iphone|ipad|ipod/)) m.ibi =
                                f;
                            else {
                                if (!E().toLowerCase().match(/android/)) return B(new k("operation-not-supported-in-this-environment"));
                                m.apn = f
                            }
                            h && (m.appDisplayName = h);
                            e = Rj(e);
                            m.sessionId = e;
                            var n = Zb(a.l, a.i, a.m, b, c, null, d, a.o, m, a.u);
                            return a.ga().then(function() {
                                var b = a.h;
                                return a.v.a.set(xe, g.D(), b)
                            }).then(function() {
                                var b = z("cordova.plugins.browsertab.isAvailable", l);
                                if ("function" != typeof b) throw new k("invalid-cordova-configuration");
                                var c = null;
                                b(function(b) {
                                    if (b) {
                                        if ("function" != typeof(c = z("cordova.plugins.browsertab.openUrl",
                                                l))) throw new k("invalid-cordova-configuration");
                                        c(n)
                                    } else {
                                        if ("function" != typeof(c = z("cordova.InAppBrowser.open", l))) throw new k("invalid-cordova-configuration");
                                        b = !(!(b = E()).match(/(iPad|iPhone|iPod).*OS 7_\d/i) && !b.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
                                        a.a = c(n, b ? "_blank" : "_system", "location=yes")
                                    }
                                })
                            })
                        }(d, a, b, c)
                    }).then(function() {
                        return (new u(function(a, b) {
                            f = function() {
                                var b = z("cordova.plugins.browsertab.close", l);
                                return a(), "function" == typeof b && b(), d.a && "function" == typeof d.a.close && (d.a.close(),
                                    d.a = null), !1
                            };
                            d.va(f);
                            m = function() {
                                g || (g = Ja(2E3).then(function() {
                                    b(new k("redirect-cancelled-by-user"))
                                }))
                            };
                            n = function() {
                                Fd() && m()
                            };
                            e.addEventListener("resume", m, !1);
                            E().toLowerCase().match(/android/) || e.addEventListener("visibilitychange", n, !1)
                        })).s(function(a) {
                            return ve(d).then(function() {
                                throw a;
                            })
                        })
                    }).ia(function() {
                        m && e.removeEventListener("resume", m, !1);
                        n && e.removeEventListener("visibilitychange", n, !1);
                        g && g.cancel();
                        f && d.Ka(f);
                        d.c = null
                    })
                };
                f.va = function(a) {
                    this.b.push(a);
                    Rh(this).s(function(b) {
                        "auth/invalid-cordova-configuration" ===
                        b.code && (b = new ra("unknown", null, null, null, new k("no-auth-event")), a(b))
                    })
                };
                f.Ka = function(a) {
                    X(this.b, function(b) {
                        return b == a
                    })
                };
                var ze = {
                    name: "pendingRedirect",
                    A: "session"
                };
                Aa.prototype.reset = function() {
                    this.f = !1;
                    this.a.Ka(this.i);
                    this.a = Th(this.v, this.m, this.l)
                };
                Aa.prototype.subscribe = function(a) {
                    if (Ea(this.h, a) || this.h.push(a), !this.f) {
                        var b = this;
                        (function(a) {
                            return a.b.get(ze, a.a).then(function(a) {
                                return "pending" == a
                            })
                        })(this.g).then(function(a) {
                            a ? ye(b.g).then(function() {
                                Uh(b).s(function(a) {
                                    var c =
                                        new ra("unknown", null, null, null, new k("operation-not-supported-in-this-environment"));
                                    Ae(a) && b.o(c)
                                })
                            }) : Vh(b)
                        }).s(function() {
                            Vh(b)
                        })
                    }
                };
                Aa.prototype.unsubscribe = function(a) {
                    X(this.h, function(b) {
                        return b == a
                    })
                };
                Aa.prototype.o = function(a) {
                    if (!a) throw new k("invalid-auth-event");
                    for (var b = !1, c = 0; c < this.h.length; c++) {
                        var d = this.h[c];
                        if (d.sb(a.b, a.c)) {
                            (b = this.b[a.b]) && b.h(a, d);
                            b = !0;
                            break
                        }
                    }
                    return Wh(this.c), b
                };
                var xk = new wa(2E3, 1E4),
                    yk = new wa(3E4, 6E4);
                Aa.prototype.fa = function() {
                    return this.c.fa()
                };
                Aa.prototype.Ca =
                    function(a, b, c) {
                        var d, e = this;
                        return function(a) {
                            return a.b.set(ze, "pending", a.a)
                        }(this.g).then(function() {
                            return e.a.Ca(a, b, c).s(function(a) {
                                if (Ae(a)) throw new k("operation-not-supported-in-this-environment");
                                return d = a, ye(e.g).then(function() {
                                    throw d;
                                })
                            }).then(function() {
                                return e.a.Mb() ? new u(function() {}) : ye(e.g).then(function() {
                                    return e.fa()
                                }).then(function() {}).s(function() {})
                            })
                        })
                    };
                Aa.prototype.Ea = function(a, b, c, d) {
                    return this.a.Ea(c, function(c) {
                        a.ha(b, null, c, d)
                    }, xk.get())
                };
                var Be = {};
                Qc.prototype.reset =
                    function() {
                        this.b = null;
                        this.a && (this.a.cancel(), this.a = null)
                    };
                Qc.prototype.h = function(a, b) {
                    if (a) {
                        this.reset();
                        this.g = !0;
                        var c = a.b,
                            d = a.c,
                            e = a.a && "auth/web-storage-unsupported" == a.a.code,
                            g = a.a && "auth/operation-not-supported-in-this-environment" == a.a.code;
                        "unknown" != c || e || g ? a.a ? (rb(this, !0, null, a.a), q()) : b.wa(c, d) ? function(a, b, c) {
                                c = c.wa(b.b, b.c);
                                var d = b.f,
                                    e = b.g,
                                    g = !!b.b.match(/Redirect$/);
                                c(d, e).then(function(b) {
                                    rb(a, g, b, null)
                                }).s(function(b) {
                                    rb(a, g, null, b)
                                })
                            }(this, a, b) : B(new k("invalid-auth-event")) :
                            (rb(this, !1, null, null), q())
                    } else B(new k("invalid-auth-event"))
                };
                Qc.prototype.fa = function() {
                    var a = this;
                    return new u(function(b, c) {
                        a.b ? a.b().then(b, c) : (a.f.push(b), a.c.push(c), function(a) {
                            var b = new k("timeout");
                            a.a && a.a.cancel();
                            a.a = Ja(yk.get()).then(function() {
                                a.b || rb(a, !0, null, b)
                            })
                        }(a))
                    })
                };
                Sh.prototype.h = function(a, b) {
                    if (a) {
                        var c = a.b,
                            d = a.c;
                        a.a ? (b.ha(a.b, null, a.a, a.c), q()) : b.wa(c, d) ? function(a, b) {
                            var c = a.c,
                                d = a.b;
                            b.wa(d, c)(a.f, a.g).then(function(a) {
                                b.ha(d, a, null, c)
                            }).s(function(a) {
                                b.ha(d, null, a, c)
                            })
                        }(a,
                            b) : B(new k("invalid-auth-event"))
                    } else B(new k("invalid-auth-event"))
                };
                Ce.prototype.confirm = function(a) {
                    return a = Zg(this.verificationId, a), this.a(a)
                };
                Ee.prototype.start = function() {
                    this.a = this.c;
                    (function d(b, c) {
                        b.stop();
                        b.b = Ja(function(b, c) {
                            return c ? (b.a = b.c, b.g()) : (c = b.a, b.a *= 2, b.a > b.f && (b.a = b.f), c)
                        }(b, c)).then(function() {
                            return b = l.document, c = null, Fd() || !b ? q() : (new u(function(d) {
                                c = function() {
                                    Fd() && (b.removeEventListener("visibilitychange", c, !1), d())
                                };
                                b.addEventListener("visibilitychange", c, !1)
                            })).s(function(d) {
                                throw b.removeEventListener("visibilitychange",
                                    c, !1), d;
                            });
                            var b, c
                        }).then(function() {
                            return b.h()
                        }).then(function() {
                            d(b, !0)
                        }).s(function(c) {
                            b.i(c) && d(b, !1)
                        })
                    })(this, !0)
                };
                Ee.prototype.stop = function() {
                    this.b && (this.b.cancel(), this.b = null)
                };
                Fe.prototype.D = function() {
                    return {
                        apiKey: this.f.b,
                        refreshToken: this.a,
                        accessToken: this.b,
                        expirationTime: this.c
                    }
                };
                Fe.prototype.getToken = function(a) {
                    return a = !!a, this.b && !this.a ? B(new k("user-token-expired")) : a || !this.b || nb() > this.c - 3E4 ? this.a ? Sj(this, {
                        grant_type: "refresh_token",
                        refresh_token: this.a
                    }) : q(null) : q({
                        accessToken: this.b,
                        expirationTime: this.c,
                        refreshToken: this.a
                    })
                };
                Sc.prototype.D = function() {
                    return {
                        lastLoginAt: this.b,
                        createdAt: this.a
                    }
                };
                t(dc, S);
                t(Q, J);
                Q.prototype.oa = function(a) {
                    this.ka = a;
                    nh(this.b, a)
                };
                Q.prototype.ea = function() {
                    return this.ka
                };
                Q.prototype.xa = function() {
                    return Fa(this.O)
                };
                Q.prototype.Ha = function() {
                    this.w.b && (this.w.stop(), this.w.start())
                };
                p(Q.prototype, "providerId", "firebase");
                (f = Q.prototype).reload = function() {
                    var a = this;
                    return F(this, Ke(this).then(function() {
                        return Ne(a).then(function() {
                            return Ua(a)
                        }).then(fi)
                    }))
                };
                f.ac = function(a) {
                    return this.F(a).then(function(a) {
                        return new function(a) {
                            var b = Lg(a);
                            if (!(b && b.exp && b.auth_time && b.iat)) throw new k("internal-error", "An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.");
                            N(this, {
                                token: a,
                                expirationTime: Ob(1E3 * b.exp),
                                authTime: Ob(1E3 * b.auth_time),
                                issuedAtTime: Ob(1E3 * b.iat),
                                signInProvider: b.firebase && b.firebase.sign_in_provider ? b.firebase.sign_in_provider : null,
                                claims: b
                            })
                        }(a)
                    })
                };
                f.F = function(a) {
                    var b = this;
                    return F(this,
                        Ke(this).then(function() {
                            return b.h.getToken(a)
                        }).then(function(a) {
                            if (!a) throw new k("internal-error");
                            return a.accessToken != b.qa && (Ge(b, a.accessToken), b.dispatchEvent(new dc("tokenChanged"))), Ba(b, "refreshToken", a.refreshToken), a.accessToken
                        }))
                };
                f.uc = function(a) {
                    if (!(a = a.users) || !a.length) throw new k("internal-error");
                    ci(this, {
                        uid: (a = a[0]).localId,
                        displayName: a.displayName,
                        photoURL: a.photoUrl,
                        email: a.email,
                        emailVerified: !!a.emailVerified,
                        phoneNumber: a.phoneNumber,
                        lastLoginAt: a.lastLoginAt,
                        createdAt: a.createdAt
                    });
                    for (var b = function(a) {
                            return (a = a.providerUserInfo) && a.length ? ue(a, function(a) {
                                return new function(a, b, c, d, e, f) {
                                    N(this, {
                                        uid: a,
                                        displayName: d || null,
                                        photoURL: e || null,
                                        email: c || null,
                                        phoneNumber: f || null,
                                        providerId: b
                                    })
                                }(a.rawId, a.providerId, a.email, a.displayName, a.photoUrl, a.phoneNumber)
                            }) : []
                        }(a), c = 0; c < b.length; c++) Me(this, b[c]);
                    Ba(this, "isAnonymous", !(this.email && a.passwordHash || this.providerData && this.providerData.length))
                };
                f.cb = function(a) {
                    var b = this,
                        c = null;
                    return F(this, a.f(this.b, this.uid).then(function(a) {
                        return Va(b,
                            a), c = Vc(b, a, "reauthenticate"), b.i = null, b.reload()
                    }).then(function() {
                        return c
                    }), !0)
                };
                f.vc = function(a) {
                    return xa("firebase.User.prototype.reauthenticateWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential instead."), this.cb(a).then(function() {})
                };
                f.ab = function(a) {
                    var b = this,
                        c = null;
                    return F(this, Uc(this, a.providerId).then(function() {
                        return b.F()
                    }).then(function(c) {
                        return a.c(b.b, c)
                    }).then(function(a) {
                        return c = Vc(b, a, "link"), hi(b, a)
                    }).then(function() {
                        return c
                    }))
                };
                f.mc = function(a) {
                    return xa("firebase.User.prototype.linkWithCredential is deprecated. Please use firebase.User.prototype.linkAndRetrieveDataWithCredential instead."), this.ab(a).then(function(a) {
                        return a.user
                    })
                };
                f.nc = function(a, b) {
                    var c = this;
                    return F(this, Uc(this, "phone").then(function() {
                        return De(di(c), a, b, r(c.ab, c))
                    }))
                };
                f.wc = function(a, b) {
                    var c = this;
                    return F(this, q().then(function() {
                        return De(di(c), a, b, r(c.cb, c))
                    }), !0)
                };
                f.mb = function(a) {
                    var b = this;
                    return F(this, this.F().then(function(c) {
                        return b.b.mb(c,
                            a)
                    }).then(function(a) {
                        return Va(b, a), b.reload()
                    }))
                };
                f.Pc = function(a) {
                    var b = this;
                    return F(this, this.F().then(function(c) {
                        return a.c(b.b, c)
                    }).then(function(a) {
                        return Va(b, a), b.reload()
                    }))
                };
                f.nb = function(a) {
                    var b = this;
                    return F(this, this.F().then(function(c) {
                        return b.b.nb(c, a)
                    }).then(function(a) {
                        return Va(b, a), b.reload()
                    }))
                };
                f.ob = function(a) {
                    if (void 0 === a.displayName && void 0 === a.photoURL) return Ke(this);
                    var b = this;
                    return F(this, this.F().then(function(c) {
                        return b.b.ob(c, {
                            displayName: a.displayName,
                            photoUrl: a.photoURL
                        })
                    }).then(function(a) {
                        return Va(b,
                            a), Ba(b, "displayName", a.displayName || null), Ba(b, "photoURL", a.photoUrl || null), M(b.providerData, function(a) {
                            "password" === a.providerId && (p(a, "displayName", b.displayName), p(a, "photoURL", b.photoURL))
                        }), Ua(b)
                    }).then(fi))
                };
                f.Nc = function(a) {
                    var b = this;
                    return F(this, Ne(this).then(function(c) {
                        return Ea(Le(b), a) ? function(a, b, c) {
                            return w(a, tk, {
                                idToken: b,
                                deleteProvider: c
                            })
                        }(b.b, c, [a]).then(function(a) {
                            var c = {};
                            return M(a.providerUserInfo || [], function(a) {
                                    c[a.providerId] = !0
                                }), M(Le(b), function(a) {
                                    c[a] || gi(b, a)
                                }),
                                c[ya.PROVIDER_ID] || p(b, "phoneNumber", null), Ua(b)
                        }) : Ua(b).then(function() {
                            throw new k("no-such-provider");
                        })
                    }))
                };
                f["delete"] = function() {
                    var a = this;
                    return F(this, this.F().then(function(b) {
                        return w(a.b, sk, {
                            idToken: b
                        })
                    }).then(function() {
                        a.dispatchEvent(new dc("userDeleted"))
                    })).then(function() {
                        for (var b = 0; b < a.G.length; b++) a.G[b].cancel("app-deleted");
                        He(a, null);
                        Ie(a, null);
                        a.G = [];
                        a.C = !0;
                        Je(a);
                        p(a, "refreshToken", null);
                        a.a && a.a.unsubscribe(a)
                    })
                };
                f.sb = function(a, b) {
                    return !!("linkViaPopup" == a && (this.g || null) ==
                        b && this.f || "reauthViaPopup" == a && (this.g || null) == b && this.f || "linkViaRedirect" == a && (this.aa || null) == b || "reauthViaRedirect" == a && (this.aa || null) == b)
                };
                f.ha = function(a, b, c, d) {
                    "linkViaPopup" != a && "reauthViaPopup" != a || d != (this.g || null) || (c && this.v ? this.v(c) : b && !c && this.f && this.f(b), this.c && (this.c.cancel(), this.c = null), delete this.f, delete this.v)
                };
                f.wa = function(a, b) {
                    return "linkViaPopup" == a && b == (this.g || null) ? r(this.xb, this) : "reauthViaPopup" == a && b == (this.g || null) ? r(this.yb, this) : "linkViaRedirect" == a && (this.aa ||
                        null) == b ? r(this.xb, this) : "reauthViaRedirect" == a && (this.aa || null) == b ? r(this.yb, this) : null
                };
                f.oc = function(a) {
                    var b = this;
                    return ii(this, "linkViaPopup", a, function() {
                        return Uc(b, a.providerId).then(function() {
                            return Ua(b)
                        })
                    }, !1)
                };
                f.xc = function(a) {
                    return ii(this, "reauthViaPopup", a, function() {
                        return q()
                    }, !0)
                };
                f.pc = function(a) {
                    var b = this;
                    return ki(this, "linkViaRedirect", a, function() {
                        return Uc(b, a.providerId)
                    }, !1)
                };
                f.yc = function(a) {
                    return ki(this, "reauthViaRedirect", a, function() {
                        return q()
                    }, !0)
                };
                f.xb = function(a,
                    b) {
                    var c = this;
                    this.c && (this.c.cancel(), this.c = null);
                    var d = null;
                    return F(this, this.F().then(function(d) {
                        return vh(c.b, {
                            requestUri: a,
                            sessionId: b,
                            idToken: d
                        })
                    }).then(function(a) {
                        return d = Vc(c, a, "link"), hi(c, a)
                    }).then(function() {
                        return d
                    }))
                };
                f.yb = function(a, b) {
                    var c = this;
                    this.c && (this.c.cancel(), this.c = null);
                    var d = null;
                    return F(this, q().then(function() {
                            return xc(wh(c.b, {
                                requestUri: a,
                                sessionId: b
                            }), c.uid)
                        }).then(function(a) {
                            return d = Vc(c, a, "reauthenticate"), Va(c, a), c.i = null, c.reload()
                        }).then(function() {
                            return d
                        }),
                        !0)
                };
                f.gb = function(a) {
                    var b = this,
                        c = null;
                    return F(this, this.F().then(function(b) {
                        return c = b, void 0 === a || Bb(a) ? {} : Jd(new Hd(a))
                    }).then(function(a) {
                        return b.b.gb(c, a)
                    }).then(function(a) {
                        if (b.email != a) return b.reload()
                    }).then(function() {}))
                };
                f.toJSON = function() {
                    return this.D()
                };
                f.D = function() {
                    var a = {
                        uid: this.uid,
                        displayName: this.displayName,
                        photoURL: this.photoURL,
                        email: this.email,
                        emailVerified: this.emailVerified,
                        phoneNumber: this.phoneNumber,
                        isAnonymous: this.isAnonymous,
                        providerData: [],
                        apiKey: this.l,
                        appName: this.o,
                        authDomain: this.u,
                        stsTokenManager: this.h.D(),
                        redirectEventId: this.aa || null
                    };
                    return this.metadata && ka(a, this.metadata.D()), M(this.providerData, function(b) {
                        a.providerData.push(function(a) {
                            var b, c = {};
                            for (b in a) a.hasOwnProperty(b) && (c[b] = a[b]);
                            return c
                        }(b))
                    }), a
                };
                var Oe = {
                    name: "redirectUser",
                    A: "session"
                };
                Pe.prototype.g = function() {
                    var a = this,
                        b = ja("local");
                    tb(this, function() {
                        return q().then(function() {
                            return a.c && "local" != a.c.A ? a.b.get(b, a.a) : null
                        }).then(function(c) {
                            if (c) return Re(a, "local").then(function() {
                                a.c =
                                    b
                            })
                        })
                    })
                };
                var Qe = {
                    name: "persistence",
                    A: "session"
                };
                Pe.prototype.jb = function(a) {
                    var b = null,
                        c = this;
                    return function(a) {
                        var b = new k("invalid-persistence-type"),
                            c = new k("unsupported-persistence-type");
                        a: {
                            for (d in sb)
                                if (sb[d] == a) {
                                    var d = !0;
                                    break a
                                } d = !1
                        }
                        if (!d || "string" != typeof a) throw b;
                        switch (ea()) {
                            case "ReactNative":
                                if ("session" === a) throw c;
                                break;
                            case "Node":
                                if ("none" !== a) throw c;
                                break;
                            default:
                                if (!Ed() && "none" !== a) throw c;
                        }
                    }(a), tb(this, function() {
                        return a != c.c.A ? c.b.get(c.c, c.a).then(function(d) {
                            return b =
                                d, Re(c, a)
                        }).then(function() {
                            if (c.c = ja(a), b) return c.b.set(c.c, b, c.a)
                        }) : q()
                    })
                };
                t(aa, J);
                t(qi, S);
                t(ri, S);
                (f = aa.prototype).jb = function(a) {
                    return A(this, this.h.jb(a))
                };
                f.oa = function(a) {
                    this.W === a || this.l || (this.W = a, nh(this.b, this.W), this.dispatchEvent(new qi(this.ea())))
                };
                f.ea = function() {
                    return this.W
                };
                f.Qc = function() {
                    var a = l.navigator;
                    this.oa(a && (a.languages && a.languages[0] || a.language || a.userLanguage) || null)
                };
                f.qc = function(a) {
                    this.G.push(a);
                    oh(this.b, n.SDK_VERSION ? gb(n.SDK_VERSION, this.G) : null);
                    this.dispatchEvent(new ri(this.G))
                };
                f.xa = function() {
                    return Fa(this.G)
                };
                f.toJSON = function() {
                    return {
                        apiKey: this.app.options.apiKey,
                        authDomain: this.app.options.authDomain,
                        appName: this.app.name,
                        currentUser: this.currentUser && this.currentUser.D()
                    }
                };
                f.sb = function(a, b) {
                    switch (a) {
                        case "unknown":
                        case "signInViaRedirect":
                            return !0;
                        case "signInViaPopup":
                            return this.g == b && !!this.f;
                        default:
                            return !1
                    }
                };
                f.ha = function(a, b, c, d) {
                    "signInViaPopup" == a && this.g == d && (c && this.v ? this.v(c) : b && !c && this.f && this.f(b), this.c && (this.c.cancel(), this.c = null), delete this.f,
                        delete this.v)
                };
                f.wa = function(a, b) {
                    return "signInViaRedirect" == a || "signInViaPopup" == a && this.g == b && this.f ? r(this.Xb, this) : null
                };
                f.Xb = function(a, b) {
                    var c = this;
                    a = {
                        requestUri: a,
                        sessionId: b
                    };
                    this.c && (this.c.cancel(), this.c = null);
                    var d = null,
                        e = null,
                        f = uh(c.b, a).then(function(a) {
                            return d = zc(a), e = Md(a), a
                        });
                    return A(this, a = c.V.then(function() {
                        return f
                    }).then(function(a) {
                        return si(c, a)
                    }).then(function() {
                        return qa({
                            user: c.currentUser,
                            credential: d,
                            additionalUserInfo: e,
                            operationType: "signIn"
                        })
                    }))
                };
                f.Hc = function(a) {
                    if (!Oa()) return B(new k("operation-not-supported-in-this-environment"));
                    var b = this,
                        c = Kd(a.providerId),
                        d = Na(),
                        e = null;
                    (!Mb() || Dd()) && this.app.options.authDomain && a.isOAuthProvider && (e = Zb(this.app.options.authDomain, this.app.options.apiKey, this.app.name, "signInViaPopup", a, null, d, n.SDK_VERSION || null));
                    var f = sg(e, c && c.Ba, c && c.Aa);
                    return A(this, c = Se(this).then(function(b) {
                        return Xh(b, f, "signInViaPopup", a, d, !!e)
                    }).then(function() {
                        return new u(function(a, c) {
                            b.ha("signInViaPopup", null, new k("cancelled-popup-request"), b.g);
                            b.f = a;
                            b.v = c;
                            b.g = d;
                            b.c = b.a.Ea(b, "signInViaPopup", f, d)
                        })
                    }).then(function(a) {
                        return f &&
                            Ma(f), a ? qa(a) : null
                    }).s(function(a) {
                        throw f && Ma(f), a;
                    }))
                };
                f.Ic = function(a) {
                    if (!Oa()) return B(new k("operation-not-supported-in-this-environment"));
                    var b = this;
                    return A(this, Se(this).then(function() {
                        return tb(a = b.h, function() {
                            return a.b.set(Qe, a.c.A, a.a)
                        });
                        var a
                    }).then(function() {
                        return b.a.Ca("signInViaRedirect", a)
                    }))
                };
                f.fa = function() {
                    if (!Oa()) return B(new k("operation-not-supported-in-this-environment"));
                    var a = this;
                    return A(this, Se(this).then(function() {
                        return a.a.fa()
                    }).then(function(a) {
                        return a ?
                            qa(a) : null
                    }))
                };
                f.Oc = function(a) {
                    if (!a) return B(new k("null-user"));
                    var b = this,
                        c = {};
                    c.apiKey = this.app.options.apiKey;
                    c.authDomain = this.app.options.authDomain;
                    c.appName = this.app.name;
                    var d = function(a, b, c, d) {
                        b = b || {
                            apiKey: a.l,
                            authDomain: a.u,
                            appName: a.o
                        };
                        var e = a.h,
                            f = {};
                        return f[U] = e.b, f.refreshToken = e.a, f.expiresIn = (e.c - nb()) / 1E3, b = new Q(b, f), c && (b.ba = c), d && ec(b, d), Tc(b, a), b
                    }(a, c, b.w, b.xa());
                    return A(this, this.i.then(function() {
                        if (b.app.options.apiKey != a.l) return d.reload()
                    }).then(function() {
                        return b.currentUser &&
                            a.uid == b.currentUser.uid ? (Tc(b.currentUser, a), b.Z(a)) : (ub(b, d), fc(d), b.Z(d))
                    }).then(function() {
                        gc(b)
                    }))
                };
                f.kb = function() {
                    var a = this;
                    return A(this, this.i.then(function() {
                        return a.currentUser ? (ub(a, null), oi(a.h).then(function() {
                            gc(a)
                        })) : q()
                    }))
                };
                f.Jc = function() {
                    var a = this;
                    return pi(this.h, this.app.options.authDomain).then(function(b) {
                        if (!a.l) {
                            var c;
                            if (c = a.currentUser && b) {
                                c = a.currentUser.uid;
                                var d = b.uid;
                                c = void 0 !== c && null !== c && "" !== c && void 0 !== d && null !== d && "" !== d && c == d
                            }
                            if (c) return Tc(a.currentUser, b),
                                a.currentUser.F();
                            (a.currentUser || b) && (ub(a, b), b && (fc(b), b.ba = a.w), a.a && a.a.subscribe(a), gc(a))
                        }
                    })
                };
                f.Z = function(a) {
                    return ni(this.h, a)
                };
                f.Yb = function() {
                    gc(this);
                    this.Z(this.currentUser)
                };
                f.gc = function() {
                    this.kb()
                };
                f.hc = function() {
                    this.kb()
                };
                f.ic = function(a) {
                    var b = this;
                    this.addAuthTokenListener(function() {
                        a.next(b.currentUser)
                    })
                };
                f.jc = function(a) {
                    var b = this;
                    ! function(a, b) {
                        a.I.push(b);
                        A(a, a.i.then(function() {
                            !a.l && Ea(a.I, b) && a.O !== a.getUid() && (a.O = a.getUid(), b(Wc(a)))
                        }))
                    }(this, function() {
                        a.next(b.currentUser)
                    })
                };
                f.sc = function(a, b, c) {
                    var d = this;
                    return this.X && n.Promise.resolve().then(function() {
                        I(a) ? a(d.currentUser) : I(a.next) && a.next(d.currentUser)
                    }), this.Pb(a, b, c)
                };
                f.rc = function(a, b, c) {
                    var d = this;
                    return this.X && n.Promise.resolve().then(function() {
                        d.O = d.getUid();
                        I(a) ? a(d.currentUser) : I(a.next) && a.next(d.currentUser)
                    }), this.Qb(a, b, c)
                };
                f.$b = function(a) {
                    var b = this;
                    return A(this, this.i.then(function() {
                        return b.currentUser ? b.currentUser.F(a).then(function(a) {
                            return {
                                accessToken: a
                            }
                        }) : null
                    }))
                };
                f.Jb = function(a) {
                    var b =
                        this;
                    return this.i.then(function() {
                        return hc(b, w(b.b, vk, {
                            token: a
                        }))
                    }).then(function(a) {
                        var c = a.user;
                        return Ba(c, "isAnonymous", !1), b.Z(c), a
                    })
                };
                f.Bc = function(a) {
                    return xa("firebase.auth.Auth.prototype.signInAndRetrieveDataWithCustomToken is deprecated. Please use firebase.auth.Auth.prototype.signInWithCustomToken instead."), this.Jb(a)
                };
                f.Cc = function(a, b) {
                    return xa("firebase.auth.Auth.prototype.signInAndRetrieveDataWithEmailAndPassword is deprecated. Please use firebase.auth.Auth.prototype.signInWithEmailAndPassword instead."),
                        this.Kb(a, b)
                };
                f.Kb = function(a, b) {
                    var c = this;
                    return this.i.then(function() {
                        return hc(c, w(c.b, Hi, {
                            email: a,
                            password: b
                        }))
                    })
                };
                f.ub = function(a, b) {
                    var c = this;
                    return this.i.then(function() {
                        return hc(c, w(c.b, rk, {
                            email: a,
                            password: b
                        }))
                    })
                };
                f.Sb = function(a, b) {
                    return xa("firebase.auth.Auth.prototype.createUserAndRetrieveDataWithEmailAndPassword is deprecated. Please use firebase.auth.Auth.prototype.createUserWithEmailAndPassword instead."), this.ub(a, b)
                };
                f.Ec = function(a) {
                    return xa("firebase.auth.Auth.prototype.signInWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential instead."),
                        this.Oa(a).then(function(a) {
                            return a.user
                        })
                };
                f.Oa = function(a) {
                    var b = this;
                    return this.i.then(function() {
                        return hc(b, a.ya(b.b))
                    })
                };
                f.Pa = function() {
                    var a = this;
                    return this.i.then(function() {
                        var b = a.currentUser;
                        return b && b.isAnonymous ? qa({
                            user: b,
                            credential: null,
                            additionalUserInfo: qa({
                                providerId: null,
                                isNewUser: !1
                            }),
                            operationType: "signIn"
                        }) : hc(a, a.b.Pa()).then(function(b) {
                            var c = b.user;
                            return Ba(c, "isAnonymous", !0), a.Z(c), b
                        })
                    })
                };
                f.Dc = function() {
                    return xa("firebase.auth.Auth.prototype.signInAnonymouslyAndRetrieveData is deprecated. Please use firebase.auth.Auth.prototype.signInAnonymously instead."),
                        this.Pa()
                };
                f.getUid = function() {
                    return this.currentUser && this.currentUser.uid || null
                };
                f.Rb = function(a) {
                    this.addAuthTokenListener(a);
                    this.u++;
                    0 < this.u && this.currentUser && ei(this.currentUser)
                };
                f.zc = function(a) {
                    var b = this;
                    M(this.o, function(c) {
                        c == a && b.u--
                    });
                    0 > this.u && (this.u = 0);
                    0 == this.u && this.currentUser && Je(this.currentUser);
                    this.removeAuthTokenListener(a)
                };
                f.addAuthTokenListener = function(a) {
                    var b = this;
                    this.o.push(a);
                    A(this, this.i.then(function() {
                        b.l || Ea(b.o, a) && a(Wc(b))
                    }))
                };
                f.removeAuthTokenListener =
                    function(a) {
                        X(this.o, function(b) {
                            return b == a
                        })
                    };
                f["delete"] = function() {
                    this.l = !0;
                    for (var a = 0; a < this.N.length; a++) this.N[a].cancel("app-deleted");
                    return this.N = [], this.h && (a = this.h).b.removeListener(ja("local"), a.a, this.ka), this.a && this.a.unsubscribe(this), n.Promise.resolve()
                };
                f.Vb = function(a) {
                    return xa("firebase.auth.Auth.prototype.fetchProvidersForEmail is deprecated. Please use firebase.auth.Auth.prototype.fetchSignInMethodsForEmail instead."), A(this, function(a, c) {
                        return w(a, Ki, {
                            identifier: c,
                            continueUri: Lb() ?
                                eb() : "http://localhost"
                        }).then(function(a) {
                            return a.allProviders || []
                        })
                    }(this.b, a))
                };
                f.Wb = function(a) {
                    return A(this, function(a, c) {
                        return w(a, Ki, {
                            identifier: c,
                            continueUri: Lb() ? eb() : "http://localhost"
                        }).then(function(a) {
                            return a.signinMethods || []
                        })
                    }(this.b, a))
                };
                f.kc = function(a) {
                    return !!Yg(a)
                };
                f.ib = function(a, b) {
                    var c = this;
                    return A(this, q().then(function() {
                        var a = new Hd(b);
                        if (!a.c) throw new k("argument-error", Id + " must be true when sending sign in link to email");
                        return Jd(a)
                    }).then(function(b) {
                        return c.b.ib(a,
                            b)
                    }).then(function() {}))
                };
                f.Rc = function(a) {
                    return this.Ja(a).then(function(a) {
                        return a.data.email
                    })
                };
                f.Xa = function(a, b) {
                    return A(this, this.b.Xa(a, b).then(function() {}))
                };
                f.Ja = function(a) {
                    return A(this, this.b.Ja(a).then(function(a) {
                        return new function(a) {
                            var b = {},
                                c = a.email,
                                f = a.newEmail;
                            if (!(a = a.requestType) || "EMAIL_SIGNIN" != a && !c) throw Error("Invalid provider user info!");
                            b.fromEmail = f || null;
                            b.email = c || null;
                            p(this, "operation", a);
                            p(this, "data", Gd(b))
                        }(a)
                    }))
                };
                f.Va = function(a) {
                    return A(this, this.b.Va(a).then(function() {}))
                };
                f.hb = function(a, b) {
                    var c = this;
                    return A(this, q().then(function() {
                        return void 0 === b || Bb(b) ? {} : Jd(new Hd(b))
                    }).then(function(b) {
                        return c.b.hb(a, b)
                    }).then(function() {}))
                };
                f.Gc = function(a, b) {
                    return A(this, De(this, a, b, r(this.Oa, this)))
                };
                f.Fc = function(a, b) {
                    var c = this;
                    return A(this, q().then(function() {
                        var d = Xg(a, b || eb());
                        return c.Oa(d)
                    }))
                };
                ic.prototype.render = function() {};
                ic.prototype.reset = function() {};
                ic.prototype.getResponse = function() {};
                ic.prototype.execute = function() {};
                var jf = null;
                vb.prototype.render =
                    function(a, b) {
                        return this.a[this.b.toString()] = new Xc(a, b), this.b++
                    };
                vb.prototype.reset = function(a) {
                    var b = Te(this, a);
                    a = ti(a);
                    b && a && (b["delete"](), delete this.a[a])
                };
                vb.prototype.getResponse = function(a) {
                    return (a = Te(this, a)) ? a.getResponse() : null
                };
                vb.prototype.execute = function(a) {
                    (a = Te(this, a)) && a.execute()
                };
                Xc.prototype.getResponse = function() {
                    return Ue(this), this.b
                };
                Xc.prototype.execute = function() {
                    Ue(this);
                    var a = this;
                    this.a || (this.a = setTimeout(function() {
                        a.b = function() {
                            for (var a = 50, b = []; 0 < a;) b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 *
                                Math.random()))), a--;
                            return b.join("")
                        }();
                        var b = a.c.callback,
                            c = a.c["expired-callback"];
                        if (b) try {
                            b(a.b)
                        } catch (d) {}
                        a.a = setTimeout(function() {
                            if (a.a = null, a.b = null, c) try {
                                c()
                            } catch (d) {}
                            a.h && a.execute()
                        }, 6E4)
                    }, 500))
                };
                Xc.prototype["delete"] = function() {
                    Ue(this);
                    this.g = !0;
                    clearTimeout(this.a);
                    this.a = null;
                    T(this.f, "click", this.i)
                };
                Ve.prototype.g = function() {
                    return jf || (jf = new vb), q(jf)
                };
                Ve.prototype.c = function() {};
                var Ye = null,
                    zk = Ib("https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit&hl=%{hl}"),
                    Ak = new wa(3E4, 6E4);
                We.prototype.g = function(a) {
                    var b = this;
                    return new u(function(c, d) {
                        var e = setTimeout(function() {
                            d(new k("network-request-failed"))
                        }, Ak.get());
                        !l.grecaptcha || a !== b.f && !b.b ? (l[b.a] = function() {
                                if (l.grecaptcha) {
                                    b.f = a;
                                    var f = l.grecaptcha.render;
                                    l.grecaptcha.render = function(a, c) {
                                        return a = f(a, c), b.b++, a
                                    };
                                    clearTimeout(e);
                                    c(l.grecaptcha)
                                } else clearTimeout(e), d(new k("internal-error"));
                                delete l[b.a]
                            }, q(be(xd(zk, {
                                onload: b.a,
                                hl: a || ""
                            }))).s(function() {
                                clearTimeout(e);
                                d(new k("internal-error", "Unable to load external reCAPTCHA dependencies!"))
                            })) :
                            (clearTimeout(e), c(l.grecaptcha))
                    })
                };
                We.prototype.c = function() {
                    this.b--
                };
                var Ze = null,
                    vi = "callback",
                    xi = "expired-callback",
                    ui = "sitekey",
                    Uj = "size";
                (f = Xe.prototype).za = function() {
                    var a = this;
                    return this.f ? this.f : this.f = $e(this, q().then(function() {
                        if (Lb() && !pa()) return Bd();
                        throw new k("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");
                    }).then(function() {
                        return a.o.g(a.v())
                    }).then(function(b) {
                        return a.g = b, w(a.u, uk, {})
                    }).then(function(b) {
                        a.a[ui] =
                            b.recaptchaSiteKey
                    }).s(function(b) {
                        throw a.f = null, b;
                    }))
                };
                f.render = function() {
                    Yc(this);
                    var a = this;
                    return $e(this, this.za().then(function() {
                        if (null === a.c) {
                            var b = a.l;
                            if (!a.i) {
                                var c = Jb(b);
                                b = fj("DIV");
                                c.appendChild(b)
                            }
                            a.c = a.g.render(b, a.a)
                        }
                        return a.c
                    }))
                };
                f.verify = function() {
                    Yc(this);
                    var a = this;
                    return $e(this, this.render().then(function(b) {
                        return new u(function(c) {
                            var d = a.g.getResponse(b);
                            if (d) c(d);
                            else {
                                var e = function(b) {
                                    b && (function(a, b) {
                                        X(a.m, function(a) {
                                            return a == b
                                        })
                                    }(a, e), c(b))
                                };
                                a.m.push(e);
                                a.i && a.g.execute(a.c)
                            }
                        })
                    }))
                };
                f.reset = function() {
                    Yc(this);
                    null !== this.c && this.g.reset(this.c)
                };
                f.clear = function() {
                    Yc(this);
                    this.C = !0;
                    this.o.c();
                    for (var a = 0; a < this.h.length; a++) this.h[a].cancel("RecaptchaVerifier instance has been destroyed.");
                    if (!this.i) {
                        a = Jb(this.l);
                        for (var b; b = a.firstChild;) a.removeChild(b)
                    }
                };
                t(af, Xe);
                var zi = "First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" ");
                H(aa.prototype, {
                    Va: {
                        name: "applyActionCode",
                        j: [m("code")]
                    },
                    Ja: {
                        name: "checkActionCode",
                        j: [m("code")]
                    },
                    Xa: {
                        name: "confirmPasswordReset",
                        j: [m("code"), m("newPassword")]
                    },
                    ub: {
                        name: "createUserWithEmailAndPassword",
                        j: [m("email"), m("password")]
                    },
                    Sb: {
                        name: "createUserAndRetrieveDataWithEmailAndPassword",
                        j: [m("email"), m("password")]
                    },
                    Vb: {
                        name: "fetchProvidersForEmail",
                        j: [m("email")]
                    },
                    Wb: {
                        name: "fetchSignInMethodsForEmail",
                        j: [m("email")]
                    },
                    fa: {
                        name: "getRedirectResult",
                        j: []
                    },
                    kc: {
                        name: "isSignInWithEmailLink",
                        j: [m("emailLink")]
                    },
                    rc: {
                        name: "onAuthStateChanged",
                        j: [K(G(), wb(), "nextOrObserver"), wb("opt_error", !0), wb("opt_completed", !0)]
                    },
                    sc: {
                        name: "onIdTokenChanged",
                        j: [K(G(), wb(), "nextOrObserver"), wb("opt_error", !0), wb("opt_completed", !0)]
                    },
                    hb: {
                        name: "sendPasswordResetEmail",
                        j: [m("email"), K(G("opt_actionCodeSettings", !0), Ca(null, !0), "opt_actionCodeSettings", !0)]
                    },
                    ib: {
                        name: "sendSignInLinkToEmail",
                        j: [m("email"), G("actionCodeSettings")]
                    },
                    jb: {
                        name: "setPersistence",
                        j: [m("persistence")]
                    },
                    Oa: {
                        name: "signInAndRetrieveDataWithCredential",
                        j: [Wa()]
                    },
                    Pa: {
                        name: "signInAnonymously",
                        j: []
                    },
                    Dc: {
                        name: "signInAnonymouslyAndRetrieveData",
                        j: []
                    },
                    Ec: {
                        name: "signInWithCredential",
                        j: [Wa()]
                    },
                    Jb: {
                        name: "signInWithCustomToken",
                        j: [m("token")]
                    },
                    Bc: {
                        name: "signInAndRetrieveDataWithCustomToken",
                        j: [m("token")]
                    },
                    Kb: {
                        name: "signInWithEmailAndPassword",
                        j: [m("email"), m("password")]
                    },
                    Fc: {
                        name: "signInWithEmailLink",
                        j: [m("email"), m("emailLink", !0)]
                    },
                    Cc: {
                        name: "signInAndRetrieveDataWithEmailAndPassword",
                        j: [m("email"), m("password")]
                    },
                    Gc: {
                        name: "signInWithPhoneNumber",
                        j: [m("phoneNumber"), Zc()]
                    },
                    Hc: {
                        name: "signInWithPopup",
                        j: [{
                            name: "authProvider",
                            K: "a valid Auth provider",
                            optional: !1,
                            M: function(a) {
                                return !!(a &&
                                    a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"))
                            }
                        }]
                    },
                    Ic: {
                        name: "signInWithRedirect",
                        j: [{
                            name: "authProvider",
                            K: "a valid Auth provider",
                            optional: !1,
                            M: function(a) {
                                return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"))
                            }
                        }]
                    },
                    Oc: {
                        name: "updateCurrentUser",
                        j: [K({
                            name: "user",
                            K: "an instance of Firebase User",
                            optional: !1,
                            M: function(a) {
                                return !!(a && a instanceof Q)
                            }
                        }, Ca(), "user")]
                    },
                    kb: {
                        name: "signOut",
                        j: []
                    },
                    toJSON: {
                        name: "toJSON",
                        j: [m(null, !0)]
                    },
                    Qc: {
                        name: "useDeviceLanguage",
                        j: []
                    },
                    Rc: {
                        name: "verifyPasswordResetCode",
                        j: [m("code")]
                    }
                });
                Bi(aa.prototype, {
                    lc: {
                        name: "languageCode",
                        qb: K(m(), Ca(), "languageCode")
                    }
                });
                aa.Persistence = sb;
                aa.Persistence.LOCAL = "local";
                aa.Persistence.SESSION = "session";
                aa.Persistence.NONE = "none";
                H(Q.prototype, {
                    "delete": {
                        name: "delete",
                        j: []
                    },
                    ac: {
                        name: "getIdTokenResult",
                        j: [bf("opt_forceRefresh", !0)]
                    },
                    F: {
                        name: "getIdToken",
                        j: [bf("opt_forceRefresh", !0)]
                    },
                    ab: {
                        name: "linkAndRetrieveDataWithCredential",
                        j: [Wa()]
                    },
                    mc: {
                        name: "linkWithCredential",
                        j: [Wa()]
                    },
                    nc: {
                        name: "linkWithPhoneNumber",
                        j: [m("phoneNumber"), Zc()]
                    },
                    oc: {
                        name: "linkWithPopup",
                        j: [{
                            name: "authProvider",
                            K: "a valid Auth provider",
                            optional: !1,
                            M: function(a) {
                                return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"))
                            }
                        }]
                    },
                    pc: {
                        name: "linkWithRedirect",
                        j: [{
                            name: "authProvider",
                            K: "a valid Auth provider",
                            optional: !1,
                            M: function(a) {
                                return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"))
                            }
                        }]
                    },
                    cb: {
                        name: "reauthenticateAndRetrieveDataWithCredential",
                        j: [Wa()]
                    },
                    vc: {
                        name: "reauthenticateWithCredential",
                        j: [Wa()]
                    },
                    wc: {
                        name: "reauthenticateWithPhoneNumber",
                        j: [m("phoneNumber"), Zc()]
                    },
                    xc: {
                        name: "reauthenticateWithPopup",
                        j: [{
                            name: "authProvider",
                            K: "a valid Auth provider",
                            optional: !1,
                            M: function(a) {
                                return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"))
                            }
                        }]
                    },
                    yc: {
                        name: "reauthenticateWithRedirect",
                        j: [{
                            name: "authProvider",
                            K: "a valid Auth provider",
                            optional: !1,
                            M: function(a) {
                                return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"))
                            }
                        }]
                    },
                    reload: {
                        name: "reload",
                        j: []
                    },
                    gb: {
                        name: "sendEmailVerification",
                        j: [K(G("opt_actionCodeSettings", !0), Ca(null, !0), "opt_actionCodeSettings", !0)]
                    },
                    toJSON: {
                        name: "toJSON",
                        j: [m(null, !0)]
                    },
                    Nc: {
                        name: "unlink",
                        j: [m("provider")]
                    },
                    mb: {
                        name: "updateEmail",
                        j: [m("email")]
                    },
                    nb: {
                        name: "updatePassword",
                        j: [m("password")]
                    },
                    Pc: {
                        name: "updatePhoneNumber",
                        j: [Wa("phone")]
                    },
                    ob: {
                        name: "updateProfile",
                        j: [G("profile")]
                    }
                });
                H(vb.prototype, {
                    execute: {
                        name: "execute"
                    },
                    render: {
                        name: "render"
                    },
                    reset: {
                        name: "reset"
                    },
                    getResponse: {
                        name: "getResponse"
                    }
                });
                H(ic.prototype, {
                    execute: {
                        name: "execute"
                    },
                    render: {
                        name: "render"
                    },
                    reset: {
                        name: "reset"
                    },
                    getResponse: {
                        name: "getResponse"
                    }
                });
                H(u.prototype, {
                    ia: {
                        name: "finally"
                    },
                    s: {
                        name: "catch"
                    },
                    then: {
                        name: "then"
                    }
                });
                Bi($h.prototype, {
                    appVerificationDisabled: {
                        name: "appVerificationDisabledForTesting",
                        qb: bf("appVerificationDisabledForTesting")
                    }
                });
                H(Ce.prototype, {
                    confirm: {
                        name: "confirm",
                        j: [m("verificationCode")]
                    }
                });
                L(V, "credential", function(a, b) {
                    return new kb(a, b)
                }, [m("email"), m("password")]);
                H(Pa.prototype, {
                    ta: {
                        name: "addScope",
                        j: [m("scope")]
                    },
                    Da: {
                        name: "setCustomParameters",
                        j: [G("customOAuthParameters")]
                    }
                });
                L(Pa, "credential", Sg, [K(m(), G(), "token")]);
                L(V, "credentialWithLink", Xg, [m("email"), m("emailLink")]);
                H(Qa.prototype, {
                    ta: {
                        name: "addScope",
                        j: [m("scope")]
                    },
                    Da: {
                        name: "setCustomParameters",
                        j: [G("customOAuthParameters")]
                    }
                });
                L(Qa, "credential", Tg, [K(m(), G(), "token")]);
                H(Ra.prototype, {
                    ta: {
                        name: "addScope",
                        j: [m("scope")]
                    },
                    Da: {
                        name: "setCustomParameters",
                        j: [G("customOAuthParameters")]
                    }
                });
                L(Ra, "credential", Ug, [K(m(), K(G(), Ca()), "idToken"), K(m(), Ca(), "accessToken", !0)]);
                H(jb.prototype, {
                    Da: {
                        name: "setCustomParameters",
                        j: [G("customOAuthParameters")]
                    }
                });
                L(jb, "credential", Wg, [K(m(), G(), "token"), m("secret", !0)]);
                H(P.prototype, {
                    ta: {
                        name: "addScope",
                        j: [m("scope")]
                    },
                    credential: {
                        name: "credential",
                        j: [K(m(), Ca(), "idToken", !0), K(m(), Ca(), "accessToken", !0)]
                    },
                    Da: {
                        name: "setCustomParameters",
                        j: [G("customOAuthParameters")]
                    }
                });
                L(ya, "credential", Zg, [m("verificationId"), m("verificationCode")]);
                H(ya.prototype, {
                    Ta: {
                        name: "verifyPhoneNumber",
                        j: [m("phoneNumber"), Zc()]
                    }
                });
                H(k.prototype, {
                    toJSON: {
                        name: "toJSON",
                        j: [m(null, !0)]
                    }
                });
                H(Rb.prototype, {
                    toJSON: {
                        name: "toJSON",
                        j: [m(null, !0)]
                    }
                });
                H(Td.prototype, {
                    toJSON: {
                        name: "toJSON",
                        j: [m(null, !0)]
                    }
                });
                H(af.prototype, {
                    clear: {
                        name: "clear",
                        j: []
                    },
                    render: {
                        name: "render",
                        j: []
                    },
                    verify: {
                        name: "verify",
                        j: []
                    }
                });
                (function() {
                    if (void 0 === n || !n.INTERNAL || !n.INTERNAL.registerService) throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");
                    var a = {
                        Auth: aa,
                        Error: k
                    };
                    L(a, "EmailAuthProvider", V, []);
                    L(a, "FacebookAuthProvider", Pa, []);
                    L(a, "GithubAuthProvider",
                        Qa, []);
                    L(a, "GoogleAuthProvider", Ra, []);
                    L(a, "TwitterAuthProvider", jb, []);
                    L(a, "OAuthProvider", P, [m("providerId")]);
                    L(a, "PhoneAuthProvider", ya, [{
                        name: "auth",
                        K: "an instance of Firebase Auth",
                        optional: !0,
                        M: function(a) {
                            return !!(a && a instanceof aa)
                        }
                    }]);
                    L(a, "RecaptchaVerifier", af, [K(m(), {
                        name: "",
                        K: "an HTML element",
                        optional: !1,
                        M: function(a) {
                            return !!(a && a instanceof Element)
                        }
                    }, "recaptchaContainer"), G("recaptchaParameters", !0), {
                        name: "app",
                        K: "an instance of Firebase App",
                        optional: !0,
                        M: function(a) {
                            return !!(a &&
                                a instanceof n.app.App)
                        }
                    }]);
                    n.INTERNAL.registerService("auth", function(a, c) {
                        return c({
                            INTERNAL: {
                                getUid: r((a = new aa(a)).getUid, a),
                                getToken: r(a.$b, a),
                                addAuthTokenListener: r(a.Rb, a),
                                removeAuthTokenListener: r(a.zc, a)
                            }
                        }), a
                    }, a, function(a, c) {
                        if ("create" === a) try {
                            c.auth()
                        } catch (d) {}
                    });
                    n.INTERNAL.extendNamespace({
                        User: Q
                    })
                })()
            }.call("undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    } catch (x) {
        throw console.error(x), Error("Cannot instantiate firebase-auth - be sure to load firebase-app.js first.");
    }
}(this.firebase = this.firebase || {}, firebase);
// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/content/moment.min.js

! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";

    function e() {
        return Qe.apply(null, arguments)
    }

    function t(e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
    }

    function n(e) {
        return null != e && "[object Object]" === Object.prototype.toString.call(e)
    }

    function s(e) {
        return void 0 === e
    }

    function i(e) {
        return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
    }

    function r(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }

    function a(e, t) {
        var n, s = [];
        for (n = 0; n < e.length; ++n) s.push(t(e[n], n));
        return s
    }

    function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function u(e, t) {
        for (var n in t) o(t, n) && (e[n] = t[n]);
        return o(t, "toString") && (e.toString = t.toString), o(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function l(e, t, n, s) {
        return ge(e, t, n, s, !0).utc()
    }

    function d(e) {
        return null == e._pf && (e._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }), e._pf
    }

    function h(e) {
        if (null == e._isValid) {
            var t = d(e),
                n = Xe.call(t.parsedDateParts, function(e) {
                    return null != e
                }),
                s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
            if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return s;
            e._isValid = s
        }
        return e._isValid
    }

    function c(e) {
        var t = l(NaN);
        return null != e ? u(d(t), e) : d(t).userInvalidated = !0, t
    }

    function f(e, t) {
        var n, i, r;
        if (s(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), s(t._i) || (e._i = t._i), s(t._f) || (e._f = t._f), s(t._l) || (e._l = t._l), s(t._strict) || (e._strict = t._strict), s(t._tzm) || (e._tzm = t._tzm), s(t._isUTC) || (e._isUTC = t._isUTC), s(t._offset) || (e._offset = t._offset), s(t._pf) || (e._pf = d(t)), s(t._locale) || (e._locale = t._locale), Ke.length > 0)
            for (n = 0; n < Ke.length; n++) s(r = t[i = Ke[n]]) || (e[i] = r);
        return e
    }

    function m(t) {
        f(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === et && (et = !0, e.updateOffset(this), et = !1)
    }

    function _(e) {
        return e instanceof m || null != e && null != e._isAMomentObject
    }

    function y(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
    }

    function g(e) {
        var t = +e,
            n = 0;
        return 0 !== t && isFinite(t) && (n = y(t)), n
    }

    function p(e, t, n) {
        var s, i = Math.min(e.length, t.length),
            r = Math.abs(e.length - t.length),
            a = 0;
        for (s = 0; s < i; s++)(n && e[s] !== t[s] || !n && g(e[s]) !== g(t[s])) && a++;
        return a + r
    }

    function w(t) {
        !1 === e.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
    }

    function v(t, n) {
        var s = !0;
        return u(function() {
            if (null != e.deprecationHandler && e.deprecationHandler(null, t), s) {
                for (var i, r = [], a = 0; a < arguments.length; a++) {
                    if (i = "", "object" == typeof arguments[a]) {
                        i += "\n[" + a + "] ";
                        for (var o in arguments[0]) i += o + ": " + arguments[0][o] + ", ";
                        i = i.slice(0, -2)
                    } else i = arguments[a];
                    r.push(i)
                }
                w(t + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), s = !1
            }
            return n.apply(this, arguments)
        }, n)
    }

    function M(t, n) {
        null != e.deprecationHandler && e.deprecationHandler(t, n), tt[t] || (w(n), tt[t] = !0)
    }

    function S(e) {
        return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
    }

    function D(e, t) {
        var s, i = u({}, e);
        for (s in t) o(t, s) && (n(e[s]) && n(t[s]) ? (i[s] = {}, u(i[s], e[s]), u(i[s], t[s])) : null != t[s] ? i[s] = t[s] : delete i[s]);
        for (s in e) o(e, s) && !o(t, s) && n(e[s]) && (i[s] = u({}, i[s]));
        return i
    }

    function k(e) {
        null != e && this.set(e)
    }

    function Y(e, t) {
        var n = e.toLowerCase();
        st[n] = st[n + "s"] = st[t] = e
    }

    function O(e) {
        return "string" == typeof e ? st[e] || st[e.toLowerCase()] : void 0
    }

    function T(e) {
        var t, n, s = {};
        for (n in e) o(e, n) && (t = O(n)) && (s[t] = e[n]);
        return s
    }

    function x(e, t) {
        it[e] = t
    }

    function b(e, t, n) {
        var s = "" + Math.abs(e),
            i = t - s.length;
        return (e >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + s
    }

    function P(e, t, n, s) {
        var i = s;
        "string" == typeof s && (i = function() {
            return this[s]()
        }), e && (ut[e] = i), t && (ut[t[0]] = function() {
            return b(i.apply(this, arguments), t[1], t[2])
        }), n && (ut[n] = function() {
            return this.localeData().ordinal(i.apply(this, arguments), e)
        })
    }

    function W(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function H(e, t) {
        return e.isValid() ? (t = R(t, e.localeData()), ot[t] = ot[t] || function(e) {
            var t, n, s = e.match(rt);
            for (t = 0, n = s.length; t < n; t++) ut[s[t]] ? s[t] = ut[s[t]] : s[t] = W(s[t]);
            return function(t) {
                var i, r = "";
                for (i = 0; i < n; i++) r += S(s[i]) ? s[i].call(t, e) : s[i];
                return r
            }
        }(t), ot[t](e)) : e.localeData().invalidDate()
    }

    function R(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e
        }
        var s = 5;
        for (at.lastIndex = 0; s >= 0 && at.test(e);) e = e.replace(at, n), at.lastIndex = 0, s -= 1;
        return e
    }

    function C(e, t, n) {
        Yt[e] = S(t) ? t : function(e, s) {
            return e && n ? n : t
        }
    }

    function F(e, t) {
        return o(Yt, e) ? Yt[e](t._strict, t._locale) : new RegExp(function(e) {
            return U(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, i) {
                return t || n || s || i
            }))
        }(e))
    }

    function U(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function L(e, t) {
        var n, s = t;
        for ("string" == typeof e && (e = [e]), i(t) && (s = function(e, n) {
                n[t] = g(e)
            }), n = 0; n < e.length; n++) Ot[e[n]] = s
    }

    function N(e, t) {
        L(e, function(e, n, s, i) {
            s._w = s._w || {}, t(e, s._w, s, i)
        })
    }

    function G(e, t, n) {
        null != t && o(Ot, e) && Ot[e](t, n._a, n, e)
    }

    function V(e) {
        return E(e) ? 366 : 365
    }

    function E(e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
    }

    function I(t, n) {
        return function(s) {
            return null != s ? (j(this, t, s), e.updateOffset(this, n), this) : A(this, t)
        }
    }

    function A(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
    }

    function j(e, t, n) {
        e.isValid() && !isNaN(n) && ("FullYear" === t && E(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), Z(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n))
    }

    function Z(e, t) {
        if (isNaN(e) || isNaN(t)) return NaN;
        var n = function(e, t) {
            return (e % t + t) % t
        }(t, 12);
        return e += (t - n) / 12, 1 === n ? E(e) ? 29 : 28 : 31 - n % 7 % 2
    }

    function z(e, t) {
        var n;
        if (!e.isValid()) return e;
        if ("string" == typeof t)
            if (/^\d+$/.test(t)) t = g(t);
            else if (t = e.localeData().monthsParse(t), !i(t)) return e;
        return n = Math.min(e.date(), Z(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
    }

    function $(t) {
        return null != t ? (z(this, t), e.updateOffset(this, !0), this) : A(this, "Month")
    }

    function q() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s = [],
            i = [],
            r = [];
        for (t = 0; t < 12; t++) n = l([2e3, t]), s.push(this.monthsShort(n, "")), i.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, ""));
        for (s.sort(e), i.sort(e), r.sort(e), t = 0; t < 12; t++) s[t] = U(s[t]), i[t] = U(i[t]);
        for (t = 0; t < 24; t++) r[t] = U(r[t]);
        this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")
    }

    function J(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return e < 100 && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t
    }

    function B(e, t, n) {
        var s = 7 + t - n;
        return -((7 + J(e, 0, s).getUTCDay() - t) % 7) + s - 1
    }

    function Q(e, t, n, s, i) {
        var r, a, o = 1 + 7 * (t - 1) + (7 + n - s) % 7 + B(e, s, i);
        return o <= 0 ? a = V(r = e - 1) + o : o > V(e) ? (r = e + 1, a = o - V(e)) : (r = e, a = o), {
            year: r,
            dayOfYear: a
        }
    }

    function X(e, t, n) {
        var s, i, r = B(e.year(), t, n),
            a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
        return a < 1 ? s = a + K(i = e.year() - 1, t, n) : a > K(e.year(), t, n) ? (s = a - K(e.year(), t, n), i = e.year() + 1) : (i = e.year(), s = a), {
            week: s,
            year: i
        }
    }

    function K(e, t, n) {
        var s = B(e, t, n),
            i = B(e + 1, t, n);
        return (V(e) - s + i) / 7
    }

    function ee() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s, i, r, a = [],
            o = [],
            u = [],
            d = [];
        for (t = 0; t < 7; t++) n = l([2e3, 1]).day(t), s = this.weekdaysMin(n, ""), i = this.weekdaysShort(n, ""), r = this.weekdays(n, ""), a.push(s), o.push(i), u.push(r), d.push(s), d.push(i), d.push(r);
        for (a.sort(e), o.sort(e), u.sort(e), d.sort(e), t = 0; t < 7; t++) o[t] = U(o[t]), u[t] = U(u[t]), d[t] = U(d[t]);
        this._weekdaysRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
    }

    function te() {
        return this.hours() % 12 || 12
    }

    function ne(e, t) {
        P(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }

    function se(e, t) {
        return t._meridiemParse
    }

    function ie(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function re(e) {
        var t = null;
        if (!Xt[e] && "undefined" != typeof module && module && module.exports) try {
            t = Jt._abbr;
            require("./locale/" + e), ae(t)
        } catch (e) {}
        return Xt[e]
    }

    function ae(e, t) {
        var n;
        return e && (n = s(t) ? ue(e) : oe(e, t)) && (Jt = n), Jt._abbr
    }

    function oe(e, t) {
        if (null !== t) {
            var n = Qt;
            if (t.abbr = e, null != Xt[e]) M("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = Xt[e]._config;
            else if (null != t.parentLocale) {
                if (null == Xt[t.parentLocale]) return Kt[t.parentLocale] || (Kt[t.parentLocale] = []), Kt[t.parentLocale].push({
                    name: e,
                    config: t
                }), null;
                n = Xt[t.parentLocale]._config
            }
            return Xt[e] = new k(D(n, t)), Kt[e] && Kt[e].forEach(function(e) {
                oe(e.name, e.config)
            }), ae(e), Xt[e]
        }
        return delete Xt[e], null
    }

    function ue(e) {
        var n;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return Jt;
        if (!t(e)) {
            if (n = re(e)) return n;
            e = [e]
        }
        return function(e) {
            for (var t, n, s, i, r = 0; r < e.length;) {
                for (t = (i = ie(e[r]).split("-")).length, n = (n = ie(e[r + 1])) ? n.split("-") : null; t > 0;) {
                    if (s = re(i.slice(0, t).join("-"))) return s;
                    if (n && n.length >= t && p(i, n, !0) >= t - 1) break;
                    t--
                }
                r++
            }
            return null
        }(e)
    }

    function le(e) {
        var t, n = e._a;
        return n && -2 === d(e).overflow && (t = n[xt] < 0 || n[xt] > 11 ? xt : n[bt] < 1 || n[bt] > Z(n[Tt], n[xt]) ? bt : n[Pt] < 0 || n[Pt] > 24 || 24 === n[Pt] && (0 !== n[Wt] || 0 !== n[Ht] || 0 !== n[Rt]) ? Pt : n[Wt] < 0 || n[Wt] > 59 ? Wt : n[Ht] < 0 || n[Ht] > 59 ? Ht : n[Rt] < 0 || n[Rt] > 999 ? Rt : -1, d(e)._overflowDayOfYear && (t < Tt || t > bt) && (t = bt), d(e)._overflowWeeks && -1 === t && (t = Ct), d(e)._overflowWeekday && -1 === t && (t = Ft), d(e).overflow = t), e
    }

    function de(e, t, n) {
        return null != e ? e : null != t ? t : n
    }

    function he(t) {
        var n, s, i, r, a, o = [];
        if (!t._d) {
            for (i = function(t) {
                    var n = new Date(e.now());
                    return t._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
                }(t), t._w && null == t._a[bt] && null == t._a[xt] && function(e) {
                    var t, n, s, i, r, a, o, u;
                    if (null != (t = e._w).GG || null != t.W || null != t.E) r = 1, a = 4, n = de(t.GG, e._a[Tt], X(pe(), 1, 4).year), s = de(t.W, 1), ((i = de(t.E, 1)) < 1 || i > 7) && (u = !0);
                    else {
                        r = e._locale._week.dow, a = e._locale._week.doy;
                        var l = X(pe(), r, a);
                        n = de(t.gg, e._a[Tt], l.year), s = de(t.w, l.week), null != t.d ? ((i = t.d) < 0 || i > 6) && (u = !0) : null != t.e ? (i = t.e + r, (t.e < 0 || t.e > 6) && (u = !0)) : i = r
                    }
                    s < 1 || s > K(n, r, a) ? d(e)._overflowWeeks = !0 : null != u ? d(e)._overflowWeekday = !0 : (o = Q(n, s, i, r, a), e._a[Tt] = o.year, e._dayOfYear = o.dayOfYear)
                }(t), null != t._dayOfYear && (a = de(t._a[Tt], i[Tt]), (t._dayOfYear > V(a) || 0 === t._dayOfYear) && (d(t)._overflowDayOfYear = !0), s = J(a, 0, t._dayOfYear), t._a[xt] = s.getUTCMonth(), t._a[bt] = s.getUTCDate()), n = 0; n < 3 && null == t._a[n]; ++n) t._a[n] = o[n] = i[n];
            for (; n < 7; n++) t._a[n] = o[n] = null == t._a[n] ? 2 === n ? 1 : 0 : t._a[n];
            24 === t._a[Pt] && 0 === t._a[Wt] && 0 === t._a[Ht] && 0 === t._a[Rt] && (t._nextDay = !0, t._a[Pt] = 0), t._d = (t._useUTC ? J : function(e, t, n, s, i, r, a) {
                var o = new Date(e, t, n, s, i, r, a);
                return e < 100 && e >= 0 && isFinite(o.getFullYear()) && o.setFullYear(e), o
            }).apply(null, o), r = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Pt] = 24), t._w && void 0 !== t._w.d && t._w.d !== r && (d(t).weekdayMismatch = !0)
        }
    }

    function ce(e) {
        var t, n, s, i, r, a, o = e._i,
            u = en.exec(o) || tn.exec(o);
        if (u) {
            for (d(e).iso = !0, t = 0, n = sn.length; t < n; t++)
                if (sn[t][1].exec(u[1])) {
                    i = sn[t][0], s = !1 !== sn[t][2];
                    break
                } if (null == i) return void(e._isValid = !1);
            if (u[3]) {
                for (t = 0, n = rn.length; t < n; t++)
                    if (rn[t][1].exec(u[3])) {
                        r = (u[2] || " ") + rn[t][0];
                        break
                    } if (null == r) return void(e._isValid = !1)
            }
            if (!s && null != r) return void(e._isValid = !1);
            if (u[4]) {
                if (!nn.exec(u[4])) return void(e._isValid = !1);
                a = "Z"
            }
            e._f = i + (r || "") + (a || ""), _e(e)
        } else e._isValid = !1
    }

    function fe(e, t, n, s, i, r) {
        var a = [function(e) {
            var t = parseInt(e, 10); {
                if (t <= 49) return 2e3 + t;
                if (t <= 999) return 1900 + t
            }
            return t
        }(e), Vt.indexOf(t), parseInt(n, 10), parseInt(s, 10), parseInt(i, 10)];
        return r && a.push(parseInt(r, 10)), a
    }

    function me(e) {
        var t = on.exec(function(e) {
            return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()
        }(e._i));
        if (t) {
            var n = fe(t[4], t[3], t[2], t[5], t[6], t[7]);
            if (! function(e, t, n) {
                    if (e && jt.indexOf(e) !== new Date(t[0], t[1], t[2]).getDay()) return d(n).weekdayMismatch = !0, n._isValid = !1, !1;
                    return !0
                }(t[1], n, e)) return;
            e._a = n, e._tzm = function(e, t, n) {
                if (e) return un[e];
                if (t) return 0;
                var s = parseInt(n, 10),
                    i = s % 100;
                return (s - i) / 100 * 60 + i
            }(t[8], t[9], t[10]), e._d = J.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), d(e).rfc2822 = !0
        } else e._isValid = !1
    }

    function _e(t) {
        if (t._f !== e.ISO_8601)
            if (t._f !== e.RFC_2822) {
                t._a = [], d(t).empty = !0;
                var n, s, i, r, a, o = "" + t._i,
                    u = o.length,
                    l = 0;
                for (i = R(t._f, t._locale).match(rt) || [], n = 0; n < i.length; n++) r = i[n], (s = (o.match(F(r, t)) || [])[0]) && ((a = o.substr(0, o.indexOf(s))).length > 0 && d(t).unusedInput.push(a), o = o.slice(o.indexOf(s) + s.length), l += s.length), ut[r] ? (s ? d(t).empty = !1 : d(t).unusedTokens.push(r), G(r, s, t)) : t._strict && !s && d(t).unusedTokens.push(r);
                d(t).charsLeftOver = u - l, o.length > 0 && d(t).unusedInput.push(o), t._a[Pt] <= 12 && !0 === d(t).bigHour && t._a[Pt] > 0 && (d(t).bigHour = void 0), d(t).parsedDateParts = t._a.slice(0), d(t).meridiem = t._meridiem, t._a[Pt] = function(e, t, n) {
                    var s;
                    if (null == n) return t;
                    return null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? ((s = e.isPM(n)) && t < 12 && (t += 12), s || 12 !== t || (t = 0), t) : t
                }(t._locale, t._a[Pt], t._meridiem), he(t), le(t)
            } else me(t);
        else ce(t)
    }

    function ye(o) {
        var l = o._i,
            y = o._f;
        return o._locale = o._locale || ue(o._l), null === l || void 0 === y && "" === l ? c({
            nullInput: !0
        }) : ("string" == typeof l && (o._i = l = o._locale.preparse(l)), _(l) ? new m(le(l)) : (r(l) ? o._d = l : t(y) ? function(e) {
            var t, n, s, i, r;
            if (0 === e._f.length) return d(e).invalidFormat = !0, void(e._d = new Date(NaN));
            for (i = 0; i < e._f.length; i++) r = 0, t = f({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[i], _e(t), h(t) && (r += d(t).charsLeftOver, r += 10 * d(t).unusedTokens.length, d(t).score = r, (null == s || r < s) && (s = r, n = t));
            u(e, n || t)
        }(o) : y ? _e(o) : function(o) {
            var u = o._i;
            s(u) ? o._d = new Date(e.now()) : r(u) ? o._d = new Date(u.valueOf()) : "string" == typeof u ? function(t) {
                var n = an.exec(t._i);
                null === n ? (ce(t), !1 === t._isValid && (delete t._isValid, me(t), !1 === t._isValid && (delete t._isValid, e.createFromInputFallback(t)))) : t._d = new Date(+n[1])
            }(o) : t(u) ? (o._a = a(u.slice(0), function(e) {
                return parseInt(e, 10)
            }), he(o)) : n(u) ? function(e) {
                if (!e._d) {
                    var t = T(e._i);
                    e._a = a([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                        return e && parseInt(e, 10)
                    }), he(e)
                }
            }(o) : i(u) ? o._d = new Date(u) : e.createFromInputFallback(o)
        }(o), h(o) || (o._d = null), o))
    }

    function ge(e, s, i, r, a) {
        var o = {};
        return !0 !== i && !1 !== i || (r = i, i = void 0), (n(e) && function(e) {
                if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
                var t;
                for (t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return !0
            }(e) || t(e) && 0 === e.length) && (e = void 0), o._isAMomentObject = !0, o._useUTC = o._isUTC = a, o._l = i, o._i = e, o._f = s, o._strict = r,
            function(e) {
                var t = new m(le(ye(e)));
                return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t
            }(o)
    }

    function pe(e, t, n, s) {
        return ge(e, t, n, s, !1)
    }

    function we(e, n) {
        var s, i;
        if (1 === n.length && t(n[0]) && (n = n[0]), !n.length) return pe();
        for (s = n[0], i = 1; i < n.length; ++i) n[i].isValid() && !n[i][e](s) || (s = n[i]);
        return s
    }

    function ve(e) {
        var t = T(e),
            n = t.year || 0,
            s = t.quarter || 0,
            i = t.month || 0,
            r = t.week || 0,
            a = t.day || 0,
            o = t.hour || 0,
            u = t.minute || 0,
            l = t.second || 0,
            d = t.millisecond || 0;
        this._isValid = function(e) {
            for (var t in e)
                if (-1 === Ut.call(hn, t) || null != e[t] && isNaN(e[t])) return !1;
            for (var n = !1, s = 0; s < hn.length; ++s)
                if (e[hn[s]]) {
                    if (n) return !1;
                    parseFloat(e[hn[s]]) !== g(e[hn[s]]) && (n = !0)
                } return !0
        }(t), this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60, this._days = +a + 7 * r, this._months = +i + 3 * s + 12 * n, this._data = {}, this._locale = ue(), this._bubble()
    }

    function Me(e) {
        return e instanceof ve
    }

    function Se(e) {
        return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
    }

    function De(e, t) {
        P(e, 0, 0, function() {
            var e = this.utcOffset(),
                n = "+";
            return e < 0 && (e = -e, n = "-"), n + b(~~(e / 60), 2) + t + b(~~e % 60, 2)
        })
    }

    function ke(e, t) {
        var n = (t || "").match(e);
        if (null === n) return null;
        var s = ((n[n.length - 1] || []) + "").match(cn) || ["-", 0, 0],
            i = 60 * s[1] + g(s[2]);
        return 0 === i ? 0 : "+" === s[0] ? i : -i
    }

    function Ye(t, n) {
        var s, i;
        return n._isUTC ? (s = n.clone(), i = (_(t) || r(t) ? t.valueOf() : pe(t).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + i), e.updateOffset(s, !1), s) : pe(t).local()
    }

    function Oe(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }

    function Te() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset)
    }

    function xe(e, t) {
        var n, s, r, a = e,
            u = null;
        return Me(e) ? a = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : i(e) ? (a = {}, t ? a[t] = e : a.milliseconds = e) : (u = fn.exec(e)) ? (n = "-" === u[1] ? -1 : 1, a = {
            y: 0,
            d: g(u[bt]) * n,
            h: g(u[Pt]) * n,
            m: g(u[Wt]) * n,
            s: g(u[Ht]) * n,
            ms: g(Se(1e3 * u[Rt])) * n
        }) : (u = mn.exec(e)) ? (n = "-" === u[1] ? -1 : (u[1], 1), a = {
            y: be(u[2], n),
            M: be(u[3], n),
            w: be(u[4], n),
            d: be(u[5], n),
            h: be(u[6], n),
            m: be(u[7], n),
            s: be(u[8], n)
        }) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (r = function(e, t) {
            var n;
            if (!e.isValid() || !t.isValid()) return {
                milliseconds: 0,
                months: 0
            };
            t = Ye(t, e), e.isBefore(t) ? n = Pe(e, t) : ((n = Pe(t, e)).milliseconds = -n.milliseconds, n.months = -n.months);
            return n
        }(pe(a.from), pe(a.to)), (a = {}).ms = r.milliseconds, a.M = r.months), s = new ve(a), Me(e) && o(e, "_locale") && (s._locale = e._locale), s
    }

    function be(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
    }

    function Pe(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
    }

    function We(e, t) {
        return function(n, s) {
            var i, r;
            return null === s || isNaN(+s) || (M(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), r = n, n = s, s = r), n = "string" == typeof n ? +n : n, i = xe(n, s), He(this, i, e), this
        }
    }

    function He(t, n, s, i) {
        var r = n._milliseconds,
            a = Se(n._days),
            o = Se(n._months);
        t.isValid() && (i = null == i || i, o && z(t, A(t, "Month") + o * s), a && j(t, "Date", A(t, "Date") + a * s), r && t._d.setTime(t._d.valueOf() + r * s), i && e.updateOffset(t, a || o))
    }

    function Re(e, t) {
        var n, s = 12 * (t.year() - e.year()) + (t.month() - e.month()),
            i = e.clone().add(s, "months");
        return n = t - i < 0 ? (t - i) / (i - e.clone().add(s - 1, "months")) : (t - i) / (e.clone().add(s + 1, "months") - i), -(s + n) || 0
    }

    function Ce(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (null != (t = ue(e)) && (this._locale = t), this)
    }

    function Fe() {
        return this._locale
    }

    function Ue(e, t) {
        P(0, [e, e.length], 0, t)
    }

    function Le(e, t, n, s, i) {
        var r;
        return null == e ? X(this, s, i).year : (r = K(e, s, i), t > r && (t = r), function(e, t, n, s, i) {
            var r = Q(e, t, n, s, i),
                a = J(r.year, 0, r.dayOfYear);
            return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
        }.call(this, e, t, n, s, i))
    }

    function Ne(e, t) {
        t[Rt] = g(1e3 * ("0." + e))
    }

    function Ge(e) {
        return e
    }

    function Ve(e, t, n, s) {
        var i = ue(),
            r = l().set(s, t);
        return i[n](r, e)
    }

    function Ee(e, t, n) {
        if (i(e) && (t = e, e = void 0), e = e || "", null != t) return Ve(e, t, n, "month");
        var s, r = [];
        for (s = 0; s < 12; s++) r[s] = Ve(e, s, n, "month");
        return r
    }

    function Ie(e, t, n, s) {
        "boolean" == typeof e ? (i(t) && (n = t, t = void 0), t = t || "") : (n = t = e, e = !1, i(t) && (n = t, t = void 0), t = t || "");
        var r = ue(),
            a = e ? r._week.dow : 0;
        if (null != n) return Ve(t, (n + a) % 7, s, "day");
        var o, u = [];
        for (o = 0; o < 7; o++) u[o] = Ve(t, (o + a) % 7, s, "day");
        return u
    }

    function Ae(e, t, n, s) {
        var i = xe(t, n);
        return e._milliseconds += s * i._milliseconds, e._days += s * i._days, e._months += s * i._months, e._bubble()
    }

    function je(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e)
    }

    function Ze(e) {
        return 4800 * e / 146097
    }

    function ze(e) {
        return 146097 * e / 4800
    }

    function $e(e) {
        return function() {
            return this.as(e)
        }
    }

    function qe(e) {
        return function() {
            return this.isValid() ? this._data[e] : NaN
        }
    }

    function Je(e) {
        return (e > 0) - (e < 0) || +e
    }

    function Be() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e, t, n = An(this._milliseconds) / 1e3,
            s = An(this._days),
            i = An(this._months);
        t = y((e = y(n / 60)) / 60), n %= 60, e %= 60;
        var r = y(i / 12),
            a = i %= 12,
            o = s,
            u = t,
            l = e,
            d = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
            h = this.asSeconds();
        if (!h) return "P0D";
        var c = h < 0 ? "-" : "",
            f = Je(this._months) !== Je(h) ? "-" : "",
            m = Je(this._days) !== Je(h) ? "-" : "",
            _ = Je(this._milliseconds) !== Je(h) ? "-" : "";
        return c + "P" + (r ? f + r + "Y" : "") + (a ? f + a + "M" : "") + (o ? m + o + "D" : "") + (u || l || d ? "T" : "") + (u ? _ + u + "H" : "") + (l ? _ + l + "M" : "") + (d ? _ + d + "S" : "")
    }
    var Qe, Xe;
    Xe = Array.prototype.some ? Array.prototype.some : function(e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
            if (s in t && e.call(this, t[s], s, t)) return !0;
        return !1
    };
    var Ke = e.momentProperties = [],
        et = !1,
        tt = {};
    e.suppressDeprecationWarnings = !1, e.deprecationHandler = null;
    var nt;
    nt = Object.keys ? Object.keys : function(e) {
        var t, n = [];
        for (t in e) o(e, t) && n.push(t);
        return n
    };
    var st = {},
        it = {},
        rt = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        at = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        ot = {},
        ut = {},
        lt = /\d/,
        dt = /\d\d/,
        ht = /\d{3}/,
        ct = /\d{4}/,
        ft = /[+-]?\d{6}/,
        mt = /\d\d?/,
        _t = /\d\d\d\d?/,
        yt = /\d\d\d\d\d\d?/,
        gt = /\d{1,3}/,
        pt = /\d{1,4}/,
        wt = /[+-]?\d{1,6}/,
        vt = /\d+/,
        Mt = /[+-]?\d+/,
        St = /Z|[+-]\d\d:?\d\d/gi,
        Dt = /Z|[+-]\d\d(?::?\d\d)?/gi,
        kt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        Yt = {},
        Ot = {},
        Tt = 0,
        xt = 1,
        bt = 2,
        Pt = 3,
        Wt = 4,
        Ht = 5,
        Rt = 6,
        Ct = 7,
        Ft = 8;
    P("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? "" + e : "+" + e
    }), P(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), P(0, ["YYYY", 4], 0, "year"), P(0, ["YYYYY", 5], 0, "year"), P(0, ["YYYYYY", 6, !0], 0, "year"), Y("year", "y"), x("year", 1), C("Y", Mt), C("YY", mt, dt), C("YYYY", pt, ct), C("YYYYY", wt, ft), C("YYYYYY", wt, ft), L(["YYYYY", "YYYYYY"], Tt), L("YYYY", function(t, n) {
        n[Tt] = 2 === t.length ? e.parseTwoDigitYear(t) : g(t)
    }), L("YY", function(t, n) {
        n[Tt] = e.parseTwoDigitYear(t)
    }), L("Y", function(e, t) {
        t[Tt] = parseInt(e, 10)
    }), e.parseTwoDigitYear = function(e) {
        return g(e) + (g(e) > 68 ? 1900 : 2e3)
    };
    var Ut, Lt = I("FullYear", !0);
    Ut = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
        var t;
        for (t = 0; t < this.length; ++t)
            if (this[t] === e) return t;
        return -1
    }, P("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), P("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }), P("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }), Y("month", "M"), x("month", 8), C("M", mt), C("MM", mt, dt), C("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }), C("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }), L(["M", "MM"], function(e, t) {
        t[xt] = g(e) - 1
    }), L(["MMM", "MMMM"], function(e, t, n, s) {
        var i = n._locale.monthsParse(e, s, n._strict);
        null != i ? t[xt] = i : d(n).invalidMonth = e
    });
    var Nt = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        Gt = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        Vt = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        Et = kt,
        It = kt;
    P("w", ["ww", 2], "wo", "week"), P("W", ["WW", 2], "Wo", "isoWeek"), Y("week", "w"), Y("isoWeek", "W"), x("week", 5), x("isoWeek", 5), C("w", mt), C("ww", mt, dt), C("W", mt), C("WW", mt, dt), N(["w", "ww", "W", "WW"], function(e, t, n, s) {
        t[s.substr(0, 1)] = g(e)
    });
    P("d", 0, "do", "day"), P("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }), P("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }), P("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }), P("e", 0, 0, "weekday"), P("E", 0, 0, "isoWeekday"), Y("day", "d"), Y("weekday", "e"), Y("isoWeekday", "E"), x("day", 11), x("weekday", 11), x("isoWeekday", 11), C("d", mt), C("e", mt), C("E", mt), C("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }), C("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }), C("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }), N(["dd", "ddd", "dddd"], function(e, t, n, s) {
        var i = n._locale.weekdaysParse(e, s, n._strict);
        null != i ? t.d = i : d(n).invalidWeekday = e
    }), N(["d", "e", "E"], function(e, t, n, s) {
        t[s] = g(e)
    });
    var At = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        jt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        Zt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        zt = kt,
        $t = kt,
        qt = kt;
    P("H", ["HH", 2], 0, "hour"), P("h", ["hh", 2], 0, te), P("k", ["kk", 2], 0, function() {
        return this.hours() || 24
    }), P("hmm", 0, 0, function() {
        return "" + te.apply(this) + b(this.minutes(), 2)
    }), P("hmmss", 0, 0, function() {
        return "" + te.apply(this) + b(this.minutes(), 2) + b(this.seconds(), 2)
    }), P("Hmm", 0, 0, function() {
        return "" + this.hours() + b(this.minutes(), 2)
    }), P("Hmmss", 0, 0, function() {
        return "" + this.hours() + b(this.minutes(), 2) + b(this.seconds(), 2)
    }), ne("a", !0), ne("A", !1), Y("hour", "h"), x("hour", 13), C("a", se), C("A", se), C("H", mt), C("h", mt), C("k", mt), C("HH", mt, dt), C("hh", mt, dt), C("kk", mt, dt), C("hmm", _t), C("hmmss", yt), C("Hmm", _t), C("Hmmss", yt), L(["H", "HH"], Pt), L(["k", "kk"], function(e, t, n) {
        var s = g(e);
        t[Pt] = 24 === s ? 0 : s
    }), L(["a", "A"], function(e, t, n) {
        n._isPm = n._locale.isPM(e), n._meridiem = e
    }), L(["h", "hh"], function(e, t, n) {
        t[Pt] = g(e), d(n).bigHour = !0
    }), L("hmm", function(e, t, n) {
        var s = e.length - 2;
        t[Pt] = g(e.substr(0, s)), t[Wt] = g(e.substr(s)), d(n).bigHour = !0
    }), L("hmmss", function(e, t, n) {
        var s = e.length - 4,
            i = e.length - 2;
        t[Pt] = g(e.substr(0, s)), t[Wt] = g(e.substr(s, 2)), t[Ht] = g(e.substr(i)), d(n).bigHour = !0
    }), L("Hmm", function(e, t, n) {
        var s = e.length - 2;
        t[Pt] = g(e.substr(0, s)), t[Wt] = g(e.substr(s))
    }), L("Hmmss", function(e, t, n) {
        var s = e.length - 4,
            i = e.length - 2;
        t[Pt] = g(e.substr(0, s)), t[Wt] = g(e.substr(s, 2)), t[Ht] = g(e.substr(i))
    });
    var Jt, Bt = I("Hours", !0),
        Qt = {
            calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            invalidDate: "Invalid date",
            ordinal: "%d",
            dayOfMonthOrdinalParse: /\d{1,2}/,
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            months: Gt,
            monthsShort: Vt,
            week: {
                dow: 0,
                doy: 6
            },
            weekdays: At,
            weekdaysMin: Zt,
            weekdaysShort: jt,
            meridiemParse: /[ap]\.?m?\.?/i
        },
        Xt = {},
        Kt = {},
        en = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        nn = /Z|[+-]\d\d(?::?\d\d)?/,
        sn = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        rn = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        an = /^\/?Date\((\-?\d+)/i,
        on = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        un = {
            UT: 0,
            GMT: 0,
            EDT: -240,
            EST: -300,
            CDT: -300,
            CST: -360,
            MDT: -360,
            MST: -420,
            PDT: -420,
            PST: -480
        };
    e.createFromInputFallback = v("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }), e.ISO_8601 = function() {}, e.RFC_2822 = function() {};
    var ln = v("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = pe.apply(null, arguments);
            return this.isValid() && e.isValid() ? e < this ? this : e : c()
        }),
        dn = v("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = pe.apply(null, arguments);
            return this.isValid() && e.isValid() ? e > this ? this : e : c()
        }),
        hn = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    De("Z", ":"), De("ZZ", ""), C("Z", Dt), C("ZZ", Dt), L(["Z", "ZZ"], function(e, t, n) {
        n._useUTC = !0, n._tzm = ke(Dt, e)
    });
    var cn = /([\+\-]|\d\d)/gi;
    e.updateOffset = function() {};
    var fn = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        mn = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    xe.fn = ve.prototype, xe.invalid = function() {
        return xe(NaN)
    };
    var _n = We(1, "add"),
        yn = We(-1, "subtract");
    e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", e.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var gn = v("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });
    P(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), P(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), Ue("gggg", "weekYear"), Ue("ggggg", "weekYear"), Ue("GGGG", "isoWeekYear"), Ue("GGGGG", "isoWeekYear"), Y("weekYear", "gg"), Y("isoWeekYear", "GG"), x("weekYear", 1), x("isoWeekYear", 1), C("G", Mt), C("g", Mt), C("GG", mt, dt), C("gg", mt, dt), C("GGGG", pt, ct), C("gggg", pt, ct), C("GGGGG", wt, ft), C("ggggg", wt, ft), N(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, s) {
        t[s.substr(0, 2)] = g(e)
    }), N(["gg", "GG"], function(t, n, s, i) {
        n[i] = e.parseTwoDigitYear(t)
    }), P("Q", 0, "Qo", "quarter"), Y("quarter", "Q"), x("quarter", 7), C("Q", lt), L("Q", function(e, t) {
        t[xt] = 3 * (g(e) - 1)
    }), P("D", ["DD", 2], "Do", "date"), Y("date", "D"), x("date", 9), C("D", mt), C("DD", mt, dt), C("Do", function(e, t) {
        return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
    }), L(["D", "DD"], bt), L("Do", function(e, t) {
        t[bt] = g(e.match(mt)[0])
    });
    var pn = I("Date", !0);
    P("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), Y("dayOfYear", "DDD"), x("dayOfYear", 4), C("DDD", gt), C("DDDD", ht), L(["DDD", "DDDD"], function(e, t, n) {
        n._dayOfYear = g(e)
    }), P("m", ["mm", 2], 0, "minute"), Y("minute", "m"), x("minute", 14), C("m", mt), C("mm", mt, dt), L(["m", "mm"], Wt);
    var wn = I("Minutes", !1);
    P("s", ["ss", 2], 0, "second"), Y("second", "s"), x("second", 15), C("s", mt), C("ss", mt, dt), L(["s", "ss"], Ht);
    var vn = I("Seconds", !1);
    P("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }), P(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }), P(0, ["SSS", 3], 0, "millisecond"), P(0, ["SSSS", 4], 0, function() {
        return 10 * this.millisecond()
    }), P(0, ["SSSSS", 5], 0, function() {
        return 100 * this.millisecond()
    }), P(0, ["SSSSSS", 6], 0, function() {
        return 1e3 * this.millisecond()
    }), P(0, ["SSSSSSS", 7], 0, function() {
        return 1e4 * this.millisecond()
    }), P(0, ["SSSSSSSS", 8], 0, function() {
        return 1e5 * this.millisecond()
    }), P(0, ["SSSSSSSSS", 9], 0, function() {
        return 1e6 * this.millisecond()
    }), Y("millisecond", "ms"), x("millisecond", 16), C("S", gt, lt), C("SS", gt, dt), C("SSS", gt, ht);
    var Mn;
    for (Mn = "SSSS"; Mn.length <= 9; Mn += "S") C(Mn, vt);
    for (Mn = "S"; Mn.length <= 9; Mn += "S") L(Mn, Ne);
    var Sn = I("Milliseconds", !1);
    P("z", 0, 0, "zoneAbbr"), P("zz", 0, 0, "zoneName");
    var Dn = m.prototype;
    Dn.add = _n, Dn.calendar = function(t, n) {
        var s = t || pe(),
            i = Ye(s, this).startOf("day"),
            r = e.calendarFormat(this, i) || "sameElse",
            a = n && (S(n[r]) ? n[r].call(this, s) : n[r]);
        return this.format(a || this.localeData().calendar(r, this, pe(s)))
    }, Dn.clone = function() {
        return new m(this)
    }, Dn.diff = function(e, t, n) {
        var s, i, r;
        if (!this.isValid()) return NaN;
        if (!(s = Ye(e, this)).isValid()) return NaN;
        switch (i = 6e4 * (s.utcOffset() - this.utcOffset()), t = O(t)) {
            case "year":
                r = Re(this, s) / 12;
                break;
            case "month":
                r = Re(this, s);
                break;
            case "quarter":
                r = Re(this, s) / 3;
                break;
            case "second":
                r = (this - s) / 1e3;
                break;
            case "minute":
                r = (this - s) / 6e4;
                break;
            case "hour":
                r = (this - s) / 36e5;
                break;
            case "day":
                r = (this - s - i) / 864e5;
                break;
            case "week":
                r = (this - s - i) / 6048e5;
                break;
            default:
                r = this - s
        }
        return n ? r : y(r)
    }, Dn.endOf = function(e) {
        return void 0 === (e = O(e)) || "millisecond" === e ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
    }, Dn.format = function(t) {
        t || (t = this.isUtc() ? e.defaultFormatUtc : e.defaultFormat);
        var n = H(this, t);
        return this.localeData().postformat(n)
    }, Dn.from = function(e, t) {
        return this.isValid() && (_(e) && e.isValid() || pe(e).isValid()) ? xe({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, Dn.fromNow = function(e) {
        return this.from(pe(), e)
    }, Dn.to = function(e, t) {
        return this.isValid() && (_(e) && e.isValid() || pe(e).isValid()) ? xe({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, Dn.toNow = function(e) {
        return this.to(pe(), e)
    }, Dn.get = function(e) {
        return e = O(e), S(this[e]) ? this[e]() : this
    }, Dn.invalidAt = function() {
        return d(this).overflow
    }, Dn.isAfter = function(e, t) {
        var n = _(e) ? e : pe(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = O(s(t) ? "millisecond" : t)) ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
    }, Dn.isBefore = function(e, t) {
        var n = _(e) ? e : pe(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = O(s(t) ? "millisecond" : t)) ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
    }, Dn.isBetween = function(e, t, n, s) {
        return ("(" === (s = s || "()")[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
    }, Dn.isSame = function(e, t) {
        var n, s = _(e) ? e : pe(e);
        return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = O(t || "millisecond")) ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
    }, Dn.isSameOrAfter = function(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
    }, Dn.isSameOrBefore = function(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
    }, Dn.isValid = function() {
        return h(this)
    }, Dn.lang = gn, Dn.locale = Ce, Dn.localeData = Fe, Dn.max = dn, Dn.min = ln, Dn.parsingFlags = function() {
        return u({}, d(this))
    }, Dn.set = function(e, t) {
        if ("object" == typeof e)
            for (var n = function(e) {
                    var t = [];
                    for (var n in e) t.push({
                        unit: n,
                        priority: it[n]
                    });
                    return t.sort(function(e, t) {
                        return e.priority - t.priority
                    }), t
                }(e = T(e)), s = 0; s < n.length; s++) this[n[s].unit](e[n[s].unit]);
        else if (e = O(e), S(this[e])) return this[e](t);
        return this
    }, Dn.startOf = function(e) {
        switch (e = O(e)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
    }, Dn.subtract = yn, Dn.toArray = function() {
        return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()]
    }, Dn.toObject = function() {
        return {
            years: this.year(),
            months: this.month(),
            date: this.date(),
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        }
    }, Dn.toDate = function() {
        return new Date(this.valueOf())
    }, Dn.toISOString = function(e) {
        if (!this.isValid()) return null;
        var t = !0 !== e,
            n = t ? this.clone().utc() : this;
        return n.year() < 0 || n.year() > 9999 ? H(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : S(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this._d.valueOf()).toISOString().replace("Z", H(n, "Z")) : H(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    }, Dn.inspect = function() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var e = "moment",
            t = "";
        this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
        var n = "[" + e + '("]',
            s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            i = t + '[")]';
        return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i)
    }, Dn.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }, Dn.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, Dn.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }, Dn.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }, Dn.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }, Dn.year = Lt, Dn.isLeapYear = function() {
        return E(this.year())
    }, Dn.weekYear = function(e) {
        return Le.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }, Dn.isoWeekYear = function(e) {
        return Le.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
    }, Dn.quarter = Dn.quarters = function(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }, Dn.month = $, Dn.daysInMonth = function() {
        return Z(this.year(), this.month())
    }, Dn.week = Dn.weeks = function(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }, Dn.isoWeek = Dn.isoWeeks = function(e) {
        var t = X(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }, Dn.weeksInYear = function() {
        var e = this.localeData()._week;
        return K(this.year(), e.dow, e.doy)
    }, Dn.isoWeeksInYear = function() {
        return K(this.year(), 1, 4)
    }, Dn.date = pn, Dn.day = Dn.days = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (e = function(e, t) {
            return "string" != typeof e ? e : isNaN(e) ? "number" == typeof(e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10)
        }(e, this.localeData()), this.add(e - t, "d")) : t
    }, Dn.weekday = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }, Dn.isoWeekday = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        if (null != e) {
            var t = function(e, t) {
                return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
            }(e, this.localeData());
            return this.day(this.day() % 7 ? t : t - 7)
        }
        return this.day() || 7
    }, Dn.dayOfYear = function(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }, Dn.hour = Dn.hours = Bt, Dn.minute = Dn.minutes = wn, Dn.second = Dn.seconds = vn, Dn.millisecond = Dn.milliseconds = Sn, Dn.utcOffset = function(t, n, s) {
        var i, r = this._offset || 0;
        if (!this.isValid()) return null != t ? this : NaN;
        if (null != t) {
            if ("string" == typeof t) {
                if (null === (t = ke(Dt, t))) return this
            } else Math.abs(t) < 16 && !s && (t *= 60);
            return !this._isUTC && n && (i = Oe(this)), this._offset = t, this._isUTC = !0, null != i && this.add(i, "m"), r !== t && (!n || this._changeInProgress ? He(this, xe(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, e.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? r : Oe(this)
    }, Dn.utc = function(e) {
        return this.utcOffset(0, e)
    }, Dn.local = function(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Oe(this), "m")), this
    }, Dn.parseZone = function() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
        else if ("string" == typeof this._i) {
            var e = ke(St, this._i);
            null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
        }
        return this
    }, Dn.hasAlignedHourOffset = function(e) {
        return !!this.isValid() && (e = e ? pe(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
    }, Dn.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }, Dn.isLocal = function() {
        return !!this.isValid() && !this._isUTC
    }, Dn.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC
    }, Dn.isUtc = Te, Dn.isUTC = Te, Dn.zoneAbbr = function() {
        return this._isUTC ? "UTC" : ""
    }, Dn.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, Dn.dates = v("dates accessor is deprecated. Use date instead.", pn), Dn.months = v("months accessor is deprecated. Use month instead", $), Dn.years = v("years accessor is deprecated. Use year instead", Lt), Dn.zone = v("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
        return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
    }), Dn.isDSTShifted = v("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
        if (!s(this._isDSTShifted)) return this._isDSTShifted;
        var e = {};
        if (f(e, this), (e = ye(e))._a) {
            var t = e._isUTC ? l(e._a) : pe(e._a);
            this._isDSTShifted = this.isValid() && p(e._a, t.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    });
    var kn = k.prototype;
    kn.calendar = function(e, t, n) {
        var s = this._calendar[e] || this._calendar.sameElse;
        return S(s) ? s.call(t, n) : s
    }, kn.longDateFormat = function(e) {
        var t = this._longDateFormat[e],
            n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }), this._longDateFormat[e])
    }, kn.invalidDate = function() {
        return this._invalidDate
    }, kn.ordinal = function(e) {
        return this._ordinal.replace("%d", e)
    }, kn.preparse = Ge, kn.postformat = Ge, kn.relativeTime = function(e, t, n, s) {
        var i = this._relativeTime[n];
        return S(i) ? i(e, t, n, s) : i.replace(/%d/i, e)
    }, kn.pastFuture = function(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return S(n) ? n(t) : n.replace(/%s/i, t)
    }, kn.set = function(e) {
        var t, n;
        for (n in e) S(t = e[n]) ? this[n] = t : this["_" + n] = t;
        this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }, kn.months = function(e, n) {
        return e ? t(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Nt).test(n) ? "format" : "standalone"][e.month()] : t(this._months) ? this._months : this._months.standalone
    }, kn.monthsShort = function(e, n) {
        return e ? t(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Nt.test(n) ? "format" : "standalone"][e.month()] : t(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }, kn.monthsParse = function(e, t, n) {
        var s, i, r;
        if (this._monthsParseExact) return function(e, t, n) {
            var s, i, r, a = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) r = l([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase();
            return n ? "MMM" === t ? -1 !== (i = Ut.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = Ut.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = Ut.call(this._shortMonthsParse, a)) ? i : -1 !== (i = Ut.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = Ut.call(this._longMonthsParse, a)) ? i : -1 !== (i = Ut.call(this._shortMonthsParse, a)) ? i : null
        }.call(this, e, t, n);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
            if (i = l([2e3, s]), n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[s] || (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[s] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[s].test(e)) return s;
            if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
            if (!n && this._monthsParse[s].test(e)) return s
        }
    }, kn.monthsRegex = function(e) {
        return this._monthsParseExact ? (o(this, "_monthsRegex") || q.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (o(this, "_monthsRegex") || (this._monthsRegex = It), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
    }, kn.monthsShortRegex = function(e) {
        return this._monthsParseExact ? (o(this, "_monthsRegex") || q.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (o(this, "_monthsShortRegex") || (this._monthsShortRegex = Et), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }, kn.week = function(e) {
        return X(e, this._week.dow, this._week.doy).week
    }, kn.firstDayOfYear = function() {
        return this._week.doy
    }, kn.firstDayOfWeek = function() {
        return this._week.dow
    }, kn.weekdays = function(e, n) {
        return e ? t(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(n) ? "format" : "standalone"][e.day()] : t(this._weekdays) ? this._weekdays : this._weekdays.standalone
    }, kn.weekdaysMin = function(e) {
        return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
    }, kn.weekdaysShort = function(e) {
        return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
    }, kn.weekdaysParse = function(e, t, n) {
        var s, i, r;
        if (this._weekdaysParseExact) return function(e, t, n) {
            var s, i, r, a = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) r = l([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase();
            return n ? "dddd" === t ? -1 !== (i = Ut.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ut.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = Ut.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = Ut.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ut.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ut.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ut.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ut.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ut.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = Ut.call(this._minWeekdaysParse, a)) ? i : -1 !== (i = Ut.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ut.call(this._shortWeekdaysParse, a)) ? i : null
        }.call(this, e, t, n);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
            if (i = l([2e3, 1]).day(s), n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(i, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[s] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[s].test(e)) return s;
            if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
            if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
            if (!n && this._weekdaysParse[s].test(e)) return s
        }
    }, kn.weekdaysRegex = function(e) {
        return this._weekdaysParseExact ? (o(this, "_weekdaysRegex") || ee.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (o(this, "_weekdaysRegex") || (this._weekdaysRegex = zt), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }, kn.weekdaysShortRegex = function(e) {
        return this._weekdaysParseExact ? (o(this, "_weekdaysRegex") || ee.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (o(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = $t), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }, kn.weekdaysMinRegex = function(e) {
        return this._weekdaysParseExact ? (o(this, "_weekdaysRegex") || ee.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (o(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = qt), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }, kn.isPM = function(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }, kn.meridiem = function(e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }, ae("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 === g(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        }
    }), e.lang = v("moment.lang is deprecated. Use moment.locale instead.", ae), e.langData = v("moment.langData is deprecated. Use moment.localeData instead.", ue);
    var Yn = Math.abs,
        On = $e("ms"),
        Tn = $e("s"),
        xn = $e("m"),
        bn = $e("h"),
        Pn = $e("d"),
        Wn = $e("w"),
        Hn = $e("M"),
        Rn = $e("y"),
        Cn = qe("milliseconds"),
        Fn = qe("seconds"),
        Un = qe("minutes"),
        Ln = qe("hours"),
        Nn = qe("days"),
        Gn = qe("months"),
        Vn = qe("years"),
        En = Math.round,
        In = {
            ss: 44,
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        An = Math.abs,
        jn = ve.prototype;
    return jn.isValid = function() {
            return this._isValid
        }, jn.abs = function() {
            var e = this._data;
            return this._milliseconds = Yn(this._milliseconds), this._days = Yn(this._days), this._months = Yn(this._months), e.milliseconds = Yn(e.milliseconds), e.seconds = Yn(e.seconds), e.minutes = Yn(e.minutes), e.hours = Yn(e.hours), e.months = Yn(e.months), e.years = Yn(e.years), this
        }, jn.add = function(e, t) {
            return Ae(this, e, t, 1)
        }, jn.subtract = function(e, t) {
            return Ae(this, e, t, -1)
        }, jn.as = function(e) {
            if (!this.isValid()) return NaN;
            var t, n, s = this._milliseconds;
            if ("month" === (e = O(e)) || "year" === e) return t = this._days + s / 864e5, n = this._months + Ze(t), "month" === e ? n : n / 12;
            switch (t = this._days + Math.round(ze(this._months)), e) {
                case "week":
                    return t / 7 + s / 6048e5;
                case "day":
                    return t + s / 864e5;
                case "hour":
                    return 24 * t + s / 36e5;
                case "minute":
                    return 1440 * t + s / 6e4;
                case "second":
                    return 86400 * t + s / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * t) + s;
                default:
                    throw new Error("Unknown unit " + e)
            }
        }, jn.asMilliseconds = On, jn.asSeconds = Tn, jn.asMinutes = xn, jn.asHours = bn, jn.asDays = Pn, jn.asWeeks = Wn, jn.asMonths = Hn, jn.asYears = Rn, jn.valueOf = function() {
            return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12) : NaN
        }, jn._bubble = function() {
            var e, t, n, s, i, r = this._milliseconds,
                a = this._days,
                o = this._months,
                u = this._data;
            return r >= 0 && a >= 0 && o >= 0 || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * je(ze(o) + a), a = 0, o = 0), u.milliseconds = r % 1e3, e = y(r / 1e3), u.seconds = e % 60, t = y(e / 60), u.minutes = t % 60, n = y(t / 60), u.hours = n % 24, a += y(n / 24), i = y(Ze(a)), o += i, a -= je(ze(i)), s = y(o / 12), o %= 12, u.days = a, u.months = o, u.years = s, this
        }, jn.clone = function() {
            return xe(this)
        }, jn.get = function(e) {
            return e = O(e), this.isValid() ? this[e + "s"]() : NaN
        }, jn.milliseconds = Cn, jn.seconds = Fn, jn.minutes = Un, jn.hours = Ln, jn.days = Nn, jn.weeks = function() {
            return y(this.days() / 7)
        }, jn.months = Gn, jn.years = Vn, jn.humanize = function(e) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var t = this.localeData(),
                n = function(e, t, n) {
                    var s = xe(e).abs(),
                        i = En(s.as("s")),
                        r = En(s.as("m")),
                        a = En(s.as("h")),
                        o = En(s.as("d")),
                        u = En(s.as("M")),
                        l = En(s.as("y")),
                        d = i <= In.ss && ["s", i] || i < In.s && ["ss", i] || r <= 1 && ["m"] || r < In.m && ["mm", r] || a <= 1 && ["h"] || a < In.h && ["hh", a] || o <= 1 && ["d"] || o < In.d && ["dd", o] || u <= 1 && ["M"] || u < In.M && ["MM", u] || l <= 1 && ["y"] || ["yy", l];
                    return d[2] = t, d[3] = +e > 0, d[4] = n,
                        function(e, t, n, s, i) {
                            return i.relativeTime(t || 1, !!n, e, s)
                        }.apply(null, d)
                }(this, !e, t);
            return e && (n = t.pastFuture(+this, n)), t.postformat(n)
        }, jn.toISOString = Be, jn.toString = Be, jn.toJSON = Be, jn.locale = Ce, jn.localeData = Fe, jn.toIsoString = v("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Be), jn.lang = gn, P("X", 0, 0, "unix"), P("x", 0, 0, "valueOf"), C("x", Mt), C("X", /[+-]?\d+(\.\d{1,3})?/), L("X", function(e, t, n) {
            n._d = new Date(1e3 * parseFloat(e, 10))
        }), L("x", function(e, t, n) {
            n._d = new Date(g(e))
        }), e.version = "2.20.1",
        function(e) {
            Qe = e
        }(pe), e.fn = Dn, e.min = function() {
            return we("isBefore", [].slice.call(arguments, 0))
        }, e.max = function() {
            return we("isAfter", [].slice.call(arguments, 0))
        }, e.now = function() {
            return Date.now ? Date.now() : +new Date
        }, e.utc = l, e.unix = function(e) {
            return pe(1e3 * e)
        }, e.months = function(e, t) {
            return Ee(e, t, "months")
        }, e.isDate = r, e.locale = ae, e.invalid = c, e.duration = xe, e.isMoment = _, e.weekdays = function(e, t, n) {
            return Ie(e, t, n, "weekdays")
        }, e.parseZone = function() {
            return pe.apply(null, arguments).parseZone()
        }, e.localeData = ue, e.isDuration = Me, e.monthsShort = function(e, t) {
            return Ee(e, t, "monthsShort")
        }, e.weekdaysMin = function(e, t, n) {
            return Ie(e, t, n, "weekdaysMin")
        }, e.defineLocale = oe, e.updateLocale = function(e, t) {
            if (null != t) {
                var n, s, i = Qt;
                null != (s = re(e)) && (i = s._config), (n = new k(t = D(i, t))).parentLocale = Xt[e], Xt[e] = n, ae(e)
            } else null != Xt[e] && (null != Xt[e].parentLocale ? Xt[e] = Xt[e].parentLocale : null != Xt[e] && delete Xt[e]);
            return Xt[e]
        }, e.locales = function() {
            return nt(Xt)
        }, e.weekdaysShort = function(e, t, n) {
            return Ie(e, t, n, "weekdaysShort")
        }, e.normalizeUnits = O, e.relativeTimeRounding = function(e) {
            return void 0 === e ? En : "function" == typeof e && (En = e, !0)
        }, e.relativeTimeThreshold = function(e, t) {
            return void 0 !== In[e] && (void 0 === t ? In[e] : (In[e] = t, "s" === e && (In.ss = t - 1), !0))
        }, e.calendarFormat = function(e, t) {
            var n = e.diff(t, "days", !0);
            return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
        }, e.prototype = Dn, e.HTML5_FMT = {
            DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
            DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
            DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
            DATE: "YYYY-MM-DD",
            TIME: "HH:mm",
            TIME_SECONDS: "HH:mm:ss",
            TIME_MS: "HH:mm:ss.SSS",
            WEEK: "YYYY-[W]WW",
            MONTH: "YYYY-MM"
        }, e
});
// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/build/content/content.min.js

! function() {
    if (!window.hasRun) {
        window.hasRun = !0;
        var e = chrome.runtime.connect({
            name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, "").split("\n").join("").split("\r").join("")
        });
        window.addEventListener("message", function(e) {
            var t = "chrome-extension://" + chrome.runtime.id;
            if (e.origin == t) {
                var n = u();
                if (!n) return;
                if (e.data.cameraSetupError) {
                    if (chrome.storage.sync.set({
                            enableEmbeddedCamera: "false"
                        }), n.getElementById("outklip-webcam-player").style.display = "none", $("#cameraswitch", n) && $("#cameraswitch", n).prop("checked", !1), $("#tabcameraswitch", n) && $("#tabcameraswitch", n).prop("checked", !1), "user" == e.data.requesttype) {
                        var o = '<span style="color:red;">Camera setup failed</span>. <a href="https://outklip.com/help/article/fix-the-camera-setup-failed-error" target="_blank"> How to fix? </a>';
                        n.getElementById("outklip-desktop-error").innerHTML = o, n.getElementById("outklip-tab-error").innerHTML = o, n.getElementById("outklip-camera-mode-error").innerHTML = o,
                            function() {
                                if (!document.getElementById("outklip-camera-setup-error")) {
                                    var e = document.createElement("div");
                                    e.id = "outklip-camera-setup-error", document.body.appendChild(e)
                                }
                            }()
                    }
                } else if (e.data.cameraIsOn) {
                    chrome.storage.sync.set({
                            enableEmbeddedCamera: e.data.cameraIsOn.toString()
                        }), n.getElementById("outklip-profile-photo").style.display = "none", n.getElementById("outklip-webcam-player").style.display = "inline-block", $("#cameraswitch", n) && $("#cameraswitch", n).prop("checked", e.data.cameraIsOn), $("#tabcameraswitch", n) && $("#tabcameraswitch", n).prop("checked", e.data.cameraIsOn), chrome.storage.sync.get(["cameraSize"], function(e) {
                            var t = n.getElementById("getcameraiframe");
                            if (t) {
                                var o = "250px",
                                    i = "250px";
                                "Medium" == e.cameraSize ? (o = "190px", i = "190px") : "Small" == e.cameraSize && (o = "140px", i = "140px"), t.contentWindow.postMessage({
                                    type: "CHANGE_SIZE",
                                    width: o,
                                    height: i
                                }, "*"), t.style.width = o, t.style.height = i
                            }
                        }),
                        function() {
                            var e = document.getElementById("outklip-camera-setup-error");
                            e && e.remove();
                            var t = u();
                            if (!t) return;
                            t.getElementById("outklip-desktop-error").innerHTML = "", t.getElementById("outklip-tab-error").innerHTML = "", t.getElementById("outklip-camera-mode-error").innerHTML = ""
                        }(), pe(), (l = n.getElementById("getcameraiframe")) && l.contentWindow.postMessage({
                            type: "GET_CAMERA_DEVICES",
                            requesttype: "auto"
                        }, "*"), chrome.storage.sync.get(["askUserForAllUrlsPermission", "hasAllUrlsPermission"], function(e) {
                            "true" == e.askUserForAllUrlsPermission && "false" == e.hasAllUrlsPermission && (n.getElementById("outklip-allurls-rationale-container").style.display = "block", chrome.storage.sync.set({
                                askUserForAllUrlsPermission: "false"
                            }))
                        })
                } else if (e.data.micSetupError) {
                    if (chrome.storage.sync.set({
                            enableMicrophone: "false"
                        }), $("#audioswitch", n) && $("#audioswitch", n).prop("checked", !1), $("#tabmicswitch", n) && $("#tabmicswitch", n).prop("checked", !1), $("#cameramicswitch", n) && $("#cameramicswitch", n).prop("checked", !1), "user" == e.data.requesttype) {
                        var i = '<span style="color:red;">Mic setup failed</span>. <a href="https://outklip.com/help/article/fix-the-mic-setup-failed-error" target="_blank"> How to fix? </a>';
                        n.getElementById("outklip-desktop-error").innerHTML = i, n.getElementById("outklip-tab-error").innerHTML = i, n.getElementById("outklip-camera-mode-error").innerHTML = i,
                            function() {
                                if (!document.getElementById("outklip-mic-setup-error")) {
                                    var e = document.createElement("div");
                                    e.id = "outklip-mic-setup-error", document.body.appendChild(e)
                                }
                            }()
                    }
                } else if (e.data.micIsOn) {
                    var l;
                    chrome.storage.sync.set({
                        enableMicrophone: "true"
                    }), $("#audioswitch", n) && $("#audioswitch", n).prop("checked", !0), $("#tabmicswitch", n) && $("#tabmicswitch", n).prop("checked", !0), $("#cameramicswitch", n) && $("#cameramicswitch", n).prop("checked", !0), pe(), (l = n.getElementById("getmiciframe")) && l.contentWindow.postMessage({
                        type: "GET_MIC_DEVICES",
                        requesttype: "auto"
                    }, "*")
                } else if (e.data.listOfCameraInputDevices) {
                    if ($("#cameradeviceselect", n)) {
                        $("#cameradeviceselect", n).empty();
                        var a = !1;
                        chrome.storage.sync.get(["camera"], function(t) {
                            for (var o = 0; o < e.data.listOfCameraInputDevices.length; o++) $("#cameradeviceselect", n).append(`<option value="${e.data.listOfCameraInputDevices[o].id}">${e.data.listOfCameraInputDevices[o].label}</option>`), t.camera == e.data.listOfCameraInputDevices[o].id && ($("#cameradeviceselect", n).val(e.data.listOfCameraInputDevices[o].id), a = !0);
                            a || (0 == e.data.listOfCameraInputDevices.length ? $("#cameradeviceselect", n).append('<option value="none">None</option>').val("none") : $("#cameradeviceselect", n).val(e.data.listOfCameraInputDevices[0].id))
                        })
                    }
                } else if (e.data.listOfMicDevices && $("#micdeviceselect", n)) {
                    $("#micdeviceselect", n).empty();
                    var r = !1;
                    chrome.storage.sync.get(["microphone"], function(t) {
                        for (var o = 0; o < e.data.listOfMicDevices.length; o++) $("#micdeviceselect", n).append(`<option value="${e.data.listOfMicDevices[o].id}">${e.data.listOfMicDevices[o].label}</option>`), t.microphone == e.data.listOfMicDevices[o].id && ($("#micdeviceselect", n).val(e.data.listOfMicDevices[o].id), r = !0);
                        r || (0 == e.data.listOfMicDevices.length ? $("#micdeviceselect", n).append('<option value="none">None</option>').val("none") : $("#micdeviceselect", n).val(e.data.listOfMicDevices[0].id))
                    })
                }
            }
        }, !1);
        var t = ["filter-none", "filter-aden", "filter-amaro", "filter-clarendon", "filter-gingham", "filter-hefe", "filter-hudson", "filter-inkwell", "filter-juno", "filter-lark", "filter-lofi", "filter-ludwig", "filter-mayfair", "filter-moon", "filter-nashville", "filter-perpetua", "filter-reyes", "filter-rise", "filter-sierra", "filter-valencia", "filter-willow", "filter-xpro-ii"];
        if (chrome.runtime.onMessage.addListener(function(t, n, o) {
                if ("show_signup" == t.greeting) chrome.storage.sync.set({
                    contentScriptState: "signup"
                }), (s = u()) && s.getElementById("outklip-modal-id") ? (s.getElementById("outklip-config-modal").style.display = "none", s.getElementById("outklip-signup-modal").style.display = "block", s.getElementById("outklip-modal-id").style.display = "block", s.getElementById("outklip-sandbox").addEventListener("click", R), s.getElementById("outklip-close-signup").onclick = T, s.getElementById("outklip-signup-logo").src = chrome.extension.getURL("images/v11/logo.png")) : $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                    g(e);
                    var t = u();
                    t.getElementById("outklip-config-modal").style.display = "none", t.getElementById("outklip-signup-modal").style.display = "block", t.getElementById("outklip-modal-id").style.display = "block", t.getElementById("outklip-sandbox").addEventListener("click", R), t.getElementById("outklip-close-signup").onclick = T, t.getElementById("outklip-signup-logo").src = chrome.extension.getURL("images/v11/logo.png")
                });
                else if ("hide_signup" == t.greeting) {
                    (s = u()) ? (s.getElementById("outklip-signup-modal").style.display = "none", s.getElementById("outklip-modal-id").style.display = "none") : $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e);
                        var t = u();
                        t.getElementById("outklip-signup-modal").style.display = "none", t.getElementById("outklip-modal-id").style.display = "none"
                    }), chrome.storage.sync.set({
                        contentScriptState: "none"
                    })
                } else if ("show_config" == t.greeting) {
                    if (a = t.profilephoto ? t.profilephoto : me(t.username), chrome.storage.sync.set({
                            contentScriptState: "config"
                        }), (s = u()) && s.getElementById("outklip-modal-id")) ye(), s.getElementById("outklip-signup-modal").style.display = "none", s.getElementById("outklip-webcam-video-container").style.display = "block", s.getElementById("outklip-config-modal").style.display = "block", s.getElementById("outklip-modal-id").style.display = "block", h(), E(), V(), ee(), se(t.customerType, t.daysLeftInTrial, t.numCredits), s.getElementById("outklip-settings-link").href = "chrome-extension://" + chrome.runtime.id + "/settings.html";
                    else $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), ye();
                        var n = u();
                        n.getElementById("outklip-signup-modal").style.display = "none", n.getElementById("outklip-config-modal").style.display = "block", n.getElementById("outklip-modal-id").style.display = "block", n.getElementById("outklip-webcam-video-container").style.display = "block", h(), E(), V(), ee(), se(t.customerType, t.daysLeftInTrial, t.numCredits), n.getElementById("outklip-settings-link").href = "chrome-extension://" + chrome.runtime.id + "/settings.html"
                    })
                } else if ("hide_config" == t.greeting) {
                    (s = u()) ? D(): $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), D()
                    }), t.switchactivetab || chrome.storage.sync.set({
                        contentScriptState: "none"
                    })
                } else if ("show_countdown" == t.greeting) {
                    a = t.profilephoto ? t.profilephoto : me(t.username), chrome.storage.sync.set({
                        isRecordingPausedOrNotStarted: "false"
                    }), (s = u()) ? (ae(), re(), chrome.storage.sync.get("countdownTimerValueInSeconds", function(t) {
                        if (t.countdownTimerValueInSeconds) {
                            if (0 === parseInt(t.countdownTimerValueInSeconds)) return s.getElementById("outklip-countdown-container").style.display = "none", clearTimeout(r), r = null, void e.postMessage({
                                startRecording: !0
                            });
                            c = Math.round(1e3 * parseInt(t.countdownTimerValueInSeconds, 10) / 300) + 1
                        } else c = d, chrome.storage.sync.set({
                            countdownTimerValueInSeconds: "3"
                        });
                        s.getElementById("outklip-countdown-timer").innerHTML = oe().toString(), s.getElementById("outklip-countdown-pause-resume-button").addEventListener("click", le), le(), ce()
                    }), s.getElementById("outklip-cancel-recording-during-countdown").addEventListener("click", O), s.getElementById("toggle-menu").removeEventListener("click", te), s.getElementById("toggle-menu").addEventListener("click", ne), s.getElementById("toggle-pause-resume").removeEventListener("click", A), s.getElementById("toggle-pause-resume").removeEventListener("click", H), s.getElementById("toggle-pause-resume").addEventListener("click", le), s.getElementById("cancel-recording").removeEventListener("click", T), s.getElementById("cancel-recording").removeEventListener("click", N), s.getElementById("cancel-recording").addEventListener("click", O), s.getElementById("outklip-sandbox").removeEventListener("click", R)) : $.get(chrome.runtime.getURL("content/content.html"), function(t) {
                        g(t);
                        var n = u();
                        ae(), re(), chrome.storage.sync.get("countdownTimerValueInSeconds", function(t) {
                            if (t.countdownTimerValueInSeconds) {
                                if (0 === parseInt(t.countdownTimerValueInSeconds)) return n.getElementById("outklip-countdown-container").style.display = "none", clearTimeout(r), r = null, void e.postMessage({
                                    startRecording: !0
                                });
                                c = Math.round(1e3 * parseInt(t.countdownTimerValueInSeconds, 10) / 300) + 1
                            } else c = d, chrome.storage.sync.set({
                                countdownTimerValueInSeconds: "3"
                            });
                            n.getElementById("outklip-countdown-timer").innerHTML = oe().toString(), n.getElementById("outklip-countdown-pause-resume-button").addEventListener("click", le), le(), ce()
                        }), n.getElementById("outklip-cancel-recording-during-countdown").addEventListener("click", O), n.getElementById("toggle-menu").removeEventListener("click", te), n.getElementById("toggle-menu").addEventListener("click", ne), n.getElementById("toggle-pause-resume").removeEventListener("click", A), n.getElementById("toggle-pause-resume").removeEventListener("click", H), n.getElementById("toggle-pause-resume").addEventListener("click", le), n.getElementById("cancel-recording").removeEventListener("click", T), n.getElementById("cancel-recording").removeEventListener("click", N), n.getElementById("cancel-recording").addEventListener("click", O), n.getElementById("outklip-sandbox").removeEventListener("click", R)
                    }), chrome.storage.sync.set({
                        contentScriptState: "countdown"
                    })
                } else if ("started_recording" == t.greeting) {
                    a = t.profilephoto ? t.profilephoto : me(t.username), (s = u()) ? (t.switchactivetab && ae(), re(), s.getElementById("toggle-pause-resume").removeEventListener("click", A), s.getElementById("toggle-pause-resume").removeEventListener("click", le), s.getElementById("toggle-pause-resume").addEventListener("click", H), s.getElementById("cancel-recording").removeEventListener("click", T), s.getElementById("cancel-recording").removeEventListener("click", O), s.getElementById("cancel-recording").addEventListener("click", N), s.getElementById("outklip-webcam-resize-icon").addEventListener("click", x), s.getElementById("outklip-webcam-change-filter").addEventListener("click", w), s.getElementById("outklip-open-picture-in-picture").addEventListener("click", L), s.getElementById("outklip-webcam-container-close-icon").addEventListener("click", C), s.getElementById("toggle-menu").removeEventListener("click", te), s.getElementById("toggle-menu").addEventListener("click", ne)) : $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e);
                        var n = u();
                        t.switchactivetab && ae(), re(), n.getElementById("toggle-pause-resume").removeEventListener("click", A), n.getElementById("toggle-pause-resume").removeEventListener("click", le), n.getElementById("toggle-pause-resume").addEventListener("click", H), n.getElementById("cancel-recording").removeEventListener("click", T), n.getElementById("cancel-recording").removeEventListener("click", O), n.getElementById("cancel-recording").addEventListener("click", N), n.getElementById("outklip-webcam-resize-icon").addEventListener("click", x), n.getElementById("outklip-webcam-change-filter").addEventListener("click", w), n.getElementById("outklip-open-picture-in-picture").addEventListener("click", L), n.getElementById("outklip-webcam-container-close-icon").addEventListener("click", C), n.getElementById("toggle-menu").removeEventListener("click", te), n.getElementById("toggle-menu").addEventListener("click", ne)
                    }), chrome.storage.sync.set({
                        contentScriptState: "recording"
                    }), chrome.storage.sync.get("highlightMouseCursor", function(e) {
                        if ("true" == e.highlightMouseCursor)
                            for (var t = document.getElementsByTagName("body"), n = chrome.runtime.getURL("content/assets/outklip_highlight_mouse.cur"), o = 0; o < t.length; o++) t[o].style.cursor = `url("${n}") 25 20, default`, t[o].style.zIndex = "100000"
                    })
                } else if ("stopped_recording" == t.greeting) {
                    if (s = u()) {
                        var i = s.getElementById("getcameraiframe");
                        i && i.contentWindow.postMessage({
                            type: "DISABLE_CAMERA"
                        }, "*");
                        var l = s.getElementById("getcameramodeiframe");
                        l && l.contentWindow.postMessage({
                            type: "DISABLE_CAMERA"
                        }, "*"), t.switchactivetab || chrome.storage.sync.set({
                            contentScriptState: "none"
                        }), s.getElementById("outklip-webcam-video-container").style.display = "none", s.getElementById("outklip-control-container").style.display = "none", s.getElementById("outklip-camera-modal-content").style.display = "none"
                    } else $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e);
                        var n = u(),
                            o = n.getElementById("getcameraiframe");
                        o && o.contentWindow.postMessage({
                            type: "DISABLE_CAMERA"
                        }, "*");
                        var i = n.getElementById("getcameramodeiframe");
                        i && i.contentWindow.postMessage({
                            type: "DISABLE_CAMERA"
                        }, "*"), t.switchactivetab || chrome.storage.sync.set({
                            contentScriptState: "none"
                        }), n.getElementById("outklip-webcam-video-container").style.display = "none", n.getElementById("outklip-control-container").style.display = "none", n.getElementById("outklip-camera-modal-content").style.display = "none"
                    });
                    chrome.storage.sync.get("highlightMouseCursor", function(e) {
                        if ("true" == e.highlightMouseCursor)
                            for (var t = document.getElementsByTagName("body"), n = 0; n < t.length; n++) t[n].style.cursor = "default"
                    })
                } else if ("update_recording_time_indicator" == t.greeting) {
                    (s = u()) ? (s.getElementById("recording-time-indicator-string").innerHTML = de(t.timeinseconds), s.getElementById("recording-blinker").style.display = "inline-block") : $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e);
                        var n = u();
                        n.getElementById("recording-time-indicator-string").innerHTML = de(t.timeinseconds), n.getElementById("recording-blinker").style.display = "inline-block"
                    })
                } else if ("show_outklip_loader" == t.greeting) {
                    if (s = u()) s.getElementById("outklip-close-loader").onclick = z, s.getElementById("outklip-motivational-message").innerHTML = m[Math.floor(Math.random() * m.length)], s.getElementById("outklip-loader-container").style.display = "block";
                    else $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e);
                        var t = u();
                        t.getElementById("outklip-close-loader").onclick = z, t.getElementById("outklip-motivational-message").innerHTML = m[Math.floor(Math.random() * m.length)], t.getElementById("outklip-loader-container").style.display = "block"
                    });
                    chrome.storage.sync.set({
                        contentScriptState: "uploadinprogress"
                    })
                } else if ("hide_outklip_loader" == t.greeting) {
                    (s = u()) ? s.getElementById("outklip-loader-container").style.display = "none": $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), u().getElementById("outklip-loader-container").style.display = "none"
                    }), t.switchactivetab || chrome.storage.sync.set({
                        contentScriptState: "none"
                    })
                } else if ("update_loader_percentage_complete" == t.greeting) {
                    (s = u()) ? s.getElementById("outklip-loader-percentage-complete").innerHTML = "Uploading... " + t.percentageUploadComplete + "% complete": $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), u().getElementById("outklip-loader-percentage-complete").innerHTML = "Uploading... " + t.percentageUploadComplete + "% complete"
                    })
                } else if ("update_profile_photo" == t.greeting) {
                    a = t.profilephoto ? t.profilephoto : me(t.username), (s = u()) ? s.getElementById("outklip-profile-photo").src = a : $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), u().getElementById("outklip-profile-photo").src = a
                    })
                } else if ("force_pause_recording" == t.greeting) {
                    (s = u()) ? P(): $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), P()
                    })
                } else if ("force_resume_recording" == t.greeting) {
                    (s = u()) ? F(): $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), F()
                    })
                } else if ("force_cancel_recording" == t.greeting) {
                    var s;
                    (s = u()) ? U(): $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), U()
                    })
                }
            }), !document.getElementById("outklip-extension-is-installed")) {
            var n = document.createElement("div");
            n.id = "outklip-extension-is-installed", document.body.appendChild(n)
        }
        var o = null,
            i = null,
            l = !1,
            a = null,
            r = null,
            c = 0,
            s = 300,
            d = 11,
            m = ["The curiosity he had was a driving force. - Elon Musk's uncle", "A mind once stretched never regains its original dimensions. - Oliver Wendell Holmes", "Innovation, adaption and evolution are ultimately keys to survival. - Andrew Lo", "The work will teach you how to do it. - fortune cookie", "Creativity comes from constraint. - Biz Stone", "No one has ever become poor by giving. - Anne Frank", "Believe you can and you’re halfway there. - Theodore Roosevelt", "There are no limits. There are only plateaus, and you must not stay there, you must go beyond them. - Bruce Lee", "The mind is not a vessel to be filled but a fire to be kindled. - Plutarch", "A flower is simply a weed with an advertising budget. - Rory Sutherland", "Art is what you can get away with. - Andy Warhol", "Don’t think about making art, just get it done. Let everyone else decide if it’s good or bad, whether they love it or hate it. While they are deciding, make even more art. - Andy Warhol", "The only learning curve worth being on is a steep one. - Tahir Shah", "The more you make the more you learn. - Kevin Allocca", "It's the job that's never started that takes the longest to finish. - J. R. R Tolkien", "It is our choices, that show what we truly are, far more than our abilities. - J. K. Rowling", "A flower does not think of competing with the flower next to it. It just blooms. - Iris Murdoch", "The right teacher doesn’t have to be brilliant — they just have to be able to make you want to do more of whatever you are interested in. - Robert Twigger", "We are what we repeatedly do. - Aristotle", "Delete the negative; accentuate the positive. - Donna Karan", "Creativity is intelligence having fun. - anon", "To teach is to learn twice. - Joseph Joubert", "Action is the foundational key to all success. - Picasso", "Nothing in life is to be feared. It is only to be understood. - Marie Curie", "Creativity is the residue of time wasted. - Albert Einstein", "Knowledge not shared is a puny little thing. - Dee Hock", "One person can make a huge difference in the world. - Startup Daemon", "Champions keep playing until they get it right. - Billie Jean King", "One demonstration is worth a month of practice. - Takeno Sensei", "I don't go by the rule book. I lead from the heart, not the head. - Princess Diana", "I discovered that I was the world's leading expert in one thing: my experience. - Peter Schjeldahl", "Every upgrade is inevitably in some way a downgrade. - Chris Clark", "Nothing is impossible; the word itself says 'I'm possible'! - Audrey Hepburn", "If you believe it will work out, you'll see opportunities. If you believe it won't, you will see obstacles. - Wayne Dyer", "Great video is a communication tool of unparallelled impact. - Steve Stockman", "Technology is simply a tool supporting human brilliance. - Gail Ayers", "Expect the unexpected, and whenever possible, be the unexpected. - Lynda Barry"];
        $(document).ready(function() {
            document.addEventListener("fullscreenchange", function(e) {
                i && (i.remove(), e.target == document ? document.body.appendChild(i) : e.target.appendChild(i))
            }), chrome.storage.sync.get(["inlineVideoPlayback"], function(e) {
                e && e.inlineVideoPlayback && "false" != e.inlineVideoPlayback && (window.onload = Ee, window.onhashchange = Ee, History.Adapter.bind(window, "statechange", Ee))
            })
        }), document.addEventListener("keydown", function(e) {
            "Escape" === e.code && chrome.storage.sync.get("contentScriptState", function(e) {
                if ("config" === e.contentScriptState)(t = u()) ? D() : $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                    g(e), D()
                }), chrome.storage.sync.set({
                    contentScriptState: "none"
                });
                else if ("uploadinprogress" === e.contentScriptState) {
                    var t;
                    (t = u()) ? t.getElementById("outklip-loader-container").style.display = "none": $.get(chrome.runtime.getURL("content/content.html"), function(e) {
                        g(e), u().getElementById("outklip-loader-container").style.display = "none"
                    }), chrome.storage.sync.set({
                        contentScriptState: "none"
                    })
                }
            })
        });
        var p = ["classroom.google.com"]
    }

    function g(e) {
        $(e).appendTo("body");
        var t = (i = document.getElementById("outklip-root")).attachShadow({
                mode: "open"
            }),
            n = document.createElement("link");
        n.rel = "stylesheet", n.type = "text/css", n.href = "chrome-extension://" + chrome.runtime.id + "/css/all.min.css", t.appendChild(n);
        var o = document.createElement("link");
        o.rel = "stylesheet", o.type = "text/css", o.href = "chrome-extension://" + chrome.runtime.id + "/css/instagram.min.css", t.appendChild(o);
        var l = document.getElementById("outklip-template").content,
            a = document.importNode(l, !0);
        t.appendChild(a)
    }

    function u() {
        var e = document.getElementById("outklip-root"),
            t = e ? e.shadowRoot : null;
        return t && t.getElementById("outklip-modal-id") ? t : null
    }

    function y() {
        var e = u();
        e && (e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-player").style.display = "inline-block", $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !0), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !0))
    }

    function h() {
        var e = u();
        if (e) {
            var n = e.getElementById("getcameraiframe");
            chrome.storage.sync.get(["enableEmbeddedCamera", "useIframeForEmbeddedCamera", "cameraSize", "avatarinplaceofcamera", "camera", "cameralabel"], function(i) {
                var l = "250px",
                    r = "250px";
                "Medium" == i.cameraSize ? (l = "190px", r = "190px") : "Small" == i.cameraSize && (l = "140px", r = "140px"), "true" == i.enableEmbeddedCamera ? "true" == i.useIframeForEmbeddedCamera ? (e.getElementById("outklip-profile-photo").style.display = "none", n ? (n.contentWindow.postMessage({
                    type: "ENABLE_CAMERA",
                    requesttype: "auto",
                    width: l,
                    height: r,
                    cameradeviceid: i.camera,
                    squareaspectratio: !0
                }, "*"), n.style.width = l, n.style.height = r, e.getElementById("outklip-webcam-player").style.display = "inline-block") : I(y), e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-resize-icon").style.display = "inline-block", e.getElementById("outklip-webcam-change-filter").style.display = "inline-block", e.getElementById("outklip-open-picture-in-picture").style.display = "none", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "none", v()) : (v(), navigator.mediaDevices.enumerateDevices().then(function(n) {
                    for (var l = null, a = 0; a < n.length; a++) "videoinput" === n[a].kind && n[a].label == i.cameralabel && (l = n[a].deviceId);
                    var r = {
                        video: {
                            aspectRatio: 1
                        }
                    };
                    l && (r.video.deviceId = l), navigator.mediaDevices.getUserMedia(r).then(function(n) {
                        o = n, e.getElementById("outklip-live-video-viewer-for-pip").srcObject = n, chrome.storage.sync.set({
                            enableEmbeddedCamera: "true"
                        }), $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !0), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !0), f(), e.getElementById("outklip-webcam-player").classList.remove(...t), e.getElementById("outklip-profile-photo").classList.remove(...t), e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-webcam-resize-icon").style.display = "none", e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-change-filter").style.display = "none", e.getElementById("outklip-open-picture-in-picture").style.display = "inline-block", e.getElementById("outklip-webcam-player").style.display = "inline-block", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "inline-block"
                    }).catch(function(t) {
                        console.log(t), chrome.storage.sync.set({
                            enableEmbeddedCamera: "false"
                        }), e.getElementById("outklip-webcam-player").style.display = "none", $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !1), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !1)
                    })
                })) : (n && n.contentWindow.postMessage({
                    type: "DISABLE_CAMERA"
                }, "*"), e.getElementById("outklip-webcam-player").style.display = "none", $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !1), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !1), "true" == i.avatarinplaceofcamera ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = l, e.getElementById("outklip-profile-photo").style.height = r, e.getElementById("outklip-profile-photo").style.display = "inline-block", ge(e.getElementById("outklip-webcam-video-container"), "outklip-profile-photo"), e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "inline-block", e.getElementById("outklip-open-picture-in-picture").style.display = "none") : (e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-controls").classList.add("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "none"))
            }), b()
        }
    }

    function E() {
        var e = u();
        e && (e.getElementById("getmiciframe") || k(), chrome.storage.sync.get("enableMicrophone", function(t) {
            "true" == t.enableMicrophone ? ($("#audioswitch", e).prop("checked", !0), $("#tabmicswitch", e).prop("checked", !0), $("#cameramicswitch", e).prop("checked", !0)) : ($("#audioswitch", e).prop("checked", !1), $("#tabmicswitch", e).prop("checked", !1), $("#cameramicswitch", e).prop("checked", !1))
        }))
    }

    function k(e) {
        var t = u();
        if (t) {
            var n = "chrome-extension://" + chrome.runtime.id;
            if (!location.ancestorOrigins.contains(n)) {
                var o = document.createElement("iframe");
                o.id = "getmiciframe", e && (o.onload = e), o.src = chrome.runtime.getURL("micpermission/getmic.html"), o.allow = ["microphone"], t.getElementById("outklip-mic-container").appendChild(o)
            }
        }
    }

    function I(e) {
        var t = u();
        t && chrome.storage.sync.get(["camera"], function(n) {
            var o = "chrome-extension://" + chrome.runtime.id;
            if (!location.ancestorOrigins.contains(o)) {
                var i = document.createElement("iframe");
                i.id = "getcameraiframe", i.src = chrome.runtime.getURL("camerapermission/getcamera.html") + "?cameradeviceid=" + n.camera + "&squareaspectratio=true", i.style = "display:block;border:none;vertical-align:middle;", i.scrolling = "no", e && (i.onload = e), i.allow = ["camera"], t.getElementById("outklip-webcam-player").appendChild(i), t.getElementById("outklip-profile-photo").style.display = "none", t.getElementById("outklip-webcam-player").style.display = "inline-block", ge(t.getElementById("outklip-webcam-video-container"), "outklip-webcam-player")
            }
        })
    }

    function f() {
        var e = u();
        if (e) {
            var t = e.getElementById("getcameraiframe");
            t && (t.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*"), e.getElementById("outklip-webcam-player").removeChild(t))
        }
    }
    async function v() {
        if (o) {
            try {
                await document.exitPictureInPicture()
            } catch (e) {}
            o.getVideoTracks()[0].stop(), o = null
        }
    }

    function B() {
        var e = u();
        e && chrome.storage.sync.get("enableMicrophone", function(t) {
            if ("true" == t.enableMicrophone) chrome.storage.sync.set({
                enableMicrophone: "false"
            }), $("#audioswitch", e).prop("checked", !1), $("#tabmicswitch", e).prop("checked", !1), $("#cameramicswitch", e).prop("checked", !1);
            else {
                var n = e.getElementById("getmiciframe");
                n ? n.contentWindow.postMessage({
                    type: "ENABLE_MICROPHONE",
                    requesttype: "user"
                }, "*") : k()
            }
        })
    }

    function b() {
        var e = u();
        e && chrome.storage.sync.get("webcamFilterIndex", function(n) {
            e.getElementById("outklip-webcam-player").classList.remove(...t), e.getElementById("outklip-profile-photo").classList.remove(...t);
            var o = parseInt(n.webcamFilterIndex);
            e.getElementById("outklip-webcam-player").classList.add(t[o]), e.getElementById("outklip-profile-photo").classList.add(t[o]), chrome.storage.sync.set({
                webcamFilterIndex: o
            })
        })
    }

    function w() {
        var e = u();
        e && chrome.storage.sync.get("webcamFilterIndex", function(n) {
            e.getElementById("outklip-webcam-player").classList.remove(...t), e.getElementById("outklip-profile-photo").classList.remove(...t);
            var o = parseInt(n.webcamFilterIndex);
            o = ++o % t.length, e.getElementById("outklip-webcam-player").classList.add(t[o]), e.getElementById("outklip-profile-photo").classList.add(t[o]), chrome.storage.sync.set({
                webcamFilterIndex: o
            })
        })
    }
    async function L() {
        var e = u();
        e && await e.getElementById("outklip-live-video-viewer-for-pip").requestPictureInPicture()
    }

    function M() {
        var e = u();
        e && chrome.storage.sync.get("enableTabAudio", function(t) {
            "true" == t.enableTabAudio ? (chrome.storage.sync.set({
                enableTabAudio: "false"
            }), $("#tabaudioswitch", e).prop("checked", !1)) : (chrome.storage.sync.set({
                enableTabAudio: "true"
            }), $("#tabaudioswitch", e).prop("checked", !0))
        })
    }

    function S() {
        var e = u();
        if (e) {
            var t = e.getElementById("getcameraiframe");
            chrome.storage.sync.get(["enableEmbeddedCamera", "useIframeForEmbeddedCamera", "cameraSize", "avatarinplaceofcamera", "camera", "cameralabel"], function(n) {
                var i = "250px",
                    l = "250px";
                "Medium" == n.cameraSize ? (i = "190px", l = "190px") : "Small" == n.cameraSize && (i = "140px", l = "140px"), "true" == n.enableEmbeddedCamera ? (chrome.storage.sync.set({
                    enableEmbeddedCamera: "false"
                }), e.getElementById("outklip-webcam-player").style.display = "none", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "none", $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !1), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !1), t && t.contentWindow.postMessage({
                    type: "DISABLE_CAMERA"
                }, "*"), v(), "true" == n.avatarinplaceofcamera ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = i, e.getElementById("outklip-profile-photo").style.height = l, e.getElementById("outklip-profile-photo").style.display = "inline-block", ge(e.getElementById("outklip-webcam-video-container"), "outklip-profile-photo"), e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "inline-block", e.getElementById("outklip-open-picture-in-picture").style.display = "none") : (e.getElementById("outklip-webcam-controls").classList.add("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "none")) : (chrome.storage.sync.set({
                    enableEmbeddedCamera: "true"
                }), "true" == n.useIframeForEmbeddedCamera ? (e.getElementById("outklip-profile-photo").style.display = "none", n.cameraSize || chrome.storage.sync.set({
                    cameraSize: "Large"
                }), $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !0), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !0), t ? (t.contentWindow.postMessage({
                    type: "ENABLE_CAMERA",
                    requesttype: "user",
                    width: i,
                    height: l,
                    cameradeviceid: n.camera,
                    squareaspectratio: !0
                }, "*"), t.style.width = i, t.style.height = l, e.getElementById("outklip-webcam-player").style.display = "inline-block") : I(y), e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-resize-icon").style.display = "inline-block", e.getElementById("outklip-webcam-change-filter").style.display = "inline-block", e.getElementById("outklip-open-picture-in-picture").style.display = "none", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "none", v()) : (v(), navigator.mediaDevices.enumerateDevices().then(function(t) {
                    for (var i = null, l = 0; l < t.length; l++) "videoinput" === t[l].kind && t[l].label == n.cameralabel && (i = t[l].deviceId);
                    var a = {
                        video: {
                            aspectRatio: 1
                        }
                    };
                    i && (a.video.deviceId = i), navigator.mediaDevices.getUserMedia(a).then(function(t) {
                        o = t, e.getElementById("outklip-live-video-viewer-for-pip").srcObject = t, f(), e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-webcam-resize-icon").style.display = "none", e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-change-filter").style.display = "none", e.getElementById("outklip-open-picture-in-picture").style.display = "inline-block", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "inline-block", e.getElementById("outklip-webcam-player").style.display = "inline-block"
                    }).catch(function(e) {
                        console.log(e)
                    })
                })))
            })
        }
    }

    function C() {
        var e = u();
        if (e) {
            var t = e.getElementById("getcameraiframe");
            chrome.storage.sync.get(["enableEmbeddedCamera", "useIframeForEmbeddedCamera", "avatarinplaceofcamera"], function(n) {
                "true" == n.enableEmbeddedCamera ? (chrome.storage.sync.set({
                    enableEmbeddedCamera: "false"
                }), e.getElementById("outklip-webcam-player").style.display = "none", $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !1), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !1), e.getElementById("outklip-webcam-controls").classList.add("disable-hover"), "true" == n.useIframeForEmbeddedCamera && t ? t.contentWindow.postMessage({
                    type: "DISABLE_CAMERA"
                }, "*") : (e.getElementById("outklip-open-picture-in-picture").style.display = "none", v())) : "true" == n.avatarinplaceofcamera && (e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-controls").classList.add("disable-hover"), chrome.storage.sync.set({
                    avatarinplaceofcamera: "false"
                }), $("#profilephotoswitch", e) && $("#profilephotoswitch", e).prop("checked", !1))
            })
        }
    }

    function x() {
        var e = u();
        if (e) {
            var t = e.getElementById("getcameraiframe");
            chrome.storage.sync.get(["enableEmbeddedCamera", "useIframeForEmbeddedCamera", "cameraSize", "avatarinplaceofcamera"], function(n) {
                "true" == n.enableEmbeddedCamera ? n.useIframeForEmbeddedCamera && ("Large" == n.cameraSize ? (t && (t.contentWindow.postMessage({
                    type: "CHANGE_SIZE",
                    width: "190px",
                    height: "190px"
                }, "*"), t.style.width = "190px", t.style.height = "190px"), chrome.storage.sync.set({
                    cameraSize: "Medium"
                })) : "Medium" == n.cameraSize ? (t && (t.contentWindow.postMessage({
                    type: "CHANGE_SIZE",
                    width: "140px",
                    height: "140px"
                }, "*"), t.style.width = "140px", t.style.height = "140px"), chrome.storage.sync.set({
                    cameraSize: "Small"
                })) : "Small" == n.cameraSize && (t && (t.contentWindow.postMessage({
                    type: "CHANGE_SIZE",
                    width: "250px",
                    height: "250px"
                }, "*"), t.style.width = "250px", t.style.height = "250px"), chrome.storage.sync.set({
                    cameraSize: "Large"
                }))) : "true" == n.avatarinplaceofcamera && ("Large" == n.cameraSize ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = "190px", e.getElementById("outklip-profile-photo").style.height = "190px", e.getElementById("outklip-profile-photo").style.display = "inline-block", chrome.storage.sync.set({
                    cameraSize: "Medium"
                })) : "Medium" == n.cameraSize ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = "140px", e.getElementById("outklip-profile-photo").style.height = "140px", e.getElementById("outklip-profile-photo").style.display = "inline-block", chrome.storage.sync.set({
                    cameraSize: "Small"
                })) : "Small" == n.cameraSize && (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = "250px", e.getElementById("outklip-profile-photo").style.height = "250px", e.getElementById("outklip-profile-photo").style.display = "inline-block", chrome.storage.sync.set({
                    cameraSize: "Large"
                })))
            })
        }
    }

    function A(t) {
        var n = u();
        if (n) {
            t.preventDefault(), n.getElementById("outklip-modal-id").style.display = "none", n.getElementById("outklip-webcam-video-container").style.display = "none", n.getElementById("outklip-control-container").style.display = "none";
            var o = n.getElementById("getcameraiframe");
            o && o.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*");
            try {
                chrome.storage.sync.set({
                    enableSpeakers: "false"
                }, function() {
                    chrome.extension.lastError && alert("An error occurred: " + chrome.extension.lastError.message), e.postMessage({
                        setupForRecording: !0
                    })
                })
            } catch (e) {}
            return !1
        }
    }

    function T() {
        D(), chrome.storage.sync.set({
            contentScriptState: "none"
        })
    }

    function R(e) {
        var t = u();
        if (t) {
            var n = ["outklip-config-modal", "outklip-camera-modal-content", "outklip-control-container", "outklip-countdown-container", "outklip-loader-container", "outklip-webcam-video-container", "outklip-mic-container", "outklip-allurls-rationale-content", "outklip-signup-modal"],
                o = 0;
            for (o = 0; o < n.length && !t.getElementById(n[o]).contains(e.target); o++);
            o < n.length || (e.preventDefault(), T())
        }
    }

    function z() {
        var e = u();
        e && (e.getElementById("outklip-loader-container").style.display = "none", chrome.storage.sync.set({
            contentScriptState: "none"
        }))
    }

    function _() {
        var t = u();
        if (t) {
            var n = t.getElementById("getcameraiframe");
            n && n.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*"), v();
            var o = t.getElementById("getcameramodeiframe");
            o && o.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*"), t.getElementById("outklip-webcam-video-container").style.display = "none", t.getElementById("outklip-control-container").style.display = "none", e.postMessage({
                stopRecording: !0
            })
        }
    }

    function D() {
        var e = u();
        if (e) {
            e.getElementById("outklip-modal-id").style.display = "none";
            var t = e.getElementById("getcameraiframe");
            t && t.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*"), v(), e.getElementById("outklip-webcam-video-container").style.display = "none", e.getElementById("outklip-control-container").style.display = "none", e.getElementById("outklip-allurls-rationale-container").style.display = "none"
        }
    }

    function N() {
        U(), e.postMessage({
            cancelRecording: !0
        })
    }

    function O() {
        U(), e.postMessage({
            cancelCountdown: !0
        })
    }

    function U() {
        var e = u();
        if (e) {
            r && (clearTimeout(r), r = null), chrome.storage.sync.set({
                contentScriptState: "none"
            });
            var t = e.getElementById("getcameraiframe");
            t && t.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*"), v();
            var n = e.getElementById("getcameramodeiframe");
            n && n.contentWindow.postMessage({
                type: "DISABLE_CAMERA"
            }, "*"), e.getElementById("outklip-webcam-video-container").style.display = "none", e.getElementById("outklip-control-container").style.display = "none", e.getElementById("outklip-camera-modal-content").style.display = "none", e.getElementById("outklip-countdown-container").style.display = "none"
        }
    }

    function H() {
        u() && chrome.storage.sync.get("isRecordingPausedOrNotStarted", function(t) {
            "true" == t.isRecordingPausedOrNotStarted ? (F(), e.postMessage({
                resumeRecording: !0
            })) : (P(), e.postMessage({
                pauseRecording: !0
            }))
        })
    }

    function P() {
        var e = u();
        e && (chrome.storage.sync.set({
            isRecordingPausedOrNotStarted: "true"
        }), e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]), e.getElementById("outklip-pause-resume-recording").title = "Resume recording")
    }

    function F() {
        var e = u();
        e && (chrome.storage.sync.set({
            isRecordingPausedOrNotStarted: "false"
        }), e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-play"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").title = "Pause recording")
    }

    function W() {
        var e = u();
        e && (!0 === l ? (l = !1, e.getElementById("config-options").style.display = "none", e.getElementById("show-more-options-button").innerHTML = "Show more options", e.getElementById("show-more-options-button-icon").classList.remove(["fa-caret-up"]), e.getElementById("show-more-options-button-icon").classList.add(["fa-caret-down"])) : (l = !0, e.getElementById("show-more-options-button").innerHTML = "Hide options", e.getElementById("show-more-options-button-icon").classList.remove(["fa-caret-down"]), e.getElementById("show-more-options-button-icon").classList.add(["fa-caret-up"]), e.getElementById("config-options").style.display = "block"))
    }

    function V() {
        var e = u();
        e && (e.getElementById("outklip-webcam-video-container").style.display = "block", e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]), e.getElementById("outklip-pause-resume-recording").title = "Start recording", chrome.storage.sync.set({
            isRecordingPausedOrNotStarted: "true"
        }), e.getElementById("outklip-close-config").onclick = T, e.getElementById("outklip-recordaudiosetting").addEventListener("click", B), e.getElementById("outklip-recordaudiosettinglabel").addEventListener("click", B), e.getElementById("audioswitch").addEventListener("click", B), e.getElementById("outklip-recordtabmicsetting").addEventListener("click", B), e.getElementById("outklip-recordtabmicsettinglabel").addEventListener("click", B), e.getElementById("outklip-recordcameramicsetting").addEventListener("click", B), e.getElementById("outklip-recordcameramicsettinglabel").addEventListener("click", B), e.getElementById("tabmicswitch").addEventListener("click", B), e.getElementById("cameramicswitch").addEventListener("click", B), e.getElementById("tabaudioswitch").addEventListener("click", M), e.getElementById("outklip-recordtabaudiosetting").addEventListener("click", M), e.getElementById("outklip-recordtabaudiosettinglabel").addEventListener("click", M), chrome.storage.sync.set({
            enableTabCaptureAPI: "false"
        }), e.getElementById("outklip-recordcamerasetting").addEventListener("click", S), e.getElementById("outklip-recordcamerasettinglabel").addEventListener("click", S), e.getElementById("cameraswitch").addEventListener("click", S), e.getElementById("outklip-recordtabcamerasetting").addEventListener("click", S), e.getElementById("outklip-recordtabcamerasettinglabel").addEventListener("click", S), e.getElementById("tabcameraswitch").addEventListener("click", S), e.getElementById("outklip-webcam-resize-icon").addEventListener("click", x), e.getElementById("outklip-webcam-change-filter").addEventListener("click", w), e.getElementById("outklip-open-picture-in-picture").addEventListener("click", L), e.getElementById("outklip-webcam-container-close-icon").addEventListener("click", C), e.getElementById("outklip-startrecording").addEventListener("click", A), e.getElementById("cancel-recording").removeEventListener("click", O), e.getElementById("cancel-recording").removeEventListener("click", N), e.getElementById("cancel-recording").addEventListener("click", T), e.getElementById("toggle-pause-resume").removeEventListener("click", le), e.getElementById("toggle-pause-resume").removeEventListener("click", H), e.getElementById("toggle-pause-resume").addEventListener("click", A), e.getElementById("outklip-sandbox").addEventListener("click", R), e.getElementById("outklip-config-logo").src = chrome.extension.getURL("images/v11/logo.png"), e.getElementById("outklip-show-allurls-permission").addEventListener("click", J), e.getElementById("outklip-cancel-allurls-rationale").addEventListener("click", Z), e.getElementById("outklip-close-allurls-rationale-modal").addEventListener("click", Z), e.getElementById("show-more-options-button").addEventListener("click", W), e.getElementById("show-more-options-button-icon").addEventListener("click", W), chrome.storage.sync.get(["controlpanel", "avatarinplaceofcamera", "countdownTimerValueInSeconds", "useIframeForEmbeddedCamera"], function(t) {
            "true" == t.controlpanel ? $("#controlpanelswitch", e).prop("checked", !0) : $("#controlpanelswitch", e).prop("checked", !1), "true" == t.avatarinplaceofcamera ? $("#profilephotoswitch", e).prop("checked", !0) : $("#profilephotoswitch", e).prop("checked", !1), t.countdownTimerValueInSeconds.length < 2 ? $("#countdownwhitespaceprefix", e).html("&nbsp;") : $("#countdownwhitespaceprefix", e).html(""), $("#countdownvalue", e).html(t.countdownTimerValueInSeconds), "true" == t.useIframeForEmbeddedCamera ? $("#pictureinpictureswitch", e).prop("checked", !1) : $("#pictureinpictureswitch", e).prop("checked", !0)
        }), $("#micdeviceselect", e).on("change", Y), $("#cameradeviceselect", e).on("change", Q), e.getElementById("controlpanelswitch").addEventListener("click", G), e.getElementById("outklip-show-control-panel-label").addEventListener("click", G), e.getElementById("outklip-show-control-panel-icon").addEventListener("click", G), e.getElementById("profilephotoswitch").addEventListener("click", K), e.getElementById("outklip-show-profile-photo-label").addEventListener("click", K), e.getElementById("outklip-show-profile-photo-icon").addEventListener("click", K), e.getElementById("countdownvalueincrement").addEventListener("click", q), e.getElementById("countdownvaluedecrement").addEventListener("click", j), e.getElementById("pictureinpictureswitch").addEventListener("click", X), e.getElementById("outklip-show-picture-in-picture-icon").addEventListener("click", X), e.getElementById("outklip-show-picture-in-picture-label").addEventListener("click", X))
    }

    function q() {
        var e = u();
        if (e) {
            var t = parseInt($("#countdownvalue", e).html());
            isNaN(t) ? t = 3 : t >= 99 ? t = 99 : t += 1, chrome.storage.sync.set({
                countdownTimerValueInSeconds: t.toString()
            }), t < 10 ? $("#countdownwhitespaceprefix", e).html("&nbsp;") : $("#countdownwhitespaceprefix", e).html(""), $("#countdownvalue", e).html(t)
        }
    }

    function j() {
        var e = u();
        if (e) {
            var t = parseInt($("#countdownvalue", e).html());
            isNaN(t) ? t = 3 : t <= 0 ? t = 0 : t -= 1, chrome.storage.sync.set({
                countdownTimerValueInSeconds: t.toString()
            }), t < 10 ? $("#countdownwhitespaceprefix", e).html("&nbsp;") : $("#countdownwhitespaceprefix", e).html(""), $("#countdownvalue", e).html(t)
        }
    }

    function G() {
        var e = u();
        e && chrome.storage.sync.get(["controlpanel", "isMenuMinimized"], function(t) {
            "true" === t.controlpanel ? ($("#controlpanelswitch", e).prop("checked", !1), chrome.storage.sync.set({
                controlpanel: "false"
            }), e.getElementById("outklip-control-container").style.display = "none") : ($("#controlpanelswitch", e).prop("checked", !0), chrome.storage.sync.set({
                controlpanel: "true"
            }), e.getElementById("recording-time-indicator").style.display = "none", e.getElementById("finish-recording").style.display = "none", "true" == t.isMenuMinimized ? (e.getElementById("toggle-pause-resume").style.display = "none", e.getElementById("cancel-recording").style.display = "none", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-one-control", e.getElementById("outklip-toggle-menu").title = "Expand control panel") : (e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-three-controls", e.getElementById("toggle-menu").style.display = "block", e.getElementById("toggle-pause-resume").style.display = "block", e.getElementById("cancel-recording").style.display = "block", e.getElementById("outklip-toggle-menu").title = "Minimize control panel"))
        })
    }

    function K() {
        var e = u();
        e && chrome.storage.sync.get(["avatarinplaceofcamera", "cameraSize", "enableEmbeddedCamera"], function(t) {
            if ("true" == t.avatarinplaceofcamera) $("#profilephotoswitch", e).prop("checked", !1), chrome.storage.sync.set({
                avatarinplaceofcamera: "false"
            }), e.getElementById("outklip-profile-photo").style.display = "none";
            else {
                if ($("#profilephotoswitch", e).prop("checked", !0), chrome.storage.sync.set({
                        avatarinplaceofcamera: "true"
                    }), "true" == t.enableEmbeddedCamera) return;
                "Small" == t.cameraSize ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = "140px", e.getElementById("outklip-profile-photo").style.height = "140px") : "Medium" == t.cameraSize ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = "190px", e.getElementById("outklip-profile-photo").style.height = "190px") : "Large" == t.cameraSize && (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = "250px", e.getElementById("outklip-profile-photo").style.height = "250px"), e.getElementById("outklip-profile-photo").style.display = "inline-block", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover")
            }
        })
    }

    function J() {
        e.postMessage({
            askAllUrlsPermission: !0
        }), Z()
    }

    function Z() {
        var e = u();
        e && (e.getElementById("outklip-allurls-rationale-container").style.display = "none")
    }

    function X() {
        var e = u();
        e && chrome.storage.sync.get(["useIframeForEmbeddedCamera"], function(t) {
            "true" === t.useIframeForEmbeddedCamera ? ($("#pictureinpictureswitch", e).prop("checked", !0), chrome.storage.sync.set({
                useIframeForEmbeddedCamera: "false"
            })) : ($("#pictureinpictureswitch", e).prop("checked", !1), chrome.storage.sync.set({
                useIframeForEmbeddedCamera: "true"
            })), h()
        })
    }

    function Y() {
        var e = u();
        e && chrome.storage.sync.set({
            microphone: $("#micdeviceselect", e).val()
        })
    }

    function Q() {
        var e = u();
        e && (chrome.storage.sync.set({
            camera: $("#cameradeviceselect", e).val()
        }), chrome.storage.sync.set({
            cameralabel: $("#cameradeviceselect option:selected", e).text()
        }), h())
    }

    function ee() {
        var e = u();
        e && chrome.storage.sync.get(["isMenuMinimized", "controlpanel"], function(t) {
            "false" == t.controlpanel ? e.getElementById("outklip-control-container").style.display = "none" : (e.getElementById("toggle-menu").removeEventListener("click", ne), e.getElementById("toggle-menu").addEventListener("click", te), e.getElementById("recording-time-indicator").style.display = "none", e.getElementById("finish-recording").style.display = "none", "true" == t.isMenuMinimized ? (e.getElementById("toggle-pause-resume").style.display = "none", e.getElementById("cancel-recording").style.display = "none", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-one-control", e.getElementById("outklip-toggle-menu").title = "Expand control panel") : (e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-three-controls", e.getElementById("toggle-menu").style.display = "block", e.getElementById("toggle-pause-resume").style.display = "block", e.getElementById("cancel-recording").style.display = "block", e.getElementById("outklip-toggle-menu").title = "Minimize control panel"))
        })
    }

    function te() {
        var e = u();
        e && chrome.storage.sync.get("isMenuMinimized", function(t) {
            "true" == t.isMenuMinimized ? (chrome.storage.sync.set({
                isMenuMinimized: "false"
            }), e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-three-controls", e.getElementById("toggle-pause-resume").style.display = "block", e.getElementById("cancel-recording").style.display = "block", e.getElementById("outklip-toggle-menu").title = "Minimize control panel") : (chrome.storage.sync.set({
                isMenuMinimized: "true"
            }), e.getElementById("toggle-pause-resume").style.display = "none", e.getElementById("cancel-recording").style.display = "none", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-one-control", e.getElementById("outklip-toggle-menu").title = "Expand control panel")
        })
    }

    function ne() {
        var e = u();
        e && chrome.storage.sync.get("isMenuMinimized", function(t) {
            "true" == t.isMenuMinimized ? (chrome.storage.sync.set({
                isMenuMinimized: "false"
            }), e.getElementById("outklip-toggle-menu").title = "Expand control panel", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-five-controls", e.getElementById("finish-recording").style.display = "block", e.getElementById("cancel-recording").style.display = "block", e.getElementById("toggle-pause-resume").style.display = "block", e.getElementById("recording-blinker").style.display = "none", e.getElementById("recording-time-indicator-string").innerHTML = de(0), e.getElementById("recording-time-indicator").style.display = "block") : (chrome.storage.sync.set({
                isMenuMinimized: "true"
            }), e.getElementById("outklip-toggle-menu").title = "Minimize control panel", e.getElementById("toggle-pause-resume").style.display = "none", e.getElementById("cancel-recording").style.display = "none", e.getElementById("finish-recording").style.display = "none", e.getElementById("recording-time-indicator").style.display = "none", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-one-control")
        })
    }

    function oe() {
        var e = Math.floor(300 * c / 1e3);
        return c > 10 ? e : c <= 10 && c >= 8 ? 3 : c <= 7 && c >= 5 ? 2 : c <= 4 && c >= 2 ? 1 : 0
    }

    function ie() {
        var t = u();
        t && (1 == --c ? (t.getElementById("outklip-countdown-container").style.display = "none", r = setTimeout(ie, s)) : c > 0 ? (t.getElementById("outklip-countdown-timer").innerHTML = oe().toString(), r = setTimeout(ie, s)) : (t.getElementById("outklip-countdown-container").style.display = "none", clearTimeout(r), r = null, e.postMessage({
            startRecording: !0
        })))
    }

    function le() {
        var e = u();
        e && (r ? (clearTimeout(r), r = null, e.getElementById("outklip-countdown-pause-resume-button").innerText = "Resume countdown", e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]), e.getElementById("outklip-pause-resume-recording").title = "Resume recording") : (r = setTimeout(ie, s), e.getElementById("outklip-countdown-pause-resume-button").innerText = "Pause countdown", e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-play"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").title = "Pause recording"))
    }

    function ae() {
        var e = u();
        e && (chrome.storage.sync.get(["enableEmbeddedCamera", "useIframeForEmbeddedCamera", "cameraSize", "avatarinplaceofcamera", "enableCamera", "camera", "cameralabel"], function(n) {
            if ("true" == n.enableCamera) e.getElementById("outklip-camera-modal-content").style.display = "block", v(), (i = e.getElementById("getcameramodeiframe")) ? i.contentWindow.postMessage({
                type: "ENABLE_CAMERA",
                requesttype: "auto",
                cameradeviceid: n.camera,
                squareaspectratio: !1
            }, "*") : function(e) {
                var t = u();
                t && chrome.storage.sync.get(["camera"], function(n) {
                    var o = "chrome-extension://" + chrome.runtime.id;
                    if (!location.ancestorOrigins.contains(o)) {
                        var i = document.createElement("iframe");
                        i.id = "getcameramodeiframe", i.src = chrome.runtime.getURL("camerapermission/getcamera.html") + "?cameradeviceid=" + n.camera + "&squareaspectratio=false", i.style = "display:block;border:none;vertical-align:middle;width:100%;height:100%;", i.scrolling = "no", i.onload = e, i.allow = ["camera"], t.getElementById("outklip-camera-modal-content").appendChild(i)
                    }
                })
            }(y);
            else if ("true" == n.enableEmbeddedCamera)
                if (e.getElementById("outklip-webcam-video-container").style.display = "block", e.getElementById("outklip-profile-photo").style.display = "none", "true" == n.useIframeForEmbeddedCamera) {
                    var i, l = "250px",
                        r = "250px";
                    "Medium" == n.cameraSize ? (l = "190px", r = "190px") : "Small" == n.cameraSize && (l = "140px", r = "140px"), (i = e.getElementById("getcameraiframe")) ? (i.contentWindow.postMessage({
                        type: "ENABLE_CAMERA",
                        requesttype: "auto",
                        width: l,
                        height: r,
                        cameradeviceid: n.camera,
                        squareaspectratio: !0
                    }, "*"), i.style.width = l, i.style.height = r, e.getElementById("outklip-webcam-player").style.display = "inline-block", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover")) : I(y), e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-resize-icon").style.display = "inline-block", e.getElementById("outklip-webcam-change-filter").style.display = "inline-block", e.getElementById("outklip-open-picture-in-picture").style.display = "none", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "none", v()
                } else v(), navigator.mediaDevices.enumerateDevices().then(function(i) {
                    for (var l = null, a = 0; a < i.length; a++) "videoinput" === i[a].kind && i[a].label == n.cameralabel && (l = i[a].deviceId);
                    var r = {
                        video: {
                            aspectRatio: 1
                        }
                    };
                    l && (r.video.deviceId = l), navigator.mediaDevices.getUserMedia(r).then(function(n) {
                        o = n, e.getElementById("outklip-live-video-viewer-for-pip").srcObject = n, f(), e.getElementById("outklip-webcam-player").classList.remove(...t), e.getElementById("outklip-profile-photo").classList.remove(...t), e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-webcam-resize-icon").style.display = "none", e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-change-filter").style.display = "none", e.getElementById("outklip-open-picture-in-picture").style.display = "inline-block", e.getElementById("outklip-webcam-player").style.display = "inline-block", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "inline-block"
                    }).catch(function(t) {
                        console.log(t), chrome.storage.sync.set({
                            enableEmbeddedCamera: "false"
                        }), e.getElementById("outklip-webcam-player").style.display = "none"
                    })
                });
            else e.getElementById("outklip-webcam-player").style.display = "none", "true" == n.avatarinplaceofcamera ? (e.getElementById("outklip-profile-photo").src = a, e.getElementById("outklip-profile-photo").style.width = l, e.getElementById("outklip-profile-photo").style.height = r, e.getElementById("outklip-profile-photo").style.display = "inline-block", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-webcam-video-container").style.display = "block") : e.getElementById("outklip-profile-photo").style.display = "none"
        }), b())
    }

    function re() {
        var e = u();
        e && (function() {
            var e = u();
            e && chrome.storage.sync.get("isRecordingPausedOrNotStarted", function(t) {
                "true" == t.isRecordingPausedOrNotStarted ? (e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]), e.getElementById("outklip-pause-resume-recording").title = "Resume recording") : (e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-play"]), e.getElementById("outklip-pause-resume-recording").classList.add(["fa-pause"]), e.getElementById("outklip-pause-resume-recording").title = "Pause recording")
            })
        }(), e.getElementById("outklip-finish-recording").addEventListener("click", _), function() {
            var e = u();
            e && chrome.storage.sync.get(["isMenuMinimized", "controlpanel"], function(t) {
                "false" == t.controlpanel ? e.getElementById("outklip-control-container").style.display = "none" : "true" == t.isMenuMinimized ? (e.getElementById("outklip-toggle-menu").title = "Expand control panel", e.getElementById("toggle-menu").style.display = "block", e.getElementById("toggle-pause-resume").style.display = "none", e.getElementById("cancel-recording").style.display = "none", e.getElementById("finish-recording").style.display = "none", e.getElementById("recording-blinker").style.display = "none", e.getElementById("recording-time-indicator").style.display = "none", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-one-control") : (e.getElementById("outklip-toggle-menu").title = "Minimize control panel", e.getElementById("outklip-control-container").style.display = "grid", e.getElementById("outklip-control-container").className = "grid-of-five-controls", e.getElementById("toggle-menu").style.display = "block", e.getElementById("finish-recording").style.display = "block", e.getElementById("cancel-recording").style.display = "block", e.getElementById("toggle-pause-resume").style.display = "block", e.getElementById("recording-blinker").style.display = "none", e.getElementById("recording-time-indicator-string").innerHTML = de(0), e.getElementById("recording-time-indicator").style.display = "block")
            })
        }())
    }

    function ce() {
        var e = u();
        e && (e.getElementById("outklip-countdown-container").style.display = "block")
    }

    function se(e, t, n) {
        var o = u();
        if (o)
            if ("basic" == e || "basic5mins" == e) {
                var i = 10;
                switch (e) {
                    case "basic":
                        i = 10;
                        break;
                    case "basic5mins":
                        i = 5
                }
                if (o.getElementById("outklip-startrecording").innerText = n > 0 ? "Record" : `Record (up to ${i} mins)`, n > 3) o.getElementById("outklip-upgrade-cta-container").style.display = "none", o.getElementById("outklip-version-subtitle-container").style.display = "none";
                else if (n > 0) {
                    var l = "long videos";
                    1 == n && (l = "long video"), o.getElementById("outklip-upgrade-cta-string").innerHTML = `<p>${n} ${l} left. <a href='https://outklip.com/checkoutpayperuse' target="_blank">Get more</a>.</p>`, o.getElementById("outklip-upgrade-cta-container").style.display = "block", o.getElementById("outklip-version-subtitle-container").style.display = "none"
                } else o.getElementById("outklip-upgrade-cta-string").innerHTML = "<p>Longer video, no watermark and more? <a href='https://outklip.com/pricing' target=\"_blank\"> Upgrade</a>.</p>", o.getElementById("outklip-upgrade-cta-container").style.display = "block", o.getElementById("outklip-version-subtitle-container").style.display = "none"
            } else "limited" == e ? (o.getElementById("outklip-startrecording").innerText = "Record (up to 5 minutes)", o.getElementById("outklip-upgrade-cta-string").innerHTML = "<p> <a href='https://outklip.com/signup' target=\"_blank\">Register</a>&nbsp;for free video hosting and video editing.</p>", o.getElementById("outklip-upgrade-cta-container").style.display = "block") : "trial" == e ? (o.getElementById("outklip-startrecording").innerText = "Record", o.getElementById("outklip-version-subtitle-string").innerHTML = "Trial Version", o.getElementById("outklip-upgrade-cta-string").innerHTML = "<p>Trial ends in " + t + " days. <a href='https://outklip.com/pricing' target=\"_blank\">Upgrade to Pro.</a></p>", o.getElementById("outklip-version-subtitle-container").style.display = "block", o.getElementById("outklip-upgrade-cta-container").style.display = "block") : (o.getElementById("outklip-startrecording").innerText = "Record", o.getElementById("outklip-version-subtitle-container").style.display = "none", o.getElementById("outklip-upgrade-cta-container").style.display = "none")
    }

    function de(e) {
        var t = Math.floor(e / 3600),
            n = Math.floor((e - 3600 * t) / 60),
            o = e - 3600 * t - 60 * n,
            i = "";
        t > 0 ? i = t + ":" + (n < 10 ? "0" : "") + n + ":" + (o < 10 ? "0" : "") + o : i = n + ":" + (o < 10 ? "0" : "") + o;
        return i
    }

    function me(e) {
        var t = e ? e[0] : "a";
        t = t.toLowerCase();
        var n = 0;
        return /^[A-Za-z]*$/.test(t) && (n = Math.floor((t.charCodeAt(0) - 97) / 3)), chrome.extension.getURL("images/monograms/letter" + n + ".png")
    }

    function pe() {
        var e = document.getElementById("outklip-mic-setup-error");
        e && e.remove();
        var t = u();
        t && (t.getElementById("outklip-desktop-error").innerHTML = "", t.getElementById("outklip-tab-error").innerHTML = "", t.getElementById("outklip-camera-mode-error").innerHTML = "")
    }

    function ge(e, t) {
        var n = document.getElementById("outklip-root"),
            o = n ? n.shadowRoot : null,
            i = 0,
            l = 0,
            a = 0,
            r = 0;

        function c(e) {
            (e = e || window.event).preventDefault(), a = e.clientX, r = e.clientY, document.onmouseup = d, document.onmousemove = s
        }

        function s(t) {
            (t = t || window.event).preventDefault(), i = a - t.clientX, l = r - t.clientY, a = t.clientX, r = t.clientY, e.style.top = e.offsetTop - l + "px", e.style.left = e.offsetLeft - i + "px"
        }

        function d(e) {
            (e = e || window.event).preventDefault(), document.onmouseup = null, document.onmousemove = null
        }
        o.getElementById(t) ? o.getElementById(t).onmousedown = c : e.onmousedown = c
    }

    function ue(e) {
        var n = u();
        if (n) {
            var i, l, a;
            for (l = n.querySelectorAll(".tabcontent"), i = 0; i < l.length; i++) l[i].style.display = "none";
            for (a = n.querySelectorAll(".tablinks"), i = 0; i < a.length; i++) a[i].className = a[i].className.replace(" active", "");
            n.getElementById(e.target.tabId).style.display = "block", e.currentTarget.className += " active", "record-desktop" == e.target.tabId ? chrome.storage.sync.set({
                enableScreen: "true",
                enableCamera: "false",
                enableTabCaptureAPI: "false",
                recordingmode: "desktop"
            }) : "record-tab" == e.target.tabId ? (chrome.storage.sync.set({
                enableScreen: "true",
                enableCamera: "false",
                enableTabCaptureAPI: "true",
                recordingmode: "tab"
            }), chrome.storage.sync.get("enableTabAudio", function(e) {
                "true" == e.enableTabAudio ? $("#tabaudioswitch", n).prop("checked", !0) : $("#tabaudioswitch", n).prop("checked", !1)
            })) : "record-camera" == e.target.tabId && (chrome.storage.sync.set({
                enableScreen: "false",
                enableCamera: "true",
                enableTabCaptureAPI: "false",
                recordingmode: "camera"
            }), function() {
                var e = u();
                if (e) {
                    var n = e.getElementById("getcameraiframe");
                    chrome.storage.sync.get(["enableEmbeddedCamera", "useIframeForEmbeddedCamera", "cameraSize", "camera", "cameralabel"], function(i) {
                        if ("false" == i.enableEmbeddedCamera)
                            if ("true" == i.useIframeForEmbeddedCamera) {
                                var l = "250px",
                                    a = "250px";
                                "Medium" == i.cameraSize ? (l = "190px", a = "190px") : "Small" == i.cameraSize && (l = "140px", a = "140px"), e.getElementById("outklip-profile-photo").style.display = "none", chrome.storage.sync.set({
                                    enableEmbeddedCamera: "true"
                                }), i.cameraSize || chrome.storage.sync.set({
                                    cameraSize: "Large"
                                }), $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !0), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !0), n ? (n.contentWindow.postMessage({
                                    type: "ENABLE_CAMERA",
                                    requesttype: "user",
                                    width: l,
                                    height: a,
                                    cameradeviceid: i.camera,
                                    squareaspectratio: !0
                                }, "*"), n.style.width = l, n.style.height = a, e.getElementById("outklip-webcam-player").style.display = "inline-block") : I(y), e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-resize-icon").style.display = "inline-block", e.getElementById("outklip-webcam-change-filter").style.display = "inline-block", e.getElementById("outklip-open-picture-in-picture").style.display = "none", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "none", v()
                            } else v(), navigator.mediaDevices.enumerateDevices().then(function(n) {
                                for (var l = null, a = 0; a < n.length; a++) "videoinput" === n[a].kind && n[a].label == i.cameralabel && (l = n[a].deviceId);
                                var r = {
                                    video: {
                                        aspectRatio: 1
                                    }
                                };
                                l && (r.video.deviceId = l), navigator.mediaDevices.getUserMedia(r).then(function(n) {
                                    o = n, e.getElementById("outklip-live-video-viewer-for-pip").srcObject = n, chrome.storage.sync.set({
                                        enableEmbeddedCamera: "true"
                                    }), $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !0), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !0), f(), e.getElementById("outklip-webcam-player").classList.remove(...t), e.getElementById("outklip-profile-photo").classList.remove(...t), e.getElementById("outklip-profile-photo").style.display = "none", e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"), e.getElementById("outklip-webcam-resize-icon").style.display = "none", e.getElementById("outklip-change-avatar-icon").style.display = "none", e.getElementById("outklip-webcam-change-filter").style.display = "none", e.getElementById("outklip-open-picture-in-picture").style.display = "inline-block", e.getElementById("outklip-webcam-player").style.display = "inline-block", e.getElementById("outklip-live-video-viewer-for-pip").style.display = "inline-block"
                                }).catch(function(t) {
                                    console.log(t), chrome.storage.sync.set({
                                        enableEmbeddedCamera: "false"
                                    }), e.getElementById("outklip-webcam-player").style.display = "none", $("#cameraswitch", e) && $("#cameraswitch", e).prop("checked", !1), $("#tabcameraswitch", e) && $("#tabcameraswitch", e).prop("checked", !1)
                                })
                            })
                    })
                }
            }())
        }
    }

    function ye() {
        var e = u();
        e && (e.getElementById("desktop-button").addEventListener("click", ue), e.getElementById("desktop-button").tabId = "record-desktop", e.getElementById("tab-button").addEventListener("click", ue), e.getElementById("tab-button").tabId = "record-tab", e.getElementById("cameramode-button").addEventListener("click", ue), e.getElementById("cameramode-button").tabId = "record-camera", chrome.storage.sync.get("recordingmode", function(t) {
            "camera" == t.recordingmode ? e.getElementById("cameramode-button").click() : "tab" == t.recordingmode ? e.getElementById("tab-button").click() : e.getElementById("desktop-button").click()
        }))
    }

    function he() {
        for (var e = 0; e < p.length && -1 == window.location.hostname.indexOf(p[e]); e++);
        if (e != p.length) {
            for (var t = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, function(e) {
                    return "a" == e.tagName.toLowerCase() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                }, !0), n = []; t.nextNode();) 0 == t.currentNode.href.indexOf("https://outklip.com/v/") && n.push(t.currentNode);
            for (var o = 0; o < n.length; o++) {
                var i = n[o].href.split("/").pop(),
                    l = document.createElement("iframe");
                l.width = 560, l.height = 315, l.src = "https://outklip.com/embed/" + i, l.setAttribute("frameborder", "0"), l.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"), l.setAttribute("scrolling", "no"), l.setAttribute("allowFullScreen", ""), n[o].parentNode.replaceChild(l, n[o])
            }
        }
    }

    function Ee() {
        setTimeout(he, 2e3)
    }
}();