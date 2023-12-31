import './App.css';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Home from './component/Home';
import Profile from './component/Profile';
import AddPost from './component/AddPost';
import EditPost from './component/EditPost';
import PostPage from './component/PostPage';
import Search from './component/Search';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './UserContext';





function App() {
  return (
    <div>
    <Toaster position='top-center' />
  <BrowserRouter>
    <UserProvider>
     <Routes>
         <Route path='/' element={ <Signup/> }/>
         <Route path='signup' element={ <Signup/> }/>
         <Route path='login' element={ <Login/> }/>
         <Route path='home' element={ <Home/> }/>
         <Route path='profile' element={ <Profile/> }/>
         <Route path='addpost' element={ <AddPost/> }/>
         <Route path='editpost/:id' element={ <EditPost/> }/>
         <Route path='postpage' element={ <PostPage/> }/>
         <Route path='search'  element={ <Search/> }/>

         
        
        
        

     </Routes>
     </UserProvider>
  </BrowserRouter>

 </div>
  );
}

export default App;
