import { useFormik } from 'formik';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import Navbar from './Navbar';

const CreatePostSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
 
  
});

const CreatePost = () => {

  const [selImage, setselImage] = useState([]);

    const createpostForm = useFormik({
        initialValues: {
          name : '',
          title :'',
          location :'',
          description : '',
          image : '',
          
        },
    
        onSubmit: async (values) => {

          values.image= selImage;
          console.log(values);
          
          //sending request to backend
          const res = await fetch('http://localhost:5000/createpost/add', {
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
               title : 'Product Added!!',
               text: 'Product is added succesfully'
            });
           
          }else{
            Swal.fire({
              icon : 'error',
              title : 'Oops!!',
              text: 'Some Error Occured'
           });
          }
        },
        validationSchema: CreatePostSchema
      });
      const uploadFile = async (e) => {
        let file = e.target.files[0];
        setselImage(file.name);
        const fd = new FormData();
        fd.append('myfile', file);
    
        const res = await fetch('http://localhost:5000/util/uploadfile', {
          method: 'POST',
          body: fd
        });
    
        console.log(res.status);
      };
    


  return (
    <div>
    <Navbar/>
   <div className="d-flex justify-content-center align-items-center vh-50 bgimg2 ">
    
      <div className="card w-50 my-3 py-2 add-clr px-4 shadow-lg rounded-4">
        <div className="card-body  p-1">
          {/* <i className="fa-solid fa-lock fa-3x d-block text-center" /> */}
          <h2 className="text-center loghead my-3">Create Post</h2>
          <form onSubmit={createpostForm.handleSubmit}>
           <div className='d-flex '>
            <div className='w-100 mx-5 '>
            <label htmlFor="">Name</label>
            <p className='error-label '>{createpostForm.touched.name ? createpostForm.errors.name : ''}</p>
            <input className="form-control mb-2 w-75  rounded-3" type="text" name="name" onChange={createpostForm.handleChange} value={createpostForm.values.name} />
            <label htmlFor="">Title</label>
            <p className='error-label'>{createpostForm.touched.title ? createpostForm.errors.title : ''}</p>
            <input className="form-control mb-2 w-75 rounded-3" type="text" name="title"  onChange={createpostForm.handleChange} value={createpostForm.values.title} />
            <label htmlFor="">Location</label>
            <p className='error-label'>{createpostForm.touched.location ? createpostForm.errors.location : ''}</p>
            <input className="form-control mb-2 w-75 rounded-3" type="text" name="location"  onChange={createpostForm.handleChange} value={createpostForm.values.location} />
            <label htmlFor="">Description</label>
            <p className='error-label'>{createpostForm.touched.description ? createpostForm.errors.description : ''}</p>
            <input className="form-control mb-2 w-75 rounded-3" type="text" name="description"  onChange={createpostForm.handleChange} value={createpostForm.values.description} />
            <label htmlFor="">Upload File</label>
            <input  type="file" className='form-control w-75' onChange={uploadFile} />
            </div>
            </div>
            <div className='d-flex justify-content-center'>
            <button  className="btn btn-primary w-75  mt-2 rounded-3">
              Post
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

  


export default CreatePost