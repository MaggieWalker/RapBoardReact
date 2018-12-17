import React from 'react'
import history from '../history'
import {connect} from 'react-redux'

class PlaySong extends React.Component{
    constructor(props) {
      super(props)
      this.state ={}
    }

render() {
    return (
        <div>
            <figure >
                <img src="https://cdn.shopify.com/s/files/1/0185/5092/products/objects-0039_800x.png?v=1369543954" />
            </figure>
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

export default connect(mapStateToProps)(PlaySong)