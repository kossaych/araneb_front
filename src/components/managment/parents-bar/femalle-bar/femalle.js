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
    fetch("https://kossay.pythonanywhere.com/parents/api/femalle/"+id,{
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
    
    fetch(`https://kossay.pythonanywhere.com/parents/api/femalle/${id.toString()}`,{
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
 
  function deleteHandler(id){
    document.getElementById("delete-alert-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'
  }
  function hidenAlerts(id){
    document.getElementById("delete-alert-"+id).style.display='none';
    document.getElementById("layer-"+id).style.display='none'
    document.getElementById("statistique-"+id).style.display='none';
    document.getElementById("layer-statistique-"+id).style.display='none'
  }
  function statistiqueHandler(id){
    document.getElementById("statistique-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'
  }


    return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5 " id={`femalle-${props.id}`} >
              <div className="card h-100 border-success pb-2">
               
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
                                <button type="button" class="btn btn-danger" onClick={() => deleteFemalleApi(props.id)}>Delete</button>
                              </div>
                            </div>
                          </div>
                      </div>  
                </div>
                <div   style={{"display":"none","position":"fixed","top":'20%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0, 0.0)"}} id={`statistique-${props.id}`} className="col-12  m-auto ">
                    <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                            <button onClick={()=>hidenAlerts(props.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                    </div>
                    <div  class="row m-2 p-2"   style={{"position":"relative","top":"10%",'left':'2%',"width":"90%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
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


                <div className="card-footer bg-success bg-opacity-75 row m-0 justify-content-around">
                  <button onClick={()=>statistiqueHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={details}></img></button>
                  <Link to={"/managment/parents/femalles/update/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={update} ></img></Link>
                  <button onClick={()=>deleteHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteFemalle} ></img></button>
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
                
              </div>
          </div>
    );

}
export default Femalle










