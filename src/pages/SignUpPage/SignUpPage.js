import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { registerUser } from "../../redux/apiRequest"
import { useDispatch } from "react-redux"

function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Function
    const createNewUser = async () => {
        const newUser = {
            username: username,
            password: password
        }
        const message = await registerUser(newUser, dispatch, navigate)
        alert(message)

    }

    return (
        <div className="wrapper" style={{ width: '30%' }}>
            <h1>Đăng Ký</h1>
            <div className="content" style={{ marginTop: '20px' }}>
                <table style={{ width: '100%', margin: 'auto', textAlign: 'left' }}>
                    <tbody>
                        <tr>
                            <th>Tên tài khoản</th>
                            <td><input
                                onChange={(e) => { setUsername(e.target.value) }}
                                style={{ width: '100%' }} />
                            </td>
                        </tr>
                        <tr>
                            <th>Mật khẩu</th>
                            <td><input
                                onChange={(e) => { setPassword(e.target.value) }}
                                style={{ width: '100%' }}
                                type="password" /></td>
                        </tr>

                    </tbody>
                </table>
                
            </div>
            <button
                    className="btn btn-primary my-3"
                    onClick={() => { createNewUser() }}
                    style={{ width: '30%' }}>Tạo tài khoản</button>
        </div>
    )
}

export default SignUpPage