import React from 'react'
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai'

export const Note = ({note,deleteSelectedNote,editSelectedNote}) => {


  return (
    <div>
        <div className="card mx-3 my-3 border-secondary shadow">
            <div className="card-header">
                <h5 className="card-title">{note?.note_title}</h5>
            </div>
            <div className="card-body pb-0">
                <p className="card-text mb-5">{note?.note_description}</p>
                <div className='text-muted d-flex justify-content-end'>
                    <p className='me-2' style={{fontSize:14}}>Created : {`${new Date(Date.parse(note?.date_created)).toLocaleString('en-US', { hour12: true })}`}</p>
                    <p style={{fontSize:14}}> | </p>
                    <p className='ms-2' style={{fontSize:14}}>Updated : {`${new Date(Date.parse(note?.date_updated)).toLocaleString('en-US', { hour12: true })}` === 'Invalid Date' ? '---' : `${new Date(Date.parse(note?.date_updated)).toLocaleString('en-US', { hour12: true })}`}</p>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-primary me-2 text-center" onClick={()=>{editSelectedNote(note)}}><AiOutlineEdit/> Edit</button>
                <button className="btn btn-danger" onClick={()=>{deleteSelectedNote(note)}}><AiFillDelete/>Delete</button>
            </div>
        </div>                
    </div>
  )
}
