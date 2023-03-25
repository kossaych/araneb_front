import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderManagment from "../../parts/header/index-managment"; 
import remove from "./icons/remove.png";
function MorteMasse(props){
    
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  const [message,setMessage]=useState(true)
  const [dateMort,setDateMort]=useState(yyyy+"-"+mm+"-"+dd)
  
  
  const [listLapins,setListLapins]=useState([])


  



  const {id}=useParams()
  const {cage}=useParams()

 


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/manager/groupes/"+id,{
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
          let lapins=data.lapins
          for (let i=0;i<lapins.length;i++){
              lapins[i]={id: lapins[i].id, cage: lapins[i].cage ,checked:false}
          }
          setListLapins(lapins)
        }
        })
},[])






  function Morte(){
    
    let nbLapins=0
    for(let i=0;i<listLapins.length;i++){
      if(listLapins[i].checked==true){
        nbLapins += 1
      }
    }
    if(nbLapins==0){
      return false
    }
    let lapins=[]//listLapins
    for(let i=0;i<listLapins.length;i++){
      if(listLapins[i].checked==true){
        lapins.push(listLapins[i].id)
      }
    }
    fetch("http://127.0.0.1:8000/manager/groupes/mort_masse",{
  method:'post',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "lapins":lapins,
    "date_mort":dateMort,
    
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
  })}
 

  function removeAll(){
    setListLapins([])
    let options=document.getElementsByTagName('option')
    for(let i=0;options.length;i++){
      options[i].style.background="rgba(0, 0, 0, 0)"
    }
  }
  function handlerlist(lapin,cage){
    for(let i=0;i<listLapins.length;i++){
      if(listLapins[i].id==String(lapin)){
        if(listLapins[i].checked==true){
          let lapins=listLapins
          lapins[i]={id: lapins[i].id, cage: lapins[i].cage ,checked:false}
          setListLapins(lapins)
          document.getElementById(lapin).style.background="rgba(0, 0, 0, 0)"
          document.getElementById(lapin+"-price").style.display='none'
          document.getElementById(lapin+"-price-label").style.display='none'


          break
        }else {
          let lapins=listLapins
          lapins[i]={id: lapins[i].id, cage: lapins[i].cage ,checked:true}
          setListLapins(lapins)
          document.getElementById(lapin).style.background="rgba(255, 92, 92)"
          document.getElementById(lapin+"-price").style.display='inline-block'
          document.getElementById(lapin+"-price-label").style.display='inline-block'

          break
        }
      }
    }
 
}
    return(
      <div>
        <HeaderManagment/>
        <div className=" card p-2 col-12 "  >
     
        
        <div className="alert alert-danger" role="alert">
          selectionner les lapin morte de ce groupe {cage}
          <h3 id="message">{message}</h3>
        <br/>
        <label>lapins :</label><br></br>
      
        <div style={{height:180+"px",outline: "none",width:99+"%",overflow:"auto",color:"black"}} className="border border-danger bg-danger bg-opacity-25 rounded select">
        {listLapins.map(o => (
                <option key={o.id} id={o.id} value={o.id} onClick={ e => handlerlist(e.target.value,o.cage)} >{o.cage}</option>
              ))}
        </div>
        <button style={{outline: "none",width:99+"%"}} onClick={()=>removeAll()} className="col-2 btn btn-outline-danger "  ><img style={{width:25+'px',}} src={remove} ></img></button><br></br>

     
        


      
      
      <br></br>
        <label>date de mort</label><br></br>
        <input   value={dateMort} onChange={e=>setDateMort(e.target.value)}  className="border border-danger bg-danger bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
        </div>
      
      <div className="row justify-content-around mt-2"> 
                    
        <button  onClick={()=>Morte(id)} className="col-5 btn btn-success"  >oui</button>
        
        <Link to={"/managment/manager/femalles"} className="col-5 btn btn-danger">non</Link>
      </div >
      </div>
      
      </div>
    );

}
export default MorteMasse





