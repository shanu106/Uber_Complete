import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import UserRidePopUp from '../components/UserRidePopUp'
import gsap from 'gsap';
import axios from 'axios'
import { useGSAP } from '@gsap/react';
import ConfirmedRidepopup from '../components/ConfirmedRidepopup';
import {CaptainDataContext} from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking';
const CaptainHome = () => {
// const {captain}  = React.useContext(CaptainDataContext)
const [UserRidePopupPanel, setUserRidePopUpPanel] = useState(false);
const userRidePopUpRef = useRef(null)
const [confirmRidePanel, setconfirmRidePanel] = useState(false);
const confirmRidePanelRef = useRef(null)
const {socket} = useContext(SocketContext);
const {captain} = useContext(CaptainDataContext)
const [ride, setRide] = useState(null)
useEffect(()=>{

  socket.emit("join",{userType:'captain', userId:captain._id})

  const updateLocation =  () =>{
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position=>{
   
    socket.emit('update-location-captain',{
      userId:captain._id,
      location:{
        ltd:position.coords.latitude,
        lng:position.coords.longitude
      }
    })
  })
}
  }
  const locationInvterval = setInterval(updateLocation,10000);
  updateLocation();
},[captain])

const confirmRide = async () =>{
  console.log("ride is :",ride)
console.log("ride id is : ",ride._id)
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`,{
body:{rideId:ride._id},
headers:{
  Authorization:`Bearer ${localStorage.getItem('token')}`
}
  })

 
  setUserRidePopUpPanel(false);
  setconfirmRidePanel(true)
}

socket.on('new-ride',(data)=>{
  
  setRide(data)
  setUserRidePopUpPanel(true)
})

useGSAP(()=>{
  if(UserRidePopupPanel){
    gsap.to(userRidePopUpRef.current,{
      transform:'translateY(0)'
    })
  } else {
    gsap.to(userRidePopUpRef.current,{
      transform:'translateY(100%)'
    })
  }
},[UserRidePopupPanel])
useGSAP(()=>{
  if(confirmRidePanel){
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
    })
  } else {
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
    })
  }
},[confirmRidePanel])

  return (
   
     <div className='h-screen'>
       <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
          
            <div className='h-3/4'>
   <LiveTracking/>
          
            </div>
            <div className='  h-2/5 bottom-0 absolute w-full p-4'>
              <div className='w-full flex bg-yellow-400 rounded-xl justify-between p-8  items-center'>
            
                <div className='w-3/4 flex justify-start gap-5 items-center'>
                  <img className='w-12 h-12 rounded-full object-cover' src="https://imgs.search.brave.com/kj2XynP9TdrnnuEzMEg4U_5Kqis0yIyQyAZoeaciUxg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA4/OTU2NjQ0L3Bob3Rv/L3ByZXR0eS1jb2xv/bWJpYW4td29tYW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWpFd1RDTUtTcGpZ/c2FTZmlGSWxpZllu/ZVVwY3p1cmVRRmw4/bzU0M19aakU9" alt="" />
                  <h4 className='text-xl font-semibold '>{captain?.fullname}</h4>
                </div>
                <div className=' w-1/4'>
                  <h4 className='font-medium text-gray-950 text-end'>₹ 295.20</h4>
            <p className='text-gray-500 font-light text-end'>earned</p>
                </div>
              </div>
              <div className='bg-gray-300 mt-5 w-full h-1/2 rounded-xl flex justify-between items-center px-10 '>
              <div>
                <h4 className='text-4xl text-gray-800 font-light'><i className="ri-speed-up-fill"></i></h4>
                <h4 className='text-lg mt-2 font-light text-gray-600'>2.3 KM</h4>
              </div>
              <div>
                <h4 className='text-4xl text-gray-800 font-light'><i className="ri-timer-line"></i></h4>
                <h4 className='text-lg mt-2 font-light text-gray-600'>9 Mins</h4>
                
              </div>
              <div>
                <h4 className='text-4xl text-gray-800 font-light'><i className="ri-booklet-fill"></i></h4>
                <h4 className='text-lg mt-2 font-light text-gray-600'>290</h4>
              </div>
              </div>
            </div>
            <div ref={userRidePopUpRef}     className='fixed z-10 bottom-0 w-full   bg-white px-3 py-6'>
        
            <UserRidePopUp
            ride={ride}
            setUserRidePopUp={setUserRidePopUpPanel}
             setconfirmRidePanel={setconfirmRidePanel}
             confirmRide={confirmRide}
             />
            </div>
            <div ref={confirmRidePanelRef}     className='fixed z-10 h-screen bottom-0 w-full translate-y-full   bg-white px-3 py-6'>
        
            <ConfirmedRidepopup
            ride={ride}
            setUserRidePopUp={setUserRidePopUpPanel} setconfirmRidePanel={setconfirmRidePanel}/>
            </div>
        </div>
  )
}

export default CaptainHome