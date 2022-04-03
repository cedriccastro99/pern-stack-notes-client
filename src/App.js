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

  // useEffect(()=>{
  //   isAuth()
  // })
  
  // const [isAunthenticated,setIsAunthenticated] = useState(false);

  // const setAuth = boolean =>{
  //   setIsAunthenticated(boolean);
  // }

  // const isAuth = async()=>{
  //   try {
      
  //     const response = await fetch("http://localhost:5000/auth/is-verify",{
  //       method : "GET",
  //       headers : {token : localStorage.token}
  //     })

  //     const parseRes = await response.json();

  //     // if(parseRes === 'Session Expired'){
  //     //   console.log('expired')
  //     //   toast.error('Session Expired!');
  //     //   localStorage.removeItem("token");
  //     //   setAuth(false);
  //     // }

  //     parseRes === true ? setIsAunthenticated(true) : setIsAunthenticated(false);
 
      
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  return (
    <>
      <Router>
        {/* <Routes>
          <Route path="/" element={!isAunthenticated? 
              <Login setAuth={setAuth}/> 
            : 
              <Navigate to="/dashboard" replace/>} 
          />
          <Route path="/register" element={!isAunthenticated? 
              <Register setAuth={setAuth}/> 
            : 
              <Navigate to="/" replace/>} 
          />
          <Route path="/dashboard" element={isAunthenticated?
              <Dashboard setAuth={setAuth}/>
              : 
              <Navigate replace to="/"/> 
            }
          />
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes> */}
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
