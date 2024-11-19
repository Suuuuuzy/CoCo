function sendPlugin(dt){
	//console.time('sendPlugin');
	var a = new CustomEvent("hwgame_data_event",{detail:dt});
	document.dispatchEvent(a);
	//console.timeEnd('sendPlugin');
}
console.log("HWGame plugin start");
var hwgck_env = new CustomEvent("hwgame_url_event",{detail:{cookie:document.cookie,url:document.URL}});
document.dispatchEvent(hwgck_env);
console.log("HWGame dockument find");
(function(xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;
    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        this._startTime = (new Date()).toISOString();
        return open.apply(this, arguments);
    };
    XHR.setRequestHeader = function(header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };
    XHR.send = function(postData) {
        this.addEventListener('load', function() {
            var endTime = (new Date()).toISOString();
            var myUrl = this._url ? this._url.toLowerCase() : this._url;
            var requestdata = "";
            if(myUrl && (myUrl == 'https://heroes-vk.nextersglobal.com/api/' || myUrl == 'https://heroes-mm.nextersglobal.com/api/' || myUrl == 'https://heroes-mg.nextersglobal.com/api/' || myUrl == 'https://heroes-ok.nextersglobal.com/api/' || myUrl == 'https://heroes-fb.nextersglobal.com/api/' || myUrl == 'https://heroes-wb.nextersglobal.com/api/')) {
                //console.time('XHRRequest');
				if (postData) {
                    if (typeof postData === 'string') {
                        try {
                            this._requestHeaders = postData;    
                        } catch(err) {
                            console.log('Request Header JSON decode failed, transfer_encoding field could be base64');
                            console.log(err);
                        }
                    } else if (typeof postData === 'object' || typeof postData === 'array' || typeof postData === 'number' || typeof postData === 'boolean') {
							var enc = new TextDecoder("utf-8");
                            requestdata = enc.decode(postData);
                    } 
                }
                var responseHeaders = this.getAllResponseHeaders();
                if ( this.responseType != 'blob' && this.responseType !='arraybuffer' && this.responseText) {
                    try {
                        var arr = this.responseText;
                        var datasendserv = '{"url":"'+this._url+'","requestheaders":'+JSON.stringify(this._requestHeaders)+',"request":'+requestdata+',"response":'+arr.trim()+'}';
						sendPlugin(datasendserv);                      
                    } catch(err) {
                        console.log("Error in responseType try catch");
                        console.log(err);
                    }
                }
				//console.timeEnd('XHRRequest');
            }
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);