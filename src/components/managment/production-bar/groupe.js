import React, { useEffect, useState } from "react";
import update from"./icons/update.png";
import deleteIcon from "./icons/delete.png";
import market from "./icons/market.png";
import mort from "./icons/mort.png";
import sevrage from "./icons/sevrage.jpg";
import vaccin from "./icons/vaccin.png";
import close from  "./icons/close.png";
import poid from "./icons/poids.png";
import details from "./icons/details.png";

import { Link } from "react-router-dom";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Groupe(props){
  const lapins=props.lapins
  console.log(lapins)
  const [message,setMessage]=useState(true)
  const [isWait,setIsWait]=useState(true)
  const poids=props.Mpoids


  function deleteLapinProductionApi(id){
    
    fetch(`http://localhost:8000/manager/lapins_productions/${id.toString()}`,{
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
 

  function deleteGroupeProduction(id){
    
    fetch(`http://localhost:8000/manager/groupes/${id.toString()}`,{
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




  function hidenPopUps(id){
    document.getElementById("lapin-delete-"+id).style.display='none';
    document.getElementById("lapin-details-"+id).style.display='none';
    document.getElementById('layer-'+id).style.display='none';

  }
  function updateLapinHandler(id){
    document.getElementById("lapin-update-"+id).style.display='block';
    document.getElementById('layer-'+id).style.display='block';
  
  }
  function deleteLapinHandler(id){
    document.getElementById("lapin-delete-"+id).style.display='block';
    document.getElementById('layer-'+id).style.display='block';

  }
  function detailsLapinHandler(id){
    document.getElementById("lapin-details-"+id).style.display='block';
    document.getElementById('layer-'+id).style.display='block';

  }



    return(
        <div className="border border-success row m-auto mb-3 mt-3 rounded " style={{background:"#9FE2BF"}}>
           


              <div onClick={()=>hidenPopUps(props.id)} style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20,"background": "rgba(0, 0, 0, 0.6)"}} id={`layer-${props.id}`} >
              </div>
           
           
              <div style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20000,"opacity":".9",background:"black"}} id={`delete-alert-${props.id}`} >
                <div  class=" col-11   m-2 p-2"   style={{"position":"relative","top":"50%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
                  <div className="">
                    <div className="">
                              
                      <h4 className="">delete groupe {props.cage}:</h4>	
                    </div>
                  
                    <div className=" justify-content-center">
                      <button type="button" className="btn btn-secondary m-1" onClick={()=> document.getElementById(`delete-alert-${props.id}`).style.display="none"}>Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => deleteGroupeProduction(props.id)}>Delete</button>
                    </div>
                  </div>
              </div>  
              </div>  

              <div className="card-footer bg-success bg-opacity-50 row m-0 p-2 justify-content-around" >
                      <Link  to={"/managment/groupe/sevreage/"+props.id+"/"+props.cage}  className="col-2"><img style={{width:25+'px',}} src={sevrage} ></img></Link>
                      <Link to={"/managment/groupe/update/"+props.id} className="col-2"><img style={{width:25+'px',}} src={update} ></img></Link>
                      <button onClick={()=>document.getElementById(`delete-alert-${props.id}`).style.display='block'} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteIcon} ></img></button>
                      <Link  to={"/managment/groupe/vente_masse/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={market} ></img></Link>
                      <Link  to={"/managment/groupe/mort_masse/"+props.id+"/"+props.cage}  className="col-2"><img style={{width:25+'px',}} src={mort} ></img></Link>
                      <Link  to={"/managment/groupe/poid_mesure/"+props.id+"/"+props.cage} className="col-2"><img style={{width:25+'px',}} src={poid} ></img></Link>







              </div>

              <div className="col-12">
                  <h3 className="">Groupe :{props.cage}</h3>
              </div>

              <div className="row col-12   mb-2 mt-2">
              <table className="table table-striped m-1" >
              
                <tbody>
                  <tr>
                    <th scope="row">mère</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{props.mère}</span></td>
                      
                  
                  </tr>
                  <tr>
                    <th scope="row">père</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{props.père}</span></td>
                    
                  
                  </tr>
                  <tr>
                  <th scope="row">age</th>
                  <td> <h5><span className="text-dark" style={{marginLeft:50+"px"}}>{props.ageMois}</span></h5></td>
                    
                  </tr>
                  <tr>
                  <th scope="row">acouplement</th>
                      <td>               
                        <span className="text-dark" style={{marginLeft:50+"px"}}>{props.acc}</span>
                      </td>
                    
                  </tr>
                  <tr>
                    
                  <th scope="row">nb des lapins nées</th>
                      <td>
                        <span className="text-dark" style={{marginLeft:50+"px"}}>{props.nb_lapins_nées}</span>
                      </td>
                  </tr>
                  <tr>
                    
                  <th scope="row">nb lapins mortes a la naissances</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.nb_lapins_mortes_naissances}</span></h5>

                      </td>
                  </tr>
                  <tr>
                    
                  <th scope="row">totale de mortalité</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.TM}</span></h5>

                      </td>
                  </tr>
                  <tr>
                  <th scope="row">nombre des malle</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.nbMalle}</span></h5>

                      </td>
                    
                  </tr>
                  <tr>
                    
                  <th scope="row">nombre des femalle</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.nbFemalle}</span></h5>

                      </td>
                  </tr>
            
                </tbody>
              </table>                 
              </div>

              <div className="col-12 text-danger">
                <h3 className="">alimentation </h3>
              </div>

              <table className="table table-striped col-11 rounded m-1 bg-success bg-opacity-50" style={{width:97+"%"}}>
                    
                    <tbody>
                      <tr>
                        <th scope="row">consomation d'alimentation aujourd'hui</th>
                        <td><span className="text-dark" style={{marginLeft:50+"px"}}>{props.cons_auj} g</span></td>
                          
                      
                      </tr>
                      <tr>
                        <th scope="row">consomation d'alimentation totale</th>
                        <td><span className="text-dark" style={{marginLeft:50+"px"}}>{props.cons} g</span></td>
                          
                      
                      </tr>
                  






                    </tbody>
              </table>

              <table className="table table-striped col-11 rounded m-1 bg-success bg-opacity-50" style={{width:97+"%"}}>
                
                <tbody>
                  <tr>
                    <th scope="row">coup de consomation d'alimentation aujourd'hui</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{props.coup_cons_auj} dt</span></td>
                      
                  
                  </tr>
                  <tr>
                    <th scope="row">coup de consomation d'alimentation totale</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{props.coup_cons} dt</span></td>
                      
                  
                  </tr>
              






                </tbody>
              </table>

              <div className="col-12 text-danger">
                  <h3 className="">les mesure des poid </h3>
              </div>

              <div className="">
              <div>
              <table className="table table-striped col-11 rounded m-1 bg-succes bg-opacity-50" style={{width:97+"%"}}>
              < tbody>
                  <tr>
                  <th scope="row">moyenne des poids a la naissance</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.MoyPN}</span></h5>

                      </td>
                    
                  </tr>
                  <tr>
                    
                  <th scope="row">moyenne des poids a la dernier mesure date: {props.DateDMP}</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.MoyPDM}</span></h5>

                      </td>
                  </tr>
                  <tr>
                    
                    <th scope="row">moyenne des poids au souvrage: {props.DateSevrage}</th>
                        <td>  
                        <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{props.MoyPS}</span></h5>

                        </td>
                  </tr>
                </tbody>
              </table>                 
              </div>
              <div className="col-12 border bg-success bg-opacity-25 text-success border-success rounded p-2 d-flex justify-content-center mb-2 mt-2" >
            
                  <tbody>
            
                  
                    
                    
                    <h4 scope="row">moyenne des poids poid(t:wee):</h4><br></br>
                    <tr>
                      <td  > 
                        
                      { poids.length==0 ? 
                      <div className="col-12 " >
                          <h4 className="alert-heading">OOPS !</h4><br></br>
                          <p>t'as pas encore ajouter des mesure de poid a ce groupe.</p><br></br>
                          
            
                          <Link  to={"/managment/groupe/poid_mesure/"+props.id+"/"+props.cage} cage={props.cage} className="col-7 m-auto"><img style={{width:50+'px',display:"block"}} src={poid} className="m-auto" ></img> <br></br> déterminer les poids des lapins</Link><br></br>







                        </div>:<div style={{overflowX:"scroll",overflowY:"hidden",width:window.screen.width-80}}>
                        <LineChart   width={(90*window.screen.width)/100} height={400} data={poids}>
                          <Line type="monotone" dataKey="mesure" stroke="#930000" />
                          <CartesianGrid stroke="#47A0FF" />
                          <XAxis dataKey="date" />
                          <YAxis />
                        </LineChart>
                        </div>
                          }
                        

                        
                      </td>
                    
                    </tr><br></br>


                      </tbody>
                
              </div>
          

              <div className="col-12 row m-auto border bg-primary bg-opacity-25 text-primary p-1 border-primary rounded  d-flex justify-content-center " >



                      <div className="m-auto row justify-content-between bg-success bg-opacity-25 rounded">
                          <h4 className="text-danger col-10 p-0">les vaccins</h4>
                          <Link to={"/managment/groupe/vaccin/"+props.id+"/"+props.cage} className="col-2 p-0 d-flex align-items-center"><img style={{width:30+'px',margin:5+'px',}} src={vaccin} ></img></Link>
                      </div>
                      <div className="">
                      <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col" style={{'text-align':'center'}}>Nom</th>
                          <th scope="col" style={{'text-align':'center'}}>Date</th>
                          <th scope="col" style={{'text-align':'center'}}>Prix</th>
                          <th scope="col" style={{'text-align':'center'}}>Nb lapins</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      

                        {props.vaccins.map((vaccin)=>(
                                <tr>
                                <th style={{'text-align':'center'}} scope="row">{vaccin.nom}</th>
                                <td style={{'text-align':'center'}} >{vaccin.date_vaccin}</td>
                                <td style={{'text-align':'center'}}>{vaccin.prix}dt</td>
                                <td style={{'text-align':'center'}}>{vaccin.lapins.length}</td>
                                </tr>
                            ))}


                      </tbody>
                    </table>
                      </div>
                    


              </div>
    



















            




      
            
            
            
            
              </div>

              <div>
              <h4>lapins du groupe :</h4>
              
              { lapins.length==0 ?  <div className="alert alert-danger" role="alert">
                            <p>toute les laperaux de ce groupe sont morte .</p>

                          </div>:<div className="">

                          <table class="table table-striped col-12 m-auto  p-0">
                        
                              <tbody className="col-12 m-0 p-0">
                          
                                {lapins && lapins.map((lapin)=>(
                                    <tr className="col-12 m-0 p-0">
                                    <th scope="row">{lapin.cage}</th>
                                    <td><Link to={'/managment/groupe/lapin/update/'+lapin.id+'/'+lapin.cage}><img style={{width:25+'px',}} src={update} /></Link></td>
                                    <td><button onClick={()=>deleteLapinHandler (lapin.id)} id={'delete-lapin-'+lapin.id} className='btn bg-danger  bg-opacity-50 m-0 p-0'><img style={{width:25+'px',}} src={deleteIcon} /></button></td>
                                    <td><button onClick={()=>detailsLapinHandler (lapin.id)} id={'details-lapin-'+lapin.id} className='btn bg-primary  bg-opacity-50 m-0 p-0'><img style={{width:25+'px',}} src={details} /></button></td>

                                  </tr>
                                  
                                ))}
                              </tbody>
                          </table>


                          {lapins && lapins.map((lapin)=>(
                            <div>
                                              <div onClick={()=>hidenPopUps(lapin.id)} style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20,"background": "rgba(0, 0, 0, 0.6)"}} id={`layer-${lapin.id}`} >
                                              </div>
                                              <div id={"lapin-details-"+lapin.id} className="col-12 m-0  animate__animated  animate__backInUp "  style={{"display":"none","position":"fixed","top":'25%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0,0.0)","height":"10%","alignItems":"center"}}   >
                                                  <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                                                              <button onClick={()=>hidenPopUps(lapin.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                                                  </div>
                                                  <div  class="row mt-1 pt-2 "   style={{"position":"relative","top":"10%",'left':'2%',"width":"100%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
                                                      <div style={{overflowY:"scroll",overflowX:"hidden",height:430+"px"}} className='m-auto'>  
                        
                                                                        <div className="m-auto text-center">
                                                                            <h5 className="m-0">lapin : {lapin.cage}</h5>
                                                                            {lapin.race ? <p className="text-body m-0">race:{lapin.race}</p> :""}
                                                                            {lapin.sex ? <p className="text-body m-0">sex:{lapin.sex}</p> :""}

                                                                        </div>
                                                                        <div className="m-auto col-12 row  border bg-primary bg-opacity-25 text-primary p-1 border-primary rounded  d-flex justify-content-center mb-2 mt-2" >



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
                        

                                                                              {lapin.vaccin.map((vaccin)=>(
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
                                                                        <div className="col-12 m-auto">
                                                                                  <table className="table table-striped col-12 rounded m-auto bg-success bg-opacity-50" style={{width:97+"%"}}>
                                                                                  < tbody>
                                                                                      <tr>
                                                                                      <th scope="row"> poid a la naissance</th>
                                                                                          <td>  
                                                                                          <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{lapin.PN}</span></h5>

                                                                                          </td>
                                                                                        
                                                                                      </tr>
                                                                                      <tr>
                                                                                        
                                                                                      <th scope="row">poid a la dernier mesure date: {/* {lapin.DateDMP} */}</th>
                                                                                          <td>  
                                                                                          <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{lapin.PDM}</span></h5>

                                                                                          </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                        
                                                                                        <th scope="row">moyenne des poids au souvrage: {/* {lapin.DateSevrage} */}</th>
                                                                                            <td>  
                                                                                            <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{lapin.PS}</span></h5>

                                                                                            </td>
                                                                                      </tr>
                                                                                    </tbody>
                                                                                  </table>                 
                                                                        </div>
                                                                        <div className="col-12 m-auto border bg-danger bg-opacity-25 text-danger border-danger rounded p-1  mb-2 mt-2" >

                                                                          <h4 scope="row">moyenne des poids poid(t:wee):</h4><br></br>
                                                                          <tr>
                                                                            <td  > 
                                                                              
                                                                            { lapin.Poids.length==0 ? 
                                                                            <div className="col-12 " >
                                                                                <h4 className="alert-heading">OOPS !</h4><br></br>
                                                                                <p>t'as pas encore ajouter des mesure de poid a ce groupe.</p><br></br>
                                                                                

                                                                                <Link  to={"/managment/groupe/poid_mesure/"+lapin.id+"/"+lapin.cage} cage={lapin.cage} className="col-7 m-auto"><img style={{width:50+'px',display:"block"}} src="{poid}" className="m-auto" ></img> <br></br> déterminer les poids des lapins</Link><br></br>







                                                                              </div>:<div style={{overflowX:"scroll",overflowY:"hidden",width:window.screen.width-80}}>
                                                                              <LineChart   width={((window.screen.width*90)/100)} height={400} data={lapin.Poids}>
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
                                                      </div>
                                                  </div>











                                              </div>
                            </div>
                          ))}

                          {lapins && lapins.map((lapin)=>(

                            <div style={{"display":"none","position":"fixed","top":'35%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0, 0.0)"}} id={'lapin-delete-'+lapin.id} className=" col-12 col-sm-6 col-md-4 col-lg-3 m-auto ">
                                    <div className="justify-content-end row" style={{"position":"relative","top":"35%"}}>
                                            <button onClick={()=>hidenPopUps(lapin.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                                    </div>
                                    <div  class=" row   m-2 p-2"   style={{"position":"relative","top":"35%","background":"#FFFFFF","borderRadius":"10px",'height':150+'px','alignItems':'center'}} >
                                        <div class="">
                                          <div class="modal-content">
                                            <div class="modal-header flex-column mb-3">
                                              <h4 class="modal-title w-100">delete : {lapin.cage} </h4>	
                                            </div>
                                          
                                            <div class="modal-footer justify-content-center">
                                              <button type="button" class="btn btn-secondary m-1" onClick={()=> hidenPopUps(lapin.id)}>Cancel</button>
                                              <button type="button" class="btn btn-danger" onClick={() => deleteLapinProductionApi(lapin.id)}>Delete</button>
                                            </div>
                                          </div>
                                        </div>
                                    </div>  
                            </div>













                          ))}

            
                                </div>
              }
              </div>
          
        </div>
    );

}
export default Groupe