(self.webpackChunknewtab=self.webpackChunknewtab||[]).push([[8026,8444,6106],{6106:t=>{t.exports='<form class="setting-form"> <div class="form-group"> <label>{{title}}:</label> <input type="text" id="title" autocomplete="off" class="form-control form-control-sm"> </div> <div class="form-group"> <label class="col-sm-2 p-0">{{headColor}}:</label> <div class="col-sm-8 btn-group btn-group-sm color-group" data-to="bg" role="group"> <a class="btn btn-sm head-color-picker"></a> </div> </div> <div class="form-group"> <label class="col-sm-2 p-0">{{bgColor}}:</label> <div class="col-sm-8 btn-group btn-group-sm color-group" data-to="bg" role="group"> <a class="btn btn-sm bg-color-picker"></a> </div> </div> <div class="form-group"> <label class="col-sm-2 p-0">{{textColor}}:</label> <div class="col-sm-8 btn-group btn-group-sm color-group" data-to="bg" role="group"> <a class="btn btn-sm text-color-picker"></a> </div> </div> <div class="form-group text-right mt-4"> <input type="button" value="{{cancel}}" class="btn btn-cancel btn-sm btn-light"> <input type="submit" value="{{done}}" class="btn btn-submit btn-sm btn-info"/> </div> </form>'},7514:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>g});var l=o(8051),s=o(1665),r=o(9755),a=o.n(r),i=o(8560),c=o(9612),n=o.n(c);class h extends s.WidgetBase{constructor(t={}){super(t),this.type="notes",this.attrs||(this.attrs={title:l.X.locale.get("widget_notes"),headColor:"#e6dc88",bgColor:"#e6dd88e6",textColor:"#000000",value:""}),this.oldAttrs=Object.assign({},this.attrs)}load(t){this.elTextarea=document.createElement("textarea"),this.elTextarea.setAttribute("class","notes-input"),this.elTextarea.setAttribute("placeholder",l.X.locale.get("widget_notes_placeholder")),this.openPopup({width:this.w?this.w+"vw":"150px",height:this.h?this.h+"vh":"120px",content:this.elTextarea,headerText:this.attrs.title,headerClass:"widget-notes-header",contentClass:"widget-notes-content",elParent:t},((t,e)=>{let o=document.createElement("a");o.setAttribute("class","dropdown-item"),o.textContent=l.X.locale.get("setting"),o.addEventListener("click",(()=>{this.openSetting()})),t.append(o)}),null,"#000000"),this.popup.header.style.backgroundColor=this.attrs.headColor,this.elTextarea.style.backgroundColor=this.attrs.bgColor,this.elTextarea.style.color=this.attrs.textColor,this.elHeaderText=this.popup.header.querySelector(".modalbox-header-text"),this.elHeaderText.style.color=this.attrs.textColor,this.elInput=a()("#"+this.popup.id).find(".notes-input"),this.elInput.val(this.attrs.value),this.elInput.on("blur",(()=>{this.attrs.value=this.elInput.val(),this.update()}))}openSetting(){if(this.settingPopup)return void this.settingPopup.open();let t=o(6106);t=t.replace(/{{title}}/g,l.X.locale.get("title")),t=t.replace(/{{headColor}}/,l.X.locale.get("head_color")),t=t.replace(/{{bgColor}}/,l.X.locale.get("bg_color")),t=t.replace(/{{textColor}}/,l.X.locale.get("text_color")),t=t.replace(/{{done}}/,l.X.locale.get("done")),t=t.replace(/{{cancel}}/,l.X.locale.get("cancel")),this.elForm=a()(t),this.headBgPickr=null,this.bgPickr=null,this.textBgPickr=null,this.settingPopup=new i.Popup({id:this.id+"-setting-popup",content:this.elForm.get(0),overlay:!0,overlayCloseClick:!0,draggable:!1,resizable:!1,headerText:l.X.locale.get("setting")}),this.elTitle=this.elForm.find("#title"),this.elTitle.val(this.attrs.title),this.elHeadColor=this.elForm.find("#headColor");let e={el:".head-color-picker",theme:"nano",comparison:!1,useAsButton:!1,default:this.attrs.headColor,swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 1)","rgba(156, 39, 176, 1)","rgba(103, 58, 183, 1)","rgba(63, 81, 181, 1)","rgba(33, 150, 243, 1)","rgba(3, 169, 244, 1)","rgba(0, 188, 212, 1)","rgba(0, 150, 136, 1)","rgba(76, 175, 80, 1)","rgba(139, 195, 74, 1)","rgba(205, 220, 57, 1)","rgba(255, 235, 59, 1)","rgba(255, 193, 7, 1)"],components:{preview:!0,opacity:!0,hue:!0,interaction:{hex:!1,rgba:!1,hsla:!1,hsva:!1,cmyk:!1,input:!1,clear:!1,save:!1}}};this.headBgPickr=n().create(e),this.headBgPickr.on("change",((t,e,o)=>{let l=t.toHEXA().toString();this.attrs.headColor=l,this.popup.header.style.backgroundColor=this.attrs.headColor})),this.bgPickr=n().create(Object.assign(e,{el:".bg-color-picker",default:this.attrs.bgColor})),this.bgPickr.on("change",((t,e,o)=>{let l=t.toHEXA().toString();this.attrs.bgColor=l,this.elTextarea.style.backgroundColor=this.attrs.bgColor})),this.textBgPickr=n().create(Object.assign(e,{el:".text-color-picker",default:this.attrs.textColor})),this.textBgPickr.on("change",((t,e,o)=>{let l=t.toHEXA().toString();this.attrs.textColor=l,this.elTextarea.style.color=this.attrs.textColor,this.elHeaderText.style.color=this.attrs.textColor})),this.elForm.on("submit",(t=>(this.attrs.title=this.elTitle.val(),this.elHeaderText.innerText=this.attrs.title,this.update(),this.settingPopup.close(),!1))),this.elForm.find(".btn-cancel").on("click",(()=>{this.attrs=Object.assign({},this.oldAttrs),this.popup.header.style.backgroundColor=this.attrs.bgColor,this.elHeaderText.style.color=this.attrs.textColor,this.elTextarea.style.backgroundColor=this.attrs.bgColor,this.elTextarea.style.color=this.attrs.textColor,this.settingPopup.close()}))}}const g=h}}]);