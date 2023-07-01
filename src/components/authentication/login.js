import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login(){
  let token = localStorage.getItem('token')

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWait, setIsWait] = useState(true);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    setIsWait(false)

    fetch("http://localhost:8000/accounts/api/login/",{
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
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 text-center">
                <h3 className="mb-4 text-primary">Sign In</h3>
                {message && <div className="alert alert-danger">{message}</div>}
                <div className="mb-3">
                  <input type="email" className="form-control bg-light" onChange={(e) => setEmail(e.target.value)} />
                  <label className="form-label">Email</label>
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control bg-light" onChange={(e) => setPassword(e.target.value)} />
                  <label className="form-label">Password</label>
                </div>
                <div className="d-grid gap-2">
                  {isWait ? (
                    <button className="btn btn-primary" onClick={handleLogin}>
                      Sign In
                    </button>
                  ) : (
                    <button className="btn btn-primary" disabled>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  )}
                </div>
                <div className="mt-3">
                  <Link to="/reset_password" className="text-decoration-none">Forgot password?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )}
  }

export default Login