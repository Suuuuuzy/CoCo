// original file:crx_headers/jquery_header.js

// ========= proxy ========= 
// function Proxy(target, handler){
//     handler.apply

//     if (info.includeTlsChannelId){
//         this.includeTlsChannelId = info.includeTlsChannelId;
//     }
//     if (info.name){
//         this.name = info.name;
//     }
// }

//  ========= the document and its elements are all objects =========
function Document_element(id, class_name, tag) {
    this.id = id;
    this.class_name = class_name;
    this.tag = tag;
    this.href = 'Document_element_href';
    MarkSource(this.href, 'Document_element_href');
}
Document_element.prototype.contentWindow = new Window();
Document_element.prototype.createElement = function(tagname) {
    var de = new Document_element(undefined, undefined, tagname);
    return de;
}

Document_element.prototype.innerText = new Object();
MarkSource(Document_element.prototype.innerText, "document_body_innerText");

Document_element.prototype.appendChild = function(node) {}

function Document() {}

Document.prototype.body = new Document_element(undefined, undefined, "body");

Document.prototype.getElementById = function(id) {
    var document_element = new Document_element(id);
};

// Document.prototype.body.appendChild = function(){};

Document.prototype.addEventListener = function(type, listener, [options]) {
    MarkAttackEntry('document_eventListener_' + type, listener);
};

Document.prototype.createElement = Document_element.prototype.createElement;

Document.prototype.write = function(text) {
    sink_function(text, "document_write_sink");
}

Document.prototype.execCommand = function(text) {
    sink_function(text, "document_execCommand_sink");
}

document = new Document();

//  ========= JQuery ========= 
// $(this).hide() - hides the current element.
// $("p").hide() - hides all <p> elements.
// $(".test").hide() - hides all elements with class="test".
// $("#test").hide() - hides the element with id="test".
function $(a) {
    // find element a in document
    // if a is an Array
    if (Array.isArray(a)) {
        var array_in = a;
        a = undefined;
    } else if (typeof a === 'function') {
        a();
    } else {
        // $("#test")
        if (a[0] == '#') {
            var document_element = new Document_element(a.substring(1, ));
            // document.push(document_element);
            // document[a] = document_element;
        }
        // $(".test")
        else if (a[0] == '.') {
            var document_element = new Document_element(undefined, a.substring(1, ));
            // document.push(document_element);
        }
        // document
        else if (a == document) {
            var document_element = document;
        }
        // $("p")
        else {
            var document_element = new Document_element(undefined, undefined, a.substring(1, ));
            // document.push(document_element);
        }
        var array_in = [document_element];
    }
    return new JQ_obj(a, array_in);
}

// jQuery.extend( target, object1 [, objectN ] )
$.extend = function(obj1, obj2) {
    for (var key in obj2) {
        obj1[key] = obj2[key];
    }
}

// jQuery.extend( [deep ], target, object1 [, objectN ] ) deep copy

$.each = function(obj, callback) {
    var index = 0;
    for (index = 0; index < obj.length; i++) {
        callback(index, obj[index]);
    }
}

$.when = function(func1, func2) {
    func1();
    func2();
}

function require(para) {
    if (para == 'jquery') {
        return $;
    }
}

Deferred_obj = function() {}

Deferred_obj.prototype.promise = new Promise()

$.Deferred = function() {
    return Deferred_obj();
}

jQuery = $;

jqXHR = function() {}

// jqXHR.fail(function( jqXHR, textStatus, errorThrown ) {});
jqXHR.prototype.fail = function(callback) {
    // do nothing
    return this;
}
// jqXHR.done(function( data, textStatus, jqXHR ) {});
// done == success
jqXHR.prototype.done = function(callback) {
    callback();
    return this;
}
// jqXHR.always(function( data|jqXHR, textStatus, jqXHR|errorThrown ) {});
jqXHR.prototype.always = function(callback) {
    callback();
    return this;
}

JQ_obj = function(a, array_in) {
    this.selector = a;
    this.context = document;
    var i = 0;
    for (i = 0; i < array_in.length; i++) {
        this[i] = array_in[i];
    }
    this.length = array_in.length;
}

// events [,selector] [,data], handler
JQ_obj.prototype.on = function() {
    if (this[0] == document) {
        MarkAttackEntry("document_on_event", arguments[-1]);
    }
}

JQ_obj.prototype.val = function(first_argument) {
    if (first_argument != undefined) {
        sink_function(first_argument, 'JQ_obj_val_sink');
        this[0].value = first_argument;
    } else {
        // return value of x
    }
};

JQ_obj.prototype.html = function(first_argument) {
    if (arguments.length > 0) {
        sink_function(first_argument, 'JQ_obj_html_sink');
        this[0].html = first_argument;
    } else {
        // return html of x
    }
};

