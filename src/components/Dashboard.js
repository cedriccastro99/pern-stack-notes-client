import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";
import NoteContextProvider from "../ContextApi/NoteContext";
import Navbar from "./Navbar";
import NotesLists from "./NotesLists";

export const Dashboard = () =>{

    const {setAuth} = useContext(AuthContext);

    const [user,setUser] = useState();

    const getUser = async()=>{
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
                method : "GET",
                headers : {token : localStorage.token}
            })

            const parseRes = await response.json();

            setUser(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <>
            <Navbar user={user} setAuth={setAuth} />
            <NoteContextProvider>
                <NotesLists/>
            </NoteContextProvider>
        </>
    )
}

export default Dashboard;