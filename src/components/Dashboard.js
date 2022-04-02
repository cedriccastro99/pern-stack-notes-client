import React, { useEffect, useState } from "react";
import NoteContextProvider from "../ContextApi/NoteContext";
import Navbar from "./Navbar";
import NotesLists from "./NotesLists";

export const Dashboard = ({setAuth}) =>{

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