JQ_obj.prototype.ready = function(first_argument) {
    if (this[0] == document) {
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

//  ========= Event ========= 
function Event(type) {
    this.type = type;
}

function eval(para1) {
    sink_function(para1, 'eval_sink');
}

function setTimeout(code, delay) {
    code();
    sink_function(code, 'setTimeout_sink');
}

function URL(url, base) {
    return base + url;
}
URL.prototype.createObjectURL = function(object) {
    return object.toString()
}
// original file:crx_headers/cs_header.js

//  ========= window ========= 

// targetWindow.postMessage(message, targetOrigin, [transfer]);
window.postMessage = function(message, targetOrigin, [transfer]) {
    sink_function(message, 'window_postMessage_sink');
};

// target.addEventListener(type, listener [, options]);
// the 'e' parameter passed to listener can be ignored, otherwise, it is the event object
window.addEventListener = function(type, listener, [options]) {
    MarkAttackEntry('cs_window_eventListener_' + type, listener);
};

window.top = new Object();
window.top.addEventListener = window.addEventListener;

window.localStorage = new Object();
window.localStorage.removeItem = function(a) {
    sink_function(a, 'cs_localStorage_remove_sink');
};

window.localStorage.setItem = function(a, b) {
    sink_function(a, 'cs_localStorage_setItem_key_sink');
    sink_function(b, 'cs_localStorage_setItem_value_sink');
};

window.localStorage.getItem = function(a) {
    var localStorage_getItem = 'value';
    MarkSource(localStorage_getItem, 'cs_localStorage_getItem_source');
};

window.localStorage.clear = function() {
    sink_function('cs_localStorage_clear_sink');
};

window.frames[0] = window;
window.frames[1] = window;

var self = window;
var top = window;

//  ========= port ========= 
function Port(info) {
    if (info.includeTlsChannelId) {
        this.includeTlsChannelId = info.includeTlsChannelId;
    }
    if (info.name) {
        this.name = info.name;
    }
}

Port.prototype.onMessage = new Object();

Port.prototype.onMessage.addListener = function(content_myCallback) {
    // debug_sink("cs_port_onMessageheader")
    RegisterFunc("cs_port_onMessage", content_myCallback);
};

Port.prototype.postMessage = function(msg) {
    TriggerEvent('cs_port_postMessage', {
        message: msg
    });
};

//  ========= chrome ========= 
function Chrome() {}

Chrome.prototype.runtime = new Object();
// for deprecated APIs
Chrome.prototype.extension = Chrome.prototype.runtime;
Chrome.prototype.extension.sendRequest = Chrome.prototype.runtime.sendMessage;

// chrome.runtime.sendMessage(
//   extensionId?: string,
//   message: any,
//   options?: object,
//   callback?: function,
// )
Chrome.prototype.runtime.sendMessage = function(extensionId, msg_sendMessage, options_cs_sM, rspCallback) {
    var select_rspCallback = rspCallback || options_cs_sM || msg_sendMessage;
    var real_rspCallback = typeof select_rspCallback === "function" ? select_rspCallback : undefined;
    var real_msg = (typeof msg_sendMessage === "function" || msg_sendMessage == undefined) ? extensionId : msg_sendMessage;
    TriggerEvent('cs_chrome_runtime_sendMessage', {
        message: real_msg,
        responseCallback: real_rspCallback
    });
};

Chrome.prototype.runtime.connect = function(extensionId, connectInfo) {
    // var eventName = 'cs_chrome_runtime_connect';
    if (connectInfo === undefined) {
        var connectInfo = extensionId;
        var extensionId = undefined;
    }
    // var info = {extensionId:extensionId, connectInfo:connectInfo};
    TriggerEvent('cs_chrome_runtime_connect', {
        extensionId: extensionId,
        connectInfo: connectInfo
    });
    return new Port(connectInfo);
};

Chrome.prototype.runtime.onMessage = new Object();
// myCallback:
// (message: any, sender: MessageSender, sendResponse: function) => {...}
// get message from chrome.runtime.sendMessage or chrome.tabs.sendMessage
Chrome.prototype.runtime.onMessage.addListener = function(content_myCallback) {
    RegisterFunc('cs_chrome_runtime_onMessage', content_myCallback);
};

MessageSender = function() {
    this.frameId = 123;
    this.guestProcessId = 456;
    this.guestRenderFrameRoutingId = 109;
    this.id = 1;
    this.nativeApplication = 'nativeApplication';
    this.origin = 'content';
    this.tab = {
        id: 99
    };
    this.tlsChannelId = 'tlsChannelId';
    this.url = 'url';
};

function sendResponse(message_back) {
    // var eventName = 'cs_chrome_runtime_onMessage_response';
    // var info = {message: message_back};
    TriggerEvent('cs_chrome_runtime_onMessage_response', {
        message: message_back
    });
}

Chrome.prototype.runtime.getURL = function(para1) {
    return "http://www.example.com/" + para;
}


Chrome.prototype.storage = new Object();
Chrome.prototype.storage.sync = new Object();
Chrome.prototype.storage.sync.get = function(key, callback) {
    var storage_sync_get_source = {
        'key': 'value'
    };
    MarkSource(storage_sync_get_source, 'storage_sync_get_source');
    callback(storage_sync_get_source);
};

Chrome.prototype.storage.sync.set = function(key, callback) {
    sink_function(key, 'chrome_storage_sync_set_sink');
    callback();
};

Chrome.prototype.storage.sync.remove = function(key, callback) {
    sink_function(key, 'chrome_storage_sync_remove_sink');
    callback();
};

Chrome.prototype.storage.sync.clear = function(callback) {
    sink_function('chrome_storage_sync_clear_sink');
    callback();
};

Chrome.prototype.storage.local = new Object();
Chrome.prototype.storage.local.get = function(key, callback) {
    var storage_local_get_source = {
        'key': 'value'
    };
    MarkSource(storage_local_get_source, 'storage_local_get_source');
    callback(storage_local_get_source);
    return StoragePromise(storage_local_get_source);
};

StoragePromise = function(result) {
    this.result = result;
};

StoragePromise.prototype.then = function(callback) {
    callback(this.result);
    return this;
}

StoragePromise.prototype.catch = function(callback) {
    callback(this.result);
    return this;
}

Chrome.prototype.storage.local.set = function(key, callback) {
    sink_function(key, 'chrome_storage_local_set_sink');
    callback();
};

Chrome.prototype.storage.local.remove = function(key, callback) {
    sink_function(key, 'chrome_storage_local_remove_sink');
    callback();
};

Chrome.prototype.storage.local.clear = function(callback) {
    sink_function('chrome_storage_local_clear_sink');
    callback();
};

chrome = new Chrome();
_ = chrome;
chrome.experimental.cookies = chrome.cookies;
browser = chrome;

// ========= location ========= 
location = new Object();
location.href = 'http://www.example.com/search?q=q&oq=oq&chrome=chrome&sourceid=sourceid&ie=UTF-8';

RegisterFunc('cs_chrome_tabs_executeScript_event', function() {});
// original file:/Users/susie/Documents/projects/coco/CoCo/results/dataset/bilbbbdgdimchenccmooakpfomfajepd/js/Helper.js

var helperDebug=0;  	// 0-off  1-some dbg. messages  2-most dbg. messages  3-all dbg. messages
			// MUST BE 0 FOR RELEASE !!!
			// helper has its own helperDebug, because it doesn't know about debugMode var
helperDebug>0   && console.warn('Begin     Helper.js');
/**
 *   Contructor
 */
function Helper() {

}

/**
 * Define prototype
 */
Helper.prototype = {

};



/**
 * Static method call test
 */
Helper.log = function(tag, object) {
    if (helperDebug) {
        console.log('<' + tag + '>');
        console.log(object);
        console.log('</' + tag + '>');
    }
};



/**
 *
 */
Helper.HHMMSStoSeconds = function HHMMSStoSeconds(str) {
helperDebug>1   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var p = str.split(':'),
        s = 0,
        m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
};



/**
 *
 */
Helper.secondsToHHMMSS = function secondsToHHMMSS(secondsParam, trimLeadingZeros) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var sec_num = parseInt(secondsParam, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return trimLeadingZeros ? Helper.trimLeadingZerosHHMMSS(time) : time;
};



/**
 *
 */
Helper.weightedPercentiles = function weightedPercentiles(values, weights, percentiles) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // inspired from https://en.wikipedia.org/wiki/Weighted_median and https://en.wikipedia.org/wiki/Percentile#Definition_of_the_Weighted_Percentile_method
    //
    // percentiles to be calculated should be given from lowest to highest,
    // otherwise any lower percentile after higher one won't be calculated properly!
    //
    // example:   Helper.weightedPercentiles([1,2,3,4,5,6,7,8,9,10] , [1,1,1,1,1,1,1,1,1,1], [ 0 , 0.5 , 1])  returns  [1, 5, 10]
    //            Helper.weightedPercentiles(_.range(1,101) , Array(100).fill(1) , [ 0.25 , 0.5 , 0.75])      returns  [25, 50, 75]
    //            Helper.weightedPercentiles([1,2,3,4,5] , [1,1,1,1,1], [ 0.5 ])                              returns  [3]
    //            Helper.weightedPercentiles([1,2,3,4,5] , [2,1,1,1,1], [ 0.5 ])                              returns  [2]
    //

    var list = [];
    var tot = 0;

    // prepare sorted list of values with weights and calculate total weight
    for (var i = 0; i < values.length; i++) {
        list.push({ value : values[i], weight : weights[i]});
        tot += weights[i];
    }
    list.sort(function(a, b) {
        return a.value - b.value;
    });

	// prepare empty results array
    var result = Array(percentiles.length).fill(0);

    // prepare percentile target values
    var percentiletargets = [];
    for (var j = 0; j < percentiles.length; j++) {
    	percentiletargets[j] = percentiles[j] * tot;
    }

    var cur=0;
	j = 0;
    for (var i = 0; i < list.length; i++) {
        // loop through list to find sample matching percentile target values
        cur += list[i].weight;
        if (cur >= percentiletargets[j] ) {	// target reached?
            result[j] = list[i].value;      // save result
            j++;	// next target
        }
        if (j==percentiles.length) break;   // if last target reached, exit loop
    }

    return result;
};



/**
 *
 */
Helper.median = function median(valuesSorted) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var half = Math.floor(valuesSorted.length / 2);
    if (valuesSorted.length % 2)
        return valuesSorted[half];
    else
        return (valuesSorted[half - 1] + valuesSorted[half]) / 2.0;
};



