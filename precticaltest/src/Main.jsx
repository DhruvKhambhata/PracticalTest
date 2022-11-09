import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Private_Route from './Component/Private_Route'
import Calculator from './Pages/Calculator'
import Login from './Pages/Login'
import Register from './Pages/Register'


function Main() {
  
  return (
    <Routes>
        <Route index element={<><Login/></>}/>
        <Route path='/register' element={<><Register/></>}/>
        <Route path='/calc' element={<Private_Route><Calculator/></Private_Route>}/>
    </Routes>
  )
}

export default Main