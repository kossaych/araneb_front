import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment"; 
import remove from "./icons/remove.png";
function PoidLapins(props){
    
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  const [message,setMessage]=useState(true)
  const [dateMesure,setdateMesure]=useState(yyyy+"-"+mm+"-"+dd)
  const [poids,setPoids]=useState([])

  const [lapins,setLapins]=useState([])


  



  const {id}=useParams()
  const {cage}=useParams()

 


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/production/groupes/"+id,{
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
          window.location.href="/managment/manager/femalles"
        }else { 
           
          setLapins(data.lapins)
     
        }
        })
},[])

function MesureHandler(valeur,lapin){
    
        let index=""
        for(let i=0;i<poids.length;i++){
            if(poids[i].id==String(lapin)){
                index=i
            }
        }
        if(index!=""){
        setPoids(poids.splice(index,1))
        }
        setPoids(poids.concat({id:lapin,mesure:valeur}));
    
}




  function Poid(id){
    let values=document.getElementsByTagName('input')
    for(let i=1;i<values.length;i++){
            if (values[i].value >5000 || values[i].value=="" ) {
              values[i].focus()
              return false
            }
          }
        
    fetch("http://127.0.0.1:8000/production/groupes/groupe_poid/",{
  method:'post',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "lapins":poids,
    "date_mesure":dateMesure,
    
  })
  },
    )
    .then(response =>{
    if (response.status==200){
        window.location.href="/managment/production"

    }else if(response.status==500){
      return "server error 500"
    }else{
      return response.json()
    }
    })
    .then(data =>{
      if (data === true){
    }else {
      document.getElementById('message').style.display='block';
      setMessage(data)
    }
    })
}
 


    return(
      <div>
        <HeaderManagment/>
        <div className=" card p-2 col-12 "  >
     
        
            <div className="alert alert-dark " role="alert">
                determiner le poid de chaque lapin du groupe {cage}
                <h3 id="message">{message}</h3>
                <br/>
                <label>date de mesure</label><br></br>
                <input   value={dateMesure} onChange={e=>setdateMesure(e.target.value)}  className="border border-dark  bg-dark bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
          <br></br><br></br>
        

            
                {lapins.map(lapin => (
                    
                    <div className="alert alert-dark">
                        <span className="text-dark">poid de Lapin {lapin.cage} :(en gramme)</span><br></br>
                        <input max="50"  key={lapin.id} onChange={e=>MesureHandler(e.target.value,lapin.id)}  className="border border-success  bg-success bg-opacity-25 " style={{borderRadius:5+'px'}}   type="number" />  

                        <br></br><br></br>
                    </div>
              ))}
            </div>
          
            
       
        







      <div className="row justify-content-around mt-2"> 
                    
        <button  onClick={()=>Poid(id)} className="col-5 btn btn-success"  >oui</button>
        
        <Link to={"/managment/manager/femalles"} className="col-5 btn btn-danger">non</Link>
      </div >
      </div>
      
      </div>
    );

}
export default PoidLapins





