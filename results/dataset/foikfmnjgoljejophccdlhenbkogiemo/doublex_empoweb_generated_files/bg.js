// original file:/Users/jianjia/Documents/COCO_results/all/10k/foikfmnjgoljejophccdlhenbkogiemo/background.js

var brs = chrome;
let blanguage = (window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru").substr(0, 2).toLowerCase();
blanguage = (blanguage == "ru" || blanguage == "uk" || blanguage == "be") ? "ru" : "en";
let defset = {arena:true,spirit:true,advent:true,adventAll:false,starmoney:true,version:true,update:false,server:false,defprov:false,getgifts:false,lang:blanguage,lootdata:{},battles:{arena:true,vg:true,tournament:false}};
const defcur = {prov:false,id:false,info:[],lastupdate:0,starmoney:[],gtplaces:false,arena:false,clan:false,subscription:false,SpiritAll:false,adventurePassed:false,gifts:{},UseLootBox:[],LootBoxBuy:[],ScratchOpen:[],current_scratch:0,newYearGift:[{},{}],inventory:{},battles:{replays:{},users:{}}};
var settings = {};
var dtcurrent = {};
var globaldata = {};
var users = {};
var parse_change = {data:{},headers:{}};
let a2uinf = false;
let arr_lib_ids = [56,76,78,87,92,95,104,122,123,124,125,133,144,145,146,147,148,149];
let loot_type_list = [{"id":0,"ru":"Все","en":"All","col":1},{"id":78,"ru":"Подарок от Бокси","en":"Boxy's Gift","col":3},{"id":92,"ru":"Злотрешка","en":"Demon Doll","col":2},{"id":76,"ru":"Сумка искателя знаний","en":"Lore Seeker's Bag","col":3},{"id":95,"ru":"Загадочное яйцо","en":"Mysterious Egg","col":2},{"id":104,"ru":"Шкатулка Ясмин","en":"Yasmine Casket","col":2},{"id":56,"ru":"Шкатулка почетного стража","en":"Honorable Guardian Casket","col":3},{"id":87,"ru":"СундукЕдинства","en":"Unity Chest","col":2},{"id":125,"ru":"Летние матрешки","en":"Summer Doll","col":2},{"id":"boxHalloween2018","ru":"Летний фестиваль","en":"Summer Festival","col":2},{"id":133,"ru":"Сокровище синих вод","en":"Blue Depths Treasure","col":3},{"id":148,"ru":"Платиновая шкатулка","en":"Platinum Box","col":2},{"id":149,"ru":"Древний сундук Артефактов Титанов","en":"Ancient Titan Artifact Chest","col":4},{"id":"scratch","ru":"Кибер-ячейки","en":"Cyber cells","col":2}];
var manifest = brs.runtime.getManifest();
brs.storage.local.get(['hwg_settings','hwg_auth','hwg_users','hwg_current','hwg_data'], function(res) {
	if(typeof res.hwg_settings === "undefined") settings = defset;
	else if(Object.keys(defset).length != Object.keys(res.hwg_settings).length) {
		Object.keys(defset).forEach(function(key) { settings[key] = (res.hwg_settings[key] === undefined) ? defset[key] : res.hwg_settings[key]});
		brs.storage.local.set({'hwg_settings': settings});
	} else settings = res.hwg_settings;

	if(typeof res.hwg_auth === "undefined") a2uinf = false;
	else a2uinf = res.hwg_auth;

	if(typeof res.hwg_data !== "undefined") globaldata = res.hwg_data;

	if(typeof res.hwg_current === "undefined") dt_set_default();
	else dtcurrent = res.hwg_current;
	
	if(typeof res.hwg_users === "undefined" || res.hwg_users === false) generate_users();
	else users = res.hwg_users;
	hwg_renew_key();
	get_loot_info_data();	
	load_current_info();
});
function load_current_info() {
	if(users.current.id == false || users.current.prov == false) dt_set_default();
	else change_user(false);
}
function plugin_clear_data() {
	if(dtcurrent['topGet'] != undefined) delete dtcurrent['topGet'];
	Object.keys(dtcurrent.gifts).forEach(function(key) {
		if(Math.round((new Date()).getTime()/1000)-3600*24*21 > dtcurrent.gifts[key]) delete dtcurrent.gifts[key];
	});
}

function change_user(resend=true) {
	brs.storage.local.get([users.current.hwg], function(res) {
		if(typeof res[users.current.hwg] === "undefined") set_default_current();
		else dtcurrent = res[users.current.hwg];
		
		if(dtcurrent['UseLootBox'] == undefined) dtcurrent['UseLootBox'] = [];
		if(dtcurrent['LootBoxBuy'] == undefined) dtcurrent['LootBoxBuy'] = [];
		if(dtcurrent['ScratchOpen'] == undefined) dtcurrent['ScratchOpen'] = [];
		if(dtcurrent['current_scratch'] == undefined) dtcurrent['current_scratch'] = 0;
		if(dtcurrent['newYearGift'] == undefined) dtcurrent['newYearGift'] = [{},{}];
		if(dtcurrent['battles'] == undefined) dtcurrent['battles'] = {replays:{},users:{}};	
		plugin_clear_data();
		if(resend) parse_resp(parse_change.data,users.current.prov,parse_change.headers);
	});
}

function parse_resp(dts,prov,headers) {
	var arrr = {artifactGetChestLevel:"artifact",titanArtifactGetChest:"titanArtifact",titanGetSummoningCircle:"titanCircle",pet_getChest:"pet"};
	var starmoney = {length:0};
	var gettime = 0;
	var freebee = false;
	var is_change = false;

	if(headers['X-Request-Id'] > 1) {
		if((dts['userGetInfo'] !== undefined && dts['userGetInfo'].response.id != users.current.id) || (headers['X-Auth-Player-Id'] !== undefined && headers['X-Auth-Player-Id'] != users.current.id)) {
			let new_id = (headers['X-Auth-Player-Id'] !== undefined) ? headers['X-Auth-Player-Id'] : dts['userGetInfo'].response.id;
			set_user(new_id,prov);
			brs.storage.local.set({'hwg_users': users});
			if(users.lists[prov] !== undefined && users.lists[prov][new_id] !== undefined) {
				parse_change = {data:dts,headers:headers};
				change_user();
				return 0;
			} else set_default_current();			
		}
		if(dts['userChange'] !== undefined) {
			set_user(dts['userChange'].args.id,prov);
			brs.storage.local.set({'hwg_users': users});
			if(users.lists[prov] !== undefined && users.lists[prov][dts['userChange'].args.id] !== undefined) {
				change_user(false);
				return 0;
			} else set_default_current();
		}
		Object.keys(dts).forEach(function(key) {
			var dt = dts[key];
			if(dt.name == "artifactGetChestLevel" || dt.name == "titanArtifactGetChest" || dt.name == "titanGetSummoningCircle" || dt.name == "pet_getChest") {
				starmoney[arrr[dt.name]] = dt.response.starmoneySpent;
				starmoney.length++;
				is_change = true;
			}
			if(dt.name == "userGetInfo") {
				var usrinfo = dt.response;
				usrinfo.refillable = {};
				add_user_list(usrinfo.id,prov,0,usrinfo);
				dtcurrent.info = usrinfo;
				dtcurrent.id = usrinfo.id;
				dtcurrent.prov = prov;
				brs.storage.local.set({'hwg_users': users});
				is_change = true;
			}
			if(dt.name == "getTime") {
				gettime = dt.response;
				users.lists[users.current.prov][users.current.id].lastupdate = gettime;
				brs.storage.local.set({'hwg_users': users});
			}
			if(dt.name == "adventure_getPassed") {
				dtcurrent.adventurePassed = dt.response;
				is_change = true;
			}
			if(dt.name == "subscriptionGetInfo") {
				dtcurrent.subscription = dt.response.subscription;
				is_change = true;
			}
			if(dt.name == "arenaGetAll") {
				dtcurrent.arena = {battles:dt.response.battles,wins:dt.response.wins};
				is_change = true;
			}
			if(dt.name == "clanGetInfo" && dt.response !== null) {
				dtcurrent.clan = {title:dt.response.clan.title,icon:dt.response.clan.icon};
				is_change = true;
			}
			if(dt.name == "titanSpiritGetAll") {
				dtcurrent.SpiritAll = dt.response;
				is_change = true;
			}
			if(dt.name == "freebieCheck") {
				freebee = dt.args.giftId;
				is_change = true;
			}
			if(dt.name == "hallOfFameGetTrophies") {
				var igt = 0;
				var gtplaces = [];
				Object.keys(dt.response).sort(function(a, b){return b - a}).forEach(function(vkey) {
					if(igt < 10) {
						gtplaces.push(dt.response[vkey].place);
						igt++;
					}
				});
				dtcurrent.gtplaces = gtplaces;
				is_change = true;
			}
			if(dt.name == "consumableUseLootBox" && settings.lootdata.ids.indexOf(dt.args.libId) !== -1) {
				dtcurrent.UseLootBox.push({libId:dt.args.libId,amount:dt.args.amount,date:dt.date,reward:dt.response});
				is_change = true;
			}
			if(dt.name == "lootBoxBuy" && dt.args.box == "boxHalloween2018") {
				dtcurrent.LootBoxBuy.push({name:dt.args.box,amount:1,offerId:dt.args.offerId,price:dt.args.price,date:dt.date,reward:dt.response});
				is_change = true;
			}
			if(dt.name == "newYearGiftGet") {
				if(dtcurrent.newYearGift == undefined) dtcurrent.newYearGift = [];
				if(dtcurrent.newYearGift[dt.args.type] == undefined) dtcurrent.newYearGift[dt.args.type] = {};
				dtcurrent.newYearGift[dt.args.type] = dt.response;
				is_change = true;
			}
			if(dt.name == "inventoryGet") {
				dtcurrent.inventory = dt.response;
				is_change = true;
			}			
			if(dt.name == "scratch_open") {
				if(dtcurrent.ScratchOpen[dtcurrent.current_scratch] == undefined) {
					dtcurrent.ScratchOpen[dtcurrent.current_scratch] = {name:'scratch_open',amount:0,Id:dtcurrent.current_scratch,date:dt.date,reward:[]};
				}
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].reward[dt.args.slotId] = dt.response.reward;
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].date = dt.date;
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].amount++;
				is_change = true;
			}
			if(dt.name == "scratch_getState") {			
				if(dtcurrent.ScratchOpen[dtcurrent.current_scratch] != undefined && Object.keys(dt.response.slots).length < dtcurrent.ScratchOpen[dtcurrent.current_scratch].amount) {
					dtcurrent.current_scratch++;
				}
				if(dtcurrent.ScratchOpen[dtcurrent.current_scratch] == undefined) {
					dtcurrent.ScratchOpen[dtcurrent.current_scratch] = {name:'scratch_open',amount:0,Id:dtcurrent.current_scratch,date:dt.date,reward:[]};
				}
				Object.keys(dt.response.slots).forEach(function(vkey) {
					dtcurrent.ScratchOpen[dtcurrent.current_scratch].reward[vkey] = dt.response.allRewards[dt.response.slots[vkey]].reward;
					dtcurrent.ScratchOpen[dtcurrent.current_scratch].amount++;				
				});
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].date = dt.date;
				is_change = true;
			}
			if(dt.name == "scratch_refresh") {	
				dtcurrent.current_scratch++;
				is_change = true;
			}
			if(dt.name == "battleGetByType" || dt.name == "clanWarGetDayHistory") {	
				if(dtcurrent.battles['replays'] == undefined) dtcurrent.battles['replays'] = {};
				if(dtcurrent.battles['users'] == undefined) dtcurrent.battles['users'] = {};
				dt.response.replays.forEach(function(val) {		
					if(val.userId == dtcurrent.id || val.typeId == dtcurrent.id) dtcurrent.battles.replays[val.id] = val;
				});
				Object.keys(dt.response.users).forEach(function(vkey) {		
					dtcurrent.battles.users[vkey] = dt.response.users[vkey];
				});
				let ritr = 0;
				let rusr = {};
				Object.keys(dtcurrent.battles.replays).sort(function(a, b){return b-a}).forEach(function(vkey) {
					if(ritr > 49) delete dtcurrent.battles.replays[vkey];
					else {rusr[dtcurrent.battles.replays[vkey].userId] = true; rusr[dtcurrent.battles.replays[vkey].typeId] = true;}
					ritr++;
				});
				Object.keys(dtcurrent.battles.users).forEach(function(vkey) {
					if(rusr[vkey] == undefined)  delete dtcurrent.battles.users[vkey];
				});
				is_change = true;
			}		
			

		});
		if(starmoney.length != 0) {
			dtcurrent.starmoney = starmoney;
			dtcurrent.lastupdate = gettime;
			brs.storage.local.set({'hwg_lastupdate': gettime});
		}
		if(freebee !== false && dtcurrent.gifts[freebee] === undefined) dtcurrent.gifts[freebee] = dtcurrent.lastupdate;
	}
