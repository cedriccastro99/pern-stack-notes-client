import React, { useState , useEffect} from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import { ErrorPage } from './components/ErrorPage';
import { AuthContextProvider } from './ContextApi/AuthContext';
import { LoginAuth } from './components/LoginAuth';
import { DashboardAuth } from './components/DashboardAuth';

function App() {

  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route element={<LoginAuth />}>
              <Route path="/" element={<Login/>}/>
            </Route>
            <Route element={<LoginAuth />}>
              <Route path="/register" element={<Register/>} />
            </Route>
            <Route element={<DashboardAuth/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route path="*" element={<ErrorPage/>}></Route>
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
