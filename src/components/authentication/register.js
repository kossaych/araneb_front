import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register(){
  const [first_name,setFirstname]=useState("")
  const [last_name,setLastname]=useState("")
  const [password1,setPassword1]=useState("")
  const [email,setEmail]=useState("")
  const [password2,setPassword2]=useState("")
  const [code,setCode]=useState("")
  const [isWait,setIsWait]=useState(true)
  const [message,setMessage]=useState("")
  const [codeMessage,setCodeMessage]=useState("")
  function sendRegistrationData(){
    setIsWait(false)
      fetch("http://127.0.0.1:8000/accounts/api/register/",{
  method:'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify({
      first_name:first_name,
      last_name:last_name,
      email:email,
      password1:password1,
      password2:password2,
  
  })

},
)
.then(response =>{
  setIsWait(true)
  if (response.status===200){
    setPassword1('')
    setPassword2('')
    return true
}else if(response.status==400){
  return response.json()
}
else if(response.status==500){

  return "server error 500"
}
})
.then(data =>{
  if (data == true){
  document.getElementById("register-form").style.display="none"
  document.getElementById("code-virif").style.display="block"
}else {
  document.getElementById('message').style.display='block';
  setMessage(data)
}
})}
function sendVirificationData(){
  setIsWait(false)

  fetch("http://127.0.0.1:8000/accounts/api/activate/",{
method:'post',
headers: {
'Content-Type': 'application/json',
},
body:JSON.stringify({
  email:email,
  code:code,
  

})

},
)
.then(response =>{
  setIsWait(true)
if (response.status=== 200){
  return response.json()
}else if(response.status===400){
  return response.json() 
}
else if(response.status===500){
  return "server error 500"
}
})
.then(data =>{
  if(data === " code not sended for your email" || data === 'user not registed' || data === 'invalid code time' || data === 'False code' || data === "server error 500"){
    document.getElementById('code-message').style.display='block';
    setCodeMessage(data)
  }else{
    localStorage.setItem('token', JSON.stringify(data));
    window.location.href = "/";
  }
  
})}
 let token = localStorage.getItem('token')
if (token){
  window.location.href="/"
}else{
    return(
    <div>
        <div id="register-form" className="border border-success mt-2 mb-2 col-11 col-sm-6 m-auto bg-success bg-opacity-25 text-center">
    
               <h3 className="mb-2 mt-2">SignUp</h3>
               <div id="message" className="alert alert-danger" style={{display:"none"}}>{message}</div>
              
               <div className="form-outline mb-2">
                <input type="text" onChange={e => setFirstname(e.target.value)}/><br/>
                  <label >first_name</label>
                </div>
                <div className="form-outline mb-2">
                <input type="text" onChange={e => setLastname(e.target.value)}/><br/>
                  <label >lastt_name</label>
                </div>
  
                <div className="form-outline mb-2">
                <input type="email" onChange={e => setEmail(e.target.value)}/> <br/>
                  <label >email</label>
                </div>
                <div className="form-outline mb-2">
                <input type="password" onChange={e => setPassword1(e.target.value)}/><br/>
                  <label >password</label>
                </div>
                <div className="form-outline mb-2">
                <input type="password" onChange={e => setPassword2(e.target.value)}/><br/>
                  <label >conffirm password</label>
                </div>
                <Link to={'/login'}>Login</Link><br/>
                {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendRegistrationData}>send</button>:<button className="btn mt-2 btn-primary btn-lg btn-block" disabled >
            <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
              
              </button>}
                <hr className="my-4"/>
    
                
    
        </div> 
        <div id='code-virif' style={{display:"none"}} className="border border-success mt-2 mb-2 col-11 col-sm-6 m-auto bg-success bg-opacity-25 text-center">
            <h3 className="mb-2 mt-2">Please confirm your email address to complete the registration</h3>
            <div id="code-message" className="alert alert-danger" style={{display:"none"}}>{codeMessage}</div>

            <label>code virification </label><br/>
            <input type="text" maxLength="8" onChange={e => setCode(e.target.value)}/><br/>
            {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendVirificationData}>send</button>:<button className="btn mt-2 btn-primary btn-lg btn-block" disabled >
            <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
              
              </button>}
        </div>
    </div>     

 
 
    );
}}
export default Register