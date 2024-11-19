let def_toggle;
let summ_loot = {};
document.getElementById("sp_set_version").innerText = '(v'+manifest.version+')';
function hwg_init_page() {
	def_toggle = {on:lang['PL_ON'],off:lang['PL_OFF'],onstyle:'success',offstyle:'secondary',size:'sm',width:70};
	$('[pl-lang]').each(function(){if(lang[$(this).attr('pl-lang')] !== undefined) $(this).text(lang[$(this).attr('pl-lang')])});
	Object.keys(settings).forEach(function(key) {
		if(key == 'update') $('#t_set_'+key).bootstrapToggle(def_toggle).bootstrapToggle('disable');
		else $('#t_set_'+key).bootstrapToggle(def_toggle).change(function(){set_settings(key,$(this).prop('checked'))});
		if(key == 'advent' && settings[key]) $('#div_set_adventAll').show();
		if(settings[key]) $('#t_set_'+key).bootstrapToggle('on');
		if(key == 'getgifts' || key == 'server') $('#t_set_'+key).bootstrapToggle(def_toggle).bootstrapToggle('disable');
	});

	$("#s_set_defprov").append($("<option>",{value:'all',text:lang['PL_PROVIDER_ANY']}));
	$.each(provider, function(k,v){$("#s_set_defprov").append($("<option>",{value:k,text:lang['PL_PROVIDER_'+k.toUpperCase()]}));});
	if(settings['defprov'] !== false && provider[settings['defprov']] !== undefined && provider[settings['defprov']].gift) { $("#btn_get_gift_list").prop('disabled', false);$('#t_set_getgifts').bootstrapToggle('enable');}
	if(settings['defprov'] !== false) $("#s_set_defprov").val(settings['defprov']);
	else $('#div_set_giftsgroup_info').show();
	$("#s_set_lang").val(settings['lang']);
	$("#divlinkstart").empty().append(get_start_links());
	if(a2uinf != false) {
		let subinf = '';
		if(a2uinf.sub_end > Math.round((new Date()).getTime()/1000)) {
			subtime = new Date(a2uinf.sub_end*1000);
			subinf = lang['PL_SERV_SUB_ALL']+' '+('0'+subtime.getDate()).substr(-2)+'.'+('0'+(subtime.getMonth()+1)).substr(-2)+'.'+subtime.getFullYear();
		} else {
			subinf = lang['PL_SERV_SUB_EXP'];
		}
	    if(a2uinf.expire > Math.round((new Date()).getTime()/1000)) {
            $('#div_serv_info').addClass('alert alert-success').html(lang['PL_SERV_SUCC_NEW_KEY']+'<br><strong>'+subinf+'</strong>');
            $("#t_set_server").bootstrapToggle('enable');
	    } else {
            $("#btn_auth_plugin").show();
            $('#div_serv_info').addClass('alert alert-danger').html(lang['PL_SERV_EXPIRE']+'<br>'+subinf);
        }
		$("#div_sub_info").show();
	} else {
        $("#btn_auth_plugin").show();
        $("#div_serv_info").addClass('alert alert-warning').html(lang['PL_SERV_NOT_ACT']);
	}
	$("#setres").show();
	$("#setresserv").show();
	$('#setresbloot').empty();
	$('#setresloot').empty();
    if(dtcurrent.UseLootBox !== undefined && dtcurrent.UseLootBox.length > 0) hwg_init_lootbox_button();
	$("#setresnewyearj").val(get_newyear_sendinfo());
	hwg_init_help_page();
}
$("#downloadbutton").click(function () {
	let arsymb = ['20','21','22','23','24','26','27','28','29','2C','3A','3B','3C','3D','3E','3F','5B','5C','5D','5E','60','7B','7C','7D','7E'];
	let downtext = escape(JSON.stringify(dtcurrent));
	arsymb.forEach(function(item) {downtext = downtext.replace(new RegExp('%'+item,'g'),String.fromCharCode('0x'+item))});
	downtext = downtext.replace(/%u0/g,"\\u0").replace(/%25/g,"%");
	let downhref = 'data:application/octet-stream;base64, ' + btoa(downtext);
	$("#downloadbutton").attr('download', 'user_'+dtcurrent.id+'.json');
	$("#downloadbutton").attr('href', downhref);
});
function set_settings(name,ch) {
	if(name == 'advent') {
		if(ch == true) $('#div_set_adventAll').slideDown();
		else $('#div_set_adventAll').slideUp();
	}
	settings[name] = ch;
	brs.storage.local.set({'hwg_settings': settings});
}
function xhr_get_gifts_end(res) {
	if(res.response === undefined || res.response.length == 0) {
		$("#divgifts").html(pl_alert('warning',lang['PL_GIFTS_NOT_FOUND']));
		return false;
	}
	let tby = $('<tbody>');
	res.response.forEach(function(item) {
		let is_get = false;
		if(dtcurrent.gifts !== undefined && Object.keys(dtcurrent.gifts).length > 0 && dtcurrent.gifts[item.giftId] !== undefined) is_get = true;

		let fi = $('<tr>');
		let ctd = $('<td>').append(get_gift_time(item.startTime)).append($('<br>'));
		if(is_get) ctd.append($('<span>',{class: 'badge badge-pill badge-success',text: lang['PL_GIFTS_RECEIVED']}));
		else ctd.append($('<span>',{class: 'badge badge-pill badge-secondary',text: lang['PL_GIFTS_NOT_RECEIVED']}));
		fi.append(ctd);
		fi.append($('<td>',{class:'text-center'}).append($('<a>',{href:item.descLink,target:'_blank'}).append($('<img>',{src:item.descImgLink,height:80}))));
		fi.append($('<td>',{text:get_gift_time(item.endTime)}));
		ctd = $('<td>');
		if(!is_get) ctd.append($('<a>',{class:'btn btn-success btn-sm mb-2',target:'_blank',href:get_gift_link(settings.defprov,item.giftId,item.referrer),text:lang['PL_GIFTS_RECEIVE']})).append($('<br>'));
		ctd.append($('<button>',{class:'btn btn-'+((is_get) ? 'warning' : 'primary')+' btn-sm btn_gift_set_get',type:'button','gift-id':item.giftId,'gift-stat':is_get,text:lang['PL_GIFTS_'+((is_get) ? 'DID_NOT_RECEIVE' : 'ALREADY_RECEIVED')]}));
		fi.append(ctd);
		tby.append(fi);
	})

	let h3 = $('<h3>',{class:'text-center',text:lang['PL_GIFTS']}).append($('<span>',{text:' ('+dtcurrent.info.name+', '+lang['PL_SERVER']+': '+dtcurrent.info.serverId+')'}).css("font-size","55%"));
	$("#divgifts").empty().append(h3).append(
		$('<table>',{class:'table'}).append(
			$('<thead>').append(
				$('<tr>')
					.append($('<th>',{class:'text-center',text:lang['PL_GIFTS_DATE']}))
					.append($('<th>',{class:'text-center',text:lang['PL_GIFTS_PUBLICATION']}))
					.append($('<th>',{class:'text-center',text:lang['PL_GIFTS_VALIDITY']}))
					.append($('<th>',{style:'min-width:130px;'}))
			)
		).append(tby)
	);
	gifts_btninit();
}
function xhr_get_gifts_error(res) {$("#divgifts").html(pl_alert('danger',lang['PL_GIFTS_SRV_ERR']));}
function xhr_get_gifts_errorcode(res) {$("#divgifts").html(pl_alert('danger',lang['PL_GIFTS_ERR_COMM_SRV']));}
function get_gift_time(tm) {
	let t = new Date(tm*1000);
	return ('0'+t.getDate()).substr(-2)+'.'+('0'+(t.getMonth()+1)).substr(-2)+'.'+t.getFullYear().toString().substr(-2)+' '+('0'+t.getHours()).substr(-2)+':'+('0'+(t.getMinutes())).substr(-2);
}
function get_start_links() {
	let html5 = $('<tr>').append($('<td>').append($('<b>',{text:'HTML5'})));
	let flash = $('<tr>').append($('<td>').append($('<b>',{text:'Flash'})));
	$.each(provider, function(k,v){
		html5.append($('<td>').append($('<a>',{href:v.h.def,style:'background-color: '+v.color+';',text:lang['PL_PROVIDER_'+k.toUpperCase()+'_SHORT']})));
		flash.append($('<td>').append($('<a>',{href:get_hf_href(k,true),style:'background-color: '+v.color+';',text:lang['PL_PROVIDER_'+k.toUpperCase()+'_SHORT']})));
	});
	return $('<table>',{class:'table table-sm tbl-link-start'}).append($('<tbody>').append(html5));
}
$("#btn_get_gift_list").click(function () {
	$("#divgifts").html(loader(4));
	$("#hraftergifts").css('display','block');
	get_gifts_list();
});
function gifts_btninit() {
	$(".btn_gift_set_get").click(function () {
		if($(this).attr('gift-stat') == "true") delete dtcurrent.gifts[$(this).attr('gift-id')];
		else dtcurrent.gifts[$(this).attr('gift-id')] = Math.round((new Date()).getTime() / 1000);
		brs.storage.local.set({'hwg_current': dtcurrent});
		get_gifts_list();
	});
}
$('#s_set_defprov').on('change', function() {
	settings.defprov = $(this).val();
	brs.storage.local.set({'hwg_settings': settings});
	$("#divgifts").html('');
	if(provider[$(this).val()] !== undefined && provider[$(this).val()].gift) { $("#btn_get_gift_list").prop('disabled', false); $('#t_set_getgifts').bootstrapToggle('enable'); $('#div_set_giftsgroup_info').hide();}
	else { $("#btn_get_gift_list").prop('disabled', true); $('#t_set_getgifts').bootstrapToggle('off').bootstrapToggle('disable'); $('#div_set_giftsgroup_info').show();}
});
$('#s_set_lang').on('change', function() {
	settings.lang = $(this).val();
	brs.storage.local.set({'hwg_settings': settings});
	location.reload();
});
// $('#servbutton').click(function () { $('#tblserver-tab').click();});
$('#tblhome-tab').click(function () {nav_tabs_click('tblhome')});
$('#tblserver-tab').click(function () {nav_tabs_click('tblserver')});
$('#tbllootbox-tab').click(function () {nav_tabs_click('tbllootbox')});
$('#tblbattles-tab').click(function () {nav_tabs_click('tblbattles'); hwg_init_battles();});
$('#tblnewyear-tab').click(function () {nav_tabs_click('tblnewyear')});
$('#tblhelp-tab').click(function () {nav_tabs_click('tblhelp')});
function nav_tabs_click(nvt) {
	let tbs = ['tblhome','tblserver','tbllootbox','tblbattles','tblnewyear','tblhelp'];
	tbs.forEach(function(key) {
		if(key == nvt) {
			$('#'+key+'-tab').addClass('active');
			$('#'+key).addClass('show').addClass('active');
		} else {
			$('#'+key+'-tab').removeClass('active');
			$('#'+key).removeClass('show').removeClass('active');
		}
	})
}
/*
function reward_loot(krew) {
	let ktype = Object.keys(krew)[0];
	let rcls = ktype;
	let rsrc = '';
	let rsumm = 0;
	if(ktype == 'consumable' || ktype == 'coin' || ktype == 'fragmentHero') {
		let kk = Object.keys(krew[ktype])[0];
		rsrc = 'https://static.hwgame.top/temp/'+ktype+'/'+kk+'.png';
		rsumm = krew[ktype][kk];
		if(summ_loot[ktype] == undefined) summ_loot[ktype] = {};
		if(summ_loot[ktype][kk] == undefined) summ_loot[ktype][kk] = 0;
		summ_loot[ktype][kk] += parseInt(rsumm);
	} else if(ktype == 'gold') {
		rcls = 'pseudo';
		rsrc = 'https://static.hwgame.top/temp/pseudo/2.png';
		rsumm = krew[ktype];
		if(summ_loot[ktype] == undefined) summ_loot[ktype] = 0;
		summ_loot[ktype] += parseInt(rsumm);
	} else if(ktype == 'avatar') {
		return $('<div>',{class:'vkheroimg avatar'}).append($('<img>',{height:80,src:'https://static.hwgame.top/temp/avatar/'+Object.keys(krew['avatar'])[0]+'.png'}));
	}
	return $('<div>',{class:'vkheroimg '+rcls}).append($('<img>',{src:rsrc})).append($('<span>',{text:rsumm}));
}
*/
function hwg_init_help_page() {
	
	let divloot = $('<div>');
	settings.lootdata.ids.forEach(function(val) {
		divloot.append($('<hwimage>',{type:'consumable',hid:val}));
	});
	$('#setreshelptab').empty().append($('<h4>',{text:lang['PL_HELP_LOOTBOX'],class:'text-center'})).append(divloot).show();
	if(hwlib_status > 0) hwimage_start();
	generate_table_user_data();
	

	//setreshelptab
}

