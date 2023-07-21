import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

//Style
const wrapper = {
    width: '80%',
    margin: 'auto',
    paddingTop: '20px',
    paddingBottom: '20px',
}

const newsStyle = {
    display: 'grid',
    gridTemplateColumns: '20% 80%',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '10px',
    boxSizing: 'border-box',
    textAlign: 'left',
}

const newss = {
    backgroundColor: 'white',
    paddingTop: '10px',
    marginTop: '20px'
}




function News() {
    let newsProductList = []
    let newsSaleList = []
    const [newsSale, setNewsSale] = useState([])
    const [newsProduct, setNewsProduct] = useState([])

    const checkShowHR = (index, type) => {
        if (type === "newsProduct") {
            if (index === newsProduct.length) {

            }
            else {
                return (
                    <hr style={{ paddingBottom: '15px', gridColumn: 'span 2' }}></hr>
                )
            }
        }
        else {
            if (index === newsSale.length) {

            }
            else {
                return (
                    <hr style={{ paddingBottom: '15px', gridColumn: 'span 2' }}></hr>
                )
            }
        }


    }



    useEffect(() => {
        axios.get('http://localhost:4000/news')
            .then(response => {
                let res = response.data
                for (let i = 0; i < res.length; i++) {
                    if (res[i].newsType === "newsProduct") {
                        setNewsProduct(current => [...current, res[i]])
                    }
                    else {
                        setNewsSale(current => [...current, res[i]])
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [])


    const check = () => {
        console.log(newsProduct)
    }


    return (
        <div style={wrapper}>
            <h1 >Tin tức</h1>
            <div className='pb-3' style={newss} id='news'>
                <h1 className='title'>Sản phẩm mới</h1>
                {newsProduct.map((news, index) => {
                    let number = 0
                    let d = new Date(news.newsUploadDate)
                    let dnow = new Date(Date.now())
                    d.setHours(0, 0, 0, 0)
                    dnow.setHours(0, 0, 0, 0)
                    let dft = dnow.getTime() - d.getTime()
                    let skipDay = Math.round(dft / (1000 * 3600 * 24))
                    let fulldate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
                    if (news.newsType === "newsProduct") {
                        return (
                            <div style={newsStyle} key={news._id} className='newsProduct'>
                                <Link className="linkNoStyled" to={`/news/${news._id}`}><img style={{ border: '1px solid #D0D0D0', height: '200px', marginRight: '100px' }} alt='' src={news.newsImage}></img></Link>
                                <span style={{ marginLeft: '20px' }}>
                                    <Link className="linkNoStyled" to={`/news/${news._id}`}><h2>{news.newsName}</h2></Link>
                                    <p>{news.newsPreview.slice(0, 530)}</p>
                                </span>
                                <p style={{ gridColumn: '2', fontSize: '13px', textAlign: 'right', color: 'grey' }}>{skipDay < 7 ? (skipDay === 0 ? "Hôm nay" : skipDay + " ngày trước") : fulldate}</p>
                                {checkShowHR(index + 1, news.newsType)}
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                            </div>
                        )
                    }
                })}


                <h1 className='title'>Khuyến mãi</h1>
                {newsSale.map((news, index) => {
                    let d = new Date(news.newsUploadDate)
                    let dnow = new Date(Date.now())
                    d.setHours(0, 0, 0, 0)
                    dnow.setHours(0, 0, 0, 0)
                    let dft = dnow.getTime() - d.getTime()
                    let skipDay = Math.round(dft / (1000 * 3600 * 24))
                    let fulldate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
                    if (news.newsType === "newsSale") {
                        return (
                            <div style={newsStyle} key={news._id} className='newsProduct'>
                                <Link className="linkNoStyled" to={`/news/${news._id}`}><img style={{ border: '1px solid #D0D0D0', height: '200px', marginRight: '100px' }} alt='' src={news.newsImage}></img></Link>
                                <span style={{ marginLeft: '10px' }}>
                                    <h2>{news.newsName}</h2>
                                    <p>{news.newsPreview.slice(0, 530)}</p>
                                </span>
                                <p style={{ gridColumn: '2', fontSize: '13px', textAlign: 'right', color: 'grey' }}>{skipDay < 7 ? (skipDay === 0 ? "Hôm nay" : skipDay + " ngày trước") : fulldate}</p>
                                {checkShowHR(index + 1, news.newsType)}
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>

    )
}

export default News