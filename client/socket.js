import io from 'socket.io-client';
import store, {getAllPlayers, updatePlayerOneScore, updatePlayerTwoScore, gotPlayer, gotPlayerOne, gotPlayerTwo, gotRoom, gotGameState, gotNextPlayer, gotNewPlayer, gotGuess, gotCorrectGuess, gotScores} from './store'

const socket = io(window.location.origin);

socket.on('joined-room', (roomInfo) => {
  console.log('room info', roomInfo)
  store.dispatch(gotRoom(roomInfo.room))
  roomInfo.playerOne ? 
  // store.dispatch(gotPlayerOne(roomInfo.playerOne))
  store.dispatch(gotPlayer(roomInfo.playerOne))
  :
  // store.dispatch(gotPlayerTwo(roomInfo.playerTwo))
  store.dispatch(gotPlayer(roomInfo.playerTwo))
})

socket.on('new-player', (player) => {
  store.dispatch(gotNewPlayer(player))
})

socket.on('nextPlayer', (nextPlayer, cardIdx) => {
  store.dispatch(gotNextPlayer(nextPlayer, cardIdx))
})

socket.on('all-players', (allPlayers) => {
  console.log('all players in socket', allPlayers)
  store.dispatch(getAllPlayers(allPlayers))
})

socket.on('gameStateChange', (gameState, allPlayers) => {
  console.log('all players in game state change', allPlayers)
  store.dispatch(gotGameState(gameState, allPlayers))
})

socket.on('finalScores', (allPlayers) => {
  store.dispatch(gotScores(allPlayers))
})

socket.on('gotGuess', (guess) => {
  store.dispatch(gotGuess(guess))
})

socket.on('guessCorrect', (guess) => {
  store.dispatch(gotCorrectGuess(guess))
})

socket.on('emitScore', (score) => {
  console.log('An score from server has been received!', score)
  store.dispatch(updatePlayerOneScore(score))
})

socket.on('emitTwoScore', (score) => {
  console.log('An score from server has been received!', score)
  store.dispatch(updatePlayerTwoScore(score))
})


export default socket