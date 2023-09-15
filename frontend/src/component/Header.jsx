import React, { useState } from 'react'
import {  Link, NavLink } from 'react-router-dom'

const Header = () => {

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )
  return (
    <div className=''>
        <nav className="navbar navbar-expand-lg  nav-clr">
  <div className="container">
    
    <div className='d-flex align-item-center py-2 mx-3' >
   <h4 className='logo'>ProfLink</h4> 
    
  </div>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

   
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

      
       
        <li className="nav-item mx-2 item ">
          <NavLink className="nav-link text-white " to="/login">
          
             <b >Login</b> 
          </NavLink>
        </li>
        <li className="nav-item mx-2 item ">
          <NavLink className="nav-link text-white " to="/signup">
         
             <b >Signup</b> 
          </NavLink>
        </li>
        <li className="nav-item mx-2 item">
          <NavLink className="nav-link text-white " to="/about">          
             <b>About</b> 
          </NavLink>
        </li>

      </ul>
      
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header