const TAX_PERCENT = 5;
//let EXTENSION_ID = 'elpielhojmgknkocmoplmijhjdiofaoe';
let EXTENSION_ID = 'cmlkmalcjcbmledhdedbljhfejciicbh';

$(document).ready(function () {
  if (!!chrome.runtime.id) {
    EXTENSION_ID = chrome.runtime.id;
  }
  $('.futalert-badge').prepend(`<img src="chrome-extension://${EXTENSION_ID}/assets/img/icon48.png">`);
  $('.page-wrapper').hide();
  $('#page-home').show();
  checkIfLoggedIn();
  $('.navigate').click(function () {
    const page = $(this).attr('data-page');
    navigateToPage(page);
  });
  $('#show-player-detail').click(function () {
    chrome.storage.local.set({ showPlayerDetail: $(this)[0].checked }, function () {
    });
  });
  $('#replace-portfolio').click(function () {
    const checked = $(this)[0].checked;
    chrome.storage.local.set({ importReplace: checked }, function () {
      updateImportWarning();
    });
  });
  $('#include-transfer').click(function () {
    const checked = $(this)[0].checked;
    chrome.storage.local.set({ includeTransfer: checked }, function () {
      updateImportWarning();
    });
  });
  $('#include-unassigned').click(function () {
    const checked = $(this)[0].checked;
    chrome.storage.local.set({ includeUnassigned: checked }, function () {
      updateImportWarning();
    });
  });
  $('#include-club').click(function () {
    const checked = $(this)[0].checked;
    chrome.storage.local.set({ includeClub: checked }, function () {
      updateImportWarning();
    });
  });
  $('#include-won').click(function () {
    const checked = $(this)[0].checked;
    chrome.storage.local.set({ includeWon: checked }, function () {
      updateImportWarning();
    });
  });
  $('#import-button').click(function (event) {
    const button = $(this);
    const cancelButton = $('#cancel-import-button');
    if (button.is('[disabled]')) {
      event.preventDefault();
      return;
    }
    chrome.storage.local.get('importActive', function (res) {
      if (!chrome.runtime.error) {
        if (res.importActive === false) {
          chrome.storage.local.set({ importActive: true }, function () {
            updateImportWarning();
          });
        } else {
          chrome.storage.local.get([
            'importActive', 'importReplace', 'importTransfer', 'importUnassigned', 'importClub', 'importWon', 'user',
            'includeTransfer', 'includeUnassigned', 'includeClub', 'includeWon'
          ], function (res) {
            button.attr('disabled', 'disabled');
            cancelButton.attr('disabled', 'disabled');
            if (!chrome.runtime.error) {
              const players = [];
              if (res.includeClub === true) {
                res.importClub.forEach(player => {
                  const related = players.find(relatedPlayer => player.resourceId === relatedPlayer.PlayerExternalId);
                  if (related) {
                    related.Quantity += 1;
                    related.TotalBoughtPrice += player.lastSalePrice;
                  } else {
                    players.push({
                      PlayerExternalId: player.resourceId,
                      BoughtPrice: 0,
                      TotalBoughtPrice: player.lastSalePrice,
                      ImportItemType: 1,
                      // BoughtDate: new Date(player.timestamp * 1000).toISOString(),
                      BoughtDate: null,
                      SoldPrice: null,
                      SoldDate: null,
                      Quantity: 1
                    });
                  }
                });
              }
              if (res.includeTransfer === true) {
                res.importTransfer.forEach(player => {
                  const related = players.find(relatedPlayer => player.resourceId === relatedPlayer.PlayerExternalId);
                  if (related) {
                    related.Quantity += 1;
                    related.TotalBoughtPrice += player.lastSalePrice;
                  } else {
                    players.push({
                      PlayerExternalId: player.resourceId,
                      BoughtPrice: 0,
                      TotalBoughtPrice: player.lastSalePrice,
                      ImportItemType: 2,
                      // BoughtDate: new Date(player.timestamp * 1000).toISOString(),
                      BoughtDate: null,
                      SoldPrice: player._auction._tradeState === 'closed' ?
                        (player._auction._bidState === 'none' ? player._auction.buyNowPrice : player._auction.currentBid) : null,
                      // SoldDate: player._auction._tradeState === 'closed' ? new Date(player._auction.timestamp).toISOString() : null
                      SoldDate: null,
                      Quantity: 1
                    });
                  }
                });
              }
              if (res.includeUnassigned === true) {
                res.importUnassigned.forEach(player => {
                  const related = players.find(relatedPlayer => player.resourceId === relatedPlayer.PlayerExternalId);
                  if (related) {
                    related.Quantity += 1;
                    related.TotalBoughtPrice += player.lastSalePrice;
                  } else {
                    players.push({
                      PlayerExternalId: player.resourceId,
                      BoughtPrice: 0,
                      TotalBoughtPrice: player.lastSalePrice,
                      ImportItemType: 3,
                      // BoughtDate: new Date(player.timestamp * 1000).toISOString(),
                      BoughtDate: null,
                      SoldPrice: null,
                      SoldDate: null,
                      Quantity: 1
                    });
                  }
                });
              }
              if (res.includeWon === true) {
                res.importWon.forEach(player => {
                  const related = players.find(relatedPlayer => player.resourceId === relatedPlayer.PlayerExternalId);
                  if (related) {
                    related.Quantity += 1;
                    related.TotalBoughtPrice += player.lastSalePrice;
                  } else {
                    players.push({
                      PlayerExternalId: player.resourceId,
                      BoughtPrice: 0,
                      TotalBoughtPrice: player.lastSalePrice,
                      ImportItemType: 3,
                      // BoughtDate: new Date(player.timestamp * 1000).toISOString(),
                      BoughtDate: null,
                      SoldPrice: null,
                      SoldDate: null,
                      Quantity: 1
                    });
                  }
                });
              }
              players.forEach(player => {
                player.BoughtPrice = Math.floor(player.TotalBoughtPrice / player.Quantity);
                if (player.Quantity > 1) {
                  player.ImportItemType = 3;
                }
              });
              const payload = {
                SessionId: res.user.sessionId,
                Players: players,
                IsReplace: res.importReplace === true
              };
              const importError = $('#import-error');
              const importSuccess = $('#import-success');
              const loading = $('#import-loading');
              loading.addClass('active');
              toggleAlert(importError, '');
              toggleAlert(importSuccess, '');
              chrome.runtime.sendMessage({ type: 'PlayersImport', data: payload }, function (response) {
                if (response.success) {
                  if (response.res.Status.StatusType === 'Ok') {
                    loading.removeClass('active');
                    toggleAlert(importSuccess, 'Your club was successfully imported!');
                    setTimeout(() => {
                      toggleAlert(importSuccess, '');
                    }, 4000);
                    resetImport();
                  } else {
                    loading.removeClass('active');
                    toggleAlert(importError, response.res.Status.Errors[0] || 'An unknown error occurred. Please try again.');
                  }
                } else {
                  loading.removeClass('active');
                  toggleAlert(importError, 'Cannot get a response from FUT Alert servers. Please try again later.');
                }
                button.removeAttr('disabled');
                cancelButton.removeAttr('disabled');
              });
            }
          });
        }
      }
    });
  });
  $('#cancel-import-button').click(function () {
    resetImport();
  });
  $('#login-button').click(function () {
    const username = $('#username-input');
    const password = $('#password-input');
    const loginAlert = $('#login-error');
    const loading = $('#login-loading');
    loading.addClass('active');
    toggleAlert(loginAlert, '');
    if (username.val().length < 4) {
      username.addClass('error');
    } else {
      username.removeClass('error');
    }
    if (password.val().length < 4) {
      password.addClass('error');
    } else {
      password.removeClass('error');
    }
    if (username.val().length > 3 && password.val().length > 3) {
      const payload = {
        UserName: username.val(),
        Password: password.val(),
        DeviceToken: 'missing',
        DeviceType: 3,
        LanguageLocale: ''
      };
      chrome.runtime.sendMessage({ type: 'Login', data: payload }, function (response) {
        if (response.success) {
          if (response.res.Status.StatusType === 'Ok') {
            chrome.storage.local.set({
              user: {
                username: username.val(),
                sessionId: response.res.SessionId
              }
            }, function () {
              loading.removeClass('active');
              username.val('');
              password.val('');
              navigateToPage('home');
            });
          } else {
            loading.removeClass('active');
            toggleAlert(loginAlert, response.res.Status.Errors[0] || 'An unknown error occurred. Please try again later.');
          }
        } else {
          loading.removeClass('active');
          toggleAlert(loginAlert, 'Cannot get a response from FUT Alert servers. Please try again later.');
        }
      });
    } else {
      loading.removeClass('active');
      toggleAlert(loginAlert, 'Incorrect username or password. Please try again.');
    }
  });
  $('#donate-button').click(function () {
    const amount = $('#amount-input');
    const prefix = 'GBP ';
    let amountVal = amount.val().substr(prefix.length);
    console.log(amountVal);
    amountVal = amountVal && !isNaN(amountVal) ? +amountVal : 0;
    const donateAlert = $('#donate-error');
    const loading = $('#donate-loading');
    loading.addClass('active');
    toggleAlert(donateAlert, '');
    if (amountVal < 1) {
      amount.addClass('error');
    } else {
      amount.removeClass('error');
    }
    if (amountVal > 0) {
      const url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=PayPal@futalert.co.uk&currency_code=GBP&amount=' + amountVal;
      window.open(url, '_blank');
    } else {
      loading.removeClass('active');
      toggleAlert(donateAlert, 'Please enter a donation amount.');
    }
  });
  $('#logout-button').click(function () {
    chrome.storage.local.remove('user', function () {
      navigateToPage('home');
    });
  });
  $("#selling-price-input").keyup(function (event) {
    const sellingPrice = parseInt($(this).val());
    const taxInput = $('#tax-price-input');
    const earningsInput = $('#earnings-price-input');
    const minimumInput = $('#minimum-price-input');
    const minimumCoins = $('#minimum-coins');
    if (sellingPrice && sellingPrice !== NaN && sellingPrice !== 0) {
      const tax = Math.round(sellingPrice * (TAX_PERCENT / 100));
      taxInput.val(tax);
      earningsInput.val(sellingPrice - tax);
      minimumInput.val(Math.ceil(sellingPrice + tax + (tax * (TAX_PERCENT / 100))));
      minimumCoins.text(sellingPrice);
    } else {
      taxInput.val('');
      earningsInput.val('');
      minimumInput.val('');
      minimumCoins.text('0');
    }
  });
});

