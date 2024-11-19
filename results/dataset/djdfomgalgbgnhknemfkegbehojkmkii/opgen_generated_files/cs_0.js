// original file:crx_headers/jquery_header.js

//  ========= window ========= 

// targetWindow.postMessage(message, targetOrigin, [transfer]);
window.postMessage = function(message, targetOrigin, [transfer]){
    sink_function(message, 'window_postMessage_sink out');
};

// target.addEventListener(type, listener [, options]);
// the 'e' parameter passed to listener can be ignored, otherwise, it is the event object
window.addEventListener = function(type, listener,  [options]){
    if (type=='message'){
        MarkAttackEntry('cs_window_eventListener', listener);
    }
    else if(type=='load'){
        listener();
    }
};


window.top = new Object();
window.top.addEventListener = window.addEventListener;

window.localStorage = new Object();
window.localStorage.removeItem = function(a){

};

window.localStorage.setItem = function(a, b){

};

window.localStorage.getItem = function(a, b){

};

window.frames[0] = window;
window.frames[1] = window;

//  ========= the document and its elements are all objects ========= 

function Document_element(id, class_name, tag){
    this.id = id;
    this.class_name = class_name;
    this.tag = tag;
}
Document_element.prototype.contentWindow = new Window();
Document_element.prototype.createElement = function(tagname){
    var de = new Document_element(undefined, undefined, tagname);
    return de;
}



function Document(){}

Document.prototype.body = new Object();

Document.prototype.getElementById = function(id){
    var document_element = new Document_element(id);
};

Document.prototype.body.appendChild = function(){};


Document.prototype.addEventListener = function(type, listener,  [ options]){
    // var type = 'document_event_listener';
    MarkAttackEntry('document_event_listener', listener);
};

document = new Document();


//  ========= JQuery ========= 
// $(this).hide() - hides the current element.
// $("p").hide() - hides all <p> elements.
// $(".test").hide() - hides all elements with class="test".
// $("#test").hide() - hides the element with id="test".
function $(a){
    // find element a in document
    // if a is an Array
    if (Array.isArray(a)){
        var array_in = a;
        a = undefined;
    }
    else{
        // $("#test")
        if (a[0] == '#'){
            var document_element = new Document_element(a.substring(1,));
            // document.push(document_element);
            // document[a] = document_element;
        }
        // $(".test")
        else if(a[0] == '.'){
            var document_element = new Document_element(undefined, a.substring(1,));
            // document.push(document_element);
        }
        // document
        else if (a == document){
            var document_element = document;
        }
        // $("p")
        else{
            var document_element = new Document_element(undefined, undefined,a.substring(1,));
            // document.push(document_element);
        }
        var array_in = [document_element];
    }
    return new JQ_obj(a, array_in);
};



// jqXHR
$.ajax = function(para){
    if (para.url){
        sink_function(para.url, 'jQuery_ajax_url_sink');
    }
    if (para.success){
        var jQuery_ajax_result_source = 'data_form_jq_ajax';
        MarkSource(jQuery_ajax_result_source, 'jQuery_ajax_result_source');
        para.success(jQuery_ajax_result_source);
    }
}
// jQuery.get( url [, data ] [, success ] [, dataType ] )
// data: Type: PlainObject or String
// success: Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
// dataType: Type: String
$.get = function(url , success){
    var responseText = 'data_from_url_by_get';
    MarkSource(responseText, 'jQuery_get_source');
    sink_function(url, 'jQuery_get_url_sink');
    success(responseText);
    return new jqXHR();
}
// jQuery.post( url [, data ] [, success ] [, dataType ] )
$.post = function( url , data, success){
    var responseText = 'data_from_url_by_post';
    MarkSource(responseText, 'jQuery_post_source');
    sink_function(data, 'jQuery_post_data_sink');
    sink_function(url, 'jQuery_post_url_sink');
    success(responseText);
    return new jqXHR();
}


jQuery = $;

jqXHR = function(){

}
// jqXHR.fail(function( jqXHR, textStatus, errorThrown ) {});
jqXHR.prototype.fail = function(callback){
    // do nothing
    return this;
}
// jqXHR.done(function( data, textStatus, jqXHR ) {});
// done == success
jqXHR.prototype.done = function(callback){
    callback();
    return this;
}
// jqXHR.always(function( data|jqXHR, textStatus, jqXHR|errorThrown ) {});
jqXHR.prototype.always = function(callback){
    callback();
    return this;
}

JQ_obj = function(a, array_in){
    this.selector = a;
    this.context = document;
    var i=0;
    for (i=0; i<array_in.length; i++){
        this[i] = array_in[i];
    }
    this.length = array_in.length;
}

