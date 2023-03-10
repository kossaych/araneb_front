import React, { useState } from "react";
import update from"./icons/update.png";
import deleteMalle from "./icons/delete.png";
import market from "./icons/market.png";
import mort from "./icons/mort.png";
import details from "./icons/details.png";
import { Link } from "react-router-dom";
function Malle(props){
  const [message,setMessage]=useState(true)

  function deleteMalleApi(id){
    
    fetch(`http://127.0.0.1:8000/parents/api/malle/${id.toString()}`,{
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
 
    return(


            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
              <div className="card h-100 border-success">
                
                                  <div style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20000,"opacity":".9",background:"black"}} id={`delete-alert-${props.id}`} >
                <div  class=" col-11   m-2 p-2"   style={{"position":"relative","top":"50%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
	<div className="">
		<div className="modal-content">
			<div className="modal-header flex-column">
								
				<h4 className="modal-title w-100">delete :</h4>	
			</div>
		
			<div className="modal-footer justify-content-center">
				<button type="button" className="btn btn-secondary m-1" onClick={()=> document.getElementById(`delete-alert-${props.id}`).style.display="none"}>Cancel</button>
				<button type="button" className="btn btn-danger" onClick={() => deleteMalleApi(props.id)}>Delete</button>
			</div>
		</div>
	</div>
                 </div>    
                 </div> 
             
                <div className="card-body ">
                  <div className="text-center">
                    {message}
                    <img src={"http://127.0.0.1:8000/media/"+props.img}></img>

                      <h5 className="m-0">lapin : {props.cage}</h5>
                      {props.race ? <p className="text-body m-0">race:{props.race}</p> :""}
                      age: {props.age} 
                    </div>
                </div>
             
                 <div className="card-footer bg-success bg-opacity-50 row m-0 justify-content-around">
                   <Link className="col-2 " to={"/managment/parents/malles/details_malle"}><img  style={{width:20+'px',}} src={details} ></img></Link>
                   <Link to={"/managment/parents/malles/update/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={update} ></img></Link>
                   <button onClick={()=>document.getElementById(`delete-alert-${props.id}`).style.display='block'} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteMalle} ></img></button>
                   <Link  to={"/managment/parents/malles/vent/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={market} ></img></Link>
                   <Link  to={"/managment/parents/malles/morte/"+props.id+"/"+props.cage} cage={props.cage} className="col-2"><img style={{width:25+'px',}} src={mort} ></img></Link>

                </div>
              </div>
          </div>
    );

}
export default Malle