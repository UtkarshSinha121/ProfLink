import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
   const {name} = useParams();
    const Navigate = useNavigate();
   
   const [User, setUser] = useState([]);
   const [Post, setPost] = useState([]);

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )
  console.log(currentUser);
  const fetchUserData = async () => {
    const res = await fetch('https://proflink.onrender.com/user/getbyname/'+currentUser.name);
    console.log(res.status);
    if(res.status === 200){
        const data = await res.json();
        console.log(data);
       setUser(data);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  console.log(User);
  console.log(User._id);


  const fetchPostData = async () => {
    const res = await fetch('https://proflink.onrender.com/addpost/getbyname/'+currentUser.name);
    console.log(res.status);
    if(res.status === 200){
        const data = await res.json();
        console.log(data);
       setPost(data);
    }
  }

  useEffect(() => {
    fetchPostData();
  }, [])
  console.log(Post);
  console.log(Post._id);

  const deletePost = async (id) => {
    const res = await fetch('https://proflink.onrender.com/addpost/delete/'+id,{
      method:'DELETE'
    });
    if(res.status === 200){
      alert('Post Deleted Successfully');
      fetchPostData();
    }
    else{
      alert('Something went wrong');
    }
  }

 


  const countPost = () => {
    let count = 0;
    for(let i=0;i<Post.length;i++){
      if(Post[i].name === currentUser.name){
        count++;
      }
    }
    console.log(count);
    return count;

  }

  const displayPost = () => {
    return Post.map((post) => {
      if(post.name === currentUser.name){
        return (
          <div className='card mt-4'>
            <div className='card-body'>
             <div className='d-flex '>
            <div className='d-flex'>
                    <div>
            <img className='rounded-circle mb-2' src={"https://proflink.onrender.com/"+post.avtar} alt="" height={50} width={50}/>
            </div>
            <div>
             <h5 className='card-title ms-2'> {post.name}</h5>            
                <h6 className='card-text ms-2'>{post.date}</h6> 
             </div>
             </div> 
             <div className='ms-auto'>   
              <i class="fa-solid fa-trash mx-2"  onClick={() => deletePost(post._id)}></i>
              <i class="fa-solid fa-pen-to-square" onClick={()=>{Navigate('/editpost/'+post._id)}}></i>
              {/* <button className="btn btn-primary" onClick={()=>{Navigate('/editpost/'+post._id)}}>Edit </button> */}
             </div>            
             </div>
             <hr />             
        <h5>{post.description}</h5>
        <div className='d-flex justify-content-center'>
        <img  className=' rounded-4' src={"https://proflink.onrender.com/"+post.image} alt="" width={600} height={330} style={{overflow:'hidden'}} />
        </div>
        <hr />
        <div>
          <i class="fa-solid fa-thumbs-up fa-lg mx-2" style={{color:'darkblue'}}></i>{post.likes}
        </div>
          
            </div>
          </div>
        )
      }
    })
  }

  return (
    <div className='bg-img vh-120' style={{marginTop:'76px'}}>
      <div className='position-fixed w-100 top-0 z-2'>
        <Navbar/>
      </div>
      <div className='container'>
      <div className='row'>
           <div className='col-md-2'>

           </div>
           <div className='col-md-8'>
           <div className='card mt-4'>
        <div className='card-body text-center'>
        
           <img className='rounded-circle mb-2' src={"https://proflink.onrender.com/"+currentUser.avtar} alt="" height={100} width={100}/>
          
           <h5>{currentUser.name}</h5>
           <h6>{currentUser.email}</h6>
          
          <button className='btn btn-primary rounded-5 mx-2'>
            {countPost()} Posts
          </button>
        <Link to='/addpost'>
        <button className='btn btn-primary rounded-5'>Create a post</button>
        </Link>
       
        
        </div>
    </div>
        <div>
          {displayPost()}
        </div>
           </div>
           <div className='col-md-2'>

           </div>
      </div>
    </div>
    </div>
  )

}
export default Profile