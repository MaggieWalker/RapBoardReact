import React from 'react'
import JoinScreen from './JoinScreen';
import CreateScreen from './CreateScreen'
import { Switch, Route } from 'react-router-dom'
import history from '../history'
import io from 'socket.io-client'

class HomeScreen extends React.Component{
    constructor(props) {
      super(props)
this.handleOnSubmit = this.handleOnSubmit.bind(this)
this.handleCreate = this.handleCreate.bind(this)
this.socket = io(window.location.origin)
this.state ={
    gameId: 'Click Create!',
    playerOne: ''
}
    }

handleCreate() {
    // Create a unique Socket.IO Room
    var thisGameId = ( Math.random() * 100000 ) | 0;
    this.setState({gameId: thisGameId, playerOne: this.socket.id})
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.socket.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.socket.id});
    console.log('gameId', thisGameId, 'mySocketId', this.socket.id)
    // Join the Room and wait for the players
    // this.join(thisGameId.toString());

this.socket.on('connect', () => {
    console.log('Connected!')
    console.log('Player was added with id:', this.socket.id)
    let playerId = this.socket.id
    })
}
handleOnSubmit() {
    console.log('joining!')
    }

render() {
    return (
    <div>
        <br></br>
        <div>
            <h1>Whatchu Know About This!</h1>
            <div className='button'>
                <button type='button' id='createGame'onClick={this.handleCreate}>CREATE</button>
                <button type='button' id='joinGame' onClick={() => history.push('/join')}>JOIN</button>
            </div>
        </div>

        <div className='createGameWrapper'>
            <div className="info">Open this site on your browser:</div>
            <div id="gameURL">
                <span>http://localhost:8080/</span>
            </div>
            <div className="info">
                Then click <strong>JOIN</strong> and<br/>enter the following Game ID:
            </div>
            <div className="gameId">{this.state.gameId}</div>
        
        </div>
    </div>
        )
    }
}
export default HomeScreen