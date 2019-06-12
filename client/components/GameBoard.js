import React from 'react';
import Navbar from './navbar';
import CorrectScreen from './CorrectScreen';
import { NSFW, SFW, incorrectChoice, colors } from '../rappers';
import { connect } from 'react-redux';
import WinScreen from './WinScreen';

class GameBoard extends React.Component {
  static DisplayedRapper = (rapper) => (
  <div key={rapper.name}>
    <img className="microphone" src="/microphone.png" />
    <figure>
      <img
        id={rapper.name}
        src={
          rapper.img || 'http://therapboard.com/images/artist/21savage.png'
        }
        onClick={this.handleRapperClick}
      />
      <figcaption>
        <h4>{rapper.artist}</h4>
      </figcaption>
    </figure>
  </div>);

  constructor(props) {
    super(props);
    this.SFW = SFW;
    this.NSFW = NSFW;
    this.incorrectChoice = incorrectChoice;
    this.displayedRappers = [];
    this.audioChoice = '';
    this.audio = new Audio(
      'http://www.hipstrumentals.com/wp-content/uploads/2018/10/Sheck-Wes-Mo-Bamba-Instrumental-Prod.-By-Take-A-Daytrip-16yrold.mp3'
    );
    this.handleRapperClick = this.handleRapperClick.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.onSoundClick = this.onSoundClick.bind(this);
    this.state = {
      SFW: true,
      correct: null,
      rapperChoice: {},
      audioPlay: false,
      answered: false,
    };
    this.socket = this.props.socket;
  }

  componentDidMount() {
    this.displayedRappers = this.chooseRappers();
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
    });
    if (this.audioChoice) {
      this.handlePlayClick();
    }
  }

  chooseRappers() {
    while (this.displayedRappers.length < 4) {
      let nameArr = this.displayedRappers.map(rapper => rapper.artist);
      if (this.state.SFW) {
        let randomRapper = this.SFW[
          Math.floor(Math.random() * this.SFW.length)
        ];
        if (!nameArr.includes(randomRapper.artist)) {
          this.displayedRappers.push(randomRapper);
        }
      } else {
        let randomRapper = this.NSFW[
          Math.floor(Math.random() * this.NSFW.length)
        ];
        if (!nameArr.includes(randomRapper.artist)) {
          this.displayedRappers.push(randomRapper);
        }
      }
    }
    return this.displayedRappers;
  }

  handlePlayClick = () => {
    this.audioChoice.play();
  }
  
  onSoundClick() {
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

  chooseAudio() {
    this.audioChoice = new Audio(this.state.rapperChoice.track);
  }

  handleRapperClick(event) {
    if (this.socket.id === this.props.allPlayers[0].id) {
      let points = this.props.playerOneScore;
      if (event.target.id === this.state.rapperChoice.name && this.state.answered === false) {
        points++;
        this.socket.emit('sendScore', points);
        this.correctGuess(points);
      } else if (event.target.id === this.state.rapperChoice.name && this.state.answered === true){
        this.correctGuess(points)
      } else {
        this.setState({
          correct: false,
        });
      }
    } else {
      let points = this.props.playerTwoScore;
      if (event.target.id === this.state.rapperChoice.name && this.state.answered === false) {
        points++;
        this.socket.emit('sendTwoScore', points);
        this.correctGuess(points);
      } else if (event.target.id === this.state.rapperChoice.name && this.state.answered === true){
        this.correctGuess(points)
      } else {
        this.setState({
          correct: false,
        });
      }
    }
  }

  correctGuess(points) {
    this.setState({
      correct: true,
      answered: true,
    });
    let score = points;
    if (score % 5 === 0 && score !== 0) {
      const airHorn = new Audio(
        'https://www.myinstants.com/media/sounds/mlg-airhorn.mp3'
      );
      airHorn.play();
    } else if (score === 21) {
      const twentyOne = new Audio(
        'http://www.therapboard.com/audio/21savage_21.ogg'
      );
      twentyOne.play();
    }
  }

  handlePlayAgain() {
    this.displayedRappers = [];
    this.displayedRappers = this.chooseRappers();
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
      correct: null,
      answered: false,
    });
    document.body.style.background =
      colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    return (
      <div>
      {this.props.playerOneScore === 21 ? <WinScreen winner={this.props.allPlayers[0].name}/> :
        this.props.playerTwoScore === 21 ? <WinScreen winner={this.props.allPlayers[1].name}/> : 
      <div>
        <div>
          <div id="navbar">
            <Navbar />
          </div>
          <div id="scores">
            {
              [
                {
                  name: this.props.allPlayers[0],
                  score: this.props.playerOneScore,
                },
                {
                  name: this.props.allPlayers[1],
                  score: this.props.playerTwoScore,
                },
              ].map((player) => <div key={player.name}>
                <h2>
                {player.name}'s Score:{' '}{player.score}
              </h2>
              </div>)
            }
          </div>
        </div>


        <div id="rappers">
          {this.displayedRappers.map(rapper => (
            <GameBoard.DisplayedRapper {...rapper} />
          ))}
          {this.chooseAudio()}
        </div>

        <div id="bottombar">
          <div id="toggle">
            <h4>SFW : NSFW</h4>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  onChange={e => this.setState({ SFW: !this.state.SFW })}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>

          <div id="playButton">
            <button type="button" onClick={this.handlePlayClick}>
              Play Ad-Lib
            </button>
          </div>

          <button type="button" onClick={this.onSoundClick}>
            🔊
          </button>

          <p />
          <p />
          <p />
          <p />

          {this.state.correct ? (
            <div id="makeChoice">
              <div id="correctScreen">
                <CorrectScreen rapper={this.state.rapperChoice} />
                <button type="button" onClick={this.handlePlayAgain}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div />
          )}
          {this.state.correct === false ? (
            <h1>
              {
                this.incorrectChoice[
                  Math.floor(Math.random() * this.incorrectChoice.length)
                ]
              }
            </h1>
          ) : (
            <div />
          )}
        </div>
      </div>
      }
    </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    playerOne: state.playerOne,
    playerTwo: state.playerTwo,
    playerOneScore: state.playerOneScore,
    playerTwoScore: state.playerTwoScore,
    curPlayer: state.curPlayer,
    correctGuess: state.correctGuess,
    room: state.room,
    gameState: state.gameState,
    allPlayers: state.allPlayers,
  };
};
export default connect(mapStateToProps)(GameBoard);
