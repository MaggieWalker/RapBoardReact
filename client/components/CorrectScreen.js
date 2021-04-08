import React from 'react'
import {correctChoice} from '../rappers'


const CorrectScreen = (props) => {
    const rapper = props.rapper

    return (
        <div id='correctScreen'>
            <h1>{correctChoice[Math.floor(Math.random() * correctChoice.length)]}</h1>
            <img id='rapperChoice' src={`./rapper_images/${props.rapper.img}`} />
        </div>

    )
}

export default CorrectScreen