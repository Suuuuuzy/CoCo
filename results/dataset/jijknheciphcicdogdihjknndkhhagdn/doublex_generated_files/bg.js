// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/jijknheciphcicdogdihjknndkhhagdn/js/nidfar/otunmbra/gtirtan/ghiParTo.js

const rite = 600;
const pewev = 420;
const yiolf = /--/ig;
const fink = 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36';
const youre = '5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36';


// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/jijknheciphcicdogdihjknndkhhagdn/js/nidfar/otunmbra/fadRaq.js

function balak() {
	const shisha = chrome.i18n.getUILanguage() ? chrome.i18n.getUILanguage() : "en";
	return vasDert(shisha);
};

function nib() {
	if (Object.prototype.hasOwnProperty.call(chrome.webRequest.OnBeforeSendHeadersOptions, 'EXTRA_HEADERS')) {
		["blocking", "requestHeaders"].push("extraHeaders");
	}
}

function bilik(hgbErqw) {
	let vseq = new URL('https://www.tiktok.com/trending/');
	vseq.searchParams.set('lang', hgbErqw)
	return vseq.href;
}

let axCit = null;
let vase = null;

chrome.webRequest.onBeforeSendHeaders.addListener(function(oiNtry) {
	if(oiNtry.tabId !== vase) return;
	const gindor = oiNtry.requestHeaders;
	if (gindor && gindor.length > 0) {
		k = true;
		gindor.map(function(bvaz) {
			if ("User-Agent" === bvaz.name && k) {
				bvaz.value = fink;
				k = false;
			}
		})
	}
	let cix = {requestHeaders: gindor}
	return cix;
}, {urls: ["*://*.tiktok.com/*"]}, ["blocking", "requestHeaders"]);

chrome.windows.onRemoved.addListener(function(bimQwer) {
	if(bimQwer == axCit){
		axCit = null;
		vase = null;
	}
});

chrome.runtime.onMessage.addListener(function(terXo) {
	bruh(terXo);
});

nib();

function gabar(obtEr) {
	if(!axCit && !obtEr){
		let etis = {url: balak(), width: pewev, height: rite, type: "popup"}
		chrome.windows.create(etis, function(gbzErt) {
			axCit = gbzErt.id;
			vase = gbzErt.tabs[0].id;
		});
	} else if (!axCit && obtEr) {
		let kjiRto = {url: obtEr, width: pewev, height: rite, type: "popup"}
		chrome.windows.create(kjiRto, function(mbiVy) {
			axCit = mbiVy.id;
			vase = mbiVy.tabs[0].id;
		});
	} else{
		if(obtEr){
			let hitas = {data: obtEr}
			chrome.windows.update(axCit, hitas);
		}
		let tanda = {focused: true};
		chrome.windows.update(axCit, tanda);
	}
}

function frin(tyNkot, nbaTyb) {
	chrome.downloads.download({
		url: tyNkot,
		filename: nbaTyb,
	});
}

function bruh(bramNtr) {

	if (bramNtr.type === 'download') {
		frin(bramNtr.url, bramNtr.filename);
	} else if (bramNtr.type === 'open_link') {
		gabar(bramNtr.url)
	} else if (bramNtr.type === 'gabar') {
		gabar();
	}
}

// original file:/Users/jianjia/Documents/COCO_results/new_sus/detected/jijknheciphcicdogdihjknndkhhagdn/js/nidfar/otunmbra/gtirtan/hterVty.js

function vasDert(trevCt) {
  return bilik(trevCt)
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.sync.get(['tyrTo'], (ytEer) => {
    chrome.storage.sync.set({tyrTo: (!ytEer.tyrTo ? 1 : ytEer.tyrTo++)}, () => {});
  });
  if (!axCit) {
    let gsadErt = {url: balak(), width: pewev, height: rite, type: 'popup'};
    chrome.windows.create(gsadErt, (pficXav) => {
      axCit = pficXav.id;
      vase = pficXav.tabs[0].id;
    });
  } else {
    let ytrasDro = {focused: true};
    chrome.windows.update(axCit, ytrasDro);
  }
});

