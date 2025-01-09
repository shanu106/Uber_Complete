import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForRideConfirm from '../components/WaitingForRideConfirm';
import WaitingforDriver from '../components/WaitingforDriver';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking'
const Home = () => {

  const [pick, setpick] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
const panelCloseRef = useRef(null)
const [vehiclePanel, setvehiclePanel] = useState(false)
const vehiclePanelRef = useRef(null)
const [confirmRidePanel, setconfirmRidePanel] = useState(false)
const confirmRidePanelRef = useRef(null)
const waitingForRideConfirmRef = useRef(null)
const [waitingForRideConfirmPanel, setwaitingForRideConfirmPanel] = useState(false)
const [driverPanel, setdriverPanel] = useState(false)
const driverPanelRef = useRef(null)
const [pickupsuggestion, setpickupsuggestion] = useState([]);
const [destinationsuggestion, setdestinationsuggestion] = useState([]);
const [activeField, setactiveField] = useState(null)

const [fare, setfare] = useState({})
const [vehicleType, setvehicleType] = useState('')
const [ride, setride] = useState(null)
const [fieldBlank, setfieldBlank] = useState(false)
const fieldBlankRef = useRef(null)
const navigate = useNavigate();
const {user} = useContext(userDataContext)
const {socket } = useContext(SocketContext)

useEffect(()=>{

  socket.emit("join",{userType:'user', userId:user._id})
},[user]);

socket.on('ride-confirmed',(ride)=>{

  setdriverPanel(true)
  setwaitingForRideConfirmPanel(false)
  setride(ride)
})
socket.on('ride-started',(ride)=>{
  navigate('/riding',{state:{ride:ride}})
})




const submitHandler = async (e) =>{
 e.preventDefault();
    pick
    destination
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`,{
      params:{
        pickUp:pick,
        destination
      },
      headers:{
        Authorization:`${localStorage.getItem('token')}`
      }
    }) 
  
    setfare(response.data);
    

    setvehiclePanel(true)
   
  }
 
    

useGSAP(()=>{
  if(panelOpen){
    gsap.to(panelRef.current,{
   
      height:'70%',
      padding:24
    }) ,
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
  } else {
    gsap.to(panelRef.current,{
   
      height:'0%'
    }),
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
  }
},[panelOpen])


useGSAP(()=>{
  if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    }) 
  } else {
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    }) 

  }
},[vehiclePanel])


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
useGSAP(()=>{
  if(fieldBlank){
    gsap.to(fieldBlankRef.current,{
      transform:'translateY(0)'
    })
  } else {
    gsap.to(fieldBlankRef.current,{
      transform:'translateY(100%)'
    })

  }
},[fieldBlank])
useGSAP(()=>{
  if(waitingForRideConfirmPanel){
    gsap.to(waitingForRideConfirmRef.current,{
      transform:'translateY(0)'
    })
  } else {
    gsap.to(waitingForRideConfirmRef.current,{
      transform:'translateY(100%)'
    })

  }
},[waitingForRideConfirmPanel])

useGSAP(()=>{
  if(driverPanel){
    gsap.to(driverPanelRef.current,{
      transform:'translateY(0)'
    })
  } else {
    gsap.to(driverPanelRef.current,{
      transform:'translateY(100%)'
      })
  }
},[driverPanel])

const handlePickupChange = async (e) =>{

  try {
    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion`,{
      params:{
        input:e.target.value
      },
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }) 
  
  
   setpickupsuggestion(response.data)
 
  } catch (error) {
    throw new Error(error)
  }
}
const handleDestinationChange = async (e) => {
 

  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      
      setdestinationsuggestion(response.data)
  } catch(error) {
    throw new Error(error)
  }
}

