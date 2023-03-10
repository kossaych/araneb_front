import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment";
function CreateGroupe(){
    const {id}=useParams()
    const {acc}=useParams()
    const [dateNaissance,setDateNaissance]=useState("")
    const [acouplement,setAcouplement]=useState(acc)
 

    const [nb_lapins_nées,setNbLapinsNées]=useState("")
    const [nb_lapins_mortes_naissances,setnbLapinsMortesNaissances]=useState("")

    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    function createGroupe(){
        setIsWait(false)
        fetch("http://127.0.0.1:8000/production/groupes",{
      method:'post',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      body:JSON.stringify({
        "date_naissance":dateNaissance,
        "acouplement": acouplement,
        "nb_lapins_nées": nb_lapins_nées,
        "nb_lapins_mortes_naissances":nb_lapins_mortes_naissances ,
      })
      
      },
      )
      .then(response =>{
        setIsWait(true)
      if (response.status===201){
          return true
      }else if(response.status===500){
        return "server error 500"
      }else{
        return response.json()
      }
      })
      .then(data =>{
        if (data === true){
        window.location.href='/managment/production'
      }else {
        document.getElementById('message').style.display='block';
        setMessage(data)
      }
      })}
  


     
   

 



    return(
        <div>
            <HeaderManagment></HeaderManagment>

    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
     
       <h4 className="text-dark">ajouter une Groupe</h4>
       <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
      
       <h1 >acouplement :{acc}</h1>
       <label>date naissance</label>
       <input onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" />
       
       <label>le nombre totale des lapins nées</label>
       <input onChange={e => setNbLapinsNées(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="number" />
       
       <label>nombre des lapins morte a la naissance</label>
       <input onChange={e => setnbLapinsMortesNaissances(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="number" />
       
       <div className="row justify-content-around mt-2 col-12 m-auto"> 
                    
        
        {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={createGroupe}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
            <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
              
              </button>}
        <Link to='/managment/acouplement'  className="col-5 m-1 btn btn-danger">anuler</Link>
       </div >
    
    </div>
    </div>
      
    );
}
export default CreateGroupe
