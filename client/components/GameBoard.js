import React from 'react'
import Navbar from './navbar'
import CorrectScreen from './CorrectScreen'
import rappers from '../rappers'

class GameBoard extends React.Component{
  constructor() {
    super()
    this.rappers = rappers
      this.displayedRappers =[]
      this.audioChoice = ''
      this.handlePlayClick = this.handlePlayClick.bind(this)
      this.handleRapperClick = this.handleRapperClick.bind(this)
      this.handlePlayAgain = this.handlePlayAgain.bind(this)
      this.state = {
        correct: null,
        rapperChoice: {},
        score: 0
      }
  }
  
  componentDidMount(){
    this.displayedRappers = this.chooseRappers()
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
    });
  }

  chooseRappers() {
    while(this.displayedRappers.length < 4) {
      let nameArr = this.displayedRappers.map(rapper => rapper.artist)
      let randomRapper = this.rappers[Math.floor(Math.random() * this.rappers.length)]
      console.log('nameArr', nameArr)
      if (!nameArr.includes(randomRapper.artist)) {
        this.displayedRappers.push(randomRapper)
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
    this.audioChoice = new Audio(this.state.rapperChoice.track)
  }

  handleRapperClick(event) {
    console.log('event', event.target)
    if(event.target.id === this.state.rapperChoice.name) {
      this.setState({
        correct: true
      })
      this.setState({
        score: this.state.score + 1
      })
    } else {
      this.setState({
        correct: false
      })
    }
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

  render() {
    console.log('state', this.state)
    return (
    <div>
      <div>
         <Navbar />
         <h2>Score: {this.state.score}</h2>
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
        <h1>You Crazy For This One!</h1>
      :
      <div/>      
      }
  </div>
    )
  }

}

export default GameBoard