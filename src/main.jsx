import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Headers from './components/headers'
import OutletCompo from './components/outlet.jsx'
import Login from './components/login'
import RegisterUser from './components/register'
import Home from './components/Home'
import FindConnection from './components/findConnection'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<OutletCompo/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element ={<Login/>}/>
        <Route path='register' element={<RegisterUser/>}/>
        <Route path='/connection' element={<FindConnection/>}/>
       </Route>
     </Routes>
   </BrowserRouter>
  </StrictMode>,
)
