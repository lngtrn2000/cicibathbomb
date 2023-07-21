// import { AddImage, getBase64 } from "./AdminPageFunction"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { AdminPageStyled } from "./AdminPageStyle"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import useModal from '../../functions/useModal'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'

function AdminPage() {
    //Product's State
    const [items, setItems] = useState([])
    const [newsItems, setNewsItems] = useState([])
    const [userList, setUserList] = useState([])
    const [newProductName, setNewProductName] = useState('')
    // eslint-disable-next-line
    const [newQuantity, setNewQuantity] = useState(27)
    const [newImage, setNewImage] = useState('')
    const [newSlider, setNewSlider] = useState()
    const [newPrice, setNewPrice] = useState(65000)
    const [newWeight, setNewWeight] = useState(222)
    const [newDescription, setNewDescription] = useState('')
    // eslint-disable-next-line
    const [newSold, setNewSold] = useState(Math.floor(Math.random() * 1000))
    // eslint-disable-next-line
    const [newComments, setNewComments] = useState([])
    // eslint-disable-next-line
    const [newEditMode, setNewEditMode] = useState(false)
    //News's state
    const [newsName, setNewsName] = useState('')
    // eslint-disable-next-line
    const [newsLike, setNewsLike] = useState(0)
    const [newsUploadDate, setNewsUploadDate] = useState('')
    const [newsContent, setNewsContent] = useState('')
    const [newsType, setNewsType] = useState('newsProduct')
    const [newsPreview, setNewsPreview] = useState('')
    const [reRender, setReRender] = useState(0)
    const user = useSelector((state) => state.auth.login.currentUser)
    const navigate = useNavigate()

    let selectedSlider = []

    const changeEditMode = (index) => {
        let array = items
        array[index].edit = !array[index].edit
        setItems([...array])
    }

    const submitUpdate = (index, item) => {
        let array = items
        array[index].productName = items[index].productName
        array[index].quantity = items[index].quantity
        array[index].price = items[index].price
        array[index].weight = items[index].weight
        array[index].edit = !array[index].edit
        setItems([...array])
        axios.get(`http://localhost:4000/products/update/${item._id}`, {
            params: {
                productName: items[index].productName,
                quantity: items[index].quantity,
                price: items[index].price,
                weight: items[index].weight
            }
        })
    }

    //Nhận dữ liệu Products từ server khi mount trang web
    useEffect(() => {
        if (user) {
            if (user.admin == true) {
                axios.get('http://localhost:4000/products')
                    .then(response => {
                        // console.log(response.data);
                        setItems(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                axios.get('http://localhost:4000/news')
                    .then(response => {
                        setNewsItems(response.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                axios.get('http://localhost:4000/admin/get-user')
                    .then(response => {
                        setUserList(response.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            else{
                navigate("/sign-in")
            }
            
        }
        else{
            navigate("/sign-in")
        }

    }, [reRender])

    //Post product mới vào server
    const handleSubmit = async () => {
        const refreshPage = (res) => {
            if (res === 'Tên sản phẩm đã tồn tại!') {

            }
            else {
                window.location.reload()
            }
        }

        if (newProductName === '' || newImage === '' || newSlider === undefined) {
            setIsOpenModal(!isOpenModal)
        }
        else {
            const obj = {
                productName: newProductName,
                quantity: newQuantity,
                img: newImage,
                description: newDescription,
                slider: newSlider,
                price: newPrice,
                weight: newWeight,
                sold: newSold,
                comments: newComments,
                edit: newEditMode,
            }
            await axios.post('http://localhost:4000/products/add', obj)
                .then(res => setModalText(res.data.message))
            setIsOpenModal(!isOpenModal)
        }
    }
    const convertType = (type) => {
        if (type === "newsProduct") {
            return "Sản phẩm"
        }
        else return "Khuyến mãi"
    }

    const base64Image = (e) => {
        try {
            console.log(e.target.files)
            const data = new FileReader()
            data.addEventListener('load', () => {
                setNewImage(data.result)
                console.log(data.result)
            })
            data.readAsDataURL(e.target.files[0])
        }

        catch {
            window.location.reload()
        }
    }

    const base64Slider = (e) => {
        // console.log(e.target.files)
        for (let i = 0; i < e.target.files.length; i++) {
            const data = new FileReader()
            data.addEventListener('load', () => {
                selectedSlider.push(data.result);
                setNewSlider(selectedSlider)
            })
            data.readAsDataURL(e.target.files[i])
        }
    }

    //Remove Product and New
    const removeProduct = (item) => {
        axios.get(`http://localhost:4000/products/delete/${item._id}`)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
        setReRender(!reRender)
    }
    const removeNews = (item) => {
        axios.get(`http://localhost:4000/news/delete/${item._id}`)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
        setReRender(!reRender)
    }

    const handleProductNameDynamicChange = ((e, index) => {
        let arr = items
        arr[index].productName = e.target.value
        setItems([...arr])
    }
    )

    const handleQuantityDynamicChange = ((e, index) => {
        let arr = items
        arr[index].quantity = e.target.value
        setItems([...arr])
    }
    )
    const handlePriceDynamicChange = ((e, index) => {
        let arr = items
        arr[index].price = e.target.value
        setItems([...arr])
    }
    )
    const handleWeightDynamicChange = ((e, index) => {
        let arr = items
        arr[index].weight = e.target.value
        setItems([...arr])
    }
    )

    const submitAddNews = () => {
        if (newsName === "" || newsPreview === "" || newsContent === "") {
            setModalText('Không được bỏ trống mục nhập')
            setIsOpenModal(!isOpenModal)
        }
        else {
            let d = new Date();
            // let fulldate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            setNewsUploadDate(d)
        }

    }

    useEffect(() => {
        if (newsUploadDate !== '') {
            let newsObj = {
                newsName: newsName,
                newsImage: newImage,
                newsContent: newsContent,
                newsUploadDate: newsUploadDate,
                newsLikes: newsLike,
                newsType: newsType,
                newsPreview: newsPreview
            }
            axios.post('http://localhost:4000/news/add', newsObj)
                .then(res => setModalText('Tạo bài đăng thành công!'))
                .then(setIsOpenModal(!isOpenModal))
        }
    }, [newsUploadDate])


    //Show Modal
    //Hiện Modal sau khi tạo sản phẩm
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modalText, setModalText] = useState('Không được bỏ trống mục nhập')
    const showModalText = () => {
        return (
            <div>
                <h3 className='mb-3' ref={(_subtitle) => (subtitle = _subtitle)}>{modalText}</h3>
                <button className='btn btn-secondary' onClick={closeModal}>Đóng</button>
            </div>
        )
    }
    const afterOpenModal = () => {
        subtitle.style.color = '#363636';
    }

    const closeModal = () => {
        setIsOpenModal(false);
        if (modalText === "Không được bỏ trống mục nhập" || modalText === "Tên sản phẩm đã tồn tại!") {

        }
        else {
            window.location.reload()
        }
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    let subtitle;
    Modal.setAppElement('body')

    const deleteUser = (id) => {
        axios.post("http://localhost:4000/admin/delete-user", id).then(setReRender(!reRender))
    }


    //Front End
    return (
        <div id="adminPage" style={AdminPageStyled}>
            <div className="wrapper pt-3 pb-5">
                <Tabs>
                    <TabList>
                        <Tab>Tạo sản phẩm</Tab>
                        <Tab>Quản lý sản phẩm</Tab>
                        <Tab>Tạo tin tức</Tab>
                        <Tab>Quản lý tin tức</Tab>
                        <Tab>Quản lý người dùng</Tab>
                    </TabList>
                    {/* Tạo sản phẩm */}
                    <TabPanel>
                        <h1 className="mb-3">Tạo sản phẩm</h1>
                        <div id="addProduct">
                            <table style={{ backgroundColor: '#fff7f7', width: '100%', margin: 'auto', textAlign: 'left' }}>
                                <tbody>
                                    <tr>
                                        <td>Tên sản phẩm </td>
                                        <td><input placeholder="Nhập tên sản phẩm" name="productName" onChange={(e) => {
                                            setNewProductName(e.target.value)
                                        }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%', boxSizing: 'border-box' }}></input></td>
                                        {/* <textarea onChange={(e) => { setNewProductName(e.target.value) }}></textarea> */}
                                    </tr>
                                    <tr>
                                        <td>Hình ảnh</td>
                                        <td style={{ backgroundColor: 'white' }}><input style={{ width: '100%', backgroundColor: '#fff7f7' }} id="select-image" onChange={(e) => { base64Image(e) }} accept="image/*" type="file"></input></td>
                                    </tr>
                                    {newImage && (
                                        <tr>
                                            <td>Hình ảnh đã chọn</td>
                                            <td style={{ textAlign: 'left' }}>
                                                <img onClick={() => { setNewImage(null) }} alt="not found" style={{ width: '140px', border: '1px solid black', margin: '5px' }} src={newImage} />
                                            </td>
                                        </tr>
                                    )
                                    }
                                    <tr>
                                        <td>Slider</td>
                                        <td style={{ backgroundColor: 'white' }}><input style={{ width: '100%', backgroundColor: '#fff7f7', }} type="file" multiple onChange={(e) => { base64Slider(e) }} accept="image/*" />

                                        </td>
                                    </tr>
                                    {newSlider && (
                                        <tr>
                                            <td width={'25%'}>Slider đã chọn</td>
                                            <td style={{ textAlign: 'left' }}>
                                                {newSlider.map((slider, index) => (
                                                    <img style={{ height: '140px', width: '140px', border: '1px solid black', margin: '5px' }} alt="none" key={index} src={slider}></img>
                                                ))}
                                            </td>
                                        </tr>
                                    )
                                    }
                                    <tr>
                                        <td>Mô tả sản phẩm</td>
                                        <td><textarea rows={15} onChange={(e) => { setNewDescription(e.target.value) }} style={{ backgroundColor: '#fff7f7', border: 'none', width: '100%', outline: 'none', resize: 'none' }}></textarea></td>
                                    </tr>
                                    <tr>
                                        <td>Giá tiền</td>
                                        <td><input placeholder="Nhập giá tiền" name="price" onChange={(e) => { setNewPrice(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%', boxSizing: 'border-box' }}></input></td>
                                    </tr>
                                    <tr>
                                        <td>Trọng lượng</td>
                                        <td><input placeholder="Nhập khối lượng sản phẩm" name="weight" onChange={(e) => { setNewWeight(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%', boxSizing: 'border-box' }}></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="mt-3 btn btn-primary" name="id" onClick={(e) => { handleSubmit() }}>Tạo sản phẩm mới</button>
                            {/* Hiện Modal sau khi tạo sản phẩm */}
                            <Modal
                                isOpen={isOpenModal}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                className="Modal"
                                overlayClassName="Overlay"
                            >
                                {showModalText()}
                            </Modal>
                        </div>
                    </TabPanel>
                    {/* Quản lý sản phẩm */}
                    <TabPanel>
                        {items.length > 0 && (
                            <div id="removeProduct">
                                <h1 className="mt-4 mb-4">Thay đổi / Xóa  sản phẩm</h1>
                                <table style={{ backgroundColor: '#fff7f7', margin: 'auto', width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: '6%' }}>STT</th>
                                            <th style={{ width: '30%' }}>Tên sản phẩm</th>
                                            <th style={{ width: '10%' }}>Hình ảnh</th>
                                            <th style={{ width: '30%' }}>Slider</th>
                                            <th style={{ width: '8%' }}>Số lượng</th>
                                            <th style={{ width: '8%' }}>Đơn giá</th>
                                            <th style={{ width: '8%' }}>Trọng lượng</th>
                                            <th colSpan={2}>Thay đổi/Xóa</th>
                                        </tr>
                                        {items.map((item, index) => {
                                            if (item.edit === true) {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><input style={{ width: '90%' }} name="productName" value={item.productName} onChange={(e) => { handleProductNameDynamicChange(e, index) }} type="text" /></td>
                                                        <td style={{ padding: '5px' }} ><img alt="none" style={{ width: '100%' }} src={item.img} /></td>
                                                        <td style={{ textAlign: 'left', padding: '5px' }}>{item.slider.map((slide, index) => (
                                                            <img alt="none" style={{ width: '20%' }} src={slide} key={index} />
                                                        ))}</td>
                                                        <td><input value={item.quantity} onChange={(e) => { handleQuantityDynamicChange(e, index) }} style={{ width: '90%' }} type="text" /></td>
                                                        <td><input value={item.price} onChange={(e) => { handlePriceDynamicChange(e, index) }} style={{ width: '90%' }} type="text" /></td>
                                                        <td><input value={item.weight} onChange={(e) => { handleWeightDynamicChange(e, index) }} style={{ width: '90%' }} type="text" /></td>
                                                        <td><button className="btn btn-success" onClick={() => { submitUpdate(index, item) }} >Submit</button></td>
                                                        <td><button className="btn btn-danger" onClick={() => { removeProduct(item) }}>Remove</button></td>
                                                    </tr>
                                                )
                                            }
                                            else {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td ><h5>{item.productName}</h5></td>
                                                        <td style={{ padding: '5px' }} ><img alt="none" style={{ width: '100%' }} src={item.img} /></td>
                                                        <td style={{ textAlign: 'left', padding: '5px' }}>{item.slider.map((slide, index) => (
                                                            <img alt="none" style={{ width: '20%' }} src={slide} key={index} />
                                                        ))}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.weight}</td>
                                                        <td style={{ padding: '5px' }}><button className="btn btn-warning" onClick={() => { changeEditMode(index) }} >Change</button></td>
                                                        <td style={{ padding: '5px' }}><button className="btn btn-danger" onClick={() => { removeProduct(item) }}>Remove</button></td>
                                                    </tr>
                                                )
                                            }

                                        })}



                                    </tbody>
                                </table>



                            </div>
                        )}
                    </TabPanel>
                    {/* Tạo bài tin tức */}
                    <TabPanel>
                        <h1 className="mb-3">Tạo bài tin tức</h1>
                        <div id="addNews">
                            <table style={{ backgroundColor: '#fff7f7', width: '100%', margin: 'auto' }}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: '20%' }}>Phân loại</th>
                                        <td>
                                            <select onChange={(e) => { setNewsType(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%' }}>
                                                <option value="newsProduct">Sản phẩm mới</option>
                                                <option value="newsSale">Khuyến mãi</option>
                                            </select>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Tên bài đăng</th>
                                        <td><input placeholder="Nhập tên bài đăng" onChange={(e) => { setNewsName(e.target.value) }} style={{ outline: 'none', border: 'none', backgroundColor: '#fff7f7', width: '100%' }} type='text' /></td>
                                    </tr>

                                    <tr>
                                        <th>Hình ảnh</th>
                                        <td style={{ textAlign: 'left' }}><input onChange={(e) => { base64Image(e) }} type='file' /></td>
                                    </tr>
                                    {newImage && (
                                        <tr>
                                            <th>Hình ảnh đã chọn</th>
                                            <td style={{ textAlign: 'left' }}><img alt='none' style={{ width: '150px' }} src={newImage} /></td>
                                        </tr>
                                    )}

                                    <tr>
                                        <th>Nội dung xem trước</th>
                                        <td><textarea maxLength={530} placeholder='Nhập nội dung cho phần xem trước' rows={5} onChange={(e) => { setNewsPreview(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%' }}></textarea></td>
                                    </tr>

                                    <tr>
                                        <th>Nội dung</th>
                                        <td><textarea placeholder='Nhập nội dung bài viết' onChange={(e) => { setNewsContent(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%' }} rows={20}></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={() => { submitAddNews() }} className='mt-4 btn btn-primary'>Tạo bài đăng</button>
                            <Modal
                                isOpen={isOpenModal}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                className="Modal"
                                overlayClassName="Overlay"
                            >
                                {showModalText()}
                            </Modal>
                        </div>
                    </TabPanel>
                    {/* Quản lý tin tức */}
                    <TabPanel>
                        <h1 className='mt-4 mb-4' >Quản lý tin tức</h1>
                        {newsItems.length > 0 && (
                            <table style={{ margin: 'auto', backgroundColor: '#fff7f7', }}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: '5%' }}>STT</th>
                                        <th style={{ width: '10%' }}>Phân loại</th>
                                        <th style={{ width: '20%' }}>Tên bài đăng</th>
                                        <th style={{ width: '10%' }}>Hình ảnh</th>
                                        <th style={{ width: '45%' }}>Nội dung xem trước</th>
                                        <th style={{ width: '10%', }} colSpan={2}>Thay đổi/Xóa</th>
                                    </tr>
                                    {newsItems.map((news, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{convertType(news.newsType)}</td>
                                            <td>{news.newsName}</td>
                                            <td><img style={{ width: '150px', height: '150px' }} alt='none' src={news.newsImage} /></td>
                                            <td style={{ paddingLeft: '5px', textAlign: 'left' }}>{news.newsPreview}</td>
                                            {/* <td>{news.newsContent.slice(0,50)}</td> */}
                                            <td style={{ padding: '5px' }}><Link to={`/update-news/${news._id}`}><button className='btn btn-warning'>Change</button></Link></td>
                                            <td style={{ padding: '5px' }}><button onClick={() => { removeNews(news) }} className='btn btn-danger'>Remove</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </TabPanel>
                    {/* Quản lý người dùng */}
                    <TabPanel>
                        <h1 className='mt-4 mb-4' >Quản lý người dùng</h1>
                        {userList.length > 0 && (
                            <table style={{ margin: 'auto', width: '100%', backgroundColor: '#fff7f7', }}>
                                <tbody>
                                    <tr>
                                        <th width='45%'>Tên người dùng</th>
                                        <th width='45%'>Quyền hạn</th>
                                        <th width='10%'>Xóa người dùng</th>
                                    </tr>
                                    {userList.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.admin == false ? "Người dùng" : "Quản trị viên"}</td>
                                            <td style={{ padding: '5px' }}>{user.admin == false ? <button onClick={() => { deleteUser(user._id) }} style={{ width: '100%' }} className='btn btn-danger'>Xóa</button> : <button onClick={() => { deleteUser(user._id) }} style={{ width: '100%' }} disabled className='btn btn-danger'>Xóa</button>} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </TabPanel>
                </Tabs>

            </div>
        </div >
    )
}

export default AdminPage