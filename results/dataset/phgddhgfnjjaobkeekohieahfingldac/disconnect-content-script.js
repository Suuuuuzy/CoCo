//console.log('executing disconnect content script');

var fdDisconnect = new CustomEvent('fdWebExtension.fdDisconnect');
document.dispatchEvent(fdDisconnect);
