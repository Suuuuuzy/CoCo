(function(e) {
    e.listAllThreads = {};
    e.chosenRandomBG = "";
    var t = [],
        a = [];
    if (localStorage.getItem("backgroundLoaded")) {
        t = JSON.parse(localStorage.getItem("backgroundLoaded"))
    }
    if (localStorage.getItem("exclude_list")) {
        a = JSON.parse(localStorage.getItem("exclude_list"));
        a.forEach(function(e, t) {
            a[t] = Number(e.slice(3, -4))
        })
    }
    e.animations = [{
        value: "fadeIn",
        text: "Fade-In"
    }, {
        value: "pulse",
        text: "Pulse"
    }, {
        value: "bounceInDown",
        text: "Bounce-In-Down"
    }, {
        value: "bounceInLeft",
        text: "Bounce-In-Left"
    }, {
        value: "bounceInRight",
        text: "Bounce-In-Right"
    }, {
        value: "bounceInUp",
        text: "Bounce-In-Up"
    }, {
        value: "fadeInDown",
        text: "Fade-In-Down"
    }, {
        value: "fadeInLeft",
        text: "Fade-In-Left"
    }, {
        value: "fadeInRight",
        text: "Fade-In-Right"
    }, {
        value: "fadeInUp",
        text: "Fade-In-Up"
    }, {
        value: "lightSpeedIn",
        text: "Flip-Speed-In"
    }, {
        value: "rotateInDownLeft",
        text: "Rotate-In-Down-Left"
    }, {
        value: "rotateInDownRight",
        text: "Rotate-In-Down-Right"
    }, {
        value: "rotateInUpLeft",
        text: "Rotate-In-Up-Left"
    }, {
        value: "rotateInUpRight",
        text: "Rotate-In-Up-Right"
    }, {
        value: "rollIn",
        text: "Roll-In"
    }, {
        value: "zoomIn",
        text: "Zoom-In"
    }, {
        value: "slideInDown",
        text: "Slide-In-Down"
    }, {
        value: "slideInLeft",
        text: "Slide-In-Left"
    }, {
        value: "slideInRight",
        text: "Slide-In-Right"
    }, {
        value: "slideInUp",
        text: "Slide-In-Up"
    }];
    var l = document.getElementById("__bg");
    e.elementFadeIn = function(e, t) {
        if (!e) return;
        e.style.opacity = 0;
        e.style.filter = "alpha(opacity=0)";
        e.style.display = "inline-block";
        e.style.visibility = "visible";
        if (t) {
            var a = 22;
            var l = 0;
            var n = setInterval(function() {
                l += a / t;
                if (l >= 1) {
                    clearInterval(n);
                    l = 1
                }
                e.style.opacity = l;
                e.style.filter = "alpha(opacity=" + l * 100 + ")"
            }, a)
        } else {
            e.style.opacity = 1;
            e.style.filter = "alpha(opacity=1)"
        }
    };
    e.elementFadeOut = function(e, t) {
        if (!e) return;
        if (t) {
            var a = 22;
            var l = 1;
            var n = setInterval(function() {
                l -= a / t;
                if (l <= 0) {
                    clearInterval(n);
                    l = 0;
                    e.style.display = "none";
                    e.style.visibility = "hidden"
                }
                e.style.opacity = l;
                e.style.filter = "alpha(opacity=" + l * 100 + ")"
            }, a)
        } else {
            e.style.opacity = 0;
            e.style.filter = "alpha(opacity=0)";
            e.style.display = "none";
            e.style.visibility = "hidden"
        }
    };
    e.setBackgroundGIFOrJPG = function(n) {
        var o;
        var i = localStorage.getItem("bg_animation");
        if (!i) i = "fadeIn";
        if (i === "default" || i === "random") {
            o = animations[Math.floor(Math.random() * animations.length)].value
        } else if (animations.findIndex(e => e.value === i) > -1) {
            o = i
        } else {
            o = "fadeIn"
        }
        if (n.indexOf("bg-undefined") === 0) n = "bg-01.jpg";
        var r = n.replace("bg-0", "").replace("bg-", "").replace(".jpg", "").replace(".gif", "");
        localStorage.setItem("last_bg", r);
        var f = true;
        if (localStorage.getItem("shuffle_background") === "yes") {
            if (t.concat(a).unique().length + 1 >= Number(user["bg_img_list"])) {
                t = [];
                localStorage.setItem("backgroundLoaded", JSON.stringify(t))
            }
        } else if (localStorage.getItem("shuffle_favorites") === "yes") {
            var s = JSON.parse(localStorage.getItem("mark_favor"));
            if (t.length + 1 >= s.length) {
                t = [];
                localStorage.setItem("backgroundLoaded", JSON.stringify(t))
            }
        }
        t.forEach(function(e, t) {
            if (Number(e) === Number(r)) {
                f = false
            }
        });
        if (f) {
            t.push(r);
            localStorage.setItem("backgroundLoaded", JSON.stringify(t))
        }
        var g = Object.keys(user["bg_color_gif"]).indexOf(n.replace(/\.jpg$/, ".gif"));
        if (g > -1) {
            chosenRandomBG = n.replace(/\.jpg$/, ".gif");
            l.style.backgroundImage = "url(" + chrome.extension.getURL("/html/skin/images/" + chosenRandomBG) + ")";
            var d = Object.values(user["bg_color_gif"])[g];
            if (Math.floor(Math.random() * 100) < 10 || d.indexOf("frame") > -1 || d === "white" || d === "#ffffff") {
                var c = Math.floor(Math.random() * user["frame_bg_list"]);
                var u = "frame-bg-" + ("0" + c).slice(-2) + ".png";
                if (!document.getElementById("frame_bg")) {
                    var m = document.createElement("div");
                    m.setAttribute("id", "frame_bg");
                    m.style = 'background-image: url("/html/skin/images/' + u + '"); width: 100%; height: 100%; background-repeat: no-repeat; background-size: 900px; background-position: center center;';
                    l.insertBefore(m, l.childNodes[0])
                }
                if (d.indexOf("frame") > -1 || d === "#ffffff") {
                    d = d.replace("frame", "").replace(/[ ,\-]/g, "");
                    if (!d || d === "white" || d === "#ffffff") d = "black"
                }
                l.style.backgroundColor = d;
                l.style.backgroundSize = "485px 320px"
            } else {
                if (m) m.remove();
                l.style.backgroundColor = d;
                l.style.backgroundSize = "490px"
            }
        } else {
            chosenRandomBG = n.replace(/\.gif$/, ".jpg");
            l.style.backgroundImage = "url(" + chrome.extension.getURL("/html/skin/images/" + chosenRandomBG) + ")";
            l.style.backgroundColor = "transparent";
            l.style.backgroundSize = "cover";
            if (document.getElementById("frame_bg")) {
                document.getElementById("frame_bg").remove()
            }
        }
        if (o === "fadeIn") {
            e.elementFadeIn(l, 333)
        } else {
            var I = l.cloneNode(true);
            document.body.appendChild(I);
            e.elementFadeIn(l, 500);
            e.elementFadeIn(I, 333);
            I.className = "background animated " + o;
            setTimeout(function() {
                document.body.removeChild(I)
            }, 1e3)
        }
    };
    e.setNewTabBackground = function() {
        var l = "" + localStorage.getItem("last_bg");
        var n = [],
            o = [];
        if (localStorage.getItem("mark_favor")) {
            n = JSON.parse(localStorage.getItem("mark_favor"));
            if (n.length >= 2 && n.indexOf(l) > -1) {
                n.splice(n.indexOf(l), 1)
            }
            if (n.length) o = n.join("|").split("|")
        }
        for (var i = 1; i <= user["bg_img_list"]; i++) {
            if ("" + i !== l) o.push("" + i)
        }
        if (localStorage.getItem("shuffle_background") == "yes" || localStorage.getItem("shuffle_favorites") == "yes" && n.length == 0) {
            var r;
            if (l == "0") {
                r = 1
            } else {
                r = o.diff(t)[Math.floor(Math.random() * o.diff(t).length)]
            }
            if (localStorage.getItem("shuffle_background") == "yes") {
                if (Number(user["bg_img_list"]) === a.length) {
                    r = l
                } else {
                    while (a.indexOf(Number(r)) >= 0) {
                        r = o.diff(t)[Math.floor(Math.random() * o.diff(t).length)]
                    }
                }
            }
            chosenRandomBG = "bg-" + (Number(r) < 100 ? ("0" + r).slice(-2) : r) + ".jpg"
        } else if (localStorage.getItem("shuffle_favorites") == "yes") {
            var r = 1;
            var f = n.diff(t);
            if (f.length) r = f[Math.floor(Math.random() * f.length)];
            else r = n[Math.floor(Math.random() * n.length)];
            chosenRandomBG = "bg-" + (Number(r) < 100 ? ("0" + r).slice(-2) : r) + ".jpg"
        } else {
            if (localStorage.getItem("enable_slideshow") === "yes") {
                var r = Number(l) + 1;
                if (r > user["bg_img_list"]) {
                    r = 1
                }
                chosenRandomBG = "bg-" + (Number(r) < 100 ? ("0" + r).slice(-2) : r) + ".jpg"
            } else {
                chosenRandomBG = "bg-" + (Number(l) < 100 ? ("0" + l).slice(-2) : l) + ".jpg"
            }
        }
        e.setBackgroundGIFOrJPG(chosenRandomBG)
    };
    e.setNewTabBackground()
})(this);