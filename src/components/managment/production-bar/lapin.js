import React, { useState } from "react";
import update from"./icons/update.png";
import deleteFemalle from "./icons/delete.png";
import market from "./icons/market.png";
import mort from "./icons/mort.png";
import details from "./icons/details.png";
import poid from "./icons/details.png";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Link } from "react-router-dom";
function Lapin(props){
  const [message,setMessage]=useState(true)

  function deleteFemalleApi(id){
    
    fetch(`https://kossay.pythonanywhere.com/production/lapins_productions/${id.toString()}`,{
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


            <div className="col-12 p-2 mb-5">
              <div className="border-success col-12" style={{border:1+"px solid",borderRadius:10+"px"}}>
                
               
                <div className="card-body ">
                  <div className="text-center">
                    {message}
                      <h5 className="m-0">lapin : {props.cage}</h5>
                      {props.race ? <p className="text-body m-0">race:{props.race}</p> :""}
                      {props.sex ? <p className="text-body m-0">sex:{props.sex}</p> :""}

                    </div>





                    <div className="m-auto col-11 row  border bg-primary bg-opacity-25 text-primary p-2 border-primary rounded  d-flex justify-content-center mb-2 mt-2" >



                    <div className="m-auto row justify-content-between bg-success bg-opacity-25 rounded">
                        <h4 className="text-danger col-10 p-0">les vaccins</h4>
                    </div>
                    <div className="">
                    <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Maladie</th>
                        <th scope="col">Date</th>
                        <th scope="col">Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      


                      {props.vaccins.map((vaccin)=>(
                              <tr>
                              <th scope="row">{vaccin.nom}</th>
                              <td>{vaccin.maladie}</td>
                              <td>{vaccin.date_vaccin}</td>
                              <td>{vaccin.prix}dt</td>
                              </tr>
                          ))}


                    </tbody>
                    </table>
                    </div>



                    </div>







                    <div className="col-11 m-auto">
            <table className="table table-striped col-12 rounded m-auto bg-success bg-opacity-50" style={{width:97+"%"}}>
            < tbody>
                <tr>
                <th scope="row"> poid a la naissance</th>
                    <td>  
                    <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.PN}</span></h5>

                    </td>
                  
                </tr>
                <tr>
                  
                <th scope="row">poid a la dernier mesure date: {/* {props.DateDMP} */}</th>
                    <td>  
                    <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.PDM}</span></h5>

                    </td>
                </tr>
                <tr>
                  
                  <th scope="row">moyenne des poids au souvrage: {/* {props.DateSevrage} */}</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.PS}</span></h5>

                      </td>
                </tr>
              </tbody>
            </table>                 
            </div>
            <div className="col-11 m-auto border bg-danger bg-opacity-25 text-danger border-danger rounded p-2  mb-2 mt-2" >
          
   
                
                  
                  
                  <h4 scope="row">moyenne des poids poid(t:wee):</h4><br></br>
                  <tr>
                    <td  > 
                      
                    { props.poids.length==0 ? 
                    <div className="col-12 " >
                        <h4 className="alert-heading">OOPS !</h4><br></br>
                        <p>t'as pas encore ajouter des mesure de poid a ce groupe.</p><br></br>
                        
          
                        <Link  to={"/managment/groupe/poid_mesure/"+props.id+"/"+props.cage} cage={props.cage} className="col-7 m-auto"><img style={{width:50+'px',display:"block"}} src="{poid}" className="m-auto" ></img> <br></br> déterminer les poids des lapins</Link><br></br>







                      </div>:<div style={{overflowX:"scroll",overflowY:"hidden",width:window.screen.width-120}}>
                      <LineChart   width={((window.screen.width*100)/100)} height={400} data={props.poids}>
                        <Line type="monotone" dataKey="mesure" stroke="#930000" />
                        <CartesianGrid stroke="#47A0FF" />
                        <XAxis dataKey="date" />
                        <YAxis />
                      </LineChart>
                      </div>
                        }
                      

                      
                    </td>
                  
                  </tr><br></br>


               
            </div>
        


                             <div style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20000,"opacity":".9",background:"black"}} id={`delete-alert-${props.id}`} >
                <div  class=" col-11   m-2 p-2"   style={{"position":"relative","top":"50%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
	<div className="">
		<div className="modal-content">
			<div className="modal-header flex-column">
								
				<h4 className="modal-title w-100">delete :</h4>	
			</div>
		
			<div className="modal-footer justify-content-center">
				<button type="button" className="btn btn-secondary m-1" onClick={()=> document.getElementById(`delete-alert-${props.id}`).style.display="none"}>Cancel</button>
				<button type="button" className="btn btn-danger" onClick={() => deleteFemalleApi(props.id)}>Delete</button>
			</div>
		</div>
	</div>
                 </div>     
                 </div>     
             




                </div>
             
                 <div className="card-footer bg-success bg-opacity-50 row m-0 justify-content-around">
                   <Link to={"/managment/groupe/lapin/update/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={update} ></img></Link>
                   <button onClick={()=>document.getElementById(`delete-alert-${props.id}`).style.display='block'} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteFemalle} ></img></button>

                </div>
              </div>
          </div>
    );

}
export default Lapin