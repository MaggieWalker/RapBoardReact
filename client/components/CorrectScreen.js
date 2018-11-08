import React from 'react'


const CorrectScreen = (props) => {
    const rapper = props.rapper

    return (
        <div id='correctScreen'>
            <h1>That's Correct!</h1>
            <img id='rapperChoice' src={rapper.img} />
        </div>

    )
}

export default CorrectScreen