function generate_table_user_data(ddata = false) {
	let tbl = $('<table>',{class:'table table-bordered'});
	let thd = $('<thead>');
	let thdtr = $('<tr>');
	thdtr.append($('<th>',{text:'Соц.сеть'})).append($('<th>',{text:'ID'})).append($('<th>',{text:'Ник'})).append($('<th>',{text:lang['PL_SERVER']})).append($('<th>',{text:lang['PL_PAN_UPDATETIME']}));
	if(ddata) thdtr.append($('<th>',{text:lang['PL_MENU_LOOTBOXES']})).append($('<th>',{text:lang['PL_MENU_BATTLES']})).append($('<th>',{text:'Данных'}));
	thdtr.append($('<th>',{text:''}));
	thd.append(thdtr);
	let tbd = $('<tbody>');
	if(Object.keys(users.lists).length > 0) {
		Object.keys(users.lists).forEach(function(prov) {
			Object.keys(users.lists[prov]).forEach(function(usr) {
				let curr_i = users.lists[prov][usr];
				let trc;
				if(users.current.id == curr_i.id && users.current.prov == curr_i.prov) trc = $('<tr>',{class:'table-success'});
				else trc = $('<tr>');
				trc.append($('<td>').append($('<span>',{class:'prov_style',style:'background-color: '+provider[curr_i.prov].color+';',text:lang['PL_PROVIDER_'+curr_i.prov.toUpperCase()+'_SHORT']})));
				trc.append($('<td>',{text:curr_i.id}));
				trc.append($('<td>',{text:curr_i.name}));
				trc.append($('<td>',{text:curr_i.server}));
				trc.append($('<td>',{text:get_gift_time(curr_i.lastupdate)}));
				if(ddata) {
					trc.append($('<td>',{text:curr_i.lootbox}));
					trc.append($('<td>',{text:curr_i.battles}));
					trc.append($('<td>',{text:curr_i.size}));
				}
				trc.append($('<td>').append($('<button>',{class:'btn btn-success btn-sm btn-change_user',text:'См','data-id':curr_i.id,'data-prov':curr_i.prov})));
				tbd.append(trc);
			});
		});
	}
	
	tbl.append(thd).append(tbd);
	$('#setres4').empty().append($('<h4>',{text:'Аккаунты в плагине',class:'text-center'}).append($('<button>',{class:'btn btn-link btn-sm btn-full-user-data',text:'Подробные данные'}))).append(tbl).show();
	$('.btn-change_user').click(function(){
		users.current.id = $(this).data('id');
		users.current.prov = $(this).data('prov');
		users.current.hwg = 'hwg_user_'+users.current.prov+'_'+users.current.id;
		load_current_info();
	});
	$('.btn-full-user-data').click(function(){
		full_user_data();
	});
}
function full_user_data() {
	$('#setres4').empty().html(loader(4));
	let usr_list = [];
	if(Object.keys(users.lists).length > 0) {
		Object.keys(users.lists).forEach(function(prov) {
			Object.keys(users.lists[prov]).forEach(function(usr) {
				usr_list.push('hwg_user_'+prov+'_'+usr);
			});
		});
	}
	brs.storage.local.get(usr_list, function(res) {
		Object.keys(res).forEach(function(usrr) {
			let v_lootbox = 0;
			let v_battles = 0;
			let v_size = 0;
			if(typeof res[usrr].UseLootBox !== "undefined") v_lootbox += res[usrr].UseLootBox.length;
			if(typeof res[usrr].LootBoxBuy !== "undefined") v_lootbox += res[usrr].LootBoxBuy.length;
			if(typeof res[usrr].battles !== "undefined" && typeof res[usrr].battles.replays !== "undefined") v_battles = Object.keys(res[usrr].battles.replays).length;
			v_size = JSON.stringify(res[usrr]).length;
			users.lists[res[usrr].prov][res[usrr].id].lootbox = v_lootbox;
			users.lists[res[usrr].prov][res[usrr].id].battles = v_battles;
			users.lists[res[usrr].prov][res[usrr].id].size = v_size;
		});
		generate_table_user_data(true);
	});	
}
function delete_user_data(id,prov) {
	
	
	
}

