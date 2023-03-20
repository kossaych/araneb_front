import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment";
function FauseCoucheAcouplement(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  const [message,setMessage]=useState(true)

  const [dateTest,setDateTest]=useState(yyyy+"-"+mm+"-"+dd)
  const [test,setTest]=useState("fause-couche")
  
  
  
  const [mère,setMère]=useState(true)
  const [père,setPère]=useState(true)
  const [dateAcouplage,setDateAcouplage]=useState(true)
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
          window.location.href="/managment/acouplement"

           
        }else {
          //setDateTest(data.date_test)
          setTest(data.test)
          setMère(data.mère)
          setPère(data.père)
          setDateAcouplage(data.date_acouplage)
          setState(data.state)
        }
        })
},[])




  function Test(id){
    
    fetch("http://127.0.0.1:8000/production/accouplements/fause-couche/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "date_test":dateTest,
    //"test":test,
   
  })
  },
  )
  .then(response =>{
  if (response.status==200){
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
  }else{
      setMessage(data)
      document.getElementById('message').style.display='block';

  }
  })}
 







    return(
      <div>
        <HeaderManagment/>
        <div className=" card p-2 col-12 "  >
     
        
        <div className="alert alert-danger" role="alert">
           
          <h3>{message}</h3>
        <br/>
        <label>date de test de {num}</label><br></br>
        <input   value={dateTest} onChange={e=>setDateTest(e.target.value)}  className="border border-danger bg-danger bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
        
       
        </div>
      
      <div className="row justify-content-around mt-2"> 
                    
        <button onClick={()=>Test(id)}   className="col-5 btn btn-success"  >oui</button>
        
        <Link to={"/managment/parents/femalles"} className="col-5 btn btn-danger">non</Link>
      </div >
      </div>
      
      </div>
    );

}
export default FauseCoucheAcouplement