$("document").ready(function () {
    $("#year").html(new Date().getFullYear());
    if (localStorage.active == "on") {
        $("#button").attr("data-active", "1");
        $("#switch").css("background", "#55ff55");
        $("#button").css("right", "0");
        $("#stat b").text("ON").css("color", "#009900");
    } else {
        $("#button").attr("data-active", "0");
        $("#button").css("right", "50%");
        $("#switch").css("background", "#ff5555");
        $("#stat b").text("OFF").css("color", "#990000");
    }

    $("#button").click(function () {
        if ($(this).attr("data-active") == "1") {
            $(this).attr("data-active", "0");
            $(this).animate({
                "right": "50%"
            }, 250, function () {
                chrome.browserAction.setIcon({path: '24-off.png'});
                $("#switch").css("background", "#ff5555");
                $("#stat b").text("OFF").css("color", "#990000");
                localStorage.active = "off";
            });
        } else {
            $(this).attr("data-active", "1");
            $(this).animate({
                "right": "0"
            }, 250, function () {
                chrome.browserAction.setIcon({path: '24-on.png'});
                $("#switch").css("background", "#55ff55");
                $("#stat b").text("ON").css("color", "#009900");
                localStorage.active = "on";
            });
        }
    });
});