import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { content, noStyled, product, productImage, searchPageWrapper } from "./SearchPageStyle"
import CX from '../../functions/PriceSeparator'
import axios from 'axios'

function SearchPage() {
    const [items, setItems] = useState([])
    let { productName } = useParams()

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

    useEffect(() => {
        axios.get(`http://localhost:4000/products/search/${productName}`)
            .then(response => {
                setItems(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [productName])

    if (items.length > 0) {
        return (
            <div style={searchPageWrapper}>
                <h1 style={{ paddingTop: '20px', marginBottom: '20px' }}>Danh mục sản phẩm tìm kiếm theo tên "{productName}"</h1>
                <div style={content}>
                    {items.map(data => (
                        <div key={data._id} className='product' style={product}>
                            <Link style={noStyled} to={`/product/${data._id}`}><img style={productImage} src={data.img} alt='' />  </Link>
                            <Link style={noStyled} to={`/product/${data._id}`}><h3 className='mx-1' style={{ marginBottom: '15px' }}>{getFirstPartProductName(data.productName)}</h3></Link>
                            <Link style={noStyled} to={`/product/${data._id}`}><p className='mx-1' style={{ fontWeight: 'bold', marginBottom: '15px' }}>{getSecondPartProductName(data.productName)}</p></Link>
                            <div className='row' style={{ color: 'grey', fontSize: '14px', width: '92%', margin: 'auto', padding: '0' }}>
                                {data.comments.length ? <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} className='col-5'>{countStar(data)}<img alt='none' style={{ marginRight: '5px', width: '15px' }} src='https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png'></img>{'(' + data.comments.length + ')'}  </p> : <p style={{ fontSize: '10px', textAlign: 'right', alignItems: 'center', justifyContent: 'right', display: 'flex' }} className='col-5'>Chưa có đánh giá</p>}
                                <p className='col-2'>|</p>
                                <p className='col-5' style={{ textAlign: 'left' }}>{data.sold} đã bán</p>
                            </div>
                            <h4 style={{ marginBottom: '15px' }} >Giá: {CX(data.price)}</h4>
                            {/* <button onClick={() => {handleAddCart(data.productName,1,data.price)}} style={buttonStyled}>Thêm vào giỏ hàng</button> */}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={searchPageWrapper}>
                <div style={{ padding: '20px' }}>
                    <h1>Không tìm thấy sản phẩm theo từ khóa "{productName}"</h1>
                </div>
            </div>
        )
    }




}

export default SearchPage