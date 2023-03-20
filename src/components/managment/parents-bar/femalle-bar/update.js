import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../../parts/header/index-managment";
function FemalleUpdate(){
    const [dateMort,setDateMort]=useState(true)
    const [state,setState]=useState(true)
    const [dateNaissance,setDateNaissance]=useState("")
    const [dateVent,setDateVent]=useState(true)
    const [prix,setPrix]=useState(true)
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    const [race,setRace]=useState('Gaint Flander')

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

    function FemalleUpdate(id){
        
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
        "state":state,
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
    
    function Races  ()  {
    const options=[
        
        {label:race,value:race},
        {label:'Gaint Flander',value:'Gaint Flander'},
        {label:'Flemish Giant',value:'Flemish Giant'},
        {label:'Chinchilla',value:'Chinchilla'},
        {label:'New Zealand White',value:'New Zealand White'},
        {label:'California',value:'California'},
        {label:'Rex',value:'Rex'},

]
    return (
        <select value={race} onChange={e => setRace(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
           <option key={options[0].value} value={options[0].value} >{options[0].label}</option>
          {options.map(o => (
           
           (o.value!=race) ?<option key={o.value} value={o.value} >{o.label}</option>:""
            
          ))}
           
        </select>
    );
    };





return(
    <div>
        <HeaderManagment/>

<div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
 
   <h4 className="text-dark">modifier la femalle {cage}</h4>
   <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
   

   
   <label>date naissance</label>
   <input value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" />
   
   <label >race</label>
   <Races/>
  
   <div className="row justify-content-around mt-2 col-12 m-auto"> 
                
    
    {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={()=>FemalleUpdate(id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
        <div className="spinner-border text-primary" role="status">
      <span className="sr-only"></span>
    </div>
          
          </button>}
    <Link to='/managment/parents/femalles'  className="col-5 m-1 btn btn-danger">anuler</Link>
   </div >

</div>
</div>
  
);

}
export default FemalleUpdate


