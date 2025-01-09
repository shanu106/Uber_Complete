import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ConfirmedRidepopup = (props) => {
const navigate = useNavigate()
  const [otp, setotp] = useState("");


const submitHandler = async (e)=>{
  e.preventDefault();
 
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`,{
  params:{
    rideId:props.ride._id,
    otp: otp
  },
  headers:{
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
console.log("ride started",response)
navigate('/captain-riding',{state:{ride:props.ride}})
}

  return (
    <div className='w-full  mt-16'>
        <h5 onClick={()=>{
                props.setconfirmRidePanel(false);
              }} className='w-full absolute -top-2 text-center text-3xl text-gray-400'><i className="ri-arrow-down-wide-line"></i></h5>
        <div id='top' className='flex border-2  border-yellow-300 p-2 rounded-xl justify-between items-center px-4'>
            <div  className='flex  items-center gap-4'>
                <img className='w-12 h-12 object-cover rounded-full' src="https://imgs.search.brave.com/J168v9jJrb9v02H2KNnm6wwYcve3oO4ALI9ouchgdks/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzc5Lzc4LzQ4/LzM2MF9GXzI3OTc4/NDgzNl80ZUtNamZJ/ZkR0YUlDS21hU0JB/eWZ0Mlk0M3U1Vjc2/US5qcGc" alt="" />
                <h4 className='text-xl font-bold'>Sahil Khan</h4>
            </div>
            <div className='text-xl font-semibold'>2.3 KM</div>
        </div>
        <div id='bootom'>
       
        <div className='w-full flex gap-5 items-center mb-5'>
               <i className="text-lg ri-map-pin-fill"></i>
               <div>
                <h3 className='text-lg font-medium'>599/13 B</h3>
                <p className='text-sm text-gray-600'>Clock Tower , Kota</p>
               </div>
               </div>
               <div className='w-full flex gap-5 items-center mb-5'>
               <i className="text-lg ri-map-pin-fill"></i>
               <div>
                <h3 className='text-lg font-medium'>599/13 B</h3>
                <p className='text-sm text-gray-600'>Clock Tower , Kota</p>
               </div>
               </div>
               <div className='w-full flex gap-5 items-center'>
               <i className="text-lg ri-money-rupee-circle-line"></i>
               <div>

                <h3 className='text-lg font-medium'>193.20</h3>
                <p className='text-sm text-gray-600'>Cash Cash</p>
               </div>
               </div>
               <form onSubmit={(e)=>{
               
                submitHandler(e)
              
               }} >
              <input value={otp} onChange={(e)=>{
                setotp(e.target.value)
             
              }} type="number" placeholder='enter OTP' className='w-full p-2 rounded-lg border border-gray-400 mt-10 px-4'  />
               <button  className='w-full flex justify-center text-2xl text-white bg-green-500 rounded-xl font-light py-2 mt-5'>Confirm</button>
               <button onClick={()=>{
                 props.setUserRidePopUp(false);
                 props.setconfirmRidePanel(false);
                }} className='w-full text-2xl text-white bg-red-500 rounded-xl font-light py-2 mt-5'>cancel</button>
                </form>
    
    </div>
    </div>
  )
}

export default ConfirmedRidepopup