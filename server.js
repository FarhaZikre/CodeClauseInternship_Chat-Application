// import the express
const express = require('express')
const app = express()   // app is our express 
const http = require('http').createServer(app)   // http module
// pass express to http usnig method createServer

const PORT = process.env.PORT || 3000   // app will be run on this port

http.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})

//to know server about other links of file => this created when i did not see CSS in webpage
app.use(express.static(__dirname + '/public'))  // using express middleware

//creating route - if anyone go to path / will get index.html file content
app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.html')
})   


//socket importing
const io = require('socket.io')(http) 
// using this http socket server knows that it works on which server 


io.on('connection', (socket) =>{   //if any client or browser connect then this function gets called
    console.log('CONNECTED...')

    //listen the event which will emit on client side
    socket.on('message',(msg) => {
        // console.log(msg)

        // broadcast = send msg to all connected clients but do not send to client who sends msg
        socket.broadcast.emit('message',msg)
    })
 })  