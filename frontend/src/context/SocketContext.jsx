import  { createContext, useEffect } from 'react'
import {io} from 'socket.io-client';

export const SocketContext = createContext()
const socket = io(`${import.meta.env.VITE_BASE_URL}`);


const SocketProvider = ({children}) => {
    
useEffect(()=>{
    socket.on('connect',()=>{
        console.log("connected to server");
    })
    socket.on('disconect',()=>{
        console.log("disconnected from server")
    })
},[])

  return (
    <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider