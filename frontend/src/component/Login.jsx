import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const  loginSchema = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6,'Too Short').required('Required'),
});
const Login = () => {
  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email :'',
      password :''
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch('https://proflink.onrender.com/user/authenticate',{
        method: 'POST',
        body: JSON.stringify(values),
        headers:{
          'Content-Type' : 'application/json'
        }
      });
      console.log(res.status);
      if(res.status === 200){
        Swal.fire({
          icon : 'success',
          title : 'Login Success!!'
        });
        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data));
        
         navigate('/home');
      }else if(res.status === 401){
          Swal.fire({
            icon : 'warning',
            title : 'Login Failed',
            text : 'Invalid email or password'
          })
      } else{
        Swal.fire({
          icon : 'error',
          title : 'Oops!!',
          text: 'Some Error Occured'
       });
      }
    },
    
    validationSchema: loginSchema
  });
  
  return (
    
    <div className='log-img' >
      <Header/>
   <div className="container py-1 vh-100">
    <div className="row align-item-center  ">
     <div className='col-lg-3'>
      
     </div>
     <div className='col-lg-6'>
     <div style={{margin:"100px"}} className='  card w-75  p-3 sign-card'>
     <div className=" card-body">
        <h2 className="text-center fw-bold mb-2 text-white">Login Form</h2>
        <form onSubmit={loginForm.handleSubmit} >
        <p className='error-label'>{loginForm.touched.email ? loginForm.errors.email : ''}</p>
          <div className="d-flex align-items-center mb-2 ">
          <i class="fas fa-envelope fa-lg me-3 fa-fw text-white "></i>         
          <input className="form-control input_style " type="email" name="email" placeholder='Email' onChange={loginForm.handleChange} value={loginForm.values.email}/>
          </div>
          <p className='error-label'>{loginForm.touched.password ? loginForm.errors.password : ''}</p>
          <div className='d-flex align-items-center mb-4 '>          
          <i class="fas fa-lock fa-lg me-3 fa-fw  text-white"></i>        
            <input className="form-control input_style " id='typepass' type="password" name="password" placeholder='Password' onChange={loginForm.handleChange} value={loginForm.values.password} />
            <i class="fa-solid fa-eye text-white px-3"    style={{marginLeft:'-50px',marginTop:'3px'}}
             onClick={

function(){
  var x = document.getElementById("typepass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}
}></i>
          </div >
          <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary  w-75 rounded-5">LOGIN</button>
          </div>
        </form>
     </div>
    </div>
  </div>
  
  <div className='col-lg-3'>
      
      </div>
  </div>
</div>
 
 </div>
  )
}

export default Login