import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import CX from '../../functions/PriceSeparator'

function OrderedPage() {
    let num = 0
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser);
    const [items, setItems] = useState(null)
    useEffect(() => {
        if (user) {
            axios.post("http://localhost:4000/user/getusercart", user._id).then(response => { setItems(response.data.ordered) })
        }
        else {
            navigate('/sign-in')
        }
    }, [])

    if (items) {
        return (
            <div className="wrapper">
                <h1 className='mb-3'>Đơn hàng đã đặt</h1>
                {/* <button onClick={() => { console.log(items[0].orderlist) }}>test</button> */}
                {items.map((order, index) => (
                    <>
                        <table className='mb-5' width={'80%'} style={{border:'2px solid black' ,backgroundColor: '#fff7f7', margin: 'auto' }}>
                            <tbody>
                                <tr>
                                    <th width={"10%"}></th>
                                    <th width={"30%"}>Tên sản phẩm</th>
                                    <th width={"10%"}>Số lượng</th>
                                    <th width={"20%"}>Đơn giá</th>
                                    <th width={"30%"}>Thành tiền</th>
                                </tr>
                                {order.orderlist.map((cart, index) => (
                                    <tr key={index}>
                                        <td><img style={{ padding: '2px' }} alt="not found" src={cart.image} /></td>
                                        <td>{cart.name}</td>
                                        <td>{cart.quan}</td>
                                        <td>{CX(cart.price)}</td>
                                        <td>{CX(cart.price * cart.quan)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={'4'}>Tổng tiền</td>
                                    <td>{CX(order.price)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={5}><h3 >Thông tin người nhận</h3></td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Tên người nhận</th>
                                    <td colSpan={3}>{order.name}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Điện thoại liên lạc</th>
                                    <td colSpan={3}>{order.phone}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Email</th>
                                    <td colSpan={3}>{order.mail}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Địa chỉ nhận hàng</th>
                                    <td colSpan={3}>{order.address}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Ghi chú</th>
                                    <td colSpan={3}>{order.note}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>

                ))}

            </div>
        )
    }
}

export default OrderedPage