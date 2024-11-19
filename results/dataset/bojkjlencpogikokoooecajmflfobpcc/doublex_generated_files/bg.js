// original file:/media/data2/jianjia/extension_data/unzipped_extensions/bojkjlencpogikokoooecajmflfobpcc/background.js

const EXTENSION_ID = 'bojkjlencpogikokoooecajmflfobpcc'

function uuidv4() {
    return '00-0-4-1-000'.replace(/[^-]/g, (s) =>
        (((Math.random() + ~~s) * 0x10000) >> s).toString(16).padStart(4, '0')
    )
}

const LOGIN_URL = 'https://azlabs.tech/login?'
const SET_POKEMON_URL = 'http://azlabs.tech/pokemon?'

chrome.runtime.onInstalled.addListener(function () {
    const uuid = uuidv4()

    chrome.storage.local.set(
        {
            uuid: uuid,
            hide: true,
            caught_pokemon: [],
        },
        function () {
            fetch(
                LOGIN_URL +
                    new URLSearchParams({
                        uuid: uuid,
                    }),
                {
                    method: 'GET',
                }
            )

            console.log('captcha is initalized!')
        }
    )
})

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
        {
            conditions: [new chrome.declarativeContent.PageStateMatcher()],
            actions: [new chrome.declarativeContent.ShowPageAction()],
        },
    ])
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    const data = JSON.parse(request)
	console.log("REQUEST TYPE IS", data.type)
	switch (data.type) {
        case 'new-tab':
            chrome.tabs.create(
                {
                    url: `chrome-extension://${EXTENSION_ID}/home.html?pokemon=${data.pokemon}`,
                    active: true,
                },
                (tab) => {
                    console.log('new tab created', tab)

                    chrome.tabs.query({ active: true }, function (tabs) {
                        tabs.map((t) => {
                            console.log('iterable tab', t)
                            if (t.id === tab.id) {
                                setTimeout(() => {
                                    chrome.tabs.sendMessage(
                                        tab.id,
                                        request,
                                        function (response) {
                                            console.log(
                                                'background.js response is',
                                                response
                                            )
                                        }
                                    )
                                }, 250)
                            }
                        })
                    })
                }
            )
            sendResponse('created tab - done')
            break

        case 'new-userid':
            chrome.storage.sync.set({ userid: data.userid }, function () {
                sendResponse(
                    JSON.stringify({
                        done: true,
                    })
                )
            })

            break

        case 'get-userid':
            chrome.storage.sync.get(['userid'], function (result) {
                if (!chrome.runtime.error) {
                    console.log('Value currently is ' + result)
                    sendResponse(
                        JSON.stringify({
                            userid: result.key,
                        })
                    )
                } else {
                    sendResponse(
                        JSON.stringify({
                            error: true,
                        })
                    )
                }
            })
            break

        case 'get-caught-pokemon':
			console.log("RESPONDING NOW")
            chrome.storage.local.get(null, function (items) {
                sendResponse(JSON.stringify(items))
            })
            break
        case 'set-caught-pokemon':
            // event that is triggered by capturing of a pokemon
            // want to set that pokemon object to "True"
            chrome.storage.local.get(null, function (items) {
                var allKeys = Object.keys(items)
                console.log(allKeys, items, data.pokemon)

                // if the pokemon doesn't exist in the storage, save it!
                items.caught_pokemon.indexOf(data.pokemon) === -1
                    ? items.caught_pokemon.push(data.pokemon)
                    : null

                sendResponse(JSON.stringify(items.caught_pokemon))

                chrome.storage.local.set(items, function () {
                    console.log('saved the pokemon', items)
                    fetch(
                        SET_POKEMON_URL +
                            new URLSearchParams({
                                pokemon: items.caught_pokemon,
                                uuid: items.uuid,
                            }),
                        {
                            method: 'GET',
                        }
                    )
                        .then((res) => {
                            console.log(
                                'response from fetch comes back',
                                res.status
                            )
                        })
                        .catch((e) => {
                            console.log('the error is', e)
                        })
                })
            })

            break
        default:
            sendResponse(
                JSON.stringify({
                    error: true,
                })
            )
    }

    return true
})

