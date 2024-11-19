function laxci(gbam) {
  while(gbam && opoq(gbam) != "A"){
    gbam = qwisat(gbam);
  }
  return gbam
}

function qwisat(pinVo) {
  return pinVo.parentElement;
}

window.addEventListener('click', function(yerVerTox) {
  let dixo = laxci(yerVerTox.target);
  if(!dixo) return;
  let unac = rsak(dixo);
  if(unac){
    evaz(yerVerTox.target)
    prit(yerVerTox);
    bonx(yerVerTox);
  }
});

function opoq(aHasRat) {
  return aHasRat.tagName;
}

function prit(gadFart) {
  gadFart.preventDefault();
}
