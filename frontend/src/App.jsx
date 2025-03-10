import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

import { Toaster } from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore"

const App = () => {
  const { authUser, checkAuth } = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
    checkAuth(userInfo)
  }, [checkAuth])


  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage />: <Navigate to='/login' />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App