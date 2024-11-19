$("#result").empty().append(loader(6,'mt-5'));

function hwg_init_page() {
	brs.storage.local.get(['hwg_isflash','hwg_uri'], function(res) {
		if(res.hwg_isflash !== undefined && res.hwg_isflash)
			$("#result").empty().append(pl_alert('warning',lang['PL_PAN_WARN_FLASH'],'mt-4')).append(get_button(res.hwg_uri.prov));
		else {
			if(typeof dtcurrent.info !== "undefined" && dtcurrent.info !== "undefined" && dtcurrent.info !== false && Object.keys(dtcurrent.info).length > 0) {
				if(settings['getgifts'] !== undefined && settings['getgifts'] == true) {
					get_gifts_list();
				} else display_info();
			} else $("#result").empty().append(pl_alert('warning',lang['PL_PAN_WARN_NOTDATA'],'mt-4')).append(get_button());
		}
	});	
	if(settings.version) $("#dvers").text('v'+manifest.version);
}
function xhr_get_gifts_end(res) {display_info(res);}
function xhr_get_gifts_error(res) {display_info({status:'error'});}
function xhr_get_gifts_errorcode(res) {display_info({status:'errorcode'});}
function get_button(prov,gifts) {
	if(settings['defprov'] !== false && settings['defprov'] !== "all") prov = settings['defprov'];
	if(prov === undefined || prov === false) prov = "vk";
	if(gifts === undefined) gifts = false;
	let btn_href = (gifts !== false) ? gifts : provider[prov].h.def;
	let btn_color = (gifts !== false) ? 'danger' : 'primary';
	let dvb = $("<div>",{class:'row no-gutters mt-3 pl_div_btngroup'});
	dvb.append($("<div>",{class:'col-5'}).append($("<a>",{class:'btn btn-info btn-block',href:'https://hwgame.top',target:'_blank',text:lang['PL_PAN_BTN_SITE']})));
	dvb.append($("<div>",{class:'col-2'}).append($("<a>",{class:'btn btn-success',href:brs.runtime.getURL('settings.html'),target:'_blank'}).css("margin","0 2px").append($("<img>",{src:brs.runtime.getURL('images/sett.png'),width:20,height:20,title:lang['PL_LABEL_SETTINGS']}))));
	dvb.append($("<div>",{class:'col-5'}).append($("<a>",{class:'btn btn-'+btn_color+' btn-block',href:btn_href,target:'_blank',id:'pl_btn_startgame',text:lang['PL_PAN_BTN_STARTGAME']})));
	return dvb;
}

function format_update(last) {
	let lasttime = new Date(last*1000);
	let lastusec = ((new Date()).getTime() - lasttime.getTime())/1000;
	let res = '';
	if(lastusec <= 3600*4) {
		if(lastusec < 70) res = Math.round(lastusec)+lang['PL_TIME_SECAGO'];
		else if(lastusec < 3600) res = Math.round((lastusec/60))+lang['PL_TIME_MINAGO'];
		else if(lastusec < 3600*1.7) res = lang['PL_TIME_HOURAGO'];
		else res = Math.round((lastusec/3600))+lang['PL_TIME_HOURSAGO'];
	} else if(last == undefined) {
		res = 'неизвестно';
	} else {
		res = ('0'+lasttime.getDate()).substr(-2)+'.'+('0'+(lasttime.getMonth()+1)).substr(-2)+' '+('0'+lasttime.getHours()).substr(-2)+':'+('0'+lasttime.getMinutes()).substr(-2)+':'+('0'+lasttime.getSeconds()).substr(-2);
	}
	return res;
}

function display_info(gifts) {
	let usr = dtcurrent.info;
	const starmoney_spirit = [4500,45000,466667,850000,1133333,1416667,1700000,1983333,2266667,2550000,2833333,3116667,3400000,3683333,3966667,4250000,4533333,5100000];
	let gift = false;
	let spiritstar = 0;
	let spiritnext = "?";
	if(dtcurrent.SpiritAll !== undefined) {
		Object.keys(dtcurrent.SpiritAll).forEach(function(key) { spiritstar+=dtcurrent.SpiritAll[key].star; });
		if(dtcurrent.inventory !== undefined && dtcurrent.inventory.fragmentTitanArtifact !== undefined) {
			if(dtcurrent.inventory.fragmentTitanArtifact[4001] !== undefined) spiritstar+=dtcurrent.inventory.fragmentTitanArtifact[4001];
			if(dtcurrent.inventory.fragmentTitanArtifact[4002] !== undefined) spiritstar+=dtcurrent.inventory.fragmentTitanArtifact[4002];
			if(dtcurrent.inventory.fragmentTitanArtifact[4003] !== undefined) spiritstar+=dtcurrent.inventory.fragmentTitanArtifact[4003];
		}
		if(spiritstar < 18) spiritnext = starmoney_spirit[spiritstar] - dtcurrent.starmoney.titanArtifact;
		else spiritnext = 0;
	} else spiritstar = "?";

	var regtime = new Date(usr.registrationTime * 1000);

	var advi = 0;
	var adviarr = [];
	Object.keys(dtcurrent.adventurePassed).sort(function(a, b){return b - a}).forEach(function(key) { if(key != 101 && (advi < 7 || settings.adventAll)) {adviarr.push(key);advi++;} });
	adviarr.sort(function(a, b){return a - b});
	
	$("#result").empty();
	
	if(a2uinf != false && settings['server'] && a2uinf.sub_end < Math.round((new Date()).getTime()/1000)) {
		$("#result").append(pl_alert('danger',lang['PL_SERV_SUB_EXP']));
	} else if(a2uinf != false && settings['server'] && a2uinf.sub_end-3*24*3600 < Math.round((new Date()).getTime()/1000)) {
		$("#result").append(pl_alert('warning',lang['PL_SERV_SUB_MIN']+' <span id="result_time_subscription" data-time="'+a2uinf.sub_end+'"></span>'));
	} else if(a2uinf != false && settings['server'] && a2uinf.expire < Math.round((new Date()).getTime()/1000)) {
		$("#result").append(pl_alert('danger',lang['PL_SERVER']+': '+lang['PL_SERV_ERROR']));
	}
	if(settings['getgifts'] !== undefined && settings['getgifts'] == true && gifts !== undefined) {
		if(gifts.status == 'error') $("#result").append(pl_alert('danger',lang['PL_GIFTS']+': '+lang['PL_GIFTS_SRV_ERR']));
		else if(gifts.status == 'errorcode') $("#result").append(pl_alert('danger',lang['PL_GIFTS']+': '+lang['PL_GIFTS_ERR_COMM_SRV']));
		else if(gifts.response !== undefined && gifts.response.length > 0) {
			gifts.response.forEach(function(item) {
				if(dtcurrent.gifts === undefined || Object.keys(dtcurrent.gifts).length <= 0 || dtcurrent.gifts[item.giftId] === undefined) {
					if(gift == false) gift = get_gift_link(settings['defprov'],item.giftId,item.referrer);
				}
			})
		}
	}

	$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12'}).append($("<p>",{class:'text_p',text:usr.name})).append($("<span>",{text:' ('+lang['PL_SERVER']+': '+usr.serverId+')('+lang['PL_PROVIDER_'+dtcurrent.prov.toUpperCase()+'_SHORT']+')'}))));
	$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['UI_DIALOG_HERO_LEVEL_LABEL']}).append($("<p>",{class:'text_p',text:usr.level}))));
	$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['PL_PAN_REGISTRATION']}).append($("<p>",{class:'text_p',text:('0'+regtime.getDate()).substr(-2)+'.'+('0'+(regtime.getMonth()+1)).substr(-2)+'.'+regtime.getFullYear()}))));
	$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['PL_PAN_NEWDAY']}).append($("<span>",{id:'result_time_nextday'}))));
	$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['PL_PAN_ARENAREWARD']}).append($("<span>",{id:'result_time_arena'}))));
	if(settings.spirit) {
		$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['PL_PAN_TOTEMS']}).append($("<p>",{class:'text_p',text:spiritstar}))));
		$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['PL_PAN_NEXTTOTEM']}).append($("<p>",{class:'text_p',text:spiritnext})).append($("<span>",{text:lang['PL_PAN_NEXTEMERALDS']}))));
	}
	if(dtcurrent.arena.battles !== undefined && settings.arena) {
		let dv1 = $("<div>",{class:'row'});
		dv1.append($("<div>",{class:'col-5',text:lang['PL_PAN_ARENABATTLE']}).append($("<p>",{class:'text_p',text:dtcurrent.arena.battles})));
		dv1.append($("<div>",{class:'col-7',text:lang['PL_PAN_ARENAWINS']}).append($("<p>",{class:'text_p',text:dtcurrent.arena.wins+' ('+Math.round((dtcurrent.arena.wins/dtcurrent.arena.battles)*1000)/10+'%)'})));
		$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12 text-center',text:lang['PL_PAN_ARENA']}))).append(dv1);
	}
	if(dtcurrent.adventurePassed[1] !== undefined && settings.advent) {
		let tr1 = $("<tr>");
		let tr2 = $("<tr>");
		adviarr.forEach(function(key) { tr1.append($("<th>",{text:key})); tr2.append($("<td>",{text:dtcurrent.adventurePassed[key]}));});
		let advtbl = $("<table>",{class:'table table-bordered table-sm text-center'}).css("font-size","14px").append($("<thead>").append(tr1)).append($("<tbody>").append(tr2));
		$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12 text-center',text:lang['PL_PAN_ADVENTURESWINS']}))).append(advtbl);
	}
	if(settings.starmoney) {
		$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12 text-center',text:lang['PL_PAN_STARSPENT']+':'})));
		['titanArtifact','titanCircle','artifact','pet'].forEach(function(key) {
			$("#result").append($("<div>",{class:'row'})
				.append($("<div>",{class:'col-8',text:lang['PL_PAN_STAR_'+key.toUpperCase()]}))
				.append($("<div>",{class:'col-4 text_p',text:dtcurrent.starmoney[key]}))
			);
		});
	}
	$("#result").append($("<div>",{class:'row'}).append($("<div>",{class:'col-12',text:lang['PL_PAN_UPDATETIME']+': '}).append($("<p>",{class:'text_p',text:format_update(lastupd)}))));
	$("#result").append(get_button(dtcurrent.prov,gift));
	$("#pl_btn_startgame").click(function () {	_gaq.push(['_trackEvent', 'startgame', 'clicked']);	});
	set_timer_arena();
}

