import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import HeaderManagment from "../../../parts/header/index-managment";
function CreateFemalle(){
    const [dateNaissance,setDateNaissance]=useState("")
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    const [race,setRace]=useState('Gaint Flander')
    const [cage,setCage]=useState('')
    const [img,setImg]=useState('')


    function createFemalle(){

      
      setIsWait(false)
      fetch("http://127.0.0.1:8000/parents/api/femalles",{
      method:'post',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      body:JSON.stringify({
        "date_naissance":dateNaissance,
        "race":race,
      })
      
      },
      )
      .then(response =>{
        
      if (response.status==201){
          return response.json()
      }else if(response.status==500){
        return "server error 500"
      }else{
        return response.json()
      }
      })
      .then(data =>{
        if (data !=  "server error 500" && data !=  "le femalle que vous voulez ajouter a un age trés petit" && data !='invalid data' ){
          var data2 = new FormData()
          data2.append('file', img )
          fetch('http://127.0.0.1:8000/parents/api/femalle/img/'+data.id, {
            method: 'put',
            body: data2,
          }).then(response =>{
            if (response.status==202){
              return true
            }else{
              return false
            }
          }).then(data =>{
            if (data==true){
              window.location.href='/managment/parents/femalles'
            }else{
              setIsWait(true)
              document.getElementById('message').style.display='block';
              setMessage('choisir une photo')
            }
          })
        
          
        }else {
        setIsWait(true)
        document.getElementById('message').style.display='block';
        setMessage(data)
      }
      })
      
    
    
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
      fetch("http://127.0.0.1:8000/parents/api/femalle/cage_vide",{
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
              setCage(data.cage_vide)
          }
          })
  },[])
  
  







    return(
        <div>
            <HeaderManagment></HeaderManagment>

    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
     
       <h4 className="text-dark">ajouter une femalle</h4>
       <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
       
       
       <label>cage : (tu peux pas le changer)</label>
       <input disabled className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} value={cage} />
       
       
       
       
       
       <label>date naissance *</label>
       <input onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" />
       
       <label >race *</label>
       <Races/>
       <br></br>
       <input onChange={e => setImg(e.target.files[0])} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="file" />
      


       <Link to='/managment/parents/femalles/create/production'  className="col-11 mt-2 mb-2  m-auto alert alert-success">ajouter une femalle a partir des lapins de production</Link>

       <div className="row justify-content-around mt-2 col-12 m-auto"> 
                    
        
        {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={createFemalle}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
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
export default CreateFemalle