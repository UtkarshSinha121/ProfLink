import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const PostPage = () => {
    const [currentUser, setcurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    )
    const [Likes, setLikes] = useState([]);
  const [followed, setfollowed] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [search, setsearch] = useState([]);

  const fetchUserData1 = async () => {
    const res = await fetch('https://proflink.onrender.com/likes/getall');
    console.log(res.status);
    if(res.status === 200){
        const data = await res.json();
        console.log(data);
       setLikes(data);
    }
 }

 useEffect(() => {
   fetchUserData1();
 }, [Likes])

 const likesForm = useFormik({
    initialValues: {
        postId: '',
        userId: currentUser._id,
    },
    onSubmit:async (values) => {
       console.log(values);
       const res = await fetch('https://proflink.onrender.com/likes/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}});



   const fetchUserData = async () => {
      const res = await fetch('https://proflink.onrender.com/addpost/getall');
      console.log(res.status);
      if(res.status === 200){
          const data = await res.json();
          console.log(data);
          setUserList(data);
          setsearch(data);
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
        return user.following === x;
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

    let UserList2=[]
UserList2 = UserList.filter((posts) => {
  
  for(let i = 0; i<followed.length; i++){
      if(followed[i].userId === currentUser._id && followed[i].following === posts.name){
          return true;
      }

}
return false;
})

   const displayPost = ()=>{
    if(UserList2.length === 0) return <h1 className='text-center'>No Data Found</h1>

    return UserList2.map((post)=> (<div className='col-md-12 m-2 '>
        <div className='card  post-card card-size'>
            <div className='d-flex'>
            <div className='card-body'>
              <div className='d-flex  ' >
                <div className='d-flex'>
                    <div  >
            <img className='rounded-circle mb-2' src={"https://proflink.onrender.com/"+post.avtar} alt="" height={50} width={50}/>
            </div>
            <div>
             <h5 className='card-title ms-2 '> {post.name}</h5>            
                <h6 className='card-text ms-2 '>{post.date}</h6> 
             </div>
             </div>
             <div className='ms-auto mt-2 me-3'>
             <div >{follow(post.name)}</div>
             </div>

             </div>
             <hr  />             
        <h5 >{post.description}</h5>
       <div className='d-flex justify-content-center'>
        <img className=' rounded-1' src={"https://proflink.onrender.com/"+post.image} alt="" width={600} height={330} style={{overflow:'hidden'}} />
        </div>
        <hr  />
        <form  style={{marginTop:'-20px', marginRight:'-20px',marginBottom:'-20px'}}   onSubmit={likesForm.handleSubmit}>            
            <button className='btn  mb-1 like-button btn-lg ' onChange={likesForm.handleChange} value={likesForm.values.postId}
              onClick={() => {handleClick((post._id))}} type='submit'>{
                displaylikes(post._id)
              } </button>{post.likes || 0} Likes
        </form>       
            </div>
            </div>
        </div>        
    </div>))
   };

   const displaylikes = (postId)=>{
    if(!check(postId)) 
    return <i class="fa-regular fa-thumbs-up fa-lg"></i>
    else return <i class="fa-solid fa-thumbs-up fa-lg" style={{color:'darkblue'}}></i> 
    
  }

 const handleClick = (postId) => {
    {likesForm.values.postId = postId}
    if(!check(postId)){
        //setClicked(true);
        fetch(`https://proflink.onrender.com/addpost/${postId}/likes`, {
          method: 'PUT',
      })
      .then(res => res.json())
      .then(data => {
          setUserList(prevlikes => prevlikes.map(post => (post._id === postId ? data : post)))
        // setClicked(false);
        toast('Post Liked!', {
          icon: '👍',
        });
    
      })
      .catch(err => {
          console.error(err);
          //setClicked(false);
      })
      }
        
    }

    const check = (postId) => {
        for(let i = 0; i < Likes.length; i++){
            if(Likes[i].postId === postId && Likes[i].userId === currentUser._id){
                return true;
            }
        }
        return false;
}

  return (
   <div>
        <div >
        <div className='row'> {displayPost()}</div>
        </div>
   </div>
   
  )
}

export default PostPage