import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Chat from './screens/Chat';
import Avatar from './screens/Avatar';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/setAvatar' element={<Avatar/>}/>
      <Route exact path='/chat' element={<Chat/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
