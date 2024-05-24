import { useState } from 'react'
import './register.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const { name, username, email, phone, password } = data;
    if(!name || !username || !email || !phone || !password) {
      return toast.error('Please fill all fields')
    }
    if(password.length < 6) {
      return toast.error('Password must be at least 6 characters')
    }
    if(password !== data.confirmPassword) {
      return toast.error('Passwords do not match')
    }
    try {
      const response = await axios.post('/register', {
        name,
        username,
        email,
        phone,
        password
      });
      console.log(response)
      if(response.status === 201) {
        navigate('/login')
        
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    }
    console.log("rwe")
  }

  return (
    <div>
      <h3 className='heading'>Register a New Account</h3>
      <form onSubmit={registerUser} className='signup'>
        <label >Full Name</label>
        <input type="text" placeholder='Enter Full Name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <label >Create a username</label>
        <input type="text" placeholder='Enter username' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
        <label >Email</label>
        <input type="email" placeholder='Enter Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <label >Phone Number</label>
        <input type="text" placeholder='Enter Phone Number' value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        <label >Password</label>
        <input type="password" placeholder='Enter password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <label >Confirm Password</label>
        <input type="password" placeholder='Confirm password' value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
