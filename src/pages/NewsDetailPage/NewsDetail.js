import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'

function NewsDetail() {
    const [news, setNews] = useState()
    const { newsId } = useParams()
    const [forceUpdate, setForceUpdate] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:4000/news/${newsId}`)
            .then(response => {
                setNews(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [forceUpdate])

    const getUploadDate = () => {
        let d = new Date(news.newsUploadDate)
        let fulldate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
        return fulldate
    }

    const updateLikes = () => {
        let like = news.newsLikes + 1
        axios.get(`http://localhost:4000/news/updatelikes/${newsId}`, {
            params: {
                likes: like
            }
        }).then(
            setForceUpdate(!forceUpdate)
        )

    }

    return (
        <div className='wrapper'>
            {news && (
                <div style={{ backgroundColor: 'white' }}>
                    <div id='newsDetailContent' style={{ textAlign: 'left', padding: '10px' }}>
                        <div style={{ marginBottom: '10px' }} id='newsDetailContentHeader'>
                            <h2>{news.newsName}</h2>
                            <button  onClick={() => { updateLikes() }} className='d-inline d-flex flex-row-reverse btn btn-primary'>Like : {news.newsLikes}</button>
                        </div>
                        <img alt='none' style={{ display: 'block', margin: 'auto', width: '100%', height: '500px' }} src={news.newsImage}></img>
                        <p style={{marginTop:'10px'}}>{news.newsContent}</p>
                        <p style={{ textAlign: 'right', color: 'grey' }}>Ngày đăng : {getUploadDate()}</p>
                    </div>
                </div>
            )}
        </div>
    )
}   

export default NewsDetail