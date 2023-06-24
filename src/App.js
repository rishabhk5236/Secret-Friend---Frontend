import "./App.css";
import Navbar from "./Components/Navbar.js";
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/Notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import {useState} from 'react';

function App() {

  // this is the base url for hitting the apis 
  // also change the base url in NoteContext 
  const base_url="https://secret-friend-backend.onrender.com";

  const[alert,setAlert]=useState(null);

// this function is for showing the alert 
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} base_url={base_url}/>}/>
          <Route exact path="/about" element={<About showAlert={showAlert} base_url={base_url}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert} base_url={base_url}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} base_url={base_url}/>}/>

        </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