function reward_loot(krew) {
	let ktype = Object.keys(krew)[0];
	let rcls = ktype;
	let rsrc = '';
	let rsumm = 0;
	let el = '';
	if(ktype == 'consumable' || ktype == 'coin' || ktype == 'fragmentHero' || ktype == 'fragmentTitan' || ktype == 'fragmentSkin' || ktype == 'refillable' || ktype == 'fragmentGear' || ktype == 'fragmentScroll' ||  ktype == 'fragmentTitanArtifact') {
		let kk = Object.keys(krew[ktype])[0];
		el = $('<hwimage>',{type:ktype,hid:kk,value:krew[ktype][kk]});
		if(summ_loot[ktype] == undefined) summ_loot[ktype] = {};
		if(summ_loot[ktype][kk] == undefined) summ_loot[ktype][kk] = 0;
		summ_loot[ktype][kk] += parseInt(krew[ktype][kk]);
	} else if(ktype == 'gold' || ktype == 'starmoney' || ktype == 'stamina') {
		el = $('<hwimage>',{type:ktype,value:krew[ktype]});
		if(summ_loot[ktype] == undefined) summ_loot[ktype] = 0;
		summ_loot[ktype] += parseInt(krew[ktype]);
	} else if(ktype == 'avatar' || ktype == 'avatarFrame') {
		el = $('<hwimage>',{type:ktype,hid:Object.keys(krew[ktype])[0]});
	} else {
		console.log('not element!');
		console.log(krew);
	}
	return el;
}
function get_newyear_sendinfo() {
	let res = {'nygift':dtcurrent.newYearGift,'top':[],'info':{'prov':dtcurrent.prov,'ver':manifest.version}};
	
	let ng0 = (res.nygift !== undefined && res.nygift[0] !== undefined && res.nygift[0].gifts !== undefined) ? res.nygift[0].gifts.length : 0;
	let ng1 = (res.nygift !== undefined && res.nygift[1] !== undefined && res.nygift[1].gifts !== undefined) ? res.nygift[1].gifts.length : 0;
	$("#panelnygiftssent").text(ng1);
	$("#panelnygiftsreceived").text(ng0);
	let sinf = ['accountId','avatarId','clanId','frameId','id','leagueId','level','name','serverId','registrationTime'];
	Object.keys(dtcurrent.info).forEach(function(key) {if(sinf.indexOf(key) !== -1) res.info[key] = dtcurrent.info[key]; });
	let sg = ng0+res.info.accountId+res.info.id+res.info.name+res.info.level+res.info.serverId+manifest.version+res.info.clanId+ng1;
	res.info.sg = "";
    for (i=0; i<sg.length;i++) {res.info.sg=res.info.sg+String.fromCharCode(sg.charCodeAt(i)^45);}
    res.info.sg= btoa(unescape(encodeURIComponent(res.info.sg)));
	sum_rs = {};
	let tdiv = $('<div>');
	if(ng0 > 0) {
		dtcurrent.newYearGift[0].gifts.forEach(function(key) {
			if(key.reward != null) {
				Object.keys(key.reward).forEach(function(keytype) {
					if(sum_rs[keytype] == undefined) sum_rs[keytype] = {};
					Object.keys(key.reward[keytype]).forEach(function(keyid) {
						if(sum_rs[keytype][keyid] == undefined) sum_rs[keytype][keyid] = key.reward[keytype][keyid];
						else sum_rs[keytype][keyid] += key.reward[keytype][keyid];
					});
				});
			}
		});
		Object.keys(sum_rs).forEach(function(keytype) {
			Object.keys(sum_rs[keytype]).forEach(function(keyid) {
				let rewtwo = {};
				rewtwo[keytype] = {};
				rewtwo[keytype][keyid] = sum_rs[keytype][keyid];
				tdiv.append(reward_loot(rewtwo));
			});	
		});
	}
	$('#sumresnewyeargift').append(tdiv);
	if(a2uinf == false) $('#divnyhelpsite').html(lang['PL_NY_SITE_HELP']).show();
	if(hwlib_status > 0) hwimage_start();
	return JSON.stringify(res);
}
$("#btnCopyNyGift").click(function() {
  var copyText = document.getElementById("setresnewyearj");
  copyText.select();
  document.execCommand("copy");
//  alert("Text сopied");
});
function hwg_init_lootbox_button() {
    $('#setresbloot').empty();
    let divsel = $('<div>',{class:'row mt-3 mb-3'});
    settings.lootdata.list.forEach(function(key) {
        divsel.append($('<div>',{class:'mb-2 col-md-'+key.col}).append($('<button>',{text:(key[settings.lang] == undefined) ? key.ru : key[settings.lang],type:'button',class:'btn btn-outline-primary btn-lg btn-block loot_sel_type',id:'sel_type_'+key.id,'attr-id':key.id})));
    });

    $('#setresbloot').append(divsel);	
	$("#setresbloot").show();

    $('.loot_sel_type').click(function () {
		$('.loot_sel_type').each(function(){ $(this).removeClass('active');  });
        cur_loot_type = $(this).attr('attr-id');
		let bttext = $(this).text();
		$(this).html('<span class="spinner-border spinner-border-sm" role="status"></span> '+bttext);
		$(this).prop('disabled', true);
        hwg_init_lootbox();
		$(this).prop('disabled', false);
		$(this).addClass('active');
		$(this).html(bttext);
    });
}
String.prototype.rot13 = function(){
    return this.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};