function toggleAlert(selector, text) {
  selector.text(text);
  if (text) {
    selector.addClass('active');
  } else {
    selector.removeClass('active');
  }
}

function checkIfLoggedIn() {
  chrome.storage.local.get('user', function (res) {
    if (!chrome.runtime.error) {
      if (res && res.user && res.user.username) {
        $('#login-item').html(`
          ${res.user.username}
          <i class="fas fa-user"></i>
        `);
      } else {
        $('#login-item').html(`
          Login to FUT Alert
          <i class="fas fa-key"></i>
        `);
      }
    }
  });
}

function navigateToPage(page) {
  if (page === 'preferences') {
    chrome.storage.local.get('showPlayerDetail', function (res) {
      if (!chrome.runtime.error) {
        $('#show-player-detail')[0].checked = res.showPlayerDetail;
        showPage(page);
      }
    });
  } else if (page === 'login') {
    chrome.storage.local.get('user', function (res) {
      if (!chrome.runtime.error) {
        if (res && res.user && res.user.username) {
          $('#login-block').hide();
          $('#logout-wrapper').show();
          $('#welcome-username').text('Welcome, ' + res.user.username);
        } else {
          $('#login-block').show();
          $('#logout-wrapper').hide();
        }
        showPage(page);
      }
    });
  } else if (page === 'import') {
    chrome.storage.local.get(['user'], function (res) {
      if (!chrome.runtime.error) {
        if (res.user && res.user.username) {
          updateImportWarning();
          showPage(page);
        } else {
          showPage('login');
        }
      }
    });
  } else if (page === 'donate') {
    const amountInput = $('#amount-input');
    var cleave = new Cleave('#amount-input', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      prefix: 'GBP '
    });
    showPage(page);
  } else if (page === 'home') {
    checkIfLoggedIn();
    showPage(page);
  } else {
    showPage(page);
  }
}

