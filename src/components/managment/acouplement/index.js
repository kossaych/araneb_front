import React from "react";
import {useState,useEffect} from "react";
import add from "../../../assets/icons/add.png";

import { Link } from "react-router-dom";
import HeaderLogIn from "../../parts/header/index-loged-in";
import Acouplement from "./Acouplement";
function AcouplementBar(){
    const [acouplements,setAcouplements]=useState([]);
    const [isWait,setIsWait]=useState(true)
 

  
    useEffect(()=>{

      if (localStorage.getItem('token')==null){
        window.location.href = "/login"

      }
      

    fetch("http://localhost:8000/manager/acouplements",{
      method:'get',
      headers: {
        
        'Content-Type': 'application/json',
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
        
      }

},
)
.then(response =>{
  if (response.status==200){
  return response.json()
  }else if (response.status==401){
    window.location.href='/login';
  } 
})
.then(data =>{
  setAcouplements(data)
  setIsWait(false)
})},[])
  
    
    
    return(
    <div>
<HeaderLogIn/>


    <div  className="row border-danger m-1">
        <div className="col-10 m-auto row justify-content-between">
            <h4 className="text-danger col-1 p-0">Acouplements</h4>
            <Link to="/managment/acouplement/create" className="col-1 p-0"><img style={{width:25+'px',margin:5+'px',}} src={add} ></img></Link>
        </div>   
        {acouplements && acouplements.map((acouplement)=>(
            <Acouplement key={acouplement.id} mère={acouplement.mère} create_at={acouplement.create_at}  père={acouplement.père} id={acouplement.id}   date_acouplage={acouplement.date_acouplage} date_test={acouplement.date_test} age={acouplement.age} num={acouplement.num} test={acouplement.test}  />
        ))}


            
    </div>







    </div>

    );
}
export default AcouplementBar


