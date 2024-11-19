"use strict";

function addScript(src) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = chrome.extension.getURL(src);
  (document.body || document.head || document.documentElement).appendChild(script);
}

function addCSS(src) {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = chrome.extension.getURL(src);
  (document.body || document.head || document.documentElement).appendChild(link);
}

function addHTML(src) {
  fetch(chrome.extension.getURL(src))
    .then(res => res.text())
    .then(response => {
      const div = document.createElement('div');
      div.innerHTML = response;
      (document.body || document.head || document.documentElement).appendChild(div);
    })
    .catch(err => {
    });
}

// them be the files injected into the gmail window/dom
addScript('extension.js');
addCSS('styles.css');
// templates are re-used by the extension code. they (should) have display:none
// styles set on the topmost div so that they don't actually appear in the gmail window..!
// (use style="display:none", not just a css class as it may not have fully loaded, resulting in a flash)
addHTML('templates/dictation_controls.html');
addHTML('templates/lang_menu.html');


// injected script <-> chrome.* communication interface
// and, also, injected -> content -> background communication interface

document.addEventListener("DictationForGmail", function(e) {
  // sanity check
  if(typeof e.detail === 'undefined') {
    return;
  } else if(e.detail === null) {
    return;
  } else if(typeof e.detail.cmd === 'undefined') {
    return;
  }

  if(e.detail.cmd === 'GetSettings') {
    if(typeof e.detail.callId === 'undefined') {
      return;
    } else if(e.detail.callId === null) {
      return;
    }

    // using unique event name to reply to be 'more' async
    var replyEventName = `DictationForGmailReply_${e.detail.callId}`;

    // legacy name, kept for now
    chrome.storage.sync.get("GMDE_options", function (opts) {
      const options = opts.GMDE_options || {};

      document.dispatchEvent(
        new CustomEvent(replyEventName, {
          detail: {
            data: options
          }
        })
      );
    });
  } else if(e.detail.cmd === 'SetSettings') {
    if(typeof e.detail.data === 'undefined') {
      return;
    } else if(e.detail.data === null) {
      return;
    }

    // legacy name, kept for now
    chrome.storage.sync.set({
      GMDE_options: e.detail.data
    });

    // TODO no callback on successful (or error) save,
    // although that could be a good idea
  } else if(e.detail.cmd === 'TrackEvent') {
    if(typeof e.detail.data === 'undefined') {
      return;
    } else if(e.detail.data === null) {
      return;
    }

    // (hopefully!) sole patchy exception:
    // when onLoad messaage is sent, pre-send manifest
    // version event to background

    let eventData = e.detail.data;
    if(typeof eventData.action !== 'undefined') {
      if(eventData.action === 'onLoad') {
        chrome.runtime.sendMessage({
          action: "BgTrackEvent",
          data: {
            version: chrome.runtime.getManifest().version
          }
        });
      }
    }

    // send message which will be caught by background.js
    chrome.runtime.sendMessage({
      action: "BgTrackEvent",
      data: e.detail.data
    });
  }
});
