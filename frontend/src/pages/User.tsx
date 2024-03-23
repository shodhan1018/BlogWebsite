import {useState,useEffect,useContext} from "react"
import axios from "axios"
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom';
import NavBar from "./homepage";
import {Image} from "@mantine/core"
export default function User(){
   const [name,setName]=useState();
   const [userPic,setUserPic]=useState("");
   const navigate = useNavigate();
   const user=useContext(UserContext);
   async function fetchUser(){
      await axios.get("http://localhost:3000/user",{
         headers:{token:localStorage.getItem("token")}
      })
      .then(res=>{
         console.log(res.data);
         setName(res.data.user.name);
         setUserPic(res.data.image)

      });
   }
   if(user&& user.login==0){
      navigate("/login");
   }
   useEffect(()=>{
      const email=user&&user.userEmail;
      fetchUser();
   },[])
   if(!name){
      return(
         <h1>Loading..</h1>
      )
   }
   // console.log(message)

   return(
      <div>
         <NavBar/>
         <div style={{height:"100px",width:"100px"}}>
         <Image  src="https://lh3.googleusercontent.com/a/AGNmyxbeicmlpQkDhhxyovcUMQuFwrfAghrsUYpFQzI=s96-c" alt=""/>
         </div>
         <h1>{name}</h1>
      </div>
      
   )
}
