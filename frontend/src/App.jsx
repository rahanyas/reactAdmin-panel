import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { UserProvider } from './context/UserContext'
import Login from './Pages/Login'
import SignIn from './Pages/SignIn'

import './App.css'
import Home from './Pages/Home'

function App() {

  return (
   <Fragment>
    <UserProvider>
       <BrowserRouter>
       <Routes>
           <Route path='' element={<Login/>}/>
           <Route path='/signIn' element={<SignIn/>}/>
           <Route path='/home' element={<Home/>} />
       </Routes>
       </BrowserRouter>
    </UserProvider>
   </Fragment>
  )
}

export default App
