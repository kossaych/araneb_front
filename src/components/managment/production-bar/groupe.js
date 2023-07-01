import React, { useEffect, useState } from "react";
import update from"../../../assets/icons/update.png";
import deleteIcon from "../../../assets/icons/remove.png";
import market from "../../../assets/icons/market.png";
import mort from "../../../assets/icons/mort.png";
import sevrage from "../../../assets/icons/sevrage.jpg";
import vaccin from "../../../assets/icons/vaccin.png";
import close from  "../../../assets/icons/close.png";
import poid from "../../../assets/icons/poids.png";
import details from "../../../assets/icons/details.png";

import { Link } from "react-router-dom";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Groupe(props){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();


  const  [groupe,setGroupe]=useState(props)
  const  [lapins,setLapins]=useState(groupe.lapins)
  const [isWait,setIsWait]=useState(true)
  const [isWaitUpdateLapinProduction,setIsWaitUpdateLapinProduction]=useState(false)
  const [isWaitDeleteLapinProduction,setIsWaitDeleteLapinProduction]=useState(false)
  const [setIsWaitSevrageGroupe,setIsWaitSevrageGroupesetIsWaitSevrageGroupe]=useState(false)
  const [messageSevrage,setMessageSevrage]=useState('')
  const [dateSevrage,setdateSevrage]=useState(yyyy+"-"+mm+"-"+dd)
  const [message,setMessage]=useState('')
  const [race,setRace]=useState('')
  const [sex,setSex]=useState('non verifier')
  const [isWaitUpdate,setIsWaitUpdate]=useState(true)
  const [messageUpdate,setMessageUpdate]=useState(true)

  const [nbLapinNées,setNbLapinNées]=useState(groupe.nb_lapins_nées)
  const [dateNaissance,setDateNaissance]=useState(groupe.date_naissance)
  const [nbLapinMortes,setNbLapinMortes]=useState(groupe.nb_lapins_mortes_naissances)

  
  
  
  const poids=groupe.Mpoids
  function LapinProductionUpdate(id){
        setIsWaitUpdateLapinProduction(true)
    fetch("http://localhost:8000/manager/lapins_productions/"+id,{
    method:'put',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
    },
    body:JSON.stringify({
        "race":race,
        "sex":sex,
    })
    },
    )
    .then(response =>{
    if (response.status==202){
        return true
    }else if(response.status==500){
        return "server error 500"
    }else{
        return response.json()
    }
    })
    .then(data =>{
      setIsWaitUpdateLapinProduction(false)
    if (data === true){
        document.getElementById('lapin-update-'+id).style.display='none'
        document.getElementById('layer-'+id).style.display='none';
        lapins.map((lapin)=>{
          if (lapin.id==id) {
            lapin.sex=sex
            lapin.race=race
            //delete lapin object
            const index = lapins.indexOf(lapin);
            if (index > -1) { 
              lapins.splice(index, 1); 
            }
            setLapins(lapins=> [...lapins,lapin])
           

          }

        })
    }else {
      
        document.getElementById('message-update-lapin-production-'+id).style.display='block';
        setMessage(data)
    }
  })}
 
  function Races  ()  {
      const options=[
          
          {label:race,value:race},
          {label:'Gaint Flander',value:'Gaint Flander'},
          {label:'Flemish Giant',value:'Flemish Giant'},
          {label:'Chinchilla',value:'Chinchilla'},
          {label:'New Zealand White',value:'New Zealand White'},
          {label:'California',value:'California'},
          {label:'Rex',value:'Rex'},

  ]
      return (
          <select value={race} onChange={e => setRace(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
          {options[0].value != null ?  <option key={options[0].value} value={options[0].value} >{options[0].label}</option> : ''}
          {options.map(o => (
          (o.value!=race) ?<option key={o.value} value={o.value} >{o.label}</option>:""
              
          ))}
          
          </select>
      );
  };


  function deleteLapinProductionApi(id){
    setIsWaitDeleteLapinProduction(true)
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
      document.getElementById('lapin-delete-'+id).style.display='none'
      document.getElementById('lapin-production-'+id).style.display='none'
      document.getElementById("lapin-details-"+id).style.display='none';
      document.getElementById("lapin-update-"+id).style.display='none';
      document.getElementById('layer-'+id).style.display='none';
      setGroupe({...groupe,nb_lapins_nées:groupe.nb_lapins_nées-1})

  }
  setIsWaitDeleteLapinProduction(false)
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


  function Sevrage(id){
    
    fetch("http://localhost:8000/manager/groupes/groupe_sevrage/"+id,{
  method:'post',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "groupe":id,
    "date_sevrage":dateSevrage,
   
  })
  },
  )
  .then(response =>{
  if (response.status==200){
      return true
  }else if(response.status==500){
    return "server error 500"
  }else{
    return response.json()
  }
  })
  .then(data =>{
    if (data === true){
      window.location.href="/managment/production"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}



  function Update(id){
    setIsWaitUpdate(true)
    fetch("http://localhost:8000/manager/groupes/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "date_naissance":dateNaissance,
    "nb_lapins_nées":nbLapinNées,
    "nb_lapins_mortes":nbLapinMortes,
    "acouplement":groupe.acc,
   
  })
  },
  )
  .then(response =>{
  if (response.status==202){
      return true
  }else if(response.status==500){
    return "server error 500"
  }else{
    return response.json()
  }
  })
  .then(data =>{
    if (data === true){
      window.location.href="/managment/production"
    }else {
    document.getElementById('message-update').style.display='block';
    setMessageUpdate(data)
    }
    setIsWaitUpdate(false)

  })}



  function hidenPopUpsLapin(id){
    
    document.getElementById("lapin-details-"+id).style.display='none';
    document.getElementById("lapin-update-"+id).style.display='none';
    document.getElementById('layer-'+id).style.display='none';
    document.getElementById("lapin-delete-"+id).style.display='none';

    
    
    
    setIsWaitUpdateLapinProduction(false)
    setIsWaitDeleteLapinProduction(false)
    setMessage('')
    setRace('')
    setSex('non verifier')

  }
  function hidenPopUpsGroupe(id){
    setIsWaitSevrageGroupesetIsWaitSevrageGroupe(false)
    setMessageSevrage('')
    setdateSevrage(yyyy+"-"+mm+"-"+dd)
    setIsWaitUpdate(true)
    setMessageUpdate("")
  
    document.getElementById('message-update').style.display='none';

    document.getElementById("groupe-sevrage-"+id).style.display='none'
    document.getElementById("groupe-update-"+id).style.display='none'

    document.getElementById('layer-groupe-'+id).style.display='none';
    document.getElementById("groupe-delete-"+id).style.display='none'

    document.getElementById("delete-alert-"+id).style.display='none'



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
  function sevrageGroupeHandler(id){
    document.getElementById("groupe-sevrage-"+id).style.display='block'
    document.getElementById('layer-groupe-'+id).style.display='block';

  }
  function deleteGroupeHandler(id){
    document.getElementById("groupe-delete-"+id).style.display='block'
    document.getElementById('layer-groupe-'+id).style.display='block';

  }
  function updateGroupeHandler(id){
    document.getElementById("groupe-update-"+id).style.display='block'
    document.getElementById('layer-groupe-'+id).style.display='block';

  }
  



    return(
        <div className="border border-success row m-auto mb-3 mt-3 rounded " style={{background:"#9FE2BF"}}>
              <div onClick={()=>hidenPopUpsGroupe(groupe.id)} style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20,"background": "rgba(0, 0, 0, 0.6)"}} id={`layer-groupe-${groupe.id}`} >
              </div>

          

              <div style={{"height":100+"px","display":"none","position":"fixed","top":"30%",'bottom':'0','left':'0','right':'0',zIndex:20000}} id={`groupe-sevrage-${groupe.id}`} >
                <div className="justify-content-end row" style={{"top":"10%"}}>
                            <button onClick={()=>hidenPopUpsGroupe(groupe.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                </div>
                <div className="p-3 rounded mt-2" style={{background:"white","height":1000+"px",}} >
                                                    <div className="alert alert-success" role="alert">
                                                      est ce que vous vouler sevrer les lapins de ce groupe {groupe.cage}
                                                      <h3 id="message">{message}</h3>
                                                    <br/>
                                                    <label>date de sevrage</label>
                                                    <input   value={dateSevrage} onChange={e=>setdateSevrage(e.target.value)}  className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
                                                    </div>
                                                  
                                                  <div className="row justify-content-around mt-2"> 
                                                                
                                                    <button onClick={()=>Sevrage(groupe.id)}   className="col-5 btn btn-success"  >oui</button>
                                                    
                                                    <button onClick={()=>hidenPopUpsGroupe(groupe.id)} className="col-5 btn btn-danger">non</button>
                                              </div >
                </div>
              </div>
              <div style={{"height":100+"px","display":"none","position":"fixed","top":"30%",'bottom':'0','left':'0','right':'0',zIndex:20000}} id={`groupe-update-${groupe.id}`} >
                <div className="justify-content-end row" style={{"top":"10%"}}>
                            <button onClick={()=>hidenPopUpsGroupe(groupe.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                </div>
                <div className="mt-2 mb-2 row card bg-light  p-1 col-12  m-auto">
     
                                  <h4 className="text-dark">modifier les informations du groupe : <br></br> Toutes les anciennes informations seront supprimées de ce groupe</h4>
                                  <h4 id="message-update" style={{display:"none"}} className="alert alert-danger">{messageUpdate}</h4>
                                  
                                  <label>date naissance</label>
                                  <input  style={{outline: "none"}} id="date_naissance" value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="date" />
                                  
                                  <label> nombre des lapin nées</label>
                                  <input  style={{outline: "none"}}  value={nbLapinNées} onChange={e => setNbLapinNées(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="number" />
                                  
                                  <label> nombre des lapin mortes a la naissance</label>
                                  <input  style={{outline: "none"}}  value={nbLapinMortes} onChange={e => setNbLapinMortes(e.target.value)} className="border border-success  bg-success bg-opacity-25 rounded"  type="number" />




                                  <div className="row justify-content-around mt-2 col-12 m-auto"> 
                                                
                                    
                                    {isWaitUpdate ? <button  className="col-5 m-1 btn btn-success" onClick={()=>Update(groupe.id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
                                        <div className="spinner-border text-primary" role="status">
                                      <span className="sr-only"></span>
                                    </div>
                                          
                                          </button>}
                                          <button onClick={()=>hidenPopUpsGroupe(groupe.id)}  className="col-5 m-1 btn btn-danger">anuler</button>
                                  </div >
                                
                </div>
              </div>

              <div style={{"height":100+"px","display":"none","position":"fixed","top":"10%",'bottom':'0','left':'0','right':'0',zIndex:20000}} id={`groupe-delete-${groupe.id}`} >
                <div className="justify-content-end row" style={{"top":"10%"}}>
                            <button onClick={()=>hidenPopUpsGroupe(groupe.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                </div>
                <div className="bg-light alert  m-2 p-3" style={{height:470+"px"}}>
                    <div className="">
                              
                    <h4 class="modal-title w-100">tous les donnés de cette lapin <span style={{'color':'red'}}>{groupe.cage}</span>  seront supremer :
                                              <ul>
                                                <li>les lapins de groupe</li>
                                                <li>les mesures de poid</li>
                                                <li>les vaccins</li>
                                                <li>sa consomation d'alimantation</li>
                                                <li>le nombre des lapins a la naissance de sa groupe de production sera moins 1</li>
                                                ...

                                              </ul>
                                               </h4>
                    </div>
                  
                    <div className=" justify-content-center">
                      <button type="button" className="btn btn-secondary m-1" onClick={()=>hidenPopUpsGroupe(groupe.id)}>Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => deleteGroupeProduction(groupe.id)}>Delete</button>
                    </div>
                </div>
              </div>

              <div className="card-footer bg-success bg-opacity-50 row m-0 p-2 justify-content-around" >
                      
                      <button onClick={()=>sevrageGroupeHandler(groupe.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={sevrage} ></img></button>
                      <button onClick={()=>updateGroupeHandler(groupe.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={update} ></img></button>
                      <button onClick={()=>deleteGroupeHandler(groupe.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteIcon} ></img></button>
                      <Link  to={"/managment/groupe/vente_masse/"+groupe.id+"/"+groupe.cage} className="col-2"><img style={{width:25+'px',}} src={market} ></img></Link>
                      <Link  to={"/managment/groupe/mort_masse/"+groupe.id+"/"+groupe.cage}  className="col-2"><img style={{width:25+'px',}} src={mort} ></img></Link>
                      <Link  to={"/managment/groupe/poid_mesure/"+groupe.id+"/"+groupe.cage} className="col-2"><img style={{width:25+'px',}} src={poid} ></img></Link>
              </div>

              <div className="col-12">
                  <h3 className="">Groupe :{groupe.cage}</h3>
              </div>

              <div className="row col-12   mb-2 mt-2">
              <table className="table table-striped m-1" >
              
                <tbody>
                  <tr>
                    <th scope="row">mère</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.mère}</span></td>
                      
                  
                  </tr>
                  <tr>
                    <th scope="row">père</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.père}</span></td>
                    
                  
                  </tr>
                  <tr>
                  <th scope="row">age</th>
                  <td> <h5><span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.ageMois}</span></h5></td>
                    
                  </tr>
                  <tr>
                  <th scope="row">acouplement</th>
                      <td>               
                        <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.acc}</span>
                      </td>
                    
                  </tr>
                  <tr>
                    
                  <th scope="row">nb des lapins nées</th>
                      <td>
                        <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.nb_lapins_nées}</span>
                      </td>
                  </tr>
                  <tr>
                    
                  <th scope="row">nb lapins mortes a la naissances</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.nb_lapins_mortes_naissances}</span></h5>

                      </td>
                  </tr>
                  <tr>
                    
                  <th scope="row">totale de mortalité</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.TM}</span></h5>

                      </td>
                  </tr>
                  <tr>
                  <th scope="row">nombre des malle</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.nbMalle}</span></h5>

                      </td>
                    
                  </tr>
                  <tr>
                    
                  <th scope="row">nombre des femalle</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.nbFemalle}</span></h5>

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
                        <td><span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.cons_auj} kg</span></td>
                          
                      
                      </tr>
                      <tr>
                        <th scope="row">consomation d'alimentation totale</th>
                        <td><span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.cons} kg</span></td>
                          
                      
                      </tr>
                    </tbody>
              </table>

              <table className="table table-striped col-11 rounded m-1 bg-success bg-opacity-50" style={{width:97+"%"}}>
                
                <tbody>
                
                  <tr>
                    <th scope="row">coup de consomation d'alimentation totale</th>
                    <td><span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.coup_cons} dt</span></td>
                      
                  
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
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.MoyPN}</span></h5>

                      </td>
                    
                  </tr>
                  <tr>
                    
                  <th scope="row">moyenne des poids a la dernier mesure date: {groupe.DateDMP}</th>
                      <td>  
                      <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.MoyPDM}</span></h5>

                      </td>
                  </tr>
                  <tr>
                    
                    <th scope="row">moyenne des poids au souvrage: {groupe.DateSevrage}</th>
                        <td>  
                        <h5> <span className="text-dark" style={{marginLeft:50+"px"}}>{groupe.MoyPS}</span></h5>

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
                          
            
                          <Link  to={"/managment/groupe/poid_mesure/"+groupe.id+"/"+groupe.cage} cage={groupe.cage} className="col-7 m-auto"><img style={{width:50+'px',display:"block"}} src={poid} className="m-auto" ></img> <br></br> déterminer les poids des lapins</Link><br></br>







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
                          <Link to={"/managment/groupe/vaccin/"+groupe.id+"/"+groupe.cage} className="col-2 p-0 d-flex align-items-center"><img style={{width:30+'px',margin:5+'px',}} src={vaccin} ></img></Link>
                      </div>
                      <div className="">

                            { groupe.vaccins.length!=0 ? <div><table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col" style={{'text-align':'center'}}>Nom</th>
                                      <th scope="col" style={{'text-align':'center'}}>Date</th>
                                      <th scope="col" style={{'text-align':'center'}}>Prix</th>
                                      <th scope="col" style={{'text-align':'center'}}>Nb lapins</th>
                                    </tr>
                                  </thead>
                                  <tbody> {groupe.vaccins.map((vaccin)=>(
                                  
                                    
                                  <tr>
                                <th style={{'text-align':'center'}} scope="row">{vaccin.nom}</th>
                                <td style={{'text-align':'center'}} >{vaccin.date_vaccin}</td>
                                <td style={{'text-align':'center'}}>{vaccin.prix}dt</td>
                                <td style={{'text-align':'center'}}>{vaccin.lapins.length}</td>
                                </tr> 
                            ))}</tbody>
                            </table></div>: <div className="col-12 d-flex justify-content-center " >
                 
              
                            <Link to={"/managment/groupe/vaccin/"+groupe.id+"/"+groupe.cage} className="col-2 p-0 d-flex align-items-center d-flex justify-content-center"><img style={{width:70+'px',margin:5+'px',}} src={vaccin} ></img>ajouter un vaccin</Link>
                             
                          </div>
                          }
                      </div>
              </div>
              </div>

              <div>
              <h4>lapins du groupe :</h4>
              
              { lapins.length==0 ?  <div className="m-2" role="alert">
                            <p>ce groupe n'a pas des lapins de production peut etre tous les lapins sont supremer ou vendues ou mort</p>

                          </div>:<div className="">

                          <table class="table table-striped col-12 m-auto  p-0">
                        
                              <tbody className="col-12 m-0 p-0">
                          
                                {lapins && lapins.map((lapin)=>(
                                  <tr className="col-12 m-0 p-0" id={"lapin-production-"+lapin.id}>

                                    <th scope="row">{lapin.cage}</th>
                                    <td><button onClick={()=>updateLapinHandler (lapin.id)} id={'delete-lapin-'+lapin.id} className='btn bg-success  bg-opacity-50 m-0 p-0'><img style={{width:25+'px',}} src={update} /></button></td>
                                    <td><button onClick={()=>deleteLapinHandler (lapin.id)} id={'delete-lapin-'+lapin.id} className='btn bg-danger  bg-opacity-50 m-0 p-0'><img style={{width:25+'px',}} src={deleteIcon} /></button></td>
                                    <td><button onClick={()=>detailsLapinHandler (lapin.id)} id={'details-lapin-'+lapin.id} className='btn bg-primary  bg-opacity-50 m-0 p-0'><img style={{width:25+'px',}} src={details} /></button></td>

                                  </tr>
                                  
                                ))}
                              </tbody>
                          </table>


                          {lapins && lapins.map((lapin)=>(
                            <div>
                                <div onClick={()=>hidenPopUpsLapin(lapin.id)} style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20,"background": "rgba(0, 0, 0, 0.6)"}} id={`layer-${lapin.id}`} >
                                </div>
                                <div id={"lapin-details-"+lapin.id} className="col-12 m-0  animate__animated  animate__backInUp "  style={{"display":"none","position":"fixed","top":'25%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0,0.0)","height":"10%","alignItems":"center"}}   >
                                    <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                                                <button onClick={()=>hidenPopUpsLapin(lapin.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
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
                            <div style={{"display":"none","position":"fixed","top":'20%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0, 0.0)"}} id={'lapin-delete-'+lapin.id} className=" col-12 col-sm-6 col-md-4 col-lg-3 m-auto ">
                                    <div className="justify-content-end row" style={{"position":"relative","top":"35%"}}>
                                            <button onClick={()=>hidenPopUpsLapin(lapin.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                                    </div>
                                    <div  class=" row   m-2 p-2"   style={{"position":"relative","top":"35%","background":"#FFFFFF","borderRadius":"10px",'alignItems':'center'}} >
                                        <div class="">
                                          <div class="modal-content">
                                            <div class="modal-header flex-column mb-3">
                                              <h4 class="modal-title w-100">tous les donnés de cette lapin <span style={{'color':'red'}}>{lapin.cage}</span>  seront supremer :
                                              <ul>
                                                <li>les mesures de poid</li>
                                                <li>les vaccins</li>
                                                <li>sa consomation d'alimantation</li>
                                                <li>le nombre des lapins a la naissance de sa groupe de production sera moins 1</li>

                                              </ul>
                                               </h4>	
                                            </div>
                                          
                                            <div class="modal-footer justify-content-center">
                                              <button type="button" class="btn btn-secondary m-1" onClick={()=> hidenPopUpsLapin(lapin.id)}>Cancel</button>
                                              { isWaitDeleteLapinProduction ? <button type="button" class="btn btn-danger" disabled><div className="text-center"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div> </button> :
                                              <button type="button" class="btn btn-danger" onClick={() => deleteLapinProductionApi(lapin.id)}>Delete</button>}
                                            </div>
                                          </div>
                                        </div>
                                    </div>  
                            </div>
                          ))}


                          {lapins && lapins.map((lapin)=>(
                            <div id={"lapin-update-"+lapin.id} className="col-12 m-0  animate__animated  animate__backInUp "  style={{"display":"none","position":"fixed","top":'25%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0,0.0)","height":"10%","alignItems":"center"}}   >
                                <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                                            <button onClick={()=>hidenPopUpsLapin(lapin.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                                </div>
                                <div  class="row mt-1 pt-2 "   style={{"position":"relative","top":"10%",'left':'2%',"width":"100%","opacity":"1","background":"#FFFFFF","borderRadius":"10px"}} >
                                    <div style={{overflowY:"scroll",overflowX:"hidden",height:430+"px"}} className='m-auto'>  
                                          <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-11 col-sm-6 m-auto">
                                              
                                              <h4 className="text-dark">modifier la femalle {lapin.cage}</h4>
                                              <h4 id={"message-update-lapin-production-"+lapin.id} style={{display:"none"}} className="alert alert-danger">{message}</h4>
                                              

                                              
                                              <label>sex :</label>
                                              <div >
                                                      <span >malle :</span> <br/><input value={sex} onChange={e => setSex("malle")}   type="radio" name="sex"/> 
                                                      <br/>
                                                      <span >femalle :</span><br/><input value={sex} onChange={e => setSex("femalle")}   type="radio" name="sex"/>
                                                      </div>
                                              <label >race</label>
                                              <Races/>
                                              
                                              <div className="row justify-content-around mt-2 col-12 m-auto"> 
                                                              
                                                  
                                                  { !isWaitUpdateLapinProduction ? <button  className="col-5 m-1 btn btn-success" onClick={()=>LapinProductionUpdate(lapin.id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
                                                      <div className="spinner-border text-primary" role="status">
                                                  <span className="sr-only"></span>
                                                  </div>
                                                      
                                                      </button>}
                                                      <button onClick={()=>hidenPopUpsLapin(lapin.id)} className="col-5 m-1 btn btn-danger">anuller</button>

                                              </div >

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