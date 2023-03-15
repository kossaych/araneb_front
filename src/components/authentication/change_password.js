import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ChangePassword(){
    const [oldPassword,setOldPassword]=useState("")
    //const [email,setEmail]=useState("")
    const [isWait,setIsWait]=useState(true)
    const [newPassword1,setNewPassword1]=useState('')
    const [newPassword2,setNewPassword2]=useState('')
    const [message,setMessage]=useState('')


function sendData(){
    fetch("https://kossay.pythonanywhere.com/accounts/api/change_password/",{
method:'post',
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

},
body:JSON.stringify({
    password1:newPassword1,
    password2:newPassword2,
    old_password:oldPassword,
})
},
)
.then(response =>{
  setIsWait(true)
    if (response.status=== 200){
    return true
    }else if(response.status===400){
    return response.json()
    }else{
    return 'server error 500'
    }
})
.then(data =>{
    if(data === true){
      window.location.href="/"
    }else{
    setMessage(data)
    }
   
})}



return(
  <div>
    <div   className="border border-success mt-2 mb-2 col-11 col-sm-6 m-auto bg-success bg-opacity-25 text-center">
    
            <h3 className="mb-2 mt-2">change password</h3>
          
            <div id="message" className="alert alert-danger" >{message}</div>

            <div className="form-outline mb-2">
            <input type="password" onChange={e => setOldPassword(e.target.value)}/><br/>
              <label >old password</label>
            </div>
            <div className="form-outline mb-2">
            <input type="password" onChange={e => setNewPassword1(e.target.value)}/><br/>
              <label >password</label>
            </div>
            <div className="form-outline mb-2">
            <input type="password" onChange={e => setNewPassword2(e.target.value)}/><br/>
              <label >conffirm password</label>
            </div>

            <Link to="/"> anuler </Link><br/>
            {isWait ? <button className="btn mt-2 btn-primary btn-lg btn-block" onClick={sendData}>
              send
              </button>:<button className="btn mt-2 btn-primary btn-lg btn-block" disabled>
                send</button>}
      </div>
  </div>

);
}
export default ChangePassword 