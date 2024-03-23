import { useState, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './pages/homepage'
import LoginWithGoogle from './pages/Login'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import BlogInsert from './pages/InsertForms'
import User from './pages/User'
import Blogs from './pages/blogs'
import MyBlogs from './pages/myblogs'
interface UserCredentials {
  login: number;
  setLogin: React.Dispatch<React.SetStateAction<number>>;
  userEmail:String,
  setUserEmail:React.Dispatch<React.SetStateAction<String>>
}


const UserContext = createContext<UserCredentials | null>(null);
function App() {
  const [login,setLogin]=useState(0);
  const [userEmail,setUserEmail]=useState<String>(String);
  
  const UserValue:UserCredentials  = {
    login,
    setLogin,
    userEmail,
    setUserEmail
  };
  console.log(UserValue);
  return (
    <>
    <UserContext.Provider value={UserValue} > 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />} />
            <Route path='/login' element={<LoginWithGoogle/>}/>
            <Route path="/post" element={<BlogInsert/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/myblogs" element={<MyBlogs/>}/>
            <Route path="/user" element={<User />}/>
          </Routes>
        </BrowserRouter>
    </UserContext.Provider>
    
    </>
  )
}

export  {App,UserContext};
