import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logoutUser } from '../../action/userAction'

import { Route,Routes } from 'react-router-dom'
import Search from './Search'


const Header = () => {
  const dispatch=useDispatch(); 
  const {user,loading}=useSelector(state=>state.auth)
  const {cartItems}=useSelector(state=>state.cart)
  const loginData=localStorage.getItem('user');
  const LogoutHandler=()=>{
     dispatch(logoutUser())
     localStorage.clear();
  }
  return (
    <Fragment>
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
        <Link to="/">
                <img src="data:image/png;base64,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" 
                style={{width:"100%",height:"70px"}}/>
                        </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
       <Search></Search>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
       <Link to='/cart' style={{textDecoration:"none"}}>
        <span id="cart" className="ml-3">Cart</span>
        
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
        {user && loginData ? (
 <div className="ml-4 dropdown d-inline">
 <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

     <figure className="avatar avatar-nav">
         <img
             src={user.avatar && user.avatar.url}
             alt={user && user.name}
             className="rounded-circle"
         />
     </figure>
     <span>{user && user.name}</span>
 </Link>

 <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
        
     {user && user.role === 'admin' && (
         <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
     )}
     <Link className="dropdown-item" to="/orders/me">Orders</Link>
     <Link className="dropdown-item" to="/me">Profile</Link>
     <Link className="dropdown-item text-danger" to="/" onClick={LogoutHandler}>
         Logout
     </Link>

 </div>


</div>

        ):
         !loading && <Link to='/login' className="btn ml-4" id="login_btn">Login</Link>

        }
        

     
      </div>
    </nav>
    </Fragment>
  )
}

export default Header