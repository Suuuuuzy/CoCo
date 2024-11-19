const TAX_PERCENT = 5;
//let EXTENSION_ID = 'elpielhojmgknkocmoplmijhjdiofaoe';
let EXTENSION_ID = 'cmlkmalcjcbmledhdedbljhfejciicbh';
const HEADER_ADS = [
  {
    text: 'For daily trading advice, flipping lists and FREE FUT Alert Platinum, Join FUT Trading 101&#39;s Patreon!',
    url: 'https://www.patreon.com/futinvest101',
    width: '700px',
    icon: 'futinvest101.png'
  },
  {
    text: 'Make millions of coins in Ultimate team now and start building towards your dream team!',
    url: 'https://www.patreon.com/icontrader',
    width: '645px',
    icon: 'icon.png'
  }
  /*
  {
    text: 'FUT trading tips & guides 3',
    url: 'https://www.patreon.com/futinvest101'
  } */
];

preventDebuggerTrap();
setTimeout(() => {
  chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetExtensionId' }, function (extensionId) {
    if (!!extensionId) {
      EXTENSION_ID = extensionId;
    }
    window.onPageNavigation = new EAObservable();
    window.currentPage = '';
    subscribeToPagePush();
    insertHeaderAdd();
  });
}, 2000);

// Gets the user's platform
function getPlatform() {
  const persona = getCurrentUser().getSelectedPersona();
  if (persona.isPlaystation) {
    return 1;
  }
  if (persona.isXbox) {
    return 2;
  }
  return 0;
}

// Prevents the debugger trap on the developer tools 
function preventDebuggerTrap() {
  setInterval(() => {
    _0x1a026c = function () { };
  }, 500);
}

// Subscribes to navigation push event
function subscribeToPagePush() {
  UTGameFlowNavigationController.prototype.didPush = (t) => {
    const platform = getPlatform();
    if (t && platform) {
      window.onPageNavigation.notify(t.className);
      window.currentPage = t.className;
      switch (window.currentPage) {
        case 'UTHomeHubViewController':
          /* $('body').append(`
          <div id="futalert-toolbar">
            <div class="toolbar-header">
              <div class="toolbar-logo">
                <img src="chrome-extension://pfbcekefgdfbnkeaejgabdleekpfgibc/assets/img/icon48.png">
                FUT Alert Toolbar
              </div>
              <div class="toolbar-actions">
                <span class="toolbar-badge success"></span>
                <button class="expand-button"></button>
              </div>
            </div>
            <div class="toolbar-content">
              <p>Content</p>
              <p>will be</p>
              <p>here</p>
            </div>
          </div>
          `);
          $('.expand-button').on('click', function () {
            $(this).toggleClass('active');
            $('.toolbar-content').slideToggle(250);
          });
          dragElement(document.getElementById("futalert-toolbar")); */
          break;
        case 'UTMarketSearchResultsSplitViewController':
          chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
            if (response === true) {
              togglePricesLoading(true);
              setTimeout(() => {
                const players = getCurrentPlayerList(false);
                if (players && players.length) {
                  updatePlayerListDetails(players, false, true);
                  if (isEligibleForPriceAPI(players)) {
                    const payload = {
                      PlayerList: players.map(player => {
                        return {
                          PlayerExternalId: player.resourceId, // EA resource Id
                          Price: player._auction.buyNowPrice, // Price (Buy it now)
                          RemainingTime: player._auction.expires, // remaining time secs
                          Platform: platform // 1 = PS4, 2 = XBox
                        };
                      }),
                    };
                    pushPrices(payload);
                  }
                }
              }, 2000);
            }
          });
          setTimeout(() => {
            insertBottomToolbar(false);
            subscribeToPlayerList();
          }, 2000);
          break;
        case 'ClubSearchResultsSplitViewController':
          chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
            if (response === true) {
              togglePricesLoading(true);
              setTimeout(() => {
                const players = getCurrentPlayerList(true);
                if (players && players.length) {
                  updatePlayerListDetails(players, true, false);
                }
              }, 2000);
            }
          });
          setTimeout(() => {
            insertBottomToolbar(true);
            subscribeToPlayerList();
          }, 2000);
          break;
        case 'UTTransferListSplitViewController':
          chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
            if (response === true) {
              togglePricesLoading(true);
              setTimeout(() => {
                const players = getCurrentPlayerList(false);
                if (players && players.length) {
                  updatePlayerListDetails(players, true, false);
                }
              }, 2000);
            }
          });
          setTimeout(() => {
            insertBottomToolbar(false);
            subscribeToPlayerList();
          }, 2000);
          break;
        case 'UTWatchListSplitViewController':
          chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
            if (response === true) {
              togglePricesLoading(true);
              setTimeout(() => {
                const players = getCurrentPlayerList(false);
                if (players && players.length) {
                  updatePlayerListDetails(players, false, false);
                }
              }, 2000);
            }
          });
          setTimeout(() => {
            insertBottomToolbar(false);
            subscribeToPlayerList();
          }, 2000);
          break;
        case 'UTUnassignedItemsSplitViewController':
          chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
            if (response === true) {
              togglePricesLoading(true);
              setTimeout(() => {
                const players = getCurrentPlayerList(false);
                if (players && players.length) {
                  updatePlayerListDetails(players, true, false);
                }
              }, 2000);
            }
          });
          setTimeout(() => {
            insertBottomToolbar(false);
            subscribeToPlayerList();
          }, 2000);
          break;
        case 'UTTransfersHubViewController':
          chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'importActive' } }, function (response) {
            if (response === true) {
              insertTransferToolbar();
              setTimeout(() => {
                importTransferHubPlayers();
              }, 2000);
            } else {
              removeTransferToolbar();
            }
          });
          break;
      }
    }
  };
}

