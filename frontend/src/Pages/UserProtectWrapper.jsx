import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import Loading from './Loading';
const UserProtectWrapper = ({children}) => {

const token = localStorage.getItem('token');
const navigate = useNavigate();
const { user, setUser } = useContext(UserDataContext)
const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
    if(!token){
        navigate('/user-login')
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{

      

        if(response.status==200|| response.status==201){
           setUser(response.data)
            setIsLoading(false)
        } else {
            console.log(Error)
        }
    }).catch(err=>{
        console.log(err)
      
        navigate('/user-login')
    })
},[token])
if(isLoading){


    return(
        <Loading message="Please wait..." size="40px" color="green" /> 
        )
}


    return (
        <>
    {children}
    </>
  )

}

export default UserProtectWrapper