import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import noteContext from "../Context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getUserDetails,getNotes ,editNote} = context;

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"});

  let navigate=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
      getUserDetails();
    }
    else{
        navigate('/login');
    }
  },[]);

  const ref = useRef();
  const refClose = useRef();


// this is for opening the modal 
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };

  // this is for actually hitting the api and updating the notes 

  const updateEditedNote=()=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully","success");
  }

  const handleOnChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }

  return (
    //this component is for adding notes
    <>
      <AddNote showAlert={props.showAlert}/>

      {/* this code is for edit modal */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* this is modal body  */}

              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleOnChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleOnChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleOnChange}
                    value={note.etag}
                  />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={updateEditedNote}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h3>Your Notes</h3>
        <div className="conatiner">
          {notes.length===0 && "No notes to display"}
        </div>

        <div className="row">
          {notes.map((note) => {
            return <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
          })}
        </div>
      </div>
    </>
  );
}
