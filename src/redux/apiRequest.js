import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSllice";
import CreateModal from "../functions/modal";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:4000/auth/login", user)
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispatch(loginFailed())
        alert('Tên tài khoản hoặc mật khẩu không đúng')
        navigate("/sign-in")
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    let message = ''
    try {
        await axios.post("http://localhost:4000/auth/register", user)
            .then(res => {
                message = res.data.message;
                dispatch(registerSuccess());
                navigate("/sign-in")
            })
            .catch(err => message = err.response.data.message)

    } catch (error) {
        dispatch(registerFailed());
    }
    return message
}

export const logoutUser = (dispatch) => {
    dispatch(logoutSuccess())
    window.location.reload()
}