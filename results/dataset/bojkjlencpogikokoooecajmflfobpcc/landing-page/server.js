let express = require('express')
let app = express()
let path = require('path')
let PORT = 5500
app.use(express.static( path.resolve( __dirname ) ))

app.get('/', (req, res) => {
    res.sendFile( path.resolve( __dirname + '/index.html') )
})

app.listen( PORT, () => {
    console.log("Port running on", PORT)
})