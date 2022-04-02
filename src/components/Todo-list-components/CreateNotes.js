import React, { useContext, useState } from 'react'
import {Modal} from 'react-bootstrap';
import { NoteContext } from '../../ContextApi/NoteContext';


export const CreateNotes = ({props}) => {

    const {createNote,handleCreateNoteClose,noteCreated,missingField} = props;
    const {getNotes} = useContext(NoteContext);

    const [note,setNote] = useState({
        title : "",
        description : ""
    });

    const onChange = (e) =>{
        setNote({...note,[e.target.name] : e.target.value});
    }

    const createNewNote = async(e) =>{
        e.preventDefault();
        const {title,description} = note;

        if(title === '' || description === ''){
            missingField();
        }else{
            var today = new Date();

            var date = `${today.getFullYear()}-${((today.getMonth()+1).toString()).padStart(2, '0')}-${((today.getDate()).toString()).padStart(2, '0')}`;
    
            var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    
            var date_created = `${date} ${time}`;
    
            const data  = {
                title : title,
                description : description,
                date_created : date_created
            }
    
            try {
                await fetch("http://localhost:5000/notes/create-note",{
                    method : "POST",
                    headers : {
                            "Content-Type" : "application/json",
                            token : localStorage.token
                    },
                    body : JSON.stringify(data)
                }).then(()=>{
                    setNote({
                        title : "",
                        description : ""
                    })
                    noteCreated();
                    getNotes();
                    handleCreateNoteClose()
                })
            } catch (error) {
                console.error(error.message);
            }
        }
    }

  return (
        <Modal show={createNote} onHide={handleCreateNoteClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create new note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={createNewNote}>
                    <input type="text" className='form-control' placeholder='Note title' name="title" onChange={onChange} defaultValue="" />
                    <textarea className='form-control my-3' placeholder="Note description" name="description" cols="30" rows="10" onChange={onChange} defaultValue=""></textarea>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-success">Create</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
        
  )
}
