import { useState, useEffect, use } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './Navigation/Navbar'
import About from './pages/About'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Home from './pages/Home/Home'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import MyEvents from './organiser/MyEvents/MyEvents'
import AddEvents from './organiser/AddEvent/AddEvents'
import Profile from './pages/profile/Profile'

function App() {

  const { isCheckingAuth, authUser, checkAuth, organiser,  checkOrganiser } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  // console.log({authUser})

  useEffect(() => {
    checkOrganiser()
  }, [checkOrganiser]);
  // console.log(organiser)


  if (isCheckingAuth && !authUser) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            border: '8px solid #f3f3f3',
            borderTop: '8px solid #3498db',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#555' }}>Loading...</p>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/my-events' element={organiser ? <MyEvents/> : <Navigate to='/' /> } />
        <Route path='/add-events' element={organiser ? <AddEvents/> : <Navigate to='/' />}/>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to='/' />}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
