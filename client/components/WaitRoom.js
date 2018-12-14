import React from 'react'
import socket from '../socket';
import GameBoard from './GameBoard'
import GameOver from './GameOver'
import {connect} from 'react-redux'
import io from 'socket.io-client'

class WaitRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rounds: 1,
            errMessage: ''
        }
        this.startGame = this.startGame.bind(this)
    }

    startGame() {
        socket.emit('startGame', this.props.room, this.props.allPlayers, this.state.rounds, this.props.playerOne, this.props.playerTwo)
        console.log(this.socket)
    }

    render() {
        console.log("props in waiting rooom", this.props)
        return (
            <div>
                {this.props.gameState === 'playing' ?
                    <GameBoard socket={this.props.socket}/> :
                    this.props.gameState === 'gameOver' ?
                    <GameOver socket={this.props.socket}/> :
                    <div>
                        {this.props.allPlayers[0] && this.props.allPlayers[1] ?
                            <div>
                                <h1>Room ID: {this.props.room}</h1>
                                <p>Please share the room ID with your friends, so they can join the room.</p>
                                <p>When everyone is here, enter the number of rounds you would like to play,</p>
                                <p>and click the button below to start the game!</p>
                                <hr />
                                {this.props.allPlayers.map((player, i) => <p key={i}>{player.name} has joined the room!</p>)}
                                <hr />
                                <br />
                                <button type="button" onClick={this.startGame}>All Players are Here!</button>
                                {this.state.errMessage && <p id="errMessage">{this.state.errMessage}</p>}
                            </div>
                            :
                            <div>
                                <h1>Welcome to {this.props.room}</h1>
                                <p>We are currently waiting for more players to join, the room creator will start the game when everyone has joined. Sit tight!</p>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room,
        gameState: state.gameState,
        allPlayers: state.allPlayers,
        playerOne: state.playerOne,
        playerTwo: state.playerTwo
    }
}

export default connect(mapStateToProps)(WaitRoom)
