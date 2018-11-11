import React from 'react'
import Navbar from './navbar'
import CorrectScreen from './CorrectScreen'
import rappers, {NSFW, SFW, incorrectChoices} from '../rappers'
import io from 'socket.io-client'

class GameBoard extends React.Component{
  constructor() {
    super()
    this.rappers = rappers
    this.SFW = SFW
    this.NSFW = NSFW
    this.incorrectChoices = incorrectChoices
      this.displayedRappers =[]
      this.audioChoice = ''
      this.handlePlayClick = this.handlePlayClick.bind(this)
      this.handleRapperClick = this.handleRapperClick.bind(this)
      this.handlePlayAgain = this.handlePlayAgain.bind(this)
      this.startGame = this.startGame.bind(this)
      // this.handleOnSubmit =this.handleOnSubmit.bind(this)
      this.state = {
        SFW: true,
        correct: null,
        rapperChoice: {},
        gameInfo: {},
        playerOne: {
          score: 0,
          id: ''
        },
        playerTwo: {
          score: 0,
          id: ''
        }
      }
      this.socket = io(window.location.origin)

  }
  
  componentDidMount(){
    this.displayedRappers = this.chooseRappers()
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
    });

    // this.socket.on('connect', () => {
    //   console.log('Connected!')
    //   console.log('Player was added with id:', this.socket.id)
    //   let playerId = this.socket.id
    // })
    //Listening for server emits

    this.socket.on('newGameCreated', (gameInfo) => {
      this.setState({
        gameInfo: gameInfo
      })
      console.log('state after newGameCreated', this.state)
    })

    this.socket.on('emitScore', (score) => {
      console.log('An event from serve has been received!', score)
      console.log('this', this)
      this.setState({
        playerOne: {
          score: score
        }
      })
    })

    this.socket.on('playerAdded', (id) => {
      console.log('A new player was added!', id)
    })
  }

  startGame(event) {
    event.preventDefault()
    console.log('joining')
    if(!this.state.playerOne.id) {
          this.setState({
            playerOne: {
              score: 0,
              id: this.socket.id
            }
          })
        } else if (!this.state.playerTwo.id) {
          this.setState({
            playerTwo: {
              id: this.socket.id
            }
          })
        } else {
          console.log('Sorry no more players can be added')
        }
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
    console.log('this state', this.state)
    console.log('this.audioChoice', this.audioChoice)
    this.audioChoice.play()
  }

  chooseAudio() {
    console.log('length',rappers.length)
    this.audioChoice = new Audio(this.state.rapperChoice.track)
  }

  handleRapperClick(event) {
    console.log('event.target', event.target)
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
    this.setState({
      correct: true
    })
    this.setState({
      playerOne:{
        score: this.state.playerOne.score + 1
      } 
    })
  }

  handlePlayAgain() {
    this.displayedRappers = []
    this.displayedRappers = this.chooseRappers()
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
      correct: null
    });
    console.log('displayed rappers', this.displayedRappers)
  }

  // handleOnSubmit() {
  //   this.setState({
  //     playerOne:{
  //       id: this.socket.id
  //     }
  //   })
  // }

  render() {
    console.log('state', this.state)
    return (
    <div>
      <div>
         <Navbar />
         <div id="toggle">
                <h4>SFW : NSFW</h4>
         <div>
            <label className="switch">
                <input type="checkbox" id="togBtn" onChange={(e)=> this.setState({SFW: !this.state.SFW})}></input>
                <span className="slider round"></span>
            </label>
        </div>
        </div>
        <div>
        <form onSubmit={this.startGame}>
            <label>
                Join:
            <input type="text"></input>
            </label>
            <input type="submit" value="Submit" />
            </form>
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
        <h1>{this.incorrectChoices[Math.floor(Math.random() * this.incorrectChoices.length)]}</h1>
      :
      <div/>      
      }
  </div>
    )
  }

}

export default GameBoard