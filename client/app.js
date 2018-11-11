import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GameBoard from './components/GameBoard'
import Routes from './routes'
import HomeScreen from './components/HomeScreen'
import JoinScreen from './components/JoinScreen';
import CreateScreen from './components/CreateScreen';

const App = () => {
  return (
    <div>
      <Route exact path ='/' component={HomeScreen}/>
      <Route exact path='/join' component={JoinScreen}/>
      <Route exact path ='/create' component={CreateScreen}/>
      <Route exact path ='/game' component={GameBoard}/>
    </div>
  )
}

export default App