function hwg_init_lootbox() {
    summ_loot = {};
    $('#setresloot').empty();

	let tby = $('<tbody>');
	if(dtcurrent.UseLootBox.length > 0) {
		dtcurrent.UseLootBox.forEach(function(key) {
			if(cur_loot_type == 0 || cur_loot_type == key.libId) {
				let tbtd = $('<td>');
				key.reward.forEach(function (krew) {
					if (Object.keys(krew).length > 1) {
						tbtd.append(reward_loot(krew));
						let rewtwo = {};
						rewtwo[Object.keys(krew)[1]] = krew[Object.keys(krew)[1]];
						tbtd.append(reward_loot(rewtwo));
					} else {
						tbtd.append(reward_loot(krew));
					}
				})
				tby.append($('<tr>').append($('<td>', {text: get_gift_time(key.date)})).append(($('<td>', {text: key.amount}))).append(tbtd));
			}
		});
	}
	let mass_boxBuy = [];
	let cur_el_massBuy = {date:0,amount:0,reward:[]};
	if(dtcurrent.LootBoxBuy.length > 0) {
		dtcurrent.LootBoxBuy.forEach(function(key) {
			if(cur_loot_type == 0 || cur_loot_type == key.name) {
	//			console.log(key.reward);
				if(key.date - cur_el_massBuy.date < 120) {
					cur_el_massBuy.amount += 1;
					cur_el_massBuy.reward.push(key.reward[0]);
				} else {
					if(cur_el_massBuy.date != 0) mass_boxBuy.push(cur_el_massBuy);
					cur_el_massBuy = {date:key.date,amount:1,reward:[]};
					cur_el_massBuy.reward.push(key.reward[0]);
				}
			}
		});
	}
	if(cur_el_massBuy.date != 0) mass_boxBuy.push(cur_el_massBuy);
	mass_boxBuy.forEach(function(key) {
		let tbtd = $('<td>');
		key.reward.forEach(function (krew) {
			if (Object.keys(krew).length > 1) {
				tbtd.append(reward_loot(krew));
				let rewtwo = {};
				rewtwo[Object.keys(krew)[1]] = krew[Object.keys(krew)[1]];
				tbtd.append(reward_loot(rewtwo));
			} else {
				tbtd.append(reward_loot(krew));
			}
		})
		tby.append($('<tr>').append($('<td>', {text: get_gift_time(key.date)})).append(($('<td>', {text: key.amount}))).append(tbtd));
	});
	let thd = $('<thead>');
	if(cur_loot_type == "scratch") {
		dtcurrent.ScratchOpen.forEach(function(key) {
            let tbtd = $('<td>');
			for(var i = 0; i < 32; i++){
				if(key.reward[i] == undefined || key.reward[i] == null) {
					tbtd.append($('<hwimage>',{type:"undefined",value:""}));
				} else {
					tbtd.append(reward_loot(key.reward[i]));
				}
				
			}
/*
            key.reward.forEach(function (krew) {
                if (Object.keys(krew).length > 1) {
                    tbtd.append(reward_loot(krew));
                    let rewtwo = {};
					rewtwo[Object.keys(krew)[1]] = krew[Object.keys(krew)[1]];
                    tbtd.append(reward_loot(rewtwo));
                } else {
                    tbtd.append(reward_loot(krew));
                }
            })
*/			
            tby.append($('<tr>').append($('<td>', {text: get_gift_time(key.date)})).append(tbtd));
		});
		thd.append($('<tr>').append($('<th>',{text:lang['PL_TABLE_DATE']})).append($('<th>',{text:'Ячейки',style:'width:750px;'})));
	} else {
		thd.append($('<tr>').append($('<th>',{text:lang['PL_TABLE_DATE']})).append($('<th>',{text:'Кол-во'})).append($('<th>',{text:'Лут'})));
	}
	$('#setresloot').append($('<table>',{class:'table table-bordered'}).append(thd).append(tby));
	let dvsum = $('<div>');
	Object.keys(summ_loot).forEach(function(key) {
		if(key != 'gold' && key != 'stamina' && key != 'starmoney') {
			Object.keys(summ_loot[key]).forEach(function(krew) {
				let rrew = {}
				rrew[key] = {};
				rrew[key][krew] = summ_loot[key][krew];
				dvsum.append(reward_loot(rrew));
			})
		} else {
			let rwl = {};
			rwl[key] = summ_loot[key];
			dvsum.append(reward_loot(rwl));
		}
	})
	$('#setresloot').append(dvsum);
	if(hwlib_status > 0) hwimage_start();
	$("#setresloot").show();

}

