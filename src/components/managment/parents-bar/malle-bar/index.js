import React from "react";
import { useState,useEffect} from "react";
import Malle from "./malle";
import add from "./icons/add.png";
import HeaderManagment from "../../../parts/header/index-managment";
import { Link } from "react-router-dom";
function MallesBar(){
  if (localStorage.getItem('token')==null){
    window.location.href = "/login"

  }
    const [malles,setMalles]=useState([]);
    const [mallesProduction,setMallesProduction]=useState([]);
    const [mallesVendue,setMallesVendue]=useState([]);
    const [mallesMort,setMallesMort]=useState([]);

    const [isWait,setIsWait]=useState(true)
  useEffect(()=>{    

      fetch("http://127.0.0.1:8000/manager/api/malles",{
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
    setMalles(data)
    for(let i=0; i<data.length; i++){
      if(data[i].state==="production"){
        setMallesProduction(mallesProduction => [...mallesProduction,data[i]] );
      }
      if(data[i].state==="vendue"){
        setMallesVendue(mallesVendue => [...mallesVendue,data[i]] );
      }else if(data[i].state==="mort"){
        setMallesMort(mallesMort => [...mallesMort,data[i]] );
      }
    }

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
    <div  className="row border-danger m-2">
        <div className="col-12 m-auto row justify-content-between">
            <h4 className="text-danger col-1 p-0">malles</h4>
            <Link to="/managment/manager/malles/create" className="col-1 p-0"><img style={{width:25+'px',margin:5+'px',}} src={add} ></img></Link>
        </div>   
        <div className="col-12 m-auto mb-2 row justify-content-between p-0 bg-secondary bg-opacity-25  rounded" style={{'border-bottom':'solid 1px'}}>
          <button style={{'border':'none','width':"33.3333333%"}} className=""    id='prod-button'  onClick={showProduction} >prod</button>
          <button style={{'border':'none','width':"33.3333333%"}} className=""    id='ven-button' onClick={showVendue} >vendue</button>
          <button style={{'border':'none','width':"33.3333333%"}} className=""    id='mort-button'  onClick={showMort} >mort</button>

        </div> 


        <div id="production">
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {mallesProduction && mallesProduction.map((malle)=>(
            <Malle key={malle.id} img={malle.img} id={malle.id} race={malle.race} age={malle.age}/>
        ))}
        </div>
       <div id="mort" style={{'display':'none'}}>
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {mallesMort && mallesMort.map((malle)=>(
            <Malle key={malle.id} img={malle.img} id={malle.id} race={malle.race} age={malle.age}/>
        ))}
       </div>
       <div id="vendue" style={{'display':'none'}}>
       { isWait ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> : ""}
       {mallesVendue && mallesVendue.map((malle)=>(
            <Malle key={malle.id} img={malle.img} id={malle.id} race={malle.race} age={malle.age}/>
        ))}
        
        </div>         
        
         
            
    </div>
    </div>
    );
}
export default MallesBar