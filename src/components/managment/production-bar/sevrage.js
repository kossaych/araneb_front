import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderLogIn from "../../parts/header/index-loged-in";
function Sevrage(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  const [message,setMessage]=useState(true)
  const [dateSevrage,setdateSevrage]=useState(yyyy+"-"+mm+"-"+dd)
/*   const [state,setState]=useState(true)
  const [dateNaissance,setDateNaissance]=useState(true)
  const [race,setRace]=useState(true)
  const [dateVent,setDateVent]=useState(true)
  const [prix,setPrix]=useState(true) */

  const {id}=useParams()
  const {cage}=useParams()
/*   useEffect(()=>{
    fetch("https://kossay.pythonanywhere.com/manager/api/femalle/"+id,{
        method:'get',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
        },},
        )
        .then(response =>{
        if (response.status==200){
            return response.json()
        }else{
        return false
        }
        })
        .then(data =>{
        if (data === false){
          //window.location.href="/managment/manager/production"
        }else {
            setRace(data.race)
            setDateNaissance(data.date_naissance)
            setdateSevrage(data.date_mort)
            setDateVent(data.dateVent)
            setState(data.state)
            setPrix(data.prix)
        }
        })
},[]) */
  function Sevrage(id){
    
    fetch("https://kossay.pythonanywhere.com/manager/groupes/groupe_sevrage/"+id,{
  method:'post',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "groupe":id,
    "date_sevrage":dateSevrage,
   
  })
  },
  )
  .then(response =>{
  if (response.status==200){
      return true
  }else if(response.status==500){
    return "server error 500"
  }else{
    return response.json()
  }
  })
  .then(data =>{
    if (data === true){
      window.location.href="/managment/production"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
 
    return(
      <div>
        <HeaderLogIn/>
        <div className=" card p-2 col-12 "  >
     
        
        <div className="alert alert-success" role="alert">
          est ce que vous vouler sevrer les lapins de ce groupe {cage}
          <h3 id="message">{message}</h3>
        <br/>
        <label>date de sevrage</label>
        <input   value={dateSevrage} onChange={e=>setdateSevrage(e.target.value)}  className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
        </div>
      
      <div className="row justify-content-around mt-2"> 
                    
        <button onClick={()=>Sevrage(id)}   className="col-5 btn btn-success"  >oui</button>
        
        <Link to={"/managment/manager/production"} className="col-5 btn btn-danger">non</Link>
      </div >
      </div>
      
      </div>
    );

}
export default Sevrage





