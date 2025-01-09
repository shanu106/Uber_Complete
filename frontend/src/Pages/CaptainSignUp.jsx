import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'
const CaptainSignUp = () => {

    const [fullname, setfullname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [captain, setCaptain] = useState({})
    const [vehicleColor, setVehicleColor] = useState('')
    const [VehicleCapacity, setVehicleCapacity] = useState('')
    const [VehicleType, setVehicleType] = useState('')
    const [PlateNumber, setPlateNumber] = useState('')
    const navigate = useNavigate()
    const submitHandler = async (e) =>{
      e.preventDefault();
      const captainData = {
        fullname:fullname,
        email:email,
        password:password,
        vehicle:{
          color:vehicleColor,
          capacity:VehicleCapacity,
          vehicleType:VehicleType,
         plateNumber:PlateNumber
        }
      }
     
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/create`,captainData);
      if(response.status==200){
        const data = response.data;
       localStorage.setItem('token',data.token);
       setCaptain(data.captain);
       navigate('/captain-Home');
      

      }
      setfullname('');
      setemail('');
      setpassword('');
      setPlateNumber('');
      setVehicleColor('');
      setVehicleCapacity('');
      setVehicleType('');
    }
    return (
      <div className='p-2 overflow-hidden'>
       <div className='h-full '>
       <img className='w-20 ml-5 mb-8' src="data:image/png;base64,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" alt="" />
        <form className='px-2' onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <h3 className='text-xl mb-2'>Full name</h3>
          <input required value={fullname} onChange={(e)=>{
            setfullname(e.target.value)
          }}  className='bg-[#eeeeee] border-2 text-lg placeholder:text-sm outline-none mb-2  rounded-xl px-2 py-2 w-full'  type="text" name="name" placeholder="Enter Your name" />
          <h3 className='text-xl mb-2'>Email</h3>
          <input required value={email} onChange={(e)=>{
            setemail(e.target.value)
          }} className='bg-[#eeeeee] border-2 text-lg placeholder:text-sm outline-none  rounded-xl px-2 py-2 w-full'  type="email" name="email" placeholder="example@email.com" />
          <h3 className='text-xl mb-2 mt-6'>Password</h3>
          <input required value={password} onChange={(e)=>{
            setpassword(e.target.value)
          }} className='bg-[#eeeeee] rounded-xl px-2 py-2 w-full border-2 outline-none placeholder:text-sm text-lg '   type="password" name="password" placeholder='Password' id="" />
          <h3 className='text-xl mb-2 mt-6'>Vehicle Information</h3>
          <div className='flex flex-wrap justify-between gap-2'>
            <input className='bg-[#eeeeee] w-[45%] rounded-xl outline-none px-2 py-2' placeholder='Vehicle Colour' type="text" name="" id="" onChange={(e)=>{
              setVehicleColor(e.target.value)
            }} value={vehicleColor}/>
            <input className='bg-[#eeeeee] w-[45%] rounded-xl outline-none px-2 py-2' placeholder='Capacity' type="text" name="" id="" 
            onChange={(e)=>{
              setVehicleCapacity(e.target.value)
            }} value={VehicleCapacity}/>
            <input className='bg-[#eeeeee] w-[45%] rounded-xl outline-none px-2 py-2' placeholder='AA 11 BB 2222' type="text" name="" id="" onChange={(e)=>{
              setPlateNumber(e.target.value)
            }} value={PlateNumber} />
            <select className='w-[45%] rounded-xl outline-none px-2 py-2' placeholder='' name="" id="" onChange={(e)=>{
              setVehicleType(e.target.value)
            }} value={VehicleType}>
              <option value="">Select Vehicle Type</option>
              <option value="car">car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>
          
          <button className='bg-[#111] text-white rounded-xl px-2 py-2 w-full  outline-none mt-8 placeholder:text-sm text-lg '>Create New Account</button>
        </form>
       </div>
       <div className='px-2  
       '>
        <p className='text-lg mt-4 w-full text-center'>Already have an account ? <Link className='text-sm text-blue-600' to='/captain-login'>Log in here</Link></p>
        <p className='text-xs mt-8'>By prodeeding, you consent to get calls, WhatApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        {/* <Link className='bg-green-500 mt-44 flex justify-center items-center text-white rounded-xl px-2 py-2 w-full  outline-none mt-8 placeholder:text-sm text-lg ' to='/captain-login' >Sign Up as Captain</Link> */}
       </div>
      </div>
    )
 
}



export default CaptainSignUp