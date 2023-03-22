import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderManagment from "../../../parts/header/index-managment";
function CreateMalle(){
    const [dateNaissance,setDateNaissance]=useState("")
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    const [race,setRace]=useState('Gaint Flander')
    const [img,setImg]=useState('')
    function createMalle(){
        setIsWait(false)
        fetch("http://127.0.0.1:8000/manager/api/malles",{
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
        if (data !=  "server error 500" && data !=  "le malle que vous voulez ajouter a un age trés petit" && data !='invalid data' ){
          

          var data2 = new FormData()
          data2.append('file', img )
          fetch('http://127.0.0.1:8000/manager/api/malle/img/'+data.id, {
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
               window.location.href='/managment/manager/malles'
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

    return(
        <div>
            <HeaderManagment></HeaderManagment>
            <form >
                    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
                    
                    <h4 className="text-dark">ajouter un malle</h4>
                    <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
                    <label>date naissance</label>
                    <input onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" /><br></br>
                    <input onChange={e => setImg(e.target.files[0])} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="file" />

                    <label >race</label>
                    <Races/>
                    
                    <div className="row justify-content-around mt-2 col-12 m-auto"> 
                                  
                      
                      {isWait ? <button onClick={createMalle} className="col-5 m-1 btn btn-success" >ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
                          <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                            
                            </button>}
                      <Link to='/managment/parents/malles'  className="col-5 m-1 btn btn-danger">anuler</Link>
                    </div >
                  
                  </div>
            </form>

            
    </div>
      
    );
}
export default CreateMalle