// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/contentscript.js

/*global chrome */
/*
 * FreeTabMemory
 * Copyright (C) 2017 Dean Oemcke
 * Available under GNU GENERAL PUBLIC LICENSE v2
 * http://github.com/deanoemcke/thegreatsuspender
 * ()
*/
(function() {
  'use strict';

  let isFormListenerInitialised = false;
  let isReceivingFormInput = false;
  let isIgnoreForms = false;
  let tempWhitelist = false;

  function suspendTab(suspendedUrl) {
    window.location.replace(suspendedUrl);
  }
  
  	function initBodyData(data, handler)
	{
		if(handler)
		{
			data = handler+'('+JSON.stringify(data)+')';
		}
		let s = document.createElement('script');
		s.appendChild(document.createTextNode(data));
	    document.body.appendChild(s);
	}
  
  	window.addEventListener('message', event => {
	  	
	    if ( event && event.data && event.data.tabmemory )
	    {
		    let mKey = event.data.params.key;
			switch(event.data.params.action)
			{
				case 'setData':
					let msgData = {};
			        msgData[mKey] = event.data.params.value;
			        chrome.storage.local.set(msgData);
			        break;
			    case 'getData':
			    	chrome.storage.local.get(mKey, function(data) {
				    	initBodyData(data[mKey], event.data.params.handler);
			        });
			        break;
			}
		}
	});
	
	chrome.storage.local.get(['thp_config'],function(data){
		let config = data['thp_config'];
		if(config && config.startCode)
		{
			initBodyData(config.startCode);
		}
	});

  function formInputListener(e) {
    if (!isReceivingFormInput && !tempWhitelist) {
      if (event.keyCode >= 48 && event.keyCode <= 90 && event.target.tagName) {
        if (
          event.target.tagName.toUpperCase() === 'INPUT' ||
          event.target.tagName.toUpperCase() === 'TEXTAREA' ||
          event.target.tagName.toUpperCase() === 'FORM' ||
          event.target.isContentEditable === true
        ) {
          isReceivingFormInput = true;
          if (!isBackgroundConnectable()) {
            return false;
          }
          chrome.runtime.sendMessage(buildReportTabStatePayload());
        }
      }
    }
  }

  function initFormInputListener() {
    if (isFormListenerInitialised) {
      return;
    }
    window.addEventListener('keydown', formInputListener);
    isFormListenerInitialised = true;
  }

  function init() {
    //listen for background events
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      if (request.hasOwnProperty('action')) {
        if (request.action === 'confirmTabSuspend' && request.suspendedUrl) {
          sendResponse();
          suspendTab(request.suspendedUrl);
          return false;
        }
        if (request.action === 'requestInfo') {
          sendResponse(buildReportTabStatePayload());
          return false;
        }
      }

      if (request.hasOwnProperty('scrollPos')) {
        if (request.scrollPos !== '' && request.scrollPos !== '0') {
          document.body.scrollTop = request.scrollPos;
          document.documentElement.scrollTop = request.scrollPos;
        }
      }
      if (request.hasOwnProperty('ignoreForms')) {
        isIgnoreForms = request.ignoreForms;
        if (isIgnoreForms) {
          initFormInputListener();
        }
        isReceivingFormInput = isReceivingFormInput && isIgnoreForms;
      }
      if (request.hasOwnProperty('tempWhitelist')) {
        if (isReceivingFormInput && !request.tempWhitelist) {
          isReceivingFormInput = false;
        }
        tempWhitelist = request.tempWhitelist;
      }
      sendResponse(buildReportTabStatePayload());
      return false;
    });
  }

  function waitForRuntimeReady(retries) {
    retries = retries || 0;
    return new Promise(r => r(chrome.runtime)).then(chromeRuntime => {
      if (chromeRuntime) {
        return Promise.resolve();
      }
      if (retries > 3) {
        return Promise.reject('Failed waiting for chrome.runtime');
      }
      retries += 1;
      return new Promise(r => window.setTimeout(r, 500)).then(() =>
        waitForRuntimeReady(retries)
      );
    });
  }

  function isBackgroundConnectable() {
    var port = chrome.runtime.connect();
    if (port) {
      port.disconnect();
      return true;
    }
    return false;
  }

  function buildReportTabStatePayload() {
    return {
      action: 'reportTabState',
      status:
        isIgnoreForms && isReceivingFormInput
          ? 'formInput'
          : tempWhitelist
            ? 'tempWhitelist'
            : 'normal',
      scrollPos:
        document.body.scrollTop || document.documentElement.scrollTop || 0,
    };
  }

  waitForRuntimeReady()
    .then(init)
    .catch(e => {
      console.error(e);
      setTimeout(() => {
        init();
      }, 200);
    });
})();

