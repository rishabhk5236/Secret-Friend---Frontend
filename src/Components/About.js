import React from 'react'
import AboutPng from '../Resources/AboutPng.png';


export default function About() {
  
  return (
    <div className="container my-3">
    <h1 className="text-center">About us</h1>
    
    <div class="card aboutCard mb-3">
<div class="row g-0">
<div class="col-md-4">
  <img src={AboutPng} class="img-fluid rounded-start aboutCardImg" alt="..."/>
</div>
<div class="col-md-8">
  <div class="card-body">
    <h3 class="card-title">Seret Friend</h3>
    <p class="card-text mb-0">Everyone has a person in their life whom we can share our top most secrets and that person keeps our secrets safe.</p>
    <p class="card-text">That is the conceppt on which Secret Friend application works.Here-</p>
    <p class="card-text">1. You can Login/Signup with your credentials</p>
    <p class="card-text">2. Create , Read , Update and Delete the notes</p>
    <p class="card-text">3. No one have authorization to access someone others notes.</p>
    <p class="card-text"><small class="text-body-secondary">Secret Friend Keeps Your Secrets Safe</small></p>
    <p class="card-text my-0"><strong class="text-body-secondary">Made By : Rishabh Kanaujiya</strong></p>
    <p class="card-text my-0"><strong class="text-body-secondary">rishabhk5236@gmail.com</strong></p>
    <a class="card-text my-0" href="https://www.linkedin.com/in/rishabh-kanaujiya-49643a222/" target='_blank'><strong class="text-body-secondary" >Linked In</strong></a>
  </div>
</div>
</div>
</div>

</div>
  )
}
