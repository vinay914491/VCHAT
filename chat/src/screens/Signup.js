import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import VCHAT from '../imgs/VCHAT.png';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { signupRoute } from '../Utils/APIRoutes';
const Signup = () => {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    });
    


    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            console.log("in validation",signupRoute);
            const {password,confirmpassword,username,email}=values;
            const {data}=await axios.post(signupRoute,{
                username,email,password,
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);

            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate('/chat');
            }
            
        }
    }

    // useEffect(()=>{
    //     if(localStorage.getItem('chat-app-user')){
    //       navigate('/');
    //     }
    //   },[])
      
    const toastOptions={
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    };
    const handleValidation=()=>{
        const {password,confirmpassword,username,email}=values;
        if(password!==confirmpassword){
                console.log('inm validation',toast);
                toast.error("password didn't match",toastOptions);
                return false;
        }
        else if(username.length<3){
                toast.error("Username should have greater than 3 characters",toastOptions);
                return false;
        }
        else if(email.length<3){
            toast.error("Email should have greater than 3 characters",toastOptions);
            return false;
        }
        else if(password.length<8){
            toast.error("Password should have greater than 8 characters",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("email is required",toastOptions);
            return false;
        }
        
        return true;
        
        
            
            

    }

    const handleChange=(event)=>{
        setValues({ ...values,[event.target.name]:event.target.value});

    }
  return (
    <>
    <FormCont>
        <form onSubmit={(event)=>handleSubmit(event)}>
           <div className="logo">
            <img src={VCHAT} alt=""/>
            <h1>VCHAT</h1>
            
           </div>
           <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}/>
           <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
           <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
           <input type="password" placeholder="Confirm password" name="confirmpassword" onChange={(e)=>handleChange(e)}/>
           <button type="submit">Create User</button>
           <span>Already have an account? <Link to='/'>Login</Link></span>
        </form>
    </FormCont>
    <ToastContainer/>
    </>

  )
}


const FormCont=styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#131320;
    .logo{
        display:flex;
        algin-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1
        {
            color:white;
            text-transform:uppercase;
        }
    }
    form
    {
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding:3rem 5rem;
        input
        {
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }
        button
        {
            background-color:#997af0;
            border:none;
            color:white;
            padding:1rem 2rem;
            cursor:pointer;
            border-radius:0.4rem;
            font-weight:bold;
            text-trasform:uppercase;
            transition:0.5s ease-in-out;
            &:hover
            {
                background-color:#4e0eff;
            }
        }
        span
        {
            color:white;
            text-trasform:upperase;
            a
            {
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`;

export default Signup