function get_hero_build(hero) {
	let u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	let o = function(e, n) {for (; e.length < n; ) e = "0" + e;return e};
	let hrune = [0,50,100,150,200,250,330,410,490,570,650,840,1030,1220,1410,1600,1820,2040,2260,2480,2700,3220,3740,4260,4780,5300,5890,6480,7070,7660,8250,9040,9830,10620,11410,12200,13070,13940,14810,15680,16550,18520,20490,22460,24430,26400,29870,33340,36810,40280,43750];
	var t = "0000";
	hero.artifacts.forEach(function(e) {
		t += o(e.level.toString(2), 8),
		t += o(e.star.toString(2), 3)
	}),
	t += o(hero.level.toString(2), 8),
	t += o(hero.color.toString(2), 5),
	t += o(hero.star.toString(2), 3),
	t += o(hero.titanGiftLevel.toString(2), 5),
	[0, 1, 2, 3, 4, 5].map(function(ek) {
		return t += (hero.slots[ek] != undefined) ? "1" : "0"
	}),
	Object.keys(hero.skills).forEach(function(ek) {
		if(ek < 6000) t += o(hero.skills[ek].toString(2), 8);
	}),
	hero.runes.forEach(function(e) {
		let crun=0;
		for(let ir =0;ir<hrune.length;ir++) if(e >= hrune[ir]) crun = ir;
		return t += o(crun.toString(2), 6)
	});
	if(hwlib !== undefined && hwlib.skin !== undefined) {
		Object.keys(hwlib.skin).forEach(function(sk) {
			if(hwlib.skin[sk].enabled == 1 && hwlib.skin[sk].heroId == hero.id) {
				t += o((hero.skins[hwlib.skin[sk].id] || 0).toString(2), 6);
			}
		});
	} else t += "0000";
	
	for (var hres = "", i = 0; i < t.length; i += 6)
		hres += u[parseInt(t.substring(i, i + 6), 2)];
	return hres;
}

