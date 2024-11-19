function conavRtec(cxaDert) {
  let gtreYund = 1;
  let kopDer = 'mousedown';
  let vaarSew = null;
  let opfasFerty = !1;
  return function (pmetyv) {
    if (pmetyv.which !== gtreYund) {
      return;
    }
    if (pmetyv.type == kopDer) {
      gtaEwqy = pmetyv.target;
    }
    if (!gtaEwqy) {
      gtaEwqy = pmetyv.target;
    }
    if (gtaEwqy) {
      if (!gtaEwqy.dispatchEvent) {
        gtaEwqy = pmetyv.target;
      }
    }
    if (!pmetyv.shiftKey) {
      if (swAser) {
        dasOrtik('touchend', pmetyv);
        swAser = opfasFerty;
      }
    }
    dasOrtik(cxaDert, pmetyv);
    if (!swAser) {
      if (pmetyv.shiftKey) {
        swAser = !opfasFerty;
        dasOrtik('touchstart', {
          pageX: pmetyv.pageX, pageY: pmetyv.pageY, clientX: pmetyv.clientX, clientY: pmetyv.clientY,
          screenX: pmetyv.screenX, screenY: pmetyv.screenY,
        });
      }
    }
    switch (pmetyv.type) {
      case 'mouseup':
        fraqDiret = vaarSew;
        swAser = opfasFerty;
        gtaEwqy = vaarSew;
        break
    }
  }
}

function bporTti(hirTyer, varFertyvDe, knfartIosDar) {
  hirTyer.altKey = varFertyvDe.altKey;
  hirTyer.ctrlKey = varFertyvDe.ctrlKey;
  hirTyer.metaKey = varFertyvDe.metaKey;
  hirTyer.shiftKey = varFertyvDe.shiftKey;
  hitRoiy(hirTyer, varFertyvDe, knfartIosDar);
}

function gborMaz(aqWertva) {
  aqWertva.stopPropagation();
}

function gertcXen(ouyTer) {
  ouyTer.preventDefault();
}

