import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { toast } from 'react-hot-toast';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .test("name", "Name already registered" , function (name) {
      return checkAvailabilityName(name);}
      ),
  email: Yup.string().email('Invalid email').required('Required')
  .test("email", "Email already registered" , function (email) {
    return checkAvailabilityEmail(email);}
    ),
  password: Yup.string().min(6,'Too Short').required('Required'),
});
// check if email is present
const checkAvailabilityEmail = async (email) => {
  const res = await fetch("https://proflink.onrender.com/user/checkemail/"+email,
  {method:'GET',
  headers:{
    'Content-Type': 'application/json'
  } ,
  });
  console.log(res.status);
  if(res.status === 200){
    return true;
   

  }else if(res.status === 401){
    
    return false;
    
  }
} 


//check if username is present
const checkAvailabilityName = async (name) => {
  const res = await fetch("https://proflink.onrender.com/user/checkname/"+name,
  {method:'GET',
  headers:{
    'Content-Type': 'application/json'
  } ,
  });
  console.log(res.status);
  if(res.status === 200){
    return true;

  }else if(res.status === 401){
    return false;
  }
}


const Signup = () => {

  const navigate = useNavigate();

  const [selImage, setselImage] = useState([]);
  const signupForm = useFormik
  ({
    initialValues: {
      name :'',
      email :'',
      password :''
  
    },
    onSubmit: async (values) => {
      values.avtar= selImage;
      console.log(values);
    
      const res = await fetch('https://proflink.onrender.com/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type' : 'application/json'
        }
      });
      console.log(res.status);

      if(res.status === 200){
        Swal.fire({
           icon : 'success',
           title : 'Singnup Sucess!!',
           text: 'Now Login to Continue'
        });
        navigate('/login');
      }else{
        Swal.fire({
          icon : 'error',
          title : 'Oops!!',
          text: 'Some Error Occured'
       });
      }
    },

    validationSchema: SignupSchema
  });
  const uploadFile = async (e) => {
    let file = e.target.files[0];
    setselImage(file.name);
    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch('https://proflink.onrender.com/util/uploadfile', {
      method: 'POST',
      body: fd
    });

    console.log(res.status);
  };

 
  

  return (
    <div className='sign-img'>
     <Header/>
    <div className='container  vh-100'>
  
    <div className='row align-items-center py-2 '>
    
    <div className='col-lg-7 col-md-7'>
    <h1><i className='welcome text-white' > Welcome to your professional community </i></h1>
    <h3 className='welcome text-white'>Join now to see what you are missing</h3>
          </div>
          <div className='col-lg-5 col-md-5 '>
      <div className=' card rounded-4 w-75 vh-50 mt-5 p-3 sign-card '>  
        <div className='card-body media  px-2'>
          <h2 className='text-center fw-bold mb-2 text-white'>SIGN UP</h2>
          <form onSubmit={signupForm.handleSubmit} >
                  <p className='error-label'>{signupForm.touched.name ? signupForm.errors.name : ''}</p>
                   <div class="d-flex align-items-center mb-2 ">
                    <i class="fas fa-user fa-lg me-3 fa-fw text-white "></i>                   
                    <input type="text" id=" " class="form-control input_style"  name="name" placeholder='Your Name' onChange={signupForm.handleChange} value={signupForm.values.name}  />
                  </div>
           
                  <p className='error-label'>{signupForm.touched.email ? signupForm.errors.email : ''}</p>
                  <div class="d-flex flex-row  align-items-center mb-2 ">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw text-white "></i>
                    <input type="email" id="ye" class="form-control input_style " name="email" placeholder='Email' onChange={signupForm.handleChange} value={signupForm.values.email} />  
                      
                  </div>
                  <p className='error-label'>{signupForm.touched.password ? signupForm.errors.password : ''} </p>
                  <div class="d-flex flex-row  align-items-center mb-4 ">
                    <i class="fas fa-lock fa-lg me-3 fa-fw  text-white"></i>
                   <input type="password" class="form-control input_style" name="password" id="password-register" placeholder='Password  'onChange={signupForm.handleChange} value={signupForm.values.password}/>
                   <i class="fa-solid fa-eye px-3 text-white" style={{marginLeft:'-50px',marginTop:'3px'}}
             onClick={

function(){
  var x = document.getElementById("password-register");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}
}></i>
  </div >
                  <div className='d-flex flex-flow align-items-center mb-4'>
                  <i class="fa-solid fa-arrow-up-from-bracket fw-bold fa-xl me-3 text-white"></i>
                  <input  type="file" className='form-control  input_style '  onChange={uploadFile} />
                  </div>
                  <div class="d-flex flex-row justify-content-center mx-4 mb-3 mb-lg-2">
                    <button type="submit" class="btn btn-primary btn-floating mx-1 w-100 rounded-5">Sign Up</button>
                  </div>

          </form>
          </div>

        </div>  
        </div>
         

      </div> 
    </div>
    </div>
  )
}

export default Signup