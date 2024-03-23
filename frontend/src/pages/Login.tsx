import React, { useContext} from "react";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom';


const CLIENT_ID="497231389779-dlf46tk6chkjll1h239hr60sq71vqbcf.apps.googleusercontent.com";

function LoginWithGoogle(props:any){
    const user=useContext(UserContext);
    const navigate = useNavigate();

    console.log(user)
    
    return (
        <div>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
            onSuccess={async (credentialResponse:any )=> {
               await  axios.post('http://localhost:3000/login',
                    credentialResponse
                ).then(res=>{
                    user&&user.setLogin(1);
                    user&& user.setUserEmail(res.data.email);
                     localStorage.setItem("token",res.data.token);
                    console.log(localStorage.getItem("token"));
                    navigate("/");
                })
                .catch((err)=>console.log(err))
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
            />
        </GoogleOAuthProvider>
        
        </div>
    )
}
export default LoginWithGoogle;