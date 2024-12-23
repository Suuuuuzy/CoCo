window.AutoSuggest = function(e, t, n) {
    "use strict";
    var s = this;
    var a = null;
    var i = "";
    var r = t;
    s.asDiv = null;
    var o = -1;
    var l = 0;
    s.action = n;
    s.init = function() {
        e.addEventListener("keydown", s.keyDown, false);
        e.addEventListener("keyup", s.keyUp, false);
        chrome.runtime.onMessage.addListener(function(t, n, a) {
            if (t.autoSuggestResponse) {
                var r = t.val,
                    u = t.xmlHttpResponse;
                if (i == r) {
                    if (s.asDiv == null) {
                        s.asDiv = document.getElementById("search-suggestion-pad")
                    }
                    s.asDiv.innerHTML = null;
                    u = JSON.parse(u);
                    var f = u[1];
                    l = f.length;
                    for (var c = 0; c < l && c < 10; c++) {
                        var v = f[c];
                        var d = document.createElement("li");
                        var g = v.indexOf(r);
                        if (g != -1) {
                            d.innerHTML = v.substr(0, g + r.length) + "<b>" + v.substr(g + r.length) + "</b>"
                        } else {
                            d.textContent = v
                        }
                        d.setAttribute("id", "auto-suggest-row" + c);
                        d.index = c;
                        d.isRow = true;
                        d.addEventListener("mouseover", function(e) {
                            var t = e.currentTarget;
                            if (o != -1) document.getElementById("auto-suggest-row" + o).setAttribute("class", "");
                            t.setAttribute("class", "selected");
                            o = t.index
                        }, false);
                        d.addEventListener("click", function(t) {
                            var n = t.currentTarget;
                            e.value = n.textContent;
                            s.onSearch(n.textContent);
                            t.preventDefault()
                        }, false);
                        s.asDiv.appendChild(d)
                    }
                    o = -1;
                    if (l == 0) {
                        s.asDiv.style.display = "none"
                    } else {
                        s.asDiv.style.display = "block"
                    }
                }
            }
        })
    };
    s.setSuggestUrl = function(e) {
        r = e
    };
    s.sprintf = function(e, t) {
        var n = e;
        for (var s in t) {
            var a = t[s];
            var i = new RegExp("\\{" + s + "\\}", "gi");
            n = n.replace(i, a)
        }
        return n
    };
    s.getData = function(e) {
        if (!e) {
            if (s.asDiv != null) s.asDiv.style.display = "none";
            return
        }
        if (r === undefined || r === "") {
            return
        }
        var t;
        var n = t = utils.locale;
        var n = n.replace("_", "-");
        var a = s.sprintf(r, {
            searchTerms: e,
            lang: n,
            country: ""
        });
        chrome.runtime.sendMessage({
            autoSuggest: true,
            val: e,
            t: s,
            URL: a
        })
    };
    s.keyUp = function(t) {
        var n = t.keyCode;
        if (n != 13) {
            if (n != 38 && n != 40 && n != 116) {
                if (a != null) {
                    window.clearInterval(a);
                    a = null
                }
                i = e.value;
                a = setTimeout(s.getData, 10, e.value)
            }
        }
    };
    s.keyDown = function(t) {
        var n = t.keyCode;
        if (n != 38 && n != 40) {} else {
            if (n == 38) {
                if (o != -1) {
                    document.getElementById("auto-suggest-row" + o).setAttribute("class", "")
                }
                o--;
                if (o < 0) {
                    o = l - 1
                }
            } else {
                if (o != -1) {
                    document.getElementById("auto-suggest-row" + o).setAttribute("class", "")
                }
                o++;
                if (o >= l) {
                    o = 0
                }
            }
            var s = document.getElementById("auto-suggest-row" + o);
            s.setAttribute("class", "selected");
            e.value = s.textContent
        }
    };
    s.documentMouseDown = function(e) {
        if (e.explicitOriginalTarget != s.asDiv) {
            i = "--";
            if (s.asDiv != null) {
                s.asDiv.style.display = "none";
                try {
                    document.getElementById("container").style.height = "3px"
                } catch (e) {
                    console.log(e)
                }
            }
        }
    };
    s.setASdivPosition = function() {
        var t = e;
        var n = 0;
        var a = e.offsetHeight - 1;
        while (t.offsetParent && t.tagName.toLowerCase() != "body") {
            n += t.offsetLeft;
            a += t.offsetTop;
            t = t.offsetParent
        }
        n += t.offsetLeft;
        a += t.offsetTop;
        if (s.asDiv != null) {
            s.asDiv.style.left = n + "px";
            s.asDiv.style.top = a + "px"
        }
    };
    s.onSearch = function(e) {
        i = "--";
        if (s.asDiv != null) {
            s.asDiv.style.display = "none";
            if (document.getElementById("container")) {
                document.getElementById("container").style.height = "29px"
            }
            s.action()
        }
    };
    s.changeSuggestUrl = function(e) {
        r = e
    };
    s.init()
};