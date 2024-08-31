import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from '../components/userDetails'
import '../CSS/Home.css'
function Home(){
    const [users,setUsers]=useState([])
    const navigator=useNavigate()
    useEffect(()=>{
       (async ()=>{
          const response=await fetch('http://localhost:3005/api/v1/connection/users',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token')
            }
          })
          const data=await response.json()
          console.log(data)
          if(data.status==401){
             navigator('/login')
          }else if(data.status==200){
            setUsers(data.data)
          }
       })()
    },[])
    return (
        <div className="Home-container">
           {
             users&&users.length>0&&(
               users.map((user,idx)=>{
                 return <UserDetails key={idx} user={user}/>
               })
             )
           }
        </div>
    )
}

export default Home