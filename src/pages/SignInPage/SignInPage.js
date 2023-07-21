import { signIn, loginForm, wrapper } from "./SignInPageStyle"
// import { HandleLogin } from "./SignInFunction"
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { loginUser } from "../../redux/apiRequest"
import { useDispatch } from "react-redux"

function SignInPage() {
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const obj = {
        username: name,
        password: password
    }
    //Function
    const handleLogin = () => {
        loginUser(obj, dispatch, navigate)
    }
    return (
        <div id="sign-in" style={signIn}>
            <h1 style={{ marginBottom: '-50px' }}>Đăng nhập</h1>
            <div style={wrapper}>
                <h1 style={{ marginBottom: '20px', textAlign: 'left' }}>Xin chào{name ? ', ' + name : ''} </h1>
                <div id="login-form" style={loginForm}>
                    <input
                        id="account-name"
                        placeholder="Tên tài khoản"
                        style={{ height: '30px', marginBottom: '10px', gridColumn: 'span 2' }}
                        onChange={(e) => { setName(e.target.value) }}>
                    </input>
                    <input
                        id="password"
                        placeholder="Mật khẩu"
                        type="password"
                        style={{ height: '30px', gridColumn: 'span 2' }}
                        onChange={(e) => { setPassword(e.target.value) }}>
                    </input>
                    <Link to="/sign-up" style={{ marginTop: '10px', textDecoration: 'none', color: 'green' }}><span>Tạo tài khoản</span></Link>
                    <Link to="/" style={{ textAlign: 'right', marginTop: '10px', textDecoration: 'none', color: 'green' }}><span>Quên mật khẩu</span></Link>
                    <button className="btn btn-success" onClick={() => { handleLogin() }} style={{ marginTop: '10px', padding: '10px', fontWeight: 'bold', backgroundColor: '#326e51', color: 'white', fontSize: '15px', gridColumn: 'span 2' }}>Đăng nhập</button>
                </div>
            </div>
        </div>
    )
}

export default SignInPage