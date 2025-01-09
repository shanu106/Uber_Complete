import React from 'react'

const WaitingforDriver = (props) => {
  return (
    <div className='w-full px-4 py-8 h-full '>
    <h5 onClick={()=>{
            props.setdriverPanel(false)
           }} className='w-full absolute top-0 text-center text-3xl text-gray-400'><i className="ri-arrow-down-wide-line"></i></h5>
          <h3 className='w-full text-center text-gray-900 font-bold  text-2xl mb-5'>Meet at the pickup Point</h3>
           <div className='flex justify-between  items-center flex-wrap'>
            <div className='w-full flex justify-between mb-5 items-center ' >

           <img className='rounded-full  w-1/5 absolute left-3 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" alt="" />
           <img className='rounded-full  w-1/3 ml-5' src="data:image/jpeg;base64,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" alt="" />
           <div className=''> 
            <h3 className='text-lg text-gray-800 w-full text-end font-bold'>{props.ride?.captain.fullname}</h3>
            <h2 className='font-medium text-gray-600 text-lg text-end w-full'> {props.ride?.captain.vehicle.plateNumber}</h2>
            <p className='text-gray-400 text-sm'>{props.ride?.captain.vehicle.color}, Maruti suzuki Baleno</p>
            <h3 className='text-lg font-bold text-end text-gray-800'>{props.ride?.otp}</h3>
            </div>
           </div>
            <div className='w-full flex gap-5 items-center mb-5'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
             <h3 className='text-lg font-medium'>562/11 A</h3>
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
         
           </div>
 </div>
  )
}

export default WaitingforDriver