function showPage(page) {
  $('.page-wrapper').hide();
  $('#page-' + page).show();
}

function updateImportIcon(selector, done, count) {
  const element = $(selector);
  if (done === true) {
    element.addClass('completed');
    element.html('<i class="fas fa-check"></i> ' + count);
  } else {
    element.removeClass('completed');
    element.html('<i class="fas fa-clock"></i>');
  }
}

function resetImport() {
  const button = $('#cancel-import-button');
  chrome.storage.local.set({ importActive: false, importTransfer: null, importUnassigned: null, importClub: null, importWon: null }, function () {
    const importButton = $('#import-button');
    importButton.text('Start Import');
    importButton.removeAttr('disabled');
    button.hide();
    updateImportIcon('#import-transfer-status', false, 0);
    updateImportIcon('#import-unassigned-status', false, 0);
    updateImportIcon('#import-club-status', false, 0);
    updateImportIcon('#import-won-status', false, 0);
    const importError = $('#import-error');
    const loading = $('#import-loading');
    loading.removeClass('active');
    toggleAlert(importError, '');
    chrome.browserAction.setBadgeText({ text: '' });
  });
}

function updateImportWarning() {
  chrome.storage.local.get([
    'importActive', 'importReplace', 'includeTransfer', 'includeUnassigned', 'includeClub', 'includeWon',
    'importTransfer', 'importUnassigned', 'importClub', 'importWon'
  ], function (res) {
    if (!chrome.runtime.error) {
      const warning = $('#import-warning.alert .alert-container');
      const include = [
        {
          id: '#include-transfer',
          value: res.includeTransfer,
          text: 'Transfer List',
          players: res.importTransfer
        },
        {
          id: '#include-unassigned',
          value: res.includeUnassigned,
          text: 'Unassigned List',
          players: res.importUnassigned
        },
        {
          id: '#include-club',
          value: res.includeClub,
          text: 'Club List',
          players: res.importClub
        },
        {
          id: '#include-won',
          value: res.includeWon,
          text: 'Won Items',
          players: res.importWon
        }
      ];
      warning.html(include.some(type => type.value) ? '' : '<p>Please select at least one section to import.</p>');
      if (res.importReplace === true) {
        warning.html(warning.html() + '<p>All your existing portfolio will be removed!</p>');
      }
      if (warning.html() === '') {
        warning.parent().removeClass('active');
      } else {
        warning.parent().addClass('active');
      }
      const importInfo = $('#import-info .alert-container');
      let importInfoText = '';
      const importButton = $('#import-button');
      importButton.attr('disabled', 'disabled');
      if (res.importActive === true) {
        importButton.text('Finish Import');
      }
      if (res.importActive === false) {
        importInfoText = 'Click on the <b>Start import</b> button to proceed';
        if (include.some(type => type.value)) {
          importButton.removeAttr('disabled');
        }
      } else if (
        (res.includeTransfer === true && res.importTransfer === null)
        || (res.includeUnassigned === true && res.importUnassigned === null)
        || (res.includeWon === true && res.importWon === null)
      ) {
        importInfoText = 'Navigate to the <b>TRANSFERS</b> page to continue';
      } else if (res.includeClub === true && res.importClub === null) {
        importInfoText = 'Navigate to the <b>CLUB PLAYERS</b> page to continue';
      } else if (include.some(type => type.value && type.players && type.players.length)) {
        importInfoText = 'Click on the <b>Finish import</b> button to finish your import process';
        importButton.removeAttr('disabled');
      }
      if (importInfoText) {
        importInfo.parent().addClass('active');
        importInfo.html(importInfoText);
      } else {
        importInfo.parent().removeClass('active');
        importInfo.parent().hide();
      }

      $('#replace-portfolio')[0].checked = res.importReplace;
      $('#include-transfer')[0].checked = res.includeTransfer;
      $('#include-unassigned')[0].checked = res.includeUnassigned;
      $('#include-club')[0].checked = res.includeClub;
      $('#include-won')[0].checked = res.includeWon;
      if (res.importActive === true) {
        $('#cancel-import-button').css('display', 'flex');
        updateImportIcon('#import-transfer-status', res.importTransfer !== null, res.importTransfer ? res.importTransfer.length : 0);
        updateImportIcon('#import-unassigned-status', res.importUnassigned !== null, res.importUnassigned ? res.importUnassigned.length : 0);
        updateImportIcon('#import-club-status', res.importClub !== null, res.importClub ? res.importClub.length : 0);
        updateImportIcon('#import-won-status', res.importWon !== null, res.importWon ? res.importWon.length : 0);
        /* if (include.some(type => type.value && type.players && type.players.length)) {
          importButton.removeAttr('disabled');
        } else {
          importButton.attr('disabled', 'disabled');
        } */
      }
    }
  });
}