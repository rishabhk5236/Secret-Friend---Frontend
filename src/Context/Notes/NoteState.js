import React, { useState } from 'react';
import NoteContext from "./noteContext"

const NoteState=(props)=>{

    const host="https://secret-friend-backend.onrender.com";
    const initialNotes=[];

    const [notes,setNotes]=useState(initialNotes);

    const [userDetails,setUserDetails]=useState({name:"",email:"",date:"",id:""});

      //this function is to add notes
      const addNote=async (title,description,tag)=>{
        await fetch(`${host}/api/notes/addnotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
          body:JSON.stringify({title,description,tag}),
        });

        getNotes();
      }


      const getUserDetails=async ()=>{
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
        });

        const json=await response.json();
        setUserDetails({name:json.name,email:json.email,date:json.date,id:json._id});
      }

      // this is a function for getting the notes 
      const getNotes=async ()=>{
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
        });
        
        const json=await response.json();
        console.log(json);
        setNotes(json);
      }

    //this function is to delete notes
      const deleteNote=async (id)=>{
        await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
        });

        getNotes();
      }


      
    //this function is to edit notes
      const editNote=async (id,title,description,tag)=>{
        await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
          body:JSON.stringify({title,description,tag}),
        });
        getNotes();

      }

    
    return(
    <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote,userDetails,getUserDetails}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;