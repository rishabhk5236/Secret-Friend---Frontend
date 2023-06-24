import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import noteContext from "../Context/Notes/noteContext";

export default function Login(props) {

    const Context=useContext(noteContext);
    const {userDetails,getUserDetails}=Context;
    
    let navigate=useNavigate();

    const [credentials,setCredentials]=useState({email:"",password:""});

    const handleSubmit=async (e)=>{
        e.preventDefault();
        

        // htting the api 
        const response = await fetch(`${props.base_url}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password}),
          });
          const json=await response.json();
          console.log(json);

          //validating
          if(json.success){
            localStorage.setItem('token',json.authToken)
            getUserDetails();
            navigate('/');
            props.showAlert("Successfully Logged in","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }


    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }



  return (
    <div className="container mx-2 my-3">
      <h2>Enter your login details to continue</h2>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
