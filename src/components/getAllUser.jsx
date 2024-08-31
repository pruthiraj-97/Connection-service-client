import React,{useState,useEffect} from "react";


function GetUsers(){
   const [users,setUsers]=useState([])
   useEffect(()=>{
      (async ()=>{
        const response=await fetch("http://localhost:3005/api/v1/connection/users",{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log(data)
      })()
   },[])
   return (
    <></>
   )
}

export default GetUsers