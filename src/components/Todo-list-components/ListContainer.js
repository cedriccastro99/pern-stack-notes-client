import React,{useContext, useState} from 'react'
import {AiFillFileAdd} from 'react-icons/ai'
import { NoteContext } from '../../ContextApi/NoteContext';
import { CreateNotes } from './CreateNotes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditNote } from './EditNote';
import { Note } from './Note';

export default function ListContainer() {

    const {notes,isLoading,getNotes} = useContext(NoteContext);
    const [createNote,setCreateNote] = useState(false);
    const [selectedNote,setSelectedNote] = useState({});
    const [editNote,setEditNote] = useState(false);

    const handleCreateNoteOpen = () => setCreateNote(true);
    const handleCreateNoteClose = () => setCreateNote(false);

    const handleEditNoteOpen = () => setEditNote(true);
    const handleEditNoteClose = () => setEditNote(false);

    const noteCreated = () => toast.success('New note created!');
    const noteEdited = () => toast.success('Note successfully edited!');
    const deleteNote = () => toast.error('Note Deleted!');
    const missingField = () => toast.error('Please dont leave any blank fields!');

    const editSelectedNote = (note) =>{
        setSelectedNote(note);
        handleEditNoteOpen()
    }

    const deleteSelectedNote = async(note) =>{
        if(window.confirm('Are you sure you want to delete this note? ')){
            try {
                await fetch("http://localhost:5000/notes/delete-note",{
                    method : "POST",
                    headers : {
                            "Content-Type" : "application/json",
                            token : localStorage.token
                    },
                    body : JSON.stringify(note)
                }).then((response)=>{
                    if(response.status === 403){
                        window.location ="/";
                    }else{
                        deleteNote();
                        getNotes();
                    }
                })
            } catch (error) {
                console.error(error.message);
            }
        }else{
            alert('Action cancelled');
        }
    }

  return (
    <>
        <div className='border border-dark mt-1 rounded shadow list-container'>
            <div className="shadow sticky-top d-block bg-light p-2 border border-secondary border-top-0 border-start-0 border-end-0">
                <button className="btn btn-success ms-2" onClick={handleCreateNoteOpen}><AiFillFileAdd/> New note</button>
            </div>
            {
                !isLoading?
                    notes?.length !== 0?
                        notes?.map((note,index)=>
                            <Note key={index} note={note} editSelectedNote={editSelectedNote} deleteSelectedNote={deleteSelectedNote}/>
                        )
                    :
                        <>
                            <div className='card mx-2 bg-danger text-white shadow border-secondary' style={{marginTop:200}}>
                                <div className="card-body">
                                    <h5 className='card-title text-center'>NO NOTES CREATED</h5>
                                </div>
                            </div>
                        </>
                :
                ''
            }
        </div>
        <CreateNotes props={{createNote,handleCreateNoteClose,noteCreated,missingField}}/>
        <EditNote props={{selectedNote,editNote,handleEditNoteClose,noteEdited,missingField}}/>
    </>
  )
}
