/// server sent events

const app = require('express')()
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => res.status(200).send('Hello World'))

app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    // server responds with a special header to tell the client that it is an event stream
    // anything sent after that will be interpreted as an stream
    res.setHeader('Cache-Control', 'no-cache');         // Prevent caching
    res.setHeader('Connection', 'keep-alive');          // Keep connection open
    res.flushHeaders();                                 // Send headers immediately
    send(res)
})

let i = 0;

const send = (res) => {
    // this is the syntax you must add "data:" at the start
    res.write(`data: hello from server here ----- ${i++}\n\n`)
    setTimeout(() => send(res), 1000)
}

app.get('/multipleStreams', (req, res) => {
    console.log('multiple stream [][][][][]')
    res.setHeader('Content-Type', 'text/event-stream')
    // server responds with a special header to tell the client that it is an event stream
    // anything sent after that will be interpreted as an stream
    res.setHeader('Cache-Control', 'no-cache');         // Prevent caching
    res.setHeader('Connection', 'keep-alive');          // Keep connection open
    res.flushHeaders();                                 // Send headers immediately
    sendMultipleEvents(res)
})

let j = 0;
let k = 0;

const sendMultipleEvents = (res) => {
    res.write(`event: event1\ndata: message for event1 jjj - ${j++}\n\n`);
    res.write(`event: event2\ndata: message for event2 kkk - ${k++}\n\n`);
    setTimeout(() => sendMultipleEvents(res), 1000);
}

app.listen(8080, () => {
    console.log('Server is listening on port here 8080')
})