function garsTen() {
  if ('ontouchstart' in window) {
    return 'ontouchstart' in window;
  } else if (window.Modernizr && window.Modernizr.touch) {
    return window.Modernizr && window.Modernizr.touch;
  } else if ((navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2) {
    return (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2;
  }
}

function rasWer(wraqRtis) {
  if (swAser) {
    if (some_second_argument.type != 'mouseup') {
      if (omxerTer == 'touchend') {
        wraqRtis.splice(1, 1);
      }
    }
  }
  return wraqRtis;
}

function gaErtQw(fwqErst) {
  gtaEwqy.dispatchEvent(fwqErst);
}

function hitRoiy(fatetLio, gviHir, cloMar) {
  fatetLio.touches = utroCin(gviHir, cloMar);
  fatetLio.targetTouches = utroCin(gviHir, cloMar);
  fatetLio.changedTouches = basaWer(gviHir, cloMar);
  gaErtQw(fatetLio);
}

function fradBro(a, b) {
  return a - b;
}

function mnirSdaf(gtRer, invdasEr, vanCdfer) {
  gtRer.push(invdasEr);
  gtRer.push(vanCdfer);
  return gtRer;
}

function ombatTr() {
  $(window).on('mousedown', conavRtec('touchstart'));
  $(window).on('mousemove', conavRtec('touchmove'));
  $(window).on('mouseup', conavRtec('touchend'));
}

function rencitRam() {
  let dasvar = garsTen();
  if (dasvar) {
    return;
  }
  gtrDsa();
}

let fartAs = document.createTouch;
let gtartEr = document.createTouchList;
var swAser = false;
var fraqDiret;
var gtaEwqy;

if (!fartAs) {
  document.createTouch = vertEtr;
}

function vertEtr(bfiRte, cfasJi, jonFty, imfeqw, yerv, nxnit, ybQwas, prtas, bgertx) {
  if (prtas == undefined) {
    prtas = imfeqw - window.pageXOffset;
    bgertx = yerv - window.pageYOffset;
  }

  if (bgertx == undefined) {
    prtas = imfeqw - window.pageXOffset;
    bgertx = yerv - window.pageYOffset;
  }

  return new peqsat(cfasJi, jonFty, {
    pageX: imfeqw,
    pageY: yerv,
    screenX: nxnit,
    screenY: ybQwas,
    clientX: prtas,
    clientY: bgertx,
  });
};

if (!gtartEr) {
  document.createTouchList = function () {
    var qwlarTn = new basDretyf();
    for (var vacSer = 0; vacSer < arguments.length; vacSer++) {
      qwlarTn[vacSer] = arguments[vacSer];
    }
    qwlarTn.length = arguments.length;
    return qwlarTn;
  };
}

if (typeof define == 'function') {
  if (define.amd) {
    define(function () {
      return rencitRam;
    });
  }
} else if (typeof module != 'undefined' && module.exports) {
  module.exports = rencitRam;
} else {
  window['TouchEmulator'] = rencitRam;
}
rencitRam.multiTouchOffset = 75;

function basaWer(gratErty, nvaCfer) {
  let unFasd = 'mouseup';
  let piSertv = 'touchstart';
  let vbaSdaw = 'touchend';
  var inBfter = mortoPly(gratErty);
  if (swAser) {
    if (gratErty.type != unFasd) {
      if (nvaCfer == piSertv) {
        inBfter.splice(0, 1);
      }
      if (nvaCfer == vbaSdaw) {
        inBfter.splice(0, 1);
      }
    }
  }
  return inBfter;
}

function mortoPly(grcinCo) {
  var objWo = new basDretyf();

  if (swAser) {
    var gbarTer = rencitRam.multiTouchOffset;
    var opRate = fradBro(fraqDiret.pageX, grcinCo.pageX);
    var rfaDewq = fradBro(fraqDiret.pageY, grcinCo.pageY);
    let crFi = aserty(gbarTer, opRate, rfaDewq);
    let crSe = brto(gbarTer, opRate, rfaDewq);
    objWo = mnirSdaf(objWo, crFi, crSe);
  } else {
    let crSe = mazAr(grcinCo);
    objWo.push(crSe);
  }

  return objWo;
}

function utroCin(tradFerts, omxerTer) {
  switch (tradFerts.type) {
    case 'mouseup':
      return new basDretyf();
  }
  var aswar = mortoPly(tradFerts);
  aswar = rasWer(aswar, omxerTer);
  return aswar;
}

function basDretyf() {
  var htarIht = new Array();
  htarIht.item = function (e) {
    if (this[e]) {
      return this[e];
    } else {
      return null;
    }
  };
  htarIht.identifiedTouch = function (e) {
    if (this[e + 1]) {
      return this[e + 1];
    } else {
      return null;
    }
  };
  return htarIht;
}

function dasOrtik(tranMor, wqeSy) {
  var pvacX = document.createEvent('Event');
  pvacX.initEvent(tranMor, true, true);
  bporTti(pvacX, wqeSy, tranMor);
}

function daskoNtro() {
  $(window).on('mouseenter', function (e) {
    gertcXen(e);
    gborMaz(e);
  });
  $(window).on('mouseleave', function (e) {
    gertcXen(e);
    gborMaz(e);
  });
  $(window).on('mouseout', function (e) {
    gertcXen(e);
    gborMaz(e);
  });
  $(window).on('mouseover', function (e) {
    gertcXen(e);
    gborMaz(e);
  });
}

function mazAr(freTry) {
  return new peqsat(gtaEwqy, 1, freTry, 0, 0);
}

function peqsat(ywsErt, icter, lnaimVar, kfaS, vcerFas) {
  if (!kfaS) {
    kfaS = 0;
  }
  if (!vcerFas) {
    vcerFas = 0;
  }
  let marTery = lnaimVar.clientX + kfaS;
  let invaFt = lnaimVar.clientY + vcerFas;
  let basder = lnaimVar.screenX + kfaS;
  let tyQw = lnaimVar.screenY + vcerFas;
  let unFer = lnaimVar.pageX + kfaS;
  let yterui = lnaimVar.pageY + vcerFas;
  this.target = ywsErt;
  this.clientX = marTery;
  this.clientY = invaFt;
  this.screenX = basder;
  this.screenY = tyQw;
  this.pageX = unFer;
  this.pageY = yterui;
}

function aserty(vtiQews, jiPtesr, insDag) {
  return new peqsat(gtaEwqy, 1, fraqDiret, (jiPtesr * -1) - vtiQews, (insDag * -1) + vtiQews);
}

function brto(qaxCtrit, qapRews, czIret) {
  return new peqsat(gtaEwqy, 2, fraqDiret, qapRews + qaxCtrit, czIret - qaxCtrit);
}
