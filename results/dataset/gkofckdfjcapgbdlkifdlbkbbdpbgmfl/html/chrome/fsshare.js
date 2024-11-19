function getUrlParameter(str, sParam) {
    var sPageURL = str.substring(1);
    var sURLVariables = sPageURL.split('&');
    var sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? false : decodeURIComponent(sParameterName[1]);
        }
    }
}
var cdomain = 'offroadoutlaws.io';
var url = new URL(document.currentScript.src);
var appid = getUrlParameter(url.search, 'appid');
var token = '';
var active;
var message = 'Play for free!';

async function getToken()
{
  let p = new Promise((resolve, reject)=>{
    var url = 'https://' + cdomain + '/api/GenerateTestToken';
    $.get(url, (data)=>{
        resolve(data);
    }).fail((err)=>{console.log(err);resolve('');});
  });
  return await p;
}
async function generateUrl(){
  var title = active != null ? active.shorttitle : 'game';
  return new Promise((resolve,reject)=>{
    try{
      if(token == '') resolve('https://' + cdomain + '/ext/r1?cid=XbpCYDYuS7atMMWiJE&appid=' + appid);
      $.ajax({
         url: 'https://' + cdomain + '/a/Generate',
         type: 'POST',
         headers: {
            'Authorization': 'Bearer ' + token
         },
         data: {
           title: title,
           url: 'https://' + cdomain + '/ext/r1?cid=XbpCYDYuS7atMMWiJE&appid=' + appid,
           domain: cdomain,
         },
         success: function (result) {
           resolve(result);
         },
         error: function (error) {
           console.log(error);
           resolve('https://' + cdomain + '/ext/r1?cid=XbpCYDYuS7atMMWiJE&appid=' + appid);
         }
      });
    }catch(e){console.log(e);}
  });
}
async function initShare()
{
  if(active == undefined) console.log('app not found');
  if(token == '') token = await getToken();
  console.log('token', token);
  var url = await generateUrl();
  console.log('url', url);
  document.getElementById('shareurl').value = url;
  $('#shareModal').modal();
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=ShareDialog');

}
function createActiveStats()
{
  var activeContBG = document.createElement('div');
  activeContBG.style = 'background-color:gray;position: absolute;opacity: 0.5;height: 20px;width:100%;top: 0;';
  var activeContText = document.createElement('div');
  activeContText.style = 'position: absolute;height: 20px;width:100%;line-height: 20px;font-size: 12px;top: 0;color: white;';
  var icon = document.createElement('i');
  icon.style = 'color:mediumspringgreen;';
  icon.className = 'fas fa-circle blink_me';
  activeContText.appendChild(icon);
  var count = active!=null ? numeral(active.active1d).format('0,0') : 0;
  activeContText.appendChild(document.createTextNode(' ' + count + ' playing now'));
  var activeCont = document.createElement('div');
  activeCont.appendChild(activeContBG);
  activeCont.appendChild(activeContText);
}
function shareEmbed()
{
  var preview = document.getElementById('embedPreview');
  if(preview.children.length > 0) preview.children[0].remove();
  var url = 'https://' + cdomain + '/ext/embed/' + appid;
  var ifr = document.createElement("iframe");
  ifr.style.width = '300px';
  ifr.style.height = '250px';
  ifr.style.zIndex = '1';
  ifr.style.pointerEvents = 'none';
  ifr.style.border = 'none';
  ifr.setAttribute('scrolling','no');
  ifr.src = url + '?log=false';
  preview.appendChild(ifr);
  var code = '<iframe src=' + url + ' width=300px height=250px scrolling=no style="border:none;">';
  document.getElementById('embedCode').value = code;
  document.getElementById('dlimg').value = 'https://' + cdomain + '/ss/' + appid;
  $('#embedModal').modal();

  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=embed');
}
function shareFacebook()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var url =
  'https://www.facebook.com/dialog/share?app_id=362300054804616&display=popup&hashtag=%23freeplay&quote=' + message + '&href=' + link;
  console.log('facebook', url);
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=facebook');
}
function shareTwitter()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var url = 'https://twitter.com/share?text='+ message +'&url=' + link;
  console.log('twitter',url);
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=twitter');
}
function shareEmail()
{
  var url = document.getElementById('shareurl').value;
  window.open('mailto:test@example.com?subject=' + message + '&body=' + message + ' ' + url);
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=email');
}
function shareWhatsapp()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var url = 'https://wa.me/?text=' + message + ' ' + link;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=whatsapp');
}
function sharePinterest()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var media = encodeURIComponent('https://' + cdomain + '/ss/' + appid);
  console.log(link);
  console.log(media);
  var url = 'https://www.pinterest.com/pin/create/button/?url=' + link + '&description=' + message + '&media=' + media;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=pinterest');
}
function shareLinkedIn()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var title = active == undefined ? 'Game' : active.shorttitle;
  console.log(link);
  var url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + link + '&title=' + title + '&summary=' + message + '&source=' + cdomain;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=linkedin');
}
function shareFlipboard()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var title = active == undefined ? 'Game' : active.shorttitle;
  console.log(link);
  var url = 'https://share.flipboard.com/bookmarklet/popout?v=2&url=' + link + '&title=' + title;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=flipboard');
}
function shareReddit()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  console.log(link);
  var url = 'https://www.reddit.com/submit?url=' + link;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=reddit');
}
function shareMessenger()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  console.log(link);
  var url = 'http://www.facebook.com/dialog/send?app_id=362300054804616&link=' + link + '&redirect_uri=' + link;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=messenger');
}
function shareTelegram()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  console.log(link);
  var url = 'https://telegram.me/share/url?url=' + link + '&text=' + message;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=telegram');
}
function shareBlogger()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var src = 'https://pc.game/ext/embed/' + appid;
  var code = '<a href="' + link + '">' + message + '</a>';
  var url = 'https://www.blogger.com/blog-this.g?n=' + message + '&b=' + code;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=Blogger');
}
function shareTumblr()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var url = 'https://www.tumblr.com/widgets/share/tool/preview?url=' + link;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=tumblr');
}
function shareWechat()
{
  var link = encodeURIComponent(document.getElementById('shareurl').value);
  var url = 'https://api.qrserver.com/v1/create-qr-code/?size=154x154&data=' + link;
  popupCenter({url: url, title: 'Share', w: 600, h: 400});
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=wechat');
}
function copyText()
{
  /* Get the text field */
  var copyText = document.getElementById("shareurl");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  document.getElementsByClassName("popover-body")[0].innerHTML = 'Copied';
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=copyURL');
}
function copyCode()
{
  /* Get the text field */
  var copyText = document.getElementById("embedCode");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  document.getElementsByClassName("popover-body")[0].innerHTML = 'Copied';
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=copyEmbed');
}
function copyThumbnail()
{
  /* Get the text field */
  var copyText = document.getElementById("dlimg");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  document.getElementsByClassName("popover-body")[0].innerHTML = 'Copied';
  $.get('https://' + cdomain + '/api/LogGameShareLoggly?appid=' + appid + '&src=ext&platform=copyThumbnail');
}
var caroIndex = 0;
function nextCaro(id){
  $(id).carousel('next');
  caroIndex++;
  if(caroIndex == 0) {
    $('#shareCarousel .carousel-control-prev-icon').hide();
    $('#shareCarousel .carousel-control-next-icon').show();
  }
  else if(caroIndex == 2){
    $('#shareCarousel .carousel-control-prev-icon').show();
    $('#shareCarousel .carousel-control-next-icon').hide();
  }
  else {
    $('#shareCarousel .carousel-control-prev-icon').show();
    $('#shareCarousel .carousel-control-next-icon').show();
  }
}
function prevCaro(id){
  $(id).carousel('prev');
  caroIndex--;
  if(caroIndex == 0) {
    $('#shareCarousel .carousel-control-prev-icon').hide();
    $('#shareCarousel .carousel-control-next-icon').show();
  }
  else if(caroIndex == 2){
    $('#shareCarousel .carousel-control-prev-icon').show();
    $('#shareCarousel .carousel-control-next-icon').hide();
  }
  else {
    $('#shareCarousel .carousel-control-prev-icon').show();
    $('#shareCarousel .carousel-control-next-icon').show();
  }
}
const popupCenter = ({url, title, w, h}) => {

    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const t = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=0,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${t},
      left=${left}
      `
    )
}
function initButtons()
{
  document.getElementById('btnEmbed').addEventListener('click', shareEmbed);
  document.getElementById('btnFacebook').addEventListener('click', shareFacebook);
  document.getElementById('btnTwitter').addEventListener('click', shareTwitter);
  document.getElementById('btnWhatsapp').addEventListener('click', shareWhatsapp);
  document.getElementById('btnEmail').addEventListener('click', shareEmail);
  document.getElementById('btnPinterest').addEventListener('click', sharePinterest);
  document.getElementById('btnFlipboard').addEventListener('click', shareFlipboard);
  document.getElementById('btnLinkedIn').addEventListener('click', shareLinkedIn);
  document.getElementById('btnMessenger').addEventListener('click', shareMessenger);
  document.getElementById('btnReddit').addEventListener('click', shareReddit);
  document.getElementById('btnTelegram').addEventListener('click', shareTelegram);
  document.getElementById('btnBlogger').addEventListener('click', shareBlogger);
  document.getElementById('btnWechat').addEventListener('click', shareWechat);
  document.getElementById('btnTumblr').addEventListener('click', shareTumblr);
  document.getElementById('carousel-control-prev').addEventListener('click', function(){prevCaro('#shareCarousel');});
  document.getElementById('carousel-control-next').addEventListener('click', function(){nextCaro('#shareCarousel');});

  document.getElementById('lnkCopyText').addEventListener('click', copyText);
  document.getElementById('lnkCopyThumbnail').addEventListener('click', copyThumbnail);
  document.getElementById('lnkCopyCode').addEventListener('click', copyCode);
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('lnk_share').onclick = function() {
    initShare();
    $('[data-toggle="popover"]').popover();
  }
  document.getElementById('popularGames').onclick = function() {
    location.href = 'https://offroadoutlaws.io?utm_source=newtab&utm_medium=ext&appid='+appid+'&ext=' + location.host;
  }
  $('#shareCarousel .carousel-control-prev-icon').hide();
  $('#shareCarousel').on('slide.bs.carousel', function (evt) {
    if(evt.to == 0) {
      $('#shareCarousel .carousel-control-prev-icon').hide();
      $('#shareCarousel .carousel-control-next-icon').show();
    }
    else if(evt.to == 2){
      $('#shareCarousel .carousel-control-prev-icon').show();
      $('#shareCarousel .carousel-control-next-icon').hide();
    }
    else {
      $('#shareCarousel .carousel-control-prev-icon').show();
      $('#shareCarousel .carousel-control-next-icon').show();
    }
  });
  initButtons();
});
