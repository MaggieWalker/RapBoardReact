import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GameBoard from './components/GameBoard'
import WaitRoom from './components/WaitRoom'
import Routes from './routes'
import HomeScreen from './components/HomeScreen'
import JoinScreen from './components/JoinScreen';
import CreateScreen from './components/CreateScreen';
import Main from './components/Main'

const App = () => {
  return (
    <div>
      <Route exact path ='/' component={HomeScreen}/>
      <Route exact path='/join' component={JoinScreen}/>
      <Route exact path ='/create' component={CreateScreen}/>
      <Route exact path ='/game' component={WaitRoom}/>
    </div>
  )
}

export default App
