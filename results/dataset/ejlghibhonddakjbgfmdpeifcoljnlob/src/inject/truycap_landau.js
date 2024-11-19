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
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
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
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
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
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
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
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
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