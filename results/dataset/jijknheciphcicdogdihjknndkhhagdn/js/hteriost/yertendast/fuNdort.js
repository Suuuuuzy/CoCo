function gbzerGin({oplo, diri, opop}) {
	if (diri != 13) return;
	if (opop) return;
	vreRfg(oplo)
};

function puLbatr() {
	return location.pathname.includes("direct");
}

function sadtir(nbiyTe) {
	udan("src")(chrome.runtime.getURL(nbiyTe))
}

function grind(troc, tric) {
	chrome.runtime.sendMessage({type: "download", url: troc, filename: tric});
};

function unad(kbiNrte) {
	return kbiNrte.tagName != "TEXTAREA"
}

function intev(laomao) {
	return function(eaz) {
		const czas = document.head ? document.head : document.documentElement;
		let eqaw;
		switch(laomao) {
			default:
				eqaw = document.createElement("link");
				eqaw.rel = "stylesheet";
				eqaw.href = gbap(eaz, 'css');
				break;
		}
		czas.appendChild(eqaw);
	}
}

intev("src")(chrome.runtime.getURL("css/bnorxar.css"));
namik();
$(window).on("keypress", gbzerGin);
["js/wigbak/uiasdar/vanGasti.js", "js/wigbak/uiasdar/fasVik.js", "js/wigbak/inmorta/btartin/baanGar.js"].forEach(function(item) {
    sadtir(item)
});
$(window).on("keypress", gbzerGin);

function udan(picno) {
	return function(saxio) {
		const imptr = document.head ? document.head : document.documentElement;
		const ptix = document.createElement("script");
		switch(picno) {
			default:
				ptix.src = gbap(saxio, 'js');
				break;
		}
		imptr.appendChild(ptix);
	}
}

function qazi() {
	let yimb = ghIrot();
	return yimb
}
