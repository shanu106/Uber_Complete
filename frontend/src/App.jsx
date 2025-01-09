import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Pages/Start'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import CaptainSignUp from './Pages/CaptainSignUp'
import CaptainLogin from './Pages/CaptainLogin'
import Home from "./Pages/Home"
import UserProtectWrapper from './Pages/UserProtectWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper'
import CaptainHome from './Pages/CaptainHome'
import CaptainLogout from './Pages/CaptainLogout'
import Riding from './Pages/Riding'
import CaptainRiding from './Pages/CaptainRiding'
const App = () => {
  return (

      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path='/user-signup' element={<UserSignUp />} />
        <Route path='/user-login' element={< UserLogin/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />
        <Route path='/captain-signup' element={<CaptainSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route  path='/home' element={
          // <UserProtectWrapper>
            <Home/>
          // </UserProtectWrapper> 
        }/>
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>
      <Route path='/captain-home' element={
        <CaptainProtectWrapper>
          <CaptainHome/>
      </CaptainProtectWrapper>
      } />
      <Route path='/captain-logout' element={
        <CaptainProtectWrapper>
          <CaptainLogout/>
      </CaptainProtectWrapper>
      } />
       
      
       

      </Routes>
  
  )
}

export default App