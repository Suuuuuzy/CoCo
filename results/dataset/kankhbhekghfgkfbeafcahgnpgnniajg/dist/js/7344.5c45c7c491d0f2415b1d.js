(self.webpackChunknewtab=self.webpackChunknewtab||[]).push([[7344,8444],{1984:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>h});var r=i(8051),s=i(1665),l=i(2183),a=i(4371);class n extends s.WidgetBase{constructor(e={}){super(e),this.type="gmail"}load(e){let t="";if(this.openPopup({width:this.w?this.w+"vw":"480px",height:this.h?this.h+"vh":"400px",content:t,headerText:"Gmail",elParent:e}),r.X.extIntalled)new Promise((async(e,i)=>{let r=await(0,l.bG)({cmd:"gmail_html_link"});t=document.createElement("iframe"),r&&r.src&&(t.src=r.src),t.setAttribute("frameBorder",0),t.setAttribute("width","100%"),t.setAttribute("height","100%"),this.popup.setContent(t)}));else{let e=document.createElement("div");e.setAttribute("class","gmail-ext-prompt");let t="";a.DetectClient.isChrome()?t=r.X.rateUrl.chrome:a.DetectClient.isFirefox()?t=r.X.rateUrl.firefox:a.DetectClient.isEdgeForChromium()&&(t=r.X.rateUrl.edge),e.innerHTML=r.X.locale.get("gmail_install_prompt",{ext_url:t}),this.popup.setContent(e)}}}const h=n}}]);