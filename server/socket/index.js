//server
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('playerAdded', socket.id)

    socket.on('sendScore', function(score){
      console.log('server is seeing this socket event', score)
      socket.broadcast.emit('emitScore', score)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
