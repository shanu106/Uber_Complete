import React from 'react'

const UserRidePopUp = (props) => {
  return (
    <div className='w-full '>
        <h5 onClick={()=>{
               props.setUserRidePopUp(false);
              }} className='w-full absolute -top-2 text-center text-3xl text-gray-400'><i className="ri-arrow-down-wide-line"></i></h5>
        <div id='top' className='flex mb-5 bg-yellow-300 p-2 rounded-xl justify-between items-center px-4'>
            <div  className='flex items-center gap-4'>
                <img className='w-12 h-12 object-cover rounded-full' src="https://imgs.search.brave.com/J168v9jJrb9v02H2KNnm6wwYcve3oO4ALI9ouchgdks/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzc5Lzc4LzQ4/LzM2MF9GXzI3OTc4/NDgzNl80ZUtNamZJ/ZkR0YUlDS21hU0JB/eWZ0Mlk0M3U1Vjc2/US5qcGc" alt="" />
                <h4 className='text-xl font-bold'>{props.ride?.user.fullname}</h4>
            </div>
            <div className='text-xl font-semibold'>{props.ride?.distance}</div>
        </div>
        <div id='bootom'>
       
        <div className='w-full flex gap-5 items-center mb-5'>
               <i className="text-lg ri-map-pin-fill"></i>
               <div>
                <h3 className='text-lg font-medium'>599/13 B</h3>
                <p className='text-sm text-gray-600'>{props.ride?.pickUp}</p>
               </div>
               </div>
               <div className='w-full flex gap-5 items-center mb-5'>
               <i className="text-lg ri-map-pin-fill"></i>
               <div>
                <h3 className='text-lg font-medium'>599/13 B</h3>
                <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
               </div>
               </div>
               <div className='w-full flex gap-5 items-center'>
               <i className="text-lg ri-money-rupee-circle-line"></i>
               <div>

                <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
                <p className='text-sm text-gray-600'>Cash Cash</p>
               </div>
               </div>
               <button onClick={()=>{
                props.setconfirmRidePanel(true);
                props.confirmRide();
               }} className='w-full text-2xl text-white bg-green-500 rounded-xl font-light py-2 mt-5'>Confirm</button>
               <button onClick={()=>{
                props.setUserRidePopUp(false);
               }} className='w-full text-2xl text-white bg-gray-500 rounded-xl font-light py-2 mt-5'>Ignore</button>
    
    </div>
    </div>
  )
}

export default UserRidePopUp