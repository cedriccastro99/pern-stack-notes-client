import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContext'

export const LoginAuth = () => {

    const {isAunthenticated} = useContext(AuthContext);

  return (
    !isAunthenticated? <Outlet/>  : <Navigate to="/dashboard" replace/>
  )
}
