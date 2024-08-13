import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [users, setUser] = useState({ name: "", email: "", password: "",cpassword:"" })
  const navigate=useNavigate();
  const onChange = (e) => {
    setUser({...users,[e.target.name]:e.target.value})
  }
  const createUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name: users.name, email: users.email, password: users.password })
    });
   const json=response.json();
  if(json.success){
    props.showAlert("Accoutn Created successfully","success");
    localStorage.setItem("token",json.authToken);
    navigate('/login');
  }
  else{
    props.showAlert("invalid Details","danger");
  }
    
    
  }
  return (
    <div className='container'>
      <form onSubmit={createUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Conform Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup
