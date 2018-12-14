import React from 'react'
import history from '../history'
import socket from '../socket'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import WaitRoom from './WaitRoom'

class HomeScreen extends React.Component{
    constructor(props) {
      super(props)
      this.state ={
        gameId: 'Click Create!',
        name: '',
        joinName: '',
        id: '',
        errMessage: null,
        audioPlay: false,
        startGame: false
    }
this.handleOnSubmit = this.handleOnSubmit.bind(this)
this.onClick = this.onClick.bind(this)
this.handleChange = this.handleChange.bind(this)
this.createRoom = this.createRoom.bind(this)
this.joinRoom = this.joinRoom.bind(this)
this.socket = io(window.location.origin)
this.audio = new Audio('http://www.hipstrumentals.com/wp-content/uploads/2018/10/Sheck-Wes-Mo-Bamba-Instrumental-Prod.-By-Take-A-Daytrip-16yrold.mp3')
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createRoom() {
        if (this.state.name !== '') {
            socket.emit('create-room', this.state.name, this.socket.id);
            // this.props.history.push('/game')
            this.setState({startGame: true})
        } else {
            this.setState({errMessage: 'Please fill in name field to create a room'})
        }
        console.log('create room! Creator:', this.state.name)
    }

    joinRoom() {
        if (this.state.joinName !== '' && this.state.id !== '') {
            socket.emit('join-room', this.state.id, this.state.joinName, this.socket.id)
            console.log('props in joinRoom homescreen', this.props)
            // this.props.history.push('/game')
            this.setState({startGame: true})
        } else {
            this.setState({errMessage: 'Please fill in name and room id to join a room'})
        }
        console.log('join room!', this.state.joinName)
    }

    handleOnSubmit() {
        console.log('joining!')
        }

    onClick(){
        if(!this.state.audioPlay){
            this.audio.play()
            this.setState({
                audioPlay: true
            })
        } else if (this.state.audioPlay){
            this.audio.pause();
            this.setState({
                audioPlay: false
            })
        }
        console.log(this.state)
    }

    render() {
    const socket = this.socket
    console.log('socket id', this.socket.id)
    return (
            <div>
                { !this.state.startGame ?
                <div>
                    <br/>
                    <div>
                        <h1 id='header'>🎵 Between Bars 🎵</h1>
                        <div id='subtitle'>
                        </div>
                        <div id='pics'>
                        <img id='pic' src="https://media.giphy.com/media/l4FGBX2RxxywvlZ3a/source.gif" />
                        <img id='pic' src="https://media.giphy.com/media/xThtalXYy3xjQItuwM/giphy.gif" />
                        <img id='pic' src="https://media.giphy.com/media/fe3Rwmc2bBulG/giphy.gif" />
                        </div>
                    </div>
            
                    <div id="welcome">
                        <h1>Start A New Game</h1>
                        <p>Please enter your name below</p>
                        <label>Name</label>
                        <input name="name" value={this.state.name} onChange={this.handleChange} type="text" />
                        <hr />
                        <p>If you would like to create a new room, click here!</p>
                        <button type="submit" onClick={this.createRoom}>Create A Game Room!</button>
                        <hr />
                        <p>If you would like to join an existing room, enter the room ID, and click here!</p>
                        <label>Name</label>
                        <input name="joinName" value={this.state.joinName} onChange={this.handleChange} type="text" /> <br />
                        <label>Room ID</label>
                        <input name="id" value={this.state.id} onChange={this.handleChange} type="text" /> <br />
                        <button type="submit" onClick={this.joinRoom}>Join A Game Room!</button>
                        <hr />
                        {this.state.errMessage && <p id="errMessage">{this.state.errMessage}</p>}
                    </div>
                </div>
                        :  
                <WaitRoom socket = {socket}/>
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

export default connect(mapStateToProps)(HomeScreen)