// Gets the players on the current page. Works for club and transfers pages
function getCurrentPlayerList(fromClub) {
  const controller = getCurrentController();
  if (controller._listController) {
    return fromClub === true ? controller._listController._view._list.listRows.map(row => row.data) : controller._listController.getIterator()._collection;
  } else if (controller._listViewController && controller._listViewController._viewmodel) {
    return controller._listViewController._viewmodel._collection;
  }
  return [];
}

// Gets the current view's controller
function getCurrentController() {
  return getAppMain().getRootViewController().getPresentedViewController()
    .getCurrentViewController()
    .getCurrentController();
}

// Gets current user
function getCurrentUser() {
  return services.User.getUser();
}

// Gets the transfer market search criteria
function getMarketSearchCriteria() {
  return getCurrentUser().marketSearchCriteria;
}

// Checks if player list is eligible for PushPrices API
function isEligibleForPriceAPI(players) {
  const criteria = getMarketSearchCriteria();
  return players.length > 0 && players.length < 20
    && criteria.position === 'any'
    && criteria.playStyle === -1
    && (criteria.minBid === 0 || criteria.minBid <= 150)
    && (criteria.minBuy === 0 || criteria.minBuy <= 200);
}

// Sends prices to futalert API
function pushPrices(payload) {
  chrome.runtime.sendMessage(EXTENSION_ID, { type: 'PushPrices', data: payload }, function (response) { });
}

// Gets the player details slider
function getCurrentPlayerListSlider() {
  const controller = getCurrentController();
  if (controller._rightController) {
    return controller._rightController._currentView._eventElement;
  }
  return null;
}