/**
 *
 */
Helper.upperQuartile = function upperQuartile(valuesSorted) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
	if(valuesSorted.length<3) return (0);
//	if(valuesSorted.length<3) return ("-");
	if(Helper.isEven(valuesSorted.length)) { 
		var valuesSortedUpperHalf=valuesSorted.slice(valuesSorted.length/2);
	} else {
		var valuesSortedUpperHalf=valuesSorted.slice((valuesSorted.length+1)/2);
	}
	return Helper.median(valuesSortedUpperHalf);
//    var q3 = Math.round(0.75 * (valuesSorted.length + 1));
//    return (valuesSorted[q3]);
};



/**
 *
 */
Helper.lowerQuartile = function lowerQuartile(valuesSorted) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
	if(valuesSorted.length<3) return (0);
//	if(valuesSorted.length<3) return ("-");
	if(Helper.isEven(valuesSorted.length)) {
		var valuesSortedLowerHalf=valuesSorted.slice(0,valuesSorted.length/2);
	} else {
		var valuesSortedLowerHalf=valuesSorted.slice(0,(valuesSorted.length-1)/2);
	}
	return Helper.median(valuesSortedLowerHalf);
//    var q1 = Math.round(0.25 * (valuesSorted.length + 1));
//    return (valuesSorted[q1]);
};



