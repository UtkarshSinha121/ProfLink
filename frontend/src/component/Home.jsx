import React from 'react'
import Navbar from './Navbar'
import PostPage from './PostPage'

const Home = () => {
  return (
    <div className='bg-img' style={{marginTop:'76px'}} >
      <div className='position-fixed w-100 top-0 z-2'>
        <Navbar/>
      </div > 
      <div className='container' >   
        <div className='row'>
           <div className='col-md-2'>

           </div>
           <div className='col-md-8'>
              <PostPage/>
           </div>
           <div className='col-md-2'>

           </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home