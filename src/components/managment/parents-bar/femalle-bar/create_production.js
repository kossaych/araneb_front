import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import HeaderLogIn from "../../../parts/header/index-loged-in";
function CreateFemalleProduction(){
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState('')

    const [race,setRace]=useState('')
    const [cage,setCage]=useState('')
    const [lapin,setLapin]=useState("")
    const [lapins,setLapins]=useState([])
    const [img,setImg]=useState('')


    function createFemalle(){
      if(race===""){
        document.getElementById('race').focus()
        document.getElementById('race').className="border border-danger bg-success bg-opacity-25 rounded"
        document.getElementById('cage').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('date_acouplage').className="border border-success bg-success bg-opacity-25 rounded"

      }
      else if(cage===""){
        document.getElementById('cage').focus()
        document.getElementById('race').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('cage').className="border border-danger bg-success bg-opacity-25 rounded"
        document.getElementById('date_acouplage').className="border border-success bg-success bg-opacity-25 rounded"
      }
      else{
        setIsWait(false)
        var data = new FormData()
        data.append('image', img )
        data.append('race',race)
        data.append('lapin',lapin)

  
      fetch("http://localhost:8000/manager/api/femalles/production",{
      method:'post',
      headers: {
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
      },
      body:data
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
        window.location.href='/managment/manager/parents'
      }else {
        document.getElementById('message').style.display='block';
        setMessage(data)
      }
      })}
    }

    function Races  ()  {
        const options=[
            {label:'Gaint Flander',value:'Gaint Flander'},
            {label:'Flemish Giant',value:'Flemish Giant'},
            {label:'Chinchilla',value:'Chinchilla'},
            {label:'New Zealand White',value:'New Zealand White'},
            {label:'California',value:'California'},
            {label:'Rex',value:'Rex'},

    ]
        return (
            <select value={race} onChange={e => setRace(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
              {options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
              
            </select>
        );
    };

      useEffect(()=>{
        fetch("http://localhost:8000/manager/api/femalle/cage_vide",{
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
                window.location.href="/managment/manager/parents"
            }else { 
                setCage(data.cage_vide)
            }
            })
    },[])

      useEffect(()=>{
        fetch("http://localhost:8000/manager/api/femalles/production",{
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
                window.location.href="/managment/manager/parents"
            }else { 
                setLapins(data)
                setLapin(data[0].id)
            }
            })
    },[])
    

    return(
        <div>
            <HeaderLogIn></HeaderLogIn>

    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
     
       <h4 className="text-dark">ajouter une femalle</h4>
       <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
       
       
       <label>cage : (tu peux pas le changer)</label>
       <input disabled className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} value={cage} />
       <label>lapin : </label>
       <select id='lapin' style={{outline: "none"}} value={lapin} onChange={ e => setLapin(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded" >
              {lapins.map(o => (
                <option key={o.id} value={o.id}>{o.cage+" ("+o.groupe+')'}</option>
              ))}
              
      </select>
       
       
       
       
       
       
       <div id="race" >
       <label >race *</label><br></br>
       <Races/>
       </div>
       <br></br>
          <input onChange={e => setImg(e.target.files[0])} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="file" id="image_input" />

      


   
       <div className="row justify-content-around mt-2 col-12 m-auto"> 
                    
        
        {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={createFemalle}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
            <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
              
              </button>}
        <Link to='/managment/manager/parents'  className="col-5 m-1 btn btn-danger">anuler</Link>
       </div >
    
    </div>
    </div>
      
    );
}
export default CreateFemalleProduction