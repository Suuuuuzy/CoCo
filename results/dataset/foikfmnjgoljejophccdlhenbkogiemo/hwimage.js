var hwlib = {};
var hwlib_status = 0;
var baseuri = "https://cdn.hwgame.top/assets/images/";
$(document).ready(function() {
  var jqxhr = $.getJSON( "https://cdn.hwgame.top/assets/hwimage.json", function(res) {
    hwlib = res;
	hwlib_status = 1;
	hwimage_start();
  })
  .done(function() {console.log( "second success" );})
  .fail(function() {console.log( "error" );})
  .always(function() {console.log( "complete" );});
});

function hwimage_start() {
	$('hwimage').each(function(){
		let nw = hwimage_display($(this));
		$(this).replaceWith(nw);
	});
	hwlib_status = 2;
}
function hwimage_display(elem) {
	let type = $(elem).attr('type');
	let hid = $(elem).attr('hid');
	let value = $(elem).attr('value');
	if(type == 'refillable' && hid == 45) { hid = 14; type = 'pseudo';}
	let avr_cr = [0,3,4,4,4,4,4,4,4,4,4,3,3,1,4,4,4,5,5,5,5,5,5,5,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5];

	if(type == 'gold' || type == 'starmoney' || type == 'stamina') {
		let ars = {'starmoney':1,'gold':2,'stamina':4};
		hid = ars[type];
		type = 'pseudo';
	}
	if(type == 'coin' || type == 'consumable' || type == 'pseudo' || type == 'fragmentGear' || type == 'fragmentScroll') {
		let htype = type;
		if(type == 'fragmentGear') htype = 'gear';
		if(type == 'fragmentScroll') htype = 'scroll';
		let el = hwlib.inventoryItem[htype][hid];
		el.assetAtlasName = hwlib.asset.inventory[el.assetAtlas].name;
		el.href = baseuri+el.assetAtlasName+'/'+el.assetTexture+'.png';
		if(type == 'coin' || type == 'pseudo') el.borderName = 'SimpleFrame';
		else if(type == 'fragmentGear' || type == 'fragmentScroll') el.borderName = hwlib.enum.itemColor[el.color].fragmentFrameAssetTexture;
		else el.borderName = hwlib.enum.itemColor[el.color].frameAssetTexture;
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	} else if(type == 'ny2019') {
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:baseuri+'quest_icons/ny2019_gift_'+hid+'.png'}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:baseuri+'dialog_basic/SimpleFrame.png'})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	} else if(type == 'fragmentHero') {
		let el = hwlib.hero[hid];
		el.assetAtlasName = hwlib.asset.inventory[el.iconAssetAtlas].name;
		el.href = baseuri+el.assetAtlasName+'/'+el.iconAssetTexture+'.png';
		el.borderName = 'border_fragment_hero_blue';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	} else if(type == 'fragmentPet') {
		let el = hwlib.hero[hid];
		el.href = baseuri+'pet_icons/'+el.iconAssetTexture+'.png';
		el.borderName = 'border_pet_soulstone';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br zi10'}).append($('<img>',{src:el.border})));
		cd.append($('<span>',{class:'citv',text:value}));
		return cd;
	} else if(type == 'fragmentSkin') {
		let el = hwlib.skin[hid];
		el.assetAtlasName = hwlib.asset.inventory[el.iconAtlas].name;
		el.href = baseuri+el.assetAtlasName+'/'+el.iconAsset+'.png';
		el.borderName = 'border_item_skin';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		if(value > 1) cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	} else if(type == 'fragmentTitan') {
		let el = hwlib.titan[hid];
		el.href = baseuri+'titan_icons/titan_icon_'+hid+'.png';
		el.borderName = 'border_fragment_titan';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br zi10'}).append($('<img>',{src:el.border})));
		cd.append($('<span>',{class:'citv',text:value}));
		return cd;
	} else if(type == 'fragmentTitanArtifact') {
		let el = hwlib.titanArtifact.id[hid];
		el.href = baseuri+'titan_artifact_icons/'+el.assetTexture+'.png';
		el.borderName = 'border_fragment_artifact';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	} else if(type == 'fragmentArtifact') {
		let el = hwlib.artifact.id[hid];
		el.href = baseuri+'artifact_icons/'+el.assetTexture+'.png';
		el.borderName = 'border_fragment_artifact';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;		
	} else if(type == 'avatar') {
		let el = hwlib.playerAvatar[hid];
		if(el.assetType == 'hero') {
			el.assetAtlasName = hwlib.asset.inventory[hwlib.hero[el.assetOwnerId].iconAssetAtlas].name;	
			el.href = baseuri+el.assetAtlasName+'/'+hwlib.hero[el.assetOwnerId].iconAssetTexture+'.png';		
		} else if(el.assetType == 'external_file') {
			el.href = baseuri+'dialog_basic/RandomItem.png';
		} else {
			el.href = baseuri+el.assetType+'s/'+el.assetOwnerId+'.png';
		}
		let avid = 0;
		if($(elem).attr('frame') !== undefined) avid = $(elem).attr('frame');
		el.border = baseuri+'avatar_frame_graphics/frame_'+avid+'.png'
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cir',src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border,class:'cr'+avr_cr[avid]})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	} else if(type == 'avatarFrame') {
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:baseuri+'avatar_frame_graphics/frame_mainscreen_'+hid+'.png'}));
		return cd;
	} else if(type == 'hero') {
		let el = hwlib.hero[hid];
		let hsize = $(elem).attr('size') || false;
		let hcolor = $(elem).attr('color') || 1;
		let hstar = $(elem).attr('star') || 1;
		let hlvl = $(elem).attr('level') || 1;
		el.assetAtlasName = hwlib.asset.inventory[el.iconAssetAtlas].name;
		el.href = baseuri+el.assetAtlasName+'/'+el.iconAssetTexture+'.png';
		if(hsize && hsize == 'sm') el.borderName = hwlib.enum.heroColor[hcolor].frameAssetTexture_small;
		else el.borderName = hwlib.enum.heroColor[hcolor].frameAssetTexture;
		if(hsize && hsize == 'sm') el.bigstaricon = 'epic_star_icon_small';
		else el.bigstaricon = 'epic_star_icon_mid';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		el.background = hwlib.enum.heroColor[hcolor].backgroundAssetTexture.replace("bg_hero_","");
		el.levelbackground = baseuri+'dialog_basic/'+hwlib.enum.heroColor[hcolor].levelBackgroundAssetTexture+'.png';
		let cd = $('<div>',{class:'hwimage'+((hsize && hsize == 'sm') ? ' sm':'')});
		cd.append($('<img>',{class:'hcic '+el.background,src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		let spstar = $('<span>',{class:'hsr hsr'+hstar});
		if(hstar < 6) for(let is=0;is<hstar;is++) spstar.append($('<img>',{src:baseuri+'dialog_basic/starIcon.png'}));
		else spstar.append($('<img>',{src:baseuri+'dialog_basic/'+el.bigstaricon+'.png'}));
		cd.append(spstar);
		cd.append($('<span>',{class:'hlvl'}).append($('<img>',{src:el.levelbackground})).append($('<span>',{text:hlvl})));
		return cd;
	} else if(type == 'pet') {
		let el = hwlib.hero[hid];
		let hsize = $(elem).attr('size') || false;
		let hcolor = $(elem).attr('color') || 1;
		let hstar = $(elem).attr('star') || 1;
		let hlvl = $(elem).attr('level') || 1;
		el.href = baseuri+'pet_icons/'+el.iconAssetTexture+'.png';
		if(hsize && hsize == 'sm') el.borderName = hwlib.enum.heroColor[hcolor].frameAssetTexture_small_pet;
		else el.borderName = hwlib.enum.heroColor[hcolor].frameAssetTexture_pet;
		if(hsize && hsize == 'sm') el.bigstaricon = 'epic_star_icon_small';
		else el.bigstaricon = 'epic_star_icon_mid';
		el.border = baseuri+'dialog_basic/'+el.borderName+'.png';
		el.background = hwlib.enum.heroColor[hcolor].backgroundAssetTexture.replace("bg_hero_","");
		el.levelbackground = baseuri+'dialog_basic/'+hwlib.enum.heroColor[hcolor].levelBackgroundAssetTexture+'.png';
		let cd = $('<div>',{class:'hwimage'+((hsize && hsize == 'sm') ? ' sm':'')});
		cd.append($('<img>',{class:'pcic '+el.background,src:el.href}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:el.border})));
		let spstar = $('<span>',{class:'hsr hsr'+hstar});
		if(hstar < 6) for(let is=0;is<hstar;is++) spstar.append($('<img>',{src:baseuri+'dialog_basic/starIcon.png'}));
		else spstar.append($('<img>',{src:baseuri+'dialog_basic/'+el.bigstaricon+'.png'}));
		cd.append(spstar);
		cd.append($('<span>',{class:'hlvl'}).append($('<img>',{src:el.levelbackground})).append($('<span>',{text:hlvl})));
		return cd;
	} else {
		let cd = $('<div>',{class:'hwimage'});
		cd.append($('<img>',{class:'cic',src:baseuri+'dialog_basic/RandomItem.png'}));
		cd.append($('<span>',{class:'br'}).append($('<img>',{src:baseuri+'dialog_basic/SimpleFrame.png'})));
		cd.append($('<span>',{class:'cicv',text:value}));
		return cd;
	}
}