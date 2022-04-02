import React, { createContext, useEffect, useState } from "react";

export const NoteContext = createContext();


export const NoteContextProvider = (props) =>{

    const [notes,setNotes] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const getNotes = async() =>{
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/notes/get-notes",{
                method : "GET",
                headers : {token : localStorage.token}
            });

            await response.json().then((data)=>{
                setIsLoading(false)
                setNotes(data);
            })

            
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getNotes()
    },[])

    return(
        <NoteContext.Provider value={{notes,setNotes,getNotes,isLoading}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider;