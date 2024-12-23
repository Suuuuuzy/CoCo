window.loadCountDownModule = function(e) {
    if (e.countDownThread) clearTimeout(e.countDownThread);
    e.countDownThread = null;
    var t = $("#enable_countdown"),
        o = $("#countdown_setPosition"),
        n = $("#countdown_setText"),
        a = $("#countdown_setTime"),
        r = $("#countdown_text_color"),
        c = $("#countdown_background"),
        l = function() {
            o.val(localStorage.getItem("countdownPosition"));
            $(".countDown").removeClass("miniSize");
            $(".countDown").removeClass("center_center");
            if (localStorage.getItem("countdownPosition")) {
                if (localStorage.getItem("countdownPosition").toLowerCase() == "bottom center") {
                    $(".countDown").removeClass("miniSize")
                } else if (localStorage.getItem("countdownPosition").toLowerCase() == "center") {
                    $(".countDown").removeClass("miniSize");
                    $(".countDown").addClass("center_center")
                } else {
                    $(".countDown").addClass("miniSize")
                }
            }
            n.parent().parent().fadeIn();
            a.parent().parent().fadeIn();
            o.parent().parent().fadeIn();
            r.parent().fadeIn();
            c.parents("li").fadeIn();
            $("#countdown").fadeIn();
            o.off("change");
            o.on("change", function() {
                localStorage.setItem("countdownPosition", $(this).val());
                var e = $(this).val().toLowerCase();
                if (e === "bottom center") {
                    $(".countDown").removeClass("miniSize");
                    $(".countDown").removeClass("center_center")
                } else if (e === "center") {
                    $(".countDown").removeClass("miniSize");
                    $(".countDown").addClass("center_center")
                } else {
                    $(".countDown").addClass("miniSize");
                    $(".countDown").removeClass("center_center")
                }
                chrome.runtime.sendMessage({
                    syncOptionsNow: true
                })
            });
            var l = 0;
            var i = "";
            if (localStorage.getItem("countdownToTime")) {
                a.val(localStorage.getItem("countdownToTime"));
                l = new Date(localStorage.getItem("countdownToTime")).getTime()
            }
            if (localStorage.getItem("countdownText")) {
                n.val(localStorage.getItem("countdownText"));
                i = "Countdown to " + localStorage.getItem("countdownText");
                $("#countdownTitle").text(i)
            }
            var s = function(e) {
                if (e.handleObj.type == "blur" || e.keyCode == 13) {
                    if ($(this).val() == "") {
                        $(this).attr("type", "text");
                        $(this).val("Invalid time");
                        a.off("focus");
                        a.on("focus", function() {
                            $(this).attr("type", "datetime-local")
                        })
                    } else {
                        l = new Date($(this).val()).getTime();
                        localStorage.setItem("countdownToTime", $(this).val());
                        var t = (new Date).getTime();
                        if (localStorage.getItem("latency")) {
                            t += Number(localStorage.getItem("latency"))
                        }
                        if (t > l) {
                            localStorage.setItem("countdown_notified", "yes")
                        } else {
                            localStorage.setItem("countdown_notified", "no")
                        }
                        chrome.runtime.sendMessage({
                            syncOptionsNow: true
                        })
                    }
                    if (e.keyCode == 13) {
                        $(this).trigger("blur")
                    }
                }
            };
            var u = function(e) {
                if (e.handleObj.type == "blur" || e.keyCode == 13) {
                    if ($(this).val().length > 0) {
                        i = "Countdown to " + $(this).val()
                    } else {
                        i = ""
                    }
                    $("#countdownTitle").text(i);
                    localStorage.setItem("countdownText", $(this).val());
                    chrome.runtime.sendMessage({
                        syncOptionsNow: true
                    });
                    if (e.keyCode == 13) {
                        $(this).trigger("blur")
                    }
                }
            };
            a.off("blur");
            a.on("blur", s);
            a.off("keydown");
            a.on("keydown", s);
            n.off("blur");
            n.on("blur", u);
            n.off("keydown");
            n.on("keydown", u);
            var d, w, m, f;

            function g() {
                var i = (new Date).getTime();
                if (localStorage.getItem("latency")) {
                    i += Number(localStorage.getItem("latency"))
                }
                if (i > l) {
                    d = 0;
                    w = 0;
                    m = 0;
                    f = 0;
                    if (localStorage.getItem("countdown_notified") === "no") {
                        e.startFireworksCanvas();
                        swal({
                            allowOutsideClick: true,
                            customClass: "countdown-reached-notify",
                            title: "Congratulations!",
                            text: '<p style="font-size:large;">You\'ve reached <span style="font-weight:bold;color:red;">' + localStorage.getItem("countdownText") + "</span>.</p>",
                            type: "success",
                            html: true,
                            animation: false,
                            showConfirmButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "OK",
                            showCancelButton: false,
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, function(i) {
                            var s = new Date;
                            var u = new Date(localStorage.getItem("countdownToTime"));
                            var d = s.getFullYear();
                            var w = u.getMonth() + 1;
                            var m = u.getDate();
                            var f = u.getHours();
                            var g = u.getMinutes();
                            if (w == 10 && m == 31 || w == 12 && m == 24 || w == 12 && m == 25 || w == 12 && m == 31 || w == 1 && m == 1) {
                                var h = `${d}-${("0"+w).slice(-2)}-${("0"+m).slice(-2)}T${("0"+f).slice(-2)}:${("0"+g).slice(-2)}`;
                                if (s > new Date(h)) h = `${d+1}-${("0"+w).slice(-2)}-${("0"+m).slice(-2)}T${("0"+f).slice(-2)}:${("0"+g).slice(-2)}`;
                                l = new Date(h).getTime();
                                a.val(h);
                                localStorage.setItem("countdownToTime", h);
                                localStorage.setItem("countdown_notified", "no")
                            } else {
                                localStorage.setItem("countdown_notified", "yes");
                                localStorage.setItem("enable_countdown", "no");
                                t.prop("checked", false);
                                n.parent().parent().fadeOut();
                                a.parent().parent().fadeOut();
                                o.parent().parent().fadeOut();
                                r.parent().fadeOut();
                                c.parents("li").fadeOut();
                                $("#countdown").fadeOut();
                                clearTimeout(e.countDownThread)
                            }
                            chrome.runtime.sendMessage({
                                syncOptionsNow: true
                            });
                            if (localStorage.getItem("snow_type") !== "fireworks") e.stopFireworksCanvas();
                            chrome.runtime.sendMessage({
                                name: "click-CountdownReach",
                                data: localStorage.getItem("countdownText")
                            })
                        })
                    }
                } else {
                    if ($(".countdown-reached-notify").size()) {
                        $(".sweet-overlay").remove();
                        $(".countdown-reached-notify").remove();
                        if (localStorage.getItem("snow_type") !== "fireworks") e.stopFireworksCanvas()
                    }
                    var s = (i - l) / 1e3;
                    s = Math.abs(Math.floor(s));
                    d = Math.floor(s / (24 * 60 * 60));
                    f = s - d * 24 * 60 * 60;
                    w = Math.floor(f / (60 * 60));
                    f = f - w * 60 * 60;
                    m = Math.floor(f / 60);
                    f = f - m * 60
                }
            }

            function h() {
                clearTimeout(e.countDownThread);
                g();
                $("#days .number").text(d < 10 ? ("0" + d).slice(-2) : d);
                $("#hours .number").text(("0" + w).slice(-2));
                $("#minutes .number").text(("0" + m).slice(-2));
                $("#seconds .number").text(("0" + f).slice(-2));
                if (localStorage.getItem("enable_countdown") == "yes") e.countDownThread = setTimeout(h, 999)
            }
            e.countDownThread = setTimeout(h, 1);
            e.listAllThreads.threadCountdown = {
                pause: function() {
                    clearInterval(e.countDownThread)
                },
                resume: function() {
                    h()
                }
            }
        };
    if (localStorage.getItem("countdown_notified") == "yes") {
        if ($(".countdown-reached-notify").size()) {
            $(".sweet-overlay").remove();
            $(".countdown-reached-notify").remove();
            if (localStorage.getItem("snow_type") !== "fireworks") e.stopFireworksCanvas()
        }
    }
    if (localStorage.getItem("enable_countdown") == "yes") {
        t.prop("checked", true);
        l()
    } else {
        t.prop("checked", false);
        o.parent().parent().hide();
        a.parent().parent().hide();
        n.parent().parent().hide();
        r.parent().hide();
        c.parents("li").hide();
        $("#countdown").hide()
    }
    c.prop("checked", localStorage.getItem("countdown_background") === "yes" ? true : false);
    c.off("change");
    c.on("change", function(e) {
        if ($(this).is(":checked")) {
            $("ul#countdown").css({
                background: "radial-gradient(rgba(0,0,0,0.9)-4%, rgba(0,0,0,0)68%)"
            })
        } else {
            $("ul#countdown").css({
                background: "transparent"
            })
        }
        localStorage.setItem("countdown_background", $(this).is(":checked") ? "yes" : "no");
        chrome.runtime.sendMessage({
            syncOptionsNow: true
        })
    });
    if (localStorage.getItem("countdown_text_color")) {
        r.val(localStorage.getItem("countdown_text_color"))
    } else {
        r.val("#fff")
    }
    t.off("change");
    t.on("change", function() {
        if ($(this).is(":checked")) {
            localStorage.setItem("enable_countdown", "yes");
            var t = 0;
            if (localStorage.getItem("countdownToTime")) t = new Date(localStorage.getItem("countdownToTime")).getTime();
            var i = (new Date).getTime();
            if (localStorage.getItem("latency")) {
                i += Number(localStorage.getItem("latency"))
            }
            if (i > t) {
                localStorage.setItem("countdown_notified", "yes")
            } else {
                localStorage.setItem("countdown_notified", "no")
            }
            l()
        } else {
            localStorage.setItem("enable_countdown", "no");
            n.parent().parent().fadeOut();
            a.parent().parent().fadeOut();
            o.parent().parent().fadeOut();
            r.parent().fadeOut();
            c.parents("li").fadeOut();
            $("#countdown").fadeOut();
            clearTimeout(e.countDownThread)
        }
        chrome.runtime.sendMessage({
            syncOptionsNow: true
        })
    })
};