const ws = require('ws')
const colors = require('colors')

const wss = new ws.Server(
  {
    port: 5000,
  },
  () => console.log(`Server started on 5000`.blue)
)

wss.on('connection', function connection(ws) {
  ws.on('message', (message) => {
    message = JSON.parse(message)
    switch (message.event) {
      case 'message':
        broadcastMessage(message)
        break
      case 'connection':
        broadcastMessage(message)
        break
    }
  })
})

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message))
  })
}
