import React from 'react'

const WinScreen = (props) => {

    console.log('props', props)
    return (
        <div id='winScreen'>
            <h1>{props.winner ? `${props.winner} is` : `Congrats! You're`} an ad-lib genius!</h1>
            <div>
                <img id='rapperChoice' src= {`./winner${Math.floor(Math.random() * 18)}.png`} />
            </div>
            <h3><a href = "https://www.instagram.com/somehoodlum/?hl=en">@somehoodlum</a></h3>
        </div>

    )
}

export default WinScreen