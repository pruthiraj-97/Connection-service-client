import React, { useState } from 'react';
import '../CSS/login.css'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null)
  const navigator=useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    const response=await fetch("http://localhost:3005/api/v1/auth/login", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            email,
            password
        })
    })
    const data=await response.json()
    console.log(data)
    if(data.status==200){
      localStorage.setItem("CurrentUser",JSON.stringify(data.data.user))
      localStorage.setItem("token",data.data.token)
      navigator("/")
    }else if(data.status==401){
        navigator('/login')
    }else if(data.status==400){
      setError(data.error.message)
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {
          error && <p className='error-para'>{error}</p>
        }
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
