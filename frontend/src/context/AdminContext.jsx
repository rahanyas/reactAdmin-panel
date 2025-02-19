/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

export const AdminContext = createContext(null);


export const AdminProvider = ({children}) => {
  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null
  });

  useEffect(() => {
    if(admin){
      localStorage.setItem('admin', JSON.stringify(admin))
    }else{
      localStorage.getItem('admin')
    }
  }, [admin])


  return (
    <AdminContext.Provider value={{admin, setAdmin}}>
         {children}
    </AdminContext.Provider>
  )
};

export default function useAdmin(){
  return useContext(AdminContext)
}
