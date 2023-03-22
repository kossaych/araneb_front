import React, { useState } from "react";
import update from"./icons/update.png";
import deleteMalle from "./icons/delete.png";
import market from "./icons/market.png";
import mort from "./icons/mort.png";
import details from "./icons/details.png";
import { Link } from "react-router-dom";
import close from "./icons/close.png";

function Malle(props){
  const [message,setMessage]=useState(true)

  function deleteMalleApi(id){
    
    fetch(`http://127.0.0.1:8000/manager/api/malle/${id.toString()}`,{
  method:'delete',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

  },
  },
  )
  .then(response =>{
  if (response.status==204){
      return true
  }else if(response.status==500){
    return "server error 500"
  }else{
    return response.json()
  }
  })
  .then(data =>{
    if (data === true){
      window.location.reload()
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
  function deleteHandler(id){
    document.getElementById("delete-alert-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'
  }
  function hidenAlerts(id){
    document.getElementById("delete-alert-"+id).style.display='none';
    document.getElementById("layer-"+id).style.display='none'
  }
    return(


            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
              <div className="card h-100 border-success">
                
                  
                <div onClick={()=>hidenAlerts(props.id)} style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20,"background": "rgba(0, 0, 0, 0.6)"}} id={`layer-${props.id}`} >
                </div>

                <div style={{"display":"none","position":"fixed","top":'35%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0, 0.0)"}} id={`delete-alert-${props.id}`} className="col-12 col-sm-6 col-md-4 col-lg-3 m-auto ">
                <div className="justify-content-end row" style={{"position":"relative","top":"35%"}}>
                                <button onClick={()=>hidenAlerts(props.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                        </div>
                      <div  class=" row   m-2 p-2"   style={{"position":"relative","top":"35%","background":"#FFFFFF","borderRadius":"10px",'height':150+'px','alignItems':'center'}} >
                          <div class="">
                            <div class="modal-content">
                              <div class="modal-header flex-column mb-3">
                                        
                                <h4 class="modal-title w-100">delete : {props.cage} </h4>	
                              </div>
                            
                              <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary m-1" onClick={()=> hidenAlerts(props.id)}>Cancel</button>
                                <button type="button" class="btn btn-danger" onClick={() => deleteMalleApi(props.id)}>Delete</button>
                              </div>
                            </div>
                          </div>
                      </div>  
                </div>


















             
                <div className="card-body ">
                  <img style={{'width':'100%'}}src={"http://127.0.0.1:8000/media/"+props.img}></img>
                  <div className="text-center">
                    {message}
                      <h5 className="m-0">lapin : {props.cage}</h5>
                      {props.race ? <p className="text-body m-0">race:{props.race}</p> :""}
                      age: {props.age} 
                    </div>
                  </div>
             
                 <div className="card-footer bg-success bg-opacity-50 row m-0 justify-content-around">
                   <Link to={"/managment/manager/malles/update/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={update} ></img></Link>
                   <button onClick={()=>deleteHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteMalle} ></img></button>
                   <Link  to={"/managment/manager/malles/vent/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={market} ></img></Link>
                   <Link  to={"/managment/manager/malles/morte/"+props.id+"/"+props.cage} cage={props.cage} className="col-2"><img style={{width:25+'px',}} src={mort} ></img></Link>

                </div>
              </div>
          </div>
    );

}
export default Malle