import React, { useState } from "react";
import update from"./icons/update.png";
import deleteFemalle from "./icons/delete.png";
import market from "./icons/market.png";
import mort from "./icons/mort.png";
import details from "./icons/details.png";
import close from "./icons/close.png"
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Femalle(props){
  const [message,setMessage]=useState("")
  const [isWait,setIsWait]=useState(true)
  const [TP,setTP]=useState("")
  const [TM,setTM]=useState("")
  const [TMN,setTMN]=useState("")
  const [TPNet,setTPNet]=useState("")
  const [DG,setDG]=useState("")
  const [MPN,setMPN]=useState("")
  const [TV,setTV]=useState("")
  const [totalePrix,settoTalePrix]=useState("")
  const [basPrix,setBasPrix]=useState("")
  const [moyennePrix,setMoyennePrix]=useState("")
  const [grandPrix,setGrandPrix]=useState("")
  const [consMoi,setConsMoi]=useState("")
  const [consAujourdhui,setConsAujourdhui]=useState("")
  const [coupConsMoi,setCoupConsMoi]=useState("")
  const [coupConsAujourdhui,setCoupConsAujourdhui]=useState("")
  const id=props.id
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  const [dateNaissance,setDateNaissance]=useState("")
  const [dateVent,setDateVent]=useState("")
  const [prix,setPrix]=useState("")
  const [dateMort,setDateMort]=useState(yyyy+"-"+mm+"-"+dd)
  const [race,setRace]=useState("")
  const [cage,setCage]=useState("")
  const [age,setAge]=useState("")
  const [state,setSate]=useState("")


  useEffect(()=>{
      fetch("https://kossay.pythonanywhere.com/manager/api/femalle/"+id,{
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
            //window.location.href="/managment/manager/femalles"
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
              setDateNaissance(data.date_naissance)
              setRace(data.race)
              setCage(data.cage)
              setAge(data.age)
              setSate(data.state)




          }
          })
  },[])

  function FemalleDelete(id){
    setIsWait(false)
    fetch(`https://kossay.pythonanywhere.com/manager/api/femalle/${id.toString()}`,{
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
  function FemalleVent(id){
    if(prix===""){
      console.log('test1')
      document.getElementById('prix').focus()
      document.getElementById('prix').className="border border-danger bg-success bg-opacity-25 rounded"
      document.getElementById('cage').className="border border-success bg-success bg-opacity-25 rounded"

    }
    else if(dateVent===""){
      console.log('test2')
      document.getElementById('dateVent').focus()
      document.getElementById('prix').className="border border-success bg-success bg-opacity-25 rounded"
      document.getElementById('dateVent').className="border border-danger bg-success bg-opacity-25 rounded"
    }
    else{
      document.getElementById('prix').className="border border-success bg-success bg-opacity-25 rounded"
      document.getElementById('dateVent').className="border border-success bg-success bg-opacity-25 rounded"
    
    setIsWait(false)

    fetch("https://kossay.pythonanywhere.com/manager/api/femalle/vent/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "prix":prix,
    "date_vent":dateVent,
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
      window.location.href="/managment/manager/femalles"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}}
  function FemalleMorte(id){
    setIsWait(false)

    fetch("https://kossay.pythonanywhere.com/manager/api/femalle/mort/"+id,{
  method:'put',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  },
  body:JSON.stringify({
    "date_mort":dateMort,
    "state":"mort",
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
      window.location.href="/managment/manager/femalles"
  }else {
    document.getElementById('message').style.display='block';
    setMessage(data)
  }
  })}
  function FemalleUpdate(id){
    setIsWait(false)
    fetch("https://kossay.pythonanywhere.com/manager/api/femalle/"+id,{
    method:'put',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
    },
    body:JSON.stringify({
        
        "date_naissance":dateNaissance,
        "race":race,
    })
    },
    )
    .then(response =>{
    if (response.status==202){
        return true
    }else if(response.status==500){
      setIsWait(true)
        return "server error 500"
    }else{
      setIsWait(true)
        return response.json()
    }
    })
    .then(data =>{
        if (data === true){
        window.location.href="/managment/manager/femalles"
    }else {

        document.getElementById('message').style.display='block';
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
           <option key={options[0].value} value={options[0].value} >{options[0].label}</option>
          {options.map(o => (
           
           (o.value!=race) ?<option key={o.value} value={o.value} >{o.label}</option>:""
            
          ))}
           
        </select>
    );
    };
  let deleteHandler =(id)=>{
    document.getElementById("delete-alert-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'
  }
  function hidenAlerts(id){


    document.getElementById("delete-alert-"+id).style.display='none';
    document.getElementById("update-"+id).style.display='none';
    document.getElementById("layer-"+id).style.display='none'
    document.getElementById("statistique-"+id).style.display='none';
    document.getElementById("vent-"+id).style.display='none'
    document.getElementById("mort-"+id).style.display='none'


  }
  function statistiqueHandler(id){
    document.getElementById("statistique-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'
  }
  function ventHandler(id){
    document.getElementById("vent-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'


  }
  function mortHandler(id){
    document.getElementById("mort-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'
  }
  function updateHandler(id){
    document.getElementById("update-"+id).style.display='block';
    document.getElementById("layer-"+id).style.display='block'


  }



    return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5 " id={`femalle-${props.id}`} >
              <div className="card h-100 border-success pb-2">
               
                 <div onClick={()=>hidenAlerts(props.id)} style={{"display":"none","position":"fixed","top":"0",'bottom':'0','left':'0','right':'0',zIndex:20,"background": "rgba(0, 0, 0, 0.6)"}} id={`layer-${props.id}`} >
                 </div>

                <div style={{"display":"none","position":"fixed","top":'35%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0, 0.0)"}} id={`delete-alert-${props.id}`} className=" col-12 col-sm-6 col-md-4 col-lg-3 m-auto ">
                <div className="justify-content-end row" style={{"position":"relative","top":"35%"}}>
                                <button onClick={()=>hidenAlerts(props.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                        </div>
                      <div  class=" row   m-2 p-2"   style={{"position":"relative","top":"35%","background":"#FFFFFF","borderRadius":"10px",'height':150+'px','alignItems':'center'}} >
                          <div class="">
                            <div class="modal-content">
                              <div class="modal-header flex-column mb-3">
                                <h4 class="modal-title w-100">delete : {cage} </h4>	
                              </div>
                            
                              <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary m-1" onClick={()=> hidenAlerts(props.id)}>Cancel</button>
                                <button type="button" class="btn btn-danger" onClick={() => FemalleDelete(props.id)}>Delete</button>
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
                              {DG==false ? "" : <Link  to={"/managment/manager/details/"+DG} className="col-2 text-dark" style={{"fontSize":18+"px","margin":10+"px"}}>le groupe de production</Link>}

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

                <div className="col-12 m-auto  animate__animated  animate__backInUp "  style={{"display":"none","position":"fixed","top":'20%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0,0.0)","height":"10%","alignItems":"center"}} id={`vent-${props.id}`}  >
                        <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                                    <button onClick={()=>hidenAlerts(props.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                        </div>
                        <div className="alert alert-primary m-2" style={{background:"white","height":"500px"}} role="alert">
                        <div className="alert alert-primary" role="alert">
                          est ce que tu est sur que cette  femalle {cage}
                          est morte
                          <h3>{message}</h3>
                        <br/>
                        <label>date de mort     :</label>
                        <input id="dateVent"  value={dateVent} onChange={e=>setDateVent(e.target.value)}  className="border border-success bg-success bg-opacity-25 m-2 " style={{borderRadius:5+'px',}}   type="date" /> <br/>
                        <label>date de mort en dinar:</label> 
                        <input   id='prix' value={prix} onChange={e=>setPrix(e.target.value)}  className="border border-success bg-success bg-opacity-25 m-2 " style={{borderRadius:5+'px',}}   type="number" />
                        </div>




                        <div className="row justify-content-around mt-2"> 
                                    
                                    <button onClick={()=>FemalleVent(id)}   className="col-5 btn btn-success"  >oui</button>
                                    
                                    <Link to={"/managment/manager/femalles"} className="col-5 btn btn-danger">non</Link>
                                  </div >
                        </div>
                </div>
                <div className="col-12 m-auto  animate__animated  animate__backInUp "  style={{"display":"none","position":"fixed","top":'20%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0,0.0)","height":"10%","alignItems":"center"}} id={`mort-${props.id}`}  >
                        <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                                    <button onClick={()=>hidenAlerts(props.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                        </div>
                        <div className="alert alert-primary m-2" style={{background:"white","height":"500px"}} role="alert" >
     
        
     <div className="alert alert-danger" role="alert">
       est ce que tu est sur que cette  femalle {cage}
       est morte
       <h3>{message}</h3>
     <br/>
     <label>date de mort</label>
     <input   value={dateMort} onChange={e=>setDateMort(e.target.value)}  className="border border-danger bg-danger bg-opacity-25 " style={{borderRadius:5+'px',}}   type="date" />
     </div>
   
   <div className="row justify-content-around mt-2"> 
                 
     <button onClick={()=>FemalleMorte(id)}   className="col-5 btn btn-success"  >oui</button>
     
     <Link to={"/managment/manager/femalles"} className="col-5 btn btn-danger">non</Link>
   </div >
                        </div>
                </div>

                <div className="col-12 m-auto  animate__animated  animate__backInUp "  style={{"display":"none","position":"fixed","top":'20%','left':'0','right':'0',zIndex:20000,"background": "rgba(0, 0, 0,0.0)","height":"10%","alignItems":"center"}} id={`update-${props.id}`}  >
                        <div className="justify-content-end row" style={{"position":"relative","top":"10%"}}>
                                    <button onClick={()=>hidenAlerts(props.id)} className="col-4 button-hiden mt-2"><img style={{width:25+'px',}} src={close}></img></button>
                        </div>
                        <div className="alert alert-primary m-3" style={{background:"white","height":"500px"}} role="alert">
                            <div className=" row card bg-success bg-opacity-50 p-1 col-12 m-auto">
                                        
                                        <h4 className="text-dark">modifier la femalle {cage}</h4>
                                        <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
                                        

                                        
                                        <label>date naissance</label>
                                        <input value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" />
                                        
                                        <label >race</label>
                                        <Races/>
                                        
                                        <div className="row justify-content-around mt-2 col-12 m-auto"> 
                                                      
                                          
                                          {isWait ? <button  className="col-5 m-1 btn btn-success" onClick={()=>FemalleUpdate(id)}>ajoputer</button>:<button  className="col-5 m-1 btn btn-success" disabled >
                                              <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only"></span>
                                          </div>
                                                
                                                </button>}
                                          <Link to='/managment/manager/femalles'  className="col-5 m-1 btn btn-danger">anuler</Link>
                                        </div >

                            </div>
                        </div>
                       
                     
                </div>

                <div className="card-footer bg-success bg-opacity-75 row m-0 justify-content-around">
                  { state=== "production" ? <button onClick={()=>statistiqueHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={details}></img></button>:""}
                  { state=== "production" ? <button onClick={()=>updateHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={update} ></img></button>:""}
                  { state=== "production" ? <button onClick={()=>ventHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={market} ></img></button> :""}
                  { state=== "production" ? <button onClick={()=>mortHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={mort} ></img></button> :""}
                  <button onClick={()=>deleteHandler(props.id)} className="col-2 button-hiden"><img style={{width:25+'px',}} src={deleteFemalle} ></img></button>
                
                </div>
                <div className="card-body p-0">
                <img style={{'width':'100%'}}src={"https://kossay.pythonanywhere.com/media/"+props.img}></img>
                  <div className="text-center">
                      <h5 className="m-0">lapin : {cage}</h5>
                      {props.race ? <p className="text-body m-0">race:{props.race}</p> :""}
                      age: {age} 
                      {dateMort ? <p className="text-body m-0">date mort:{dateMort}</p> :""}
                      {dateVent ? <p className="text-body m-0">date vent:{dateVent}</p> :""}

                     
                    </div>
                </div>
                
              </div>
          </div>
    );

}
export default Femalle










