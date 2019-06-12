const fs = require('fs');

let createdRooms = {};
let roomsCreated = 0;

if (process.env.NODE_ENV !== 'production') require('../../secrets')

class Player {
  constructor(name, id, creator) {
      this.id = id
      this.name = name
      this.creator = creator
      this.score = 0
  }

  updateScore(score) {
    this.score += score
  }
}

module.exports = io => {
    io.on('connection', socket => {
      console.log(socket.id, ' has made a persistent connection to the server!');
      socket.on('create-room', (name, id) => {
        roomsCreated++;
        const newRoom = `room-${roomsCreated}`;
        const player = new Player(name, id, true)
        console.log('player', player)
        socket.join(newRoom);
        socket.emit('joined-room', {room: newRoom, playerOne: player})
      });

      socket.on('join-room', (roomid, name, id) => {
        const player = new Player(name, id, false)
        socket.join(roomid);
        socket.broadcast.to(roomid).emit('new-player', player)
        socket.emit('joined-room', {room: roomid, playerTwo: player})
      })

      socket.on('startGame', (room, allPlayers, rounds, playerOne, playerTwo) => {
        socket.broadcast.to(room).emit('gameStateChange', 'playing', allPlayers)
        socket.emit('gameStateChange', 'playing', allPlayers)
        createdRooms[room] = {players: allPlayers, rounds: rounds, cardIdx: 1}
        socket.broadcast.to(room).emit('nextPlayer', allPlayers[0], 1)
        socket.emit('nextPlayer', allPlayers[0], 1)
        // socket.broadcast.to(room).emit('all-Players', allPlayers)
        // socket.emit('all-players', allPlayers)
        console.log('allPlayers', allPlayers)
        // socket.emit('bothPlayers', allPlayers[0], allPlayers[1])
      })

      socket.on('nextPlayerTurn', (roomId, curPlayer) => {
        createdRooms[roomId].cardIdx++;
        if (createdRooms[roomId] > 20) createdRooms[roomId] = 1
        const roomPlayers = createdRooms[roomId].players
        let curIdx = roomPlayers.findIndex(player => player.name === curPlayer.name)
        if (curIdx === roomPlayers.length - 1) {
          createdRooms[roomId].rounds--;
          curIdx = -1
        }
        if (createdRooms[roomId].rounds === 0) {
          socket.broadcast.to(roomId).emit('finalScores', createdRooms[roomId].players)
          socket.emit('finalScores', createdRooms[roomId].players)
          socket.broadcast.to(roomId).emit('gameStateChange', 'gameOver')
          socket.emit('gameStateChange', 'gameOver')
        } else {
          socket.broadcast.to(roomId).emit('nextPlayer', roomPlayers[curIdx + 1], createdRooms[roomId].cardIdx)
          socket.emit('nextPlayer', roomPlayers[curIdx + 1], createdRooms[roomId].cardIdx)
        }
      })

      socket.on('submitGuess', (roomId, player, guess) => {
        socket.broadcast.to(roomId).emit('gotGuess', {name: guess, player: player})
        socket.emit('gotGuess', {name: guess, player: player})
      })

      socket.on('correctGuess', (roomId, guess) => {
        let playerIdx = createdRooms[roomId].players.findIndex(player => player.name === guess.player.name)
        createdRooms[roomId].players[playerIdx].score += 10;
        socket.broadcast.to(roomId).emit('guessCorrect', guess)
        socket.emit('guessCorrect', guess)
      })
      socket.on('sendScore', (score) => {
          socket.broadcast.emit('emitScore', score)
        })
      socket.on('sendTwoScore', (score) => {
        socket.broadcast.emit('emitTwoScore', score)
      })
    });
}