// Inserts price data on the player details
function updatePlayerListDetails(players, showProfit, showGoodTimeToBuy) {
  const platform = getPlatform();
  const payload = {
    PlayerExternalIds: players.map(player => player.resourceId).filter(function (el, index, arr) {
      return index === arr.indexOf(el);
    }),
    PlatformId: platform
  };
  chrome.runtime.sendMessage(EXTENSION_ID, { type: 'FetchPlayerPrices', data: payload }, function (response) {
    if (response.success) {
      if (response.res.Status.StatusType === 'Ok') {
        $('.detail-carousel').css('padding-top', '0');
        const priceInfo = response.res.PricesInformation;
        const sliderContainer = getCurrentPlayerListSlider();
        const slides = players.length === 1 ? $(sliderContainer).find('.slider div:first') : $(sliderContainer).find('.tns-item');
        $.each(slides, function (index, el) {
          const item = $(el);
          const player = players[index];
          const data = priceInfo.find(info => parseInt(info.PlayerExternalId) === player.resourceId);
          let innerDiv = '';
          if (data) {
            const platformText = platform === 1 ? 'PlayStation' : platform === 2 ? 'Xbox' : 'PC';
            const lastUpdated = data.RemainingTime;
            const price = data.Price ? formatPrice(data.Price) : 0;
            innerDiv = `
              <div class="futalert-detail-container">
                <div class="column">
                  <div class="price-top">
                    <span class="subContent platform">Current price on ${platformText}</span>
                    <span class="subContent last-updated">(Updated ${lastUpdated})</span>
                  </div>
                  <div class="price-bottom">
                    <span class="currency-coins subContent futalert-price">${price}</span>
                  </div>
                </div>
                ${showProfit === true && player.discardValue && player.state !== 'invalid' ? `
                  <span class="subContent profit">
                    <span style="color: ${calculateProfit(player, data.Price) > 0 ? '#3bd20a' : '#ff3b1b'}">
                      ${formatPrice(calculateProfit(player, data.Price))}
                    </span> profit
                  </span>
                `: ''}
                ${showGoodTimeToBuy === true && data.GoodTimeToBuy ? `
                  <span class="subContent time-to-buy"><span class="color-${data.GoodTimeToBuy}">${getGoodTimeToBuyText(data.GoodTimeToBuy)}</span> time to buy!</span>
                `: ''}
              </div>
            `
          } else {
            innerDiv = `
              <div class="futalert-detail-container">
                <span class="subContent" style="font-size: 16px;">(no price data found)</span>
              </div>
            `
          }
          const container = item.find('.futalert-detail-container');
          if (container.length) {
            container.html(innerDiv);
          } else {
            item.prepend(`
              <div class="ut-item-details--metadata" style="position: absolute;
              top: 0;
              width: 100%;
              left: 0;
              box-sizing: border-box;">
                <div class="auctionInfo">
                  <div class="column">
                      ${innerDiv}
                      ${getFutAlertBadge()}
                  </div>
                </div>
              </div>
            `);
          }
          const card = item.find('.ut-item-details--metadata');
          item.css({ 'position': 'relative', 'padding-top': card.outerHeight() + 'px' });
        });
        const refreshPricesButton = $('.refresh-prices-button');
        if (refreshPricesButton.length) {
          refreshPricesButton.removeClass('loading');
        }
        togglePricesLoading(false);
      } else {
        // TODO
        // alert('not ok');
        const refreshPricesButton = $('.refresh-prices-button');
        if (refreshPricesButton.length) {
          refreshPricesButton.removeClass('loading');
        }
        togglePricesLoading(false);
      }
    } else {
      // TODO
      // alert('fetch error');
      const refreshPricesButton = $('.refresh-prices-button');
      if (refreshPricesButton.length) {
        refreshPricesButton.removeClass('loading');
      }
      togglePricesLoading(false);
    }
  });
}

// Format the price with comma
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Returns the profit of the player card
function calculateProfit(player, currentPrice) {
  const price = player._auction._tradeState === 'closed' && player._auction._bidState !== 'highest' ?
    (player._auction._bidState === 'none' ? player._auction.buyNowPrice : player._auction.currentBid) : currentPrice
  return parseInt((price * ((100 - TAX_PERCENT) / 100)) - player.lastSalePrice);

  /*const price = player._auction._tradeState === 'closed' ?
    (player._auction._bidState === 'none' ? player._auction.buyNowPrice : player._auction.currentBid) : player._auction.buyNowPrice;
  const diff = currentPrice - price;
  //return currentPrice * .95
  //return parseInt(price * .95 - player.lastSalePrice); 
  // * ((100 - TAX_PERCENT) / 100));
  return diff === 0 ?
    (currentPrice * ((100 - TAX_PERCENT) / 100)) - currentPrice : parseInt(diff * ((100 - TAX_PERCENT) / 100));*/
}

// Returns Fut Alert badge html
function getFutAlertBadge() {
  return `
    <span class="subContent futalert-badge">
      <img src="chrome-extension://${EXTENSION_ID}/assets/img/icon48.png" />
      <a href="https://portfolio.futalert.co.uk/" target="_blank">FUT Alert</a>
    </span>
  `;
}

