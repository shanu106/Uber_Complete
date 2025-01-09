import React from 'react'
// { suggestions, setvehiclePanel, setpanelOpen, setPickup, setDestination, activeField }
const LocationSearchPanel = (props) => {
  const handleSuggestionClick = (suggestion) => {
    if (props.activeField === 'pickup') {
        props.setPickup(suggestion)
    } else if (props.activeField === 'destination') {
        props.setDestination(suggestion)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
}
  const locations=props.suggestions  
  let i = 0;
  return (

    <>
{
  locations.map(function(loca){
    
    
    
    return (
      <div onClick={()=>{
  //  setvehiclePanel(true)
   props.setpanelOpen(false)
   handleSuggestionClick(loca.description)

  }} key={i++} className='flex border-2 active:border-black px-3 justify-start items-center py-3 my-2 rounded-xl gap-2'>
            <h2 className='h-8 w-12  bg-[#eee] flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium' >{loca.description}</h4>
        </div>)
            })


            }
         
          
        
           
            
      
 
  </>
  )
}

export default LocationSearchPanel