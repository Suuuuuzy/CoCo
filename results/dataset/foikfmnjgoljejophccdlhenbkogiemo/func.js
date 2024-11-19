let brs = chrome;
let blanguage = (window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru").substr(0, 2).toLowerCase();
blanguage = (blanguage == "ru" || blanguage == "uk" || blanguage == "be") ? "ru" : "en";
let defset = {arena:true,spirit:true,advent:true,adventAll:false,starmoney:true,version:true,update:false,server:false,defprov:false,getgifts:false,lang:blanguage,lootdata:{},battles:{arena:true,vg:true,tournament:false}};
var defcur = {prov:false,id:false,info:[],lastupdate:0,starmoney:[],gtplaces:false,arena:false,clan:false,subscription:false,SpiritAll:false,adventurePassed:false,gifts:{},UseLootBox:[],LootBoxBuy:[],ScratchOpen:[],current_scratch:0,newYearGift:[{},{}],inventory:{},battles:{replays:{},users:{}}};
let settings = {};
let dtcurrent = {};
var users = {};
let lastupd = 0;
let responses = {};
let cur_loot_type = 0;
let a2uinf = false;
let lang;
let manifest = brs.runtime.getManifest();
let provider = {
	vk: {ident:"vkontakte", gift:true, color:"#4680c2", h:{def:"https://vk.com/bestmoba", g_r: "ad_id", g_d: "#"}},
	ok: {ident:"odnoklassniki", gift:true, color:"#eb722e", h:{def:"https://ok.ru/game/moba", g_r: "refplace", g_d: "&"}},
	mm: {ident:"mail", gift:true, color:"#168de2", h:{def:"https://my.mail.ru/apps/746862", g_r: "ref", g_d: "#"}},
	mg: {ident:"gmr", gift:true, color:"#000", h:{def:"https://games.mail.ru/app/3550", g_r: "ref", g_d: "&"}},
	fb: {ident:"facebook", gift:true, color:"#3b5998", h:{def:"https://apps.facebook.com/mobaheroes/", g_r: "nx_source", g_d: "&"}},
	wb: {ident:"web", gift:true, color:"#6c757d", h:{def:"https://hero-wars.com/", g_r: "nx_source", g_d: "&"}}
}

brs.storage.local.get(['hwg_settings','hwg_lastupdate','hwg_auth','hwg_responses','hwg_users'], function(res) {
	if(typeof res.hwg_settings === "undefined") settings = defset;
	else if(Object.keys(defset).length != Object.keys(res.hwg_settings).length) {
		Object.keys(defset).forEach(function(key) { settings[key] = (res.hwg_settings[key] === undefined) ? defset[key] : res.hwg_settings[key]});
		brs.storage.local.set({'hwg_settings': settings});
	} else settings = res.hwg_settings;
	users = res.hwg_users;
	lastupd = res.hwg_lastupdate;
	if(res.hwg_responses !== undefined) responses = res.hwg_responses;
	if(responses['git_gifts'] === undefined) responses['get_gifts'] = {time:0,prov:"vk",data:{}};
	if(typeof res.hwg_auth === "undefined") a2uinf = false;
	else a2uinf = res.hwg_auth;
	load_current_info();
});	
function load_current_info() {
	if(users.current.id == false || users.current.prov == false) {
		dtcurrent = defcur;
		load_current_info_end();
	} else {
		brs.storage.local.get([users.current.hwg], function(res) {
			if(typeof res[users.current.hwg] === "undefined") dtcurrent = defcur;
			else dtcurrent = res[users.current.hwg];
			if(dtcurrent['UseLootBox'] == undefined) dtcurrent['UseLootBox'] = [];
			if(dtcurrent['LootBoxBuy'] == undefined) dtcurrent['LootBoxBuy'] = [];
			if(dtcurrent['ScratchOpen'] == undefined) dtcurrent['ScratchOpen'] = [];
			if(dtcurrent['current_scratch'] == undefined) dtcurrent['current_scratch'] = 0;
			if(dtcurrent['battles'] == undefined) dtcurrent['battles'] = {replays:{},users:{}};	
			load_current_info_end();	
		});
	}
}
function load_current_info_end() {
	$.getJSON('/locale/'+settings['lang']+'.json', function(data){
		lang = data;
		hwg_init_page();
	})		
}

function get_gifts_list() {
	if(Math.round((new Date()).getTime()/1000)-300 <= responses.get_gifts.time && settings['defprov'] == responses.get_gifts.prov) xhr_get_gifts_end(responses.get_gifts.data);
	else {
		let xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.responseType = 'json';
		xhr.open('GET', 'https://hwgame.top/plugin/get_gifts/' + settings['defprov']);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function () {
			if (xhr.status == 200) {
				if (xhr.response.status == "ok") {
					responses.get_gifts.time = Math.round((new Date()).getTime()/1000);
					responses.get_gifts.prov = settings['defprov'];
					responses.get_gifts.data = xhr.response;
					brs.storage.local.set({'hwg_responses': responses});
					xhr_get_gifts_end(xhr.response);
				} else {
					xhr_get_gifts_error(xhr.response);
				}
			} else xhr_get_gifts_errorcode();
		};
		xhr.onerror = xhr_get_gifts_errorcode;
		xhr.send('ver=' + manifest.version);
	}
}
function get_hf_href(prov,is_flash=false) {
	let href = ((prov != "wb") ? "https://i-heroes-"+prov+".nextersglobal.com/iframe_new/"+provider[prov].ident+"/" : provider[prov].h.def)+"flash_client.php";
	if(!is_flash) href += "?disable";
	return href;
}
function get_gift_link(prov,id,ref) {
	let href = provider[prov].h.def;
	if(ref !== undefined && ref !== false) href += "?"+provider[prov].h.g_r+"="+ref+provider[prov].h.g_d+"gift_id="+id;
	else href += ((provider[prov].h.g_d == "&") ? "?" : "#")+"gift_id="+id;
	return href;
}
function pl_alert(type,text,dc) {
	return $('<div>', {class: 'alert alert-'+type+((dc) ? ' '+dc : ''),role:'alert',html: text});
}
function loader(size,dc) {
	let dvd = $('<div>',{class: 'd-flex justify-content-center'+((dc) ? ' '+dc : '')});
	dvd.append( $('<div>',{class:'spinner-border text-secondary',role:'status'}).css("width",size+"rem").css("height",size+"rem").append($('<span>',{class:'sr-only',text:'Loading...'})));
	return dvd;
}