import React,{useState} from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import '../CSS/register.css'
function RegisterUser(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigator=useNavigate()
    const [errors,setError]=useState(null)

   async function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password, name);
        const response=await fetch("http://localhost:3005/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })
        const data=await response.json()
        console.log(data)
        if(data.status==200){
            navigator("/login")
        }else if(data.status==400){
           setError(data.error.message)
        }
      }


    return (
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            {
              errors && <p className="error">{errors}</p>
            }
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
}

export default RegisterUser