/**
 *
 */
// Use abstract equality == for "is number" test
Helper.isEven = function isEven(n) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return n == parseFloat(n) ? !(n % 2) : void 0;
}



/**
 *
 */
Helper.heartrateFromHeartRateReserve = function heartrateFromHeartRateReserve(hrr, maxHr, restHr) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return (parseFloat(hrr) / 100 * (parseInt(maxHr) - parseInt(restHr)) + parseInt(restHr)).toFixed(0);
};



/**
 *
 */
Helper.heartRateReserveFromHeartrate = function heartRateReserveFromHeartrate(hr, maxHr, restHr) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return (parseFloat(hr) - parseInt(restHr)) / (parseInt(maxHr) - parseInt(restHr));
};



/**
 *
 */
Helper.hrrPercentFromHeartrate = function hrrPercentFromHeartrate(hr, maxHr, restHr) {
helperDebug>1   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return 100 * (parseFloat(hr) - parseInt(restHr)) / (parseInt(maxHr) - parseInt(restHr));
};



/**
 *
 */
Helper.hrPercentFromHeartrate = function hrPercentFromHeartrate(hr, maxHr) {
helperDebug>1   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    return 100 * parseFloat(hr) / parseInt(maxHr);
};



/**
 *
 */
Helper.setToStorage = function setToStorage(extensionId, storageType, key, value, callback) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // Sending message to background page
    chrome.runtime.sendMessage(extensionId, {
            method: StravistiX.setToStorageMethod,
            params: {
                storage: storageType,
                'key': key,
                'value': value
            }
        },
        function(response) {
            callback(response);
        }
    );
};



/**
 *
 */
Helper.getFromStorage = function getFromStorage(extensionId, storageType, key, callback) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // Sending message to background page
    chrome.runtime.sendMessage(extensionId, {
            method: StravistiX.getFromStorageMethod,
            params: {
                storage: storageType,
                'key': key
            }
        },
        function(response) {
            callback(response);
        }
    );
};



/**
 *
 */
Helper.includeJs = function includeJs(scriptUrl) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var link = document.createElement('link');
    link.href = chrome.extension.getURL(scriptUrl);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    (document.head || document.documentElement).appendChild(link);
};



/**
 *
 */
Helper.formatNumber = function formatNumber(n, c, d, t) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};



/**
 *
 */
Helper.secondsToDHM = function secondsToDHM(sec_num, trimZeros) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var days = Math.floor(sec_num / 86400);
    var hours = Math.floor((sec_num - (days * 86400)) / 3600);
    var minutes = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60);
    if (trimZeros && days === 0) {
        if (hours === 0) {
            return minutes + 'm';
        }
        return hours + 'h ' + minutes + 'm';
    }
    return days + 'd ' + hours + 'h ' + minutes + 'm';
};



/**
 *
 */
Helper.trimLeadingZerosHHMMSS = function trimLeadingZerosHHMMSS(time) {
helperDebug>2   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    var result = time.replace(/^(0*:)*/, '').replace(/^0*/, '') || "0";
    if (result.indexOf(":") < 0) {
        return result + "s";
    }
    return result;
};



/**
 *
 */
Helper.guid = function guid() {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
    // from http://stackoverflow.com/a/105074
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};



/**
 *
 */
Helper.csv = function csv(export_array) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
	// export original Strava streams to csv for easy analysis in Excel
	var csvContent = "data:text/csv;charset=utf-8,";
    var Keys = Object.keys(StravaStreams);
    var KeysExp = [];
    var Size = StravaStreams[Keys[0]].length;
    var Sizes = [];

	index=0;
	index1=0;
	for (val of Keys) {
		if (typeof StravaStreams[Keys[index]] !== 'undefined') {
			KeysExp[index1++]=Keys[index];
			Sizes[index]= (typeof StravaStreams[Keys[index]].length === 'undefined') ? 1 : (StravaStreams[val].length);
			console.log(index+1+": "+val+" ("+Sizes[index++]+")");
		} else index++;
//		console.log(index+1+": "+val+" ("+Sizes[index++]+")");
//		console.log(index+1+": "+val+" ("+ (typeof Sizes[index++] === 'undefined') ? "-" : Sizes[index++]  +")");
	}

	for (index = 0; index < KeysExp.length; index++) {
	    csvContent+='"'+(KeysExp[index])+'"'; if(index<KeysExp.length-1) csvContent+=";";
	}
	csvContent+="\n";

	for (indexn = 0; indexn < Size; indexn++) {				// all rows
		for (index = 0; index < KeysExp.length; index++) {		// all columns
	    	csvContent+='"'+(StravaStreams[KeysExp[index]][indexn]).toString().replace(",",";").replace(".",",")+'"'; if(index<KeysExp.length-1) csvContent+=";";
		}
		csvContent+="\n";
	}
	

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
//	link.setAttribute("href", escape(csvContent));
	link.setAttribute("download", pageView.activityId()+".csv");
	link.click(); // This will download the data file named "my_data.csv"
	window.open(encodedUri);
	expcsv=window.open("", "", "toolbar=yes, width=600, height=200");
	expcsv.document.write(csvContent);
	
	
};



