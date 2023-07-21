import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import CX from '../../functions/PriceSeparator'


function AdminOrderedPage() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userList, setUserList] = useState(null)
    useEffect(() => {
        if(user){
            if(user.admin == true){
                axios.get('http://localhost:4000/admin/get-user')
                    .then(response => {
                        let temp = response.data
                        const result = temp.filter(item => !(item.admin) === true)
                        const result2 = temp.filter(item => (item.ordered.length > 0))
                        setUserList(result2)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            else{
                navigate('/')
            }
        }
        else{
            navigate('/sign-in')
        }
    })

    return(
        <div className='wrapper'>
            <h1 className='mb-3'>Quản lý đơn hàng</h1>
            {/* <button onClick={() => {console.log(userList)}}>TEst</button> */}
            {userList?.map((user, index) => (
                <div className='mb-5' style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' ,paddingTop:'10px',paddingBottom:'2px',backgroundColor:'white'}} key={index}>
                    <h2 className='mb-3'>{user.username}</h2>
                    {user.ordered.map((order, index) => (
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
                    ))}
                </div>
            ))}
        </div>
    )

}

export default AdminOrderedPage