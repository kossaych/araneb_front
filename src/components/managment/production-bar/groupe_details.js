import React from "react";
import {useState,useEffect} from "react";
import HeaderManagment from "../../parts/header/index-managment";
import Groupe from "./groupe";
import { useParams } from 'react-router-dom';

function ProductionDetails(){
    const [isWait,setIsWait]=useState(true)
    const [groupe,setGroupe]=useState(true)

    const {id}=useParams()




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
               
              setGroupe(data)
                
              
            }
            })
    },[])





    return(
    <div className="" style={{width:99+"%"}}>
        <HeaderManagment/>
        <div  className="border-danger m-2 ">

        <div className="row justify-content-between">
            </div>        
                    <Groupe key={groupe.id} Mpoids={groupe.Mpoids} MoyPDM={groupe.MoyPDM} nbMalle={groupe.nbMalle} nbFemalle={groupe.nbFemalle} DateDMP={groupe.DateDMP} TM={groupe.TM} MoyPN={groupe.MoyPN} mère={groupe.mère} acc={groupe.acc_num} père={groupe.père} id={groupe.id}  acouplement={groupe.acouplement} date_naissance={groupe.date_naissance} date_souvrage={groupe.date_souvrage} nb_lapins_nées={groupe.nb_lapins_nées} nb_lapins_mortes_naissances={groupe.nb_lapins_mortes_naissances} ageMois={groupe.age} cage={groupe.cage} lapins={groupe.lapins} />
            
            </div>
    </div>
    );
}
export default ProductionDetails