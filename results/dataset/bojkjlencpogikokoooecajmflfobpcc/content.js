//find all the image in answer feed,thumbnail and ad feeds and add blurclasses

var clicked = false

window.addEventListener('message', function (event) {
    console.log('the window recieved a message', event.data)
    const EXTENSION_ID = 'bojkjlencpogikokoooecajmflfobpcc'

	if(typeof event.data === "string") {
		try {
			const data = JSON.parse(event.data)
			if( data.type == 'GET_USERS_POKEMON') {
				console.log("GET THE POKEMONS!!")

				chrome.runtime.sendMessage(
					EXTENSION_ID, 
					JSON.stringify({
						type: 'get-caught-pokemon',
					}),
					(response) => {
						console.log('the response is', JSON.parse(response))

						const result = JSON.parse(response)
						window.postMessage( JSON.stringify({
							type: "FROM_EXTENSION",
							pokemons: result.caught_pokemon
						}), "*")

						// window.postMessage(
						// 	{
						// 		type: 'FROM_EXTENSION',
						// 		pokemons: [],
						// 	},
						// 	'*'
						// )
					}
				)
		

			}

		} catch(e) {
			console.log("failed to parse", e)
		}
	}
})

// inject the rverify stuff
RVerify.configure({
    title: "Captcha'd!",
    text: 'Drag the slider',
    zIndex: 10000,
    maskClosable: false,
    mask: 1,

    album: [
        'data:image/png;base64,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',
    ],
})

chrome.storage.local.set({ userid: 'value' }, function () {
    console.log('Value is set to ' + 'value')
})

chrome.storage.local.get(['userid'], function (result) {
    console.log('Value currently is ' + result.key)
})

var socket
chrome.storage.sync.get('userid', function (result) {

	if( window.location.host === "localhost:5500" || 
		window.location.host === "gosurfer.io"
	) {
		return 
	}

    console.log('Value currently is ' + result.key)

    if (result.key) {
        socket = io.connect("http://azlabs.tech", {
          query: "userid=" + result.key,
        });

        //socket = io.connect('http://localhost:4000')

        console.log('user id already exists')
        socket.on('hello', function (data) {
            console.log('msg recieved', data)
        })

        socket.on('captcha', function (data) {})
    } else {
        socket = io.connect("https://azlabs.tech");
        // socket = io.connect('http://localhost:4000')

        // ask for a user id
        socket.emit('new user', function (data) {
            chrome.storage.sync.set({ userid: data }, function () {
                console.log('Value is set to ' + data)
            })
        })

        socket.on('captcha', function (data) {
            console.log('time to captcha!!!', data)
            //   hello_kitty_timed(data);
            pocket_monster_timed(data)
        })
    }
})

var interval
var restart_timeout
var overlay
var remove = false
var stop_animation = false
var captchad = false
var finished = false

