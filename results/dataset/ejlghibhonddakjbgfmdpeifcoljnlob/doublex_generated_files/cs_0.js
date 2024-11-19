// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ejlghibhonddakjbgfmdpeifcoljnlob/src/inject/js/fglobal.js

var myUtm = '&utm_medium=soigiaext8';
var myAtId = '4784149906392981558';
var myCookieExpireSecond = 10*60; // 5 pht: 5*60
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
            "name": "Remove aff_sid trng hp 1",
            "reg": /&aff_sid\=(.*?)&/
        },
        {
            "name": "Remove aff_sid trng hp 2",
            "reg": /\?aff_sid\=(.*?)&/
        },
        {
            "name": "Remove aff_sid trng hp 3",
            "reg": /&aff_sid\=(.*)/
        },
        {
            "name": "Remove aff_sid trng hp 4",
            "reg": /\?aff_sid\=(.*)/
        },

        {
            "name": "Remove aff_sub trng hp 1",
            "reg": /&aff_sub\=(.*?)&/
        },
        {
            "name": "Remove aff_sub trng hp 2",
            "reg": /\?aff_sub\=(.*?)&/
        },
        {
            "name": "Remove aff_sub trng hp 3",
            "reg": /&aff_sub\=(.*)/
        },
        {
            "name": "Remove aff_sub trng hp 4",
            "reg": /\?aff_sub\=(.*)/
        },

        {
            "name": "Remove source trng hp 1",
            "reg": /&source\=(.*?)&/
        },
        {
            "name": "Remove source trng hp 2",
            "reg": /\?source\=(.*?)&/
        },
        {
            "name": "Remove source trng hp 3",
            "reg": /&source\=(.*)/
        },
        {
            "name": "Remove source trng hp 4",
            "reg": /\?source\=(.*)/
        },

        {
            "name": "Remove utm_source trng hp 1",
            "reg": /&utm_source\=(.*?)&/
        },
        {
            "name": "Remove utm_source trng hp 2",
            "reg": /\?utm_source\=(.*?)&/
        },
        {
            "name": "Remove utm_source trng hp 3",
            "reg": /&utm_source\=(.*)/
        },
        {
            "name": "Remove utm_source trng hp 4",
            "reg": /\?utm_source\=(.*)/
        },

        {
            "name": "Remove utm_medium trng hp 1",
            "reg": /&utm_medium\=(.*?)&/
        },
        {
            "name": "Remove utm_medium trng hp 2",
            "reg": /\?utm_medium\=(.*?)&/
        },
        {
            "name": "Remove utm_medium trng hp 3",
            "reg": /&utm_medium\=(.*)/
        },
        {
            "name": "Remove utm_medium trng hp 4",
            "reg": /\?utm_medium\=(.*)/
        },

        {
            "name": "Remove utm_campaign trng hp 1",
            "reg": /&utm_campaign\=(.*?)&/
        },
        {
            "name": "Remove utm_campaign trng hp 2",
            "reg": /\?utm_campaign\=(.*?)&/
        },
        {
            "name": "Remove utm_campaign trng hp 3",
            "reg": /&utm_campaign\=(.*)/
        },
        {
            "name": "Remove utm_campaign trng hp 4",
            "reg": /\?utm_campaign\=(.*)/
        },

        {
            "name": "Remove utm_content trng hp 1",
            "reg": /&utm_content\=(.*?)&/
        },
        {
            "name": "Remove utm_content trng hp 2",
            "reg": /\?utm_content\=(.*?)&/
        },
        {
            "name": "Remove utm_content trng hp 3",
            "reg": /&utm_content\=(.*)/
        },
        {
            "name": "Remove utm_content trng hp 4",
            "reg": /\?utm_content\=(.*)/
        },

        {
            "name": "Remove af_siteid trng hp 1",
            "reg": /&af_siteid\=(.*?)&/
        },
        {
            "name": "Remove af_siteid trng hp 2",
            "reg": /\?af_siteid\=(.*?)&/
        },
        {
            "name": "Remove af_siteid trng hp 3",
            "reg": /&af_siteid\=(.*)/
        },
        {
            "name": "Remove af_siteid trng hp 4",
            "reg": /\?af_siteid\=(.*)/
        },

        {
            "name": "Remove af_sub3 trng hp 1",
            "reg": /&af_sub3\=(.*?)&/
        },
        {
            "name": "Remove af_sub3 trng hp 2",
            "reg": /\?af_sub3\=(.*?)&/
        },
        {
            "name": "Remove af_sub3 trng hp 3",
            "reg": /&af_sub3\=(.*)/
        },
        {
            "name": "Remove af_sub3 trng hp 4",
            "reg": /\?af_sub3\=(.*)/
        },

        {
            "name": "Remove utm_term trng hp 1",
            "reg": /&utm_term\=(.*?)&/
        },
        {
            "name": "Remove utm_term trng hp 2",
            "reg": /\?utm_term\=(.*?)&/
        },
        {
            "name": "Remove utm_term trng hp 3",
            "reg": /&utm_term\=(.*)/
        },
        {
            "name": "Remove utm_term trng hp 4",
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

    // Ly link shopee
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
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ejlghibhonddakjbgfmdpeifcoljnlob/src/inject/truycap_landau.js

var soigiaapi_link = "https://soigiav1.giamgiatonghop.com/";
$(document).ready(function() {
    var url = window.location.href;

    if ($('#page-load-1131').length <= 0) {
        $('<div id="page-load-1131" style="display: none !important;"></div>').appendTo("body");
    }
    var params = {
        'url': url
    }
    var url_param = jQuery.param(params);
    var iframe_url = soigiaapi_link + 'pageload?' + url_param;

    $('#page-load-1131').html('<iframe style="display: none !important;" frameborder="0" src="' + iframe_url + '"></iframe>');
}); // END document ready

window.addEventListener("message", function(event) {
    if (event.data.function_name == "addbody") {
        $(event.data.function_params).appendTo("body");
    }

    if (event.data.function_name == "loadcharttiki") {
        loadcharttiki(event.data.function_params);
    }

    if (event.data.function_name == "loadchartshopee") {
        loadchartshopee(event.data.function_params);
    }

    if (event.data.function_name == "loadchartsendo") {
        loadchartsendo(event.data.function_params);
    }
    if (event.data.function_name == "loadchartlazada") {
        loadchartlazada(event.data.function_params);
    }
});

function loadcharttiki(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertAfter(element.insertafter);
                }

                if (element.tiki_api_product !== "") {
                    $.ajax({
                        url: element.tiki_api_product,
                        success: function(result) {

                            var spid = result.current_seller.product_id;
                            var main_id = result.id;
                            var product_name = result.name;
                            var spurl = "https://tiki.vn/" + result.url_path;
                            var thumbnail_url = result.thumbnail_url;
                            var cprice = result.current_seller.price;

                            if (result.configurable_products) {
                                for (let i = 0; i < result.configurable_products.length; i++) {
                                    const element = result.configurable_products[i];
                                    if (element.id == spid) {
                                        thumbnail_url = element.thumbnail_url;
                                        break;
                                    }
                                }
                            }

                            var tikichart_params = {
                                'spid': spid,
                                'main_id': main_id,
                                'product_name': product_name,
                                'spurl': spurl,
                                'thumbnail_url': thumbnail_url,
                                'cprice': cprice,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(tikichart_params);
                            var iframe_url = soigiaapi_link + 'tikichart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}

function loadchartshopee(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertAfter(element.insertafter);
                }

                if (element.shopee_api_product !== "") {
                    $.ajax({
                        url: element.shopee_api_product,
                        success: function(result) {
                            var itemid = result.itemid;
                            var shopid = result.shopid;
                            var cprice = result.price;

                            var shopeechart_params = {
                                'itemid': itemid,
                                'shopid': shopid,
                                'cprice': cprice,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(shopeechart_params);
                            var iframe_url = soigiaapi_link + 'shopeechart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}

function loadchartsendo(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertAfter(element.insertafter);
                }

                if (element.sendo_api_product !== "") {
                    $.ajax({
                        url: element.sendo_api_product,
                        success: function(result) {
                            var admin_id = result.admin_id;
                            var itemid = result.id;
                            var final_price = result.final_price;

                            var sendochart_params = {
                                'admin_id': admin_id,
                                'itemid': itemid,
                                'final_price': final_price,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(sendochart_params);
                            var iframe_url = soigiaapi_link + 'sendochart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}

function loadchartlazada(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lch s gi</div>').insertAfter(element.insertafter);
                }

                if (element.sendo_api_product !== "") {
                    $.ajax({
                        url: element.sendo_api_product,
                        success: function(result) {
                            var itemid = result.id;
                            var shopid = result.shopid;
                            var cprice = result.price;

                            var sendochart_params = {
                                'itemid': itemid,
                                'shopid': shopid,
                                'cprice': cprice,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(sendochart_params);
                            var iframe_url = soigiaapi_link + 'sendochart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}
