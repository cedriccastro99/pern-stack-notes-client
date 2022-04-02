import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = ({setAuth}) =>{

    const boxStyle={
        width: 455,
        height : 355,
        marginTop : 120
    }
    
    const inputStyle={
        width:375
    }

    const [inputs,setInputs] = useState({
        email : "",
        password : ""
    })

    const { email,password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs ,[e.target.name] : e.target.value});
    }

    const onSubmitForm = async(e) =>{
        e.preventDefault();

        try {

            const data = {email,password};

            const response = await fetch("http://localhost:5000/auth/login",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(data)
            })

            const parseRes = await response.json();

            if(parseRes.token){
                toast.success('Login successfully!');
                setTimeout(()=>{
                    localStorage.setItem("token",parseRes.token);
                    setAuth(true);
                },1000)
            }else{
                setAuth(false);
                toast.error(parseRes)
            }
            
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="container border rounded border-dark shadow" style={boxStyle}>
                <div className="my-3">
                    <h1 className="text-center">Login</h1>
                    <div className="d-flex justify-content-center">
                        <form className="text-center" onSubmit={onSubmitForm}>
                            <input className="text-center form-control my-3" value={email}  style={inputStyle} onChange={(e)=>{ onChange(e) }} type="email" name="email" placeholder="Enter Email" />
                            <input className="text-center form-control mb-3" value={password}  style={inputStyle} onChange={(e)=>{ onChange(e) }} type="password" name="password" placeholder="Enter Password" />
                            <button className="btn btn-success mb-1">Login</button>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
                <div className="text-center">
                    <p className="fst-italic fw-light" >Need an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login;