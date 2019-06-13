import React from 'react'

class ScoreBoard extends React.Component{
  constructor(props) {
    super(props)
    console.log('props', props)
  }
  render(){
    let players = this.props.players
      return <div id="scores">
        {
          [...players].map(player => (
              <div key={player.name}>
                <h2>
                  {player.name}'s Score: {player.score}
                </h2>
              </div>
            )
        )}
        </div>;
  }
}

export default ScoreBoard