import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderLogIn from "../../parts/header/index-loged-in"; 
import remove from "../../../assets/icons/remove.png";
function    VenteMasse(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  const [message,setMessage]=useState(true)
  const [dateVente,setDateVente]=useState(yyyy+"-"+mm+"-"+dd)
  const [priceLapins,setPriceLapins]=useState([])
  const [listLapins,setListLapins]=useState([])
  const {id}=useParams()
  const {cage}=useParams()
  useEffect(()=>{
      fetch("http://localhost:8000/manager/groupes/"+id,{
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
            window.location.href="/managment/manager/production"
          }else { 
              let lapins=data.lapins
              for (let i=0;i<lapins.length;i++){
                  lapins[i]={id: lapins[i].id, cage: lapins[i].cage ,checked:false}
              }
              setListLapins(lapins)
          }
          })
  },[])
  function priceHandler(price,lapin){
    if (priceLapins.indexOf(lapin)!=-1 ){
    }else{ 
      for(let i=0;i<priceLapins.length;i++){
              if(priceLapins[i].id==String(lapin)){
                setPriceLapins(priceLapins.splice(i,1))
              }
          }
      setPriceLapins(priceLapins.concat({"id":lapin,"price":price}));
    }
  }
  function Vente(id){

    let nbLapins=0
    for(let i=0;i<listLapins.length;i++){
      if(listLapins[i].checked==true){
        nbLapins += 1
      }
    }
    if(nbLapins==0){
      return false
    }
    let prices=document.getElementsByTagName('input')
    for(let i=0;i<prices.length;i++){
      if((prices[i].value=="" || prices[i].value==null) && (prices[i].style.display=="inline-block")){
          prices[i].focus()
          return false
      }
    }

    function getPrice(id){
      for(let i=0;i<priceLapins.length;i++){
        if(priceLapins[i].id==id){
          return priceLapins[i].price
        }
      }
      return false
    }
    let lapins=listLapins
    for(let i=0;i<listLapins.length;i++){
      if(listLapins[i].checked==true){
        lapins[i]={id:listLapins[i].id,price:getPrice(listLapins[i].id)};
      }else{
        lapins[i]={};
      }
    }
    
    fetch("http://localhost:8000/manager/groupes/vente_masse",{
  method:'post',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    
    "date_vente":dateVente,
    "lapins":lapins,
    //"lapins":lapins,
  
    
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
    setPriceLapins([])
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
            document.getElementById(lapin).style.background="rgba(0, 100, 255,5)"
            document.getElementById(lapin+"-price").style.display='inline-block'
            document.getElementById(lapin+"-price-label").style.display='inline-block'

            break
          }
        }
      }
   
  }
  return(
      <div>
        <HeaderLogIn/>
        <div className=" card p-2 col-12 "  >
     
        
        <div className="alert alert-primary" role="alert">
          selectiez les lapin que vous avez venduer de ce groupe {cage}
          <h3 id="message">{message}</h3>
        <br/>
        <label>lapins :</label><br></br>
      
        <div style={{height:180+"px",outline: "none",width:99+"%",overflow:"auto",color:"black"}} className="border border-primary bg-primary bg-opacity-25 rounded select">
        {listLapins.map(o => (
                <option key={o.id} id={o.id} value={o.id} onClick={ e => handlerlist(e.target.value,o.cage)} >{o.cage}</option>
              ))}
       
        </div>
        <button style={{outline: "none",width:99+"%"}} onClick={()=>removeAll()} className="col-2 btn btn-outline-danger mt-1"  ><img style={{width:25+'px',}} src={remove} ></img></button><br></br>
        <br></br>
        <div className="alert alert-dark m-0 p-2" style={{"margin":0+"px","padding":0+"px"}}>
        {listLapins.map(lapin => (
              <div className="m-0 p-0" style={{"margin":0+"px","padding":0+"px"}}>
              <span id={lapin.id+"-price-label"} style={{"display":"none"}} className="text-dark">poid de Lapin {lapin.cage} :(en dt)</span>
              <input max="15" id={lapin.id+"-price"} style={{"display":"none",borderRadius:5+'px'}} key={lapin.id} onChange={e=>priceHandler(e.target.value,lapin.id)}  className="border border-success  bg-success bg-opacity-25 "   type="number" />  
              </div> 
              ))}
        </div> 


      <br></br>
        <label>date de Vente</label><br></br>
        <input   value={dateVente} onChange={e=>setDateVente(e.target.value)}  className="border border-primary bg-primary bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
        </div>
      
      <div className="row justify-content-around mt-2"> 
                    
        <button  onClick={()=>Vente(id)} className="col-5 btn btn-success"  >oui</button>
        
        <Link to={"/managment/manager/production"} className="col-5 btn btn-danger">non</Link>
      </div >
      </div>
      
      </div>
  );
}
export default VenteMasse





