import React from 'react'

class CreateScreen extends React.Component{
    constructor(props) {
      super(props)
this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

handleOnSubmit() {
    console.log('joining!')
    }

render() {
    return (
        <div className='createGameWrapper'>
            <div className="info">Open this site on your browser:</div>
            <div id="gameURL">
                <span>http://localhost:8080/</span>
            </div>
            <div className="info">
                Then click <strong>JOIN</strong> and<br/>enter the following Game ID:
            </div>
            <div className="gameId">{'gameId'}</div>
        
        </div>
        )
    }
}
export default CreateScreen