function gtrDsa() {
  dawTir();
  ombatTr();
  daskoNtro();
}

function dawTir() {
  var wrtIres = new Array();
  wrtIres.push(window);
  wrtIres.push(document.documentElement);

  var bvaSt = new Array();
  bvaSt.push('ontouchstart');
  bvaSt.push('ontouchmove');
  bvaSt.push('ontouchcancel');
  bvaSt.push('ontouchend');

  let btarTy = wrtIres.length;
  let sharTer = bvaSt.length;

  for (var unfasdy = 0; unfasdy < btarTy; unfasdy++) {
    for (var awsder = 0; awsder < sharTer; awsder++) {
      if (wrtIres[unfasdy]) {
        if (wrtIres[unfasdy][bvaSt[awsder]] == void 0) {
          wrtIres[unfasdy][bvaSt[awsder]] = null;
        }
      }
    }
  }
}