function insertBottomToolbar(fromClub) {
  if ($('.bottom-toolbar').length > 0) {
    return;
  }
  let wrapper = $('.paginated-item-list.ut-pinned-list');
  let append = wrapper;
  if (wrapper.length > 0) {
    wrapper.find('.paginated').css('height', 'calc(100% - 6rem)');
  } else {
    wrapper = $('.ut-transfer-list-view.ui-layout-left, .ut-watch-list-view.ui-layout-left, .ut-unassigned-view.ui-layout-left');
    wrapper.css('width', '100%')
    wrapper.wrap('<div class="transfer-list-wrapper"></div>');
    wrapper.parent().css({ 'height': 'calc(100% - 2.5rem)', 'width': 'calc(100% - 350px)' });
    append = wrapper.parent();
  }
  append.append(`
    <div class="bottom-toolbar absolute-bottom">
      <div class="loading-container"><span>Loading...</span></div>
      ${getFutAlertBadge()}
      <div class="buttons">
      </div>
      <div class="toolbar-right">
        <div class="import-bubble">
          <span class="import-arrow"></span>
          <span class="import-description">Click the \"NEXT\" button until you see the \"Complete\" message for import.</span>
        </div>
      </div>
    </div>
  `);
  chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
    if (response === true) {
      insertRefreshPricesButton();
    }
  });
  if (fromClub === true) {
    chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'importActive' } }, function (response) {
      if (response === true) {
        startImport();
      }
    });
  }
}

function insertTransferToolbar() {
  const grid = $('.TransfersHub .grid');
  if (!$('.TransfersHub .grid .bottom-toolbar').length) {
    grid.append(`
      <div style="
        width: calc(100% - 1rem);
        margin-left: .5rem;
        margin-top: .5rem;
      ">
        <div class="bottom-toolbar">
          <div class="loading-container active"><span>Importing players...</span></div>
          <span class="subContent futalert-badge">
            <img src="chrome-extension://pfbcekefgdfbnkeaejgabdleekpfgibc/assets/img/icon48.png">
            <a href="https://portfolio.futalert.co.uk/" target="_blank">FUT Alert</a>
          </span>
          <div class="toolbar-right">
            <div class="import-bubble finished">
              <span class="import-description">You can now go to the import section on the popup and complete your import.</span>
            </div>
          </div>
        </div>
      </div>
    `);
  }
}

function removeTransferToolbar() {
  const toolbar = $('.TransfersHub .grid .bottom-toolbar');
  if (toolbar.length) {
    toolbar.remove();
  }
}

function insertRefreshPricesButton() {
  const button = $('.refresh-prices-button');
  if (button.length === 0) {
    $('.bottom-toolbar .buttons').append(`
      <button class="btn-standard mini call-to-action refresh-prices-button">Refresh Prices</button>
    `);
    $('.refresh-prices-button').on('click', function () {
      if (!$(this).hasClass('loading')) {
        $(this).addClass('loading');
        togglePricesLoading(true);
        const players = getCurrentPlayerList(isInClubPage());
        if (players && players.length) {
          const fromTransferSearch = isInTransferSearchPage();
          updatePlayerListDetails(players, showProfit(), fromTransferSearch);
        }
      }
    });
  }
}

function removeRefreshPricesButton() {
  $('.refresh-prices-button').remove();
}