const  createRide = async () =>{
 
  try {
    const token = localStorage.getItem('token');
  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
      
     
        vehicleType,
        pickUp:pick,
        destination,

      },
      {headers:{
        Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json'
      }
      
  })



  } catch (error) {
    console.log("here is error ",error)
  }
}

  return (
    <div className=' h-screen w-screen '>
      
      <div className='h-full w-full '>
      <img className='w-20 left-5 absolute top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
     
      <LiveTracking/>
      
      </div>
      <div  className='  w-full h-screen top-0 flex flex-col overflow-hidden justify-end absolute'>
        <div className='h-[40%] bg-white pb-5   relative overflow-hidden'>
          <h5  onClick={()=>{
            setpanelOpen(false)
          }} className='absolute  top-3 right-3 text-2xl'>
            <i ref={panelCloseRef} className='ri-arrow-down-wide-line opacity-0'></i>
          </h5>
            <h4 className='text-3xl ml-4 mt-3  font-semibold '>Find a trip</h4>
          <form className=' h-full px-6 py-7 ' onSubmit={(e)=>{
            
            submitHandler(e);
          }}>
            <div className='w-1 h-16 top-[45%] absolute bg-gray-950 rounded-full left-8 '></div>
            <input onClick={()=>{
              setactiveField('pickup')
              setfieldBlank(false)
              setpanelOpen(true);
            }} value={pick} onChange={(e)=>{
              handlePickupChange(e)
             
              setpick(e.target.value);
              
              
            }} className='w-full text-xl font-light px-9 py-2 mt-3 rounded-lg outline-none bg-[#eee]' placeholder='Add your Pickup Location' type="text" />
            <input onClick={()=>{
              setactiveField('destination')
              setfieldBlank(false)
              setpanelOpen(true);
            }} value={destination}
             onChange={(e)=>{
              handleDestinationChange(e);
            
              setdestination(e.target.value)
              
               
             
        
            }} className='w-full text-xl font-light px-9 py-2 mt-5 rounded-lg outline-none bg-[#eee]' placeholder='Enter your Destination' type="text" />
          <button 
          onClick={()=>{
            if(destination && pick){

              setvehiclePanel(true)
            } else {
              setfieldBlank(true);
            }
          }}

          className='bg-[#111] text-white rounded-xl px-2 py-2 w-full mt-5  outline-none  placeholder:text-sm text-lg '>Find a Ride</button>
          </form>
        </div>

        <div ref={panelRef} className='bg-white w-full h-0 '>
          <LocationSearchPanel 
             suggestions={activeField === 'pickup' ? pickupsuggestion : destinationsuggestion}
          activeField={activeField} 
          setpanelOpen={setpanelOpen} 
          vehiclePanel={vehiclePanel} 
          setvehiclePanel={setvehiclePanel}
           setPickup={setpick} 
           setDestination={setdestination}
           />
       
      </div>
      </div>
            <div ref={fieldBlankRef}   className='fixed z-10 translate-y-full bottom-0 w-full  px-3 py-6'>
           <h4 className='w-full text-xl text-center px-10 py-5 border-2 rounded-xl bg-red-400 font-semibold'> pickup and destination field cannot be blank</h4>
            </div>
            <div  ref={vehiclePanelRef} className='fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-6'>
            <VehiclePanel 
            setvehicleType={setvehicleType} 
            fare={fare}
             pickUp={pick} 
             destination={destination}  
             setconfirmRidePanel={setconfirmRidePanel}
              setvehiclePanel={setvehiclePanel}/>
            </div>
            <div  ref={confirmRidePanelRef} className='fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-6'>
           <ConfirmRide  
           createRide={createRide} 
           motorcyclefare={fare.motorcycle} 
           carfare={fare.car} 
           autofare={fare.auto}
            fare={fare}
             pickUp={pick}
              destination={destination} 
              vehicleType={vehicleType}
               waitingForRideConfirmPanel={waitingForRideConfirmPanel}
                setwaitingForRideConfirmPanel={setwaitingForRideConfirmPanel} 
                setconfirmRidePanel={setconfirmRidePanel} />
            </div>
            <div  ref={waitingForRideConfirmRef} className='fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-6'>
           <WaitingForRideConfirm
           fare={fare}
           motorcyclefare={fare.motorcycle} 
           carfare={fare.car} 
           autofare={fare.auto}
           pickUp={pick}
            destination={destination} 
            vehicleType={vehicleType}
           setwaitingForRideConfirmPanel={setwaitingForRideConfirmPanel} />
            </div>
            <div  ref={driverPanelRef}  className='fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-6'>
           <WaitingforDriver ride={ride} setdriverPanel={setdriverPanel}  />
            </div>
    </div>
  )
}

export default Home