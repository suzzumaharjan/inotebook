import React, { useContext, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Note = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [note,setNote]=useState({ id:"",title:"",description:"",tag:""})
  const ref=useRef(null);
  const refClose=useRef(null);
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
      {
        getNotes()
      }
      else{
        navigate('/login')
      }
    
    // eslint-disable-next-line
  }, [])
const addData=()=>{
    //prevent from reloading
    editNote(note._id,note.title,note.description,note.tag);
refClose.current.click();
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  
 
  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote(currentNote);
  }
  

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
  

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className='m-auto'>
                    <div className="mb-3 col-sm-7 m-auto">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                     
                    </div>
                    <div className="mb-3 col-sm-7 m-auto">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3 col-sm-7 m-auto">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title < 5 || note.description < 5} type="button" className="btn btn-primary" onClick={addData}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <h1>Your Notes</h1>
        <div className='container'>
          {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}

      </div>
    </>

  )
}

export default Note
