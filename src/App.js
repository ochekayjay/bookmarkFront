import React from 'react';
import {Routes, Route} from 'react-router-dom'
import LandingPageHolder from './Components/PreAuth/LandingPageHolder';
import SignIn from './Components/PreAuth/SignIn';
import Signup from './Components/PreAuth/SignUp';
import UserPage from './Components/PostAuth/UserPage';
import Contentsection from './Components/PostAuth/Content/Contentsection';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPageHolder />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/landingpage' element={<UserPage/>} />
        <Route path='/content' element={<Contentsection/>} />
      </Routes>
      
    </div>
  )
}

export default App
