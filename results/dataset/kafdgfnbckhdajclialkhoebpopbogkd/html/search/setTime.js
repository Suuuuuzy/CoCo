window.loadSetTimeModule = function(e) {
    var t = true;
    var n = document.getElementById("setTimeAutomatically");
    var r = n.parentNode;
    while (r.nodeName.toLowerCase() !== "li") {
        r = r.parentNode
    }
    var m = {
        newTime: new Date,
        timmer: null,
        timeout: null,
        init: function() {
            var e = this;
            var t = 0;
            if (localStorage.getItem("latency")) {
                t = Number(localStorage.getItem("latency"));
                e.newTime = new Date(Number(new Date) + t)
            } else {
                e.newTime = new Date
            }
            var n = "";
            if (!localStorage.getItem("time_format") || localStorage.getItem("time_format") === "12h") {
                n = '<select id="selectAmOrPm"><option value="am">AM</option><option value="pm">PM</option></select>'
            }
            var m = '<label><span>Change Time</span><label class="changeTime"><select id="selectHours" ></select><select id="selectMins" ></select>' + n + "</label></label>";
            var l = document.createElement("LI");
            l.classList.add("sub-li");
            l.style.transition = "background 0.32s, opacity 0.32s";
            l.style.opacity = 0;
            l.innerHTML = m;
            l.style.opacity = 1;
            document.querySelector("#tab-setting .t-r-a-s ul").insertBefore(l, r.nextElementSibling);
            var i = function() {
                document.getElementById("selectHours").innerHTML = "";
                document.getElementById("selectMins").innerHTML = "";
                var t = localStorage.getItem("time_format") === "24h" ? 24 : 12;
                for (var n = 0; n < t; n++) {
                    var r = document.createElement("OPTION");
                    if (!localStorage.getItem("time_format") || localStorage.getItem("time_format") === "12h") {
                        n = n + 1
                    }
                    r.value = n < 10 ? "0" + n : n.toString();
                    r.innerHTML = n < 10 ? "0" + n : n.toString();
                    if (e.newTime.getHours() === n) {
                        r.setAttribute("selected", true)
                    }
                    document.getElementById("selectHours").appendChild(r);
                    if (!localStorage.getItem("time_format") || localStorage.getItem("time_format") === "12h") {
                        n = n - 1
                    }
                }
                for (var n = 0; n < 60; n++) {
                    var r = document.createElement("OPTION");
                    r.value = n < 10 ? "0" + n : n.toString();
                    r.innerHTML = n < 10 ? "0" + n : n.toString();
                    if (e.newTime.getMinutes() === n) {
                        r.setAttribute("selected", true)
                    }
                    document.getElementById("selectMins").appendChild(r)
                }
            };
            i();
            var a = document.querySelectorAll(".changeTime select");
            var o = function(n) {
                var r = n.target;
                if (r.id === "selectHours") {
                    e.newTime.setHours(r.value)
                } else if (r.id === "selectMins") {
                    e.newTime.setMinutes(r.value)
                } else if (r.id = "selectAmOrPm") {
                    var m = e.newTime.getHours();
                    if (r.value === "am") {
                        m = m >= 12 ? m - 12 : m
                    } else if (r.value === "pm") {
                        m = m < 12 ? m + 12 : m
                    }
                    e.newTime.setHours(m)
                }
                t = Number(e.newTime) - Number(new Date);
                if (isNaN(t) === true) {
                    t = 0
                }
                localStorage.setItem("latency", t);
                chrome.runtime.sendMessage({
                    syncOptionsNow: true
                })
            };
            for (var s = 0; s < a.length; s++) {
                a[s].removeEventListener("change", o, true);
                a[s].addEventListener("change", o, true)
            }
            if (e.timmer) {
                clearInterval(e.timmer);
                e.timmer = null
            }
            e.timmer = setInterval(function() {
                if (localStorage.getItem("latency")) {
                    t = Number(localStorage.getItem("latency"))
                }
                e.newTime = new Date(Number(new Date) + t);
                var r = document.querySelectorAll("option[selected=true]");
                r.forEach(function(e, t) {
                    e.removeAttribute("selected")
                });
                var m = e.newTime.getHours() < 10 ? "0" + e.newTime.getHours() : e.newTime.getHours();
                var l = e.newTime.getMinutes() < 10 ? "0" + e.newTime.getMinutes() : e.newTime.getMinutes();
                var a = false;
                if (!localStorage.getItem("time_format") || localStorage.getItem("time_format") === "12h") {
                    if (!document.getElementById("selectAmOrPm")) {
                        n = document.createElement("SELECT");
                        n.setAttribute("id", "selectAmOrPm");
                        n.innerHTML = '<option value="am">AM</option><option value="pm">PM</option>';
                        document.getElementsByClassName("changeTime")[0].appendChild(n);
                        n.removeEventListener("change", o, true);
                        n.addEventListener("change", o, true);
                        i()
                    }
                    if (Number(e.newTime.getHours()) >= 12) {
                        var s = Number(e.newTime.getHours()) > 12 ? e.newTime.getHours() - 12 : e.newTime.getHours();
                        m = s < 10 ? "0" + s : s;
                        a = true
                    } else if (Number(e.newTime.getHours()) === 0) {
                        m = 12;
                        a = false
                    }
                    document.getElementById("selectAmOrPm").value = a ? "pm" : "am"
                } else {
                    if (document.getElementById("selectAmOrPm")) {
                        document.getElementById("selectAmOrPm").removeEventListener("change", o, true);
                        document.getElementById("selectAmOrPm").remove();
                        i()
                    }
                }
                document.querySelector('#selectHours > option[value="' + m + '"]').setAttribute("selected", true);
                document.querySelector('#selectMins > option[value="' + l + '"]').setAttribute("selected", true)
            }, 999)
        },
        remove: function() {
            var e = r.nextElementSibling;
            if (e.getElementsByClassName("changeTime").length > 0) {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                    this.timeout = null
                }
                e.style.opacity = "0";
                e.remove()
            }
            clearInterval(this.timmer);
            this.timmer = null
        }
    };
    if (localStorage.getItem("setTimeAutomatically")) {
        t = localStorage.getItem("setTimeAutomatically") === "yes" ? true : false;
        n.checked = t;
        if (t) {
            m.remove()
        } else {
            m.remove();
            m.init()
        }
    } else {
        n.checked = true;
        m.remove()
    }
    var l = function(e) {
        t = e.target.checked;
        if (t) {
            m.remove();
            localStorage.setItem("latency", 0)
        } else {
            m.remove();
            m.init()
        }
        localStorage.setItem("setTimeAutomatically", t ? "yes" : "no");
        chrome.runtime.sendMessage({
            syncOptionsNow: true
        })
    };
    n.removeEventListener("change", l, true);
    n.addEventListener("change", l)
};