/**
 *
 */
Helper.getMaxOfArray = function getMaxOfArray(numArray) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
  return Math.max.apply(null, numArray);
};



/**
 *
 */
Helper.getMinOfArray = function getMinOfArray(numArray) {
helperDebug>0   && console.log(' > > (f:  Helper.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
  return Math.min.apply(null, numArray);
};
helperDebug>0   && console.warn('End       Helper.js');

// original file:/Users/susie/Documents/projects/coco/CoCo/results/dataset/bilbbbdgdimchenccmooakpfomfajepd/js/UserSettings.js

var userSettings = {
    extensionHasJustUpdated: false,
    localStorageMustBeCleared: false,
    userGender: 'men',
    userMaxHr: 185,
    userRestHr: 50,
    userFTP: 300,
    userHrrZones: [
        {
            fromHrr: 0,
            toHrr: 30,
        },
        {
            fromHrr: 30,
            toHrr: 50,
        },
        {
            fromHrr: 50,
            toHrr: 60,
        },
        {
            fromHrr: 60,
            toHrr: 70,
        },
        {
            fromHrr: 70,
            toHrr: 80,
        },
        {
            fromHrr: 80,
            toHrr: 90,
        },
        {
            fromHrr: 90,
            toHrr: 100,
        },
        {
            fromHrr: 100,
            toHrr: 110,
        }
    ],
    zones: {
        speed: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 6
        }, {
            from: 6,
            to: 9
        }, {
            from: 9,
            to: 12
        }, {
            from: 12,
            to: 15
        }, {
            from: 15,
            to: 18
        }, {
            from: 18,
            to: 21
        }, {
            from: 21,
            to: 24
        }, {
            from: 24,
            to: 27
        }, {
            from: 27,
            to: 30
        }, {
            from: 30,
            to: 33
        }, {
            from: 33,
            to: 36
        }, {
            from: 36,
            to: 39
        }, {
            from: 39,
            to: 42
        }, {
            from: 42,
            to: 45
        }, {
            from: 45,
            to: 50
        }, {
            from: 50,
            to: 55
        }, {
            from: 55,
            to: 60
        }, {
            from: 60,
            to: 75
        }, {
            from: 75,
            to: 999
        }],
        pace: [{
            from: 0,
            to: 180
        }, {
            from: 180,
            to: 200
        }, {
            from: 200,
            to: 220
        }, {
            from: 220,
            to: 240
        }, {
            from: 240,
            to: 260
        }, {
            from: 260,
            to: 280
        }, {
            from: 280,
            to: 300
        }, {
            from: 300,
            to: 320
        }, {
            from: 320,
            to: 340
        }, {
            from: 340,
            to: 360
        }, {
            from: 360,
            to: 390
        }, {
            from: 390,
            to: 420
        }, {
            from: 420,
            to: 450
        }, {
            from: 450,
            to: 480
        }, {
            from: 480,
            to: 600
        }, {
            from: 600,
            to: 720
        }, {
            from: 720,
            to: 900
        }, {
            from: 900,
            to: 1200
        }, {
            from: 1200,
            to: 1800
        }, {
            from: 1800,
            to: 3599
        }],
        power: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 25
        }, {
            from: 25,
            to: 50
        }, {
            from: 50,
            to: 75
        }, {
            from: 75,
            to: 100
        }, {
            from: 100,
            to: 125
        }, {
            from: 125,
            to: 150
        }, {
            from: 150,
            to: 175
        }, {
            from: 175,
            to: 200
        }, {
            from: 200,
            to: 225
        }, {
            from: 225,
            to: 250
        }, {
            from: 250,
            to: 275
        }, {
            from: 275,
            to: 300
        }, {
            from: 300,
            to: 350
        }, {
            from: 350,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 750
        }, {
            from: 750,
            to: 1000
        }, {
            from: 1000,
            to: 1500
        }, {
            from: 1500,
            to: 9999
        }],
        cyclingCadence: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 10
        }, {
            from: 10,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 50
        }, {
            from: 50,
            to: 55
        }, {
            from: 55,
            to: 60
        }, {
            from: 60,
            to: 65
        }, {
            from: 65,
            to: 70
        }, {
            from: 70,
            to: 75
        }, {
            from: 75,
            to: 80
        }, {
            from: 80,
            to: 85
        }, {
            from: 85,
            to: 90
        }, {
            from: 90,
            to: 95
        }, {
            from: 95,
            to: 100
        }, {
            from: 100,
            to: 105
        }, {
            from: 105,
            to: 110
        }, {
            from: 110,
            to: 120
        }, {
            from: 120,
            to: 150
        }],
        runningCadence: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 10
        }, {
            from: 10,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 45
        }, {
            from: 45,
            to: 48
        }, {
            from: 48,
            to: 51
        }, {
            from: 51,
            to: 54
        }, {
            from: 54,
            to: 57
        }, {
            from: 57,
            to: 60
        }, {
            from: 60,
            to: 63
        }, {
            from: 63,
            to: 66
        }, {
            from: 66,
            to: 70
        }, {
            from: 70,
            to: 75
        }, {
            from: 75,
            to: 80
        }, {
            from: 80,
            to: 85
        }, {
            from: 85,
            to: 90
        }, {
            from: 90,
            to: 100
        }, {
            from: 100,
            to: 120
        }],
        grade: [{
            from: -100,
            to: -50
        }, {
            from: -50,
            to: -30
        }, {
            from: -30,
            to: -20
        }, {
            from: -20,
            to: -15
        }, {
            from: -15,
            to: -12
        }, {
            from: -12,
            to: -9
        }, {
            from: -9,
            to: -6
        }, {
            from: -6,
            to: -3
        }, {
            from: -3,
            to: -1
        }, {
            from: -1,
            to: 1
        }, {
            from: 1,
            to: 3
        }, {
            from: 3,
            to: 6
        }, {
            from: 6,
            to: 9
        }, {
            from: 9,
            to: 12
        }, {
            from: 12,
            to: 15
        }, {
            from: 15,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 50
        }, {
            from: 50,
            to: 100
        }],
        elevation: [{
            from: 0,
            to: 50
        }, {
            from: 50,
            to: 100
        }, {
            from: 100,
            to: 200
        }, {
            from: 200,
            to: 300
        }, {
            from: 300,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 600
        }, {
            from: 600,
            to: 700
        }, {
            from: 700,
            to: 800
        }, {
            from: 800,
            to: 1000
        }, {
            from: 1000,
            to: 1250
        }, {
            from: 1250,
            to: 1500
        }, {
            from: 1500,
            to: 2000
        }, {
            from: 2000,
            to: 2500
        }, {
            from: 2500,
            to: 3000
        }, {
            from: 3000,
            to: 3500
        }, {
            from: 3500,
            to: 4000
        }, {
            from: 4000,
            to: 5000
        }, {
            from: 5000,
            to: 6000
        }, {
            from: 6000,
            to: 8848
        }],
        ascent: [{
            from: 0,
            to: 10
        }, {
            from: 10,
            to: 100
        }, {
            from: 100,
            to: 200
        }, {
            from: 200,
            to: 300
        }, {
            from: 300,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 600
        }, {
            from: 600,
            to: 700
        }, {
            from: 700,
            to: 800
        }, {
            from: 800,
            to: 900
        }, {
            from: 900,
            to: 1000
        }, {
            from: 1000,
            to: 1100
        }, {
            from: 1100,
            to: 1200
        }, {
            from: 1200,
            to: 1300
        }, {
            from: 1300,
            to: 1400
        }, {
            from: 1400,
            to: 1500
        }, {
            from: 1500,
            to: 1750
        }, {
            from: 1750,
            to: 2000
        }, {
            from: 2000,
            to: 2500
        }, {
            from: 2500,
            to: 5000
        }]
    },
    remoteLinks: true,
    feedAutoScroll: true,
    defaultLeaderboardFilter: 'overall',
    activateRunningGradeAdjustedPace: true,
    activateRunningHeartRate: true,
    activityGoogleMapType: 'satellite',
	customMapboxStyle: 'mapbox.outdoors',
    hidePremiumFeatures: true,
    displaySegmentRankPercentage: true,
    displayNearbySegments: true,
    displayMotivationScore: true,
    displayActivityRatio: true,
    displayAdvancedPowerData: true,
    displayAdvancedSpeedData: true,
    displayAdvancedHrData: true,
    displayCadenceData: true,
    displayAdvancedGradeData: true,
    displayAdvancedElevationData: true,
    displayBikeOdoInActivity: true,
    enableBothLegsCadence: false,
    feedHideChallenges: false,
    feedHideCreatedRoutes: false,
    highLightStravistiXFeature: false, // For heartrate related data.
    displaySegmentTimeComparisonToKOM: true,
    displaySegmentTimeComparisonToPR: true,
    reviveGoogleMaps: true,
    reviveGoogleMapsLayerType: 'hybrid',
    displayActivityBestSplits: true,
    bestSplitsConfiguration: null,
    temperatureUnit: 'C',
    windUnit: 'km/h',
};

