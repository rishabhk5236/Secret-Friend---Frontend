import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import noteContext from "../Context/Notes/noteContext";


export default function Signup(props) {

  const Context=useContext(noteContext);
    const {getUserDetails}=Context;

    let navigate=useNavigate();

    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});

    const handleSubmit=async (e)=>{
        e.preventDefault();
        

        // htting the api 
        const response = await fetch(`${props.base_url}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
          });
          const json=await response.json();
          console.log(json);

          //validating
          if(json.success){
            localStorage.setItem('token',json.authToken);
            getUserDetails();
            navigate('/');
            props.showAlert("Signed Up Successfully","success");
          }
          else{
            props.showAlert(json.error,"danger");
          }
    }


    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }



  return (
    <div className="container mx-2 my-3">
      <h2>Create Account to use Secret Friend</h2>
    <form className='my-4' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
            Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={onChange}
          value={credentials.name} required minLength={3}
        />
      </div>
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
          value={credentials.email} required
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
          value={credentials.password} required minLength={5}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="cpassword"
          id="cpassword"
          onChange={onChange}
          value={credentials.cpassword}
        />
        {credentials.password!==credentials.cpassword && <div className='form-text'>Password and confirm password should be same</div>}
      </div>
      <button disabled={credentials.password!==credentials.cpassword} type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  </div>
  )
}
