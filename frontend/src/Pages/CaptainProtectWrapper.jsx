import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import Loading from './Loading';

const CaptainProtectWrapper = ({children}) => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
      if(!token){
          navigate('/captain-login')
      }
      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
          headers:{
              Authorization:`Bearer ${token}`
          }
      }).then(response=>{
  
        
  
          if(response.status==200|| response.status==201){
             
              setIsLoading(false)
          } else {
              console.log(Error)
          }
      }).catch(err=>{
          console.log(err)
        
          navigate('/captain-login')
      })
  },[token])
  if(isLoading){
  
  
      return(
          <Loading message="Fetching Captain.. Please wait..." size="40px" color="green" /> 
          )
  }
  
  
      return (
          <>
      {children}
      </>
    )
  
}

export default CaptainProtectWrapper