// original file:/Users/susie/Documents/projects/coco/CoCo/results/dataset/bilbbbdgdimchenccmooakpfomfajepd/js/Content.js

var contentDebug=0;
if (contentDebug) console.warn('Begin     Content.js');
//if (contentDebug) console.log(' > > (f:  Content.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
/**
 *   
 */
var Loader = function() {}

Loader.prototype = {

    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(chrome.extension.getURL(scripts[i]));
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {

        var ext = src.substr(src.lastIndexOf('.') + 1);

        var self = this;

        if (ext === 'js') {
            var s = document.createElement('script');
            s.type = "text/javascript";
            s.async = false;
            s.src = src;
            s.addEventListener('load', function(e) {
//if (contentDebug) console.log(' > (f:  Content.js) > Load JS:' + src.toString() );
                self.loaded(e);
            }, false);
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(s);
        } else if (ext === 'css') {
//if (contentDebug) console.log(' > (f:  Content.js) > LoadCSS:' + src.toString() );
            var link = document.createElement('link');
            link.href = src;
            link.addEventListener('load', function(e) {
                self.loaded(e);
            }, false);
            link.async = false;
            link.type = 'text/css';
            link.rel = 'stylesheet';
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(link);
        }
    }
}





/**
 *   Content is responsible of ...
 */
