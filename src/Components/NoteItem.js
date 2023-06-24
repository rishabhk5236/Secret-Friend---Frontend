import React,{useContext} from "react";
import noteContext from "../Context/Notes/noteContext";

export default function Noteitem(props) {
  const { note ,updateNote} = props;

  const context = useContext(noteContext);
  const { deleteNote} = context;

  const handleDeleteClick=()=>{
    deleteNote(note._id);
    props.showAlert("Deleted Note Successfully","success");
  }

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fa-sharp fa-solid fa-trash mx-2" onClick={handleDeleteClick}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}