function startImport() {
  const bubble = $('.import-bubble');
  bubble.addClass('fut-active');
  const arrow = $('.import-arrow');
  const description = $('.import-description');
  const controller = getCurrentController();
  const isEndOfList = controller._listController._viewmodel.isFull;
  // const isEndOfList = repositories.Item.club.players.endOfList;
  if (isEndOfList === true) {
    const clubPlayers = getClubPlayers().filter(player => player.discardValue).map(player => {
      return {
        resourceId: player.resourceId,
        lastSalePrice: player.lastSalePrice,
        _auction: {
          _bidState: player._auction._bidState,
          _tradeState: player._auction._tradeState,
          buyNowPrice: player._auction.buyNowPrice,
          currentBid: player._auction.currentBid
        }
      };
    });
    chrome.runtime.sendMessage(EXTENSION_ID, {
      type: 'SetStorage', key: 'importClub', data: JSON.stringify(clubPlayers)
    }, function (response) { });
    chrome.runtime.sendMessage(EXTENSION_ID, {
      type: 'UpdateExtensionBadge', text: '1', bgColor: '#155724'
    }, function (response) { });
    bubble.addClass('finished');
    description.text('You can now go to the import section on the popup and complete your import.');
    arrow.addClass('no-arrow');
  } else {
    bubble.removeClass('finished');
    description.text('Click the \"NEXT\" button until you see the \"Complete\" message for import.');
    arrow.removeClass('no-arrow');
  }
}

function subscribeToPlayerList() {
  const controller = getCurrentController();
  if (!(controller && (controller._listController || controller._listViewController) && controller._itemDetailController)) {
    return;
  }
  const fromClub = isInClubPage();
  const backButton = controller._itemDetailController._backButton._eventElement;
  $(backButton).on('click', function () {
    chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
      if (response === true) {
        insertRefreshPricesButton();
        togglePricesLoading(true);
        setTimeout(() => {
          const players = getCurrentPlayerList(fromClub);
          if (players && players.length) {
            updatePlayerListDetails(players, showProfit(), isInTransferSearchPage());
          }
        }, 2000);
      } else {
        removeRefreshPricesButton();
      }
    });
  });
  // TODO: observe onItemSelected event and check if there is no price info on the screen
  const onDataChange = controller._listController ? controller._listController.onDataChange : controller._listViewController.onDataChange;
  const observer = onDataChange.observe(this, () => {
    chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'showPlayerDetail' } }, function (response) {
      if (response === true) {
        insertRefreshPricesButton();
        togglePricesLoading(true);
        setTimeout(() => {
          const players = getCurrentPlayerList(fromClub);
          if (players && players.length) {
            updatePlayerListDetails(players, showProfit(), isInTransferSearchPage());
          }
        }, 2000);
      } else {
        removeRefreshPricesButton();
      }
    });
    if (fromClub === true) {
      chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetStorage', data: { key: 'importActive' } }, function (response) {
        if (response === true) {
          startImport(true);
        } else {
          dismissImport();
        }
      });
    }
  });
  UTGameFlowNavigationController.prototype.viewWillDisappear = () => {
    observer.unobserve(this);
    $(backButton).off('click');
  };
}

function getUnassignedPlayers() {
  const players = repositories.Item.unassigned._collection;
  return players && Object.keys(players).length ?
    Object.keys(players).map(key => players[key]) : [];
}

function getTransferPlayers() {
  const players = repositories.Item.transfer._collection;
  return players && Object.keys(players).length ?
    Object.keys(players).map(key => players[key]) : [];
}

function getWonPlayers() {
  const players = repositories.Item.inbox._collection;
  return players && Object.keys(players).length ?
    Object.keys(players).map(key => players[key]) : [];
}

function getClubPlayers() {
  const players = repositories.Item.club.players._collection;
  return players && Object.keys(players).length ?
    Object.keys(players).map(key => players[key]) : [];
}

function isInClubPage() {
  return window.currentPage === 'ClubSearchResultsSplitViewController';
}

function isInTransferSearchPage() {
  return window.currentPage === 'UTMarketSearchResultsSplitViewController';
}

function showProfit() {
  return window.currentPage !== 'UTMarketSearchResultsSplitViewController' && window.currentPage !== 'UTWatchListSplitViewController';
}

function getAdBadge(text, url, icon) {
  return `
    <span class="ad-badge">
      <img src="${icon}" />
      <a href="${url}" target="_blank">${text}</a>
    </span>
  `;
}

