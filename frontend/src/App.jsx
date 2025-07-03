import { useState } from 'react'
import './App.css'
import Navbar from './Navigation/Navbar'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      {/* <Login/> */}
      <SignUp/>
    </>
  )
}

export default App
