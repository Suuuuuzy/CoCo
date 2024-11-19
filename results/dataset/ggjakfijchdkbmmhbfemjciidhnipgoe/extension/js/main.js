import { config } from '../../config.js';

window.addEventListener('load', function () {
    const body = document.querySelector('body');
    const defaultSearchEngineToggle = document.getElementById('default-engine-select');
    const privateSearchEngineToggle = document.getElementById('private-engine-select');
    const learnMoreButton = document.getElementById('learn-more-btn');

    chrome.runtime.sendMessage({message: 'getDefaultSearchEngines'}, response => {
        const defaultSearchEngine = response.defaultSearch;
        const privateEngine = response.privateEngine;

        if (defaultSearchEngine) {
            document.getElementById('default-engine-select').value = defaultSearchEngine;
        }

        if (privateEngine) {
            document.getElementById('private-engine-select').value = privateEngine;
        }

        new NativejsSelect({
            selector: '#default-engine-select',
        });

        new NativejsSelect({
            selector: '#private-engine-select',
        });
    });

    body.onclick = function (e) {
       const target1 = document.getElementById("settings-popup");
       const target2 = document.getElementById('settings-popup-button');

       let flag = event.path.some(function(el, i, arr) {
            return (el === target1 || el === target2)
        })

        if (!flag && hasClass(body, 'active-settings-popup')) {
            body.classList.toggle('active-settings-popup');
        }
    }

    document.querySelector('[data-ui="settings-button"]').onclick = function () {
        body.classList.toggle('active-settings-popup');
    }

    updateUiSelects();

    defaultSearchEngineToggle.onchange = function (e) {
        chrome.runtime.sendMessage({message: 'setDefaultSearchEngine', engine: e.target.value});
        showSuccessMessage();
        updateUiSelects();
    }

    privateSearchEngineToggle.onchange = function (e) {
        chrome.runtime.sendMessage({message: 'setPrivateSearchEngine', engine: e.target.value});
        showSuccessMessage();
        updateUiSelects();
    }

    function updateUiSelects() {
        setTimeout(() => {
            document.querySelectorAll('.custom-select').forEach(function (selectItem) {
                const optionsObjectConfig = {};
                selectItem.querySelectorAll('option').forEach(function (option, index) {
                    optionsObjectConfig[index] = option.getAttribute('data-icon');
                })

                selectItem.nextElementSibling.querySelectorAll('ul li').forEach(function (listItem, index) {
                    if (listItem.getAttribute('data-selected')) {
                        selectItem.nextElementSibling.querySelector('.nativejs-select__placeholder').style.backgroundImage = `url(img/logos/${optionsObjectConfig[index]})`;
                    }
                    listItem.querySelector('button').style.backgroundImage = `url(img/logos/${optionsObjectConfig[index]})`;
                });
            })
        }, 100);
    }

    learnMoreButton.onclick = function () {
        window.open(config.goRedirectionWebsite);
    }

    document.getElementById('footer-links').onclick = function (e) {
        const path = e.target.id;

        if (path !== 'footer-links') {
            window.open(`https://www.${config.domain}/wim/${path}`);
        }
    }

    function hasClass(element, cls) {
        return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';
        setTimeout(function(){
            successMessage.style.display = 'none';
        }, 1500)
    }
});
