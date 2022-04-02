import React, { useState , useEffect} from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';

//components
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  useEffect(()=>{
    isAuth()
  })
  
  const [isAunthenticated,setIsAunthenticated] = useState(false);

  const setAuth = boolean =>{
    setIsAunthenticated(boolean);
  }

  const isAuth = async()=>{
    try {
      
      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method : "GET",
        headers : {token : localStorage.token}
      })

      const parseRes = await response.json();


      parseRes === true ? setIsAunthenticated(true) : setIsAunthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <Router>
        <Routes>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
