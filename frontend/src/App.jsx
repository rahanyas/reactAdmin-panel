import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import Login from './Pages/Login'
import SignIn from './Pages/SignIn'

import './App.css'

function App() {

  return (
   <Fragment>
       <BrowserRouter>
       <Routes>
           <Route path='' element={<Login/>}/>
           <Route path='/signIn' element={<SignIn/>}/>
       </Routes>
       </BrowserRouter>
   </Fragment>
  )
}

export default App
