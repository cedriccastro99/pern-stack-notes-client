import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = ({setAuth}) =>{

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
        password : "",
        name : ""
    })

    const { email,password,name } = inputs;

    const onChange = (e) => {
        setInputs({...inputs ,[e.target.name] : e.target.value});
    }

    const onSubmitForm = async(e) =>{
        e.preventDefault();

        try {

            const data = {email,password,name};

            const response = await fetch("http://localhost:5000/auth/register",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(data)
            })

            const parseRes = await response.json();

            localStorage.setItem("token",parseRes.token);
            setAuth(true);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="container border rounded border-dark shadow" style={boxStyle}>
                <div className="my-3">
                    <h1 className="text-center">Register</h1>
                    <div className="d-flex justify-content-center">
                        <form className="text-center" onSubmit={onSubmitForm}>
                            <input className="text-center form-control my-3" value={email}  style={inputStyle} onChange={(e)=>{ onChange(e) }} type="email" name="email" placeholder="Enter Email" />
                            <input className="text-center form-control mb-3" value={password}  style={inputStyle} onChange={(e)=>{ onChange(e) }} type="password" name="password" placeholder="Enter Password" />
                            <input className="text-center form-control mb-3" value={name}  style={inputStyle} onChange={(e)=>{ onChange(e) }} type="text" name="name" placeholder="Enter Name" />
                            <button className="btn btn-success mb-1">Register</button>
                        </form>
                    </div>
                </div>
                <div className="text-center">
                    <p className="fst-italic fw-light" >Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default Register;