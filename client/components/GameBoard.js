import React from 'react'
import Navbar from './navbar'
import CorrectScreen from './CorrectScreen'
import {NSFW, SFW, incorrectChoice, colors} from '../rappers'
import io from 'socket.io-client'
import {connect} from 'react-redux'

class GameBoard extends React.Component{
  constructor(props) {
    super(props)
    this.SFW = SFW
    this.NSFW = NSFW
    this.incorrectChoice = incorrectChoice
      this.displayedRappers =[]
      this.audioChoice = ''
      this.audio = new Audio('http://www.hipstrumentals.com/wp-content/uploads/2018/10/Sheck-Wes-Mo-Bamba-Instrumental-Prod.-By-Take-A-Daytrip-16yrold.mp3')
      this.handlePlayClick = this.handlePlayClick.bind(this)
      this.handleRapperClick = this.handleRapperClick.bind(this)
      this.handlePlayAgain = this.handlePlayAgain.bind(this)
      this.onSoundClick = this.onSoundClick.bind(this)
      this.startGame = this.startGame.bind(this)
      this.state = {
        SFW: true,
        correct: null,
        rapperChoice: {},
        gameInfo: {},
        audioPlay: false,
        addedPlayer: '',
      }
      this.socket = this.props.socket
  }

  componentDidMount(){
    console.log('all players in did mount', this.props.allPlayers)
    console.log('props in gameboard', this.props)
    this.displayedRappers = this.chooseRappers()
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],

    });

  //   this.socket.on('playerAdded', (id) => {
  //     console.log('A new player was added!', id)
  //   })
  }

  startGame(event) {
    event.preventDefault()
    console.log('joining')
  }

  chooseRappers() {
    while(this.displayedRappers.length < 4) {
      let nameArr = this.displayedRappers.map(rapper => rapper.artist)
      if (this.state.SFW){
        let randomRapper = this.SFW[Math.floor(Math.random() * this.SFW.length)]
        if (!nameArr.includes(randomRapper.artist)) {
          this.displayedRappers.push(randomRapper)
        }
      } else {
        let randomRapper = this.NSFW[Math.floor(Math.random() * this.NSFW.length)]
        if (!nameArr.includes(randomRapper.artist)) {
          this.displayedRappers.push(randomRapper)
        }
      }
    }
    console.log(this.displayedRappers)
    return this.displayedRappers
  }

  handlePlayClick() {
    this.audioChoice.play()
  }
  onSoundClick(){
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

  chooseAudio() {
    this.audioChoice = new Audio(this.state.rapperChoice.track)
  }

  handleRapperClick(event) {
    console.log('socket in handle rapper click', this.socket)
    console.log('props', this.props)
    if (this.socket.id === this.props.allPlayers[0].id) {
      let points = this.props.playerOneScore
      if(event.target.id === this.state.rapperChoice.name) {
        points++
        console.log('player one', points)
        this.socket.emit('sendScore', points)
        this.correctGuess()
      } else {
        this.setState({
          correct: false
        })
      }
    } else {
      let points = this.props.playerTwoScore
      if(event.target.id === this.state.rapperChoice.name) {
        points++
        console.log('player two points', points)
        this.socket.emit('sendTwoScore', points)
        this.correctGuess()
      } else {
        this.setState({
          correct: false
        })
      }
    }

  }
  
correctGuess(){
  let socket = this.socket.id
    this.setState({
      correct: true
    })
    let score = this.props.playerOneScore + 1
    console.log('score in correct guss', score)
    if (score % 5 === 0 && score !==0) {
      const airHorn = new Audio("https://www.myinstants.com/media/sounds/mlg-airhorn.mp3")
      airHorn.play()
    } 
  }

  handlePlayAgain() {
    this.displayedRappers = []
    this.displayedRappers = this.chooseRappers()
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
      correct: null
    });
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)]
    console.log('displayed rappers', this.displayedRappers)
  }

  render() {
    console.log('socket in gameboard', this.socket.id)
    return (
    <div>
      <div>
        <div id='navbar'>
         <Navbar />
        
        </div>
         <div id='scores'>
        <div>
            <h2>{this.props.allPlayers[0].name}'s Score: {this.props.playerOneScore}</h2>
        </div>
        <div>
            <h2>{this.props.allPlayers[1].name}'s Score: {this.props.playerTwoScore}</h2>
        </div>
         </div>
      </div>
<div id='rappers'>
      {
        this.displayedRappers.map(rapper => (
          <div key={rapper.name}>
          <img className='microphone' src='/microphone.png' />
          <figure > 
            <img id= {rapper.name} src={rapper.img ? rapper.img : 'http://therapboard.com/images/artist/21savage.png'} onClick={this.handleRapperClick}/>
            <figcaption><h4>{rapper.artist}</h4></figcaption>
            </figure>
        </div>
        ))
      }
      {this.chooseAudio()}
</div>
<div id='bottombar'>
  <div id="toggle">
          <h4>SFW : NSFW</h4>
      <div>
        <label className="switch">
            <input type="checkbox" id="togBtn" onChange={(e)=> this.setState({SFW: !this.state.SFW})}></input>
            <span className="slider round"></span>
        </label>
    </div>
  </div>
  <div id='playButton'>
      <button type='button'onClick={this.handlePlayClick}>Play Ad Lib!</button>
  </div>
  <button type ='button' onClick={this.onSoundClick}>🔊</button>
  
  
  <p/>
  <p/>
  <p/>
  <p/>
      {
        this.state.correct ?  
          <div id='makeChoice'>
            <div id='correctScreen'>
              <CorrectScreen rapper={this.state.rapperChoice}/> 
              {
                setTimeout(this.handlePlayAgain, 1500)
              }
            </div>
          </div>
      : 
      <div/>
      }
      {
        this.state.correct === false ? 
        <h1>{this.incorrectChoice[Math.floor(Math.random() * this.incorrectChoice.length)]}</h1>
      :
      <div/>      
      }
      </div>
  </div>
    )
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
  }
}
export default connect(mapStateToProps)(GameBoard)