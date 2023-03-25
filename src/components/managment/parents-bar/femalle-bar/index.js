import React from "react";
import {useState,useEffect} from "react";
import Femalle from "./femalle";
import add from "./icons/add.png";
import HeaderManagment from "../../../parts/header/index-managment";
import { Link } from "react-router-dom";
function FemallesBar(){
    
    const [isWait,setIsWait]=useState(true)

    const [femallesProduction,setFemallesProduction]=useState([]);
    const [femallesVendue,setFemallesVendue]=useState([]);
    const [femallesMort,setFemallesMort]=useState([]);


     
  useEffect(()=>{

    if (localStorage.getItem('token')==null){
      window.location.href = "/login"

    }
    

  fetch("https://kossay.pythonanywhere.com/manager/api/femalles",{
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
             



  for(let i=0; i<data.length; i++){
    console.log(data[i])
    if(data[i].state==="production"){
      setFemallesProduction(femallesProduction => [...femallesProduction,data[i]] );
    }
    if(data[i].state==="vendue"){
      setFemallesVendue(femallesVendue => [...femallesVendue,data[i]] );
    }else if(data[i].state==="mort"){
      setFemallesMort(femallesMort => [...femallesMort,data[i]] );
    }}
    console.log(data,femallesVendue,femallesMort,femallesProduction)




setIsWait(false)
})},[])

const showProduction=()=>{
  document.getElementById("production").style.display="block"
  document.getElementById("vendue").style.display="none"
  document.getElementById("mort").style.display="none"


  document.getElementById('prod-button').style.borderBottom ='solid 1px'
  document.getElementById('ven-button').style.borderBottom ='none'
  document.getElementById('mort-button').style.borderBottom ='none'



}
const showVendue=()=>{
  document.getElementById("production").style.display="none"
  document.getElementById("vendue").style.display="block"
  document.getElementById("mort").style.display="none"


  document.getElementById("ven-button").style.borderBottom ='solid 1px'
  document.getElementById('prod-button').style.borderBottom ='none'
  document.getElementById("mort-button").style.borderBottom ='none'



}
const showMort=()=>{
  document.getElementById("production").style.display="none"
  document.getElementById("vendue").style.display="none"
  document.getElementById("mort").style.display="block"



  document.getElementById("mort-button").style.borderBottom ='solid 1px'
  document.getElementById('prod-button').style.borderBottom ='none'
  document.getElementById('ven-button').style.borderBottom ='none'

  
}
    return(
    <div>
<HeaderManagment></HeaderManagment>

    <div  className="row border-danger m-1">
        <div className="col-10 m-auto row justify-content-between">
            <h4 className="text-danger col-1 p-0">femalles</h4>
            <Link to="/managment/manager/femalles/create" className="col-1 p-0"><img style={{width:25+'px',margin:5+'px',}} src={add} ></img></Link>
        </div>   



        <div className="col-12 m-auto mb-2 row justify-content-between p-0 bg-secondary bg-opacity-25  rounded" style={{'border-bottom':'solid 1px'}}>
          <button style={{'border':'none','width':"33.3333333%",'border-bottom':'solid 1px'}} className=""    id='prod-button'  onClick={showProduction} >prod</button>
          <button style={{'border':'none','width':"33.3333333%"}} className=""    id='ven-button' onClick={showVendue} >vendue</button>
          <button style={{'border':'none','width':"33.3333333%"}} className=""    id='mort-button'  onClick={showMort} >mort</button>

        </div> 
       
        <div id="production">
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {femallesProduction && femallesProduction.map((femalle)=>(
            <Femalle key={femalle.id} img={femalle.img} id={femalle.id} race={femalle.race} age={femalle.age}/>
        ))}
        </div>



       <div id="mort" style={{'display':'none'}}>
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {femallesMort && femallesMort.map((femalle)=>(
            <Femalle key={femalle.id} img={femalle.img} id={femalle.id} race={femalle.race} age={femalle.age}/>
        ))}
       </div>
       <div id="vendue" style={{'display':'none'}}>
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {femallesVendue && femallesVendue.map((femalle)=>(
            <Femalle key={femalle.id} img={femalle.img} id={femalle.id} race={femalle.race} age={femalle.age}/>
        ))}
        
        </div>    
                
         
            
    </div>
    </div>
    );
}
export default FemallesBar






















