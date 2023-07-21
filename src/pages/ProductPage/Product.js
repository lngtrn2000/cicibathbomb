import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CX from '../../functions/PriceSeparator'
import { wrapper, content, product, productImage, noStyled } from './ProductPageStyle';
import ReactPaginate from 'react-paginate';


function Product() {
    const [items, setItems] = useState([])
    const [sortType, setSortType] = useState('productName')
    const [orderType, setOrderType] = useState('1')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    //Nhận danh sách products từ server
    useEffect(() => {
        axios.get(`http://localhost:4000/products/productspage/${currentPage}/${sortType}/${orderType}`)
            .then(response => {
                // console.log(response.data);
                setItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [sortType, orderType])

    useEffect(() => {
        axios.get('http://localhost:4000/products')
            .then(response => {
                setTotalPage(Math.ceil(response.data.length / 12))
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4000/products/productspage/${currentPage}/${sortType}/${orderType}`)
            .then(response => {
                // console.log(response.data);
                setItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [currentPage])

    const handlePageClick = async (pageNumber) => {
        setCurrentPage(pageNumber.selected + 1)

    }

    const getFirstPartProductName = (name) => {
        let index = name.indexOf("-")
        if (name.includes('-')) {
    
            return name.slice('-', index)
        }
        else {
    
            return (name)
        }
    }
    
    const getSecondPartProductName = (name) => {
        let index = name.indexOf("-")
        if (name.includes('-')) {
            return '(' + name.slice(index + 1) + ' )'
        }
        else {
    
            return (name)
        }
        
    }

    const orderPage = async (sort) => {
        setSortType(sort.split(' ')[0])
        setOrderType(sort.split(' ')[1])
    }

    const countStar = (items) => {
        let starArray = []
        if (items.comments.length) {
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
        else {
            return 0
        }
    }

    return (
        <div className='roll-out' style={wrapper}>
            <h1>Danh mục sản phẩm</h1>
            <div style={{ textAlign: 'left', margin: '10px' }}>
                <label>Sắp xếp : </label>
                <select onChange={(e) => { orderPage(e.target.value) }}>
                    <option value="productName 1" >Theo tên sản phẩm</option>
                    <option value="price 1" >Theo giá tăng dần</option>
                    <option value="price -1" >Theo giá giảm dần </option>
                    <option value="sold 1" >Theo lượt mua tăng dần</option>
                    <option value="sold -1" >Theo lượt mua giảm dần</option>
                </select>
            </div>


            <div style={content}>
                {items.map(data => (
                    <div key={data._id} className='product' style={product}>
                        <Link style={noStyled} to={`/product/${data._id}`}><img style={productImage} src={data.img} alt='' />  </Link>
                        <Link style={noStyled} to={`/product/${data._id}`}><h3 className='mx-1' style={{ marginBottom: '15px' }}>{getFirstPartProductName(data.productName)}</h3></Link>
                        <Link style={noStyled} to={`/product/${data._id}`}><p className='mx-1' style={{ fontWeight: 'bold', marginBottom: '15px' }}>{getSecondPartProductName(data.productName)}</p></Link>
                        <div className='row' style={{color:'grey' ,fontSize: '14px', width: '92%', margin: 'auto', padding: '0' }}>
                            {data.comments.length ? <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} className='col-5'>{countStar(data)}<img alt='none' style={{marginRight:'5px' ,width: '15px' }} src='https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png'></img>{'(' + data.comments.length + ')'}  </p> : <p style={{fontSize:'10px', textAlign: 'right', alignItems: 'center', justifyContent: 'right', display: 'flex' }} className='col-5'>Chưa có đánh giá</p> }
                            <p className='col-2'>|</p>
                            <p className='col-5' style={{ textAlign: 'left' }}>{data.sold} đã bán</p>
                        </div>
                        <h4 style={{ marginBottom: '15px' }} >Giá: {CX(data.price)}</h4>
                        {/* <button onClick={() => {handleAddCart(data.productName,1,data.price)}} style={buttonStyled}>Thêm vào giỏ hàng</button> */}
                    </div>
                ))}
            </div>


            <ReactPaginate
                previousLabel={'Trang trước'}
                nextLabel={'Trang sau'}
                breakLabel={'...'}
                pageCount={totalPage}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='page-item active'
            />
        </div>

    )
}

export default Product