// import { Link } from "react-router-dom"
const accountData = require('../../datas/customerAccount.json')
let checkAccount = false
export function HandleLogin(name, password) {
    // if(name === 'lngtrn2000'){
    //     if(password === '123456'){

    //         alert('Login Success')
    //         return (
    //             <Link to ="/"></Link>
    //         )
    //     }
    //     else{

    //         alert('wrong password')
    //         return false
    //     }
    // }
    // else{

    //     alert('wrong password')
    //     return false
    // }

    for (let i = 0; i < accountData.length; i++) {
        if (name === accountData[i].username) {
            if (password === accountData[i].password) {
                checkAccount = true

            }

        }
    }
    console.log(checkAccount)
    if (checkAccount === true) {
        alert('Login Success');
        checkAccount = false
    }
    else { alert('Wrong password') }
}