// events [,selector] [,data], handler
JQ_obj.prototype.on = function(){
    if (this[0]==document){
        MarkAttackEntry('document_on_event', arguments[-1]);
    }  
}

JQ_obj.prototype.val = function(first_argument) {
    if (first_argument!=undefined){
        sink_function(first_argument, 'JQ_obj_val_sink');
        this[0].value = first_argument;
    }
    else{
        // return value of x
    }
};

JQ_obj.prototype.html = function(first_argument) {
    if (arguments.length >0){
        sink_function(first_argument, 'JQ_obj_html_sink');
        this[0].html = first_argument;
    }
    else{
        // return html of x
    }
};

JQ_obj.prototype.ready = function(first_argument) {
    if (this[0]==document){
        first_argument();
    }  
};

JQ_obj.prototype.remove = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.focus = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.click = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.attr = function(first_argument, second_argument) {
    this[0].first_argument = second_argument;
};

JQ_obj.prototype.find = function(first_argument) {
    var document_element = new Document_element();
    return new JQ_obj(undefined, document_element);
};

JQ_obj.prototype.filter = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.keyup = function(first_argument) {
    first_argument();
};

JQ_obj.prototype.each = function(first_argument) {
    // for (var i=0; i<this.length; i++){
    //     first_argument.call(this[i]);
    // }
    first_argument.call(this[0]);
};


// jQuery.extend( target, object1 [, objectN ] )
$.extend = function(obj1, obj2){
    for (var key in obj2){
        obj1[key] = obj2[key];
    }
}

// jQuery.extend( [deep ], target, object1 [, objectN ] ) deep copy

//  ========= Event ========= 
function Event(type){
    this.type = type;
}


// =========XMLHttpRequest======
function XMLHttpRequest(){};

XMLHttpRequest.prototype.open = function(method, url, async, user, psw){
    sink_function(url, 'XMLHttpRequest_url_sink');
};

// if msg is not none, used for POST requests
XMLHttpRequest.prototype.send = function(msg){
    if (msg!=undefined){
        sink_function(msg, 'XMLHttpRequest_post_sink');
    }
};


XMLHttpRequest.prototype.responseText = 'sensitive_responseText';
XMLHttpRequest.prototype.responseXML = 'sensitive_responseXML';
MarkSource(XMLHttpRequest.prototype.responseText, 'XMLHttpRequest_responseText_source');
MarkSource(XMLHttpRequest.prototype.responseXML, 'XMLHttpRequest_responseXML_source');




function eval(para1){
    sink_function(para1, 'eval_sink');
}





// original file:crx_headers/cs_header.js

//  ========= port ========= 
function Port(info){
    if (info.includeTlsChannelId){
        this.includeTlsChannelId = info.includeTlsChannelId;
    }
    if (info.name){
        this.name = info.name;
    }
}

Port.prototype.onMessage = new Object();


Port.prototype.onMessage.addListener = function(content_myCallback){
        RegisterFunc("cs_port_onMessage", content_myCallback);
};

Port.prototype.postMessage = function(msg){
        // var eventName = 'cs_port_postMessage';
        // var info =  {message:msg};
        TriggerEvent('cs_port_postMessage', {message:msg});
};


//  ========= chrome ========= 
function Chrome(){}

Chrome.prototype.runtime = new Object();

Chrome.prototype.runtime.sendMessage = function(msg, rspCallback){
    // var eventName = 'cs_chrome_runtime_sendMessage';
    // var info = {message: msg,responseCallback: rspCallback};
    TriggerEvent('cs_chrome_runtime_sendMessage', {message: msg,responseCallback: rspCallback});
};

Chrome.prototype.runtime.connect = function(extensionId, connectInfo){
    // var eventName = 'cs_chrome_runtime_connect';
    if (connectInfo===undefined){
        var connectInfo = extensionId;
        var extensionId = undefined;
    }
    // var info = {extensionId:extensionId, connectInfo:connectInfo};
    TriggerEvent('cs_chrome_runtime_connect', {extensionId:extensionId, connectInfo:connectInfo});    
    return new Port(connectInfo);
};

Chrome.prototype.runtime.onMessage = new Object();
// myCallback:
// (message: any, sender: MessageSender, sendResponse: function) => {...}
// get message from chrome.runtime.sendMessage or chrome.tabs.sendMessage
Chrome.prototype.runtime.onMessage.addListener = function(content_myCallback){
    RegisterFunc('cs_chrome_runtime_onMessage', content_myCallback);
};