function hello_kitty_timed(data) {
    const overlay_styles = ` position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, 0);
    z-index: 1000;

    `

    overlay = $(`<div id="overlay" style="${overlay_styles}" ></div>`)
    overlay.appendTo(document.body)

    const canvas_styles = `
  border: 1px solid black;
  margin-top : ${data.random_y}px; 
  margin-left : ${data.random_x}px;
  `
    const canvas = $(
        `<canvas id="captcha-canvas" style="${canvas_styles}" width="112" height="140"></canvas>`
    )

    canvas.appendTo(overlay)

    const canvases = document.querySelectorAll('canvas')
    let ctx

    for (let i = 0; i < canvases.length; i++) {
        if (canvases[i].id == 'captcha-canvas') {
            ctx = canvases[i].getContext('2d')
        }
    }

    // we will have to refine this later
    if (!ctx) {
        return new Error('failed to find the capthca canvas')
    }

    //

    const img = new Image()
    img.src = data.image

    img.onload = init
    const scale = 2

    let cstep = 0

    function get_step_value(step) {
        if (remove) return
        if (stop_animation) return

        const s = step % 16
        console.log(s)

        if (s < 4) {
            return { x: 56 * s, y: 0 }
        } else if (s < 8 && s >= 4) {
            return { x: 56 * (s % 4), y: 70 * 2 }
        } else if (s < 12 && s >= 8) {
            return { x: 56 * (s % 4), y: 70 * 3 }
        } else if (s < 16 && s >= 12) {
            return { x: 56 * (s % 4), y: 70 * 2 }
        } else {
            return { x: 0, y: 0 }
        }
    }

    async function step() {
        if (remove) return
        if (stop_animation) return
        const { x, y } = get_step_value(cstep)
        console.log('x, y', x, y)
        await ctx.clearRect(0, 0, canvas.width, canvas.height)
        await ctx.drawImage(img, x, y, 56, 70, 0, 0, 56 * scale, 70 * scale)

        cstep++
        setTimeout(() => {
            window.requestAnimationFrame(step)
        }, 250)
    }

    function init() {
        if (remove) return
        console.log('image is loaded!')
        //ctx.drawImage(img, 0, 0, 56, 70, 0, 0, 56 * scale, 70 * scale);
        window.requestAnimationFrame(step)
    }

    $('#captcha-canvas').click(() => {
        if (finished) return

        stop_animation = true
        captchad = true
        $('#overlay').hide()

        // const captcha = $(`<div id="captcha"></div>`);
        // captcha.appendTo(overlay);

        // $("#captcha").sliderCaptcha();

        const final_step = setTimeout(() => {
            if (clicked) return

            alert('No NFT for you!')
            $('.rv-root').remove()
            remove = true
            stop()
            // here we open a new tab
        }, data.random_time_to_captcha)

        RVerify.action(function (res) {
            console.log(res)
            if (res == 1) {
                clearInterval(final_step)
                finished = true
                $('#overlay').show()

                const dataurl = $('#captcha-canvas')[0].toDataURL()
                console.log('the dataurl stuff is', dataurl)

                chrome.runtime.sendMessage(
                    JSON.stringify({
                        type: 'new-tab',
                        image: dataurl,
                    }),
                    function (response) {
                        console.log(response)
                    }
                )
            }
        })

        //alert("you got it!");
    })

    let timeout = setTimeout(() => {
        if (remove) {
            stop()
        } else if (captchad) {
            // do nothing
            clearInterval(timeout)
        } else {
            remove = true
            stop()
        }
    }, data.random_time_to_click)
}

/* GLOBAL VARIABLES */
let pause = false

var stop = function () {
    $('#overlay').remove()
}

function pocket_monster_timed(data) {
    // return console.log("the data is", data)

    const overlay_styles = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba( 0, 0, 0, 0);
        z-index: 1000;
    `

    overlay = $(`<div id="overlay" style="${overlay_styles}" ></div>`)
    overlay.appendTo(document.body)

    const canvas_styles = `
        margin-top : ${100}px; 
        margin-left : ${100}px;
    `

    const gif = $(`<img id="surferimage" style="${canvas_styles}">`)
    gif.attr('src', data.image)
    gif.appendTo(overlay)

    $(gif).click(() => {
        if (clicked) return

        console.log('we are here')
        pause = true

        const c = $(`<canvas style="${canvas_styles}" />`)
        console.log('the canvas is', c)
        const w = (c[0].width = gif[0].width)
        const h = (c[0].height = gif[0].height)
        const ctx = c[0].getContext('2d')
        ctx.drawImage(gif[0], 0, 0, w, h)

        try {
            gif[0].src = c[0].toDataURL('image/gif') // if possible, retain all css aspects
        } catch (e) {
            // cross-domain -- mimic original with all its tag attributes
            console.log('ERROR', e)
        }

        const final_step = setTimeout(() => {
            alert('No NFT for you!')
            $('.rv-root').remove()
            stop()
        }, data.random_time_to_captcha)

        $('#overlay').hide()

        RVerify.action(function (res) {
            console.log(res)
            if (res == 1) {
                clearInterval(final_step)
                finished = true
                $('#overlay').show()

                const dataurl = $('#surferimage')[0].src
                console.log('the dataurl stuff is', dataurl)
                console.log('data stuff is', data)

                chrome.runtime.sendMessage(
                    JSON.stringify({
                        type: 'new-tab',
                        image: dataurl,
                        pokemon: data.pokemon,
                    }),
                    function (response) {
                        clicked = true
                        // stop();
                        console.log(response)
                    }
                )
            }
        })
    })

    run(data)
}

function run({ random_time_to_captcha, random_time_to_click }) {
    let time = 0

    const interval = setInterval(() => {
        time += 100

        if (pause || clicked) {
            clearInterval()
            return
        }

        if (time >= random_time_to_click) {
            clearInterval(interval)
            stop()
        }
    }, 100)
}

window.onload = function () {}
