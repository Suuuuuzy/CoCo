chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	console.log("the sender is", sender)


    const title = document.getElementById('randomnumber')
    const random = Math.floor((Math.random() * 100)) % 100
    title.innerHTML = `${random} of 100`

    console.log('REQUEST RECIEVED IN HOME.JS', request, sender)

    const data = JSON.parse(request)

    console.log('the data that was sent is', data, sender)

    var i = new Image()

    i.onload = function () {
        var canvasContainer = document.getElementById('canvas-container')

        var canvas = document.createElement('CANVAS')
        canvas.id = 'captcha-canvas'
        canvas.width = i.width
        canvas.height = i.height
        var ctx = canvas.getContext('2d')
        canvasContainer.append(canvas)
        ctx.drawImage(i, 0, 0) // Or at whatever offset you like
    }
    i.src = data.image

    function getUrlVars() {
        var vars = [],
            hash
        var hashes = window.location.href
            .slice(window.location.href.indexOf('?') + 1)
            .split('&')
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=')
            vars.push(hash[0])
            vars[hash[0]] = hash[1]
        }
        return vars
    }

    const urlParams = new URLSearchParams(window.location.search)

    const btn = document.getElementById('mint-btn')
    // console.log('btn is', btn)
    btn.addEventListener('click', (event) => {
        // tell background.js to mark pokemon as caught
        chrome.runtime.sendMessage(
            JSON.stringify({
                type: 'set-caught-pokemon',
                pokemon: urlParams.get('pokemon'),
            }),
            function (response) {
                // after seting the one pokemon that was caught
                // fetch all the pokemons that were caught
                console.log(
                    'we get a response from backgorund.js in home.js!',
                    response
                )
                chrome.runtime.sendMessage(
                    JSON.stringify({
                        type: 'get-caught-pokemon',
                    }),
                    function (res) {
                        const data = JSON.parse(res)
                        console.log(
                            'the caught pokemon are',
                            data.caught_pokemon
                        )
						window.open(`http://gosurfer.io`);
                    }
                )
            }
        )
        // // send to appropriate landing page and pass dict information
        // var landing_page = window.open(`http://gosurfer.io/${ urlParams.get("pokemon") }`);
        // landing_page.pokemon_dict = pokemon_dict;
    })

	const req = JSON.parse(request)
	if(req.type === 'get-caught-pokemon') {
		chrome.storage.local.get(null, function (items) {
			return sendResponse(JSON.stringify(items))
		})
	} else {
		return sendResponse(JSON.stringify({ home: 'is initialized!' , sender, request}))

	}
	

})
