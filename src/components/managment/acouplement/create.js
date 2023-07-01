import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderLogIn from "../../parts/header/index-loged-in";
import Select from 'react-select'
function CreateAcouplement(){
    const [dateAcouplage,setDateAcouplage]=useState("")
    const [mères,setMères]=useState([])
    const [pères,setPères]=useState([])

    const [mère,setMère]=useState("")
    const [père,setPère]=useState("")

    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    
    function createAcouplement(){
      if(mère===""){
        document.getElementById('mère').focus()
        document.getElementById('mère').className="border border-danger bg-success bg-opacity-25 rounded"
        document.getElementById('père').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('date_acouplage').className="border border-success bg-success bg-opacity-25 rounded"

      }
      else if(père===""){
        document.getElementById('père').focus()
        document.getElementById('mère').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('père').className="border border-danger bg-success bg-opacity-25 rounded"
        document.getElementById('date_acouplage').className="border border-success bg-success bg-opacity-25 rounded"
      }
      else if (dateAcouplage===""){
        document.getElementById('date_acouplage').focus()
        document.getElementById('mère').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('père').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('date_acouplage').className="border border-danger bg-success bg-opacity-25 rounded"
      }
      else{
        document.getElementById('mère').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('père').className="border border-success bg-success bg-opacity-25 rounded"
        document.getElementById('date_acouplage').className="border border-success bg-success bg-opacity-25 rounded"
      setIsWait(false)
        fetch("http://localhost:8000/manager/acouplements",{
      method:'post',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      body:JSON.stringify({
        "date_acouplage":dateAcouplage,
        "père":père,
        "mère":mère,
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
        window.location.href='/managment/acouplement'
      }else {
        document.getElementById('message').style.display='block';
        setMessage(data)
      }
      })
    }
    }   
    useEffect(()=>{
      fetch("http://localhost:8000/manager/femalles_acouplements",{
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
          
          setMère(data[0].id)
          setMères(data)

        }
        })
    },[])
    useEffect(()=>{
      fetch("http://localhost:8000/manager/malles_acouplements",{
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
          
          setPère(data[0].id)
          setPères(data)
          
        }
        })
    },[])
  

    function Mères(){
      const mèresData=[
      ]
      
      for(let i=0;i<mères.length;i++){
        mèresData.push(mères[i])

      }
      console.log(mèresData)
      return( 
      <select id='mère' style={{outline: "none"}} value={mère}  onChange={ e => setMère(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded" >
              {mèresData.map(o => (
                <option key={o.id} value={o.id}>{o.cage}</option>
              ))}    
      </select>);
    }
    
    function Pères(){
      return(
        <select id="père" style={{outline: "none"}} value={père} onChange={e => setPère(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
              {pères.map(o => (
                <option key={o.id} value={o.id}>{o.cage}</option>
              ))}          
      </select>
      )
    }





    return(
        <div>
            <HeaderLogIn></HeaderLogIn>

    <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
     
       <h4 className="text-dark">ajouter une Acouplement</h4>
       <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
      
  
    
      <label>mère :</label>
      <Mères />
      <label>père :</label>
      <Pères />

       <label>date naissance</label>
       <input  style={{outline: "none"}} id="date_acouplage" onChange={e => setDateAcouplage(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="date" />
  
       <div className="row justify-content-around mt-2 col-12 m-auto"> 
                    
        
        {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={createAcouplement}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
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
export default CreateAcouplement
