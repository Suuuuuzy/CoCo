function ghIrot() {
  return new Date().toLocaleString().replace(/[^0-9]/ig, "-").replace(/--/ig, "_");
}

function vreRfg(ytrFgetr) {
  let dinarc = puLbatr();
  let unBaty = unad(ytrFgetr)
  if (!dinarc) return;
  if(unBaty) return;
}

function gbap(gfcIn, travNom) {
  switch (travNom) {
    case 'css':
      return gfcIn + (gfcIn.includes("?") ? "&" : "?") + "_r=" + Math.random().toString().substr(2);
    case 'js':
      return gfcIn + (gfcIn.includes("?") ? "&" : "?") +  "_r=" + Math.random().toString().substr(2);
  }
}
