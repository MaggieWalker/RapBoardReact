import React from 'react'

class ScoreBoard extends React.Component{
  constructor(props) {
    super(props)
    this.score = props.score
  }
  render(){
      return(
          <div>Score: {this.score}</div>
      )
  }
}

export default ScoreBoard