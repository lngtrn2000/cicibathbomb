import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import CX from '../../functions/PriceSeparator'

function AddressPage() {
    var sum = 0
    let blank = []
    let temp = []
    const [items, setItems] = useState([])
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [mail, setMail] = useState(null)
    const [address, setAddress] = useState(null)
    const [note, setNote] = useState('')
    useEffect(() => {
        if (user) {
            axios.post("http://localhost:4000/user/getusercart", user._id).then(response => { setItems(response.data.cart) })
        }
        else {
            navigate('/sign-in')
        }
    }, [])

    const submitOrder = async () => {


        if (name != null && phone != null && mail != null && address != null) {
            await axios.post("http://localhost:4000/user/getusercart", user._id).then(response => { temp = response.data.ordered })
            const myArr = {
                orderlist: items,
                name: name,
                phone: phone,
                mail: mail,
                address: address,
                note: note,
                price : sum
            }
            temp.push(myArr)
            await axios.post(`http://localhost:4000/user/addordered/${user._id}`, temp)
                .then(response => {
                    alert('Đặt hàng thành công')
                    axios.post(`http://localhost:4000/user/addcart/${user._id}`, blank)
                    for(let i=0;i<items.length;i++){
                        axios.post(`http://localhost:4000/products/update/quantity/${items[i].itemsid}`, items[i].quan)
                    }
                    navigate('/ordered')
                })
                .catch(err => console.log(err))
        }
        else{
            alert('Không được bỏ trống')
        }
    }

    return (
        <div className="wrapper">
            <h1 className='mb-3'>Đơn đặt hàng</h1>
            <div style={{ width: '80%', margin: 'auto', minHeight: '520px' }}>
                <h3 style={{ textAlign: 'left' }}>Danh sách sản phẩm</h3>
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
                                <td><input type="number" value={cart.quan} style={{ fontSize: '15px', textAlign: 'center', border: 'none', outline: 'none', backgroundColor: '#fff7f7' }}></input></td>
                                <td>{CX(cart.price)}</td>
                                <td>{CX(cart.price * cart.quan)}</td>
                                <td style={{ display: 'none' }}>{sum += cart.price * cart.quan}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={'4'}>Tổng tiền</td>
                            <td>{CX(sum)}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 style={{ textAlign: 'left' }} className='my-3'>Thông tin người nhận</h3>
                <table width={'100%'} style={{ backgroundColor: '#fff7f7', margin: 'auto' }}>
                    <tbody>
                        <tr>
                            <td>Tên người nhận</td>
                            <td><input onChange={(e) => { setName(e.target.value) }} style={{ width: '100%' }}></input></td>
                        </tr>
                        <tr>
                            <td>Điện thoại liên lạc</td>
                            <td><input onChange={(e) => { setPhone(e.target.value) }} style={{ width: '100%' }}></input></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input onChange={(e) => { setMail(e.target.value) }} style={{ width: '100%' }}></input></td>
                        </tr>
                        <tr>
                            <td>Địa chỉ nhận hàng</td>
                            <td><input onChange={(e) => { setAddress(e.target.value) }} style={{ width: '100%' }}></input></td>
                        </tr>
                        <tr>
                            <td>Ghi chú</td>
                            <td><input onChange={(e) => { setNote(e.target.value) }} style={{ width: '100%' }}></input></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => { submitOrder() }} style={{ width: '20%' }} className='btn btn-success mt-4'>Đặt hàng</button>
            </div>
        </div>
    )
}

export default AddressPage