//registration args.user.{firstName,lastName}
//hallOfFameGetTrophies response
	//brs.storage.local.set({'hwg_current': dtcurrent});
	if(is_change) save_user_storage(dtcurrent);
}
function parse_hwURL(url) {
	var provarr = {wb:'hero-wars.com',vk:'i-heroes-vk',ok:'i-heroes-ok',mm:'i-heroes-mm',mg:'i-heroes-mg',fb:'i-heroes-ok'};
	var uri = {url:"",params:{}};
	var ur1 = url.split('?');
	var ur2 = (ur1[1] !== undefined) ? ur1[1].split('&') : [];
	uri.url = ur1[0];
	ur2.forEach(function(val) {
		var val_v = val.split('=');
		uri.params[val_v[0]] = val_v[1];
	});
	Object.keys(provarr).forEach(function(key) {
		if(uri.url.indexOf(provarr[key]) !== -1) uri.prov = key;
	});
	brs.storage.local.set({'hwg_uri': uri});
}
brs.runtime.onMessage.addListener(function(request, sender) {
	console.time('backgroundListener');

	if(request.from === "contentscr" && request.subject === "hero_data"){
		try{
			var req = JSON.parse(request.data);
			var data = {};
			var idents = {};
//			console.log(req);
			req.request.calls.forEach(function(cl){data[cl.name] = {name:cl.name,args:cl.args,ident:cl.ident,date:req.response.date};idents[cl.ident] = cl.name;});
			req.response.results.forEach(function(rs){data[idents[rs.ident]].response = rs.result.response;});
			var prov = req.url.match("https:\/\/heroes-(.*?).nextersglobal.com\/api\/")[1];
			if(a2uinf != false && settings['server'] && a2uinf.expire > Math.round((new Date()).getTime()/1000)) {
				hwg_server_data(request.data);
			}
			parse_resp(data,prov,req.requestheaders);
		}catch(e){
			console.log("Error "+e.name+":"+e.message+"\n"+e.stack)
		}
	}
	if(request.from === "contentscr" && request.subject === "hero_url"){
		const nnflash = "force_enable_flash";
		let matches = request.data.cookie.match(new RegExp("(?:^|; )" + nnflash.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		var detect_flash =  matches ? parseInt(decodeURIComponent(matches[1])) : 0;
		brs.storage.local.set({'hwg_isflash': detect_flash});
		parse_hwURL(request.data.url);
	}

	console.timeEnd('backgroundListener');
});
brs.storage.onChanged.addListener(function(changes, namespace) {
	console.time('onChangedListener');
	for (var key in changes) {
		if(key == 'hwg_current' && dtcurrent.id > 0 && dtcurrent.prov !== false) {
			console.time('onChangedListener_current');
			dtcurrent = changes[key].newValue;
			if(globaldata === undefined) globaldata = {};
			if(globaldata[dtcurrent.prov] === undefined) globaldata[dtcurrent.prov] = {};
			if(globaldata[dtcurrent.prov][dtcurrent.id] === undefined) globaldata[dtcurrent.prov][dtcurrent.id] = {};
			globaldata[dtcurrent.prov][dtcurrent.id] = dtcurrent;
			console.time('onChangedListener_current2');
			brs.storage.local.set({'hwg_data': globaldata});
			console.timeEnd('onChangedListener_current2');
			console.timeEnd('onChangedListener_current');
		}
		if(key == 'hwg_users') {users = changes[key].newValue;}
		if(key == 'hwg_settings') {settings = changes[key].newValue;}
		if(key == 'hwg_auth') {a2uinf = changes[key].newValue;}
	}
	console.timeEnd('onChangedListener');
});
brs.webRequest.onHeadersReceived.addListener(function(details) {
  return {};
}, {
  urls: ["<all_urls>"]
}, ["blocking"]);
function get_loot_info_data() {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = 'json';	
	xhr.open('GET', 'https://static.hwgame.top/assets/lootbx.json');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
		let res = {};
		if(xhr.status == 200) res = xhr.response;
		if(xhr.status != 200 || xhr.response['ids'] == undefined) res['ids'] = arr_lib_ids;
		if(xhr.status != 200 || xhr.response['list'] == undefined) res['list'] = loot_type_list;
		settings.lootdata = res; 
		brs.storage.local.set({'hwg_settings': settings});
	};
	xhr.send();	
	setTimeout(get_loot_info_data, 6*3600*1000);
}
function hwg_server_data(data) {
	hwg_send_data(data);
}
function hwg_send_data(data) {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = 'json';
	var params = 'ver=' + encodeURIComponent(manifest.version)+'&exp='+a2uinf.expire+'&data='+encodeURIComponent(data)+'&key='+a2uinf.key;
	xhr.open('POST', 'https://hwgame.top/plugin/send');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
}
function hwg_renew_key() {
	if(a2uinf != false && a2uinf.expire != 0) {
		let xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.responseType = 'json';
		var params = 'ver=' + encodeURIComponent(manifest.version) + '&ua=' + encodeURIComponent(navigator.userAgent) + '&exp=' + a2uinf.expire + '&key=' + a2uinf.key;
		xhr.open('GET', 'https://hwgame.top/plugin/reload_authkey?' + params);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		console.log('start_renew');
		xhr.onload = function () {
			if (xhr.status == 200) hwg_renew_key_end(xhr.response);
		};
		xhr.send();
	}
	setTimeout(hwg_renew_key, 8*3600*1000);
}
function hwg_renew_key_end(response) {
	console.log('renew');
	if(response.status == "ok") {
		console.log('renew_ok');
		if(response.response.expire > Math.round((new Date()).getTime()/1000)) {
			a2uinf = response.response;
		} else {a2uinf.expire = 0;}
	} else if(response.status == "error") {a2uinf.expire = 0;}
	brs.storage.local.set({'hwg_auth': a2uinf});
}

function generate_users() {
	users = {lists:{},current:{id:false,prov:false,hwg:false}};
	if(dtcurrent.prov !== false) set_user(dtcurrent.id,dtcurrent.prov);
	if(Object.keys(globaldata).length > 0) {
		Object.keys(globaldata).forEach(function(provider) {
			Object.keys(globaldata[provider]).forEach(function(usr) {
				save_user_storage(globaldata[provider][usr],'hwg_user_'+provider+'_'+usr);
				let uinfo = (globaldata[provider][usr].info === undefined) ? {} : globaldata[provider][usr].info;
				add_user_list(usr,provider,globaldata[provider][usr].lastupdate,uinfo);
			});
		});
	}
	brs.storage.local.set({'hwg_users': users});
}
function set_user(id,prov) {
	users.current.id = id;
	users.current.prov = prov;
	users.current.hwg = 'hwg_user_'+users.current.prov+'_'+users.current.id;	
}
function set_default_current() {
	dt_set_default();
	dtcurrent.id = users.current.id;
	dtcurrent.prov = users.current.prov;
}
function dt_set_default() {
	dtcurrent = JSON.parse(JSON.stringify(defcur));
}
function add_user_list(id,prov,last,info) {
	if(users.lists[prov] === undefined) users.lists[prov] = {};
	users.lists[prov][id] = {id:id,prov:prov,name:info.name,server:info.serverId,level:info.level,lastlogin:info.lastLoginTime,account:info.accountId};
	if(last > 0) users.lists[prov][id].lastupdate = last;
}
function save_user_storage(info,hwg_link = false) {
	localset = {};
	if(hwg_link === false) hwg_link = users.current.hwg;
	console.time('storage '+hwg_link);
	localset[hwg_link] = info;
	brs.storage.local.set(localset);
	console.timeEnd('storage '+hwg_link);	
}
