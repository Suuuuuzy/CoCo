(self.webpackChunknewtab=self.webpackChunknewtab||[]).push([[8180,8444,4669,4320],{6523:t=>{t.exports='<span class="pointer"></span> <input type="hidden" id="{{name}}" name="{{name}}" value="{{value}}" class="input"/> <label class="text">{{text}}</label>'},4669:t=>{t.exports='<form class="weather-form"> <div class="form-group"> <div id="temperature" class="switch-box"></div> </div> <div class="form-group query-city"> <label class="control-label">{{switch_cities}}:</label> <div class="search-box autocomplete"> <input type="text" name="q" autofocus autocomplete="off" class="search-input form-control form-control-sm d-inline-block shadow-sm"> </div> </div> <div class="form-group text-right mt-4"> <input type="button" value="{{cancel}}" class="btn btn-cancel btn-sm btn-light"> <input type="submit" value="{{done}}" class="btn btn-submit btn-sm btn-info"/> </div> </form>'},4320:t=>{t.exports='<div class="weather-box"> <img class="iconName" alt=""> <div> <div class="displayName">{{displayName}}</div> <div class="now">{{now}}</div> <div class="low_high">{{low_high}}</div> </div> </div>'},8280:(t,e,i)=>{"use strict";i.d(e,{r:()=>a}),i(8051);var s=i(9755),n=i.n(s);class a{constructor(t={}){this.options={container:null,template:i(6523),name:"",value:[1,0],text:["On","Off"],activeColor:"#808080",inactiveColor:"#6bde5d",status:!0,onChange:t=>{},callback:(t,e,i)=>{}},this.options=Object.assign(this.options,t);let e=this.options.template;e=e.replace(/{{text}}/,""),e=e.replace(/{{name}}/g,this.options.name),this.elView=n()(e),this.container=this.options.container,this.container.append(this.elView),this.elPointer=this.container.find(".pointer"),this.elInput=this.container.find(".input"),this.elText=this.container.find(".text"),this.status=this.options.status,this.container.on("click",(t=>{this.toggle()})),this.status?this.on():this.off()}toggle(){this.status?this.off():this.on(),this.options.onChange(this.status)}on(){this.status=!0,this.elPointer.css({marginLeft:"34px"}),this.options.container.css({backgroundColor:this.options.inactiveColor,borderColor:this.options.inactiveColor}),this.elText.css({left:"0px"});let t=this.options.value[0],e=this.options.text[0];this.elText.text(e),this.elInput.val(t),this.options.callback(this.status,t,e)}off(){this.status=!1,this.elPointer.css({marginLeft:"0px"}),this.options.container.css({backgroundColor:this.options.activeColor,borderColor:this.options.activeColor}),this.elText.css({left:"20px"});let t=this.options.value[1],e=this.options.text[1];this.elText.text(e),this.elInput.val(t),this.options.callback(this.status,t,e)}}},4589:(t,e,i)=>{"use strict";i.r(e),i.d(e,{default:()=>m});var s=i(8051),n=i(1665),a=i(1961),o=i(8560),r=i(9755),h=i.n(r),l=i(9405),p=i(6327),c=i(8280);class g extends n.WidgetBase{constructor(t={}){super(t),this.type="weather",this.attrs||(this.attrs={temperatureType:0,code:null,expires:0}),this.text=["℃","℉"],this.value=[0,1],this.elParent=null,this.elWeather=null,this.view=null,this.elInput=null,this.wIcons={19:{img:"blowingsand.png"},22:{img:"ash.png"},26:{img:"cloudy.png"},27:{img:"cloudy.png"},28:{img:"cloudy.png"},29:{img:"cloudy.png"},30:{img:"cloudy.png"},44:{img:"cloudy.png"},9:{img:"drizzle.png"},20:{img:"fog.png"},21:{img:"fogandhaze.png"},17:{img:"hail.png"},41:{img:"heavysnow.png"},43:{img:"heavysnow.png"},13:{img:"lightsnow.png"},14:{img:"lightsnow.png"},15:{img:"lightsnow.png"},16:{img:"lightsnow.png"},25:{img:"lightsnow.png"},31:{img:"moon.png"},33:{img:"moon.png"},6:{img:"rainandsnow.png"},7:{img:"rainandsnow.png"},18:{img:"rainandsnow.png"},11:{img:"shower.png"},12:{img:"shower.png"},40:{img:"shower.png"},8:{img:"sleet.png"},10:{img:"sleet.png"},32:{img:"sunny.png"},34:{img:"sunny.png"},3:{img:"thunder.png"},4:{img:"thunder.png"},37:{img:"thunderstorm.png"},38:{img:"thunderstorm.png"},39:{img:"thunderstorm.png"},45:{img:"thunderstorm.png"},47:{img:"thunderstorm.png"},35:{img:"thunderstormandhail.png"},0:{img:"typhoon.png"},1:{img:"typhoon.png"},2:{img:"typhoon.png"},23:{img:"wind.png"},24:{img:"wind.png"},5:{img:"rainandsnow.png"},46:{img:"snowshowers.png"}},this.iconName=null,this.displayName=null,this.now=null,this.lowHigh=null,this.expires=3600,this.weatherJson=null}get temperatureSymbol(){return 1==this.attrs.temperatureType?this.text[1]:this.text[0]}load(t){this.elParent=t,this.init()}async init(){if(!this.attrs.code){let t={en:"2459115",de:"638242",es:"766273",fr:"615702",it:"721943","zh-cn":"2151330"},e=t.en;t[s.X.locale.langCode]&&(e=t[s.X.locale.langCode]),this.attrs.code=e}this.weatherJson=await this.getWeatherData(this.attrs.code),this.weatherJson||(this.weatherJson=await this.requestWeatherData(this.attrs.code)),this.setView()}temperature(t){return 0==this.attrs.temperatureType&&(t=this.F2C(t)),t+this.temperatureSymbol}F2C(t){return t=5*(t-32)/9,Math.round(t)}C2F(t){return t=32+Math.round(9*t/5),Math.round(t)}setView(){const t=document.createElement("div");t.innerHTML=i(4320),this.view=t.firstChild;const e=this.weatherJson;e&&(this.view.querySelector(".iconName").setAttribute("src","/dist/images/weather/"+e.iconName),this.view.querySelector(".displayName").textContent=e.displayName,this.view.querySelector(".now").textContent=this.temperature(e.now),this.view.querySelector(".low_high").textContent=this.temperature(e.low)+" / "+this.temperature(e.high)),this.openPopup({width:"150px",height:"150px",content:this.view,elParent:this.elParent,containerClass:"widget-modalbox-transparent",resizable:!1},((t,e)=>{let i=document.createElement("a");i.setAttribute("class","dropdown-item"),i.textContent=s.X.locale.get("setting"),i.addEventListener("click",(()=>{this.openSetting()})),t.append(i)})),this.elWeather=h()("#"+this.id),this.iconName=this.elWeather.find(".iconName"),this.displayName=this.elWeather.find(".displayName"),this.now=this.elWeather.find(".now"),this.lowHigh=this.elWeather.find(".low_high"),this.elWeather.append(this.elWeather)}upView(){const t=this.weatherJson;t&&(this.iconName.attr("src","/dist/images/weather/"+t.iconName),this.displayName.html(t.displayName),this.now.html(this.temperature(t.now)),this.lowHigh.html(this.temperature(t.low)+" / "+this.temperature(t.high)))}openSetting(){if(this.settingPopup)return void this.settingPopup.open();let t=i(4669);t=t.replace(/{{done}}/,s.X.locale.get("done")),t=t.replace(/{{cancel}}/,s.X.locale.get("cancel")),t=t.replace(/{{switch_cities}}/,s.X.locale.get("switch_cities"));let e=s.X.locale.get("weather_setting");this.elForm=h()(t),new c.r({container:this.elForm.find("#temperature"),name:"temperatureType",value:this.value,text:this.text,status:!this.attrs.temperatureType,callback:(t,e,i)=>{this.attrs.temperatureType=e}}),this.elForm.on("submit",(t=>{h().trim(this.elInput.val())||(this.setWeatherData(this.weatherJson,!0),this.upView(),this.settingPopup.close());const e=this.elForm.find(".dropdown-item:first");return e.length>0?e.trigger("click"):this.upView(),this.settingPopup.close(),!1})),this.settingPopup=new o.Popup({id:this.id+"-setting-popup",content:this.elForm.get(0),overlay:!0,overlayCloseClick:!0,draggable:!1,resizable:!1,headerText:e}),this.elInput=h()("#"+this.settingPopup.id+" .search-input"),this.elInput.get(0).focus(),this.elForm.find(".btn-cancel").on("click",(()=>{this.settingPopup.close()})),i.e(1961).then(i.bind(i,2004)).then((t=>{let e=a.Z.get("weather","city").url;e="https://www.yahoo.com/news/_td/api/resource/WeatherSearch;text=[text]";const i=new t.AutoComplete({input:this.elInput.get(0),requestUri:e,iconClearStyle:{top:5,right:5,color:"#eee"},requestParams:{bkt:"news-d-147",intl:s.X.locale.langCode,region:s.X.locale.langCode,lang:s.X.locale.langCode,t:(new Date).getTime(),ver:"2.0.2213002"},requestParamsKey:"name",parseItem:t=>({title:t.qualifiedName,val:t.woeid}),onRequst:t=>{i.options.requestUri=e.replace(/\[text\]/,t)},onClick:async(t,e)=>{this.settingPopup.close();let i=await this.getWeatherData(e.val);i||(i=await this.requestWeatherData(e.val)),this.weatherJson=i,this.setWeatherData(this.weatherJson,!0),this.upView()}});i.init()}))}async requestWeatherData(t){let e=a.Z.get("weather","data");{let i="https://www.yahoo.com/news/_tdnews/api/resource/WeatherService;woeids=[code]";i=i.replace(/\[code\]/,t.toString()),e={method:"get",url:i}}let i=await this.request({method:e.method,url:e.url,params:{code:t.toString(),intl:s.X.locale.langCode,region:s.X.locale.langCode,lang:s.X.locale.langCode,t:(new Date).getTime()}}),n=null;if(i&&i.weathers){let e=i.weathers[0];if(e){let i=this.wIcons[19].img;this.wIcons[e.observation.conditionCode]&&(i=this.wIcons[e.observation.conditionCode].img),n={iconName:i,displayName:e.location.displayName,now:e.observation.temperature.now,low:e.observation.temperature.low,high:e.observation.temperature.high,code:t},this.setWeatherData(n)}}return n}async getWeatherData(t){return t||(t=this.attrs.code),(new Date).getTime()>parseInt(this.attrs.expires)?await this.requestWeatherData(t):l.Z.getJson(p.ZP.weather.key+t)}setWeatherData(t,e){this.attrs.expires=(new Date).getTime()+1e3*this.expires,this.attrs.code=t.code,e||l.Z.setJson(p.ZP.weather.key+t.code,t),this.update()}}const m=g}}]);