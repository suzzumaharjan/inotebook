import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const addData=(e)=>{
        //prevent from reloading
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className='container my-4 px-4' style={{ "border": "1px solid black" }}>
                <h1>Add a Note</h1>
                <form className='m-auto'>
                    <div className="mb-3 col-sm-7 m-auto">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="email" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 col-sm-7 m-auto">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3 col-sm-7 m-auto">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                   
                    <button disabled={note.title < 5 || note.description < 5} type="submit" className="btn btn-primary" onClick={addData}>Add Note</button>
                </form>

            </div>

        </div>
    )
}

export default AddNote
