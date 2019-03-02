import React from 'react';
import socket from '../socket';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { gotPlayer } from '../store';
import WaitRoom from './WaitRoom';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      soloName: '',
      joinName: '',
      id: '',
      errMessage: null,
      errMessageSingle: null,
      audioPlay: false,
      startGame: false,
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.singlePlayerStart = this.singlePlayerStart.bind(this);
    this.socket = io(window.location.origin);
    this.audio = new Audio(
      'http://www.hipstrumentals.com/wp-content/uploads/2018/10/Sheck-Wes-Mo-Bamba-Instrumental-Prod.-By-Take-A-Daytrip-16yrold.mp3'
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  singlePlayerStart() {
    let playerName = this.state.soloName;
    this.props.addPlayer(playerName);
    if (this.state.soloName !== '') {
      this.props.history.push('/singleplayer');
    } else {
      this.setState({
        errMessageSingle: 'Please fill in name field to start the game',
      });
    }
  }

  createRoom() {
    if (this.state.name !== '') {
      socket.emit('create-room', this.state.name, this.socket.id);
      this.setState({ startGame: true });
    } else {
      this.setState({
        errMessage: 'Please fill in name field to create a room',
      });
    }
    console.log('create room! Creator:', this.state.name);
  }

  joinRoom() {
    if (this.state.joinName !== '' && this.state.id !== '') {
      socket.emit(
        'join-room',
        this.state.id,
        this.state.joinName,
        this.socket.id
      );
      this.setState({ startGame: true });
    } else {
      this.setState({
        errMessage: 'Please fill in name and room id to join a room',
      });
    }
  }

  onClick() {
    if (!this.state.audioPlay) {
      this.audio.play();
      this.setState({
        audioPlay: true,
      });
    } else if (this.state.audioPlay) {
      this.audio.pause();
      this.setState({
        audioPlay: false,
      });
    }
  }

  render() {
    const socket = this.socket;
    return (
      <div>
        {!this.state.startGame ? (
          <div>
            <br />
            <div>
              <div id ="header">
                <div id="headerBox">
                    <div id="github">
                      <a href="https://github.com/MaggieWalker/RapBoardReact" target="_blank" rel="noopener noreferrer"><img id="githubimg" src="https://image.flaticon.com/icons/png/512/25/25231.png" height="40" width="40"/></a>
                    </div>
                    <div id="logo">
                      <img src='./BetweenBars2.png' />
                    </div>
                </div>
              </div>
              <div id="homePics">
                <img
                  id="pic"
                  src="https://media.giphy.com/media/l4FGBX2RxxywvlZ3a/source.gif"
                />
                <img
                  id="pic"
                  src="https://media.giphy.com/media/xThtalXYy3xjQItuwM/giphy.gif"
                />
                <img
                  id="pic"
                  src="https://media.giphy.com/media/fe3Rwmc2bBulG/giphy.gif"
                />
              </div>
            </div>

            <div id="welcome">
              <hr />
              <div className="welcome">
                <h1>Solo Game</h1>
                <p>Please enter your name below</p>
                <label>Name</label>
                <input
                  name="soloName"
                  value={this.state.soloName}
                  onChange={this.handleChange}
                  type="text"
                />
                {this.state.errMessageSingle && (
                  <p id="errMessage">{this.state.errMessageSingle}</p>
                )}
                <p />
                <button type="submit" onClick={this.singlePlayerStart}>
                  Start Game!
                </button>
              </div>
              <hr />
              <div className="welcome">
                <h1>Two-Player Game</h1>
                <p>Please enter your name below</p>
                <label>Name</label>
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  type="text"
                />
                {this.state.errMessage && (
                  <p id="errMessage">{this.state.errMessage}</p>
                )}
                <p>If you would like to create a new room, click here!</p>
                <button type="submit" onClick={this.createRoom}>
                  Create A Game Room!
                </button>
              </div>
              <hr />
              <div className="welcome">
                <h1>Join A Game Room</h1>
                <p>Enter your name and the room ID here!</p>
                <label>Name</label>
                <input
                  name="joinName"
                  value={this.state.joinName}
                  onChange={this.handleChange}
                  type="text"
                />{' '}
                <br />
                <label>Room ID</label>
                <input
                  name="id"
                  value={this.state.id}
                  onChange={this.handleChange}
                  type="text"
                />{' '}
                <br />
                <button type="submit" onClick={this.joinRoom}>
                  Join A Game Room!
                </button>
              </div>
              <hr />
            </div>
          </div>
        ) : (
          <WaitRoom socket={socket} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    room: state.room,
    gameState: state.gameState,
    allPlayers: state.allPlayers,
    playerOne: state.playerOne,
    playerTwo: state.playerTwo,
  };
};

const mapDispatchToProps = dispatch => ({
  addPlayer: player => dispatch(gotPlayer(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
