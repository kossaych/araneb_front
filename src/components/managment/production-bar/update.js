import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment";
function UpdateGroupeProduction(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  const [isWait,setIsWait]=useState(true)
  const [message,setMessage]=useState(true)

  const [nbLapinNées,setNbLapinNées]=useState(true)
  const [dateNaissance,setDateNaissance]=useState(yyyy+"-"+mm+"-"+dd)
  const [nbLapinMortes,setNbLapinMortes]=useState("avant_naissance")
  const [acouplement,setAcouplement]=useState("avant_naissance")

 
  const {id}=useParams()


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/manager/groupes/"+id,{
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
          window.location.href="/managment/production"
        }else {
            setNbLapinNées(data.nb_lapins_nées)
            setDateNaissance(data.date_naissance)
            setNbLapinMortes(data.nb_lapins_mortes_naissances)
            setAcouplement(data.acc_num)
            
        }
        })
},[])

  function Update(id){

    fetch("http://127.0.0.1:8000/manager/groupes/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "date_naissance":dateNaissance,
    "nb_lapins_nées":nbLapinNées,
    "nb_lapins_mortes":nbLapinMortes,
    "acouplement":acouplement,
   
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
      window.location.href="/managment/production"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
 
    return(
        <div>
            <HeaderManagment></HeaderManagment>

    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
     
       <h4 className="text-dark">ajouter une Acouplement</h4>
       <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
      
       <label>date naissance</label>
       <input  style={{outline: "none"}} id="date_naissance" value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="date" />
       
       <label> nombre des lapin nées</label>
       <input  style={{outline: "none"}}  value={nbLapinNées} onChange={e => setNbLapinNées(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="number" />
       
       <label> nombre des lapin mortes a la naissance</label>
       <input  style={{outline: "none"}}  value={nbLapinMortes} onChange={e => setNbLapinMortes(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="number" />
  



       <div className="row justify-content-around mt-2 col-12 m-auto"> 
                    
        
        {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={()=>Update(id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
            <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
              
              </button>}
        <Link to='/managment/production'  className="col-5 m-1 btn btn-danger">anuler</Link>
       </div >
    
    </div>
    </div>
    );

}
export default UpdateGroupeProduction