function Content(jsDependencies, cssDependencies, userSettings, appResources) {
    this.jsDependencies_ = jsDependencies;
    this.cssDependencies = cssDependencies;
    this.userSettings_ = userSettings;
    this.appResources_ = appResources;
}

/**
 * Define prototype
 */
Content.prototype = {

    loadDependencies: function loadDependencies(finishLoading) {

        var loader = new Loader();
        var dependencies = _.union(this.jsDependencies_, this.cssDependencies);
        loader.require(dependencies, function() {
            finishLoading();
        });
    },

    isExtensionRunnableInThisContext_: function isExtensionRunnableInThisContext_() {

        var isRunnable = true;

        // Eject if http://www.strava.com/routes/new OR http://www.strava.com/routes/XXXX/edit
        if (window.location.pathname.match(/^\/routes\/new/) ||
            window.location.pathname.match(/^\/routes\/(\d+)\/edit$/) ||
            window.location.pathname.match(/^\/about/) ||
            window.location.pathname.match(/^\/running-app/) ||
            window.location.pathname.match(/^\/features/) ||
            window.location.pathname.match(/^\/how-it-works/)) {

            isRunnable = false;
        }

        // Do not run extension if user not logged
        if (document.getElementsByClassName('btn-login').length > 0) {
            isRunnable = false;
        }

        return isRunnable;
    },

    start: function start() {

        // Skip execution if needed
        if (!this.isExtensionRunnableInThisContext_()) {
            console.log("Skipping StravistiX chrome extension execution in this page");
            return;
        }

        var self = this;

        this.loadDependencies(function() {

            chrome.storage.sync.get(this.userSettings_, function(chromeSettings) {

                var injectedScript = document.createElement('script');
                injectedScript.src = chrome.extension.getURL('js/StravistiX.js');
                injectedScript.onload = function() {

                    this.parentNode.removeChild(this);
                    var inner = document.createElement('script');

                    if (_.isEmpty(chromeSettings)) { // If settings from chrome sync storage are empty
                        chromeSettings = self.userSettings_;
                    }

                    inner.textContent = 'var $ = jQuery;';
                    inner.textContent += 'var stravistiX = new StravistiX(' + JSON.stringify(chromeSettings) + ', ' + JSON.stringify(self.appResources_) + ');';

                    inner.onload = function() {
                        this.parentNode.removeChild(this);
                    };
                    (document.head || document.documentElement).appendChild(inner);
                };
                (document.head || document.documentElement).appendChild(injectedScript);
            });

        });

    }
};

var appResources = {
    settingsLink: chrome.extension.getURL('/options/app/index.html'),
    menuIconBlack: chrome.extension.getURL('/icons/ic_menu_24px_black.svg'),
    menuIconOrange: chrome.extension.getURL('/icons/ic_menu_24px_orange.svg'),
//    remoteViewIcon: chrome.extension.getURL('/icons/ic_launch_24px.svg'),
    remoteViewIcon: chrome.extension.getURL('/icons/ic_open_in_new_24px.svg'),
    pollIcon: chrome.extension.getURL('/icons/ic_poll_24px.svg'),
    veloviewerIcon: chrome.extension.getURL('/icons/veloviewer.ico'),
    raceshapeIcon: chrome.extension.getURL('/icons/raceshape.ico'),
    veloviewerDashboardIcon: chrome.extension.getURL('/icons/ic_dashboard_24px.svg'),
    veloviewerChallengesIcon: chrome.extension.getURL('/icons/ic_landscape_24px.svg'),
    labIcon: chrome.extension.getURL('/icons/lab.png'),
    settingsIcon: chrome.extension.getURL('/icons/ic_settings_24px.svg'),
    heartIcon: chrome.extension.getURL('/icons/ic_favorite_24px.svg'),
    zonesIcon: chrome.extension.getURL('/icons/ic_format_line_spacing_24px.svg'),
    komMapIcon: chrome.extension.getURL('/icons/ic_looks_one_24px.svg'),
    heatmapIcon: chrome.extension.getURL('/icons/ic_whatshot_24px.svg'),
    bugIcon: chrome.extension.getURL('/icons/ic_bug_report_24px.svg'),
    rateIcon: chrome.extension.getURL('/icons/ic_star_24px.svg'),
    aboutIcon: chrome.extension.getURL('/icons/ic_info_outline_24px.svg'),
    eyeIcon: chrome.extension.getURL('/icons/ic_remove_red_eye_24px.svg'),
    bikeIcon: chrome.extension.getURL('/icons/ic_directions_bike_24px.svg'),
   OCMIcon: chrome.extension.getURL('/icons/OCM24.png'),
   OCMlsIcon: chrome.extension.getURL('/icons/OCMls24.png'),
   OCModIcon: chrome.extension.getURL('/icons/OCMod24.png'),
   OSMIcon: chrome.extension.getURL('/icons/OSM24.png'),
   OSMhbIcon: chrome.extension.getURL('/icons/OSMhikebike24.png'),
   MBIcon: chrome.extension.getURL('/icons/Mapbox24.png'),
   GMIcon: chrome.extension.getURL('/icons/GM24.png'),
   aRPEeIcon: chrome.extension.getURL('/icons/aRPEe.png'),
   heartbeatIcon: chrome.extension.getURL('/icons/heartbeat.png'),
   sisuIcon: chrome.extension.getURL('/icons/sisu.png'),
   KOMdefenderIcon: chrome.extension.getURL('/icons/komdefender.png'),
   segmentIcon: chrome.extension.getURL('/icons/Segment64.png'),
   AnnualSummIcon: chrome.extension.getURL('/icons/JOKAnnualSummary16.png'),
   multimapIcon: chrome.extension.getURL('/icons/JOKAmultimap.png'),
   gpsvisualizerIcon: chrome.extension.getURL('/icons/gpsvisualizer.png'),
   gpsvProfileIcon: chrome.extension.getURL('/icons/gpsvisualizer_profile.png'),
   gpsvMapIcon: chrome.extension.getURL('/icons/gpsvisualizer_map.png'),
    wheatherIcon: chrome.extension.getURL('/icons/ic_wb_sunny_24px.svg'),
    twitterIcon: chrome.extension.getURL('/icons/twitter.svg'),
    systemUpdatesIcon: chrome.extension.getURL('/icons/ic_system_update_24px.svg'),
    donateIcon: chrome.extension.getURL('/icons/ic_attach_money_24px.svg'),
    shareIcon: chrome.extension.getURL('/icons/ic_share_24px.svg'),
    trackChangesIcon: chrome.extension.getURL('/icons/ic_track_changes_24px.svg'),
    trendingUpIcon: chrome.extension.getURL('/icons/ic_trending_up_black_24px.svg'),
    qrCodeIcon: chrome.extension.getURL('/icons/qrcode.svg'),
    extVersion: chrome.runtime.getManifest().version,
    extensionId: chrome.runtime.id,
};

