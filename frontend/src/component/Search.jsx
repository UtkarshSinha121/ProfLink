import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-hot-toast';

const Search = () => {

    const [currentUser, setcurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    )
    
    const [UserList, setUserList] = useState([]);
    const [Search, setSearch] = useState([]);
    const [followed, setfollowed] = useState(false);

    const fetchUserData = async () => {
       const res = await fetch('https://proflink.onrender.com/user/getall');
       console.log(res.status);
       if(res.status === 200){
           const data = await res.json();
           console.log(data);
           setUserList(data);
           setSearch(data);
       }
    }

    useEffect(() => {
      fetchUserData();
    }, [])

    const fetchFollowData = async () => {
        const res = await fetch('https://proflink.onrender.com/follow/getall');
        console.log(res.status);
        if(res.status === 200){
            const data = await res.json();
            console.log(data);
           setfollowed(data);
        }
     }

     useEffect(() => {
         fetchFollowData();
      }, [followed])


      const follow = (x) => {
        if (followed.length > 0) {
          const result = followed.filter((user) => {
            return user.following === x && user.userId === currentUser._id;
          });
          if (result.length > 0) {
            return <button className="btn btn-secondary" onClick={() => unfollow(x)}><i class="fa-solid fa-user-minus mx-1"></i>  Following</button>
          } else {
            return <button className="btn btn-primary" onClick={() => followUser(x)}><i class="fa-solid fa-user-plus mx-1"></i>  Follow</button>
          }
        } else {
          return <button className="btn btn-primary" onClick={() => followUser(x)}><i class="fa-solid fa-user-plus mx-1"></i>  Follow</button>
        }
      }
    
        const followUser = async (x) => {
          const res = await fetch("https://proflink.onrender.com/follow/add", 
            {method:'POST',
            body:JSON.stringify(
              {
                "following":x,
                "userId":currentUser._id
              }
            ),
            headers:{
             'Content-Type': 'application/json'
            } ,
           
           
         });
    
         toast.success(`You are now following ${x}`);
      
          if (res.status === 500) {
            const data = await res.json();
            toast.success("Followed");
            console.log(data);
            fetchFollowData();
          }
        }
    
        const unfollow = async (x) => {
          const res = await fetch("https://proflink.onrender.com/follow/delete/"+ x, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (res.status === 200) {
            const data = await res.json();
            toast.success(`You Unfollowed ${x}`);
            console.log(data);
            fetchFollowData();
          }
        }
    
         

    const displayUser = () => {
        if(UserList.length === 0)
            return <h1 className='text-center text-white'>No User Found</h1>
        
            return UserList.map((user) => {
              return (
                user.name === currentUser.name ? null :

            <div className='col-md-4'>
                  <div className='card m-3'>
                        <div className='card-body text-center'>
                        <img className='rounded-circle mb-2' src={"https://proflink.onrender.com/"+user.avtar} alt="" height={80} width={80}/>
                            <h5>{user.name}</h5>
                            <div className='d-flex '>
                            <Link to={'/profile/'+user.name} className='btn btn-success'>View Profile</Link>
                             
                            <div className='ms-auto'>{follow(user.username)}</div>
                            </div>
                            </div>
                            
                            

                        </div>
                  </div>


              )

              })
 
    };
    const filterUser = (e)=>{
        const value = e.target.value;
        setUserList(Search.filter((user) =>{
            return user.name.toLowerCase().includes(value.toLowerCase())
        } ));
    }

  return (
    <div className='bg-img vh-150' style={{marginTop:'75px'}}>
        <div className='position-fixed w-100 top-0 z-2'>
            <Navbar/>
        </div >
        <header className='bg-target-tertiary'>
            <div className='container py-2'>
                <p className='font  display-5 text-center fw-bold  mt-2 text-white'>Search User</p>
                <input type="text" className='form-control w-50 m-auto' placeholder='' onChange={filterUser}/>
     
            </div>
        </header>
         <div className='container '>
        <div className='row'> {displayUser()}</div>
        </div>
    </div>
  )
}

export default Search