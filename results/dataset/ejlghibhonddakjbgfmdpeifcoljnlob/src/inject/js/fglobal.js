var myUtm = '&utm_medium=soigiaext8';
var myAtId = '4784149906392981558';
var myCookieExpireSecond = 10*60; // 5 phút: 5*60
var myAtUrl = 'https://fast.accesstrade.com.vn/deep_link/4784149906392981558?url=';

function setCookie(cname, cvalue, ex_in_second) {
    var d = new Date();
    d.setTime(d.getTime() + (ex_in_second * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function neuLaTrang(url, reg) {
    var chuoi = url.match(reg);
    if (chuoi) {
        return true;
    } else {
        return false;
    }
}

function layLinkTatCa(str) {
    // https://shopee.vn/abc-i.78346970.1714828473?utm_campaign=102c2bff79ab2a723965e5bc5e47fb&utm_source=accesstrade&source=accesstrade&utm_medium=affiliate&aff_sub=Xvhgp1fZoR9KPaQVDAyFCOLVVYVYRoqhSsUpQ1RC8TdTwe3J&aff_sid=Xvhgp1fZoR9KPaQVDAyFCOLVVYVYRoqhSsUpQ1RC8TdTwe3J
    // https://www.sendo.vn/usb-32gb-nho-gon-chong-nuoc-bao-hanh-5-nam-loi-1-doi-1-13816469.html
    var reg_array = [{
            "name": "Remove aff_sid trường hợp 1",
            "reg": /&aff_sid\=(.*?)&/
        },
        {
            "name": "Remove aff_sid trường hợp 2",
            "reg": /\?aff_sid\=(.*?)&/
        },
        {
            "name": "Remove aff_sid trường hợp 3",
            "reg": /&aff_sid\=(.*)/
        },
        {
            "name": "Remove aff_sid trường hợp 4",
            "reg": /\?aff_sid\=(.*)/
        },

        {
            "name": "Remove aff_sub trường hợp 1",
            "reg": /&aff_sub\=(.*?)&/
        },
        {
            "name": "Remove aff_sub trường hợp 2",
            "reg": /\?aff_sub\=(.*?)&/
        },
        {
            "name": "Remove aff_sub trường hợp 3",
            "reg": /&aff_sub\=(.*)/
        },
        {
            "name": "Remove aff_sub trường hợp 4",
            "reg": /\?aff_sub\=(.*)/
        },

        {
            "name": "Remove source trường hợp 1",
            "reg": /&source\=(.*?)&/
        },
        {
            "name": "Remove source trường hợp 2",
            "reg": /\?source\=(.*?)&/
        },
        {
            "name": "Remove source trường hợp 3",
            "reg": /&source\=(.*)/
        },
        {
            "name": "Remove source trường hợp 4",
            "reg": /\?source\=(.*)/
        },

        {
            "name": "Remove utm_source trường hợp 1",
            "reg": /&utm_source\=(.*?)&/
        },
        {
            "name": "Remove utm_source trường hợp 2",
            "reg": /\?utm_source\=(.*?)&/
        },
        {
            "name": "Remove utm_source trường hợp 3",
            "reg": /&utm_source\=(.*)/
        },
        {
            "name": "Remove utm_source trường hợp 4",
            "reg": /\?utm_source\=(.*)/
        },

        {
            "name": "Remove utm_medium trường hợp 1",
            "reg": /&utm_medium\=(.*?)&/
        },
        {
            "name": "Remove utm_medium trường hợp 2",
            "reg": /\?utm_medium\=(.*?)&/
        },
        {
            "name": "Remove utm_medium trường hợp 3",
            "reg": /&utm_medium\=(.*)/
        },
        {
            "name": "Remove utm_medium trường hợp 4",
            "reg": /\?utm_medium\=(.*)/
        },

        {
            "name": "Remove utm_campaign trường hợp 1",
            "reg": /&utm_campaign\=(.*?)&/
        },
        {
            "name": "Remove utm_campaign trường hợp 2",
            "reg": /\?utm_campaign\=(.*?)&/
        },
        {
            "name": "Remove utm_campaign trường hợp 3",
            "reg": /&utm_campaign\=(.*)/
        },
        {
            "name": "Remove utm_campaign trường hợp 4",
            "reg": /\?utm_campaign\=(.*)/
        },

        {
            "name": "Remove utm_content trường hợp 1",
            "reg": /&utm_content\=(.*?)&/
        },
        {
            "name": "Remove utm_content trường hợp 2",
            "reg": /\?utm_content\=(.*?)&/
        },
        {
            "name": "Remove utm_content trường hợp 3",
            "reg": /&utm_content\=(.*)/
        },
        {
            "name": "Remove utm_content trường hợp 4",
            "reg": /\?utm_content\=(.*)/
        },

        {
            "name": "Remove af_siteid trường hợp 1",
            "reg": /&af_siteid\=(.*?)&/
        },
        {
            "name": "Remove af_siteid trường hợp 2",
            "reg": /\?af_siteid\=(.*?)&/
        },
        {
            "name": "Remove af_siteid trường hợp 3",
            "reg": /&af_siteid\=(.*)/
        },
        {
            "name": "Remove af_siteid trường hợp 4",
            "reg": /\?af_siteid\=(.*)/
        },

        {
            "name": "Remove af_sub3 trường hợp 1",
            "reg": /&af_sub3\=(.*?)&/
        },
        {
            "name": "Remove af_sub3 trường hợp 2",
            "reg": /\?af_sub3\=(.*?)&/
        },
        {
            "name": "Remove af_sub3 trường hợp 3",
            "reg": /&af_sub3\=(.*)/
        },
        {
            "name": "Remove af_sub3 trường hợp 4",
            "reg": /\?af_sub3\=(.*)/
        },

        {
            "name": "Remove utm_term trường hợp 1",
            "reg": /&utm_term\=(.*?)&/
        },
        {
            "name": "Remove utm_term trường hợp 2",
            "reg": /\?utm_term\=(.*?)&/
        },
        {
            "name": "Remove utm_term trường hợp 3",
            "reg": /&utm_term\=(.*)/
        },
        {
            "name": "Remove utm_term trường hợp 4",
            "reg": /\?utm_term\=(.*)/
        }
    ];
    // https://shopee.vn/Gel-ch%E1%BB%91ng-n%E1%BA%AFng-b%E1%BA%A3o-v%E1%BB%87-ho%C3%A0n-h%E1%BA%A3o-Anessa-Perfect-UV-Sunscreen-Skincare-Gel-90g_14585-i.58411241.2029406216?deep_and_deferred=1&pid=partnerize_int&af_click_lookback=7d&is_retargeting=true&af_reengagement_window=7d&af_installpostback=false&af_sub3=4784157124127214188&af_sub4=zOdOIoDyn0z8Kir4qXJSc6zn3D3uFN7PUiFP1JSkbt4J1GGm&af_sub2=SHOPEE&clickid=1101l6GzXZ3v&af_siteid=1101l66717&utm_term=4784157124127214188&utm_source=1101l66717&utm_medium=affiliates&utm_content=zOdOIoDyn0z8Kir4qXJSc6zn3D3uFN7PUiFP1JSkbt4J1GGm
    // https://go.isclix.com/deep_link/4784149906392981558?url=https%3A%2F%2Fwww.lazada.vn%2F-i298304285-s477602277.html&utm_source=ms
    // https://fast.accesstrade.com.vn/deep_link/4784149906392981558?url=https%3A%2F%2Fwww.lazada.vn%2F-i298304285-s477602277.html&utm_source=ms
    // https://www.lazada.vn/products/quan-ao-nam-phat-tu-do-lam-phat-di-chua-mau-n01-i298304285-s477602277.html?laz_trackid=2:mm_150211360_51503094_2010503090:clk5h31dm1dt8do4fh4cms
    var str_tam = str;
    var delme = null;
    var i;
    for (i = 0; i < reg_array.length; i++) {
        delme = str_tam.match(reg_array[i].reg);
        if (delme) {
            delme = delme[0] + '';
            delme = delme.replace('?', '');
            if (delme[delme.length - 1] == '&') {
                delme = delme.substring(0, delme.length - 1);
            }
            str_tam = str_tam.replace(delme, "");
        }
    }

    // remove if last char is ?
    str_tam = str_tam + '';
    if (str_tam[str_tam.length - 1] == '?') {
        str_tam = str_tam.substring(0, str_tam.length - 1);
    }

    // Lấy link shopee
    var my_reg_array = [
        {
            "name": "Shopee",
            "reg": /shopee\.vn\/.+?-i\.\d+?\.\d+/
        },
        {
            "name": "Lazada",
            "reg": /lazada\.vn\/.+?-i\d+?-s\d+\.html/
        }
    ];
    var chuoi = null;
    for (i = 0; i < my_reg_array.length; i++) {
        chuoi = str_tam.match(my_reg_array[i].reg);
        if (chuoi) {
            str_tam = chuoi[0] + '';
        }
    }

    str_tam = str_tam.replace("lazada.vn/", "https://www.lazada.vn/");
    str_tam = str_tam.replace("shopee.vn/", "https://shopee.vn/");

    return str_tam;
}