import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword(){
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [code,setCode]=useState("")
    const [isWait,setIsWait]=useState(true)
    const [message_code,setMessageCode]=useState("")

    
function sendEmail(){
      setIsWait(false)
        fetch("http://127.0.0.1:8000/accounts/api/reset_password/",{
    method:'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
        
        email:email,
        
    
    }),
   

  },
  )
  .then(response =>{
    if (response.status === 200){
    return response.json()
    
}else if(response.status===400){
  setIsWait(true)
  document.getElementById("email-alert").style.display = "block";
  

}
  })
  .then(data =>{
    if (data != undefined){
        document.getElementById("email-form").style.display="none"
        document.getElementById("code-virif").style.display="block"
        document.getElementById("password-form").style.display="none"
        setIsWait(true)
    }
})}
function sendVirificationCode(){
    setIsWait(false)
    fetch("http://127.0.0.1:8000/accounts/api/check_code/",{
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
    
    if (response.status=== 200){
    return true
}else if(response.status===400){
  setIsWait(true)
  return response.json()
  
}
})
.then(data =>{
    if(data === true){
    document.getElementById("email-form").style.display="none"
    document.getElementById("code-virif").style.display="none"
    document.getElementById("password-form").style.display="block"
    setIsWait(true)
    }else{
      document.getElementById('code-alert').style.display="block";
      setMessageCode(data);
    }
   
})}
function sendPassword(){
  setIsWait(false)
    fetch("http://127.0.0.1:8000/accounts/api/set_password/",{
method:'post',
headers: {
  'Content-Type': 'application/json',
},
body:JSON.stringify({
    email:email,
    code:code,
    password:password,
})

},
)
.then(response =>{
    if (response.status=== 200){
    return response.json()
}else if(response.status===400){
  setIsWait(true)
  return response.json()
}else{
  return 'server error 500'
}
})
.then(data =>{
    if(data === "invalid new password" || data === 'invalid code time' || data === 'False code' || data === "code not sended to your email" ||  data === 'user not found' ||  data === 'server error 500'){
      
    
    }else{
      localStorage.setItem('token',JSON.stringify(data));
      setIsWait(true)
      window.location.href='/';
    }
   
})}
   
  const displayNone={display:"none"}


  let token = localStorage.getItem('token')
  if (token){
    window.location.href="/"
  }else{
    return(
      <div>
          <div id="email-form" className="border border-success mt-2 mb-2 col-11 col-sm-6 m-auto bg-success bg-opacity-25 text-center">
              
              <h3 className="mb-2 mt-2">enter your email</h3>
              <h5 className="alert alert-danger" id="email-alert" style={displayNone} >email not found</h5>
              <div className="form-outline mb-2">
              <input type="email" onChange={e => setEmail(e.target.value)}/> <br/>
                <label >email</label>
              </div>
              
              <Link to={'/login'}>Login with my password</Link><br/>
              {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendEmail}>send code</button>:<button className="btn mt-2 btn-primary btn-lg btn-block ">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only border-danger"></span>
                </div>
                </button>}
              <hr className="my-4"/>
  
              
  
          </div>
          <div id='code-virif' style={{display:"none"}} className="border border-success mt-2 mb-2 col-11 col-sm-6 m-auto bg-success bg-opacity-25 text-center">
                      <h3 className="mb-2 mt-2">Please confirm your email address to complete the registration</h3>
                      <h5 className="alert alert-danger" id="code-alert" style={displayNone} >{message_code}</h5>
                      <label>code virification </label><br/>
                      <input type="text" maxLength="8" onChange={e => setCode(e.target.value)}/><br/>
                      {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendVirificationCode}>send code</button>:<button className="btn mt-2 btn-primary btn-lg btn-block" >
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                          </div>
                      </button>}        
          </div>
          <div id="password-form" style={{display:"none"}}  className="border border-success mt-2 mb-2 col-11 col-sm-6 m-auto bg-success bg-opacity-25 text-center">
              
              <h3 className="mb-2 mt-2">SignUp</h3>
            
              <h5 className="alert alert-danger" id="code-alert" style={displayNone} >
                password not valid
              password should contain at least 2 special character ,3 letters and 3 numbers 
              </h5>
              <div className="form-outline mb-2">
              <input type="password" onChange={e => setPassword(e.target.value)}/><br/>
                <label >password</label>
              </div>
              <div className="form-outline mb-2">
              <input type="password" /><br/>
                <label >conffirm password</label>
              </div>
              
              {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendPassword}>send</button>:<button className="btn mt-2 btn-primary btn-lg btn-block" disabled >
              <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
                
                </button>}
              <hr className="my-4"/>
  
              
  
          </div>
      </div>     
  
   
   
      );
  }
    
}
export default ResetPassword