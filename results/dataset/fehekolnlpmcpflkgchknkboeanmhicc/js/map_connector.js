document.addEventListener('gtkAskAddonShowInGame', function(event) {
    chrome.runtime.sendMessage({data: event.detail}, function(response) {
        if (!response.success) {
            alert(response.message);
        } else if (!response.doesUpdateTab) {
            alert('La carte a bien été centrée en jeu');
        }
    });
});