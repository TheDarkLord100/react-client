import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Register from './pages/register/register'
import Navbar from './components/navbar'
import Login from './pages/login/login'
import Buyer from './pages/buyer/buyer'
import SellerProfile from './pages/seller/seller'
import PropertyForm from './components/form/form'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authContext'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <AuthProvider>
    <div className='app'>
        <Navbar />
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/seller" element={<SellerProfile />} />
          <Route path="/add-property/:id" element={<PropertyForm />} />
          <Route path="/add-property" element={<PropertyForm />} />
        </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
