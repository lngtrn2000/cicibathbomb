import { useEffect, useState } from "react"
import CX from '../../functions/PriceSeparator'
import { removeItemFromCart, handleEditNumber } from "./CartPageFunction"
import { alignRight, cartAction } from "./CartPageStyle"
import { useSelector } from "react-redux"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

var blank = []

function CartPage() {
    let checkList = []
    const navigate = useNavigate()
    var sum = 0
    const [items, setItems] = useState([])
    const user = useSelector((state) => state.auth.login.currentUser);
    useEffect(() => {
        if (user) {
            axios.post("http://localhost:4000/user/getusercart", user._id).then(response => { setItems(response.data.cart) })
        }
        else {
            navigate('/sign-in')
        }
    }, [])

    const clearCart = async () => {
        try {
            await axios.post(`http://localhost:4000/user/addcart/${user._id}`, blank)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const goToAddressPage = async () => {
        for (let i = 0; i < items.length; i++) {
            await axios.post("http://localhost:4000/products/find", items[i].itemsid).then(response => { if (items[i].quan > response.data.quantity) { checkList.push(response.data.productName) } })
        }
        if (checkList.length > 0) {
            alert(checkList.join('\n') + '\nĐã hết hàng')
            checkList = []
        }
        else {
            navigate('address')
        }

    }

    if (items.length !== 0) {
        return (
            <div>
                {/* <button onClick={() => { console.log(checkList) }}>Test</button> */}
                <div style={{ width: '60%', margin: 'auto', minHeight: '520px', padding: '20px' }}>
                    <h1 style={{ marginBottom: '10px' }}>Giỏ hàng</h1>
                    <table width={'100%'} style={{ backgroundColor: '#fff7f7', margin: 'auto' }}>
                        <tbody>
                            <tr>
                                <td width={"10%"}></td>
                                <th width={"30%"}>Tên sản phẩm</th>
                                <th width={"10%"}>Số lượng</th>
                                <th width={"20%"}>Đơn giá</th>
                                <th width={"30%"}>Thành tiền</th>
                            </tr>
                            {items.map((cart, index) => (
                                <tr key={index}>
                                    <td><img style={{ padding: '2px' }} alt="not found" src={cart.image} /></td>
                                    <td>{cart.name}</td>
                                    <td><input onChange={(e) => { setItems([...handleEditNumber(items, cart.name, e.target.value, user._id)]) }} type="number" value={cart.quan} style={{ fontSize: '15px', textAlign: 'center', border: 'none', outline: 'none', backgroundColor: '#fff7f7' }}></input></td>
                                    <td>{CX(cart.price)}</td>
                                    <td>{CX(cart.price * cart.quan)}</td>
                                    <td><button className="transparentButton" onClick={() => { setItems([...removeItemFromCart(items, cart, user._id)]) }}>X</button></td>
                                    <td style={{ display: 'none' }}>{sum += cart.price * cart.quan}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={'4'}>Tổng tiền</td>
                                <td>{CX(sum)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="cart-action" style={cartAction}>
                        <div style={{ textAlign: 'left' }}>

                            <button onClick={() => { clearCart() }} className="btn btn-danger">Xóa tất cả</button>
                        </div>
                        <div style={alignRight}>
                            <button onClick={() => { goToAddressPage() }} className="btn btn-success">Tiếp theo</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{ minHeight: '520px', padding: '20px' }}>
                <h1 style={{ marginBottom: '10px' }}>Giỏ hàng</h1>
                <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
            </div>
        )
    }



}

export default CartPage