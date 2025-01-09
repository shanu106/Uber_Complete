import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'
const UserLogout = () => {

    const token = localStorage.getItem('token')
   try{
    const navigate = useNavigate()
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout/`,{
        headers:{
            Authorization: `bearer ${token}`
        }
    }).then((res)=>{
        console.log(res);
        localStorage.removeItem('token')
        navigate('/captain-login')
        
    })
   }
    catch(err){
        console.log(err )
}
  return (
    <Loading message="Logging Out Please wait..." size="40px" color='red'/> 
  )
}

export default UserLogout