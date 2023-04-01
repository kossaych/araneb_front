import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import HeaderLogIn from "../../../parts/header/index-loged-in";
function CreateFemalle() {
    const [dateNaissance,setDateNaissance]=useState("")
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    const [race,setRace]=useState('')
    const [cage,setCage]=useState('')
    const [img,setImg]=useState('')

    function sendData(event){
      document.getElementById('message').style.display='none';
      event.preventDefault()
      if (img==="") {
        document.getElementById('message').style.display='block';
        setMessage('ajouter une image')
        return false
      }
      if (dateNaissance==="") {
        document.getElementById('message').style.display='block';
        setMessage('ajouter le date de naissance')
        document.getElementById('date_naissance_input').focus()
        return false
      }
      setIsWait(false)
      var malle = new FormData()
      malle.append('file', img )
      malle.append('race',race)
      malle.append('date_naissance',dateNaissance)
  
      fetch("http://localhost:8000/manager/api/femalles",{
      method:'post',
      headers: {
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
      },
      body:malle
      },
      )
      .then(response =>{
        
      if (response.status==201){
          return true
      }else if(response.status==500){
        return response.json()
      }else{
        return response.json()
      }
      })
      .then(data =>{
        if (data === true){
          window.location.href='/managment/manager/parents' 
        }else {
          console.log('test')
          setIsWait(true)
          document.getElementById('message').style.display='block';
          setMessage(data)
      }
      })
      
    
    
    }
    function Races  ()  {
        const options=[
            {label:'Gaint Flander',value:'Gaint Flander'},
            {label:'Flemish Giant',value:'Flemish Giant'},
            {label:'Chinchilla',value:'Chinchilla'},
            {label:'New Zealand White',value:'New Zealand White'},
            {label:'California',value:'California'},
            {label:'Rex',value:'Rex'},
    ]
    setRace(options[0].value)
        return (
            <select value={race} onChange={e => setRace(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
              {options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
              
            </select>
        );
    };
    /// function to prpose a cage for a the rabbit
    useEffect(()=>{
      fetch("http://localhost:8000/manager/api/femalle/cage_vide",{
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
               window.location.href="/managment/manager/parents"
          }else { 
              setCage(data.cage_vide)
          }
          })
    },[])
    
    
    return(
        <div>
          <HeaderLogIn></HeaderLogIn>
     
          <form onSubmit={sendData}>
            <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
              <h4 className="text-dark">إضافة أنثى</h4>
              <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
          
          <label>:القفص (لا يمكن تغييره)</label>
          <input disabled className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} value={cage} />

          <label>:تاريخ الولادة *</label>
          <input onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" id="date_naissance_input" />

          <label >:السلالة *</label>
          <Races/>
          <br></br>
          <input onChange={e => setImg(e.target.files[0])} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="file" id="image_input" />

          <Link to='/managment/manager/femalles/create/production'  className="col-11 mt-2 mb-2  m-auto alert alert-success">إضافة أنثى من خلال أرانب الإنتاج</Link>

          <div className="row justify-content-around mt-2 col-12 m-auto"> 
            {isWait ? 
              <button type="submit" className="col-5 m-1 btn btn-success">إضافة</button>
              :
              <button  className="col-5 m-1 btn btn-success" disabled>
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </button>
            }
            <Link to='/managment/manager/parents'  className="col-5 m-1 btn btn-danger">إلغاء</Link>
          </div>
            </div>
          </form>

        </div>
      
    );
}
export default CreateFemalle