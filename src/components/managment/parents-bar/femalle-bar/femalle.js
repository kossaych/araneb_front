import React, { useState } from "react";
import update from"./icons/update.png";
import deleteFemalle from "./icons/delete.png";
import market from "./icons/market.png";
import mort from "./icons/mort.png";
import details from "./icons/details.png";
import close from "./icons/close.png"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
function Femalle(props){
  const [message,setMessage]=useState(true)

  const [TP,setTP]=useState(true)
  const [TM,setTM]=useState(true)
  const [TMN,setTMN]=useState(true)
  const [TPNet,setTPNet]=useState(true)
  const [DG,setDG]=useState(true)

  const [MPN,setMPN]=useState(true)


  const [TV,setTV]=useState(true)
  const [totalePrix,settoTalePrix]=useState(true)
  const [basPrix,setBasPrix]=useState(true)
  const [moyennePrix,setMoyennePrix]=useState(true)
  const [grandPrix,setGrandPrix]=useState(true)
  

  const [consMoi,setConsMoi]=useState(true)
  const [consAujourdhui,setConsAujourdhui]=useState(true)
  const [coupConsMoi,setCoupConsMoi]=useState(true)
  const [coupConsAujourdhui,setCoupConsAujourdhui]=useState(true)

  const id=props.id


 useEffect(()=>{
    fetch("http://127.0.0.1:8000/parents/api/femalle/"+id,{
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
          //window.location.href="/managment/parents/femalles"
        }else { 
            setTP(data.info.TP)
            setTM(data.info.TM)
            setTMN(data.info.TMN)
            setTPNet(data.info.TPnet)
            setDG(data.info.dernière_groupe)

            setMPN(data.info.MPN)

        
            setTV(data.info.TV)
            settoTalePrix(data.info.totale_prix)
            setBasPrix(data.info.bas_prix)
            setMoyennePrix(data.info.moy_prix)
            setGrandPrix(data.info.grand_prix)


            setConsAujourdhui(data.info.cons_aujourdhui)
            setConsMoi(data.info.cons_moi)
            setCoupConsAujourdhui(data.info.coup_cons_aujourdhui)
            setCoupConsMoi(data.info.coup_cons_moi)

        }
        })
},[])



  function deleteFemalleApi(id){
    
    fetch(`http://127.0.0.1:8000/parents/api/femalle/${id.toString()}`,{
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
      //window.location.reload()
      document.getElementById("femalle-"+id).style.display="none"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
 
    return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" id={`femalle-${props.id}`}>
              <div className="card h-100 border-success pb-2">
               

              


                 <div style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20000,"opacity":".9",background:"black"}} id={`delete-alert-${props.id}`} >
                <div  class=" col-11   m-2 p-2"   style={{"position":"relative","top":"50%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
                    <div class="">
                      <div class="modal-content">
                        <div class="modal-header flex-column">
                                  
                          <h4 class="modal-title w-100">delete : {props.cage} </h4>	
                        </div>
                      
                        <div class="modal-footer justify-content-center">
                          <button type="button" class="btn btn-secondary m-1" onClick={()=> document.getElementById(`delete-alert-${props.id}`).style.display="none"}>Cancel</button>
                          <button type="button" class="btn btn-danger" onClick={() => deleteFemalleApi(props.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                 </div>     

                 </div>






                 <div className="card-footer bg-success bg-opacity-50 row m-0 justify-content-around">
                   <button onClick={()=>document.getElementById(`delails-${props.id}`).style.display='block'} className="col-2 button-hiden"><img style={{width:25+'px',}} src={details}></img></button>
                   <Link to={"/managment/parents/femalles/update/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={update} ></img></Link>
                   <button onClick={()=>document.getElementById(`delete-alert-${props.id}`).style.display='block'} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteFemalle} ></img></button>
                   <Link  to={"/managment/parents/femalles/vent/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={market} ></img></Link>
                   <Link  to={"/managment/parents/femalles/morte/"+props.id+"/"+props.cage} cage={props.cage} className="col-2"><img style={{width:25+'px',}} src={mort} ></img></Link>

                </div>
                <div className="card-body ">
                  <div className="text-center">
                    {message}
                      <h5 className="m-0">lapin : {props.cage}</h5>
                      {props.race ? <p className="text-body m-0">race:{props.race}</p> :""}
                      age: {props.ageMois} 
                    </div>
                </div>
                
                
                <div className="card bg-info bg-opacity-25 m-2 p-2" id={`delails-${props.id}`} style={{"display":"none"}}>
                      <div className="justify-content-end row">
                          <button onClick={()=>document.getElementById(`delails-${props.id}`).style.display='none'} className="col-2 button-hiden m-2"><img style={{width:25+'px',}} src={close}></img></button>
                      </div>
                      <h1>statistique</h1>
                      <div>la productivité :</div>
                      <div >{((TP*100)/8)}%</div>
                      <div>les mortalité :</div>
                      <div >{((TM*100)/3)}%</div>
                      

                      <div>les poid des lapins produits a la naissance :</div>
                      <div >{((MPN*100)/50)}%</div>



                </div>
             


              <div style={{overflowY:"scroll",overflowX:"hidden",height:370+"px"}}>  
                <div className="m-auto mt-2 rounded p-1 bg-success bg-opacity-25 border border-danger"  style={{"width":90+"%"}}>
                    <h3 className="text-danger">consomation d'alimantation :</h3>
                    <table class="table table-striped">                   
                     
                        <tbody>
                          <tr>
                            <th scope="row"> aujourd'hui</th>
                            <td className="text-primary">{consAujourdhui}</td>
                           
                          </tr>
                          <tr>
                            <th scope="row">ce moi</th>
                            <td className="text-primary">{consMoi}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">coup de consomation aujourd'hui</th>
                            <td colspan="2" className="text-primary">{coupConsAujourdhui}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">coup de consomation ce moi</th>
                            <td colspan="2" className="text-primary">{coupConsMoi}</td>
                            
                          </tr>
                        </tbody>
                      </table>
                    
                </div>
              
                <div className="m-auto mt-2 rounded p-1 bg-success bg-opacity-50 border border-dark"  style={{"width":90+"%"}}>
                    <h3 className="text-success">production :</h3>
                    <table class="table table-striped">                   
                     
                        <tbody>
                          <tr>
                            <th scope="row"> totale de production</th>
                            <td className="text-danger">{TP}</td>
                           
                          </tr>
                          <tr>
                            <th scope="row">totale des mortalité</th>
                            <td className="text-danger">{TM}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">totale des mortalité a la naissanc</th>
                            <td colspan="2" className="text-danger">{TMN}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">totale de production net</th>
                            <td colspan="2" className="text-danger">{TPNet}</td>
                            
                          </tr>
                         {DG==false ? "" : <Link  to={"/managment/production/details/"+DG} className="col-2 text-dark" style={{"fontSize":18+"px","margin":10+"px"}}>le groupe de production</Link>}

                        </tbody>
                      </table>
                    
                </div>
            


                <div className="m-auto mt-2 rounded p-1 bg-success bg-opacity-50 border border-dark"  style={{"width":90+"%"}}>
                    <h3 className="text-dark">les ventes :</h3>
                    <table class="table table-striped">                   
                     
                        <tbody>
                          <tr>
                            <th scope="row"> totale des ventes</th>
                            <td className="text-dark">{TV}</td>
                           
                          </tr>
                          <tr>
                            <th scope="row">totale des prix</th>
                            <td className="text-dark">{totalePrix}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">moyenne des prix</th>
                            <td colspan="2" className="text-dark">{moyennePrix}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">le plus grand prix </th>
                            <td colspan="2" className="text-dark">{basPrix}</td>
                            
                          </tr>
                          <tr>
                            <th scope="row">le plus bas prix </th>
                            <td colspan="2" className="text-dark">{grandPrix}</td>
                            
                          </tr>
                        </tbody>
                      </table>
                    
                </div>
               
              </div>


                
              </div>
          </div>
    );

}
export default Femalle










