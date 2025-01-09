import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRidepanel from '../components/FinishRidepanel'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = (props) => {
  const location =useLocation()
  const rideData = location.state?.ride;
  const [finishRidePanel, setfinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  useGSAP(()=>{
    if(finishRidePanel){

      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  } ,[finishRidePanel])
  return (
    <div className='h-screen'>
    <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
             <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
             <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                 <i className="text-lg font-medium ri-logout-box-r-line"></i>
             </Link>
         </div>
       
         <div className='h-4/5'>
  <LiveTracking/>
       
         </div>
         <div className='  h-1/5 bottom-0 flex justify-between items-center absolute w-full p-4 bg-yellow-400'>
         <h5 onClick={()=>setfinishRidePanel(true)} className='w-full text-center text-5xl font-bold z-10 absolute top-0 right-5'><i className="ri-arrow-up-wide-fill"></i></h5>
         <h4 className='text-3xl font-mono font-bold'>4 KM away</h4>
         <button onClick={()=>{
          setfinishRidePanel(true)
         }} className=' px-4 text-2xl text-white bg-green-500 rounded-xl font-bold  py-2 mt-5'>Complete Ride</button>

           </div>
         <div  ref={finishRidePanelRef}    className='fixed z-10 h-screen bottom-0 w-full translate-y-full   bg-white  py-6'>
        
      <FinishRidepanel ride={rideData} setfinishRidePanel={setfinishRidePanel}/>
        </div>
     </div>
  )
}

export default CaptainRiding