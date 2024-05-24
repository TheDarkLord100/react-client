import { useState, useContext } from 'react'
import './login.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const { logIn } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(0)

    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password } = data;
        try {
            const response = await axios.post('/login', {
                email,
                password});
            if(response.status === 200) {
                console.log(response.data.data)
                toast.success('Logged in successfully')
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.data._id)
                localStorage.setItem('name', response.data.data.name)
                localStorage.setItem('email', response.data.data.email)
                localStorage.setItem('phone', response.data.data.phone)
                localStorage.setItem('username', response.data.data.username)
                localStorage.setItem('role', selectedTab === 0 ? 'buyer' : 'seller')
                logIn(response.data.token, selectedTab === 0 ? 'buyer' : 'seller')
                if(selectedTab === 0) {
                    navigate('/buyer')
                } else {
                    navigate('/seller')
                }
            }
        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error.response.data.error)
        }
        console.log(`Logging in as ${selectedTab === 0 ? 'Buyer' : 'Seller'}`)
    }

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue)
    }

    return (
        <div className="container">
            <h3 className='heading'>Log in to Existing Account</h3>
            <div className='tabs'>
                <div 
                    className={`tab ${selectedTab === 0 ? 'active' : ''}`} 
                    onClick={() => handleTabChange(0)}
                >
                    Buyer
                </div>
                <div 
                    className={`tab ${selectedTab === 1 ? 'active' : ''}`} 
                    onClick={() => handleTabChange(1)}
                >
                    Seller
                </div>
            </div>
            <form onSubmit={loginUser} className='login'>
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder='Enter Email' 
                    value={data.email} 
                    onChange={(e) => setData({ ...data, email: e.target.value })} 
                />
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder='Enter password' 
                    value={data.password} 
                    onChange={(e) => setData({ ...data, password: e.target.value })} 
                />
                <button type="submit">
                    Login as {selectedTab === 0 ? 'Buyer' : 'Seller'}
                </button>
            </form>
        </div>
    )
}
