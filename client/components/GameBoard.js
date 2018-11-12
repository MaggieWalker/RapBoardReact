import React from 'react'
import Navbar from './navbar'
import CorrectScreen from './CorrectScreen'
import rappers, {NSFW, SFW, incorrectChoice, colors} from '../rappers'
import io from 'socket.io-client'

class GameBoard extends React.Component{
  constructor() {
    super()
    this.rappers = rappers
    this.SFW = SFW
    this.NSFW = NSFW
    this.incorrectChoice = incorrectChoice
      this.displayedRappers =[]
      this.audioChoice = ''
      this.handlePlayClick = this.handlePlayClick.bind(this)
      this.handleRapperClick = this.handleRapperClick.bind(this)
      this.handlePlayAgain = this.handlePlayAgain.bind(this)
      this.startGame = this.startGame.bind(this)
      this.state = {
        SFW: true,
        correct: null,
        rapperChoice: {},
        gameInfo: {},
        addedPlayer: '',
        playerOne: {
          id: '',
          score: 0
        },
        playerTwo: {
          id: '',
          score: 0
        }
      }
      this.socket = io(window.location.origin)
  }
  
  componentDidMount(){
    console.log('socket', this.socket.id)
    console.log('state in did mount', this.state)
    this.displayedRappers = this.chooseRappers()
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
    });

    this.socket.on('emitScore', (score) => {
      console.log('An event from serve has been received!', score)
      console.log('this', this)
    })

    this.socket.on('playerAdded', (id) => {
      console.log('A new player was added!', id)
    })
  }

  startGame(event) {
    event.preventDefault()
    console.log('joining')
    console.log('socket', this.socket.id)
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

  chooseAudio() {
    this.audioChoice = new Audio(this.state.rapperChoice.track)
  }

  handleRapperClick(event) {
    console.log('event.target', event.target)
    let socket = this.socket.id
      let points = this.state.playerOne.score
      if(event.target.id === this.state.rapperChoice.name) {
        points++
        this.socket.emit('sendScore', points)
        this.correctGuess(points)
      } else {
        this.setState({
          correct: false
        })
      }
  }
  
correctGuess(){
  let socket = this.socket.id
    this.setState({
      correct: true
    })
    this.setState({
      playerOne: {score: this.state.playerOne.score + 1}
    })
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
    console.log('state', this.state)
    return (
    <div>
      <div>
        <div id='navbar'>
         <Navbar />
        
        </div>
         <div id='scores'>
        <div>
            <h2>Player One Score: {this.state.playerOne.score}</h2>
        </div>
        <div>
            <h2>Player Two Score: {this.state.playerTwo.score}</h2>
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
      <button type='button'onClick={this.handlePlayClick}>Play!</button>
  </div>
  
  <p/>
  <p/>
  <p/>
  <p/>
      {
        this.state.correct ?  
          <div id='makeChoice'>
            <div id='correctScreen'>
              <CorrectScreen rapper={this.state.rapperChoice}/> 
              <button type='button' id='playAgainButton' onClick={this.handlePlayAgain}>Next!</button>
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

export default GameBoard