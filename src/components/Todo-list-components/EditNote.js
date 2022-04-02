import React, { useContext, useState ,useEffect } from 'react'
import {Modal} from 'react-bootstrap';
import { NoteContext } from '../../ContextApi/NoteContext';

export const EditNote = ({props}) => {

    const {selectedNote,editNote,handleEditNoteClose,noteEdited,missingField} = props;
    const {getNotes} = useContext(NoteContext);

    const [note,setNote] = useState({
        note_id : "",
        title : "",
        description : "",
    })

    const onChange = (e) =>{
        e.preventDefault();
        setNote({...note,[e.target.name] : e.target.value})
    }

    useEffect(()=>{
        if(editNote===true){
            setNote({
                note_id : selectedNote.id,
                title : selectedNote.note_title,
                description : selectedNote.note_description,
            })
        }
    },[editNote])

    const editSelectedNote = async(e) =>{
        e.preventDefault();
        const {title,description} = note;

        if(title === '' || description === ''){
            missingField();
        }else{
            try {
                var today = new Date();
    
                var date = `${today.getFullYear()}-${((today.getMonth()+1).toString()).padStart(2, '0')}-${((today.getDate()).toString()).padStart(2, '0')}`;
    
                var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    
                var date_udpated = `${date} ${time}`;
    
                note.date_updated = date_udpated

                await fetch("http://localhost:5000/notes/edit-note",{
                    method : "POST",
                    headers : {
                            "Content-Type" : "application/json",
                            token : localStorage.token
                    },
                    body : JSON.stringify(note)
                }).then(()=>{
                    setNote({})
                    noteEdited();
                    getNotes();
                    handleEditNoteClose()
                })
            } catch (error) {
                console.error(error.message);
            }
        }

        
    }

  return (
        <Modal show={editNote} onHide={handleEditNoteClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={editSelectedNote}>
                    <input type="text" className='form-control' placeholder='Note title' name="title" onChange={(e)=>{onChange(e)}} defaultValue={selectedNote?.note_title} />
                    <textarea className='form-control my-3' placeholder="Note description" name="description" cols="30" rows="10" onChange={(e)=>{onChange(e)}} defaultValue={selectedNote?.note_description}></textarea>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
  )
}
