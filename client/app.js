import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GameBoard from './components/GameBoard'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Route path ='/' component={GameBoard}/>
    </div>
  )
}

export default App
