import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment";
function UpdateAcouplement(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();


  
  const [isWait,setIsWait]=useState(true)

  const [message,setMessage]=useState(true)
  const [mères,setMères]=useState([])
  const [pères,setPères]=useState([])
  const [dateTest,setDateTest]=useState(yyyy+"-"+mm+"-"+dd)
  const [test,setTest]=useState(true)
  const [mère,setMère]=useState(true)
  const [père,setPère]=useState(true)
  const [dateAcouplage,setDateAcouplage]=useState(yyyy+"-"+mm+"-"+dd)
  const [state,setState]=useState("avant_naissance")
 
 
 
 
  const {id}=useParams()
  const {num}=useParams()


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/production/accouplements/"+id,{
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
          window.location.href="/managment/acouplements"
        }else {
          //setDateTest(data.date_test)
          setTest(data.test)
          setMère(data.mère)
          //setPère(data.père)
          setDateAcouplage(data.date_acouplage)
          setState(data.state)
        }
        })
},[])




  function Update(id){

    fetch("http://127.0.0.1:8000/production/accouplements/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "date_test":dateTest,
    "test":test,
    "mère":mère,
    "père":père,
    "date_acouplage":dateAcouplage,
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
      window.location.href="/managment/acouplement"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
 

   


// load femalles libre a acouplet
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/production/femalles_acouplements",{
      method:'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      
      
      },
      )
      .then(response =>{
        setIsWait(true)
      if (response.status===200){
        return response.json()
      }else{
        return "server error 500"
      }
      })
      .then(data =>{
        if (data === "server error 500") {

      }else{
        const options=[]
        for (let i=0;i<data.length;i++){
          options.push({label:data[i].cage,value:data[i].id})
        }
        setMères(options)
        setMère(options[0].value)
      }
      })
  },[])


// load malles libre a acouplet
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/production/malles_acouplements",{
      method:'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      
      
      },
      )
      .then(response =>{
        setIsWait(true)
      if (response.status===200){
        return response.json()
      }else{
        return "server error 500"
      }
      })
      .then(data =>{
        if (data === "server error 500") {

      }else{
        const options=[]
        for (let i=0;i<data.length;i++){
          options.push({label:data[i].cage,value:data[i].id})
        }
        setPère(options[0].value)
        setPères(options)
        
      }
      })
  },[])



    return(
        <div>
            <HeaderManagment></HeaderManagment>

    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
     
       <h4 className="text-dark">ajouter une Acouplement</h4>
       <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
      
  
    
      <label>mère :</label>
      <select id='mères' style={{outline: "none"}} value={mères} onChange={ e => setMère(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded" >
              {mères.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
              
              
      </select>
      <label>père :</label>
      <select id="père" style={{outline: "none"}} value={père} onChange={e => setPère(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
              {pères.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}          
              
      </select>

       <label>date naissance</label>
       <input  style={{outline: "none"}} id="date_acouplage" value={dateAcouplage} onChange={e => setDateAcouplage(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="date" />
  
       <div className="row justify-content-around mt-2 col-12 m-auto"> 
                    
        
        {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={()=>Update(id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
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
export default UpdateAcouplement