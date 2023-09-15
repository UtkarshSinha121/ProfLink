import React, { useState } from 'react'
import {  Link, NavLink } from 'react-router-dom'
import useUserContext from '../UserContext';

const Navbar = () => {

 

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )

  const {logout} = useUserContext(); 

  return (
    <div>
        <nav className="navbar navbar-expand-lg  nav-clr">
  <div className="container">
    {/* <a className="navbar-brand" href="#">
      Navbar
    </a> */}
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

    <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          
        />
        <button className="btn btn-outline-none " style={{marginLeft:'-50px'}} >
        <Link to='/search' >
        <i class="fa-solid fa-magnifying-glass"></i>
        </Link>
        </button>
      </form>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

      
       
        <li className="nav-item mx-2 item ">
          <NavLink className="nav-link text-white " to="/home">
          <i class="fa-solid fa-house mx-1"></i>
             <b>Home</b> 
          </NavLink>
        </li>

        <li className="nav-item mx-2 item">
          <NavLink className="nav-link text-white " to="/addpost">
          <i class="fa-solid fa-square-plus fa-lg mx-1"></i>
             <b>AddPost</b> 
          </NavLink>
        </li>

        
        <li className="nav-item mx-2 item">
          <NavLink className="nav-link text-white" to="/profile">
          <i class="fa-solid fa-user mx-1"></i>
             <b>Profile</b> 
          </NavLink>
        </li>
        <li className="nav-item mx-2 item">
          <NavLink className="nav-link " to="/login">
          
             <b className='text-white' onClick={logout}>Logout</b> 
          </NavLink>
        </li>
        <li  className="nav-item mx-2 item" >
        <Link >
         <img className='rounded-circle' src={"https://proflink.onrender.com/"+currentUser.avtar} alt="" height={40} width={40}/>
         </Link>
       </li>
       
      </ul>
      
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar