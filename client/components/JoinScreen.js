import React from 'react'
import history from '../history'

class JoinScreen extends React.Component{
    constructor(props) {
      super(props)
this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

handleOnSubmit() {
    history.push('/game')
    }

render() {
    return (
        <div>
        <form onSubmit={this.handleOnSubmit}>
            <label>
                Game ID: <input type="text"/>
            </label>
            <label>
                Join with Name: <input type="text"/>
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
export default JoinScreen