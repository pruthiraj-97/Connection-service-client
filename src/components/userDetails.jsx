import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/userDetails.css'
function UserDetails(props) {
    const [userdetail, setUserdetail] = useState(props.user);
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentuser,setCurrentUser]=useState(JSON.parse(localStorage.getItem('CurrentUser')))
    const [isButtonActive,setIsButtonActive]=useState(true)
    const navigator=useNavigate()
    console.log(props.user)
    useEffect(()=>{
        setUserdetail(props.user)
        setIsFollowing(currentuser.friends.includes(userdetail._id))
    },[])
    console.log("user" ,currentuser)
     const handleFollowClick = async (e) => {
        e.preventDefault()
        if(!isButtonActive) return 
        const response=await fetch(`http://localhost:3005/api/v1/connection/follow/${userdetail._id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token')
            }
        })
        const data=await response.json()
        if(data.status==401){
            navigator('/login')
        }else if(data.status==200){
            const newDetail = { ...currentuser, friends: [...currentuser.friends, userdetail._id] };
            setCurrentUser(newDetail);
            localStorage.setItem('CurrentUser', JSON.stringify(newDetail));
            setIsFollowing(true);
        }
        console.log(userdetail)
    };

    return (
        <div className="user-details-div">
            <h2>{userdetail.name}</h2>
            {
              isFollowing ? <button className={`following-button`}>Following</button> : <button onClick={handleFollowClick} className={`follow-button`}>Follow</button>
            }
        </div>
    );
}

export default UserDetails;