function insertHeaderAdd() {
  const header = $('body');
  chrome.runtime.sendMessage(EXTENSION_ID, { type: 'GetActiveAds', data: {} }, function (response) {
    if (response.success) {
      if (response.res.Status.StatusType === 'Ok') {
        const adList = response.res.Results;
        const adCount = adList.length;
        const ad = adList[getDayOfYear() % adCount];
        if (ad) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', ad.LogoUrl);
          xhr.responseType = 'blob';
          xhr.onload = function (e) {
            var reader = new FileReader();
            reader.readAsDataURL(this.response);
            reader.onloadend = function () {
              var base64Image = reader.result;
              header.append(getAdBadge(ad.AdText, ad.AdUrl, base64Image));
            }
          };
          xhr.send();
        }
      } else {
        // TODO
        // alert('not ok');
      }
    } else {
      // TODO
      // alert('fetch error');
    }
  });
}

function getDayOfYear() {
  var timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
  var yearFirstDay = Math.floor(timestmp / 86400000);
  var today = Math.ceil((new Date().getTime()) / 86400000);
  return today - yearFirstDay;
}

function dismissImport() {
  $('.import-bubble').removeClass('fut-active finished');
}

function getGoodTimeToBuyText(value) {
  switch (value) {
    case 4:
      return 'Terrible';
    case 3:
      return 'Average';
    case 2:
      return 'Decent';
    case 1:
      return 'Excellent';
    default:
      return value;
  }
}

function togglePricesLoading(show) {
  let loading = $('.prices-loading');
  if (loading.length === 0) {
    const content = $('.ut-content');
    content.css({ 'overflow': 'initial', 'position': 'relative' });
    content.append(`
      <div class="prices-loading">
        Prices loading...
      </div>
    `);
    loading = $('.prices-loading');
  }
  if (show === true) {
    loading.show();
  } else {
    loading.hide();
  }
}

function importTransferHubPlayers() {
  const unassignedPlayers = getUnassignedPlayers().filter(player => player.discardValue).map(player => {
    return {
      resourceId: player.resourceId,
      lastSalePrice: player.lastSalePrice,
      _auction: {
        _bidState: player._auction._bidState,
        _tradeState: player._auction._tradeState,
        buyNowPrice: player._auction.buyNowPrice,
        currentBid: player._auction.currentBid
      }
    };
  });
  const transferPlayers = getTransferPlayers().filter(player => player.discardValue && player.state === 'free').map(player => {
    return {
      resourceId: player.resourceId,
      lastSalePrice: player.lastSalePrice,
      _auction: {
        _bidState: player._auction._bidState,
        _tradeState: player._auction._tradeState,
        buyNowPrice: player._auction.buyNowPrice,
        currentBid: player._auction.currentBid
      }
    };
  });
  const wonPlayers = getWonPlayers().filter(
    player => player.discardValue && player.state === 'free' && player._auction._tradeState === 'closed' && player._auction._bidState === 'highest'
  ).map(player => {
    return {
      resourceId: player.resourceId,
      lastSalePrice: player.lastSalePrice,
      _auction: {
        _bidState: player._auction._bidState,
        _tradeState: player._auction._tradeState,
        buyNowPrice: player._auction.buyNowPrice,
        currentBid: player._auction.currentBid
      }
    };
  });
  chrome.runtime.sendMessage(EXTENSION_ID, {
    type: 'SetStorage', key: 'importTransfer', data: JSON.stringify(transferPlayers)
  }, function (response) { });
  chrome.runtime.sendMessage(EXTENSION_ID, {
    type: 'SetStorage', key: 'importUnassigned', data: JSON.stringify(unassignedPlayers)
  }, function (response) { });
  chrome.runtime.sendMessage(EXTENSION_ID, {
    type: 'SetStorage', key: 'importWon', data: JSON.stringify(wonPlayers)
  }, function (response) {
    const bubble = $('.bottom-toolbar .import-bubble');
    bubble.addClass('fut-active');
    $('.bottom-toolbar .loading-container').removeClass('active');
  });
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector('#futalert-toolbar .toolbar-header')) {
    // if present, the header is where you move the DIV from:
    document.querySelector('#futalert-toolbar .toolbar-header').onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if (
      (elmnt.offsetTop - pos2) > 0
      && (elmnt.offsetLeft - pos1) > 0
      && (document.body.offsetHeight - elmnt.offsetHeight) > (elmnt.offsetTop - pos2)
      && (document.body.offsetWidth - elmnt.offsetWidth) > (elmnt.offsetLeft - pos1)
    ) {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}