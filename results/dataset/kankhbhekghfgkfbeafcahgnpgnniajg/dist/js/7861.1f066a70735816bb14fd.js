(self.webpackChunknewtab=self.webpackChunknewtab||[]).push([[7861],{6327:(e,t,a)=>{"use strict";a.d(t,{ZP:()=>o});const s={ver:{key:"ver"},setting:{key:"setting"},bgSetting:{key:"wallpaper"},iconSetting:{key:"iconSetting"},dtime:{key:"dtimeSetting"},weather:{key:"weather",weatherSetting:"weatherSetting"},desktop:{key:"desktop"},searchEngines:{key:"searchEngines"},defEngine:{key:"defEngine"},guide:{key:"guide"},bingIndex:{key:"bingIndex"},bingDaily:{key:"bingDaily"},pages:{key:"pages"},pageActive:{key:"pageActive"},mapsPopup:{key:"mapsPopup"},account:{key:"account"}};s.setting.prop={showWallpaper:!0,theme:"light",pageStyle:"full",weather:!0,datetime:!0,search:!0,searchRound:!0,searchFocus:!1,apps:!0,launchers:!0,wallpaper:!0,wallpaperRandom:!0,desktop:!0,widgets:!0,openShortcut:"newtab",rightClickSearch:{name:"google",url:"https://google.com/search",key:"q"}},s.bgSetting.prop={customWallpaper:"",defWallpaper:"/dist/images/bg/1.jpg",filter:"default",imgType:4,fillType:"fill",bgColor:"#000000",blurry:0,transparent:0},s.iconSetting.prop={hideTitle:!1,iconFontSize:0,iconRadius:10,iconTransparent:0,iconTextColor:"rgba(238, 238, 238, 1)"},s.searchEngines.prop={active:"google"},s.pages.prop={__default_desktop:{id:"__default_desktop",name:"Default",bgColor:"#11B3D9",textColor:"#FFFFFF",locked:!1,lockPass:null,sort:0,data:{"sc-1":{type:"website",id:"sc-1",name:"PDF Converter",icon:"/dist/images/website/pdf.png",url:"https://abcdpdf.com/",page:"__default_desktop",sort:0,bgColor:""},"sc-ebay":{type:"website",id:"sc-ebay",name:"eBay",icon:"/dist/images/website/ebay.png",url:"https://ebay.com/",page:"__default_desktop",sort:3,bgColor:""},"sc-aliexpress":{type:"website",id:"sc-aliexpress",name:"AliExpress",icon:"/dist/images/website/aliexpress.png",url:"https://aliexpress.com/",page:"__default_desktop",sort:4,bgColor:""},"sc-walmart":{type:"website",id:"sc-walmart",name:"Walmart",icon:"/dist/images/website/walmart.png",url:"https://walmart.com/",page:"__default_desktop",sort:5,bgColor:""},"folder-1":{type:"folder",id:"folder-1",name:"Other",icon:null,url:null,page:"__default_desktop",sort:6,bgColor:"",childItems:{"sc-amazon":{type:"website",id:"sc-amazon",name:"Amazon",icon:"/dist/images/website/amazon.png",url:"https://www.amazon.com/",page:"__default_desktop",sort:2,parentId:"folder-1",bgColor:""}}}},widgets:{"ntp-dtime":{id:"ntp-dtime",w:null,h:null,x:null,y:null,type:"dtime",page:"__default_desktop",attrs:{hour24:!1,dateFormat:"mm/dd/yyyy"}},"ntp-weather":{id:"ntp-weather",w:null,h:null,x:null,y:null,type:"weather",page:"__default_desktop"},"ntp-pdf":{id:"ntp-pdf",w:18.44,h:56.61,x:.9,y:22.82,type:"pdf",page:"__default_desktop"}}}},s.pageActive.prop="__default_desktop";const o=s},8051:(e,t,a)=>{"use strict";a.d(t,{X:()=>s});const s={appKey:"__newtab",userId:null,userToken:null,user:{},locale:null,isGuest:!0,isLDSUpdated:!1,extIntalled:!1,engines:{google:{type:"google",name:"Google",url:"https://google.com/search",query:"q",icon:"/dist/images/svg/google.svg"},bing:{type:"bing",name:"Bing",url:"https://www.bing.com/search",query:"q",icon:"/dist/images/svg/bing.svg"},duckduckgo:{type:"duckduckgo",name:"DuckDuckGo",url:"https://duckduckgo.com",query:"q",icon:"/dist/images/svg/duckduckgo.svg"},yahoo:{type:"yahoo",name:"Yahoo",url:"https://search.yahoo.com/search",query:"p",icon:"/dist/images/svg/yahoo.svg"},yandex:{type:"yandex",name:"Yandex",url:"https://yandex.com/search/",query:"text",icon:"/dist/images/svg/yandex.svg"},baidu:{type:"baidu",name:"Baidu",url:"https://www.baidu.com/s",query:"wd",icon:"/dist/images/svg/baidu.svg"}},defEngine:"dy1",redirect:null,setting:{},popular:[],apiImagesKey:"12006893-0ab060e7b10001fa2e964dfe6",rateUrl:{chrome:"https://chrome.google.com/webstore/detail/abcd-pdf-new-tab-for-chro/kankhbhekghfgkfbeafcahgnpgnniajg",firefox:"https://addons.mozilla.org/zh-CN/firefox/addon/abcd-pdf-new-tab/",edge:"https://microsoftedge.microsoft.com/addons/detail/abcd-pdf-new-tab-for-ed/khohcecpffcmagkanpojfdcbkehogljm"},widgets:{pdf:"https://abcdpdf.com/",mapsDirections:"https://www.google.com/maps/dir/",mapsLocations:"https://www.google.com/maps/search/",tracking:"https://packagestrack.com/en/serach_result.html?carrier_code=All"}}},797:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});const s={GUIDE_VER:"20210216",LDS_VER:"v1",EXT_CHROME_ID:"",EXT_EDGE_ID:"",GA_TRACKING_ID:"UA-199348463-1",SHORTCUT_MAX_COUNT:15,RESPONSE_CODE:{TOKEN_VERIFICATION_FAILED:1007}}},2183:(e,t,a)=>{"use strict";var s=a(8051),o=a(797),i=a(4371);let r=o.Z.EXT_CHROME_ID,g=s.X.rateUrl.chrome;i.DetectClient.isChrome()?(r=o.Z.EXT_CHROME_ID,g=s.X.rateUrl.chrome):i.DetectClient.isEdgeForChromium()?(r=o.Z.EXT_EDGE_ID,g=s.X.rateUrl.edge):i.DetectClient.isFirefox()&&(g=s.X.rateUrl.firefox)},4371:(e,t,a)=>{"use strict";a.d(t,{DetectClient:()=>s});const s={isChrome:function(){return/chrome/i.test(navigator.userAgent)&&!s.isEdge()&&!s.isEdgeForChromium()},isFirefox:function(){return/firefox/i.test(navigator.userAgent)},isEdge:function(){return/edge/i.test(navigator.userAgent)},isEdgeForChromium:function(){return/edg/i.test(navigator.userAgent)}}},9405:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var s=a(6327);class o{static set(e,t){localStorage.setItem(e,t)}static setJson(e,t){t=JSON.stringify(t),localStorage.setItem(e,t)}static get(e){return localStorage.getItem(e)}static getJson(e){let t=localStorage.getItem(e);return t=JSON.parse(t),t}static remove(e){localStorage.removeItem(e)}static getShortcut(e,t){return o.getShortcutForPage(e).data[t]}static updateShortcut(e){let t=o.getShortcutForPage(e.page),a="",s="";e.parentId?(s=t.data[e.parentId],a=s.childItems[e.id],a?Object.assign(a,e):a=e,s.childItems[e.id]=a,t.data[e.parentId]=s):(a=t.data[e.id],a?Object.assign(a,e):a=e,t.data[e.id]=a),o.setShortcutForPage(t,e.page)}static deleteShortcut(e,t){let a=o.getShortcutForPage(e);delete a.data[t],o.setShortcutForPage(a,e)}static getShortcutForPage(e){return o.getJson(s.ZP.pages.key)[e]}static setShortcutForPage(e,t){let a=o.getJson(s.ZP.pages.key);a[t]=e,o.setJson(s.ZP.pages.key,a)}static getDtimeOption(){return o.getJson(s.ZP.dtime.key)}static setDtimeOption(e){o.setJson(s.ZP.dtime.key,e)}static getWidget(e,t){return o.getWidgetForPage(e).widgets[t]}static updateWidget(e){let t=o.getWidgetForPage(e.page),a="";t.widgets||(t.widgets={}),a=t.widgets[e.id],a?Object.assign(a,e):a=e,t.widgets[e.id]=a,o.setWidgetForPage(t,e.page)}static deleteWidget(e,t){let a=o.getWidgetForPage(e);delete a.widgets[t],o.setWidgetForPage(a,e)}static getWidgetForPage(e){return o.getJson(s.ZP.pages.key)[e]}static setWidgetForPage(e,t){let a=o.getJson(s.ZP.pages.key);a[t]=e,o.setJson(s.ZP.pages.key,a)}}const i=o},2658:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var s=a(9755),o=a.n(s);function i(e,t={}){let a={validClass:"validate-valid",errorClass:"validate-error",errorElement:"label",focusInvalid:!0};return a=Object.assign(a,t),o()(e).validate(a)}a(3587),i.setMessages=function(e){o().validator.messages=Object.assign(o().validator.messages,e)},i.getMessages=function(){return o().validator.messages};const r=i}}]);