function get_pet_build(pet) {
	let u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	let o = function(e, n) {for (; e.length < n; ) e = "0" + e;return e};
	var t = "00";
	t += o(pet.level.toString(2), 8),
	t += o(pet.color.toString(2), 5),
	t += o(pet.star.toString(2), 3),	
	[0, 1, 2, 3, 4, 5].map(function(ek) {
		return t += o(((pet.slots[ek] != undefined) ? pet.slots[ek] : "0").toString(2), 6);
	});
	for (var hres = "", i = 0; i < t.length; i += 6)
		hres += u[parseInt(t.substring(i, i + 6), 2)];
	return hres;;
}

function hwg_init_battles() {
    $('#setresBattles').empty();
	$('#setresBattles').append($('<div>',{class:'alert alert-warning text-center font-weight-bold',text:lang['PL_DEVELOP']}));
	$('#setresBattles').append($('<div>',{class:'alert alert-primary text-center',text:lang['PL_BATTLES_CLICK_HERO']}));
	let thd = $('<thead>');
	let tby = $('<tbody>');
	let cusr = dtcurrent.battles.users;
	Object.keys(dtcurrent.battles.replays).sort(function(a, b){return b-a}).forEach(function(key) {
		let cbtl = dtcurrent.battles.replays[key];
		let btype = lang['PL_BATTLES_TYPE_'+cbtl.type.toUpperCase()];
		
		let att_pack = $('<div>',{style:'zoom:90%;'});
		let def_pack = $('<div>',{style:'zoom:90%;'});
		Object.keys(cbtl.attackers).forEach(function(atkey) {
			if(cbtl.attackers[atkey].type == 'hero') att_pack.append($('<a>',{target:'_blank',href:'https://hero-wars.hwgame.top/heroes/'+cbtl.attackers[atkey].id+'/'+get_hero_build(cbtl.attackers[atkey])}).append($('<hwimage>',{type:'hero',hid:cbtl.attackers[atkey].id,color:cbtl.attackers[atkey].color,star:cbtl.attackers[atkey].star,level:cbtl.attackers[atkey].level,size:'sm'})));
			if(cbtl.attackers[atkey].type == 'pet') att_pack.append($('<a>',{target:'_blank',href:'https://hero-wars.hwgame.top/pets/'+cbtl.attackers[atkey].id+'/'+get_pet_build(cbtl.attackers[atkey])}).append($('<hwimage>',{type:'pet',hid:cbtl.attackers[atkey].id,color:cbtl.attackers[atkey].color,star:cbtl.attackers[atkey].star,level:cbtl.attackers[atkey].level,size:'sm'})));
			if(cbtl.attackers[atkey].type == 'titan') { 
				att_pack.append($('<hwimage>',{type:'fragmentTitan',hid:cbtl.attackers[atkey].id}));
				att_pack.css('zoom','70%');
			}
		});
		Object.keys(cbtl.defenders[0]).forEach(function(dfkey) {
			if(cbtl.defenders[0][dfkey].type == 'hero') def_pack.append($('<a>',{target:'_blank',href:'https://hero-wars.hwgame.top/heroes/'+cbtl.defenders[0][dfkey].id+'/'+get_hero_build(cbtl.defenders[0][dfkey])}).append($('<hwimage>',{type:'hero',hid:cbtl.defenders[0][dfkey].id,color:cbtl.defenders[0][dfkey].color,star:cbtl.defenders[0][dfkey].star,level:cbtl.defenders[0][dfkey].level,size:'sm'})));
			if(cbtl.defenders[0][dfkey].type == 'pet') def_pack.append($('<a>',{target:'_blank',href:'https://hero-wars.hwgame.top/pets/'+cbtl.defenders[0][dfkey].id+'/'+get_pet_build(cbtl.defenders[0][dfkey])}).append($('<hwimage>',{type:'pet',hid:cbtl.defenders[0][dfkey].id,color:cbtl.defenders[0][dfkey].color,star:cbtl.defenders[0][dfkey].star,level:cbtl.defenders[0][dfkey].level,size:'sm'})));
			if(cbtl.defenders[0][dfkey].type == 'titan') {
				def_pack.append($('<hwimage>',{type:'fragmentTitan',hid:cbtl.defenders[0][dfkey].id}));
				def_pack.css('zoom','70%');
			}
		});

		
		if(cusr[cbtl.userId] == undefined) {cusr[cbtl.userId] = {avatarId:1,frameId:1,name:'?'};}
		if(cusr[cbtl.typeId] == undefined) {cusr[cbtl.typeId] = {avatarId:1,frameId:1,name:'?'};} 	
		let atav = $('<div>',{style:'flex: 0 0 95px;margin-right: -22px;margin-left: 10px;align-self: flex-end;'});
		let dfav = $('<div>',{style:'flex: 0 0 95px;margin-right: -22px;margin-left: 10px;align-self: flex-end;'});
		atav.append($('<hwimage>',{type:'avatar',hid:cusr[cbtl.userId].avatarId,frame:cusr[cbtl.userId].frameId}));
		dfav.append($('<hwimage>',{type:'avatar',hid:cusr[cbtl.typeId].avatarId,frame:cusr[cbtl.typeId].frameId}));
		let attack = $('<td>').append($('<div>',{class:'row'}).append(atav).append($('<div>',{class:'col-auto'}).append($('<div>',{text: cusr[cbtl.userId].name,class:'font-weight-bold'})).append(att_pack)));
		let defend = $('<td>').append($('<div>',{class:'row'}).append(dfav).append($('<div>',{class:'col-auto'}).append($('<div>',{text: cusr[cbtl.typeId].name,class:'font-weight-bold'})).append(def_pack)));
		let binfo = $('<td>',{class:'text-center'});
		binfo.append($('<span>', {text:btype}));
		if(cbtl.userId == dtcurrent.id) {
			if(cbtl.result.win) binfo.append($('<p>', {text:lang['PL_BATTLES_ATACK_WIN'],class:'text-success font-weight-bold mb-0'}));
			else binfo.append($('<p>', {text:lang['PL_BATTLES_ATACK_NOTWIN'],class:'text-danger font-weight-bold mb-0'}));
		} else {
			if(cbtl.result.win) binfo.append($('<p>', {text:lang['PL_BATTLES_DEFEND_NOTWIN'],class:'text-danger font-weight-bold mb-0'}));
			else binfo.append($('<p>', {text:lang['PL_BATTLES_DEFEND_WIN'],class:'text-success font-weight-bold mb-0'}));				
		}
//		binfo.append($('<button>', {class:'btn btn-success btnCopyBattle',style:'padding: 1px 4px 4px 5px;margin:1px;','data-href':'https://vk.com/bestmoba#replay_id='+cbtl.id}).append($('<img>',{src:'https://static.hwgame.top/assets/images/dialog_basic/chatIcon.png',height:'16'})));
		binfo.append($('<a>', {class:'btn btn-success',style:'padding: 1px 4px 4px 5px;margin:1px;',href:provider[dtcurrent.prov].h.def+'#replay_id='+cbtl.id,target:'_blank'}).append($('<img>',{src:'https://cdn.hwgame.top/assets/images/dialog_basic/cameraIcon.png',height:'16'})));
		tby.append($('<tr>').append($('<td>', {text: get_gift_time(cbtl.startTime)})).append(attack).append(binfo).append(defend));
	});
	
	thd.append($('<tr>').append($('<th>',{text:lang['PL_TABLE_DATE'],style:'width:90px;'})).append($('<th>',{text:lang['PL_BATTLES_TABLE_ATTACK']})).append($('<th>',{text:''})).append($('<th>',{text:lang['PL_BATTLES_TABLE_DEFEND']})));
	$('#setresBattles').append($('<table>',{class:'table table-bordered'}).append(thd).append(tby));
	$('#setresBattles').append($('<input>',{type:'hidden',id:'inpBattleCopy'}));
	if(hwlib_status > 0) hwimage_start();
	$('#setresBattles').show();
}


