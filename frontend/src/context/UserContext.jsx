
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
     const [user, setUser] = useState (() => {
       const storedUser = localStorage.getItem('user');
       return storedUser ? JSON.parse(storedUser) : null;
     })

     useEffect(() => {
       if(user){
        localStorage.setItem('user', JSON.stringify(user));
       }else{
        localStorage.removeItem('user')
       }
     }, [user])
     return (
     <UserContext.Provider value={{user, setUser}}>
            {children}
     </UserContext.Provider>
     )
};

export default function useUser (){
  return useContext(UserContext)
}