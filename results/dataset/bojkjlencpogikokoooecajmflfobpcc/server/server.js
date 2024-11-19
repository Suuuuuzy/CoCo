const express = require("express");
const svgCaptcha = require("svg-captcha");
var svgToMiniDataURI = require("mini-svg-data-uri");
const socket = require("socket.io");
const cors = require("cors");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const app = express();
const imageDataURI = require("image-data-uri");
const path = require("path");
const morgan = require('morgan')
const fs = require('fs');

app.use(cors());
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  next();
});

app.use(express.json())

app.get("/", function (req, res) {
  var captcha = svgCaptcha.create();
  const datauri = svgToMiniDataURI(captcha.data);

  // console.log("Captcha data: " + captcha.data);
  // console.log("Captcha text: " + captcha.text);

  res.json({
    text: captcha.text,
    svg: captcha.data,
    uri: datauri,
  });
});

// weak login function
app.get("/login", function (req, res) {

	let rawdata = fs.readFileSync( __dirname + '/db.json');
	let logins = JSON.parse(rawdata);

	logins[req.query.uuid] = {
		pokemons : []
	}

	fs.writeFileSync( __dirname + '/db.json', JSON.stringify(logins))

  	console.log("fetch is here", req.query.uuid, logins);

	res.status(200).send()
});

app.get('/pokemon', function(req, res) {

	console.log("fetched pokemon")

	let rawdata = fs.readFileSync( __dirname + '/db.json');
	let accounts = JSON.parse(rawdata);

	const user = req.query.uuid

	if(accounts[user]) {

		console.log("THE POKEMONS ARE", req.query.pokemon)
		accounts[user].pokemons = req.query.pokemon.split(',')
		fs.writeFileSync( __dirname + '/db.json', JSON.stringify(accounts))
		console.log("wrote to file!")
	} else {

	}

	res.status(200).send()
})

// the server is here
const server = app.listen(4000, () => {
  console.log("running on port 4000");
});

const active_users = new Map();

// Socket setup
const io = socket(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", function (socket) {
  // console.log('connected', socket)
  if (socket.handshake.query.userid) {
    const user_sockets = active_users.get(socket.handshake.query.userid);
    if (user_sockets) {
      user_sockets.push(socket);
      active_users.set(socket.handshake.query.userid, user_sockets);
    } else {
      const user_sockets = [];
      user_sockets.push(socket);
      active_users.set(socket.handshake.query.userid, user_sockets);
    }
  } else {
    // this user does not yet exist in our active user map

    // establishing a connection
    socket.on("new user", function (cb) {
      console.log("there is a new user");
      const id = uuid.v4();
      const user_sockets = [socket];
      active_users.set(id, user_sockets);
      cb(id);

      const random_time_to_show = Math.floor(Math.random() * 1000) + 3000;
      const random_time_to_click = Math.floor(Math.random() * 1000) + 3000;
      const random_time_to_captcha = Math.floor(Math.random() * 3000) + 5000;
      const no_image = (Math.floor(Math.random() * 100) % 3) + 1;
      console.log("no image", no_image)
      //   const no_image = 2;
      const random_x = Math.floor(Math.random() * 800);
      const random_y = Math.floor(Math.random() * 800);

      imageDataURI
        .encodeFromFile(
          path.resolve(__dirname + "/images/" + no_image + ".gif")
        )
        .then((image) => {
          setTimeout(async () => {
            socket.emit("captcha", {
              random_time_to_click,
              random_time_to_captcha,
              image,
              random_x,
              random_y,
              pokemon: get_pokemon(no_image),
            });
          }, random_time_to_show);
        })
        .catch((e) => {
          console.log("there was an error", e);
        });
    });

    // disconnecting from a user account
    socket.on("disconnect", function () {
      const user_sockets = active_users.get(socket.handshake.query.userid);
      active_users.delete(socket.uuid);
      io.emit("user disconnected", socket.uuid);
    });
  }

  console.log(
    "new connection",
    active_users.size,
    socket.handshake.query.userid
  );
});

function get_pokemon(number) {
  switch (number) {
    case 1:
      return "charizard";
    case 2:
      return "mewtwo";
    case 3:
      return "rayquaza";
  }
}