MessageSender = function(){
    this.frameId = 123;
    this.guestProcessId=456;
    this.guestRenderFrameRoutingId = 109;
    this.id = 1;
    this.nativeApplication = 'nativeApplication';
    this.origin = 'content';
    this.tab = {id:99};
    this.tlsChannelId = 'tlsChannelId';
    this.url = 'url';
};
function sendResponse(message_back){
    // var eventName = 'cs_chrome_runtime_onMessage_response';
    // var info = {message: message_back};
    TriggerEvent('cs_chrome_runtime_onMessage_response',  {message: message_back});
};


Chrome.prototype.runtime.getURL = function(para1){
    return "http://www.example.com/" + para;
}

// for deprecated APIs
Chrome.prototype.extension = Chrome.prototype.runtime;  
Chrome.prototype.extension.sendRequest = Chrome.prototype.runtime.sendMessage;


// // chrome.runtime.sendMessage(extensionId?: string, message: any, options: object, responseCallback: function)
// Chrome.prototype.runtime.sendMessage = function(extensionId, message, options, responseCallback){
//     var eventName = 'cs_chrome_runtime_sendMessage';
//     if(arguments.length == 2){
//         var info = {message: arguments[0],responseCallback: arguments[1]};
//     }
//     else if (arguments.length == 4){
//         var info = {extensionId: extensionId, message: message, options: options, responseCallback: responseCallback};
//     }
//     else if(arguments.length == 3){
//         if (arguments[1].includeTlsChannelId!=undefined){
//             var info = {message: arguments[0], options: arguments[1], responseCallback: arguments[2]};
//         }
//         else if (arguments[0]==String(arguments[0])){
//             var info = {extensionId: arguments[0], message: arguments[1], responseCallback: arguments[2]};
//         }
//     }
//     TriggerEvent(eventName, info);
// };


Chrome.prototype.storage = new Object();
Chrome.prototype.storage.sync = new Object();
Chrome.prototype.storage.sync.get = function(key, callback){
    var storage_sync_get_source = {'key':'value'};
    MarkSource(storage_sync_get_source, 'storage_sync_get_source');
    callback(storage_sync_get_source);
};

Chrome.prototype.storage.sync.set = function(key, callback){
    sink_function(key, 'chrome_storage_sync_set_sink');
    callback();
};

Chrome.prototype.storage.sync.remove = function(key, callback){
    sink_function(key, 'chrome_storage_sync_remove_sink');
    callback();
};

Chrome.prototype.storage.sync.clear = function(callback){
    sink_function('chrome_storage_sync_clear_sink');
    callback();
};


Chrome.prototype.storage.local = new Object();
Chrome.prototype.storage.local.get = function(key, callback){
    var storage_local_get_source = {'key':'value'};
    MarkSource(storage_local_get_source, 'storage_local_get_source');
    callback(storage_local_get_source);
};

Chrome.prototype.storage.local.set = function(key, callback){
    sink_function(key,'chrome_storage_local_set_sink');
    callback();
};

Chrome.prototype.storage.local.remove = function(key, callback){
    sink_function(key, 'chrome_storage_local_remove_sink');
    callback();
};

Chrome.prototype.storage.local.clear = function(callback){
    sink_function('chrome_storage_local_clear_sink');
    callback();
};

chrome = new Chrome();





// ========= location ========= 
location = new Object();
location.href = 'http://www.example.com/search?q=q&oq=oq&chrome=chrome&sourceid=sourceid&ie=UTF-8';





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/djdfomgalgbgnhknemfkegbehojkmkii/content.js

'use strict';

var base_url = 'https://platform.drivably.com';

