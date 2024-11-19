// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/lbcabedlbpobhpongobnfkbfceedgdjk/build/background/background.min.js
function ConcatenateBlobs(e, t, r) {
    var n = [],
        i = 0;
    ! function o() {
        if (!e[i]) return function() {
            var e = 0;
            n.forEach(function(t) {
                e += t.byteLength
            });
            var i = new Uint8Array(e),
                o = 0;
            n.forEach(function(e) {
                var t = e.byteLength;
                i.set(new Uint8Array(e), o), o += t
            });
            var a = new Blob([i.buffer], {
                type: t
            });
            r(a)
        }();
        var a = new FileReader;
        a.onload = function(e) {
            n.push(e.target.result), i++, o()
        }, a.readAsArrayBuffer(e[i])
    }()
}

function setVODRecordingBadgeText(e, t) {
    chrome.pageAction.setTitle({
        title: t && t.length ? t + " duration" : "Record Screen"
    })
}

function msToTime(e) {
    function t(e) {
        return (e < 10 ? "0" : "") + e
    }
    var r = e % 1e3,
        n = (e = (e - r) / 1e3) % 60,
        i = (e = (e - n) / 60) % 60;
    return t((e - i) / 60) + ":" + t(i) + ":" + t(n) + "." + r
}

function convertTime(e) {
    var t = Math.floor(e / 1e3),
        r = Math.floor(t / 60),
        n = t - 60 * r;
    return (r += "").length, 1 === (n += "").length && (n = "0" + n), r + ":" + n
}

function setBadgeText(e) {
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#da3535"
    }), chrome.browserAction.setBadgeText({
        text: e + ""
    })
}

function setRecordingInProgressIcon() {
    if (isRecording) return chrome.browserAction.setIcon({
        path: "images/screen-recording-32.png"
    }), void setTimeout(setRecordingInProgressIcon, 800);
    chrome.browserAction.setIcon({
        path: "images/main-icon-32.png"
    })
}
var recorder;
_xamzrequire = function() {
    return function e(t, r, n) {
        function i(a, s) {
            if (!r[a]) {
                if (!t[a]) {
                    var u = "function" == typeof require && require;
                    if (!s && u) return u(a, !0);
                    if (o) return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var l = r[a] = {
                    exports: {}
                };
                t[a][0].call(l.exports, function(e) {
                    return i(t[a][1][e] || e)
                }, l, l.exports, e, t, r, n)
            }
            return r[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < n.length; a++) i(n[a]);
        return i
    }
}()({
    38: [function(e, t, r) {
        var n = {
            util: e("./util")
        };
        ({}).toString(), t.exports = n, n.util.update(n, {
            VERSION: "2.517.0",
            Signers: {},
            Protocol: {
                Json: e("./protocol/json"),
                Query: e("./protocol/query"),
                Rest: e("./protocol/rest"),
                RestJson: e("./protocol/rest_json"),
                RestXml: e("./protocol/rest_xml")
            },
            XML: {
                Builder: e("./xml/builder"),
                Parser: null
            },
            JSON: {
                Builder: e("./json/builder"),
                Parser: e("./json/parser")
            },
            Model: {
                Api: e("./model/api"),
                Operation: e("./model/operation"),
                Shape: e("./model/shape"),
                Paginator: e("./model/paginator"),
                ResourceWaiter: e("./model/resource_waiter")
            },
            apiLoader: e("./api_loader"),
            EndpointCache: e("../vendor/endpoint-cache").EndpointCache
        }), e("./sequential_executor"), e("./service"), e("./config"), e("./http"), e("./event_listeners"), e("./request"), e("./response"), e("./resource_waiter"), e("./signers/request_signer"), e("./param_validator"), n.events = new n.SequentialExecutor, n.util.memoizedProperty(n, "endpointCache", function() {
            return new n.EndpointCache(n.config.endpointCacheSize)
        }, !0)
    }, {
        "../vendor/endpoint-cache": 123,
        "./api_loader": 27,
        "./config": 37,
        "./event_listeners": 59,
        "./http": 60,
        "./json/builder": 62,
        "./json/parser": 63,
        "./model/api": 64,
        "./model/operation": 66,
        "./model/paginator": 67,
        "./model/resource_waiter": 68,
        "./model/shape": 69,
        "./param_validator": 70,
        "./protocol/json": 73,
        "./protocol/query": 74,
        "./protocol/rest": 75,
        "./protocol/rest_json": 76,
        "./protocol/rest_xml": 77,
        "./request": 83,
        "./resource_waiter": 84,
        "./response": 85,
        "./sequential_executor": 87,
        "./service": 88,
        "./signers/request_signer": 108,
        "./util": 116,
        "./xml/builder": 118
    }],
    123: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var n = e("./utils/LRU"),
            i = 1e3,
            o = function() {
                function e(e) {
                    void 0 === e && (e = i), this.maxSize = e, this.cache = new n.LRUCache(e)
                }
                return Object.defineProperty(e.prototype, "size", {
                    get: function() {
                        return this.cache.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.put = function(t, r) {
                    var n = "string" != typeof t ? e.getKeyString(t) : t,
                        i = this.populateValue(r);
                    this.cache.put(n, i)
                }, e.prototype.get = function(t) {
                    var r = "string" != typeof t ? e.getKeyString(t) : t,
                        n = Date.now(),
                        i = this.cache.get(r);
                    if (i)
                        for (var o = 0; o < i.length; o++) {
                            if (i[o].Expire < n) return void this.cache.remove(r)
                        }
                    return i
                }, e.getKeyString = function(e) {
                    for (var t = [], r = Object.keys(e).sort(), n = 0; n < r.length; n++) {
                        var i = r[n];
                        void 0 !== e[i] && t.push(e[i])
                    }
                    return t.join(" ")
                }, e.prototype.populateValue = function(e) {
                    var t = Date.now();
                    return e.map(function(e) {
                        return {
                            Address: e.Address || "",
                            Expire: t + 60 * (e.CachePeriodInMinutes || 1) * 1e3
                        }
                    })
                }, e.prototype.empty = function() {
                    this.cache.empty()
                }, e.prototype.remove = function(t) {
                    var r = "string" != typeof t ? e.getKeyString(t) : t;
                    this.cache.remove(r)
                }, e
            }();
        r.EndpointCache = o
    }, {
        "./utils/LRU": 124
    }],
    124: [function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var n = function() {
                return function(e, t) {
                    this.key = e, this.value = t
                }
            }(),
            i = function() {
                function e(e) {
                    if (this.nodeMap = {}, this.size = 0, "number" != typeof e || e < 1) throw new Error("Cache size can only be positive number");
                    this.sizeLimit = e
                }
                return Object.defineProperty(e.prototype, "length", {
                    get: function() {
                        return this.size
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.prependToList = function(e) {
                    this.headerNode ? (this.headerNode.prev = e, e.next = this.headerNode) : this.tailNode = e, this.headerNode = e, this.size++
                }, e.prototype.removeFromTail = function() {
                    if (this.tailNode) {
                        var e = this.tailNode,
                            t = e.prev;
                        return t && (t.next = void 0), e.prev = void 0, this.tailNode = t, this.size--, e
                    }
                }, e.prototype.detachFromList = function(e) {
                    this.headerNode === e && (this.headerNode = e.next), this.tailNode === e && (this.tailNode = e.prev), e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.next = void 0, e.prev = void 0, this.size--
                }, e.prototype.get = function(e) {
                    if (this.nodeMap[e]) {
                        var t = this.nodeMap[e];
                        return this.detachFromList(t), this.prependToList(t), t.value
                    }
                }, e.prototype.remove = function(e) {
                    if (this.nodeMap[e]) {
                        var t = this.nodeMap[e];
                        this.detachFromList(t), delete this.nodeMap[e]
                    }
                }, e.prototype.put = function(e, t) {
                    if (this.nodeMap[e]) this.remove(e);
                    else if (this.size === this.sizeLimit) {
                        var r = this.removeFromTail().key;
                        delete this.nodeMap[r]
                    }
                    var i = new n(e, t);
                    this.nodeMap[e] = i, this.prependToList(i)
                }, e.prototype.empty = function() {
                    for (var e = Object.keys(this.nodeMap), t = 0; t < e.length; t++) {
                        var r = e[t],
                            n = this.nodeMap[r];
                        this.detachFromList(n), delete this.nodeMap[r]
                    }
                }, e
            }();
        r.LRUCache = i
    }, {}],
    118: [function(e, t, r) {
        function n() {}

        function i(e, t, r) {
            switch (r.type) {
                case "structure":
                    return function(e, t, r) {
                        a.arrayEach(r.memberNames, function(n) {
                            var a = r.members[n];
                            if ("body" === a.location) {
                                var u = t[n],
                                    c = a.name;
                                if (void 0 !== u && null !== u)
                                    if (a.isXmlAttribute) e.addAttribute(c, u);
                                    else if (a.flattened) i(e, u, a);
                                else {
                                    var l = new s(c);
                                    e.addChildNode(l), o(l, a), i(l, u, a)
                                }
                            }
                        })
                    }(e, t, r);
                case "map":
                    return function(e, t, r) {
                        var n = r.key.name || "key",
                            o = r.value.name || "value";
                        a.each(t, function(t, a) {
                            var u = new s(r.flattened ? r.name : "entry");
                            e.addChildNode(u);
                            var c = new s(n),
                                l = new s(o);
                            u.addChildNode(c), u.addChildNode(l), i(c, t, r.key), i(l, a, r.value)
                        })
                    }(e, t, r);
                case "list":
                    return function(e, t, r) {
                        r.flattened ? a.arrayEach(t, function(t) {
                            var n = r.member.name || r.name,
                                o = new s(n);
                            e.addChildNode(o), i(o, t, r.member)
                        }) : a.arrayEach(t, function(t) {
                            var n = r.member.name || "member",
                                o = new s(n);
                            e.addChildNode(o), i(o, t, r.member)
                        })
                    }(e, t, r);
                default:
                    return function(e, t, r) {
                        e.addChildNode(new u(r.toWireFormat(t)))
                    }(e, t, r)
            }
        }

        function o(e, t, r) {
            var n, i = "xmlns";
            t.xmlNamespaceUri ? (n = t.xmlNamespaceUri, t.xmlNamespacePrefix && (i += ":" + t.xmlNamespacePrefix)) : r && t.api.xmlNamespaceUri && (n = t.api.xmlNamespaceUri), n && e.addAttribute(i, n)
        }
        var a = e("../util"),
            s = e("./xml-node").XmlNode,
            u = e("./xml-text").XmlText;
        n.prototype.toXML = function(e, t, r, n) {
            var a = new s(r);
            return o(a, t, !0), i(a, e, t), a.children.length > 0 || n ? a.toString() : ""
        }, t.exports = n
    }, {
        "../util": 116,
        "./xml-node": 121,
        "./xml-text": 122
    }],
    122: [function(e, t, r) {
        function n(e) {
            this.value = e
        }
        var i = e("./escape-element").escapeElement;
        n.prototype.toString = function() {
            return i("" + this.value)
        }, t.exports = {
            XmlText: n
        }
    }, {
        "./escape-element": 120
    }],
    120: [function(e, t, r) {
        t.exports = {
            escapeElement: function(e) {
                return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
        }
    }, {}],
    121: [function(e, t, r) {
        function n(e, t) {
            void 0 === t && (t = []), this.name = e, this.children = t, this.attributes = {}
        }
        var i = e("./escape-attribute").escapeAttribute;
        n.prototype.addAttribute = function(e, t) {
            return this.attributes[e] = t, this
        }, n.prototype.addChildNode = function(e) {
            return this.children.push(e), this
        }, n.prototype.removeAttribute = function(e) {
            return delete this.attributes[e], this
        }, n.prototype.toString = function() {
            for (var e = Boolean(this.children.length), t = "<" + this.name, r = this.attributes, n = 0, o = Object.keys(r); n < o.length; n++) {
                var a = o[n],
                    s = r[a];
                void 0 !== s && null !== s && (t += " " + a + '="' + i("" + s) + '"')
            }
            return t + (e ? ">" + this.children.map(function(e) {
                return e.toString()
            }).join("") + "</" + this.name + ">" : "/>")
        }, t.exports = {
            XmlNode: n
        }
    }, {
        "./escape-attribute": 119
    }],
    119: [function(e, t, r) {
        t.exports = {
            escapeAttribute: function(e) {
                return e.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            }
        }
    }, {}],
    108: [function(e, t, r) {
        var n = e("../core"),
            i = n.util.inherit;
        n.Signers.RequestSigner = i({
            constructor: function(e) {
                this.request = e
            },
            setServiceClientId: function(e) {
                this.serviceClientId = e
            },
            getServiceClientId: function() {
                return this.serviceClientId
            }
        }), n.Signers.RequestSigner.getVersion = function(e) {
            switch (e) {
                case "v2":
                    return n.Signers.V2;
                case "v3":
                    return n.Signers.V3;
                case "s3v4":
                case "v4":
                    return n.Signers.V4;
                case "s3":
                    return n.Signers.S3;
                case "v3https":
                    return n.Signers.V3Https
            }
            throw new Error("Unknown signing version " + e)
        }, e("./v2"), e("./v3"), e("./v3https"), e("./v4"), e("./s3"), e("./presign")
    }, {
        "../core": 38,
        "./presign": 107,
        "./s3": 109,
        "./v2": 110,
        "./v3": 111,
        "./v3https": 112,
        "./v4": 113
    }],
    113: [function(e, t, r) {
        var n = e("../core"),
            i = e("./v4_credentials"),
            o = n.util.inherit;
        n.Signers.V4 = o(n.Signers.RequestSigner, {
            constructor: function(e, t, r) {
                n.Signers.RequestSigner.call(this, e), this.serviceName = t, r = r || {}, this.signatureCache = "boolean" != typeof r.signatureCache || r.signatureCache, this.operation = r.operation, this.signatureVersion = r.signatureVersion
            },
            algorithm: "AWS4-HMAC-SHA256",
            addAuthorization: function(e, t) {
                var r = n.util.date.iso8601(t).replace(/[:\-]|\.\d{3}/g, "");
                this.isPresigned() ? this.updateForPresigned(e, r) : this.addHeaders(e, r), this.request.headers.Authorization = this.authorization(e, r)
            },
            addHeaders: function(e, t) {
                this.request.headers["X-Amz-Date"] = t, e.sessionToken && (this.request.headers["x-amz-security-token"] = e.sessionToken)
            },
            updateForPresigned: function(e, t) {
                var r = this.credentialString(t),
                    i = {
                        "X-Amz-Date": t,
                        "X-Amz-Algorithm": this.algorithm,
                        "X-Amz-Credential": e.accessKeyId + "/" + r,
                        "X-Amz-Expires": this.request.headers["presigned-expires"],
                        "X-Amz-SignedHeaders": this.signedHeaders()
                    };
                e.sessionToken && (i["X-Amz-Security-Token"] = e.sessionToken), this.request.headers["Content-Type"] && (i["Content-Type"] = this.request.headers["Content-Type"]), this.request.headers["Content-MD5"] && (i["Content-MD5"] = this.request.headers["Content-MD5"]), this.request.headers["Cache-Control"] && (i["Cache-Control"] = this.request.headers["Cache-Control"]), n.util.each.call(this, this.request.headers, function(e, t) {
                    if ("presigned-expires" !== e && this.isSignableHeader(e)) {
                        var r = e.toLowerCase();
                        0 === r.indexOf("x-amz-meta-") ? i[r] = t : 0 === r.indexOf("x-amz-") && (i[e] = t)
                    }
                });
                var o = this.request.path.indexOf("?") >= 0 ? "&" : "?";
                this.request.path += o + n.util.queryParamsToString(i)
            },
            authorization: function(e, t) {
                var r = [],
                    n = this.credentialString(t);
                return r.push(this.algorithm + " Credential=" + e.accessKeyId + "/" + n), r.push("SignedHeaders=" + this.signedHeaders()), r.push("Signature=" + this.signature(e, t)), r.join(", ")
            },
            signature: function(e, t) {
                var r = i.getSigningKey(e, t.substr(0, 8), this.request.region, this.serviceName, this.signatureCache);
                return n.util.crypto.hmac(r, this.stringToSign(t), "hex")
            },
            stringToSign: function(e) {
                var t = [];
                return t.push("AWS4-HMAC-SHA256"), t.push(e), t.push(this.credentialString(e)), t.push(this.hexEncodedHash(this.canonicalString())), t.join("\n")
            },
            canonicalString: function() {
                var e = [],
                    t = this.request.pathname();
                return "s3" !== this.serviceName && "s3v4" !== this.signatureVersion && (t = n.util.uriEscapePath(t)), e.push(this.request.method), e.push(t), e.push(this.request.search()), e.push(this.canonicalHeaders() + "\n"), e.push(this.signedHeaders()), e.push(this.hexEncodedBodyHash()), e.join("\n")
            },
            canonicalHeaders: function() {
                var e = [];
                n.util.each.call(this, this.request.headers, function(t, r) {
                    e.push([t, r])
                }), e.sort(function(e, t) {
                    return e[0].toLowerCase() < t[0].toLowerCase() ? -1 : 1
                });
                var t = [];
                return n.util.arrayEach.call(this, e, function(e) {
                    var r = e[0].toLowerCase();
                    if (this.isSignableHeader(r)) {
                        var i = e[1];
                        if (void 0 === i || null === i || "function" != typeof i.toString) throw n.util.error(new Error("Header " + r + " contains invalid value"), {
                            code: "InvalidHeader"
                        });
                        t.push(r + ":" + this.canonicalHeaderValues(i.toString()))
                    }
                }), t.join("\n")
            },
            canonicalHeaderValues: function(e) {
                return e.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "")
            },
            signedHeaders: function() {
                var e = [];
                return n.util.each.call(this, this.request.headers, function(t) {
                    t = t.toLowerCase(), this.isSignableHeader(t) && e.push(t)
                }), e.sort().join(";")
            },
            credentialString: function(e) {
                return i.createScope(e.substr(0, 8), this.request.region, this.serviceName)
            },
            hexEncodedHash: function(e) {
                return n.util.crypto.sha256(e, "hex")
            },
            hexEncodedBodyHash: function() {
                var e = this.request;
                return this.isPresigned() && "s3" === this.serviceName && !e.body ? "UNSIGNED-PAYLOAD" : e.headers["X-Amz-Content-Sha256"] ? e.headers["X-Amz-Content-Sha256"] : this.hexEncodedHash(this.request.body || "")
            },
            unsignableHeaders: ["authorization", "content-type", "content-length", "user-agent", "presigned-expires", "expect", "x-amzn-trace-id"],
            isSignableHeader: function(e) {
                return 0 === e.toLowerCase().indexOf("x-amz-") || this.unsignableHeaders.indexOf(e) < 0
            },
            isPresigned: function() {
                return !!this.request.headers["presigned-expires"]
            }
        }), t.exports = n.Signers.V4
    }, {
        "../core": 38,
        "./v4_credentials": 114
    }],
    114: [function(e, t, r) {
        var n = e("../core"),
            i = {},
            o = [];
        t.exports = {
            createScope: function(e, t, r) {
                return [e.substr(0, 8), t, r, "aws4_request"].join("/")
            },
            getSigningKey: function(e, t, r, a, s) {
                var u = [n.util.crypto.hmac(e.secretAccessKey, e.accessKeyId, "base64"), t, r, a].join("_");
                if ((s = !1 !== s) && u in i) return i[u];
                var c = n.util.crypto.hmac("AWS4" + e.secretAccessKey, t, "buffer"),
                    l = n.util.crypto.hmac(c, r, "buffer"),
                    d = n.util.crypto.hmac(l, a, "buffer"),
                    p = n.util.crypto.hmac(d, "aws4_request", "buffer");
                return s && (i[u] = p, o.push(u), o.length > 50 && delete i[o.shift()]), p
            },
            emptyCache: function() {
                i = {}, o = []
            }
        }
    }, {
        "../core": 38
    }],
    112: [function(e, t, r) {
        var n = e("../core"),
            i = n.util.inherit;
        e("./v3"), n.Signers.V3Https = i(n.Signers.V3, {
            authorization: function(e) {
                return "AWS3-HTTPS AWSAccessKeyId=" + e.accessKeyId + ",Algorithm=HmacSHA256,Signature=" + this.signature(e)
            },
            stringToSign: function() {
                return this.request.headers["X-Amz-Date"]
            }
        }), t.exports = n.Signers.V3Https
    }, {
        "../core": 38,
        "./v3": 111
    }],
    111: [function(e, t, r) {
        var n = e("../core"),
            i = n.util.inherit;
        n.Signers.V3 = i(n.Signers.RequestSigner, {
            addAuthorization: function(e, t) {
                var r = n.util.date.rfc822(t);
                this.request.headers["X-Amz-Date"] = r, e.sessionToken && (this.request.headers["x-amz-security-token"] = e.sessionToken), this.request.headers["X-Amzn-Authorization"] = this.authorization(e, r)
            },
            authorization: function(e) {
                return "AWS3 AWSAccessKeyId=" + e.accessKeyId + ",Algorithm=HmacSHA256,SignedHeaders=" + this.signedHeaders() + ",Signature=" + this.signature(e)
            },
            signedHeaders: function() {
                var e = [];
                return n.util.arrayEach(this.headersToSign(), function(t) {
                    e.push(t.toLowerCase())
                }), e.sort().join(";")
            },
            canonicalHeaders: function() {
                var e = this.request.headers,
                    t = [];
                return n.util.arrayEach(this.headersToSign(), function(r) {
                    t.push(r.toLowerCase().trim() + ":" + String(e[r]).trim())
                }), t.sort().join("\n") + "\n"
            },
            headersToSign: function() {
                var e = [];
                return n.util.each(this.request.headers, function(t) {
                    ("Host" === t || "Content-Encoding" === t || t.match(/^X-Amz/i)) && e.push(t)
                }), e
            },
            signature: function(e) {
                return n.util.crypto.hmac(e.secretAccessKey, this.stringToSign(), "base64")
            },
            stringToSign: function() {
                var e = [];
                return e.push(this.request.method), e.push("/"), e.push(""), e.push(this.canonicalHeaders()), e.push(this.request.body), n.util.crypto.sha256(e.join("\n"))
            }
        }), t.exports = n.Signers.V3
    }, {
        "../core": 38
    }],
    110: [function(e, t, r) {
        var n = e("../core"),
            i = n.util.inherit;
        n.Signers.V2 = i(n.Signers.RequestSigner, {
            addAuthorization: function(e, t) {
                t || (t = n.util.date.getDate());
                var r = this.request;
                r.params.Timestamp = n.util.date.iso8601(t), r.params.SignatureVersion = "2", r.params.SignatureMethod = "HmacSHA256", r.params.AWSAccessKeyId = e.accessKeyId, e.sessionToken && (r.params.SecurityToken = e.sessionToken), delete r.params.Signature, r.params.Signature = this.signature(e), r.body = n.util.queryParamsToString(r.params), r.headers["Content-Length"] = r.body.length
            },
            signature: function(e) {
                return n.util.crypto.hmac(e.secretAccessKey, this.stringToSign(), "base64")
            },
            stringToSign: function() {
                var e = [];
                return e.push(this.request.method), e.push(this.request.endpoint.host.toLowerCase()), e.push(this.request.pathname()), e.push(n.util.queryParamsToString(this.request.params)), e.join("\n")
            }
        }), t.exports = n.Signers.V2
    }, {
        "../core": 38
    }],
    109: [function(e, t, r) {
        var n = e("../core"),
            i = n.util.inherit;
        n.Signers.S3 = i(n.Signers.RequestSigner, {
            subResources: {
                acl: 1,
                accelerate: 1,
                analytics: 1,
                cors: 1,
                lifecycle: 1,
                delete: 1,
                inventory: 1,
                location: 1,
                logging: 1,
                metrics: 1,
                notification: 1,
                partNumber: 1,
                policy: 1,
                requestPayment: 1,
                replication: 1,
                restore: 1,
                tagging: 1,
                torrent: 1,
                uploadId: 1,
                uploads: 1,
                versionId: 1,
                versioning: 1,
                versions: 1,
                website: 1
            },
            responseHeaders: {
                "response-content-type": 1,
                "response-content-language": 1,
                "response-expires": 1,
                "response-cache-control": 1,
                "response-content-disposition": 1,
                "response-content-encoding": 1
            },
            addAuthorization: function(e, t) {
                this.request.headers["presigned-expires"] || (this.request.headers["X-Amz-Date"] = n.util.date.rfc822(t)), e.sessionToken && (this.request.headers["x-amz-security-token"] = e.sessionToken);
                var r = this.sign(e.secretAccessKey, this.stringToSign()),
                    i = "AWS " + e.accessKeyId + ":" + r;
                this.request.headers.Authorization = i
            },
            stringToSign: function() {
                var e = this.request,
                    t = [];
                t.push(e.method), t.push(e.headers["Content-MD5"] || ""), t.push(e.headers["Content-Type"] || ""), t.push(e.headers["presigned-expires"] || "");
                var r = this.canonicalizedAmzHeaders();
                return r && t.push(r), t.push(this.canonicalizedResource()), t.join("\n")
            },
            canonicalizedAmzHeaders: function() {
                var e = [];
                n.util.each(this.request.headers, function(t) {
                    t.match(/^x-amz-/i) && e.push(t)
                }), e.sort(function(e, t) {
                    return e.toLowerCase() < t.toLowerCase() ? -1 : 1
                });
                var t = [];
                return n.util.arrayEach.call(this, e, function(e) {
                    t.push(e.toLowerCase() + ":" + String(this.request.headers[e]))
                }), t.join("\n")
            },
            canonicalizedResource: function() {
                var e = this.request,
                    t = e.path.split("?"),
                    r = t[0],
                    i = t[1],
                    o = "";
                if (e.virtualHostedBucket && (o += "/" + e.virtualHostedBucket), o += r, i) {
                    var a = [];
                    n.util.arrayEach.call(this, i.split("&"), function(e) {
                        var t = e.split("=")[0],
                            r = e.split("=")[1];
                        if (this.subResources[t] || this.responseHeaders[t]) {
                            var n = {
                                name: t
                            };
                            void 0 !== r && (this.subResources[t] ? n.value = r : n.value = decodeURIComponent(r)), a.push(n)
                        }
                    }), a.sort(function(e, t) {
                        return e.name < t.name ? -1 : 1
                    }), a.length && (i = [], n.util.arrayEach(a, function(e) {
                        void 0 === e.value ? i.push(e.name) : i.push(e.name + "=" + e.value)
                    }), o += "?" + i.join("&"))
                }
                return o
            },
            sign: function(e, t) {
                return n.util.crypto.hmac(e, t, "base64", "sha1")
            }
        }), t.exports = n.Signers.S3
    }, {
        "../core": 38
    }],
    107: [function(e, t, r) {
        function n(e) {
            var t = e.httpRequest.headers[s],
                r = e.service.getSignerClass(e);
            if (delete e.httpRequest.headers["User-Agent"], delete e.httpRequest.headers["X-Amz-User-Agent"], r === o.Signers.V4) {
                if (t > 604800) throw o.util.error(new Error, {
                    code: "InvalidExpiryTime",
                    message: "Presigning does not support expiry time greater than a week with SigV4 signing.",
                    retryable: !1
                });
                e.httpRequest.headers[s] = t
            } else {
                if (r !== o.Signers.S3) throw o.util.error(new Error, {
                    message: "Presigning only supports S3 or SigV4 signing.",
                    code: "UnsupportedSigner",
                    retryable: !1
                });
                var n = e.service ? e.service.getSkewCorrectedDate() : o.util.date.getDate();
                e.httpRequest.headers[s] = parseInt(o.util.date.unixTimestamp(n) + t, 10).toString()
            }
        }

        function i(e) {
            var t = e.httpRequest.endpoint,
                r = o.util.urlParse(e.httpRequest.path),
                n = {};
            r.search && (n = o.util.queryStringParse(r.search.substr(1)));
            var i = e.httpRequest.headers.Authorization.split(" ");
            if ("AWS" === i[0]) i = i[1].split(":"), n.AWSAccessKeyId = i[0], n.Signature = i[1], o.util.each(e.httpRequest.headers, function(e, t) {
                e === s && (e = "Expires"), 0 === e.indexOf("x-amz-meta-") && (delete n[e], e = e.toLowerCase()), n[e] = t
            }), delete e.httpRequest.headers[s], delete n.Authorization, delete n.Host;
            else if ("AWS4-HMAC-SHA256" === i[0]) {
                i.shift();
                var a = i.join(" ").match(/Signature=(.*?)(?:,|\s|\r?\n|$)/)[1];
                n["X-Amz-Signature"] = a, delete n.Expires
            }
            t.pathname = r.pathname, t.search = o.util.queryParamsToString(n)
        }
        var o = e("../core"),
            a = o.util.inherit,
            s = "presigned-expires";
        o.Signers.Presign = a({
            sign: function(e, t, r) {
                if (e.httpRequest.headers[s] = t || 3600, e.on("build", n), e.on("sign", i), e.removeListener("afterBuild", o.EventListeners.Core.SET_CONTENT_LENGTH), e.removeListener("afterBuild", o.EventListeners.Core.COMPUTE_SHA256), e.emit("beforePresign", [e]), !r) {
                    if (e.build(), e.response.error) throw e.response.error;
                    return o.util.urlFormat(e.httpRequest.endpoint)
                }
                e.build(function() {
                    this.response.error ? r(this.response.error) : r(null, o.util.urlFormat(e.httpRequest.endpoint))
                })
            }
        }), t.exports = o.Signers.Presign
    }, {
        "../core": 38
    }],
    88: [function(e, t, r) {
        (function(r) {
            var n = e("./core"),
                i = e("./model/api"),
                o = e("./region_config"),
                a = n.util.inherit,
                s = 0;
            n.Service = a({
                constructor: function(e) {
                    if (!this.loadServiceClass) throw n.util.error(new Error, "Service must be constructed with `new' operator");
                    var t = this.loadServiceClass(e || {});
                    if (t) {
                        var r = n.util.copy(e),
                            i = new t(e);
                        return Object.defineProperty(i, "_originalConfig", {
                            get: function() {
                                return r
                            },
                            enumerable: !1,
                            configurable: !0
                        }), i._clientId = ++s, i
                    }
                    this.initialize(e)
                },
                initialize: function(e) {
                    var t = n.config[this.serviceIdentifier];
                    if (this.config = new n.Config(n.config), t && this.config.update(t, !0), e && this.config.update(e, !0), this.validateService(), this.config.endpoint || o(this), this.config.endpoint = this.endpointFromTemplate(this.config.endpoint), this.setEndpoint(this.config.endpoint), n.SequentialExecutor.call(this), n.Service.addDefaultMonitoringListeners(this), (this.config.clientSideMonitoring || n.Service._clientSideMonitoring) && this.publisher) {
                        var i = this.publisher;
                        this.addNamedListener("PUBLISH_API_CALL", "apiCall", function(e) {
                            r.nextTick(function() {
                                i.eventHandler(e)
                            })
                        }), this.addNamedListener("PUBLISH_API_ATTEMPT", "apiCallAttempt", function(e) {
                            r.nextTick(function() {
                                i.eventHandler(e)
                            })
                        })
                    }
                },
                validateService: function() {},
                loadServiceClass: function(e) {
                    var t = e;
                    if (n.util.isEmpty(this.api)) {
                        if (t.apiConfig) return n.Service.defineServiceApi(this.constructor, t.apiConfig);
                        if (this.constructor.services) {
                            (t = new n.Config(n.config)).update(e, !0);
                            var r = t.apiVersions[this.constructor.serviceIdentifier];
                            return r = r || t.apiVersion, this.getLatestServiceClass(r)
                        }
                        return null
                    }
                    return null
                },
                getLatestServiceClass: function(e) {
                    return e = this.getLatestServiceVersion(e), null === this.constructor.services[e] && n.Service.defineServiceApi(this.constructor, e), this.constructor.services[e]
                },
                getLatestServiceVersion: function(e) {
                    if (!this.constructor.services || 0 === this.constructor.services.length) throw new Error("No services defined on " + this.constructor.serviceIdentifier);
                    if (e ? n.util.isType(e, Date) && (e = n.util.date.iso8601(e).split("T")[0]) : e = "latest", Object.hasOwnProperty(this.constructor.services, e)) return e;
                    for (var t = Object.keys(this.constructor.services).sort(), r = null, i = t.length - 1; i >= 0; i--)
                        if ("*" !== t[i][t[i].length - 1] && (r = t[i]), t[i].substr(0, 10) <= e) return r;
                    throw new Error("Could not find " + this.constructor.serviceIdentifier + " API to satisfy version constraint `" + e + "'")
                },
                api: {},
                defaultRetryCount: 3,
                customizeRequests: function(e) {
                    if (e) {
                        if ("function" != typeof e) throw new Error("Invalid callback type '" + typeof e + "' provided in customizeRequests");
                        this.customRequestHandler = e
                    } else this.customRequestHandler = null
                },
                makeRequest: function(e, t, r) {
                    if ("function" == typeof t && (r = t, t = null), t = t || {}, this.config.params) {
                        var i = this.api.operations[e];
                        i && (t = n.util.copy(t), n.util.each(this.config.params, function(e, r) {
                            i.input.members[e] && (void 0 !== t[e] && null !== t[e] || (t[e] = r))
                        }))
                    }
                    var o = new n.Request(this, e, t);
                    return this.addAllRequestListeners(o), this.attachMonitoringEmitter(o), r && o.send(r), o
                },
                makeUnauthenticatedRequest: function(e, t, r) {
                    "function" == typeof t && (r = t, t = {});
                    var n = this.makeRequest(e, t).toUnauthenticated();
                    return r ? n.send(r) : n
                },
                waitFor: function(e, t, r) {
                    return new n.ResourceWaiter(this, e).wait(t, r)
                },
                addAllRequestListeners: function(e) {
                    for (var t = [n.events, n.EventListeners.Core, this.serviceInterface(), n.EventListeners.CorePost], r = 0; r < t.length; r++) t[r] && e.addListeners(t[r]);
                    this.config.paramValidation || e.removeListener("validate", n.EventListeners.Core.VALIDATE_PARAMETERS), this.config.logger && e.addListeners(n.EventListeners.Logger), this.setupRequestListeners(e), "function" == typeof this.constructor.prototype.customRequestHandler && this.constructor.prototype.customRequestHandler(e), Object.prototype.hasOwnProperty.call(this, "customRequestHandler") && "function" == typeof this.customRequestHandler && this.customRequestHandler(e)
                },
                apiCallEvent: function(e) {
                    var t = e.service.api.operations[e.operation],
                        r = {
                            Type: "ApiCall",
                            Api: t ? t.name : e.operation,
                            Version: 1,
                            Service: e.service.api.serviceId || e.service.api.endpointPrefix,
                            Region: e.httpRequest.region,
                            MaxRetriesExceeded: 0,
                            UserAgent: e.httpRequest.getUserAgent()
                        },
                        n = e.response;
                    if (n.httpResponse.statusCode && (r.FinalHttpStatusCode = n.httpResponse.statusCode), n.error) {
                        var i = n.error;
                        n.httpResponse.statusCode > 299 ? (i.code && (r.FinalAwsException = i.code), i.message && (r.FinalAwsExceptionMessage = i.message)) : ((i.code || i.name) && (r.FinalSdkException = i.code || i.name), i.message && (r.FinalSdkExceptionMessage = i.message))
                    }
                    return r
                },
                apiAttemptEvent: function(e) {
                    var t = e.service.api.operations[e.operation],
                        r = {
                            Type: "ApiCallAttempt",
                            Api: t ? t.name : e.operation,
                            Version: 1,
                            Service: e.service.api.serviceId || e.service.api.endpointPrefix,
                            Fqdn: e.httpRequest.endpoint.hostname,
                            UserAgent: e.httpRequest.getUserAgent()
                        },
                        n = e.response;
                    return n.httpResponse.statusCode && (r.HttpStatusCode = n.httpResponse.statusCode), !e._unAuthenticated && e.service.config.credentials && e.service.config.credentials.accessKeyId && (r.AccessKey = e.service.config.credentials.accessKeyId), n.httpResponse.headers ? (e.httpRequest.headers["x-amz-security-token"] && (r.SessionToken = e.httpRequest.headers["x-amz-security-token"]), n.httpResponse.headers["x-amzn-requestid"] && (r.XAmznRequestId = n.httpResponse.headers["x-amzn-requestid"]), n.httpResponse.headers["x-amz-request-id"] && (r.XAmzRequestId = n.httpResponse.headers["x-amz-request-id"]), n.httpResponse.headers["x-amz-id-2"] && (r.XAmzId2 = n.httpResponse.headers["x-amz-id-2"]), r) : r
                },
                attemptFailEvent: function(e) {
                    var t = this.apiAttemptEvent(e),
                        r = e.response,
                        n = r.error;
                    return r.httpResponse.statusCode > 299 ? (n.code && (t.AwsException = n.code), n.message && (t.AwsExceptionMessage = n.message)) : ((n.code || n.name) && (t.SdkException = n.code || n.name), n.message && (t.SdkExceptionMessage = n.message)), t
                },
                attachMonitoringEmitter: function(e) {
                    var t, r, i, o, a, s, u = 0,
                        c = this;
                    e.on("validate", function() {
                        o = n.util.realClock.now(), s = Date.now()
                    }, !0), e.on("sign", function() {
                        r = n.util.realClock.now(), t = Date.now(), a = e.httpRequest.region, u++
                    }, !0), e.on("validateResponse", function() {
                        i = Math.round(n.util.realClock.now() - r)
                    }), e.addNamedListener("API_CALL_ATTEMPT", "success", function() {
                        var r = c.apiAttemptEvent(e);
                        r.Timestamp = t, r.AttemptLatency = i >= 0 ? i : 0, r.Region = a, c.emit("apiCallAttempt", [r])
                    }), e.addNamedListener("API_CALL_ATTEMPT_RETRY", "retry", function() {
                        var o = c.attemptFailEvent(e);
                        o.Timestamp = t, i = i || Math.round(n.util.realClock.now() - r), o.AttemptLatency = i >= 0 ? i : 0, o.Region = a, c.emit("apiCallAttempt", [o])
                    }), e.addNamedListener("API_CALL", "complete", function() {
                        var t = c.apiCallEvent(e);
                        if (t.AttemptCount = u, !(t.AttemptCount <= 0)) {
                            t.Timestamp = s;
                            var r = Math.round(n.util.realClock.now() - o);
                            t.Latency = r >= 0 ? r : 0;
                            var i = e.response;
                            "number" == typeof i.retryCount && "number" == typeof i.maxRetries && i.retryCount >= i.maxRetries && (t.MaxRetriesExceeded = 1), c.emit("apiCall", [t])
                        }
                    })
                },
                setupRequestListeners: function(e) {},
                getSignerClass: function(e) {
                    var t, r = null,
                        i = "";
                    return e && (i = (r = (e.service.api.operations || {})[e.operation] || null) ? r.authtype : ""), t = this.config.signatureVersion ? this.config.signatureVersion : "v4" === i || "v4-unsigned-body" === i ? "v4" : this.api.signatureVersion, n.Signers.RequestSigner.getVersion(t)
                },
                serviceInterface: function() {
                    switch (this.api.protocol) {
                        case "ec2":
                        case "query":
                            return n.EventListeners.Query;
                        case "json":
                            return n.EventListeners.Json;
                        case "rest-json":
                            return n.EventListeners.RestJson;
                        case "rest-xml":
                            return n.EventListeners.RestXml
                    }
                    if (this.api.protocol) throw new Error("Invalid service `protocol' " + this.api.protocol + " in API config")
                },
                successfulResponse: function(e) {
                    return e.httpResponse.statusCode < 300
                },
                numRetries: function() {
                    return void 0 !== this.config.maxRetries ? this.config.maxRetries : this.defaultRetryCount
                },
                retryDelays: function(e) {
                    return n.util.calculateRetryDelay(e, this.config.retryDelayOptions)
                },
                retryableError: function(e) {
                    return !!this.timeoutError(e) || !!this.networkingError(e) || !!this.expiredCredentialsError(e) || !!this.throttledError(e) || e.statusCode >= 500
                },
                networkingError: function(e) {
                    return "NetworkingError" === e.code
                },
                timeoutError: function(e) {
                    return "TimeoutError" === e.code
                },
                expiredCredentialsError: function(e) {
                    return "ExpiredTokenException" === e.code
                },
                clockSkewError: function(e) {
                    switch (e.code) {
                        case "RequestTimeTooSkewed":
                        case "RequestExpired":
                        case "InvalidSignatureException":
                        case "SignatureDoesNotMatch":
                        case "AuthFailure":
                        case "RequestInTheFuture":
                            return !0;
                        default:
                            return !1
                    }
                },
                getSkewCorrectedDate: function() {
                    return new Date(Date.now() + this.config.systemClockOffset)
                },
                applyClockOffset: function(e) {
                    e && (this.config.systemClockOffset = e - Date.now())
                },
                isClockSkewed: function(e) {
                    if (e) return Math.abs(this.getSkewCorrectedDate().getTime() - e) >= 3e4
                },
                throttledError: function(e) {
                    switch (e.code) {
                        case "ProvisionedThroughputExceededException":
                        case "Throttling":
                        case "ThrottlingException":
                        case "RequestLimitExceeded":
                        case "RequestThrottled":
                        case "RequestThrottledException":
                        case "TooManyRequestsException":
                        case "TransactionInProgressException":
                            return !0;
                        default:
                            return !1
                    }
                },
                endpointFromTemplate: function(e) {
                    if ("string" != typeof e) return e;
                    var t = e;
                    return (t = (t = t.replace(/\{service\}/g, this.api.endpointPrefix)).replace(/\{region\}/g, this.config.region)).replace(/\{scheme\}/g, this.config.sslEnabled ? "https" : "http")
                },
                setEndpoint: function(e) {
                    this.endpoint = new n.Endpoint(e, this.config)
                },
                paginationConfig: function(e, t) {
                    var r = this.api.operations[e].paginator;
                    if (!r) {
                        if (t) {
                            var i = new Error;
                            throw n.util.error(i, "No pagination configuration for " + e)
                        }
                        return null
                    }
                    return r
                }
            }), n.util.update(n.Service, {
                defineMethods: function(e) {
                    n.util.each(e.prototype.api.operations, function(t) {
                        e.prototype[t] || ("none" === e.prototype.api.operations[t].authtype ? e.prototype[t] = function(e, r) {
                            return this.makeUnauthenticatedRequest(t, e, r)
                        } : e.prototype[t] = function(e, r) {
                            return this.makeRequest(t, e, r)
                        })
                    })
                },
                defineService: function(e, t, r) {
                    n.Service._serviceMap[e] = !0, Array.isArray(t) || (r = t, t = []);
                    var i = a(n.Service, r || {});
                    if ("string" == typeof e) {
                        n.Service.addVersions(i, t);
                        var o = i.serviceIdentifier || e;
                        i.serviceIdentifier = o
                    } else i.prototype.api = e, n.Service.defineMethods(i);
                    if (n.SequentialExecutor.call(this.prototype), !this.prototype.publisher && n.util.clientSideMonitoring) {
                        var s = n.util.clientSideMonitoring.Publisher,
                            u = (0, n.util.clientSideMonitoring.configProvider)();
                        this.prototype.publisher = new s(u), u.enabled && (n.Service._clientSideMonitoring = !0)
                    }
                    return n.SequentialExecutor.call(i.prototype), n.Service.addDefaultMonitoringListeners(i.prototype), i
                },
                addVersions: function(e, t) {
                    Array.isArray(t) || (t = [t]), e.services = e.services || {};
                    for (var r = 0; r < t.length; r++) void 0 === e.services[t[r]] && (e.services[t[r]] = null);
                    e.apiVersions = Object.keys(e.services).sort()
                },
                defineServiceApi: function(e, t, r) {
                    function o(e) {
                        e.isApi ? s.prototype.api = e : s.prototype.api = new i(e)
                    }
                    var s = a(e, {
                        serviceIdentifier: e.serviceIdentifier
                    });
                    if ("string" == typeof t) {
                        if (r) o(r);
                        else try {
                            o(n.apiLoader(e.serviceIdentifier, t))
                        } catch (r) {
                            throw n.util.error(r, {
                                message: "Could not find API configuration " + e.serviceIdentifier + "-" + t
                            })
                        }
                        Object.prototype.hasOwnProperty.call(e.services, t) || (e.apiVersions = e.apiVersions.concat(t).sort()), e.services[t] = s
                    } else o(t);
                    return n.Service.defineMethods(s), s
                },
                hasService: function(e) {
                    return Object.prototype.hasOwnProperty.call(n.Service._serviceMap, e)
                },
                addDefaultMonitoringListeners: function(e) {
                    e.addNamedListener("MONITOR_EVENTS_BUBBLE", "apiCallAttempt", function(t) {
                        var r = Object.getPrototypeOf(e);
                        r._events && r.emit("apiCallAttempt", [t])
                    }), e.addNamedListener("CALL_EVENTS_BUBBLE", "apiCall", function(t) {
                        var r = Object.getPrototypeOf(e);
                        r._events && r.emit("apiCall", [t])
                    })
                },
                _serviceMap: {}
            }), n.util.mixin(n.Service, n.SequentialExecutor), t.exports = n.Service
        }).call(this, e("_process"))
    }, {
        "./core": 38,
        "./model/api": 64,
        "./region_config": 81,
        _process: 8
    }],
    81: [function(e, t, r) {
        function n(e, t) {
            i.each(t, function(t, r) {
                "globalEndpoint" !== t && (void 0 !== e.config[t] && null !== e.config[t] || (e.config[t] = r))
            })
        }
        var i = e("./util"),
            o = e("./region_config_data.json");
        t.exports = function(e) {
            for (var t = function(e) {
                    var t = e.config.region,
                        r = function(e) {
                            if (!e) return null;
                            var t = e.split("-");
                            return t.length < 3 ? null : t.slice(0, t.length - 2).join("-") + "-*"
                        }(t),
                        n = e.api.endpointPrefix;
                    return [
                        [t, n],
                        [r, n],
                        [t, "*"],
                        [r, "*"],
                        ["*", n],
                        ["*", "*"]
                    ].map(function(e) {
                        return e[0] && e[1] ? e.join("/") : null
                    })
                }(e), r = 0; r < t.length; r++) {
                var a = t[r];
                if (a && Object.prototype.hasOwnProperty.call(o.rules, a)) {
                    var s = o.rules[a];
                    return "string" == typeof s && (s = o.patterns[s]), e.config.useDualstack && i.isDualstackAvailable(e) && ((s = i.copy(s)).endpoint = "{service}.dualstack.{region}.amazonaws.com"), e.isGlobalEndpoint = !!s.globalEndpoint, s.signatureVersion || (s.signatureVersion = "v4"), void n(e, s)
                }
            }
        }
    }, {
        "./region_config_data.json": 82,
        "./util": 116
    }],
    82: [function(e, t, r) {
        t.exports = {
            rules: {
                "*/*": {
                    endpoint: "{service}.{region}.amazonaws.com"
                },
                "cn-*/*": {
                    endpoint: "{service}.{region}.amazonaws.com.cn"
                },
                "*/budgets": "globalSSL",
                "*/cloudfront": "globalSSL",
                "*/iam": "globalSSL",
                "*/sts": "globalSSL",
                "*/importexport": {
                    endpoint: "{service}.amazonaws.com",
                    signatureVersion: "v2",
                    globalEndpoint: !0
                },
                "*/route53": {
                    endpoint: "https://{service}.amazonaws.com",
                    signatureVersion: "v3https",
                    globalEndpoint: !0
                },
                "*/waf": "globalSSL",
                "us-gov-*/iam": "globalGovCloud",
                "us-gov-*/sts": {
                    endpoint: "{service}.{region}.amazonaws.com"
                },
                "us-gov-west-1/s3": "s3signature",
                "us-west-1/s3": "s3signature",
                "us-west-2/s3": "s3signature",
                "eu-west-1/s3": "s3signature",
                "ap-southeast-1/s3": "s3signature",
                "ap-southeast-2/s3": "s3signature",
                "ap-northeast-1/s3": "s3signature",
                "sa-east-1/s3": "s3signature",
                "us-east-1/s3": {
                    endpoint: "{service}.amazonaws.com",
                    signatureVersion: "s3"
                },
                "us-east-1/sdb": {
                    endpoint: "{service}.amazonaws.com",
                    signatureVersion: "v2"
                },
                "*/sdb": {
                    endpoint: "{service}.{region}.amazonaws.com",
                    signatureVersion: "v2"
                }
            },
            patterns: {
                globalSSL: {
                    endpoint: "https://{service}.amazonaws.com",
                    globalEndpoint: !0
                },
                globalGovCloud: {
                    endpoint: "{service}.us-gov.amazonaws.com"
                },
                s3signature: {
                    endpoint: "{service}.{region}.amazonaws.com",
                    signatureVersion: "s3"
                }
            }
        }
    }, {}],
    85: [function(e, t, r) {
        var n = e("./core"),
            i = n.util.inherit,
            o = e("jmespath");
        n.Response = i({
            constructor: function(e) {
                this.request = e, this.data = null, this.error = null, this.retryCount = 0, this.redirectCount = 0, this.httpResponse = new n.HttpResponse, e && (this.maxRetries = e.service.numRetries(), this.maxRedirects = e.service.config.maxRedirects)
            },
            nextPage: function(e) {
                var t, r = this.request.service,
                    i = this.request.operation;
                try {
                    t = r.paginationConfig(i, !0)
                } catch (e) {
                    this.error = e
                }
                if (!this.hasNextPage()) {
                    if (e) e(this.error, null);
                    else if (this.error) throw this.error;
                    return null
                }
                var o = n.util.copy(this.request.params);
                if (this.nextPageTokens) {
                    var a = t.inputToken;
                    "string" == typeof a && (a = [a]);
                    for (var s = 0; s < a.length; s++) o[a[s]] = this.nextPageTokens[s];
                    return r.makeRequest(this.request.operation, o, e)
                }
                return e ? e(null, null) : null
            },
            hasNextPage: function() {
                return this.cacheNextPageTokens(), !!this.nextPageTokens || void 0 === this.nextPageTokens && void 0
            },
            cacheNextPageTokens: function() {
                if (Object.prototype.hasOwnProperty.call(this, "nextPageTokens")) return this.nextPageTokens;
                this.nextPageTokens = void 0;
                var e = this.request.service.paginationConfig(this.request.operation);
                if (!e) return this.nextPageTokens;
                if (this.nextPageTokens = null, e.moreResults && !o.search(this.data, e.moreResults)) return this.nextPageTokens;
                var t = e.outputToken;
                return "string" == typeof t && (t = [t]), n.util.arrayEach.call(this, t, function(e) {
                    var t = o.search(this.data, e);
                    t && (this.nextPageTokens = this.nextPageTokens || [], this.nextPageTokens.push(t))
                }), this.nextPageTokens
            }
        })
    }, {
        "./core": 38,
        jmespath: 7
    }],
    84: [function(e, t, r) {
        function n(e) {
            var t = e.request._waiter,
                r = !1,
                n = "retry";
            t.config.acceptors.forEach(function(i) {
                if (!r) {
                    var o = t.matchers[i.matcher];
                    o && o(e, i.expected, i.argument) && (r = !0, n = i.state)
                }
            }), !r && e.error && (n = "failure"), "success" === n ? t.setSuccess(e) : t.setError(e, "retry" === n)
        }
        var i = e("./core"),
            o = i.util.inherit,
            a = e("jmespath");
        i.ResourceWaiter = o({
            constructor: function(e, t) {
                this.service = e, this.state = t, this.loadWaiterConfig(this.state)
            },
            service: null,
            state: null,
            config: null,
            matchers: {
                path: function(e, t, r) {
                    try {
                        var n = a.search(e.data, r)
                    } catch (e) {
                        return !1
                    }
                    return a.strictDeepEqual(n, t)
                },
                pathAll: function(e, t, r) {
                    try {
                        var n = a.search(e.data, r)
                    } catch (e) {
                        return !1
                    }
                    Array.isArray(n) || (n = [n]);
                    var i = n.length;
                    if (!i) return !1;
                    for (var o = 0; o < i; o++)
                        if (!a.strictDeepEqual(n[o], t)) return !1;
                    return !0
                },
                pathAny: function(e, t, r) {
                    try {
                        var n = a.search(e.data, r)
                    } catch (e) {
                        return !1
                    }
                    Array.isArray(n) || (n = [n]);
                    for (var i = n.length, o = 0; o < i; o++)
                        if (a.strictDeepEqual(n[o], t)) return !0;
                    return !1
                },
                status: function(e, t) {
                    var r = e.httpResponse.statusCode;
                    return "number" == typeof r && r === t
                },
                error: function(e, t) {
                    return "string" == typeof t && e.error ? t === e.error.code : t === !!e.error
                }
            },
            listeners: (new i.SequentialExecutor).addNamedListeners(function(e) {
                e("RETRY_CHECK", "retry", function(e) {
                    var t = e.request._waiter;
                    e.error && "ResourceNotReady" === e.error.code && (e.error.retryDelay = 1e3 * (t.config.delay || 0))
                }), e("CHECK_OUTPUT", "extractData", n), e("CHECK_ERROR", "extractError", n)
            }),
            wait: function(e, t) {
                "function" == typeof e && (t = e, e = void 0), e && e.$waiter && ("number" == typeof(e = i.util.copy(e)).$waiter.delay && (this.config.delay = e.$waiter.delay), "number" == typeof e.$waiter.maxAttempts && (this.config.maxAttempts = e.$waiter.maxAttempts), delete e.$waiter);
                var r = this.service.makeRequest(this.config.operation, e);
                return r._waiter = this, r.response.maxRetries = this.config.maxAttempts, r.addListeners(this.listeners), t && r.send(t), r
            },
            setSuccess: function(e) {
                e.error = null, e.data = e.data || {}, e.request.removeAllListeners("extractData")
            },
            setError: function(e, t) {
                e.data = null, e.error = i.util.error(e.error || new Error, {
                    code: "ResourceNotReady",
                    message: "Resource is not in the state " + this.state,
                    retryable: t
                })
            },
            loadWaiterConfig: function(e) {
                if (!this.service.api.waiters[e]) throw new i.util.error(new Error, {
                    code: "StateNotFoundError",
                    message: "State " + e + " not found."
                });
                this.config = i.util.copy(this.service.api.waiters[e])
            }
        })
    }, {
        "./core": 38,
        jmespath: 7
    }],
    83: [function(e, t, r) {
        (function(t) {
            var r = e("./core"),
                n = e("./state_machine"),
                i = r.util.inherit,
                o = r.util.domain,
                a = e("jmespath"),
                s = {
                    success: 1,
                    error: 1,
                    complete: 1
                },
                u = new n;
            u.setupStates = function() {
                var e = function(e, t) {
                    var r = this;
                    r._haltHandlersOnError = !1, r.emit(r._asm.currentState, function(e) {
                        if (e)
                            if (function(e) {
                                    return Object.prototype.hasOwnProperty.call(s, e._asm.currentState)
                                }(r)) {
                                if (!(o && r.domain instanceof o.Domain)) throw e;
                                e.domainEmitter = r, e.domain = r.domain, e.domainThrown = !1, r.domain.emit("error", e)
                            } else r.response.error = e, t(e);
                        else t(r.response.error)
                    })
                };
                this.addState("validate", "build", "error", e), this.addState("build", "afterBuild", "restart", e), this.addState("afterBuild", "sign", "restart", e), this.addState("sign", "send", "retry", e), this.addState("retry", "afterRetry", "afterRetry", e), this.addState("afterRetry", "sign", "error", e), this.addState("send", "validateResponse", "retry", e), this.addState("validateResponse", "extractData", "extractError", e), this.addState("extractError", "extractData", "retry", e), this.addState("extractData", "success", "retry", e), this.addState("restart", "build", "error", e), this.addState("success", "complete", "complete", e), this.addState("error", "complete", "complete", e), this.addState("complete", null, null, e)
            }, u.setupStates(), r.Request = i({
                constructor: function(e, t, i) {
                    var a = e.endpoint,
                        s = e.config.region,
                        c = e.config.customUserAgent;
                    e.isGlobalEndpoint && (s = "us-east-1"), this.domain = o && o.active, this.service = e, this.operation = t, this.params = i || {}, this.httpRequest = new r.HttpRequest(a, s), this.httpRequest.appendToUserAgent(c), this.startTime = e.getSkewCorrectedDate(), this.response = new r.Response(this), this._asm = new n(u.states, "validate"), this._haltHandlersOnError = !1, r.SequentialExecutor.call(this), this.emit = this.emitEvent
                },
                send: function(e) {
                    return e && (this.httpRequest.appendToUserAgent("callback"), this.on("complete", function(t) {
                        e.call(t, t.error, t.data)
                    })), this.runTo(), this.response
                },
                build: function(e) {
                    return this.runTo("send", e)
                },
                runTo: function(e, t) {
                    return this._asm.runTo(e, t, this), this
                },
                abort: function() {
                    return this.removeAllListeners("validateResponse"), this.removeAllListeners("extractError"), this.on("validateResponse", function(e) {
                        e.error = r.util.error(new Error("Request aborted by user"), {
                            code: "RequestAbortedError",
                            retryable: !1
                        })
                    }), this.httpRequest.stream && !this.httpRequest.stream.didCallback && (this.httpRequest.stream.abort(), this.httpRequest._abortCallback ? this.httpRequest._abortCallback() : this.removeAllListeners("send")), this
                },
                eachPage: function(e) {
                    e = r.util.fn.makeAsync(e, 3), this.on("complete", function t(n) {
                        e.call(n, n.error, n.data, function(i) {
                            !1 !== i && (n.hasNextPage() ? n.nextPage().on("complete", t).send() : e.call(n, null, null, r.util.fn.noop))
                        })
                    }).send()
                },
                eachItem: function(e) {
                    var t = this;
                    this.eachPage(function(n, i) {
                        if (n) return e(n, null);
                        if (null === i) return e(null, null);
                        var o = t.service.paginationConfig(t.operation).resultKey;
                        Array.isArray(o) && (o = o[0]);
                        var s = a.search(i, o),
                            u = !0;
                        return r.util.arrayEach(s, function(t) {
                            if (!1 === (u = e(null, t))) return r.util.abort
                        }), u
                    })
                },
                isPageable: function() {
                    return !!this.service.paginationConfig(this.operation)
                },
                createReadStream: function() {
                    var e = r.util.stream,
                        n = this,
                        i = null;
                    return 2 === r.HttpClient.streamsApiVersion ? (i = new e.PassThrough, t.nextTick(function() {
                        n.send()
                    })) : ((i = new e.Stream).readable = !0, i.sent = !1, i.on("newListener", function(e) {
                        i.sent || "data" !== e || (i.sent = !0, t.nextTick(function() {
                            n.send()
                        }))
                    })), this.on("error", function(e) {
                        i.emit("error", e)
                    }), this.on("httpHeaders", function(t, o, a) {
                        if (t < 300) {
                            n.removeListener("httpData", r.EventListeners.Core.HTTP_DATA), n.removeListener("httpError", r.EventListeners.Core.HTTP_ERROR), n.on("httpError", function(e) {
                                a.error = e, a.error.retryable = !1
                            });
                            var s, u = !1;
                            if ("HEAD" !== n.httpRequest.method && (s = parseInt(o["content-length"], 10)), void 0 !== s && !isNaN(s) && s >= 0) {
                                u = !0;
                                var c = 0
                            }
                            var l = function() {
                                    u && c !== s ? i.emit("error", r.util.error(new Error("Stream content length mismatch. Received " + c + " of " + s + " bytes."), {
                                        code: "StreamContentLengthMismatch"
                                    })) : 2 === r.HttpClient.streamsApiVersion ? i.end() : i.emit("end")
                                },
                                d = a.httpResponse.createUnbufferedStream();
                            if (2 === r.HttpClient.streamsApiVersion)
                                if (u) {
                                    var p = new e.PassThrough;
                                    p._write = function(t) {
                                        return t && t.length && (c += t.length), e.PassThrough.prototype._write.apply(this, arguments)
                                    }, p.on("end", l), i.on("error", function(e) {
                                        u = !1, d.unpipe(p), p.emit("end"), p.end()
                                    }), d.pipe(p).pipe(i, {
                                        end: !1
                                    })
                                } else d.pipe(i);
                            else u && d.on("data", function(e) {
                                e && e.length && (c += e.length)
                            }), d.on("data", function(e) {
                                i.emit("data", e)
                            }), d.on("end", l);
                            d.on("error", function(e) {
                                u = !1, i.emit("error", e)
                            })
                        }
                    }), i
                },
                emitEvent: function(e, t, n) {
                    "function" == typeof t && (n = t, t = null), n || (n = function() {}), t || (t = this.eventParameters(e, this.response)), r.SequentialExecutor.prototype.emit.call(this, e, t, function(e) {
                        e && (this.response.error = e), n.call(this, e)
                    })
                },
                eventParameters: function(e) {
                    switch (e) {
                        case "restart":
                        case "validate":
                        case "sign":
                        case "build":
                        case "afterValidate":
                        case "afterBuild":
                            return [this];
                        case "error":
                            return [this.response.error, this.response];
                        default:
                            return [this.response]
                    }
                },
                presign: function(e, t) {
                    return t || "function" != typeof e || (t = e, e = null), (new r.Signers.Presign).sign(this.toGet(), e, t)
                },
                isPresigned: function() {
                    return Object.prototype.hasOwnProperty.call(this.httpRequest.headers, "presigned-expires")
                },
                toUnauthenticated: function() {
                    return this._unAuthenticated = !0, this.removeListener("validate", r.EventListeners.Core.VALIDATE_CREDENTIALS), this.removeListener("sign", r.EventListeners.Core.SIGN), this
                },
                toGet: function() {
                    return "query" !== this.service.api.protocol && "ec2" !== this.service.api.protocol || (this.removeListener("build", this.buildAsGet), this.addListener("build", this.buildAsGet)), this
                },
                buildAsGet: function(e) {
                    e.httpRequest.method = "GET", e.httpRequest.path = e.service.endpoint.path + "?" + e.httpRequest.body, e.httpRequest.body = "", delete e.httpRequest.headers["Content-Length"], delete e.httpRequest.headers["Content-Type"]
                },
                haltHandlersOnError: function() {
                    this._haltHandlersOnError = !0
                }
            }), r.Request.addPromisesToClass = function(e) {
                this.prototype.promise = function() {
                    var t = this;
                    return this.httpRequest.appendToUserAgent("promise"), new e(function(e, r) {
                        t.on("complete", function(t) {
                            t.error ? r(t.error) : e(Object.defineProperty(t.data || {}, "$response", {
                                value: t
                            }))
                        }), t.runTo()
                    })
                }
            }, r.Request.deletePromisesFromClass = function() {
                delete this.prototype.promise
            }, r.util.addPromises(r.Request), r.util.mixin(r.Request, r.SequentialExecutor)
        }).call(this, e("_process"))
    }, {
        "./core": 38,
        "./state_machine": 115,
        _process: 8,
        jmespath: 7
    }],
    115: [function(e, t, r) {
        function n(e, t) {
            this.currentState = t || null, this.states = e || {}
        }
        n.prototype.runTo = function(e, t, r, n) {
            "function" == typeof e && (n = r, r = t, t = e, e = null);
            var i = this,
                o = i.states[i.currentState];
            o.fn.call(r || i, n, function(n) {
                if (n) {
                    if (!o.fail) return t ? t.call(r, n) : null;
                    i.currentState = o.fail
                } else {
                    if (!o.accept) return t ? t.call(r) : null;
                    i.currentState = o.accept
                }
                if (i.currentState === e) return t ? t.call(r, n) : null;
                i.runTo(e, t, r, n)
            })
        }, n.prototype.addState = function(e, t, r, n) {
            return "function" == typeof t ? (n = t, t = null, r = null) : "function" == typeof r && (n = r, r = null), this.currentState || (this.currentState = e), this.states[e] = {
                accept: t,
                fail: r,
                fn: n
            }, this
        }, t.exports = n
    }, {}],
    70: [function(e, t, r) {
        var n = e("./core");
        n.ParamValidator = n.util.inherit({
            constructor: function(e) {
                !0 !== e && void 0 !== e || (e = {
                    min: !0
                }), this.validation = e
            },
            validate: function(e, t, r) {
                if (this.errors = [], this.validateMember(e, t || {}, r || "params"), this.errors.length > 1) {
                    var i = this.errors.join("\n* ");
                    throw i = "There were " + this.errors.length + " validation errors:\n* " + i, n.util.error(new Error(i), {
                        code: "MultipleValidationErrors",
                        errors: this.errors
                    })
                }
                if (1 === this.errors.length) throw this.errors[0];
                return !0
            },
            fail: function(e, t) {
                this.errors.push(n.util.error(new Error(t), {
                    code: e
                }))
            },
            validateStructure: function(e, t, r) {
                this.validateType(t, r, ["object"], "structure");
                for (var n, i = 0; e.required && i < e.required.length; i++) {
                    var o = t[n = e.required[i]];
                    void 0 !== o && null !== o || this.fail("MissingRequiredParameter", "Missing required key '" + n + "' in " + r)
                }
                for (n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                        var a = t[n],
                            s = e.members[n];
                        if (void 0 !== s) {
                            var u = [r, n].join(".");
                            this.validateMember(s, a, u)
                        } else this.fail("UnexpectedParameter", "Unexpected key '" + n + "' found in " + r)
                    } return !0
            },
            validateMember: function(e, t, r) {
                switch (e.type) {
                    case "structure":
                        return this.validateStructure(e, t, r);
                    case "list":
                        return this.validateList(e, t, r);
                    case "map":
                        return this.validateMap(e, t, r);
                    default:
                        return this.validateScalar(e, t, r)
                }
            },
            validateList: function(e, t, r) {
                if (this.validateType(t, r, [Array])) {
                    this.validateRange(e, t.length, r, "list member count");
                    for (var n = 0; n < t.length; n++) this.validateMember(e.member, t[n], r + "[" + n + "]")
                }
            },
            validateMap: function(e, t, r) {
                if (this.validateType(t, r, ["object"], "map")) {
                    var n = 0;
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (this.validateMember(e.key, i, r + "[key='" + i + "']"), this.validateMember(e.value, t[i], r + "['" + i + "']"), n++);
                    this.validateRange(e, n, r, "map member count")
                }
            },
            validateScalar: function(e, t, r) {
                switch (e.type) {
                    case null:
                    case void 0:
                    case "string":
                        return this.validateString(e, t, r);
                    case "base64":
                    case "binary":
                        return this.validatePayload(t, r);
                    case "integer":
                    case "float":
                        return this.validateNumber(e, t, r);
                    case "boolean":
                        return this.validateType(t, r, ["boolean"]);
                    case "timestamp":
                        return this.validateType(t, r, [Date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, "number"], "Date object, ISO-8601 string, or a UNIX timestamp");
                    default:
                        return this.fail("UnkownType", "Unhandled type " + e.type + " for " + r)
                }
            },
            validateString: function(e, t, r) {
                var n = ["string"];
                e.isJsonValue && (n = n.concat(["number", "object", "boolean"])), null !== t && this.validateType(t, r, n) && (this.validateEnum(e, t, r), this.validateRange(e, t.length, r, "string length"), this.validatePattern(e, t, r), this.validateUri(e, t, r))
            },
            validateUri: function(e, t, r) {
                "uri" === e.location && 0 === t.length && this.fail("UriParameterError", 'Expected uri parameter to have length >= 1, but found "' + t + '" for ' + r)
            },
            validatePattern: function(e, t, r) {
                this.validation.pattern && void 0 !== e.pattern && (new RegExp(e.pattern).test(t) || this.fail("PatternMatchError", 'Provided value "' + t + '" does not match regex pattern /' + e.pattern + "/ for " + r))
            },
            validateRange: function(e, t, r, n) {
                this.validation.min && void 0 !== e.min && t < e.min && this.fail("MinRangeError", "Expected " + n + " >= " + e.min + ", but found " + t + " for " + r), this.validation.max && void 0 !== e.max && t > e.max && this.fail("MaxRangeError", "Expected " + n + " <= " + e.max + ", but found " + t + " for " + r)
            },
            validateEnum: function(e, t, r) {
                this.validation.enum && void 0 !== e.enum && -1 === e.enum.indexOf(t) && this.fail("EnumError", "Found string value of " + t + ", but expected " + e.enum.join("|") + " for " + r)
            },
            validateType: function(e, t, r, i) {
                if (null === e || void 0 === e) return !1;
                for (var o = !1, a = 0; a < r.length; a++) {
                    if ("string" == typeof r[a]) {
                        if (typeof e === r[a]) return !0
                    } else if (r[a] instanceof RegExp) {
                        if ((e || "").toString().match(r[a])) return !0
                    } else {
                        if (e instanceof r[a]) return !0;
                        if (n.util.isType(e, r[a])) return !0;
                        i || o || (r = r.slice()), r[a] = n.util.typeName(r[a])
                    }
                    o = !0
                }
                var s = i;
                s || (s = r.join(", ").replace(/,([^,]+)$/, ", or$1"));
                var u = s.match(/^[aeiou]/i) ? "n" : "";
                return this.fail("InvalidParameterType", "Expected " + t + " to be a" + u + " " + s), !1
            },
            validateNumber: function(e, t, r) {
                if (null !== t && void 0 !== t) {
                    if ("string" == typeof t) {
                        var n = parseFloat(t);
                        n.toString() === t && (t = n)
                    }
                    this.validateType(t, r, ["number"]) && this.validateRange(e, t, r, "numeric value")
                }
            },
            validatePayload: function(e, t) {
                if (null !== e && void 0 !== e && "string" != typeof e && (!e || "number" != typeof e.byteLength)) {
                    if (n.util.isNode()) {
                        var r = n.util.stream.Stream;
                        if (n.util.Buffer.isBuffer(e) || e instanceof r) return
                    } else if (void 0 !== typeof Blob && e instanceof Blob) return;
                    var i = ["Buffer", "Stream", "File", "Blob", "ArrayBuffer", "DataView"];
                    if (e)
                        for (var o = 0; o < i.length; o++) {
                            if (n.util.isType(e, i[o])) return;
                            if (n.util.typeName(e.constructor) === i[o]) return
                        }
                    this.fail("InvalidParameterType", "Expected " + t + " to be a string, Buffer, Stream, Blob, or typed array object")
                }
            }
        })
    }, {
        "./core": 38
    }],
    64: [function(e, t, r) {
        var n = e("./collection"),
            i = e("./operation"),
            o = e("./shape"),
            a = e("./paginator"),
            s = e("./resource_waiter"),
            u = e("../util"),
            c = u.property,
            l = u.memoizedProperty;
        t.exports = function(e, t) {
            var r = this;
            e = e || {}, (t = t || {}).api = this, e.metadata = e.metadata || {}, c(this, "isApi", !0, !1), c(this, "apiVersion", e.metadata.apiVersion), c(this, "endpointPrefix", e.metadata.endpointPrefix), c(this, "signingName", e.metadata.signingName), c(this, "globalEndpoint", e.metadata.globalEndpoint), c(this, "signatureVersion", e.metadata.signatureVersion), c(this, "jsonVersion", e.metadata.jsonVersion), c(this, "targetPrefix", e.metadata.targetPrefix), c(this, "protocol", e.metadata.protocol), c(this, "timestampFormat", e.metadata.timestampFormat), c(this, "xmlNamespaceUri", e.metadata.xmlNamespace), c(this, "abbreviation", e.metadata.serviceAbbreviation), c(this, "fullName", e.metadata.serviceFullName), c(this, "serviceId", e.metadata.serviceId), l(this, "className", function() {
                var t = e.metadata.serviceAbbreviation || e.metadata.serviceFullName;
                return t ? ("ElasticLoadBalancing" === (t = t.replace(/^Amazon|AWS\s*|\(.*|\s+|\W+/g, "")) && (t = "ELB"), t) : null
            }), c(this, "operations", new n(e.operations, t, function(e, r) {
                return new i(e, r, t)
            }, u.string.lowerFirst, function(e, t) {
                !0 === t.endpointoperation && c(r, "endpointOperation", u.string.lowerFirst(e))
            })), c(this, "shapes", new n(e.shapes, t, function(e, r) {
                return o.create(r, t)
            })), c(this, "paginators", new n(e.paginators, t, function(e, r) {
                return new a(e, r, t)
            })), c(this, "waiters", new n(e.waiters, t, function(e, r) {
                return new s(e, r, t)
            }, u.string.lowerFirst)), t.documentation && (c(this, "documentation", e.documentation), c(this, "documentationUrl", e.documentationUrl))
        }
    }, {
        "../util": 116,
        "./collection": 65,
        "./operation": 66,
        "./paginator": 67,
        "./resource_waiter": 68,
        "./shape": 69
    }],
    68: [function(e, t, r) {
        var n = e("../util"),
            i = n.property;
        t.exports = function(e, t, r) {
            r = r || {}, i(this, "name", e), i(this, "api", r.api, !1), t.operation && i(this, "operation", n.string.lowerFirst(t.operation));
            var o = this;
            ["type", "description", "delay", "maxAttempts", "acceptors"].forEach(function(e) {
                var r = t[e];
                r && i(o, e, r)
            })
        }
    }, {
        "../util": 116
    }],
    67: [function(e, t, r) {
        var n = e("../util").property;
        t.exports = function(e, t) {
            n(this, "inputToken", t.input_token), n(this, "limitKey", t.limit_key), n(this, "moreResults", t.more_results), n(this, "outputToken", t.output_token), n(this, "resultKey", t.result_key)
        }
    }, {
        "../util": 116
    }],
    66: [function(e, t, r) {
        var n = e("./shape"),
            i = e("../util"),
            o = i.property,
            a = i.memoizedProperty;
        t.exports = function(e, t, r) {
            var i = this;
            r = r || {}, o(this, "name", t.name || e), o(this, "api", r.api, !1), t.http = t.http || {}, o(this, "endpoint", t.endpoint), o(this, "httpMethod", t.http.method || "POST"), o(this, "httpPath", t.http.requestUri || "/"), o(this, "authtype", t.authtype || ""), o(this, "endpointDiscoveryRequired", t.endpointdiscovery ? t.endpointdiscovery.required ? "REQUIRED" : "OPTIONAL" : "NULL"), a(this, "input", function() {
                return t.input ? n.create(t.input, r) : new n.create({
                    type: "structure"
                }, r)
            }), a(this, "output", function() {
                return t.output ? n.create(t.output, r) : new n.create({
                    type: "structure"
                }, r)
            }), a(this, "errors", function() {
                var e = [];
                if (!t.errors) return null;
                for (var i = 0; i < t.errors.length; i++) e.push(n.create(t.errors[i], r));
                return e
            }), a(this, "paginator", function() {
                return r.api.paginators[e]
            }), r.documentation && (o(this, "documentation", t.documentation), o(this, "documentationUrl", t.documentationUrl)), a(this, "idempotentMembers", function() {
                var e = [],
                    t = i.input,
                    r = t.members;
                if (!t.members) return e;
                for (var n in r) r.hasOwnProperty(n) && !0 === r[n].isIdempotent && e.push(n);
                return e
            }), a(this, "hasEventOutput", function() {
                return function(e) {
                    var t = e.members,
                        r = e.payload;
                    if (!e.members) return !1;
                    if (r) return t[r].isEventStream;
                    for (var n in t)
                        if (!t.hasOwnProperty(n) && !0 === t[n].isEventStream) return !0;
                    return !1
                }(i.output)
            })
        }
    }, {
        "../util": 116,
        "./shape": 69
    }],
    60: [function(e, t, r) {
        var n = e("./core"),
            i = n.util.inherit;
        n.Endpoint = i({
            constructor: function(e, t) {
                if (n.util.hideProperties(this, ["slashes", "auth", "hash", "search", "query"]), void 0 === e || null === e) throw new Error("Invalid endpoint: " + e);
                if ("string" != typeof e) return n.util.copy(e);
                e.match(/^http/) || (e = ((t && void 0 !== t.sslEnabled ? t.sslEnabled : n.config.sslEnabled) ? "https" : "http") + "://" + e), n.util.update(this, n.util.urlParse(e)), this.port ? this.port = parseInt(this.port, 10) : this.port = "https:" === this.protocol ? 443 : 80
            }
        }), n.HttpRequest = i({
            constructor: function(e, t) {
                e = new n.Endpoint(e), this.method = "POST", this.path = e.path || "/", this.headers = {}, this.body = "", this.endpoint = e, this.region = t, this._userAgent = "", this.setUserAgent()
            },
            setUserAgent: function() {
                this._userAgent = this.headers[this.getUserAgentHeaderName()] = n.util.userAgent()
            },
            getUserAgentHeaderName: function() {
                return (n.util.isBrowser() ? "X-Amz-" : "") + "User-Agent"
            },
            appendToUserAgent: function(e) {
                "string" == typeof e && e && (this._userAgent += " " + e), this.headers[this.getUserAgentHeaderName()] = this._userAgent
            },
            getUserAgent: function() {
                return this._userAgent
            },
            pathname: function() {
                return this.path.split("?", 1)[0]
            },
            search: function() {
                var e = this.path.split("?", 2)[1];
                return e ? (e = n.util.queryStringParse(e), n.util.queryParamsToString(e)) : ""
            },
            updateEndpoint: function(e) {
                var t = new n.Endpoint(e);
                this.endpoint = t, this.path = t.path || "/"
            }
        }), n.HttpResponse = i({
            constructor: function() {
                this.statusCode = void 0, this.headers = {}, this.body = void 0, this.streaming = !1, this.stream = null
            },
            createUnbufferedStream: function() {
                return this.streaming = !0, this.stream
            }
        }), n.HttpClient = i({}), n.HttpClient.getInstance = function() {
            return void 0 === this.singleton && (this.singleton = new this), this.singleton
        }
    }, {
        "./core": 38
    }],
    59: [function(e, t, r) {
        var n = e("./core"),
            i = e("./sequential_executor"),
            o = e("./discover_endpoint").discoverEndpoint;
        n.EventListeners = {
            Core: {}
        }, n.EventListeners = {
            Core: (new i).addNamedListeners(function(e, t) {
                t("VALIDATE_CREDENTIALS", "validate", function(e, t) {
                    if (!e.service.api.signatureVersion) return t();
                    e.service.config.getCredentials(function(r) {
                        r && (e.response.error = n.util.error(r, {
                            code: "CredentialsError",
                            message: "Missing credentials in config"
                        })), t()
                    })
                }), e("VALIDATE_REGION", "validate", function(e) {
                    e.service.config.region || e.service.isGlobalEndpoint || (e.response.error = n.util.error(new Error, {
                        code: "ConfigError",
                        message: "Missing region in config"
                    }))
                }), e("BUILD_IDEMPOTENCY_TOKENS", "validate", function(e) {
                    if (e.service.api.operations) {
                        var t = e.service.api.operations[e.operation];
                        if (t) {
                            var r = t.idempotentMembers;
                            if (r.length) {
                                for (var i = n.util.copy(e.params), o = 0, a = r.length; o < a; o++) i[r[o]] || (i[r[o]] = n.util.uuid.v4());
                                e.params = i
                            }
                        }
                    }
                }), e("VALIDATE_PARAMETERS", "validate", function(e) {
                    if (e.service.api.operations) {
                        var t = e.service.api.operations[e.operation].input,
                            r = e.service.config.paramValidation;
                        new n.ParamValidator(r).validate(t, e.params)
                    }
                }), t("COMPUTE_SHA256", "afterBuild", function(e, t) {
                    if (e.haltHandlersOnError(), e.service.api.operations) {
                        var r = e.service.api.operations[e.operation],
                            i = r ? r.authtype : "";
                        if (!e.service.api.signatureVersion && !i) return t();
                        if (e.service.getSignerClass(e) === n.Signers.V4) {
                            var o = e.httpRequest.body || "";
                            if (i.indexOf("unsigned-body") >= 0) return e.httpRequest.headers["X-Amz-Content-Sha256"] = "UNSIGNED-PAYLOAD", t();
                            n.util.computeSha256(o, function(r, n) {
                                r ? t(r) : (e.httpRequest.headers["X-Amz-Content-Sha256"] = n, t())
                            })
                        } else t()
                    }
                }), e("SET_CONTENT_LENGTH", "afterBuild", function(e) {
                    var t = function(e) {
                            if (!e.service.api.operations) return "";
                            var t = e.service.api.operations[e.operation];
                            return t ? t.authtype : ""
                        }(e),
                        r = n.util.getRequestPayloadShape(e);
                    if (void 0 === e.httpRequest.headers["Content-Length"]) try {
                        var i = n.util.string.byteLength(e.httpRequest.body);
                        e.httpRequest.headers["Content-Length"] = i
                    } catch (n) {
                        if (r && r.isStreaming) {
                            if (r.requiresLength) throw n;
                            if (t.indexOf("unsigned-body") >= 0) return void(e.httpRequest.headers["Transfer-Encoding"] = "chunked");
                            throw n
                        }
                        throw n
                    }
                }), e("SET_HTTP_HOST", "afterBuild", function(e) {
                    e.httpRequest.headers.Host = e.httpRequest.endpoint.host
                }), e("RESTART", "restart", function() {
                    var e = this.response.error;
                    e && e.retryable && (this.httpRequest = new n.HttpRequest(this.service.endpoint, this.service.region), this.response.retryCount < this.service.config.maxRetries ? this.response.retryCount++ : this.response.error = null)
                }), t("DISCOVER_ENDPOINT", "sign", o, !0), t("SIGN", "sign", function(e, t) {
                    var r = e.service,
                        n = (e.service.api.operations || {})[e.operation],
                        i = n ? n.authtype : "";
                    if (!r.api.signatureVersion && !i) return t();
                    r.config.getCredentials(function(i, o) {
                        if (i) return e.response.error = i, t();
                        try {
                            var a = r.getSkewCorrectedDate(),
                                s = new(r.getSignerClass(e))(e.httpRequest, r.api.signingName || r.api.endpointPrefix, {
                                    signatureCache: r.config.signatureCache,
                                    operation: n,
                                    signatureVersion: r.api.signatureVersion
                                });
                            s.setServiceClientId(r._clientId), delete e.httpRequest.headers.Authorization, delete e.httpRequest.headers.Date, delete e.httpRequest.headers["X-Amz-Date"], s.addAuthorization(o, a), e.signedAt = a
                        } catch (t) {
                            e.response.error = t
                        }
                        t()
                    })
                }), e("VALIDATE_RESPONSE", "validateResponse", function(e) {
                    this.service.successfulResponse(e, this) ? (e.data = {}, e.error = null) : (e.data = null, e.error = n.util.error(new Error, {
                        code: "UnknownError",
                        message: "An unknown error occurred."
                    }))
                }), t("SEND", "send", function(e, t) {
                    function r(r) {
                        e.httpResponse.stream = r;
                        var i = e.request.httpRequest.stream,
                            o = e.request.service,
                            a = o.api,
                            s = e.request.operation,
                            u = a.operations[s] || {};
                        r.on("headers", function(i, a, s) {
                            if (e.request.emit("httpHeaders", [i, a, e, s]), !e.httpResponse.streaming)
                                if (2 === n.HttpClient.streamsApiVersion) {
                                    if (u.hasEventOutput && o.successfulResponse(e)) return e.request.emit("httpDone"), void t();
                                    r.on("readable", function() {
                                        var t = r.read();
                                        null !== t && e.request.emit("httpData", [t, e])
                                    })
                                } else r.on("data", function(t) {
                                    e.request.emit("httpData", [t, e])
                                })
                        }), r.on("end", function() {
                            if (!i || !i.didCallback) {
                                if (2 === n.HttpClient.streamsApiVersion && u.hasEventOutput && o.successfulResponse(e)) return;
                                e.request.emit("httpDone"), t()
                            }
                        })
                    }

                    function i(r) {
                        if ("RequestAbortedError" !== r.code) {
                            var i = "TimeoutError" === r.code ? r.code : "NetworkingError";
                            r = n.util.error(r, {
                                code: i,
                                region: e.request.httpRequest.region,
                                hostname: e.request.httpRequest.endpoint.hostname,
                                retryable: !0
                            })
                        }
                        e.error = r, e.request.emit("httpError", [e.error, e], function() {
                            t()
                        })
                    }

                    function o() {
                        var t = n.HttpClient.getInstance(),
                            o = e.request.service.config.httpOptions || {};
                        try {
                            ! function(t) {
                                t.on("sendProgress", function(t) {
                                    e.request.emit("httpUploadProgress", [t, e])
                                }), t.on("receiveProgress", function(t) {
                                    e.request.emit("httpDownloadProgress", [t, e])
                                })
                            }(t.handleRequest(e.request.httpRequest, o, r, i))
                        } catch (e) {
                            i(e)
                        }
                    }
                    e.httpResponse._abortCallback = t, e.error = null, e.data = null, (e.request.service.getSkewCorrectedDate() - this.signedAt) / 1e3 >= 600 ? this.emit("sign", [this], function(e) {
                        e ? t(e) : o()
                    }) : o()
                }), e("HTTP_HEADERS", "httpHeaders", function(e, t, r, i) {
                    r.httpResponse.statusCode = e, r.httpResponse.statusMessage = i, r.httpResponse.headers = t, r.httpResponse.body = n.util.buffer.toBuffer(""), r.httpResponse.buffers = [], r.httpResponse.numBytes = 0;
                    var o = t.date || t.Date,
                        a = r.request.service;
                    if (o) {
                        var s = Date.parse(o);
                        a.config.correctClockSkew && a.isClockSkewed(s) && a.applyClockOffset(s)
                    }
                }), e("HTTP_DATA", "httpData", function(e, t) {
                    if (e) {
                        if (n.util.isNode()) {
                            t.httpResponse.numBytes += e.length;
                            var r = t.httpResponse.headers["content-length"],
                                i = {
                                    loaded: t.httpResponse.numBytes,
                                    total: r
                                };
                            t.request.emit("httpDownloadProgress", [i, t])
                        }
                        t.httpResponse.buffers.push(n.util.buffer.toBuffer(e))
                    }
                }), e("HTTP_DONE", "httpDone", function(e) {
                    if (e.httpResponse.buffers && e.httpResponse.buffers.length > 0) {
                        var t = n.util.buffer.concat(e.httpResponse.buffers);
                        e.httpResponse.body = t
                    }
                    delete e.httpResponse.numBytes, delete e.httpResponse.buffers
                }), e("FINALIZE_ERROR", "retry", function(e) {
                    e.httpResponse.statusCode && (e.error.statusCode = e.httpResponse.statusCode, void 0 === e.error.retryable && (e.error.retryable = this.service.retryableError(e.error, this)))
                }), e("INVALIDATE_CREDENTIALS", "retry", function(e) {
                    if (e.error) switch (e.error.code) {
                        case "RequestExpired":
                        case "ExpiredTokenException":
                        case "ExpiredToken":
                            e.error.retryable = !0, e.request.service.config.credentials.expired = !0
                    }
                }), e("EXPIRED_SIGNATURE", "retry", function(e) {
                    var t = e.error;
                    t && "string" == typeof t.code && "string" == typeof t.message && t.code.match(/Signature/) && t.message.match(/expired/) && (e.error.retryable = !0)
                }), e("CLOCK_SKEWED", "retry", function(e) {
                    e.error && this.service.clockSkewError(e.error) && this.service.config.correctClockSkew && (e.error.retryable = !0)
                }), e("REDIRECT", "retry", function(e) {
                    e.error && e.error.statusCode >= 300 && e.error.statusCode < 400 && e.httpResponse.headers.location && (this.httpRequest.endpoint = new n.Endpoint(e.httpResponse.headers.location), this.httpRequest.headers.Host = this.httpRequest.endpoint.host, e.error.redirect = !0, e.error.retryable = !0)
                }), e("RETRY_CHECK", "retry", function(e) {
                    e.error && (e.error.redirect && e.redirectCount < e.maxRedirects ? e.error.retryDelay = 0 : e.retryCount < e.maxRetries && (e.error.retryDelay = this.service.retryDelays(e.retryCount) || 0))
                }), t("RESET_RETRY_STATE", "afterRetry", function(e, t) {
                    var r, n = !1;
                    e.error && (r = e.error.retryDelay || 0, e.error.retryable && e.retryCount < e.maxRetries ? (e.retryCount++, n = !0) : e.error.redirect && e.redirectCount < e.maxRedirects && (e.redirectCount++, n = !0)), n ? (e.error = null, setTimeout(t, r)) : t()
                })
            }),
            CorePost: (new i).addNamedListeners(function(e) {
                e("EXTRACT_REQUEST_ID", "extractData", n.util.extractRequestId), e("EXTRACT_REQUEST_ID", "extractError", n.util.extractRequestId), e("ENOTFOUND_ERROR", "httpError", function(e) {
                    if ("NetworkingError" === e.code && "ENOTFOUND" === e.errno) {
                        var t = "Inaccessible host: `" + e.hostname + "'. This service may not be available in the `" + e.region + "' region.";
                        this.response.error = n.util.error(new Error(t), {
                            code: "UnknownEndpoint",
                            region: e.region,
                            hostname: e.hostname,
                            retryable: !0,
                            originalError: e
                        })
                    }
                })
            }),
            Logger: (new i).addNamedListeners(function(t) {
                t("LOG_REQUEST", "complete", function(t) {
                    var r = t.request,
                        i = r.service.config.logger;
                    if (i) {
                        var o = function() {
                            var o = (t.request.service.getSkewCorrectedDate().getTime() - r.startTime.getTime()) / 1e3,
                                a = !!i.isTTY,
                                s = t.httpResponse.statusCode,
                                u = r.params;
                            r.service.api.operations && r.service.api.operations[r.operation] && r.service.api.operations[r.operation].input && (u = function e(t, r) {
                                if (!r) return r;
                                switch (t.type) {
                                    case "structure":
                                        var i = {};
                                        return n.util.each(r, function(r, n) {
                                            Object.prototype.hasOwnProperty.call(t.members, r) ? i[r] = e(t.members[r], n) : i[r] = n
                                        }), i;
                                    case "list":
                                        var o = [];
                                        return n.util.arrayEach(r, function(r, n) {
                                            o.push(e(t.member, r))
                                        }), o;
                                    case "map":
                                        var a = {};
                                        return n.util.each(r, function(r, n) {
                                            a[r] = e(t.value, n)
                                        }), a;
                                    default:
                                        return t.isSensitive ? "***SensitiveInformation***" : r
                                }
                            }(r.service.api.operations[r.operation].input, r.params));
                            var c = e("util").inspect(u, !0, null),
                                l = "";
                            return a && (l += "[33m"), l += "[AWS " + r.service.serviceIdentifier + " " + s, l += " " + o.toString() + "s " + t.retryCount + " retries]", a && (l += "[0;1m"), l += " " + n.util.string.lowerFirst(r.operation), l += "(" + c + ")", a && (l += "[0m"), l
                        }();
                        "function" == typeof i.log ? i.log(o) : "function" == typeof i.write && i.write(o + "\n")
                    }
                })
            }),
            Json: (new i).addNamedListeners(function(t) {
                var r = e("./protocol/json");
                t("BUILD", "build", r.buildRequest), t("EXTRACT_DATA", "extractData", r.extractData), t("EXTRACT_ERROR", "extractError", r.extractError)
            }),
            Rest: (new i).addNamedListeners(function(t) {
                var r = e("./protocol/rest");
                t("BUILD", "build", r.buildRequest), t("EXTRACT_DATA", "extractData", r.extractData), t("EXTRACT_ERROR", "extractError", r.extractError)
            }),
            RestJson: (new i).addNamedListeners(function(t) {
                var r = e("./protocol/rest_json");
                t("BUILD", "build", r.buildRequest), t("EXTRACT_DATA", "extractData", r.extractData), t("EXTRACT_ERROR", "extractError", r.extractError)
            }),
            RestXml: (new i).addNamedListeners(function(t) {
                var r = e("./protocol/rest_xml");
                t("BUILD", "build", r.buildRequest), t("EXTRACT_DATA", "extractData", r.extractData), t("EXTRACT_ERROR", "extractError", r.extractError)
            }),
            Query: (new i).addNamedListeners(function(t) {
                var r = e("./protocol/query");
                t("BUILD", "build", r.buildRequest), t("EXTRACT_DATA", "extractData", r.extractData), t("EXTRACT_ERROR", "extractError", r.extractError)
            })
        }
    }, {
        "./core": 38,
        "./discover_endpoint": 46,
        "./protocol/json": 73,
        "./protocol/query": 74,
        "./protocol/rest": 75,
        "./protocol/rest_json": 76,
        "./protocol/rest_xml": 77,
        "./sequential_executor": 87,
        util: 20
    }],
    87: [function(e, t, r) {
        var n = e("./core");
        n.SequentialExecutor = n.util.inherit({
            constructor: function() {
                this._events = {}
            },
            listeners: function(e) {
                return this._events[e] ? this._events[e].slice(0) : []
            },
            on: function(e, t, r) {
                return this._events[e] ? r ? this._events[e].unshift(t) : this._events[e].push(t) : this._events[e] = [t], this
            },
            onAsync: function(e, t, r) {
                return t._isAsync = !0, this.on(e, t, r)
            },
            removeListener: function(e, t) {
                var r = this._events[e];
                if (r) {
                    for (var n = r.length, i = -1, o = 0; o < n; ++o) r[o] === t && (i = o);
                    i > -1 && r.splice(i, 1)
                }
                return this
            },
            removeAllListeners: function(e) {
                return e ? delete this._events[e] : this._events = {}, this
            },
            emit: function(e, t, r) {
                r || (r = function() {});
                var n = this.listeners(e),
                    i = n.length;
                return this.callListeners(n, t, r), i > 0
            },
            callListeners: function(e, t, r, i) {
                function o(i) {
                    if (i && (s = n.util.error(s || new Error, i), a._haltHandlersOnError)) return r.call(a, s);
                    a.callListeners(e, t, r, s)
                }
                for (var a = this, s = i || null; e.length > 0;) {
                    var u = e.shift();
                    if (u._isAsync) return void u.apply(a, t.concat([o]));
                    try {
                        u.apply(a, t)
                    } catch (e) {
                        s = n.util.error(s || new Error, e)
                    }
                    if (s && a._haltHandlersOnError) return void r.call(a, s)
                }
                r.call(a, s)
            },
            addListeners: function(e) {
                var t = this;
                return e._events && (e = e._events), n.util.each(e, function(e, r) {
                    "function" == typeof r && (r = [r]), n.util.arrayEach(r, function(r) {
                        t.on(e, r)
                    })
                }), t
            },
            addNamedListener: function(e, t, r, n) {
                return this[e] = r, this.addListener(t, r, n), this
            },
            addNamedAsyncListener: function(e, t, r, n) {
                return r._isAsync = !0, this.addNamedListener(e, t, r, n)
            },
            addNamedListeners: function(e) {
                var t = this;
                return e(function() {
                    t.addNamedListener.apply(t, arguments)
                }, function() {
                    t.addNamedAsyncListener.apply(t, arguments)
                }), this
            }
        }), n.SequentialExecutor.prototype.addListener = n.SequentialExecutor.prototype.on, t.exports = n.SequentialExecutor
    }, {
        "./core": 38
    }],
    77: [function(e, t, r) {
        var n = e("../core"),
            i = e("../util"),
            o = e("./rest");
        t.exports = {
            buildRequest: function(e) {
                o.buildRequest(e), ["GET", "HEAD"].indexOf(e.httpRequest.method) < 0 && function(e) {
                    var t = e.service.api.operations[e.operation].input,
                        r = new n.XML.Builder,
                        o = e.params,
                        a = t.payload;
                    if (a) {
                        var s = t.members[a];
                        if (void 0 === (o = o[a])) return;
                        if ("structure" === s.type) {
                            var u = s.name;
                            e.httpRequest.body = r.toXML(o, s, u, !0)
                        } else e.httpRequest.body = o
                    } else e.httpRequest.body = r.toXML(o, t, t.name || t.shape || i.string.upperFirst(e.operation) + "Request")
                }(e)
            },
            extractError: function(e) {
                var t;
                o.extractError(e);
                try {
                    t = (new n.XML.Parser).parse(e.httpResponse.body.toString())
                } catch (r) {
                    t = {
                        Code: e.httpResponse.statusCode,
                        Message: e.httpResponse.statusMessage
                    }
                }
                t.Errors && (t = t.Errors), t.Error && (t = t.Error), t.Code ? e.error = i.error(new Error, {
                    code: t.Code,
                    message: t.Message
                }) : e.error = i.error(new Error, {
                    code: e.httpResponse.statusCode,
                    message: null
                })
            },
            extractData: function(e) {
                o.extractData(e);
                var t, r = e.request,
                    a = e.httpResponse.body,
                    s = r.service.api.operations[r.operation],
                    u = s.output,
                    c = (s.hasEventOutput, u.payload);
                if (c) {
                    var l = u.members[c];
                    l.isEventStream ? (t = new n.XML.Parser, e.data[c] = i.createEventStream(2 === n.HttpClient.streamsApiVersion ? e.httpResponse.stream : e.httpResponse.body, t, l)) : "structure" === l.type ? (t = new n.XML.Parser, e.data[c] = t.parse(a.toString(), l)) : "binary" === l.type || l.isStreaming ? e.data[c] = a : e.data[c] = l.toType(a)
                } else if (a.length > 0) {
                    var d = (t = new n.XML.Parser).parse(a.toString(), u);
                    i.update(e.data, d)
                }
            }
        }
    }, {
        "../core": 38,
        "../util": 116,
        "./rest": 75
    }],
    76: [function(e, t, r) {
        function n(e, t) {
            if (e.service.api.operations[e.operation].input, !e.httpRequest.headers["Content-Type"]) {
                var r = t ? "binary/octet-stream" : "application/json";
                e.httpRequest.headers["Content-Type"] = r
            }
        }
        var i = e("../util"),
            o = e("./rest"),
            a = e("./json"),
            s = e("../json/builder"),
            u = e("../json/parser");
        t.exports = {
            buildRequest: function(e) {
                o.buildRequest(e), ["HEAD", "DELETE"].indexOf(e.httpRequest.method) < 0 && function(e) {
                    var t = new s,
                        r = e.service.api.operations[e.operation].input;
                    if (r.payload) {
                        var i, o = r.members[r.payload];
                        if (void 0 === (i = e.params[r.payload])) return;
                        "structure" === o.type ? (e.httpRequest.body = t.build(i, o), n(e)) : (e.httpRequest.body = i, ("binary" === o.type || o.isStreaming) && n(e, !0))
                    } else {
                        var a = t.build(e.params, r);
                        "{}" === a && "GET" === e.httpRequest.method || (e.httpRequest.body = a), n(e)
                    }
                }(e)
            },
            extractError: function(e) {
                a.extractError(e)
            },
            extractData: function(e) {
                o.extractData(e);
                var t = e.request,
                    r = t.service.api.operations[t.operation],
                    n = t.service.api.operations[t.operation].output || {};
                if (r.hasEventOutput, n.payload) {
                    var s = n.members[n.payload],
                        c = e.httpResponse.body;
                    if (s.isEventStream) l = new u, e.data[payload] = i.createEventStream(2 === AWS.HttpClient.streamsApiVersion ? e.httpResponse.stream : c, l, s);
                    else if ("structure" === s.type || "list" === s.type) {
                        var l = new u;
                        e.data[n.payload] = l.parse(c, s)
                    } else "binary" === s.type || s.isStreaming ? e.data[n.payload] = c : e.data[n.payload] = s.toType(c)
                } else {
                    var d = e.data;
                    a.extractData(e), e.data = i.merge(d, e.data)
                }
            }
        }
    }, {
        "../json/builder": 62,
        "../json/parser": 63,
        "../util": 116,
        "./json": 73,
        "./rest": 75
    }],
    75: [function(e, t, r) {
        function n(e, t, r, n) {
            var o = [e, t].join("/");
            o = o.replace(/\/+/g, "/");
            var a = {},
                s = !1;
            if (i.each(r.members, function(e, t) {
                    var r = n[e];
                    if (null !== r && void 0 !== r)
                        if ("uri" === t.location) {
                            var u = new RegExp("\\{" + t.name + "(\\+)?\\}");
                            o = o.replace(u, function(e, t) {
                                return (t ? i.uriEscapePath : i.uriEscape)(String(r))
                            })
                        } else "querystring" === t.location && (s = !0, "list" === t.type ? a[t.name] = r.map(function(e) {
                            return i.uriEscape(t.member.toWireFormat(e).toString())
                        }) : "map" === t.type ? i.each(r, function(e, t) {
                            Array.isArray(t) ? a[e] = t.map(function(e) {
                                return i.uriEscape(String(e))
                            }) : a[e] = i.uriEscape(String(t))
                        }) : a[t.name] = i.uriEscape(t.toWireFormat(r).toString()))
                }), s) {
                o += o.indexOf("?") >= 0 ? "&" : "?";
                var u = [];
                i.arrayEach(Object.keys(a).sort(), function(e) {
                    Array.isArray(a[e]) || (a[e] = [a[e]]);
                    for (var t = 0; t < a[e].length; t++) u.push(i.uriEscape(String(e)) + "=" + a[e][t])
                }), o += u.join("&")
            }
            return o
        }
        var i = e("../util"),
            o = e("./helpers").populateHostPrefix;
        t.exports = {
            buildRequest: function(e) {
                (function(e) {
                    e.httpRequest.method = e.service.api.operations[e.operation].httpMethod
                })(e),
                function(e) {
                    var t = e.service.api.operations[e.operation],
                        r = t.input,
                        i = n(e.httpRequest.endpoint.path, t.httpPath, r, e.params);
                    e.httpRequest.path = i
                }(e),
                function(e) {
                    var t = e.service.api.operations[e.operation];
                    i.each(t.input.members, function(t, r) {
                        var n = e.params[t];
                        null !== n && void 0 !== n && ("headers" === r.location && "map" === r.type ? i.each(n, function(t, n) {
                            e.httpRequest.headers[r.name + t] = n
                        }) : "header" === r.location && (n = r.toWireFormat(n).toString(), r.isJsonValue && (n = i.base64.encode(n)), e.httpRequest.headers[r.name] = n))
                    })
                }(e), o(e)
            },
            extractError: function() {},
            extractData: function(e) {
                var t = e.request,
                    r = {},
                    n = e.httpResponse,
                    o = t.service.api.operations[t.operation].output,
                    a = {};
                i.each(n.headers, function(e, t) {
                    a[e.toLowerCase()] = t
                }), i.each(o.members, function(e, t) {
                    var o = (t.name || e).toLowerCase();
                    if ("headers" === t.location && "map" === t.type) {
                        r[e] = {};
                        var s = t.isLocationName ? t.name : "",
                            u = new RegExp("^" + s + "(.+)", "i");
                        i.each(n.headers, function(t, n) {
                            var i = t.match(u);
                            null !== i && (r[e][i[1]] = n)
                        })
                    } else if ("header" === t.location) {
                        if (void 0 !== a[o]) {
                            var c = t.isJsonValue ? i.base64.decode(a[o]) : a[o];
                            r[e] = t.toType(c)
                        }
                    } else "statusCode" === t.location && (r[e] = parseInt(n.statusCode, 10))
                }), e.data = r
            },
            generateURI: n
        }
    }, {
        "../util": 116,
        "./helpers": 72
    }],
    74: [function(e, t, r) {
        var n = e("../core"),
            i = e("../util"),
            o = e("../query/query_param_serializer"),
            a = e("../model/shape"),
            s = e("./helpers").populateHostPrefix;
        t.exports = {
            buildRequest: function(e) {
                var t = e.service.api.operations[e.operation],
                    r = e.httpRequest;
                r.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8", r.params = {
                    Version: e.service.api.apiVersion,
                    Action: t.name
                }, (new o).serialize(e.params, t.input, function(e, t) {
                    r.params[e] = t
                }), r.body = i.queryParamsToString(r.params), s(e)
            },
            extractError: function(e) {
                var t, r = e.httpResponse.body.toString();
                if (r.match("<UnknownOperationException")) t = {
                    Code: "UnknownOperation",
                    Message: "Unknown operation " + e.request.operation
                };
                else try {
                    t = (new n.XML.Parser).parse(r)
                } catch (r) {
                    t = {
                        Code: e.httpResponse.statusCode,
                        Message: e.httpResponse.statusMessage
                    }
                }
                t.requestId && !e.requestId && (e.requestId = t.requestId), t.Errors && (t = t.Errors), t.Error && (t = t.Error), t.Code ? e.error = i.error(new Error, {
                    code: t.Code,
                    message: t.Message
                }) : e.error = i.error(new Error, {
                    code: e.httpResponse.statusCode,
                    message: null
                })
            },
            extractData: function(e) {
                var t = e.request,
                    r = t.service.api.operations[t.operation].output || {},
                    o = r;
                if (o.resultWrapper) {
                    var s = a.create({
                        type: "structure"
                    });
                    s.members[o.resultWrapper] = r, s.memberNames = [o.resultWrapper], i.property(r, "name", r.resultWrapper), r = s
                }
                var u = new n.XML.Parser;
                if (r && r.members && !r.members._XAMZRequestId) {
                    var c = a.create({
                        type: "string"
                    }, {
                        api: {
                            protocol: "query"
                        }
                    }, "requestId");
                    r.members._XAMZRequestId = c
                }
                var l = u.parse(e.httpResponse.body.toString(), r);
                e.requestId = l._XAMZRequestId || l.requestId, l._XAMZRequestId && delete l._XAMZRequestId, o.resultWrapper && l[o.resultWrapper] && (i.update(l, l[o.resultWrapper]), delete l[o.resultWrapper]), e.data = l
            }
        }
    }, {
        "../core": 38,
        "../model/shape": 69,
        "../query/query_param_serializer": 78,
        "../util": 116,
        "./helpers": 72
    }],
    78: [function(e, t, r) {
        function n() {}

        function i(e) {
            return e.isQueryName || "ec2" !== e.api.protocol ? e.name : e.name[0].toUpperCase() + e.name.substr(1)
        }

        function o(e, t, r, n) {
            s.each(r.members, function(r, o) {
                var s = t[r];
                if (null !== s && void 0 !== s) {
                    var u = i(o);
                    a(u = e ? e + "." + u : u, s, o, n)
                }
            })
        }

        function a(e, t, r, n) {
            null !== t && void 0 !== t && ("structure" === r.type ? o(e, t, r, n) : "list" === r.type ? function(e, t, r, n) {
                var o = r.member || {};
                0 !== t.length ? s.arrayEach(t, function(t, s) {
                    var u = "." + (s + 1);
                    if ("ec2" === r.api.protocol) u += "";
                    else if (r.flattened) {
                        if (o.name) {
                            var c = e.split(".");
                            c.pop(), c.push(i(o)), e = c.join(".")
                        }
                    } else u = "." + (o.name ? o.name : "member") + u;
                    a(e + u, t, o, n)
                }) : n.call(this, e, null)
            }(e, t, r, n) : "map" === r.type ? function(e, t, r, n) {
                var i = 1;
                s.each(t, function(t, o) {
                    var s = (r.flattened ? "." : ".entry.") + i++ + ".",
                        u = s + (r.key.name || "key"),
                        c = s + (r.value.name || "value");
                    a(e + u, t, r.key, n), a(e + c, o, r.value, n)
                })
            }(e, t, r, n) : n(e, r.toWireFormat(t).toString()))
        }
        var s = e("../util");
        n.prototype.serialize = function(e, t, r) {
            o("", e, t, r)
        }, t.exports = n
    }, {
        "../util": 116
    }],
    69: [function(e, t, r) {
        function n(e, t, r) {
            null !== r && void 0 !== r && f.property.apply(this, arguments)
        }

        function i(e, t) {
            e.constructor.prototype[t] || f.memoizedProperty.apply(this, arguments)
        }

        function o(e, t, r) {
            t = t || {}, n(this, "shape", e.shape), n(this, "api", t.api, !1), n(this, "type", e.type), n(this, "enum", e.enum), n(this, "min", e.min), n(this, "max", e.max), n(this, "pattern", e.pattern), n(this, "location", e.location || this.location || "body"), n(this, "name", this.name || e.xmlName || e.queryName || e.locationName || r), n(this, "isStreaming", e.streaming || this.isStreaming || !1), n(this, "requiresLength", e.requiresLength, !1), n(this, "isComposite", e.isComposite || !1), n(this, "isShape", !0, !1), n(this, "isQueryName", Boolean(e.queryName), !1), n(this, "isLocationName", Boolean(e.locationName), !1), n(this, "isIdempotent", !0 === e.idempotencyToken), n(this, "isJsonValue", !0 === e.jsonvalue), n(this, "isSensitive", !0 === e.sensitive || e.prototype && !0 === e.prototype.sensitive), n(this, "isEventStream", Boolean(e.eventstream), !1), n(this, "isEvent", Boolean(e.event), !1), n(this, "isEventPayload", Boolean(e.eventpayload), !1), n(this, "isEventHeader", Boolean(e.eventheader), !1), n(this, "isTimestampFormatSet", Boolean(e.timestampFormat) || e.prototype && !0 === e.prototype.isTimestampFormatSet, !1), n(this, "endpointDiscoveryId", Boolean(e.endpointdiscoveryid), !1), n(this, "hostLabel", Boolean(e.hostLabel), !1), t.documentation && (n(this, "documentation", e.documentation), n(this, "documentationUrl", e.documentationUrl)), e.xmlAttribute && n(this, "isXmlAttribute", e.xmlAttribute || !1), n(this, "defaultValue", null), this.toWireFormat = function(e) {
                return null === e || void 0 === e ? "" : e
            }, this.toType = function(e) {
                return e
            }
        }

        function a(e) {
            o.apply(this, arguments), n(this, "isComposite", !0), e.flattened && n(this, "flattened", e.flattened || !1)
        }

        function s(e, t) {
            var r = this,
                s = null,
                u = !this.isShape;
            a.apply(this, arguments), u && (n(this, "defaultValue", function() {
                return {}
            }), n(this, "members", {}), n(this, "memberNames", []), n(this, "required", []), n(this, "isRequired", function() {
                return !1
            })), e.members && (n(this, "members", new m(e.members, t, function(e, r) {
                return o.create(r, t, e)
            })), i(this, "memberNames", function() {
                return e.xmlOrder || Object.keys(e.members)
            }), e.event && (i(this, "eventPayloadMemberName", function() {
                for (var e = r.members, t = r.memberNames, n = 0, i = t.length; n < i; n++)
                    if (e[t[n]].isEventPayload) return t[n]
            }), i(this, "eventHeaderMemberNames", function() {
                for (var e = r.members, t = r.memberNames, n = [], i = 0, o = t.length; i < o; i++) e[t[i]].isEventHeader && n.push(t[i]);
                return n
            }))), e.required && (n(this, "required", e.required), n(this, "isRequired", function(t) {
                if (!s) {
                    s = {};
                    for (var r = 0; r < e.required.length; r++) s[e.required[r]] = !0
                }
                return s[t]
            }, !1, !0)), n(this, "resultWrapper", e.resultWrapper || null), e.payload && n(this, "payload", e.payload), "string" == typeof e.xmlNamespace ? n(this, "xmlNamespaceUri", e.xmlNamespace) : "object" == typeof e.xmlNamespace && (n(this, "xmlNamespacePrefix", e.xmlNamespace.prefix), n(this, "xmlNamespaceUri", e.xmlNamespace.uri))
        }

        function u(e, t) {
            var r = this,
                s = !this.isShape;
            if (a.apply(this, arguments), s && n(this, "defaultValue", function() {
                    return []
                }), e.member && i(this, "member", function() {
                    return o.create(e.member, t)
                }), this.flattened) {
                var u = this.name;
                i(this, "name", function() {
                    return r.member.name || u
                })
            }
        }

        function c(e, t) {
            var r = !this.isShape;
            a.apply(this, arguments), r && (n(this, "defaultValue", function() {
                return {}
            }), n(this, "key", o.create({
                type: "string"
            }, t)), n(this, "value", o.create({
                type: "string"
            }, t))), e.key && i(this, "key", function() {
                return o.create(e.key, t)
            }), e.value && i(this, "value", function() {
                return o.create(e.value, t)
            })
        }

        function l() {
            o.apply(this, arguments);
            var e = ["rest-xml", "query", "ec2"];
            this.toType = function(t) {
                return t = this.api && e.indexOf(this.api.protocol) > -1 ? t || "" : t, this.isJsonValue ? JSON.parse(t) : t && "function" == typeof t.toString ? t.toString() : t
            }, this.toWireFormat = function(e) {
                return this.isJsonValue ? JSON.stringify(e) : e
            }
        }

        function d() {
            o.apply(this, arguments), this.toType = function(e) {
                var t = f.base64.decode(e);
                if (this.isSensitive && f.isNode() && "function" == typeof f.Buffer.alloc) {
                    var r = f.Buffer.alloc(t.length, t);
                    t.fill(0), t = r
                }
                return t
            }, this.toWireFormat = f.base64.encode
        }

        function p() {
            d.apply(this, arguments)
        }

        function h() {
            o.apply(this, arguments), this.toType = function(e) {
                return "boolean" == typeof e ? e : null === e || void 0 === e ? null : "true" === e
            }
        }
        var m = e("./collection"),
            f = e("../util");
        o.normalizedTypes = {
            character: "string",
            double: "float",
            long: "integer",
            short: "integer",
            biginteger: "integer",
            bigdecimal: "float",
            blob: "binary"
        }, o.types = {
            structure: s,
            list: u,
            map: c,
            boolean: h,
            timestamp: function(e) {
                var t = this;
                if (o.apply(this, arguments), e.timestampFormat) n(this, "timestampFormat", e.timestampFormat);
                else if (t.isTimestampFormatSet && this.timestampFormat) n(this, "timestampFormat", this.timestampFormat);
                else if ("header" === this.location) n(this, "timestampFormat", "rfc822");
                else if ("querystring" === this.location) n(this, "timestampFormat", "iso8601");
                else if (this.api) switch (this.api.protocol) {
                    case "json":
                    case "rest-json":
                        n(this, "timestampFormat", "unixTimestamp");
                        break;
                    case "rest-xml":
                    case "query":
                    case "ec2":
                        n(this, "timestampFormat", "iso8601")
                }
                this.toType = function(e) {
                    return null === e || void 0 === e ? null : "function" == typeof e.toUTCString ? e : "string" == typeof e || "number" == typeof e ? f.date.parseTimestamp(e) : null
                }, this.toWireFormat = function(e) {
                    return f.date.format(e, t.timestampFormat)
                }
            },
            float: function() {
                o.apply(this, arguments), this.toType = function(e) {
                    return null === e || void 0 === e ? null : parseFloat(e)
                }, this.toWireFormat = this.toType
            },
            integer: function() {
                o.apply(this, arguments), this.toType = function(e) {
                    return null === e || void 0 === e ? null : parseInt(e, 10)
                }, this.toWireFormat = this.toType
            },
            string: l,
            base64: p,
            binary: d
        }, o.resolve = function(e, t) {
            if (e.shape) {
                var r = t.api.shapes[e.shape];
                if (!r) throw new Error("Cannot find shape reference: " + e.shape);
                return r
            }
            return null
        }, o.create = function(e, t, r) {
            if (e.isShape) return e;
            var n = o.resolve(e, t);
            if (n) {
                var i = Object.keys(e);
                t.documentation || (i = i.filter(function(e) {
                    return !e.match(/documentation/)
                }));
                var a = function() {
                    n.constructor.call(this, e, t, r)
                };
                return a.prototype = n, new a
            }
            e.type || (e.members ? e.type = "structure" : e.member ? e.type = "list" : e.key ? e.type = "map" : e.type = "string");
            var s = e.type;
            if (o.normalizedTypes[e.type] && (e.type = o.normalizedTypes[e.type]), o.types[e.type]) return new o.types[e.type](e, t, r);
            throw new Error("Unrecognized shape type: " + s)
        }, o.shapes = {
            StructureShape: s,
            ListShape: u,
            MapShape: c,
            StringShape: l,
            BooleanShape: h,
            Base64Shape: p
        }, t.exports = o
    }, {
        "../util": 116,
        "./collection": 65
    }],
    65: [function(e, t, r) {
        function n(e, t, r, n) {
            i(this, n(e), function() {
                return r(e, t)
            })
        }
        var i = e("../util").memoizedProperty;
        t.exports = function(e, t, r, i, o) {
            for (var a in i = i || String, e) Object.prototype.hasOwnProperty.call(e, a) && (n.call(this, a, e[a], r, i), o && o(a, e[a]))
        }
    }, {
        "../util": 116
    }],
    73: [function(e, t, r) {
        var n = e("../util"),
            i = e("../json/builder"),
            o = e("../json/parser"),
            a = e("./helpers").populateHostPrefix;
        t.exports = {
            buildRequest: function(e) {
                var t = e.httpRequest,
                    r = e.service.api,
                    n = r.targetPrefix + "." + r.operations[e.operation].name,
                    o = r.jsonVersion || "1.0",
                    s = r.operations[e.operation].input,
                    u = new i;
                1 === o && (o = "1.0"), t.body = u.build(e.params || {}, s), t.headers["Content-Type"] = "application/x-amz-json-" + o, t.headers["X-Amz-Target"] = n, a(e)
            },
            extractError: function(e) {
                var t = {},
                    r = e.httpResponse;
                if (t.code = r.headers["x-amzn-errortype"] || "UnknownError", "string" == typeof t.code && (t.code = t.code.split(":")[0]), r.body.length > 0) try {
                    var i = JSON.parse(r.body.toString());
                    (i.__type || i.code) && (t.code = (i.__type || i.code).split("#").pop()), "RequestEntityTooLarge" === t.code ? t.message = "Request body must be less than 1 MB" : t.message = i.message || i.Message || null
                } catch (i) {
                    t.statusCode = r.statusCode, t.message = r.statusMessage
                } else t.statusCode = r.statusCode, t.message = r.statusCode.toString();
                e.error = n.error(new Error, t)
            },
            extractData: function(e) {
                var t = e.httpResponse.body.toString() || "{}";
                if (!1 === e.request.service.config.convertResponseTypes) e.data = JSON.parse(t);
                else {
                    var r = e.request.service.api.operations[e.request.operation].output || {},
                        n = new o;
                    e.data = n.parse(t, r)
                }
            }
        }
    }, {
        "../json/builder": 62,
        "../json/parser": 63,
        "../util": 116,
        "./helpers": 72
    }],
    72: [function(e, t, r) {
        var n = e("../util"),
            i = e("../core");
        t.exports = {
            populateHostPrefix: function(e) {
                if (!e.service.config.hostPrefixEnabled) return e;
                var t = e.service.api.operations[e.operation];
                if (function(e) {
                        var t = e.service.api,
                            r = t.operations[e.operation],
                            i = t.endpointOperation && t.endpointOperation === n.string.lowerFirst(r.name);
                        return "NULL" !== r.endpointDiscoveryRequired || !0 === i
                    }(e)) return e;
                if (t.endpoint && t.endpoint.hostPrefix) {
                    var r = function(e, t, r) {
                        return n.each(r.members, function(r, i) {
                            if (!0 === i.hostLabel) {
                                if ("string" != typeof t[r] || "" === t[r]) throw n.error(new Error, {
                                    message: "Parameter " + r + " should be a non-empty string.",
                                    code: "InvalidParameter"
                                });
                                var o = new RegExp("\\{" + r + "\\}", "g");
                                e = e.replace(o, t[r])
                            }
                        }), e
                    }(t.endpoint.hostPrefix, e.params, t.input);
                    (function(e, t) {
                        e.host && (e.host = t + e.host), e.hostname && (e.hostname = t + e.hostname)
                    })(e.httpRequest.endpoint, r),
                    function(e) {
                        var t = e.split("."),
                            r = /^[a-zA-Z0-9]{1}$|^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]$/;
                        n.arrayEach(t, function(e) {
                            if (!e.length || e.length < 1 || e.length > 63) throw n.error(new Error, {
                                code: "ValidationError",
                                message: "Hostname label length should be between 1 to 63 characters, inclusive."
                            });
                            if (!r.test(e)) throw i.util.error(new Error, {
                                code: "ValidationError",
                                message: e + " is not hostname compatible."
                            })
                        })
                    }(e.httpRequest.endpoint.hostname)
                }
                return e
            }
        }
    }, {
        "../core": 38,
        "../util": 116
    }],
    63: [function(e, t, r) {
        function n() {}

        function i(e, t) {
            if (t && void 0 !== e) switch (t.type) {
                case "structure":
                    return function(e, t) {
                        if (null != e) {
                            var r = {},
                                n = t.members;
                            return o.each(n, function(t, n) {
                                var o = n.isLocationName ? n.name : t;
                                if (Object.prototype.hasOwnProperty.call(e, o)) {
                                    var a = e[o],
                                        s = i(a, n);
                                    void 0 !== s && (r[t] = s)
                                }
                            }), r
                        }
                    }(e, t);
                case "map":
                    return function(e, t) {
                        if (null != e) {
                            var r = {};
                            return o.each(e, function(e, n) {
                                var o = i(n, t.value);
                                r[e] = void 0 === o ? null : o
                            }), r
                        }
                    }(e, t);
                case "list":
                    return function(e, t) {
                        if (null != e) {
                            var r = [];
                            return o.arrayEach(e, function(e) {
                                var n = i(e, t.member);
                                void 0 === n ? r.push(null) : r.push(n)
                            }), r
                        }
                    }(e, t);
                default:
                    return function(e, t) {
                        return t.toType(e)
                    }(e, t)
            }
        }
        var o = e("../util");
        n.prototype.parse = function(e, t) {
            return i(JSON.parse(e), t)
        }, t.exports = n
    }, {
        "../util": 116
    }],
    62: [function(e, t, r) {
        function n() {}

        function i(e, t) {
            if (t && void 0 !== e && null !== e) switch (t.type) {
                case "structure":
                    return function(e, t) {
                        var r = {};
                        return o.each(e, function(e, n) {
                            var o = t.members[e];
                            if (o) {
                                if ("body" !== o.location) return;
                                var a = o.isLocationName ? o.name : e,
                                    s = i(n, o);
                                void 0 !== s && (r[a] = s)
                            }
                        }), r
                    }(e, t);
                case "map":
                    return function(e, t) {
                        var r = {};
                        return o.each(e, function(e, n) {
                            var o = i(n, t.value);
                            void 0 !== o && (r[e] = o)
                        }), r
                    }(e, t);
                case "list":
                    return function(e, t) {
                        var r = [];
                        return o.arrayEach(e, function(e) {
                            var n = i(e, t.member);
                            void 0 !== n && r.push(n)
                        }), r
                    }(e, t);
                default:
                    return function(e, t) {
                        return t.toWireFormat(e)
                    }(e, t)
            }
        }
        var o = e("../util");
        n.prototype.build = function(e, t) {
            return JSON.stringify(i(e, t))
        }, t.exports = n
    }, {
        "../util": 116
    }],
    46: [function(e, t, r) {
        (function(r) {
            function n(e) {
                var t = e.service,
                    r = t.api || {},
                    n = {};
                return t.config.region && (n.region = t.config.region), r.serviceId && (n.serviceId = r.serviceId), t.config.credentials.accessKeyId && (n.accessKeyId = t.config.credentials.accessKeyId), n
            }

            function i(e, t) {
                var r = {};
                return function e(t, r, n) {
                    n && void 0 !== r && null !== r && "structure" === n.type && n.required && n.required.length > 0 && p.arrayEach(n.required, function(i) {
                        var o = n.members[i];
                        if (!0 === o.endpointDiscoveryId) {
                            var a = o.isLocationName ? o.name : i;
                            t[a] = String(r[i])
                        } else e(t, r[i], o)
                    })
                }(r, e.params, t), r
            }

            function o(e) {
                var t = e.service,
                    r = t.api,
                    o = r.operations ? r.operations[e.operation] : void 0,
                    a = i(e, o ? o.input : void 0),
                    u = n(e);
                Object.keys(a).length > 0 && (u = p.update(u, a), o && (u.operation = o.name));
                var c = d.endpointCache.get(u);
                if (!c || 1 !== c.length || "" !== c[0].Address)
                    if (c && c.length > 0) e.httpRequest.updateEndpoint(c[0].Address);
                    else {
                        var l = t.makeRequest(r.endpointOperation, {
                            Operation: o.name,
                            Identifiers: a
                        });
                        s(l), l.removeListener("validate", d.EventListeners.Core.VALIDATE_PARAMETERS), l.removeListener("retry", d.EventListeners.Core.RETRY_CHECK), d.endpointCache.put(u, [{
                            Address: "",
                            CachePeriodInMinutes: 1
                        }]), l.send(function(e, t) {
                            t && t.Endpoints ? d.endpointCache.put(u, t.Endpoints) : e && d.endpointCache.put(u, [{
                                Address: "",
                                CachePeriodInMinutes: 1
                            }])
                        })
                    }
            }

            function a(e, t) {
                var r = e.service,
                    o = r.api,
                    a = o.operations ? o.operations[e.operation] : void 0,
                    u = a ? a.input : void 0,
                    c = i(e, u),
                    l = n(e);
                Object.keys(c).length > 0 && (l = p.update(l, c), a && (l.operation = a.name));
                var h = d.EndpointCache.getKeyString(l),
                    f = d.endpointCache.get(h);
                if (f && 1 === f.length && "" === f[0].Address) return m[h] || (m[h] = []), void m[h].push({
                    request: e,
                    callback: t
                });
                if (f && f.length > 0) e.httpRequest.updateEndpoint(f[0].Address), t();
                else {
                    var g = r.makeRequest(o.endpointOperation, {
                        Operation: a.name,
                        Identifiers: c
                    });
                    g.removeListener("validate", d.EventListeners.Core.VALIDATE_PARAMETERS), s(g), d.endpointCache.put(h, [{
                        Address: "",
                        CachePeriodInMinutes: 60
                    }]), g.send(function(r, n) {
                        if (r) {
                            var i = {
                                code: "EndpointDiscoveryException",
                                message: "Request cannot be fulfilled without specifying an endpoint",
                                retryable: !1
                            };
                            if (e.response.error = p.error(r, i), d.endpointCache.remove(l), m[h]) {
                                var o = m[h];
                                p.arrayEach(o, function(e) {
                                    e.request.response.error = p.error(r, i), e.callback()
                                }), delete m[h]
                            }
                        } else if (n && (d.endpointCache.put(h, n.Endpoints), e.httpRequest.updateEndpoint(n.Endpoints[0].Address), m[h])) {
                            o = m[h];
                            p.arrayEach(o, function(e) {
                                e.request.httpRequest.updateEndpoint(n.Endpoints[0].Address), e.callback()
                            }), delete m[h]
                        }
                        t()
                    })
                }
            }

            function s(e) {
                var t = e.service.api.apiVersion;
                t && !e.httpRequest.headers["x-amz-api-version"] && (e.httpRequest.headers["x-amz-api-version"] = t)
            }

            function u(e) {
                var t = e.error,
                    r = e.httpResponse;
                if (t && ("InvalidEndpointException" === t.code || 421 === r.statusCode)) {
                    var o = e.request,
                        a = o.service.api.operations || {},
                        s = i(o, a[o.operation] ? a[o.operation].input : void 0),
                        u = n(o);
                    Object.keys(s).length > 0 && (u = p.update(u, s), a[o.operation] && (u.operation = a[o.operation].name)), d.endpointCache.remove(u)
                }
            }

            function c(e) {
                return ["false", "0"].indexOf(e) >= 0
            }

            function l(e) {
                if (!0 === (e.service || {}).config.endpointDiscoveryEnabled) return !0;
                if (p.isBrowser()) return !1;
                for (var t = 0; t < h.length; t++) {
                    var n = h[t];
                    if (Object.prototype.hasOwnProperty.call(r.env, n)) {
                        if ("" === r.env[n] || void 0 === r.env[n]) throw p.error(new Error, {
                            code: "ConfigurationException",
                            message: "environmental variable " + n + " cannot be set to nothing"
                        });
                        if (!c(r.env[n])) return !0
                    }
                }
                var i = {};
                try {
                    i = d.util.iniLoader ? d.util.iniLoader.loadFrom({
                        isConfig: !0,
                        filename: r.env[d.util.sharedConfigFileEnv]
                    }) : {}
                } catch (e) {}
                var o = i[r.env.AWS_PROFILE || d.util.defaultProfile] || {};
                if (Object.prototype.hasOwnProperty.call(o, "endpoint_discovery_enabled")) {
                    if (void 0 === o.endpoint_discovery_enabled) throw p.error(new Error, {
                        code: "ConfigurationException",
                        message: "config file entry 'endpoint_discovery_enabled' cannot be set to nothing"
                    });
                    if (!c(o.endpoint_discovery_enabled)) return !0
                }
                return !1
            }
            var d = e("./core"),
                p = e("./util"),
                h = ["AWS_ENABLE_ENDPOINT_DISCOVERY", "AWS_ENDPOINT_DISCOVERY_ENABLED"],
                m = {};
            t.exports = {
                discoverEndpoint: function(e, t) {
                    var r = e.service || {};
                    if (function(e) {
                            if (e._originalConfig && e._originalConfig.endpoint && !0 === e._originalConfig.endpointDiscoveryEnabled) throw p.error(new Error, {
                                code: "ConfigurationException",
                                message: "Custom endpoint is supplied; endpointDiscoveryEnabled must not be true."
                            });
                            var t = d.config[e.serviceIdentifier] || {};
                            return Boolean(d.config.endpoint || t.endpoint || e._originalConfig && e._originalConfig.endpoint)
                        }(r) || e.isPresigned()) return t();
                    if (!l(e)) return t();
                    e.httpRequest.appendToUserAgent("endpoint-discovery");
                    var n = (r.api.operations || {})[e.operation];
                    switch (n ? n.endpointDiscoveryRequired : "NULL") {
                        case "OPTIONAL":
                            o(e), e.addNamedListener("INVALIDATE_CACHED_ENDPOINTS", "extractError", u), t();
                            break;
                        case "REQUIRED":
                            e.addNamedListener("INVALIDATE_CACHED_ENDPOINTS", "extractError", u), a(e, t);
                            break;
                        case "NULL":
                        default:
                            t()
                    }
                },
                requiredDiscoverEndpoint: a,
                optionalDiscoverEndpoint: o,
                marshallCustomIdentifiers: i,
                getCacheKey: n,
                invalidateCachedEndpoint: u
            }
        }).call(this, e("_process"))
    }, {
        "./core": 38,
        "./util": 116,
        _process: 8
    }],
    116: [function(e, t, r) {
        (function(r, n) {
            var i, o = {
                environment: "nodejs",
                engine: function() {
                    if (o.isBrowser() && "undefined" != typeof navigator) return navigator.userAgent;
                    var e = r.platform + "/" + r.version;
                    return r.env.AWS_EXECUTION_ENV && (e += " exec-env/" + r.env.AWS_EXECUTION_ENV), e
                },
                userAgent: function() {
                    var t = o.environment,
                        r = "aws-sdk-" + t + "/" + e("./core").VERSION;
                    return "nodejs" === t && (r += " " + o.engine()), r
                },
                uriEscape: function(e) {
                    var t = encodeURIComponent(e);
                    return (t = t.replace(/[^A-Za-z0-9_.~\-%]+/g, escape)).replace(/[*]/g, function(e) {
                        return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                    })
                },
                uriEscapePath: function(e) {
                    var t = [];
                    return o.arrayEach(e.split("/"), function(e) {
                        t.push(o.uriEscape(e))
                    }), t.join("/")
                },
                urlParse: function(e) {
                    return o.url.parse(e)
                },
                urlFormat: function(e) {
                    return o.url.format(e)
                },
                queryStringParse: function(e) {
                    return o.querystring.parse(e)
                },
                queryParamsToString: function(e) {
                    var t = [],
                        r = o.uriEscape,
                        n = Object.keys(e).sort();
                    return o.arrayEach(n, function(n) {
                        var i = e[n],
                            a = r(n),
                            s = a + "=";
                        if (Array.isArray(i)) {
                            var u = [];
                            o.arrayEach(i, function(e) {
                                u.push(r(e))
                            }), s = a + "=" + u.sort().join("&" + a + "=")
                        } else void 0 !== i && null !== i && (s = a + "=" + r(i));
                        t.push(s)
                    }), t.join("&")
                },
                readFileSync: function(t) {
                    return o.isBrowser() ? null : e("fs").readFileSync(t, "utf-8")
                },
                base64: {
                    encode: function(e) {
                        if ("number" == typeof e) throw o.error(new Error("Cannot base64 encode number " + e));
                        return null === e || void 0 === e ? e : o.buffer.toBuffer(e).toString("base64")
                    },
                    decode: function(e) {
                        if ("number" == typeof e) throw o.error(new Error("Cannot base64 decode number " + e));
                        return null === e || void 0 === e ? e : o.buffer.toBuffer(e, "base64")
                    }
                },
                buffer: {
                    toBuffer: function(e, t) {
                        return "function" == typeof o.Buffer.from && o.Buffer.from !== Uint8Array.from ? o.Buffer.from(e, t) : new o.Buffer(e, t)
                    },
                    alloc: function(e, t, r) {
                        if ("number" != typeof e) throw new Error("size passed to alloc must be a number.");
                        if ("function" == typeof o.Buffer.alloc) return o.Buffer.alloc(e, t, r);
                        var n = new o.Buffer(e);
                        return void 0 !== t && "function" == typeof n.fill && n.fill(t, void 0, void 0, r), n
                    },
                    toStream: function(e) {
                        o.Buffer.isBuffer(e) || (e = o.buffer.toBuffer(e));
                        var t = new o.stream.Readable,
                            r = 0;
                        return t._read = function(n) {
                            if (r >= e.length) return t.push(null);
                            var i = r + n;
                            i > e.length && (i = e.length), t.push(e.slice(r, i)), r = i
                        }, t
                    },
                    concat: function(e) {
                        var t, r, n = 0,
                            i = 0;
                        for (t = 0; t < e.length; t++) n += e[t].length;
                        for (r = o.buffer.alloc(n), t = 0; t < e.length; t++) e[t].copy(r, i), i += e[t].length;
                        return r
                    }
                },
                string: {
                    byteLength: function(t) {
                        if (null === t || void 0 === t) return 0;
                        if ("string" == typeof t && (t = o.buffer.toBuffer(t)), "number" == typeof t.byteLength) return t.byteLength;
                        if ("number" == typeof t.length) return t.length;
                        if ("number" == typeof t.size) return t.size;
                        if ("string" == typeof t.path) return e("fs").lstatSync(t.path).size;
                        throw o.error(new Error("Cannot determine length of " + t), {
                            object: t
                        })
                    },
                    upperFirst: function(e) {
                        return e[0].toUpperCase() + e.substr(1)
                    },
                    lowerFirst: function(e) {
                        return e[0].toLowerCase() + e.substr(1)
                    }
                },
                ini: {
                    parse: function(e) {
                        var t, r = {};
                        return o.arrayEach(e.split(/\r?\n/), function(e) {
                            var n = (e = e.split(/(^|\s)[;#]/)[0]).match(/^\s*\[([^\[\]]+)\]\s*$/);
                            if (n) t = n[1];
                            else if (t) {
                                var i = e.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
                                i && (r[t] = r[t] || {}, r[t][i[1]] = i[2])
                            }
                        }), r
                    }
                },
                fn: {
                    noop: function() {},
                    callback: function(e) {
                        if (e) throw e
                    },
                    makeAsync: function(e, t) {
                        return t && t <= e.length ? e : function() {
                            var t = Array.prototype.slice.call(arguments, 0);
                            t.pop()(e.apply(null, t))
                        }
                    }
                },
                date: {
                    getDate: function() {
                        return i || (i = e("./core")), i.config.systemClockOffset ? new Date((new Date).getTime() + i.config.systemClockOffset) : new Date
                    },
                    iso8601: function(e) {
                        return void 0 === e && (e = o.date.getDate()), e.toISOString().replace(/\.\d{3}Z$/, "Z")
                    },
                    rfc822: function(e) {
                        return void 0 === e && (e = o.date.getDate()), e.toUTCString()
                    },
                    unixTimestamp: function(e) {
                        return void 0 === e && (e = o.date.getDate()), e.getTime() / 1e3
                    },
                    from: function(e) {
                        return "number" == typeof e ? new Date(1e3 * e) : new Date(e)
                    },
                    format: function(e, t) {
                        return t || (t = "iso8601"), o.date[t](o.date.from(e))
                    },
                    parseTimestamp: function(e) {
                        if ("number" == typeof e) return new Date(1e3 * e);
                        if (e.match(/^\d+$/)) return new Date(1e3 * e);
                        if (e.match(/^\d{4}/)) return new Date(e);
                        if (e.match(/^\w{3},/)) return new Date(e);
                        throw o.error(new Error("unhandled timestamp format: " + e), {
                            code: "TimestampParserError"
                        })
                    }
                },
                crypto: {
                    crc32Table: [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
                    crc32: function(e) {
                        var t = o.crypto.crc32Table,
                            r = -1;
                        "string" == typeof e && (e = o.buffer.toBuffer(e));
                        for (var n = 0; n < e.length; n++) r = r >>> 8 ^ t[255 & (r ^ e.readUInt8(n))];
                        return (-1 ^ r) >>> 0
                    },
                    hmac: function(e, t, r, n) {
                        return r || (r = "binary"), "buffer" === r && (r = void 0), n || (n = "sha256"), "string" == typeof t && (t = o.buffer.toBuffer(t)), o.crypto.lib.createHmac(n, e).update(t).digest(r)
                    },
                    md5: function(e, t, r) {
                        return o.crypto.hash("md5", e, t, r)
                    },
                    sha256: function(e, t, r) {
                        return o.crypto.hash("sha256", e, t, r)
                    },
                    hash: function(e, t, r, n) {
                        var i = o.crypto.createHash(e);
                        r || (r = "binary"), "buffer" === r && (r = void 0), "string" == typeof t && (t = o.buffer.toBuffer(t));
                        var a = o.arraySliceFn(t),
                            s = o.Buffer.isBuffer(t);
                        if (o.isBrowser() && "undefined" != typeof ArrayBuffer && t && t.buffer instanceof ArrayBuffer && (s = !0), n && "object" == typeof t && "function" == typeof t.on && !s) t.on("data", function(e) {
                            i.update(e)
                        }), t.on("error", function(e) {
                            n(e)
                        }), t.on("end", function() {
                            n(null, i.digest(r))
                        });
                        else {
                            if (!n || !a || s || "undefined" == typeof FileReader) {
                                o.isBrowser() && "object" == typeof t && !s && (t = new o.Buffer(new Uint8Array(t)));
                                var u = i.update(t).digest(r);
                                return n && n(null, u), u
                            }
                            var c = 0,
                                l = new FileReader;
                            l.onerror = function() {
                                n(new Error("Failed to read data."))
                            }, l.onload = function() {
                                var e = new o.Buffer(new Uint8Array(l.result));
                                i.update(e), c += e.length, l._continueReading()
                            }, l._continueReading = function() {
                                if (c >= t.size) n(null, i.digest(r));
                                else {
                                    var e = c + 524288;
                                    e > t.size && (e = t.size), l.readAsArrayBuffer(a.call(t, c, e))
                                }
                            }, l._continueReading()
                        }
                    },
                    toHex: function(e) {
                        for (var t = [], r = 0; r < e.length; r++) t.push(("0" + e.charCodeAt(r).toString(16)).substr(-2, 2));
                        return t.join("")
                    },
                    createHash: function(e) {
                        return o.crypto.lib.createHash(e)
                    }
                },
                abort: {},
                each: function(e, t) {
                    for (var r in e)
                        if (Object.prototype.hasOwnProperty.call(e, r)) {
                            if (t.call(this, r, e[r]) === o.abort) break
                        }
                },
                arrayEach: function(e, t) {
                    for (var r in e)
                        if (Object.prototype.hasOwnProperty.call(e, r)) {
                            if (t.call(this, e[r], parseInt(r, 10)) === o.abort) break
                        }
                },
                update: function(e, t) {
                    return o.each(t, function(t, r) {
                        e[t] = r
                    }), e
                },
                merge: function(e, t) {
                    return o.update(o.copy(e), t)
                },
                copy: function(e) {
                    if (null === e || void 0 === e) return e;
                    var t = {};
                    for (var r in e) t[r] = e[r];
                    return t
                },
                isEmpty: function(e) {
                    for (var t in e)
                        if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
                    return !0
                },
                arraySliceFn: function(e) {
                    var t = e.slice || e.webkitSlice || e.mozSlice;
                    return "function" == typeof t ? t : null
                },
                isType: function(e, t) {
                    return "function" == typeof t && (t = o.typeName(t)), Object.prototype.toString.call(e) === "[object " + t + "]"
                },
                typeName: function(e) {
                    if (Object.prototype.hasOwnProperty.call(e, "name")) return e.name;
                    var t = e.toString(),
                        r = t.match(/^\s*function (.+)\(/);
                    return r ? r[1] : t
                },
                error: function(e, t) {
                    var r = null;
                    return "string" == typeof e.message && "" !== e.message && ("string" == typeof t || t && t.message) && ((r = o.copy(e)).message = e.message), e.message = e.message || null, "string" == typeof t ? e.message = t : "object" == typeof t && null !== t && (o.update(e, t), t.message && (e.message = t.message), (t.code || t.name) && (e.code = t.code || t.name), t.stack && (e.stack = t.stack)), "function" == typeof Object.defineProperty && (Object.defineProperty(e, "name", {
                        writable: !0,
                        enumerable: !1
                    }), Object.defineProperty(e, "message", {
                        enumerable: !0
                    })), e.name = t && t.name || e.name || e.code || "Error", e.time = new Date, r && (e.originalError = r), e
                },
                inherit: function(e, t) {
                    var r = null;
                    if (void 0 === t) t = e, e = Object, r = {};
                    else {
                        var n = function() {};
                        n.prototype = e.prototype, r = new n
                    }
                    return t.constructor === Object && (t.constructor = function() {
                        if (e !== Object) return e.apply(this, arguments)
                    }), t.constructor.prototype = r, o.update(t.constructor.prototype, t), t.constructor.__super__ = e, t.constructor
                },
                mixin: function() {
                    for (var e = arguments[0], t = 1; t < arguments.length; t++)
                        for (var r in arguments[t].prototype) {
                            var n = arguments[t].prototype[r];
                            "constructor" !== r && (e.prototype[r] = n)
                        }
                    return e
                },
                hideProperties: function(e, t) {
                    "function" == typeof Object.defineProperty && o.arrayEach(t, function(t) {
                        Object.defineProperty(e, t, {
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        })
                    })
                },
                property: function(e, t, r, n, i) {
                    var o = {
                        configurable: !0,
                        enumerable: void 0 === n || n
                    };
                    "function" != typeof r || i ? (o.value = r, o.writable = !0) : o.get = r, Object.defineProperty(e, t, o)
                },
                memoizedProperty: function(e, t, r, n) {
                    var i = null;
                    o.property(e, t, function() {
                        return null === i && (i = r()), i
                    }, n)
                },
                hoistPayloadMember: function(e) {
                    var t = e.request,
                        r = t.operation,
                        n = t.service.api.operations[r],
                        i = n.output;
                    if (i.payload && !n.hasEventOutput) {
                        var a = i.members[i.payload],
                            s = e.data[i.payload];
                        "structure" === a.type && o.each(s, function(t, r) {
                            o.property(e.data, t, r, !1)
                        })
                    }
                },
                computeSha256: function(t, r) {
                    if (o.isNode()) {
                        var n = o.stream.Stream,
                            i = e("fs");
                        if ("function" == typeof n && t instanceof n) {
                            if ("string" != typeof t.path) return r(new Error("Non-file stream objects are not supported with SigV4"));
                            var a = {};
                            "number" == typeof t.start && (a.start = t.start), "number" == typeof t.end && (a.end = t.end), t = i.createReadStream(t.path, a)
                        }
                    }
                    o.crypto.sha256(t, "hex", function(e, t) {
                        e ? r(e) : r(null, t)
                    })
                },
                isClockSkewed: function(e) {
                    if (e) return o.property(i.config, "isClockSkewed", Math.abs((new Date).getTime() - e) >= 3e5, !1), i.config.isClockSkewed
                },
                applyClockOffset: function(e) {
                    e && (i.config.systemClockOffset = e - (new Date).getTime())
                },
                extractRequestId: function(e) {
                    var t = e.httpResponse.headers["x-amz-request-id"] || e.httpResponse.headers["x-amzn-requestid"];
                    !t && e.data && e.data.ResponseMetadata && (t = e.data.ResponseMetadata.RequestId), t && (e.requestId = t), e.error && (e.error.requestId = t)
                },
                addPromises: function(e, t) {
                    var r = !1;
                    void 0 === t && i && i.config && (t = i.config.getPromisesDependency()), void 0 === t && "undefined" != typeof Promise && (t = Promise), "function" != typeof t && (r = !0), Array.isArray(e) || (e = [e]);
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        r ? o.deletePromisesFromClass && o.deletePromisesFromClass() : o.addPromisesToClass && o.addPromisesToClass(t)
                    }
                },
                promisifyMethod: function(e, t) {
                    return function() {
                        var r = this;
                        return new t(function(t, n) {
                            r[e](function(e, r) {
                                e ? n(e) : t(r)
                            })
                        })
                    }
                },
                isDualstackAvailable: function(t) {
                    if (!t) return !1;
                    var r = e("../apis/metadata.json");
                    return "string" != typeof t && (t = t.serviceIdentifier), !("string" != typeof t || !r.hasOwnProperty(t) || !r[t].dualstackAvailable)
                },
                calculateRetryDelay: function(e, t) {
                    t || (t = {});
                    var r = t.customBackoff || null;
                    if ("function" == typeof r) return r(e);
                    var n = "number" == typeof t.base ? t.base : 100;
                    return Math.random() * (Math.pow(2, e) * n)
                },
                handleRequestWithRetries: function(e, t, r) {
                    t || (t = {});
                    var n = i.HttpClient.getInstance(),
                        a = t.httpOptions || {},
                        s = 0,
                        u = function(e) {
                            var n = t.maxRetries || 0;
                            if (e && "TimeoutError" === e.code && (e.retryable = !0), e && e.retryable && s < n) {
                                s++;
                                var i = o.calculateRetryDelay(s, t.retryDelayOptions);
                                setTimeout(c, i + (e.retryAfter || 0))
                            } else r(e)
                        },
                        c = function() {
                            var t = "";
                            n.handleRequest(e, a, function(e) {
                                e.on("data", function(e) {
                                    t += e.toString()
                                }), e.on("end", function() {
                                    var n = e.statusCode;
                                    if (n < 300) r(null, t);
                                    else {
                                        var i = 1e3 * parseInt(e.headers["retry-after"], 10) || 0,
                                            a = o.error(new Error, {
                                                retryable: n >= 500 || 429 === n
                                            });
                                        i && a.retryable && (a.retryAfter = i), u(a)
                                    }
                                })
                            }, u)
                        };
                    i.util.defer(c)
                },
                uuid: {
                    v4: function() {
                        return e("uuid").v4()
                    }
                },
                convertPayloadToString: function(e) {
                    var t = e.request,
                        r = t.operation,
                        n = t.service.api.operations[r].output || {};
                    n.payload && e.data[n.payload] && (e.data[n.payload] = e.data[n.payload].toString())
                },
                defer: function(e) {
                    "object" == typeof r && "function" == typeof r.nextTick ? r.nextTick(e) : "function" == typeof n ? n(e) : setTimeout(e, 0)
                },
                getRequestPayloadShape: function(e) {
                    var t = e.service.api.operations;
                    if (t) {
                        var r = (t || {})[e.operation];
                        if (r && r.input && r.input.payload) return r.input.members[r.input.payload]
                    }
                },
                getProfilesFromSharedConfig: function(e, t) {
                    var n = {},
                        i = {};
                    if (r.env[o.configOptInEnv]) i = e.loadFrom({
                        isConfig: !0,
                        filename: r.env[o.sharedConfigFileEnv]
                    });
                    for (var a = e.loadFrom({
                            filename: t || r.env[o.configOptInEnv] && r.env[o.sharedCredentialsFileEnv]
                        }), s = 0, u = Object.keys(i); s < u.length; s++) n[u[s]] = i[u[s]];
                    for (s = 0, u = Object.keys(a); s < u.length; s++) n[u[s]] = a[u[s]];
                    return n
                },
                defaultProfile: "default",
                configOptInEnv: "AWS_SDK_LOAD_CONFIG",
                sharedCredentialsFileEnv: "AWS_SHARED_CREDENTIALS_FILE",
                sharedConfigFileEnv: "AWS_CONFIG_FILE",
                imdsDisabledEnv: "AWS_EC2_METADATA_DISABLED"
            };
            t.exports = o
        }).call(this, e("_process"), e("timers").setImmediate)
    }, {
        "../apis/metadata.json": 26,
        "./core": 38,
        _process: 8,
        fs: 2,
        timers: 16,
        uuid: 21
    }],
    37: [function(e, t, r) {
        var n, i = e("./core");
        e("./credentials"), e("./credentials/credential_provider_chain"), i.Config = i.util.inherit({
            constructor: function(e) {
                void 0 === e && (e = {}), e = this.extractCredentials(e), i.util.each.call(this, this.keys, function(t, r) {
                    this.set(t, e[t], r)
                })
            },
            getCredentials: function(e) {
                function t(t) {
                    e(t, t ? null : n.credentials)
                }

                function r(e, t) {
                    return new i.util.error(t || new Error, {
                        code: "CredentialsError",
                        message: e,
                        name: "CredentialsError"
                    })
                }
                var n = this;
                n.credentials ? "function" == typeof n.credentials.get ? n.credentials.get(function(e) {
                    e && (e = r("Could not load credentials from " + n.credentials.constructor.name, e)), t(e)
                }) : function() {
                    var e = null;
                    n.credentials.accessKeyId && n.credentials.secretAccessKey || (e = r("Missing credentials")), t(e)
                }() : n.credentialProvider ? n.credentialProvider.resolve(function(e, i) {
                    e && (e = r("Could not load credentials from any providers", e)), n.credentials = i, t(e)
                }) : t(r("No credentials to load"))
            },
            update: function(e, t) {
                t = t || !1, e = this.extractCredentials(e), i.util.each.call(this, e, function(e, r) {
                    (t || Object.prototype.hasOwnProperty.call(this.keys, e) || i.Service.hasService(e)) && this.set(e, r)
                })
            },
            loadFromPath: function(e) {
                this.clear();
                var t = JSON.parse(i.util.readFileSync(e)),
                    r = new i.FileSystemCredentials(e),
                    n = new i.CredentialProviderChain;
                return n.providers.unshift(r), n.resolve(function(e, r) {
                    if (e) throw e;
                    t.credentials = r
                }), this.constructor(t), this
            },
            clear: function() {
                i.util.each.call(this, this.keys, function(e) {
                    delete this[e]
                }), this.set("credentials", void 0), this.set("credentialProvider", void 0)
            },
            set: function(e, t, r) {
                void 0 === t ? (void 0 === r && (r = this.keys[e]), this[e] = "function" == typeof r ? r.call(this) : r) : "httpOptions" === e && this[e] ? this[e] = i.util.merge(this[e], t) : this[e] = t
            },
            keys: {
                credentials: null,
                credentialProvider: null,
                region: null,
                logger: null,
                apiVersions: {},
                apiVersion: null,
                endpoint: void 0,
                httpOptions: {
                    timeout: 12e4
                },
                maxRetries: void 0,
                maxRedirects: 10,
                paramValidation: !0,
                sslEnabled: !0,
                s3ForcePathStyle: !1,
                s3BucketEndpoint: !1,
                s3DisableBodySigning: !0,
                computeChecksums: !0,
                convertResponseTypes: !0,
                correctClockSkew: !1,
                customUserAgent: null,
                dynamoDbCrc32: !0,
                systemClockOffset: 0,
                signatureVersion: null,
                signatureCache: !0,
                retryDelayOptions: {},
                useAccelerateEndpoint: !1,
                clientSideMonitoring: !1,
                endpointDiscoveryEnabled: !1,
                endpointCacheSize: 1e3,
                hostPrefixEnabled: !0
            },
            extractCredentials: function(e) {
                return e.accessKeyId && e.secretAccessKey && ((e = i.util.copy(e)).credentials = new i.Credentials(e)), e
            },
            setPromisesDependency: function(e) {
                n = e, null === e && "function" == typeof Promise && (n = Promise);
                var t = [i.Request, i.Credentials, i.CredentialProviderChain];
                i.S3 && i.S3.ManagedUpload && t.push(i.S3.ManagedUpload), i.util.addPromises(t, n)
            },
            getPromisesDependency: function() {
                return n
            }
        }), i.config = new i.Config
    }, {
        "./core": 38,
        "./credentials": 39,
        "./credentials/credential_provider_chain": 42
    }],
    42: [function(e, t, r) {
        var n = e("../core");
        n.CredentialProviderChain = n.util.inherit(n.Credentials, {
            constructor: function(e) {
                this.providers = e || n.CredentialProviderChain.defaultProviders.slice(0), this.resolveCallbacks = []
            },
            resolve: function(e) {
                var t = this;
                if (0 === t.providers.length) return e(new Error("No providers")), t;
                if (1 === t.resolveCallbacks.push(e)) {
                    var r = 0,
                        i = t.providers.slice(0);
                    ! function e(o, a) {
                        if (!o && a || r === i.length) return n.util.arrayEach(t.resolveCallbacks, function(e) {
                            e(o, a)
                        }), void(t.resolveCallbacks.length = 0);
                        var s = i[r++];
                        (a = "function" == typeof s ? s.call() : s).get ? a.get(function(t) {
                            e(t, t ? null : a)
                        }) : e(null, a)
                    }()
                }
                return t
            }
        }), n.CredentialProviderChain.defaultProviders = [], n.CredentialProviderChain.addPromisesToClass = function(e) {
            this.prototype.resolvePromise = n.util.promisifyMethod("resolve", e)
        }, n.CredentialProviderChain.deletePromisesFromClass = function() {
            delete this.prototype.resolvePromise
        }, n.util.addPromises(n.CredentialProviderChain)
    }, {
        "../core": 38
    }],
    39: [function(e, t, r) {
        var n = e("./core");
        n.Credentials = n.util.inherit({
            constructor: function() {
                if (n.util.hideProperties(this, ["secretAccessKey"]), this.expired = !1, this.expireTime = null, this.refreshCallbacks = [], 1 === arguments.length && "object" == typeof arguments[0]) {
                    var e = arguments[0].credentials || arguments[0];
                    this.accessKeyId = e.accessKeyId, this.secretAccessKey = e.secretAccessKey, this.sessionToken = e.sessionToken
                } else this.accessKeyId = arguments[0], this.secretAccessKey = arguments[1], this.sessionToken = arguments[2]
            },
            expiryWindow: 15,
            needsRefresh: function() {
                var e = n.util.date.getDate().getTime(),
                    t = new Date(e + 1e3 * this.expiryWindow);
                return !!(this.expireTime && t > this.expireTime) || this.expired || !this.accessKeyId || !this.secretAccessKey
            },
            get: function(e) {
                var t = this;
                this.needsRefresh() ? this.refresh(function(r) {
                    r || (t.expired = !1), e && e(r)
                }) : e && e()
            },
            refresh: function(e) {
                this.expired = !1, e()
            },
            coalesceRefresh: function(e, t) {
                var r = this;
                1 === r.refreshCallbacks.push(e) && r.load(function(e) {
                    n.util.arrayEach(r.refreshCallbacks, function(r) {
                        t ? r(e) : n.util.defer(function() {
                            r(e)
                        })
                    }), r.refreshCallbacks.length = 0
                })
            },
            load: function(e) {
                e()
            }
        }), n.Credentials.addPromisesToClass = function(e) {
            this.prototype.getPromise = n.util.promisifyMethod("get", e), this.prototype.refreshPromise = n.util.promisifyMethod("refresh", e)
        }, n.Credentials.deletePromisesFromClass = function() {
            delete this.prototype.getPromise, delete this.prototype.refreshPromise
        }, n.util.addPromises(n.Credentials)
    }, {
        "./core": 38
    }],
    27: [function(e, t, r) {
        function n(e, t) {
            if (!n.services.hasOwnProperty(e)) throw new Error("InvalidService: Failed to load api for " + e);
            return n.services[e][t]
        }
        n.services = {}, t.exports = n
    }, {}],
    26: [function(e, t, r) {
        t.exports = {
            acm: {
                name: "ACM",
                cors: !0
            },
            apigateway: {
                name: "APIGateway",
                cors: !0
            },
            applicationautoscaling: {
                prefix: "application-autoscaling",
                name: "ApplicationAutoScaling",
                cors: !0
            },
            appstream: {
                name: "AppStream"
            },
            autoscaling: {
                name: "AutoScaling",
                cors: !0
            },
            batch: {
                name: "Batch"
            },
            budgets: {
                name: "Budgets"
            },
            clouddirectory: {
                name: "CloudDirectory",
                versions: ["2016-05-10*"]
            },
            cloudformation: {
                name: "CloudFormation",
                cors: !0
            },
            cloudfront: {
                name: "CloudFront",
                versions: ["2013-05-12*", "2013-11-11*", "2014-05-31*", "2014-10-21*", "2014-11-06*", "2015-04-17*", "2015-07-27*", "2015-09-17*", "2016-01-13*", "2016-01-28*", "2016-08-01*", "2016-08-20*", "2016-09-07*", "2016-09-29*", "2016-11-25*", "2017-03-25*", "2017-10-30*", "2018-06-18*", "2018-11-05*"],
                cors: !0
            },
            cloudhsm: {
                name: "CloudHSM",
                cors: !0
            },
            cloudsearch: {
                name: "CloudSearch"
            },
            cloudsearchdomain: {
                name: "CloudSearchDomain"
            },
            cloudtrail: {
                name: "CloudTrail",
                cors: !0
            },
            cloudwatch: {
                prefix: "monitoring",
                name: "CloudWatch",
                cors: !0
            },
            cloudwatchevents: {
                prefix: "events",
                name: "CloudWatchEvents",
                versions: ["2014-02-03*"],
                cors: !0
            },
            cloudwatchlogs: {
                prefix: "logs",
                name: "CloudWatchLogs",
                cors: !0
            },
            codebuild: {
                name: "CodeBuild",
                cors: !0
            },
            codecommit: {
                name: "CodeCommit",
                cors: !0
            },
            codedeploy: {
                name: "CodeDeploy",
                cors: !0
            },
            codepipeline: {
                name: "CodePipeline",
                cors: !0
            },
            cognitoidentity: {
                prefix: "cognito-identity",
                name: "CognitoIdentity",
                cors: !0
            },
            cognitoidentityserviceprovider: {
                prefix: "cognito-idp",
                name: "CognitoIdentityServiceProvider",
                cors: !0
            },
            cognitosync: {
                prefix: "cognito-sync",
                name: "CognitoSync",
                cors: !0
            },
            configservice: {
                prefix: "config",
                name: "ConfigService",
                cors: !0
            },
            cur: {
                name: "CUR",
                cors: !0
            },
            datapipeline: {
                name: "DataPipeline"
            },
            devicefarm: {
                name: "DeviceFarm",
                cors: !0
            },
            directconnect: {
                name: "DirectConnect",
                cors: !0
            },
            directoryservice: {
                prefix: "ds",
                name: "DirectoryService"
            },
            discovery: {
                name: "Discovery"
            },
            dms: {
                name: "DMS"
            },
            dynamodb: {
                name: "DynamoDB",
                cors: !0
            },
            dynamodbstreams: {
                prefix: "streams.dynamodb",
                name: "DynamoDBStreams",
                cors: !0
            },
            ec2: {
                name: "EC2",
                versions: ["2013-06-15*", "2013-10-15*", "2014-02-01*", "2014-05-01*", "2014-06-15*", "2014-09-01*", "2014-10-01*", "2015-03-01*", "2015-04-15*", "2015-10-01*", "2016-04-01*", "2016-09-15*"],
                cors: !0
            },
            ecr: {
                name: "ECR",
                cors: !0
            },
            ecs: {
                name: "ECS",
                cors: !0
            },
            efs: {
                prefix: "elasticfilesystem",
                name: "EFS",
                cors: !0
            },
            elasticache: {
                name: "ElastiCache",
                versions: ["2012-11-15*", "2014-03-24*", "2014-07-15*", "2014-09-30*"],
                cors: !0
            },
            elasticbeanstalk: {
                name: "ElasticBeanstalk",
                cors: !0
            },
            elb: {
                prefix: "elasticloadbalancing",
                name: "ELB",
                cors: !0
            },
            elbv2: {
                prefix: "elasticloadbalancingv2",
                name: "ELBv2",
                cors: !0
            },
            emr: {
                prefix: "elasticmapreduce",
                name: "EMR",
                cors: !0
            },
            es: {
                name: "ES"
            },
            elastictranscoder: {
                name: "ElasticTranscoder",
                cors: !0
            },
            firehose: {
                name: "Firehose",
                cors: !0
            },
            gamelift: {
                name: "GameLift",
                cors: !0
            },
            glacier: {
                name: "Glacier"
            },
            health: {
                name: "Health"
            },
            iam: {
                name: "IAM",
                cors: !0
            },
            importexport: {
                name: "ImportExport"
            },
            inspector: {
                name: "Inspector",
                versions: ["2015-08-18*"],
                cors: !0
            },
            iot: {
                name: "Iot",
                cors: !0
            },
            iotdata: {
                prefix: "iot-data",
                name: "IotData",
                cors: !0
            },
            kinesis: {
                name: "Kinesis",
                cors: !0
            },
            kinesisanalytics: {
                name: "KinesisAnalytics"
            },
            kms: {
                name: "KMS",
                cors: !0
            },
            lambda: {
                name: "Lambda",
                cors: !0
            },
            lexruntime: {
                prefix: "runtime.lex",
                name: "LexRuntime",
                cors: !0
            },
            lightsail: {
                name: "Lightsail"
            },
            machinelearning: {
                name: "MachineLearning",
                cors: !0
            },
            marketplacecommerceanalytics: {
                name: "MarketplaceCommerceAnalytics",
                cors: !0
            },
            marketplacemetering: {
                prefix: "meteringmarketplace",
                name: "MarketplaceMetering"
            },
            mturk: {
                prefix: "mturk-requester",
                name: "MTurk",
                cors: !0
            },
            mobileanalytics: {
                name: "MobileAnalytics",
                cors: !0
            },
            opsworks: {
                name: "OpsWorks",
                cors: !0
            },
            opsworkscm: {
                name: "OpsWorksCM"
            },
            organizations: {
                name: "Organizations"
            },
            pinpoint: {
                name: "Pinpoint"
            },
            polly: {
                name: "Polly",
                cors: !0
            },
            rds: {
                name: "RDS",
                versions: ["2014-09-01*"],
                cors: !0
            },
            redshift: {
                name: "Redshift",
                cors: !0
            },
            rekognition: {
                name: "Rekognition",
                cors: !0
            },
            resourcegroupstaggingapi: {
                name: "ResourceGroupsTaggingAPI"
            },
            route53: {
                name: "Route53",
                cors: !0
            },
            route53domains: {
                name: "Route53Domains",
                cors: !0
            },
            s3: {
                name: "S3",
                dualstackAvailable: !0,
                cors: !0
            },
            s3control: {
                name: "S3Control",
                dualstackAvailable: !0
            },
            servicecatalog: {
                name: "ServiceCatalog",
                cors: !0
            },
            ses: {
                prefix: "email",
                name: "SES",
                cors: !0
            },
            shield: {
                name: "Shield"
            },
            simpledb: {
                prefix: "sdb",
                name: "SimpleDB"
            },
            sms: {
                name: "SMS"
            },
            snowball: {
                name: "Snowball"
            },
            sns: {
                name: "SNS",
                cors: !0
            },
            sqs: {
                name: "SQS",
                cors: !0
            },
            ssm: {
                name: "SSM",
                cors: !0
            },
            storagegateway: {
                name: "StorageGateway",
                cors: !0
            },
            stepfunctions: {
                prefix: "states",
                name: "StepFunctions"
            },
            sts: {
                name: "STS",
                cors: !0
            },
            support: {
                name: "Support"
            },
            swf: {
                name: "SWF"
            },
            xray: {
                name: "XRay"
            },
            waf: {
                name: "WAF",
                cors: !0
            },
            wafregional: {
                prefix: "waf-regional",
                name: "WAFRegional"
            },
            workdocs: {
                name: "WorkDocs",
                cors: !0
            },
            workspaces: {
                name: "WorkSpaces"
            },
            codestar: {
                name: "CodeStar"
            },
            lexmodelbuildingservice: {
                prefix: "lex-models",
                name: "LexModelBuildingService",
                cors: !0
            },
            marketplaceentitlementservice: {
                prefix: "entitlement.marketplace",
                name: "MarketplaceEntitlementService"
            },
            athena: {
                name: "Athena"
            },
            greengrass: {
                name: "Greengrass"
            },
            dax: {
                name: "DAX"
            },
            migrationhub: {
                prefix: "AWSMigrationHub",
                name: "MigrationHub"
            },
            cloudhsmv2: {
                name: "CloudHSMV2"
            },
            glue: {
                name: "Glue"
            },
            mobile: {
                name: "Mobile"
            },
            pricing: {
                name: "Pricing",
                cors: !0
            },
            costexplorer: {
                prefix: "ce",
                name: "CostExplorer",
                cors: !0
            },
            mediaconvert: {
                name: "MediaConvert"
            },
            medialive: {
                name: "MediaLive"
            },
            mediapackage: {
                name: "MediaPackage"
            },
            mediastore: {
                name: "MediaStore"
            },
            mediastoredata: {
                prefix: "mediastore-data",
                name: "MediaStoreData",
                cors: !0
            },
            appsync: {
                name: "AppSync"
            },
            guardduty: {
                name: "GuardDuty"
            },
            mq: {
                name: "MQ"
            },
            comprehend: {
                name: "Comprehend",
                cors: !0
            },
            iotjobsdataplane: {
                prefix: "iot-jobs-data",
                name: "IoTJobsDataPlane"
            },
            kinesisvideoarchivedmedia: {
                prefix: "kinesis-video-archived-media",
                name: "KinesisVideoArchivedMedia",
                cors: !0
            },
            kinesisvideomedia: {
                prefix: "kinesis-video-media",
                name: "KinesisVideoMedia",
                cors: !0
            },
            kinesisvideo: {
                name: "KinesisVideo",
                cors: !0
            },
            sagemakerruntime: {
                prefix: "runtime.sagemaker",
                name: "SageMakerRuntime"
            },
            sagemaker: {
                name: "SageMaker"
            },
            translate: {
                name: "Translate",
                cors: !0
            },
            resourcegroups: {
                prefix: "resource-groups",
                name: "ResourceGroups",
                cors: !0
            },
            alexaforbusiness: {
                name: "AlexaForBusiness"
            },
            cloud9: {
                name: "Cloud9"
            },
            serverlessapplicationrepository: {
                prefix: "serverlessrepo",
                name: "ServerlessApplicationRepository"
            },
            servicediscovery: {
                name: "ServiceDiscovery"
            },
            workmail: {
                name: "WorkMail"
            },
            autoscalingplans: {
                prefix: "autoscaling-plans",
                name: "AutoScalingPlans"
            },
            transcribeservice: {
                prefix: "transcribe",
                name: "TranscribeService"
            },
            connect: {
                name: "Connect"
            },
            acmpca: {
                prefix: "acm-pca",
                name: "ACMPCA"
            },
            fms: {
                name: "FMS"
            },
            secretsmanager: {
                name: "SecretsManager",
                cors: !0
            },
            iotanalytics: {
                name: "IoTAnalytics"
            },
            iot1clickdevicesservice: {
                prefix: "iot1click-devices",
                name: "IoT1ClickDevicesService"
            },
            iot1clickprojects: {
                prefix: "iot1click-projects",
                name: "IoT1ClickProjects"
            },
            pi: {
                name: "PI"
            },
            neptune: {
                name: "Neptune"
            },
            mediatailor: {
                name: "MediaTailor"
            },
            eks: {
                name: "EKS"
            },
            macie: {
                name: "Macie"
            },
            dlm: {
                name: "DLM"
            },
            signer: {
                name: "Signer"
            },
            chime: {
                name: "Chime"
            },
            pinpointemail: {
                prefix: "pinpoint-email",
                name: "PinpointEmail"
            },
            ram: {
                name: "RAM"
            },
            route53resolver: {
                name: "Route53Resolver"
            },
            pinpointsmsvoice: {
                prefix: "sms-voice",
                name: "PinpointSMSVoice"
            },
            quicksight: {
                name: "QuickSight"
            },
            rdsdataservice: {
                prefix: "rds-data",
                name: "RDSDataService"
            },
            amplify: {
                name: "Amplify"
            },
            datasync: {
                name: "DataSync"
            },
            robomaker: {
                name: "RoboMaker"
            },
            transfer: {
                name: "Transfer"
            },
            globalaccelerator: {
                name: "GlobalAccelerator"
            },
            comprehendmedical: {
                name: "ComprehendMedical",
                cors: !0
            },
            kinesisanalyticsv2: {
                name: "KinesisAnalyticsV2"
            },
            mediaconnect: {
                name: "MediaConnect"
            },
            fsx: {
                name: "FSx"
            },
            securityhub: {
                name: "SecurityHub"
            },
            appmesh: {
                name: "AppMesh",
                versions: ["2018-10-01*"]
            },
            licensemanager: {
                prefix: "license-manager",
                name: "LicenseManager"
            },
            kafka: {
                name: "Kafka"
            },
            apigatewaymanagementapi: {
                name: "ApiGatewayManagementApi"
            },
            apigatewayv2: {
                name: "ApiGatewayV2"
            },
            docdb: {
                name: "DocDB"
            },
            backup: {
                name: "Backup"
            },
            worklink: {
                name: "WorkLink"
            },
            textract: {
                name: "Textract"
            },
            managedblockchain: {
                name: "ManagedBlockchain"
            },
            mediapackagevod: {
                prefix: "mediapackage-vod",
                name: "MediaPackageVod"
            },
            groundstation: {
                name: "GroundStation"
            },
            iotthingsgraph: {
                name: "IoTThingsGraph"
            },
            iotevents: {
                name: "IoTEvents"
            },
            ioteventsdata: {
                prefix: "iotevents-data",
                name: "IoTEventsData"
            },
            personalize: {
                name: "Personalize",
                cors: !0
            },
            personalizeevents: {
                prefix: "personalize-events",
                name: "PersonalizeEvents",
                cors: !0
            },
            personalizeruntime: {
                prefix: "personalize-runtime",
                name: "PersonalizeRuntime",
                cors: !0
            },
            applicationinsights: {
                prefix: "application-insights",
                name: "ApplicationInsights"
            },
            servicequotas: {
                prefix: "service-quotas",
                name: "ServiceQuotas"
            },
            ec2instanceconnect: {
                prefix: "ec2-instance-connect",
                name: "EC2InstanceConnect"
            },
            eventbridge: {
                name: "EventBridge"
            },
            lakeformation: {
                name: "LakeFormation"
            },
            forecastservice: {
                prefix: "forecast",
                name: "ForecastService"
            },
            forecastqueryservice: {
                prefix: "forecastquery",
                name: "ForecastQueryService"
            }
        }
    }, {}],
    21: [function(e, t, r) {
        var n = e("./v1"),
            i = e("./v4"),
            o = i;
        o.v1 = n, o.v4 = i, t.exports = o
    }, {
        "./v1": 24,
        "./v4": 25
    }],
    25: [function(e, t, r) {
        var n = e("./lib/rng"),
            i = e("./lib/bytesToUuid");
        t.exports = function(e, t, r) {
            var o = t && r || 0;
            "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
            var a = (e = e || {}).random || (e.rng || n)();
            if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, t)
                for (var s = 0; s < 16; ++s) t[o + s] = a[s];
            return t || i(a)
        }
    }, {
        "./lib/bytesToUuid": 22,
        "./lib/rng": 23
    }],
    24: [function(e, t, r) {
        var n, i, o = e("./lib/rng"),
            a = e("./lib/bytesToUuid"),
            s = 0,
            u = 0;
        t.exports = function(e, t, r) {
            var c = t && r || 0,
                l = t || [],
                d = (e = e || {}).node || n,
                p = void 0 !== e.clockseq ? e.clockseq : i;
            if (null == d || null == p) {
                var h = o();
                null == d && (d = n = [1 | h[0], h[1], h[2], h[3], h[4], h[5]]), null == p && (p = i = 16383 & (h[6] << 8 | h[7]))
            }
            var m = void 0 !== e.msecs ? e.msecs : (new Date).getTime(),
                f = void 0 !== e.nsecs ? e.nsecs : u + 1,
                g = m - s + (f - u) / 1e4;
            if (g < 0 && void 0 === e.clockseq && (p = p + 1 & 16383), (g < 0 || m > s) && void 0 === e.nsecs && (f = 0), f >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            s = m, u = f, i = p;
            var y = (1e4 * (268435455 & (m += 122192928e5)) + f) % 4294967296;
            l[c++] = y >>> 24 & 255, l[c++] = y >>> 16 & 255, l[c++] = y >>> 8 & 255, l[c++] = 255 & y;
            var v = m / 4294967296 * 1e4 & 268435455;
            l[c++] = v >>> 8 & 255, l[c++] = 255 & v, l[c++] = v >>> 24 & 15 | 16, l[c++] = v >>> 16 & 255, l[c++] = p >>> 8 | 128, l[c++] = 255 & p;
            for (var b = 0; b < 6; ++b) l[c + b] = d[b];
            return t || a(l)
        }
    }, {
        "./lib/bytesToUuid": 22,
        "./lib/rng": 23
    }],
    23: [function(e, t, r) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var i = new Uint8Array(16);
            t.exports = function() {
                return n(i), i
            }
        } else {
            var o = new Array(16);
            t.exports = function() {
                for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), o[t] = e >>> ((3 & t) << 3) & 255;
                return o
            }
        }
    }, {}],
    22: [function(e, t, r) {
        for (var n = [], i = 0; i < 256; ++i) n[i] = (i + 256).toString(16).substr(1);
        t.exports = function(e, t) {
            var r = t || 0,
                i = n;
            return [i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]]].join("")
        }
    }, {}],
    20: [function(e, t, r) {
        (function(t, n) {
            function i(e, t) {
                var n = {
                    seen: [],
                    stylize: a
                };
                return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), p(t) ? n.showHidden = t : t && r._extend(n, t), g(n.showHidden) && (n.showHidden = !1), g(n.depth) && (n.depth = 2), g(n.colors) && (n.colors = !1), g(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = o), s(n, e, n.depth)
            }

            function o(e, t) {
                var r = i.styles[t];
                return r ? "[" + i.colors[r][0] + "m" + e + "[" + i.colors[r][1] + "m" : e
            }

            function a(e, t) {
                return e
            }

            function s(e, t, n) {
                if (e.customInspect && t && k(t.inspect) && t.inspect !== r.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                    var i = t.inspect(n, e);
                    return f(i) || (i = s(e, i, n)), i
                }
                var o = u(e, t);
                if (o) return o;
                var a = Object.keys(t),
                    p = function(e) {
                        var t = {};
                        return e.forEach(function(e, r) {
                            t[e] = !0
                        }), t
                    }(a);
                if (e.showHidden && (a = Object.getOwnPropertyNames(t)), S(t) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return c(t);
                if (0 === a.length) {
                    if (k(t)) {
                        var h = t.name ? ": " + t.name : "";
                        return e.stylize("[Function" + h + "]", "special")
                    }
                    if (y(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                    if (b(t)) return e.stylize(Date.prototype.toString.call(t), "date");
                    if (S(t)) return c(t)
                }
                var m, g = "",
                    v = !1,
                    C = ["{", "}"];
                return d(t) && (v = !0, C = ["[", "]"]), k(t) && (g = " [Function" + (t.name ? ": " + t.name : "") + "]"), y(t) && (g = " " + RegExp.prototype.toString.call(t)), b(t) && (g = " " + Date.prototype.toUTCString.call(t)), S(t) && (g = " " + c(t)), 0 !== a.length || v && 0 != t.length ? n < 0 ? y(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(t), m = v ? function(e, t, r, n, i) {
                    for (var o = [], a = 0, s = t.length; a < s; ++a) w(t, String(a)) ? o.push(l(e, t, r, n, String(a), !0)) : o.push("");
                    return i.forEach(function(i) {
                        i.match(/^\d+$/) || o.push(l(e, t, r, n, i, !0))
                    }), o
                }(e, t, n, p, a) : a.map(function(r) {
                    return l(e, t, n, p, r, v)
                }), e.seen.pop(), function(e, t, r) {
                    return e.reduce(function(e, t) {
                        return 0, t.indexOf("\n") >= 0 && 0, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0) > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1]
                }(m, g, C)) : C[0] + g + C[1]
            }

            function u(e, t) {
                if (g(t)) return e.stylize("undefined", "undefined");
                if (f(t)) {
                    var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(r, "string")
                }
                return m(t) ? e.stylize("" + t, "number") : p(t) ? e.stylize("" + t, "boolean") : h(t) ? e.stylize("null", "null") : void 0
            }

            function c(e) {
                return "[" + Error.prototype.toString.call(e) + "]"
            }

            function l(e, t, r, n, i, o) {
                var a, u, c;
                if ((c = Object.getOwnPropertyDescriptor(t, i) || {
                        value: t[i]
                    }).get ? u = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (u = e.stylize("[Setter]", "special")), w(n, i) || (a = "[" + i + "]"), u || (e.seen.indexOf(c.value) < 0 ? (u = h(r) ? s(e, c.value, null) : s(e, c.value, r - 1)).indexOf("\n") > -1 && (u = o ? u.split("\n").map(function(e) {
                        return "  " + e
                    }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                        return "   " + e
                    }).join("\n")) : u = e.stylize("[Circular]", "special")), g(a)) {
                    if (o && i.match(/^\d+$/)) return u;
                    (a = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"))
                }
                return a + ": " + u
            }

            function d(e) {
                return Array.isArray(e)
            }

            function p(e) {
                return "boolean" == typeof e
            }

            function h(e) {
                return null === e
            }

            function m(e) {
                return "number" == typeof e
            }

            function f(e) {
                return "string" == typeof e
            }

            function g(e) {
                return void 0 === e
            }

            function y(e) {
                return v(e) && "[object RegExp]" === C(e)
            }

            function v(e) {
                return "object" == typeof e && null !== e
            }

            function b(e) {
                return v(e) && "[object Date]" === C(e)
            }

            function S(e) {
                return v(e) && ("[object Error]" === C(e) || e instanceof Error)
            }

            function k(e) {
                return "function" == typeof e
            }

            function C(e) {
                return Object.prototype.toString.call(e)
            }

            function _(e) {
                return e < 10 ? "0" + e.toString(10) : e.toString(10)
            }

            function w(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            var E = /%[sdj%]/g;
            r.format = function(e) {
                if (!f(e)) {
                    for (var t = [], r = 0; r < arguments.length; r++) t.push(i(arguments[r]));
                    return t.join(" ")
                }
                r = 1;
                for (var n = arguments, o = n.length, a = String(e).replace(E, function(e) {
                        if ("%%" === e) return "%";
                        if (r >= o) return e;
                        switch (e) {
                            case "%s":
                                return String(n[r++]);
                            case "%d":
                                return Number(n[r++]);
                            case "%j":
                                try {
                                    return JSON.stringify(n[r++])
                                } catch (e) {
                                    return "[Circular]"
                                }
                            default:
                                return e
                        }
                    }), s = n[r]; r < o; s = n[++r]) h(s) || !v(s) ? a += " " + s : a += " " + i(s);
                return a
            }, r.deprecate = function(e, i) {
                if (g(n.process)) return function() {
                    return r.deprecate(e, i).apply(this, arguments)
                };
                if (!0 === t.noDeprecation) return e;
                var o = !1;
                return function() {
                    if (!o) {
                        if (t.throwDeprecation) throw new Error(i);
                        t.traceDeprecation ? console.trace(i) : console.error(i), o = !0
                    }
                    return e.apply(this, arguments)
                }
            };
            var x, T = {};
            r.debuglog = function(e) {
                if (g(x) && (x = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !T[e])
                    if (new RegExp("\\b" + e + "\\b", "i").test(x)) {
                        var n = t.pid;
                        T[e] = function() {
                            var t = r.format.apply(r, arguments);
                            console.error("%s %d: %s", e, n, t)
                        }
                    } else T[e] = function() {};
                return T[e]
            }, r.inspect = i, i.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, i.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, r.isArray = d, r.isBoolean = p, r.isNull = h, r.isNullOrUndefined = function(e) {
                return null == e
            }, r.isNumber = m, r.isString = f, r.isSymbol = function(e) {
                return "symbol" == typeof e
            }, r.isUndefined = g, r.isRegExp = y, r.isObject = v, r.isDate = b, r.isError = S, r.isFunction = k, r.isPrimitive = function(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
            }, r.isBuffer = e("./support/isBuffer");
            var R = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            r.log = function() {
                var e, t;
                console.log("%s - %s", (e = new Date, t = [_(e.getHours()), _(e.getMinutes()), _(e.getSeconds())].join(":"), [e.getDate(), R[e.getMonth()], t].join(" ")), r.format.apply(r, arguments))
            }, r.inherits = e("inherits"), r._extend = function(e, t) {
                if (!t || !v(t)) return e;
                for (var r = Object.keys(t), n = r.length; n--;) e[r[n]] = t[r[n]];
                return e
            }
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./support/isBuffer": 19,
        _process: 8,
        inherits: 18
    }],
    19: [function(e, t, r) {
        t.exports = function(e) {
            return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
        }
    }, {}],
    18: [function(e, t, r) {
        "function" == typeof Object.create ? t.exports = function(e, t) {
            e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(e, t) {
            e.super_ = t;
            var r = function() {};
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        }
    }, {}],
    16: [function(e, t, r) {
        (function(t, n) {
            function i(e, t) {
                this._id = e, this._clearFn = t
            }
            var o = e("process/browser.js").nextTick,
                a = Function.prototype.apply,
                s = Array.prototype.slice,
                u = {},
                c = 0;
            r.setTimeout = function() {
                return new i(a.call(setTimeout, window, arguments), clearTimeout)
            }, r.setInterval = function() {
                return new i(a.call(setInterval, window, arguments), clearInterval)
            }, r.clearTimeout = r.clearInterval = function(e) {
                e.close()
            }, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() {
                this._clearFn.call(window, this._id)
            }, r.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = t
            }, r.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
            }, r._unrefActive = r.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }, r.setImmediate = "function" == typeof t ? t : function(e) {
                var t = c++,
                    n = !(arguments.length < 2) && s.call(arguments, 1);
                return u[t] = !0, o(function() {
                    u[t] && (n ? e.apply(null, n) : e.call(null), r.clearImmediate(t))
                }), t
            }, r.clearImmediate = "function" == typeof n ? n : function(e) {
                delete u[e]
            }
        }).call(this, e("timers").setImmediate, e("timers").clearImmediate)
    }, {
        "process/browser.js": 8,
        timers: 16
    }],
    8: [function(e, t, r) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function i() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (l === setTimeout) return setTimeout(e, 0);
            if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
            try {
                return l(e, 0)
            } catch (t) {
                try {
                    return l.call(null, e, 0)
                } catch (t) {
                    return l.call(this, e, 0)
                }
            }
        }

        function a() {
            f && h && (f = !1, h.length ? m = h.concat(m) : g = -1, m.length && s())
        }

        function s() {
            if (!f) {
                var e = o(a);
                f = !0;
                for (var t = m.length; t;) {
                    for (h = m, m = []; ++g < t;) h && h[g].run();
                    g = -1, t = m.length
                }
                h = null, f = !1,
                    function(e) {
                        if (d === clearTimeout) return clearTimeout(e);
                        if ((d === i || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
                        try {
                            d(e)
                        } catch (t) {
                            try {
                                return d.call(null, e)
                            } catch (t) {
                                return d.call(this, e)
                            }
                        }
                    }(e)
            }
        }

        function u(e, t) {
            this.fun = e, this.array = t
        }

        function c() {}
        var l, d, p = t.exports = {};
        ! function() {
            try {
                l = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                l = n
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : i
            } catch (e) {
                d = i
            }
        }();
        var h, m = [],
            f = !1,
            g = -1;
        p.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            m.push(new u(e, t)), 1 !== m.length || f || o(s)
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = c, p.addListener = c, p.once = c, p.off = c, p.removeListener = c, p.removeAllListeners = c, p.emit = c, p.prependListener = c, p.prependOnceListener = c, p.listeners = function(e) {
            return []
        }, p.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, p.cwd = function() {
            return "/"
        }, p.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, p.umask = function() {
            return 0
        }
    }, {}],
    7: [function(e, t, r) {
        ! function(e) {
            "use strict";

            function t(e) {
                return null !== e && "[object Array]" === Object.prototype.toString.call(e)
            }

            function r(e) {
                return null !== e && "[object Object]" === Object.prototype.toString.call(e)
            }

            function n(e, i) {
                if (e === i) return !0;
                if (Object.prototype.toString.call(e) !== Object.prototype.toString.call(i)) return !1;
                if (!0 === t(e)) {
                    if (e.length !== i.length) return !1;
                    for (var o = 0; o < e.length; o++)
                        if (!1 === n(e[o], i[o])) return !1;
                    return !0
                }
                if (!0 === r(e)) {
                    var a = {};
                    for (var s in e)
                        if (hasOwnProperty.call(e, s)) {
                            if (!1 === n(e[s], i[s])) return !1;
                            a[s] = !0
                        } for (var u in i)
                        if (hasOwnProperty.call(i, u) && !0 !== a[u]) return !1;
                    return !0
                }
                return !1
            }

            function i(e) {
                if ("" === e || !1 === e || null === e) return !0;
                if (t(e) && 0 === e.length) return !0;
                if (r(e)) {
                    for (var n in e)
                        if (e.hasOwnProperty(n)) return !1;
                    return !0
                }
                return !1
            }

            function o(e) {
                return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || "_" === e
            }

            function a(e) {
                return e >= "0" && e <= "9" || "-" === e
            }

            function s(e) {
                return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || "_" === e
            }

            function u() {}

            function c() {}

            function l(e) {
                this.runtime = e
            }

            function d(e) {
                this._interpreter = e, this.functionTable = {
                    abs: {
                        _func: this._functionAbs,
                        _signature: [{
                            types: [h]
                        }]
                    },
                    avg: {
                        _func: this._functionAvg,
                        _signature: [{
                            types: [b]
                        }]
                    },
                    ceil: {
                        _func: this._functionCeil,
                        _signature: [{
                            types: [h]
                        }]
                    },
                    contains: {
                        _func: this._functionContains,
                        _signature: [{
                            types: [f, g]
                        }, {
                            types: [m]
                        }]
                    },
                    ends_with: {
                        _func: this._functionEndsWith,
                        _signature: [{
                            types: [f]
                        }, {
                            types: [f]
                        }]
                    },
                    floor: {
                        _func: this._functionFloor,
                        _signature: [{
                            types: [h]
                        }]
                    },
                    length: {
                        _func: this._functionLength,
                        _signature: [{
                            types: [f, g, y]
                        }]
                    },
                    map: {
                        _func: this._functionMap,
                        _signature: [{
                            types: [v]
                        }, {
                            types: [g]
                        }]
                    },
                    max: {
                        _func: this._functionMax,
                        _signature: [{
                            types: [b, S]
                        }]
                    },
                    merge: {
                        _func: this._functionMerge,
                        _signature: [{
                            types: [y],
                            variadic: !0
                        }]
                    },
                    max_by: {
                        _func: this._functionMaxBy,
                        _signature: [{
                            types: [g]
                        }, {
                            types: [v]
                        }]
                    },
                    sum: {
                        _func: this._functionSum,
                        _signature: [{
                            types: [b]
                        }]
                    },
                    starts_with: {
                        _func: this._functionStartsWith,
                        _signature: [{
                            types: [f]
                        }, {
                            types: [f]
                        }]
                    },
                    min: {
                        _func: this._functionMin,
                        _signature: [{
                            types: [b, S]
                        }]
                    },
                    min_by: {
                        _func: this._functionMinBy,
                        _signature: [{
                            types: [g]
                        }, {
                            types: [v]
                        }]
                    },
                    type: {
                        _func: this._functionType,
                        _signature: [{
                            types: [m]
                        }]
                    },
                    keys: {
                        _func: this._functionKeys,
                        _signature: [{
                            types: [y]
                        }]
                    },
                    values: {
                        _func: this._functionValues,
                        _signature: [{
                            types: [y]
                        }]
                    },
                    sort: {
                        _func: this._functionSort,
                        _signature: [{
                            types: [S, b]
                        }]
                    },
                    sort_by: {
                        _func: this._functionSortBy,
                        _signature: [{
                            types: [g]
                        }, {
                            types: [v]
                        }]
                    },
                    join: {
                        _func: this._functionJoin,
                        _signature: [{
                            types: [f]
                        }, {
                            types: [S]
                        }]
                    },
                    reverse: {
                        _func: this._functionReverse,
                        _signature: [{
                            types: [f, g]
                        }]
                    },
                    to_array: {
                        _func: this._functionToArray,
                        _signature: [{
                            types: [m]
                        }]
                    },
                    to_string: {
                        _func: this._functionToString,
                        _signature: [{
                            types: [m]
                        }]
                    },
                    to_number: {
                        _func: this._functionToNumber,
                        _signature: [{
                            types: [m]
                        }]
                    },
                    not_null: {
                        _func: this._functionNotNull,
                        _signature: [{
                            types: [m],
                            variadic: !0
                        }]
                    }
                }
            }
            var p;
            p = "function" == typeof String.prototype.trimLeft ? function(e) {
                return e.trimLeft()
            } : function(e) {
                return e.match(/^\s*(.*)/)[1]
            };
            var h = 0,
                m = 1,
                f = 2,
                g = 3,
                y = 4,
                v = 6,
                b = 8,
                S = 9,
                k = {
                    ".": "Dot",
                    "*": "Star",
                    ",": "Comma",
                    ":": "Colon",
                    "{": "Lbrace",
                    "}": "Rbrace",
                    "]": "Rbracket",
                    "(": "Lparen",
                    ")": "Rparen",
                    "@": "Current"
                },
                C = {
                    "<": !0,
                    ">": !0,
                    "=": !0,
                    "!": !0
                },
                _ = {
                    " ": !0,
                    "\t": !0,
                    "\n": !0
                };
            u.prototype = {
                tokenize: function(e) {
                    var t, r, n, i = [];
                    for (this._current = 0; this._current < e.length;)
                        if (o(e[this._current])) t = this._current, r = this._consumeUnquotedIdentifier(e), i.push({
                            type: "UnquotedIdentifier",
                            value: r,
                            start: t
                        });
                        else if (void 0 !== k[e[this._current]]) i.push({
                        type: k[e[this._current]],
                        value: e[this._current],
                        start: this._current
                    }), this._current++;
                    else if (a(e[this._current])) n = this._consumeNumber(e), i.push(n);
                    else if ("[" === e[this._current]) n = this._consumeLBracket(e), i.push(n);
                    else if ('"' === e[this._current]) t = this._current, r = this._consumeQuotedIdentifier(e), i.push({
                        type: "QuotedIdentifier",
                        value: r,
                        start: t
                    });
                    else if ("'" === e[this._current]) t = this._current, r = this._consumeRawStringLiteral(e), i.push({
                        type: "Literal",
                        value: r,
                        start: t
                    });
                    else if ("`" === e[this._current]) {
                        t = this._current;
                        var s = this._consumeLiteral(e);
                        i.push({
                            type: "Literal",
                            value: s,
                            start: t
                        })
                    } else if (void 0 !== C[e[this._current]]) i.push(this._consumeOperator(e));
                    else if (void 0 !== _[e[this._current]]) this._current++;
                    else if ("&" === e[this._current]) t = this._current, this._current++, "&" === e[this._current] ? (this._current++, i.push({
                        type: "And",
                        value: "&&",
                        start: t
                    })) : i.push({
                        type: "Expref",
                        value: "&",
                        start: t
                    });
                    else {
                        if ("|" !== e[this._current]) {
                            var u = new Error("Unknown character:" + e[this._current]);
                            throw u.name = "LexerError", u
                        }
                        t = this._current, this._current++, "|" === e[this._current] ? (this._current++, i.push({
                            type: "Or",
                            value: "||",
                            start: t
                        })) : i.push({
                            type: "Pipe",
                            value: "|",
                            start: t
                        })
                    }
                    return i
                },
                _consumeUnquotedIdentifier: function(e) {
                    var t = this._current;
                    for (this._current++; this._current < e.length && s(e[this._current]);) this._current++;
                    return e.slice(t, this._current)
                },
                _consumeQuotedIdentifier: function(e) {
                    var t = this._current;
                    this._current++;
                    for (var r = e.length;
                        '"' !== e[this._current] && this._current < r;) {
                        var n = this._current;
                        "\\" !== e[n] || "\\" !== e[n + 1] && '"' !== e[n + 1] ? n++ : n += 2, this._current = n
                    }
                    return this._current++, JSON.parse(e.slice(t, this._current))
                },
                _consumeRawStringLiteral: function(e) {
                    var t = this._current;
                    this._current++;
                    for (var r = e.length;
                        "'" !== e[this._current] && this._current < r;) {
                        var n = this._current;
                        "\\" !== e[n] || "\\" !== e[n + 1] && "'" !== e[n + 1] ? n++ : n += 2, this._current = n
                    }
                    return this._current++, e.slice(t + 1, this._current - 1).replace("\\'", "'")
                },
                _consumeNumber: function(e) {
                    var t = this._current;
                    this._current++;
                    for (var r = e.length; a(e[this._current]) && this._current < r;) this._current++;
                    return {
                        type: "Number",
                        value: parseInt(e.slice(t, this._current)),
                        start: t
                    }
                },
                _consumeLBracket: function(e) {
                    var t = this._current;
                    return this._current++, "?" === e[this._current] ? (this._current++, {
                        type: "Filter",
                        value: "[?",
                        start: t
                    }) : "]" === e[this._current] ? (this._current++, {
                        type: "Flatten",
                        value: "[]",
                        start: t
                    }) : {
                        type: "Lbracket",
                        value: "[",
                        start: t
                    }
                },
                _consumeOperator: function(e) {
                    var t = this._current,
                        r = e[t];
                    return this._current++, "!" === r ? "=" === e[this._current] ? (this._current++, {
                        type: "NE",
                        value: "!=",
                        start: t
                    }) : {
                        type: "Not",
                        value: "!",
                        start: t
                    } : "<" === r ? "=" === e[this._current] ? (this._current++, {
                        type: "LTE",
                        value: "<=",
                        start: t
                    }) : {
                        type: "LT",
                        value: "<",
                        start: t
                    } : ">" === r ? "=" === e[this._current] ? (this._current++, {
                        type: "GTE",
                        value: ">=",
                        start: t
                    }) : {
                        type: "GT",
                        value: ">",
                        start: t
                    } : "=" === r && "=" === e[this._current] ? (this._current++, {
                        type: "EQ",
                        value: "==",
                        start: t
                    }) : void 0
                },
                _consumeLiteral: function(e) {
                    this._current++;
                    for (var t, r = this._current, n = e.length;
                        "`" !== e[this._current] && this._current < n;) {
                        var i = this._current;
                        "\\" !== e[i] || "\\" !== e[i + 1] && "`" !== e[i + 1] ? i++ : i += 2, this._current = i
                    }
                    var o = p(e.slice(r, this._current));
                    return o = o.replace("\\`", "`"), t = this._looksLikeJSON(o) ? JSON.parse(o) : JSON.parse('"' + o + '"'), this._current++, t
                },
                _looksLikeJSON: function(e) {
                    if ("" === e) return !1;
                    if ('[{"'.indexOf(e[0]) >= 0) return !0;
                    if (["true", "false", "null"].indexOf(e) >= 0) return !0;
                    if (!("-0123456789".indexOf(e[0]) >= 0)) return !1;
                    try {
                        return JSON.parse(e), !0
                    } catch (e) {
                        return !1
                    }
                }
            };
            var w = {
                EOF: 0,
                UnquotedIdentifier: 0,
                QuotedIdentifier: 0,
                Rbracket: 0,
                Rparen: 0,
                Comma: 0,
                Rbrace: 0,
                Number: 0,
                Current: 0,
                Expref: 0,
                Pipe: 1,
                Or: 2,
                And: 3,
                EQ: 5,
                GT: 5,
                LT: 5,
                GTE: 5,
                LTE: 5,
                NE: 5,
                Flatten: 9,
                Star: 20,
                Filter: 21,
                Dot: 40,
                Not: 45,
                Lbrace: 50,
                Lbracket: 55,
                Lparen: 60
            };
            c.prototype = {
                parse: function(e) {
                    this._loadTokens(e), this.index = 0;
                    var t = this.expression(0);
                    if ("EOF" !== this._lookahead(0)) {
                        var r = this._lookaheadToken(0),
                            n = new Error("Unexpected token type: " + r.type + ", value: " + r.value);
                        throw n.name = "ParserError", n
                    }
                    return t
                },
                _loadTokens: function(e) {
                    var t = (new u).tokenize(e);
                    t.push({
                        type: "EOF",
                        value: "",
                        start: e.length
                    }), this.tokens = t
                },
                expression: function(e) {
                    var t = this._lookaheadToken(0);
                    this._advance();
                    for (var r = this.nud(t), n = this._lookahead(0); e < w[n];) this._advance(), r = this.led(n, r), n = this._lookahead(0);
                    return r
                },
                _lookahead: function(e) {
                    return this.tokens[this.index + e].type
                },
                _lookaheadToken: function(e) {
                    return this.tokens[this.index + e]
                },
                _advance: function() {
                    this.index++
                },
                nud: function(e) {
                    var t, r;
                    switch (e.type) {
                        case "Literal":
                            return {
                                type: "Literal", value: e.value
                            };
                        case "UnquotedIdentifier":
                            return {
                                type: "Field", name: e.value
                            };
                        case "QuotedIdentifier":
                            var n = {
                                type: "Field",
                                name: e.value
                            };
                            if ("Lparen" === this._lookahead(0)) throw new Error("Quoted identifier not allowed for function names.");
                            return n;
                        case "Not":
                            return {
                                type: "NotExpression", children: [t = this.expression(w.Not)]
                            };
                        case "Star":
                            return t = null, {
                                type: "ValueProjection",
                                children: [{
                                    type: "Identity"
                                }, t = "Rbracket" === this._lookahead(0) ? {
                                    type: "Identity"
                                } : this._parseProjectionRHS(w.Star)]
                            };
                        case "Filter":
                            return this.led(e.type, {
                                type: "Identity"
                            });
                        case "Lbrace":
                            return this._parseMultiselectHash();
                        case "Flatten":
                            return {
                                type: "Projection", children: [{
                                    type: "Flatten",
                                    children: [{
                                        type: "Identity"
                                    }]
                                }, t = this._parseProjectionRHS(w.Flatten)]
                            };
                        case "Lbracket":
                            return "Number" === this._lookahead(0) || "Colon" === this._lookahead(0) ? (t = this._parseIndexExpression(), this._projectIfSlice({
                                type: "Identity"
                            }, t)) : "Star" === this._lookahead(0) && "Rbracket" === this._lookahead(1) ? (this._advance(), this._advance(), {
                                type: "Projection",
                                children: [{
                                    type: "Identity"
                                }, t = this._parseProjectionRHS(w.Star)]
                            }) : this._parseMultiselectList();
                        case "Current":
                            return {
                                type: "Current"
                            };
                        case "Expref":
                            return {
                                type: "ExpressionReference", children: [r = this.expression(w.Expref)]
                            };
                        case "Lparen":
                            for (var i = [];
                                "Rparen" !== this._lookahead(0);) "Current" === this._lookahead(0) ? (r = {
                                type: "Current"
                            }, this._advance()) : r = this.expression(0), i.push(r);
                            return this._match("Rparen"), i[0];
                        default:
                            this._errorToken(e)
                    }
                },
                led: function(e, t) {
                    var r;
                    switch (e) {
                        case "Dot":
                            var n = w.Dot;
                            return "Star" !== this._lookahead(0) ? {
                                type: "Subexpression",
                                children: [t, r = this._parseDotRHS(n)]
                            } : (this._advance(), {
                                type: "ValueProjection",
                                children: [t, r = this._parseProjectionRHS(n)]
                            });
                        case "Pipe":
                            return {
                                type: "Pipe", children: [t, r = this.expression(w.Pipe)]
                            };
                        case "Or":
                            return {
                                type: "OrExpression", children: [t, r = this.expression(w.Or)]
                            };
                        case "And":
                            return {
                                type: "AndExpression", children: [t, r = this.expression(w.And)]
                            };
                        case "Lparen":
                            for (var i, o = t.name, a = [];
                                "Rparen" !== this._lookahead(0);) "Current" === this._lookahead(0) ? (i = {
                                type: "Current"
                            }, this._advance()) : i = this.expression(0), "Comma" === this._lookahead(0) && this._match("Comma"), a.push(i);
                            return this._match("Rparen"), {
                                type: "Function",
                                name: o,
                                children: a
                            };
                        case "Filter":
                            var s = this.expression(0);
                            return this._match("Rbracket"), {
                                type: "FilterProjection",
                                children: [t, r = "Flatten" === this._lookahead(0) ? {
                                    type: "Identity"
                                } : this._parseProjectionRHS(w.Filter), s]
                            };
                        case "Flatten":
                            return {
                                type: "Projection", children: [{
                                    type: "Flatten",
                                    children: [t]
                                }, this._parseProjectionRHS(w.Flatten)]
                            };
                        case "EQ":
                        case "NE":
                        case "GT":
                        case "GTE":
                        case "LT":
                        case "LTE":
                            return this._parseComparator(t, e);
                        case "Lbracket":
                            var u = this._lookaheadToken(0);
                            return "Number" === u.type || "Colon" === u.type ? (r = this._parseIndexExpression(), this._projectIfSlice(t, r)) : (this._match("Star"), this._match("Rbracket"), {
                                type: "Projection",
                                children: [t, r = this._parseProjectionRHS(w.Star)]
                            });
                        default:
                            this._errorToken(this._lookaheadToken(0))
                    }
                },
                _match: function(e) {
                    if (this._lookahead(0) !== e) {
                        var t = this._lookaheadToken(0),
                            r = new Error("Expected " + e + ", got: " + t.type);
                        throw r.name = "ParserError", r
                    }
                    this._advance()
                },
                _errorToken: function(e) {
                    var t = new Error("Invalid token (" + e.type + '): "' + e.value + '"');
                    throw t.name = "ParserError", t
                },
                _parseIndexExpression: function() {
                    if ("Colon" === this._lookahead(0) || "Colon" === this._lookahead(1)) return this._parseSliceExpression();
                    var e = {
                        type: "Index",
                        value: this._lookaheadToken(0).value
                    };
                    return this._advance(), this._match("Rbracket"), e
                },
                _projectIfSlice: function(e, t) {
                    var r = {
                        type: "IndexExpression",
                        children: [e, t]
                    };
                    return "Slice" === t.type ? {
                        type: "Projection",
                        children: [r, this._parseProjectionRHS(w.Star)]
                    } : r
                },
                _parseSliceExpression: function() {
                    for (var e = [null, null, null], t = 0, r = this._lookahead(0);
                        "Rbracket" !== r && t < 3;) {
                        if ("Colon" === r) t++, this._advance();
                        else {
                            if ("Number" !== r) {
                                var n = this._lookahead(0),
                                    i = new Error("Syntax error, unexpected token: " + n.value + "(" + n.type + ")");
                                throw i.name = "Parsererror", i
                            }
                            e[t] = this._lookaheadToken(0).value, this._advance()
                        }
                        r = this._lookahead(0)
                    }
                    return this._match("Rbracket"), {
                        type: "Slice",
                        children: e
                    }
                },
                _parseComparator: function(e, t) {
                    return {
                        type: "Comparator",
                        name: t,
                        children: [e, this.expression(w[t])]
                    }
                },
                _parseDotRHS: function(e) {
                    var t = this._lookahead(0);
                    return ["UnquotedIdentifier", "QuotedIdentifier", "Star"].indexOf(t) >= 0 ? this.expression(e) : "Lbracket" === t ? (this._match("Lbracket"), this._parseMultiselectList()) : "Lbrace" === t ? (this._match("Lbrace"), this._parseMultiselectHash()) : void 0
                },
                _parseProjectionRHS: function(e) {
                    var t;
                    if (w[this._lookahead(0)] < 10) t = {
                        type: "Identity"
                    };
                    else if ("Lbracket" === this._lookahead(0)) t = this.expression(e);
                    else if ("Filter" === this._lookahead(0)) t = this.expression(e);
                    else {
                        if ("Dot" !== this._lookahead(0)) {
                            var r = this._lookaheadToken(0),
                                n = new Error("Sytanx error, unexpected token: " + r.value + "(" + r.type + ")");
                            throw n.name = "ParserError", n
                        }
                        this._match("Dot"), t = this._parseDotRHS(e)
                    }
                    return t
                },
                _parseMultiselectList: function() {
                    for (var e = [];
                        "Rbracket" !== this._lookahead(0);) {
                        var t = this.expression(0);
                        if (e.push(t), "Comma" === this._lookahead(0) && (this._match("Comma"), "Rbracket" === this._lookahead(0))) throw new Error("Unexpected token Rbracket")
                    }
                    return this._match("Rbracket"), {
                        type: "MultiSelectList",
                        children: e
                    }
                },
                _parseMultiselectHash: function() {
                    for (var e, t, r, n = [], i = ["UnquotedIdentifier", "QuotedIdentifier"];;) {
                        if (e = this._lookaheadToken(0), i.indexOf(e.type) < 0) throw new Error("Expecting an identifier token, got: " + e.type);
                        if (t = e.value, this._advance(), this._match("Colon"), r = {
                                type: "KeyValuePair",
                                name: t,
                                value: this.expression(0)
                            }, n.push(r), "Comma" === this._lookahead(0)) this._match("Comma");
                        else if ("Rbrace" === this._lookahead(0)) {
                            this._match("Rbrace");
                            break
                        }
                    }
                    return {
                        type: "MultiSelectHash",
                        children: n
                    }
                }
            }, l.prototype = {
                search: function(e, t) {
                    return this.visit(e, t)
                },
                visit: function(e, o) {
                    var a, s, u, c, l, d, p, h, m;
                    switch (e.type) {
                        case "Field":
                            return null === o ? null : r(o) ? void 0 === (d = o[e.name]) ? null : d : null;
                        case "Subexpression":
                            for (u = this.visit(e.children[0], o), m = 1; m < e.children.length; m++)
                                if (null === (u = this.visit(e.children[1], u))) return null;
                            return u;
                        case "IndexExpression":
                            return p = this.visit(e.children[0], o), this.visit(e.children[1], p);
                        case "Index":
                            if (!t(o)) return null;
                            var f = e.value;
                            return f < 0 && (f = o.length + f), void 0 === (u = o[f]) && (u = null), u;
                        case "Slice":
                            if (!t(o)) return null;
                            var g = e.children.slice(0),
                                y = this.computeSliceParams(o.length, g),
                                v = y[0],
                                b = y[1],
                                S = y[2];
                            if (u = [], S > 0)
                                for (m = v; m < b; m += S) u.push(o[m]);
                            else
                                for (m = v; m > b; m += S) u.push(o[m]);
                            return u;
                        case "Projection":
                            var k = this.visit(e.children[0], o);
                            if (!t(k)) return null;
                            for (h = [], m = 0; m < k.length; m++) null !== (s = this.visit(e.children[1], k[m])) && h.push(s);
                            return h;
                        case "ValueProjection":
                            if (!r(k = this.visit(e.children[0], o))) return null;
                            h = [];
                            var C = function(e) {
                                for (var t = Object.keys(e), r = [], n = 0; n < t.length; n++) r.push(e[t[n]]);
                                return r
                            }(k);
                            for (m = 0; m < C.length; m++) null !== (s = this.visit(e.children[1], C[m])) && h.push(s);
                            return h;
                        case "FilterProjection":
                            if (!t(k = this.visit(e.children[0], o))) return null;
                            var _ = [],
                                w = [];
                            for (m = 0; m < k.length; m++) i(a = this.visit(e.children[2], k[m])) || _.push(k[m]);
                            for (var E = 0; E < _.length; E++) null !== (s = this.visit(e.children[1], _[E])) && w.push(s);
                            return w;
                        case "Comparator":
                            switch (c = this.visit(e.children[0], o), l = this.visit(e.children[1], o), e.name) {
                                case "EQ":
                                    u = n(c, l);
                                    break;
                                case "NE":
                                    u = !n(c, l);
                                    break;
                                case "GT":
                                    u = c > l;
                                    break;
                                case "GTE":
                                    u = c >= l;
                                    break;
                                case "LT":
                                    u = c < l;
                                    break;
                                case "LTE":
                                    u = c <= l;
                                    break;
                                default:
                                    throw new Error("Unknown comparator: " + e.name)
                            }
                            return u;
                        case "Flatten":
                            var x = this.visit(e.children[0], o);
                            if (!t(x)) return null;
                            var T = [];
                            for (m = 0; m < x.length; m++) t(s = x[m]) ? T.push.apply(T, s) : T.push(s);
                            return T;
                        case "Identity":
                            return o;
                        case "MultiSelectList":
                            if (null === o) return null;
                            for (h = [], m = 0; m < e.children.length; m++) h.push(this.visit(e.children[m], o));
                            return h;
                        case "MultiSelectHash":
                            if (null === o) return null;
                            var R;
                            for (h = {}, m = 0; m < e.children.length; m++) h[(R = e.children[m]).name] = this.visit(R.value, o);
                            return h;
                        case "OrExpression":
                            return i(a = this.visit(e.children[0], o)) && (a = this.visit(e.children[1], o)), a;
                        case "AndExpression":
                            return !0 === i(c = this.visit(e.children[0], o)) ? c : this.visit(e.children[1], o);
                        case "NotExpression":
                            return i(c = this.visit(e.children[0], o));
                        case "Literal":
                            return e.value;
                        case "Pipe":
                            return p = this.visit(e.children[0], o), this.visit(e.children[1], p);
                        case "Current":
                            return o;
                        case "Function":
                            var N = [];
                            for (m = 0; m < e.children.length; m++) N.push(this.visit(e.children[m], o));
                            return this.runtime.callFunction(e.name, N);
                        case "ExpressionReference":
                            var I = e.children[0];
                            return I.jmespathType = "Expref", I;
                        default:
                            throw new Error("Unknown node type: " + e.type)
                    }
                },
                computeSliceParams: function(e, t) {
                    var r = t[0],
                        n = t[1],
                        i = t[2],
                        o = [null, null, null];
                    if (null === i) i = 1;
                    else if (0 === i) {
                        var a = new Error("Invalid slice, step cannot be 0");
                        throw a.name = "RuntimeError", a
                    }
                    var s = i < 0;
                    return r = null === r ? s ? e - 1 : 0 : this.capSliceRange(e, r, i), n = null === n ? s ? -1 : e : this.capSliceRange(e, n, i), o[0] = r, o[1] = n, o[2] = i, o
                },
                capSliceRange: function(e, t, r) {
                    return t < 0 ? (t += e) < 0 && (t = r < 0 ? -1 : 0) : t >= e && (t = r < 0 ? e - 1 : e), t
                }
            }, d.prototype = {
                callFunction: function(e, t) {
                    var r = this.functionTable[e];
                    if (void 0 === r) throw new Error("Unknown function: " + e + "()");
                    return this._validateArgs(e, t, r._signature), r._func.call(this, t)
                },
                _validateArgs: function(e, t, r) {
                    var n;
                    if (r[r.length - 1].variadic) {
                        if (t.length < r.length) throw n = 1 === r.length ? " argument" : " arguments", new Error("ArgumentError: " + e + "() takes at least" + r.length + n + " but received " + t.length)
                    } else if (t.length !== r.length) throw n = 1 === r.length ? " argument" : " arguments", new Error("ArgumentError: " + e + "() takes " + r.length + n + " but received " + t.length);
                    for (var i, o, a, s = 0; s < r.length; s++) {
                        a = !1, i = r[s].types, o = this._getTypeName(t[s]);
                        for (var u = 0; u < i.length; u++)
                            if (this._typeMatches(o, i[u], t[s])) {
                                a = !0;
                                break
                            } if (!a) throw new Error("TypeError: " + e + "() expected argument " + (s + 1) + " to be type " + i + " but received type " + o + " instead.")
                    }
                },
                _typeMatches: function(e, t, r) {
                    if (t === m) return !0;
                    if (t !== S && t !== b && t !== g) return e === t;
                    if (t === g) return e === g;
                    if (e === g) {
                        var n;
                        t === b ? n = h : t === S && (n = f);
                        for (var i = 0; i < r.length; i++)
                            if (!this._typeMatches(this._getTypeName(r[i]), n, r[i])) return !1;
                        return !0
                    }
                },
                _getTypeName: function(e) {
                    switch (Object.prototype.toString.call(e)) {
                        case "[object String]":
                            return f;
                        case "[object Number]":
                            return h;
                        case "[object Array]":
                            return g;
                        case "[object Boolean]":
                            return 5;
                        case "[object Null]":
                            return 7;
                        case "[object Object]":
                            return "Expref" === e.jmespathType ? v : y
                    }
                },
                _functionStartsWith: function(e) {
                    return 0 === e[0].lastIndexOf(e[1])
                },
                _functionEndsWith: function(e) {
                    var t = e[0],
                        r = e[1];
                    return -1 !== t.indexOf(r, t.length - r.length)
                },
                _functionReverse: function(e) {
                    if (this._getTypeName(e[0]) === f) {
                        for (var t = e[0], r = "", n = t.length - 1; n >= 0; n--) r += t[n];
                        return r
                    }
                    var i = e[0].slice(0);
                    return i.reverse(), i
                },
                _functionAbs: function(e) {
                    return Math.abs(e[0])
                },
                _functionCeil: function(e) {
                    return Math.ceil(e[0])
                },
                _functionAvg: function(e) {
                    for (var t = 0, r = e[0], n = 0; n < r.length; n++) t += r[n];
                    return t / r.length
                },
                _functionContains: function(e) {
                    return e[0].indexOf(e[1]) >= 0
                },
                _functionFloor: function(e) {
                    return Math.floor(e[0])
                },
                _functionLength: function(e) {
                    return r(e[0]) ? Object.keys(e[0]).length : e[0].length
                },
                _functionMap: function(e) {
                    for (var t = [], r = this._interpreter, n = e[0], i = e[1], o = 0; o < i.length; o++) t.push(r.visit(n, i[o]));
                    return t
                },
                _functionMerge: function(e) {
                    for (var t = {}, r = 0; r < e.length; r++) {
                        var n = e[r];
                        for (var i in n) t[i] = n[i]
                    }
                    return t
                },
                _functionMax: function(e) {
                    if (e[0].length > 0) {
                        if (this._getTypeName(e[0][0]) === h) return Math.max.apply(Math, e[0]);
                        for (var t = e[0], r = t[0], n = 1; n < t.length; n++) r.localeCompare(t[n]) < 0 && (r = t[n]);
                        return r
                    }
                    return null
                },
                _functionMin: function(e) {
                    if (e[0].length > 0) {
                        if (this._getTypeName(e[0][0]) === h) return Math.min.apply(Math, e[0]);
                        for (var t = e[0], r = t[0], n = 1; n < t.length; n++) t[n].localeCompare(r) < 0 && (r = t[n]);
                        return r
                    }
                    return null
                },
                _functionSum: function(e) {
                    for (var t = 0, r = e[0], n = 0; n < r.length; n++) t += r[n];
                    return t
                },
                _functionType: function(e) {
                    switch (this._getTypeName(e[0])) {
                        case h:
                            return "number";
                        case f:
                            return "string";
                        case g:
                            return "array";
                        case y:
                            return "object";
                        case 5:
                            return "boolean";
                        case v:
                            return "expref";
                        case 7:
                            return "null"
                    }
                },
                _functionKeys: function(e) {
                    return Object.keys(e[0])
                },
                _functionValues: function(e) {
                    for (var t = e[0], r = Object.keys(t), n = [], i = 0; i < r.length; i++) n.push(t[r[i]]);
                    return n
                },
                _functionJoin: function(e) {
                    var t = e[0];
                    return e[1].join(t)
                },
                _functionToArray: function(e) {
                    return this._getTypeName(e[0]) === g ? e[0] : [e[0]]
                },
                _functionToString: function(e) {
                    return this._getTypeName(e[0]) === f ? e[0] : JSON.stringify(e[0])
                },
                _functionToNumber: function(e) {
                    var t, r = this._getTypeName(e[0]);
                    return r === h ? e[0] : r !== f || (t = +e[0], isNaN(t)) ? null : t
                },
                _functionNotNull: function(e) {
                    for (var t = 0; t < e.length; t++)
                        if (7 !== this._getTypeName(e[t])) return e[t];
                    return null
                },
                _functionSort: function(e) {
                    var t = e[0].slice(0);
                    return t.sort(), t
                },
                _functionSortBy: function(e) {
                    var t = e[0].slice(0);
                    if (0 === t.length) return t;
                    var r = this._interpreter,
                        n = e[1],
                        i = this._getTypeName(r.visit(n, t[0]));
                    if ([h, f].indexOf(i) < 0) throw new Error("TypeError");
                    for (var o = this, a = [], s = 0; s < t.length; s++) a.push([s, t[s]]);
                    a.sort(function(e, t) {
                        var a = r.visit(n, e[1]),
                            s = r.visit(n, t[1]);
                        if (o._getTypeName(a) !== i) throw new Error("TypeError: expected " + i + ", received " + o._getTypeName(a));
                        if (o._getTypeName(s) !== i) throw new Error("TypeError: expected " + i + ", received " + o._getTypeName(s));
                        return a > s ? 1 : a < s ? -1 : e[0] - t[0]
                    });
                    for (var u = 0; u < a.length; u++) t[u] = a[u][1];
                    return t
                },
                _functionMaxBy: function(e) {
                    for (var t, r, n = e[1], i = e[0], o = this.createKeyFunction(n, [h, f]), a = -1 / 0, s = 0; s < i.length; s++)(r = o(i[s])) > a && (a = r, t = i[s]);
                    return t
                },
                _functionMinBy: function(e) {
                    for (var t, r, n = e[1], i = e[0], o = this.createKeyFunction(n, [h, f]), a = 1 / 0, s = 0; s < i.length; s++)(r = o(i[s])) < a && (a = r, t = i[s]);
                    return t
                },
                createKeyFunction: function(e, t) {
                    var r = this,
                        n = this._interpreter;
                    return function(i) {
                        var o = n.visit(e, i);
                        if (t.indexOf(r._getTypeName(o)) < 0) {
                            var a = "TypeError: expected one of " + t + ", received " + r._getTypeName(o);
                            throw new Error(a)
                        }
                        return o
                    }
                }
            }, e.tokenize = function(e) {
                return (new u).tokenize(e)
            }, e.compile = function(e) {
                return (new c).parse(e)
            }, e.search = function(e, t) {
                var r = new c,
                    n = new d,
                    i = new l(n);
                n._interpreter = i;
                var o = r.parse(t);
                return i.search(o, e)
            }, e.strictDeepEqual = n
        }(void 0 === r ? this.jmespath = {} : r)
    }, {}],
    2: [function(e, t, r) {}, {}]
}, {}, []), _xamzrequire = function e(t, r, n) {
    function i(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var u = "function" == typeof _xamzrequire && _xamzrequire;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = r[a] = {
                exports: {}
            };
            t[a][0].call(l.exports, function(e) {
                return i(t[a][1][e] || e)
            }, l, l.exports, e, t, r, n)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof _xamzrequire && _xamzrequire, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    28: [function(e, t, r) {
        e("./browser_loader");
        var n = e("./core");
        "undefined" != typeof window && (window.AWS = n), void 0 !== t && (t.exports = n), "undefined" != typeof self && (self.AWS = n)
    }, {
        "./browser_loader": 35,
        "./core": 38
    }],
    35: [function(e, t, r) {
        (function(r) {
            var n = e("./util");
            n.crypto.lib = e("./browserCryptoLib"), n.Buffer = e("buffer/").Buffer, n.url = e("url/"), n.querystring = e("querystring/"), n.realClock = e("./realclock/browserClock"), n.environment = "js", n.createEventStream = e("./event-stream/buffered-create-event-stream").createEventStream, n.isBrowser = function() {
                return !0
            }, n.isNode = function() {
                return !1
            };
            var i = e("./core");
            if (t.exports = i, e("./credentials"), e("./credentials/credential_provider_chain"), e("./credentials/temporary_credentials"), e("./credentials/chainable_temporary_credentials"), e("./credentials/web_identity_credentials"), e("./credentials/cognito_identity_credentials"), e("./credentials/saml_credentials"), i.XML.Parser = e("./xml/browser_parser"), e("./http/xhr"), void 0 === r) r = {
                browser: !0
            }
        }).call(this, e("_process"))
    }, {
        "./browserCryptoLib": 29,
        "./core": 38,
        "./credentials": 39,
        "./credentials/chainable_temporary_credentials": 40,
        "./credentials/cognito_identity_credentials": 41,
        "./credentials/credential_provider_chain": 42,
        "./credentials/saml_credentials": 43,
        "./credentials/temporary_credentials": 44,
        "./credentials/web_identity_credentials": 45,
        "./event-stream/buffered-create-event-stream": 53,
        "./http/xhr": 61,
        "./realclock/browserClock": 80,
        "./util": 116,
        "./xml/browser_parser": 117,
        _process: 8,
        "buffer/": 3,
        "querystring/": 15,
        "url/": 17
    }],
    117: [function(e, t, r) {
        function n() {}

        function i(e, t) {
            for (var r = e.getElementsByTagName(t), n = 0, i = r.length; n < i; n++)
                if (r[n].parentNode === e) return r[n]
        }

        function o(e, t) {
            switch (t || (t = {}), t.type) {
                case "structure":
                    return a(e, t);
                case "map":
                    return function(e, t) {
                        for (var r = {}, n = t.key.name || "key", a = t.value.name || "value", s = t.flattened ? t.name : "entry", u = e.firstElementChild; u;) {
                            if (u.nodeName === s) {
                                var c = i(u, n).textContent,
                                    l = i(u, a);
                                r[c] = o(l, t.value)
                            }
                            u = u.nextElementSibling
                        }
                        return r
                    }(e, t);
                case "list":
                    return function(e, t) {
                        for (var r = [], n = t.flattened ? t.name : t.member.name || "member", i = e.firstElementChild; i;) i.nodeName === n && r.push(o(i, t.member)), i = i.nextElementSibling;
                        return r
                    }(e, t);
                case void 0:
                case null:
                    return function(e) {
                        if (void 0 === e || null === e) return "";
                        if (!e.firstElementChild) return null === e.parentNode.parentNode ? {} : 0 === e.childNodes.length ? "" : e.textContent;
                        for (var t = {
                                type: "structure",
                                members: {}
                            }, r = e.firstElementChild; r;) {
                            var n = r.nodeName;
                            Object.prototype.hasOwnProperty.call(t.members, n) ? t.members[n].type = "list" : t.members[n] = {
                                name: n
                            }, r = r.nextElementSibling
                        }
                        return a(e, t)
                    }(e);
                default:
                    return function(e, t) {
                        if (e.getAttribute) {
                            var r = e.getAttribute("encoding");
                            "base64" === r && (t = new u.create({
                                type: r
                            }))
                        }
                        var n = e.textContent;
                        return "" === n && (n = null), "function" == typeof t.toType ? t.toType(n) : n
                    }(e, t)
            }
        }

        function a(e, t) {
            var r = {};
            return null === e ? r : (s.each(t.members, function(t, n) {
                if (n.isXmlAttribute) {
                    if (Object.prototype.hasOwnProperty.call(e.attributes, n.name)) {
                        var a = e.attributes[n.name].value;
                        r[t] = o({
                            textContent: a
                        }, n)
                    }
                } else {
                    var s = n.flattened ? e : i(e, n.name);
                    s ? r[t] = o(s, n) : n.flattened || "list" !== n.type || (r[t] = n.defaultValue)
                }
            }), r)
        }
        var s = e("../util"),
            u = e("../model/shape");
        n.prototype.parse = function(e, t) {
            if ("" === e.replace(/^\s+/, "")) return {};
            var r, n;
            try {
                if (window.DOMParser) {
                    try {
                        r = (new DOMParser).parseFromString(e, "text/xml")
                    } catch (e) {
                        throw s.error(new Error("Parse error in document"), {
                            originalError: e,
                            code: "XMLParserError",
                            retryable: !0
                        })
                    }
                    if (null === r.documentElement) throw s.error(new Error("Cannot parse empty document."), {
                        code: "XMLParserError",
                        retryable: !0
                    });
                    var a = r.getElementsByTagName("parsererror")[0];
                    if (a && (a.parentNode === r || "body" === a.parentNode.nodeName || a.parentNode.parentNode === r || "body" === a.parentNode.parentNode.nodeName)) {
                        var u = a.getElementsByTagName("div")[0] || a;
                        throw s.error(new Error(u.textContent || "Parser error in document"), {
                            code: "XMLParserError",
                            retryable: !0
                        })
                    }
                } else {
                    if (!window.ActiveXObject) throw new Error("Cannot load XML parser");
                    if ((r = new window.ActiveXObject("Microsoft.XMLDOM")).async = !1, !r.loadXML(e)) throw s.error(new Error("Parse error in document"), {
                        code: "XMLParserError",
                        retryable: !0
                    })
                }
            } catch (e) {
                n = e
            }
            if (r && r.documentElement && !n) {
                var c = o(r.documentElement, t),
                    l = i(r.documentElement, "ResponseMetadata");
                return l && (c.ResponseMetadata = o(l, {})), c
            }
            if (n) throw s.error(n || new Error, {
                code: "XMLParserError",
                retryable: !0
            });
            return {}
        }, t.exports = n
    }, {
        "../model/shape": 69,
        "../util": 116
    }],
    80: [function(e, t, r) {
        t.exports = {
            now: function() {
                return "undefined" != typeof performance && "function" == typeof performance.now ? performance.now() : Date.now()
            }
        }
    }, {}],
    61: [function(e, t, r) {
        var n = e("../core"),
            i = e("events").EventEmitter;
        e("../http"), n.XHRClient = n.util.inherit({
            handleRequest: function(e, t, r, o) {
                var a = this,
                    s = e.endpoint,
                    u = new i,
                    c = s.protocol + "//" + s.hostname;
                80 !== s.port && 443 !== s.port && (c += ":" + s.port), c += e.path;
                var l = new XMLHttpRequest,
                    d = !1;
                e.stream = l, l.addEventListener("readystatechange", function() {
                    try {
                        if (0 === l.status) return
                    } catch (e) {
                        return
                    }
                    this.readyState >= this.HEADERS_RECEIVED && !d && (u.statusCode = l.status, u.headers = a.parseHeaders(l.getAllResponseHeaders()), u.emit("headers", u.statusCode, u.headers, l.statusText), d = !0), this.readyState === this.DONE && a.finishRequest(l, u)
                }, !1), l.upload.addEventListener("progress", function(e) {
                    u.emit("sendProgress", e)
                }), l.addEventListener("progress", function(e) {
                    u.emit("receiveProgress", e)
                }, !1), l.addEventListener("timeout", function() {
                    o(n.util.error(new Error("Timeout"), {
                        code: "TimeoutError"
                    }))
                }, !1), l.addEventListener("error", function() {
                    o(n.util.error(new Error("Network Failure"), {
                        code: "NetworkingError"
                    }))
                }, !1), l.addEventListener("abort", function() {
                    o(n.util.error(new Error("Request aborted"), {
                        code: "RequestAbortedError"
                    }))
                }, !1), r(u), l.open(e.method, c, !1 !== t.xhrAsync), n.util.each(e.headers, function(e, t) {
                    "Content-Length" !== e && "User-Agent" !== e && "Host" !== e && l.setRequestHeader(e, t)
                }), t.timeout && !1 !== t.xhrAsync && (l.timeout = t.timeout), t.xhrWithCredentials && (l.withCredentials = !0);
                try {
                    l.responseType = "arraybuffer"
                } catch (e) {}
                try {
                    e.body ? l.send(e.body) : l.send()
                } catch (t) {
                    if (!e.body || "object" != typeof e.body.buffer) throw t;
                    l.send(e.body.buffer)
                }
                return u
            },
            parseHeaders: function(e) {
                var t = {};
                return n.util.arrayEach(e.split(/\r?\n/), function(e) {
                    var r = e.split(":", 1)[0],
                        n = e.substring(r.length + 2);
                    r.length > 0 && (t[r.toLowerCase()] = n)
                }), t
            },
            finishRequest: function(e, t) {
                var r;
                if ("arraybuffer" === e.responseType && e.response) {
                    var i = e.response;
                    r = new n.util.Buffer(i.byteLength);
                    for (var o = new Uint8Array(i), a = 0; a < r.length; ++a) r[a] = o[a]
                }
                try {
                    r || "string" != typeof e.responseText || (r = new n.util.Buffer(e.responseText))
                } catch (e) {}
                r && t.emit("data", r), t.emit("end")
            }
        }), n.HttpClient.prototype = n.XHRClient.prototype, n.HttpClient.streamsApiVersion = 1
    }, {
        "../core": 38,
        "../http": 60,
        events: 4
    }],
    53: [function(e, t, r) {
        var n = e("../event-stream/event-message-chunker").eventMessageChunker,
            i = e("./parse-event").parseEvent;
        t.exports = {
            createEventStream: function(e, t, r) {
                for (var o = n(e), a = [], s = 0; s < o.length; s++) a.push(i(t, o[s], r));
                return a
            }
        }
    }, {
        "../event-stream/event-message-chunker": 54,
        "./parse-event": 56
    }],
    56: [function(e, t, r) {
        var n = e("./parse-message").parseMessage;
        t.exports = {
            parseEvent: function(e, t, r) {
                var i = n(t),
                    o = i.headers[":message-type"];
                if (o) {
                    if ("error" === o.value) throw function(e) {
                        var t = e.headers[":error-code"],
                            r = e.headers[":error-message"],
                            n = new Error(r.value || r);
                        return n.code = n.name = t.value || t, n
                    }(i);
                    if ("event" !== o.value) return
                }
                var a = i.headers[":event-type"],
                    s = r.members[a.value];
                if (s) {
                    var u = {},
                        c = s.eventPayloadMemberName;
                    if (c) {
                        var l = s.members[c];
                        "binary" === l.type ? u[c] = i.body : u[c] = e.parse(i.body.toString(), l)
                    }
                    for (var d = s.eventHeaderMemberNames, p = 0; p < d.length; p++) {
                        var h = d[p];
                        i.headers[h] && (u[h] = s.members[h].toType(i.headers[h].value))
                    }
                    var m = {};
                    return m[a.value] = u, m
                }
            }
        }
    }, {
        "./parse-message": 57
    }],
    57: [function(e, t, r) {
        var n = e("./int64").Int64,
            i = e("./split-message").splitMessage,
            o = "boolean",
            a = "byte",
            s = "short",
            u = "integer",
            c = "long",
            l = "binary",
            d = "string",
            p = "timestamp",
            h = "uuid";
        t.exports = {
            parseMessage: function(e) {
                var t = i(e);
                return {
                    headers: function(e) {
                        for (var t = {}, r = 0; r < e.length;) {
                            var i = e.readUInt8(r++),
                                m = e.slice(r, r + i).toString();
                            switch (r += i, e.readUInt8(r++)) {
                                case 0:
                                    t[m] = {
                                        type: o,
                                        value: !0
                                    };
                                    break;
                                case 1:
                                    t[m] = {
                                        type: o,
                                        value: !1
                                    };
                                    break;
                                case 2:
                                    t[m] = {
                                        type: a,
                                        value: e.readInt8(r++)
                                    };
                                    break;
                                case 3:
                                    t[m] = {
                                        type: s,
                                        value: e.readInt16BE(r)
                                    }, r += 2;
                                    break;
                                case 4:
                                    t[m] = {
                                        type: u,
                                        value: e.readInt32BE(r)
                                    }, r += 4;
                                    break;
                                case 5:
                                    t[m] = {
                                        type: c,
                                        value: new n(e.slice(r, r + 8))
                                    }, r += 8;
                                    break;
                                case 6:
                                    var f = e.readUInt16BE(r);
                                    r += 2, t[m] = {
                                        type: l,
                                        value: e.slice(r, r + f)
                                    }, r += f;
                                    break;
                                case 7:
                                    var g = e.readUInt16BE(r);
                                    r += 2, t[m] = {
                                        type: d,
                                        value: e.slice(r, r + g).toString()
                                    }, r += g;
                                    break;
                                case 8:
                                    t[m] = {
                                        type: p,
                                        value: new Date(new n(e.slice(r, r + 8)).valueOf())
                                    }, r += 8;
                                    break;
                                case 9:
                                    var y = e.slice(r, r + 16).toString("hex");
                                    r += 16, t[m] = {
                                        type: h,
                                        value: y.substr(0, 8) + "-" + y.substr(8, 4) + "-" + y.substr(12, 4) + "-" + y.substr(16, 4) + "-" + y.substr(20)
                                    };
                                    break;
                                default:
                                    throw new Error("Unrecognized header type tag")
                            }
                        }
                        return t
                    }(t.headers),
                    body: t.body
                }
            }
        }
    }, {
        "./int64": 55,
        "./split-message": 58
    }],
    58: [function(e, t, r) {
        var n = e("../core").util,
            i = n.buffer.toBuffer,
            o = 4,
            a = 2 * o,
            s = 4,
            u = a + 2 * s;
        t.exports = {
            splitMessage: function(e) {
                if (n.Buffer.isBuffer(e) || (e = i(e)), e.length < u) throw new Error("Provided message too short to accommodate event stream message overhead");
                if (e.length !== e.readUInt32BE(0)) throw new Error("Reported message length does not match received message length");
                var t = e.readUInt32BE(a);
                if (t !== n.crypto.crc32(e.slice(0, a))) throw new Error("The prelude checksum specified in the message (" + t + ") does not match the calculated CRC32 checksum.");
                var r = e.readUInt32BE(e.length - s);
                if (r !== n.crypto.crc32(e.slice(0, e.length - s))) throw new Error("The message checksum did not match the expected value of " + r);
                var c = a + s,
                    l = c + e.readUInt32BE(o);
                return {
                    headers: e.slice(c, l),
                    body: e.slice(l, e.length - s)
                }
            }
        }
    }, {
        "../core": 38
    }],
    55: [function(e, t, r) {
        function n(e) {
            if (8 !== e.length) throw new Error("Int64 buffers must be exactly 8 bytes");
            o.Buffer.isBuffer(e) || (e = a(e)), this.bytes = e
        }

        function i(e) {
            for (var t = 0; t < 8; t++) e[t] ^= 255;
            for (t = 7; t > -1 && 0 == ++e[t]; t--);
        }
        var o = e("../core").util,
            a = o.buffer.toBuffer;
        n.fromNumber = function(e) {
            if (e > 0x8000000000000000 || e < -0x8000000000000000) throw new Error(e + " is too large (or, if negative, too small) to represent as an Int64");
            for (var t = new Uint8Array(8), r = 7, o = Math.abs(Math.round(e)); r > -1 && o > 0; r--, o /= 256) t[r] = o;
            return e < 0 && i(t), new n(t)
        }, n.prototype.valueOf = function() {
            var e = this.bytes.slice(0),
                t = 128 & e[0];
            return t && i(e), parseInt(e.toString("hex"), 16) * (t ? -1 : 1)
        }, n.prototype.toString = function() {
            return String(this.valueOf())
        }, t.exports = {
            Int64: n
        }
    }, {
        "../core": 38
    }],
    54: [function(e, t, r) {
        t.exports = {
            eventMessageChunker: function(e) {
                for (var t = [], r = 0; r < e.length;) {
                    var n = e.readInt32BE(r),
                        i = e.slice(r, n + r);
                    r += n, t.push(i)
                }
                return t
            }
        }
    }, {}],
    45: [function(e, t, r) {
        var n = e("../core");
        n.WebIdentityCredentials = n.util.inherit(n.Credentials, {
            constructor: function(e, t) {
                n.Credentials.call(this), this.expired = !0, this.params = e, this.params.RoleSessionName = this.params.RoleSessionName || "web-identity", this.data = null, this._clientConfig = n.util.copy(t || {})
            },
            refresh: function(e) {
                this.coalesceRefresh(e || n.util.fn.callback)
            },
            load: function(e) {
                var t = this;
                t.createClients(), t.service.assumeRoleWithWebIdentity(function(r, n) {
                    t.data = null, r || (t.data = n, t.service.credentialsFrom(n, t)), e(r)
                })
            },
            createClients: function() {
                if (!this.service) {
                    var e = n.util.merge({}, this._clientConfig);
                    e.params = this.params, this.service = new n.STS(e)
                }
            }
        })
    }, {
        "../core": 38
    }],
    44: [function(e, t, r) {
        var n = e("../core");
        n.TemporaryCredentials = n.util.inherit(n.Credentials, {
            constructor: function(e, t) {
                n.Credentials.call(this), this.loadMasterCredentials(t), this.expired = !0, this.params = e || {}, this.params.RoleArn && (this.params.RoleSessionName = this.params.RoleSessionName || "temporary-credentials")
            },
            refresh: function(e) {
                this.coalesceRefresh(e || n.util.fn.callback)
            },
            load: function(e) {
                var t = this;
                t.createClients(), t.masterCredentials.get(function() {
                    t.service.config.credentials = t.masterCredentials, (t.params.RoleArn ? t.service.assumeRole : t.service.getSessionToken).call(t.service, function(r, n) {
                        r || t.service.credentialsFrom(n, t), e(r)
                    })
                })
            },
            loadMasterCredentials: function(e) {
                for (this.masterCredentials = e || n.config.credentials; this.masterCredentials.masterCredentials;) this.masterCredentials = this.masterCredentials.masterCredentials;
                "function" != typeof this.masterCredentials.get && (this.masterCredentials = new n.Credentials(this.masterCredentials))
            },
            createClients: function() {
                this.service = this.service || new n.STS({
                    params: this.params
                })
            }
        })
    }, {
        "../core": 38
    }],
    43: [function(e, t, r) {
        var n = e("../core");
        n.SAMLCredentials = n.util.inherit(n.Credentials, {
            constructor: function(e) {
                n.Credentials.call(this), this.expired = !0, this.params = e
            },
            refresh: function(e) {
                this.coalesceRefresh(e || n.util.fn.callback)
            },
            load: function(e) {
                var t = this;
                t.createClients(), t.service.assumeRoleWithSAML(function(r, n) {
                    r || t.service.credentialsFrom(n, t), e(r)
                })
            },
            createClients: function() {
                this.service = this.service || new n.STS({
                    params: this.params
                })
            }
        })
    }, {
        "../core": 38
    }],
    41: [function(e, t, r) {
        var n = e("../core");
        n.CognitoIdentityCredentials = n.util.inherit(n.Credentials, {
            localStorageKey: {
                id: "aws.cognito.identity-id.",
                providers: "aws.cognito.identity-providers."
            },
            constructor: function(e, t) {
                n.Credentials.call(this), this.expired = !0, this.params = e, this.data = null, this._identityId = null, this._clientConfig = n.util.copy(t || {}), this.loadCachedId();
                var r = this;
                Object.defineProperty(this, "identityId", {
                    get: function() {
                        return r.loadCachedId(), r._identityId || r.params.IdentityId
                    },
                    set: function(e) {
                        r._identityId = e
                    }
                })
            },
            refresh: function(e) {
                this.coalesceRefresh(e || n.util.fn.callback)
            },
            load: function(e) {
                var t = this;
                t.createClients(), t.data = null, t._identityId = null, t.getId(function(r) {
                    r ? (t.clearIdOnNotAuthorized(r), e(r)) : t.params.RoleArn ? t.getCredentialsFromSTS(e) : t.getCredentialsForIdentity(e)
                })
            },
            clearCachedId: function() {
                this._identityId = null, delete this.params.IdentityId;
                var e = this.params.IdentityPoolId,
                    t = this.params.LoginId || "";
                delete this.storage[this.localStorageKey.id + e + t], delete this.storage[this.localStorageKey.providers + e + t]
            },
            clearIdOnNotAuthorized: function(e) {
                "NotAuthorizedException" == e.code && this.clearCachedId()
            },
            getId: function(e) {
                var t = this;
                if ("string" == typeof t.params.IdentityId) return e(null, t.params.IdentityId);
                t.cognito.getId(function(r, n) {
                    !r && n.IdentityId ? (t.params.IdentityId = n.IdentityId, e(null, n.IdentityId)) : e(r)
                })
            },
            loadCredentials: function(e, t) {
                e && t && (t.expired = !1, t.accessKeyId = e.Credentials.AccessKeyId, t.secretAccessKey = e.Credentials.SecretKey, t.sessionToken = e.Credentials.SessionToken, t.expireTime = e.Credentials.Expiration)
            },
            getCredentialsForIdentity: function(e) {
                var t = this;
                t.cognito.getCredentialsForIdentity(function(r, n) {
                    r ? t.clearIdOnNotAuthorized(r) : (t.cacheId(n), t.data = n, t.loadCredentials(t.data, t)), e(r)
                })
            },
            getCredentialsFromSTS: function(e) {
                var t = this;
                t.cognito.getOpenIdToken(function(r, n) {
                    r ? (t.clearIdOnNotAuthorized(r), e(r)) : (t.cacheId(n), t.params.WebIdentityToken = n.Token, t.webIdentityCredentials.refresh(function(r) {
                        r || (t.data = t.webIdentityCredentials.data, t.sts.credentialsFrom(t.data, t)), e(r)
                    }))
                })
            },
            loadCachedId: function() {
                var e = this;
                if (n.util.isBrowser() && !e.params.IdentityId) {
                    var t = e.getStorage("id");
                    if (t && e.params.Logins) {
                        var r = Object.keys(e.params.Logins);
                        0 !== (e.getStorage("providers") || "").split(",").filter(function(e) {
                            return -1 !== r.indexOf(e)
                        }).length && (e.params.IdentityId = t)
                    } else t && (e.params.IdentityId = t)
                }
            },
            createClients: function() {
                var e = this._clientConfig;
                if (this.webIdentityCredentials = this.webIdentityCredentials || new n.WebIdentityCredentials(this.params, e), !this.cognito) {
                    var t = n.util.merge({}, e);
                    t.params = this.params, this.cognito = new n.CognitoIdentity(t)
                }
                this.sts = this.sts || new n.STS(e)
            },
            cacheId: function(e) {
                this._identityId = e.IdentityId, this.params.IdentityId = this._identityId, n.util.isBrowser() && (this.setStorage("id", e.IdentityId), this.params.Logins && this.setStorage("providers", Object.keys(this.params.Logins).join(",")))
            },
            getStorage: function(e) {
                return this.storage[this.localStorageKey[e] + this.params.IdentityPoolId + (this.params.LoginId || "")]
            },
            setStorage: function(e, t) {
                try {
                    this.storage[this.localStorageKey[e] + this.params.IdentityPoolId + (this.params.LoginId || "")] = t
                } catch (e) {}
            },
            storage: function() {
                try {
                    var e = n.util.isBrowser() && null !== window.localStorage && "object" == typeof window.localStorage ? window.localStorage : {};
                    return e["aws.test-storage"] = "foobar", delete e["aws.test-storage"], e
                } catch (e) {
                    return {}
                }
            }()
        })
    }, {
        "../core": 38
    }],
    40: [function(e, t, r) {
        var n = e("../core");
        n.ChainableTemporaryCredentials = n.util.inherit(n.Credentials, {
            constructor: function(e) {
                n.Credentials.call(this), e = e || {}, this.errorCode = "ChainableTemporaryCredentialsProviderFailure", this.expired = !0, this.tokenCodeFn = null;
                var t = n.util.copy(e.params) || {};
                if (t.RoleArn && (t.RoleSessionName = t.RoleSessionName || "temporary-credentials"), t.SerialNumber) {
                    if (!e.tokenCodeFn || "function" != typeof e.tokenCodeFn) throw new n.util.error(new Error("tokenCodeFn must be a function when params.SerialNumber is given"), {
                        code: this.errorCode
                    });
                    this.tokenCodeFn = e.tokenCodeFn
                }
                config = n.util.merge({
                    params: t,
                    credentials: e.masterCredentials || n.config.credentials
                }, e.stsConfig || {}), this.service = new n.STS(config)
            },
            refresh: function(e) {
                this.coalesceRefresh(e || n.util.fn.callback)
            },
            load: function(e) {
                var t = this,
                    r = t.service.config.params.RoleArn ? "assumeRole" : "getSessionToken";
                this.getTokenCode(function(n, i) {
                    var o = {};
                    n ? e(n) : (i && (o.TokenCode = i), t.service[r](o, function(r, n) {
                        r || t.service.credentialsFrom(n, t), e(r)
                    }))
                })
            },
            getTokenCode: function(e) {
                var t = this;
                this.tokenCodeFn ? this.tokenCodeFn(this.service.config.params.SerialNumber, function(r, i) {
                    if (r) {
                        var o = r;
                        return r instanceof Error && (o = r.message), void e(n.util.error(new Error("Error fetching MFA token: " + o), {
                            code: t.errorCode
                        }))
                    }
                    e(null, i)
                }) : e(null)
            }
        })
    }, {
        "../core": 38
    }],
    29: [function(e, t, r) {
        var n = e("./browserHmac"),
            i = e("./browserMd5"),
            o = e("./browserSha1"),
            a = e("./browserSha256");
        t.exports = {
            createHash: function(e) {
                if ("md5" === (e = e.toLowerCase())) return new i;
                if ("sha256" === e) return new a;
                if ("sha1" === e) return new o;
                throw new Error("Hash algorithm " + e + " is not supported in the browser SDK")
            },
            createHmac: function(e, t) {
                if ("md5" === (e = e.toLowerCase())) return new n(i, t);
                if ("sha256" === e) return new n(a, t);
                if ("sha1" === e) return new n(o, t);
                throw new Error("HMAC algorithm " + e + " is not supported in the browser SDK")
            },
            createSign: function() {
                throw new Error("createSign is not implemented in the browser")
            }
        }
    }, {
        "./browserHmac": 31,
        "./browserMd5": 32,
        "./browserSha1": 33,
        "./browserSha256": 34
    }],
    34: [function(e, t, r) {
        function n() {
            this.state = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1
        }
        var i = e("buffer/").Buffer,
            o = e("./browserHashUtils"),
            a = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
            s = Math.pow(2, 53) - 1;
        t.exports = n, n.BLOCK_SIZE = 64, n.prototype.update = function(e) {
            if (this.finished) throw new Error("Attempted to update an already finished hash.");
            if (o.isEmptyData(e)) return this;
            var t = 0,
                r = (e = o.convertToBuffer(e)).byteLength;
            if (this.bytesHashed += r, 8 * this.bytesHashed > s) throw new Error("Cannot hash more than 2^53 - 1 bits");
            for (; r > 0;) this.buffer[this.bufferLength++] = e[t++], r--, 64 === this.bufferLength && (this.hashBuffer(), this.bufferLength = 0);
            return this
        }, n.prototype.digest = function(e) {
            if (!this.finished) {
                var t = 8 * this.bytesHashed,
                    r = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength),
                    n = this.bufferLength;
                if (r.setUint8(this.bufferLength++, 128), n % 64 >= 56) {
                    for (var o = this.bufferLength; o < 64; o++) r.setUint8(o, 0);
                    this.hashBuffer(), this.bufferLength = 0
                }
                for (o = this.bufferLength; o < 56; o++) r.setUint8(o, 0);
                r.setUint32(56, Math.floor(t / 4294967296), !0), r.setUint32(60, t), this.hashBuffer(), this.finished = !0
            }
            var a = new i(32);
            for (o = 0; o < 8; o++) a[4 * o] = this.state[o] >>> 24 & 255, a[4 * o + 1] = this.state[o] >>> 16 & 255, a[4 * o + 2] = this.state[o] >>> 8 & 255, a[4 * o + 3] = this.state[o] >>> 0 & 255;
            return e ? a.toString(e) : a
        }, n.prototype.hashBuffer = function() {
            for (var e = this.buffer, t = this.state, r = t[0], n = t[1], i = t[2], o = t[3], s = t[4], u = t[5], c = t[6], l = t[7], d = 0; d < 64; d++) {
                if (d < 16) this.temp[d] = (255 & e[4 * d]) << 24 | (255 & e[4 * d + 1]) << 16 | (255 & e[4 * d + 2]) << 8 | 255 & e[4 * d + 3];
                else {
                    var p = this.temp[d - 2],
                        h = (p >>> 17 | p << 15) ^ (p >>> 19 | p << 13) ^ p >>> 10,
                        m = ((p = this.temp[d - 15]) >>> 7 | p << 25) ^ (p >>> 18 | p << 14) ^ p >>> 3;
                    this.temp[d] = (h + this.temp[d - 7] | 0) + (m + this.temp[d - 16] | 0)
                }
                var f = (((s >>> 6 | s << 26) ^ (s >>> 11 | s << 21) ^ (s >>> 25 | s << 7)) + (s & u ^ ~s & c) | 0) + (l + (a[d] + this.temp[d] | 0) | 0) | 0,
                    g = ((r >>> 2 | r << 30) ^ (r >>> 13 | r << 19) ^ (r >>> 22 | r << 10)) + (r & n ^ r & i ^ n & i) | 0;
                l = c, c = u, u = s, s = o + f | 0, o = i, i = n, n = r, r = f + g | 0
            }
            t[0] += r, t[1] += n, t[2] += i, t[3] += o, t[4] += s, t[5] += u, t[6] += c, t[7] += l
        }
    }, {
        "./browserHashUtils": 30,
        "buffer/": 3
    }],
    33: [function(e, t, r) {
        function n() {
            this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, this.h4 = 3285377520, this.block = new Uint32Array(80), this.offset = 0, this.shift = 24, this.totalLength = 0
        }
        var i = e("buffer/").Buffer,
            o = e("./browserHashUtils");
        new Uint32Array([1518500249, 1859775393, -1894007588, -899497514]), Math.pow(2, 53), t.exports = n, n.BLOCK_SIZE = 64, n.prototype.update = function(e) {
            if (this.finished) throw new Error("Attempted to update an already finished hash.");
            if (o.isEmptyData(e)) return this;
            var t = (e = o.convertToBuffer(e)).length;
            this.totalLength += 8 * t;
            for (var r = 0; r < t; r++) this.write(e[r]);
            return this
        }, n.prototype.write = function(e) {
            this.block[this.offset] |= (255 & e) << this.shift, this.shift ? this.shift -= 8 : (this.offset++, this.shift = 24), 16 === this.offset && this.processBlock()
        }, n.prototype.digest = function(e) {
            this.write(128), (this.offset > 14 || 14 === this.offset && this.shift < 24) && this.processBlock(), this.offset = 14, this.shift = 24, this.write(0), this.write(0), this.write(this.totalLength > 0xffffffffff ? this.totalLength / 1099511627776 : 0), this.write(this.totalLength > 4294967295 ? this.totalLength / 4294967296 : 0);
            for (var t = 24; t >= 0; t -= 8) this.write(this.totalLength >> t);
            var r = new i(20),
                n = new DataView(r.buffer);
            return n.setUint32(0, this.h0, !1), n.setUint32(4, this.h1, !1), n.setUint32(8, this.h2, !1), n.setUint32(12, this.h3, !1), n.setUint32(16, this.h4, !1), e ? r.toString(e) : r
        }, n.prototype.processBlock = function() {
            for (var e = 16; e < 80; e++) {
                var t = this.block[e - 3] ^ this.block[e - 8] ^ this.block[e - 14] ^ this.block[e - 16];
                this.block[e] = t << 1 | t >>> 31
            }
            var r, n, i = this.h0,
                o = this.h1,
                a = this.h2,
                s = this.h3,
                u = this.h4;
            for (e = 0; e < 80; e++) {
                e < 20 ? (r = s ^ o & (a ^ s), n = 1518500249) : e < 40 ? (r = o ^ a ^ s, n = 1859775393) : e < 60 ? (r = o & a | s & (o | a), n = 2400959708) : (r = o ^ a ^ s, n = 3395469782);
                var c = (i << 5 | i >>> 27) + r + u + n + (0 | this.block[e]);
                u = s, s = a, a = o << 30 | o >>> 2, o = i, i = c
            }
            for (this.h0 = this.h0 + i | 0, this.h1 = this.h1 + o | 0, this.h2 = this.h2 + a | 0, this.h3 = this.h3 + s | 0, this.h4 = this.h4 + u | 0, this.offset = 0, e = 0; e < 16; e++) this.block[e] = 0
        }
    }, {
        "./browserHashUtils": 30,
        "buffer/": 3
    }],
    32: [function(e, t, r) {
        function n() {
            this.state = [1732584193, 4023233417, 2562383102, 271733878], this.buffer = new DataView(new ArrayBuffer(d)), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1
        }

        function i(e, t, r, n, i, o) {
            return ((t = (t + e & 4294967295) + (n + o & 4294967295) & 4294967295) << i | t >>> 32 - i) + r & 4294967295
        }

        function o(e, t, r, n, o, a, s) {
            return i(t & r | ~t & n, e, t, o, a, s)
        }

        function a(e, t, r, n, o, a, s) {
            return i(t & n | r & ~n, e, t, o, a, s)
        }

        function s(e, t, r, n, o, a, s) {
            return i(t ^ r ^ n, e, t, o, a, s)
        }

        function u(e, t, r, n, o, a, s) {
            return i(r ^ (t | ~n), e, t, o, a, s)
        }
        var c = e("./browserHashUtils"),
            l = e("buffer/").Buffer,
            d = 64;
        t.exports = n, n.BLOCK_SIZE = d, n.prototype.update = function(e) {
            if (c.isEmptyData(e)) return this;
            if (this.finished) throw new Error("Attempted to update an already finished hash.");
            var t = c.convertToBuffer(e),
                r = 0,
                n = t.byteLength;
            for (this.bytesHashed += n; n > 0;) this.buffer.setUint8(this.bufferLength++, t[r++]), n--, this.bufferLength === d && (this.hashBuffer(), this.bufferLength = 0);
            return this
        }, n.prototype.digest = function(e) {
            if (!this.finished) {
                var t = this,
                    r = t.buffer,
                    n = t.bufferLength,
                    i = 8 * t.bytesHashed;
                if (r.setUint8(this.bufferLength++, 128), n % d >= d - 8) {
                    for (var o = this.bufferLength; o < d; o++) r.setUint8(o, 0);
                    this.hashBuffer(), this.bufferLength = 0
                }
                for (o = this.bufferLength; o < d - 8; o++) r.setUint8(o, 0);
                r.setUint32(d - 8, i >>> 0, !0), r.setUint32(d - 4, Math.floor(i / 4294967296), !0), this.hashBuffer(), this.finished = !0
            }
            var a = new DataView(new ArrayBuffer(16));
            for (o = 0; o < 4; o++) a.setUint32(4 * o, this.state[o], !0);
            var s = new l(a.buffer, a.byteOffset, a.byteLength);
            return e ? s.toString(e) : s
        }, n.prototype.hashBuffer = function() {
            var e = this.buffer,
                t = this.state,
                r = t[0],
                n = t[1],
                i = t[2],
                c = t[3];
            n = u(n = u(n = u(n = u(n = s(n = s(n = s(n = s(n = a(n = a(n = a(n = a(n = o(n = o(n = o(n = o(n, i = o(i, c = o(c, r = o(r, n, i, c, e.getUint32(0, !0), 7, 3614090360), n, i, e.getUint32(4, !0), 12, 3905402710), r, n, e.getUint32(8, !0), 17, 606105819), c, r, e.getUint32(12, !0), 22, 3250441966), i = o(i, c = o(c, r = o(r, n, i, c, e.getUint32(16, !0), 7, 4118548399), n, i, e.getUint32(20, !0), 12, 1200080426), r, n, e.getUint32(24, !0), 17, 2821735955), c, r, e.getUint32(28, !0), 22, 4249261313), i = o(i, c = o(c, r = o(r, n, i, c, e.getUint32(32, !0), 7, 1770035416), n, i, e.getUint32(36, !0), 12, 2336552879), r, n, e.getUint32(40, !0), 17, 4294925233), c, r, e.getUint32(44, !0), 22, 2304563134), i = o(i, c = o(c, r = o(r, n, i, c, e.getUint32(48, !0), 7, 1804603682), n, i, e.getUint32(52, !0), 12, 4254626195), r, n, e.getUint32(56, !0), 17, 2792965006), c, r, e.getUint32(60, !0), 22, 1236535329), i = a(i, c = a(c, r = a(r, n, i, c, e.getUint32(4, !0), 5, 4129170786), n, i, e.getUint32(24, !0), 9, 3225465664), r, n, e.getUint32(44, !0), 14, 643717713), c, r, e.getUint32(0, !0), 20, 3921069994), i = a(i, c = a(c, r = a(r, n, i, c, e.getUint32(20, !0), 5, 3593408605), n, i, e.getUint32(40, !0), 9, 38016083), r, n, e.getUint32(60, !0), 14, 3634488961), c, r, e.getUint32(16, !0), 20, 3889429448), i = a(i, c = a(c, r = a(r, n, i, c, e.getUint32(36, !0), 5, 568446438), n, i, e.getUint32(56, !0), 9, 3275163606), r, n, e.getUint32(12, !0), 14, 4107603335), c, r, e.getUint32(32, !0), 20, 1163531501), i = a(i, c = a(c, r = a(r, n, i, c, e.getUint32(52, !0), 5, 2850285829), n, i, e.getUint32(8, !0), 9, 4243563512), r, n, e.getUint32(28, !0), 14, 1735328473), c, r, e.getUint32(48, !0), 20, 2368359562), i = s(i, c = s(c, r = s(r, n, i, c, e.getUint32(20, !0), 4, 4294588738), n, i, e.getUint32(32, !0), 11, 2272392833), r, n, e.getUint32(44, !0), 16, 1839030562), c, r, e.getUint32(56, !0), 23, 4259657740), i = s(i, c = s(c, r = s(r, n, i, c, e.getUint32(4, !0), 4, 2763975236), n, i, e.getUint32(16, !0), 11, 1272893353), r, n, e.getUint32(28, !0), 16, 4139469664), c, r, e.getUint32(40, !0), 23, 3200236656), i = s(i, c = s(c, r = s(r, n, i, c, e.getUint32(52, !0), 4, 681279174), n, i, e.getUint32(0, !0), 11, 3936430074), r, n, e.getUint32(12, !0), 16, 3572445317), c, r, e.getUint32(24, !0), 23, 76029189), i = s(i, c = s(c, r = s(r, n, i, c, e.getUint32(36, !0), 4, 3654602809), n, i, e.getUint32(48, !0), 11, 3873151461), r, n, e.getUint32(60, !0), 16, 530742520), c, r, e.getUint32(8, !0), 23, 3299628645), i = u(i, c = u(c, r = u(r, n, i, c, e.getUint32(0, !0), 6, 4096336452), n, i, e.getUint32(28, !0), 10, 1126891415), r, n, e.getUint32(56, !0), 15, 2878612391), c, r, e.getUint32(20, !0), 21, 4237533241), i = u(i, c = u(c, r = u(r, n, i, c, e.getUint32(48, !0), 6, 1700485571), n, i, e.getUint32(12, !0), 10, 2399980690), r, n, e.getUint32(40, !0), 15, 4293915773), c, r, e.getUint32(4, !0), 21, 2240044497), i = u(i, c = u(c, r = u(r, n, i, c, e.getUint32(32, !0), 6, 1873313359), n, i, e.getUint32(60, !0), 10, 4264355552), r, n, e.getUint32(24, !0), 15, 2734768916), c, r, e.getUint32(52, !0), 21, 1309151649), i = u(i, c = u(c, r = u(r, n, i, c, e.getUint32(16, !0), 6, 4149444226), n, i, e.getUint32(44, !0), 10, 3174756917), r, n, e.getUint32(8, !0), 15, 718787259), c, r, e.getUint32(36, !0), 21, 3951481745), t[0] = r + t[0] & 4294967295, t[1] = n + t[1] & 4294967295, t[2] = i + t[2] & 4294967295, t[3] = c + t[3] & 4294967295
        }
    }, {
        "./browserHashUtils": 30,
        "buffer/": 3
    }],
    31: [function(e, t, r) {
        function n(e, t) {
            this.hash = new e, this.outer = new e;
            var r = i(e, t),
                n = new Uint8Array(e.BLOCK_SIZE);
            n.set(r);
            for (var o = 0; o < e.BLOCK_SIZE; o++) r[o] ^= 54, n[o] ^= 92;
            this.hash.update(r), this.outer.update(n);
            for (o = 0; o < r.byteLength; o++) r[o] = 0
        }

        function i(e, t) {
            var r = o.convertToBuffer(t);
            if (r.byteLength > e.BLOCK_SIZE) {
                var n = new e;
                n.update(r), r = n.digest()
            }
            var i = new Uint8Array(e.BLOCK_SIZE);
            return i.set(r), i
        }
        var o = e("./browserHashUtils");
        t.exports = n, n.prototype.update = function(e) {
            if (o.isEmptyData(e) || this.error) return this;
            try {
                this.hash.update(o.convertToBuffer(e))
            } catch (e) {
                this.error = e
            }
            return this
        }, n.prototype.digest = function(e) {
            return this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest(e)
        }
    }, {
        "./browserHashUtils": 30
    }],
    30: [function(e, t, r) {
        var n = e("buffer/").Buffer;
        "undefined" != typeof ArrayBuffer && void 0 === ArrayBuffer.isView && (ArrayBuffer.isView = function(e) {
            return i.indexOf(Object.prototype.toString.call(e)) > -1
        });
        var i = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]", "[object DataView]"];
        t.exports = {
            isEmptyData: function(e) {
                return "string" == typeof e ? 0 === e.length : 0 === e.byteLength
            },
            convertToBuffer: function(e) {
                return "string" == typeof e && (e = new n(e, "utf8")), ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e)
            }
        }
    }, {
        "buffer/": 3
    }],
    17: [function(e, t, r) {
        function n() {
            this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
        }

        function i(e, t, r) {
            if (e && a(e) && e instanceof n) return e;
            var i = new n;
            return i.parse(e, t, r), i
        }

        function o(e) {
            return "string" == typeof e
        }

        function a(e) {
            return "object" == typeof e && null !== e
        }

        function s(e) {
            return null === e
        }
        var u = e("punycode");
        r.parse = i, r.resolve = function(e, t) {
            return i(e, !1, !0).resolve(t)
        }, r.resolveObject = function(e, t) {
            return e ? i(e, !1, !0).resolveObject(t) : t
        }, r.format = function(e) {
            return o(e) && (e = i(e)), e instanceof n ? e.format() : n.prototype.format.call(e)
        }, r.Url = n;
        var c = /^([a-z0-9.+-]+:)/i,
            l = /:[0-9]*$/,
            d = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
            p = ["'"].concat(d),
            h = ["%", "/", "?", ";", "#"].concat(p),
            m = ["/", "?", "#"],
            f = /^[a-z0-9A-Z_-]{0,63}$/,
            g = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
            y = {
                javascript: !0,
                "javascript:": !0
            },
            v = {
                javascript: !0,
                "javascript:": !0
            },
            b = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            },
            S = e("querystring");
        n.prototype.parse = function(e, t, r) {
            if (!o(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
            var n = e;
            n = n.trim();
            var i = c.exec(n);
            if (i) {
                var a = (i = i[0]).toLowerCase();
                this.protocol = a, n = n.substr(i.length)
            }
            if (r || i || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var s = "//" === n.substr(0, 2);
                !s || i && v[i] || (n = n.substr(2), this.slashes = !0)
            }
            if (!v[i] && (s || i && !b[i])) {
                for (var l = -1, d = 0; d < m.length; d++) {
                    -1 !== (_ = n.indexOf(m[d])) && (-1 === l || _ < l) && (l = _)
                }
                var k, C; - 1 !== (C = -1 === l ? n.lastIndexOf("@") : n.lastIndexOf("@", l)) && (k = n.slice(0, C), n = n.slice(C + 1), this.auth = decodeURIComponent(k)), l = -1;
                for (d = 0; d < h.length; d++) {
                    var _; - 1 !== (_ = n.indexOf(h[d])) && (-1 === l || _ < l) && (l = _)
                } - 1 === l && (l = n.length), this.host = n.slice(0, l), n = n.slice(l), this.parseHost(), this.hostname = this.hostname || "";
                var w = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                if (!w)
                    for (var E = this.hostname.split(/\./), x = (d = 0, E.length); d < x; d++) {
                        var T = E[d];
                        if (T && !T.match(f)) {
                            for (var R = "", N = 0, I = T.length; N < I; N++) T.charCodeAt(N) > 127 ? R += "x" : R += T[N];
                            if (!R.match(f)) {
                                var M = E.slice(0, d),
                                    P = E.slice(d + 1),
                                    A = T.match(g);
                                A && (M.push(A[1]), P.unshift(A[2])), P.length && (n = "/" + P.join(".") + n), this.hostname = M.join(".");
                                break
                            }
                        }
                    }
                if (this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !w) {
                    var q = this.hostname.split("."),
                        D = [];
                    for (d = 0; d < q.length; ++d) {
                        var B = q[d];
                        D.push(B.match(/[^A-Za-z0-9_-]/) ? "xn--" + u.encode(B) : B)
                    }
                    this.hostname = D.join(".")
                }
                var L = this.port ? ":" + this.port : "",
                    U = this.hostname || "";
                this.host = U + L, this.href += this.host, w && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n))
            }
            if (!y[a])
                for (d = 0, x = p.length; d < x; d++) {
                    var O = p[d],
                        z = encodeURIComponent(O);
                    z === O && (z = escape(O)), n = n.split(O).join(z)
                }
            var j = n.indexOf("#"); - 1 !== j && (this.hash = n.substr(j), n = n.slice(0, j));
            var F = n.indexOf("?");
            if (-1 !== F ? (this.search = n.substr(F), this.query = n.substr(F + 1), t && (this.query = S.parse(this.query)), n = n.slice(0, F)) : t && (this.search = "", this.query = {}), n && (this.pathname = n), b[a] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                L = this.pathname || "", B = this.search || "";
                this.path = L + B
            }
            return this.href = this.format(), this
        }, n.prototype.format = function() {
            var e = this.auth || "";
            e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
            var t = this.protocol || "",
                r = this.pathname || "",
                n = this.hash || "",
                i = !1,
                o = "";
            this.host ? i = e + this.host : this.hostname && (i = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && a(this.query) && Object.keys(this.query).length && (o = S.stringify(this.query));
            var s = this.search || o && "?" + o || "";
            return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || b[t]) && !1 !== i ? (i = "//" + (i || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : i || (i = ""), n && "#" !== n.charAt(0) && (n = "#" + n), s && "?" !== s.charAt(0) && (s = "?" + s), t + i + (r = r.replace(/[?#]/g, function(e) {
                return encodeURIComponent(e)
            })) + (s = s.replace("#", "%23")) + n
        }, n.prototype.resolve = function(e) {
            return this.resolveObject(i(e, !1, !0)).format()
        }, n.prototype.resolveObject = function(e) {
            if (o(e)) {
                var t = new n;
                t.parse(e, !1, !0), e = t
            }
            var r = new n;
            if (Object.keys(this).forEach(function(e) {
                    r[e] = this[e]
                }, this), r.hash = e.hash, "" === e.href) return r.href = r.format(), r;
            if (e.slashes && !e.protocol) return Object.keys(e).forEach(function(t) {
                "protocol" !== t && (r[t] = e[t])
            }), b[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
            if (e.protocol && e.protocol !== r.protocol) {
                if (!b[e.protocol]) return Object.keys(e).forEach(function(t) {
                    r[t] = e[t]
                }), r.href = r.format(), r;
                if (r.protocol = e.protocol, e.host || v[e.protocol]) r.pathname = e.pathname;
                else {
                    for (var i = (e.pathname || "").split("/"); i.length && !(e.host = i.shift()););
                    e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== i[0] && i.unshift(""), i.length < 2 && i.unshift(""), r.pathname = i.join("/")
                }
                if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
                    var a = r.pathname || "",
                        u = r.search || "";
                    r.path = a + u
                }
                return r.slashes = r.slashes || e.slashes, r.href = r.format(), r
            }
            var c = r.pathname && "/" === r.pathname.charAt(0),
                l = e.host || e.pathname && "/" === e.pathname.charAt(0),
                d = l || c || r.host && e.pathname,
                p = d,
                h = r.pathname && r.pathname.split("/") || [],
                m = (i = e.pathname && e.pathname.split("/") || [], r.protocol && !b[r.protocol]);
            if (m && (r.hostname = "", r.port = null, r.host && ("" === h[0] ? h[0] = r.host : h.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === i[0] ? i[0] = e.host : i.unshift(e.host)), e.host = null), d = d && ("" === i[0] || "" === h[0])), l) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, h = i;
            else if (i.length) h || (h = []), h.pop(), h = h.concat(i), r.search = e.search, r.query = e.query;
            else if (! function(e) {
                    return null == e
                }(e.search)) {
                if (m) r.hostname = r.host = h.shift(), (k = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = k.shift(), r.host = r.hostname = k.shift());
                return r.search = e.search, r.query = e.query, s(r.pathname) && s(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
            }
            if (!h.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
            for (var f = h.slice(-1)[0], g = (r.host || e.host) && ("." === f || ".." === f) || "" === f, y = 0, S = h.length; S >= 0; S--) "." == (f = h[S]) ? h.splice(S, 1) : ".." === f ? (h.splice(S, 1), y++) : y && (h.splice(S, 1), y--);
            if (!d && !p)
                for (; y--; y) h.unshift("..");
            !d || "" === h[0] || h[0] && "/" === h[0].charAt(0) || h.unshift(""), g && "/" !== h.join("/").substr(-1) && h.push("");
            var k, C = "" === h[0] || h[0] && "/" === h[0].charAt(0);
            m && (r.hostname = r.host = C ? "" : h.length ? h.shift() : "", (k = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = k.shift(), r.host = r.hostname = k.shift()));
            return (d = d || r.host && h.length) && !C && h.unshift(""), h.length ? r.pathname = h.join("/") : (r.pathname = null, r.path = null), s(r.pathname) && s(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r
        }, n.prototype.parseHost = function() {
            var e = this.host,
                t = l.exec(e);
            t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
        }
    }, {
        punycode: 9,
        querystring: 12
    }],
    15: [function(e, t, r) {
        arguments[4][12][0].apply(r, arguments)
    }, {
        "./decode": 13,
        "./encode": 14,
        dup: 12
    }],
    14: [function(e, t, r) {
        "use strict";
        var n = function(e) {
            switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "true" : "false";
                case "number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
            }
        };
        t.exports = function(e, t, r, i) {
            return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map(function(i) {
                var o = encodeURIComponent(n(i)) + r;
                return Array.isArray(e[i]) ? e[i].map(function(e) {
                    return o + encodeURIComponent(n(e))
                }).join(t) : o + encodeURIComponent(n(e[i]))
            }).join(t) : i ? encodeURIComponent(n(i)) + r + encodeURIComponent(n(e)) : ""
        }
    }, {}],
    13: [function(e, t, r) {
        "use strict";

        function n(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.exports = function(e, t, r, i) {
            t = t || "&", r = r || "=";
            var o = {};
            if ("string" != typeof e || 0 === e.length) return o;
            var a = /\+/g;
            e = e.split(t);
            var s = 1e3;
            i && "number" == typeof i.maxKeys && (s = i.maxKeys);
            var u = e.length;
            s > 0 && u > s && (u = s);
            for (var c = 0; c < u; ++c) {
                var l, d, p, h, m = e[c].replace(a, "%20"),
                    f = m.indexOf(r);
                f >= 0 ? (l = m.substr(0, f), d = m.substr(f + 1)) : (l = m, d = ""), p = decodeURIComponent(l), h = decodeURIComponent(d), n(o, p) ? Array.isArray(o[p]) ? o[p].push(h) : o[p] = [o[p], h] : o[p] = h
            }
            return o
        }
    }, {}],
    12: [function(e, t, r) {
        "use strict";
        r.decode = r.parse = e("./decode"), r.encode = r.stringify = e("./encode")
    }, {
        "./decode": 10,
        "./encode": 11
    }],
    11: [function(e, t, r) {
        "use strict";

        function n(e, t) {
            if (e.map) return e.map(t);
            for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
            return r
        }
        var i = function(e) {
            switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "true" : "false";
                case "number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
            }
        };
        t.exports = function(e, t, r, s) {
            return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? n(a(e), function(a) {
                var s = encodeURIComponent(i(a)) + r;
                return o(e[a]) ? n(e[a], function(e) {
                    return s + encodeURIComponent(i(e))
                }).join(t) : s + encodeURIComponent(i(e[a]))
            }).join(t) : s ? encodeURIComponent(i(s)) + r + encodeURIComponent(i(e)) : ""
        };
        var o = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            a = Object.keys || function(e) {
                var t = [];
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                return t
            }
    }, {}],
    10: [function(e, t, r) {
        "use strict";

        function n(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.exports = function(e, t, r, o) {
            t = t || "&", r = r || "=";
            var a = {};
            if ("string" != typeof e || 0 === e.length) return a;
            var s = /\+/g;
            e = e.split(t);
            var u = 1e3;
            o && "number" == typeof o.maxKeys && (u = o.maxKeys);
            var c = e.length;
            u > 0 && c > u && (c = u);
            for (var l = 0; l < c; ++l) {
                var d, p, h, m, f = e[l].replace(s, "%20"),
                    g = f.indexOf(r);
                g >= 0 ? (d = f.substr(0, g), p = f.substr(g + 1)) : (d = f, p = ""), h = decodeURIComponent(d), m = decodeURIComponent(p), n(a, h) ? i(a[h]) ? a[h].push(m) : a[h] = [a[h], m] : a[h] = m
            }
            return a
        };
        var i = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    }, {}],
    9: [function(e, t, r) {
        (function(e) {
            ! function(n) {
                function i(e) {
                    throw RangeError(M[e])
                }

                function o(e, t) {
                    for (var r = e.length, n = []; r--;) n[r] = t(e[r]);
                    return n
                }

                function a(e, t) {
                    var r = e.split("@"),
                        n = "";
                    return r.length > 1 && (n = r[0] + "@", e = r[1]), n + o((e = e.replace(I, ".")).split("."), t).join(".")
                }

                function s(e) {
                    for (var t, r, n = [], i = 0, o = e.length; i < o;)(t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (r = e.charCodeAt(i++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), i--) : n.push(t);
                    return n
                }

                function u(e) {
                    return o(e, function(e) {
                        var t = "";
                        return e > 65535 && (t += q((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t + q(e)
                    }).join("")
                }

                function c(e) {
                    return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : S
                }

                function l(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                }

                function d(e, t, r) {
                    var n = 0;
                    for (e = r ? A(e / w) : e >> 1, e += A(e / t); e > P * C >> 1; n += S) e = A(e / P);
                    return A(n + (P + 1) * e / (e + _))
                }

                function p(e) {
                    var t, r, n, o, a, s, l, p, h, m, f = [],
                        g = e.length,
                        y = 0,
                        v = x,
                        _ = E;
                    for ((r = e.lastIndexOf(T)) < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && i("not-basic"), f.push(e.charCodeAt(n));
                    for (o = r > 0 ? r + 1 : 0; o < g;) {
                        for (a = y, s = 1, l = S; o >= g && i("invalid-input"), ((p = c(e.charCodeAt(o++))) >= S || p > A((b - y) / s)) && i("overflow"), y += p * s, !(p < (h = l <= _ ? k : l >= _ + C ? C : l - _)); l += S) s > A(b / (m = S - h)) && i("overflow"), s *= m;
                        _ = d(y - a, t = f.length + 1, 0 == a), A(y / t) > b - v && i("overflow"), v += A(y / t), y %= t, f.splice(y++, 0, v)
                    }
                    return u(f)
                }

                function h(e) {
                    var t, r, n, o, a, u, c, p, h, m, f, g, y, v, _, w = [];
                    for (g = (e = s(e)).length, t = x, r = 0, a = E, u = 0; u < g; ++u)(f = e[u]) < 128 && w.push(q(f));
                    for (n = o = w.length, o && w.push(T); n < g;) {
                        for (c = b, u = 0; u < g; ++u)(f = e[u]) >= t && f < c && (c = f);
                        for (c - t > A((b - r) / (y = n + 1)) && i("overflow"), r += (c - t) * y, t = c, u = 0; u < g; ++u)
                            if ((f = e[u]) < t && ++r > b && i("overflow"), f == t) {
                                for (p = r, h = S; !(p < (m = h <= a ? k : h >= a + C ? C : h - a)); h += S) _ = p - m, v = S - m, w.push(q(l(m + _ % v, 0))), p = A(_ / v);
                                w.push(q(l(p, 0))), a = d(r, y, n == o), r = 0, ++n
                            }++ r, ++t
                    }
                    return w.join("")
                }
                var m = "object" == typeof r && r && !r.nodeType && r,
                    f = "object" == typeof t && t && !t.nodeType && t,
                    g = "object" == typeof e && e;
                g.global !== g && g.window !== g && g.self !== g || (n = g);
                var y, v, b = 2147483647,
                    S = 36,
                    k = 1,
                    C = 26,
                    _ = 38,
                    w = 700,
                    E = 72,
                    x = 128,
                    T = "-",
                    R = /^xn--/,
                    N = /[^\x20-\x7E]/,
                    I = /[\x2E\u3002\uFF0E\uFF61]/g,
                    M = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    },
                    P = S - k,
                    A = Math.floor,
                    q = String.fromCharCode;
                if (y = {
                        version: "1.3.2",
                        ucs2: {
                            decode: s,
                            encode: u
                        },
                        decode: p,
                        encode: h,
                        toASCII: function(e) {
                            return a(e, function(e) {
                                return N.test(e) ? "xn--" + h(e) : e
                            })
                        },
                        toUnicode: function(e) {
                            return a(e, function(e) {
                                return R.test(e) ? p(e.slice(4).toLowerCase()) : e
                            })
                        }
                    }, "function" == typeof define && "object" == typeof define.amd && define.amd) define("punycode", function() {
                    return y
                });
                else if (m && f)
                    if (t.exports == m) f.exports = y;
                    else
                        for (v in y) y.hasOwnProperty(v) && (m[v] = y[v]);
                else n.punycode = y
            }(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    4: [function(e, t, r) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function i(e) {
            return "function" == typeof e
        }

        function o(e) {
            return "object" == typeof e && null !== e
        }

        function a(e) {
            return void 0 === e
        }
        t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
            if (! function(e) {
                    return "number" == typeof e
                }(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, n.prototype.emit = function(e) {
            var t, r, n, s, u, c;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if ((t = arguments[1]) instanceof Error) throw t;
                var l = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw l.context = t, l
            }
            if (a(r = this._events[e])) return !1;
            if (i(r)) switch (arguments.length) {
                case 1:
                    r.call(this);
                    break;
                case 2:
                    r.call(this, arguments[1]);
                    break;
                case 3:
                    r.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    s = Array.prototype.slice.call(arguments, 1), r.apply(this, s)
            } else if (o(r))
                for (s = Array.prototype.slice.call(arguments, 1), n = (c = r.slice()).length, u = 0; u < n; u++) c[u].apply(this, s);
            return !0
        }, n.prototype.addListener = function(e, t) {
            var r;
            if (!i(t)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (r = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
            function r() {
                this.removeListener(e, r), n || (n = !0, t.apply(this, arguments))
            }
            if (!i(t)) throw TypeError("listener must be a function");
            var n = !1;
            return r.listener = t, this.on(e, r), this
        }, n.prototype.removeListener = function(e, t) {
            var r, n, a, s;
            if (!i(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (a = (r = this._events[e]).length, n = -1, r === t || i(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (o(r)) {
                for (s = a; s-- > 0;)
                    if (r[s] === t || r[s].listener && r[s].listener === t) {
                        n = s;
                        break
                    } if (n < 0) return this;
                1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, n.prototype.removeAllListeners = function(e) {
            var t, r;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (i(r = this._events[e])) this.removeListener(e, r);
            else if (r)
                for (; r.length;) this.removeListener(e, r[r.length - 1]);
            return delete this._events[e], this
        }, n.prototype.listeners = function(e) {
            return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, n.prototype.listenerCount = function(e) {
            if (this._events) {
                var t = this._events[e];
                if (i(t)) return 1;
                if (t) return t.length
            }
            return 0
        }, n.listenerCount = function(e, t) {
            return e.listenerCount(t)
        }
    }, {}],
    3: [function(e, t, r) {
        (function(t, n) {
            "use strict";

            function i() {
                return n.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function o(e, t) {
                if (i() < t) throw new RangeError("Invalid typed array length");
                return n.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = n.prototype : (null === e && (e = new n(t)), e.length = t), e
            }

            function n(e, t, r) {
                if (!(n.TYPED_ARRAY_SUPPORT || this instanceof n)) return new n(e, t, r);
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return u(this, e)
                }
                return a(this, e, t, r)
            }

            function a(e, t, r, n) {
                if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? d(e, t, r, n) : "string" == typeof t ? c(e, t, r) : p(e, t)
            }

            function s(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                if (e < 0) throw new RangeError('"size" argument must not be negative')
            }

            function u(e, t) {
                if (s(t), e = o(e, t < 0 ? 0 : 0 | h(t)), !n.TYPED_ARRAY_SUPPORT)
                    for (var r = 0; r < t; ++r) e[r] = 0;
                return e
            }

            function c(e, t, r) {
                if ("string" == typeof r && "" !== r || (r = "utf8"), !n.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                var i = 0 | m(t, r),
                    a = (e = o(e, i)).write(t, r);
                return a !== i && (e = e.slice(0, a)), e
            }

            function l(e, t) {
                var r = t.length < 0 ? 0 : 0 | h(t.length);
                e = o(e, r);
                for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
                return e
            }

            function d(e, t, r, i) {
                if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < r + (i || 0)) throw new RangeError("'length' is out of bounds");
                return t = void 0 === r && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, r) : new Uint8Array(t, r, i), n.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = n.prototype : e = l(e, t), e
            }

            function p(e, t) {
                if (n.isBuffer(t)) {
                    var r = 0 | h(t.length);
                    return 0 === (e = o(e, r)).length ? e : (t.copy(e, 0, 0, r), e)
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || function(e) {
                        return e != e
                    }(t.length) ? o(e, 0) : l(e, t);
                    if ("Buffer" === t.type && V(t.data)) return l(e, t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }

            function h(e) {
                if (e >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
                return 0 | e
            }

            function m(e, t) {
                if (n.isBuffer(e)) return e.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var r = e.length;
                if (0 === r) return 0;
                for (var i = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return U(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return O(e).length;
                    default:
                        if (i) return U(e).length;
                        t = ("" + t).toLowerCase(), i = !0
                }
            }

            function f(e, t, r) {
                var n = e[t];
                e[t] = e[r], e[r] = n
            }

            function g(e, t, r, i, o) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                    if (o) return -1;
                    r = e.length - 1
                } else if (r < 0) {
                    if (!o) return -1;
                    r = 0
                }
                if ("string" == typeof t && (t = n.from(t, i)), n.isBuffer(t)) return 0 === t.length ? -1 : y(e, t, r, i, o);
                if ("number" == typeof t) return t &= 255, n.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : y(e, [t], r, i, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function y(e, t, r, n, i) {
                function o(e, t) {
                    return 1 === s ? e[t] : e.readUInt16BE(t * s)
                }
                var a, s = 1,
                    u = e.length,
                    c = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    s = 2, u /= 2, c /= 2, r /= 2
                }
                if (i) {
                    var l = -1;
                    for (a = r; a < u; a++)
                        if (o(e, a) === o(t, -1 === l ? 0 : a - l)) {
                            if (-1 === l && (l = a), a - l + 1 === c) return l * s
                        } else -1 !== l && (a -= a - l), l = -1
                } else
                    for (r + c > u && (r = u - c), a = r; a >= 0; a--) {
                        for (var d = !0, p = 0; p < c; p++)
                            if (o(e, a + p) !== o(t, p)) {
                                d = !1;
                                break
                            } if (d) return a
                    }
                return -1
            }

            function v(e, t, r, n) {
                r = Number(r) || 0;
                var i = e.length - r;
                n ? (n = Number(n)) > i && (n = i) : n = i;
                var o = t.length;
                if (o % 2 != 0) throw new TypeError("Invalid hex string");
                n > o / 2 && (n = o / 2);
                for (var a = 0; a < n; ++a) {
                    var s = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(s)) return a;
                    e[r + a] = s
                }
                return a
            }

            function b(e, t, r, n) {
                return z(U(t, e.length - r), e, r, n)
            }

            function S(e, t, r, n) {
                return z(function(e) {
                    for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                    return t
                }(t), e, r, n)
            }

            function k(e, t, r, n) {
                return S(e, t, r, n)
            }

            function C(e, t, r, n) {
                return z(O(t), e, r, n)
            }

            function _(e, t, r, n) {
                return z(function(e, t) {
                    for (var r, n, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) r = e.charCodeAt(a), n = r >> 8, i = r % 256, o.push(i), o.push(n);
                    return o
                }(t, e.length - r), e, r, n)
            }

            function w(e, t, r) {
                return 0 === t && r === e.length ? j.fromByteArray(e) : j.fromByteArray(e.slice(t, r))
            }

            function E(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], i = t; i < r;) {
                    var o, a, s, u, c = e[i],
                        l = null,
                        d = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                    if (i + d <= r) switch (d) {
                        case 1:
                            c < 128 && (l = c);
                            break;
                        case 2:
                            128 == (192 & (o = e[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 && (l = u);
                            break;
                        case 3:
                            o = e[i + 1], a = e[i + 2], 128 == (192 & o) && 128 == (192 & a) && (u = (15 & c) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (l = u);
                            break;
                        case 4:
                            o = e[i + 1], a = e[i + 2], s = e[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (u = (15 & c) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (l = u)
                    }
                    null === l ? (l = 65533, d = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), n.push(l), i += d
                }
                return function(e) {
                    var t = e.length;
                    if (t <= H) return String.fromCharCode.apply(String, e);
                    for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += H));
                    return r
                }(n)
            }

            function x(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                return n
            }

            function T(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                return n
            }

            function R(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                for (var i = "", o = t; o < r; ++o) i += L(e[o]);
                return i
            }

            function N(e, t, r) {
                for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i
            }

            function I(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
            }

            function M(e, t, r, i, o, a) {
                if (!n.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > o || t < a) throw new RangeError('"value" argument is out of bounds');
                if (r + i > e.length) throw new RangeError("Index out of range")
            }

            function P(e, t, r, n) {
                t < 0 && (t = 65535 + t + 1);
                for (var i = 0, o = Math.min(e.length - r, 2); i < o; ++i) e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
            }

            function A(e, t, r, n) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var i = 0, o = Math.min(e.length - r, 4); i < o; ++i) e[r + i] = t >>> 8 * (n ? i : 3 - i) & 255
            }

            function q(e, t, r, n, i, o) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function D(e, t, r, n, i) {
                return i || q(e, 0, r, 4), F.write(e, t, r, n, 23, 4), r + 4
            }

            function B(e, t, r, n, i) {
                return i || q(e, 0, r, 8), F.write(e, t, r, n, 52, 8), r + 8
            }

            function L(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function U(e, t) {
                t = t || 1 / 0;
                for (var r, n = e.length, i = null, o = [], a = 0; a < n; ++a) {
                    if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
                        if (!i) {
                            if (r > 56319) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (a + 1 === n) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            i = r;
                            continue
                        }
                        if (r < 56320) {
                            (t -= 3) > -1 && o.push(239, 191, 189), i = r;
                            continue
                        }
                        r = 65536 + (i - 55296 << 10 | r - 56320)
                    } else i && (t -= 3) > -1 && o.push(239, 191, 189);
                    if (i = null, r < 128) {
                        if ((t -= 1) < 0) break;
                        o.push(r)
                    } else if (r < 2048) {
                        if ((t -= 2) < 0) break;
                        o.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((t -= 3) < 0) break;
                        o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return o
            }

            function O(e) {
                return j.toByteArray(function(e) {
                    if ((e = function(e) {
                            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                        }(e).replace(K, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function z(e, t, r, n) {
                for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                return i
            }
            var j = e("base64-js"),
                F = e("ieee754"),
                V = e("isarray");
            r.Buffer = n, r.SlowBuffer = function(e) {
                return +e != e && (e = 0), n.alloc(+e)
            }, r.INSPECT_MAX_BYTES = 50, n.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                } catch (e) {
                    return !1
                }
            }(), r.kMaxLength = i(), n.poolSize = 8192, n._augment = function(e) {
                return e.__proto__ = n.prototype, e
            }, n.from = function(e, t, r) {
                return a(null, e, t, r)
            }, n.TYPED_ARRAY_SUPPORT && (n.prototype.__proto__ = Uint8Array.prototype, n.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && n[Symbol.species] === n && Object.defineProperty(n, Symbol.species, {
                value: null,
                configurable: !0
            })), n.alloc = function(e, t, r) {
                return function(e, t, r, n) {
                    return s(t), t <= 0 ? o(e, t) : void 0 !== r ? "string" == typeof n ? o(e, t).fill(r, n) : o(e, t).fill(r) : o(e, t)
                }(null, e, t, r)
            }, n.allocUnsafe = function(e) {
                return u(null, e)
            }, n.allocUnsafeSlow = function(e) {
                return u(null, e)
            }, n.isBuffer = function(e) {
                return !(null == e || !e._isBuffer)
            }, n.compare = function(e, t) {
                if (!n.isBuffer(e) || !n.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var r = e.length, i = t.length, o = 0, a = Math.min(r, i); o < a; ++o)
                    if (e[o] !== t[o]) {
                        r = e[o], i = t[o];
                        break
                    } return r < i ? -1 : i < r ? 1 : 0
            }, n.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, n.concat = function(e, t) {
                if (!V(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return n.alloc(0);
                var r;
                if (void 0 === t)
                    for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                var i = n.allocUnsafe(t),
                    o = 0;
                for (r = 0; r < e.length; ++r) {
                    var a = e[r];
                    if (!n.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                    a.copy(i, o), o += a.length
                }
                return i
            }, n.byteLength = m, n.prototype._isBuffer = !0, n.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) f(this, t, t + 1);
                return this
            }, n.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) f(this, t, t + 3), f(this, t + 1, t + 2);
                return this
            }, n.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) f(this, t, t + 7), f(this, t + 1, t + 6), f(this, t + 2, t + 5), f(this, t + 3, t + 4);
                return this
            }, n.prototype.toString = function() {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? E(this, 0, e) : function(e, t, r) {
                    var n = !1;
                    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e || (e = "utf8");;) switch (e) {
                        case "hex":
                            return R(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return E(this, t, r);
                        case "ascii":
                            return x(this, t, r);
                        case "latin1":
                        case "binary":
                            return T(this, t, r);
                        case "base64":
                            return w(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return N(this, t, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), n = !0
                    }
                }.apply(this, arguments)
            }, n.prototype.equals = function(e) {
                if (!n.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === n.compare(this, e)
            }, n.prototype.inspect = function() {
                var e = "",
                    t = r.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
            }, n.prototype.compare = function(e, t, r, i, o) {
                if (!n.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                if (i >= o && t >= r) return 0;
                if (i >= o) return -1;
                if (t >= r) return 1;
                if (t >>>= 0, r >>>= 0, i >>>= 0, o >>>= 0, this === e) return 0;
                for (var a = o - i, s = r - t, u = Math.min(a, s), c = this.slice(i, o), l = e.slice(t, r), d = 0; d < u; ++d)
                    if (c[d] !== l[d]) {
                        a = c[d], s = l[d];
                        break
                    } return a < s ? -1 : s < a ? 1 : 0
            }, n.prototype.includes = function(e, t, r) {
                return -1 !== this.indexOf(e, t, r)
            }, n.prototype.indexOf = function(e, t, r) {
                return g(this, e, t, r, !0)
            }, n.prototype.lastIndexOf = function(e, t, r) {
                return g(this, e, t, r, !1)
            }, n.prototype.write = function(e, t, r, n) {
                if (void 0 === t) n = "utf8", r = this.length, t = 0;
                else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                }
                var i = this.length - t;
                if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var o = !1;;) switch (n) {
                    case "hex":
                        return v(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                        return b(this, e, t, r);
                    case "ascii":
                        return S(this, e, t, r);
                    case "latin1":
                    case "binary":
                        return k(this, e, t, r);
                    case "base64":
                        return C(this, e, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return _(this, e, t, r);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), o = !0
                }
            }, n.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var H = 4096;
            n.prototype.slice = function(e, t) {
                var r, i = this.length;
                if (e = ~~e, t = void 0 === t ? i : ~~t, e < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), t < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), t < e && (t = e), n.TYPED_ARRAY_SUPPORT)(r = this.subarray(e, t)).__proto__ = n.prototype;
                else {
                    var o = t - e;
                    r = new n(o, void 0);
                    for (var a = 0; a < o; ++a) r[a] = this[a + e]
                }
                return r
            }, n.prototype.readUIntLE = function(e, t, r) {
                e |= 0, t |= 0, r || I(e, t, this.length);
                for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                return n
            }, n.prototype.readUIntBE = function(e, t, r) {
                e |= 0, t |= 0, r || I(e, t, this.length);
                for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) n += this[e + --t] * i;
                return n
            }, n.prototype.readUInt8 = function(e, t) {
                return t || I(e, 1, this.length), this[e]
            }, n.prototype.readUInt16LE = function(e, t) {
                return t || I(e, 2, this.length), this[e] | this[e + 1] << 8
            }, n.prototype.readUInt16BE = function(e, t) {
                return t || I(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, n.prototype.readUInt32LE = function(e, t) {
                return t || I(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, n.prototype.readUInt32BE = function(e, t) {
                return t || I(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, n.prototype.readIntLE = function(e, t, r) {
                e |= 0, t |= 0, r || I(e, t, this.length);
                for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n
            }, n.prototype.readIntBE = function(e, t, r) {
                e |= 0, t |= 0, r || I(e, t, this.length);
                for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) o += this[e + --n] * i;
                return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o
            }, n.prototype.readInt8 = function(e, t) {
                return t || I(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, n.prototype.readInt16LE = function(e, t) {
                t || I(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, n.prototype.readInt16BE = function(e, t) {
                t || I(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, n.prototype.readInt32LE = function(e, t) {
                return t || I(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, n.prototype.readInt32BE = function(e, t) {
                return t || I(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, n.prototype.readFloatLE = function(e, t) {
                return t || I(e, 4, this.length), F.read(this, e, !0, 23, 4)
            }, n.prototype.readFloatBE = function(e, t) {
                return t || I(e, 4, this.length), F.read(this, e, !1, 23, 4)
            }, n.prototype.readDoubleLE = function(e, t) {
                return t || I(e, 8, this.length), F.read(this, e, !0, 52, 8)
            }, n.prototype.readDoubleBE = function(e, t) {
                return t || I(e, 8, this.length), F.read(this, e, !1, 52, 8)
            }, n.prototype.writeUIntLE = function(e, t, r, n) {
                e = +e, t |= 0, r |= 0, n || M(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = 1,
                    o = 0;
                for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                return t + r
            }, n.prototype.writeUIntBE = function(e, t, r, n) {
                e = +e, t |= 0, r |= 0, n || M(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = r - 1,
                    o = 1;
                for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) this[t + i] = e / o & 255;
                return t + r
            }, n.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 1, 255, 0), n.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
            }, n.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 2, 65535, 0), n.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2
            }, n.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 2, 65535, 0), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2
            }, n.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 4, 4294967295, 0), n.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : A(this, e, t, !0), t + 4
            }, n.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 4, 4294967295, 0), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : A(this, e, t, !1), t + 4
            }, n.prototype.writeIntLE = function(e, t, r, n) {
                if (e = +e, t |= 0, !n) {
                    var i = Math.pow(2, 8 * r - 1);
                    M(this, e, t, r, i - 1, -i)
                }
                var o = 0,
                    a = 1,
                    s = 0;
                for (this[t] = 255 & e; ++o < r && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                return t + r
            }, n.prototype.writeIntBE = function(e, t, r, n) {
                if (e = +e, t |= 0, !n) {
                    var i = Math.pow(2, 8 * r - 1);
                    M(this, e, t, r, i - 1, -i)
                }
                var o = r - 1,
                    a = 1,
                    s = 0;
                for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                return t + r
            }, n.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 1, 127, -128), n.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, n.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 2, 32767, -32768), n.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2
            }, n.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 2, 32767, -32768), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2
            }, n.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 4, 2147483647, -2147483648), n.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : A(this, e, t, !0), t + 4
            }, n.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t |= 0, r || M(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), n.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : A(this, e, t, !1), t + 4
            }, n.prototype.writeFloatLE = function(e, t, r) {
                return D(this, e, t, !0, r)
            }, n.prototype.writeFloatBE = function(e, t, r) {
                return D(this, e, t, !1, r)
            }, n.prototype.writeDoubleLE = function(e, t, r) {
                return B(this, e, t, !0, r)
            }, n.prototype.writeDoubleBE = function(e, t, r) {
                return B(this, e, t, !1, r)
            }, n.prototype.copy = function(e, t, r, i) {
                if (r || (r = 0), i || 0 === i || (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < r && (i = r), i === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (i < 0) throw new RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length), e.length - t < i - r && (i = e.length - t + r);
                var o, a = i - r;
                if (this === e && r < t && t < i)
                    for (o = a - 1; o >= 0; --o) e[o + t] = this[o + r];
                else if (a < 1e3 || !n.TYPED_ARRAY_SUPPORT)
                    for (o = 0; o < a; ++o) e[o + t] = this[o + r];
                else Uint8Array.prototype.set.call(e, this.subarray(r, r + a), t);
                return a
            }, n.prototype.fill = function(e, t, r, i) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (i = t, t = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), 1 === e.length) {
                        var o = e.charCodeAt(0);
                        o < 256 && (e = o)
                    }
                    if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                    if ("string" == typeof i && !n.isEncoding(i)) throw new TypeError("Unknown encoding: " + i)
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                if (r <= t) return this;
                var a;
                if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
                    for (a = t; a < r; ++a) this[a] = e;
                else {
                    var s = n.isBuffer(e) ? e : U(new n(e, i).toString()),
                        u = s.length;
                    for (a = 0; a < r - t; ++a) this[a + t] = s[a % u]
                }
                return this
            };
            var K = /[^+\/0-9A-Za-z-_]/g
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer)
    }, {
        "base64-js": 1,
        buffer: 3,
        ieee754: 5,
        isarray: 6
    }],
    6: [function(e, t, r) {
        var n = {}.toString;
        t.exports = Array.isArray || function(e) {
            return "[object Array]" == n.call(e)
        }
    }, {}],
    5: [function(e, t, r) {
        r.read = function(e, t, r, n, i) {
            var o, a, s = 8 * i - n - 1,
                u = (1 << s) - 1,
                c = u >> 1,
                l = -7,
                d = r ? i - 1 : 0,
                p = r ? -1 : 1,
                h = e[t + d];
            for (d += p, o = h & (1 << -l) - 1, h >>= -l, l += s; l > 0; o = 256 * o + e[t + d], d += p, l -= 8);
            for (a = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; a = 256 * a + e[t + d], d += p, l -= 8);
            if (0 === o) o = 1 - c;
            else {
                if (o === u) return a ? NaN : 1 / 0 * (h ? -1 : 1);
                a += Math.pow(2, n), o -= c
            }
            return (h ? -1 : 1) * a * Math.pow(2, o - n)
        }, r.write = function(e, t, r, n, i, o) {
            var a, s, u, c = 8 * o - i - 1,
                l = (1 << c) - 1,
                d = l >> 1,
                p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                h = n ? 0 : o - 1,
                m = n ? 1 : -1,
                f = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = l) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (t += a + d >= 1 ? p / u : p * Math.pow(2, 1 - d)) * u >= 2 && (a++, u /= 2), a + d >= l ? (s = 0, a = l) : a + d >= 1 ? (s = (t * u - 1) * Math.pow(2, i), a += d) : (s = t * Math.pow(2, d - 1) * Math.pow(2, i), a = 0)); i >= 8; e[r + h] = 255 & s, h += m, s /= 256, i -= 8);
            for (a = a << i | s, c += i; c > 0; e[r + h] = 255 & a, h += m, a /= 256, c -= 8);
            e[r + h - m] |= 128 * f
        }
    }, {}],
    1: [function(e, t, r) {
        "use strict";

        function n(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var r = e.indexOf("=");
            return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
        }

        function i(e) {
            return a[e >> 18 & 63] + a[e >> 12 & 63] + a[e >> 6 & 63] + a[63 & e]
        }

        function o(e, t, r) {
            for (var n, o = [], a = t; a < r; a += 3) n = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), o.push(i(n));
            return o.join("")
        }
        r.byteLength = function(e) {
            var t = n(e),
                r = t[0],
                i = t[1];
            return 3 * (r + i) / 4 - i
        }, r.toByteArray = function(e) {
            var t, r, i = n(e),
                o = i[0],
                a = i[1],
                c = new u(function(e, t, r) {
                    return 3 * (t + r) / 4 - r
                }(0, o, a)),
                l = 0,
                d = a > 0 ? o - 4 : o;
            for (r = 0; r < d; r += 4) t = s[e.charCodeAt(r)] << 18 | s[e.charCodeAt(r + 1)] << 12 | s[e.charCodeAt(r + 2)] << 6 | s[e.charCodeAt(r + 3)], c[l++] = t >> 16 & 255, c[l++] = t >> 8 & 255, c[l++] = 255 & t;
            return 2 === a && (t = s[e.charCodeAt(r)] << 2 | s[e.charCodeAt(r + 1)] >> 4, c[l++] = 255 & t), 1 === a && (t = s[e.charCodeAt(r)] << 10 | s[e.charCodeAt(r + 1)] << 4 | s[e.charCodeAt(r + 2)] >> 2, c[l++] = t >> 8 & 255, c[l++] = 255 & t), c
        }, r.fromByteArray = function(e) {
            for (var t, r = e.length, n = r % 3, i = [], s = 0, u = r - n; s < u; s += 16383) i.push(o(e, s, s + 16383 > u ? u : s + 16383));
            return 1 === n ? (t = e[r - 1], i.push(a[t >> 2] + a[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], i.push(a[t >> 10] + a[t >> 4 & 63] + a[t << 2 & 63] + "=")), i.join("")
        };
        for (var a = [], s = [], u = "undefined" != typeof Uint8Array ? Uint8Array : Array, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", l = 0, d = c.length; l < d; ++l) a[l] = c[l], s[c.charCodeAt(l)] = l;
        s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63
    }, {}]
}, {}, [28]), AWS.apiLoader.services.cognitoidentity = {}, AWS.CognitoIdentity = AWS.Service.defineService("cognitoidentity", ["2014-06-30"]), _xamzrequire = function e(t, r, n) {
    function i(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var u = "function" == typeof _xamzrequire && _xamzrequire;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = r[a] = {
                exports: {}
            };
            t[a][0].call(l.exports, function(e) {
                return i(t[a][1][e] || e)
            }, l, l.exports, e, t, r, n)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof _xamzrequire && _xamzrequire, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    92: [function(e, t, r) {
        var n = e("../core");
        n.util.update(n.CognitoIdentity.prototype, {
            getOpenIdToken: function(e, t) {
                return this.makeUnauthenticatedRequest("getOpenIdToken", e, t)
            },
            getId: function(e, t) {
                return this.makeUnauthenticatedRequest("getId", e, t)
            },
            getCredentialsForIdentity: function(e, t) {
                return this.makeUnauthenticatedRequest("getCredentialsForIdentity", e, t)
            }
        })
    }, {
        "../core": 38
    }]
}, {}, [92]), AWS.apiLoader.services.cognitoidentity["2014-06-30"] = {
    version: "2.0",
    metadata: {
        apiVersion: "2014-06-30",
        endpointPrefix: "cognito-identity",
        jsonVersion: "1.1",
        protocol: "json",
        serviceFullName: "Amazon Cognito Identity",
        serviceId: "Cognito Identity",
        signatureVersion: "v4",
        targetPrefix: "AWSCognitoIdentityService",
        uid: "cognito-identity-2014-06-30"
    },
    operations: {
        CreateIdentityPool: {
            input: {
                type: "structure",
                required: ["IdentityPoolName", "AllowUnauthenticatedIdentities"],
                members: {
                    IdentityPoolName: {},
                    AllowUnauthenticatedIdentities: {
                        type: "boolean"
                    },
                    SupportedLoginProviders: {
                        shape: "S4"
                    },
                    DeveloperProviderName: {},
                    OpenIdConnectProviderARNs: {
                        shape: "S8"
                    },
                    CognitoIdentityProviders: {
                        shape: "Sa"
                    },
                    SamlProviderARNs: {
                        shape: "Sf"
                    },
                    IdentityPoolTags: {
                        shape: "Sg"
                    }
                }
            },
            output: {
                shape: "Sj"
            }
        },
        DeleteIdentities: {
            input: {
                type: "structure",
                required: ["IdentityIdsToDelete"],
                members: {
                    IdentityIdsToDelete: {
                        type: "list",
                        member: {}
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    UnprocessedIdentityIds: {
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                IdentityId: {},
                                ErrorCode: {}
                            }
                        }
                    }
                }
            }
        },
        DeleteIdentityPool: {
            input: {
                type: "structure",
                required: ["IdentityPoolId"],
                members: {
                    IdentityPoolId: {}
                }
            }
        },
        DescribeIdentity: {
            input: {
                type: "structure",
                required: ["IdentityId"],
                members: {
                    IdentityId: {}
                }
            },
            output: {
                shape: "Su"
            }
        },
        DescribeIdentityPool: {
            input: {
                type: "structure",
                required: ["IdentityPoolId"],
                members: {
                    IdentityPoolId: {}
                }
            },
            output: {
                shape: "Sj"
            }
        },
        GetCredentialsForIdentity: {
            input: {
                type: "structure",
                required: ["IdentityId"],
                members: {
                    IdentityId: {},
                    Logins: {
                        shape: "Sz"
                    },
                    CustomRoleArn: {}
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityId: {},
                    Credentials: {
                        type: "structure",
                        members: {
                            AccessKeyId: {},
                            SecretKey: {},
                            SessionToken: {},
                            Expiration: {
                                type: "timestamp"
                            }
                        }
                    }
                }
            }
        },
        GetId: {
            input: {
                type: "structure",
                required: ["IdentityPoolId"],
                members: {
                    AccountId: {},
                    IdentityPoolId: {},
                    Logins: {
                        shape: "Sz"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityId: {}
                }
            }
        },
        GetIdentityPoolRoles: {
            input: {
                type: "structure",
                required: ["IdentityPoolId"],
                members: {
                    IdentityPoolId: {}
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityPoolId: {},
                    Roles: {
                        shape: "S1b"
                    },
                    RoleMappings: {
                        shape: "S1d"
                    }
                }
            }
        },
        GetOpenIdToken: {
            input: {
                type: "structure",
                required: ["IdentityId"],
                members: {
                    IdentityId: {},
                    Logins: {
                        shape: "Sz"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityId: {},
                    Token: {}
                }
            }
        },
        GetOpenIdTokenForDeveloperIdentity: {
            input: {
                type: "structure",
                required: ["IdentityPoolId", "Logins"],
                members: {
                    IdentityPoolId: {},
                    IdentityId: {},
                    Logins: {
                        shape: "Sz"
                    },
                    TokenDuration: {
                        type: "long"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityId: {},
                    Token: {}
                }
            }
        },
        ListIdentities: {
            input: {
                type: "structure",
                required: ["IdentityPoolId", "MaxResults"],
                members: {
                    IdentityPoolId: {},
                    MaxResults: {
                        type: "integer"
                    },
                    NextToken: {},
                    HideDisabled: {
                        type: "boolean"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityPoolId: {},
                    Identities: {
                        type: "list",
                        member: {
                            shape: "Su"
                        }
                    },
                    NextToken: {}
                }
            }
        },
        ListIdentityPools: {
            input: {
                type: "structure",
                required: ["MaxResults"],
                members: {
                    MaxResults: {
                        type: "integer"
                    },
                    NextToken: {}
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityPools: {
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                IdentityPoolId: {},
                                IdentityPoolName: {}
                            }
                        }
                    },
                    NextToken: {}
                }
            }
        },
        ListTagsForResource: {
            input: {
                type: "structure",
                required: ["ResourceArn"],
                members: {
                    ResourceArn: {}
                }
            },
            output: {
                type: "structure",
                members: {
                    Tags: {
                        shape: "Sg"
                    }
                }
            }
        },
        LookupDeveloperIdentity: {
            input: {
                type: "structure",
                required: ["IdentityPoolId"],
                members: {
                    IdentityPoolId: {},
                    IdentityId: {},
                    DeveloperUserIdentifier: {},
                    MaxResults: {
                        type: "integer"
                    },
                    NextToken: {}
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityId: {},
                    DeveloperUserIdentifierList: {
                        type: "list",
                        member: {}
                    },
                    NextToken: {}
                }
            }
        },
        MergeDeveloperIdentities: {
            input: {
                type: "structure",
                required: ["SourceUserIdentifier", "DestinationUserIdentifier", "DeveloperProviderName", "IdentityPoolId"],
                members: {
                    SourceUserIdentifier: {},
                    DestinationUserIdentifier: {},
                    DeveloperProviderName: {},
                    IdentityPoolId: {}
                }
            },
            output: {
                type: "structure",
                members: {
                    IdentityId: {}
                }
            }
        },
        SetIdentityPoolRoles: {
            input: {
                type: "structure",
                required: ["IdentityPoolId", "Roles"],
                members: {
                    IdentityPoolId: {},
                    Roles: {
                        shape: "S1b"
                    },
                    RoleMappings: {
                        shape: "S1d"
                    }
                }
            }
        },
        TagResource: {
            input: {
                type: "structure",
                required: ["ResourceArn"],
                members: {
                    ResourceArn: {},
                    Tags: {
                        shape: "Sg"
                    }
                }
            },
            output: {
                type: "structure",
                members: {}
            }
        },
        UnlinkDeveloperIdentity: {
            input: {
                type: "structure",
                required: ["IdentityId", "IdentityPoolId", "DeveloperProviderName", "DeveloperUserIdentifier"],
                members: {
                    IdentityId: {},
                    IdentityPoolId: {},
                    DeveloperProviderName: {},
                    DeveloperUserIdentifier: {}
                }
            }
        },
        UnlinkIdentity: {
            input: {
                type: "structure",
                required: ["IdentityId", "Logins", "LoginsToRemove"],
                members: {
                    IdentityId: {},
                    Logins: {
                        shape: "Sz"
                    },
                    LoginsToRemove: {
                        shape: "Sv"
                    }
                }
            }
        },
        UntagResource: {
            input: {
                type: "structure",
                required: ["ResourceArn"],
                members: {
                    ResourceArn: {},
                    TagKeys: {
                        type: "list",
                        member: {}
                    }
                }
            },
            output: {
                type: "structure",
                members: {}
            }
        },
        UpdateIdentityPool: {
            input: {
                shape: "Sj"
            },
            output: {
                shape: "Sj"
            }
        }
    },
    shapes: {
        S4: {
            type: "map",
            key: {},
            value: {}
        },
        S8: {
            type: "list",
            member: {}
        },
        Sa: {
            type: "list",
            member: {
                type: "structure",
                members: {
                    ProviderName: {},
                    ClientId: {},
                    ServerSideTokenCheck: {
                        type: "boolean"
                    }
                }
            }
        },
        Sf: {
            type: "list",
            member: {}
        },
        Sg: {
            type: "map",
            key: {},
            value: {}
        },
        Sj: {
            type: "structure",
            required: ["IdentityPoolId", "IdentityPoolName", "AllowUnauthenticatedIdentities"],
            members: {
                IdentityPoolId: {},
                IdentityPoolName: {},
                AllowUnauthenticatedIdentities: {
                    type: "boolean"
                },
                SupportedLoginProviders: {
                    shape: "S4"
                },
                DeveloperProviderName: {},
                OpenIdConnectProviderARNs: {
                    shape: "S8"
                },
                CognitoIdentityProviders: {
                    shape: "Sa"
                },
                SamlProviderARNs: {
                    shape: "Sf"
                },
                IdentityPoolTags: {
                    shape: "Sg"
                }
            }
        },
        Su: {
            type: "structure",
            members: {
                IdentityId: {},
                Logins: {
                    shape: "Sv"
                },
                CreationDate: {
                    type: "timestamp"
                },
                LastModifiedDate: {
                    type: "timestamp"
                }
            }
        },
        Sv: {
            type: "list",
            member: {}
        },
        Sz: {
            type: "map",
            key: {},
            value: {}
        },
        S1b: {
            type: "map",
            key: {},
            value: {}
        },
        S1d: {
            type: "map",
            key: {},
            value: {
                type: "structure",
                required: ["Type"],
                members: {
                    Type: {},
                    AmbiguousRoleResolution: {},
                    RulesConfiguration: {
                        type: "structure",
                        required: ["Rules"],
                        members: {
                            Rules: {
                                type: "list",
                                member: {
                                    type: "structure",
                                    required: ["Claim", "MatchType", "Value", "RoleARN"],
                                    members: {
                                        Claim: {},
                                        MatchType: {},
                                        Value: {},
                                        RoleARN: {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    paginators: {}
}, AWS.apiLoader.services.s3 = {}, AWS.S3 = AWS.Service.defineService("s3", ["2006-03-01"]), _xamzrequire = function e(t, r, n) {
    function i(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var u = "function" == typeof _xamzrequire && _xamzrequire;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = r[a] = {
                exports: {}
            };
            t[a][0].call(l.exports, function(e) {
                return i(t[a][1][e] || e)
            }, l, l.exports, e, t, r, n)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof _xamzrequire && _xamzrequire, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    102: [function(e, t, r) {
        var n = e("../core"),
            i = e("../signers/v4_credentials");
        e("../s3/managed_upload");
        var o = {
                completeMultipartUpload: !0,
                copyObject: !0,
                uploadPartCopy: !0
            },
            a = ["AuthorizationHeaderMalformed", "BadRequest", "PermanentRedirect", 301];
        n.util.update(n.S3.prototype, {
            getSignatureVersion: function(e) {
                var t = this.api.signatureVersion,
                    r = this._originalConfig ? this._originalConfig.signatureVersion : null,
                    n = this.config.signatureVersion,
                    i = !!e && e.isPresigned();
                return r ? r = "v2" === r ? "s3" : r : (!0 !== i ? t = "v4" : n && (t = n), t)
            },
            getSignerClass: function(e) {
                var t = this.getSignatureVersion(e);
                return n.Signers.RequestSigner.getVersion(t)
            },
            validateService: function() {
                var e, t = [];
                if (this.config.region || (this.config.region = "us-east-1"), !this.config.endpoint && this.config.s3BucketEndpoint && t.push("An endpoint must be provided when configuring `s3BucketEndpoint` to true."), 1 === t.length ? e = t[0] : t.length > 1 && (e = "Multiple configuration errors:\n" + t.join("\n")), e) throw n.util.error(new Error, {
                    name: "InvalidEndpoint",
                    message: e
                })
            },
            shouldDisableBodySigning: function(e) {
                var t = this.getSignerClass();
                return !0 === this.config.s3DisableBodySigning && t === n.Signers.V4 && "https:" === e.httpRequest.endpoint.protocol
            },
            setupRequestListeners: function(e) {
                e.addListener("validate", this.validateScheme), e.addListener("validate", this.validateBucketEndpoint), e.addListener("validate", this.correctBucketRegionFromCache), e.addListener("validate", this.validateBucketName, !0), e.addListener("build", this.addContentType), e.addListener("build", this.populateURI), e.addListener("build", this.computeContentMd5), e.addListener("build", this.computeSseCustomerKeyMd5), e.addListener("afterBuild", this.addExpect100Continue), e.removeListener("validate", n.EventListeners.Core.VALIDATE_REGION), e.addListener("extractError", this.extractError), e.onAsync("extractError", this.requestBucketRegion), e.addListener("extractData", this.extractData), e.addListener("extractData", n.util.hoistPayloadMember), e.addListener("beforePresign", this.prepareSignedUrl), n.util.isBrowser() && e.onAsync("retry", this.reqRegionForNetworkingError), this.shouldDisableBodySigning(e) && (e.removeListener("afterBuild", n.EventListeners.Core.COMPUTE_SHA256), e.addListener("afterBuild", this.disableBodySigning))
            },
            validateScheme: function(e) {
                var t = e.params,
                    r = e.httpRequest.endpoint.protocol;
                if ((t.SSECustomerKey || t.CopySourceSSECustomerKey) && "https:" !== r) throw n.util.error(new Error, {
                    code: "ConfigError",
                    message: "Cannot send SSE keys over HTTP. Set 'sslEnabled'to 'true' in your configuration"
                })
            },
            validateBucketEndpoint: function(e) {
                if (!e.params.Bucket && e.service.config.s3BucketEndpoint) throw n.util.error(new Error, {
                    code: "ConfigError",
                    message: "Cannot send requests to root API with `s3BucketEndpoint` set."
                })
            },
            validateBucketName: function(e) {
                var t = e.service.getSignatureVersion(e),
                    r = e.params && e.params.Bucket,
                    i = e.params && e.params.Key,
                    o = r && r.indexOf("/");
                if (r && o >= 0)
                    if ("string" == typeof i && o > 0) {
                        e.params = n.util.copy(e.params);
                        var a = r.substr(o + 1) || "";
                        e.params.Key = a + "/" + i, e.params.Bucket = r.substr(0, o)
                    } else if ("v4" === t) {
                    var s = "Bucket names cannot contain forward slashes. Bucket: " + r;
                    throw n.util.error(new Error, {
                        code: "InvalidBucket",
                        message: s
                    })
                }
            },
            isValidAccelerateOperation: function(e) {
                return -1 === ["createBucket", "deleteBucket", "listBuckets"].indexOf(e)
            },
            populateURI: function(e) {
                var t = e.httpRequest,
                    r = e.params.Bucket,
                    n = e.service,
                    i = t.endpoint;
                if (r && !n.pathStyleBucketName(r)) {
                    n.config.useAccelerateEndpoint && n.isValidAccelerateOperation(e.operation) ? n.config.useDualstack ? i.hostname = r + ".s3-accelerate.dualstack.amazonaws.com" : i.hostname = r + ".s3-accelerate.amazonaws.com" : n.config.s3BucketEndpoint || (i.hostname = r + "." + i.hostname);
                    var o = i.port;
                    i.host = 80 !== o && 443 !== o ? i.hostname + ":" + i.port : i.hostname, t.virtualHostedBucket = r, n.removeVirtualHostedBucketFromPath(e)
                }
            },
            removeVirtualHostedBucketFromPath: function(e) {
                var t = e.httpRequest,
                    r = t.virtualHostedBucket;
                if (r && t.path) {
                    if (e.params && e.params.Key) {
                        var i = "/" + n.util.uriEscapePath(e.params.Key);
                        if (0 === t.path.indexOf(i) && (t.path.length === i.length || "?" === t.path[i.length])) return
                    }
                    t.path = t.path.replace(new RegExp("/" + r), ""), "/" !== t.path[0] && (t.path = "/" + t.path)
                }
            },
            addExpect100Continue: function(e) {
                var t = e.httpRequest.headers["Content-Length"];
                n.util.isNode() && (t >= 1048576 || e.params.Body instanceof n.util.stream.Stream) && (e.httpRequest.headers.Expect = "100-continue")
            },
            addContentType: function(e) {
                var t = e.httpRequest;
                if ("GET" !== t.method && "HEAD" !== t.method) {
                    t.headers["Content-Type"] || (t.headers["Content-Type"] = "application/octet-stream");
                    var r = t.headers["Content-Type"];
                    if (n.util.isBrowser())
                        if ("string" != typeof t.body || r.match(/;\s*charset=/)) {
                            t.headers["Content-Type"] = r.replace(/(;\s*charset=)(.+)$/, function(e, t, r) {
                                return t + r.toUpperCase()
                            })
                        } else t.headers["Content-Type"] += "; charset=UTF-8"
                } else delete t.headers["Content-Type"]
            },
            computableChecksumOperations: {
                putBucketCors: !0,
                putBucketLifecycle: !0,
                putBucketLifecycleConfiguration: !0,
                putBucketTagging: !0,
                deleteObjects: !0,
                putBucketReplication: !0,
                putObjectLegalHold: !0,
                putObjectRetention: !0,
                putObjectLockConfiguration: !0
            },
            willComputeChecksums: function(e) {
                if (this.computableChecksumOperations[e.operation]) return !0;
                if (!this.config.computeChecksums) return !1;
                if (!n.util.Buffer.isBuffer(e.httpRequest.body) && "string" != typeof e.httpRequest.body) return !1;
                var t = e.service.api.operations[e.operation].input.members;
                return !(!e.service.shouldDisableBodySigning(e) || Object.prototype.hasOwnProperty.call(e.httpRequest.headers, "presigned-expires") || !t.ContentMD5 || e.params.ContentMD5) || !(e.service.getSignerClass(e) === n.Signers.V4 && t.ContentMD5 && !t.ContentMD5.required) && (!(!t.ContentMD5 || e.params.ContentMD5) || void 0)
            },
            computeContentMd5: function(e) {
                if (e.service.willComputeChecksums(e)) {
                    var t = n.util.crypto.md5(e.httpRequest.body, "base64");
                    e.httpRequest.headers["Content-MD5"] = t
                }
            },
            computeSseCustomerKeyMd5: function(e) {
                n.util.each({
                    SSECustomerKey: "x-amz-server-side-encryption-customer-key-MD5",
                    CopySourceSSECustomerKey: "x-amz-copy-source-server-side-encryption-customer-key-MD5"
                }, function(t, r) {
                    if (e.params[t]) {
                        var i = n.util.crypto.md5(e.params[t], "base64");
                        e.httpRequest.headers[r] = i
                    }
                })
            },
            pathStyleBucketName: function(e) {
                return !(!this.config.s3ForcePathStyle && (this.config.s3BucketEndpoint || this.dnsCompatibleBucketName(e) && (!this.config.sslEnabled || !e.match(/\./))))
            },
            dnsCompatibleBucketName: function(e) {
                var t = e,
                    r = new RegExp(/^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/),
                    n = new RegExp(/(\d+\.){3}\d+/),
                    i = new RegExp(/\.\./);
                return !(!t.match(r) || t.match(n) || t.match(i))
            },
            successfulResponse: function(e) {
                var t = e.request,
                    r = e.httpResponse;
                return (!o[t.operation] || !r.body.toString().match("<Error>")) && r.statusCode < 300
            },
            retryableError: function(e, t) {
                return !(!o[t.operation] || 200 !== e.statusCode) || (!t._requestRegionForBucket || !t.service.bucketRegionCache[t._requestRegionForBucket]) && (!(!e || "RequestTimeout" !== e.code) || (e && -1 != a.indexOf(e.code) && e.region && e.region != t.httpRequest.region ? (t.httpRequest.region = e.region, 301 === e.statusCode && t.service.updateReqBucketRegion(t), !0) : n.Service.prototype.retryableError.call(this, e, t)))
            },
            updateReqBucketRegion: function(e, t) {
                var r = e.httpRequest;
                if ("string" == typeof t && t.length && (r.region = t), r.endpoint.host.match(/s3(?!-accelerate).*\.amazonaws\.com$/)) {
                    var i = e.service,
                        o = i.config,
                        a = o.s3BucketEndpoint;
                    a && delete o.s3BucketEndpoint;
                    var s = n.util.copy(o);
                    delete s.endpoint, s.region = r.region, r.endpoint = new n.S3(s).endpoint, i.populateURI(e), o.s3BucketEndpoint = a, r.headers.Host = r.endpoint.host, "validate" === e._asm.currentState && (e.removeListener("build", i.populateURI), e.addListener("build", i.removeVirtualHostedBucketFromPath))
                }
            },
            extractData: function(e) {
                var t = e.request;
                if ("getBucketLocation" === t.operation) {
                    var r = e.httpResponse.body.toString().match(/>(.+)<\/Location/);
                    delete e.data._, e.data.LocationConstraint = r ? r[1] : ""
                }
                var n = t.params.Bucket || null;
                if ("deleteBucket" !== t.operation || "string" != typeof n || e.error) {
                    var i = (e.httpResponse.headers || {})["x-amz-bucket-region"] || null;
                    if (!i && "createBucket" === t.operation && !e.error) {
                        var o = t.params.CreateBucketConfiguration;
                        i = o ? "EU" === o.LocationConstraint ? "eu-west-1" : o.LocationConstraint : "us-east-1"
                    }
                    i && n && i !== t.service.bucketRegionCache[n] && (t.service.bucketRegionCache[n] = i)
                } else t.service.clearBucketRegionCache(n);
                t.service.extractRequestIds(e)
            },
            extractError: function(e) {
                var t, r = {
                        304: "NotModified",
                        403: "Forbidden",
                        400: "BadRequest",
                        404: "NotFound"
                    },
                    i = e.request,
                    o = e.httpResponse.statusCode,
                    a = e.httpResponse.body || "",
                    s = (e.httpResponse.headers || {})["x-amz-bucket-region"] || null,
                    u = i.params.Bucket || null,
                    c = i.service.bucketRegionCache;
                if (s && u && s !== c[u] && (c[u] = s), r[o] && 0 === a.length) u && !s && (t = c[u] || null) !== i.httpRequest.region && (s = t), e.error = n.util.error(new Error, {
                    code: r[o],
                    message: null,
                    region: s
                });
                else {
                    var l = (new n.XML.Parser).parse(a.toString());
                    l.Region && !s ? (s = l.Region, u && s !== c[u] && (c[u] = s)) : !u || s || l.Region || (t = c[u] || null) !== i.httpRequest.region && (s = t), e.error = n.util.error(new Error, {
                        code: l.Code || o,
                        message: l.Message || null,
                        region: s
                    })
                }
                i.service.extractRequestIds(e)
            },
            requestBucketRegion: function(e, t) {
                var r = e.error,
                    i = e.request,
                    o = i.params.Bucket || null;
                if (!r || !o || r.region || "listObjects" === i.operation || n.util.isNode() && "headBucket" === i.operation || 400 === r.statusCode && "headObject" !== i.operation || -1 === a.indexOf(r.code)) return t();
                var s = n.util.isNode() ? "headBucket" : "listObjects",
                    u = {
                        Bucket: o
                    };
                "listObjects" === s && (u.MaxKeys = 0);
                var c = i.service[s](u);
                c._requestRegionForBucket = o, c.send(function() {
                    var e = i.service.bucketRegionCache[o] || null;
                    r.region = e, t()
                })
            },
            reqRegionForNetworkingError: function(e, t) {
                if (!n.util.isBrowser()) return t();
                var r = e.error,
                    i = e.request,
                    o = i.params.Bucket;
                if (!r || "NetworkingError" !== r.code || !o || "us-east-1" === i.httpRequest.region) return t();
                var a = i.service,
                    s = a.bucketRegionCache,
                    u = s[o] || null;
                if (u && u !== i.httpRequest.region) a.updateReqBucketRegion(i, u), t();
                else if (a.dnsCompatibleBucketName(o))
                    if (i.httpRequest.virtualHostedBucket) {
                        var c = a.listObjects({
                            Bucket: o,
                            MaxKeys: 0
                        });
                        a.updateReqBucketRegion(c, "us-east-1"), c._requestRegionForBucket = o, c.send(function() {
                            var e = a.bucketRegionCache[o] || null;
                            e && e !== i.httpRequest.region && a.updateReqBucketRegion(i, e), t()
                        })
                    } else t();
                else a.updateReqBucketRegion(i, "us-east-1"), "us-east-1" !== s[o] && (s[o] = "us-east-1"), t()
            },
            bucketRegionCache: {},
            clearBucketRegionCache: function(e) {
                var t = this.bucketRegionCache;
                e ? "string" == typeof e && (e = [e]) : e = Object.keys(t);
                for (var r = 0; r < e.length; r++) delete t[e[r]];
                return t
            },
            correctBucketRegionFromCache: function(e) {
                var t = e.params.Bucket || null;
                if (t) {
                    var r = e.service,
                        n = e.httpRequest.region,
                        i = r.bucketRegionCache[t];
                    i && i !== n && r.updateReqBucketRegion(e, i)
                }
            },
            extractRequestIds: function(e) {
                var t = e.httpResponse.headers ? e.httpResponse.headers["x-amz-id-2"] : null,
                    r = e.httpResponse.headers ? e.httpResponse.headers["x-amz-cf-id"] : null;
                e.extendedRequestId = t, e.cfId = r, e.error && (e.error.requestId = e.requestId || null, e.error.extendedRequestId = t, e.error.cfId = r)
            },
            getSignedUrl: function(e, t, r) {
                var i = (t = n.util.copy(t || {})).Expires || 900;
                if ("number" != typeof i) throw n.util.error(new Error, {
                    code: "InvalidParameterException",
                    message: "The expiration must be a number, received " + typeof i
                });
                delete t.Expires;
                var o = this.makeRequest(e, t);
                if (!r) return o.presign(i, r);
                n.util.defer(function() {
                    o.presign(i, r)
                })
            },
            createPresignedPost: function(e, t) {
                function r() {
                    return {
                        url: n.util.urlFormat(u),
                        fields: a.preparePostFields(s.credentials, s.region, o, e.Fields, e.Conditions, e.Expires)
                    }
                }
                "function" == typeof e && void 0 === t && (t = e, e = null), e = n.util.copy(e || {});
                var i = this.config.params || {},
                    o = e.Bucket || i.Bucket,
                    a = this,
                    s = this.config,
                    u = n.util.copy(this.endpoint);
                if (s.s3BucketEndpoint || (u.pathname = "/" + o), !t) return r();
                s.getCredentials(function(e) {
                    e && t(e), t(null, r())
                })
            },
            preparePostFields: function(e, t, r, o, a, s) {
                var u = this.getSkewCorrectedDate();
                if (!e || !t || !r) throw new Error("Unable to create a POST object policy without a bucket, region, and credentials");
                o = n.util.copy(o || {}), a = (a || []).slice(0), s = s || 3600;
                var c = n.util.date.iso8601(u).replace(/[:\-]|\.\d{3}/g, ""),
                    l = c.substr(0, 8),
                    d = i.createScope(l, t, "s3"),
                    p = e.accessKeyId + "/" + d;
                for (var h in o.bucket = r, o["X-Amz-Algorithm"] = "AWS4-HMAC-SHA256", o["X-Amz-Credential"] = p, o["X-Amz-Date"] = c, e.sessionToken && (o["X-Amz-Security-Token"] = e.sessionToken), o)
                    if (o.hasOwnProperty(h)) {
                        var m = {};
                        m[h] = o[h], a.push(m)
                    } return o.Policy = this.preparePostPolicy(new Date(u.valueOf() + 1e3 * s), a), o["X-Amz-Signature"] = n.util.crypto.hmac(i.getSigningKey(e, l, t, "s3", !0), o.Policy, "hex"), o
            },
            preparePostPolicy: function(e, t) {
                return n.util.base64.encode(JSON.stringify({
                    expiration: n.util.date.iso8601(e),
                    conditions: t
                }))
            },
            prepareSignedUrl: function(e) {
                e.addListener("validate", e.service.noPresignedContentLength), e.removeListener("build", e.service.addContentType), e.params.Body ? e.addListener("afterBuild", n.EventListeners.Core.COMPUTE_SHA256) : e.removeListener("build", e.service.computeContentMd5)
            },
            disableBodySigning: function(e) {
                var t = e.httpRequest.headers;
                Object.prototype.hasOwnProperty.call(t, "presigned-expires") || (t["X-Amz-Content-Sha256"] = "UNSIGNED-PAYLOAD")
            },
            noPresignedContentLength: function(e) {
                if (void 0 !== e.params.ContentLength) throw n.util.error(new Error, {
                    code: "UnexpectedParameter",
                    message: "ContentLength is not supported in pre-signed URLs."
                })
            },
            createBucket: function(e, t) {
                return "function" != typeof e && e || (t = t || e, e = {}), this.endpoint.hostname === this.api.globalEndpoint || e.CreateBucketConfiguration || (e.CreateBucketConfiguration = {
                    LocationConstraint: this.config.region
                }), this.makeRequest("createBucket", e, t)
            },
            upload: function(e, t, r) {
                "function" == typeof t && void 0 === r && (r = t, t = null), t = t || {}, t = n.util.merge(t || {}, {
                    service: this,
                    params: e
                });
                var i = new n.S3.ManagedUpload(t);
                return "function" == typeof r && i.send(r), i
            }
        })
    }, {
        "../core": 38,
        "../s3/managed_upload": 86,
        "../signers/v4_credentials": 114
    }],
    86: [function(e, t, r) {
        var n = e("../core"),
            i = n.util.string.byteLength,
            o = n.util.Buffer;
        n.S3.ManagedUpload = n.util.inherit({
            constructor: function(e) {
                var t = this;
                n.SequentialExecutor.call(t), t.body = null, t.sliceFn = null, t.callback = null, t.parts = {}, t.completeInfo = [], t.fillQueue = function() {
                    t.callback(new Error("Unsupported body payload " + typeof t.body))
                }, t.configure(e)
            },
            configure: function(e) {
                if (e = e || {}, this.partSize = this.minPartSize, e.queueSize && (this.queueSize = e.queueSize), e.partSize && (this.partSize = e.partSize), e.leavePartsOnError && (this.leavePartsOnError = !0), e.tags) {
                    if (!Array.isArray(e.tags)) throw new Error("Tags must be specified as an array; " + typeof e.tags + " provided.");
                    this.tags = e.tags
                }
                if (this.partSize < this.minPartSize) throw new Error("partSize must be greater than " + this.minPartSize);
                this.service = e.service, this.bindServiceObject(e.params), this.validateBody(), this.adjustTotalBytes()
            },
            leavePartsOnError: !1,
            queueSize: 4,
            partSize: null,
            minPartSize: 5242880,
            maxTotalParts: 1e4,
            send: function(e) {
                var t = this;
                t.failed = !1, t.callback = e || function(e) {
                    if (e) throw e
                };
                var r = !0;
                if (t.sliceFn) t.fillQueue = t.fillBuffer;
                else if (n.util.isNode()) {
                    var i = n.util.stream.Stream;
                    t.body instanceof i && (r = !1, t.fillQueue = t.fillStream, t.partBuffers = [], t.body.on("error", function(e) {
                        t.cleanup(e)
                    }).on("readable", function() {
                        t.fillQueue()
                    }).on("end", function() {
                        t.isDoneChunking = !0, t.numParts = t.totalPartNumbers, t.fillQueue.call(t), t.isDoneChunking && t.totalPartNumbers >= 1 && t.doneParts === t.numParts && t.finishMultiPart()
                    }))
                }
                r && t.fillQueue.call(t)
            },
            abort: function() {
                var e = this;
                !0 === e.isDoneChunking && 1 === e.totalPartNumbers && e.singlePart ? e.singlePart.abort() : e.cleanup(n.util.error(new Error("Request aborted by user"), {
                    code: "RequestAbortedError",
                    retryable: !1
                }))
            },
            validateBody: function() {
                var e = this;
                if (e.body = e.service.config.params.Body, "string" == typeof e.body) e.body = n.util.buffer.toBuffer(e.body);
                else if (!e.body) throw new Error("params.Body is required");
                e.sliceFn = n.util.arraySliceFn(e.body)
            },
            bindServiceObject: function(e) {
                e = e || {};
                var t = this;
                if (t.service) {
                    var r = t.service,
                        i = n.util.copy(r.config);
                    i.signatureVersion = r.getSignatureVersion(), t.service = new r.constructor.__super__(i), t.service.config.params = n.util.merge(t.service.config.params || {}, e)
                } else t.service = new n.S3({
                    params: e
                })
            },
            adjustTotalBytes: function() {
                var e = this;
                try {
                    e.totalBytes = i(e.body)
                } catch (e) {}
                if (e.totalBytes) {
                    var t = Math.ceil(e.totalBytes / e.maxTotalParts);
                    t > e.partSize && (e.partSize = t)
                } else e.totalBytes = void 0
            },
            isDoneChunking: !1,
            partPos: 0,
            totalChunkedBytes: 0,
            totalUploadedBytes: 0,
            totalBytes: void 0,
            numParts: 0,
            totalPartNumbers: 0,
            activeParts: 0,
            doneParts: 0,
            parts: null,
            completeInfo: null,
            failed: !1,
            multipartReq: null,
            partBuffers: null,
            partBufferLength: 0,
            fillBuffer: function() {
                var e = this,
                    t = i(e.body);
                if (0 === t) return e.isDoneChunking = !0, e.numParts = 1, void e.nextChunk(e.body);
                for (; e.activeParts < e.queueSize && e.partPos < t;) {
                    var r = Math.min(e.partPos + e.partSize, t),
                        n = e.sliceFn.call(e.body, e.partPos, r);
                    e.partPos += e.partSize, (i(n) < e.partSize || e.partPos === t) && (e.isDoneChunking = !0, e.numParts = e.totalPartNumbers + 1), e.nextChunk(n)
                }
            },
            fillStream: function() {
                var e = this;
                if (!(e.activeParts >= e.queueSize)) {
                    var t = e.body.read(e.partSize - e.partBufferLength) || e.body.read();
                    if (t && (e.partBuffers.push(t), e.partBufferLength += t.length, e.totalChunkedBytes += t.length), e.partBufferLength >= e.partSize) {
                        var r = 1 === e.partBuffers.length ? e.partBuffers[0] : o.concat(e.partBuffers);
                        if (e.partBuffers = [], e.partBufferLength = 0, r.length > e.partSize) {
                            var n = r.slice(e.partSize);
                            e.partBuffers.push(n), e.partBufferLength += n.length, r = r.slice(0, e.partSize)
                        }
                        e.nextChunk(r)
                    }
                    e.isDoneChunking && !e.isDoneSending && (r = 1 === e.partBuffers.length ? e.partBuffers[0] : o.concat(e.partBuffers), e.partBuffers = [], e.partBufferLength = 0, e.totalBytes = e.totalChunkedBytes, e.isDoneSending = !0, (0 === e.numParts || r.length > 0) && (e.numParts++, e.nextChunk(r))), e.body.read(0)
                }
            },
            nextChunk: function(e) {
                var t = this;
                if (t.failed) return null;
                var r = ++t.totalPartNumbers;
                if (t.isDoneChunking && 1 === r) {
                    var i = {
                        Body: e
                    };
                    this.tags && (i.Tagging = this.getTaggingHeader());
                    var o = t.service.putObject(i);
                    return o._managedUpload = t, o.on("httpUploadProgress", t.progress).send(t.finishSinglePart), t.singlePart = o, null
                }
                if (t.service.config.params.ContentMD5) {
                    var a = n.util.error(new Error("The Content-MD5 you specified is invalid for multi-part uploads."), {
                        code: "InvalidDigest",
                        retryable: !1
                    });
                    return t.cleanup(a), null
                }
                if (t.completeInfo[r] && null !== t.completeInfo[r].ETag) return null;
                t.activeParts++, t.service.config.params.UploadId ? t.uploadPart(e, r) : t.multipartReq ? t.queueChunks(e, r) : (t.multipartReq = t.service.createMultipartUpload(), t.multipartReq.on("success", function(e) {
                    t.service.config.params.UploadId = e.data.UploadId, t.multipartReq = null
                }), t.queueChunks(e, r), t.multipartReq.on("error", function(e) {
                    t.cleanup(e)
                }), t.multipartReq.send())
            },
            getTaggingHeader: function() {
                for (var e = [], t = 0; t < this.tags.length; t++) e.push(n.util.uriEscape(this.tags[t].Key) + "=" + n.util.uriEscape(this.tags[t].Value));
                return e.join("&")
            },
            uploadPart: function(e, t) {
                var r = this,
                    i = {
                        Body: e,
                        ContentLength: n.util.string.byteLength(e),
                        PartNumber: t
                    },
                    o = {
                        ETag: null,
                        PartNumber: t
                    };
                r.completeInfo[t] = o;
                var a = r.service.uploadPart(i);
                r.parts[t] = a, a._lastUploadedBytes = 0, a._managedUpload = r, a.on("httpUploadProgress", r.progress), a.send(function(e, a) {
                    if (delete r.parts[i.PartNumber], r.activeParts--, !(e || a && a.ETag)) {
                        var s = "No access to ETag property on response.";
                        n.util.isBrowser() && (s += " Check CORS configuration to expose ETag header."), e = n.util.error(new Error(s), {
                            code: "ETagMissing",
                            retryable: !1
                        })
                    }
                    return e ? r.cleanup(e) : r.completeInfo[t] && null !== r.completeInfo[t].ETag ? null : (o.ETag = a.ETag, r.doneParts++, void(r.isDoneChunking && r.doneParts === r.numParts ? r.finishMultiPart() : r.fillQueue.call(r)))
                })
            },
            queueChunks: function(e, t) {
                var r = this;
                r.multipartReq.on("success", function() {
                    r.uploadPart(e, t)
                })
            },
            cleanup: function(e) {
                var t = this;
                t.failed || ("function" == typeof t.body.removeAllListeners && "function" == typeof t.body.resume && (t.body.removeAllListeners("readable"), t.body.removeAllListeners("end"), t.body.resume()), t.multipartReq && (t.multipartReq.removeAllListeners("success"), t.multipartReq.removeAllListeners("error"), t.multipartReq.removeAllListeners("complete"), delete t.multipartReq), t.service.config.params.UploadId && !t.leavePartsOnError ? t.service.abortMultipartUpload().send() : t.leavePartsOnError && (t.isDoneChunking = !1), n.util.each(t.parts, function(e, t) {
                    t.removeAllListeners("complete"), t.abort()
                }), t.activeParts = 0, t.partPos = 0, t.numParts = 0, t.totalPartNumbers = 0, t.parts = {}, t.failed = !0, t.callback(e))
            },
            finishMultiPart: function() {
                var e = this,
                    t = {
                        MultipartUpload: {
                            Parts: e.completeInfo.slice(1)
                        }
                    };
                e.service.completeMultipartUpload(t, function(t, r) {
                    if (t) return e.cleanup(t);
                    if (r && "string" == typeof r.Location && (r.Location = r.Location.replace(/%2F/g, "/")), Array.isArray(e.tags)) {
                        for (var n = 0; n < e.tags.length; n++) e.tags[n].Value = String(e.tags[n].Value);
                        e.service.putObjectTagging({
                            Tagging: {
                                TagSet: e.tags
                            }
                        }, function(t, n) {
                            t ? e.callback(t) : e.callback(t, r)
                        })
                    } else e.callback(t, r)
                })
            },
            finishSinglePart: function(e, t) {
                var r = this.request._managedUpload,
                    n = this.request.httpRequest,
                    i = n.endpoint;
                if (e) return r.callback(e);
                t.Location = [i.protocol, "//", i.host, n.path].join(""), t.key = this.request.params.Key, t.Key = this.request.params.Key, t.Bucket = this.request.params.Bucket, r.callback(e, t)
            },
            progress: function(e) {
                var t = this._managedUpload;
                "putObject" === this.operation ? (e.part = 1, e.key = this.params.Key) : (t.totalUploadedBytes += e.loaded - this._lastUploadedBytes, this._lastUploadedBytes = e.loaded, e = {
                    loaded: t.totalUploadedBytes,
                    total: t.totalBytes,
                    part: this.params.PartNumber,
                    key: this.params.Key
                }), t.emit("httpUploadProgress", [e])
            }
        }), n.util.mixin(n.S3.ManagedUpload, n.SequentialExecutor), n.S3.ManagedUpload.addPromisesToClass = function(e) {
            this.prototype.promise = n.util.promisifyMethod("send", e)
        }, n.S3.ManagedUpload.deletePromisesFromClass = function() {
            delete this.prototype.promise
        }, n.util.addPromises(n.S3.ManagedUpload), t.exports = n.S3.ManagedUpload
    }, {
        "../core": 38
    }]
}, {}, [102]), AWS.apiLoader.services.s3["2006-03-01"] = {
    version: "2.0",
    metadata: {
        apiVersion: "2006-03-01",
        checksumFormat: "md5",
        endpointPrefix: "s3",
        globalEndpoint: "s3.amazonaws.com",
        protocol: "rest-xml",
        serviceAbbreviation: "Amazon S3",
        serviceFullName: "Amazon Simple Storage Service",
        serviceId: "S3",
        signatureVersion: "s3",
        uid: "s3-2006-03-01"
    },
    operations: {
        AbortMultipartUpload: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}/{Key+}",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key", "UploadId"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    UploadId: {
                        location: "querystring",
                        locationName: "uploadId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        CompleteMultipartUpload: {
            http: {
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key", "UploadId"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    MultipartUpload: {
                        locationName: "CompleteMultipartUpload",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            Parts: {
                                locationName: "Part",
                                type: "list",
                                member: {
                                    type: "structure",
                                    members: {
                                        ETag: {},
                                        PartNumber: {
                                            type: "integer"
                                        }
                                    }
                                },
                                flattened: !0
                            }
                        }
                    },
                    UploadId: {
                        location: "querystring",
                        locationName: "uploadId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                },
                payload: "MultipartUpload"
            },
            output: {
                type: "structure",
                members: {
                    Location: {},
                    Bucket: {},
                    Key: {},
                    Expiration: {
                        location: "header",
                        locationName: "x-amz-expiration"
                    },
                    ETag: {},
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        CopyObject: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "CopySource", "Key"],
                members: {
                    ACL: {
                        location: "header",
                        locationName: "x-amz-acl"
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    CacheControl: {
                        location: "header",
                        locationName: "Cache-Control"
                    },
                    ContentDisposition: {
                        location: "header",
                        locationName: "Content-Disposition"
                    },
                    ContentEncoding: {
                        location: "header",
                        locationName: "Content-Encoding"
                    },
                    ContentLanguage: {
                        location: "header",
                        locationName: "Content-Language"
                    },
                    ContentType: {
                        location: "header",
                        locationName: "Content-Type"
                    },
                    CopySource: {
                        location: "header",
                        locationName: "x-amz-copy-source"
                    },
                    CopySourceIfMatch: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-match"
                    },
                    CopySourceIfModifiedSince: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-modified-since",
                        type: "timestamp"
                    },
                    CopySourceIfNoneMatch: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-none-match"
                    },
                    CopySourceIfUnmodifiedSince: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-unmodified-since",
                        type: "timestamp"
                    },
                    Expires: {
                        location: "header",
                        locationName: "Expires",
                        type: "timestamp"
                    },
                    GrantFullControl: {
                        location: "header",
                        locationName: "x-amz-grant-full-control"
                    },
                    GrantRead: {
                        location: "header",
                        locationName: "x-amz-grant-read"
                    },
                    GrantReadACP: {
                        location: "header",
                        locationName: "x-amz-grant-read-acp"
                    },
                    GrantWriteACP: {
                        location: "header",
                        locationName: "x-amz-grant-write-acp"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    Metadata: {
                        shape: "S11",
                        location: "headers",
                        locationName: "x-amz-meta-"
                    },
                    MetadataDirective: {
                        location: "header",
                        locationName: "x-amz-metadata-directive"
                    },
                    TaggingDirective: {
                        location: "header",
                        locationName: "x-amz-tagging-directive"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    StorageClass: {
                        location: "header",
                        locationName: "x-amz-storage-class"
                    },
                    WebsiteRedirectLocation: {
                        location: "header",
                        locationName: "x-amz-website-redirect-location"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    SSEKMSEncryptionContext: {
                        shape: "S1b",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-context"
                    },
                    CopySourceSSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-copy-source-server-side-encryption-customer-algorithm"
                    },
                    CopySourceSSECustomerKey: {
                        shape: "S1d",
                        location: "header",
                        locationName: "x-amz-copy-source-server-side-encryption-customer-key"
                    },
                    CopySourceSSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-copy-source-server-side-encryption-customer-key-MD5"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    Tagging: {
                        location: "header",
                        locationName: "x-amz-tagging"
                    },
                    ObjectLockMode: {
                        location: "header",
                        locationName: "x-amz-object-lock-mode"
                    },
                    ObjectLockRetainUntilDate: {
                        shape: "S1h",
                        location: "header",
                        locationName: "x-amz-object-lock-retain-until-date"
                    },
                    ObjectLockLegalHoldStatus: {
                        location: "header",
                        locationName: "x-amz-object-lock-legal-hold"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    CopyObjectResult: {
                        type: "structure",
                        members: {
                            ETag: {},
                            LastModified: {
                                type: "timestamp"
                            }
                        }
                    },
                    Expiration: {
                        location: "header",
                        locationName: "x-amz-expiration"
                    },
                    CopySourceVersionId: {
                        location: "header",
                        locationName: "x-amz-copy-source-version-id"
                    },
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    SSEKMSEncryptionContext: {
                        shape: "S1b",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-context"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                },
                payload: "CopyObjectResult"
            },
            alias: "PutObjectCopy"
        },
        CreateBucket: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    ACL: {
                        location: "header",
                        locationName: "x-amz-acl"
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    CreateBucketConfiguration: {
                        locationName: "CreateBucketConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            LocationConstraint: {}
                        }
                    },
                    GrantFullControl: {
                        location: "header",
                        locationName: "x-amz-grant-full-control"
                    },
                    GrantRead: {
                        location: "header",
                        locationName: "x-amz-grant-read"
                    },
                    GrantReadACP: {
                        location: "header",
                        locationName: "x-amz-grant-read-acp"
                    },
                    GrantWrite: {
                        location: "header",
                        locationName: "x-amz-grant-write"
                    },
                    GrantWriteACP: {
                        location: "header",
                        locationName: "x-amz-grant-write-acp"
                    },
                    ObjectLockEnabledForBucket: {
                        location: "header",
                        locationName: "x-amz-bucket-object-lock-enabled",
                        type: "boolean"
                    }
                },
                payload: "CreateBucketConfiguration"
            },
            output: {
                type: "structure",
                members: {
                    Location: {
                        location: "header",
                        locationName: "Location"
                    }
                }
            },
            alias: "PutBucket"
        },
        CreateMultipartUpload: {
            http: {
                requestUri: "/{Bucket}/{Key+}?uploads"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    ACL: {
                        location: "header",
                        locationName: "x-amz-acl"
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    CacheControl: {
                        location: "header",
                        locationName: "Cache-Control"
                    },
                    ContentDisposition: {
                        location: "header",
                        locationName: "Content-Disposition"
                    },
                    ContentEncoding: {
                        location: "header",
                        locationName: "Content-Encoding"
                    },
                    ContentLanguage: {
                        location: "header",
                        locationName: "Content-Language"
                    },
                    ContentType: {
                        location: "header",
                        locationName: "Content-Type"
                    },
                    Expires: {
                        location: "header",
                        locationName: "Expires",
                        type: "timestamp"
                    },
                    GrantFullControl: {
                        location: "header",
                        locationName: "x-amz-grant-full-control"
                    },
                    GrantRead: {
                        location: "header",
                        locationName: "x-amz-grant-read"
                    },
                    GrantReadACP: {
                        location: "header",
                        locationName: "x-amz-grant-read-acp"
                    },
                    GrantWriteACP: {
                        location: "header",
                        locationName: "x-amz-grant-write-acp"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    Metadata: {
                        shape: "S11",
                        location: "headers",
                        locationName: "x-amz-meta-"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    StorageClass: {
                        location: "header",
                        locationName: "x-amz-storage-class"
                    },
                    WebsiteRedirectLocation: {
                        location: "header",
                        locationName: "x-amz-website-redirect-location"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    SSEKMSEncryptionContext: {
                        shape: "S1b",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-context"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    Tagging: {
                        location: "header",
                        locationName: "x-amz-tagging"
                    },
                    ObjectLockMode: {
                        location: "header",
                        locationName: "x-amz-object-lock-mode"
                    },
                    ObjectLockRetainUntilDate: {
                        shape: "S1h",
                        location: "header",
                        locationName: "x-amz-object-lock-retain-until-date"
                    },
                    ObjectLockLegalHoldStatus: {
                        location: "header",
                        locationName: "x-amz-object-lock-legal-hold"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    AbortDate: {
                        location: "header",
                        locationName: "x-amz-abort-date",
                        type: "timestamp"
                    },
                    AbortRuleId: {
                        location: "header",
                        locationName: "x-amz-abort-rule-id"
                    },
                    Bucket: {
                        locationName: "Bucket"
                    },
                    Key: {},
                    UploadId: {},
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    SSEKMSEncryptionContext: {
                        shape: "S1b",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-context"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            },
            alias: "InitiateMultipartUpload"
        },
        DeleteBucket: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketAnalyticsConfiguration: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?analytics",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    }
                }
            }
        },
        DeleteBucketCors: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?cors",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketEncryption: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?encryption",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketInventoryConfiguration: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?inventory",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    }
                }
            }
        },
        DeleteBucketLifecycle: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?lifecycle",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketMetricsConfiguration: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?metrics",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    }
                }
            }
        },
        DeleteBucketPolicy: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?policy",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketReplication: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?replication",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketTagging: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?tagging",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteBucketWebsite: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?website",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        DeleteObject: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}/{Key+}",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    MFA: {
                        location: "header",
                        locationName: "x-amz-mfa"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    BypassGovernanceRetention: {
                        location: "header",
                        locationName: "x-amz-bypass-governance-retention",
                        type: "boolean"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    DeleteMarker: {
                        location: "header",
                        locationName: "x-amz-delete-marker",
                        type: "boolean"
                    },
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        DeleteObjectTagging: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}/{Key+}?tagging",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    }
                }
            }
        },
        DeleteObjects: {
            http: {
                requestUri: "/{Bucket}?delete"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Delete"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Delete: {
                        locationName: "Delete",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        required: ["Objects"],
                        members: {
                            Objects: {
                                locationName: "Object",
                                type: "list",
                                member: {
                                    type: "structure",
                                    required: ["Key"],
                                    members: {
                                        Key: {},
                                        VersionId: {}
                                    }
                                },
                                flattened: !0
                            },
                            Quiet: {
                                type: "boolean"
                            }
                        }
                    },
                    MFA: {
                        location: "header",
                        locationName: "x-amz-mfa"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    BypassGovernanceRetention: {
                        location: "header",
                        locationName: "x-amz-bypass-governance-retention",
                        type: "boolean"
                    }
                },
                payload: "Delete"
            },
            output: {
                type: "structure",
                members: {
                    Deleted: {
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                Key: {},
                                VersionId: {},
                                DeleteMarker: {
                                    type: "boolean"
                                },
                                DeleteMarkerVersionId: {}
                            }
                        },
                        flattened: !0
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    },
                    Errors: {
                        locationName: "Error",
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                Key: {},
                                VersionId: {},
                                Code: {},
                                Message: {}
                            }
                        },
                        flattened: !0
                    }
                }
            },
            alias: "DeleteMultipleObjects"
        },
        DeletePublicAccessBlock: {
            http: {
                method: "DELETE",
                requestUri: "/{Bucket}?publicAccessBlock",
                responseCode: 204
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        GetBucketAccelerateConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?accelerate"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Status: {}
                }
            }
        },
        GetBucketAcl: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?acl"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Owner: {
                        shape: "S32"
                    },
                    Grants: {
                        shape: "S35",
                        locationName: "AccessControlList"
                    }
                }
            }
        },
        GetBucketAnalyticsConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?analytics"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    AnalyticsConfiguration: {
                        shape: "S3e"
                    }
                },
                payload: "AnalyticsConfiguration"
            }
        },
        GetBucketCors: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?cors"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    CORSRules: {
                        shape: "S3u",
                        locationName: "CORSRule"
                    }
                }
            }
        },
        GetBucketEncryption: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?encryption"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    ServerSideEncryptionConfiguration: {
                        shape: "S47"
                    }
                },
                payload: "ServerSideEncryptionConfiguration"
            }
        },
        GetBucketInventoryConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?inventory"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    InventoryConfiguration: {
                        shape: "S4d"
                    }
                },
                payload: "InventoryConfiguration"
            }
        },
        GetBucketLifecycle: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?lifecycle"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Rules: {
                        shape: "S4t",
                        locationName: "Rule"
                    }
                }
            },
            deprecated: !0
        },
        GetBucketLifecycleConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?lifecycle"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Rules: {
                        shape: "S58",
                        locationName: "Rule"
                    }
                }
            }
        },
        GetBucketLocation: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?location"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    LocationConstraint: {}
                }
            }
        },
        GetBucketLogging: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?logging"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    LoggingEnabled: {
                        shape: "S5i"
                    }
                }
            }
        },
        GetBucketMetricsConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?metrics"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    MetricsConfiguration: {
                        shape: "S5q"
                    }
                },
                payload: "MetricsConfiguration"
            }
        },
        GetBucketNotification: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?notification"
            },
            input: {
                shape: "S5t"
            },
            output: {
                shape: "S5u"
            },
            deprecated: !0
        },
        GetBucketNotificationConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?notification"
            },
            input: {
                shape: "S5t"
            },
            output: {
                shape: "S65"
            }
        },
        GetBucketPolicy: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?policy"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Policy: {}
                },
                payload: "Policy"
            }
        },
        GetBucketPolicyStatus: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?policyStatus"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    PolicyStatus: {
                        type: "structure",
                        members: {
                            IsPublic: {
                                locationName: "IsPublic",
                                type: "boolean"
                            }
                        }
                    }
                },
                payload: "PolicyStatus"
            }
        },
        GetBucketReplication: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?replication"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    ReplicationConfiguration: {
                        shape: "S6s"
                    }
                },
                payload: "ReplicationConfiguration"
            }
        },
        GetBucketRequestPayment: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?requestPayment"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Payer: {}
                }
            }
        },
        GetBucketTagging: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?tagging"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                required: ["TagSet"],
                members: {
                    TagSet: {
                        shape: "S3k"
                    }
                }
            }
        },
        GetBucketVersioning: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?versioning"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Status: {},
                    MFADelete: {
                        locationName: "MfaDelete"
                    }
                }
            }
        },
        GetBucketWebsite: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?website"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    RedirectAllRequestsTo: {
                        shape: "S7l"
                    },
                    IndexDocument: {
                        shape: "S7o"
                    },
                    ErrorDocument: {
                        shape: "S7q"
                    },
                    RoutingRules: {
                        shape: "S7r"
                    }
                }
            }
        },
        GetObject: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    IfMatch: {
                        location: "header",
                        locationName: "If-Match"
                    },
                    IfModifiedSince: {
                        location: "header",
                        locationName: "If-Modified-Since",
                        type: "timestamp"
                    },
                    IfNoneMatch: {
                        location: "header",
                        locationName: "If-None-Match"
                    },
                    IfUnmodifiedSince: {
                        location: "header",
                        locationName: "If-Unmodified-Since",
                        type: "timestamp"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    Range: {
                        location: "header",
                        locationName: "Range"
                    },
                    ResponseCacheControl: {
                        location: "querystring",
                        locationName: "response-cache-control"
                    },
                    ResponseContentDisposition: {
                        location: "querystring",
                        locationName: "response-content-disposition"
                    },
                    ResponseContentEncoding: {
                        location: "querystring",
                        locationName: "response-content-encoding"
                    },
                    ResponseContentLanguage: {
                        location: "querystring",
                        locationName: "response-content-language"
                    },
                    ResponseContentType: {
                        location: "querystring",
                        locationName: "response-content-type"
                    },
                    ResponseExpires: {
                        location: "querystring",
                        locationName: "response-expires",
                        type: "timestamp"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    PartNumber: {
                        location: "querystring",
                        locationName: "partNumber",
                        type: "integer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Body: {
                        streaming: !0,
                        type: "blob"
                    },
                    DeleteMarker: {
                        location: "header",
                        locationName: "x-amz-delete-marker",
                        type: "boolean"
                    },
                    AcceptRanges: {
                        location: "header",
                        locationName: "accept-ranges"
                    },
                    Expiration: {
                        location: "header",
                        locationName: "x-amz-expiration"
                    },
                    Restore: {
                        location: "header",
                        locationName: "x-amz-restore"
                    },
                    LastModified: {
                        location: "header",
                        locationName: "Last-Modified",
                        type: "timestamp"
                    },
                    ContentLength: {
                        location: "header",
                        locationName: "Content-Length",
                        type: "long"
                    },
                    ETag: {
                        location: "header",
                        locationName: "ETag"
                    },
                    MissingMeta: {
                        location: "header",
                        locationName: "x-amz-missing-meta",
                        type: "integer"
                    },
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    CacheControl: {
                        location: "header",
                        locationName: "Cache-Control"
                    },
                    ContentDisposition: {
                        location: "header",
                        locationName: "Content-Disposition"
                    },
                    ContentEncoding: {
                        location: "header",
                        locationName: "Content-Encoding"
                    },
                    ContentLanguage: {
                        location: "header",
                        locationName: "Content-Language"
                    },
                    ContentRange: {
                        location: "header",
                        locationName: "Content-Range"
                    },
                    ContentType: {
                        location: "header",
                        locationName: "Content-Type"
                    },
                    Expires: {
                        location: "header",
                        locationName: "Expires",
                        type: "timestamp"
                    },
                    WebsiteRedirectLocation: {
                        location: "header",
                        locationName: "x-amz-website-redirect-location"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    Metadata: {
                        shape: "S11",
                        location: "headers",
                        locationName: "x-amz-meta-"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    StorageClass: {
                        location: "header",
                        locationName: "x-amz-storage-class"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    },
                    ReplicationStatus: {
                        location: "header",
                        locationName: "x-amz-replication-status"
                    },
                    PartsCount: {
                        location: "header",
                        locationName: "x-amz-mp-parts-count",
                        type: "integer"
                    },
                    TagCount: {
                        location: "header",
                        locationName: "x-amz-tagging-count",
                        type: "integer"
                    },
                    ObjectLockMode: {
                        location: "header",
                        locationName: "x-amz-object-lock-mode"
                    },
                    ObjectLockRetainUntilDate: {
                        shape: "S1h",
                        location: "header",
                        locationName: "x-amz-object-lock-retain-until-date"
                    },
                    ObjectLockLegalHoldStatus: {
                        location: "header",
                        locationName: "x-amz-object-lock-legal-hold"
                    }
                },
                payload: "Body"
            }
        },
        GetObjectAcl: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}?acl"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Owner: {
                        shape: "S32"
                    },
                    Grants: {
                        shape: "S35",
                        locationName: "AccessControlList"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        GetObjectLegalHold: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}?legal-hold"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    LegalHold: {
                        shape: "S8q"
                    }
                },
                payload: "LegalHold"
            }
        },
        GetObjectLockConfiguration: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?object-lock"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    ObjectLockConfiguration: {
                        shape: "S8t"
                    }
                },
                payload: "ObjectLockConfiguration"
            }
        },
        GetObjectRetention: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}?retention"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Retention: {
                        shape: "S91"
                    }
                },
                payload: "Retention"
            }
        },
        GetObjectTagging: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}?tagging"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    }
                }
            },
            output: {
                type: "structure",
                required: ["TagSet"],
                members: {
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    TagSet: {
                        shape: "S3k"
                    }
                }
            }
        },
        GetObjectTorrent: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}?torrent"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Body: {
                        streaming: !0,
                        type: "blob"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                },
                payload: "Body"
            }
        },
        GetPublicAccessBlock: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?publicAccessBlock"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    PublicAccessBlockConfiguration: {
                        shape: "S98"
                    }
                },
                payload: "PublicAccessBlockConfiguration"
            }
        },
        HeadBucket: {
            http: {
                method: "HEAD",
                requestUri: "/{Bucket}"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    }
                }
            }
        },
        HeadObject: {
            http: {
                method: "HEAD",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    IfMatch: {
                        location: "header",
                        locationName: "If-Match"
                    },
                    IfModifiedSince: {
                        location: "header",
                        locationName: "If-Modified-Since",
                        type: "timestamp"
                    },
                    IfNoneMatch: {
                        location: "header",
                        locationName: "If-None-Match"
                    },
                    IfUnmodifiedSince: {
                        location: "header",
                        locationName: "If-Unmodified-Since",
                        type: "timestamp"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    Range: {
                        location: "header",
                        locationName: "Range"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    PartNumber: {
                        location: "querystring",
                        locationName: "partNumber",
                        type: "integer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    DeleteMarker: {
                        location: "header",
                        locationName: "x-amz-delete-marker",
                        type: "boolean"
                    },
                    AcceptRanges: {
                        location: "header",
                        locationName: "accept-ranges"
                    },
                    Expiration: {
                        location: "header",
                        locationName: "x-amz-expiration"
                    },
                    Restore: {
                        location: "header",
                        locationName: "x-amz-restore"
                    },
                    LastModified: {
                        location: "header",
                        locationName: "Last-Modified",
                        type: "timestamp"
                    },
                    ContentLength: {
                        location: "header",
                        locationName: "Content-Length",
                        type: "long"
                    },
                    ETag: {
                        location: "header",
                        locationName: "ETag"
                    },
                    MissingMeta: {
                        location: "header",
                        locationName: "x-amz-missing-meta",
                        type: "integer"
                    },
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    CacheControl: {
                        location: "header",
                        locationName: "Cache-Control"
                    },
                    ContentDisposition: {
                        location: "header",
                        locationName: "Content-Disposition"
                    },
                    ContentEncoding: {
                        location: "header",
                        locationName: "Content-Encoding"
                    },
                    ContentLanguage: {
                        location: "header",
                        locationName: "Content-Language"
                    },
                    ContentType: {
                        location: "header",
                        locationName: "Content-Type"
                    },
                    Expires: {
                        location: "header",
                        locationName: "Expires",
                        type: "timestamp"
                    },
                    WebsiteRedirectLocation: {
                        location: "header",
                        locationName: "x-amz-website-redirect-location"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    Metadata: {
                        shape: "S11",
                        location: "headers",
                        locationName: "x-amz-meta-"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    StorageClass: {
                        location: "header",
                        locationName: "x-amz-storage-class"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    },
                    ReplicationStatus: {
                        location: "header",
                        locationName: "x-amz-replication-status"
                    },
                    PartsCount: {
                        location: "header",
                        locationName: "x-amz-mp-parts-count",
                        type: "integer"
                    },
                    ObjectLockMode: {
                        location: "header",
                        locationName: "x-amz-object-lock-mode"
                    },
                    ObjectLockRetainUntilDate: {
                        shape: "S1h",
                        location: "header",
                        locationName: "x-amz-object-lock-retain-until-date"
                    },
                    ObjectLockLegalHoldStatus: {
                        location: "header",
                        locationName: "x-amz-object-lock-legal-hold"
                    }
                }
            }
        },
        ListBucketAnalyticsConfigurations: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?analytics"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContinuationToken: {
                        location: "querystring",
                        locationName: "continuation-token"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IsTruncated: {
                        type: "boolean"
                    },
                    ContinuationToken: {},
                    NextContinuationToken: {},
                    AnalyticsConfigurationList: {
                        locationName: "AnalyticsConfiguration",
                        type: "list",
                        member: {
                            shape: "S3e"
                        },
                        flattened: !0
                    }
                }
            }
        },
        ListBucketInventoryConfigurations: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?inventory"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContinuationToken: {
                        location: "querystring",
                        locationName: "continuation-token"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    ContinuationToken: {},
                    InventoryConfigurationList: {
                        locationName: "InventoryConfiguration",
                        type: "list",
                        member: {
                            shape: "S4d"
                        },
                        flattened: !0
                    },
                    IsTruncated: {
                        type: "boolean"
                    },
                    NextContinuationToken: {}
                }
            }
        },
        ListBucketMetricsConfigurations: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?metrics"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContinuationToken: {
                        location: "querystring",
                        locationName: "continuation-token"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IsTruncated: {
                        type: "boolean"
                    },
                    ContinuationToken: {},
                    NextContinuationToken: {},
                    MetricsConfigurationList: {
                        locationName: "MetricsConfiguration",
                        type: "list",
                        member: {
                            shape: "S5q"
                        },
                        flattened: !0
                    }
                }
            }
        },
        ListBuckets: {
            http: {
                method: "GET"
            },
            output: {
                type: "structure",
                members: {
                    Buckets: {
                        type: "list",
                        member: {
                            locationName: "Bucket",
                            type: "structure",
                            members: {
                                Name: {},
                                CreationDate: {
                                    type: "timestamp"
                                }
                            }
                        }
                    },
                    Owner: {
                        shape: "S32"
                    }
                }
            },
            alias: "GetService"
        },
        ListMultipartUploads: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?uploads"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Delimiter: {
                        location: "querystring",
                        locationName: "delimiter"
                    },
                    EncodingType: {
                        location: "querystring",
                        locationName: "encoding-type"
                    },
                    KeyMarker: {
                        location: "querystring",
                        locationName: "key-marker"
                    },
                    MaxUploads: {
                        location: "querystring",
                        locationName: "max-uploads",
                        type: "integer"
                    },
                    Prefix: {
                        location: "querystring",
                        locationName: "prefix"
                    },
                    UploadIdMarker: {
                        location: "querystring",
                        locationName: "upload-id-marker"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Bucket: {},
                    KeyMarker: {},
                    UploadIdMarker: {},
                    NextKeyMarker: {},
                    Prefix: {},
                    Delimiter: {},
                    NextUploadIdMarker: {},
                    MaxUploads: {
                        type: "integer"
                    },
                    IsTruncated: {
                        type: "boolean"
                    },
                    Uploads: {
                        locationName: "Upload",
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                UploadId: {},
                                Key: {},
                                Initiated: {
                                    type: "timestamp"
                                },
                                StorageClass: {},
                                Owner: {
                                    shape: "S32"
                                },
                                Initiator: {
                                    shape: "Sa5"
                                }
                            }
                        },
                        flattened: !0
                    },
                    CommonPrefixes: {
                        shape: "Sa6"
                    },
                    EncodingType: {}
                }
            }
        },
        ListObjectVersions: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?versions"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Delimiter: {
                        location: "querystring",
                        locationName: "delimiter"
                    },
                    EncodingType: {
                        location: "querystring",
                        locationName: "encoding-type"
                    },
                    KeyMarker: {
                        location: "querystring",
                        locationName: "key-marker"
                    },
                    MaxKeys: {
                        location: "querystring",
                        locationName: "max-keys",
                        type: "integer"
                    },
                    Prefix: {
                        location: "querystring",
                        locationName: "prefix"
                    },
                    VersionIdMarker: {
                        location: "querystring",
                        locationName: "version-id-marker"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IsTruncated: {
                        type: "boolean"
                    },
                    KeyMarker: {},
                    VersionIdMarker: {},
                    NextKeyMarker: {},
                    NextVersionIdMarker: {},
                    Versions: {
                        locationName: "Version",
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                ETag: {},
                                Size: {
                                    type: "integer"
                                },
                                StorageClass: {},
                                Key: {},
                                VersionId: {},
                                IsLatest: {
                                    type: "boolean"
                                },
                                LastModified: {
                                    type: "timestamp"
                                },
                                Owner: {
                                    shape: "S32"
                                }
                            }
                        },
                        flattened: !0
                    },
                    DeleteMarkers: {
                        locationName: "DeleteMarker",
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                Owner: {
                                    shape: "S32"
                                },
                                Key: {},
                                VersionId: {},
                                IsLatest: {
                                    type: "boolean"
                                },
                                LastModified: {
                                    type: "timestamp"
                                }
                            }
                        },
                        flattened: !0
                    },
                    Name: {},
                    Prefix: {},
                    Delimiter: {},
                    MaxKeys: {
                        type: "integer"
                    },
                    CommonPrefixes: {
                        shape: "Sa6"
                    },
                    EncodingType: {}
                }
            },
            alias: "GetBucketObjectVersions"
        },
        ListObjects: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Delimiter: {
                        location: "querystring",
                        locationName: "delimiter"
                    },
                    EncodingType: {
                        location: "querystring",
                        locationName: "encoding-type"
                    },
                    Marker: {
                        location: "querystring",
                        locationName: "marker"
                    },
                    MaxKeys: {
                        location: "querystring",
                        locationName: "max-keys",
                        type: "integer"
                    },
                    Prefix: {
                        location: "querystring",
                        locationName: "prefix"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IsTruncated: {
                        type: "boolean"
                    },
                    Marker: {},
                    NextMarker: {},
                    Contents: {
                        shape: "Sao"
                    },
                    Name: {},
                    Prefix: {},
                    Delimiter: {},
                    MaxKeys: {
                        type: "integer"
                    },
                    CommonPrefixes: {
                        shape: "Sa6"
                    },
                    EncodingType: {}
                }
            },
            alias: "GetBucket"
        },
        ListObjectsV2: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}?list-type=2"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Delimiter: {
                        location: "querystring",
                        locationName: "delimiter"
                    },
                    EncodingType: {
                        location: "querystring",
                        locationName: "encoding-type"
                    },
                    MaxKeys: {
                        location: "querystring",
                        locationName: "max-keys",
                        type: "integer"
                    },
                    Prefix: {
                        location: "querystring",
                        locationName: "prefix"
                    },
                    ContinuationToken: {
                        location: "querystring",
                        locationName: "continuation-token"
                    },
                    FetchOwner: {
                        location: "querystring",
                        locationName: "fetch-owner",
                        type: "boolean"
                    },
                    StartAfter: {
                        location: "querystring",
                        locationName: "start-after"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    IsTruncated: {
                        type: "boolean"
                    },
                    Contents: {
                        shape: "Sao"
                    },
                    Name: {},
                    Prefix: {},
                    Delimiter: {},
                    MaxKeys: {
                        type: "integer"
                    },
                    CommonPrefixes: {
                        shape: "Sa6"
                    },
                    EncodingType: {},
                    KeyCount: {
                        type: "integer"
                    },
                    ContinuationToken: {},
                    NextContinuationToken: {},
                    StartAfter: {}
                }
            }
        },
        ListParts: {
            http: {
                method: "GET",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key", "UploadId"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    MaxParts: {
                        location: "querystring",
                        locationName: "max-parts",
                        type: "integer"
                    },
                    PartNumberMarker: {
                        location: "querystring",
                        locationName: "part-number-marker",
                        type: "integer"
                    },
                    UploadId: {
                        location: "querystring",
                        locationName: "uploadId"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    AbortDate: {
                        location: "header",
                        locationName: "x-amz-abort-date",
                        type: "timestamp"
                    },
                    AbortRuleId: {
                        location: "header",
                        locationName: "x-amz-abort-rule-id"
                    },
                    Bucket: {},
                    Key: {},
                    UploadId: {},
                    PartNumberMarker: {
                        type: "integer"
                    },
                    NextPartNumberMarker: {
                        type: "integer"
                    },
                    MaxParts: {
                        type: "integer"
                    },
                    IsTruncated: {
                        type: "boolean"
                    },
                    Parts: {
                        locationName: "Part",
                        type: "list",
                        member: {
                            type: "structure",
                            members: {
                                PartNumber: {
                                    type: "integer"
                                },
                                LastModified: {
                                    type: "timestamp"
                                },
                                ETag: {},
                                Size: {
                                    type: "integer"
                                }
                            }
                        },
                        flattened: !0
                    },
                    Initiator: {
                        shape: "Sa5"
                    },
                    Owner: {
                        shape: "S32"
                    },
                    StorageClass: {},
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        PutBucketAccelerateConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?accelerate"
            },
            input: {
                type: "structure",
                required: ["Bucket", "AccelerateConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    AccelerateConfiguration: {
                        locationName: "AccelerateConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            Status: {}
                        }
                    }
                },
                payload: "AccelerateConfiguration"
            }
        },
        PutBucketAcl: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?acl"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    ACL: {
                        location: "header",
                        locationName: "x-amz-acl"
                    },
                    AccessControlPolicy: {
                        shape: "Sb6",
                        locationName: "AccessControlPolicy",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    GrantFullControl: {
                        location: "header",
                        locationName: "x-amz-grant-full-control"
                    },
                    GrantRead: {
                        location: "header",
                        locationName: "x-amz-grant-read"
                    },
                    GrantReadACP: {
                        location: "header",
                        locationName: "x-amz-grant-read-acp"
                    },
                    GrantWrite: {
                        location: "header",
                        locationName: "x-amz-grant-write"
                    },
                    GrantWriteACP: {
                        location: "header",
                        locationName: "x-amz-grant-write-acp"
                    }
                },
                payload: "AccessControlPolicy"
            }
        },
        PutBucketAnalyticsConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?analytics"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id", "AnalyticsConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    },
                    AnalyticsConfiguration: {
                        shape: "S3e",
                        locationName: "AnalyticsConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "AnalyticsConfiguration"
            }
        },
        PutBucketCors: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?cors"
            },
            input: {
                type: "structure",
                required: ["Bucket", "CORSConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    CORSConfiguration: {
                        locationName: "CORSConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        required: ["CORSRules"],
                        members: {
                            CORSRules: {
                                shape: "S3u",
                                locationName: "CORSRule"
                            }
                        }
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    }
                },
                payload: "CORSConfiguration"
            }
        },
        PutBucketEncryption: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?encryption"
            },
            input: {
                type: "structure",
                required: ["Bucket", "ServerSideEncryptionConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    ServerSideEncryptionConfiguration: {
                        shape: "S47",
                        locationName: "ServerSideEncryptionConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "ServerSideEncryptionConfiguration"
            }
        },
        PutBucketInventoryConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?inventory"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id", "InventoryConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    },
                    InventoryConfiguration: {
                        shape: "S4d",
                        locationName: "InventoryConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "InventoryConfiguration"
            }
        },
        PutBucketLifecycle: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?lifecycle"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    LifecycleConfiguration: {
                        locationName: "LifecycleConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        required: ["Rules"],
                        members: {
                            Rules: {
                                shape: "S4t",
                                locationName: "Rule"
                            }
                        }
                    }
                },
                payload: "LifecycleConfiguration"
            },
            deprecated: !0
        },
        PutBucketLifecycleConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?lifecycle"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    LifecycleConfiguration: {
                        locationName: "LifecycleConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        required: ["Rules"],
                        members: {
                            Rules: {
                                shape: "S58",
                                locationName: "Rule"
                            }
                        }
                    }
                },
                payload: "LifecycleConfiguration"
            }
        },
        PutBucketLogging: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?logging"
            },
            input: {
                type: "structure",
                required: ["Bucket", "BucketLoggingStatus"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    BucketLoggingStatus: {
                        locationName: "BucketLoggingStatus",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            LoggingEnabled: {
                                shape: "S5i"
                            }
                        }
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    }
                },
                payload: "BucketLoggingStatus"
            }
        },
        PutBucketMetricsConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?metrics"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Id", "MetricsConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Id: {
                        location: "querystring",
                        locationName: "id"
                    },
                    MetricsConfiguration: {
                        shape: "S5q",
                        locationName: "MetricsConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "MetricsConfiguration"
            }
        },
        PutBucketNotification: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?notification"
            },
            input: {
                type: "structure",
                required: ["Bucket", "NotificationConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    NotificationConfiguration: {
                        shape: "S5u",
                        locationName: "NotificationConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "NotificationConfiguration"
            },
            deprecated: !0
        },
        PutBucketNotificationConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?notification"
            },
            input: {
                type: "structure",
                required: ["Bucket", "NotificationConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    NotificationConfiguration: {
                        shape: "S65",
                        locationName: "NotificationConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "NotificationConfiguration"
            }
        },
        PutBucketPolicy: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?policy"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Policy"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    ConfirmRemoveSelfBucketAccess: {
                        location: "header",
                        locationName: "x-amz-confirm-remove-self-bucket-access",
                        type: "boolean"
                    },
                    Policy: {}
                },
                payload: "Policy"
            }
        },
        PutBucketReplication: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?replication"
            },
            input: {
                type: "structure",
                required: ["Bucket", "ReplicationConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    ReplicationConfiguration: {
                        shape: "S6s",
                        locationName: "ReplicationConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    },
                    Token: {
                        location: "header",
                        locationName: "x-amz-bucket-object-lock-token"
                    }
                },
                payload: "ReplicationConfiguration"
            }
        },
        PutBucketRequestPayment: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?requestPayment"
            },
            input: {
                type: "structure",
                required: ["Bucket", "RequestPaymentConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    RequestPaymentConfiguration: {
                        locationName: "RequestPaymentConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        required: ["Payer"],
                        members: {
                            Payer: {}
                        }
                    }
                },
                payload: "RequestPaymentConfiguration"
            }
        },
        PutBucketTagging: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?tagging"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Tagging"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    Tagging: {
                        shape: "Sbt",
                        locationName: "Tagging",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "Tagging"
            }
        },
        PutBucketVersioning: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?versioning"
            },
            input: {
                type: "structure",
                required: ["Bucket", "VersioningConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    MFA: {
                        location: "header",
                        locationName: "x-amz-mfa"
                    },
                    VersioningConfiguration: {
                        locationName: "VersioningConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            MFADelete: {
                                locationName: "MfaDelete"
                            },
                            Status: {}
                        }
                    }
                },
                payload: "VersioningConfiguration"
            }
        },
        PutBucketWebsite: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?website"
            },
            input: {
                type: "structure",
                required: ["Bucket", "WebsiteConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    WebsiteConfiguration: {
                        locationName: "WebsiteConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            ErrorDocument: {
                                shape: "S7q"
                            },
                            IndexDocument: {
                                shape: "S7o"
                            },
                            RedirectAllRequestsTo: {
                                shape: "S7l"
                            },
                            RoutingRules: {
                                shape: "S7r"
                            }
                        }
                    }
                },
                payload: "WebsiteConfiguration"
            }
        },
        PutObject: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    ACL: {
                        location: "header",
                        locationName: "x-amz-acl"
                    },
                    Body: {
                        streaming: !0,
                        type: "blob"
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    CacheControl: {
                        location: "header",
                        locationName: "Cache-Control"
                    },
                    ContentDisposition: {
                        location: "header",
                        locationName: "Content-Disposition"
                    },
                    ContentEncoding: {
                        location: "header",
                        locationName: "Content-Encoding"
                    },
                    ContentLanguage: {
                        location: "header",
                        locationName: "Content-Language"
                    },
                    ContentLength: {
                        location: "header",
                        locationName: "Content-Length",
                        type: "long"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    ContentType: {
                        location: "header",
                        locationName: "Content-Type"
                    },
                    Expires: {
                        location: "header",
                        locationName: "Expires",
                        type: "timestamp"
                    },
                    GrantFullControl: {
                        location: "header",
                        locationName: "x-amz-grant-full-control"
                    },
                    GrantRead: {
                        location: "header",
                        locationName: "x-amz-grant-read"
                    },
                    GrantReadACP: {
                        location: "header",
                        locationName: "x-amz-grant-read-acp"
                    },
                    GrantWriteACP: {
                        location: "header",
                        locationName: "x-amz-grant-write-acp"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    Metadata: {
                        shape: "S11",
                        location: "headers",
                        locationName: "x-amz-meta-"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    StorageClass: {
                        location: "header",
                        locationName: "x-amz-storage-class"
                    },
                    WebsiteRedirectLocation: {
                        location: "header",
                        locationName: "x-amz-website-redirect-location"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    SSEKMSEncryptionContext: {
                        shape: "S1b",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-context"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    Tagging: {
                        location: "header",
                        locationName: "x-amz-tagging"
                    },
                    ObjectLockMode: {
                        location: "header",
                        locationName: "x-amz-object-lock-mode"
                    },
                    ObjectLockRetainUntilDate: {
                        shape: "S1h",
                        location: "header",
                        locationName: "x-amz-object-lock-retain-until-date"
                    },
                    ObjectLockLegalHoldStatus: {
                        location: "header",
                        locationName: "x-amz-object-lock-legal-hold"
                    }
                },
                payload: "Body"
            },
            output: {
                type: "structure",
                members: {
                    Expiration: {
                        location: "header",
                        locationName: "x-amz-expiration"
                    },
                    ETag: {
                        location: "header",
                        locationName: "ETag"
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    SSEKMSEncryptionContext: {
                        shape: "S1b",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-context"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        PutObjectAcl: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}?acl"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    ACL: {
                        location: "header",
                        locationName: "x-amz-acl"
                    },
                    AccessControlPolicy: {
                        shape: "Sb6",
                        locationName: "AccessControlPolicy",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    GrantFullControl: {
                        location: "header",
                        locationName: "x-amz-grant-full-control"
                    },
                    GrantRead: {
                        location: "header",
                        locationName: "x-amz-grant-read"
                    },
                    GrantReadACP: {
                        location: "header",
                        locationName: "x-amz-grant-read-acp"
                    },
                    GrantWrite: {
                        location: "header",
                        locationName: "x-amz-grant-write"
                    },
                    GrantWriteACP: {
                        location: "header",
                        locationName: "x-amz-grant-write-acp"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    }
                },
                payload: "AccessControlPolicy"
            },
            output: {
                type: "structure",
                members: {
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        PutObjectLegalHold: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}?legal-hold"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    LegalHold: {
                        shape: "S8q",
                        locationName: "LegalHold",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    }
                },
                payload: "LegalHold"
            },
            output: {
                type: "structure",
                members: {
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        PutObjectLockConfiguration: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?object-lock"
            },
            input: {
                type: "structure",
                required: ["Bucket"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ObjectLockConfiguration: {
                        shape: "S8t",
                        locationName: "ObjectLockConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    Token: {
                        location: "header",
                        locationName: "x-amz-bucket-object-lock-token"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    }
                },
                payload: "ObjectLockConfiguration"
            },
            output: {
                type: "structure",
                members: {
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        PutObjectRetention: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}?retention"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    Retention: {
                        shape: "S91",
                        locationName: "Retention",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    BypassGovernanceRetention: {
                        location: "header",
                        locationName: "x-amz-bypass-governance-retention",
                        type: "boolean"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    }
                },
                payload: "Retention"
            },
            output: {
                type: "structure",
                members: {
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        PutObjectTagging: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}?tagging"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key", "Tagging"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    Tagging: {
                        shape: "Sbt",
                        locationName: "Tagging",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "Tagging"
            },
            output: {
                type: "structure",
                members: {
                    VersionId: {
                        location: "header",
                        locationName: "x-amz-version-id"
                    }
                }
            }
        },
        PutPublicAccessBlock: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}?publicAccessBlock"
            },
            input: {
                type: "structure",
                required: ["Bucket", "PublicAccessBlockConfiguration"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    PublicAccessBlockConfiguration: {
                        shape: "S98",
                        locationName: "PublicAccessBlockConfiguration",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        }
                    }
                },
                payload: "PublicAccessBlockConfiguration"
            }
        },
        RestoreObject: {
            http: {
                requestUri: "/{Bucket}/{Key+}?restore"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    VersionId: {
                        location: "querystring",
                        locationName: "versionId"
                    },
                    RestoreRequest: {
                        locationName: "RestoreRequest",
                        xmlNamespace: {
                            uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                        },
                        type: "structure",
                        members: {
                            Days: {
                                type: "integer"
                            },
                            GlacierJobParameters: {
                                type: "structure",
                                required: ["Tier"],
                                members: {
                                    Tier: {}
                                }
                            },
                            Type: {},
                            Tier: {},
                            Description: {},
                            SelectParameters: {
                                type: "structure",
                                required: ["InputSerialization", "ExpressionType", "Expression", "OutputSerialization"],
                                members: {
                                    InputSerialization: {
                                        shape: "Scj"
                                    },
                                    ExpressionType: {},
                                    Expression: {},
                                    OutputSerialization: {
                                        shape: "Scy"
                                    }
                                }
                            },
                            OutputLocation: {
                                type: "structure",
                                members: {
                                    S3: {
                                        type: "structure",
                                        required: ["BucketName", "Prefix"],
                                        members: {
                                            BucketName: {},
                                            Prefix: {},
                                            Encryption: {
                                                type: "structure",
                                                required: ["EncryptionType"],
                                                members: {
                                                    EncryptionType: {},
                                                    KMSKeyId: {
                                                        shape: "Sj"
                                                    },
                                                    KMSContext: {}
                                                }
                                            },
                                            CannedACL: {},
                                            AccessControlList: {
                                                shape: "S35"
                                            },
                                            Tagging: {
                                                shape: "Sbt"
                                            },
                                            UserMetadata: {
                                                type: "list",
                                                member: {
                                                    locationName: "MetadataEntry",
                                                    type: "structure",
                                                    members: {
                                                        Name: {},
                                                        Value: {}
                                                    }
                                                }
                                            },
                                            StorageClass: {}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                },
                payload: "RestoreRequest"
            },
            output: {
                type: "structure",
                members: {
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    },
                    RestoreOutputPath: {
                        location: "header",
                        locationName: "x-amz-restore-output-path"
                    }
                }
            },
            alias: "PostObjectRestore"
        },
        SelectObjectContent: {
            http: {
                requestUri: "/{Bucket}/{Key+}?select&select-type=2"
            },
            input: {
                locationName: "SelectObjectContentRequest",
                xmlNamespace: {
                    uri: "http://s3.amazonaws.com/doc/2006-03-01/"
                },
                type: "structure",
                required: ["Bucket", "Key", "Expression", "ExpressionType", "InputSerialization", "OutputSerialization"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    Expression: {},
                    ExpressionType: {},
                    RequestProgress: {
                        type: "structure",
                        members: {
                            Enabled: {
                                type: "boolean"
                            }
                        }
                    },
                    InputSerialization: {
                        shape: "Scj"
                    },
                    OutputSerialization: {
                        shape: "Scy"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    Payload: {
                        type: "structure",
                        members: {
                            Records: {
                                type: "structure",
                                members: {
                                    Payload: {
                                        eventpayload: !0,
                                        type: "blob"
                                    }
                                },
                                event: !0
                            },
                            Stats: {
                                type: "structure",
                                members: {
                                    Details: {
                                        eventpayload: !0,
                                        type: "structure",
                                        members: {
                                            BytesScanned: {
                                                type: "long"
                                            },
                                            BytesProcessed: {
                                                type: "long"
                                            },
                                            BytesReturned: {
                                                type: "long"
                                            }
                                        }
                                    }
                                },
                                event: !0
                            },
                            Progress: {
                                type: "structure",
                                members: {
                                    Details: {
                                        eventpayload: !0,
                                        type: "structure",
                                        members: {
                                            BytesScanned: {
                                                type: "long"
                                            },
                                            BytesProcessed: {
                                                type: "long"
                                            },
                                            BytesReturned: {
                                                type: "long"
                                            }
                                        }
                                    }
                                },
                                event: !0
                            },
                            Cont: {
                                type: "structure",
                                members: {},
                                event: !0
                            },
                            End: {
                                type: "structure",
                                members: {},
                                event: !0
                            }
                        },
                        eventstream: !0
                    }
                },
                payload: "Payload"
            }
        },
        UploadPart: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "Key", "PartNumber", "UploadId"],
                members: {
                    Body: {
                        streaming: !0,
                        type: "blob"
                    },
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    ContentLength: {
                        location: "header",
                        locationName: "Content-Length",
                        type: "long"
                    },
                    ContentMD5: {
                        location: "header",
                        locationName: "Content-MD5"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    PartNumber: {
                        location: "querystring",
                        locationName: "partNumber",
                        type: "integer"
                    },
                    UploadId: {
                        location: "querystring",
                        locationName: "uploadId"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                },
                payload: "Body"
            },
            output: {
                type: "structure",
                members: {
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    ETag: {
                        location: "header",
                        locationName: "ETag"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                }
            }
        },
        UploadPartCopy: {
            http: {
                method: "PUT",
                requestUri: "/{Bucket}/{Key+}"
            },
            input: {
                type: "structure",
                required: ["Bucket", "CopySource", "Key", "PartNumber", "UploadId"],
                members: {
                    Bucket: {
                        location: "uri",
                        locationName: "Bucket"
                    },
                    CopySource: {
                        location: "header",
                        locationName: "x-amz-copy-source"
                    },
                    CopySourceIfMatch: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-match"
                    },
                    CopySourceIfModifiedSince: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-modified-since",
                        type: "timestamp"
                    },
                    CopySourceIfNoneMatch: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-none-match"
                    },
                    CopySourceIfUnmodifiedSince: {
                        location: "header",
                        locationName: "x-amz-copy-source-if-unmodified-since",
                        type: "timestamp"
                    },
                    CopySourceRange: {
                        location: "header",
                        locationName: "x-amz-copy-source-range"
                    },
                    Key: {
                        location: "uri",
                        locationName: "Key"
                    },
                    PartNumber: {
                        location: "querystring",
                        locationName: "partNumber",
                        type: "integer"
                    },
                    UploadId: {
                        location: "querystring",
                        locationName: "uploadId"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKey: {
                        shape: "S19",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    CopySourceSSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-copy-source-server-side-encryption-customer-algorithm"
                    },
                    CopySourceSSECustomerKey: {
                        shape: "S1d",
                        location: "header",
                        locationName: "x-amz-copy-source-server-side-encryption-customer-key"
                    },
                    CopySourceSSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-copy-source-server-side-encryption-customer-key-MD5"
                    },
                    RequestPayer: {
                        location: "header",
                        locationName: "x-amz-request-payer"
                    }
                }
            },
            output: {
                type: "structure",
                members: {
                    CopySourceVersionId: {
                        location: "header",
                        locationName: "x-amz-copy-source-version-id"
                    },
                    CopyPartResult: {
                        type: "structure",
                        members: {
                            ETag: {},
                            LastModified: {
                                type: "timestamp"
                            }
                        }
                    },
                    ServerSideEncryption: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption"
                    },
                    SSECustomerAlgorithm: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-algorithm"
                    },
                    SSECustomerKeyMD5: {
                        location: "header",
                        locationName: "x-amz-server-side-encryption-customer-key-MD5"
                    },
                    SSEKMSKeyId: {
                        shape: "Sj",
                        location: "header",
                        locationName: "x-amz-server-side-encryption-aws-kms-key-id"
                    },
                    RequestCharged: {
                        location: "header",
                        locationName: "x-amz-request-charged"
                    }
                },
                payload: "CopyPartResult"
            }
        }
    },
    shapes: {
        Sj: {
            type: "string",
            sensitive: !0
        },
        S11: {
            type: "map",
            key: {},
            value: {}
        },
        S19: {
            type: "blob",
            sensitive: !0
        },
        S1b: {
            type: "string",
            sensitive: !0
        },
        S1d: {
            type: "blob",
            sensitive: !0
        },
        S1h: {
            type: "timestamp",
            timestampFormat: "iso8601"
        },
        S32: {
            type: "structure",
            members: {
                DisplayName: {},
                ID: {}
            }
        },
        S35: {
            type: "list",
            member: {
                locationName: "Grant",
                type: "structure",
                members: {
                    Grantee: {
                        shape: "S37"
                    },
                    Permission: {}
                }
            }
        },
        S37: {
            type: "structure",
            required: ["Type"],
            members: {
                DisplayName: {},
                EmailAddress: {},
                ID: {},
                Type: {
                    locationName: "xsi:type",
                    xmlAttribute: !0
                },
                URI: {}
            },
            xmlNamespace: {
                prefix: "xsi",
                uri: "http://www.w3.org/2001/XMLSchema-instance"
            }
        },
        S3e: {
            type: "structure",
            required: ["Id", "StorageClassAnalysis"],
            members: {
                Id: {},
                Filter: {
                    type: "structure",
                    members: {
                        Prefix: {},
                        Tag: {
                            shape: "S3h"
                        },
                        And: {
                            type: "structure",
                            members: {
                                Prefix: {},
                                Tags: {
                                    shape: "S3k",
                                    flattened: !0,
                                    locationName: "Tag"
                                }
                            }
                        }
                    }
                },
                StorageClassAnalysis: {
                    type: "structure",
                    members: {
                        DataExport: {
                            type: "structure",
                            required: ["OutputSchemaVersion", "Destination"],
                            members: {
                                OutputSchemaVersion: {},
                                Destination: {
                                    type: "structure",
                                    required: ["S3BucketDestination"],
                                    members: {
                                        S3BucketDestination: {
                                            type: "structure",
                                            required: ["Format", "Bucket"],
                                            members: {
                                                Format: {},
                                                BucketAccountId: {},
                                                Bucket: {},
                                                Prefix: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        S3h: {
            type: "structure",
            required: ["Key", "Value"],
            members: {
                Key: {},
                Value: {}
            }
        },
        S3k: {
            type: "list",
            member: {
                shape: "S3h",
                locationName: "Tag"
            }
        },
        S3u: {
            type: "list",
            member: {
                type: "structure",
                required: ["AllowedMethods", "AllowedOrigins"],
                members: {
                    AllowedHeaders: {
                        locationName: "AllowedHeader",
                        type: "list",
                        member: {},
                        flattened: !0
                    },
                    AllowedMethods: {
                        locationName: "AllowedMethod",
                        type: "list",
                        member: {},
                        flattened: !0
                    },
                    AllowedOrigins: {
                        locationName: "AllowedOrigin",
                        type: "list",
                        member: {},
                        flattened: !0
                    },
                    ExposeHeaders: {
                        locationName: "ExposeHeader",
                        type: "list",
                        member: {},
                        flattened: !0
                    },
                    MaxAgeSeconds: {
                        type: "integer"
                    }
                }
            },
            flattened: !0
        },
        S47: {
            type: "structure",
            required: ["Rules"],
            members: {
                Rules: {
                    locationName: "Rule",
                    type: "list",
                    member: {
                        type: "structure",
                        members: {
                            ApplyServerSideEncryptionByDefault: {
                                type: "structure",
                                required: ["SSEAlgorithm"],
                                members: {
                                    SSEAlgorithm: {},
                                    KMSMasterKeyID: {
                                        shape: "Sj"
                                    }
                                }
                            }
                        }
                    },
                    flattened: !0
                }
            }
        },
        S4d: {
            type: "structure",
            required: ["Destination", "IsEnabled", "Id", "IncludedObjectVersions", "Schedule"],
            members: {
                Destination: {
                    type: "structure",
                    required: ["S3BucketDestination"],
                    members: {
                        S3BucketDestination: {
                            type: "structure",
                            required: ["Bucket", "Format"],
                            members: {
                                AccountId: {},
                                Bucket: {},
                                Format: {},
                                Prefix: {},
                                Encryption: {
                                    type: "structure",
                                    members: {
                                        SSES3: {
                                            locationName: "SSE-S3",
                                            type: "structure",
                                            members: {}
                                        },
                                        SSEKMS: {
                                            locationName: "SSE-KMS",
                                            type: "structure",
                                            required: ["KeyId"],
                                            members: {
                                                KeyId: {
                                                    shape: "Sj"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                IsEnabled: {
                    type: "boolean"
                },
                Filter: {
                    type: "structure",
                    required: ["Prefix"],
                    members: {
                        Prefix: {}
                    }
                },
                Id: {},
                IncludedObjectVersions: {},
                OptionalFields: {
                    type: "list",
                    member: {
                        locationName: "Field"
                    }
                },
                Schedule: {
                    type: "structure",
                    required: ["Frequency"],
                    members: {
                        Frequency: {}
                    }
                }
            }
        },
        S4t: {
            type: "list",
            member: {
                type: "structure",
                required: ["Prefix", "Status"],
                members: {
                    Expiration: {
                        shape: "S4v"
                    },
                    ID: {},
                    Prefix: {},
                    Status: {},
                    Transition: {
                        shape: "S50"
                    },
                    NoncurrentVersionTransition: {
                        shape: "S52"
                    },
                    NoncurrentVersionExpiration: {
                        shape: "S53"
                    },
                    AbortIncompleteMultipartUpload: {
                        shape: "S54"
                    }
                }
            },
            flattened: !0
        },
        S4v: {
            type: "structure",
            members: {
                Date: {
                    shape: "S4w"
                },
                Days: {
                    type: "integer"
                },
                ExpiredObjectDeleteMarker: {
                    type: "boolean"
                }
            }
        },
        S4w: {
            type: "timestamp",
            timestampFormat: "iso8601"
        },
        S50: {
            type: "structure",
            members: {
                Date: {
                    shape: "S4w"
                },
                Days: {
                    type: "integer"
                },
                StorageClass: {}
            }
        },
        S52: {
            type: "structure",
            members: {
                NoncurrentDays: {
                    type: "integer"
                },
                StorageClass: {}
            }
        },
        S53: {
            type: "structure",
            members: {
                NoncurrentDays: {
                    type: "integer"
                }
            }
        },
        S54: {
            type: "structure",
            members: {
                DaysAfterInitiation: {
                    type: "integer"
                }
            }
        },
        S58: {
            type: "list",
            member: {
                type: "structure",
                required: ["Status"],
                members: {
                    Expiration: {
                        shape: "S4v"
                    },
                    ID: {},
                    Prefix: {
                        deprecated: !0
                    },
                    Filter: {
                        type: "structure",
                        members: {
                            Prefix: {},
                            Tag: {
                                shape: "S3h"
                            },
                            And: {
                                type: "structure",
                                members: {
                                    Prefix: {},
                                    Tags: {
                                        shape: "S3k",
                                        flattened: !0,
                                        locationName: "Tag"
                                    }
                                }
                            }
                        }
                    },
                    Status: {},
                    Transitions: {
                        locationName: "Transition",
                        type: "list",
                        member: {
                            shape: "S50"
                        },
                        flattened: !0
                    },
                    NoncurrentVersionTransitions: {
                        locationName: "NoncurrentVersionTransition",
                        type: "list",
                        member: {
                            shape: "S52"
                        },
                        flattened: !0
                    },
                    NoncurrentVersionExpiration: {
                        shape: "S53"
                    },
                    AbortIncompleteMultipartUpload: {
                        shape: "S54"
                    }
                }
            },
            flattened: !0
        },
        S5i: {
            type: "structure",
            required: ["TargetBucket", "TargetPrefix"],
            members: {
                TargetBucket: {},
                TargetGrants: {
                    type: "list",
                    member: {
                        locationName: "Grant",
                        type: "structure",
                        members: {
                            Grantee: {
                                shape: "S37"
                            },
                            Permission: {}
                        }
                    }
                },
                TargetPrefix: {}
            }
        },
        S5q: {
            type: "structure",
            required: ["Id"],
            members: {
                Id: {},
                Filter: {
                    type: "structure",
                    members: {
                        Prefix: {},
                        Tag: {
                            shape: "S3h"
                        },
                        And: {
                            type: "structure",
                            members: {
                                Prefix: {},
                                Tags: {
                                    shape: "S3k",
                                    flattened: !0,
                                    locationName: "Tag"
                                }
                            }
                        }
                    }
                }
            }
        },
        S5t: {
            type: "structure",
            required: ["Bucket"],
            members: {
                Bucket: {
                    location: "uri",
                    locationName: "Bucket"
                }
            }
        },
        S5u: {
            type: "structure",
            members: {
                TopicConfiguration: {
                    type: "structure",
                    members: {
                        Id: {},
                        Events: {
                            shape: "S5x",
                            locationName: "Event"
                        },
                        Event: {
                            deprecated: !0
                        },
                        Topic: {}
                    }
                },
                QueueConfiguration: {
                    type: "structure",
                    members: {
                        Id: {},
                        Event: {
                            deprecated: !0
                        },
                        Events: {
                            shape: "S5x",
                            locationName: "Event"
                        },
                        Queue: {}
                    }
                },
                CloudFunctionConfiguration: {
                    type: "structure",
                    members: {
                        Id: {},
                        Event: {
                            deprecated: !0
                        },
                        Events: {
                            shape: "S5x",
                            locationName: "Event"
                        },
                        CloudFunction: {},
                        InvocationRole: {}
                    }
                }
            }
        },
        S5x: {
            type: "list",
            member: {},
            flattened: !0
        },
        S65: {
            type: "structure",
            members: {
                TopicConfigurations: {
                    locationName: "TopicConfiguration",
                    type: "list",
                    member: {
                        type: "structure",
                        required: ["TopicArn", "Events"],
                        members: {
                            Id: {},
                            TopicArn: {
                                locationName: "Topic"
                            },
                            Events: {
                                shape: "S5x",
                                locationName: "Event"
                            },
                            Filter: {
                                shape: "S68"
                            }
                        }
                    },
                    flattened: !0
                },
                QueueConfigurations: {
                    locationName: "QueueConfiguration",
                    type: "list",
                    member: {
                        type: "structure",
                        required: ["QueueArn", "Events"],
                        members: {
                            Id: {},
                            QueueArn: {
                                locationName: "Queue"
                            },
                            Events: {
                                shape: "S5x",
                                locationName: "Event"
                            },
                            Filter: {
                                shape: "S68"
                            }
                        }
                    },
                    flattened: !0
                },
                LambdaFunctionConfigurations: {
                    locationName: "CloudFunctionConfiguration",
                    type: "list",
                    member: {
                        type: "structure",
                        required: ["LambdaFunctionArn", "Events"],
                        members: {
                            Id: {},
                            LambdaFunctionArn: {
                                locationName: "CloudFunction"
                            },
                            Events: {
                                shape: "S5x",
                                locationName: "Event"
                            },
                            Filter: {
                                shape: "S68"
                            }
                        }
                    },
                    flattened: !0
                }
            }
        },
        S68: {
            type: "structure",
            members: {
                Key: {
                    locationName: "S3Key",
                    type: "structure",
                    members: {
                        FilterRules: {
                            locationName: "FilterRule",
                            type: "list",
                            member: {
                                type: "structure",
                                members: {
                                    Name: {},
                                    Value: {}
                                }
                            },
                            flattened: !0
                        }
                    }
                }
            }
        },
        S6s: {
            type: "structure",
            required: ["Role", "Rules"],
            members: {
                Role: {},
                Rules: {
                    locationName: "Rule",
                    type: "list",
                    member: {
                        type: "structure",
                        required: ["Status", "Destination"],
                        members: {
                            ID: {},
                            Priority: {
                                type: "integer"
                            },
                            Prefix: {
                                deprecated: !0
                            },
                            Filter: {
                                type: "structure",
                                members: {
                                    Prefix: {},
                                    Tag: {
                                        shape: "S3h"
                                    },
                                    And: {
                                        type: "structure",
                                        members: {
                                            Prefix: {},
                                            Tags: {
                                                shape: "S3k",
                                                flattened: !0,
                                                locationName: "Tag"
                                            }
                                        }
                                    }
                                }
                            },
                            Status: {},
                            SourceSelectionCriteria: {
                                type: "structure",
                                members: {
                                    SseKmsEncryptedObjects: {
                                        type: "structure",
                                        required: ["Status"],
                                        members: {
                                            Status: {}
                                        }
                                    }
                                }
                            },
                            Destination: {
                                type: "structure",
                                required: ["Bucket"],
                                members: {
                                    Bucket: {},
                                    Account: {},
                                    StorageClass: {},
                                    AccessControlTranslation: {
                                        type: "structure",
                                        required: ["Owner"],
                                        members: {
                                            Owner: {}
                                        }
                                    },
                                    EncryptionConfiguration: {
                                        type: "structure",
                                        members: {
                                            ReplicaKmsKeyID: {}
                                        }
                                    }
                                }
                            },
                            DeleteMarkerReplication: {
                                type: "structure",
                                members: {
                                    Status: {}
                                }
                            }
                        }
                    },
                    flattened: !0
                }
            }
        },
        S7l: {
            type: "structure",
            required: ["HostName"],
            members: {
                HostName: {},
                Protocol: {}
            }
        },
        S7o: {
            type: "structure",
            required: ["Suffix"],
            members: {
                Suffix: {}
            }
        },
        S7q: {
            type: "structure",
            required: ["Key"],
            members: {
                Key: {}
            }
        },
        S7r: {
            type: "list",
            member: {
                locationName: "RoutingRule",
                type: "structure",
                required: ["Redirect"],
                members: {
                    Condition: {
                        type: "structure",
                        members: {
                            HttpErrorCodeReturnedEquals: {},
                            KeyPrefixEquals: {}
                        }
                    },
                    Redirect: {
                        type: "structure",
                        members: {
                            HostName: {},
                            HttpRedirectCode: {},
                            Protocol: {},
                            ReplaceKeyPrefixWith: {},
                            ReplaceKeyWith: {}
                        }
                    }
                }
            }
        },
        S8q: {
            type: "structure",
            members: {
                Status: {}
            }
        },
        S8t: {
            type: "structure",
            members: {
                ObjectLockEnabled: {},
                Rule: {
                    type: "structure",
                    members: {
                        DefaultRetention: {
                            type: "structure",
                            members: {
                                Mode: {},
                                Days: {
                                    type: "integer"
                                },
                                Years: {
                                    type: "integer"
                                }
                            }
                        }
                    }
                }
            }
        },
        S91: {
            type: "structure",
            members: {
                Mode: {},
                RetainUntilDate: {
                    shape: "S4w"
                }
            }
        },
        S98: {
            type: "structure",
            members: {
                BlockPublicAcls: {
                    locationName: "BlockPublicAcls",
                    type: "boolean"
                },
                IgnorePublicAcls: {
                    locationName: "IgnorePublicAcls",
                    type: "boolean"
                },
                BlockPublicPolicy: {
                    locationName: "BlockPublicPolicy",
                    type: "boolean"
                },
                RestrictPublicBuckets: {
                    locationName: "RestrictPublicBuckets",
                    type: "boolean"
                }
            }
        },
        Sa5: {
            type: "structure",
            members: {
                ID: {},
                DisplayName: {}
            }
        },
        Sa6: {
            type: "list",
            member: {
                type: "structure",
                members: {
                    Prefix: {}
                }
            },
            flattened: !0
        },
        Sao: {
            type: "list",
            member: {
                type: "structure",
                members: {
                    Key: {},
                    LastModified: {
                        type: "timestamp"
                    },
                    ETag: {},
                    Size: {
                        type: "integer"
                    },
                    StorageClass: {},
                    Owner: {
                        shape: "S32"
                    }
                }
            },
            flattened: !0
        },
        Sb6: {
            type: "structure",
            members: {
                Grants: {
                    shape: "S35",
                    locationName: "AccessControlList"
                },
                Owner: {
                    shape: "S32"
                }
            }
        },
        Sbt: {
            type: "structure",
            required: ["TagSet"],
            members: {
                TagSet: {
                    shape: "S3k"
                }
            }
        },
        Scj: {
            type: "structure",
            members: {
                CSV: {
                    type: "structure",
                    members: {
                        FileHeaderInfo: {},
                        Comments: {},
                        QuoteEscapeCharacter: {},
                        RecordDelimiter: {},
                        FieldDelimiter: {},
                        QuoteCharacter: {},
                        AllowQuotedRecordDelimiter: {
                            type: "boolean"
                        }
                    }
                },
                CompressionType: {},
                JSON: {
                    type: "structure",
                    members: {
                        Type: {}
                    }
                },
                Parquet: {
                    type: "structure",
                    members: {}
                }
            }
        },
        Scy: {
            type: "structure",
            members: {
                CSV: {
                    type: "structure",
                    members: {
                        QuoteFields: {},
                        QuoteEscapeCharacter: {},
                        RecordDelimiter: {},
                        FieldDelimiter: {},
                        QuoteCharacter: {}
                    }
                },
                JSON: {
                    type: "structure",
                    members: {
                        RecordDelimiter: {}
                    }
                }
            }
        }
    },
    paginators: {
        ListBuckets: {
            result_key: "Buckets"
        },
        ListMultipartUploads: {
            input_token: ["KeyMarker", "UploadIdMarker"],
            limit_key: "MaxUploads",
            more_results: "IsTruncated",
            output_token: ["NextKeyMarker", "NextUploadIdMarker"],
            result_key: ["Uploads", "CommonPrefixes"]
        },
        ListObjectVersions: {
            input_token: ["KeyMarker", "VersionIdMarker"],
            limit_key: "MaxKeys",
            more_results: "IsTruncated",
            output_token: ["NextKeyMarker", "NextVersionIdMarker"],
            result_key: ["Versions", "DeleteMarkers", "CommonPrefixes"]
        },
        ListObjects: {
            input_token: "Marker",
            limit_key: "MaxKeys",
            more_results: "IsTruncated",
            output_token: "NextMarker || Contents[-1].Key",
            result_key: ["Contents", "CommonPrefixes"]
        },
        ListObjectsV2: {
            input_token: "ContinuationToken",
            limit_key: "MaxKeys",
            output_token: "NextContinuationToken",
            result_key: ["Contents", "CommonPrefixes"]
        },
        ListParts: {
            input_token: "PartNumberMarker",
            limit_key: "MaxParts",
            more_results: "IsTruncated",
            output_token: "NextPartNumberMarker",
            result_key: "Parts"
        }
    },
    waiters: {
        BucketExists: {
            delay: 5,
            operation: "HeadBucket",
            maxAttempts: 20,
            acceptors: [{
                expected: 200,
                matcher: "status",
                state: "success"
            }, {
                expected: 301,
                matcher: "status",
                state: "success"
            }, {
                expected: 403,
                matcher: "status",
                state: "success"
            }, {
                expected: 404,
                matcher: "status",
                state: "retry"
            }]
        },
        BucketNotExists: {
            delay: 5,
            operation: "HeadBucket",
            maxAttempts: 20,
            acceptors: [{
                expected: 404,
                matcher: "status",
                state: "success"
            }]
        },
        ObjectExists: {
            delay: 5,
            operation: "HeadObject",
            maxAttempts: 20,
            acceptors: [{
                expected: 200,
                matcher: "status",
                state: "success"
            }, {
                expected: 404,
                matcher: "status",
                state: "retry"
            }]
        },
        ObjectNotExists: {
            delay: 5,
            operation: "HeadObject",
            maxAttempts: 20,
            acceptors: [{
                expected: 404,
                matcher: "status",
                state: "success"
            }]
        }
    }
}, AWS.apiLoader.services.sts = {}, AWS.STS = AWS.Service.defineService("sts", ["2011-06-15"]), _xamzrequire = function e(t, r, n) {
    function i(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var u = "function" == typeof _xamzrequire && _xamzrequire;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = r[a] = {
                exports: {}
            };
            t[a][0].call(l.exports, function(e) {
                return i(t[a][1][e] || e)
            }, l, l.exports, e, t, r, n)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof _xamzrequire && _xamzrequire, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    105: [function(e, t, r) {
        var n = e("../core");
        n.util.update(n.STS.prototype, {
            credentialsFrom: function(e, t) {
                return e ? (t || (t = new n.TemporaryCredentials), t.expired = !1, t.accessKeyId = e.Credentials.AccessKeyId, t.secretAccessKey = e.Credentials.SecretAccessKey, t.sessionToken = e.Credentials.SessionToken, t.expireTime = e.Credentials.Expiration, t) : null
            },
            assumeRoleWithWebIdentity: function(e, t) {
                return this.makeUnauthenticatedRequest("assumeRoleWithWebIdentity", e, t)
            },
            assumeRoleWithSAML: function(e, t) {
                return this.makeUnauthenticatedRequest("assumeRoleWithSAML", e, t)
            }
        })
    }, {
        "../core": 38
    }]
}, {}, [105]), AWS.apiLoader.services.sts["2011-06-15"] = {
    version: "2.0",
    metadata: {
        apiVersion: "2011-06-15",
        endpointPrefix: "sts",
        globalEndpoint: "sts.amazonaws.com",
        protocol: "query",
        serviceAbbreviation: "AWS STS",
        serviceFullName: "AWS Security Token Service",
        serviceId: "STS",
        signatureVersion: "v4",
        uid: "sts-2011-06-15",
        xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/"
    },
    operations: {
        AssumeRole: {
            input: {
                type: "structure",
                required: ["RoleArn", "RoleSessionName"],
                members: {
                    RoleArn: {},
                    RoleSessionName: {},
                    PolicyArns: {
                        shape: "S4"
                    },
                    Policy: {},
                    DurationSeconds: {
                        type: "integer"
                    },
                    ExternalId: {},
                    SerialNumber: {},
                    TokenCode: {}
                }
            },
            output: {
                resultWrapper: "AssumeRoleResult",
                type: "structure",
                members: {
                    Credentials: {
                        shape: "Sc"
                    },
                    AssumedRoleUser: {
                        shape: "Sh"
                    },
                    PackedPolicySize: {
                        type: "integer"
                    }
                }
            }
        },
        AssumeRoleWithSAML: {
            input: {
                type: "structure",
                required: ["RoleArn", "PrincipalArn", "SAMLAssertion"],
                members: {
                    RoleArn: {},
                    PrincipalArn: {},
                    SAMLAssertion: {},
                    PolicyArns: {
                        shape: "S4"
                    },
                    Policy: {},
                    DurationSeconds: {
                        type: "integer"
                    }
                }
            },
            output: {
                resultWrapper: "AssumeRoleWithSAMLResult",
                type: "structure",
                members: {
                    Credentials: {
                        shape: "Sc"
                    },
                    AssumedRoleUser: {
                        shape: "Sh"
                    },
                    PackedPolicySize: {
                        type: "integer"
                    },
                    Subject: {},
                    SubjectType: {},
                    Issuer: {},
                    Audience: {},
                    NameQualifier: {}
                }
            }
        },
        AssumeRoleWithWebIdentity: {
            input: {
                type: "structure",
                required: ["RoleArn", "RoleSessionName", "WebIdentityToken"],
                members: {
                    RoleArn: {},
                    RoleSessionName: {},
                    WebIdentityToken: {},
                    ProviderId: {},
                    PolicyArns: {
                        shape: "S4"
                    },
                    Policy: {},
                    DurationSeconds: {
                        type: "integer"
                    }
                }
            },
            output: {
                resultWrapper: "AssumeRoleWithWebIdentityResult",
                type: "structure",
                members: {
                    Credentials: {
                        shape: "Sc"
                    },
                    SubjectFromWebIdentityToken: {},
                    AssumedRoleUser: {
                        shape: "Sh"
                    },
                    PackedPolicySize: {
                        type: "integer"
                    },
                    Provider: {},
                    Audience: {}
                }
            }
        },
        DecodeAuthorizationMessage: {
            input: {
                type: "structure",
                required: ["EncodedMessage"],
                members: {
                    EncodedMessage: {}
                }
            },
            output: {
                resultWrapper: "DecodeAuthorizationMessageResult",
                type: "structure",
                members: {
                    DecodedMessage: {}
                }
            }
        },
        GetAccessKeyInfo: {
            input: {
                type: "structure",
                required: ["AccessKeyId"],
                members: {
                    AccessKeyId: {}
                }
            },
            output: {
                resultWrapper: "GetAccessKeyInfoResult",
                type: "structure",
                members: {
                    Account: {}
                }
            }
        },
        GetCallerIdentity: {
            input: {
                type: "structure",
                members: {}
            },
            output: {
                resultWrapper: "GetCallerIdentityResult",
                type: "structure",
                members: {
                    UserId: {},
                    Account: {},
                    Arn: {}
                }
            }
        },
        GetFederationToken: {
            input: {
                type: "structure",
                required: ["Name"],
                members: {
                    Name: {},
                    Policy: {},
                    PolicyArns: {
                        shape: "S4"
                    },
                    DurationSeconds: {
                        type: "integer"
                    }
                }
            },
            output: {
                resultWrapper: "GetFederationTokenResult",
                type: "structure",
                members: {
                    Credentials: {
                        shape: "Sc"
                    },
                    FederatedUser: {
                        type: "structure",
                        required: ["FederatedUserId", "Arn"],
                        members: {
                            FederatedUserId: {},
                            Arn: {}
                        }
                    },
                    PackedPolicySize: {
                        type: "integer"
                    }
                }
            }
        },
        GetSessionToken: {
            input: {
                type: "structure",
                members: {
                    DurationSeconds: {
                        type: "integer"
                    },
                    SerialNumber: {},
                    TokenCode: {}
                }
            },
            output: {
                resultWrapper: "GetSessionTokenResult",
                type: "structure",
                members: {
                    Credentials: {
                        shape: "Sc"
                    }
                }
            }
        }
    },
    shapes: {
        S4: {
            type: "list",
            member: {
                type: "structure",
                members: {
                    arn: {}
                }
            }
        },
        Sc: {
            type: "structure",
            required: ["AccessKeyId", "SecretAccessKey", "SessionToken", "Expiration"],
            members: {
                AccessKeyId: {},
                SecretAccessKey: {},
                SessionToken: {},
                Expiration: {
                    type: "timestamp"
                }
            }
        },
        Sh: {
            type: "structure",
            required: ["AssumedRoleId", "Arn"],
            members: {
                AssumedRoleId: {},
                Arn: {}
            }
        }
    },
    paginators: {}
};
var timer, isRecording = !1,
    bitsPerSecond = 0,
    isChrome = !0,
    enableTabCaptureAPI = !1,
    enableScreen = !0,
    enableMicrophone = !1,
    enableCamera = !1,
    cameraStream = !1,
    gCameraNoScreenStream = null,
    enableTabAudio = !1,
    enableSpeakers = !0,
    videoCodec = "Default",
    isRecordingVOD = !1,
    startedVODRecordedAt = (new Date).getTime(),
    MIN_BLOB_SIZE_IN_BYTES = 5242880,
    gMediaBlobArray = [],
    gPartsToUploadList = [],
    uploadID = "",
    uploadLog = [],
    gPartNumber = 0,
    etags = [],
    videoKey = "",
    wid = "",
    gid = "",
    uid = "",
    vid = "",
    gIdToken = "",
    shareid = "",
    postid = "",
    gUploadError = null,
    gUserNotifiedOfUploadError = !1,
    tabIdOfCountdown = null,
    currentTab = null,
    gTabBeingCaptured = null,
    abortMultipartUpload = !1,
    desktopRecordingvarraints = null,
    BASIC_TIER_VIDEO_LENGTH_IN_MS = 6e5,
    BASIC_5MINS_TIER_VIDEO_LENGTH_IN_MS = 3e5,
    gTimeElapsed = 0,
    TIMER_INTERVAL_IN_MS = 1e3,
    STOP_RECORDING_COUNTDOWN_TRIGGER_IN_MS = 6e4,
    customerType = "pro",
    numCredits = 0,
    daysLeftInTrial = 0,
    gDimensions = "",
    UPLOAD_CREATION_IN_PROGRESS = "UPLOAD_CREATION_IN_PROGRESS",
    videoProgressLog = [],
    DOMAIN_TO_CHECK_LOGIN = "https://outklip.com/darkmatter/",
    desktopRecordingConstraints = {},
    tabRecordingConstraints = {},
    uploadStatus = [],
    totalUploadSize = 0,
    cloudVideoStorage = "true";
const S3_BUCKET_NAME = "outclip-auth-output";
var gProfilePhotoURL = null,
    gUsername = null,
    gVideoSource = "",
    gMaxVideoWidth = 1080,
    gMaxVideoHeight = 720,
    gMaxVideoFrameRate = 30,
    gManualUploadNewPostCreationInProgress = !1,
    gManualUploadInProgress = !1,
    gManualUploadProgressInPercent = 0,
    gZeroTimeoutForPoorInternetConnection = !1;

function isMediaRecorderCompatible() {
    return !0
}

function isMimeTypeSupported(e) {
    return "function" != typeof MediaRecorder.isTypeSupported || MediaRecorder.isTypeSupported(e)
}

function bytesToSize(e) {
    if (0 === e) return "0 Bytes";
    var t = parseInt(Math.floor(Math.log(e) / Math.log(1e3)), 10);
    return (e / Math.pow(1e3, t)).toPrecision(3) + " " + ["Bytes", "KB", "MB", "GB", "TB"][t]
}
var Storage = {};

function getRandomString() {
    if (window.crypto && window.crypto.getRandomValues && -1 === navigator.userAgent.indexOf("Safari")) {
        for (var e = window.crypto.getRandomValues(new Uint32Array(3)), t = "", r = 0, n = e.length; r < n; r++) t += e[r].toString(36);
        return t
    }
    return (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "")
}

function getFileName(e) {
    var t = new Date;
    return "Outklip-" + t.getUTCFullYear() + t.getUTCMonth() + t.getUTCDate() + "-" + getRandomString() + "." + e
}

function setupDesktopVideoCaptureConstraintsBeforeRecording() {
    if (isRecordingVOD) stopVODRecording();
    else {
        if (recorder && recorder.streams) return recorder.streams.forEach(function(e, t) {
            e.getTracks().forEach(function(e) {
                e.stop()
            }), 0 == t && "function" == typeof e.onended && e.onended()
        }), void(recorder.streams = null);
        if (enableTabCaptureAPI) setupTabCaptureConstraintsAndStartCountdown();
        else {
            var e = ["screen", "window", "audio"];
            !1 === enableSpeakers && (e = ["screen", "window"]), chrome.desktopCapture.chooseDesktopMedia(e, userApprovedScreenRecordingCallback)
        }
    }
}

function userApprovedScreenRecordingCallback(e, t) {
    if (!e || !e.toString().length) return setDefaults(), void chrome.runtime.reload();
    desktopRecordingConstraints = {
        audio: !1,
        video: {
            maxFrameRate: gMaxVideoFrameRate,
            mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: e,
                maxWidth: gMaxVideoWidth,
                maxHeight: gMaxVideoHeight,
                minWidth: 352,
                minHeight: 240
            },
            optional: []
        }
    }, !0 === t.canRequestAudioTrack && (desktopRecordingConstraints.audio = {
        mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: e,
            echoCancellation: !0
        },
        optional: []
    }), chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
            greeting: "show_countdown",
            profilephoto: gProfilePhotoURL,
            username: gUsername
        })
    })
}

function startDesktopScreenRecording() {
    navigator.webkitGetUserMedia(desktopRecordingConstraints, function(e) {
        var t = e.getVideoTracks()[0].getSettings();
        gDimensions = t.width + "x" + t.height, initVideoPlayer(e), recordStream(e)
    }, function() {})
}
"undefined" != typeof AudioContext ? Storage.AudioContext = AudioContext : "undefined" != typeof webkitAudioContext && (Storage.AudioContext = webkitAudioContext), MediaStream.prototype.stop = function() {
    this.getTracks().forEach(function(e) {
        e.stop()
    })
};
var microphoneDevice = !1,
    cameraDevice = !1;

function setupCameraMicStreamsBeforeRecording(e) {
    var t = navigator.mediaDevices.getSupportedConstraints(),
        r = {};
    enableCamera && (r.video = {
        width: {
            min: 352,
            ideal: gMaxVideoWidth,
            max: gMaxVideoWidth
        },
        height: {
            min: 240,
            ideal: gMaxVideoHeight,
            max: gMaxVideoHeight
        }
    }, t.aspectRatio && (r.video.aspectRatio = 1.777777778), t.frameRate && (r.video.frameRate = {
        ideal: gMaxVideoFrameRate
    }), cameraDevice && "string" == typeof cameraDevice && (r.video.deviceId = cameraDevice)), enableMicrophone && (r.audio = {}, microphoneDevice && "string" == typeof microphoneDevice && (r.audio.deviceId = microphoneDevice), t.echoCancellation && (r.audio.echoCancellation = !0)), navigator.mediaDevices.getUserMedia(r).then(function(t) {
        var r = t.getVideoTracks();
        if (r && r[0]) {
            var n = r[0].getSettings();
            gDimensions = n.width + "x" + n.height
        }
        e(t)
    }).catch(function(e) {
        console.log(e), setDefaults()
    })
}

function initNewPost() {
    updateProgressLog("init");
    var e = document.getElementById("outklipiframeiframe");
    if (null == e) {
        var t = document.createElement("iframe");
        t.src = DOMAIN_TO_CHECK_LOGIN, t.id = "outklipiframeiframe", document.body.appendChild(t), handleUploadError("initNewPost", "init:outklipiframeiframe not available")
    } else e.contentWindow.postMessage({
        type: "CREATE_NEW_POST",
        text: "Hello from the webpage!"
    }, "*")
}

function s3MultipartUploadOperation(e) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1:d454e3eb-6f21-4048-97e4-d32b0530e99f",
        Logins: {
            "securetoken.google.com/outclip-3e4dc": gIdToken
        }
    }, {
        region: "us-east-1"
    }), AWS.config.correctClockSkew = !0, AWS.config.credentials.refresh(e), AWS.config.httpOptions.timeout = gZeroTimeoutForPoorInternetConnection ? 0 : 6e5
}

function manualUploadCallback(e) {
    if (e) {
        var t = null;
        return this.error && this.error.requestId && (t = this.error.requestId), void handleUploadError("manualUploadCallback", e, t)
    }
    var r = new AWS.S3({
        useAccelerateEndpoint: !0,
        params: {
            Bucket: S3_BUCKET_NAME
        }
    });
    videoKey = wid + "/" + gid + "/" + moment().format("YYYYMMDD") + "_" + moment().format("hhmmss") + "_" + Math.random().toString(36).substr(2, 16) + "/TRIMVIDEO.webm", updateProgressLog("upload..."), DiskStorage.Fetch("outklip-video", function(e) {
        e && r.upload({
            Key: videoKey,
            Body: e,
            Metadata: {
                uid: uid,
                groupid0: gid,
                workspaceid: wid,
                hasaudio: "true",
                videosource: "upload",
                postid: vid,
                shareid: shareid,
                usescredit: numCredits > 0 ? "true" : "false"
            }
        }, function(e, t) {
            if (e) return handleUploadError("s3Bucket.upload", e), chrome.runtime.sendMessage({
                greeting: "MANUAL_UPLOAD_ERROR",
                error: e
            }), void(gManualUploadInProgress = !1);
            updateProgressLog("...upload"), gManualUploadInProgress = !0;
            var r = document.getElementById("outklipiframeiframe");
            if (null == r) {
                var n = document.createElement("iframe");
                return n.src = protocol + "://" + domain + "/", n.id = "outklipiframeiframe", document.body.appendChild(n), handleUploadError("manualUploadCallback", "manual:outklipiframeiframe not available"), chrome.runtime.sendMessage({
                    greeting: "MANUAL_UPLOAD_ERROR",
                    error: "manual upload failed"
                }), void(gManualUploadInProgress = !1)
            }
            updateProgressLog("complete"), chrome.storage.sync.get("videoDurationInMs", function(e) {
                var t = 0;
                e && e.videoDurationInMs && (t = parseInt(e.videoDurationInMs)), r.contentWindow.postMessage({
                    type: "FINISH_POST",
                    videoid: vid,
                    shareid: shareid,
                    videoKey: videoKey,
                    durationInMs: t,
                    dimensions: gDimensions
                }, "*")
            })
        }).on("httpUploadProgress", function(e) {
            gManualUploadProgressInPercent = parseInt(100 * e.loaded / e.total), chrome.runtime.sendMessage({
                greeting: "MANUAL_UPLOAD_PROGRESS_PERCENTAGE",
                progressinpercent: gManualUploadProgressInPercent
            })
        })
    })
}

function createMultipartUploadCallback(e) {
    if (e) {
        var t = null;
        return this.error && this.error.requestId && (t = this.error.requestId), void handleUploadError("createMultipartUploadCallback", e, t)
    }
    if (!abortMultipartUpload) {
        var r = new AWS.S3({
            useAccelerateEndpoint: !0,
            params: {
                Bucket: S3_BUCKET_NAME
            }
        });
        videoKey = wid + "/" + gid + "/" + moment().format("YYYYMMDD") + "_" + moment().format("hhmmss") + "_" + Math.random().toString(36).substr(2, 16) + "/00001.webm", updateProgressLog("create..."), r.createMultipartUpload({
            Key: videoKey,
            Metadata: {
                uid: uid,
                groupid0: gid,
                workspaceid: wid,
                hasaudio: "true",
                videosource: gVideoSource,
                postid: vid,
                shareid: shareid,
                usescredit: numCredits > 0 ? "true" : "false"
            }
        }, function(e, t) {
            if (e) {
                var r = null;
                return this.error && this.error.requestId && (r = this.error.requestId), void handleUploadError("s3Bucket.createMultipartUpload", e, r)
            }
            updateProgressLog("...create"), uploadID = t.UploadId, s3MultipartUploadOperation(uploadPartCallback)
        })
    }
}

function uploadPartCallback(e) {
    if (e) {
        var t = null;
        return this.error && this.error.requestId && (t = this.error.requestId), void handleUploadError("uploadPartCallback", e, t)
    }
    if (!abortMultipartUpload && 0 != gPartsToUploadList.length && null != gPartsToUploadList[0].blob) {
        var r = new AWS.S3({
                useAccelerateEndpoint: !0,
                params: {
                    Bucket: S3_BUCKET_NAME
                }
            }),
            n = gPartsToUploadList.shift();
        uploadStatus.push({
            sizeInBytes: n.blob.size,
            uploadComplete: !1
        });
        var i = uploadID ? uploadID.substring(0, 4) : "";
        uploadLog.push(n.partNumber + ":" + i + ":" + n.blob.size), updateProgressLog("upload " + n.partNumber + "..."), r.uploadPart({
            Body: n.blob,
            Key: videoKey,
            UploadId: uploadID,
            PartNumber: n.partNumber
        }, function(e, t) {
            if (e) {
                var r = null;
                return this.error && this.error.requestId && (r = this.error.requestId), void handleUploadError("s3Bucket.uploadPart #" + n.partNumber, e, r)
            }
            updateProgressLog("...upload " + n.partNumber), etags.push({
                PartNumber: n.partNumber,
                ETag: t.ETag
            }), 0 == isRecording && (etags.length == gPartNumber ? s3MultipartUploadOperation(completeMultipartUploadCallback) : gPartsToUploadList.length > 0 && s3MultipartUploadOperation(uploadPartCallback)), updatePercentageUploadComplete(n.partNumber - 1)
        })
    }
}

function completeMultipartUploadCallback(e) {
    if (e) {
        var t = null;
        return this.error && this.error.requestId && (t = this.error.requestId), void handleUploadError("completeMultipartUploadCallback", e, t)
    }
    if (!abortMultipartUpload) {
        var r = new AWS.S3({
            useAccelerateEndpoint: !0,
            params: {
                Bucket: S3_BUCKET_NAME
            }
        });
        etags = _.sortBy(etags, "PartNumber"), updateProgressLog("complete..."), r.completeMultipartUpload({
            UploadId: uploadID,
            Key: videoKey,
            MultipartUpload: {
                Parts: etags
            }
        }, function(e, t) {
            if (e) {
                var r = null;
                return this.error && this.error.requestId && (r = this.error.requestId), void handleUploadError("s3Bucket.completeMultipartUpload", e, r)
            }
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function(e) {
                e[0] && (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
                    greeting: "update_loader_percentage_complete",
                    percentageUploadComplete: 100
                })
            }), updateProgressLog("...complete");
            var n = document.getElementById("outklipiframeiframe");
            if (null == n) {
                var i = document.createElement("iframe");
                return i.src = protocol + "://" + domain + "/", i.id = "outklipiframeiframe", document.body.appendChild(i), void handleUploadError("completeMultipartUpload", "complete:outklipiframeiframe not available")
            }
            n.contentWindow.postMessage({
                type: "FINISH_POST",
                videoid: vid,
                shareid: shareid,
                videoKey: videoKey,
                durationInMs: gTimeElapsed,
                dimensions: gDimensions
            }, "*")
        })
    }
}

function abortMultipartUploadCallback(e) {
    if (e) handleUploadError("abortMultipartUploadCallback", e);
    else {
        var t = new AWS.S3({
            useAccelerateEndpoint: !1,
            params: {
                Bucket: S3_BUCKET_NAME
            }
        });
        updateProgressLog("abort..."), t.abortMultipartUpload({
            Bucket: "outclip-auth-output",
            UploadId: uploadID,
            Key: videoKey
        }, function(e, t) {
            if (e) {
                var r = null;
                return this.error && this.error.requestId && (r = this.error.requestId), void handleUploadError("s3Bucket.abortMultipartUpload", e, r)
            }
            updateProgressLog("...abort")
        })
    }
}

function dummyCallback(e) {
    e && console.log(e)
}

function uploadLatestBlob() {
    if (0 != gMediaBlobArray.length) {
        var e = gMediaBlobArray;
        gMediaBlobArray = [];
        var t = gPartsToUploadList.length;
        gPartsToUploadList.push({
            partNumber: ++gPartNumber,
            blob: null
        }), ConcatenateBlobs(e, e[0].type, function(e) {
            gPartsToUploadList[t].blob = e, _.isEmpty(uploadID) ? (uploadID = UPLOAD_CREATION_IN_PROGRESS, initNewPost()) : uploadID == UPLOAD_CREATION_IN_PROGRESS || s3MultipartUploadOperation(uploadPartCallback)
        })
    }
}

function recordStream(e) {
    var t = {
        type: "video",
        disableLogs: !0,
        ondataavailable: function(e) {
            if (null != e && !abortMultipartUpload && "limited" != customerType && "false" != cloudVideoStorage) {
                gMediaBlobArray.push(e), totalUploadSize += e.size;
                for (var t = 0, r = 0; r < gMediaBlobArray.length; r++) t += gMediaBlobArray[r].size;
                t >= MIN_BLOB_SIZE_IN_BYTES && uploadLatestBlob()
            }
        },
        timeSlice: 1e4,
        ignoreMutedMedia: !0,
        recorderType: MediaStreamRecorder
    };
    videoCodec || (videoCodec = "Default"), videoCodec && ("Default" === videoCodec && (t.mimeType = "video/webm;codecs=vp9"), "VP8" === videoCodec && (t.mimeType = "video/webm;codecs=vp8"), "VP9" === videoCodec && (t.mimeType = "video/webm;codecs=vp9"), "H264" === videoCodec && isMimeTypeSupported("video/webm;codecs=h264") && (t.mimeType = "video/webm;codecs=h264"), "MKV" === videoCodec && isMimeTypeSupported("video/x-matroska;codecs=avc1") && (t.mimeType = "video/x-matroska;codecs=avc1")), bitsPerSecond && (!(bitsPerSecond = parseInt(bitsPerSecond)) || bitsPerSecond < 100) && (bitsPerSecond = 8e9), bitsPerSecond && (t.bitsPerSecond = bitsPerSecond), cameraStream && cameraStream.getAudioTracks().length && !enableTabCaptureAPI && cameraStream.getAudioTracks().forEach(function(t) {
        cameraStream.removeTrack(t), e.addTrack(t)
    }), t.ignoreMutedMedia = !1, cameraStream && cameraStream.getVideoTracks().length ? (e.width = screen.width, e.height = screen.height, e.fullcanvas = !0, cameraStream.width = parseInt(.2 * e.width), cameraStream.height = parseInt(.2 * e.height), cameraStream.top = e.height - cameraStream.height, cameraStream.left = e.width - cameraStream.width, t.frameInterval = 1, (recorder = new MultiStreamRecorder([cameraStream, e], t)).streams = [e, cameraStream]) : cameraStream && cameraStream.getAudioTracks().length && enableTabCaptureAPI ? (recorder = new TabAndMicStreamRecorder([e, cameraStream], t)).streams = [e, cameraStream] : (recorder = new MediaStreamRecorder(e, t)).streams = [e], updateProgressLog(chrome.runtime.getManifest().version + ": start"), chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
            greeting: "started_recording",
            profilephoto: gProfilePhotoURL,
            username: gUsername
        })
    }), recorder.record(), isRecording = !0, chrome.storage.sync.set({
        isRecording: "true"
    }), recorder.streams[0].onended = function() {
        recorder && recorder.streams.length && (recorder.streams[0].onended = null), stopScreenRecording()
    }, recorder.streams[0].getVideoTracks().length && recorder.streams[0].getVideoTracks().forEach(function(e) {
        e.onended = function() {
            if (recorder) {
                var e = recorder.streams[0];
                e && "function" == typeof e.onended && e.onended()
            }
        }
    }), resetTimeElapsed(), timer = setInterval(updateTimeElapsed, TIMER_INTERVAL_IN_MS)
}

function stopScreenRecording() {
    if (updateProgressLog("stop"), isRecording = !1, chrome.storage.sync.set({
            isRecording: "false"
        }), recorder.stop(function(e) {
            abortMultipartUpload || (uploadLatestBlob(), saveVideoOnDisk())
        }), timer && clearTimeout(timer), setBadgeText(""), chrome.storage.sync.set({
            contentScriptState: "none"
        }), chrome.tabs.query({}, function(e) {
            for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
                greeting: "stopped_recording"
            })
        }), !abortMultipartUpload)
        if (gUploadError && !gUserNotifiedOfUploadError) chrome.tabs.create({
            url: "chrome-extension://" + chrome.runtime.id + "/lastvideo.html"
        }), chrome.tabs.query({}, function(e) {
            for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
                greeting: "hide_outklip_loader"
            })
        }), chrome.notifications.create(null, {
            type: "basic",
            title: "⚠️Error on upload",
            message: "View and download video in the new tab.",
            iconUrl: "images/main-icon.png"
        }, function(e) {});
        else if ("limited" == customerType || "false" == cloudVideoStorage) {
        chrome.tabs.create({
            url: "chrome-extension://" + chrome.runtime.id + "/lastvideo.html"
        });
        var e = document.getElementById("outklipiframeiframe");
        if (null == e) {
            var t = document.createElement("iframe");
            t.src = DOMAIN_TO_CHECK_LOGIN, t.id = "outklipiframeiframe", document.body.appendChild(t), handleUploadError("unsigned", "unsigned:outklipiframeiframe not available")
        } else e.contentWindow.postMessage({
            type: "FINISH_NONUSER_VIDEO"
        }, "*")
    } else chrome.storage.sync.set({
        contentScriptState: "uploadinprogress"
    }), chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        e[0] && (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
            greeting: "show_outklip_loader"
        })
    })
}

function finishPost() {
    const e = "https://outklip.com/v/" + shareid;
    chrome.tabs.create({
        url: e
    }), chrome.storage.sync.set({
        contentScriptState: "none"
    }), chrome.tabs.query({}, function(e) {
        for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
            greeting: "hide_outklip_loader"
        })
    }), setTimeout(function() {
        setDefaults()
    }, 1e3);
    try {
        videoPlayers.forEach(function(e) {
            e.src = null
        }), videoPlayers = []
    } catch (e) {}
    var t = document.getElementById("outkliptextarea");
    if (null == t) {
        var r = document.createElement("textarea");
        r.id = "outkliptextarea", r.value = e, document.body.appendChild(r)
    } else t.value = e;
    document.getElementById("outkliptextarea").select(), document.execCommand("copy"), chrome.notifications.create(null, {
        type: "basic",
        title: "🙌Your video is ready!",
        message: "View video in the new tab and Ctrl+V (paste) to share the link.",
        iconUrl: "images/main-icon.png"
    }, function(e) {}), gManualUploadInProgress && (gManualUploadInProgress = !1, chrome.runtime.sendMessage({
        greeting: "MANUAL_UPLOAD_COMPLETE"
    }))
}

function setDefaults() {
    chrome.browserAction.setIcon({
        path: "images/main-icon-32.png"
    }), recorder && recorder.streams && (recorder.streams.forEach(function(e, t) {
        e.getTracks().forEach(function(e) {
            e.stop()
        }), 0 == t && "function" == typeof e.onended && e.onended()
    }), recorder.streams = null), recorder = null, isRecording = !1, chrome.storage.sync.set({
        isRecording: "false"
    }), imgIndex = 0, bitsPerSecond = 0, enableTabCaptureAPI = !1, enableScreen = !0, enableMicrophone = !1, enableCamera = !1, cameraStream = !1, enableSpeakers = !0, isRecordingVOD = !1, gCameraNoScreenStream = null, startedVODRecordedAt = (new Date).getTime(), gDimensions = "", gVideoSource = ""
}

function loadSettingsBeforeRecording() {
    if (chrome.storage.sync.get(null, function(e) {
            switch (e.bitsPerSecond && e.bitsPerSecond.toString().length && "default" !== e.bitsPerSecond && (bitsPerSecond = parseInt(e.bitsPerSecond)), e.zeroTimeoutForPoorInternetConnection && (gZeroTimeoutForPoorInternetConnection = "true" == e.zeroTimeoutForPoorInternetConnection), e.enableTabCaptureAPI && (enableTabCaptureAPI = "true" == e.enableTabCaptureAPI), e.enableTabAudio && (enableTabAudio = "true" == e.enableTabAudio), e.enableCamera && (enableCamera = "true" == e.enableCamera), e.enableSpeakers && (enableSpeakers = "true" == e.enableSpeakers), e.enableScreen && (enableScreen = "true" == e.enableScreen), e.enableMicrophone && (enableMicrophone = "true" == e.enableMicrophone), e.videoCodec && (videoCodec = e.videoCodec), e.microphone && (microphoneDevice = e.microphone), e.camera && (cameraDevice = e.camera), e.cloudVideoStorage && (cloudVideoStorage = e.cloudVideoStorage), e.recordingmode && (gVideoSource = e.recordingmode), e.videoResolution) {
                case "4K":
                    "pro" == customerType || "trial" == customerType || numCredits > 0 ? (gMaxVideoWidth = 4096, gMaxVideoHeight = 2160) : (gMaxVideoWidth = 1080, gMaxVideoHeight = 720, chrome.storage.sync.set({
                        videoResolution: "Default"
                    }));
                    break;
                case "1080p":
                    "pro" == customerType || "trial" == customerType || numCredits > 0 ? (gMaxVideoWidth = 1920, gMaxVideoHeight = 1080) : (gMaxVideoWidth = 1080, gMaxVideoHeight = 720, chrome.storage.sync.set({
                        videoResolution: "Default"
                    }));
                    break;
                case "720p":
                    gMaxVideoWidth = 1080, gMaxVideoHeight = 720;
                    break;
                case "480p":
                    gMaxVideoWidth = 858, gMaxVideoHeight = 480;
                    break;
                case "360p":
                    gMaxVideoWidth = 480, gMaxVideoHeight = 360;
                    break;
                case "240p":
                    gMaxVideoWidth = 352, gMaxVideoHeight = 240;
                    break;
                case null:
                case void 0:
                default:
                    "pro" == customerType || "trial" == customerType || numCredits > 0 ? (gMaxVideoWidth = 1920, gMaxVideoHeight = 1080) : (gMaxVideoWidth = 1080, gMaxVideoHeight = 720, chrome.storage.sync.set({
                        videoResolution: "Default"
                    }))
            }
            switch (e.maxVideoFrameRate) {
                case "30":
                    gMaxVideoFrameRate = 30;
                    break;
                case "25":
                    gMaxVideoFrameRate = 25;
                    break;
                case "20":
                    gMaxVideoFrameRate = 20;
                    break;
                case "15":
                    gMaxVideoFrameRate = 15;
                    break;
                case "10":
                    gMaxVideoFrameRate = 10;
                    break;
                case "5":
                    gMaxVideoFrameRate = 5;
                    break;
                case null:
                case void 0:
                default:
                    gMaxVideoFrameRate = 30, chrome.storage.sync.set({
                        maxVideoFrameRate: "30"
                    })
            }
            if (gMediaBlobArray = [], gPartsToUploadList = [], uploadID = "", abortMultipartUpload = !1, gPartNumber = 0, etags = [], videoKey = "", wid = "", gid = "", uid = "", vid = "", shareid = "", postid = "", gUploadError = null, gUserNotifiedOfUploadError = !1, chrome.storage.local.remove("uploaderror"), chrome.storage.local.remove("videoerrorfix"), videoProgressLog = [], desktopRecordingConstraints = {}, tabRecordingConstraints = {}, uploadStatus = [], totalUploadSize = 0, uploadLog = [], enableMicrophone || enableCamera) return enableScreen ? void setupCameraMicStreamsBeforeRecording(function(e) {
                cameraStream = e, setupDesktopVideoCaptureConstraintsBeforeRecording()
            }) : void setupCameraMicStreamsBeforeRecording(function(e) {
                gCameraNoScreenStream = e, chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function(e) {
                    (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
                        greeting: "show_countdown",
                        profilephoto: gProfilePhotoURL,
                        username: gUsername
                    })
                })
            });
            setupDesktopVideoCaptureConstraintsBeforeRecording()
        }), null == document.getElementById("outklipiframeiframe")) {
        var e = document.createElement("iframe");
        e.src = DOMAIN_TO_CHECK_LOGIN, e.id = "outklipiframeiframe", document.body.appendChild(e)
    }
}

function startCameraRecording() {
    recordStream(gCameraNoScreenStream)
}

function stopVODRecording() {
    isRecordingVOD = !1
}

function openIframeToCheckLogin() {
    var e = document.getElementById("outklipiframeiframe");
    if (null == e) {
        var t = document.createElement("iframe");
        t.src = DOMAIN_TO_CHECK_LOGIN, t.id = "outklipiframeiframe", document.body.appendChild(t)
    } else e.contentWindow.postMessage({
        type: "CHECK_USER_LOGIN_STATUS",
        text: "Hello from the webpage!"
    }, "*")
}
chrome.storage.sync.set({
    isRecording: "false",
    enableMicrophone: "true",
    enableEmbeddedCamera: "true",
    useIframeForEmbeddedCamera: "true",
    contentScriptState: "none",
    countdownTimerValueInSeconds: "3",
    cloudVideoStorage: "true",
    controlpanel: "true",
    avatarinplaceofcamera: "false",
    webcamFilterIndex: "0",
    recordingmode: "desktop",
    maxVideoFrameRate: "30",
    videoResolution: "Default",
    videoCodec: "Default",
    inlineVideoPlayback: "true",
    videoDurationInMs: "0",
    highlightMouseCursor: "false",
    zeroTimeoutForPoorInternetConnection: "false",
    askUserForAllUrlsPermission: "true",
    hasAllUrlsPermission: "false"
}), chrome.webRequest.onHeadersReceived.addListener(function(e) {
    return {
        responseHeaders: e.responseHeaders.filter(function(e) {
            return "X-FRAME-OPTIONS" !== e.name.toUpperCase()
        })
    }
}, {
    urls: ["*://*/"]
}, ["blocking", "responseHeaders"]), chrome.runtime.manifest = chrome.app.getDetails();
var runtimePort, injectContentScriptIntoTab = function(e, t) {
    for (var r = chrome.runtime.manifest.content_scripts[0].js, n = chrome.runtime.manifest.content_scripts[0].css, i = 0, o = r.length, a = n.length; i < o; i++) chrome.tabs.executeScript(null != e ? e : void 0, {
        file: r[i]
    });
    for (i = 0; i < a; i++) chrome.tabs.insertCSS(null != e ? e : void 0, {
        file: n[i]
    });
    t && t()
};

function onChromeTabActivation(e) {
    var t = e.tabId;
    t && t != chrome.tabs.TAB_ID_NONE && chrome.tabs.query({
        currentWindow: !0,
        active: !0
    }, function(e) {
        var r = null;
        e[0].url && (r = new URL(e[0].url));
        var n = !1;
        !r || "https:" != r.protocol && "http:" != r.protocol || r.href.includes("https://chrome.google.com/webstore") || (n = !0), chrome.storage.sync.get(["contentScriptState", "recordingmode", "hasAllUrlsPermission", "useIframeForEmbeddedCamera", "enableEmbeddedCamera"], function(e) {
            "none" === e.contentScriptState || ("signup" === e.contentScriptState ? (currentTab && chrome.tabs.sendMessage(currentTab, {
                greeting: "hide_signup",
                switchactivetab: "true"
            }), currentTab = t) : "config" !== e.contentScriptState || "true" === e.enableEmbeddedCamera && "false" === e.useIframeForEmbeddedCamera ? "recording" !== e.contentScriptState || enableTabCaptureAPI || "camera" == e.recordingmode || "true" === e.enableEmbeddedCamera && "false" === e.useIframeForEmbeddedCamera ? "uploadinprogress" === e.contentScriptState && (chrome.tabs.sendMessage(t, {
                greeting: "show_outklip_loader"
            }), currentTab && chrome.tabs.sendMessage(currentTab, {
                greeting: "hide_outklip_loader",
                switchactivetab: "true"
            }), currentTab = t) : (n && "true" == e.hasAllUrlsPermission ? injectContentScriptIntoTab(t, function() {
                setTimeout(function() {
                    chrome.tabs.sendMessage(t, {
                        greeting: "started_recording",
                        profilephoto: gProfilePhotoURL,
                        username: gUsername,
                        switchactivetab: "true"
                    })
                }, 50)
            }) : chrome.tabs.sendMessage(t, {
                greeting: "started_recording",
                profilephoto: gProfilePhotoURL,
                username: gUsername,
                switchactivetab: "true"
            }), currentTab && chrome.tabs.sendMessage(currentTab, {
                greeting: "stopped_recording",
                switchactivetab: "true"
            }), currentTab = t) : (n && "true" == e.hasAllUrlsPermission ? injectContentScriptIntoTab(t, function() {
                setTimeout(function() {
                    chrome.tabs.sendMessage(t, {
                        greeting: "show_config",
                        customerType: customerType,
                        daysLeftInTrial: daysLeftInTrial,
                        numCredits: numCredits,
                        profilephoto: gProfilePhotoURL,
                        username: gUsername
                    })
                }, 50)
            }) : chrome.tabs.sendMessage(t, {
                greeting: "show_config",
                customerType: customerType,
                daysLeftInTrial: daysLeftInTrial,
                numCredits: numCredits,
                profilephoto: gProfilePhotoURL,
                username: gUsername
            }), currentTab && chrome.tabs.sendMessage(currentTab, {
                greeting: "hide_config",
                switchactivetab: "true"
            }), currentTab = t))
        })
    })
}

function onEdgeTabActivation(e) {
    var t = e.tabId;
    t && t != chrome.tabs.TAB_ID_NONE && chrome.storage.sync.get(["contentScriptState", "recordingmode", "useIframeForEmbeddedCamera", "enableEmbeddedCamera"], function(e) {
        "none" === e.contentScriptState || ("signup" === e.contentScriptState ? (currentTab && chrome.tabs.sendMessage(currentTab, {
            greeting: "hide_signup",
            switchactivetab: "true"
        }), currentTab = t) : "config" !== e.contentScriptState || "true" === e.enableEmbeddedCamera && "false" === e.useIframeForEmbeddedCamera ? "recording" !== e.contentScriptState || enableTabCaptureAPI || "camera" == e.recordingmode || "true" === e.enableEmbeddedCamera && "false" === e.useIframeForEmbeddedCamera ? "uploadinprogress" === e.contentScriptState && (chrome.tabs.sendMessage(t, {
            greeting: "show_outklip_loader"
        }), currentTab && chrome.tabs.sendMessage(currentTab, {
            greeting: "hide_outklip_loader",
            switchactivetab: "true"
        }), currentTab = t) : (chrome.tabs.sendMessage(t, {
            greeting: "started_recording",
            profilephoto: gProfilePhotoURL,
            username: gUsername,
            switchactivetab: "true"
        }), currentTab && chrome.tabs.sendMessage(currentTab, {
            greeting: "stopped_recording",
            switchactivetab: "true"
        }), currentTab = t) : (chrome.tabs.sendMessage(t, {
            greeting: "show_config",
            customerType: customerType,
            daysLeftInTrial: daysLeftInTrial,
            numCredits: numCredits,
            profilephoto: gProfilePhotoURL,
            username: gUsername
        }), currentTab && chrome.tabs.sendMessage(currentTab, {
            greeting: "hide_config",
            switchactivetab: "true"
        }), currentTab = t))
    })
}

function onTabUpdate(e, t, r) {
    e && e != chrome.tabs.TAB_ID_NONE && chrome.storage.sync.get("contentScriptState", function(t) {
        "none" === t.contentScriptState || "config" === t.contentScriptState || ("recording" === t.contentScriptState ? chrome.tabs.sendMessage(e, {
            greeting: "started_recording",
            profilephoto: gProfilePhotoURL,
            username: gUsername
        }) : "uploadinprogress" === t.contentScriptState && chrome.tabs.sendMessage(e, {
            greeting: "show_outklip_loader"
        }))
    })
}

function resetTimeElapsed() {
    gTimeElapsed = 0
}

function updateTimeElapsed() {
    if (gTimeElapsed += TIMER_INTERVAL_IN_MS, 0 == numCredits && ("basic" === customerType && gTimeElapsed >= BASIC_TIER_VIDEO_LENGTH_IN_MS || ("basic5mins" === customerType || "limited" == customerType) && gTimeElapsed >= BASIC_5MINS_TIER_VIDEO_LENGTH_IN_MS)) stopRecording();
    else if (setBadgeText("REC"), 0 != numCredits || "basic" !== customerType && "basic5mins" !== customerType && "limited" != customerType) chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        var t = Math.floor(gTimeElapsed / 1e3);
        (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
            greeting: "update_recording_time_indicator",
            timeinseconds: t
        })
    });
    else {
        var e = BASIC_TIER_VIDEO_LENGTH_IN_MS;
        switch (customerType) {
            case "basic":
                e = BASIC_TIER_VIDEO_LENGTH_IN_MS;
                break;
            case "basic5mins":
            case "limited":
                e = BASIC_5MINS_TIER_VIDEO_LENGTH_IN_MS;
                break;
            default:
                e = BASIC_TIER_VIDEO_LENGTH_IN_MS
        }
        var t = Math.floor((e - gTimeElapsed) / 1e3);
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, function(e) {
            (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
                greeting: "update_recording_time_indicator",
                timeinseconds: t
            })
        })
    }
}

function handleUploadError(e, t, r) {
    gUploadError = "", (gUploadError = t && "string" == typeof t || t instanceof String ? t : t && t.message ? t.message : "Error is neither a string nor is error.message valid").toLowerCase().includes("difference between the request time and the current time is too large") ? chrome.storage.local.set({
        videoerrorfix: "⏰ This computer's clock is inaccurate for your timezone. Please adjust the clock to be accurate."
    }) : gUploadError.toLowerCase().includes("logins don't match") ? chrome.storage.local.set({
        videoerrorfix: "🔑 You may have tried switching between Outklip accounts. Try recording a video again, the error won't occur a second time."
    }) : gUploadError.toLowerCase().includes("timeout") && chrome.storage.local.set({
        videoerrorfix: "🐌 Slow internet upload speed. A minimum internet upload speed of 2Mbps is needed to use Outklip. Check your internet upload speed, by typing 'internet speed test' on Google and running the test."
    }), updateProgressLog(gUploadError), chrome.storage.local.set({
        uploaderror: gUploadError
    }), chrome.storage.sync.get("contentScriptState", function(e) {
        "uploadinprogress" === e.contentScriptState && (gUserNotifiedOfUploadError = !0, chrome.tabs.create({
            url: "chrome-extension://" + chrome.runtime.id + "/lastvideo.html"
        }), chrome.tabs.query({}, function(e) {
            for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
                greeting: "hide_outklip_loader"
            })
        }), chrome.notifications.create(null, {
            type: "basic",
            title: "⚠️Error on upload",
            message: "View and download video in the new tab.",
            iconUrl: "images/main-icon.png"
        }, function(e) {}))
    });
    var n = document.getElementById("outklipiframeiframe");
    if (null == n) {
        var i = document.createElement("iframe");
        i.src = DOMAIN_TO_CHECK_LOGIN, i.id = "outklipiframeiframe", document.body.appendChild(i), updateProgressLog("handleUploadError:outklipiframeiframe not available")
    } else {
        for (var o = "", a = "", s = 0; s < videoProgressLog.length; s++) o += videoProgressLog[s], s == videoProgressLog.length - 1 ? o += "." : o += ", ";
        for (s = 0; s < uploadLog.length; s++) a += uploadLog[s], s == uploadLog.length - 1 ? a += "." : a += ", ";
        r && (o += " RequestId: " + r), "connection" in navigator && "effectiveType" in navigator.connection && "downlink" in navigator.connection && (o += " Network: " + navigator.connection.effectiveType + ":" + navigator.connection.downlink + "Mbps"), n.contentWindow.postMessage({
            type: "REPORT_ERROR",
            videoid: vid,
            error: e + ": " + gUploadError,
            errorlog: o + " --- " + a,
            durationInMs: gTimeElapsed
        }, "*")
    }
}

function saveVideoOnDisk() {
    var e = "video/webm",
        t = "webm";
    "H264" === videoCodec && isMimeTypeSupported("video/webm;codecs=h264") && (e = "video/webm", t = "webm"), "MKV" === videoCodec && isMimeTypeSupported("video/x-matroska;codecs=avc1") && (e = "video/mkv", t = "mkv");
    var r = new File([recorder ? recorder.blob : ""], getFileName(t), {
        type: e
    });
    DiskStorage.Store({
        key: "outklip-video",
        value: r
    }, function(e, t, r) {
        updateProgressLog(e ? "saved video" : "Error saving video")
    }), chrome.storage.sync.set({
        videoDurationInMs: gTimeElapsed
    })
}

function updateProgressLog(e) {
    videoProgressLog.push(e), chrome.storage.local.set({
        videoprogresslog: videoProgressLog
    })
}

function updatePercentageUploadComplete(e) {
    uploadStatus[e].uploadComplete = !0;
    for (var t = 0, r = 0; r < uploadStatus.length; r++) uploadStatus[r].uploadComplete && (t += uploadStatus[r].sizeInBytes);
    var n = Math.round(t / totalUploadSize * 100);
    n = 100 == n ? 99 : n, chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        e[0] && (currentTab = e[0].id ? e[0].id : null) && chrome.tabs.sendMessage(currentTab, {
            greeting: "update_loader_percentage_complete",
            percentageUploadComplete: n
        })
    })
}
chrome.runtime.onInstalled.addListener(function e(t) {
    if (chrome.runtime.OnInstalledReason.INSTALL === t.reason) {
        chrome.tabs.create({
            url: "https://outklip.com/signup?fromextension=true"
        }), chrome.runtime.onInstalled.removeListener(e);
        var r = document.getElementById("outklipiframeiframe");
        if (null == r) {
            localStorage.setItem("newinstall", "true");
            var n = document.createElement("iframe");
            n.src = DOMAIN_TO_CHECK_LOGIN, n.id = "outklipiframeiframe", document.body.appendChild(n)
        } else r.contentWindow.postMessage({
            type: "CREATE_NEW_INSTALL"
        }, "*")
    }
}), chrome.runtime.setUninstallURL("https://outklip.com/solong"), chrome.tabs.onActivated.addListener(onChromeTabActivation), chrome.tabs.onUpdated.addListener(onTabUpdate), chrome.commands.onCommand.addListener(function(e) {
    "start-recording" == e ? chrome.storage.sync.get("contentScriptState", function(e) {
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, function(t) {
            "config" === e.contentScriptState && t[0].id && (chrome.tabs.sendMessage(t[0].id, {
                greeting: "hide_config"
            }), loadSettingsBeforeRecording())
        })
    }) : "pause-resume-recording" == e && isRecording ? "paused" == recorder.getState() ? (recorder.resume(), timer = setInterval(updateTimeElapsed, TIMER_INTERVAL_IN_MS), chrome.tabs.query({}, function(e) {
        for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
            greeting: "force_resume_recording"
        })
    })) : "recording" == recorder.getState() && (timer && clearTimeout(timer), recorder.pause(), chrome.tabs.query({}, function(e) {
        for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
            greeting: "force_pause_recording"
        })
    })) : "cancel-recording" == e && isRecording ? (cancelRecording(), chrome.tabs.query({}, function(e) {
        for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
            greeting: "force_cancel_recording"
        })
    })) : "stop-recording" == e && isRecording && stopRecording()
});
var isWaitingForUserLoginStatusCheckToComplete = !1;

function stopRecording() {
    recorder && recorder.streams && (recorder.streams.forEach(function(e, t) {
        e.getTracks().forEach(function(e) {
            e.stop()
        }), 0 == t && "function" == typeof e.onended && e.onended()
    }), recorder.streams = null), isRecording = !1, chrome.storage.sync.set({
        isRecording: "false"
    })
}

function cancelRecording() {
    updateProgressLog("cancel"), abortMultipartUpload = !0, "" != uploadID && uploadID != UPLOAD_CREATION_IN_PROGRESS && s3MultipartUploadOperation(abortMultipartUploadCallback), stopRecording()
}
chrome.runtime.onConnect.addListener(function(e) {
    (runtimePort = e).onMessage.addListener(function(e) {
        if (e) {
            if (e.setupForRecording) return isRecordingVOD ? void stopVODRecording() : void loadSettingsBeforeRecording();
            if (e.startRecording) return enableTabCaptureAPI ? startTabRecording() : !enableScreen && enableCamera ? startCameraRecording() : startDesktopScreenRecording(), void((gManualUploadInProgress || gManualUploadNewPostCreationInProgress) && (gManualUploadInProgress = !1, gManualUploadNewPostCreationInProgress = !1, chrome.runtime.sendMessage({
                greeting: "MANUAL_UPLOAD_ERROR",
                error: "User interrupted upload."
            })));
            if (e.stopRecording) stopRecording();
            else if (e.checkIfUserIsLoggedIn) chrome.tabs.query({
                currentWindow: !0,
                active: !0
            }, function(e) {
                var t = new URL(e[0].url);
                !t || "https:" != t.protocol && "http:" != t.protocol || t.href.includes("https://chrome.google.com/webstore") || t.href.includes("https://microsoftedge.microsoft.com") ? chrome.tabs.create({
                    url: "https://outklip.com/createextensionrecording"
                }) : (isWaitingForUserLoginStatusCheckToComplete = !0, openIframeToCheckLogin(), chrome.runtime.sendMessage({
                    greeting: "show_dropdown_loader"
                }), injectContentScriptIntoTab())
            }), chrome.permissions.contains({
                origins: ["<all_urls>"]
            }, function(e) {
                e ? chrome.storage.sync.set({
                    hasAllUrlsPermission: "true"
                }) : chrome.storage.sync.set({
                    hasAllUrlsPermission: "false"
                })
            });
            else if (isWaitingForUserLoginStatusCheckToComplete && e.userIsLoggedIn && "true" == e.userIsLoggedIn) {
                if (isWaitingForUserLoginStatusCheckToComplete = !1, customerType = e.customerType, numCredits = e.numCredits, gProfilePhotoURL = e.profilePhotoURL, e.username && (gUsername = e.username), "trial" == customerType && e.subscriptionStartDate) {
                    var t = Math.round((Date.now() - e.subscriptionStartDate) / 1e3 / 60 / 60 / 24);
                    daysLeftInTrial = t <= 15 ? 15 - t : 0
                }
                chrome.storage.local.set({
                    customertype: customerType
                }), navigator.mediaDevices.enumerateDevices().then(function(e) {
                    var t = null,
                        r = null;
                    chrome.storage.sync.get(["microphone", "camera"], function(n) {
                        for (var i = 0; i < e.length; i++) "audioinput" === e[i].kind && (n.microphone == e[i].deviceId ? r = e[i].deviceId : r || (r = e[i].deviceId)), "videoinput" === e[i].kind && (n.camera == e[i].deviceId ? t = e[i].deviceId : t || (t = e[i].deviceId));
                        chrome.storage.sync.set({
                            camera: t
                        }), chrome.storage.sync.set({
                            microphone: r
                        }), chrome.tabs.query({
                            active: !0,
                            currentWindow: !0
                        }, function(e) {
                            (currentTab = e[0].id) && chrome.tabs.sendMessage(currentTab, {
                                greeting: "show_config",
                                customerType: customerType,
                                daysLeftInTrial: daysLeftInTrial,
                                numCredits: numCredits,
                                profilephoto: gProfilePhotoURL,
                                username: gUsername,
                                cameradeviceid: t
                            }), chrome.runtime.sendMessage({
                                greeting: "hide_dropdown_loader"
                            })
                        })
                    })
                }).catch(function(e) {
                    console.log(e)
                }), e.idtoken && (gIdToken = e.idtoken, s3MultipartUploadOperation(dummyCallback))
            } else if (isWaitingForUserLoginStatusCheckToComplete && e.userIsLoggedIn && "false" == e.userIsLoggedIn) isWaitingForUserLoginStatusCheckToComplete = !1, customerType = "limited", chrome.storage.local.set({
                customertype: customerType
            }), chrome.storage.sync.get("usedExtensionVersionWhereSignupWasNotRequired", function(e) {
                "true" === e.usedExtensionVersionWhereSignupWasNotRequired ? (numCredits = 0, gProfilePhotoURL = null, gUsername = "Demo", daysLeftInTrial = 0, navigator.mediaDevices.enumerateDevices().then(function(e) {
                    var t = null,
                        r = null;
                    chrome.storage.sync.get(["microphone", "camera"], function(n) {
                        for (var i = 0; i < e.length; i++) "audioinput" === e[i].kind && (n.microphone == e[i].deviceId ? r = e[i].deviceId : r || (r = e[i].deviceId)), "videoinput" === e[i].kind && (n.camera == e[i].deviceId ? t = e[i].deviceId : t || (t = e[i].deviceId));
                        chrome.storage.sync.set({
                            camera: t
                        }), chrome.storage.sync.set({
                            microphone: r
                        }), chrome.tabs.query({
                            active: !0,
                            currentWindow: !0
                        }, function(e) {
                            (currentTab = e[0].id) && chrome.tabs.sendMessage(currentTab, {
                                greeting: "show_config",
                                customerType: customerType,
                                daysLeftInTrial: daysLeftInTrial,
                                numCredits: numCredits,
                                profilephoto: gProfilePhotoURL,
                                username: gUsername,
                                cameradeviceid: t
                            }), chrome.runtime.sendMessage({
                                greeting: "hide_dropdown_loader"
                            })
                        })
                    })
                }).catch(function(e) {
                    console.log(e)
                })) : chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function(e) {
                    (currentTab = e[0].id) && chrome.tabs.sendMessage(currentTab, {
                        greeting: "show_signup"
                    }), chrome.runtime.sendMessage({
                        greeting: "hide_dropdown_loader"
                    })
                })
            });
            else if (e.idtokenChanged) gIdToken = e.idtoken, s3MultipartUploadOperation(dummyCallback);
            else if (e.createdNewPost) wid = e.wid, uid = e.uid, vid = e.vid, gid = e.gid, gIdToken = e.idtoken, shareid = e.shareid, gManualUploadNewPostCreationInProgress && !gManualUploadInProgress ? (s3MultipartUploadOperation(manualUploadCallback), gManualUploadNewPostCreationInProgress = !1) : s3MultipartUploadOperation(createMultipartUploadCallback);
            else if (e.finishedPost) finishPost();
            else if (e.pauseRecording && isRecording) timer && clearTimeout(timer), recorder.pause();
            else if (e.resumeRecording && isRecording) recorder.resume(), timer = setInterval(updateTimeElapsed, TIMER_INTERVAL_IN_MS);
            else if (e.cancelRecording && isRecording) cancelRecording();
            else {
                if (e.cancelCountdown) return gCameraNoScreenStream && (gCameraNoScreenStream.getTracks().forEach(function(e) {
                    e.stop()
                }), gCameraNoScreenStream = null), void(cameraStream && (cameraStream.getTracks().forEach(function(e) {
                    e.stop()
                }), cameraStream = null));
                if (e.checkIfNewInstall) "true" == localStorage.getItem("newinstall") && (localStorage.removeItem("newinstall"), null == (r = document.getElementById("outklipiframeiframe")) ? ((n = document.createElement("iframe")).src = DOMAIN_TO_CHECK_LOGIN, n.id = "outklipiframeiframe", document.body.appendChild(n)) : r.contentWindow.postMessage({
                    type: "CREATE_NEW_INSTALL",
                    text: "Hello from the webpage!"
                }, "*"));
                else if (e.updateProfilePhoto) gProfilePhotoURL = e.profilePhotoURL, chrome.tabs.query({}, function(e) {
                    for (var t = 0; t < e.length; ++t) e[t].id && chrome.tabs.sendMessage(e[t].id, {
                        greeting: "update_profile_photo",
                        profilephoto: gProfilePhotoURL
                    })
                });
                else if (e.initIframe) {
                    var r, n;
                    if (null == (r = document.getElementById("outklipiframeiframe")))(n = document.createElement("iframe")).src = DOMAIN_TO_CHECK_LOGIN, n.id = "outklipiframeiframe", document.body.appendChild(n)
                } else if (e.uploadVideo) {
                    if (gManualUploadInProgress || gManualUploadNewPostCreationInProgress) return;
                    gManualUploadNewPostCreationInProgress = !0, initNewPost()
                } else e.askAllUrlsPermission && chrome.permissions.request({
                    origins: ["<all_urls>"]
                }, function(e) {
                    e && chrome.tabs.query({
                        currentWindow: !0
                    }, function(e) {
                        for (var t = 0; t < e.length; t++) {
                            var r = null;
                            e[t].url && (r = new URL(e[t].url)), !r || "https:" != r.protocol && "http:" != r.protocol || r.href.includes("https://chrome.google.com/webstore") || injectContentScriptIntoTab(e[t].id)
                        }
                    })
                })
            }
        }
    })
}), chrome.runtime.onMessageExternal.addListener(function(e, t, r) {
    if (!isRecording && "show_config" == e.greeting) {
        if (e.customerType && (customerType = e.customerType), e.numCredits && (numCredits = e.numCredits), e.profilePhotoURL && (gProfilePhotoURL = e.profilePhotoURL), e.username && (gUsername = e.username), "trial" == customerType && e.subscriptionStartDate) {
            var n = Math.round((Date.now() - e.subscriptionStartDate) / 1e3 / 60 / 60 / 24);
            daysLeftInTrial = n <= 15 ? 15 - n : 0
        }
        navigator.mediaDevices.enumerateDevices().then(function(e) {
            var t = null,
                r = null;
            chrome.storage.sync.get(["microphone", "camera"], function(n) {
                for (var i = 0; i < e.length; i++) "audioinput" === e[i].kind && (n.microphone == e[i].deviceId ? r = e[i].deviceId : r || (r = e[i].deviceId)), "videoinput" === e[i].kind && (n.camera == e[i].deviceId ? t = e[i].deviceId : t || (t = e[i].deviceId));
                chrome.storage.sync.set({
                    camera: t
                }), chrome.storage.sync.set({
                    microphone: r
                }), chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function(e) {
                    (currentTab = e[0].id) && chrome.tabs.sendMessage(currentTab, {
                        greeting: "show_config",
                        customerType: customerType,
                        daysLeftInTrial: daysLeftInTrial,
                        numCredits: numCredits,
                        profilephoto: gProfilePhotoURL,
                        username: gUsername,
                        cameradeviceid: t
                    }), chrome.runtime.sendMessage({
                        greeting: "hide_dropdown_loader"
                    })
                })
            })
        }).catch(function(e) {
            console.log(e)
        }), gIdToken && s3MultipartUploadOperation(dummyCallback)
    }
});
var videoPlayers = [];

function initVideoPlayer(e) {
    var t = document.createElement("video");
    t.muted = !enableTabCaptureAPI, t.volume = !!enableTabCaptureAPI, t.srcObject = e, t.play(), videoPlayers.push(t)
}

function setupTabCaptureConstraintsAndStartCountdown() {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        var t = e[0].id;
        tabRecordingConstraints = {
            video: !0,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: "tab",
                    maxWidth: gMaxVideoWidth,
                    maxHeight: gMaxVideoHeight,
                    minWidth: 352,
                    minHeight: 240,
                    maxFrameRate: gMaxVideoFrameRate
                }
            }
        }, enableTabAudio && (tabRecordingConstraints.audio = !0, tabRecordingConstraints.audioConstraints = {
            mandatory: {
                echoCancellation: !0
            }
        }), (gTabBeingCaptured = t || null) && chrome.tabs.sendMessage(gTabBeingCaptured, {
            greeting: "show_countdown",
            profilephoto: gProfilePhotoURL,
            username: gUsername
        })
    })
}

function gotTabCaptureStream(e, t) {
    if (!e) return !0 === t.audio ? void setupTabCaptureConstraintsAndStartCountdown(!0) : void chrome.runtime.reload();
    var r = new MediaStream;
    (e.getAudioTracks() ? e.getAudioTracks() : []).concat(e.getVideoTracks()).forEach(function(e) {
        r.addTrack(e)
    });
    var n = e.getVideoTracks()[0].getSettings();
    gDimensions = n.width + "x" + n.height, initVideoPlayer(e), recordStream(r)
}

function startTabRecording() {
    chrome.tabCapture.capture(tabRecordingConstraints, function(e) {
        gotTabCaptureStream(e, tabRecordingConstraints), chrome.tabs.executeScript(gTabBeingCaptured, {
            code: executeScriptForTabCapture.toString() + ";executeScriptForTabCapture();"
        })
    })
}

function executeScriptForTabCapture() {
    var e = document.createElement("img");
    e.style = "position: fixed;top: 0px;right: 0px;width: 20px;z-index: 2147483647;", e.src = "https://imgur.com/oZBhje1.gif", (document.body || document.documentElement).appendChild(e)
}(function() {
    var e, t = "Expected a function",
        r = 1,
        n = 2,
        i = 1,
        o = 1 / 0,
        a = 9007199254740991,
        s = "[object Arguments]",
        u = "[object Array]",
        c = "[object AsyncFunction]",
        l = "[object Boolean]",
        d = "[object Date]",
        p = "[object Error]",
        h = "[object Function]",
        m = "[object GeneratorFunction]",
        f = "[object Number]",
        g = "[object Object]",
        y = "[object Proxy]",
        v = "[object RegExp]",
        b = "[object String]",
        S = /[&<>"']/g,
        k = RegExp(S.source),
        C = "object" == typeof global && global && global.Object === Object && global,
        _ = "object" == typeof self && self && self.Object === Object && self,
        w = C || _ || Function("return this")(),
        E = "object" == typeof exports && exports && !exports.nodeType && exports,
        x = E && "object" == typeof module && module && !module.nodeType && module;

    function T(e, t) {
        return e.push.apply(e, t), e
    }

    function R(t) {
        return function(r) {
            return null == r ? e : r[t]
        }
    }
    var N, I = (N = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, function(t) {
        return null == N ? e : N[t]
    });
    var M, P, A = Array.prototype,
        q = Object.prototype,
        D = q.hasOwnProperty,
        B = 0,
        L = q.toString,
        U = w._,
        O = Object.create,
        z = q.propertyIsEnumerable,
        j = w.isFinite,
        F = (M = Object.keys, P = Object, function(e) {
            return M(P(e))
        }),
        V = Math.max;

    function H(e) {
        return e instanceof W ? e : new W(e)
    }
    var K = function() {
        function t() {}
        return function(r) {
            if (!Ve(r)) return {};
            if (O) return O(r);
            t.prototype = r;
            var n = new t;
            return t.prototype = e, n
        }
    }();

    function W(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t
    }

    function Y(t, r, n) {
        var i = t[r];
        D.call(t, r) && Le(i, n) && (n !== e || r in t) || G(t, r, n)
    }

    function G(e, t, r) {
        e[t] = r
    }

    function X(r, n, i) {
        if ("function" != typeof r) throw new TypeError(t);
        return setTimeout(function() {
            r.apply(e, i)
        }, n)
    }
    W.prototype = K(H.prototype), W.prototype.constructor = W;
    var Z, Q, J = (Z = ne, function(e, t) {
        if (null == e) return e;
        if (!ze(e)) return Z(e, t);
        for (var r = e.length, n = Q ? r : -1, i = Object(e);
            (Q ? n-- : ++n < r) && !1 !== t(i[n], n, i););
        return e
    });

    function $(t, r, n) {
        for (var i = -1, o = t.length; ++i < o;) {
            var a = t[i],
                s = r(a);
            if (null != s && (u === e ? s == s : n(s, u))) var u = s,
                c = a
        }
        return c
    }

    function ee(e, t) {
        var r = [];
        return J(e, function(e, n, i) {
            t(e, n, i) && r.push(e)
        }), r
    }

    function te(e, t, r, n, i) {
        var o = -1,
            a = e.length;
        for (r || (r = ke), i || (i = []); ++o < a;) {
            var s = e[o];
            t > 0 && r(s) ? t > 1 ? te(s, t - 1, r, n, i) : T(i, s) : n || (i[i.length] = s)
        }
        return i
    }
    var re = function(e) {
        return function(t, r, n) {
            for (var i = -1, o = Object(t), a = n(t), s = a.length; s--;) {
                var u = a[e ? s : ++i];
                if (!1 === r(o[u], u, o)) break
            }
            return t
        }
    }();

    function ne(e, t) {
        return e && re(e, t, tt)
    }

    function ie(e, t) {
        return ee(t, function(t) {
            return Fe(e[t])
        })
    }

    function oe(e) {
        return function(e) {
            return L.call(e)
        }(e)
    }

    function ae(e, t) {
        return e > t
    }
    var se = ct;

    function ue(t, i, o, a, c) {
        return t === i || (null == t || null == i || !He(t) && !He(i) ? t != t && i != i : function(t, i, o, a, c, h) {
            var m = Oe(t),
                y = Oe(i),
                S = m ? u : oe(t),
                k = y ? u : oe(i),
                C = (S = S == s ? g : S) == g,
                _ = (k = k == s ? g : k) == g,
                w = S == k;
            h || (h = []);
            var E = Ie(h, function(e) {
                    return e[0] == t
                }),
                x = Ie(h, function(e) {
                    return e[0] == i
                });
            if (E && x) return E[1] == i;
            if (h.push([t, i]), h.push([i, t]), w && !C) {
                var T = m ? function(t, i, o, a, s, u) {
                    var c = o & r,
                        l = t.length,
                        d = i.length;
                    if (l != d && !(c && d > l)) return !1;
                    var p = -1,
                        h = !0,
                        m = o & n ? [] : e;
                    for (; ++p < l;) {
                        var f = t[p],
                            g = i[p];
                        if (void 0 !== e) {
                            void 0, h = !1;
                            break
                        }
                        if (m) {
                            if (!ge(i, function(e, t) {
                                    if (!Te(m, t) && (f === e || s(f, e, o, a, u))) return m.push(t)
                                })) {
                                h = !1;
                                break
                            }
                        } else if (f !== g && !s(f, g, o, a, u)) {
                            h = !1;
                            break
                        }
                    }
                    return h
                }(t, i, o, a, c, h) : function(e, t, r, n, i, o, a) {
                    switch (r) {
                        case l:
                        case d:
                        case f:
                            return Le(+e, +t);
                        case p:
                            return e.name == t.name && e.message == t.message;
                        case v:
                        case b:
                            return e == t + ""
                    }
                    return !1
                }(t, i, S);
                return h.pop(), T
            }
            if (!(o & r)) {
                var R = C && D.call(t, "__wrapped__"),
                    N = _ && D.call(i, "__wrapped__");
                if (R || N) {
                    var I = R ? t.value() : t,
                        M = N ? i.value() : i,
                        T = c(I, M, o, a, h);
                    return h.pop(), T
                }
            }
            if (!w) return !1;
            var T = function(t, n, i, o, a, s) {
                var u = i & r,
                    c = tt(t),
                    l = c.length,
                    d = tt(n).length;
                if (l != d && !u) return !1;
                var p = l;
                for (; p--;) {
                    var h = c[p];
                    if (!(u ? h in n : D.call(n, h))) return !1
                }
                var m = !0,
                    f = u;
                for (; ++p < l;) {
                    h = c[p];
                    var g = t[h],
                        y = n[h];
                    if (!(void 0 === e ? g === y || a(g, y, i, o, s) : void 0)) {
                        m = !1;
                        break
                    }
                    f || (f = "constructor" == h)
                }
                if (m && !f) {
                    var v = t.constructor,
                        b = n.constructor;
                    v != b && "constructor" in t && "constructor" in n && !("function" == typeof v && v instanceof v && "function" == typeof b && b instanceof b) && (m = !1)
                }
                return m
            }(t, i, o, a, c, h);
            return h.pop(), T
        }(t, i, o, a, ue, c))
    }

    function ce(e) {
        return "function" == typeof e ? e : null == e ? ot : ("object" == typeof e ? pe : R)(e)
    }

    function le(e, t) {
        return e < t
    }

    function de(e, t) {
        var r = -1,
            n = ze(e) ? Array(e.length) : [];
        return J(e, function(e, i, o) {
            n[++r] = t(e, i, o)
        }), n
    }

    function pe(e) {
        var t = F(e);
        return function(i) {
            var o = t.length;
            if (null == i) return !o;
            for (i = Object(i); o--;) {
                var a = t[o];
                if (!(a in i && ue(e[a], i[a], r | n))) return !1
            }
            return !0
        }
    }

    function he(e, t) {
        return we(_e(e, t, ot), e + "")
    }

    function me(e, t, r) {
        var n = -1,
            i = e.length;
        t < 0 && (t = -t > i ? 0 : i + t), (r = r > i ? i : r) < 0 && (r += i), i = t > r ? 0 : r - t >>> 0, t >>>= 0;
        for (var o = Array(i); ++n < i;) o[n] = e[n + t];
        return o
    }

    function fe(e) {
        return me(e, 0, e.length)
    }

    function ge(e, t) {
        var r;
        return J(e, function(e, n, i) {
            return !(r = t(e, n, i))
        }), !!r
    }

    function ye(t, r, n, i) {
        var o = !n;
        n || (n = {});
        for (var a = -1, s = r.length; ++a < s;) {
            var u = r[a],
                c = i ? i(n[u], t[u], u, n, t) : e;
            c === e && (c = t[u]), o ? G(n, u, c) : Y(n, u, c)
        }
        return n
    }

    function ve(t) {
        return he(function(r, n) {
            var i = -1,
                o = n.length,
                a = o > 1 ? n[o - 1] : e;
            for (a = t.length > 3 && "function" == typeof a ? (o--, a) : e, r = Object(r); ++i < o;) {
                var s = n[i];
                s && t(r, s, i, a)
            }
            return r
        })
    }

    function be(e, r, n, o) {
        if ("function" != typeof e) throw new TypeError(t);
        var a = r & i,
            s = function(e) {
                return function() {
                    var t = arguments,
                        r = K(e.prototype),
                        n = e.apply(r, t);
                    return Ve(n) ? n : r
                }
            }(e);
        return function t() {
            for (var r = -1, i = arguments.length, u = -1, c = o.length, l = Array(c + i), d = this && this !== w && this instanceof t ? s : e; ++u < c;) l[u] = o[u];
            for (; i--;) l[u++] = arguments[++r];
            return d.apply(a ? n : this, l)
        }
    }

    function Se(t, r, n, i) {
        return t === e || Le(t, q[n]) && !D.call(i, n) ? r : t
    }

    function ke(e) {
        return Oe(e) || Ue(e)
    }

    function Ce(e) {
        var t = [];
        if (null != e)
            for (var r in Object(e)) t.push(r);
        return t
    }

    function _e(t, r, n) {
        return r = V(r === e ? t.length - 1 : r, 0),
            function() {
                for (var e = arguments, i = -1, o = V(e.length - r, 0), a = Array(o); ++i < o;) a[i] = e[r + i];
                i = -1;
                for (var s = Array(r + 1); ++i < r;) s[i] = e[i];
                return s[r] = n(a), t.apply(this, s)
            }
    }
    var we = ot;

    function Ee(e) {
        return (null == e ? 0 : e.length) ? te(e, 1) : []
    }

    function xe(t) {
        return t && t.length ? t[0] : e
    }

    function Te(e, t, r) {
        for (var n = null == e ? 0 : e.length, i = ((r = "number" == typeof r ? r < 0 ? V(n + r, 0) : r : 0) || 0) - 1, o = t == t; ++i < n;) {
            var a = e[i];
            if (o ? a === t : a != a) return i
        }
        return -1
    }

    function Re(e) {
        var t = H(e);
        return t.__chain__ = !0, t
    }
    var Ne, Ie = (Ne = function(e, t, r) {
        var n = null == e ? 0 : e.length;
        if (!n) return -1;
        var i = null == r ? 0 : Ge(r);
        return i < 0 && (i = V(n + i, 0)),
            function(e, t, r, n) {
                for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
                    if (t(e[o], o, e)) return o;
                return -1
            }(e, ce(t), i)
    }, function(t, r, n) {
        var i = Object(t);
        if (!ze(t)) {
            var o = ce(r);
            t = tt(t), r = function(e) {
                return o(i[e], e, i)
            }
        }
        var a = Ne(t, r, n);
        return a > -1 ? i[o ? t[a] : a] : e
    });

    function Me(e, t) {
        return J(e, ce(t))
    }

    function Pe(e, t, r) {
        return function(e, t, r, n, i) {
            return i(e, function(e, i, o) {
                r = n ? (n = !1, e) : t(r, e, i, o)
            }), r
        }(e, ce(t), r, arguments.length < 3, J)
    }

    function Ae(r, n) {
        var i;
        if ("function" != typeof n) throw new TypeError(t);
        return r = Ge(r),
            function() {
                return --r > 0 && (i = n.apply(this, arguments)), r <= 1 && (n = e), i
            }
    }
    var qe = he(function(e, t, r) {
            return be(e, 32 | i, t, r)
        }),
        De = he(function(e, t) {
            return X(e, 1, t)
        }),
        Be = he(function(e, t, r) {
            return X(e, Xe(t) || 0, r)
        });

    function Le(e, t) {
        return e === t || e != e && t != t
    }
    var Ue = se(function() {
            return arguments
        }()) ? se : function(e) {
            return He(e) && D.call(e, "callee") && !z.call(e, "callee")
        },
        Oe = Array.isArray;

    function ze(e) {
        return null != e && function(e) {
            return "number" == typeof e && e > -1 && e % 1 == 0 && e <= a
        }(e.length) && !Fe(e)
    }
    var je = function(e) {
        return He(e) && oe(e) == d
    };

    function Fe(e) {
        if (!Ve(e)) return !1;
        var t = oe(e);
        return t == h || t == m || t == c || t == y
    }

    function Ve(e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t)
    }

    function He(e) {
        return null != e && "object" == typeof e
    }

    function Ke(e) {
        return "number" == typeof e || He(e) && oe(e) == f
    }
    var We = function(e) {
        return He(e) && oe(e) == v
    };

    function Ye(e) {
        return "string" == typeof e || !Oe(e) && He(e) && oe(e) == b
    }
    var Ge = Number,
        Xe = Number;

    function Ze(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
    }
    var Qe = ve(function(e, t) {
            ye(t, F(t), e)
        }),
        Je = ve(function(e, t) {
            ye(t, Ce(t), e)
        }),
        $e = ve(function(e, t, r, n) {
            ye(t, rt(t), e, n)
        });
    var et = he(function(t) {
        return t.push(e, Se), $e.apply(e, t)
    });
    var tt = F,
        rt = Ce,
        nt = function(t) {
            return we(_e(t, e, Ee), t + "")
        }(function(e, t) {
            return null == e ? {} : function(e, t) {
                return e = Object(e), Pe(t, function(t, r) {
                    return r in e && (t[r] = e[r]), t
                }, {})
            }(e, t)
        });

    function it(e) {
        return null == e ? [] : function(e, t) {
            return de(t, function(t) {
                return e[t]
            })
        }(e, tt(e))
    }

    function ot(e) {
        return e
    }
    var at, st = ce;

    function ut(e, t, r) {
        var n = tt(t),
            i = ie(t, n);
        null != r || Ve(t) && (i.length || !n.length) || (r = t, t = e, e = this, i = ie(t, tt(t)));
        var o = !(Ve(r) && "chain" in r && !r.chain),
            a = Fe(e);
        return J(i, function(r) {
            var n = t[r];
            e[r] = n, a && (e.prototype[r] = function() {
                var t = this.__chain__;
                if (o || t) {
                    var r = e(this.__wrapped__);
                    return (r.__actions__ = fe(this.__actions__)).push({
                        func: n,
                        args: arguments,
                        thisArg: e
                    }), r.__chain__ = t, r
                }
                return n.apply(e, T([this.value()], arguments))
            })
        }), e
    }

    function ct() {}
    H.assignIn = Je, H.before = Ae, H.bind = qe, H.chain = Re, H.compact = function(e) {
        return ee(e, Boolean)
    }, H.concat = function() {
        var e = arguments.length;
        if (!e) return [];
        for (var t = Array(e - 1), r = arguments[0], n = e; n--;) t[n - 1] = arguments[n];
        return T(Oe(r) ? fe(r) : [r], te(t, 1))
    }, H.create = function(e, t) {
        var r = K(e);
        return null == t ? r : Qe(r, t)
    }, H.defaults = et, H.defer = De, H.delay = Be, H.filter = function(e, t) {
        return ee(e, ce(t))
    }, H.flatten = Ee, H.flattenDeep = function(e) {
        return null != e && e.length ? te(e, o) : []
    }, H.iteratee = st, H.keys = tt, H.map = function(e, t) {
        return de(e, ce(t))
    }, H.matches = function(e) {
        return pe(Qe({}, e))
    }, H.mixin = ut, H.negate = function(e) {
        if ("function" != typeof e) throw new TypeError(t);
        return function() {
            var t = arguments;
            return !e.apply(this, t)
        }
    }, H.once = function(e) {
        return Ae(2, e)
    }, H.pick = nt, H.slice = function(t, r, n) {
        var i = null == t ? 0 : t.length;
        return r = null == r ? 0 : +r, n = n === e ? i : +n, i ? me(t, r, n) : []
    }, H.sortBy = function(t, r) {
        var n = 0;
        return r = ce(r), de(de(t, function(e, t, i) {
            return {
                value: e,
                index: n++,
                criteria: r(e, t, i)
            }
        }).sort(function(t, r) {
            return function(t, r) {
                if (t !== r) {
                    var n = t !== e,
                        i = null === t,
                        o = t == t,
                        a = r !== e,
                        s = null === r,
                        u = r == r;
                    if (!s && t > r || i && a && u || !n && u || !o) return 1;
                    if (!i && t < r || s && n && o || !a && o || !u) return -1
                }
                return 0
            }(t.criteria, r.criteria) || t.index - r.index
        }), R("value"))
    }, H.tap = function(e, t) {
        return t(e), e
    }, H.thru = function(e, t) {
        return t(e)
    }, H.toArray = function(e) {
        return ze(e) ? e.length ? fe(e) : [] : it(e)
    }, H.values = it, H.extend = Je, ut(H, H), H.clone = function(e) {
        return Ve(e) ? Oe(e) ? fe(e) : ye(e, F(e)) : e
    }, H.escape = function(e) {
        return (e = Ze(e)) && k.test(e) ? e.replace(S, I) : e
    }, H.every = function(t, r, n) {
        return function(e, t) {
            var r = !0;
            return J(e, function(e, n, i) {
                return r = !!t(e, n, i)
            }), r
        }(t, ce(r = n ? e : r))
    }, H.find = Ie, H.forEach = Me, H.has = function(e, t) {
        return null != e && D.call(e, t)
    }, H.head = xe, H.identity = ot, H.indexOf = Te, H.isArguments = Ue, H.isArray = Oe, H.isBoolean = function(e) {
        return !0 === e || !1 === e || He(e) && oe(e) == l
    }, H.isDate = je, H.isEmpty = function(e) {
        return ze(e) && (Oe(e) || Ye(e) || Fe(e.splice) || Ue(e)) ? !e.length : !F(e).length
    }, H.isEqual = function(e, t) {
        return ue(e, t)
    }, H.isFinite = function(e) {
        return "number" == typeof e && j(e)
    }, H.isFunction = Fe, H.isNaN = function(e) {
        return Ke(e) && e != +e
    }, H.isNull = function(e) {
        return null === e
    }, H.isNumber = Ke, H.isObject = Ve, H.isRegExp = We, H.isString = Ye, H.isUndefined = function(t) {
        return t === e
    }, H.last = function(t) {
        var r = null == t ? 0 : t.length;
        return r ? t[r - 1] : e
    }, H.max = function(t) {
        return t && t.length ? $(t, ot, ae) : e
    }, H.min = function(t) {
        return t && t.length ? $(t, ot, le) : e
    }, H.noConflict = function() {
        return w._ === this && (w._ = U), this
    }, H.noop = ct, H.reduce = Pe, H.result = function(t, r, n) {
        var i = null == t ? e : t[r];
        return i === e && (i = n), Fe(i) ? i.call(t) : i
    }, H.size = function(e) {
        return null == e ? 0 : (e = ze(e) ? e : F(e)).length
    }, H.some = function(t, r, n) {
        return ge(t, ce(r = n ? e : r))
    }, H.uniqueId = function(e) {
        var t = ++B;
        return Ze(e) + t
    }, H.each = Me, H.first = xe, ut(H, (at = {}, ne(H, function(e, t) {
        D.call(H.prototype, t) || (at[t] = e)
    }), at), {
        chain: !1
    }), H.VERSION = "4.17.4", J(["pop", "join", "replace", "reverse", "split", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = (/^(?:replace|split)$/.test(e) ? String.prototype : A)[e],
            r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
            n = /^(?:pop|join|replace|shift)$/.test(e);
        H.prototype[e] = function() {
            var e = arguments;
            if (n && !this.__chain__) {
                var i = this.value();
                return t.apply(Oe(i) ? i : [], e)
            }
            return this[r](function(r) {
                return t.apply(Oe(r) ? r : [], e)
            })
        }
    }), H.prototype.toJSON = H.prototype.valueOf = H.prototype.value = function() {
        return e = this.__wrapped__, Pe(this.__actions__, function(e, t) {
            return t.func.apply(t.thisArg, T([e], t.args))
        }, e);
        var e
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? (w._ = H, define(function() {
        return H
    })) : x ? ((x.exports = H)._ = H, E._ = H) : w._ = H
}).call(this),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
    }(this, function() {
        "use strict";
        var e, t;

        function r() {
            return e.apply(null, arguments)
        }

        function n(e) {
            return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
        }

        function i(e) {
            return null != e && "[object Object]" === Object.prototype.toString.call(e)
        }

        function o(e) {
            return void 0 === e
        }

        function a(e) {
            return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
        }

        function s(e) {
            return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
        }

        function u(e, t) {
            var r, n = [];
            for (r = 0; r < e.length; ++r) n.push(t(e[r], r));
            return n
        }

        function c(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        function l(e, t) {
            for (var r in t) c(t, r) && (e[r] = t[r]);
            return c(t, "toString") && (e.toString = t.toString), c(t, "valueOf") && (e.valueOf = t.valueOf), e
        }

        function d(e, t, r, n) {
            return xt(e, t, r, n, !0).utc()
        }

        function p(e) {
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
                var r = p(e),
                    n = t.call(r.parsedDateParts, function(e) {
                        return null != e
                    }),
                    i = !isNaN(e._d.getTime()) && r.overflow < 0 && !r.empty && !r.invalidMonth && !r.invalidWeekday && !r.weekdayMismatch && !r.nullInput && !r.invalidFormat && !r.userInvalidated && (!r.meridiem || r.meridiem && n);
                if (e._strict && (i = i && 0 === r.charsLeftOver && 0 === r.unusedTokens.length && void 0 === r.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return i;
                e._isValid = i
            }
            return e._isValid
        }

        function m(e) {
            var t = d(NaN);
            return null != e ? l(p(t), e) : p(t).userInvalidated = !0, t
        }
        t = Array.prototype.some ? Array.prototype.some : function(e) {
            for (var t = Object(this), r = t.length >>> 0, n = 0; n < r; n++)
                if (n in t && e.call(this, t[n], n, t)) return !0;
            return !1
        };
        var f = r.momentProperties = [];

        function g(e, t) {
            var r, n, i;
            if (o(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), o(t._i) || (e._i = t._i), o(t._f) || (e._f = t._f), o(t._l) || (e._l = t._l), o(t._strict) || (e._strict = t._strict), o(t._tzm) || (e._tzm = t._tzm), o(t._isUTC) || (e._isUTC = t._isUTC), o(t._offset) || (e._offset = t._offset), o(t._pf) || (e._pf = p(t)), o(t._locale) || (e._locale = t._locale), 0 < f.length)
                for (r = 0; r < f.length; r++) o(i = t[n = f[r]]) || (e[n] = i);
            return e
        }
        var y = !1;

        function v(e) {
            g(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === y && (y = !0, r.updateOffset(this), y = !1)
        }

        function b(e) {
            return e instanceof v || null != e && null != e._isAMomentObject
        }

        function S(e) {
            return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
        }

        function k(e) {
            var t = +e,
                r = 0;
            return 0 !== t && isFinite(t) && (r = S(t)), r
        }

        function C(e, t, r) {
            var n, i = Math.min(e.length, t.length),
                o = Math.abs(e.length - t.length),
                a = 0;
            for (n = 0; n < i; n++)(r && e[n] !== t[n] || !r && k(e[n]) !== k(t[n])) && a++;
            return a + o
        }

        function _(e) {
            !1 === r.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }

        function w(e, t) {
            var n = !0;
            return l(function() {
                if (null != r.deprecationHandler && r.deprecationHandler(null, e), n) {
                    for (var i, o = [], a = 0; a < arguments.length; a++) {
                        if (i = "", "object" == typeof arguments[a]) {
                            for (var s in i += "\n[" + a + "] ", arguments[0]) i += s + ": " + arguments[0][s] + ", ";
                            i = i.slice(0, -2)
                        } else i = arguments[a];
                        o.push(i)
                    }
                    _(e + "\nArguments: " + Array.prototype.slice.call(o).join("") + "\n" + (new Error).stack), n = !1
                }
                return t.apply(this, arguments)
            }, t)
        }
        var E, x = {};

        function T(e, t) {
            null != r.deprecationHandler && r.deprecationHandler(e, t), x[e] || (_(t), x[e] = !0)
        }

        function R(e) {
            return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
        }

        function N(e, t) {
            var r, n = l({}, e);
            for (r in t) c(t, r) && (i(e[r]) && i(t[r]) ? (n[r] = {}, l(n[r], e[r]), l(n[r], t[r])) : null != t[r] ? n[r] = t[r] : delete n[r]);
            for (r in e) c(e, r) && !c(t, r) && i(e[r]) && (n[r] = l({}, n[r]));
            return n
        }

        function I(e) {
            null != e && this.set(e)
        }
        r.suppressDeprecationWarnings = !1, r.deprecationHandler = null, E = Object.keys ? Object.keys : function(e) {
            var t, r = [];
            for (t in e) c(e, t) && r.push(t);
            return r
        };
        var M = {};

        function P(e, t) {
            var r = e.toLowerCase();
            M[r] = M[r + "s"] = M[t] = e
        }

        function A(e) {
            return "string" == typeof e ? M[e] || M[e.toLowerCase()] : void 0
        }

        function q(e) {
            var t, r, n = {};
            for (r in e) c(e, r) && (t = A(r)) && (n[t] = e[r]);
            return n
        }
        var D = {};

        function B(e, t) {
            D[e] = t
        }

        function L(e, t, r) {
            var n = "" + Math.abs(e),
                i = t - n.length;
            return (0 <= e ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + n
        }
        var U = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            O = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            z = {},
            j = {};

        function F(e, t, r, n) {
            var i = n;
            "string" == typeof n && (i = function() {
                return this[n]()
            }), e && (j[e] = i), t && (j[t[0]] = function() {
                return L(i.apply(this, arguments), t[1], t[2])
            }), r && (j[r] = function() {
                return this.localeData().ordinal(i.apply(this, arguments), e)
            })
        }

        function V(e, t) {
            return e.isValid() ? (t = H(t, e.localeData()), z[t] = z[t] || function(e) {
                var t, r, n, i = e.match(U);
                for (t = 0, r = i.length; t < r; t++) j[i[t]] ? i[t] = j[i[t]] : i[t] = (n = i[t]).match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "");
                return function(t) {
                    var n, o = "";
                    for (n = 0; n < r; n++) o += R(i[n]) ? i[n].call(t, e) : i[n];
                    return o
                }
            }(t), z[t](e)) : e.localeData().invalidDate()
        }

        function H(e, t) {
            var r = 5;

            function n(e) {
                return t.longDateFormat(e) || e
            }
            for (O.lastIndex = 0; 0 <= r && O.test(e);) e = e.replace(O, n), O.lastIndex = 0, r -= 1;
            return e
        }
        var K = /\d/,
            W = /\d\d/,
            Y = /\d{3}/,
            G = /\d{4}/,
            X = /[+-]?\d{6}/,
            Z = /\d\d?/,
            Q = /\d\d\d\d?/,
            J = /\d\d\d\d\d\d?/,
            $ = /\d{1,3}/,
            ee = /\d{1,4}/,
            te = /[+-]?\d{1,6}/,
            re = /\d+/,
            ne = /[+-]?\d+/,
            ie = /Z|[+-]\d\d:?\d\d/gi,
            oe = /Z|[+-]\d\d(?::?\d\d)?/gi,
            ae = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            se = {};

        function ue(e, t, r) {
            se[e] = R(t) ? t : function(e, n) {
                return e && r ? r : t
            }
        }

        function ce(e, t) {
            return c(se, e) ? se[e](t._strict, t._locale) : new RegExp(le(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, r, n, i) {
                return t || r || n || i
            })))
        }

        function le(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }
        var de = {};

        function pe(e, t) {
            var r, n = t;
            for ("string" == typeof e && (e = [e]), a(t) && (n = function(e, r) {
                    r[t] = k(e)
                }), r = 0; r < e.length; r++) de[e[r]] = n
        }

        function he(e, t) {
            pe(e, function(e, r, n, i) {
                n._w = n._w || {}, t(e, n._w, n, i)
            })
        }
        var me = 0,
            fe = 1,
            ge = 2,
            ye = 3,
            ve = 4,
            be = 5,
            Se = 6,
            ke = 7,
            Ce = 8;

        function _e(e) {
            return we(e) ? 366 : 365
        }

        function we(e) {
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        }
        F("Y", 0, 0, function() {
            var e = this.year();
            return e <= 9999 ? "" + e : "+" + e
        }), F(0, ["YY", 2], 0, function() {
            return this.year() % 100
        }), F(0, ["YYYY", 4], 0, "year"), F(0, ["YYYYY", 5], 0, "year"), F(0, ["YYYYYY", 6, !0], 0, "year"), P("year", "y"), B("year", 1), ue("Y", ne), ue("YY", Z, W), ue("YYYY", ee, G), ue("YYYYY", te, X), ue("YYYYYY", te, X), pe(["YYYYY", "YYYYYY"], me), pe("YYYY", function(e, t) {
            t[me] = 2 === e.length ? r.parseTwoDigitYear(e) : k(e)
        }), pe("YY", function(e, t) {
            t[me] = r.parseTwoDigitYear(e)
        }), pe("Y", function(e, t) {
            t[me] = parseInt(e, 10)
        }), r.parseTwoDigitYear = function(e) {
            return k(e) + (68 < k(e) ? 1900 : 2e3)
        };
        var Ee, xe = Te("FullYear", !0);

        function Te(e, t) {
            return function(n) {
                return null != n ? (Ne(this, e, n), r.updateOffset(this, t), this) : Re(this, e)
            }
        }

        function Re(e, t) {
            return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
        }

        function Ne(e, t, r) {
            e.isValid() && !isNaN(r) && ("FullYear" === t && we(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](r, e.month(), Ie(r, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](r))
        }

        function Ie(e, t) {
            if (isNaN(e) || isNaN(t)) return NaN;
            var r = (t % 12 + 12) % 12;
            return e += (t - r) / 12, 1 === r ? we(e) ? 29 : 28 : 31 - r % 7 % 2
        }
        Ee = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
            var t;
            for (t = 0; t < this.length; ++t)
                if (this[t] === e) return t;
            return -1
        }, F("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }), F("MMM", 0, 0, function(e) {
            return this.localeData().monthsShort(this, e)
        }), F("MMMM", 0, 0, function(e) {
            return this.localeData().months(this, e)
        }), P("month", "M"), B("month", 8), ue("M", Z), ue("MM", Z, W), ue("MMM", function(e, t) {
            return t.monthsShortRegex(e)
        }), ue("MMMM", function(e, t) {
            return t.monthsRegex(e)
        }), pe(["M", "MM"], function(e, t) {
            t[fe] = k(e) - 1
        }), pe(["MMM", "MMMM"], function(e, t, r, n) {
            var i = r._locale.monthsParse(e, n, r._strict);
            null != i ? t[fe] = i : p(r).invalidMonth = e
        });
        var Me = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            Pe = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            Ae = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

        function qe(e, t) {
            var r;
            if (!e.isValid()) return e;
            if ("string" == typeof t)
                if (/^\d+$/.test(t)) t = k(t);
                else if (!a(t = e.localeData().monthsParse(t))) return e;
            return r = Math.min(e.date(), Ie(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r), e
        }

        function De(e) {
            return null != e ? (qe(this, e), r.updateOffset(this, !0), this) : Re(this, "Month")
        }
        var Be = ae,
            Le = ae;

        function Ue() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, r, n = [],
                i = [],
                o = [];
            for (t = 0; t < 12; t++) r = d([2e3, t]), n.push(this.monthsShort(r, "")), i.push(this.months(r, "")), o.push(this.months(r, "")), o.push(this.monthsShort(r, ""));
            for (n.sort(e), i.sort(e), o.sort(e), t = 0; t < 12; t++) n[t] = le(n[t]), i[t] = le(i[t]);
            for (t = 0; t < 24; t++) o[t] = le(o[t]);
            this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")
        }

        function Oe(e) {
            var t;
            if (e < 100 && 0 <= e) {
                var r = Array.prototype.slice.call(arguments);
                r[0] = e + 400, t = new Date(Date.UTC.apply(null, r)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)
            } else t = new Date(Date.UTC.apply(null, arguments));
            return t
        }

        function ze(e, t, r) {
            var n = 7 + t - r;
            return -(7 + Oe(e, 0, n).getUTCDay() - t) % 7 + n - 1
        }

        function je(e, t, r, n, i) {
            var o, a, s = 1 + 7 * (t - 1) + (7 + r - n) % 7 + ze(e, n, i);
            return a = s <= 0 ? _e(o = e - 1) + s : s > _e(e) ? (o = e + 1, s - _e(e)) : (o = e, s), {
                year: o,
                dayOfYear: a
            }
        }

        function Fe(e, t, r) {
            var n, i, o = ze(e.year(), t, r),
                a = Math.floor((e.dayOfYear() - o - 1) / 7) + 1;
            return a < 1 ? n = a + Ve(i = e.year() - 1, t, r) : a > Ve(e.year(), t, r) ? (n = a - Ve(e.year(), t, r), i = e.year() + 1) : (i = e.year(), n = a), {
                week: n,
                year: i
            }
        }

        function Ve(e, t, r) {
            var n = ze(e, t, r),
                i = ze(e + 1, t, r);
            return (_e(e) - n + i) / 7
        }

        function He(e, t) {
            return e.slice(t, 7).concat(e.slice(0, t))
        }
        F("w", ["ww", 2], "wo", "week"), F("W", ["WW", 2], "Wo", "isoWeek"), P("week", "w"), P("isoWeek", "W"), B("week", 5), B("isoWeek", 5), ue("w", Z), ue("ww", Z, W), ue("W", Z), ue("WW", Z, W), he(["w", "ww", "W", "WW"], function(e, t, r, n) {
            t[n.substr(0, 1)] = k(e)
        }), F("d", 0, "do", "day"), F("dd", 0, 0, function(e) {
            return this.localeData().weekdaysMin(this, e)
        }), F("ddd", 0, 0, function(e) {
            return this.localeData().weekdaysShort(this, e)
        }), F("dddd", 0, 0, function(e) {
            return this.localeData().weekdays(this, e)
        }), F("e", 0, 0, "weekday"), F("E", 0, 0, "isoWeekday"), P("day", "d"), P("weekday", "e"), P("isoWeekday", "E"), B("day", 11), B("weekday", 11), B("isoWeekday", 11), ue("d", Z), ue("e", Z), ue("E", Z), ue("dd", function(e, t) {
            return t.weekdaysMinRegex(e)
        }), ue("ddd", function(e, t) {
            return t.weekdaysShortRegex(e)
        }), ue("dddd", function(e, t) {
            return t.weekdaysRegex(e)
        }), he(["dd", "ddd", "dddd"], function(e, t, r, n) {
            var i = r._locale.weekdaysParse(e, n, r._strict);
            null != i ? t.d = i : p(r).invalidWeekday = e
        }), he(["d", "e", "E"], function(e, t, r, n) {
            t[n] = k(e)
        });
        var Ke = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            We = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            Ye = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            Ge = ae,
            Xe = ae,
            Ze = ae;

        function Qe() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, r, n, i, o, a = [],
                s = [],
                u = [],
                c = [];
            for (t = 0; t < 7; t++) r = d([2e3, 1]).day(t), n = this.weekdaysMin(r, ""), i = this.weekdaysShort(r, ""), o = this.weekdays(r, ""), a.push(n), s.push(i), u.push(o), c.push(n), c.push(i), c.push(o);
            for (a.sort(e), s.sort(e), u.sort(e), c.sort(e), t = 0; t < 7; t++) s[t] = le(s[t]), u[t] = le(u[t]), c[t] = le(c[t]);
            this._weekdaysRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
        }

        function Je() {
            return this.hours() % 12 || 12
        }

        function $e(e, t) {
            F(e, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), t)
            })
        }

        function et(e, t) {
            return t._meridiemParse
        }
        F("H", ["HH", 2], 0, "hour"), F("h", ["hh", 2], 0, Je), F("k", ["kk", 2], 0, function() {
            return this.hours() || 24
        }), F("hmm", 0, 0, function() {
            return "" + Je.apply(this) + L(this.minutes(), 2)
        }), F("hmmss", 0, 0, function() {
            return "" + Je.apply(this) + L(this.minutes(), 2) + L(this.seconds(), 2)
        }), F("Hmm", 0, 0, function() {
            return "" + this.hours() + L(this.minutes(), 2)
        }), F("Hmmss", 0, 0, function() {
            return "" + this.hours() + L(this.minutes(), 2) + L(this.seconds(), 2)
        }), $e("a", !0), $e("A", !1), P("hour", "h"), B("hour", 13), ue("a", et), ue("A", et), ue("H", Z), ue("h", Z), ue("k", Z), ue("HH", Z, W), ue("hh", Z, W), ue("kk", Z, W), ue("hmm", Q), ue("hmmss", J), ue("Hmm", Q), ue("Hmmss", J), pe(["H", "HH"], ye), pe(["k", "kk"], function(e, t, r) {
            var n = k(e);
            t[ye] = 24 === n ? 0 : n
        }), pe(["a", "A"], function(e, t, r) {
            r._isPm = r._locale.isPM(e), r._meridiem = e
        }), pe(["h", "hh"], function(e, t, r) {
            t[ye] = k(e), p(r).bigHour = !0
        }), pe("hmm", function(e, t, r) {
            var n = e.length - 2;
            t[ye] = k(e.substr(0, n)), t[ve] = k(e.substr(n)), p(r).bigHour = !0
        }), pe("hmmss", function(e, t, r) {
            var n = e.length - 4,
                i = e.length - 2;
            t[ye] = k(e.substr(0, n)), t[ve] = k(e.substr(n, 2)), t[be] = k(e.substr(i)), p(r).bigHour = !0
        }), pe("Hmm", function(e, t, r) {
            var n = e.length - 2;
            t[ye] = k(e.substr(0, n)), t[ve] = k(e.substr(n))
        }), pe("Hmmss", function(e, t, r) {
            var n = e.length - 4,
                i = e.length - 2;
            t[ye] = k(e.substr(0, n)), t[ve] = k(e.substr(n, 2)), t[be] = k(e.substr(i))
        });
        var tt, rt = Te("Hours", !0),
            nt = {
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
                months: Pe,
                monthsShort: Ae,
                week: {
                    dow: 0,
                    doy: 6
                },
                weekdays: Ke,
                weekdaysMin: Ye,
                weekdaysShort: We,
                meridiemParse: /[ap]\.?m?\.?/i
            },
            it = {},
            ot = {};

        function at(e) {
            return e ? e.toLowerCase().replace("_", "-") : e
        }

        function st(e) {
            var t = null;
            if (!it[e] && "undefined" != typeof module && module && module.exports) try {
                t = tt._abbr, require("./locale/" + e), ut(t)
            } catch (e) {}
            return it[e]
        }

        function ut(e, t) {
            var r;
            return e && ((r = o(t) ? lt(e) : ct(e, t)) ? tt = r : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), tt._abbr
        }

        function ct(e, t) {
            if (null === t) return delete it[e], null;
            var r, n = nt;
            if (t.abbr = e, null != it[e]) T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = it[e]._config;
            else if (null != t.parentLocale)
                if (null != it[t.parentLocale]) n = it[t.parentLocale]._config;
                else {
                    if (null == (r = st(t.parentLocale))) return ot[t.parentLocale] || (ot[t.parentLocale] = []), ot[t.parentLocale].push({
                        name: e,
                        config: t
                    }), null;
                    n = r._config
                } return it[e] = new I(N(n, t)), ot[e] && ot[e].forEach(function(e) {
                ct(e.name, e.config)
            }), ut(e), it[e]
        }

        function lt(e) {
            var t;
            if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return tt;
            if (!n(e)) {
                if (t = st(e)) return t;
                e = [e]
            }
            return function(e) {
                for (var t, r, n, i, o = 0; o < e.length;) {
                    for (t = (i = at(e[o]).split("-")).length, r = (r = at(e[o + 1])) ? r.split("-") : null; 0 < t;) {
                        if (n = st(i.slice(0, t).join("-"))) return n;
                        if (r && r.length >= t && C(i, r, !0) >= t - 1) break;
                        t--
                    }
                    o++
                }
                return tt
            }(e)
        }

        function dt(e) {
            var t, r = e._a;
            return r && -2 === p(e).overflow && (t = r[fe] < 0 || 11 < r[fe] ? fe : r[ge] < 1 || r[ge] > Ie(r[me], r[fe]) ? ge : r[ye] < 0 || 24 < r[ye] || 24 === r[ye] && (0 !== r[ve] || 0 !== r[be] || 0 !== r[Se]) ? ye : r[ve] < 0 || 59 < r[ve] ? ve : r[be] < 0 || 59 < r[be] ? be : r[Se] < 0 || 999 < r[Se] ? Se : -1, p(e)._overflowDayOfYear && (t < me || ge < t) && (t = ge), p(e)._overflowWeeks && -1 === t && (t = ke), p(e)._overflowWeekday && -1 === t && (t = Ce), p(e).overflow = t), e
        }

        function pt(e, t, r) {
            return null != e ? e : null != t ? t : r
        }

        function ht(e) {
            var t, n, i, o, a, s = [];
            if (!e._d) {
                var u, c;
                for (u = e, c = new Date(r.now()), i = u._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()], e._w && null == e._a[ge] && null == e._a[fe] && function(e) {
                        var t, r, n, i, o, a, s, u;
                        if (null != (t = e._w).GG || null != t.W || null != t.E) o = 1, a = 4, r = pt(t.GG, e._a[me], Fe(Tt(), 1, 4).year), n = pt(t.W, 1), ((i = pt(t.E, 1)) < 1 || 7 < i) && (u = !0);
                        else {
                            o = e._locale._week.dow, a = e._locale._week.doy;
                            var c = Fe(Tt(), o, a);
                            r = pt(t.gg, e._a[me], c.year), n = pt(t.w, c.week), null != t.d ? ((i = t.d) < 0 || 6 < i) && (u = !0) : null != t.e ? (i = t.e + o, (t.e < 0 || 6 < t.e) && (u = !0)) : i = o
                        }
                        n < 1 || n > Ve(r, o, a) ? p(e)._overflowWeeks = !0 : null != u ? p(e)._overflowWeekday = !0 : (s = je(r, n, i, o, a), e._a[me] = s.year, e._dayOfYear = s.dayOfYear)
                    }(e), null != e._dayOfYear && (a = pt(e._a[me], i[me]), (e._dayOfYear > _e(a) || 0 === e._dayOfYear) && (p(e)._overflowDayOfYear = !0), n = Oe(a, 0, e._dayOfYear), e._a[fe] = n.getUTCMonth(), e._a[ge] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = s[t] = i[t];
                for (; t < 7; t++) e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                24 === e._a[ye] && 0 === e._a[ve] && 0 === e._a[be] && 0 === e._a[Se] && (e._nextDay = !0, e._a[ye] = 0), e._d = (e._useUTC ? Oe : function(e, t, r, n, i, o, a) {
                    var s;
                    return e < 100 && 0 <= e ? (s = new Date(e + 400, t, r, n, i, o, a), isFinite(s.getFullYear()) && s.setFullYear(e)) : s = new Date(e, t, r, n, i, o, a), s
                }).apply(null, s), o = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[ye] = 24), e._w && void 0 !== e._w.d && e._w.d !== o && (p(e).weekdayMismatch = !0)
            }
        }
        var mt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            ft = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            gt = /Z|[+-]\d\d(?::?\d\d)?/,
            yt = [
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
            vt = [
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
            bt = /^\/?Date\((\-?\d+)/i;

        function St(e) {
            var t, r, n, i, o, a, s = e._i,
                u = mt.exec(s) || ft.exec(s);
            if (u) {
                for (p(e).iso = !0, t = 0, r = yt.length; t < r; t++)
                    if (yt[t][1].exec(u[1])) {
                        i = yt[t][0], n = !1 !== yt[t][2];
                        break
                    } if (null == i) return void(e._isValid = !1);
                if (u[3]) {
                    for (t = 0, r = vt.length; t < r; t++)
                        if (vt[t][1].exec(u[3])) {
                            o = (u[2] || " ") + vt[t][0];
                            break
                        } if (null == o) return void(e._isValid = !1)
                }
                if (!n && null != o) return void(e._isValid = !1);
                if (u[4]) {
                    if (!gt.exec(u[4])) return void(e._isValid = !1);
                    a = "Z"
                }
                e._f = i + (o || "") + (a || ""), wt(e)
            } else e._isValid = !1
        }
        var kt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
        var Ct = {
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

        function _t(e) {
            var t, r, n, i = kt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
            if (i) {
                var o = function(e, t, r, n, i, o) {
                    var a = [function(e) {
                        var t = parseInt(e, 10);
                        return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
                    }(e), Ae.indexOf(t), parseInt(r, 10), parseInt(n, 10), parseInt(i, 10)];
                    return o && a.push(parseInt(o, 10)), a
                }(i[4], i[3], i[2], i[5], i[6], i[7]);
                if (r = o, n = e, (t = i[1]) && We.indexOf(t) !== new Date(r[0], r[1], r[2]).getDay() && (p(n).weekdayMismatch = !0, !(n._isValid = !1))) return;
                e._a = o, e._tzm = function(e, t, r) {
                    if (e) return Ct[e];
                    if (t) return 0;
                    var n = parseInt(r, 10),
                        i = n % 100;
                    return (n - i) / 100 * 60 + i
                }(i[8], i[9], i[10]), e._d = Oe.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), p(e).rfc2822 = !0
            } else e._isValid = !1
        }

        function wt(e) {
            if (e._f !== r.ISO_8601)
                if (e._f !== r.RFC_2822) {
                    e._a = [], p(e).empty = !0;
                    var t, n, i, o, a, s, u, l, d = "" + e._i,
                        h = d.length,
                        m = 0;
                    for (i = H(e._f, e._locale).match(U) || [], t = 0; t < i.length; t++) o = i[t], (n = (d.match(ce(o, e)) || [])[0]) && (0 < (a = d.substr(0, d.indexOf(n))).length && p(e).unusedInput.push(a), d = d.slice(d.indexOf(n) + n.length), m += n.length), j[o] ? (n ? p(e).empty = !1 : p(e).unusedTokens.push(o), s = o, l = e, null != (u = n) && c(de, s) && de[s](u, l._a, l, s)) : e._strict && !n && p(e).unusedTokens.push(o);
                    p(e).charsLeftOver = h - m, 0 < d.length && p(e).unusedInput.push(d), e._a[ye] <= 12 && !0 === p(e).bigHour && 0 < e._a[ye] && (p(e).bigHour = void 0), p(e).parsedDateParts = e._a.slice(0), p(e).meridiem = e._meridiem, e._a[ye] = function(e, t, r) {
                        var n;
                        return null == r ? t : null != e.meridiemHour ? e.meridiemHour(t, r) : (null != e.isPM && ((n = e.isPM(r)) && t < 12 && (t += 12), n || 12 !== t || (t = 0)), t)
                    }(e._locale, e._a[ye], e._meridiem), ht(e), dt(e)
                } else _t(e);
            else St(e)
        }

        function Et(e) {
            var t, c, d, f, y = e._i,
                S = e._f;
            return e._locale = e._locale || lt(e._l), null === y || void 0 === S && "" === y ? m({
                nullInput: !0
            }) : ("string" == typeof y && (e._i = y = e._locale.preparse(y)), b(y) ? new v(dt(y)) : (s(y) ? e._d = y : n(S) ? function(e) {
                var t, r, n, i, o;
                if (0 === e._f.length) return p(e).invalidFormat = !0, e._d = new Date(NaN);
                for (i = 0; i < e._f.length; i++) o = 0, t = g({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[i], wt(t), h(t) && (o += p(t).charsLeftOver, o += 10 * p(t).unusedTokens.length, p(t).score = o, (null == n || o < n) && (n = o, r = t));
                l(e, r || t)
            }(e) : S ? wt(e) : o(c = (t = e)._i) ? t._d = new Date(r.now()) : s(c) ? t._d = new Date(c.valueOf()) : "string" == typeof c ? (d = t, null === (f = bt.exec(d._i)) ? (St(d), !1 === d._isValid && (delete d._isValid, _t(d), !1 === d._isValid && (delete d._isValid, r.createFromInputFallback(d)))) : d._d = new Date(+f[1])) : n(c) ? (t._a = u(c.slice(0), function(e) {
                return parseInt(e, 10)
            }), ht(t)) : i(c) ? function(e) {
                if (!e._d) {
                    var t = q(e._i);
                    e._a = u([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                        return e && parseInt(e, 10)
                    }), ht(e)
                }
            }(t) : a(c) ? t._d = new Date(c) : r.createFromInputFallback(t), h(e) || (e._d = null), e))
        }

        function xt(e, t, r, o, a) {
            var s, u = {};
            return !0 !== r && !1 !== r || (o = r, r = void 0), (i(e) && function(e) {
                if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
                var t;
                for (t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return !0
            }(e) || n(e) && 0 === e.length) && (e = void 0), u._isAMomentObject = !0, u._useUTC = u._isUTC = a, u._l = r, u._i = e, u._f = t, u._strict = o, (s = new v(dt(Et(u))))._nextDay && (s.add(1, "d"), s._nextDay = void 0), s
        }

        function Tt(e, t, r, n) {
            return xt(e, t, r, n, !1)
        }
        r.createFromInputFallback = w("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
            e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
        }), r.ISO_8601 = function() {}, r.RFC_2822 = function() {};
        var Rt = w("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var e = Tt.apply(null, arguments);
                return this.isValid() && e.isValid() ? e < this ? this : e : m()
            }),
            Nt = w("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var e = Tt.apply(null, arguments);
                return this.isValid() && e.isValid() ? this < e ? this : e : m()
            });

        function It(e, t) {
            var r, i;
            if (1 === t.length && n(t[0]) && (t = t[0]), !t.length) return Tt();
            for (r = t[0], i = 1; i < t.length; ++i) t[i].isValid() && !t[i][e](r) || (r = t[i]);
            return r
        }
        var Mt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

        function Pt(e) {
            var t = q(e),
                r = t.year || 0,
                n = t.quarter || 0,
                i = t.month || 0,
                o = t.week || t.isoWeek || 0,
                a = t.day || 0,
                s = t.hour || 0,
                u = t.minute || 0,
                c = t.second || 0,
                l = t.millisecond || 0;
            this._isValid = function(e) {
                for (var t in e)
                    if (-1 === Ee.call(Mt, t) || null != e[t] && isNaN(e[t])) return !1;
                for (var r = !1, n = 0; n < Mt.length; ++n)
                    if (e[Mt[n]]) {
                        if (r) return !1;
                        parseFloat(e[Mt[n]]) !== k(e[Mt[n]]) && (r = !0)
                    } return !0
            }(t), this._milliseconds = +l + 1e3 * c + 6e4 * u + 1e3 * s * 60 * 60, this._days = +a + 7 * o, this._months = +i + 3 * n + 12 * r, this._data = {}, this._locale = lt(), this._bubble()
        }

        function At(e) {
            return e instanceof Pt
        }

        function qt(e) {
            return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
        }

        function Dt(e, t) {
            F(e, 0, 0, function() {
                var e = this.utcOffset(),
                    r = "+";
                return e < 0 && (e = -e, r = "-"), r + L(~~(e / 60), 2) + t + L(~~e % 60, 2)
            })
        }
        Dt("Z", ":"), Dt("ZZ", ""), ue("Z", oe), ue("ZZ", oe), pe(["Z", "ZZ"], function(e, t, r) {
            r._useUTC = !0, r._tzm = Lt(oe, e)
        });
        var Bt = /([\+\-]|\d\d)/gi;

        function Lt(e, t) {
            var r = (t || "").match(e);
            if (null === r) return null;
            var n = ((r[r.length - 1] || []) + "").match(Bt) || ["-", 0, 0],
                i = 60 * n[1] + k(n[2]);
            return 0 === i ? 0 : "+" === n[0] ? i : -i
        }

        function Ut(e, t) {
            var n, i;
            return t._isUTC ? (n = t.clone(), i = (b(e) || s(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + i), r.updateOffset(n, !1), n) : Tt(e).local()
        }

        function Ot(e) {
            return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
        }

        function zt() {
            return !!this.isValid() && this._isUTC && 0 === this._offset
        }
        r.updateOffset = function() {};
        var jt = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
            Ft = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

        function Vt(e, t) {
            var r, n, i, o = e,
                s = null;
            return At(e) ? o = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            } : a(e) ? (o = {}, t ? o[t] = e : o.milliseconds = e) : (s = jt.exec(e)) ? (r = "-" === s[1] ? -1 : 1, o = {
                y: 0,
                d: k(s[ge]) * r,
                h: k(s[ye]) * r,
                m: k(s[ve]) * r,
                s: k(s[be]) * r,
                ms: k(qt(1e3 * s[Se])) * r
            }) : (s = Ft.exec(e)) ? (r = "-" === s[1] ? -1 : 1, o = {
                y: Ht(s[2], r),
                M: Ht(s[3], r),
                w: Ht(s[4], r),
                d: Ht(s[5], r),
                h: Ht(s[6], r),
                m: Ht(s[7], r),
                s: Ht(s[8], r)
            }) : null == o ? o = {} : "object" == typeof o && ("from" in o || "to" in o) && (i = function(e, t) {
                var r;
                return e.isValid() && t.isValid() ? (t = Ut(t, e), e.isBefore(t) ? r = Kt(e, t) : ((r = Kt(t, e)).milliseconds = -r.milliseconds, r.months = -r.months), r) : {
                    milliseconds: 0,
                    months: 0
                }
            }(Tt(o.from), Tt(o.to)), (o = {}).ms = i.milliseconds, o.M = i.months), n = new Pt(o), At(e) && c(e, "_locale") && (n._locale = e._locale), n
        }

        function Ht(e, t) {
            var r = e && parseFloat(e.replace(",", "."));
            return (isNaN(r) ? 0 : r) * t
        }

        function Kt(e, t) {
            var r = {};
            return r.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(r.months, "M").isAfter(t) && --r.months, r.milliseconds = +t - +e.clone().add(r.months, "M"), r
        }

        function Wt(e, t) {
            return function(r, n) {
                var i;
                return null === n || isNaN(+n) || (T(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), i = r, r = n, n = i), Yt(this, Vt(r = "string" == typeof r ? +r : r, n), e), this
            }
        }

        function Yt(e, t, n, i) {
            var o = t._milliseconds,
                a = qt(t._days),
                s = qt(t._months);
            e.isValid() && (i = null == i || i, s && qe(e, Re(e, "Month") + s * n), a && Ne(e, "Date", Re(e, "Date") + a * n), o && e._d.setTime(e._d.valueOf() + o * n), i && r.updateOffset(e, a || s))
        }
        Vt.fn = Pt.prototype, Vt.invalid = function() {
            return Vt(NaN)
        };
        var Gt = Wt(1, "add"),
            Xt = Wt(-1, "subtract");

        function Zt(e, t) {
            var r = 12 * (t.year() - e.year()) + (t.month() - e.month()),
                n = e.clone().add(r, "months");
            return -(r + (t - n < 0 ? (t - n) / (n - e.clone().add(r - 1, "months")) : (t - n) / (e.clone().add(r + 1, "months") - n))) || 0
        }

        function Qt(e) {
            var t;
            return void 0 === e ? this._locale._abbr : (null != (t = lt(e)) && (this._locale = t), this)
        }
        r.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", r.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Jt = w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
            return void 0 === e ? this.localeData() : this.locale(e)
        });

        function $t() {
            return this._locale
        }
        var er = 126227808e5;

        function tr(e, t) {
            return (e % t + t) % t
        }

        function rr(e, t, r) {
            return e < 100 && 0 <= e ? new Date(e + 400, t, r) - er : new Date(e, t, r).valueOf()
        }

        function nr(e, t, r) {
            return e < 100 && 0 <= e ? Date.UTC(e + 400, t, r) - er : Date.UTC(e, t, r)
        }

        function ir(e, t) {
            F(0, [e, e.length], 0, t)
        }

        function or(e, t, r, n, i) {
            var o;
            return null == e ? Fe(this, n, i).year : ((o = Ve(e, n, i)) < t && (t = o), function(e, t, r, n, i) {
                var o = je(e, t, r, n, i),
                    a = Oe(o.year, 0, o.dayOfYear);
                return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
            }.call(this, e, t, r, n, i))
        }
        F(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }), F(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        }), ir("gggg", "weekYear"), ir("ggggg", "weekYear"), ir("GGGG", "isoWeekYear"), ir("GGGGG", "isoWeekYear"), P("weekYear", "gg"), P("isoWeekYear", "GG"), B("weekYear", 1), B("isoWeekYear", 1), ue("G", ne), ue("g", ne), ue("GG", Z, W), ue("gg", Z, W), ue("GGGG", ee, G), ue("gggg", ee, G), ue("GGGGG", te, X), ue("ggggg", te, X), he(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, r, n) {
            t[n.substr(0, 2)] = k(e)
        }), he(["gg", "GG"], function(e, t, n, i) {
            t[i] = r.parseTwoDigitYear(e)
        }), F("Q", 0, "Qo", "quarter"), P("quarter", "Q"), B("quarter", 7), ue("Q", K), pe("Q", function(e, t) {
            t[fe] = 3 * (k(e) - 1)
        }), F("D", ["DD", 2], "Do", "date"), P("date", "D"), B("date", 9), ue("D", Z), ue("DD", Z, W), ue("Do", function(e, t) {
            return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
        }), pe(["D", "DD"], ge), pe("Do", function(e, t) {
            t[ge] = k(e.match(Z)[0])
        });
        var ar = Te("Date", !0);
        F("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), P("dayOfYear", "DDD"), B("dayOfYear", 4), ue("DDD", $), ue("DDDD", Y), pe(["DDD", "DDDD"], function(e, t, r) {
            r._dayOfYear = k(e)
        }), F("m", ["mm", 2], 0, "minute"), P("minute", "m"), B("minute", 14), ue("m", Z), ue("mm", Z, W), pe(["m", "mm"], ve);
        var sr = Te("Minutes", !1);
        F("s", ["ss", 2], 0, "second"), P("second", "s"), B("second", 15), ue("s", Z), ue("ss", Z, W), pe(["s", "ss"], be);
        var ur, cr = Te("Seconds", !1);
        for (F("S", 0, 0, function() {
                return ~~(this.millisecond() / 100)
            }), F(0, ["SS", 2], 0, function() {
                return ~~(this.millisecond() / 10)
            }), F(0, ["SSS", 3], 0, "millisecond"), F(0, ["SSSS", 4], 0, function() {
                return 10 * this.millisecond()
            }), F(0, ["SSSSS", 5], 0, function() {
                return 100 * this.millisecond()
            }), F(0, ["SSSSSS", 6], 0, function() {
                return 1e3 * this.millisecond()
            }), F(0, ["SSSSSSS", 7], 0, function() {
                return 1e4 * this.millisecond()
            }), F(0, ["SSSSSSSS", 8], 0, function() {
                return 1e5 * this.millisecond()
            }), F(0, ["SSSSSSSSS", 9], 0, function() {
                return 1e6 * this.millisecond()
            }), P("millisecond", "ms"), B("millisecond", 16), ue("S", $, K), ue("SS", $, W), ue("SSS", $, Y), ur = "SSSS"; ur.length <= 9; ur += "S") ue(ur, re);

        function lr(e, t) {
            t[Se] = k(1e3 * ("0." + e))
        }
        for (ur = "S"; ur.length <= 9; ur += "S") pe(ur, lr);
        var dr = Te("Milliseconds", !1);
        F("z", 0, 0, "zoneAbbr"), F("zz", 0, 0, "zoneName");
        var pr = v.prototype;

        function hr(e) {
            return e
        }
        pr.add = Gt, pr.calendar = function(e, t) {
            var n = e || Tt(),
                i = Ut(n, this).startOf("day"),
                o = r.calendarFormat(this, i) || "sameElse",
                a = t && (R(t[o]) ? t[o].call(this, n) : t[o]);
            return this.format(a || this.localeData().calendar(o, this, Tt(n)))
        }, pr.clone = function() {
            return new v(this)
        }, pr.diff = function(e, t, r) {
            var n, i, o;
            if (!this.isValid()) return NaN;
            if (!(n = Ut(e, this)).isValid()) return NaN;
            switch (i = 6e4 * (n.utcOffset() - this.utcOffset()), t = A(t)) {
                case "year":
                    o = Zt(this, n) / 12;
                    break;
                case "month":
                    o = Zt(this, n);
                    break;
                case "quarter":
                    o = Zt(this, n) / 3;
                    break;
                case "second":
                    o = (this - n) / 1e3;
                    break;
                case "minute":
                    o = (this - n) / 6e4;
                    break;
                case "hour":
                    o = (this - n) / 36e5;
                    break;
                case "day":
                    o = (this - n - i) / 864e5;
                    break;
                case "week":
                    o = (this - n - i) / 6048e5;
                    break;
                default:
                    o = this - n
            }
            return r ? o : S(o)
        }, pr.endOf = function(e) {
            var t;
            if (void 0 === (e = A(e)) || "millisecond" === e || !this.isValid()) return this;
            var n = this._isUTC ? nr : rr;
            switch (e) {
                case "year":
                    t = n(this.year() + 1, 0, 1) - 1;
                    break;
                case "quarter":
                    t = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                    break;
                case "month":
                    t = n(this.year(), this.month() + 1, 1) - 1;
                    break;
                case "week":
                    t = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                    break;
                case "isoWeek":
                    t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                    break;
                case "day":
                case "date":
                    t = n(this.year(), this.month(), this.date() + 1) - 1;
                    break;
                case "hour":
                    t = this._d.valueOf(), t += 36e5 - tr(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
                    break;
                case "minute":
                    t = this._d.valueOf(), t += 6e4 - tr(t, 6e4) - 1;
                    break;
                case "second":
                    t = this._d.valueOf(), t += 1e3 - tr(t, 1e3) - 1
            }
            return this._d.setTime(t), r.updateOffset(this, !0), this
        }, pr.format = function(e) {
            e || (e = this.isUtc() ? r.defaultFormatUtc : r.defaultFormat);
            var t = V(this, e);
            return this.localeData().postformat(t)
        }, pr.from = function(e, t) {
            return this.isValid() && (b(e) && e.isValid() || Tt(e).isValid()) ? Vt({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }, pr.fromNow = function(e) {
            return this.from(Tt(), e)
        }, pr.to = function(e, t) {
            return this.isValid() && (b(e) && e.isValid() || Tt(e).isValid()) ? Vt({
                from: this,
                to: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }, pr.toNow = function(e) {
            return this.to(Tt(), e)
        }, pr.get = function(e) {
            return R(this[e = A(e)]) ? this[e]() : this
        }, pr.invalidAt = function() {
            return p(this).overflow
        }, pr.isAfter = function(e, t) {
            var r = b(e) ? e : Tt(e);
            return !(!this.isValid() || !r.isValid()) && ("millisecond" === (t = A(t) || "millisecond") ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf())
        }, pr.isBefore = function(e, t) {
            var r = b(e) ? e : Tt(e);
            return !(!this.isValid() || !r.isValid()) && ("millisecond" === (t = A(t) || "millisecond") ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf())
        }, pr.isBetween = function(e, t, r, n) {
            var i = b(e) ? e : Tt(e),
                o = b(t) ? t : Tt(t);
            return !!(this.isValid() && i.isValid() && o.isValid()) && ("(" === (n = n || "()")[0] ? this.isAfter(i, r) : !this.isBefore(i, r)) && (")" === n[1] ? this.isBefore(o, r) : !this.isAfter(o, r))
        }, pr.isSame = function(e, t) {
            var r, n = b(e) ? e : Tt(e);
            return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = A(t) || "millisecond") ? this.valueOf() === n.valueOf() : (r = n.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf()))
        }, pr.isSameOrAfter = function(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t)
        }, pr.isSameOrBefore = function(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t)
        }, pr.isValid = function() {
            return h(this)
        }, pr.lang = Jt, pr.locale = Qt, pr.localeData = $t, pr.max = Nt, pr.min = Rt, pr.parsingFlags = function() {
            return l({}, p(this))
        }, pr.set = function(e, t) {
            if ("object" == typeof e)
                for (var r = function(e) {
                        var t = [];
                        for (var r in e) t.push({
                            unit: r,
                            priority: D[r]
                        });
                        return t.sort(function(e, t) {
                            return e.priority - t.priority
                        }), t
                    }(e = q(e)), n = 0; n < r.length; n++) this[r[n].unit](e[r[n].unit]);
            else if (R(this[e = A(e)])) return this[e](t);
            return this
        }, pr.startOf = function(e) {
            var t;
            if (void 0 === (e = A(e)) || "millisecond" === e || !this.isValid()) return this;
            var n = this._isUTC ? nr : rr;
            switch (e) {
                case "year":
                    t = n(this.year(), 0, 1);
                    break;
                case "quarter":
                    t = n(this.year(), this.month() - this.month() % 3, 1);
                    break;
                case "month":
                    t = n(this.year(), this.month(), 1);
                    break;
                case "week":
                    t = n(this.year(), this.month(), this.date() - this.weekday());
                    break;
                case "isoWeek":
                    t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                    break;
                case "day":
                case "date":
                    t = n(this.year(), this.month(), this.date());
                    break;
                case "hour":
                    t = this._d.valueOf(), t -= tr(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
                    break;
                case "minute":
                    t = this._d.valueOf(), t -= tr(t, 6e4);
                    break;
                case "second":
                    t = this._d.valueOf(), t -= tr(t, 1e3)
            }
            return this._d.setTime(t), r.updateOffset(this, !0), this
        }, pr.subtract = Xt, pr.toArray = function() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
        }, pr.toObject = function() {
            var e = this;
            return {
                years: e.year(),
                months: e.month(),
                date: e.date(),
                hours: e.hours(),
                minutes: e.minutes(),
                seconds: e.seconds(),
                milliseconds: e.milliseconds()
            }
        }, pr.toDate = function() {
            return new Date(this.valueOf())
        }, pr.toISOString = function(e) {
            if (!this.isValid()) return null;
            var t = !0 !== e,
                r = t ? this.clone().utc() : this;
            return r.year() < 0 || 9999 < r.year() ? V(r, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : R(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", V(r, "Z")) : V(r, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
        }, pr.inspect = function() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var e = "moment",
                t = "";
            this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
            var r = "[" + e + '("]',
                n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                i = t + '[")]';
            return this.format(r + n + "-MM-DD[T]HH:mm:ss.SSS" + i)
        }, pr.toJSON = function() {
            return this.isValid() ? this.toISOString() : null
        }, pr.toString = function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }, pr.unix = function() {
            return Math.floor(this.valueOf() / 1e3)
        }, pr.valueOf = function() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }, pr.creationData = function() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }, pr.year = xe, pr.isLeapYear = function() {
            return we(this.year())
        }, pr.weekYear = function(e) {
            return or.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
        }, pr.isoWeekYear = function(e) {
            return or.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
        }, pr.quarter = pr.quarters = function(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
        }, pr.month = De, pr.daysInMonth = function() {
            return Ie(this.year(), this.month())
        }, pr.week = pr.weeks = function(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d")
        }, pr.isoWeek = pr.isoWeeks = function(e) {
            var t = Fe(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d")
        }, pr.weeksInYear = function() {
            var e = this.localeData()._week;
            return Ve(this.year(), e.dow, e.doy)
        }, pr.isoWeeksInYear = function() {
            return Ve(this.year(), 1, 4)
        }, pr.date = ar, pr.day = pr.days = function(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t, r, n = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (t = e, r = this.localeData(), e = "string" != typeof t ? t : isNaN(t) ? "number" == typeof(t = r.weekdaysParse(t)) ? t : null : parseInt(t, 10), this.add(e - n, "d")) : n
        }, pr.weekday = function(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d")
        }, pr.isoWeekday = function(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            if (null == e) return this.day() || 7;
            var t, r, n = (t = e, r = this.localeData(), "string" == typeof t ? r.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t);
            return this.day(this.day() % 7 ? n : n - 7)
        }, pr.dayOfYear = function(e) {
            var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add(e - t, "d")
        }, pr.hour = pr.hours = rt, pr.minute = pr.minutes = sr, pr.second = pr.seconds = cr, pr.millisecond = pr.milliseconds = dr, pr.utcOffset = function(e, t, n) {
            var i, o = this._offset || 0;
            if (!this.isValid()) return null != e ? this : NaN;
            if (null == e) return this._isUTC ? o : Ot(this);
            if ("string" == typeof e) {
                if (null === (e = Lt(oe, e))) return this
            } else Math.abs(e) < 16 && !n && (e *= 60);
            return !this._isUTC && t && (i = Ot(this)), this._offset = e, this._isUTC = !0, null != i && this.add(i, "m"), o !== e && (!t || this._changeInProgress ? Yt(this, Vt(e - o, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, r.updateOffset(this, !0), this._changeInProgress = null)), this
        }, pr.utc = function(e) {
            return this.utcOffset(0, e)
        }, pr.local = function(e) {
            return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ot(this), "m")), this
        }, pr.parseZone = function() {
            if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
            else if ("string" == typeof this._i) {
                var e = Lt(ie, this._i);
                null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
            }
            return this
        }, pr.hasAlignedHourOffset = function(e) {
            return !!this.isValid() && (e = e ? Tt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
        }, pr.isDST = function() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }, pr.isLocal = function() {
            return !!this.isValid() && !this._isUTC
        }, pr.isUtcOffset = function() {
            return !!this.isValid() && this._isUTC
        }, pr.isUtc = zt, pr.isUTC = zt, pr.zoneAbbr = function() {
            return this._isUTC ? "UTC" : ""
        }, pr.zoneName = function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }, pr.dates = w("dates accessor is deprecated. Use date instead.", ar), pr.months = w("months accessor is deprecated. Use month instead", De), pr.years = w("years accessor is deprecated. Use year instead", xe), pr.zone = w("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
            return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
        }), pr.isDSTShifted = w("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
            if (!o(this._isDSTShifted)) return this._isDSTShifted;
            var e = {};
            if (g(e, this), (e = Et(e))._a) {
                var t = e._isUTC ? d(e._a) : Tt(e._a);
                this._isDSTShifted = this.isValid() && 0 < C(e._a, t.toArray())
            } else this._isDSTShifted = !1;
            return this._isDSTShifted
        });
        var mr = I.prototype;

        function fr(e, t, r, n) {
            var i = lt(),
                o = d().set(n, t);
            return i[r](o, e)
        }

        function gr(e, t, r) {
            if (a(e) && (t = e, e = void 0), e = e || "", null != t) return fr(e, t, r, "month");
            var n, i = [];
            for (n = 0; n < 12; n++) i[n] = fr(e, n, r, "month");
            return i
        }

        function yr(e, t, r, n) {
            "boolean" == typeof e ? a(t) && (r = t, t = void 0) : (t = e, e = !1, a(r = t) && (r = t, t = void 0)), t = t || "";
            var i, o = lt(),
                s = e ? o._week.dow : 0;
            if (null != r) return fr(t, (r + s) % 7, n, "day");
            var u = [];
            for (i = 0; i < 7; i++) u[i] = fr(t, (i + s) % 7, n, "day");
            return u
        }
        mr.calendar = function(e, t, r) {
            var n = this._calendar[e] || this._calendar.sameElse;
            return R(n) ? n.call(t, r) : n
        }, mr.longDateFormat = function(e) {
            var t = this._longDateFormat[e],
                r = this._longDateFormat[e.toUpperCase()];
            return t || !r ? t : (this._longDateFormat[e] = r.replace(/MMMM|MM|DD|dddd/g, function(e) {
                return e.slice(1)
            }), this._longDateFormat[e])
        }, mr.invalidDate = function() {
            return this._invalidDate
        }, mr.ordinal = function(e) {
            return this._ordinal.replace("%d", e)
        }, mr.preparse = hr, mr.postformat = hr, mr.relativeTime = function(e, t, r, n) {
            var i = this._relativeTime[r];
            return R(i) ? i(e, t, r, n) : i.replace(/%d/i, e)
        }, mr.pastFuture = function(e, t) {
            var r = this._relativeTime[0 < e ? "future" : "past"];
            return R(r) ? r(t) : r.replace(/%s/i, t)
        }, mr.set = function(e) {
            var t, r;
            for (r in e) R(t = e[r]) ? this[r] = t : this["_" + r] = t;
            this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
        }, mr.months = function(e, t) {
            return e ? n(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Me).test(t) ? "format" : "standalone"][e.month()] : n(this._months) ? this._months : this._months.standalone
        }, mr.monthsShort = function(e, t) {
            return e ? n(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Me.test(t) ? "format" : "standalone"][e.month()] : n(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
        }, mr.monthsParse = function(e, t, r) {
            var n, i, o;
            if (this._monthsParseExact) return function(e, t, r) {
                var n, i, o, a = e.toLocaleLowerCase();
                if (!this._monthsParse)
                    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n) o = d([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(o, "").toLocaleLowerCase(), this._longMonthsParse[n] = this.months(o, "").toLocaleLowerCase();
                return r ? "MMM" === t ? -1 !== (i = Ee.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = Ee.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = Ee.call(this._shortMonthsParse, a)) ? i : -1 !== (i = Ee.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = Ee.call(this._longMonthsParse, a)) ? i : -1 !== (i = Ee.call(this._shortMonthsParse, a)) ? i : null
            }.call(this, e, t, r);
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
                if (i = d([2e3, n]), r && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), r || this._monthsParse[n] || (o = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[n] = new RegExp(o.replace(".", ""), "i")), r && "MMMM" === t && this._longMonthsParse[n].test(e)) return n;
                if (r && "MMM" === t && this._shortMonthsParse[n].test(e)) return n;
                if (!r && this._monthsParse[n].test(e)) return n
            }
        }, mr.monthsRegex = function(e) {
            return this._monthsParseExact ? (c(this, "_monthsRegex") || Ue.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (c(this, "_monthsRegex") || (this._monthsRegex = Le), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
        }, mr.monthsShortRegex = function(e) {
            return this._monthsParseExact ? (c(this, "_monthsRegex") || Ue.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (c(this, "_monthsShortRegex") || (this._monthsShortRegex = Be), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }, mr.week = function(e) {
            return Fe(e, this._week.dow, this._week.doy).week
        }, mr.firstDayOfYear = function() {
            return this._week.doy
        }, mr.firstDayOfWeek = function() {
            return this._week.dow
        }, mr.weekdays = function(e, t) {
            var r = n(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
            return !0 === e ? He(r, this._week.dow) : e ? r[e.day()] : r
        }, mr.weekdaysMin = function(e) {
            return !0 === e ? He(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
        }, mr.weekdaysShort = function(e) {
            return !0 === e ? He(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
        }, mr.weekdaysParse = function(e, t, r) {
            var n, i, o;
            if (this._weekdaysParseExact) return function(e, t, r) {
                var n, i, o, a = e.toLocaleLowerCase();
                if (!this._weekdaysParse)
                    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n) o = d([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(o, "").toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(o, "").toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(o, "").toLocaleLowerCase();
                return r ? "dddd" === t ? -1 !== (i = Ee.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ee.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = Ee.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = Ee.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ee.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ee.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ee.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ee.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ee.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = Ee.call(this._minWeekdaysParse, a)) ? i : -1 !== (i = Ee.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ee.call(this._shortWeekdaysParse, a)) ? i : null
            }.call(this, e, t, r);
            for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
                if (i = d([2e3, 1]).day(n), r && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(i, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[n] || (o = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[n] = new RegExp(o.replace(".", ""), "i")), r && "dddd" === t && this._fullWeekdaysParse[n].test(e)) return n;
                if (r && "ddd" === t && this._shortWeekdaysParse[n].test(e)) return n;
                if (r && "dd" === t && this._minWeekdaysParse[n].test(e)) return n;
                if (!r && this._weekdaysParse[n].test(e)) return n
            }
        }, mr.weekdaysRegex = function(e) {
            return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || Qe.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (c(this, "_weekdaysRegex") || (this._weekdaysRegex = Ge), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }, mr.weekdaysShortRegex = function(e) {
            return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || Qe.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (c(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Xe), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }, mr.weekdaysMinRegex = function(e) {
            return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || Qe.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (c(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ze), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }, mr.isPM = function(e) {
            return "p" === (e + "").toLowerCase().charAt(0)
        }, mr.meridiem = function(e, t, r) {
            return 11 < e ? r ? "pm" : "PM" : r ? "am" : "AM"
        }, ut("en", {
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(e) {
                var t = e % 10;
                return e + (1 === k(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
            }
        }), r.lang = w("moment.lang is deprecated. Use moment.locale instead.", ut), r.langData = w("moment.langData is deprecated. Use moment.localeData instead.", lt);
        var vr = Math.abs;

        function br(e, t, r, n) {
            var i = Vt(t, r);
            return e._milliseconds += n * i._milliseconds, e._days += n * i._days, e._months += n * i._months, e._bubble()
        }

        function Sr(e) {
            return e < 0 ? Math.floor(e) : Math.ceil(e)
        }

        function kr(e) {
            return 4800 * e / 146097
        }

        function Cr(e) {
            return 146097 * e / 4800
        }

        function _r(e) {
            return function() {
                return this.as(e)
            }
        }
        var wr = _r("ms"),
            Er = _r("s"),
            xr = _r("m"),
            Tr = _r("h"),
            Rr = _r("d"),
            Nr = _r("w"),
            Ir = _r("M"),
            Mr = _r("Q"),
            Pr = _r("y");

        function Ar(e) {
            return function() {
                return this.isValid() ? this._data[e] : NaN
            }
        }
        var qr = Ar("milliseconds"),
            Dr = Ar("seconds"),
            Br = Ar("minutes"),
            Lr = Ar("hours"),
            Ur = Ar("days"),
            Or = Ar("months"),
            zr = Ar("years"),
            jr = Math.round,
            Fr = {
                ss: 44,
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            Vr = Math.abs;

        function Hr(e) {
            return (0 < e) - (e < 0) || +e
        }

        function Kr() {
            if (!this.isValid()) return this.localeData().invalidDate();
            var e, t, r = Vr(this._milliseconds) / 1e3,
                n = Vr(this._days),
                i = Vr(this._months);
            t = S((e = S(r / 60)) / 60), r %= 60, e %= 60;
            var o = S(i / 12),
                a = i %= 12,
                s = n,
                u = t,
                c = e,
                l = r ? r.toFixed(3).replace(/\.?0+$/, "") : "",
                d = this.asSeconds();
            if (!d) return "P0D";
            var p = d < 0 ? "-" : "",
                h = Hr(this._months) !== Hr(d) ? "-" : "",
                m = Hr(this._days) !== Hr(d) ? "-" : "",
                f = Hr(this._milliseconds) !== Hr(d) ? "-" : "";
            return p + "P" + (o ? h + o + "Y" : "") + (a ? h + a + "M" : "") + (s ? m + s + "D" : "") + (u || c || l ? "T" : "") + (u ? f + u + "H" : "") + (c ? f + c + "M" : "") + (l ? f + l + "S" : "")
        }
        var Wr = Pt.prototype;
        return Wr.isValid = function() {
            return this._isValid
        }, Wr.abs = function() {
            var e = this._data;
            return this._milliseconds = vr(this._milliseconds), this._days = vr(this._days), this._months = vr(this._months), e.milliseconds = vr(e.milliseconds), e.seconds = vr(e.seconds), e.minutes = vr(e.minutes), e.hours = vr(e.hours), e.months = vr(e.months), e.years = vr(e.years), this
        }, Wr.add = function(e, t) {
            return br(this, e, t, 1)
        }, Wr.subtract = function(e, t) {
            return br(this, e, t, -1)
        }, Wr.as = function(e) {
            if (!this.isValid()) return NaN;
            var t, r, n = this._milliseconds;
            if ("month" === (e = A(e)) || "quarter" === e || "year" === e) switch (t = this._days + n / 864e5, r = this._months + kr(t), e) {
                case "month":
                    return r;
                case "quarter":
                    return r / 3;
                case "year":
                    return r / 12
            } else switch (t = this._days + Math.round(Cr(this._months)), e) {
                case "week":
                    return t / 7 + n / 6048e5;
                case "day":
                    return t + n / 864e5;
                case "hour":
                    return 24 * t + n / 36e5;
                case "minute":
                    return 1440 * t + n / 6e4;
                case "second":
                    return 86400 * t + n / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * t) + n;
                default:
                    throw new Error("Unknown unit " + e)
            }
        }, Wr.asMilliseconds = wr, Wr.asSeconds = Er, Wr.asMinutes = xr, Wr.asHours = Tr, Wr.asDays = Rr, Wr.asWeeks = Nr, Wr.asMonths = Ir, Wr.asQuarters = Mr, Wr.asYears = Pr, Wr.valueOf = function() {
            return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * k(this._months / 12) : NaN
        }, Wr._bubble = function() {
            var e, t, r, n, i, o = this._milliseconds,
                a = this._days,
                s = this._months,
                u = this._data;
            return 0 <= o && 0 <= a && 0 <= s || o <= 0 && a <= 0 && s <= 0 || (o += 864e5 * Sr(Cr(s) + a), s = a = 0), u.milliseconds = o % 1e3, e = S(o / 1e3), u.seconds = e % 60, t = S(e / 60), u.minutes = t % 60, r = S(t / 60), u.hours = r % 24, s += i = S(kr(a += S(r / 24))), a -= Sr(Cr(i)), n = S(s / 12), s %= 12, u.days = a, u.months = s, u.years = n, this
        }, Wr.clone = function() {
            return Vt(this)
        }, Wr.get = function(e) {
            return e = A(e), this.isValid() ? this[e + "s"]() : NaN
        }, Wr.milliseconds = qr, Wr.seconds = Dr, Wr.minutes = Br, Wr.hours = Lr, Wr.days = Ur, Wr.weeks = function() {
            return S(this.days() / 7)
        }, Wr.months = Or, Wr.years = zr, Wr.humanize = function(e) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var t, r, n, i, o, a, s, u, c, l, d = this.localeData(),
                p = (t = !e, r = d, n = Vt(this).abs(), i = jr(n.as("s")), o = jr(n.as("m")), a = jr(n.as("h")), s = jr(n.as("d")), u = jr(n.as("M")), c = jr(n.as("y")), (l = i <= Fr.ss && ["s", i] || i < Fr.s && ["ss", i] || o <= 1 && ["m"] || o < Fr.m && ["mm", o] || a <= 1 && ["h"] || a < Fr.h && ["hh", a] || s <= 1 && ["d"] || s < Fr.d && ["dd", s] || u <= 1 && ["M"] || u < Fr.M && ["MM", u] || c <= 1 && ["y"] || ["yy", c])[2] = t, l[3] = 0 < +this, l[4] = r, function(e, t, r, n, i) {
                    return i.relativeTime(t || 1, !!r, e, n)
                }.apply(null, l));
            return e && (p = d.pastFuture(+this, p)), d.postformat(p)
        }, Wr.toISOString = Kr, Wr.toString = Kr, Wr.toJSON = Kr, Wr.locale = Qt, Wr.localeData = $t, Wr.toIsoString = w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Kr), Wr.lang = Jt, F("X", 0, 0, "unix"), F("x", 0, 0, "valueOf"), ue("x", ne), ue("X", /[+-]?\d+(\.\d{1,3})?/), pe("X", function(e, t, r) {
            r._d = new Date(1e3 * parseFloat(e, 10))
        }), pe("x", function(e, t, r) {
            r._d = new Date(k(e))
        }), r.version = "2.24.0", e = Tt, r.fn = pr, r.min = function() {
            return It("isBefore", [].slice.call(arguments, 0))
        }, r.max = function() {
            return It("isAfter", [].slice.call(arguments, 0))
        }, r.now = function() {
            return Date.now ? Date.now() : +new Date
        }, r.utc = d, r.unix = function(e) {
            return Tt(1e3 * e)
        }, r.months = function(e, t) {
            return gr(e, t, "months")
        }, r.isDate = s, r.locale = ut, r.invalid = m, r.duration = Vt, r.isMoment = b, r.weekdays = function(e, t, r) {
            return yr(e, t, r, "weekdays")
        }, r.parseZone = function() {
            return Tt.apply(null, arguments).parseZone()
        }, r.localeData = lt, r.isDuration = At, r.monthsShort = function(e, t) {
            return gr(e, t, "monthsShort")
        }, r.weekdaysMin = function(e, t, r) {
            return yr(e, t, r, "weekdaysMin")
        }, r.defineLocale = ct, r.updateLocale = function(e, t) {
            if (null != t) {
                var r, n, i = nt;
                null != (n = st(e)) && (i = n._config), (r = new I(t = N(i, t))).parentLocale = it[e], it[e] = r, ut(e)
            } else null != it[e] && (null != it[e].parentLocale ? it[e] = it[e].parentLocale : null != it[e] && delete it[e]);
            return it[e]
        }, r.locales = function() {
            return E(it)
        }, r.weekdaysShort = function(e, t, r) {
            return yr(e, t, r, "weekdaysShort")
        }, r.normalizeUnits = A, r.relativeTimeRounding = function(e) {
            return void 0 === e ? jr : "function" == typeof e && (jr = e, !0)
        }, r.relativeTimeThreshold = function(e, t) {
            return void 0 !== Fr[e] && (void 0 === t ? Fr[e] : (Fr[e] = t, "s" === e && (Fr.ss = t - 1), !0))
        }, r.calendarFormat = function(e, t) {
            var r = e.diff(t, "days", !0);
            return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse"
        }, r.prototype = pr, r.HTML5_FMT = {
            DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
            DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
            DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
            DATE: "YYYY-MM-DD",
            TIME: "HH:mm",
            TIME_SECONDS: "HH:mm:ss",
            TIME_MS: "HH:mm:ss.SSS",
            WEEK: "GGGG-[W]WW",
            MONTH: "YYYY-MM"
        }, r
    });
var DiskStorage = {
    init: function() {
        var e, t = this,
            r = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ""),
            n = indexedDB.open(r, 1);

        function i(e) {
            e.createObjectStore(t.dataStoreName)
        }

        function o() {
            try {
                var r = null;
                r = !0 === t.data.get ? e.transaction([t.dataStoreName], "readonly") : e.transaction([t.dataStoreName], "readwrite");
                var n = null,
                    i = t.data.key;
                !0 === t.data.get ? n = r.objectStore(t.dataStoreName).get(i) : !0 === t.data.put && void 0 !== t.data.value ? n = r.objectStore(t.dataStoreName).put(t.data.value, i) : !0 === t.data.delete && (n = r.objectStore(t.dataStoreName).delete(i)), n.onsuccess = function(e) {
                    if ("function" == typeof t.callback) {
                        var r = t.callback;
                        t.callback = null, !0 === t.data.get ? r(e.target.result, i) : r("success", i)
                    }
                }, n.onerror = function(e) {
                    if ("function" == typeof t.callback) {
                        var r = t.callback;
                        t.callback = null, r(null, i, e)
                    }
                }
            } catch (e) {
                if (console.log(e), "function" == typeof t.callback) {
                    var o = t.callback;
                    t.callback = null, o(null, t.data.key, "Data store does not exist")
                }
            }
        }
        n.onerror = t.onError, n.onsuccess = function() {
            ((e = n.result).onerror = t.onError, e.setVersion) ? 1 !== e.version ? e.setVersion(1).onsuccess = function() {
                i(e), o()
            } : o(): o()
        }, n.onupgradeneeded = function(e) {
            i(e.target.result)
        }
    },
    Fetch: function(e, t) {
        return this.data = {
            key: e,
            get: !0
        }, this.callback = t, this.init(), this
    },
    Store: function(e, t) {
        return this.data = e, this.data.put = !0, this.data.get = !1, this.data.delete = !1, this.callback = t, this.init(), this
    },
    onError: function(e) {
        console.error(e)
    },
    Delete: function(e, t) {
        return this.data = {
            key: e,
            delete: !0
        }, this.callback = t, this.init(), this
    },
    callback: null,
    dataStoreName: "outklip",
    dbName: "outklip",
    data: {
        value: "",
        key: "outklip-video",
        get: !1,
        put: !1,
        delete: !1
    }
};

function MediaStreamRecorder(e, t) {
    var r = this;
    if (void 0 === e) throw 'First argument "MediaStream" is required.';
    if ("undefined" == typeof MediaRecorder) throw "Your browser does not supports Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.";
    if ("audio" === (t = t || {
            mimeType: "video/webm"
        }).type) {
        var n;
        if (e.getVideoTracks().length && e.getAudioTracks().length) navigator.mozGetUserMedia ? (n = new MediaStream).addTrack(e.getAudioTracks()[0]) : n = new MediaStream(e.getAudioTracks()), e = n;
        t.mimeType && -1 !== t.mimeType.toString().toLowerCase().indexOf("audio") || (t.mimeType = isChrome ? "audio/webm" : "audio/ogg"), t.mimeType && "audio/ogg" !== t.mimeType.toString().toLowerCase() && navigator.mozGetUserMedia && (t.mimeType = "audio/ogg")
    }
    var i, o = [];

    function a() {
        r.timestamps.push((new Date).getTime()), "function" == typeof t.onTimeStamp && t.onTimeStamp(r.timestamps[r.timestamps.length - 1], r.timestamps)
    }

    function s(e) {
        return i && i.mimeType ? i.mimeType : e.mimeType || "video/webm"
    }

    function u() {
        o = [], i = null, r.timestamps = []
    }
    this.getArrayOfBlobs = function() {
        return o
    }, this.record = function() {
        r.blob = null, r.clearRecordedData(), r.timestamps = [], c = [], o = [];
        var n = t;
        t.disableLogs || console.log("Passing following config over MediaRecorder API.", n), i && (i = null), isChrome && !isMediaRecorderCompatible() && (n = "video/vp8"), "function" == typeof MediaRecorder.isTypeSupported && n.mimeType && (MediaRecorder.isTypeSupported(n.mimeType) || (t.disableLogs || console.warn("MediaRecorder API seems unable to record mimeType:", n.mimeType), n.mimeType = "audio" === t.type ? "audio/webm" : "video/webm"));
        try {
            i = new MediaRecorder(e, n), t.mimeType = n.mimeType
        } catch (t) {
            i = new MediaRecorder(e)
        }
        n.mimeType && !MediaRecorder.isTypeSupported && "canRecordMimeType" in i && !1 === i.canRecordMimeType(n.mimeType) && (t.disableLogs || console.warn("MediaRecorder API seems unable to record mimeType:", n.mimeType)), i.ignoreMutedMedia = !0 === t.ignoreMutedMedia, i.ondataavailable = function(e) {
            if (e.data && c.push("ondataavailable: " + bytesToSize(e.data.size)), "number" != typeof t.timeSlice) !e.data || !e.data.size || e.data.size < 100 || r.blob ? r.recordingCallback && (r.recordingCallback(new Blob([], {
                type: s(n)
            })), r.recordingCallback = null) : (r.blob = t.getNativeBlob ? e.data : new Blob([e.data], {
                type: s(n)
            }), r.recordingCallback && (r.recordingCallback(r.blob), r.recordingCallback = null));
            else if (e.data && e.data.size && e.data.size > 100 && (o.push(e.data), a(), "function" == typeof t.ondataavailable)) {
                var i = t.getNativeBlob ? e.data : new Blob([e.data], {
                    type: s(n)
                });
                t.ondataavailable(i)
            }
        }, i.onstart = function() {
            c.push("started")
        }, i.onpause = function() {
            c.push("paused")
        }, i.onresume = function() {
            c.push("resumed")
        }, i.onstop = function() {
            c.push("stopped")
        }, i.onerror = function(e) {
            c.push("error: " + e), t.disableLogs || (-1 !== e.name.toString().toLowerCase().indexOf("invalidstate") ? console.error("The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.", e) : -1 !== e.name.toString().toLowerCase().indexOf("notsupported") ? console.error("MIME type (", n.mimeType, ") is not supported.", e) : -1 !== e.name.toString().toLowerCase().indexOf("security") ? console.error("MediaRecorder security error", e) : "OutOfMemory" === e.name ? console.error("The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.", e) : "IllegalStreamModification" === e.name ? console.error("A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.", e) : "OtherRecordingError" === e.name ? console.error("Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.", e) : "GenericError" === e.name ? console.error("The UA cannot provide the codec or recording option that has been requested.", e) : console.error("MediaRecorder Error", e)),
                function(e) {
                    if (!r.manuallyStopped && i && "inactive" === i.state) return delete t.timeslice, void i.start(6e5);
                    setTimeout(void 0, 1e3)
                }(), "inactive" !== i.state && "stopped" !== i.state && i.stop()
        }, "number" == typeof t.timeSlice ? (a(), i.start(t.timeSlice)) : i.start(36e5), t.initCallback && t.initCallback()
    }, this.timestamps = [], this.stop = function(e) {
        e = e || function() {}, r.manuallyStopped = !0, i && (this.recordingCallback = e, "recording" === i.state && i.stop(), "number" == typeof t.timeSlice && setTimeout(function() {
            r.blob = new Blob(o, {
                type: s(t)
            }), r.recordingCallback(r.blob)
        }, 100))
    }, this.pause = function() {
        i && "recording" === i.state && i.pause()
    }, this.resume = function() {
        i && "paused" === i.state && i.resume()
    }, this.clearRecordedData = function() {
        i && "recording" === i.state && r.stop(u), u()
    }, this.getInternalRecorder = function() {
        return i
    }, this.blob = null, this.getState = function() {
        return i && i.state || "inactive"
    };
    var c = [];
    this.getAllStates = function() {
        return c
    }, void 0 === t.checkForInactiveTracks && (t.checkForInactiveTracks = !1);
    r = this;
    ! function n() {
        if (i && !1 !== t.checkForInactiveTracks) return !1 === function() {
            if ("active" in e) {
                if (!e.active) return !1
            } else if ("ended" in e && e.ended) return !1;
            return !0
        }() ? (t.disableLogs || console.log("MediaStream seems stopped."), void r.stop()) : void setTimeout(n, 1e3)
    }(), this.name = "MediaStreamRecorder", this.toString = function() {
        return this.name
    }
}

function MultiStreamRecorder(e, t) {
    var r = this;
    (t = t || {
        mimeType: "video/webm",
        video: {
            width: 360,
            height: 240
        }
    }).frameInterval || (t.frameInterval = 10), t.video || (t.video = {}), t.video.width || (t.video.width = 360), t.video.height || (t.video.height = 240), this.record = function() {
        s = !1;
        var i, a = function() {
                var e;
                o(), "captureStream" in l ? e = l.captureStream() : "mozCaptureStream" in l ? e = l.mozCaptureStream() : t.disableLogs || console.error("Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features");
                var r = new MediaStream;
                return e.getVideoTracks().forEach(function(e) {
                    r.addTrack(e)
                }), l.stream = r, r
            }(),
            c = function() {
                Storage.AudioContextConstructor || (Storage.AudioContextConstructor = new Storage.AudioContext);
                r.audioContext = Storage.AudioContextConstructor, r.audioSources = [], r.gainNode = r.audioContext.createGain(), r.gainNode.connect(r.audioContext.destination), r.gainNode.gain.value = 0;
                var t = 0;
                if (e.forEach(function(e) {
                        if (e.getAudioTracks().length) {
                            t++;
                            var n = r.audioContext.createMediaStreamSource(e);
                            n.connect(r.gainNode), r.audioSources.push(n)
                        }
                    }), !t) return;
                return r.audioDestination = r.audioContext.createMediaStreamDestination(), r.audioSources.forEach(function(e) {
                    e.connect(r.audioDestination)
                }), r.audioDestination.stream
            }();
        c && c.getAudioTracks().forEach(function(e) {
            a.addTrack(e)
        }), t.previewStream && "function" == typeof t.previewStream && t.previewStream(a), n = new MediaStreamRecorder(a, t), u(), e.forEach(function(e) {
            e.fullcanvas && (i = !0)
        }), i || r.onloadedmetadata()
    }, this.stop = function(e) {
        s = !0, n && n.stop(function(t) {
            r.blob = t, e(t), r.clearRecordedData()
        })
    };
    var n, i = [];

    function o(t) {
        i = [], (t = t || e).forEach(function(e) {
            if (e.getVideoTracks().length) {
                var t = a(e);
                t.stream = e, i.push(t)
            }
        })
    }

    function a(e) {
        var t = document.createElement("video");
        return t.srcObject = e, t.muted = !0, t.volume = 0, e.fullcanvas && (t.onloadedmetadata = function() {
            t.onloadedmetadata = null, r.onloadedmetadata()
        }), t.play(), t
    }
    this.onloadedmetadata = function() {
        n.record()
    };
    var s = !1;

    function u() {
        if (!s) {
            var e = i.length,
                r = !1,
                n = [];
            i.forEach(function(e) {
                e.stream || (e.stream = {}), e.stream.fullcanvas ? r = e : n.push(e)
            }), r ? (l.width = r.stream.width, l.height = r.stream.height) : (l.width = e > 1 ? 2 * n[0].width : n[0].width, l.height = e > 2 ? 2 * n[0].height : n[0].height), c(r), n.forEach(c), setTimeout(u, t.frameInterval)
        }
    }

    function c(e, t) {
        if (!s) {
            var r = 0,
                n = 0,
                i = e.width,
                o = e.height;
            1 === t && (r = e.width), 2 === t && (n = e.height), 3 === t && (r = e.width, n = e.height), void 0 !== e.stream.left && (r = e.stream.left), void 0 !== e.stream.top && (n = e.stream.top), void 0 !== e.stream.width && (i = e.stream.width), void 0 !== e.stream.height && (o = e.stream.height), d.drawImage(e, r, n, i, o), "function" == typeof e.stream.onRender && e.stream.onRender(d, r, n, i, o, t)
        }
    }
    var l = document.createElement("canvas"),
        d = l.getContext("2d");
    l.style = "opacity:0;position:absolute;z-index:-1;top: -100000000;left:-1000000000;", (document.body || document.documentElement).appendChild(l), this.pause = function() {
        n && n.pause()
    }, this.resume = function() {
        n && n.resume()
    }, this.clearRecordedData = function() {
        i = [], s = !0, n && n.clearRecordedData(), n = null, r.gainNode && (r.gainNode.disconnect(), r.gainNode = null), r.audioSources.length && (r.audioSources.forEach(function(e) {
            e.disconnect()
        }), r.audioSources = []), r.audioDestination && (r.audioDestination.disconnect(), r.audioDestination = null), r.audioContext = null, d.clearRect(0, 0, l.width, l.height), l.stream && (l.stream.stop(), l.stream = null)
    }, this.addStreams = function(t) {
        if (!t) throw "First parameter is required.";
        t instanceof Array || (t = [t]), e.concat(t), n && t.forEach(function(e) {
            if (e.getVideoTracks().length) {
                var t = a(e);
                t.stream = e, i.push(t)
            }
            if (e.getAudioTracks().length && r.audioContext) {
                var n = r.audioContext.createMediaStreamSource(e);
                n.connect(r.audioDestination), r.audioSources.push(n)
            }
        })
    }, this.resetVideoStreams = function(e) {
        !e || e instanceof Array || (e = [e]), o(e)
    }, this.name = "MultiStreamRecorder", this.toString = function() {
        return this.name
    }
}

function TabAndMicStreamRecorder(e, t) {
    var r = this,
        n = null;
    t = t || {
        mimeType: "video/webm"
    };
    var i = !1;
    this.record = function() {
        isStoppedRecording = !1, n = e[0];
        var a = new MediaStream;
        a.addTrack(n.getVideoTracks()[0]);
        var s = function() {
            Storage.AudioContextConstructor || (Storage.AudioContextConstructor = new Storage.AudioContext);
            r.audioContext = Storage.AudioContextConstructor, r.audioSources = [], i && (r.gainNode = r.audioContext.createGain(), r.gainNode.connect(r.audioContext.destination), r.gainNode.gain.value = 1);
            var t = 0;
            if (e.forEach(function(e) {
                    if (e.getAudioTracks().length) {
                        t++;
                        var n = r.audioContext.createMediaStreamSource(e);
                        i && n.connect(r.gainNode), r.audioSources.push(n)
                    }
                }), !t) return;
            return r.audioDestination = r.audioContext.createMediaStreamDestination(), r.audioSources.forEach(function(e) {
                e.connect(r.audioDestination)
            }), r.audioDestination.stream
        }();
        s && s.getAudioTracks().forEach(function(e) {
            a.addTrack(e)
        }), (o = new MediaStreamRecorder(a, t)).record()
    }, this.stop = function(e) {
        isStoppedRecording = !0, o && o.stop(function(t) {
            r.blob = t, e(t), r.clearRecordedData()
        })
    };
    var o;
    this.pause = function() {
        o && o.pause()
    }, this.resume = function() {
        o && o.resume()
    }, this.clearRecordedData = function() {
        [], isStoppedRecording = !0, o && o.clearRecordedData(), o = null, r.gainNode && (r.gainNode.disconnect(), r.gainNode = null), r.audioSources.length && (r.audioSources.forEach(function(e) {
            e.disconnect()
        }), r.audioSources = []), r.audioDestination && (r.audioDestination.disconnect(), r.audioDestination = null), r.audioContext = null, n && n.stop(), n = null
    }, this.name = "TabAndMicStreamRecorder", this.toString = function() {
        return this.name
    }
}

function getAllAudioVideoDevices(e, t) {
    if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !navigator.enumerateDevices && navigator.mediaDevices.enumerateDevices && (navigator.enumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator)), navigator.enumerateDevices) {
        var r = [],
            n = [],
            i = [],
            o = [],
            a = [],
            s = [];
        navigator.enumerateDevices(function(t) {
            t.forEach(function(e) {
                var t, u = {};
                for (var c in e) u[c] = e[c];
                r.forEach(function(e) {
                    e.id === u.id && (t = !0)
                }), t || ("audio" === u.kind && (u.kind = "audioinput"), "video" === u.kind && (u.kind = "videoinput"), u.deviceId || (u.deviceId = u.id), u.id || (u.id = u.deviceId), "audioinput" !== u.kind && "audio" !== u.kind || o.push(u), "audiooutput" === u.kind && a.push(u), "videoinput" !== u.kind && "video" !== u.kind || s.push(u), -1 !== u.kind.indexOf("audio") && n.push(u), -1 !== u.kind.indexOf("video") && i.push(u), r.push(u))
            }), e && e({
                allMdiaDevices: r,
                allVideoDevices: i,
                allAudioDevices: n,
                videoInputDevices: s,
                audioInputDevices: o,
                audioOutputDevices: a
            })
        })
    } else t(null, "Neither navigator.mediaDevices.enumerateDevices NOR MediaStreamTrack.getSources are available.")
}
"undefined" != typeof RecordRTC && (RecordRTC.MediaStreamRecorder = MediaStreamRecorder), navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && (navigator.enumerateDevices = function(e) {
    navigator.mediaDevices.enumerateDevices().then(e)
});