function set_timer_arena() {
	var curtime = new Date();
	while((dtcurrent.info.nextDayTs*1000)-curtime.getTime() < 0) { dtcurrent.info.nextDayTs+=3600*24};
	let nextDay = new Date((dtcurrent.info.nextDayTs * 1000)-curtime.getTime());
	let nextArena = new Date(nextDay.getTime()-9*3600000);
	if(nextDay.getTime() < 9*3600000) {
		$("#result_time_arena").empty().append($("<p>",{class:'text_p',text:lang['PL_PAN_REWARDTOMORROW']}));
	} else {
		$("#result_time_arena").empty().append($("<span>",{text:lang['PL_PAN_REWARDAFTER']})).append($("<p>",{class:'text_p',text:('0'+nextArena.getUTCHours()).substr(-2)+':'+('0'+nextArena.getUTCMinutes()).substr(-2)+':'+('0'+nextArena.getUTCSeconds()).substr(-2)}));
	}
	$("#result_time_nextday").empty().append($("<p>",{class:'text_p',text:('0'+nextDay.getUTCHours()).substr(-2)+':'+('0'+nextDay.getUTCMinutes()).substr(-2)+':'+('0'+nextDay.getUTCSeconds()).substr(-2)}));
	if($('span').is('#result_time_subscription')) {
//		let subost = new Date(($('#result_time_subscription').data('time') * 1000)-curtime.getTime());
//		$("#result_time_subscription").empty().append($("<p>",{class:'text_p',text:('0'+subost.getUTCHours()+24*subost.getUTCDay())+':'+('0'+subost.getUTCMinutes()).substr(-2)+':'+('0'+subost.getUTCSeconds()).substr(-2)}));
		let subost = $('#result_time_subscription').data('time')-Math.round(curtime.getTime()/1000);
		let sub_h = Math.floor(subost/3600);
		let sub_m = Math.floor((subost-sub_h*3600)/60);
		let sub_s = Math.floor(subost-sub_h*3600-sub_m*60);
		$("#result_time_subscription").empty().append($("<p>",{class:'text_p',text:('0'+sub_h).substr(-2)+':'+('0'+sub_m).substr(-2)+':'+('0'+sub_s).substr(-2)}));
	}
	setTimeout(set_timer_arena, 1000);
}