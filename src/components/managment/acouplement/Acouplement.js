import React, { useEffect, useState } from "react";
import update from"./icons/update.png";
import deleteFemalle from "./icons/delete.png";
import birth from "./icons/birth.png";
import mort from "./icons/mort.png";
import test from "./icons/test.png";
import { Link } from "react-router-dom";
function Acouplement(props){
  const lapins=props.lapins
  const [message,setMessage]=useState(true)
  const [isWait,setIsWait]=useState(true)

  function deleteAcc(id){
    
    fetch(`http://localhost:8000/manager/accouplements/${id.toString()}`,{
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
        <div className="border border-success row m-auto mb-3 mt-3" style={{background:"#9FE2BF"}}>
                <div className="col-12">
                <h3 className="">Acouplement :{props.num}</h3>
                </div>
                <div className="">
                  <div className="row col-12 col-sm-6  mb-2 mt-2">
                    <table className="table">
              
                      <tbody>
                        <tr>
                          <th scope="row">mère</th>
                          <td><span className="text-dark">{props.mère}</span></td>
                        
                        </tr>
                        <tr>
                          <th scope="row">père</th>
                          <td><span className="text-dark">{props.père}</span></td>
                          
                        </tr>
                        <tr>
                          <th scope="row">age</th>
                          <td>
                      
                                <h5><span className="text-dark">date acouplage :{props.date_acouplage}</span><br></br><span className="text-primary">il a :{props.age} jours</span></h5>
                      
                          </td>
                        
                        </tr>
                        <tr>
                        <th scope="row">test :</th>
                          <td>
                            {props.test === "enceinte" ? <span className="text-success"><h4>{props.test}</h4></span> : ""}
                            {props.test === "pas_enceinte" ? <span className="text-danger"><h4>{props.test}</h4></span> : ""}
                            {props.test != "enceinte" & props.test != "pas_enceinte"? <span className="text-dark">{props.test}</span> : ""}
                            {props.date_test != "null" ? <div><span className="text-primary">date test : {props.date_test}</span></div>: ""}
                            {props.age>=9  ? <Link  to={"/managment/acouplement/test/"+props.id+"/"+props.num}  className="col-2"><img src={test} style={{width:25+"px"}}  ></img>test</Link> :""}

                          </td> 
                        
                        </tr>
                      </tbody>
                    </table>
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
				<button type="button" className="btn btn-danger" onClick={() => deleteAcc(props.id)}>Delete</button>
			</div>
		</div>
	</div>
                 </div>  
                 </div>  









                <div>
                  {props.create_at<=1 ? <Link  to={"/managment/acouplement/update/"+props.id+"/"+props.num}  className="col-2"><img src={update} style={{width:25+"px"}}  ></img>update</Link>  :""}
            
                   <button onClick={()=>document.getElementById(`delete-alert-${props.id}`).style.display='block'} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteFemalle} ></img> delete</button>
                  {props.test==="enceinte" || props.test==="non_vérifié" ? <Link  to={"/managment/acouplement/fause-couche/"+props.id+"/"+props.num}  className="col-2"><img src={mort} style={{width:25+"px"}}  ></img>fausse-couche</Link> :""}
                  {props.age>=27 & props.test==="enceinte" ? <Link  to={"/managment/manager/create/"+props.id+"/"+props.num}  className="col-2"><img src={birth} style={{width:25+"px"}}  ></img>naissance</Link> :""}
                </div>
           
                </div>



   




        </div>
    );

}
export default Acouplement