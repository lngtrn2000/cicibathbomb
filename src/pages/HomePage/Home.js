import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CX from '../../functions/PriceSeparator'
import { noStyled, content, product, productImage, homeSliderStyled } from './HomePageStyle'
import SimpleImageSlider from "react-simple-image-slider";
import useResizeObserver from "use-resize-observer";
const globalData = require('../../datas/global.json');

//Đếm số sao và hiển thị trên thẻ Product
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

//Hàm chia tên Product thành 2 phần để hiển thị theo mục đích (tên tiếng Anh và tiếng Việt)
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

//Hiển thị Slider trên trang Home
const homeSlider = globalData[0].homePage[0].homeSlider


function Home() {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/user')
            .then(response => {
                // console.log(response.data);
                setItems(response.data)
            
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const { ref, width = 1, height = 1 } = useResizeObserver();
    return (
        <div className='roll-out'>
            <div ref={ref} style={homeSliderStyled}>
                <SimpleImageSlider
                    width={width}
                    height={height}
                    images={homeSlider}
                    showNavs={true}
                    showBullets={true}
                    autoPlay={true}
                />
            </div>
            <h1 style={{ marginBottom: '20px', paddingTop: '20px' }}>Trang chủ</h1>
            <div className='wrapper-content' style={content}>
                {items.map((data, index) => (
                    <div key={index} className='product' style={product}>
                        <Link style={noStyled} to={`/product/${data._id}`}><img style={productImage} src={data.img} alt='' />  </Link>
                        <Link style={noStyled} to={`/product/${data._id}`}><h3 className='mx-1' style={{ marginBottom: '15px' }}>{getFirstPartProductName(data.productName)}</h3></Link>
                        <Link style={noStyled} to={`/product/${data._id}`}><p className='mx-1' style={{ fontWeight: 'bold', marginBottom: '15px' }}>{getSecondPartProductName(data.productName)}</p></Link>
                        <div className='row' style={{ color: 'grey', fontSize: '14px', width: '92%', margin: 'auto', padding: '0' }}>
                            {data.comments.length ? <p style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} className='col-5'>{countStar(data)}<img alt='none' style={{ marginRight: '5px', width: '15px' }} src='https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png'></img>{'(' + data.comments.length + ')'}  </p> : <p style={{ fontSize: '10px', textAlign: 'right', alignItems: 'center', justifyContent: 'right', display: 'flex' }} className='col-5'>Chưa có đánh giá</p>}
                            <p className='col-2'>|</p>
                            <p className='col-5' style={{ textAlign: 'left' }}>{data.sold} đã bán</p>
                        </div>
                        <h4 className='mb-3' style={{}}>Giá: {CX(data.price)}</h4>
                        {/* <button className='buttonHoverable' onClick={toggle} style={buttonStyled}>Thêm vào giỏ hàng</button> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home