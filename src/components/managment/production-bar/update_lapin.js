import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderLogIn from "../../parts/header/index-loged-in";
function LapinProductionUpdate(){
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    const [race,setRace]=useState('')
    const [sex,setSex]=useState('non verifier')

    const {id}=useParams()
    const {cage}=useParams()
   
    useEffect(()=>{
        fetch("http://localhost:8000/manager/lapins_productions/"+id,{
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
                setRace(data.race)
                setSex(data.sex)
            }
            })
    },[])

    function LapinProductionUpdate(id){
        
    fetch("http://localhost:8000/manager/lapins_productions/"+id,{
    method:'put',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
    },
    body:JSON.stringify({
        "race":race,
        "sex":sex,
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
            {options[0].value != null ?  <option key={options[0].value} value={options[0].value} >{options[0].label}</option> : ''}
            {options.map(o => (
            (o.value!=race) ?<option key={o.value} value={o.value} >{o.label}</option>:""
                
            ))}
            
            </select>
        );
    };

return(
    <div>
        <HeaderLogIn/>

            <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-11 col-sm-6 m-auto">
            
            <h4 className="text-dark">modifier la femalle {cage}</h4>
            <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
            

            
            <label>sex :</label>
            <div >
                    <span >malle :</span> <br/><input value={sex} onChange={e => setSex("malle")}   type="radio" name="sex"/> 
                    <br/>
                    <span >femalle :</span><br/><input value={sex} onChange={e => setSex("femalle")}   type="radio" name="sex"/>
                    </div>
            <label >race</label>
            <Races/>
            
            <div className="row justify-content-around mt-2 col-12 m-auto"> 
                            
                
                {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={()=>LapinProductionUpdate(id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
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
export default LapinProductionUpdate


