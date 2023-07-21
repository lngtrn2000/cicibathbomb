import { useState, useEffect } from 'react'

import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import Modal from 'react-modal'

function UpdateNewsPage() {
    const navigate = useNavigate()
    const getNewsId = useParams()
    const newsId = getNewsId.id
    const [newsType, setNewsType] = useState('')
    const [newsName, setNewsName] = useState('')
    const [newsPreview, setNewsPreview] = useState('')
    const [newsContent, setNewsContent] = useState('')

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modalText, setModalText] = useState('Đã thêm vào giỏ hàng')
    let subtitle;
    Modal.setAppElement('body')

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

    const afterOpenModal = () => {
        subtitle.style.color = '#363636';
    }

    const closeModal = () => {
        setIsOpenModal(false);
        navigate('/admin', { state : 1})
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
        axios.get(`http://localhost:4000/news/${newsId}`)
            .then(response => {
                setNewsType(response.data.newsType)
                setNewsName(response.data.newsName)
                setNewsPreview(response.data.newsPreview)
                setNewsContent(response.data.newsContent)
            })
    }, [])


    const submitUpdateNews = () => {
        axios.get(`http://localhost:4000/news/update/${newsId}`, {
            params: {
                newsType: newsType,
                newsName: newsName,
                newsPreview: newsPreview,
                newsContent: newsContent
            }
        }).then(
            setModalText('Cập nhật thành công'),
            setIsOpenModal(true)
        )
    }
    return (
        <div>
            {newsType !== '' && (
                <div className='wrapper'>
                    <h1 className="mb-3">Thay đổi bài đăng</h1>
                    <div id="addNews">
                        <table style={{ backgroundColor: '#fff7f7', width: '100%', margin: 'auto' }}>
                            <tbody>
                                <tr>
                                    <th style={{ width: '20%' }}>Phân loại</th>
                                    <td>
                                        <select defaultValue={newsType} onChange={(e) => { setNewsType(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%' }}>
                                            <option value="newsProduct">Sản phẩm mới</option>
                                            <option value="newsSale">Khuyến mãi</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>Tên bài đăng</th>
                                    <td><input value={newsName} placeholder="Nhập tên bài đăng" onChange={(e) => { setNewsName(e.target.value) }} style={{ outline: 'none', border: 'none', backgroundColor: '#fff7f7', width: '100%' }} type='text' /></td>
                                </tr>

                                <tr>
                                    <th>Nội dung xem trước</th>
                                    <td><textarea value={newsPreview} maxLength={530} placeholder='Nhập nội dung cho phần xem trước' rows={5} onChange={(e) => { setNewsPreview(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%' }}></textarea></td>
                                </tr>

                                <tr>
                                    <th>Nội dung</th>
                                    <td><textarea value={newsContent} placeholder='Nhập nội dung bài viết' onChange={(e) => { setNewsContent(e.target.value) }} style={{ border: 'none', outline: 'none', backgroundColor: '#fff7f7', width: '100%' }} rows={20}></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={() => { submitUpdateNews() }} className='mt-4 btn btn-primary'>Tạo bài đăng</button>
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
                </div>
            )}
        </div>
    )
}
export default UpdateNewsPage