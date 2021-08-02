const express = require('express')
const port = process.env.PORT || 3333
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

/*
 *  /dist/index.html
 */
app.use(express.static(__dirname + '/dist'))
app.get(/.*/, (req, res) => {
	res.sendFile(__dirname + '/dist/index.html')
})

http.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

/*
 *  Armazene clientes conectados etc.
 *  Não use em produção 🤪
 */
var clients = []
var counter = 0

io.on('connection', (socket) => {
	/*
	 *  ✨ Lidar com novo cliente conectado
	 */
	console.log(`Client ${socket.id} connected to the server.`)

	// Empurre o novo socket conectado para socketList
	clients.push({ id: socket.id })

	// Emita a lista de clientes atualizada para *TODOS* os clientes conectados.
	io.emit('update_clients', clients)

	// Emita o contador atual * SOMENTE * para o novo cliente conectado.
	// Consulte https://socket.io/docs/emit-cheatsheet/ para a diferença
	// de `io.emit` e` socket.emit`
	socket.emit('update_counter', counter)

	/*
	 *  👂 Ouça os eventos de soquete emitidos por componentes vue
	 */

	// Ouça o evento increment_counter, disparado por `increment ()` em 'Counter.vue'
	socket.on('increment_counter', () => {
		counter += 1
		io.emit('update_counter', counter)
	})

	// Ouça o evento de desconexão. 'disconnecting' é um evento reservado,
	// consulte novamente https://socket.io/docs/emit-cheatsheet/
	socket.on('disconnecting', () => {
		// Remova o cliente desconectado da lista de clientes
		clients = clients.filter((client) => {
			return client.id != socket.id
		})
		// Emita a lista de clientes atualizada para todos os clientes conectados *EXCETO* para o remetente.
		socket.broadcast.emit('update_clients', clients)
		console.log(`Client ${socket.id} disconnected from the server.`)
	})
})
