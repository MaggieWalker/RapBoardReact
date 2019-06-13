import React from 'react'

class ScoreBoard extends React.Component{
  constructor(props) {
    super(props)
    console.log('props', props)
  }
  render(){
      return(
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
      )
  }
}

export default ScoreBoard