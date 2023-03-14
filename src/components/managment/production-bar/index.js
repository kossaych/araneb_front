import React from "react";
import {useState,useEffect} from "react";

import { Link } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment";
import Groupe from "./groupe";
import Lapin from "./lapin";
function ProductionBar(){
    const [groupes,setGroupes]=useState([]);
    const [isWait,setIsWait]=useState(true)
 

  
    useEffect(()=>{

      if (localStorage.getItem('token')==null){
        window.location.href = "/login"
      }
      

    fetch("https://kossay.pythonanywhere.com/production/groupes",{
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
  setGroupes(data)
  setIsWait(false)
})},[])
  
    
    
    return(
    <div className="" style={{width:99+"%"}}>
<HeaderManagment/>



<div  className="border-danger m-2 ">

<div className="row justify-content-between">
    <h4 className="text-danger col-2 col-sm-3 ">lapins productions</h4>
</div>        

{groupes && groupes.map((groupe)=>(
            <Groupe key={groupe.id} vaccins={groupe.vaccins}  DateSevrage={groupe.date_souvrage} Mpoids={groupe.Mpoids} MoyPS={groupe.MoyPS} cons={groupe.cons} cons_auj={groupe.cons_auj} coup_cons={groupe.coup_cons} coup_cons_auj={groupe.coup_cons_auj} MoyPDM={groupe.MoyPDM} nbMalle={groupe.nbMalle} nbFemalle={groupe.nbFemalle} DateDMP={groupe.DateDMP} TM={groupe.TM} MoyPN={groupe.MoyPN} mère={groupe.mère} acc={groupe.acc_num} père={groupe.père} id={groupe.id}  acouplement={groupe.acouplement} date_naissance={groupe.date_naissance} date_souvrage={groupe.date_souvrage} nb_lapins_nées={groupe.nb_lapins_nées} nb_lapins_mortes_naissances={groupe.nb_lapins_mortes_naissances} ageMois={groupe.age} cage={groupe.cage} lapins={groupe.lapins} />
        ))}



    </div>
    </div>

    );
}
export default ProductionBar


