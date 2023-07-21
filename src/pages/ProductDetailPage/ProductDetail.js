import ScrollToTop from '../../functions/ScrollToTop'
import { useState, useEffect } from 'react'
import { handleQuantity } from './ProductDetailFunction'
import { useParams } from "react-router-dom"
import CX from '../../functions/PriceSeparator'
import SimpleImageSlider from "react-simple-image-slider";
import axios from 'axios'
import Modal from 'react-modal'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const wrapper = {
    width: '80%',
    margin: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
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


const colLeft = {
    // border: '1px solid black',
    boxSizing: 'borderBox',
}

const colRight = {
    // border: '1px solid black',
    textAlign: 'left',
    boxSizing: 'borderBox',
    // marginTop: '-10px',
    marginLeft: '20px',
    marginRight: '20px'
}

const product = {
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: '40% 60%',
}

const inline = {
    display: 'grid',
    gridTemplateColumns: '25% 5% 25% 5% 25%',

}


//Comment
const comment = {
    backgroundColor: 'white',
    marginTop: '20px',
    textAlign: 'left',
    padding: '10px',
}





function ProductDetail() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser);
    const [items, setItems] = useState(null)
    const [quan, setQuan] = useState(1)
    const { productId } = useParams()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modalText, setModalText] = useState('Đã thêm vào giỏ hàng')
    const [commentObj, setCommentObj] = useState({
        commentId: user ? user._id : null,
        commentName: user ? user.username : 'Ẩn danh',
        commentText: '',
        commentStar: 5,
        commentUploadDate: new Date(Date.now()),
        commentLiked: 0
    })
    const [reRender, setReRender] = useState(0)

    let tempComments = []
    let subtitle;
    Modal.setAppElement('body')

    const afterOpenModal = () => {
        subtitle.style.color = '#363636';
    }

    const closeModal = () => {
        setIsOpenModal(false);
        if (modalText === "Không được bỏ trống nội dung") {

        }
        else {
            window.location.reload()
        }
    }

    const checkShowHR = (index) => {
        if (index === items.comments.length) {

        }
        else {
            return (
                <hr></hr>
            )
        }
    }



    async function handleAddCart(name, quan, price, image, itemsid) {
        if (user) {
            const id = user._id
            var myArr = []
            await axios.post("http://localhost:4000/user/getusercart", id).then(response => { myArr = response.data.cart })
            var temp = null
            const index = myArr.findIndex(object => object.name === name)
            if (index === -1) {
                temp = { itemsid, name, quan, price, image }
                myArr.push(temp)
                console.log(myArr)
                await axios.post(`http://localhost:4000/user/addcart/${id}`, myArr)
                setModalText('Đã thêm "' + name + '" vào giỏ hàng')
                setIsOpenModal(true)
            }
            else {
                setModalText('Bạn đã thêm sản phẩm này vào giỏ hàng rồi!')
                setIsOpenModal(true)
            }
        }
        else {
            alert('Bạn chưa đăng nhập')
            navigate('/sign-in')
        }

    }

    const submitPostComment = () => {
        if (commentObj.commentText === "") {
            setModalText('Không được bỏ trống nội dung')
            setIsOpenModal(!isOpenModal)
        }
        else {
            tempComments = items.comments
            tempComments.push(commentObj)
            axios.get(`http://localhost:4000/products/updatecomments/${productId}`, {
                params: {
                    comments: tempComments
                }
            })
                .then(
                    setModalText('Đăng bình luận thành công'),
                    setIsOpenModal(!isOpenModal),

                )
                .catch(function (err) {
                    console.log(err)
                })
        }
    }

    const showModalText = () => {
        return (
            <div>
                <h3 className='mb-3' ref={(_subtitle) => (subtitle = _subtitle)}>{modalText}</h3>
                <button className='btn btn-secondary' onClick={closeModal}>Đóng</button>
            </div>
        )
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/products/detail/${productId}`)
            .then(response => {
                console.log(response.data);
                setItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [reRender])

    const showStar = (star) => {
        let showStar = []
        for (let i = 0; i < star; i++) {
            showStar.push(<img alt='none' key={i} style={{ width: '30px' }} src='https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png'></img>)
        }
        return (showStar)
    }

    const countStar = () => {
        let starArray = []
        for (let i = 0; i < items.comments.length; i++) {
            starArray.push(items.comments[i].commentStar)
        }
        let total = 0
        let average = 0
        for (let i = 0; i < starArray.length; i++) {
            total = total + parseInt(starArray[i])
        }
        average = total / starArray.length
        return (Math.round(average * 100) / 100)
    }

    const getUploadDate = (uploadDate) => {
        let d = new Date(uploadDate)
        let fulldate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
        return (fulldate)
    }

    const updateLikedComment = (index) => {
        let tempComment = items.comments
        tempComment[index].commentLiked = parseInt(tempComment[index].commentLiked) + 1
        axios.get(`http://localhost:4000/products/updatecomments/${productId}`, {
            params: {
                comments: tempComment
            }
        }).then(setReRender(!reRender))
    }

    const removeComment = (index) => {
        let tempComment = items.comments
        tempComment.splice(index, 1)
        if (tempComment == null) {
            tempComment = []
        }
        console.log(tempComment)
        axios.get(`http://localhost:4000/products/updatecomments/${productId}`, {
            params: {
                comments: tempComment
            }
        }).then(setReRender(!reRender))
    }

    return (
        <div id="wrapper" style={wrapper}>
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
            {items && <div>
                <div style={product} className='product-detailt'>
                    <div style={colLeft} className='col-left'>

                        <SimpleImageSlider
                            style={{ margin: '10px' }}
                            width={480}
                            height={500}
                            images={items.slider}
                            showNavs={true}
                            showBullets={true}
                        />
                    </div>

                    <div style={colRight} className='col-right'>

                        <h2 className='mt-3'>{items.productName}</h2>
                        <hr></hr>
                        <div style={inline} id='p-inline'>
                            <p>{items.comments.length ? 'Rating : ' + countStar() : 'Chưa có đánh giá'}</p>
                            <p style={{ color: '#e3e3e3' }}>|</p>
                            <p>Đánh giá: {items.comments.length}</p>
                            <p style={{ color: '#e3e3e3' }}>|</p    >
                            <p>Đã bán: {items.sold}</p>
                        </div>
                        <p style={{ fontSize: '18px' }}>Giá: <span style={{ color: '#B12704', fontWeight: 'bold' }}>{CX(items.price)}</span></p>

                        <div className='mb-2' style={{ display: 'grid', gridTemplateColumns: '12% 10% 20%' }}>
                            <p className='d-flex align-items-center' style={{ height: '100%' }}>Số lượng: </p>
                            <input style={{ textAlign: 'center', height: '100%', margin: 'auto', width: '60%' }} value={quan} onChange={(e) => setQuan(handleQuantity(e.target.value, items.quantity))} type='number'></input>
                            {items.quantity > 0 &&
                                <div >
                                    <button id='showModal' className='button-4' onClick={() => { handleAddCart(items.productName, quan, items.price, items.img, items._id) }} style={{ margin: 'auto', height: '100%' }} children='Thêm vào giỏ hàng' />

                                </div>
                            }
                            {items.quantity < 1 &&
                                <button disabled className='button-4-disabled' onClick={(e) => { e.preventDefault() }} style={{ margin: 'auto', height: '100%' }} children='Sản phẩm đã bán hết' />
                            }
                        </div>
                        <p>Trọng lượng: {items.weight}g / bomb</p>
                        {/* <p style={{ textAlign: 'justify' }}>{des}</p> */}
                    </div>
                    <div style={{ textAlign: 'justify', margin: '10px', gridColumn: 'span 2' }} id='about'>
                        <h2 style={{ paddingLeft: '10px', backgroundColor: '#F7F7F7' }}>Mô tả sản phẩm</h2>
                        <p style={{ marginLeft: '15px' }} className='linebreak' >{items.description}</p>
                    </div>
                </div>

                <div style={comment} id='comment'>
                    <h2 style={{ marginBottom: '10px', paddingLeft: '10px', backgroundColor: '#F7F7F7' }}>Đánh giá sản phẩm</h2>
                    <div className='mx-4' id='comment-content'>
                        <div id='comment-form' className='row'>
                            <input onChange={(e) => { setCommentObj({ ...commentObj, commentName: e.target.value }) }} className='mb-2 col-10' style={{ outline: 'none' }} value={user ? user.username : "Ẩn danh"} disabled></input>
                            <div className='col-2' style={{ height: '30px', textAlign: 'right' }}>
                                <label style={{}}>Số sao :</label>
                                <select onChange={(e) => { setCommentObj({ ...commentObj, commentStar: e.target.value }) }} style={{ height: '100%' }}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option selected >5</option>
                                </select>
                            </div>
                            <textarea className='col-12' maxLength={600} placeholder='Nhập đánh giá của bạn' onChange={(e) => { setCommentObj({ ...commentObj, commentText: e.target.value }) }} rows={5} style={{ resize: 'none', width: '100%', outline: 'none', padding: '5px' }}></textarea>
                            <button onClick={() => { submitPostComment() }} className='btn btn-primary col-12 mt-2'>Đăng bình luận</button>
                        </div>

                        {items.comments.map((cmt, index) => (
                            <div key={index}>
                                <div className='row'>
                                    <h4 className='col mt-4'>{cmt.commentName}</h4>
                                    {user?.admin === true ? <button onClick={() => { removeComment(index) }} style={{ fontSize: '12px', color: 'grey', textAlign: 'right', backgroundColor: 'transparent', outline: 'none', border: 'none' }} className='col'>X</button> : cmt.commentId === user?._id ? <button onClick={() => { removeComment(index) }} style={{ fontSize: '12px', color: 'grey', textAlign: 'right', backgroundColor: 'transparent', outline: 'none', border: 'none' }} className='col'>X</button> : ""}

                                </div>

                                <div className='row' style={{ marginLeft: '15px' }}>
                                    <p className='col-12 mt-2'>{showStar(cmt.commentStar)}</p>
                                    <p className='col-12' style={{}}>{cmt.commentText}</p>
                                    <p className='col'><button onClick={() => { updateLikedComment(index) }} className='btn btn-danger'><FaHeart /> {cmt.commentLiked}</button></p>
                                    <p className='col ' style={{ color: 'grey', fontSize: '14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'right' }}>Ngày đăng : {getUploadDate(cmt.commentUploadDate)}</p>
                                </div>
                                {checkShowHR(index + 1)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
            <ScrollToTop />
        </div>
    )
}

export default ProductDetail