import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();


export const AuthContextProvider = (props) =>{


    const [isAunthenticated,setIsAunthenticated] = useState(false);


    const setAuth = (bool) =>{
        setIsAunthenticated(bool);
    }

    const isAuth = async()=>{
        try {
          
          const response = await fetch("http://localhost:5000/auth/is-verify",{
            method : "GET",
            headers : {token : localStorage.token}
          })
    
          const parseRes = await response.json();

          if(parseRes === 'Session Expired'){
              toast.error('Session Expired!');
              localStorage.removeItem("token");
              setAuth(false);
          }
    
          parseRes === true ? setIsAunthenticated(true) : setIsAunthenticated(false);
     
          
        } catch (error) {
          console.error(error.message);
        }
    }
    
    useEffect(()=>{
        isAuth();
    },[])

    return(
      <>
        <AuthContext.Provider value={{setAuth,isAunthenticated,setIsAunthenticated}}>
            {props.children}
        </AuthContext.Provider>
        <ToastContainer/>
      </>
    )
}