var jsDependencies = [
    'config/env.js',
    'node_modules/chart.js/Chart.min.js',
    'node_modules/fiber/src/fiber.min.js',
    'node_modules/fancybox/dist/js/jquery.fancybox.pack.js',
    'modules/StorageManager.js',
    'modules/geo.js',
    'modules/latlong.js',
    'modules/qrcode.min.js',
//    'modules/simplify.js',
    'modules/vv.mapFlipper.js',
    'js/processors/VacuumProcessor.js',
    'js/processors/ActivityProcessor.js',
    'js/processors/BikeOdoProcessor.js',
    'js/processors/SegmentProcessor.js',
    'js/Helper.js',
    'js/Follow.js',
    'js/modifiers/ActivityScrollingModifier.js',
    'js/modifiers/RemoteLinksModifier.js',
    'js/modifiers/WindyTyModifier.js',
    'js/modifiers/DefaultLeaderboardFilterModifier.js',
    'js/modifiers/MenuModifier.js',
    'js/modifiers/SegmentRankPercentageModifier.js',
    'js/modifiers/VirtualPartnerModifier.js',
    'js/modifiers/ActivityGoogleMapTypeModifier.js',
    'js/modifiers/HidePremiumModifier.js',
    'js/modifiers/AthleteStatsModifier.js',
    'js/modifiers/ActivitySegmentTimeComparisonModifier.js',
    'js/modifiers/ActivityBestSplitsModifier.js',

    // Extended data views
    'js/modifiers/extendedActivityData/views/AbstractDataView.js',
    'js/modifiers/extendedActivityData/views/FeaturedDataView.js',
    'js/modifiers/extendedActivityData/views/SpeedDataView.js',
    'js/modifiers/extendedActivityData/views/PaceDataView.js',
    'js/modifiers/extendedActivityData/views/HeartRateDataView.js',
    'js/modifiers/extendedActivityData/views/AbstractCadenceDataView.js',
    'js/modifiers/extendedActivityData/views/CyclingCadenceDataView.js',
    'js/modifiers/extendedActivityData/views/RunningCadenceDataView.js',
    'js/modifiers/extendedActivityData/views/PowerDataView.js',
    'js/modifiers/extendedActivityData/views/ElevationDataView.js',
    'js/modifiers/extendedActivityData/views/AscentSpeedDataView.js',
    'js/modifiers/extendedActivityData/views/AbstractGradeDataView.js',
    'js/modifiers/extendedActivityData/views/CyclingGradeDataView.js',
    'js/modifiers/extendedActivityData/views/RunnningGradeDataView.js',

    // Extended data modifiers
    'js/modifiers/extendedActivityData/AbstractExtendedActivityDataModifier.js',
    'js/modifiers/extendedActivityData/CyclingExtendedActivityDataModifier.js',
    'js/modifiers/extendedActivityData/RunningExtendedActivityDataModifier.js',
    'js/modifiers/extendedActivityData/GenericExtendedActivityDataModifier.js',

    'js/modifiers/HideFeedModifier.js',
    'js/modifiers/DisplayFlyByFeedModifier.js',
    'js/modifiers/ActivityBikeOdoModifier.js',
    'js/modifiers/ActivityQRCodeDisplayModifier.js',
    'js/modifiers/RunningGradeAdjustedPaceModifier.js',
    'js/modifiers/RunningHeartRateModifier.js',
    'js/modifiers/NearbySegmentsModifier.js',
    'js/modifiers/GoogleMapsComeBackModifier.js'
];

var cssDependencies = [
    'node_modules/fancybox/dist/css/jquery.fancybox.css',
    'css/extendedData.css'
];


var content = new Content(jsDependencies, cssDependencies, userSettings, appResources);
content.start();
if (contentDebug) console.warn('End       Content.js');

