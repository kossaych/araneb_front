import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../../parts/header/index-managment";
function FemalleMorte(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  const [message,setMessage]=useState(true)
  const [dateMort,setDateMort]=useState(yyyy+"-"+mm+"-"+dd)
  const [state,setState]=useState(true)
  const [dateNaissance,setDateNaissance]=useState(true)
  const [race,setRace]=useState(true)
  const [dateVent,setDateVent]=useState(true)
  const [prix,setPrix]=useState(true)
  



  const {id}=useParams()
  const {cage}=useParams()
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/parents/api/femalle/"+id,{
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
          window.location.href="/managment/parents/femalles"
        }else {
            setRace(data.race)
            setDateNaissance(data.date_naissance)
            setDateMort(data.date_mort)
            setDateVent(data.dateVent)
            setState(data.state)
            setPrix(data.prix)
        }
        })
},[])
  function FemalleMorte(id){
    
    fetch("http://127.0.0.1:8000/parents/api/femalle/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "cage":cage,
    "date_mort":dateMort,
    "date_naissance":dateNaissance,
    "race":race,
    "prix":prix,
    "date_vent":dateVent,
    "state":"mort",
  })
  },
  )
  .then(response =>{
  if (response.status==202){
      return true
  }else if(response.status==500){
    return "server error 500"
  }else{
    return response.json()
  }
  })
  .then(data =>{
    if (data === true){
      window.location.href="/managment/parents/femalles"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
 
    return(
      <div>
        <HeaderManagment/>
        <div className=" card p-2 col-12 "  >
     
        
        <div className="alert alert-danger" role="alert">
          est ce que tu est sur que cette  femalle {cage}
          est morte
          <h3>{message}</h3>
        <br/>
        <label>date de mort</label>
        <input   value={dateMort} onChange={e=>setDateMort(e.target.value)}  className="border border-danger bg-danger bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
        </div>
      
      <div className="row justify-content-around mt-2"> 
                    
        <button onClick={()=>FemalleMorte(id)}   className="col-5 btn btn-success"  >oui</button>
        
        <Link to={"/managment/parents/femalles"} className="col-5 btn btn-danger">non</Link>
      </div >
      </div>
      
      </div>
    );

}
export default FemalleMorte





