// Ajout d'un listener click sur les liens du menu
var links = document.querySelectorAll('#links-container a');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', buildUrl);
}

/**
 * Ouvre une page du site en récupérant le nom du monde.
 * Vérifie si la page courante est le jeu.
 * Sinon, regarde si le jeu ne se trouve pas dans un autre onglet.
 * Si le jeu n'est pas ouvert, ALPHA est utilisé.
 *
 * @param e évènement du clic sur un lien du menu popup
 */
function buildUrl(e) {
    e.preventDefault();
    var href = this.getAttribute('href');
    var worldName = '';

    // Vérifie si l'onglet actif est le jeu
    chrome.tabs.query({active: true}, function (tabsActive) {
        if (tabsActive[0].url.indexOf('.grepolis.com') > 0) {
            openPage(tabsActive[0].url, href);
        } else {
            // Si ce n'est pas le cas, on regarde si une page du jeu est ouverte
            chrome.tabs.query({url: 'https://*.grepolis.com/*'}, function (tabsGame) {
                if (tabsGame !== undefined && tabsGame.length > 0) {
                    openPage(tabsGame[0].url, href);
                } else {
                    openPage(null, href);
                }
            });
        }
    });
};

/**
 * Récupère le cookie contenant le nom du monde et ouvre la page
 *
 * @param url lien de la page du jeu
 * @param href chemin de la page à ouvrir
 */
function openPage(url, href) {
    var domain = 'https://fr.grepolistoolkit.com';
    var worldName = '';

    // Si le jeu n'est pas ouvert
    if (url == null) {
        openTab(domain, 'ALPHA', href);
    } else {
        // Recherche le cookie contenant le nom du monde
        chrome.cookies.get({url: url, name: 'gtk_world_name'}, function (cookie) {
            if (cookie === undefined) {
                worldName = 'ALPHA';
            } else {
                worldName = cookie.value;
            }

            openTab(domain, worldName, href);
        });
    }
}

/**
 * Ouvre une page dans un nouvelle onglet
 *
 * @param domain domaine de la page à ouvrir
 * @param worldName nom du monde
 * @param href chemin du lien après le nom du monde
 */
function openTab(domain, worldName, href) {
    if (href.charAt(0) == '/') {
        var url = domain + href;
    } else {
        var url = domain + '/' + worldName + '/' + href;
    }
    chrome.tabs.create({ url: url });
}