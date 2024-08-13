import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate=useNavigate();
    const[credentials,setCredentials]=useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            // *GET, POST, PUT, DELETE, etc.
          
            headers: {
              "Content-Type": "application/json"
              
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            props.showAlert("Login Succesfully","success");
            navigate('/')
           
        }
        else{
            props.showAlert("invalid credentials","danger");
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password'/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
