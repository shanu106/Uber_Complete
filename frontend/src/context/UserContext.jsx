import React, { createContext, useState } from 'react'


export const userDataContext =  createContext()

const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email:'',
        fullname:'',
        password:''
    })
  
  return (
  <userDataContext.Provider value={{user, setUser}}>{children}</userDataContext.Provider>
  )
}

export default UserContext