import React from 'react'

class WinScreen extends React.Component {

    render() {
        return (
            <div id='winScreen'>
                <h1>{this.props.winner ? `${this.props.winner} is` : `Congrats! You're`} an ad-lib genius!</h1>
                <div>
                    <img id='rapperChoice' src= {`./winner${Math.floor(Math.random() * 18)}.png`} />
                </div>
                <h3><a href = "https://www.instagram.com/somehoodlum/?hl=en">@somehoodlum</a></h3>
            </div>

        )
    }
}


export default WinScreen