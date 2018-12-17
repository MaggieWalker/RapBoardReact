//Currently unused component

import React from 'react'
import {connect} from 'react-redux'

class Rappers extends React.Component{
    constructor(props) {
      super(props)
      this.state ={}
      this.audioChoice = '';
      this.displayedRappers = this.props.displayedRappers
      this.handlePlayClick = this.handlePlayClick.bind(this)
}

chooseAudio() {
    console.log('this.props', this.props)
    this.audioChoice = new Audio(this.props.rapperChoice.track)
    console.log('this audio choice', this.audioChoice)
}

handlePlayClick() {
    this.audioChoice.play()
}

    render() {
        console.log('audio choince in render', this.audioChoice)
        return (
            <div>
                <div id='rappers'>
                    {
                    this.displayedRappers.map(rapper => (
                        <div key={rapper.name}>
                        <img className='microphone' src='/microphone.png' />
                        <figure > 
                        <img id= {rapper.name} src={rapper.img ? rapper.img : 'http://therapboard.com/images/artist/21savage.png'} onClick={this.props.handleRapperClick}/>
                        <figcaption><h4>{rapper.artist}</h4></figcaption>
                        </figure>
                    </div>
                    ))
                    }
                    {this.chooseAudio()}
                    {this.handlePlayClick()}
                </div>
                <div id='bottombar'>
                    <div id='playButton'>
                    <button type='button'onClick={this.handlePlayClick}>Play Ad Lib Again</button>
                </div>
            </div>
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

export default connect(mapStateToProps)(Rappers)