$('#btn_auth_plugin').click(function () {
    $('#div_serv_info').removeClass().html(loader(3));
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = 'json';
	var params = 'ver=' + encodeURIComponent(manifest.version)+'&ua='+encodeURIComponent(navigator.userAgent);
	xhr.open('GET', 'https://hwgame.top/plugin/get_authkey?'+params);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
		if (xhr.status == 200) xhr_get_authkey_end(xhr.response);
		else xhr_get_authkey_errorcode();
	};
	xhr.onerror = xhr_get_authkey_errorcode;
	xhr.send();
});
function xhr_get_authkey_end(response) {
    if(response.status == "ok") {
        if(response.response.expire > Math.round((new Date()).getTime()/1000)) {
            a2uinf = response.response;
            brs.storage.local.set({'hwg_auth': a2uinf});
            $('#div_serv_info').removeClass().addClass('alert alert-success').html(lang['PL_SERV_SUCC_NEW_KEY']);
            $("#t_set_server").bootstrapToggle('enable');
        } else {
            $('#div_serv_info').removeClass().addClass('alert alert-danger').html(lang['PL_SERV_UNKNOW_ERR'].replace('<s>','error_expire'));
        }
    } else if(response.status == "error") {
        let errorlang = "";
        if(response.error.type == "not_auth") errorlang = lang['PL_SERV_NOT_AUTH'].replace('<a>','<a href="https://hwgame.top/" target=_blank>');
        else if(response.error.type == "not_access_plugin") errorlang = lang['PL_SERV_NOT_ACC_PL'].replace('<a>','<a href="https://hwgame.top/" target=_blank>');
        else if(response.error.type == "bad_request") errorlang = lang['PL_SERV_BAD_REQ'];
        else errorlang = lang['PL_SERV_UNKNOW_ERR'].replace('<s>',response.error.type);
        $('#div_serv_info').removeClass().addClass('alert alert-danger').html(errorlang);
    } else {
        $('#div_serv_info').removeClass().addClass('alert alert-danger').html(lang['PL_SERV_UNKNOW_ERR'].replace('<s>','error_response'));
    }
}
function xhr_get_authkey_errorcode() {
    $('#div_serv_info').removeClass().addClass('alert alert-danger').html(lang['PL_GIFTS_ERR_COMM_SRV']);
}

function discharge_server_auth() {
	brs.storage.local.set({'hwg_auth': false});
	settings.server = false;
	brs.storage.local.set({'hwg_settings': settings});
}