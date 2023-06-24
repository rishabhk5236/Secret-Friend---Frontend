import React,{useContext, useState} from "react";
import noteContext from "../Context/Notes/noteContext";


export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  

  const handleAddNoteClick=(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"",tag:""});
    props.showAlert("Note Added Successfully","success");
  }

  const handleOnChange=(e)=>{
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (

    <div className="container my-3">
      <h3>Add Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleOnChange}
            value={note.title}
            required
            minLength={3}
            />

         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleOnChange}
            value={note.description}
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleOnChange}
            value={note.tag}
          />
        </div>
        
        <button disabled={note.title.length<3 || note.description.length<5} style={(note.title.length<3 || note.description.length<5)?{backgroundColor:'#ed687c'}:{backgroundColor:'#569bfc'} } type="submit" className="btn btn-primary" onClick={handleAddNoteClick}>
          Add Note
        </button>
      </form>
    </div>

  );
}
