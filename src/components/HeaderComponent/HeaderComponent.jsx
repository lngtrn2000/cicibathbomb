import brandLogo from './brand-logo.jpg'
import "./HeaderComponent.css"
import { navCenterLink, linkStyle, navBar, header } from './HeaderComponentStyle'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiRequest';

function HeaderComponent() {
  const [searchText, setSearchText] = useState()
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = () => {
    navigate(`/search/${searchText}`)
  }
  const logout = () => {
    logoutUser(dispatch)
  }
  return (
    // <div id="wrapper-header" style={header}>
    //   <div id='nav' className='d-flex justify-content-between align-items-center mx-auto fill' style={navBar}>
    //     <div className='flex-fill text-start' >
    //       <img id='logo' alt='' src={brandLogo} />
    //     </div>

    //     <div className='flex-fill' id='nav-center' >
    //       <ul >
    //         <li><Link to="/" style={navCenterLink} >Trang chủ</Link></li>
    //         <li><Link to="/product" style={navCenterLink}>Sản phẩm</Link></li>
    //         <li><Link to="/news" style={navCenterLink}>Tin tức</Link></li>
    //         <li><Link to="/admin" style={navCenterLink}>Quản lý</Link></li>
    //       </ul>
    //     </div>


    //     <div className='flex-fill text-end' style={{ width: 'auto' }}>
    //       <div id='info-bar' style={{ marginTop: '10px', marginLeft: '20px', display: 'inline' }}>
    //         <FaUserAlt style={{ fontSize: '25px', marginRight: '5px' }} />
    //         {user !== null ? 
    //          <div style={{display:'inline'}}><span style={{marginRight:'1em'}}>Hi, {user}</span><button className='btn btn-secondary'>Log out</button></div>:
    //          <Link to="/sign-in" style={linkStyle}><span>Đăng nhập/Đăng ký</span></Link>}

    //       </div>
    //       <Link to="/cart" ><FaShoppingCart style={{ color: 'black', marginLeft: '10px', fontSize: '24px' }} /></Link>
    //       <div id='search-bar' style={{display:'', height: '30px', marginTop: '10px' }}>

    //         <input style={{display:'inline',width:'69%',float:'left'}} onKeyDown={event => { if (event.key === 'Enter') { handleClick() } }} onChange={(e) => { setSearchText(e.target.value) }} className="form-control" type="search" placeholder="Tên sản phẩm..." aria-label="Search" />
    //         <Link to={`/search/${searchText}`} ><button style={{display:'inline'}} class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>
    //       </div>

    //     </div>
    //   </div>
    // </div >

    <div id='header'>
      <div className='row align-items-center' style={{ height: '100px' }}>
        <div className='col'>
          <img id='logo' alt='' src={brandLogo} />
        </div>

        <div className='col'>
          <ul id='navul'>
            <li><Link to="/" style={navCenterLink} >Trang chủ</Link></li>
            <li><Link to="/product" style={navCenterLink}>Sản phẩm</Link></li>
            <li><Link to="/news" style={navCenterLink}>Tin tức</Link></li>
            {user?.admin == true ? <li><Link to="/admin" style={navCenterLink}>Quản lý</Link></li> : <li><Link to="/contact" style={navCenterLink}>Liên hệ</Link></li>}
            

          </ul>
        </div>

        <div className='col'>
          <div className='row'>
            <div className='col'>
              {user?.admin == true ? <Link to='/admin-ordered'><FaUserAlt style={{color:'black', fontSize: '25px', marginRight: '5px' }} /></Link> : <Link to='/ordered'><FaUserAlt style={{color:'black', fontSize: '25px', marginRight: '5px' }} /></Link>}
              {user !== null ?
                <div style={{ display: 'inline' }}><span style={{ marginRight: '1em' }}>Hi, {user.username }</span><button onClick={() => {logout()}} className='btn btn-secondary'>Log out</button></div> :
                <Link to="/sign-in" style={linkStyle}><span>Đăng nhập/Đăng ký</span></Link>}
              <Link to="/cart" ><FaShoppingCart style={{ color: 'black', marginLeft: '10px', fontSize: '24px' }} /></Link>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col' >
              <input onKeyDown={event => { if (event.key === 'Enter') { handleClick() } }} onChange={(e) => { setSearchText(e.target.value) }} style={{ height: '100%' }} type="search" placeholder="Tên sản phẩm..." />
              <button className='btn btn-success mx-2'>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent