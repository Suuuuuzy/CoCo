$(document).ready(function() {
    window.loadToDoList()
});
var todoList = [];
Date.prototype.toDateInputValue = function() {
    var e = new Date(this);
    e.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return e.toJSON().slice(0, 16)
};
window.loadToDoList = function() {
    todoList = updateTodoList();
    if ($(".todoAlarm").size() > 0) {
        var e = $(".todoAlarm").eq(0).attr("data-id");
        for (let t of todoList) {
            if (Number(t.id) === Number(e)) {
                if (t.status === "checked" || !t.reminder) {
                    $(".todoAlarm").remove();
                    break
                }
            }
        }
    }
    var t = function(e, t, i) {
        var d = $("<i>", {
            class: i ? "todo_reminder has_reminder" : "todo_reminder"
        });
        var n = function(e) {
            var t = e.parents("li").offset();
            var o = e.parents("li").height();
            if (t.top + o >= $(document).height) {
                t.top = $(document).height - $("#setReminder").height() / 2.4
            }
            var i = e.parents("li").width();
            $("#setReminder").css({
                left: t.left + i + 30 + "px",
                top: t.top - $("#setReminder").height() / 2.4 + "px"
            })
        };
        d.click(function(i) {
            o(false);
            d.parent().addClass("todo_selected");
            i.stopPropagation();
            $("#setReminder").remove();
            var a = `<div id="setReminder" class="s-rd" style="display:none;" data-id="${t}" >\n       <div class="blur">\n         <div class="r-stt-b">\n          <div class="r-tt">Reminder: ${e}</div>\n          \x3c!--<div class="hideReminder"><i id="hideReminder"></i></div>--\x3e\n        </div>\n        <div class="r-ct">\n          <input type="datetime-local" id="setTimeReminder" />\n        </div>\n        <div class="r-ft">\n          <div id="cc-r">Clear</div>\n          <div id="r-sm">Save</div>\n        </div>\n       </div>\n      </div>`;
            $("body").append(a);
            $("#setReminder").fadeIn("fast");
            var s = new Date;
            if (localStorage.getItem("latency")) {
                s = new Date(s.getTime() + Number(localStorage.getItem("latency")))
            }
            $("#setTimeReminder").attr("min", s.toDateInputValue());
            $("#setTimeReminder").val(s.toDateInputValue());
            todoList = updateTodoList();
            todoList.forEach(function(e, o) {
                if (Number(e.id) === Number(t)) {
                    if (e.reminder) {
                        $("#setTimeReminder").val(e.reminder)
                    }
                }
            });
            n(d);
            $("#setTimeReminder").focus();
            $("#setReminder").off("click").click(function(e) {
                e.stopPropagation()
            });
            window.onresize = function() {
                n(d)
            };
            $("#cc-r").off("click").click(function(e) {
                if ($(".s-rd").length > 0) {
                    todoList = todoList = updateTodoList();
                    todoList.forEach(function(e, o) {
                        if (Number(e.id) === Number(t)) {
                            if (e.reminder) {
                                $(".todoAlarm").remove();
                                $(`.todo_list ul li[data-id="${t}"] i.todo_reminder`).removeClass("has_reminder");
                                delete todoList[o].reminder;
                                localStorage.setItem("todoList", JSON.stringify(todoList));
                                chrome.runtime.sendMessage({
                                    syncOptionsNow: true
                                })
                            }
                        }
                    });
                    o(true)
                }
            });
            var l = function(e) {
                if (e.handleObj.type === "keydown" && e.keyCode === 13 || e.handleObj.type === "click") {
                    var t = $("#setTimeReminder").val();
                    todoList = updateTodoList();
                    if (t) {
                        var i = Number($("#setReminder")[0].dataset.id);
                        todoList.forEach(function(e, o) {
                            if (Number(e.id) === i) {
                                $(".todoAlarm").remove();
                                $(`.todo_list ul li[data-id="${i}"] i.todo_reminder`).addClass("has_reminder");
                                todoList[o].reminder = t;
                                localStorage.setItem("todoList", JSON.stringify(todoList));
                                chrome.runtime.sendMessage({
                                    syncOptionsNow: true
                                })
                            }
                        })
                    }
                    o(true)
                }
            };
            $("#r-sm").off("click").on("click", l);
            $("#setReminder").off("keydown").on("keydown", l)
        });
        return d
    };
    $("#lnk_todo").hide();
    $(".todo-panel").hide();
    $(".todo_list ul").empty();
    todoList = updateTodoList();
    todoList.forEach(e => {
        let o = e.id;
        let i = e.value;
        let d = e.status;
        let n = e.reminder;
        let a = $("<li>");
        a.attr("data-id", o);
        a.html(`<input type="checkbox" id="${o}" class="markDone"><label for="${o}">${i}</label><i class="dl_btn" dl-for="${o}"></i>`);
        a.css({
            display: "none"
        });
        if (d !== "checked") {
            a.append(t(i, o, n))
        }
        $(".todo_list ul").append(a);
        a.fadeIn();
        if (d === "checked") {
            $(`#${o}`).prop("checked", true);
            $(`#${o}`).next("label").css({
                "text-decoration": "line-through",
                opacity: ".5"
            })
        }
    });
    d();
    var o = function(e) {
        $(".todo_list li").removeClass("todo_selected");
        if (e) {
            if ($(".s-rd").length > 0) {
                $(".s-rd").fadeOut("fast", function() {
                    $(".s-rd").remove()
                })
            }
        } else {
            if ($(".s-rd").length > 0) {
                $(".s-rd").remove()
            }
        }
    };
    if (localStorage.getItem("hideTodoPanel") == "yes") {
        $(".todo-panel").fadeOut();
        $(".todo-panel").addClass("hide_panel")
    } else {
        $(".todo-panel").fadeIn();
        $(".todo-panel").removeClass("hide_panel")
    }
    if (localStorage.getItem("enable_todo") == "no") {
        $("#lnk_todo").fadeOut();
        $(".todo-panel").fadeOut()
    } else {
        $("#lnk_todo").fadeIn()
    }
    $("#enable_todo").prop("checked", localStorage.getItem("enable_todo") === "yes");
    $("#enable_todo").off("change");
    $("#enable_todo").on("change", function() {
        if (!$("#enable_todo").is(":checked")) {
            localStorage.setItem("enable_todo", "no");
            localStorage.setItem("hideTodoPanel", "yes");
            $("#lnk_todo").fadeOut();
            $(".todo-panel").fadeOut();
            o(true);
            $(".todo-panel").addClass("hide_panel")
        } else {
            localStorage.setItem("enable_todo", "yes");
            localStorage.setItem("hideTodoPanel", "no");
            $("#lnk_todo").fadeIn();
            $(".todo-panel").fadeIn();
            $(".todo-panel").removeClass("hide_panel")
        }
        chrome.runtime.sendMessage({
            syncOptionsNow: true
        });
        utils.storageSync()
    });
    var i = document.querySelector(".todo_list ul");
    $("#newToDo").off("keypress");
    $("#newToDo").on("keypress", function(e) {
        todoList = updateTodoList();
        if (e.which === 13 && $(this).val().length > 0) {
            let e = [];
            todoList.forEach(t => {
                e.push(Number(t.id))
            });
            let o = 1;
            if (e.length > 0) {
                o = Math.max(...e) + 1
            }
            let i = $(this).val().charAt(0).toUpperCase() + $(this).val().slice("1");
            let n = $("<li>");
            n.attr("data-id", o);
            n.html(`<input type="checkbox" id="${o}" class="markDone"><label for="${o}"></label><i class="dl_btn" dl-for="${o}"></i>`);
            n.css({
                display: "none"
            });
            n.append(t(i, o, false));
            $(".todo_list ul").append(n);
            $("#" + o).parent().find("label").text(i);
            n.fadeIn();
            $(this).val("");
            let a = {
                id: o,
                value: i,
                status: "uncheck"
            };
            todoList.push(a);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            chrome.runtime.sendMessage({
                syncOptionsNow: true
            });
            utils.storageSync();
            d()
        }
    });

    function d() {
        $(".markDone").off("change");
        $(".markDone").on("change", function() {
            todoList = updateTodoList();
            let e = $(this).attr("id");
            let i = todoList[0];
            var d = $(this).parent().find(".todo_reminder");
            todoList.forEach((t, o) => {
                if (Number(t.id) === Number(e)) {
                    i = todoList[o]
                }
            });
            if ($(this).is(":checked")) {
                i.status = "checked";
                $(this).next("label").css({
                    "text-decoration": "line-through",
                    opacity: ".5"
                });
                d.fadeOut("fast", function() {
                    d.remove()
                });
                o(true);
                $(".todoAlarm").remove()
            } else {
                i.status = "uncheck";
                $(this).next("label").css({
                    "text-decoration": "unset",
                    opacity: "1"
                });
                $(this).parents("li").append(t(i.value, i.id, i.reminder))
            }
            localStorage.setItem("todoList", JSON.stringify(todoList));
            chrome.runtime.sendMessage({
                syncOptionsNow: true
            });
            utils.storageSync()
        });
        $(".dl_btn").off("click");
        $(".dl_btn").on("click", function(e) {
            todoList = updateTodoList();
            e.stopPropagation();
            let t = $(this).attr("dl-for");
            todoList.forEach((e, o) => {
                if (Number(e.id) === Number(t)) {
                    todoList.splice(o, 1)
                }
            });
            o(true);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            chrome.runtime.sendMessage({
                syncOptionsNow: true
            });
            utils.storageSync();
            $(this).parent().fadeOut(function() {
                $(this).remove()
            });
            $(".todoAlarm").remove()
        })
    }
    $("#lnk_todo, #hide_todoPanel").off("click");
    $("#lnk_todo, #hide_todoPanel").on("click", function() {
        todoList = updateTodoList();
        var e = localStorage.getItem("hideTodoPanel");
        if (e === "no") {
            e = "yes";
            $(".todo-panel").fadeOut();
            o(true)
        } else {
            e = "no";
            $(".todo-panel").fadeIn(function() {
                $("#newToDo").focus()
            })
        }
        $(".todo-panel").toggleClass("hide_panel");
        localStorage.setItem("hideTodoPanel", e);
        chrome.runtime.sendMessage({
            syncOptionsNow: true
        });
        utils.storageSync()
    })
};
window.reminder = function() {
    var e = (new Date).getTime();
    if (localStorage.getItem("latency")) {
        e += Number(localStorage.getItem("latency"))
    }
    var t = [];
    if (localStorage.getItem("todoList")) {
        t = JSON.parse(localStorage.getItem("todoList"))
    }
    for (var o = 0; o < t.length; o++) {
        var i = t[o];
        var d = null;
        if (i.reminder) {
            d = Number(new Date(i.reminder));
            if (e >= d && i.status !== "checked") {
                makeAnAlarm(i, o)
            }
        }
    }
};
var makeAnAlarm = function(e, t) {
    if ($(".todoAlarm").length <= 0) {
        todoList = updateTodoList();
        var o = $("<DIV>", {
            class: "todoAlarm",
            "data-id": e.id
        });
        o.html(`<div class="blur flex_alignCenter">\n      <audio loop autoplay style="display:none;">\n        <source src="${utils.getExtensionURL("/html/skin/audio/notification.wav")}" type="audio/wav" />\n      </audio>\n      <div class="td-c-t flex_alignCenter">\n          <p><strong>Remember:</strong><br />${e.value}</p>\n      </div>\n      <div class="td-controller flex_alignCenter">\n        <div class="td-close flex_alignCenter">Close</div>\n        <div class="td-snooze flex_alignCenter">Snooze</div>\n      </div>\n    </div>`);
        $("body").append(o);
        o.css({
            height: $(".td-c-t p")[0].scrollHeight + 25
        });
        setTimeout(function() {
            o.css({
                right: "10px"
            })
        }, 300);
        $(".td-close").off("click").on("click", function(o) {
            todoList = updateTodoList();
            $(`#${e.id}`).prop("checked", true);
            $(`#${e.id}`).next("label").css({
                "text-decoration": "line-through",
                opacity: ".5"
            });
            $(".todoAlarm").remove();
            delete todoList[t].reminder;
            todoList[t].status = "checked";
            localStorage.setItem("todoList", JSON.stringify(todoList));
            chrome.runtime.sendMessage({
                syncOptionsNow: true
            })
        });
        $(".td-snooze").off("click").on("click", function(e) {
            todoList = updateTodoList();
            var o = (new Date).getTime();
            if (localStorage.getItem("latency")) {
                o += Number(localStorage.getItem("latency"))
            }
            todoList[t].reminder = new Date(o + 6e5).toDateInputValue();
            localStorage.setItem("todoList", JSON.stringify(todoList));
            chrome.runtime.sendMessage({
                syncOptionsNow: true
            });
            $(".todoAlarm").remove()
        })
    }
};
var updateTodoList = function() {
    if (localStorage.getItem("todoList")) {
        return JSON.parse(localStorage.getItem("todoList"))
    }
};