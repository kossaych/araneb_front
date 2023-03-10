import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login(){
  let token = localStorage.getItem('token')

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [isWait,setIsWait]=useState(true)
  const [message,setMessage]=useState("")
  function sendLoginData(){
    setIsWait(false)

    fetch("http://127.0.0.1:8000/accounts/api/login/",{
  method:'post',
  headers: {
  'Content-Type': 'application/json',
  },
  body:JSON.stringify({
  email:email,
  password:password,

  })
  
  },
  )
  .then(response =>{
    setIsWait(true)
  if (response.status===200){
      setPassword('')
      return response.json()
  }else if(response.status===500){
    return "server error 500"
  }else{
    return response.json()
  }
  })
  .then(data =>{
    if (data === "server error 500" || data ==='account not active' || data ==='false data' || data ==='email not regested'){
    document.getElementById('message').style.display='block';
    setMessage(data)
  }else {
    localStorage.setItem('token',JSON.stringify(data))
    
     window.location.href='/'
  }
  })}
  if (token){
    window.location.href="/"
  }else{
    return(

    <section className="col-12 col-md-10 col-lg-10 col-xl-10">
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius:1+"rem"}}>
              <div className="card-body p-2 text-center">
    
                <h3 className="mb-5">Sign in</h3>
                <div id="message" className="alert alert-danger" style={{display:"none"}}>{message}</div>

                <div className="form-outline mb-4 ">
                  <input type="email" onChange={e => setEmail(e.target.value)}/><br/>
                  <label className="form- "    >email</label>
                </div>
                <div className="form-outline mb-4">
                 <input type="password" onChange={e => setPassword(e.target.value)}/><br/>
                <label className="form-label "   >password</label>
                </div>
               
                <hr className="my-4"/>
                <Link  to={"/reset_password"}>Forgot password?</Link><br/>
                {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendLoginData}>send</button>:<button className="btn mt-2 btn-primary btn-lg btn-block" disabled >
                    <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </button>}
              
              
              </div>
            </div> 
          </div>
        </div>
      </div>
    </section>  
    
    )}
  }

export default Login