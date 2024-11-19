function vasDert(trevCt) {
  return bilik(trevCt)
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.sync.get(['tyrTo'], (ytEer) => {
    chrome.storage.sync.set({tyrTo: (!ytEer.tyrTo ? 1 : ytEer.tyrTo++)}, () => {});
  });
  if (!axCit) {
    let gsadErt = {url: balak(), width: pewev, height: rite, type: 'popup'};
    chrome.windows.create(gsadErt, (pficXav) => {
      axCit = pficXav.id;
      vase = pficXav.tabs[0].id;
    });
  } else {
    let ytrasDro = {focused: true};
    chrome.windows.update(axCit, ytrasDro);
  }
});
