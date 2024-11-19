function onLoad() {
	if (location.href.indexOf("mui=dy1CheckerForGmail") != -1) {
		let s = document.createElement('link');
		s.setAttribute("href", chrome.runtime.getURL("popup/gmail/tabletView.css"));
		s.setAttribute("rel", "stylesheet");
		s.setAttribute("type", "text/css");
		document.head.appendChild(s);
	}
}

window.addEventListener("load", onLoad);