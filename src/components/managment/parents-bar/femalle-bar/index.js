import React from "react";
import {useState,useEffect} from "react";
import Femalle from "./femalle";
import add from "./icons/add.png";
import HeaderManagment from "../../../parts/header/index-managment";
import { Link } from "react-router-dom";
function FemallesBar(){
    const [femalles,setFemalle]=useState([]);
    
    const [isWait,setIsWait]=useState(true)


     
  useEffect(()=>{

    if (localStorage.getItem('token')==null){
      window.location.href = "/login"

    }
    

  fetch("http://127.0.0.1:8000/parents/api/femalles",{
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
setFemalle(data)
setIsWait(false)
})},[])


    return(
    <div>
<HeaderManagment></HeaderManagment>

    <div  className="row border-danger m-1">
        <div className="col-10 m-auto row justify-content-between">
            <h4 className="text-danger col-1 p-0">femalles</h4>
            <Link to="/managment/parents/femalles/create" className="col-1 p-0"><img style={{width:25+'px',margin:5+'px',}} src={add} ></img></Link>
        </div>   
  
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {femalles && femalles.map((femalle)=>(
            <Femalle img={femalle.img} key={femalle.id} id={femalle.id} consAujourdhui={femalle.cons_aujourdhui} race={femalle.race} ageMois={femalle.age} cage={femalle.cage} />
        ))}
                
         
            
    </div>
    </div>
    );
}
export default FemallesBar






