var drivably = {
  url: null,
  timer: null,
  vin: null,
  vehicle: null,
  buy_price: null,
  mileage: 0,
  transportation: null,

  checkVin: function(){
    drivably.vin = drivably.getRules();
    drivably.mileage = Number.isInteger(Number(drivably.mileage)) ? drivably.mileage : 0;

    if(drivably.vin){
      clearInterval(drivably.timer);
      drivably.timer = false;

      chrome.storage.sync.get(['access_token'], function(result) {
        if(result.access_token){
          chrome.runtime.sendMessage({contentScriptQuery: 'queryVin', token: result.access_token, vin: drivably.vin, mileage: drivably.mileage}, response => drivably.drawModal(response));
        } else {
          drivably.handleError('Unauthenticated user', '');
        }
      });
    }
  },
  drawBlock: function(styleBlock, styleModal = null){
    return '<div id="vin-block" style="'+styleBlock+'"><button id="vin-btn">Loading ...</button><div id="vin-modal" style="'+styleModal+'"></div></div>';
  },
  drawSelectDetails: function(data){
    var select_details = '';

    for(var item in data){
      select_details += '<option value="'+item+'">'+data[item].style+' '+data[item].series+'</option>'
    }

    return select_details;
  },
  drawSelectValuations: function(data){
    var select_valuations = '';

    for(var item in data){
      select_valuations += '<option value="'+item+'">'+data[item].trim+'</option>'
    }

    return select_valuations;
  },
  drawSelectLists: function(data){
    var select_lists = '<option value="" disabled selected>Select a list</option>';

    for(var item in data){
      select_lists += '<option value="'+data[item].id+'">'+data[item].name+'</option>'
    }

    return select_lists;
  },
  drawOptions: function(data){
    var options = '';

    for(var item in data){
      if(data[item].checked){
        options += '<li><label><input type="checkbox" value="'+item+'" class="check-optional" checked> '+data[item].name+'<span>'+drivably.currencyConvert(data[item].avg)+'</span></label></li>';
      } else {
        options += '<li><label><input type="checkbox" value="'+item+'" class="check-optional"> '+data[item].name+'<span>'+drivably.currencyConvert(data[item].avg)+'</label></li>';
      }
    }

    return options;
  },
  drawCarfax: function(data){
    var html = '';

    if(data.carfax_status){
      html = '<img src="'+chrome.runtime.getURL("images/carfax.png")+'" data-vin="'+data.vin+'" data-partner="'+data.carfax_partner_code+'" data-key="'+data.carfax_hash+'" data-username="'+data.carfax_username+'" class="carfax-dealer-snapshot-hover" />'+
      '<script type="text/javascript" src="https://snapshot.carfax.com/latest/dealer-snapshot.js"></script>';
    }

    return html;
  },
  refreshDetails: function(){
    var detail = drivably.vehicle.details[drivably.vehicle.selected_index_detail];
    var options = drivably.drawOptions(drivably.vehicle.details[drivably.vehicle.selected_index_detail].options);

    $('#vehicle-image').attr('src', drivably.verifyImage(detail.vehicle_image));
    $('#vehicle-price').text(drivably.currencyConvert(detail.base_retail_avg));
    $('#base-whole-xclean').text(drivably.currencyConvert(detail.base_whole_xclean));
    $('#base-whole-clean').text(drivably.currencyConvert(detail.base_whole_clean));
    $('#base-whole-avg').text(drivably.currencyConvert(detail.base_whole_avg));
    $('#base-whole-rough').text(drivably.currencyConvert(detail.base_whole_rough));
    $('#median-mileage').text(drivably.verifyEmpty(detail.mileage_retail_avg));
    $('#median-price').text(drivably.currencyConvert(detail.base_retail_avg));
    $('#market-days-supply').text(drivably.verifyEmpty(detail.market_days_supply));
    $('#mean-days-to-turn').text(drivably.verifyEmpty(detail.mean_days_to_turn));
    $('#general-score').text(drivably.verifyEmpty(detail.general_score).toUpperCase()).attr('class', 'score-'+detail.general_score);
    $('#market-days-supply-score').text(drivably.verifyEmpty(detail.market_days_supply_score).toUpperCase()).attr('class', 'score-'+detail.market_days_supply_score);
    $('#price-segment-score').text(drivably.verifyEmpty(detail.price_segment_score).toUpperCase()).attr('class', 'score-'+detail.price_segment_score);
    $('#list-options').html(options);
  },
  refreshValuations: function(){
    var valuation = drivably.vehicle.valuations[drivably.vehicle.selected_index_valuation];

    $('#valuation-ne').text(drivably.currencyConvert(valuation.ne));
    $('#valuation-sw').text(drivably.currencyConvert(valuation.sw));
    $('#valuation-wc').text(drivably.currencyConvert(valuation.wc));
    $('#valuation-mw').text(drivably.currencyConvert(valuation.mw));
    $('#valuation-se').text(drivably.currencyConvert(valuation.se));
  },
  refreshProfitsAndSpreads: function(){
    var retail_profit = drivably.buy_price ? drivably.calculeRetailProfit(drivably.buy_price) : 0;
    var whole_profit = drivably.buy_price ? drivably.calculeWholesaleProfit(drivably.buy_price) : 0;
    var retail_spread = drivably.buy_price ? drivably.calculeRetailSpread(drivably.buy_price) : 0;
    var whole_spread = drivably.buy_price ? drivably.calculeWholesaleSpread(drivably.buy_price) : 0;

    $('#retail-profit').text(retail_profit);
    $('#wholesale-profit').text(whole_profit);
    $('#retail-spread').text(retail_spread);
    $('#wholesale-spread').text(whole_spread);
  },
  drawModal: function(response){
    if(response.vehicle){
      var vehicleList = response.vehicleList;
      var vehicle = response.vehicle;
      var detail = vehicle.details[vehicle.selected_index_detail];
      // var valuation = vehicle.valuations[vehicle.selected_index_valuation];
      var options = drivably.drawOptions(vehicle.details[vehicle.selected_index_detail].options);
      var select_details = drivably.drawSelectDetails(vehicle.details);
      var select_valuations = drivably.drawSelectValuations(vehicle.valuations);
      var select_lists = drivably.drawSelectLists(vehicleList);
      var carfax = drivably.drawCarfax(vehicle);

      drivably.vehicle = vehicle;

      var modal =
        '<div id="vin-modal-body">'+
          '<div class="detail">'+
            '<div class="photo">'+
              '<img id="vehicle-image" src="'+drivably.verifyImage(detail.vehicle_image)+'">'+
            '</div>'+
            '<h3>'+drivably.verifyEmpty(vehicle.model_year)+' '+drivably.verifyEmpty(vehicle.make)+' '+drivably.verifyEmpty(vehicle.model)+
              '<span id="vehicle-price">'+drivably.currencyConvert(detail.base_retail_avg)+'</span>'+
              '<p>Transportation cost: '+drivably.currencyConvert(drivably.transportation)+'</p>'+carfax+
            '</h3>'+
          '</div>'+
          // '<div class="filters">'+
          //   '<select id="select-detail">'+select_details+'</select>'+
          //   '<select id="select-valuation">'+select_valuations+'</select>'+
          // '</div>'+
          '<ul class="list">'+
            '<li><h4>Wholesale Values</h4></li>'+
            '<li><p>Extra clean <span id="base-whole-xclean">'+drivably.currencyConvert(detail.base_whole_xclean)+'</span></p></li>'+
            '<li><p>Clean <span id="base-whole-clean">'+drivably.currencyConvert(detail.base_whole_clean)+'</span></p></li>'+
            '<li><p>Average <span id="base-whole-avg">'+drivably.currencyConvert(detail.base_whole_avg)+'</span></p></li>'+
            '<li><p>Rough <span id="base-whole-rough">'+drivably.currencyConvert(detail.base_whole_rough)+'</span></p></li>'+
          '</ul>'+
          '<ul class="list">'+
            '<li><h4>Retail Statistics</h4></li>'+
            '<li><p>Median Mileage <span id="median-mileage">'+drivably.verifyEmpty(detail.mileage_retail_avg)+'</span></p></li>'+
            '<li><p>Median Price <span id="median-price">'+drivably.currencyConvert(detail.base_retail_avg)+'</span></p></li>'+
            '<li><p>Market Day Supply <span id="market-days-supply">'+drivably.verifyEmpty(detail.market_days_supply)+'</span></p></li>'+
            '<li><p>Days to Turn <span id="mean-days-to-turn">'+drivably.verifyEmpty(detail.mean_days_to_turn)+'</span></p></li>'+
          '</ul>'+
          // '<ul class="list">'+
          //   '<li><h4>MMR Values</h4></li>'+
          //   '<li><p>Northeast <span id="valuation-ne">'+drivably.currencyConvert(valuation.ne)+'</span></p></li>'+
          //   '<li><p>Southwest <span id="valuation-sw">'+drivably.currencyConvert(valuation.sw)+'</span></p></li>'+
          //   '<li><p>West Coast <span id="valuation-wc">'+drivably.currencyConvert(valuation.wc)+'</span></p></li>'+
          //   '<li><p>Midwest <span id="valuation-mw">'+drivably.currencyConvert(valuation.mw)+'</span></p></li>'+
          //   '<li><p>Southeast <span id="valuation-se">'+drivably.currencyConvert(valuation.se)+'</span></p></li>'+
          // '</ul>'+
          '<div class="options">'+
          '<h4>Options</h4>'+
          '<ul id="list-options">'+options+'</ul>'+
          '</div>'+
          '<ul class="list-score">'+
            '<li><p>Score</p> <span class="score-'+detail.general_score+'" id="general-score">'+drivably.verifyEmpty(detail.general_score).toUpperCase()+'</span></li>'+
            '<li><p>Market Days Supply</p> <span class="score-'+detail.market_days_supply_score+'" id="market-days-supply-score">'+drivably.verifyEmpty(detail.market_days_supply_score).toUpperCase()+'</span></li>'+
            '<li><p>Price Segment</p> <span class="score-'+detail.price_segment_score+'" id="price-segment-score">'+drivably.verifyEmpty(detail.price_segment_score).toUpperCase()+'</span></li>'+
          '</ul>'+
          '<div class="input-group">'+
            '<label>Buy price:</label>'+
            '<input id="buy-price" placeholder="Buy price" />'+
            '<label>Mileage:</label>'+
            '<input id="mileage" placeholder="Mileage" value="'+drivably.mileage+'" />'+
          '</div>'+
          '<div class="btn-group">'+
            '<ul>'+
              '<li><p>Retail Profit %: <span id="retail-profit">0</span></p></li>'+
              '<li><p>Wholesale Profit %: <span id="wholesale-profit">0</span></p></li>'+
              '<li><p>Retail Spread: <span id="retail-spread">$</span></p></li>'+
              '<li><p>Wholesale Spread: <span id="wholesale-spread">$</span></p></li>'+
            '</ul>'+
          '</div>'+
          '<div class="list-group">'+
            '<label>List:</label>'+
            '<select id="list-vehicles">'+select_lists+'</select>'+
            '<button id="save-vehicle">Add to list</button>'+
            '<p id="msg"><p>'+
          '</div>'+
        '</div>';

      $('#vin-btn').text('Drivably VIN');
      $('#vin-modal').append(modal);
    } else {
      drivably.handleError(response.message, response.all_message);
    }
  },
  saveVehicle: function(){
    var list = $('#list-vehicles').val();
    var buy_price = $('#buy-price').val();
    var mileage = $('#mileage').val();

    $('#msg').text('Loading...');

    chrome.storage.sync.get(['access_token'], function(result) {
      chrome.runtime.sendMessage({contentScriptQuery: 'querySaveVehicle', token: result.access_token, vehicle: drivably.vehicle, list: list, buy_price:buy_price, mileage:mileage}, response => drivably.saveVehicleResponse(response));
    });
  },
  saveVehicleResponse: function(response){
    $('#msg').text(response.message);
  },
  handleError: function(message, all_message){
    $('#vin-btn').text('Drivably VIN');

    if(all_message){
      var modal =
        '<div id="vin-modal-body" class="error-modal">'+
          '<div class="header">'+
          '<img src="'+chrome.runtime.getURL("images/logo_white.png")+'" id="logo" />'+
          '</div>'+
          '<h2>'+message+'</h2>'+
          '<p>'+all_message+'</p>'+
          '<a href="'+base_url+'">Upgrate your plan</a>'+
        '</div>';

        $('#vin-modal').append(modal);
    } else {
      $('#vin-block').append('<p class="error">'+message+'</p>');
    }

  },
  currencyConvert : function(value) {
    return value ? '$'+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A';
  },
  verifyEmpty: function(value){
    return value ? value : 'N/A';
  },
  verifyImage: function(image){
    return image ? 'data:image/png;base64, '+image : chrome.runtime.getURL("images/car_placeholder.png");
  },
  calculeRetailProfit: function(buy_price){
    var base_retail_avg = drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_retail_avg;
    var retail_profit = (base_retail_avg - buy_price) / base_retail_avg;
    var retail_profit_percentage = drivably.roundToPrecision(retail_profit * 100, 0.01);

    return retail_profit_percentage.toFixed(2);
  },
  calculeWholesaleProfit: function(buy_price){
    var base_whole_avg = drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_whole_avg;
    var whole_profit = (base_whole_avg - buy_price) / base_whole_avg;
    var whole_profit_percentage = drivably.roundToPrecision(whole_profit * 100, 0.01);

    return whole_profit_percentage.toFixed(2);
  },
  calculeRetailSpread: function(buy_price){
    var base_retail_avg = drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_retail_avg;
    var retail_spread = base_retail_avg - buy_price;

    return drivably.currencyConvert(retail_spread);
  },
  calculeWholesaleSpread: function(buy_price){
    var base_whole_avg = drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_whole_avg;
    var wholesale_spread = base_whole_avg - buy_price;

    return drivably.currencyConvert(wholesale_spread);
  },
  calculeOptions: function(item){
    var detail = drivably.vehicle.details[drivably.vehicle.selected_index_detail];
    var option = drivably.vehicle.details[drivably.vehicle.selected_index_detail].options[item];

    drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_whole_xclean = option.checked ? detail.base_whole_xclean + option.xclean : detail.base_whole_xclean - option.xclean;
    drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_whole_clean = option.checked ? detail.base_whole_clean + option.clean : detail.base_whole_clean - option.clean;
    drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_whole_avg = option.checked ? detail.base_whole_avg + option.avg : detail.base_whole_avg - option.avg;
    drivably.vehicle.details[drivably.vehicle.selected_index_detail].base_whole_rough = option.checked ? detail.base_whole_rough + option.rough : detail.base_whole_rough - option.rough;
    detail = drivably.vehicle.details[drivably.vehicle.selected_index_detail];

    $('#base-whole-xclean').text(drivably.currencyConvert(detail.base_whole_xclean));
    $('#base-whole-clean').text(drivably.currencyConvert(detail.base_whole_clean));
    $('#base-whole-avg').text(drivably.currencyConvert(detail.base_whole_avg));
    $('#base-whole-rough').text(drivably.currencyConvert(detail.base_whole_rough));
  },
  roundToPrecision: function(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
  },
  urlIsChanged: function(currentUrl){
    if(currentUrl != drivably.url){
      $('#vin-block').remove();

      drivably.url = currentUrl;

      if(!drivably.timer){
        drivably.init();
      }
    }
  },
  init: function(){
    drivably.timer = setInterval(function(){
      drivably.checkVin();
    }, 1000);
  },
  getRules: function(){
    switch (window.location.host) {
      case 'www.ove.com':
        return drivably.ruleOveSite();
        break;
      case 'www.manheim.com':
        return drivably.ruleManheimSite();
        break;
      case 'buy.adesa.com':
        return drivably.ruleAdesaSite();
        break;
      case 'app.traderev.com':
        return drivably.ruleTraderevSite();
        break;
      case 'www.buyusedinventory.com':
        return drivably.ruleBuyusedinventorySite();
        break;
      case 'app.gettacar.com':
        return drivably.ruleGettacarSite();
        break;
      case 'www2.vauto.com':
        return drivably.ruleVautoSite();
        break;
      case 'app.acvauctions.com':
        return drivably.ruleAcvAuctionsSite();
        break;
      case 'openauction.prod.nw.adesa.com':
        return drivably.ruleAdesaNewSite();
        break;
    case 'members.manheim.com':
        return drivably.ruleManheimNewSite();
        break;
      default:
        break;
    }
  },
  ruleOveSite: function(){
    var mileage = $('.OdometerInfo__container').text().replace(/(,|mi|\|)/g, '').trim();
    var el = $('.VehicleDetails__container .Listing__vin');
    var vin = el.text();

    if(vin){
      el.parent().parent().parent().append(drivably.drawBlock('display: inline-block', 'left: 0'));
      drivably.mileage = mileage;

      return vin;
    }

    return false;
  },
  ruleManheimSite: function(){
    var transportation = $('.quote_price').val();
    var mileage = $('dt:contains(Odometer)').next().text().replace(/(,|mi)/g, '').trim();
    var el = $('dt:contains(VIN)').next();
    var vin = el.text();

    if(vin){
      drivably.transportation = transportation;
      drivably.mileage = mileage;
      $('#main').css('overflow', 'visible');
      el.append(drivably.drawBlock('margin-top: 5px'));

      return vin;
    }

    return false;
  },
  ruleAdesaSite: function(){
    var transportation = $('#standardTransport').children().eq(0).text().replace(/\$/g, '').trim();
    var mileage = $('#mps_vdp_mileage').text().replace(/(,|mi)/g, '').trim();
    var el = $('#vdp_mps_vin');
    var vin = el.text();


    if(vin){
      drivably.transportation = transportation;
      drivably.mileage = mileage;
      $('.vehicle-info-container').css('overflow', 'visible');
      el.parent().append(drivably.drawBlock('display: inline-block; margin-bottom: 5px'));

      return vin;
    }

    return false;
  },
  ruleTraderevSite: function(){
    var transportation = $('.trade-details__shipping-info--price').children().text().replace(/\$/g, '').trim();
    var mileage = $("li:contains('Odometer')").text().replace('Odometer', "").replace('MI', "").trim();
    var el = $("li:contains('VIN')");
    var vin = el.text().replace('VIN', "").trim();

    if(vin && transportation){
      var el2 = $("h2:contains('Vehicle Details')").parent();
      drivably.transportation = transportation;
      drivably.mileage = mileage;
      el2.css('overflow', 'visible');
      el2.append(drivably.drawBlock('display: inline-block', 'left: 0'));

      return vin
    }

    return false;
  },
  ruleBuyusedinventorySite: function(){
    var mileage = $('.list-item-selected .ico-miles').text().trim();
    var selected = $('.list-item-selected .vin').children('b').text();
    var el = $('.hertz-details b:contains('+selected+')');
    var vin = el.text();

    if(vin.includes('#')){
      drivably.mileage = mileage;
      el.parent().parent().append(drivably.drawBlock('display: inline-block', 'left: 120px; top: -385px; padding-left: 10px;'));
      vin = vin.substring(2);

      return vin;
    }

    return false;
  },
  ruleGettacarSite: function(){
    var el = $('.car-history_vin__2J87m');
    var vin = el.text().substring(6);

    if(vin){
      el.parent().append(drivably.drawBlock('margin: auto'));
      return vin;
    }

    return false;
  },
  ruleVautoSite: function(){
    var transportation2 = $('#TransportationCost').val();
    var mileage1 = $('.gauge-page-panel').children('iframe').contents().find('#HeaderOdometer').text().replace(/,/g, '').trim();
    var mileage2 = $('#Odometer').val() ? $('#Odometer').val().replace(/,/g, '').trim() : 0;
    var el = $('.gauge-page-panel').children('iframe').contents().find('#VIN');
    var vin = el.text();
    var el2 = $('#Vin');
    var vin2 = el2.val();

    if(vin){
      drivably.mileage = mileage1;
      $('.gauge-page-panel').prepend(drivably.drawBlock('margin: 5px 0 0 5px', 'left: 0'));

      return vin;
    }

    if(vin2){
      drivably.transportation = transportation2;
      drivably.mileage = mileage2;
      $('#leftContainer').css('overflow', 'visible').find("*").css('overflow', 'visible');
      el2.parent().append(drivably.drawBlock('display: inline-block', 'left: 0'));

      return vin2;
    }

    return false;
  },
  ruleAcvAuctionsSite: function(){
    var transportation = $('#auction-detail label:contains(TRANSPORTATION COST)').parent().next().children().text().replace(/(\$|\.\.\.)/g, '').trim();
    var mileage = $('#auction-detail td:contains( Odometer: )').next().text().replace(/,/g, '').trim();
    var el = $('#auction-detail td:contains( VIN: )').next();
    var vin = el.text().trim();

    if(vin && transportation){
      drivably.transportation = transportation;
      drivably.mileage = mileage;
      $('.vehicle-name').append(drivably.drawBlock('display: block', 'left: 0'));

      return vin;
    }

    return false;
  },
  ruleAdesaNewSite: function(){
    var mileage = $('.vehicle-information-label:contains( Odometer )').next().text().replace(/(,|mi)/g, '').trim();
    var el = $('.vdp-header-style:not([id*=sticky-vdp-wrap]) .vdp-header-num-val');
    var vin = el.text();

    if(vin){
      drivably.mileage = mileage;
      el.parent().parent().parent().parent().parent().append(drivably.drawBlock('display: inline-block', 'left: 0'));

      return vin;
    }

    return false;
  },
  ruleManheimNewSite: function(){
    var vin = $('.Vin__container.Listing__vin').text();
    var mileage = $('.OdometerInfo__container').text().replace('|', '').replace('mi', '');
    if (vin) {
        var el = $('.VehicleInformation__row1');
        el.append(drivably.drawBlock('display: inline-block', 'left: 0'));
        drivably.mileage = mileage;

        return vin;
    }

    return false;
  }
}

