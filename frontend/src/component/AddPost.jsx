import { useFormik } from 'formik';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const AddPostSchema = Yup.object().shape({
  
  description: Yup.string().required('Required'),
 
  
});

const AddPost = () => {

  const current = new Date(); 
  console.log(current);
  const date = current.getDate();
  //const month = current.getMonth();
  const year = current.getFullYear();

  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames[current.getMonth()];


  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )
    
  const [selImage, setselImage] = useState([]);

  
  const addpostForm = useFormik({
        initialValues: {
          image: '',
          description: '',
          name:currentUser.name,
          avtar:currentUser.avtar,
          date: date + ' ' + month + ' ' + year,
          
 
        },
    
        onSubmit: async (values) => {
          values.image= selImage;       
          console.log(values);
          
          //sending request to backend
          const res = await fetch('https://proflink.onrender.com/addpost/add', {
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
               title : 'Post Added!!',
               text: 'Post Created succesfully'
            });
           
          }else{
            Swal.fire({
              icon : 'error',
              title : 'Oops!!',
              text: 'Some Error Occured'
           });
          }
        },
        validationSchema: AddPostSchema
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
    <div className='bg-img'>
    <Navbar/>
   <div className="d-flex justify-content-center align-items-center vh-50  "> 
   <div className='col-lg-3'>

   </div>
     <div className='col-lg-6'>
      <div className="card  mt-5 m-4 p-2 card-size  ">
        <div className="card-body ">
          <h2 className="text-center display-6 fw-bold">Create Post</h2>
          <hr />
          <form   onSubmit={addpostForm.handleSubmit}>       
            <p className='error-label '>{addpostForm.touched.description ? addpostForm.errors.description : ''}</p>           
           <div className='mb-2' ><label className='label-control'  htmlFor="">Description</label>
          
            <textarea className='form-control' name="description" id="" cols="15" rows="4" placeholder='Write description here......' onChange={addpostForm.handleChange} value={addpostForm.values.description} ></textarea>
            </div>          
           <label className='label-control' htmlFor="">Upload Image</label>      
            <div >
            <input  type="file" className='form-control w-100' onChange={uploadFile} />
            </div>
           
            <div className='d-flex justify-content-center'>
             
            <button  className="btn btn-primary w-75  m-4 rounded-3">
              Post 
            </button>
           
            </div>
           
          </form>
        </div>
        </div>
        </div>
        <div className='col-lg-3'>

        </div>
        </div> 
      </div>
     
   
    
  )
}

export default AddPost
