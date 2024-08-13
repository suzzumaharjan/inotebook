import React, { useState } from "react";
import NoteContext from "./noteContext";



const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNote] = useState([]);


  //Get all the nodes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const jsonData = await response.json();
    setNote(jsonData);
  }

  //Add notes

  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const jsonData = await response.json();
    setNote(notes.concat(jsonData));
  }
  //Delete notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")        // 'Content-Type': 'application/x-www-form-urlencoded',
      } // body data type must match "Content-Type" header
    });
    const jsondata = response.json();
    console.log(jsondata)
    console.log("the delete note id is" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNote(newNotes)
  }
  //edit notes
  const editNote = async (id, title, description, tag) => {
    ///API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")             // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    let newNotes = JSON.parse(JSON.stringify(notes))
    const jsondata = await response.json();
    console.log(jsondata); // parses JSON response into native JavaScript objects
    console.log(id);
    //logic to edit data
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      break;
    }
    setNote(newNotes);

  }
  return (
    //provide value to all the component as their require
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;