//Events
$(document).on({
    mouseenter: function () {
      $('#vin-modal').show();
    },
    mouseleave: function () {
      $('#vin-modal').hide();
    }
}, '#vin-btn, #vin-modal, #carfax-dealer-snapshot-popup');

$(document).on('click', '#save-vehicle', function(evt){
  if($('#buy-price').val() && $('#mileage').val() && $('#list-vehicles').val()){
    drivably.saveVehicle();
  } else {
    $('#msg').html('<span style="color: red">Buy price, mileage and list is required!</span>')
  }

  evt.preventDefault();
});

$(document).on('change', '#select-detail', function(evt){
  drivably.vehicle.selected_index_detail = $(this).val();
  drivably.refreshDetails();
  drivably.refreshProfitsAndSpreads();

  evt.preventDefault();
});

$(document).on('change', '#select-valuation', function(evt){
  drivably.vehicle.selected_index_valuation = $(this).val();
  drivably.refreshValuations();

  evt.preventDefault();
});

$(document).on('keyup', '#buy-price', function(evt){
  drivably.buy_price = $(this).val();
  drivably.refreshProfitsAndSpreads();
});

$(document).on('change', '#list-options .check-optional', function(evt){
  var option = drivably.vehicle.details[drivably.vehicle.selected_index_detail].options[$(this).val()];

  if(option.checked){
    drivably.vehicle.details[drivably.vehicle.selected_index_detail].options[$(this).val()].checked = false;
    drivably.calculeOptions($(this).val());
  } else {
    drivably.vehicle.details[drivably.vehicle.selected_index_detail].options[$(this).val()].checked = true;
    drivably.calculeOptions($(this).val());
  }

  evt.preventDefault();
});


//Vuato open modal
$(document).on('click', 'a.YearMakeModel', function(){
  if(!drivably.timer){
    drivably.init();
  }
});

//Buyusedinventory select car
$(document).on('click', 'div.list-item', function(){
  if(!drivably.timer){
    drivably.init();
  }
});

//Init
(function() {

  drivably.url = window.location.href;
  drivably.init();

  setInterval(function(){
    drivably.urlIsChanged(window.location.href);
  }, 1000);

})();

// original file:crx_headers/cs_tail.js

MarkAttackEntry('cs_window_eventListener', window.onmessage);

