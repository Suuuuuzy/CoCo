// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ilecenhhieemgphjfbmggnhllgcfipfi/js/content_scripts.js

// function to get browser property for all browser
window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'auto_fill_login') {
        window.setTimeout(function () {
            msg.data.fields.forEach(element => {
                if (element.step == msg.step) {
                    var x = ''
                    if (element.selector) {
                        x = document.querySelector(element.selector)
                    }
                    if (x) {
                        if (element.type == 'value') {
                            x.value = element.value;
                            const event = new Event('input', { bubbles: true });
                            document.querySelector(element.selector).dispatchEvent(event);
                        } else {
                            if (element.script) {
                                // if JS code is available for extra functions
                                eval(element.script)
                            }
                        }
                    } else if (element.script) {
                        // if JS code is available for extra functions
                        eval(element.script)
                    }
                }
            });

            window.setTimeout(function () {
                msg.data.elements.every(element => {
                    // if (element.step == msg.step) {
                        var x = ''
                        if (element.selector) {
                            x = document.querySelector(element.selector)
                        }
                        if (x) {
                            if (element.action == 'click') {
                                x.click()
                                return false
                            } else if (element.action == 'submit') {
                                x.submit()
                                return false
                            }
                        } else if (element.script) {
                            // if JS code is available for extra functions
                            eval(element.script)
                            return false
                        }
                    // }
                });
            }, 1);

        }, 1000);
        sendResponse('run');
    }
});
// let d=window.document.getElementsByTagName('body')[0]
// let overlay=document.createElement('div')
// overlay.style.position="fixed";
// overlay.style.zIndex="520";
// overlay.style.top="0";
// overlay.style.height="100%";
// overlay.style.width="100%";
// overlay.style.background="rgba(0,0,0,0.5)";
// if(d){
//     d.appendChild(overlay)
// }
